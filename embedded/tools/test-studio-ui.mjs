// Opens the offline Embedded Studio from disk and plays the 0.2 actions (wink, bow, listening, speaking).
import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';

const file = fileURLToPath(new URL('../studio/boopface-embedded-studio.html', import.meta.url));
const engines = process.env.PREVIEW_BROWSER ? { [process.env.PREVIEW_BROWSER]: { chromium, firefox, webkit }[process.env.PREVIEW_BROWSER] } : { chromium };
for (const [name, type] of Object.entries(engines)) {
  const browser = await type.launch();
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  const requests = [];
  page.on('request', r => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:') && !r.url().startsWith('blob:')) requests.push(r.url()); });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(pathToFileURL(file).href);
  await page.waitForTimeout(1500);
  for (const action of ['wink', 'bow']) {
    await page.click(`[data-action="${action}"]`);
    await page.waitForTimeout(400);
    const current = await page.textContent('#current');
    assert(current.startsWith(action), `${name}: ${action} plays (shows "${current}")`);
  }
  await page.click('#voiceTab, [data-tab="voice"], [data-panel-tab="voice"]').catch(() => page.getByText(/Voice|语音|聲音/).first().click());
  for (const stage of ['listening', 'speaking']) {
    await page.click(`[data-voice-stage="${stage}"]`);
    await page.waitForTimeout(500);
    const current = await page.textContent('#current');
    assert(current.startsWith(stage), `${name}: ${stage} plays (shows "${current}")`);
  }
  assert.deepEqual(requests, [], `${name}: no network requests`);
  assert.deepEqual(errors, [], `${name}: no script errors`);
  console.log(`${name}: wink, bow, listening and speaking play from the offline file; no network.`);
  await browser.close();
}
