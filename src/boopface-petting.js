// Petting: stroke the forehead back and forth a few times (no button held)
// and the face does what a petted cat does: eyes shut to the official sleep
// slit and raised (looking up into the hand), the head sways slowly left and
// right twice, then rests; an optional purr tremble.
// Uses only the avatar's own eye morph, expression lock and head-motion layer.
// setPetting(false) turns it off.

import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';
import { endOfficialAction } from './boopface-new-expressions.js';

const EASE = t => 1 - Math.pow(1 - t, 5);
// The official "sleep" eye: a thin slit.
// The official sleep slit, but cut from the upper part of the eye (looking up
// with the eyes shut), both lids turned by the same angle (the official lid
// tilt) so the outer corners slope down (a soft 八-shape, never the angry one).
const SLEEP_EYES = { w: 58, h: 56, rx: 28, topY: -22, bottomY: -13, topAL: -8, topAR: 8, bottomAL: -8, bottomAR: 8, scale: 1 };
const EYES_UP = 16;        // the shut eyes move up near the top of the head (240 units; resting eyes sit at 126)
// The head tilts up into the hand: a real 3D pitch on the 3D faces (pose3d),
// faked on the flat face by lifting and slightly shortening it.
const TILT_UP = 11;
// Eyes at their usual spacing (SPREAD 0; was 3.5 apart), rubbing slowly left and right like a
// kitten nuzzling the hand (for as long as the petting lasts).
const SPREAD = 0, RUB = 3.5, RUB_PERIOD = 2.2;
// Always whole rubs: at least one (left, then right). Once started, the
// petting goes on while the pointer stays on the upper half of that head;
// after it leaves, the rub in progress is finished and the petting ends.
const MIN_RUBS = 1;
// Optional: at each end of a rub the shut eyes squeeze a little tighter
// (the slit gets thinner), then ease back.
const SQUEEZE = 4;
// The head rubs along with the eyes, same rhythm, for as long as the petting
// lasts: it rolls and slides that way (and turns, on the 3D faces).
const SWAY_DEG = 3.5, SWAY_SLIDE = 1.5, SWAY_YAW = 5;

