// The voice set on the demo page: one row with its three expressions and a
// "Play all" that runs a whole spoken turn with sound and captions.
// The spoken clips load only the first time Play all is pressed.
import { settleNewDots } from './skins-i18n.js';

const LABELS = Object.freeze({
  'zh-CN': { group: '语音对话', listening: '聆听', thinking: '思考', speaking: '说话', play: '连着播', stop: '停止', sound: '声音' , style: '思考样式', bloom: '绽放', spin: '旋转', wrap: '滚动', wave: '波动' },
  'zh-TW': { group: '語音對話', listening: '聆聽', thinking: '思考', speaking: '說話', play: '連著播', stop: '停止', sound: '聲音' , style: '思考樣式', bloom: '綻放', spin: '旋轉', wrap: '滾動', wave: '波動' },
  en: { group: 'Voice', listening: 'Listening', thinking: 'Thinking', speaking: 'Speaking', play: 'Play all', stop: 'Stop', sound: 'Sound' , style: 'Thinking style', bloom: 'Bloom', spin: 'Spin', wrap: 'Scroll', wave: 'Wave' },
  ja: { group: '音声会話', listening: '聞く', thinking: '考える', speaking: '話す', play: '通して再生', stop: '停止', sound: '音声' , style: '考えるときの形', bloom: 'ブルーム', spin: '回転', wrap: '回り込み', wave: 'ウェーブ' },
  ko: { group: '음성 대화', listening: '듣기', thinking: '생각', speaking: '말하기', play: '이어서 재생', stop: '정지', sound: '소리' , style: '생각 스타일', bloom: '피어나기', spin: '회전', wrap: '감싸기', wave: '물결' },
  es: { group: 'Voz', listening: 'Escuchar', thinking: 'Pensar', speaking: 'Hablar', play: 'Reproducir todo', stop: 'Detener', sound: 'Sonido' , style: 'Estilo al pensar', bloom: 'Florecer', spin: 'Giro', wrap: 'Envoltura', wave: 'Onda' },
  pt: { group: 'Voz', listening: 'Ouvir', thinking: 'Pensar', speaking: 'Falar', play: 'Tocar tudo', stop: 'Parar', sound: 'Som' , style: 'Estilo ao pensar', bloom: 'Florescer', spin: 'Giro', wrap: 'Contorno', wave: 'Onda' },
  de: { group: 'Sprache', listening: 'Zuhören', thinking: 'Denken', speaking: 'Sprechen', play: 'Alles abspielen', stop: 'Stopp', sound: 'Ton' , style: 'Denkstil', bloom: 'Erblühen', spin: 'Drehen', wrap: 'Umlauf', wave: 'Welle' },
  fr: { group: 'Voix', listening: 'Écouter', thinking: 'Réfléchir', speaking: 'Parler', play: 'Tout lire', stop: 'Arrêter', sound: 'Son' , style: 'Style de réflexion', bloom: 'Éclosion', spin: 'Rotation', wrap: 'Boucle', wave: 'Vague' },
});

function labels() {
  const lang = document.documentElement.lang || 'zh-CN';
  if (LABELS[lang]) return LABELS[lang];
  if (lang.startsWith('zh')) return /tw|hk|hant/i.test(lang) ? LABELS['zh-TW'] : LABELS['zh-CN'];
  return LABELS[lang.slice(0, 2)] || LABELS.en;
}

const face = document.getElementById('face');
const stack = document.querySelector('.demo-control-stack');
const controls = document.querySelector('.demo-control-stack > .controls');
const stage = document.getElementById('demoStage');

