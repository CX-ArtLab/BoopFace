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

test('Connect AI settings sit in Code › Connect AI above the code they change; the chat opens them', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('[data-inspector-tab="behavior"]').click();
  await expect(page.locator('#agentSection')).toBeHidden();
  // The old Connect AI address opens the chat and these settings.
  await page.goto('/demo/?lang=zh-CN#agent');
  await ready(page);
  await expect(page.locator('#agentSection')).toBeVisible();
  // From the chat's own button too.
  await page.locator('[data-inspector-tab="look"]').click();
  await expect(page.locator('#agentSection')).toBeHidden();
  await page.locator('#talkAgentSettings').click();
  await expect(page.locator('#agentSection')).toBeVisible();
  await page.locator('[data-agent="format"] [data-value="anthropic"]').click();
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

test('the eye colour row paints the real eyes, turns see-through off, and is greyed out on skins that keep their eyes (see-through still works there)', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  const row = page.locator('#eyeColorRow');
  // The default skin (101) keeps its own eye colour, but its eyes can still
  // show the background.
  await expect(row).toHaveClass(/is-locked/);
  await expect(page.locator('#eyeThroughToggle')).toBeEnabled();
  await page.locator('label:has(#eyeThroughToggle)').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('transparent');
  await expect.poll(() => face.evaluate(f => f.shadowRoot.getElementById('headMotion')?.getAttribute('mask'))).toBe('url(#eye-through)');
  await page.locator('label:has(#eyeThroughToggle)').click();
  await page.locator('[data-surface-btn="flat"]').click();
  await expect(row).not.toHaveClass(/is-locked/);
  await expect(page.locator('#eyeThroughToggle')).toBeChecked();
  await page.locator('#eyeDotsRow [data-slot-idx="0"]').click();
  await expect(page.locator('#eyeThroughToggle')).not.toBeChecked();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('#ff3b30');
  await page.locator('[data-inspector-tab="code"]').click();
  await page.locator('[data-dev-tab="html"]').click();
  await expect(page.locator('#devCode')).toContainText('eye-color="#ff3b30"');
  // Swapping head and background leaves the eyes alone.
  await page.locator('[data-inspector-tab="look"]').click();
  await page.locator('#swapColorsBtn').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('#ff3b30');
  // Auto gives the avatar its own eyes back.
  await page.locator('#eyeDotsRow [data-eye-auto]').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBeNull();
});

test('expression groups sit on one line where they fit and wrap (never clip) where they do not; saved skins are a star filter with a placeholder', async ({ page }) => {
  for (const [width, height, lang, oneLine] of [[1440, 900, 'zh-CN', true], [1025, 700, 'zh-CN', true], [1440, 900, 'en', true], [1440, 900, 'de', false], [360, 740, 'fr', false], [1025, 700, 'en', false]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`/demo/?lang=${lang}`);
    await ready(page);
    const { lines, clipped, hscroll } = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('#actionGroups .row-btns')];
      return {
        lines: rows.map(r => new Set([...r.children].map(c => Math.round(c.getBoundingClientRect().top))).size),
        clipped: rows.some(r => r.scrollWidth > r.clientWidth + 1),
        hscroll: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(clipped, `${lang} ${width} clipped`).toBe(false);
    expect(hscroll, `${lang} ${width} page scrolls sideways`).toBe(false);
    if (oneLine) expect(lines, `${lang} ${width}`).toEqual([1, 1, 1, 1]);
  }
  await page.locator('[data-inspector-tab="skins"]').click();
  const star = page.locator('#skinFilters [data-filter="saved"]');
  await expect(star).toHaveText('');
  await star.click();
  await expect(page.locator('#skinEmptyText')).toContainText('Nothing saved yet');
});

test('the size slider resizes the 3D avatar while dragging, centred, up to 300 px or 60% of the stage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  await expect.poll(() => face.evaluate(f => f.dataset.view)).toBe('3d');
  await page.locator('#sizeTrigger').click();
  const result = await page.evaluate(async () => {
    const s = document.getElementById('sizeSlider'), f = document.getElementById('stageFace'), off = [];
    for (let v = 170; v <= 330; v += 10) {
      s.value = v; s.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      const a = f.getBoundingClientRect(), b = f.shadowRoot.querySelector('.view-3d').getBoundingClientRect();
      off.push(Math.abs(a.width - b.width) + Math.abs((a.left + a.width / 2) - (b.left + b.width / 2)));
    }
    const st = document.getElementById('stageCanvas').getBoundingClientRect();
    return { max: +s.max, size: f.getBoundingClientRect().width, worst: Math.max(...off), limit: Math.min(300, Math.min(st.width, st.height) * 0.6) };
  });
  expect(result.max).toBeLessThanOrEqual(300);
  expect(result.max).toBeLessThanOrEqual(result.limit + 2);
  expect(result.size).toBe(result.max);
  // The 3D head follows each 10 px step and stays centred (two steps of lag at
  // most under load; stuck until release it was 160 px off).
  expect(result.worst).toBeLessThan(22);
});

