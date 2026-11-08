import { expect, test } from '@playwright/test';

// The demo's voice row: three steps, a thinking style menu and Play all.
test('the voice row plays each step and lets the thinking style be chosen', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/demo/?lang=zh-CN', { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('data-demo-ready', 'true');
  const row = page.locator('.demo-voice-row');
  await expect(row.locator('[data-voice]')).toHaveText(['聆听', '思考 · 绽放', '说话']);

  await row.locator('.demo-voice-think-toggle').click();
  await expect(row.locator('.demo-voice-menu')).toBeVisible();
  await expect(row.locator('.demo-voice-menu [data-style]')).toHaveText(['绽放', '旋转', '滚动', '波动']);
  await row.locator('.demo-voice-menu [data-style="wave"]').click();
  await expect(row.locator('.demo-voice-menu')).toBeHidden();
  await expect(row.locator('[data-voice="thinking"]')).toHaveText('思考 · 波动');

  await row.locator('[data-voice="thinking"]').click();
  await expect.poll(() => page.evaluate(() => document.getElementById('face')._waitingFx?.variant)).toBe('wave');

  // Play all runs listening first, with the sound off here.
  await row.locator('.demo-voice-sound').click();
  await row.locator('.demo-voice-play').click();
  await expect.poll(() => page.evaluate(() => document.getElementById('face')._voiceFx?.mode), { timeout: 10000 }).toBe('listening');
  await expect(row.locator('.demo-voice-play')).toHaveText('停止');
  await expect(row.locator('[data-voice="listening"]')).toHaveClass(/is-active/);
  await row.locator('.demo-voice-play').click();
  await expect(row.locator('.demo-voice-play')).toHaveText('播放一轮对话');
  await expect(row.locator('[data-voice].is-active')).toHaveCount(0);
  expect(errors).toEqual([]);
});
