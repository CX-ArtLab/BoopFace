import { expect, test } from '@playwright/test';

// The voice set: listening (one round eye), thinking (a turning flower of two
// ovals), speaking (two eyes that stretch with the reply), and connectAgent()
// driving it from OpenAI Realtime events.
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
    const root = window.avatar.shadowRoot;
    window.shape = side => {
      const rect = root.getElementById(`${side}InputBase`);
      const eye = root.getElementById(`${side}Eye`).getAttribute('transform');
      const [, x, y] = eye.match(/translate\(([-\d.]+) ([-\d.]+)\)/) || [];
      const angle = Number((eye.match(/rotate\(([-\d.]+)\)/) || [0, 0])[1]);
      return { x: Number(x), y: Number(y), w: Number(rect.getAttribute('width')), h: Number(rect.getAttribute('height')),
        corner: Number(rect.getAttribute('ry')), shown: rect.getAttribute('opacity') === '1', angle };
    };
    window.feed = (level, ms) => new Promise(resolve => {
      const timer = setInterval(() => window.avatar.setVoiceLevel(level), 25);
      setTimeout(() => { clearInterval(timer); resolve(); }, ms);
    });
  });
});

test('listening merges the eyes into one round eye that swells with the voice', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startListening();
    await window.wait(600);
    const quiet = [window.shape('left'), window.shape('right')];
    await window.feed(1, 400);
    return { quiet, loud: window.shape('left'), events: window.events };
  });
  const [left, right] = result.quiet;
  expect(left).toMatchObject({ x: 120, y: 121, shown: true });
  expect(right).toMatchObject({ x: 120, y: 121 });
  expect(left.w).toBeCloseTo(93, 0);
  expect(left.h).toBeCloseTo(left.w, 1);
  expect(result.loud.w).toBeGreaterThan(105);
  expect(result.events).toEqual(['listening:start']);
});

test('the flower waiting style turns two crossed ovals', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startWaiting({ variant: 'flower' });
    await window.wait(800);
    const first = [window.shape('left'), window.shape('right')];
    await window.wait(500);
    return { first, later: window.shape('left') };
  });
  const [left, right] = result.first;
  expect(left.w).toBeGreaterThan(left.h);
  expect(right.h).toBeGreaterThan(right.w);
  expect(Math.max(left.w, right.h)).toBeCloseTo(111, 0);
  expect(Math.abs(result.later.angle - left.angle)).toBeGreaterThan(15);
});

test('speaking splits and settles first, then stretches each eye with its band', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startWaiting({ variant: 'flower' });
    await window.wait(700);
    await window.avatar.startSpeaking();
    await window.wait(700);
    // Split done, still settling: the standard eyes, even with sound coming in.
    window.avatar.setVoiceLevel([1, 0]);
    const settled = [window.shape('left'), window.shape('right')];
    await window.feed([1, 0], 500);
    return { settled, left: window.shape('left'), right: window.shape('right'), mode: window.avatar._voiceFx?.mode };
  });
  expect(result.settled[0]).toMatchObject({ x: 86.03, y: 126, angle: 0 });
  expect(result.settled[1].x).toBeCloseTo(153.97, 2);
  expect(result.settled[0].h).toBeCloseTo(57.98, 0);
  expect(result.left.h).toBeGreaterThan(66);
  expect(result.right.h).toBeLessThan(60);
  // Rounded ends stay the standard size while the eye grows.
  expect(result.left.corner).toBeCloseTo(28.99, 1);
  expect(result.left.w).toBeCloseTo(53.94, 1);
  expect(result.mode).toBe('speaking');
});

test('speaking keeps a rhythm of its own without any sound fed in', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startSpeaking();
    await window.wait(300);
    const heights = [];
    for (let i = 0; i < 25; i++) { await window.wait(40); heights.push(window.shape('left').h); }
    return Math.max(...heights) - Math.min(...heights);
  });
  expect(result).toBeGreaterThan(4);
});

