import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';

// Voice conversation, as one set of three steps:
//   listening: both eyes merge into one round eye that swells with the voice;
//   thinking:  any waiting style; the bloom (two crossed ovals that breathe
//              and turn) is made for the set and morphs straight out of the
//              listening eye. It is startWaiting({ variant: 'bloom' });
//   speaking:  the eyes split back and stretch with the reply, low sounds in
//              the left eye and high sounds in the right.
// Each one loops until the next action. Moving between them morphs the eyes;
// speaking only starts once the eyes have split and settled.
// setVoiceLevel() feeds the loudness. Without it, speaking keeps a rhythm of
// its own, and listening holds still.

const SET = Object.freeze({
  listen: { size: 93, x: 120, y: 121, pulse: 19, tempo: 1.5 },
  think: { size: 111, x: 120, y: 121, rotation: 57, angle: 0, thin: 54.8, thick: 75.4, period: 4, horizontal: 100, vertical: 100, verticalThickness: 100, phase: 38 },
});
// The standard eyes, in the 240 x 240 avatar space.
const NEUTRAL = Object.freeze([
  Object.freeze({ x: 86.03, y: 126, rx: 26.97, ry: 28.99 }),
  Object.freeze({ x: 153.97, y: 126, rx: 26.97, ry: 28.99 }),
]);
const MERGE = 420;   // into the round listening eye
const MORPH = 420;   // into the thinking bloom
const SPLIT = 640;   // back to two eyes before speaking
const SETTLE = 140;  // still eyes before the reply starts moving them
const EXIT = 260;    // back to the normal face
const LEVEL_FRESH = 260;
const ROUNDS = Object.freeze({ listening: 2600, thinking: 3600, speaking: 2600 });
const KEYS = ['x', 'y', 'rx', 'ry', 'capX', 'capY', 'angle'];
const OWN_ACTIONS = ['listening', 'speaking', 'waiting-bloom', 'waiting-cross'];
const proto = BoopFace.prototype;

const clamp01 = value => Math.max(0, Math.min(1, value));
const mix = (a, b, t) => a + (b - a) * t;
const smootherstep = t => { const x = clamp01(t); return x * x * x * (x * (x * 6 - 15) + 10); };
const neutralPose = index => ({ ...NEUTRAL[index], capX: NEUTRAL[index].rx, capY: NEUTRAL[index].ry, angle: 0 });

