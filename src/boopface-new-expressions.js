import { registerAvatarExtension } from './boopface-extension-host.js';

// New expressions: bow, shake, observe, think, ponder, bounce, smug-bounce,
// dizzy, wink, smug, and the shape-wait (circle ↔ rounded square).
// Each one drives the avatar through its own eye morph (only eye shapes the
// avatar already has), small per-eye touches after each draw, and a head
// motion: a real turn in 3D (pose3d), faked in 2D on the flat face.
// Switching follows the avatar's rule: whatever plays stops at once and eases
// back to rest, a short pause, then the next one starts.
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const outQuint = t => 1 - Math.pow(1 - t, 5);
const bell = (t, a, b) => t <= a || t >= b ? 0 : Math.sin(Math.PI * (t - a) / (b - a)); // 0 → 1 → 0 between a and b
const env = (t, i = .12, o = .2) => clamp(Math.min(t / i, (1 - t) / o), 0, 1); // fade in / hold / fade out

const IDLE = { w: 54, h: 58, rx: 27, topY: -36, bottomY: 36, topAL: 0, topAR: 0, bottomAL: 0, bottomAR: 0, scale: 1 };
// Only eye shapes the official component already has (its POSES, plus the
// small round eye it shows just before "surprise"), so the design language
// stays the same. Names are what the new expressions use them for.
const OFFICIAL = {
  happy: { ...IDLE, w: 58, h: 58, rx: 29, bottomY: 0 },
  sleepy: { ...IDLE, w: 58, h: 56, rx: 28, topY: 0 },
  sleep: { ...IDLE, w: 58, h: 56, rx: 28, topY: 7, bottomY: 14 },
  surprise: { ...IDLE, w: 68, h: 68, rx: 34, topY: -40, bottomY: 40 },
  preSurprise: { ...IDLE, w: 34, h: 36, rx: 18 },
};
const P = {
  arc: OFFICIAL.happy, dot: OFFICIAL.preSurprise, small: OFFICIAL.preSurprise, wide: OFFICIAL.surprise,
  sleepy: OFFICIAL.sleepy, nearlyShut: OFFICIAL.sleep, smug: OFFICIAL.happy, squint: IDLE,
  // A touch smaller than normal: the brief gather before leaning in (much
  // milder than surprise's small round eye).
  gather: { ...IDLE, w: 48, h: 52, rx: 24 },
  // The normal eye, a little flatter (thinking, to tell it from bored).
  think: { ...IDLE, h: 50 },
};

// motion(t, ms): head and gaze for 0..1 of the expression.
//   yaw/pitch: 3D turn (degrees; pitch < 0 looks down) - flat face fakes it.
//   roll (deg), x/y (px, 240 units), sx/sy (scale), gx/gy (gaze, -1..1).
// eyes: [[at, pose, morph ms]] morph targets along the way.
// post(face, t, ms): per-eye touches after each draw.
// 眨一只眼: the tilt peaks at 38% of the time; the blink is timed in ms around it.
const WINK_MS = 2200, WINK_PEAK = .38 * WINK_MS;
// Shut just as the head (visibly) arrives, which is before the tilt's last
// few degrees: closing 200 ms, closed 250 ms, opening 180 ms.
const WINK_SHUT = WINK_PEAK * .72 + 18, // +18: the softer wind-up lands the head 18 ms later
  WINK_CLOSE = 200, WINK_HOLD = 250, WINK_OPEN = 180;