test('steps of the set follow each other without resetting, and leaving eases back', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.startListening();
    await window.wait(500);
    await window.avatar.startWaiting({ variant: 'flower' });
    // Right after the switch the eye is still round: a morph, not a jump.
    const morphing = window.shape('left');
    await window.avatar.startSpeaking();
    await window.wait(1500);
    window.avatar.play('success');
    await window.wait(60);
    const exiting = window.shape('left');
    await window.wait(2600);
    const root = window.avatar.shadowRoot;
    return { morphing, exiting, after: root.getElementById('leftInputBase').getAttribute('opacity'),
      ellipse: Number(root.getElementById('leftBase').getAttribute('opacity')), events: window.events };
  });
  expect(result.morphing.w).toBeGreaterThan(85);
  expect(result.exiting.shown).toBe(true);
  expect(result.after).toBe('0');
  expect(result.ellipse).toBe(1);
  expect(result.events).toEqual([
    'listening:start', 'listening:cancel', 'waiting:start', 'waiting:cancel',
    'speaking:start', 'speaking:cancel', 'success:start', 'success:end',
  ]);
});

test('one round of play() ends on its own', async ({ page }) => {
  const result = await page.evaluate(async () => {
    await window.avatar.play('listening');
    return { events: window.events, voice: window.avatar._voiceFx };
  });
  expect(result.events).toEqual(['listening:start', 'listening:end']);
  expect(result.voice).toBeNull();
});

test('reduced motion holds still poses', async ({ page }) => {
  const result = await page.evaluate(async () => {
    window.avatar.setAttribute('motion', 'reduce');
    await window.avatar.startWaiting({ variant: 'flower' });
    await window.wait(300);
    const first = window.shape('left');
    await window.wait(400);
    return { first, second: window.shape('left') };
  });
  expect(result.second).toEqual(result.first);
});

test('connectAgent follows an OpenAI Realtime voice turn', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const states = [];
    const agent = window.boop.connectAgent(window.avatar, { onChange: state => states.push(state) });
    agent.handle({ type: 'input_audio_buffer.speech_started' });
    await window.wait(200);
    agent.handle({ type: 'input_audio_buffer.speech_stopped' });
    agent.handle({ type: 'response.created' });
    await window.wait(300);
    const thinking = window.avatar._voiceFx?.mode;
    agent.handle({ type: 'output_audio_buffer.started' });
    agent.handle({ type: 'response.output_audio_transcript.delta', delta: 'Hi' });
    // Generation can end while the reply is still playing.
    agent.handle({ type: 'response.done', response: { status: 'completed' } });
    const whilePlaying = agent.state;
    agent.handle({ type: 'output_audio_buffer.stopped' });
    await window.wait(600);
    return { states, thinking, whilePlaying, state: agent.state, voice: window.avatar._voiceFx?.mode, events: window.events };
  });
  expect(result.states).toEqual(['listening', 'thinking', 'speaking', 'listening']);
  expect(result.thinking).toBe('thinking');
  expect(result.whilePlaying).toBe('speaking');
  expect(result.voice).toBe('listening');
  expect(result.events).not.toContain('success:start');
});

test('the flower is a waiting style: one round, stopWaiting, and the same waiting events', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const states = [];
    window.avatar.addEventListener('face-state', event => states.push(event.detail.state));
    await window.avatar.play('waiting-flower');
    const round = window.events.slice();
    await window.avatar.startWaiting({ variant: 'flower' });
    window.avatar.stopWaiting();
    return { round, events: window.events, states, voice: window.avatar._voiceFx };
  });
  expect(result.round).toEqual(['waiting:start', 'waiting:end']);
  expect(result.events.slice(2)).toEqual(['waiting:start', 'waiting:end']);
  expect(result.states).toContain('waiting');
  expect(result.states).not.toContain('thinking');
  expect(result.voice).toBeNull();
});

test('a voice conversation can think with any other waiting style', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const agent = window.boop.connectAgent(window.avatar, { actions: { thinking: 'waiting-wave' } });
    agent.handle({ type: 'input_audio_buffer.speech_started' });
    await window.wait(600);
    agent.handle({ type: 'input_audio_buffer.speech_stopped' });
    await window.wait(600);
    const thinking = { wave: window.avatar._waitingFx?.variant, voice: window.avatar._voiceFx?.mode ?? null };
    agent.handle({ type: 'response.output_audio.delta' });
    await window.wait(1200);
    return { thinking, speaking: window.avatar._voiceFx?.mode, waiting: window.avatar._waitingFx };
  });
  expect(result.thinking).toEqual({ wave: 'wave', voice: null });
  expect(result.speaking).toBe('speaking');
  expect(result.waiting).toBeNull();
});
