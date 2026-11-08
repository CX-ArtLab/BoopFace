// Agent events → avatar expressions.
//
// connectAgent(avatar) returns a small adapter. Feed it whatever an AI stream
// produces (AG-UI events, OpenAI Responses or Chat Completions chunks, Anthropic
// Messages events, Vercel AI SDK stream parts or useChat status, or a plain state
// word) and the avatar shows thinking, tool use, replying, done, failure or
// refusal by itself. The adapter touches nothing but the avatar's public API.

const STATES = Object.freeze([
  'idle', 'typing', 'listening', 'thinking', 'tool', 'replying', 'speaking', 'approval', 'done', 'error', 'refused', 'cancelled',
]);

// Busy states: a reply is under way. Looping states keep their expression
// going until the next state; the others play once and settle.
const BUSY = new Set(['thinking', 'tool', 'replying', 'speaking']);
const LOOPING = new Set([...BUSY, 'listening']);
const VOICE = new Set(['listening', 'speaking']);
const ENDINGS = new Set(['done', 'error', 'refused', 'cancelled']);

const DEFAULT_ACTIONS = Object.freeze({
  idle: 'idle',
  typing: 'input',
  listening: 'listening',
  thinking: 'waiting-spin',
  tool: 'waiting-wave',
  replying: 'idle',
  speaking: 'speaking',
  approval: 'wary',
  done: 'success',
  error: 'failure',
  refused: 'refuse',
  cancelled: 'idle',
});

const ACTION_NAMES = new Set([
  'idle', 'bored', 'waiting', 'waiting-spin', 'waiting-wrap', 'waiting-wave', 'input', 'affirm', 'success',
  'failure', 'wary', 'inspect', 'angry', 'refuse', 'surprise', 'love', 'random', 'sleep', 'wake',
  'waiting-flower', 'listening', 'speaking',
]);

// Plain words: our own state names, useChat status values and common synonyms.
// 'ready' depends on what came before and is handled separately.
const WORDS = Object.freeze({
  idle: 'idle',
  typing: 'typing', input: 'typing',
  listening: 'listening', listen: 'listening',
  speaking: 'speaking', speak: 'speaking', talking: 'speaking',
  thinking: 'thinking', reasoning: 'thinking', submitted: 'thinking', waiting: 'thinking', pending: 'thinking',
  loading: 'thinking', start: 'thinking', started: 'thinking', running: 'thinking', 'in-progress': 'thinking',
  tool: 'tool', 'tool-call': 'tool', 'tool-calling': 'tool', 'tool-use': 'tool', working: 'tool',
  replying: 'replying', streaming: 'replying', writing: 'replying', responding: 'replying',
  approval: 'approval', 'needs-approval': 'approval', confirm: 'approval', 'needs-confirmation': 'approval',
  interrupt: 'approval', 'awaiting-approval': 'approval',
  done: 'done', success: 'done', complete: 'done', completed: 'done', finish: 'done', finished: 'done',
  error: 'error', failed: 'error', failure: 'error', fail: 'error',
  refused: 'refused', refusal: 'refused', refuse: 'refused',
  cancelled: 'cancelled', canceled: 'cancelled', cancel: 'cancelled', abort: 'cancelled', aborted: 'cancelled',
  stopped: 'cancelled',
});

const READY = 'ready';

// AG-UI protocol event types (written in upper case on the wire).
const AG_UI = Object.freeze({
  run_started: 'thinking',
  step_started: null,
  step_finished: null,
  thinking_start: 'thinking',
  thinking_end: null,
  thinking_text_message_end: null,
  reasoning_end: null,
  reasoning_message_end: null,
  text_message_end: null,
  thinking_text_message_start: 'thinking',
  thinking_text_message_content: 'thinking',
  reasoning_start: 'thinking',
  reasoning_message_start: 'thinking',
  reasoning_message_content: 'thinking',
  reasoning_message_chunk: 'thinking',
  text_message_content: 'replying',
  text_message_chunk: 'replying',
  tool_call_start: 'tool',
  tool_call_args: 'tool',
  tool_call_chunk: 'tool',
  tool_call_end: 'tool',
  tool_call_result: 'thinking',
});

