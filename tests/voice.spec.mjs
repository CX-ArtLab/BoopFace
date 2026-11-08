import { expect, test } from '@playwright/test';

// Listening and speaking: the two voice loops, the loudness they follow, and
// connectAgent() driving them from OpenAI Realtime events.
test.beforeEach(async ({ page }) => {
  await page.route('**/voice-test.html', route => route.fulfill({
    contentType: 'text/html',
    body: '<!doctype html><title>voice</title><boop-face id="avatar" motion="full"></boop-face>',
  }));
  await page.goto('/voice-test.html');
  await page.evaluate(async () => {
    window.boop = await import('/boopface.js');
    await customElements.whenDefined('boop-face');
    window.avatar = document.querySelector('#avatar');
    window.wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    window.events = [];
    window.avatar.addEventListener('action-state', event => window.events.push(`${event.detail.action}:${event.detail.phase}`));
    window.eyeScale = () => Number((window.avatar.shadowRoot.getElementById('leftEye').getAttribute('transform').match(/scale\(([\d.]+)/) || [0, 1])[1]);
  });
});

test('listening leans in and opens the eyes with the loudness', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startListening();
    await window.wait(400);
    const quiet = window.eyeScale();
    const timer = setInterval(() => window.avatar.setVoiceLevel(1), 30);
    await window.wait(400);
    clearInterval(timer);
    const loud = window.eyeScale();
    const head = window.avatar.shadowRoot.getElementById('headMotion').style.transform;
    window.avatar.reset();
    await window.wait(50);
    return { quiet, loud, head, after: window.avatar.shadowRoot.getElementById('headMotion').style.transform, events: window.events };
  });
  expect(result.quiet).toBeGreaterThan(1.02);
  expect(result.loud).toBeGreaterThan(result.quiet + 0.06);
  expect(result.head).toContain('translateY');
  expect(result.after).toBe('');
  expect(result.events).toEqual(['listening:start', 'listening:cancel']);
});

test('speaking keeps its own rhythm, and the bars follow the loudness', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startSpeaking();
    const samples = [];
    for (let i = 0; i < 20; i++) { await window.wait(40); samples.push(window.eyeScale()); }
    await window.avatar.startSpeaking({ variant: 'bars' });
    const ry = () => Number(window.avatar.shadowRoot.getElementById('leftBase').getAttribute('ry'));
    window.avatar.setVoiceLevel(0);
    const timerQuiet = setInterval(() => window.avatar.setVoiceLevel(0), 30);
    await window.wait(450);
    clearInterval(timerQuiet);
    const quiet = ry();
    const timerLoud = setInterval(() => window.avatar.setVoiceLevel(1), 30);
    await window.wait(300);
    clearInterval(timerLoud);
    return { moving: Math.max(...samples) - Math.min(...samples), quiet, loud: ry(), state: window.avatar._voiceFx?.mode };
  });
  expect(result.moving).toBeGreaterThan(0.02);
  expect(result.quiet).toBeLessThan(14);
  expect(result.loud).toBeGreaterThan(26);
  expect(result.state).toBe('speaking');
});

test('one round of play() ends on its own; mistakes are reported', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.play('listening-tilt');
    const ended = window.events.slice();
    const errors = [];
    try { await window.avatar.startSpeaking({ variant: 'sing' }); } catch (error) { errors.push(error.constructor.name); }
    return { ended, voice: window.avatar._voiceFx, errors };
  });
  expect(result.ended).toEqual(['listening:start', 'listening:end']);
  expect(result.voice).toBeNull();
  expect(result.errors).toEqual(['TypeError']);
});

test('reduced motion holds still poses', async ({ page }) => {
  const result = await page.evaluate(async () => {
    window.avatar.setAttribute('motion', 'reduce');
    await window.avatar.startSpeaking({ variant: 'bars' });
    const ry = () => window.avatar.shadowRoot.getElementById('leftBase').getAttribute('ry');
    await window.wait(300);
    const first = ry();
    await window.wait(300);
    return { first, second: ry() };
  });
  expect(result.first).toBe(result.second);
});

test('connectAgent follows an OpenAI Realtime voice turn', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const states = [];
    const agent = window.boop.connectAgent(window.avatar, { onChange: state => states.push(state) });
    agent.handle({ type: 'input_audio_buffer.speech_started' });
    await window.wait(200);
    agent.handle({ type: 'input_audio_buffer.speech_stopped' });
    agent.handle({ type: 'response.created' });
    await window.wait(200);
    agent.handle({ type: 'output_audio_buffer.started' });
    agent.handle({ type: 'response.output_audio_transcript.delta', delta: 'Hi' });
    // Generation can end while the reply is still playing.
    agent.handle({ type: 'response.done', response: { status: 'completed' } });
    const whilePlaying = agent.state;
    agent.handle({ type: 'output_audio_buffer.stopped' });
    await window.wait(2000);
    return { states, whilePlaying, state: agent.state, voice: window.avatar._voiceFx?.mode, events: window.events };
  });
  expect(result.states).toEqual(['listening', 'thinking', 'speaking', 'listening']);
  expect(result.whilePlaying).toBe('speaking');
  expect(result.voice).toBe('listening');
  expect(result.events).not.toContain('success:start');
});

test('switching the listening style keeps one running action', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startListening();
    await window.avatar.startListening();
    await window.avatar.startListening({ variant: 'tilt' });
    return { events: window.events, active: window.avatar._activeActionState?.action, variant: window.avatar._voiceFx?.variant };
  });
  expect(result.events).toEqual(['listening:start', 'listening:cancel', 'listening:start']);
  expect(result).toMatchObject({ active: 'listening', variant: 'tilt' });
});
