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
  // It lingers on the diagonals (×) and only passes through the upright cross (+).
  const offDiagonal = v => Math.abs(((v % 90) + 90) % 90 - 45);
  const onX = angles.filter(v => offDiagonal(v) < 1).length, onPlus = angles.filter(v => offDiagonal(v) > 44).length;
  expect(onX).toBeGreaterThan(onPlus * 3);
  expect(onX).toBeGreaterThan(5);
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

test('leaving the typing cursor splits it quickly into two eyes, rounded all the way', async ({ page }) => {
  for (const next of ['success', 'bow', 'waiting-spin']) {
    await page0(page, '<boop-face id="a" motion="full"></boop-face>');
    await page.evaluate(() => a.play('input'));
    await expect.poll(() => page.evaluate(() => a._center)).toBe(1);
    const run = await page.evaluate(next => new Promise(done => {
      const r = a.shadowRoot, rows = [];
      a.play(next);
      const step = () => {
        const x = Number(r.getElementById('leftEye').getAttribute('transform').match(/translate\(([-\d.]+)/)[1]);
        const base = r.getElementById('leftBase'), input = r.getElementById('leftInputBase');
        rows.push({ x, baseOn: +base.getAttribute('opacity') > 0, baseRx: +base.getAttribute('rx'),
          inputRx: +input.getAttribute('rx'), inputRy: +(input.getAttribute('ry') ?? input.getAttribute('rx')), w: +input.getAttribute('width') });
        if (rows.length < 90 && x > 87) requestAnimationFrame(step); else done(rows);
      };
      requestAnimationFrame(step);
    }), next);
    expect(run.at(-1).x, next).toBeLessThan(88);
    // Not one jump: at least one frame on the way.
    expect(run.some(f => f.x > 88 && f.x < 118), next).toBe(true);
    // No pointed narrow ellipse on the way: while it is still narrow it is the
    // rounded rectangle with half-round ends (corner = half its width).
    for (const f of run) {
      if (f.baseOn) expect(f.baseRx, next).toBeGreaterThan(20);
      else expect(Math.abs(f.inputRx - f.w / 2), next).toBeLessThan(0.05);
    }
  }
});

test('in 3D the typing cursor splits from the middle, never thrown out to the outline', async ({ page }) => {
  await page0(page, '<boop-face id="a" view="3d" size="240" motion="full"></boop-face>');
  await expect.poll(() => page.evaluate(() => a.dataset.view)).toBe('3d');
  await page.evaluate(() => a.play('input'));
  await expect.poll(() => page.evaluate(() => a._center)).toBe(1);
  const spread = await page.evaluate(async () => {
    const hr = a.shadowRoot.querySelector('.view-3d').shadowRoot, h = a.getBoundingClientRect();
    const layers = [...hr.querySelectorAll('.layer.eyes')];
    // Where the visible eye layers sit across the head (0..240).
    const xs = () => layers.filter(n => n.style.display !== 'none').map(n => { const q = n.getBoundingClientRect(); return (q.x + q.width / 2 - h.x) / h.width * 240; });
    let min = 240, max = 0;
    a.play('success');
    for (let i = 0; i < 40; i++) {
      await new Promise(r => requestAnimationFrame(r));
      for (const x of xs()) { min = Math.min(min, x); max = Math.max(max, x); }
    }
    return { min, max };
  });
  // The eyes end at about 86 and 154 (the 3D head's own sway adds a little);
  // thrown out they reached about 62 and 178, the outline is near 40 and 200.
  expect(spread.min).toBeGreaterThan(70);
  expect(spread.max).toBeLessThan(170);
});

test('with a skin, shapes drawn as one (crossed ovals, the listening circle) are painted as one surface', async ({ page }) => {
  test.setTimeout(90000);
  await page0(page, '<boop-face id="m" skin="101"></boop-face><boop-face id="n" skin="301"></boop-face><boop-face id="t" skin="101" view="3d"></boop-face>');
  await page.evaluate(() => window.loadSkins?.());
  const joined = () => page.evaluate(() => [
    m.shadowRoot.getElementById('leftEye').parentElement.style.opacity === '0',
    n.shadowRoot.getElementById('leftEye').parentElement.style.opacity === '0',
    // 3D: the pair layer is shown and its one-surface sheet is on.
    (() => { const eyes = t.shadowRoot.querySelector('.view-3d')?.shadowRoot?.querySelector('#pair-leftEye')?.parentElement; const layer = eyes?.closest('.layer');
      return !!eyes && layer.style.display !== 'none' && eyes.nextElementSibling.style.display !== 'none'; })(),
  ]);
  await expect.poll(() => page.evaluate(() => !!t.shadowRoot.querySelector('.view-3d')?.shadowRoot?.querySelector('#pair-leftEye')), { timeout: 15000 }).toBe(true);
  expect(await joined()).toEqual([false, false, false]);
  await page.evaluate(() => [m, n, t].forEach(f => f.startWaiting({ variant: 'cross' })));
  await expect.poll(joined, { timeout: 15000 }).toEqual([true, true, true]);
  await page.evaluate(() => [m, n, t].forEach(f => f.startSpeaking()));
  // Speaking splits them back into two eyes, each with its own shading.
  await expect.poll(joined, { timeout: 15000 }).toEqual([false, false, false]);
});

test('skins whose eyes are part of their design keep them; plain-eyed skins take eye-color', async ({ page }) => {
  const warnings = [];
  page.on('console', m => { if (m.type() === 'warning') warnings.push(m.text()); });
  await page0(page, '<boop-face id="a" skin="101" eye-color="#2bd67b"></boop-face><boop-face id="b" skin="901" eye-color="#2bd67b"></boop-face>');
  const fill = id => page.evaluate(id => getComputedStyle(document.getElementById(id).shadowRoot.getElementById('leftBase')).fill, id);
  await expect.poll(() => fill('b')).toBe('rgb(43, 214, 123)');
  await expect.poll(() => fill('a')).toContain('url(');
  expect(warnings.some(w => w.includes('101') && w.includes('eye-color'))).toBe(true);
  // Following the skin as it changes.
  await page.evaluate(() => a.setSkin(901));
  await expect.poll(() => fill('a')).toBe('rgb(43, 214, 123)');
  const info = await page.evaluate(async () => { const m = await import('/boopface.js'); return [m.SKINS['101'].eyeColor, m.SKINS['901'].eyeColor, Object.values(m.SKINS).filter(s => !s.eyeColor).length]; });
  expect(info).toEqual([false, true, 57]);
});

test('the wink flattens the whole eye into a round-ended line, without lids cutting in', async ({ page }) => {
  await page0(page, '<boop-face id="a" motion="full"></boop-face>');
  const frames = await page.evaluate(() => new Promise(done => {
    const r = a.shadowRoot, out = [];
    a.play('wink');
    const step = () => {
      const b = r.getElementById('rightBase'), top = r.getElementById('rightTop');
      out.push({ shape: b.getAttribute('data-shape'), lidY: +top.getAttribute('y') + 90 });
      out.length < 240 ? requestAnimationFrame(step) : done(out);
    };
    requestAnimationFrame(step);
  }));
  const shaped = frames.filter(f => f.shape);
  expect(shaped.length).toBeGreaterThan(5);
  // A rounded outline (arcs), never the lids coming down over the eye.
  for (const f of shaped) expect(f.shape).toContain('A');
  for (const f of frames) expect(f.lidY).toBeLessThan(-30);
  // At its thinnest the line is about 9 units thick.
  const thinnest = Math.min(...shaped.map(f => 2 * +/A[-\d.]+ ([-\d.]+)/.exec(f.shape)[1]));
  expect(thinnest).toBeGreaterThan(8);
  expect(thinnest).toBeLessThan(10);
  // And it is gone afterwards.
  expect(frames.at(-1).shape).toBeNull();
});

test('renamed actions (wary, affirm, refuse, waiting-spin) get their head motion too', async ({ page }) => {
  await page0(page, '<boop-face id="a" motion="full"></boop-face>');
  for (const action of ['wary', 'affirm', 'refuse', 'waiting-spin']) {
    await page.evaluate(() => a.reset());
    await page.waitForTimeout(300);
    const moved = await page.evaluate(action => new Promise(done => {
      a.play(action);
      const svg = a.shadowRoot.querySelector('svg'), t0 = performance.now();
      let seen = false;
      const step = () => {
        const t = svg.style.transform;
        if (t && t !== 'none' && /translate\((?!0px, 0px)|rotate\((?!0deg)|scale\((?!1, 1\))/.test(t)) seen = true;
        seen || performance.now() - t0 > 2500 ? done(seen) : requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), action);
    expect(moved, action).toBe(true);
  }
});

test('tugging the antenna leaves the avatar dizzy', async ({ page }) => {
  await page0(page, '<boop-face id="a" size="200" motion="full"></boop-face>');
  await expect.poll(() => page.evaluate(() => Boolean(a.shadowRoot.querySelector('#antennaDot')))).toBe(true);
  await page.evaluate(() => { window.states = []; a.addEventListener('action-state', e => window.states.push(e.detail.action)); });
  const dot = await page.evaluate(() => { const b = a.shadowRoot.querySelector('#antennaDot').getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; });
  await page.mouse.move(dot.x, dot.y);
  await page.mouse.down();
  await page.mouse.move(dot.x + 120, dot.y + 40, { steps: 10 });
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => window.states), { timeout: 5000 }).toContain('dizzy');
  expect(await page.evaluate(() => window.states)).not.toContain('angry');
});

test('3D copies of the drawing ask for no GPU layers of their own (memory)', async ({ page }) => {
  await page0(page, '<boop-face id="a" view="3d" skin="101"></boop-face>');
  await page.waitForFunction(() => !!a.shadowRoot.querySelector('.view-3d')?.shadowRoot?.querySelector('.layer.eyes'));
  const hints = await page.evaluate(() => {
    const r = a.shadowRoot.querySelector('.view-3d').shadowRoot;
    return [...r.querySelectorAll('[id$="dragMotion"], [id$="headFollow"], [id$="headMotion"]')].map(n => getComputedStyle(n).willChange);
  });
  expect(hints.length).toBeGreaterThan(0);
  expect(hints.every(h => h === 'auto')).toBe(true);
});

test('an idle avatar never rewrites a value that is already there (CPU)', async ({ page }) => {
  await page0(page, '<boop-face id="a" auto-sleep="0"></boop-face><boop-face id="b" auto-sleep="0" view="3d" skin="101"></boop-face>');
  await page.waitForFunction(() => !!b.shadowRoot.querySelector('.view-3d')?.shadowRoot?.querySelector('.layer.eyes'));
  await page.waitForTimeout(800);
  const same = await page.evaluate(() => new Promise(done => {
    let count = 0, frames = 0;
    const seen = [];
    for (const f of [a, b]) {
      const o = new MutationObserver(records => { for (const r of records) if (r.type === 'attributes' && r.target.getAttribute(r.attributeName) === r.oldValue) { count++; seen.push(`${r.target.id}.${r.attributeName}`); } });
      o.observe(f.shadowRoot, { subtree: true, attributes: true, attributeOldValue: true });
    }
    const tick = () => (++frames < 40 ? requestAnimationFrame(tick) : done({ count, seen: [...new Set(seen)] }));
    requestAnimationFrame(tick);
  }));
  expect(same.seen).toEqual([]);
});

test('in 3D the wrap sliver reaches the head outline, as on the flat face', async ({ page }) => {
  await page0(page, '<boop-face id="a" size="240" auto-sleep="0" view="3d" color="#ff3b30"></boop-face>');
  await page.waitForFunction(() => !!a.shadowRoot.querySelector('.view-3d')?.shadowRoot?.querySelector('.layer.eyes'));
  await page.waitForTimeout(500);
  const gaps = await page.evaluate(() => new Promise(done => {
    a.play('waiting-wrap');
    const r = a.shadowRoot.querySelector('.view-3d').shadowRoot, out = [], t0 = performance.now();
    const tick = () => {
      // The left eye leaving over the left edge (later it comes back on the right).
      const rx = +a.shadowRoot.getElementById('leftBase').getAttribute('rx'), ex = a.shadowRoot.getElementById('leftEye').transform.baseVal.consolidate()?.matrix.e ?? 120;
      if (rx > .5 && rx < 14 && ex < 120) {
        const eye = r.querySelectorAll('.layer.eyes')[0].querySelector('#leftBase').getBoundingClientRect();
        // The side wall's path is the head's whole silhouette (face rim included).
        out.push(eye.left - r.querySelector('.wall path').getBoundingClientRect().left);
      }
      if (performance.now() - t0 < 5200) requestAnimationFrame(tick); else done(out);
    };
    requestAnimationFrame(tick);
  }));
  expect(gaps.length).toBeGreaterThan(0);
  expect(Math.min(...gaps)).toBeLessThan(2.8);
  expect(Math.min(...gaps)).toBeGreaterThan(-3);
});
