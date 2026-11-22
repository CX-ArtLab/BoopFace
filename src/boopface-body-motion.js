import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';

// The body behind the expressions. Each official action plays unchanged (its
// eyes, timing and own little head moves); this adds the performance on top:
// real turns and nods in 3D, faked in 2D on the flat face, roll, lean and hop,
// and the head following where the eyes look. Eye shapes stay the official ones.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const bell = (t, a, b) => t <= a || t >= b ? 0 : Math.sin(Math.PI * (t - a) / (b - a));
const env = (t, i = .12, o = .2) => clamp(Math.min(t / i, (1 - t) / o), 0, 1);

// Each entry: label, ms (length of the performance; 0 = as long as the
// official action keeps going), motion(t, ms) → { yaw, pitch, roll, x, y, s }:
// only what the eyes do not already say (nods, hops, droops, lean).
// pitch < 0 looks down; yaw > 0 turns to the viewer's right.
//
// On top of that, every redone action has the eyes lead the head: each frame
// the head turns, lifts and tilts toward where the eyes actually are, by the
// official rule (looking up-left lifts the left side, up-right the right
// side), so head and eyes move as one.
const FOLLOW = { yaw: 14, pitch: 10, roll: 9 };
// Head motion for the voice kit's bloom while thinking, so it reads in 3D:
// the head drifts round in a slow small circle with the turning flower.
// (十字等待 and 方圆等待 have their own, in time with their steps.)
const THINK_MOTION = {
  'think-bloom': { ms: 0, follow: false, motion: (t, ms) => { const a = ms / 1000 * 2 * Math.PI / 3.2; return { pitch: 3 + 2 * Math.cos(a), yaw: 6 * Math.sin(a), roll: 1.5 * Math.sin(a) }; } },
  // Each quarter turn of the cross nudges the head along with it, then it settles.
  'think-cross': { ms: 0, follow: false, motion: (t, ms) => { const u = (ms % 850) / 850, sw = Math.sin(Math.PI * u); return { pitch: 3, yaw: 5 * sw, roll: 3 * sw, s: 1 + .015 * sw }; } },
};
const REDO = {
  idle: { zh: '正常', ms: 650, motion: t => ({ pitch: -3 * bell(t, 0, 1) }) },
  bored: { zh: '发呆', ms: 0, motion: () => ({ y: 2 }) },
  // The official eyes orbit round a vertical axis like a turntable (two turns
  // per 3.2 s). The head turns a little with the spin, is flung wider (and
  // flatter) when the eyes swing out to the sides, as if by centrifugal pull,
  // and rises and sinks gently twice a turn.
  'waiting-spin': { zh: '等待 · 旋转', ms: 0, motion: (t, ms, b, now) => {
    const fx = b._waitingFx; if (!fx || fx.variant !== 'default') return { pitch: 3 };
    const e = now - fx.start, ph = (fx.continuous ? e % fx.duration : Math.min(e, fx.duration)) / fx.duration, A = ph * Math.PI * 4;
    const k = Math.min(1, e / 300) * (fx.continuous ? 1 : Math.min(1, (fx.duration - Math.min(e, fx.duration)) / 300));
    return { pitch: 3 + 1.5 * Math.cos(2 * A) * k, yaw: 7 * Math.sin(A) * k, roll: 2 * Math.sin(A) * Math.cos(A) * k, y: 1.2 * Math.cos(2 * A) * k, sq: .035 * Math.cos(A) ** 2 * k };
  } },
  'waiting-wrap': { zh: '等待 · 环绕', ms: 0, motion: () => ({ pitch: 3 }) },
  'waiting-wave': { zh: '等待 · 波动', ms: 0, motion: () => ({ pitch: 3 }) },
  // Jelly, in time with the cursor: each time the official bars light up,
  // the swell reaches the head a moment later (as if passed through jelly):
  // a gentle rise to a small peak, a slight quiver, then it settles. No big
  // movement when input starts.
  input: { zh: '输入', ms: 0, motion: (t, ms, b, now) => {
    if (b._state !== 'input') return { pitch: -2 };
    const d = (now % 530) - 70; // the bars light up at each 530 ms; the head answers 70 ms later
    if (d <= 0) return { pitch: -2 };
    const swell = (d / 110) * Math.exp(1 - d / 110); // rises to 1 at 110 ms, then eases off
    return { pitch: -2, jit: { s: .018 * swell, sq: .007 * Math.exp(-d / 140) * Math.sin(2 * Math.PI * d / 150) } };
  } },
  affirm: { zh: '肯定', ms: 950, motion: t => ({ pitch: -11 * Math.sin(Math.PI * clamp(t * 2.1, 0, 2)) ** 2 * (t < .5 ? 1 : .65) }) },
  success: { zh: '成功', ms: 1100, motion: t => ({ y: -7 * bell(t, .08, .5), pitch: 7 * bell(t, 0, .8), roll: 4 * Math.sin(t * Math.PI * 3) * env(t, .1, .3), s: 1 + .03 * bell(t, .08, .5) }) },
  failure: { zh: '失败', ms: 1700, motion: t => { const k = ease(env(t, .3, .3)); return { pitch: -10 * k, y: 4 * k }; } },
  // The official wary eyes: the left one grows (near), the right one narrows
  // and drops (far), both moving right: the face turned to show one eye.
  // The head turns right to the full pointer-follow angle as the left eye grows.
  // The full turn is the pointer-follow maximum (pointer at the card's edge,
  // 18°, reached at the top of the spring's small overshoot); the eyes' own
  // sideways move is not added on top.
  wary: { zh: '警惕', ms: 0, follow: false, motion: (t, ms, b) => { const k = warnProximity(b); return { yaw: 16.5 * k, pitch: -2 * k, s: 1 + .06 * k, y: 1 * k }; } }, // leans in: the centre line grows, the near side most
  inspect: { zh: '审视', ms: 0, motion: () => ({ s: 1.06 }) },
  // Timed from the official eye drop: the head lowers with the eyes; once the
  // eyes have arrived it trembles, then puffs up hard for an instant and is
  // straight back ("about to explode").
  angry: { zh: '生气', ms: 0, motion: (t, ms, b, now, st) => {
    if (b._angryEyeDrop) st.drop ??= b._angryEyeDrop.start;
    if (st.drop == null) return {};
    const e = now - st.drop, down = clamp(e / 400, 0, 1) * (e < 1100 ? 1 : clamp(1 - (e - 1100) / 400, 0, 1));
    const tremble = clamp((e - 330) / 120, 0, 1) * (e < 720 ? 1 : 0);
    const pop = e < 720 ? 0 : e < 790 ? (e - 720) / 70 : e < 960 ? 1 - ease((e - 790) / 170) : 0;
    return { pitch: -8 * down, jit: { yaw: 2.6 * Math.sin(e / 21) * tremble, roll: 1.8 * Math.sin(e / 16) * tremble, s: .14 * pop } };
  } },
  // The official refusal sweeps the eyes side to side; the head follows them.
  refuse: { zh: '拒绝', ms: 1400, motion: () => ({}) },
  // Head up with the surprise, and a faint shiver while the official eyes
  // shake (in their time).
  surprise: { zh: '惊讶', ms: 0, motion: (t, ms, b, now) => {
    // (Barely any upward tilt: in 3D a raised chin makes the lower half look
    // bigger. The head lifts and swells a little instead.)
    const up = b._state === 'surprise' ? 1 : 0, sh = b._surpriseShake;
    if (!sh) return { pitch: 1.5 * up, y: -3 * up, s: 1 + .02 * up };
    const u = clamp((now - sh.start) / sh.duration, 0, 1), fade = 1 - .5 * u;
    // Only a faint shiver, once or twice (the original just swells).
    const shiver = (1 - u) ** 2;
    return { pitch: 1.5, y: -3, s: 1.02, jit: { s: .01 * Math.sin(u * Math.PI * 4) * shiver, roll: .6 * Math.sin(u * Math.PI * 4) * shiver, yaw: 1 * Math.sin(u * Math.PI * 4 + 1) * shiver } };
  } },
  // Head down, then still: a sleeping avatar draws nothing (rests: the loop stops once settled).
  sleep: { zh: '睡着', ms: 0, rests: 1600, motion: (t, ms) => { const k = ease(clamp(ms / 1400, 0, 1)); return { pitch: -10 * k, y: 4 * k }; } },
  wake: { zh: '醒来', ms: 1500, motion: (t, ms) => { const up = ease(clamp(t / .45, 0, 1)); return { pitch: -10 * (1 - up), y: 4 * (1 - up), yaw: 5 * Math.sin(ms / 85) * bell(t, .45, .75), s: 1 + .03 * bell(t, .4, .7) }; } },
  // The head beats with the heart: it swells on each "lub-dub" of the official
  // heart and quivers a little while it does.
  love: { zh: '喜欢', ms: 0, motion: (t, ms, b, now) => {
    const S = heartScale(b), beat = clamp((S - 1) / .155, 0, 1);
    return { s: 1.03, pitch: 4, jit: { s: .05 * beat, roll: 1.2 * Math.sin(now / 28) * beat } };
  } },
  // Slot-machine eyes: while the reels roll the eyes downward, the head nods
  // down with them (like "affirm"), more the faster they roll. Each reel then
  // brakes, the left first: as a reel stops, the head dips on that side with
  // the stop's inertia, the right reel's stop dips the other side, then
  // everything springs back level.
  random: { zh: '随机', ms: 0, follow: false, brake: true, motion: (t, ms, b, now, st) => ({ pitch: -10 * clamp((st.reelSpeed || 0) / .5, 0, 1) }) },
};