const row = document.createElement('div');
row.className = 'demo-voice-row';
row.setAttribute('role', 'group');
row.innerHTML = `
  <span class="demo-voice-label"></span>
  <button type="button" data-voice="listening"></button>
  <span class="demo-voice-think">
    <button type="button" data-voice="thinking"></button>
    <button type="button" class="demo-voice-think-toggle" aria-haspopup="menu" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5"/></svg></button>
    <span class="demo-voice-menu" role="menu" hidden>
      <span class="demo-voice-menu-title"></span>
      <button type="button" role="menuitemradio" data-style="bloom" aria-checked="true"></button>
      <button type="button" role="menuitemradio" data-style="spin" aria-checked="false"></button>
      <button type="button" role="menuitemradio" data-style="wrap" aria-checked="false"></button>
      <button type="button" role="menuitemradio" data-style="wave" aria-checked="false"></button>
    </span>
  </span>
  <button type="button" data-voice="speaking"></button>
  <span class="demo-voice-divider" aria-hidden="true"></span>
  <button type="button" class="demo-voice-play is-new" data-new-key="voice-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z"/></svg><span></span></button>
  <label class="demo-voice-sound">
    <input type="checkbox" checked>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path class="speaker" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="waves" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/><path class="mute" d="M16 9.5l5 5M21 9.5l-5 5"/></svg>
  </label>`;
if (controls) controls.insertAdjacentElement('afterend', row);
else stack?.append(row);

const caption = document.createElement('div');
caption.className = 'demo-voice-caption';
caption.setAttribute('aria-live', 'polite');
caption.hidden = true;
stage?.append(caption);

const playButton = row.querySelector('.demo-voice-play');
const soundInput = row.querySelector('.demo-voice-sound input');

function relabel() {
  const t = labels();
  row.setAttribute('aria-label', t.group);
  row.querySelector('.demo-voice-label').textContent = t.group;
  for (const button of row.querySelectorAll('[data-voice]')) button.textContent = t[button.dataset.voice];
  // The thinking button names the waiting style it plays.
  row.querySelector('[data-voice="thinking"]').textContent = `${t.thinking} · ${t[thinkingStyle]}`;
  row.querySelector('.demo-voice-think-toggle').setAttribute('aria-label', t.style);
  row.querySelector('.demo-voice-menu').setAttribute('aria-label', t.style);
  row.querySelector('.demo-voice-menu-title').textContent = t.style;
  for (const button of row.querySelectorAll('[data-style]')) button.textContent = t[button.dataset.style];
  playButton.querySelector('span').textContent = turn ? t.stop : t.play;
  row.querySelector('.demo-voice-sound').title = t.sound;
  soundInput.setAttribute('aria-label', t.sound);
}

// --- Thinking style: any waiting style can be the middle step ------------------

let thinkingStyle = 'bloom';
const menu = row.querySelector('.demo-voice-menu');
const menuToggle = row.querySelector('.demo-voice-think-toggle');

function openMenu(open) {
  menu.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  if (open) (menu.querySelector('[aria-checked="true"]') || menu.querySelector('[data-style]')).focus();
}

