import { expect, test } from '@playwright/test';

// The demo home is the Studio. Everything it shows must really work in the
// component, so these tests drive its controls and check the avatar itself.

const ready = async page => {
  await page.waitForFunction(() => document.getElementById('stageFace')?.shadowRoot && customElements.get('boop-face'));
};

test('the Studio loads without errors, preloads the component and shows the real version', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo/');
  await ready(page);
  const preloads = await page.locator('link[rel="modulepreload"]').evaluateAll(links => links.map(l => l.getAttribute('href')));
  expect(preloads).toContain('../boopface.js');
  const version = await page.evaluate(() => window.BoopFaceVersion);
  await expect(page.locator('#versionBadge')).toHaveText(`v${version}`);
  expect(errors).toEqual([]);
});

test('the stage starts in 3D and the switch turns it flat and back', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  await expect.poll(() => face.evaluate(f => f.dataset.view)).toBe('3d');
  await page.locator('[data-dimension-btn="2d"]').click();
  await expect.poll(() => face.evaluate(f => f.view + '|' + (f.dataset.view || ''))).toBe('2d|');
  await page.locator('[data-dimension-btn="3d"]').click();
  await expect.poll(() => face.evaluate(f => f.dataset.view)).toBe('3d');
});

test('every expression button plays its real action', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  // New actions carry a red dot until they are clicked.
  await expect(page.locator('[data-action="bow"][data-new="true"]')).toHaveCount(1);
  for (const action of ['bow', 'shake', 'wink', 'observe', 'think', 'dizzy', 'shape-wait']) {
    const started = face.evaluate((f, name) => new Promise(resolve => {
      const on = e => { if (e.detail.phase === 'start') { f.removeEventListener('action-state', on); resolve(e.detail.action); } };
      f.addEventListener('action-state', on);
    }), action);
    await page.locator(`[data-action="${action}"]`).click();
    expect(await started).toBe(action);
  }
  await expect(page.locator('[data-action="bow"][data-new="true"]')).toHaveCount(0);
});

test('looping waiting starts once and keeps going until the loop is switched off', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('#loopToggle').evaluate(input => { input.checked = true; input.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.locator('[data-action="waiting-spin"]').click();
  const face = page.locator('#stageFace');
  await expect.poll(() => face.evaluate(f => f._waitingFx?.continuous)).toBe(true);
  const first = await face.evaluate(f => f._waitingFx.start);
  await page.waitForTimeout(500);
  expect(await face.evaluate(f => f._waitingFx.start)).toBe(first);
  await page.locator('#loopToggle').evaluate(input => { input.checked = false; input.dispatchEvent(new Event('change', { bubbles: true })); });
  await expect.poll(() => face.evaluate(f => f._waitingFx)).toBe(null);
});

test('the Voice Kit steps play the real listening, thinking and speaking', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('[data-dock-tab="voice"]').click();
  const face = page.locator('#stageFace');
  await page.locator('[data-voice-stage="listening"]').click();
  await expect.poll(() => face.evaluate(f => f._voiceFx?.mode)).toBe('listening');
  await page.locator('#voiceThinkMenuBtn').click();
  await page.locator('[data-think-style="cross"]').click();
  await expect.poll(() => face.evaluate(f => f._voiceFx?.mode + '|' + f._voiceFx?.style)).toBe('thinking|cross');
  await page.locator('[data-voice-stage="speaking"]').click();
  await expect.poll(() => face.evaluate(f => f._voiceFx?.mode)).toBe('speaking');
});

test('the chat scene runs a reply through connectAgent', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('[data-scene-tab="chat"]').click();
  await page.locator('#chatInput').fill('你好');
  await page.locator('#chatInput').press('Enter');
  const status = page.locator('.talk-agent').last().locator('.talk-status');
  await expect(status).toHaveAttribute('data-state', /thinking/);
  await expect(status).toHaveAttribute('data-state', /done|failed|asking/, { timeout: 15000 });
});

test('the code tab shows the Connect AI code for the chosen format', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('[data-inspector-tab="behavior"]').click();
  await page.locator('[data-agent="format"] [data-value="anthropic"]').click();
  await page.locator('[data-inspector-tab="code"]').click();
  await page.locator('[data-dev-tab="agent"]').click();
  await expect(page.locator('#devCode')).toContainText("import Anthropic from '@anthropic-ai/sdk';");
  await expect(page.locator('#devCode')).toContainText('connectAgent(avatar)');
});

test('the page follows the linked language, remembers a choice and falls back to the browser', async ({ page, browser, baseURL }) => {
  await page.goto('/demo/?lang=en');
  await ready(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('[data-action="bow"]')).toHaveText('Bow');
  await page.locator('#langToggle').click();
  await page.locator('[data-lang="zh-CN"]').click();
  await expect(page.locator('[data-action="bow"]')).toHaveText('鞠躬');
  await page.goto('/demo/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');

  const context = await browser.newContext({ locale: 'en-US', baseURL });
  const other = await context.newPage();
  await other.goto('/demo/');
  await expect(other.locator('html')).toHaveAttribute('lang', 'en');
  await context.close();
});

test('old addresses land in the Studio', async ({ page }) => {
  await page.goto('/demo/skins.html');
  await expect(page).toHaveURL(/#skins$/);
  await expect(page.locator('[data-panel="skins"]')).toBeVisible();
  await page.goto('/demo/agent.html');
  await expect(page).toHaveURL(/#agent$/);
  await expect(page.locator('#chatSceneView')).toBeVisible();
});

test('the eye colour row paints the real eyes, turns see-through off, and is greyed out on skins that keep their eyes', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  const row = page.locator('#eyeColorRow');
  // The default skin (101) keeps its own eyes.
  await expect(row).toHaveClass(/is-locked/);
  await page.locator('[data-surface-btn="flat"]').click();
  await expect(row).not.toHaveClass(/is-locked/);
  await expect(page.locator('#eyeThroughToggle')).toBeChecked();
  await page.locator('#eyeDotsRow [data-slot-idx="0"]').click();
  await expect(page.locator('#eyeThroughToggle')).not.toBeChecked();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('#2bd67b');
  await page.locator('[data-inspector-tab="code"]').click();
  await page.locator('[data-dev-tab="html"]').click();
  await expect(page.locator('#devCode')).toContainText('eye-color="#2bd67b"');
  // Swapping head and background leaves the eyes alone.
  await page.locator('[data-inspector-tab="look"]').click();
  await page.locator('#swapColorsBtn').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('#2bd67b');
  // Auto gives the avatar its own eyes back.
  await page.locator('#eyeDotsRow [data-eye-auto]').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBeNull();
});