function attachPet({ views, faces, options, isFlat = () => false, onStart = () => {}, enabled = () => true }) {
  // Stroke detection: horizontal back-and-forth in the forehead band.
  // Only the face(s) of the card being stroked are petted: faces(view).
  let starting = false, fastOut = false, dir = 0, run = 0, lastX = null, strokes = [], petting = false, lastStroke = 0, hand = 0, handTarget = 0, lean = 0, strokeView = null, petFaces = [];
  const STROKES_TO_START = 3, WINDOW = 1600, STOP_AFTER = 750;
  const inForehead = (e, v) => {
    const r = v.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    return x > .14 && x < .86 && y > .04 && y < .42 ? { x, r } : null;
  };
  // Is the pointer still on the upper half of the petted head?
  const onUpperHead = e => { if (!strokeView) return false; const r = strokeView.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; return x > .1 && x < .9 && y > 0 && y < .5; };
  let handInside = false;
  document.addEventListener('pointerleave', () => { handInside = false; });
  addEventListener('blur', () => { handInside = false; });
  addEventListener('pointermove', e => {
    if (petting) handInside = onUpperHead(e);
    if (e.buttons || !enabled()) { lastX = null; return; }
    const v = views().find(v => inForehead(e, v)); const hit = v && inForehead(e, v);
    if (!hit) { lastX = null; dir = 0; run = 0; return; }
    // Moving to another card starts counting afresh there (and never steals a petting).
    if (v !== strokeView) { if (petting) return; strokeView = v; lastX = null; dir = 0; run = 0; strokes = []; }
    handTarget = hit.x * 2 - 1;
    const x = e.clientX / hit.r.width; // in view widths
    if (lastX !== null) {
      const dx = x - lastX, d = Math.sign(dx);
      if (d && d !== dir) { if (run > .12) countStroke(); dir = d; run = 0; }
      run += Math.abs(dx);
      if (petting && Math.abs(dx) > .004) lastStroke = performance.now();
    }
    lastX = x;
  });
  function countStroke() {
    const now = performance.now();
    strokes = strokes.filter(t => now - t < WINDOW); strokes.push(now); lastStroke = now;
    if (!petting && strokes.length >= STROKES_TO_START) { start(); wake(); }
  }
  const saved = new Map();
  // Right after each of the face's own draws: eyes raised (and rubbing), the
  // lid squeeze; added in front of the eye's own transform, so its tilt and
  // size (heart, wary) are kept.
  function afterDraw(f) {
    if (!(f.__petUp > .01)) return;
    for (const side of ['left', 'right']) {
      const dx = (side === 'left' ? -1 : 1) * (f.__petSpread || 0) + (f.__petRub || 0);
      const g = f.shadowRoot.getElementById(side + 'Eye');
      if (g) g.setAttribute('transform', `translate(${dx.toFixed(2)} ${(-f.__petUp).toFixed(2)}) ${g.getAttribute('transform') || ''}`);
      const lid = f.shadowRoot.getElementById(side + 'Bottom'), o = f.__petSqueeze || 0;
      if (lid && o > .01) { const y = +lid.getAttribute('y') - o, a = /rotate\(([-\d.]+)/.exec(lid.getAttribute('transform') || '')?.[1] || 0; lid.setAttribute('y', y.toFixed(2)); lid.setAttribute('transform', `rotate(${a} 0 ${y.toFixed(2)})`); }
    }
  }
  function start() {
    // Any expression still playing ends first (the other cards ease back to rest).
    onStart();
    // A face still easing out of an earlier petting (another card stroked
    // first) is let go fully here; otherwise it keeps its raised-eye draw
    // forever, which overwrites the eye transform (a heart then loses its
    // tilt and shows as one tall oval).
    const next = faces(strokeView);
    for (const f of petFaces) if (!next.includes(f)) release(f);
    petting = true; handInside = true; lean = 0; swayT = 0; petFaces = next; starting = true;
    for (const f of petFaces) {
      f.noteActivity?.();
      try { endOfficialAction(f); } finally { starting = false; }
      f._expressionLock = true;
      if (f._eyeMicro) f._eyeMicro.lX = f._eyeMicro.lY = f._eyeMicro.rX = f._eyeMicro.rY = 0;
      if (f._wanderTarget) f._wanderTarget.x = f._wanderTarget.y = 0;
      f._look.x = f._look.y = 0;
      f._eyeBob = f._eyeNod = null;
      f._startMorph(SLEEP_EYES, 420, EASE);
      // No blinking with closed eyes.
      saved.set(f, f._nextBlinkAt); f._nextBlinkAt = Infinity;
      const hm = f._headMotion; hm.getAnimations?.().forEach(a => a.cancel());
      hm.style.transformBox = 'view-box'; hm.style.transformOrigin = '120px 150px';
    }
  }
  async function stop() {
    petting = false; strokes = [];
    for (const f of petFaces) {
      f._nextBlinkAt = performance.now() + 900 + Math.random() * 1200;
      // A slow, satisfied opening of the eyes.
      f._returnToIdle?.(650);
    }
  }
  // Per frame: eyes up, the rub (eyes and head together), the small rise, the purr.
  let prev = performance.now(), t = 0, swayT = 0, rubNow = 0, endAt = null;
  let raf = 0;
  const wake = () => { if (!raf) { prev = performance.now(); raf = requestAnimationFrame(frame); } };
  function frame(now) {
    raf = 0;
    if (petting || lean > 0) raf = requestAnimationFrame(frame);
    const dt = Math.min(.05, (now - prev) / 1000); prev = now; t += dt;
    // The hand has left: end on a whole rub (never cut one in half).
    // The end is fixed once, when the hand is first seen gone (a new stroke
    // clears it again).
    if (petting && !handInside) {
      endAt ??= Math.max(MIN_RUBS, Math.ceil(swayT / RUB_PERIOD - 1e-6)) * RUB_PERIOD;
      if (swayT >= endAt) stop();
    } else endAt = null;
    const target = petting ? 1 : 0;
    lean += (target - lean) * (1 - Math.exp(-dt / (petting ? .25 : fastOut ? .07 : .35)));
    if (fastOut && !petting && lean < .05) lean = 0;
    hand += (handTarget - hand) * (1 - Math.exp(-dt / .18));
    if (lean < .002 && !petting) {
      fastOut = false;
      if (lean !== 0 || petFaces.some(f => f.__petUp)) { lean = 0; for (const f of petFaces) { f.__petUp = f.__petSpread = f.__petRub = f.__petSqueeze = 0; if (!f._headMotion.getAnimations?.().length) f._headMotion.style.transform = ''; } }
      return;
    }
    if (petting) swayT += dt;
    // One rhythm for eyes and head: the rub phase (eased in over the first beat).
    const rub = Math.sin(2 * Math.PI * swayT / RUB_PERIOD) * Math.min(1, swayT / (RUB_PERIOD / 2));
    rubNow = rub;
    const sway = SWAY_DEG * rub;
    const purr = options().purr ? Math.sin(t * 2 * Math.PI * 7) * .35 * lean : 0;
    // The head rises a touch into the hand.
    const up = -2 * lean + purr;
    const tilt = TILT_UP * lean;
    for (const f of petFaces) {
      const flat = isFlat(f), y = up - (flat ? tilt * .22 : 0), sy = flat ? 1 - tilt * .0035 : 1;
      f.__petUp = EYES_UP * lean + .02; f.__petSpread = SPREAD * lean; f.__petRub = RUB * rub * lean; f.__petSqueeze = options().blink ? SQUEEZE * Math.abs(rub) ** 2 * lean : 0;
      f._headMotion.style.transform = `translate(${(SWAY_SLIDE * rub * lean).toFixed(2)}px, ${y.toFixed(2)}px) rotate(${(sway * lean).toFixed(2)}deg) scale(1, ${sy.toFixed(4)})`;
      f._resumeFrames?.();
    }
  }
  // A button pressed while petting: drop the petting at once and leave the
  // faces to the new expression (no eye opening of its own to fight it).
  function release(f) {
    f.__petUp = f.__petSpread = f.__petRub = f.__petSqueeze = 0;
    if (f._nextBlinkAt === Infinity) f._nextBlinkAt = performance.now() + 900 + Math.random() * 1200;
    if (!f._headMotion.getAnimations?.().length) f._headMotion.style.transform = '';
  }
  // Like any action cut short: it stops at once but eases back to rest
  // (quickly, ~0.2 s) instead of jumping; the next expression waits its
  // usual moment before starting.
  function cancel() {
    if (starting || (!petting && lean === 0)) return;
    petting = false; strokes = []; endAt = null; fastOut = true; wake();
    for (const f of petFaces) if (f._nextBlinkAt === Infinity) f._nextBlinkAt = performance.now() + 900 + Math.random() * 1200;
  }
  return {
    afterDraw,
    get petting() { return petting; }, start, stop, cancel,
    // Is this face being petted (or easing out of it)?
    holds: f => lean > .002 && petFaces.includes(f),
    // The 3D pitch up for a petted 3D face, added to its pose.
    pose3d: (f, pose) => lean > .002 && petFaces.includes(f) ? { ...pose, pitch: pose.pitch * (1 - lean) + TILT_UP * lean, yaw: pose.yaw * (1 - lean) + SWAY_YAW * rubNow * lean, gazeX: pose.gazeX * (1 - lean), gazeY: pose.gazeY * (1 - lean) } : pose,
  };
}

// One per avatar, wired once it is first drawn.
const pets = new WeakMap();
function petOf(face) {
  let p = pets.get(face);
  if (!p) {
    p = attachPet({
      views: () => (face.isConnected ? [face] : []), faces: () => [face],
      options: () => ({ purr: true, blink: true }),
      isFlat: f => !f._view3d,
      enabled: () => face._pettingEnabled !== false && !face._dragJelly?.active,
    });
    pets.set(face, p);
  }
  return p;
}

BoopFace.prototype.setPetting = function(enabled = true) {
  this._pettingEnabled = enabled !== false;
  if (!this._pettingEnabled) pets.get(this)?.cancel();
  return this;
};

registerAvatarExtension({
  name: 'petting',
  // Any action ends the petting (eased back, never a jump).
  beforePlay() { pets.get(this)?.cancel(); },
  reset() { pets.get(this)?.cancel(); },
  draw() { petOf(this).afterDraw(this); },
});

// For the 3D view: the petted head tips up into the hand.
export function petPose(face, pose) { const p = pets.get(face); return p ? p.pose3d(face, pose) : pose; }
