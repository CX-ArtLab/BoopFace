import { connectAgent } from '../boopface.js';
import { t as navLabel, skinLanguage, markDotSeen } from './skins-i18n.js';

// A pretend AI reply in four wire formats. Each run builds the events a real
// SDK would deliver and feeds them through agent.track(), exactly like a page would.

const TEXT = {
  zh: {
    title: 'AI 接入', format: '接口格式', outcome: '这次结果', outcomeDone: '顺利完成', outcomeError: '出错',
    outcomeRefused: '拒绝回答', outcomeApproval: '需要确认', tools: '中途用工具', toolsHint: '比如上网搜索',
    thinking: '思考时', tool: '用工具时', replying: '回复文字时', spin: '等待 · 旋转', wrap: '等待 · 环绕',
    wave: '等待 · 波动', inspect: '审视', idle: '正常', input: '输入', keep: '继续等待', stop: '中途停止',
    run: '发一条消息', code: '你的代码', empty: '点「发一条消息」，看头像怎么跟着 AI 的状态变。右边是实际收到的事件。',
    reply: '明天上海多云，最高 18°C，最低 11°C，傍晚可能有小雨，出门记得带把伞。',
    refusal: '抱歉，这个请求我没法帮忙。',
    failed: '（连接中断，回复失败）',
    approval: '要花 ¥12 订阅天气服务，需要你确认。',
    cancelled: '（已停止）',
    yourCode: '你的代码调用', states: {
      idle: '待机', typing: '输入中', thinking: '思考中', tool: '用工具', replying: '回复中', approval: '等待确认',
      done: '完成', error: '出错', refused: '拒绝', cancelled: '已停止',
    },
  },
  en: {
    title: 'Connect AI', format: 'Format', outcome: 'Outcome', outcomeDone: 'Completes', outcomeError: 'Fails',
    outcomeRefused: 'Refuses', outcomeApproval: 'Needs approval', tools: 'Uses a tool', toolsHint: 'Such as web search',
    thinking: 'Thinking', tool: 'Using a tool', replying: 'Writing text', spin: 'Waiting · Spin', wrap: 'Waiting · Wrap',
    wave: 'Waiting · Wave', inspect: 'Inspect', idle: 'Normal', input: 'Input', keep: 'Keep waiting', stop: 'Stop',
    run: 'Send a message', code: 'Your code', empty: 'Press “Send a message” and watch the avatar follow the AI. The events it receives are listed on the right.',
    reply: 'Tomorrow in Shanghai: cloudy, high 18°C, low 11°C. Light rain is likely in the evening, so take an umbrella.',
    refusal: 'Sorry, I can’t help with that request.',
    failed: '(Connection lost, the reply failed)',
    approval: 'Subscribing to the weather service costs $2. Please confirm.',
    cancelled: '(Stopped)',
    yourCode: 'your code calls', states: {
      idle: 'idle', typing: 'typing', thinking: 'thinking', tool: 'using a tool', replying: 'replying', approval: 'needs approval',
      done: 'done', error: 'error', refused: 'refused', cancelled: 'stopped',
    },
  },
};

const DEFAULTS = { thinking: 'waiting-spin', tool: 'waiting-wave', replying: 'idle' };
const settings = { format: 'ag-ui', outcome: 'done', thinking: DEFAULTS.thinking, tool: DEFAULTS.tool, replying: DEFAULTS.replying };

const face = document.getElementById('face');
const stateEl = document.getElementById('state');
const replyEl = document.getElementById('reply');
const eventsEl = document.getElementById('events');
const codeEl = document.getElementById('code');
const runButton = document.getElementById('run');
const stopButton = document.getElementById('stop');
const useTool = document.getElementById('useTool');

const params = new URLSearchParams(location.search);
let lang = /^zh/i.test(params.get('lang') || (params.get('lang') ? '' : navigator.language)) ? 'zh' : 'en';
let running = false;
let stopRequested = false;

const t = key => TEXT[lang][key];

function showState(state) {
  stateEl.textContent = `${state} · ${t('states')[state]}`;
}