test('Wake is only pressable while asleep and never sleeps first, and see-through on a skin keeps the skin', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  const face = page.locator('#stageFace');
  await face.evaluate(f => { window.played = []; const play = f.play.bind(f); f.play = a => { window.played.push(a); return play(a); }; });
  const wake = page.locator('#actionGroups button[data-action="wake"]');
  // Awake: Wake is greyed out. Asleep: it wakes, without sleeping again first.
  await expect(wake).toBeDisabled();
  await page.locator('#actionGroups button[data-action="sleep"]').click();
  await expect(wake).toBeEnabled();
  await page.evaluate(() => { window.played = []; });
  await wake.click();
  await expect(wake).toBeDisabled();
  expect(await page.evaluate(() => window.played)).not.toContain('sleep');
  // A skin with plain eyes: see-through stays on the skin.
  await page.locator('[data-inspector-tab="skins"]').click();
  await page.locator('[data-filter="all"]').click();
  await page.locator('button.skin-card[data-skin="901"]').click();
  await page.locator('[data-inspector-tab="look"]').click();
  await page.locator('label:has(#eyeThroughToggle)').click();
  await expect.poll(() => face.evaluate(f => f.getAttribute('skin'))).toBe('901');
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).not.toBeNull();
  // A skin whose eyes are part of its design: see-through works there too.
  await page.locator('[data-inspector-tab="skins"]').click();
  await page.locator('button.skin-card[data-skin="101"]').click();
  await page.locator('[data-inspector-tab="look"]').click();
  await expect(page.locator('#eyeThroughToggle')).toBeEnabled();
  await expect(page.locator('#eyeThroughToggle')).toBeChecked();
  await expect.poll(() => face.evaluate(f => f.getAttribute('eye-color'))).toBe('transparent');
});

test('events sit in a strip under the code; opened they take the whole panel, and close back', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('[data-inspector-tab="code"]').click();
  await expect(page.locator('[data-dev-tab="events"]')).toHaveCount(0);
  await expect(page.locator('#codeBuildStats')).toBeVisible();
  await page.locator('.row-btns button').nth(2).click();
  await expect(page.locator('#eventStripLast')).toContainText('action-state');
  await page.locator('#eventStripToggle').click();
  await expect(page.locator('#devEvents')).toBeVisible();
  await expect(page.locator('#devCodePre')).toBeHidden();
  await expect(page.locator('#codeBuildStats')).toBeHidden();
  await page.locator('#eventStripToggle').click();
  await expect(page.locator('#devEvents')).toBeHidden();
  await expect(page.locator('#devCodePre')).toBeVisible();
  await expect(page.locator('#codeBuildStats')).toBeVisible();
});

test('the 3D info card shows flat and 3D as two cards (traits, size) over a smooth curve that draws in', async ({ page }) => {
  await page.goto('/demo/?lang=zh-CN');
  await ready(page);
  await page.locator('.info-dot').hover();
  await expect(page.locator('#viewInfoCompare .vi-card h4')).toHaveText(['平面', '立体']);
  await expect(page.locator('#viewInfoCompare .vi-tag')).toHaveText(['经典平面造型', '更强的立体感']);
  await expect(page.locator('#viewInfoCompare dd')).toHaveText([/KB$/, '固定正面', '列表、小尺寸头像', /KB$/, '左右 22°、上下 15°', '主视觉、大尺寸展示']);
  await expect(page.locator('#viewInfoPop .vi-rows')).toHaveCount(0);
  await expect(page.locator('#viewInfoPop .vi-note')).toContainText('一个 CPU 核');
  const lines = page.locator('#viewInfoPlot path.vi-line');
  await expect(lines).toHaveCount(2);
  expect(await lines.first().getAttribute('d')).toMatch(/C/);
  await expect(page.locator('#viewInfoPlot svg')).toHaveClass(/is-drawing/);
});

test('every Studio language has its own words: no Chinese left on the page (zh-TW: no Simplified-only text)', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const names = new Set(['简体中文', '繁體中文', '日本語']);
  for (const lang of ['en', 'ja', 'ko', 'es', 'pt', 'de', 'fr', 'zh-TW']) {
    await page.goto(`/demo/?lang=${lang}`);
    await ready(page);
    const texts = await page.evaluate(() => {
      const out = [];
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = walk.nextNode());) if (!n.parentElement.closest('script,style,pre,code')) out.push(n.nodeValue.trim());
      for (const el of document.querySelectorAll('[title],[aria-label],[placeholder]')) for (const a of ['title', 'aria-label', 'placeholder']) if (el.getAttribute(a)) out.push(el.getAttribute(a));
      return out.filter(Boolean);
    });
    // Han characters are fine in Japanese and Traditional Chinese; the check
    // there is a few characters that only Simplified Chinese writes.
    const bad = lang === 'zh-TW' ? /[这们说过对时会发头动语设实点样经单区态体号钮选门无应]/ : lang === 'ja' ? /[这们说过对时头动语设实样经钮选门无]/ : /[㐀-鿿]/;
    expect(texts.filter(t => !names.has(t) && bad.test(t)), lang).toEqual([]);
  }
});