function reducedMotion(instance) {
  const motion = String(instance.getAttribute('motion') || 'auto').trim().toLowerCase();
  if (motion === 'reduce') return true;
  if (motion === 'full') return false;
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Interpolates two eye poses; an oval looks the same after half a turn, so the
// angle takes the shorter way back to upright.
function between(from, to, t) {
  const ease = smootherstep(t);
  const angle = ((from.angle + 90) % 180 + 180) % 180 - 90;
  const out = {};
  for (const key of KEYS) out[key] = mix(key === 'angle' ? angle : from[key], to[key], ease);
  return out;
}

// A speech-like loudness for each eye: syllables about four times a second,
// swelling phrases and short pauses.
function speechRhythm(ms, offset) {
  const s = ms / 1000 + offset;
  const syllable = Math.max(0, Math.sin(s * Math.PI * 2 * 4.1 + 0.9 * Math.sin(s * 2.3)));
  const phrase = 0.55 + 0.45 * Math.sin(s * Math.PI * 2 * 0.37);
  return (ms % 2900) > 2350 ? 0 : Math.pow(syllable, 0.8) * phrase;
}

// The cross wait: the bloom's two ovals resting on the ×, turning a quarter at
// a time (each step easing in and out, so it pauses on every ×), and every
// turn swaps full and slim ovals.
const CROSS = Object.freeze({ step: 850, long: 55.5, thin: 0.548, full: 0.754 });
const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function crossPoses(fx, now) {
  const p = SET.think, ms = fx.reduced ? 0 : Math.max(0, now - fx.modeStart);
  const n = Math.floor(ms / CROSS.step), u = easeInOut((ms % CROSS.step) / CROSS.step);
  const angle = ((45 + 90 * n + 90 * u + 180) % 360 + 360) % 360 - 180;
  const slim = n % 2 ? 1 - u : u, short = CROSS.long * (CROSS.full + (CROSS.thin - CROSS.full) * slim);
  return [0, 1].map(i => {
    const rx = i === 0 ? CROSS.long : short, ry = i === 0 ? short : CROSS.long;
    return { x: p.x, y: p.y, rx, ry, capX: rx, capY: ry, angle };
  });
}

function targetPoses(fx, now) {
  const [all, low, high] = fx.levels;
  if (fx.mode === 'listening') {
    const r = (SET.listen.size + SET.listen.pulse * all) / 2;
    const pose = { x: SET.listen.x, y: SET.listen.y, rx: r, ry: r, capX: r, capY: r, angle: 0 };
    return [pose, { ...pose }];
  }
  if (fx.mode === 'thinking' && fx.style === 'cross') return crossPoses(fx, now);
  if (fx.mode === 'thinking') {
    const p = SET.think;
    const time = fx.reduced ? p.period / 4 : (now - fx.modeStart) / 1000;
    const phase = time * 2 * Math.PI / p.period;
    const rotation = fx.reduced ? 0 : (time * p.rotation) % 360;
    return [0, 1].map(i => {
      const breath = (1 - Math.cos(phase + i * p.phase * Math.PI / 180)) / 2;
      const long = p.size / 2 * (i === 0 ? p.horizontal : p.vertical) / 100;
      const short = long * Math.max(0.1, Math.min(1, mix(p.thin, p.thick, breath) / 100 * (i === 0 ? 1 : p.verticalThickness / 100)));
      const rx = i === 0 ? long : short;
      const ry = i === 0 ? short : long;
      return { x: p.x, y: p.y, rx, ry, capX: rx, capY: ry, angle: ((rotation + p.angle + 180) % 360 + 360) % 360 - 180 };
    });
  }
  // Speaking keeps the standard width and rounded ends and only grows taller.
  return [low, high].map((level, i) => {
    const base = neutralPose(i);
    return { ...base, ry: base.ry + 27 * Math.min(0.48, 0.44 * Math.tanh(level * 1.65)) };
  });
}

function shownPoses(instance) {
  return instance._voiceShown?.map(pose => ({ ...pose })) || [neutralPose(0), neutralPose(1)];
}

// The bloom is a waiting style, so it reports itself as waiting.
function dispatchVoiceState(instance, state) {
  instance.dispatchEvent(new CustomEvent('face-state', { detail: { state: state === 'thinking' ? 'waiting' : state } }));
}

// Starts a voice mode. From another voice mode the eyes morph in place; from
// any other expression the face settles first.
async function enterVoice(instance, mode, continuous, style = 'bloom') {
  instance.noteActivity();
  const fx = instance._voiceFx;
  if (fx && fx.mode === mode && fx.continuous && continuous && (fx.style || 'bloom') === style) return instance._transitionToken;
  if (fx) {
    // Same face, next step of the conversation: no reset in between.
    ++instance._transitionToken;
    instance._cancelPendingWaits?.();
  } else {
    instance._inputWanted = false;
    instance.reset();
    instance._voiceRequested = mode;
    if (!(await instance._prepareExpression({ normalizePose: true, duration: 120, pause: 0 }))) return null;
    if (instance._voiceRequested !== mode) return null;
    // Coming straight back from the set: start where the eyes are right now.
    instance._voiceShown = instance._voiceExit ? currentExitPoses(instance, performance.now()) : null;
  }
  const token = instance._transitionToken;
  const start = performance.now();
  instance._expressionLock = true;
  instance._look.x = 0;
  instance._look.y = 0;
  instance._voiceRequested = mode;
  const previous = instance._voiceFx;
  instance._voiceFx = {
    mode,
    continuous,
    style,
    start: previous?.start ?? start,
    modeStart: start,
    last: start,
    reduced: reducedMotion(instance),
    levels: previous?.levels ? [...previous.levels] : [0, 0, 0],
    transition: {
      from: shownPoses(instance),
      start,
      duration: mode === 'listening' ? MERGE : mode === 'thinking' ? MORPH : SPLIT,
      settle: mode === 'speaking' ? SETTLE : 0,
      split: mode === 'speaking',
    },
  };
  instance._voiceExit = null;
  dispatchVoiceState(instance, mode);
  return token;
}

async function voiceRound(instance, mode, style) {
  const token = await enterVoice(instance, mode, false, style);
  if (token == null) return;
  const fx = instance._voiceFx;
  const lead = fx?.transition ? fx.transition.duration + fx.transition.settle : 0;
  await instance._wait(lead + ROUNDS[mode]);
  if (token !== instance._transitionToken || instance._voiceFx?.mode !== mode) return;
  clearVoice(instance);
  instance._releaseExpressionLock();
  dispatchVoiceState(instance, 'idle');
}

function clearVoice(instance) {
  if (instance._voiceFx && instance._voiceShown) {
    instance._voiceExit = { from: shownPoses(instance), start: performance.now() };
  }
  instance._voiceRequested = null;
  instance._voiceFx = null;
}

function currentExitPoses(instance, now) {
  const exit = instance._voiceExit;
  const t = clamp01((now - exit.start) / EXIT);
  return exit.from.map((pose, i) => between(pose, neutralPose(i), t));
}

proto.startListening = async function() {
  await enterVoice(this, 'listening', true);
  return this;
};

// Used by startWaiting({ variant: 'bloom' }) and ({ variant: 'cross' }).
proto._startBloom = async function(style = 'bloom') {
  await enterVoice(this, 'thinking', true, style === 'cross' ? 'cross' : 'bloom');
  return this;
};

proto.startSpeaking = async function() {
  await enterVoice(this, 'speaking', true);
  return this;
};

// Loudness from 0 (silent) to 1 (loud). A pair [low, high] drives the two eyes
// separately while speaking: low sounds the left, high sounds the right.
proto.setVoiceLevel = function(level) {
  const pair = Array.isArray(level) ? level : [level, level];
  const [low, high] = pair.map(value => (Number.isFinite(Number(value)) ? clamp01(Number(value)) : 0));
  this._voiceLevels = [Math.max(low, high), low, high];
  this._voiceLevelAt = performance.now();
  if (this._voiceFx) this._resumeFrames?.();
  return this;
};

function readEye(eye, base) {
  const transform = eye?.getAttribute('transform') || '';
  const translate = transform.match(/translate\(\s*(-?[\d.]+)[\s,]+(-?[\d.]+)\s*\)/);
  const scale = transform.match(/scale\(\s*(-?[\d.]+)(?:[\s,]+(-?[\d.]+))?\s*\)/);
  const sx = scale ? Number(scale[1]) : 1;
  const sy = scale ? Number(scale[2] ?? scale[1]) : 1;
  const rx = Number(base?.getAttribute('rx')) * sx || 0;
  const ry = Number(base?.getAttribute('ry')) * sy || 0;
  return { x: translate ? Number(translate[1]) : 120, y: (translate ? Number(translate[2]) : 126) + Number(base?.getAttribute('cy') || 0) * sy, rx, ry, capX: rx, capY: ry, angle: 0 };
}

function paint(instance, poses, hideLids) {
  const parts = [
    [instance._leftEye, instance._leftBase, instance._leftInputBase, instance._leftTop, instance._leftBottom],
    [instance._rightEye, instance._rightBase, instance._rightInputBase, instance._rightTop, instance._rightBottom],
  ];
  parts.forEach(([eye, base, shape, top, bottom], i) => {
    if (!eye || !shape) return;
    const o = poses[i];
    eye.setAttribute('transform', `translate(${o.x.toFixed(3)} ${o.y.toFixed(3)}) rotate(${o.angle.toFixed(3)})`);
    shape.setAttribute('x', (-o.rx).toFixed(3));
    shape.setAttribute('y', (-o.ry).toFixed(3));
    shape.setAttribute('width', (2 * o.rx).toFixed(3));
    shape.setAttribute('height', (2 * o.ry).toFixed(3));
    shape.setAttribute('rx', Math.min(o.rx, o.capX).toFixed(3));
    shape.setAttribute('ry', Math.min(o.ry, o.capY).toFixed(3));
    shape.setAttribute('opacity', '1');
    base?.setAttribute('opacity', '0');
    if (hideLids) {
      top?.setAttribute('y', '-500');
      top?.setAttribute('transform', '');
      bottom?.setAttribute('y', '500');
      bottom?.setAttribute('transform', '');
    }
  });
}

function drawVoice(now) {
  const fx = this._voiceFx;
  if (!fx) {
    drawExit(this, now);
    return;
  }
  const dt = Math.min(50, Math.max(0, now - fx.last)) / 1000;
  fx.last = now;
  fx.reduced = reducedMotion(this);

  const transition = fx.transition;
  const transitionTime = transition ? now - transition.start : Infinity;
  const settling = transition?.split && transitionTime < transition.duration + transition.settle;

  // Loudness: what the page feeds, or speaking's own rhythm, or silence.
  const fresh = now - (this._voiceLevelAt ?? -Infinity) < LEVEL_FRESH;
  let raw = [0, 0, 0];
  if (fx.reduced) raw = fx.mode === 'speaking' ? [0.35, 0.35, 0.35] : [0, 0, 0];
  else if (settling || fx.mode === 'thinking') raw = [0, 0, 0];
  else if (fresh) raw = this._voiceLevels || raw;
  else if (fx.mode === 'speaking') {
    const elapsed = now - fx.modeStart;
    const low = speechRhythm(elapsed, 0);
    const high = speechRhythm(elapsed, 0.11) * 0.85;
    raw = [Math.max(low, high), low, high];
  }
  const speed = fx.mode === 'listening' ? SET.listen.tempo : 1;
  fx.levels = fx.reduced ? raw : fx.levels.map((value, i) => mix(value, raw[i], 1 - Math.exp(-dt * speed / (raw[i] > value ? 0.035 : 0.09))));

  let poses = targetPoses(fx, now);
  if (transition && !fx.reduced) {
    if (transition.split) {
      if (transitionTime < transition.duration) poses = transition.from.map((pose, i) => between(pose, neutralPose(i), transitionTime / transition.duration));
      else if (transitionTime < transition.duration + transition.settle) poses = [neutralPose(0), neutralPose(1)];
      else fx.transition = null;
    } else if (transitionTime < transition.duration) {
      poses = transition.from.map((pose, i) => between(pose, poses[i], transitionTime / transition.duration));
    } else {
      fx.transition = null;
    }
  } else if (transition) {
    fx.transition = null;
  }
  this._voiceShown = poses.map(pose => ({ ...pose }));
  paint(this, poses, true);
}

// Leaving the set: the shapes ease back into whatever the face shows next.
function drawExit(instance, now) {
  const exit = instance._voiceExit;
  if (!exit) return;
  const t = (now - exit.start) / EXIT;
  if (t >= 1 || reducedMotion(instance)) {
    instance._voiceExit = null;
    instance._voiceShown = null;
    return;
  }
  const targets = [
    readEye(instance._leftEye, instance._leftBase),
    readEye(instance._rightEye, instance._rightBase),
  ];
  // Expressions drawn with the cursor shape keep their own drawing.
  if (instance._state === 'input') {
    instance._voiceExit = null;
    instance._voiceShown = null;
    return;
  }
  const poses = exit.from.map((pose, i) => between(pose, targets[i], t));
  instance._voiceShown = poses;
  // The lids stay away while the shape is still large and turned (the bloom's
  // ovals); shown too early they cut a slanted slice off it. They come back
  // for the last quarter, when the shape is nearly the next eye.
  paint(instance, poses, t < 0.75);
}

registerAvatarExtension({
  name: 'voice',
  actions: {
    listening() { return voiceRound(this, 'listening'); },
    'waiting-bloom'() { return voiceRound(this, 'thinking'); },
    'waiting-cross'() { return voiceRound(this, 'thinking', 'cross'); },
    speaking() { return voiceRound(this, 'speaking'); },
  },
  beforePlay(action) {
    if (OWN_ACTIONS.includes(action)) return;
    clearVoice(this);
  },
  reset() {
    clearVoice(this);
  },
  draw: drawVoice,
});

export { BoopFace, SET as VOICE_SETTINGS };
export default BoopFace;