const winkLid = ms => ms < WINK_SHUT - WINK_CLOSE ? 0 : ms < WINK_SHUT ? ease((ms - WINK_SHUT + WINK_CLOSE) / WINK_CLOSE) : ms < WINK_SHUT + WINK_HOLD ? 1 : ms < WINK_SHUT + WINK_HOLD + WINK_OPEN ? 1 - ease((ms - WINK_SHUT - WINK_HOLD) / WINK_OPEN) : 0;
// 方圆等待 (ms): merge into a circle, steps half turns (circle ↔ rounded
// square), split back. An even number of steps ends on the circle.
const MORPHW = { formMs: 420, stepMs: 1200, steps: 4, circleR: 39, squareA: 38.5, squareN: 4.2, bigR: 51, y: 120, fromR: 46.5 }; // fromR: the kit's listening circle // y 120 = the head's centre
MORPHW.spin = MORPHW.formMs + 120; MORPHW.unform = MORPHW.spin + MORPHW.steps * MORPHW.stepMs + 160 + MORPHW.formMs; MORPHW.total = MORPHW.unform + 120;
// |x/a|^n + |y/a|^n = 1 as a closed path (n 2 = circle, ~4 = rounded square).
function superellipse(a, n) {
  let d = '';
  for (let i = 0; i < 72; i++) { const t = i / 72 * 2 * Math.PI, c = Math.cos(t), s = Math.sin(t);
    const x = a * Math.sign(c) * Math.abs(c) ** (2 / n), y = a * Math.sign(s) * Math.abs(s) ** (2 / n); d += (i ? 'L' : 'M') + x.toFixed(2) + ' ' + y.toFixed(2); }
  return d + 'Z';
}
// 弹跳: hops of `period` ms, `height` units high; landing squash lasts `contact` ms.
const BOUNCE = { period: 700, height: 30, contact: 80, total: 4400 };
// Height 0..1, speed 0..1 (fast near the ground) and contact 0..1 of the ball.
function bounceBall(ms) {
  const c = BOUNCE.contact, T = BOUNCE.period, m = ms % T;
  if (m < c) return { h: 0, v: 0, contact: Math.sin(Math.PI * m / c) };
  const u = (m - c) / (T - c); return { h: 4 * u * (1 - u), v: Math.abs(1 - 2 * u), contact: 0 };
}
// How smug at height h (0 ground … 1 top): fully smug in the upper part.
const smugAt = h => { const u = clamp((h - .45) / .4, 0, 1); return u * u * (3 - 2 * u); };
// The bounce's eyes: up and down around the rest position, stretched while
// moving fast, squashed on landing.
function bouncePost(stretchK, squashK) { return (f, t, ms, fade = 1) => {
    const k = env(t, .06, .12) * fade, { h, v, contact } = bounceBall(ms);
    const stretch = stretchK * v * (1 - contact), squash = squashK * contact;
    for (const side of ['left', 'right']) {
      const sy = 1 + (stretch - squash) * k, sx = 1 + (squash * .6 - stretch * .5) * k;
      const ry = +(f.shadowRoot.getElementById(side + 'Base')?.getAttribute('ry') || 29);
      // Feet stay on the ground while squashed: shift down by what the squash took off.
      shiftEye(f, side, 0, (BOUNCE.height * (.5 - h) + ry * (1 - sy)) * k); // centred: lowest and highest equally far from rest
      widenEye(f, side, sx); squashEye(f, side, sy);
    }
  }; }
// 得意弹跳: just two hops (left, right); after the second landing it stays down.
const SMUG_HOPS_MS = 2 * BOUNCE.period + BOUNCE.contact + 420;
const smugHop = ms => ms < 2 * BOUNCE.period + BOUNCE.contact ? ms : 2 * BOUNCE.period; // after the landing squash: resting on the ground
const smugPost = bouncePost(.07, .14);
// The head's springy answer to each landing: a dip, then a small rebound.
function bounceDip(ms) { const tc = ms % BOUNCE.period; return Math.exp(-tc / 140) * Math.cos(2 * Math.PI * tc / 330) * Math.min(1, tc / 40); }
// 凑近看 timings, in ms.
const LEAN = { gather: 200, zoomIn: 520, firstGlance: 1000, move: 75, hold: 185, pause: 600, holdUp: 500, holdDown: 400, back: 110, linger: 300, zoomOut: 550, antennaDrop: 5 };
const LEAN_KEYS = (() => { const L = LEAN, k = [[0, 0, 0], [L.firstGlance, 0, 0]]; let t = L.firstGlance;
  const go = (x, y, hold) => { t += L.move; k.push([t, x, y]); t += hold; k.push([t, x, y]); };
  go(-.14, 0, L.hold); go(.14, 0, L.pause); go(0, -.16, L.holdUp); go(0, .16, L.holdDown); t += L.back; k.push([t, 0, 0]); return k; })();
const LEAN_OUT = LEAN_KEYS[LEAN_KEYS.length - 1][0] + LEAN.linger, LEAN_TOTAL = LEAN_OUT + LEAN.zoomOut;
// Like surprise: a short gather first (head a touch smaller, small round
// eyes), then the lean in.
const leanZoom = ms => (ms < LEAN.gather ? -.15 * ease(ms / LEAN.gather) : -.15 + 1.15 * outQuint(clamp((ms - LEAN.gather) / LEAN.zoomIn, 0, 1))) * (1 - ease(clamp((ms - LEAN_OUT) / LEAN.zoomOut, 0, 1)));
const leanGaze = ms => path(ms, LEAN_KEYS.concat([[LEAN_TOTAL, 0, 0]]));

