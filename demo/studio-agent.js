// Connect AI for the Studio: pretend replies in the four wire formats a real
// SDK delivers (AG-UI, OpenAI Responses, Anthropic Messages, Vercel AI SDK),
// fed to the real connectAgent() exactly like a page would, plus the code a
// page writes for each format. Taken from the old Connect AI page.

const pieces = text => Array.from(text.matchAll(/[\s\S]{1,3}/g), match => match[0]);

// Each step: [event, delay before it in ms, text to show].
export function plan(format, outcome, tool, text) {
  const steps = [];
  const add = (event, delay = 60, text) => steps.push({ event, delay, text });
  const words = outcome === 'refused' ? text.refusal : text.reply;
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
    else if (outcome === 'approval') add({ type: 'RUN_FINISHED', outcome: 'interrupt', interrupt: { reason: 'purchase' } }, 500, text.approval);
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
      add({ type: 'response.output_item.added', item: { type: 'mcp_approval_request' } }, 500, text.approval);
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
      add('approval', 500, text.approval);
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
      add({ type: 'tool-approval-request', approvalId: 'a1', toolCallId: 'c2' }, 500, text.approval);
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


// Feed the steps one by one, waiting as a real stream would.
export async function* pretendStream(steps, onText) {
  for (const step of steps) {
    if (step.delay) await new Promise(resolve => setTimeout(resolve, step.delay));
    if (step.text) onText?.(step.text);
    yield step.event;
  }
}

export const SOURCES = {
  'ag-ui': {
    imports: ["import { HttpAgent } from '@ag-ui/client';"],
    body: [
      "const remote = new HttpAgent({ url: '/api/agent' });",
      '',
      'await remote.runAgent({}, {',
      '  onEvent: ({ event }) => agent.handle(event),',
      '});',
    ],
  },
  openai: {
    imports: ["import OpenAI from 'openai';"],
    body: [
      'const stream = await new OpenAI().responses.create({',
      '  model: MODEL, input: question, stream: true,',
      '});',
      '',
      'for await (const event of agent.track(stream)) {',
      '  COMMENT',
      '}',
    ],
  },
  anthropic: {
    imports: ["import Anthropic from '@anthropic-ai/sdk';"],
    body: [
      'const stream = await new Anthropic().messages.create({',
      '  model: MODEL, max_tokens: 1024, stream: true,',
      "  messages: [{ role: 'user', content: question }],",
      '});',
      '',
      'for await (const event of agent.track(stream)) {',
      '  COMMENT',
      '}',
    ],
  },
  realtime: {
    imports: [],
    body: [
      '// For example, OpenAI Realtime over WebRTC',
      "const events = peer.createDataChannel('oai-events');",
      'events.onmessage = ({ data }) => agent.handle(JSON.parse(data));',
      '',
      'agent.connectAudio({ input: microphone, output: replyAudio });',
    ],
  },
  'ai-sdk': {
    imports: ["import { streamText } from 'ai';"],
    body: [
      'const result = streamText({ model, prompt: question });',
      '',
      'for await (const part of agent.track(result.fullStream)) {',
      '  COMMENT',
      '}',
    ],
  },
};


export const DEFAULT_AGENT_ACTIONS = Object.freeze({ thinking: 'waiting-spin', tool: 'waiting-wave', replying: 'idle' });

// The page's code for one format, with only the actions that differ from the defaults.
export function agentCode(format, actions = {}) {
  const changed = Object.entries(actions).filter(([state, action]) => DEFAULT_AGENT_ACTIONS[state] !== action);
  const source = SOURCES[format] || SOURCES.openai;
  const create = changed.length
    ? ['const agent = connectAgent(avatar, {', `  actions: { ${changed.map(([state, action]) => `${state}: '${action}'`).join(', ')} },`, '});']
    : ['const agent = connectAgent(avatar);'];
  return [...source.imports, "import { connectAgent } from 'boopface';", '', ...create, ...(source.body.length ? [''] : []), ...source.body]
    .map(line => line.replace('COMMENT', '// 照常显示回复')).join('\n');
}

export function labelOf(event) {
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
