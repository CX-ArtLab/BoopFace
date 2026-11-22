// The Voice Kit's spoken turn for the Studio: real recorded lines (user and
// reply), the soft cue tone, the eyes driven by the loudness of the audio, and
// captions. Taken from the old demo's voice row, without its own buttons.
//
// createVoiceEngine({ face, sound, style, onStep, onCaption })
//   face():   the avatar to drive        sound(): is the sound on
//   style():  the thinking style ('bloom', 'cross', 'spin', 'wrap', 'wave')
//   onStep(step):  'listening' | 'thinking' | 'speaking' | null as the turn moves
//   onCaption(who, text): who 'listening' | 'thinking' | 'user' | 'reply', or null to hide
export function createVoiceEngine(opts) {
  const MERGE = 0.42, THINK = 3.6, SPLIT = 0.64 + 0.14;
  let clips = null;
  let context = null;
  let output = null;
  let turn = null;

  const clamp01 = value => Math.max(0, Math.min(1, value));
  const mix = (a, b, t) => a + (b - a) * t;

  function decodeWav(base64) {
    const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0)).buffer;
    const view = new DataView(bytes);
    const tag = at => String.fromCharCode(...new Uint8Array(bytes, at, 4));
    let channels = 1, rate = 24000, dataOffset = 0, dataLength = 0;
    for (let at = 12; at + 8 <= bytes.byteLength;) {
      const type = tag(at), size = view.getUint32(at + 4, true), body = at + 8;
      if (type === 'fmt ') { channels = view.getUint16(body + 2, true); rate = view.getUint32(body + 4, true); }
      if (type === 'data') { dataOffset = body; dataLength = Math.min(size, bytes.byteLength - body); }
      at = body + size + (size % 2);
    }
    const count = Math.floor(dataLength / (channels * 2));
    const buffer = context.createBuffer(channels, count, rate);
    for (let c = 0; c < channels; c++) {
      const samples = buffer.getChannelData(c);
      for (let n = 0; n < count; n++) samples[n] = view.getInt16(dataOffset + (n * channels + c) * 2, true) / 32768;
    }
    return buffer;
  }

  // Loudness of the clip itself, 100 times a second: all, low band, high band.
  function envelope(buffer) {
    const mono = buffer.getChannelData(0);
    const hop = Math.round(buffer.sampleRate / 100);
    const alpha = 1 - Math.exp(-2 * Math.PI * 700 / buffer.sampleRate);
    const frames = [];
    let low = 0;
    for (let start = 0; start < mono.length; start += hop) {
      let all = 0, lowSum = 0, highSum = 0, count = 0;
      for (let n = start; n < Math.min(start + hop, mono.length); n++) {
        const sample = mono[n];
        low += alpha * (sample - low);
        const high = sample - low;
        all += sample * sample; lowSum += low * low; highSum += high * high; count++;
      }
      frames.push([Math.sqrt(all / count), Math.sqrt(lowSum / count), Math.sqrt(highSum / count)]);
    }
    const scale = [0, 1, 2].map(c => Math.max(0.005, frames.map(f => f[c]).sort((a, b) => a - b)[Math.floor(frames.length * 0.95)]));
    return frames.map(frame => frame.map((value, c) => clamp01((value - 0.003) / scale[c])));
  }

  function sample(frames, seconds) {
    const f = Math.max(0, seconds * 100), n = Math.floor(f);
    if (n >= frames.length) return [0, 0, 0];
    const next = frames[Math.min(n + 1, frames.length - 1)];
    return frames[n].map((value, c) => mix(value, next[c], f - n));
  }

  // The soft cue before listening and after sending: one original low tone.
  function cueTone() {
    const rate = context.sampleRate, duration = 0.24;
    const buffer = context.createBuffer(1, Math.ceil(rate * duration), rate);
    const samples = buffer.getChannelData(0);
    const end = (samples.length - 1) / rate, attack = 0.04;
    for (let n = 0; n < samples.length; n++) {
      const t = n / rate;
      const shape = t < attack ? Math.sin(Math.PI * t / (2 * attack)) ** 2 : Math.cos(Math.PI * (t - attack) / (2 * (end - attack))) ** 2;
      samples[n] = 0.11 * shape * (Math.sin(2 * Math.PI * 392 * t) + 0.12 * Math.sin(2 * Math.PI * 588 * t)) / 1.12;
    }
    return buffer;
  }

  async function loadClips() {
    if (clips) return clips;
    const data = await import('./voice/voice-audio-data.js');
    const user = decodeWav(data.userPCM);
    const reply = decodeWav(data.replyPCM);
    cueBuffer ??= cueTone();
    clips = { user, reply, cue: cueBuffer, text: data.speechText, userLevels: envelope(user), replyLevels: envelope(reply) };
    return clips;
  }

  async function audioReady() {
    context ??= new (window.AudioContext || window.webkitAudioContext)();
    await context.resume();
    if (!output) {
      output = context.createGain();
      output.connect(context.destination);
    }
    output.gain.value = opts.sound() ? 1 : 0;
  }

  // The same soft cue marks the start of listening and of thinking.
  let cueBuffer = null;
  async function playCue() {
    if (!opts.sound()) return;
    try {
      await audioReady();
      cueBuffer ??= cueTone();
      const source = context.createBufferSource();
      source.buffer = cueBuffer;
      source.connect(output);
      source.start();
    } catch { /* no sound available */ }
  }

  function play(buffer, at) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(output);
    source.start(at);
    turn.sources.push(source);
  }


  let pretendFrame = 0;
  // Nobody talks to the demo, so while listening on its own it hears a pretend voice.
  function pretendVoice() {
    const face = opts.face(), started = performance.now();
    const tick = now => {
      if (face._voiceFx?.mode !== 'listening' || turn) { pretendFrame = 0; return; }
      const s = (now - started) / 1000;
      const syllable = Math.max(0, Math.sin(s * Math.PI * 2 * 3.8 + Math.sin(s * 1.7)));
      face.setVoiceLevel((now - started) % 3000 > 2300 ? 0 : syllable * (0.6 + 0.4 * Math.sin(s * 2.1)));
      pretendFrame = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(pretendFrame);
    pretendFrame = requestAnimationFrame(tick);
  }

  function stopTurn() {
    if (!turn) return;
    for (const source of turn.sources) { try { source.stop(); } catch { /* not started */ } source.disconnect(); }
    cancelAnimationFrame(turn.frame);
    clearTimeout(turn.hideTimer);
    turn = null;
    opts.onCaption?.(null);
    opts.onStep?.(null);
  }

  async function startTurn() {
    await audioReady();
    const clip = await loadClips();
    stopTurn();
    const face = opts.face();
    const begin = context.currentTime + 0.08;
    const readyAt = begin + MERGE;
    // After the cue, a person needs about half a second before they start talking.
    const userStart = readyAt + clip.cue.duration + 0.55;
    const userEnd = userStart + clip.user.duration;
    const thinkStart = userEnd + clip.cue.duration + 0.08;
    const speakStart = thinkStart + THINK;
    const replyStart = speakStart + SPLIT;
    const end = replyStart + clip.reply.duration;
    turn = { sources: [], frame: 0, step: '', hideTimer: 0, who: '' };
    play(clip.cue, readyAt);
    play(clip.user, userStart);
    play(clip.cue, userEnd);
    play(clip.reply, replyStart);
    face.startListening();
    turn.step = 'listening';
    opts.onStep?.('listening');
    const reveal = (text, progress) => text.slice(0, Math.max(1, Math.ceil(text.length * clamp01(progress))));
    const show = (who, text = '') => { turn.who = who; opts.onCaption?.(who, text); };
    const active = turn;
    const tick = () => {
      if (turn !== active) return;
      const clock = context.currentTime;
      if (clock >= thinkStart && active.step === 'listening') { active.step = 'thinking'; opts.onStep?.('thinking'); face.startWaiting({ variant: opts.style() }); }
      if (clock >= speakStart && active.step === 'thinking') { active.step = 'speaking'; opts.onStep?.('speaking'); face.startSpeaking(); }
      if (active.step === 'listening') {
        face.setVoiceLevel(clock >= userStart ? sample(clip.userLevels, clock - userStart)[0] : 0);
        if (clock >= userStart) show('user', reveal(clip.text.user, (clock - userStart) / clip.user.duration));
        else if (active.who !== 'listening') show('listening');
      } else if (active.step === 'thinking') {
        if (active.who !== 'thinking') show('thinking');
      } else if (active.step === 'speaking') {
        const [, low, high] = clock >= replyStart ? sample(clip.replyLevels, clock - replyStart) : [0, 0, 0];
        face.setVoiceLevel([low, high]);
        if (clock >= replyStart) show('reply', reveal(clip.text.reply, (clock - replyStart) / clip.reply.duration));
        else if (active.who !== 'thinking') show('thinking');
      }
      if (clock >= end) {
        active.step = 'done';
        opts.onStep?.(null);
        face.reset();
        active.hideTimer = setTimeout(() => { if (turn === active) stopTurn(); }, 1400);
        return;
      }
      active.frame = requestAnimationFrame(tick);
    };
    active.frame = requestAnimationFrame(tick);
  }

  return {
    startTurn, stopTurn, playCue, pretendVoice,
    get playing() { return !!turn; },
    setSound(on) { if (output) output.gain.value = on ? 1 : 0; },
  };
}