function applyLanguage() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = t(node.dataset.i18n);
  for (const button of document.querySelectorAll('[data-lang]')) button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  replyEl.dataset.empty = t('empty');
  // The navigation speaks every demo language; this page itself has Chinese and English.
  const navLang = skinLanguage(params.get('lang') || (lang === 'zh' ? 'zh-CN' : navigator.language));
  for (const [id, key, page] of [['navDemo', 'demo', './index.html'], ['navSkins', 'skins', './skins.html'], ['navAgent', 'agent', './agent.html']]) {
    const link = document.getElementById(id);
    link.textContent = navLabel(key, 0, navLang);
    const url = new URL(page, location.href);
    url.searchParams.set('lang', params.get('lang') || navLang);
    link.href = url.href;
  }
  document.title = `${navLabel('agent', 0, navLang)} · BoopFace`;
  showState(agent?.state || 'idle');
}

function actionsFromSettings() {
  return {
    thinking: settings.thinking,
    tool: settings.tool,
    replying: settings.replying === 'keep' ? settings.thinking : settings.replying,
  };
}

function renderCode() {
  const actions = actionsFromSettings();
  const changed = Object.entries(actions).filter(([state, action]) => DEFAULTS[state] !== action);
  const options = changed.length
    ? `, {\n  actions: { ${changed.map(([state, action]) => `${state}: '${action}'`).join(', ')} },\n}`
    : '';
  codeEl.textContent = `import { connectAgent } from 'boopface';\n\nconst agent = connectAgent(avatar${options});\n\nfor await (const event of agent.track(stream)) {\n  // show the reply as usual\n}`;
}

function syncChips() {
  for (const group of document.querySelectorAll('[data-group]')) {
    for (const button of group.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(settings[group.dataset.group] === button.dataset.value));
    }
  }
  renderCode();
}

// --- Event log ------------------------------------------------------------------

let lastRow = null;

function logEvent(label, state, changed) {
  if (lastRow && lastRow.dataset.label === label && !changed) {
    const count = Number(lastRow.dataset.count) + 1;
    lastRow.dataset.count = String(count);
    lastRow.querySelector('.count').textContent = `×${count}`;
    return;
  }
  const row = document.createElement('li');
  row.dataset.label = label;
  row.dataset.count = '1';
  row.innerHTML = '<span class="type"></span><span class="count"></span><span class="to"></span>';
  row.querySelector('.type').textContent = label;
  const to = row.querySelector('.to');
  to.textContent = `→ ${state}`;
  to.classList.toggle('changed', changed);
  eventsEl.append(row);
  eventsEl.scrollTop = eventsEl.scrollHeight;
  lastRow = row;
}

function logNote(text) {
  const row = document.createElement('li');
  row.innerHTML = '<span class="note"></span>';
  row.firstChild.textContent = text;
  eventsEl.append(row);
  lastRow = null;
}

function labelOf(event) {
  if (typeof event === 'string') return `'${event}'`;
  if (event.type === 'content_block_start') return `content_block_start · ${event.content_block.type}`;
  if (event.type === 'content_block_delta') return `content_block_delta · ${event.delta.type}`;
  if (event.type === 'message_delta') return `message_delta · ${event.delta.stop_reason}`;
  if (event.type === 'response.output_item.added') return `response.output_item.added · ${event.item.type}`;
  if (event.type === 'RUN_FINISHED' && event.outcome) return `RUN_FINISHED · ${event.outcome}`;
  if (event.type === 'RUN_ERROR' && event.code) return `RUN_ERROR · ${event.code}`;
  if (event.type === 'finish' && event.finishReason) return `finish · ${event.finishReason}`;
  return event.type;
}

// --- Pretend streams ----------------------------------------------------------------

const pieces = text => Array.from(text.matchAll(/[\s\S]{1,3}/g), match => match[0]);