// Vercel AI SDK stream parts (UI message stream and streamText fullStream).
const AI_SDK = Object.freeze({
  'start-step': 'thinking',
  'reasoning-start': 'thinking',
  'reasoning-delta': 'thinking',
  reasoning: 'thinking',
  'text-start': 'replying',
  'text-delta': 'replying',
  text: 'replying',
  'tool-input-start': 'tool',
  'tool-input-delta': 'tool',
  'tool-input-available': 'tool',
  'tool-call': 'tool',
  'tool-call-streaming-start': 'tool',
  'tool-call-delta': 'tool',
  'tool-output-available': 'thinking',
  'tool-output-error': 'thinking',
  'tool-result': 'thinking',
  'tool-error': 'thinking',
  'tool-approval-request': 'approval',
});

const TOOL_ITEM = /(?:^|_)(?:call|tool_use)$/;

// A waiting loop is only left where its motion comes back to the start, so a
// short stage never cuts an orbit or a wave in half. Spin: one orbit of its
// two-orbit cycle; wave: one bob; wrap: one pass.
const LOOP_SEAM = Object.freeze({ spin: 1600, wave: 1100, wrap: 2400 });
const WAITING_ACTION = /^waiting(?:-(spin|wrap|wave|flower))?$/;

function lower(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function fromWord(word) {
  const key = lower(word).replace(/[\s_]+/g, '-');
  if (key === READY) return READY;
  return Object.hasOwn(WORDS, key) ? WORDS[key] : undefined;
}

function fromFinishReason(reason) {
  const value = lower(reason).replace(/_/g, '-');
  if (!value) return undefined;
  if (value === 'tool-calls' || value === 'function-call' || value === 'tool-use') return 'tool';
  if (value === 'content-filter' || value === 'refusal') return 'refused';
  if (value === 'error') return 'error';
  if (value === 'pause-turn') return 'thinking';
  return 'done';
}

function fromOpenAIItem(item) {
  const type = lower(item?.type);
  if (type === 'reasoning') return 'thinking';
  if (type === 'mcp_approval_request') return 'approval';
  if (TOOL_ITEM.test(type) || type === 'mcp_list_tools') return 'tool';
  return null;
}

function fromOpenAIResponses(type, event) {
  // Realtime: audio of the reply, and the end of a voice turn.
  if (type.startsWith('response.output_audio') || type.startsWith('response.audio')) return 'speaking';
  if (type === 'response.done') {
    const status = lower(event.response?.status);
    if (status === 'failed') return 'error';
    if (status === 'cancelled') return 'cancelled';
    const output = Array.isArray(event.response?.output) ? event.response.output : [];
    if (output.some(item => lower(item?.type) === 'function_call')) return 'tool';
    return 'done';
  }
  if (type === 'response.created' || type === 'response.in_progress' || type === 'response.queued') return 'thinking';
  if (type.startsWith('response.reasoning')) return 'thinking';
  if (type.startsWith('response.output_text.')) return 'replying';
  if (type.startsWith('response.refusal.')) return 'refused';
  if (/^response\.[a-z_]+_call(?:_[a-z]+)?\./.test(type) || type.startsWith('response.mcp_list_tools.')) return 'tool';
  if (type === 'response.output_item.added') return fromOpenAIItem(event.item);
  if (type === 'response.failed') return 'error';
  if (type === 'response.incomplete') {
    return lower(event.response?.incomplete_details?.reason) === 'content_filter' ? 'refused' : 'error';
  }
  if (type === 'response.completed') {
    // The model asked the page to run a tool or approve one: the turn goes on.
    const output = Array.isArray(event.response?.output) ? event.response.output : [];
    if (output.some(item => lower(item?.type) === 'mcp_approval_request')) return 'approval';
    if (output.some(item => lower(item?.type) === 'function_call' || lower(item?.type) === 'custom_tool_call')) return 'tool';
    if (output.some(item => item?.content?.some?.(part => lower(part?.type) === 'refusal'))) return 'refused';
    return 'done';
  }
  return null;
}

function fromChatCompletionChunk(event) {
  const choice = event.choices?.[0];
  if (!choice) return null;
  const finish = fromFinishReason(choice.finish_reason);
  if (finish) return finish;
  const delta = choice.delta || {};
  if (delta.refusal) return 'refused';
  if (delta.tool_calls?.length || delta.function_call) return 'tool';
  if (delta.content) return 'replying';
  if (delta.reasoning_content || delta.reasoning) return 'thinking';
  return null;
}

function fromAnthropicBlock(type) {
  if (type === 'thinking' || type === 'redacted_thinking') return 'thinking';
  if (type === 'text') return 'replying';
  if (type.endsWith('tool_result')) return 'thinking';
  if (type.endsWith('tool_use')) return 'tool';
  return null;
}

function fromAnthropic(type, event, memo) {
  switch (type) {
    case 'message_start':
      memo.stopReason = '';
      return 'thinking';
    case 'content_block_start':
      return fromAnthropicBlock(lower(event.content_block?.type));
    case 'content_block_delta': {
      const delta = lower(event.delta?.type);
      if (delta === 'thinking_delta' || delta === 'signature_delta') return 'thinking';
      if (delta === 'text_delta' || delta === 'citations_delta') return 'replying';
      if (delta === 'input_json_delta') return 'tool';
      return null;
    }
    case 'message_delta': {
      memo.stopReason = lower(event.delta?.stop_reason);
      return memo.stopReason === 'refusal' ? 'refused' : null;
    }
    case 'message_stop': {
      const reason = memo.stopReason;
      memo.stopReason = '';
      return fromFinishReason(reason) || 'done';
    }
    default:
      return undefined;
  }
}

function fromAgUi(type, event) {
  if (type === 'text_message_start') {
    const role = lower(event.role);
    return !role || role === 'assistant' ? 'replying' : null;
  }
  if (type === 'run_error') {
    const code = lower(event.code);
    return code.includes('refus') || code.includes('content_filter') ? 'refused' : 'error';
  }
  if (type === 'run_finished') {
    const outcome = lower(event.outcome?.type ?? event.outcome);
    return outcome === 'interrupt' || event.interrupt ? 'approval' : 'done';
  }
  return Object.hasOwn(AG_UI, type) ? AG_UI[type] : undefined;
}

function fromAiSdk(type, event) {
  if (type === 'start') return 'thinking';
  if (type === 'finish') return fromFinishReason(event.finishReason) || 'done';
  if (type === 'finish-step') return null;
  if (type === 'abort') return 'cancelled';
  return Object.hasOwn(AI_SDK, type) ? AI_SDK[type] : undefined;
}

/**
 * Reads one stream item and returns a state name, 'ready', null for an item
 * that changes nothing, or undefined for something not recognized.
 */
function stateFromEvent(event, memo) {
  if (typeof event === 'string') return fromWord(event);
  if (!event || typeof event !== 'object') return undefined;

  const type = lower(event.type);
  if (type) {
    if (type === 'error') return 'error';
    if (type === 'ping') return null;
    if (type.startsWith('response.')) return fromOpenAIResponses(type, event);
    // OpenAI Realtime: the user's voice, and (over WebRTC) playback of the reply.
    if (type === 'input_audio_buffer.speech_started') return 'listening';
    if (type === 'input_audio_buffer.speech_stopped' || type === 'input_audio_buffer.committed') return 'thinking';
    if (type === 'output_audio_buffer.started') { memo.playback = true; return 'speaking'; }
    if (type === 'output_audio_buffer.stopped' || type === 'output_audio_buffer.cleared') return 'listening';
    if (type.startsWith('input_audio_buffer.') || type.startsWith('output_audio_buffer.')) return null;
    const anthropic = fromAnthropic(type, event, memo);
    if (anthropic !== undefined) return anthropic;
    const agUi = fromAgUi(type, event);
    if (agUi !== undefined) return agUi;
    const aiSdk = fromAiSdk(type, event);
    if (aiSdk !== undefined) return aiSdk;
  }
  if (lower(event.object) === 'chat.completion.chunk' || Array.isArray(event.choices)) return fromChatCompletionChunk(event);
  if (typeof event.state === 'string') return fromWord(event.state);
  // ElevenLabs and similar voice SDKs report { mode: 'speaking' | 'listening' }.
  if (typeof event.mode === 'string') return fromWord(event.mode);
  if (typeof event.status === 'string') return fromWord(event.status);
  return type ? fromWord(type) : undefined;
}

function resolveAvatar(target) {
  const avatar = typeof target === 'string' && typeof document !== 'undefined' ? document.querySelector(target) : target;
  if (!avatar || typeof avatar.play !== 'function' || typeof avatar.startWaiting !== 'function') {
    throw new TypeError('connectAgent: pass a <boop-face> element or a selector that finds one.');
  }
  return avatar;
}

function resolveActions(custom = {}) {
  if (custom === null || typeof custom !== 'object') throw new TypeError('connectAgent: options.actions must be an object.');
  const actions = { ...DEFAULT_ACTIONS };
  for (const [state, action] of Object.entries(custom)) {
    if (!STATES.includes(state)) {
      throw new TypeError(`connectAgent: unknown state "${state}". States: ${STATES.join(', ')}.`);
    }
    if (action !== null && action !== false && typeof action !== 'function' && !ACTION_NAMES.has(action)) {
      throw new TypeError(`connectAgent: unknown action "${action}" for state "${state}".`);
    }
    actions[state] = action;
  }
  return actions;
}

function isAbort(error) {
  return error?.name === 'AbortError' || error?.code === 'ABORT_ERR';
}

async function* readItems(source) {
  if (typeof source === 'string') throw new TypeError('track: pass a stream, not a string; use handle() for a state name.');
  if (source && typeof source[Symbol.asyncIterator] === 'function') {
    yield* source;
    return;
  }
  if (source && typeof source.getReader === 'function') {
    const reader = source.getReader();
    try {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) return;
        yield value;
      }
    } finally {
      reader.releaseLock?.();
    }
  }
  if (source && typeof source[Symbol.iterator] === 'function') {
    yield* source;
    return;
  }
  throw new TypeError('track: pass an async iterable, a ReadableStream or an iterable.');
}

