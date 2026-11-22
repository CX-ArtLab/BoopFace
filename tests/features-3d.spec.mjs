import { expect, test } from '@playwright/test';

// The 3D release: rounded eyes, eye colour, new expressions, the cross wait,
// petting and the 3D view, all on the plain component.

const page0 = async (page, html) => {
  await page.goto('/examples/basic.html');
  await page.evaluate(markup => { document.body.innerHTML = markup; }, html);
  await page.waitForFunction(() => [...document.querySelectorAll('boop-face')].every(f => f.shadowRoot?.getElementById('leftBase')));
};

test('lid corners are rounded by default and sharp on request', async ({ page }) => {
  await page0(page, '<boop-face id="a"></boop-face><boop-face id="b" eye-style="sharp"></boop-face>');
  await page.evaluate(() => { a.play('failure'); b.play('failure'); });
  await expect.poll(() => page.evaluate(() => a.shadowRoot.getElementById('leftBase').getAttribute('clip-path'))).toBe('url(#round-eye-left)');
  expect(await page.evaluate(() => b.shadowRoot.getElementById('leftBase').getAttribute('clip-path'))).toBeNull();
});

test('eye-color paints the eyes, and transparent cuts them out of the head', async ({ page }) => {
  await page0(page, '<boop-face id="a" eye-color="#2bd67b"></boop-face><boop-face id="b" eye-color="transparent"></boop-face>');
  await expect.poll(() => page.evaluate(() => getComputedStyle(a.shadowRoot.getElementById('leftBase')).fill)).toBe('rgb(43, 214, 123)');
  await expect.poll(() => page.evaluate(() => b.shadowRoot.getElementById('headMotion').getAttribute('mask'))).toBe('url(#eye-through)');
  await page.evaluate(() => b.setEyeColor(null));
  await expect.poll(() => page.evaluate(() => b.shadowRoot.getElementById('headMotion').getAttribute('mask'))).toBeNull();
});

test('the new expressions start, finish and report themselves', async ({ page }) => {
  test.setTimeout(120000);
  await page0(page, '<boop-face id="a"></boop-face>');
  for (const action of ['bow', 'shake', 'observe', 'think', 'ponder', 'shape-wait', 'bounce', 'smug-bounce', 'dizzy', 'wink', 'smug']) {
    const phases = await page.evaluate(async name => {
      const seen = [];
      const on = e => { if (e.detail.action === name) seen.push(e.detail.phase); };
      a.addEventListener('action-state', on);
      await a.play(name);
      a.removeEventListener('action-state', on);
      return seen;
    }, action);
    expect(phases, action).toEqual(['start', 'end']);
  }
});

test('the cross wait rests on the × and turns a quarter at a time', async ({ page }) => {
  await page0(page, '<boop-face id="a"></boop-face>');
  await page.evaluate(() => a.startWaiting({ variant: 'cross' }));
  await expect.poll(() => page.evaluate(() => a._voiceFx?.style)).toBe('cross');
  // Past the morph out of the normal eyes.
  await page.waitForTimeout(700);
  const angles = await page.evaluate(async () => {
    const out = [];
    for (let i = 0; i < 100; i++) { await new Promise(r => setTimeout(r, 20)); out.push(+(/rotate\(([-\d.]+)/.exec(a.shadowRoot.getElementById('leftEye').getAttribute('transform'))?.[1] || 0)); }
    return out;
  });
  // Every resting angle is a diagonal (45°, 135°, …).
  const rests = angles.filter((v, i) => i && Math.abs(v - angles[i - 1]) < .3);
  expect(rests.length).toBeGreaterThan(0);
  // Slow near each stop: every near-still sample is close to a diagonal, never to + .
  for (const v of rests) expect(Math.abs(((v % 90) + 90) % 90 - 45)).toBeLessThan(10);
});

test('stroking the forehead pets the avatar, and setPetting(false) stops it', async ({ page }) => {
  await page0(page, '<boop-face id="a" size="240" style="margin:40px"></boop-face>');
  const stroke = async () => {
    const box = await page.locator('#a').boundingBox(), x = box.x + box.width / 2, y = box.y + box.height * .25;
    await page.mouse.move(x, y);
    for (let i = 0; i < 6; i++) { await page.mouse.move(x + 50, y, { steps: 4 }); await page.mouse.move(x - 50, y, { steps: 4 }); }
  };
  await stroke();
  await expect.poll(() => page.evaluate(() => a.__petUp || 0)).toBeGreaterThan(1);
  await page.evaluate(() => { a.setPetting(false); });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(3000);
  await stroke();
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => a.__petUp || 0)).toBeLessThan(1);
});

test('view="3d" draws the layered head and view="2d" goes back to the flat drawing', async ({ page }) => {
  await page0(page, '<boop-face id="a" size="200" view="3d"></boop-face>');
  await expect.poll(() => page.evaluate(() => a.dataset.view)).toBe('3d');
  expect(await page.evaluate(() => !!a.shadowRoot.querySelector('.view-3d').shadowRoot?.querySelector('.head'))).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(a.shadowRoot.querySelector('svg')).visibility)).toBe('hidden');
  await page.evaluate(() => a.setAttribute('view', '2d'));
  await expect.poll(() => page.evaluate(() => a.dataset.view || '')).toBe('');
  expect(await page.evaluate(() => getComputedStyle(a.shadowRoot.querySelector('svg')).visibility)).toBe('visible');
});