// Each step: [event, delay before it in ms, text to show].
function plan(format, outcome, tool) {
  const steps = [];
  const add = (event, delay = 60, text) => steps.push({ event, delay, text });
  const words = outcome === 'refused' ? t('refusal') : t('reply');
  const thinkingDeltas = 20;

  if (format === 'ag-ui') {
    add({ type: 'RUN_STARTED', threadId: 't1', runId: 'r1' }, 0);
    add({ type: 'REASONING_START', messageId: 'm0' }, 200);
    for (let i = 0; i < thinkingDeltas; i++) add({ type: 'REASONING_MESSAGE_CONTENT', messageId: 'm0', delta: '…' }, 140);
    add({ type: 'REASONING_END', messageId: 'm0' });
    if (tool) {
      add({ type: 'TOOL_CALL_START', toolCallId: 'c1', toolCallName: 'web_search' }, 120);
      for (let i = 0; i < 4; i++) add({ type: 'TOOL_CALL_ARGS', toolCallId: 'c1', delta: '{"q"' }, 90);
      add({ type: 'TOOL_CALL_END', toolCallId: 'c1' });
      add({ type: 'TOOL_CALL_RESULT', toolCallId: 'c1', content: '…' }, 2400);
    }
    if (outcome === 'error') add({ type: 'RUN_ERROR', message: 'Upstream timeout' }, 600);
    else if (outcome === 'approval') add({ type: 'RUN_FINISHED', outcome: 'interrupt', interrupt: { reason: 'purchase' } }, 500, t('approval'));
    else {
      add({ type: 'TEXT_MESSAGE_START', messageId: 'm1', role: 'assistant' }, 300);
      for (const piece of pieces(words)) add({ type: 'TEXT_MESSAGE_CONTENT', messageId: 'm1', delta: piece }, 70, piece);
      add({ type: 'TEXT_MESSAGE_END', messageId: 'm1' });
      add(outcome === 'refused' ? { type: 'RUN_ERROR', code: 'content_filter', message: 'Refused' } : { type: 'RUN_FINISHED', threadId: 't1', runId: 'r1' }, 120);
    }
  }

  if (format === 'openai') {
    add({ type: 'response.created' }, 0);
    add({ type: 'response.in_progress' });
    add({ type: 'response.output_item.added', item: { type: 'reasoning' } }, 200);
    for (let i = 0; i < thinkingDeltas; i++) add({ type: 'response.reasoning_summary_text.delta', delta: '…' }, 140);
    if (tool) {
      add({ type: 'response.output_item.added', item: { type: 'web_search_call' } }, 120);
      add({ type: 'response.web_search_call.in_progress' });
      add({ type: 'response.web_search_call.searching' }, 1200);
      add({ type: 'response.web_search_call.completed' }, 1200);
    }
    if (outcome === 'error') add({ type: 'response.failed', response: { error: { message: 'Upstream timeout' } } }, 600);
    else if (outcome === 'approval') {
      add({ type: 'response.output_item.added', item: { type: 'mcp_approval_request' } }, 500, t('approval'));
      add({ type: 'response.completed', response: { output: [{ type: 'mcp_approval_request' }] } }, 100);
    } else {
      const delta = outcome === 'refused' ? 'response.refusal.delta' : 'response.output_text.delta';
      add({ type: 'response.output_item.added', item: { type: 'message' } }, 300);
      for (const piece of pieces(words)) add({ type: delta, delta: piece }, 70, piece);
      add({ type: outcome === 'refused' ? 'response.refusal.done' : 'response.output_text.done' });
      add({ type: 'response.completed', response: { output: [{ type: 'message', content: [{ type: outcome === 'refused' ? 'refusal' : 'output_text' }] }] } }, 120);
    }
  }

  if (format === 'anthropic') {
    add({ type: 'message_start', message: { role: 'assistant' } }, 0);
    add({ type: 'content_block_start', index: 0, content_block: { type: 'thinking' } }, 200);
    for (let i = 0; i < thinkingDeltas; i++) add({ type: 'content_block_delta', index: 0, delta: { type: 'thinking_delta', thinking: '…' } }, 140);
    add({ type: 'content_block_stop', index: 0 });
    if (tool && outcome !== 'approval') {
      add({ type: 'content_block_start', index: 1, content_block: { type: 'server_tool_use', name: 'web_search' } }, 120);
      for (let i = 0; i < 4; i++) add({ type: 'content_block_delta', index: 1, delta: { type: 'input_json_delta', partial_json: '{"q"' } }, 90);
      add({ type: 'content_block_stop', index: 1 });
      add({ type: 'content_block_start', index: 2, content_block: { type: 'web_search_tool_result' } }, 2400);
      add({ type: 'content_block_stop', index: 2 });
    }
    if (outcome === 'error') add({ type: 'error', error: { type: 'overloaded_error', message: 'Overloaded' } }, 600);
    else if (outcome === 'approval') {
      // Anthropic stops and asks the page to run the tool; asking the user is the page's call.
      add({ type: 'content_block_start', index: 1, content_block: { type: 'tool_use', name: 'subscribe_weather' } }, 300);
      for (let i = 0; i < 4; i++) add({ type: 'content_block_delta', index: 1, delta: { type: 'input_json_delta', partial_json: '{"plan"' } }, 90);
      add({ type: 'content_block_stop', index: 1 });
      add({ type: 'message_delta', delta: { stop_reason: 'tool_use' } });
      add({ type: 'message_stop' });
      add('approval', 500, t('approval'));
    } else {
      add({ type: 'content_block_start', index: 3, content_block: { type: 'text' } }, 300);
      for (const piece of pieces(words)) add({ type: 'content_block_delta', index: 3, delta: { type: 'text_delta', text: piece } }, 70, piece);
      add({ type: 'content_block_stop', index: 3 });
      add({ type: 'message_delta', delta: { stop_reason: outcome === 'refused' ? 'refusal' : 'end_turn' } }, 120);
      add({ type: 'message_stop' });
    }
  }

  if (format === 'ai-sdk') {
    add({ type: 'start' }, 0);
    add({ type: 'start-step' });
    add({ type: 'reasoning-start', id: 'r' }, 200);
    for (let i = 0; i < thinkingDeltas; i++) add({ type: 'reasoning-delta', id: 'r', delta: '…' }, 140);
    add({ type: 'reasoning-end', id: 'r' });
    if (tool) {
      add({ type: 'tool-input-start', toolCallId: 'c1', toolName: 'webSearch' }, 120);
      for (let i = 0; i < 4; i++) add({ type: 'tool-input-delta', toolCallId: 'c1', inputTextDelta: '{"q"' }, 90);
      add({ type: 'tool-input-available', toolCallId: 'c1', toolName: 'webSearch', input: {} });
      add({ type: 'tool-output-available', toolCallId: 'c1', output: {} }, 2400);
    }
    if (outcome === 'error') add({ type: 'error', errorText: 'Upstream timeout' }, 600);
    else if (outcome === 'approval') {
      add({ type: 'tool-approval-request', approvalId: 'a1', toolCallId: 'c2' }, 500, t('approval'));
      add({ type: 'finish-step' });
      add({ type: 'finish' });
    }
    else {
      add({ type: 'text-start', id: 't' }, 300);
      for (const piece of pieces(words)) add({ type: 'text-delta', id: 't', delta: piece }, 70, piece);
      add({ type: 'text-end', id: 't' });
      add({ type: 'finish-step' }, 120);
      add(outcome === 'refused' ? { type: 'finish', finishReason: 'content-filter' } : { type: 'finish', finishReason: 'stop' });
    }
  }
  return steps;
}