// How far the official wary pose has come (0..1), from the near eye's growth.
function warnProximity(b) {
  if (!b._warningFx) return 0;
  const m = /scale\(([\d.]+)/.exec(b.shadowRoot?.getElementById('leftEye')?.getAttribute('transform') || '');
  return m ? clamp((+m[1] - 1) / .37, 0, 1) : 0;
}
// The official heart's current heartbeat scale (1 = at rest).
function heartScale(b) {
  if (!b._loveFx) return 1;
  const m = /scale\(([\d.]+)\)/.exec(b.shadowRoot?.getElementById('leftEye')?.getAttribute('transform') || '');
  return m ? +m[1] : 1;
}

function createRedo({ flat, brains, hosts }) {
  let cur = null; // { name, def, start, idleSince }
  const IN = 220, OUT = 380;
  // Is the official action still going on this face?
  const busy = f => !!(f._voiceFx || f._expressionLock || f._state !== 'idle' || f._sleeping || f._boredRoutine || f._waitingFx || f._inspectFx || f._loveFx || f._randomFx || f._failureFx || f._warningFx || f._systemErrorShake || f._headMotion?.getAnimations?.().some(a => a.playState === 'running' || a.playState === 'pending'));
  const sample = now => {
    if (!cur) return null;
    const ms = now - cur.start, b = brains()[0] || flat;
    // Weight: in at the start, out after the action (or the fixed length) ends.
    let w;
    if (cur.def.ms) { const t = ms / cur.def.ms; w = clamp(Math.min(ms / IN, (cur.def.ms - ms) / OUT + 1), 0, 1); if (t >= 1) { w = clamp(1 - (ms - cur.def.ms) / OUT, 0, 1); } }
    else {
      const on = busy(b) || !!cur.hold?.();
      if (ms > 400 && !on) cur.idleSince ??= now; else if (on) cur.idleSince = null;
      w = clamp(ms / IN, 0, 1) * (cur.idleSince ? clamp(1 - (now - cur.idleSince) / OUT, 0, 1) : 1);
    }
    if (ms > 300 && w <= 0) { cur = null; return null; }
    // Where the eyes actually are (any action's way of moving them: look,
    // inspect's scan, random glances), measured from their resting spots.
    const pos = id => /translate\(([-\d.]+)[ ,]+([-\d.]+)/.exec(b.shadowRoot?.getElementById(id)?.getAttribute('transform') || '');
    const l = pos('leftEye'), r = pos('rightEye');
    const ex = l && r ? ((+l[1] - 86) + (+r[1] - 154)) / 2 : 0, ey = l && r ? ((+l[2] - 126) + (+r[2] - 126)) / 2 : 0;
    const L = { x: clamp(ex / 40, -1, 1), y: clamp(ey / 30, -1, 1) };
    const m = { ...cur.def.motion(clamp(cur.def.ms ? ms / cur.def.ms : 0, 0, 1), ms, b, now, cur.st) };
    // Eyes lead, head follows (official tilt rule: sign of x times y).
    if (cur.def.follow !== false) {
      m.yaw = (m.yaw || 0) + FOLLOW.yaw * L.x;
      m.pitch = (m.pitch || 0) - FOLLOW.pitch * L.y;
      m.roll = (m.roll || 0) + FOLLOW.roll * L.x * L.y * 2;
    }
    // Braking reels (random): the moment a slowing reel first brings its eye
    // back to its resting place (and overshoots downward), that side of the
    // head dips with it at once; each reel once. Passing the resting place
    // while still spinning (fast) does not count.
    if (cur.def.brake) {
      for (const [side, sign] of [['left', -1], ['right', 1]]) {
        const e = b.shadowRoot.getElementById(side + 'Base'), cy = +(e?.getAttribute('cy') || 0), ry = +(e?.getAttribute('ry') || 29);
        const q = cur.st[side] ??= { cy, t: now, rolled: false, done: false };
        // The official face redraws about 30 times a second: measure speed
        // only between frames where the eye actually moved.
        if (cy === q.cy) { if (now - q.t > 80) { q.v = 0; cur.st.reelSpeed = ((cur.st.left?.v || 0) + (cur.st.right?.v || 0)) / 2; } continue; }
        const speed = Math.abs(cy - q.cy) / Math.max(1, now - q.t); // units per ms
        // Downward roll speed for the nod (skip the jump where an eye leaves
        // the bottom and comes back in at the top).
        if (Math.abs(cy - q.cy) < 30) q.v = cy > q.cy ? speed : 0;
        cur.st.reelSpeed = ((cur.st.left?.v || 0) + (cur.st.right?.v || 0)) / 2;
        if (Math.abs(cy) > 30) q.rolled = true;
        if (q.rolled && !q.done && ry > 27 && q.cy < -.5 && cy >= -.5 && speed < .45) { brakeKick.push(sign); q.done = true; }
        q.cy = cy; q.t = now;
      }
    }
    return { w, m };
  };
  // Inertia: the head hangs on a spring. Every value it is asked to take
  // (turn, nod, tilt, lean, hop, size) is reached a moment late and slightly
  // overshot, then settles: the head has weight instead of snapping to the eyes.
  // sq: + wider and flatter, - taller and narrower (area kept).
  const KEYS = ['yaw', 'pitch', 'roll', 'x', 'y', 's', 'sq'], SPRING = { w: 10, z: .48 };
  const sp = Object.fromEntries(KEYS.map(k => [k, { x: 0, v: 0 }]));
  let out = null, w = 0, last = performance.now();
  // Fast extras (trembles, a sudden puff) skip the inertia spring, or it
  // would smooth them away. The brake has its own loose spring (roll and a
  // little dip), kicked by the reels stopping.
  const brake = { x: 0, v: 0 }, brakeKick = [];
  // In-plane part (roll, lean, hop) on each card's avatar element; the flat
  // face also fakes the 3D turn by sliding and narrowing.
  let raf = 0;
  const wake = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  function tick(now) {
    raf = 0;
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    const s = sample(now);
    w = s ? s.w : 0;
    let moving = false;
    for (const k of KEYS) {
      const target = s ? (k === 's' ? ((s.m.s || 1) - 1) : (s.m[k] || 0)) * s.w : 0, q = sp[k];
      q.v += (SPRING.w * SPRING.w * (target - q.x) - 2 * SPRING.z * SPRING.w * q.v) * dt; q.x += q.v * dt;
      if (Math.abs(q.x - target) > .01 || Math.abs(q.v) > .01) moving = true; else if (!s) { q.x = 0; q.v = 0; }
    }
    while (brakeKick.length) brake.v += brakeKick.shift() * 60;
    brake.v += (-144 * brake.x - 2 * .3 * 12 * brake.v) * dt; brake.x += brake.v * dt;
    const braking = Math.abs(brake.x) > .02 || Math.abs(brake.v) > .05;
    if (!braking && !s) brake.x = brake.v = 0;
    const jit = s?.m.jit || {};
    out = s || moving || braking ? Object.fromEntries(KEYS.map(k => [k, sp[k].x + (k === 's' ? (jit.s || 0) : (jit[k] || 0)) * (s ? s.w : 0)])) : null;
    // A reel stopping on the left dips the left side (negative roll lifts the
    // right), on the right the right side; a touch of nod down with it.
    if (out) { out.roll += brake.x; out.pitch -= Math.abs(brake.x) * .5; out.y += Math.abs(brake.x) * .3; }
    for (const [el, isFlat] of hosts()) {
      if (!el) continue;
      if (!out) { if (el.style.transform) el.style.transform = ''; continue; }
      const { yaw, pitch } = out;
      let x = out.x, y = out.y, sx = (1 + out.s) * (1 + out.sq), sy = (1 + out.s) / (1 + out.sq);
      if (isFlat) { x += yaw * .22; y += -pitch * .22; sx *= 1 - Math.abs(yaw) * .0035; sy *= 1 - Math.abs(pitch) * .0035; }
      const k = (flat.clientWidth || flat.getBoundingClientRect().width) / 240 || 1; // 240 units → px (layout size, unaffected by this transform)
      el.style.transformOrigin = '50% 55%';
      el.style.transform = `translate(${(x * k).toFixed(2)}px,${(y * k).toFixed(2)}px) rotate(${out.roll.toFixed(2)}deg) scale(${sx.toFixed(4)},${sy.toFixed(4)})`;
    }
    // A resting pose (asleep) holds its transform without asking for frames;
    // the next action, stop or reset wakes the loop again.
    const resting = cur?.def.rests && now - cur.start > cur.def.rests && !moving && !braking;
    if ((cur || out) && !resting) raf = requestAnimationFrame(tick);
  }
  return {
    stop() { cur = null; wake(); },
    // Head motion only, for an action started elsewhere (the voice row's
    // thinking styles): a REDO entry or one of THINK_MOTION. hold() keeps it
    // going while something the brains do not show as busy still runs.
    follow(name, hold) { const def = REDO[name] || THINK_MOTION[name]; if (def) { cur = { name, def, start: performance.now(), idleSince: null, st: {}, hold }; wake(); } },
    // Still running, or the head still settling on its spring.
    get active() { return !!(cur || out); },
    // The 3D turn for the 3D faces, blended over the pointer pose.
    pose3d(pose) {
      if (!out) return pose;
      return { yaw: pose.yaw * (1 - w) + out.yaw, pitch: pose.pitch * (1 - w) + out.pitch, gazeX: pose.gazeX * (1 - w), gazeY: pose.gazeY * (1 - w) };
    },
  };
}

// One per avatar. The flat face moves its whole drawing (the svg); the 3D view
// hands its own container in as face._motionHost.
const players = new WeakMap();
function playerOf(face) {
  let p = players.get(face);
  if (!p) {
    p = createRedo({ flat: face, brains: () => [], hosts: () => [[face._motionHost || face.shadowRoot?.querySelector('svg'), !face._view3d]] });
    players.set(face, p);
  }
  return p;
}
const REDONE = new Set(Object.keys(REDO));
// motion="reduce" (or the system setting) keeps the body still.
const still = face => {
  const m = String(face.getAttribute('motion') || 'auto').trim().toLowerCase();
  if (m === 'reduce') return true;
  if (m === 'full') return false;
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
};

registerAvatarExtension({
  name: 'body-motion',
  afterPlay(action) {
    if (REDONE.has(action) && !still(this)) playerOf(this).follow(action);
    else players.get(this)?.stop();
  },
  reset() { players.get(this)?.stop(); },
});
const baseStartWaiting = BoopFace.prototype.startWaiting;
BoopFace.prototype.startWaiting = function(options = {}) {
  const result = baseStartWaiting.call(this, options);
  const v = options?.variant;
  const name = !v || v === 'spin' || v === 'default' ? 'waiting-spin' : `waiting-${v}`;
  if (REDONE.has(name) && !still(this)) playerOf(this).follow(name);
  return result;
};

// For the 3D view: the turn the body motion adds, blended over its own pose.
export function bodyMotionPose(face, pose) { const p = players.get(face); return p?.active ? p.pose3d(pose) : pose; }