menuToggle.addEventListener('click', event => {
  event.stopPropagation();
  openMenu(menu.hidden);
});
menu.addEventListener('click', event => {
  const option = event.target.closest('button[data-style]');
  if (!option) return;
  event.stopPropagation();
  thinkingStyle = option.dataset.style;
  for (const item of menu.querySelectorAll('[data-style]')) item.setAttribute('aria-checked', String(item === option));
  openMenu(false);
  menuToggle.focus();
  relabel();
});
menu.addEventListener('keydown', event => {
  const items = [...menu.querySelectorAll('[data-style]')];
  const index = items.indexOf(document.activeElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    items[(index + (event.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length].focus();
  } else if (event.key === 'Escape') {
    openMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!menu.hidden && !menu.contains(event.target)) openMenu(false);
});

// --- Single expressions --------------------------------------------------------

// Nobody talks to the demo, so while listening on its own it hears a pretend voice.
let pretendFrame = 0;
function pretendVoice(started) {
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

row.addEventListener('click', event => {
  const button = event.target.closest('button[data-voice]');
  if (!button) return;
  stopTurn();
  const action = button.dataset.voice === 'thinking' ? `waiting-${thinkingStyle}` : button.dataset.voice;
  face.play(action);
  if (action === 'listening') pretendVoice(performance.now());
});

// --- Play all: one spoken turn ---------------------------------------------------

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
    samples[n] = 0.055 * shape * (Math.sin(2 * Math.PI * 392 * t) + 0.12 * Math.sin(2 * Math.PI * 588 * t)) / 1.12;
  }
  return buffer;
}

async function loadClips() {
  if (clips) return clips;
  const data = await import('./voice/voice-audio-data.js');
  const user = decodeWav(data.userPCM);
  const reply = decodeWav(data.replyPCM);
  clips = { user, reply, cue: cueTone(), text: data.speechText, userLevels: envelope(user), replyLevels: envelope(reply) };
  return clips;
}

function play(buffer, at) {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(output);
  source.start(at);
  turn.sources.push(source);
}

function showCaption(who, text) {
  caption.hidden = false;
  caption.dataset.who = who;
  caption.textContent = text;
}

function stopTurn() {
  if (!turn) return;
  for (const source of turn.sources) { try { source.stop(); } catch { /* not started */ } source.disconnect(); }
  cancelAnimationFrame(turn.frame);
  clearTimeout(turn.hideTimer);
  turn = null;
  caption.hidden = true;
  playButton.classList.remove('is-playing');
  relabel();
}

async function startTurn() {
  context ??= new (window.AudioContext || window.webkitAudioContext)();
  await context.resume();
  if (!output) {
    output = context.createGain();
    output.connect(context.destination);
  }
  output.gain.value = soundInput.checked ? 1 : 0;
  const clip = await loadClips();
  stopTurn();
  const begin = context.currentTime + 0.08;
  const readyAt = begin + MERGE;
  const userStart = readyAt + clip.cue.duration + 0.1;
  const userEnd = userStart + clip.user.duration;
  const thinkStart = userEnd + clip.cue.duration + 0.08;
  const speakStart = thinkStart + THINK;
  const replyStart = speakStart + SPLIT;
  const end = replyStart + clip.reply.duration;
  turn = { sources: [], frame: 0, step: '', hideTimer: 0 };
  playButton.classList.add('is-playing');
  relabel();
  play(clip.cue, readyAt);
  play(clip.user, userStart);
  play(clip.cue, userEnd);
  play(clip.reply, replyStart);
  face.startListening();
  turn.step = 'listening';

  const reveal = (text, progress) => text.slice(0, Math.max(1, Math.ceil(text.length * clamp01(progress))));
  const active = turn;
  const tick = () => {
    if (turn !== active) return;
    const clock = context.currentTime;
    if (clock >= thinkStart && active.step === 'listening') { active.step = 'thinking'; face.startWaiting({ variant: thinkingStyle }); }
    if (clock >= speakStart && active.step === 'thinking') { active.step = 'speaking'; face.startSpeaking(); }
    if (active.step === 'listening') {
      face.setVoiceLevel(clock >= userStart ? sample(clip.userLevels, clock - userStart)[0] : 0);
      if (clock >= userStart) showCaption('user', reveal(clip.text.user, (clock - userStart) / clip.user.duration));
    } else if (active.step === 'speaking') {
      const [, low, high] = clock >= replyStart ? sample(clip.replyLevels, clock - replyStart) : [0, 0, 0];
      face.setVoiceLevel([low, high]);
      if (clock >= replyStart) showCaption('reply', reveal(clip.text.reply, (clock - replyStart) / clip.reply.duration));
    }
    if (clock >= end) {
      active.step = 'done';
      face.reset();
      active.hideTimer = setTimeout(() => { if (turn === active) stopTurn(); }, 1400);
      return;
    }
    active.frame = requestAnimationFrame(tick);
  };
  active.frame = requestAnimationFrame(tick);
}

playButton.addEventListener('click', () => {
  if (turn) {
    stopTurn();
    face.reset();
    return;
  }
  startTurn().catch(error => {
    console.error(error);
    stopTurn();
  });
});

soundInput.addEventListener('change', () => {
  if (output) output.gain.value = soundInput.checked ? 1 : 0;
});

// Any other expression ends the turn.
face.addEventListener('action-state', event => {
  if (!turn || event.detail.phase !== 'start') return;
  if (!['listening', 'waiting', 'speaking'].includes(event.detail.action)) stopTurn();
});

new MutationObserver(relabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
relabel();
settleNewDots(row);

export { startTurn, stopTurn };
