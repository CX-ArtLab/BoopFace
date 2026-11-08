import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';

// Voice conversation: listening to the user and speaking a reply. Both loop
// like waiting until another action starts. setVoiceLevel(0..1) feeds the
// current loudness; without it, speaking keeps a speech-like rhythm of its own
// and listening just holds its attentive pose.

const VARIANTS = Object.freeze({
  listening: ['lean', 'tilt'],
  speaking: ['bounce', 'nod', 'bars'],
});
const ROUND = 2600;      // play('listening') / play('speaking') run one round
const LEVEL_FRESH = 260; // a level older than this falls back to the own rhythm
const proto = BoopFace.prototype;

const clamp01 = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp01(value); return t * t * (3 - 2 * t); };

function reducedMotion(instance) {
  const motion = String(instance.getAttribute('motion') || 'auto').trim().toLowerCase();
  if (motion === 'reduce') return true;
  if (motion === 'full') return false;
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// A speech-like loudness: syllables about four times a second, swelling
// phrases and a short pause between them.
function speechRhythm(ms) {
  const s = ms / 1000;
  const syllable = Math.max(0, Math.sin(s * Math.PI * 2 * 4.1 + 0.9 * Math.sin(s * 2.3)));
  const phrase = 0.55 + 0.45 * Math.sin(s * Math.PI * 2 * 0.37);
  const inPause = (ms % 2900) > 2350;
  return inPause ? 0 : Math.pow(syllable, 0.8) * phrase;
}

function dispatchVoiceState(instance, state) {
  instance.dispatchEvent(new CustomEvent('face-state', { detail: { state } }));
}

function resolveVariant(mode, options) {
  const variant = options?.variant ?? VARIANTS[mode][0];
  if (!VARIANTS[mode].includes(variant)) {
    throw new TypeError(`Unknown ${mode} variant: ${variant}. Use ${VARIANTS[mode].join(', ')}.`);
  }
  return variant;
}

async function enterVoice(instance, mode, continuous, options) {
  const variant = resolveVariant(mode, options);
  instance.noteActivity();
  const fx = instance._voiceFx;
  if (continuous && fx?.continuous && fx.mode === mode && fx.variant === variant) return instance._transitionToken;
  instance._inputWanted = false;
  instance.reset();
  instance._voiceRequested = mode;
  if (!(await instance._prepareExpression({ normalizePose: true, duration: 120, pause: 0 }))) return null;
  if (instance._voiceRequested !== mode) return null;
  const token = instance._transitionToken;
  instance._expressionLock = true;
  instance._look.x = 0;
  instance._look.y = 0;
  const now = performance.now();
  instance._voiceFx = { mode, variant, continuous, start: now, last: now, level: 0, left: 0, right: 0 };
  dispatchVoiceState(instance, mode);
  return token;
}

async function voiceRound(instance, mode, options) {
  const token = await enterVoice(instance, mode, false, options);
  if (token == null) return;
  await instance._wait(ROUND);
  if (token !== instance._transitionToken || instance._voiceFx?.mode !== mode) return;
  clearVoice(instance);
  instance._releaseExpressionLock();
  dispatchVoiceState(instance, 'idle');
}

function clearVoice(instance) {
  instance._voiceRequested = null;
  instance._voiceFx = null;
  if (instance._voiceHeadApplied && instance._headMotion) {
    instance._headMotion.style.transform = '';
    instance._voiceHeadApplied = false;
  }
}

proto.startListening = async function(options = {}) {
  await enterVoice(this, 'listening', true, options);
  return this;
};

proto.startSpeaking = async function(options = {}) {
  await enterVoice(this, 'speaking', true, options);
  return this;
};

// Current loudness, 0 (silent) to 1 (loud). Call it as often as you like, for
// example once per animation frame from an audio analyser.
proto.setVoiceLevel = function(level) {
  const value = Number(level);
  this._voiceLevel = Number.isFinite(value) ? clamp01(value) : 0;
  this._voiceLevelAt = performance.now();
  if (this._voiceFx) this._resumeFrames?.();
  return this;
};

function readTranslate(eye) {
  const match = (eye?.getAttribute('transform') || '').match(/translate\(\s*(-?[\d.]+)\s+(-?[\d.]+)\s*\)/);
  return match ? [Number(match[1]), Number(match[2])] : [0, 126];
}

function setEye(eye, dy, scaleX, scaleY) {
  if (!eye) return;
  const [x, y] = readTranslate(eye);
  eye.setAttribute('transform', `translate(${x.toFixed(2)} ${(y + dy).toFixed(2)}) scale(${scaleX.toFixed(4)} ${scaleY.toFixed(4)})`);
}

function setHead(instance, transform) {
  if (!instance._headMotion) return;
  if (instance._headMotion.getAnimations?.().length) return;
  instance._headMotion.style.transformBox = 'view-box';
  instance._headMotion.style.transformOrigin = '120px 120px';
  instance._headMotion.style.transform = transform;
  instance._voiceHeadApplied = true;
}

function drawVoice(now) {
  const fx = this._voiceFx;
  if (!fx) return;
  const reduced = reducedMotion(this);
  const dt = Math.min(100, Math.max(0, now - fx.last));
  fx.last = now;
  const elapsed = Math.max(0, now - fx.start);
  const enter = reduced ? 1 : smooth(elapsed / 260);

  // Blinks keep coming while the face holds still for a voice.
  if (!this._blinkAnim && now >= this._nextBlinkAt && fx.variant !== 'bars') {
    this._blinkAnim = { start: now, duration: 150 + Math.random() * 70 };
  }

  const fresh = now - (this._voiceLevelAt ?? -Infinity) < LEVEL_FRESH;
  let target = 0;
  if (reduced) target = fx.mode === 'speaking' ? 0.35 : 0;
  else if (fresh) target = this._voiceLevel ?? 0;
  else if (fx.mode === 'speaking') target = speechRhythm(elapsed);
  // Fast attack, slower release, like a VU meter.
  const tau = target > fx.level ? 45 : 140;
  fx.level += (target - fx.level) * (1 - Math.exp(-dt / tau));
  const level = reduced ? target : fx.level;
  const breath = reduced ? 0 : Math.sin(elapsed / 2800 * Math.PI * 2);

  if (fx.mode === 'listening') {
    if (fx.variant === 'lean') {
      // Leans in towards the speaker; the eyes open a little more with each sound.
      setHead(this, `translateY(${(3 * enter).toFixed(2)}px) scale(${(1 + 0.025 * enter).toFixed(4)})`);
      const scale = 1 + (0.05 + 0.012 * breath) * enter + 0.11 * level;
      setEye(this._leftEye, 1.5 * enter, scale, scale);
      setEye(this._rightEye, 1.5 * enter, scale, scale);
    } else {
      // Tilts the head like turning an ear; sound gives a small lift.
      setHead(this, `rotate(${(-6.5 * enter).toFixed(2)}deg) translateY(${(1.5 * enter).toFixed(2)}px)`);
      const scale = 1 + (0.03 + 0.01 * breath) * enter + 0.08 * level;
      setEye(this._leftEye, -3 * level, scale, scale);
      setEye(this._rightEye, -3 * level, scale, scale);
    }
    return;
  }

  if (fx.variant === 'bounce') {
    // Each syllable makes the eyes hop.
    setEye(this._leftEye, -9 * level, 1 - 0.05 * level, 1 + 0.12 * level);
    setEye(this._rightEye, -9 * level, 1 - 0.05 * level, 1 + 0.12 * level);
  } else if (fx.variant === 'nod') {
    // The head nods along and the eyes narrow with the stress of each word.
    setHead(this, `translateY(${(4.2 * level).toFixed(2)}px)`);
    setEye(this._leftEye, 1.5 * level, 1 + 0.03 * level, 1 - 0.3 * level);
    setEye(this._rightEye, 1.5 * level, 1 + 0.03 * level, 1 - 0.3 * level);
  } else {
    // The eyes become two bars that move like a sound meter.
    const wobble = reduced ? 0 : 1;
    const left = level * (0.86 + 0.14 * Math.cos(elapsed / 131) * wobble);
    const right = level * (0.86 + 0.14 * Math.sin(elapsed / 97) * wobble);
    for (const [base, value] of [[this._leftBase, left], [this._rightBase, right]]) {
      if (!base) continue;
      base.setAttribute('rx', (27 + (8 - 27) * enter).toFixed(2));
      base.setAttribute('ry', (29 + (10 + 25 * value - 29) * enter).toFixed(2));
    }
  }
}

registerAvatarExtension({
  name: 'voice',
  actions: {
    listening() { return voiceRound(this, 'listening'); },
    'listening-lean'() { return voiceRound(this, 'listening', { variant: 'lean' }); },
    'listening-tilt'() { return voiceRound(this, 'listening', { variant: 'tilt' }); },
    speaking() { return voiceRound(this, 'speaking'); },
    'speaking-bounce'() { return voiceRound(this, 'speaking', { variant: 'bounce' }); },
    'speaking-nod'() { return voiceRound(this, 'speaking', { variant: 'nod' }); },
    'speaking-bars'() { return voiceRound(this, 'speaking', { variant: 'bars' }); },
  },
  beforePlay(action) {
    if (/^(listening|speaking)(-|$)/.test(action)) return;
    clearVoice(this);
  },
  reset() {
    clearVoice(this);
  },
  draw: drawVoice,
});

export { BoopFace, VARIANTS as VOICE_VARIANTS };
export default BoopFace;
