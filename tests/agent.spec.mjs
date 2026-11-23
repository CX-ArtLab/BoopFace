import { expect, test } from '@playwright/test';

// connectAgent() turns AI stream events into avatar actions. These tests run the
// real component and read its own action-state events.
test.beforeEach(async ({ page }) => {
  await page.route('**/agent-test.html', route => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>agent</title><boop-face id="avatar" motion="full"></boop-face>',
  }));
  await page.goto('/agent-test.html');
  await page.evaluate(async () => {
    window.boop = await import('/boopface.js');
    await customElements.whenDefined('boop-face');
    const avatar = document.querySelector('#avatar');
    window.actions = [];
    avatar.addEventListener('action-state', event => {
      if (event.detail.phase === 'start') window.actions.push(event.detail.action);
    });
  });
});

const settle = (page, ms = 250) => page.evaluate(wait => new Promise(resolve => setTimeout(resolve, wait)), ms);
// A waiting loop finishes its round before the next expression: at most one orbit.
const ROUND = 2600;

test('an AG-UI run shows waiting, then success', async ({ page }) => {
  await page.evaluate(() => {
    window.agent = window.boop.connectAgent('#avatar');
    window.agent.handle({ type: 'RUN_STARTED' });
  });
  await settle(page);
  await page.evaluate(() => {
    window.agent.handle({ type: 'TOOL_CALL_START' });
  });
  await settle(page);
  // The thinking orbit is still finishing its round; the state already moved on.
  expect(await page.evaluate(() => ({ state: window.agent.state, actions: window.actions.length }))).toEqual({ state: 'tool', actions: 1 });
  await settle(page, ROUND);
  await page.evaluate(() => {
    window.agent.handle({ type: 'TOOL_CALL_RESULT' });
    window.agent.handle({ type: 'TEXT_MESSAGE_START', role: 'assistant' });
    window.agent.handle({ type: 'TEXT_MESSAGE_CONTENT', delta: 'Hi' });
    window.agent.handle({ type: 'RUN_FINISHED' });
  });
  await settle(page, ROUND);
  const result = await page.evaluate(() => ({ state: window.agent.state, actions: window.actions }));
  expect(result.state).toBe('done');
  expect(result.actions[0]).toBe('waiting');
  expect(result.actions.at(-1)).toBe('success');
});

test('refusal, failure and a finish after failure', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const agent = window.boop.connectAgent(document.querySelector('#avatar'));
    agent.handle({ type: 'message_start' });
    agent.handle({ type: 'message_delta', delta: { stop_reason: 'refusal' } });
    agent.handle({ type: 'message_stop' });
    await wait(200);
    const refused = { state: agent.state, last: window.actions.at(-1) };
    agent.handle({ type: 'start' });
    agent.handle({ type: 'error', errorText: 'offline' });
    agent.handle({ type: 'finish' });
    await wait(200);
    return { refused, state: agent.state, last: window.actions.at(-1) };
  });
  expect(result.refused).toEqual({ state: 'refused', last: 'refuse' });
  expect(result).toMatchObject({ state: 'error', last: 'failure' });
});

test('track() follows a stream and passes every item through', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const agent = window.boop.connectAgent('#avatar');
    async function* stream() {
      yield { type: 'response.created' };
      await new Promise(resolve => setTimeout(resolve, 150));
      yield { type: 'response.output_text.delta', delta: 'Hel' };
      yield { type: 'response.output_text.delta', delta: 'lo' };
    }
    let text = '';
    for await (const event of agent.track(stream())) text += event.delta || '';
    await new Promise(resolve => setTimeout(resolve, 2600));
    const clean = { text, state: agent.state, last: window.actions.at(-1) };

    async function* broken() {
      yield { type: 'response.created' };
      throw new Error('network');
    }
    let caught = '';
    try {
      for await (const event of agent.track(broken())) void event;
    } catch (error) {
      caught = error.message;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
    return { clean, caught, state: agent.state, last: window.actions.at(-1) };
  });
  expect(result.clean).toEqual({ text: 'Hello', state: 'done', last: 'success' });
  expect(result).toMatchObject({ caught: 'network', state: 'error', last: 'failure' });
});

test('custom actions, onChange and clear mistakes', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const changes = [];
    const agent = window.boop.connectAgent('#avatar', {
      actions: { replying: 'input', done: null },
      onChange: (state, previous) => changes.push(`${previous}>${state}`),
    });
    agent.handle('submitted');
    agent.handle('streaming');
    // The cursor eyes appear after the face settles (about half a second).
    await new Promise(resolve => setTimeout(resolve, 800));
    const avatar = document.querySelector('#avatar');
    const typingEyes = avatar._state;
    agent.handle('ready');
    const errors = [];
    // Thinking and replying share one loop: it keeps going instead of restarting.
    const shared = window.boop.connectAgent(avatar, { actions: { replying: 'waiting-spin' } });
    shared.handle('thinking');
    // Coming from the typing cursor, the eyes first slide apart (360 ms).
    await new Promise(resolve => setTimeout(resolve, 600));
    const loopStart = avatar._waitingFx?.start;
    shared.handle('streaming');
    await new Promise(resolve => setTimeout(resolve, 300));
    const sameLoop = loopStart !== undefined && avatar._waitingFx?.start === loopStart;
    for (const options of [{ actions: { talking: 'idle' } }, { actions: { done: 'party' } }]) {
      try { window.boop.connectAgent(avatar, options); } catch (error) { errors.push(error.constructor.name); }
    }
    try { window.boop.connectAgent('#missing'); } catch (error) { errors.push(error.constructor.name); }
    return { changes, typingEyes, state: agent.state, errors, sameLoop };
  });
  expect(result.changes).toEqual(['idle>thinking', 'thinking>replying', 'replying>done']);
  expect(result.typingEyes).toBe('input');
  expect(result.state).toBe('done');
  expect(result.errors).toEqual(['TypeError', 'TypeError', 'TypeError']);
  expect(result.sameLoop).toBe(true);
});

test('a run waiting for approval or for a page tool is not a success', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    const agent = window.boop.connectAgent('#avatar');
    async function* approval() {
      yield { type: 'start' };
      yield { type: 'tool-approval-request', approvalId: 'a1', toolCallId: 'c1' };
      yield { type: 'finish' };
    }
    for await (const part of agent.track(approval())) void part;
    agent.handle('ready');
    await wait(200);
    const approvalState = agent.state;
    async function* toolHandOff() {
      yield { type: 'message_start' };
      yield { type: 'content_block_start', content_block: { type: 'tool_use', name: 'lookup' } };
      yield { type: 'message_delta', delta: { stop_reason: 'tool_use' } };
      yield { type: 'message_stop' };
    }
    for await (const event of agent.track(toolHandOff())) void event;
    await wait(200);
    return { approvalState, state: agent.state, actions: window.actions };
  });
  expect(result.approvalState).toBe('approval');
  expect(result.state).toBe('tool');
  expect(result.actions).toContain('wary');
  expect(result.actions).not.toContain('success');
});