async function* pretendStream(steps) {
  for (const step of steps) {
    if (step.delay) await new Promise(resolve => setTimeout(resolve, step.delay));
    if (step.text) replyEl.textContent += step.text;
    yield step.event;
  }
}

// --- Run --------------------------------------------------------------------------

let agent = null;

async function run() {
  if (running) return;
  running = true;
  stopRequested = false;
  runButton.disabled = true;
  stopButton.disabled = false;
  replyEl.textContent = '';
  eventsEl.textContent = '';
  lastRow = null;

  let changed = false;
  agent = connectAgent(face, {
    actions: actionsFromSettings(),
    onChange: state => { changed = true; showState(state); },
  });
  const steps = plan(settings.format, settings.outcome, useTool.checked);
  let caught = null;
  try {
    for await (const event of agent.track(pretendStream(steps))) {
      if (typeof event === 'string') logNote(`${t('yourCode')} agent.handle('${event}')`);
      logEvent(labelOf(event), agent.state, changed);
      changed = false;
      if (stopRequested) break;
    }
  } catch (error) {
    caught = error;
  }
  if (stopRequested) {
    replyEl.textContent += (replyEl.textContent ? '\n' : '') + t('cancelled');
    logNote(`break → ${agent.state}`);
  }
  if (settings.outcome === 'error' && !stopRequested) replyEl.textContent = t('failed');
  if (caught) console.error(caught);
  running = false;
  runButton.disabled = false;
  stopButton.disabled = true;
}

// --- Wiring -------------------------------------------------------------------------

for (const group of document.querySelectorAll('[data-group]')) {
  group.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    settings[group.dataset.group] = button.dataset.value;
    syncChips();
  });
}
for (const button of document.querySelectorAll('[data-lang]')) {
  button.addEventListener('click', () => {
    lang = button.dataset.lang;
    params.set('lang', lang === 'zh' ? 'zh-CN' : 'en');
    const url = new URL(location.href);
    url.searchParams.set('lang', params.get('lang'));
    history.replaceState(null, '', url);
    applyLanguage();
  });
}
runButton.addEventListener('click', run);
stopButton.addEventListener('click', () => { stopRequested = true; });

markDotSeen('nav-agent');
syncChips();
applyLanguage();