const clamp01 = value => Math.max(0, Math.min(1, value));

// Loudness of a MediaStream (a microphone, a WebRTC reply) or an <audio> /
// <video> element, read with a Web Audio analyser.
function audioMeter(context, source) {
  let node;
  if (typeof MediaStream !== 'undefined' && source instanceof MediaStream) {
    node = context.createMediaStreamSource(source);
  } else if (source && typeof source.play === 'function') {
    node = context.createMediaElementSource(source);
    // Web Audio takes over the element's sound; send it on to the speakers.
    node.connect(context.destination);
  } else {
    throw new TypeError('connectAudio: pass a MediaStream or an <audio> / <video> element.');
  }
  const analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0;
  node.connect(analyser);
  const spectrum = new Float32Array(analyser.frequencyBinCount);
  // Below about 700 Hz is the low band (left eye), above it the high band.
  const split = Math.max(1, Math.round(700 / (context.sampleRate / analyser.fftSize)));
  const band = (from, to) => {
    let power = 0;
    for (let i = from; i < to; i++) power += 10 ** (spectrum[i] / 10);
    // About -60 dB (room noise) is silent, -22 dB (speech up close) is full.
    return clamp01((10 * Math.log10(power || 1e-12) + 60) / 38);
  };
  return {
    read() {
      analyser.getFloatFrequencyData(spectrum);
      return [band(1, split), band(split, spectrum.length)];
    },
    disconnect() {
      try { node.disconnect(analyser); } catch { /* already gone */ }
    },
  };
}