const NEW_FX = {
  // A bow: one deep nod, a pause at the bottom, then back up.
  // A bow: one deep nod, a pause at the bottom, then back up. The eyes go
  // down with it, at least as low as affirm's, and flatten a little.
  // Like failure: the head sinks slowly (flat: moves down without squashing;
  // 3D: tips forward and sinks a little too).
  nod: { zh: '鞠躬', ms: 2100, eyes: [[0, IDLE, 200]],
    motion: (t, ms, flat) => { const d = bow(t); return flat ? { y: 11 * d, keepShape: true } : { pitch: -24 * d, y: 7 * d }; },
    post: (f, t, ms, fade = 1) => { const d = bow(t) * fade; shiftEye(f, 'left', 0, 30 * d); shiftEye(f, 'right', 0, 30 * d); squashEye(f, 'left', 1 - .2 * d); squashEye(f, 'right', 1 - .2 * d); } },
  // The eyes lead: they swing to the side a beat before the head follows,
  // wide, like a person looking away while shaking their head. Slightly
  // narrowed eyes read as "no".
  // Flat face: the head stays still; the eyes slide and change width the way
  // the 3D eyes do (measured on the 3D card: the eye on the side it turns to
  // about 17% narrower, the other about 7% wider, heights unchanged).
  shake: { zh: '摇头', ms: 1400, flatTurn: { shift: .67, near: .0106, far: .0044, widthOnly: true }, eyes: [[0, P.squint, 180], [.85, IDLE, 300]],
    motion: (t, ms, flat) => {
      const ph = 2 * Math.PI * 2.5 * t, fade = (1 - t * .85) * env(t, .1, .08);
      // The flat face has no real turn: eyes and head move together (see
      // flatTurn), slower swings, so it reads as a head turning, not darting eyes.
      return { yaw: 16 * Math.sin(ph) * fade, gx: flat ? 0 : .85 * Math.sin(ph + .55) * fade, headStill: true };
    } },
  // Leans in with wide eyes, set a little further apart than surprise. The
  // head grows only as much as surprise does at its biggest, and
  // the antenna drops a little, like a wide lens close up. Once close the head
  // holds still; the eyes glance left, right (pause), up (pause), down, home.
  // Timings in LEAN (ms); LEAN.pause is the stop on the right.
  // On the way out the eyes shrink with the head: same start, length and easing.
  lean: { zh: '观察', ms: LEAN_TOTAL, eyes: [[0, P.gather, 170], [LEAN.gather / LEAN_TOTAL, P.wide, 300], [LEAN_OUT / LEAN_TOTAL, IDLE, LEAN.zoomOut, ease]],
    // Grows as much as surprise does at its biggest on each card (measured:
    // flat 107%, 3D 105%).
    motion: (t, ms, flat) => { const k = leanZoom(ms), [gx, gy] = leanGaze(ms), z = flat ? .07 : .035;
      return { sx: 1 + z * k, sy: 1 + z * k, y: 2 * k, pitch: -4 * k, gx, gy }; },
    post: (f, t, ms, fade = 1) => { const k = Math.max(0, leanZoom(ms)) * fade; shiftEye(f, 'left', -3 * k, 0); shiftEye(f, 'right', 3 * k, 0);
      const dot = f._antennaDot, sp = f._antennaSpring; if (dot && sp) dot.setAttribute('cy', (sp.y + LEAN.antennaDrop * k).toFixed(2)); } },
  // Bored's eyes and look-around, except the move to the right is slow and
  // it comes straight back without stopping: up-left (quick, like bored),
  // hold, drift slowly up-right, drift slowly back, home. Eyes as high as bored's.
  think: { zh: '思考', ms: 4900, flatTurn: { shift: .45, near: .003, far: .002, widthOnly: true }, eyes: [[0, IDLE, 200]],
    motion: (t, ms) => { const [gx, gy] = thinkPath(ms);
      return { gx, gy, yaw: 9 * gx, pitch: 6 * -gy, roll: 2 * gx }; },
    post: (f, t, ms, fade = 1) => { const up = -thinkPath(ms)[1] / .7 * fade; shiftEye(f, 'left', 0, -6.5 * up); shiftEye(f, 'right', 0, -6.5 * up); } },
  // Bored, looking down: the head and eyes go straight down (eyes narrowed to
  // inspect's slit, 16 units), pause; glance left, pause; right, pause; back
  // to the middle, pause; then everything comes back up.
  lookDown: { zh: '沉思', ms: 4400, flatTurn: { shift: .45, near: .003, far: .002, widthOnly: true }, eyes: [[0, IDLE, 200]],
    motion: (t, ms, flat) => { const d = downK(ms), [gx] = path(ms, DOWN_KEYS);
      return flat ? { y: 7 * d, keepShape: true, gx, gy: 1.15 * d } : { pitch: -14 * d, y: 4 * d, gx, gy: 1.15 * d, yaw: 6 * gx }; },
    post: (f, t, ms, fade = 1) => { const d = downK(ms) * fade; if (d > 0) { squintEye(f, 'left', d, 8); squintEye(f, 'right', d, 8); } } },
  // Same windmill steps, one shape: the eyes merge into one circle in the
  // middle; every quarter turn it changes between a circle and a rounded
  // square (the head's own two outlines), then splits back into two eyes.
  // The eye ellipse is drawn large and clipped to the shape (data-shape, read
  // by roundeyes.js on the flat and 3D faces).
  morph: { zh: '方圆等待', ms: MORPHW.total,
    // From the voice kit's listening circle (opts.fromCenter) it starts already
    // merged: the circle shrinks from the kit's size to its own.
    post: (f, t, ms, fade = 1, opts = {}) => {
      const r = f.shadowRoot, W = MORPHW, fc = !!opts.fromCenter;
      const form = (ms < W.formMs ? (fc ? 1 : ease(ms / W.formMs)) : ms < W.unform - W.formMs ? 1 : ms < W.unform ? 1 - ease((ms - W.unform + W.formMs) / W.formMs) : 0) * fade;
      const circleR = fc && ms < W.formMs ? W.fromR + (W.circleR - W.fromR) * ease(ms / W.formMs) : W.circleR;
      const sm = clamp(ms - W.spin, 0, W.steps * W.stepMs), step = Math.min(W.steps - 1, Math.floor(sm / W.stepMs)), u = ms < W.spin ? 0 : ease(clamp((sm - step * W.stepMs) / W.stepMs, 0, 1));
      const from = step % 2 ? 1 : 0, to = 1 - from, sq = from + (to - from) * u; // 0 circle … 1 rounded square
      const angle = ms < W.spin ? 0 : 180 * u * fade; // a half turn per shape change
      const shape = superellipse(circleR + (W.squareA - circleR) * sq, 2 + (W.squareN - 2) * sq);
      for (const side of ['left', 'right']) {
        const g = r.getElementById(side + 'Eye'), base = r.getElementById(side + 'Base'), top = r.getElementById(side + 'Top'), bottom = r.getElementById(side + 'Bottom'); if (!g || !base) continue;
        if (form <= 0) { base.removeAttribute('data-shape'); continue; }
        const m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(g.getAttribute('transform') || ''); if (!m) continue;
        const x = +m[1] + (120 - +m[1]) * form, y = +m[2] + (W.y - +m[2]) * form;
        const rx0 = +base.getAttribute('rx'), ry0 = +base.getAttribute('ry'), rad = W.bigR;
        g.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(2)})`);
        base.setAttribute('cy', '0'); base.setAttribute('rx', (rx0 + (rad - rx0) * form).toFixed(2)); base.setAttribute('ry', (ry0 + (rad - ry0) * form).toFixed(2));
        base.setAttribute('data-shape', shape);
        const edge = Math.max(36, rad + 6);
        if (top) { top.setAttribute('y', (-edge - 90).toFixed(2)); top.setAttribute('transform', `rotate(0 0 ${(-edge).toFixed(2)})`); }
        if (bottom) { bottom.setAttribute('y', edge.toFixed(2)); bottom.setAttribute('transform', `rotate(0 0 ${edge.toFixed(2)})`); }
      }
    },
    cleanup: f => { for (const side of ['left', 'right']) f.shadowRoot.getElementById(side + 'Base')?.removeAttribute('data-shape'); } },
  // A ball bouncing, both eyes together: stretched while falling and rising,
  // squashed on landing; the head takes each landing with a springy dip.
  bounce: { zh: '弹跳', ms: BOUNCE.total, eyes: [[0, IDLE, 200]],
    // The head rises a little with each hop and takes the landing with a dip.
    motion: (t, ms) => { const k = env(t, .06, .12), d = bounceDip(ms), { h } = bounceBall(ms); return { y: (5 * d - 4 * (h - .5)) * k, sx: 1 + .02 * d * k, sy: 1 - .025 * d * k, keepShape: true }; },
    // Stretch 11% while falling, squash 19% on landing (得意弹跳 keeps 7% / 14%).
    post: bouncePost(.11, .19) },
  // 弹跳 + 得意: the bounce with happy (smiling) eyes the whole time, no eye
  // change; on each hop up the head tilts, left on the first, right on the
  // next, and so on.
  smugBounce: { zh: '得意弹跳', ms: SMUG_HOPS_MS, eyes: [[0, P.smug, 260], [(SMUG_HOPS_MS - 360) / SMUG_HOPS_MS, IDLE, 320]],
    motion: (t, ms) => { const k = env(t, .06, .12), m = smugHop(ms), d = bounceDip(ms), { h } = bounceBall(m), side = Math.floor(m / BOUNCE.period) % 2 ? 1 : -1;
      return { y: (5 * d - 4 * (h - .5)) * k, sx: 1 + .02 * d * k, sy: 1 - .025 * d * k, keepShape: true, roll: 7 * side * h * k }; },
    post: (f, t, ms, fade = 1) => smugPost(f, t, smugHop(ms), fade) },
  // Normal-size eyes circling in opposite directions (they cross in the
  // middle); as they go round, one grows while the other shrinks.
  dizzy: { zh: '眩晕', ms: 3000, eyes: [[0, IDLE, 240]],
    motion: (t, ms) => { const k = env(t, .1, .18), a = ms / 200; return { x: 2.4 * Math.cos(a) * k, y: 2.4 * Math.sin(a) * k, roll: 5 * Math.sin(a) * k }; },
    post: (f, t, ms, fade = 1) => { const k = env(t, .1, .18) * fade, a = ms / 190, r = 8.5 * k, s = .12 * k * Math.sin(a);
      // Taller than wide (1.6×): the eyes are tall, so a round path reads as side to side.
      // The right eye runs a quarter turn behind the left: when they come
      // closest across, one is high and the other low, so they never touch
      // (worked out: from about 75° behind they stay apart; 90° leaves room).
      const b = a + Math.PI / 2;
      shiftEye(f, 'left', Math.cos(a) * r, Math.sin(a) * r * 1.6); shiftEye(f, 'right', Math.cos(-b + Math.PI) * r, Math.sin(-b + Math.PI) * r * 1.6);
      scaleEye(f, 'left', 1 + s); scaleEye(f, 'right', 1 - s); } },
  // The head tilts (the old 歪头 move, for depth); at the top of the tilt the
  // right eye narrows to a slit and opens again, a wink.
  // The eye starts closing during the tilt and is shut just as the tilt arrives.
  // No hold: tilt, wink, and straight back, settling with a little spring.
  wink: { zh: '挤眼', ms: WINK_MS, eyes: [[0, IDLE, 200]],
    motion: t => { const k = winkTilt(t); return { roll: 13 * k, yaw: 6 * k, gy: -.25 * Math.max(0, k), gx: .15 * Math.max(0, k) }; },
    // The blink keeps its own pace (not the head's), see winkLid.
    post: (f, t, ms, fade = 1) => { const k = winkLid(ms) * fade; if (k > 0) squintEye(f, 'right', k); } },
  // Starts from normal eyes and pose. While it looks up to the left, chin
  // rising, the eyes narrow into the smug shape; then up to the right with the
  // head turning right, back to the left, and home. Eyes as high as thinking.
  smug: { zh: '得意', ms: 4800, flatTurn: { shift: .45, near: .003, far: .002, widthOnly: true }, eyes: [[.04, P.smug, 1000], [.86, IDLE, 360]],
    motion: t => { const k = ease(clamp((t - .04) / .24, 0, 1)) * (1 - ease(clamp((t - .84) / .12, 0, 1)));
      const [gx, gy] = path(t, [[0, 0, 0], [.04, 0, 0], [.28, -.4, -1], [.38, -.4, -1], [.56, .4, -1], [.64, .4, -1], [.78, -.4, -1], [.84, -.4, -1], [.96, 0, 0], [1, 0, 0]]);
      return { pitch: 9 * k, roll: 5 * k * -gx / .4, y: -2 * k, gx, gy, yaw: 8 * gx / .4 * k }; } },
};

// Tilt in, then straight back with a small springy overshoot (no hold).
// Anticipation first: a tilt the other way (WINK_ANTI_K of the move: 0.35 ≈
// 4.5°, over ~200 ms), then the tilt itself.
const WINK_ANTI = .12, WINK_ANTI_K = 9 / 13; // 9° the other way, ~260 ms
// The wind-up eases in and out on a sine (soft start, soft stop), not a hard push.
const sineInOut = u => (1 - Math.cos(Math.PI * u)) / 2;
const winkTilt = t => { if (t < WINK_ANTI) return -WINK_ANTI_K * sineInOut(t / WINK_ANTI); if (t < .38) return -WINK_ANTI_K + (1 + WINK_ANTI_K) * ease((t - WINK_ANTI) / (.38 - WINK_ANTI)); const u = (t - .38) / .62; return Math.exp(-4 * u) * Math.cos(u * 2.6 * Math.PI) * (1 - u); };
// 低头看 (ms): down 0–450, pause, left 1000–1200, pause, right 2000–2250, pause,
// middle 3050–3250, pause, back up 3850–4350.
const DOWN_KEYS = [[0, 0, 0], [1000, 0, 0], [1200, -.75, 0], [2000, -.75, 0], [2250, .75, 0], [3050, .75, 0], [3250, 0, 0], [4400, 0, 0]];
const downK = ms => ease(clamp(ms / 450, 0, 1)) * (1 - ease(clamp((ms - 3850) / 500, 0, 1)));
const bow = t => t < .38 ? ease(t / .38) : t < .52 ? 1 : 1 - ease(clamp((t - .52) / .36, 0, 1)); // hold ≈ 300 ms
const thinkPath = ms => path(ms, [[0, 0, 0], [320, -.75, -.7], [1500, -.75, -.7], [2950, .75, -.7], [4400, -.75, -.7], [4900, 0, 0]]);
function squashEye(f, side, s) { const b = f.shadowRoot.getElementById(side + 'Base'); if (b) b.setAttribute('ry', (+b.getAttribute('ry') * s).toFixed(2)); }
// Flat face only: a head turn faked in 2D. The eyes slide with the turn a bit
// further than the head outline, and the eye on the side turned to narrows.
function flatTurn(f, yaw, { shift = .45, near: kn = .012, far: kf = .007, widthOnly = false } = {}) {
  if (!yaw) return; const dx = yaw * shift; shiftEye(f, 'left', dx, 0); shiftEye(f, 'right', dx, 0);
  const a = Math.abs(yaw), near = yaw > 0 ? 'right' : 'left', far = yaw > 0 ? 'left' : 'right';
  const size = widthOnly ? widenEye : scaleEye;
  size(f, near, 1 - a * kn); size(f, far, 1 + a * kf);
}

// Gaze along keyframes [t, x, y], eased between them.
function path(t, keys) {
  for (let i = 1; i < keys.length; i++) {
    const [t1, x1, y1] = keys[i];
    if (t <= t1) { const [t0, x0, y0] = keys[i - 1], u = ease(clamp((t - t0) / (t1 - t0 || 1), 0, 1)); return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u]; }
  }
  const last = keys[keys.length - 1]; return [last[1], last[2]];
}
function widenEye(f, side, s) { const b = f.shadowRoot.getElementById(side + 'Base'); if (b) b.setAttribute('rx', (+b.getAttribute('rx') * s).toFixed(2)); }
function scaleEye(f, side, s) {
  const b = f.shadowRoot.getElementById(side + 'Base'); if (!b) return;
  b.setAttribute('rx', (+b.getAttribute('rx') * s).toFixed(2)); b.setAttribute('ry', (+b.getAttribute('ry') * s).toFixed(2));
}
// Narrow one eye with both lids towards its middle (k 0..1), leaving a slit
// a few units tall; with rounded eyes on, the slit becomes a capsule.
function squintEye(f, side, k, gap = 3.2) {
  const r = f.shadowRoot, top = r.getElementById(side + 'Top'), bottom = r.getElementById(side + 'Bottom'), b = r.getElementById(side + 'Base'); if (!top || !bottom || !b) return;
  const cy = +b.getAttribute('cy') || 0;
  const tY = -36 + (cy - gap - -36) * k, bY = 36 + (cy + gap - 36) * k;
  top.setAttribute('y', (tY - 90).toFixed(2)); top.setAttribute('height', '90'); top.setAttribute('transform', `rotate(0 0 ${tY.toFixed(2)})`);
  bottom.setAttribute('y', bY.toFixed(2)); bottom.setAttribute('height', '90'); bottom.setAttribute('transform', `rotate(0 0 ${bY.toFixed(2)})`);
}

// Per-eye helpers on an official face's live SVG (run right after its draw).
function lidDown(f, side, amount) {
  if (amount <= 0) return; const r = f.shadowRoot, top = r.getElementById(side + 'Top'); if (!top) return;
  const y = +top.getAttribute('y') + 90 + amount; // new lid edge
  top.setAttribute('y', (y - 90).toFixed(2)); top.setAttribute('transform', `rotate(0 0 ${y.toFixed(2)})`);
}
function squeezeEye(f, side, k) {
  if (k <= 0) return; const b = f.shadowRoot.getElementById(side + 'Base'); if (!b) return;
  const ry = +b.getAttribute('ry'); b.setAttribute('ry', Math.max(1.3, ry * (1 - k)).toFixed(2));
}
function shiftEye(f, side, dx, dy) {
  const g = f.shadowRoot.getElementById(side + 'Eye'), m = /translate\(([-\d.]+)[ ,]+([-\d.]+)\)/.exec(g?.getAttribute('transform') || ''); if (!m) return;
  if (!dx && !dy) return;
  // Only the leading position moves; any tilt or size after it is kept.
  g.setAttribute('transform', g.getAttribute('transform').replace(m[0], `translate(${(+m[1] + dx).toFixed(2)} ${(+m[2] + dy).toFixed(2)})`));
}

// End whatever official action a face is still running (heart, reels,
// waiting, inspect scan, wary, bored, sleep...), the way the official reset
// does, but quietly and without snapping the eyes back.
export function endOfficialAction(f) {
  const prevNotify = f._runtimeResetNotify; f._runtimeResetNotify = false;
  try { f._resetExtensionEffects?.(); } finally { f._runtimeResetNotify = prevNotify; }
  f._inputWanted = false; f._sleeping = false; f._boredRoutine = null; f._boredLookSpeed = null;
  ++f._transitionToken; f._cancelPendingWaits?.();
}

// The same switching rule as the official actions: whatever is playing stops
// at once and eases back to rest (eyes 140 ms, head 220 ms), there is a short
// pause, and only then does the next expression begin. From rest it starts
// straight away.
const SETTLE_MS = 180 + 240, RELEASE_MS = 220;
const scaled = (m, k) => ({ ...m, x: (m.x || 0) * k, y: (m.y || 0) * k, roll: (m.roll || 0) * k, yaw: (m.yaw || 0) * k, pitch: (m.pitch || 0) * k,
  gx: (m.gx || 0) * k, gy: (m.gy || 0) * k, sx: 1 + ((m.sx ?? 1) - 1) * k, sy: 1 + ((m.sy ?? 1) - 1) * k });

function createPlayer(face) {
  const flat = face, brains = () => [], busy = () => false;
  let cur = null; // { name, def, start, stage } (start may lie ahead: settling first)
  let rel = null; // { from: Map(face → last motion), start } head easing back to rest
  const last = new Map();
  const faces = () => [flat, ...brains()];
  // The 3D view turns the head for real; the flat face fakes the turn in 2D.
  const is3d = f => !!f._view3d;
  // This face's head and gaze right now: the running expression, or the
  // last one easing out, or nothing.
  function motionNow(f, now) {
    if (cur && now >= cur.start) { const ms = now - cur.start, t = clamp(ms / cur.def.ms, 0, 1); return cur.def.motion?.(t, ms, !is3d(f)) || {}; }
    if (rel) { const u = clamp((now - rel.start) / RELEASE_MS, 0, 1); if (u < 1 && rel.from.has(f)) return scaled(rel.from.get(f), 1 - ease(u)); }
    return null;
  }
  // Per-eye touches and gaze, applied after each draw of every face.
  function afterDraw(f, now) {
    {
      const m = motionNow(f, now); if (!m) return;
      if (!is3d(f)) flatTurn(f, m.yaw || 0, (cur || rel)?.def?.flatTurn);
      if (m.gx || m.gy) { shiftEye(f, 'left', (m.gx || 0) * 20, (m.gy || 0) * 14); shiftEye(f, 'right', (m.gx || 0) * 20, (m.gy || 0) * 14); }
      if (cur && now >= cur.start) { const ms = now - cur.start; cur.def.post?.(f, clamp(ms / cur.def.ms, 0, 1), ms, 1, cur.opts); }
      // Cut short: its own eye touches (lowered eyes, squints, circles) fade
      // out with the head, frozen at the moment it was stopped.
      else if (rel) { const u = clamp((now - rel.start) / RELEASE_MS, 0, 1); if (u < 1) rel.def.post?.(f, rel.t, rel.ms, 1 - ease(u), rel.opts); }
    }
  }
  function headTransform(m, flatFace) {
    let { x = 0, y = 0, roll = 0, sx = 1, sy = 1 } = m;
    if (flatFace && !m.keepShape && !m.headStill) {
      // No real 3D turn on the flat face: slide and narrow instead.
      const yaw = m.yaw || 0, pitch = m.pitch || 0;
      x += yaw * .22; y += -pitch * .22; if (!m.keepSize) { sx *= 1 - Math.abs(yaw) * .0035; sy *= 1 - Math.abs(pitch) * .0035; }
    }
    return `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${roll.toFixed(2)}deg) scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`;
  }
  function play(name, opts = {}) {
    const def = NEW_FX[name]; if (!def) return;
    const now = performance.now();
    // Leaving the typing cursor: the eyes need their slide back apart (360 ms,
    // the core's CURSOR_MS) before the usual pause.
    const fromCursor = faces().some(f => (f._center ?? 0) > 0.01);
    const wasBusy = !!cur || !!rel || busy() || faces().some(f => f._state !== 'idle' || f._voiceFx || f._voiceExit || f._headMotion.style.transform || f._boredRoutine || f._waitingFx || JSON.stringify(f._toPose) !== JSON.stringify(IDLE));
    if (cur) finish(true);
    for (const f of faces()) {
      f.noteActivity?.();
      // Otherwise the old action's own drawing goes on over the new one.
      // Ending the other action would snap the gaze to the middle; it eases there instead.
      const look = { ...f._look };
      endOfficialAction(f);
      Object.assign(f._look, look);
      f._eyeBob = f._eyeNod = f._angryEyeDrop = f._surpriseShake = null;
      if (f._eyeMicro) f._eyeMicro.lX = f._eyeMicro.lY = f._eyeMicro.rX = f._eyeMicro.rY = 0;
      if (f._wanderTarget) f._wanderTarget.x = f._wanderTarget.y = 0;
      // The gaze is not zeroed here: with the lock on it eases back to the middle.
      // The flat face locks its gaze; the 3D brains must not, or the 3D turn
      // would be straightened (their gaze is centred by the page anyway).
      // Gaze held still on every view, or the idle glances and the pointer
      // would move the eyes in the middle of the expression (3D turns the head
      // from the expression's own pose, with the lock lifted just for that).
      f._expressionLock = true; f._headCenteringUntil = 0;
      // Eyes ease back to normal (like the official 140 ms), not a jump.
      if (f._state !== 'idle') f.setState('idle', { duration: 140, notify: false, keepGazeLock: true });
      else if (JSON.stringify(f._toPose) !== JSON.stringify(IDLE)) f._startMorph(IDLE, 140, outQuint);
      f._nextBlinkAt = Infinity;
      const hm = f._headMotion; hm.getAnimations?.().forEach(a => a.cancel());
      hm.style.transformBox = 'view-box'; hm.style.transformOrigin = '120px 128px';
    }
    // Handed straight over from the voice kit's centre circle (a designed
    // transition): the kit's own exit is dropped, the expression takes the
    // circle as it is.
    if (opts.fromCenter) for (const f of faces()) { f._voiceExit = null; f._voiceShown = null; }
    let done; const finished = new Promise(r => { done = r; });
    cur = { name, def, opts, start: now + (wasBusy && !opts.direct ? (fromCursor ? 360 + 240 : SETTLE_MS) : 0), stage: 0, done };
    return finished;
  }
  function finish(quick) {
    const was = cur; cur = null; if (!was) return;
    was.done?.();
    const now = performance.now();
    // The head eases back from wherever it was (never a jump).
    const released = quick && now >= was.start;
    if (released) { const ms = now - was.start; rel = { from: new Map(last), start: now, def: was.def, opts: was.opts, ms, t: clamp(ms / was.def.ms, 0, 1) }; }
    // Anything the expression left on the eyes is removed (now, or once its
    // fade-out ends).
    if (!released) for (const f of faces()) was.def.cleanup?.(f);
    for (const f of faces()) {
      if (!released) f._headMotion.style.transform = '';
      f._nextBlinkAt = performance.now() + 700 + Math.random() * 1500;
      const away = JSON.stringify(f._toPose) !== JSON.stringify(IDLE);
      // Cut short by another button: the eyes still head back to normal and the
      // gaze is freed, or an action that keeps the current eye shape (affirm,
      // a nod...) would keep this expression's eyes for good.
      if (quick) { if (f._state !== 'idle') f.setState('idle', { duration: 220, notify: false, keepGazeLock: true }); else if (away) f._startMorph(IDLE, 220, outQuint); f._expressionLock = false; continue; }
      if (away) f._returnToIdle?.(300); else f._releaseExpressionLock?.();
    }
  }
  let raf = 0;
  const wake = () => { if (!raf) raf = requestAnimationFrame(tick); };
  function tick(now) {
    raf = 0;
    if (cur || rel) raf = requestAnimationFrame(tick);
    if (rel && now - rel.start >= RELEASE_MS) { for (const f of faces()) rel.def.cleanup?.(f); rel = null; if (!cur || now < cur.start) for (const f of faces()) f._headMotion.style.transform = ''; }
    if (!cur && !rel) return;
    if (cur && now >= cur.start) {
      const ms = now - cur.start, t = clamp(ms / cur.def.ms, 0, 1);
      const stages = cur.def.eyes || [];
      while (cur.stage < stages.length && t >= stages[cur.stage][0]) { const [, pose, d, curve = outQuint] = stages[cur.stage++]; for (const f of faces()) { if (pose.state) { f.setState(pose.state, { duration: d, notify: false, keepGazeLock: true }); if (pose.pose) f._startMorph(pose.pose, d, curve); } else f._startMorph(pose, d, curve); } }
    }
    for (const f of faces()) {
      const m = motionNow(f, now);
      if (m) { if (cur && now >= cur.start) last.set(f, m); f._headMotion.style.transform = headTransform(m, !is3d(f)); }
      f._resumeFrames?.();
    }
    if (cur && now >= cur.start && now - cur.start >= cur.def.ms) finish(false);
  }
  return {
    afterDraw,
    play: (name, opts) => { const p = play(name, opts); wake(); return p; },
    stop: (gentle = false) => { finish(!gentle); wake(); },
    get active() { return cur?.name || null; },
    // The 3D faces' turn while an expression runs (or eases out), blended
    // over the pointer pose.
    pose3d(pose) {
      const now = performance.now(), f = flat;
      let m = null, w = 0;
      if (cur && now >= cur.start) { const ms = now - cur.start, t = clamp(ms / cur.def.ms, 0, 1); m = cur.def.motion?.(t, ms) || {}; w = env(t, .1, .14); }
      else if (rel) { const u = clamp((now - rel.start) / RELEASE_MS, 0, 1), k = 1 - ease(u); const from = rel.from.get(f); if (from) { m = scaled(from, k); w = k; } }
      if (!m) return pose;
      return { yaw: pose.yaw * (1 - w) + (m.yaw || 0), pitch: pose.pitch * (1 - w) + (m.pitch || 0), gazeX: pose.gazeX * (1 - w), gazeY: pose.gazeY * (1 - w) };
    },
  };
}

// Public action names → definitions.
const ACTIONS = {
  bow: 'nod', shake: 'shake', observe: 'lean', think: 'think', ponder: 'lookDown',
  'shape-wait': 'morph', bounce: 'bounce', 'smug-bounce': 'smugBounce', dizzy: 'dizzy', wink: 'wink', smug: 'smug',
};
const players = new WeakMap();
const playerOf = f => { let p = players.get(f); if (!p) players.set(f, p = createPlayer(f)); return p; };
const NAMES = new Set(Object.keys(ACTIONS));

registerAvatarExtension({
  name: 'new-expressions',
  actions: Object.fromEntries(Object.entries(ACTIONS).map(([action, key]) => [action, function() { return playerOf(this).play(key); }])),
  // Any other action ends ours first (eased back, never a jump).
  beforePlay(action) { if (!NAMES.has(action)) players.get(this)?.stop(); },
  reset() { players.get(this)?.stop(); },
  draw(now) { players.get(this)?.afterDraw(this, now); },
});

// For the 3D view: the head turn of whatever new expression is playing.
export function newExpressionPose(face, pose) { const p = players.get(face); return p ? p.pose3d(pose) : pose; }
export const NEW_EXPRESSIONS = Object.freeze(Object.keys(ACTIONS));