function connectAgent(target, options = {}) {
  const avatar = resolveAvatar(target);
  const actions = resolveActions(options.actions);
  const onChange = typeof options.onChange === 'function' ? options.onChange : null;
  const warned = new Set();
  const memo = { stopReason: '', ended: false, voice: false, playback: false, pendingDone: false, outputMeter: false };
  let state = 'idle';
  let looping = null; // the loop this adapter started, while it may still run
  let timer = 0;
  // In a voice conversation, thinking waits with the flower, which morphs out
  // of the listening eye, unless the page chose another waiting style.
  const customThinking = Boolean(options.actions && Object.hasOwn(options.actions, 'thinking'));
  const actionFor = next => (next === 'thinking' && memo.voice && !customThinking ? 'waiting-flower' : actions[next]);

  // The loop a state shows, if its action is one: waiting, listening or speaking.
  function loopOf(next) {
    const action = actionFor(next);
    if (typeof action !== 'string' || !LOOPING.has(next)) return null;
    const waiting = WAITING_ACTION.exec(action);
    if (waiting) return { key: `waiting:${waiting[1] || 'spin'}`, start: () => avatar.startWaiting({ variant: waiting[1] || 'spin' }) };
    const methods = { listening: 'startListening', speaking: 'startSpeaking' };
    if (methods[action] && typeof avatar[methods[action]] === 'function') {
      return { key: `voice:${action}`, start: () => avatar[methods[action]]() };
    }
    return null;
  }

  function stillLooping(key) {
    if (key === 'waiting:flower') return avatar._voiceFx?.mode === 'thinking' || avatar._voiceRequested === 'thinking';
    if (key.startsWith('waiting:')) return Boolean(avatar._waitingFx || avatar._waitingRequested);
    if (avatar._voiceFx && avatar._voiceFx.mode !== key.slice(6)) return false;
    return Boolean(avatar._voiceFx || avatar._voiceRequested);
  }

  function reduced() {
    const motion = String(avatar.getAttribute?.('motion') || 'auto').toLowerCase();
    if (motion === 'reduce') return true;
    if (motion === 'full') return false;
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Milliseconds until a running waiting loop is back at its starting pose.
  function untilSeam() {
    const fx = avatar._waitingFx;
    if (!looping?.key.startsWith('waiting:') || !fx || !fx.continuous || reduced()) return 0;
    const period = LOOP_SEAM[fx.variant === 'default' ? 'spin' : fx.variant];
    if (!period) return 0;
    const left = period - ((performance.now() - fx.start) % period);
    return left < 50 ? 0 : left;
  }

  function apply(next) {
    const action = actionFor(next);
    const loop = loopOf(next);
    looping = loop;
    if (action === null || action === false) return;
    if (typeof action === 'function') {
      action(avatar, next);
      return;
    }
    let result;
    if (loop) result = loop.start();
    else if (action === 'idle') result = avatar.reset();
    else result = avatar.play(action);
    // Animations resolve when they finish; nothing waits on them here.
    if (result && typeof result.catch === 'function') result.catch(() => {});
  }

  function show(next) {
    clearTimeout(timer);
    timer = 0;
    const loop = loopOf(next);
    // The same loop is already on screen: keep it going instead of restarting it.
    if (loop && loop.key === looping?.key && stillLooping(loop.key)) return;
    const wait = untilSeam();
    if (wait) timer = setTimeout(() => { timer = 0; apply(next); }, wait);
    else apply(next);
  }

  function set(next) {
    if (VOICE.has(next)) memo.voice = true;
    if (memo.voice) {
      // A voice conversation goes back to listening after each reply instead of
      // celebrating it. While the reply is still being played, it keeps speaking.
      if (next === 'done' && state === 'speaking') {
        memo.pendingDone = true;
        return state;
      }
      if (next === 'done' || next === 'cancelled') next = 'listening';
    }
    if (next !== 'speaking') memo.pendingDone = false;
    if (next === state) {
      if (BUSY.has(next)) avatar.noteActivity?.(false);
      return state;
    }
    // A run that already failed, was refused or was stopped does not turn
    // into a success when the stream then reports that it finished, and a run
    // paused for the user's approval is not done yet.
    if (next === 'done' && (memo.ended || state === 'approval')) return state;
    const previous = state;
    if (BUSY.has(next) && !BUSY.has(previous)) memo.ended = false;
    if (next === 'error' || next === 'refused' || next === 'cancelled') memo.ended = true;
    if (next === 'idle' || next === 'typing' || next === 'listening') memo.ended = false;
    state = next;
    if (previous === 'typing' && next !== 'typing' && actions.typing === 'input' && typeof avatar.input === 'function') {
      // Only matters when the next state leaves the cursor eyes on screen.
      if (actionFor(next) === null || actionFor(next) === false) avatar.input(false);
    }
    show(next);
    onChange?.(next, previous);
    return state;
  }

  function handle(event) {
    let next = stateFromEvent(event, memo);
    if (next === READY) next = BUSY.has(state) ? 'done' : null;
    if (next === undefined) {
      if (typeof event === 'string' && !warned.has(event)) {
        warned.add(event);
        console.warn(`boopface: connectAgent does not know the state "${event}". States: ${STATES.join(', ')}.`);
      }
      return state;
    }
    if (next === null) {
      if (BUSY.has(state)) avatar.noteActivity?.(false);
      return state;
    }
    return set(next);
  }

  async function* track(source) {
    let finished = false;
    // Reading a stream means a request is under way, even before its first item.
    if (!BUSY.has(state)) set('thinking');
    try {
      for await (const item of readItems(source)) {
        handle(item);
        yield item;
      }
      finished = true;
    } catch (error) {
      finished = true;
      set(isAbort(error) ? 'cancelled' : 'error');
      throw error;
    } finally {
      // The stream ended without saying how: a clean end is a finished reply,
      // a consumer that stopped reading early cancelled it. A stream that ends
      // on a tool call hands the tool to the page, so the avatar keeps working.
      if (!finished && BUSY.has(state)) set('cancelled');
      else if (finished && (state === 'thinking' || state === 'replying')) set('done');
    }
  }

  // Lets the eyes follow real sound: the microphone while listening, the reply
  // while speaking. With the reply connected, the avatar also notices when it
  // has finished playing and goes back to listening.
  function connectAudio({ input, output } = {}) {
    const Context = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Context) throw new TypeError('connectAudio: this browser has no Web Audio.');
    const context = new Context();
    const meters = {};
    try {
      if (input) meters.input = audioMeter(context, input);
      if (output) meters.output = audioMeter(context, output);
    } catch (error) {
      for (const meter of Object.values(meters)) meter.disconnect();
      context.close?.().catch?.(() => {});
      throw error;
    }
    memo.outputMeter = Boolean(meters.output);
    context.resume?.().catch?.(() => {});
    let frame = 0;
    let quietSince = 0;
    const tick = now => {
      frame = requestAnimationFrame(tick);
      const meter = state === 'listening' ? meters.input : state === 'speaking' ? meters.output : null;
      if (!meter) return;
      const pair = meter.read();
      avatar.setVoiceLevel?.(pair);
      const level = Math.max(...pair);
      if (state !== 'speaking' || !memo.pendingDone || meter !== meters.output) {
        quietSince = 0;
        return;
      }
      if (level > 0.04) quietSince = 0;
      else if (!quietSince) quietSince = now;
      else if (now - quietSince > 700) {
        quietSince = 0;
        set('listening');
      }
    };
    frame = requestAnimationFrame(tick);
    let connected = true;
    return function disconnectAudio() {
      if (!connected) return;
      connected = false;
      cancelAnimationFrame(frame);
      for (const meter of Object.values(meters)) meter.disconnect();
      if (meters.output) memo.outputMeter = false;
      context.close?.().catch?.(() => {});
    };
  }

  return {
    get state() { return state; },
    get avatar() { return avatar; },
    handle,
    track,
    connectAudio,
    reset() {
      memo.stopReason = '';
      memo.ended = false;
      memo.voice = false;
      memo.pendingDone = false;
      return set('idle');
    },
  };
}

export { connectAgent, stateFromEvent as _agentStateFromEvent, STATES as AGENT_STATES, DEFAULT_ACTIONS as AGENT_DEFAULT_ACTIONS };
export default connectAgent;
