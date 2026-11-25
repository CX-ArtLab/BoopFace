// Samples the newer Web expressions (0.9) in a real browser, because they run
// on the voice kit, the new-expressions player and the head motion, which the
// Node sampler (sample-web-expressions.mjs) does not model. Time is virtual:
// the page clock moves in 10 ms steps and the eye geometry is read every 20 ms.
// The bloom and cross waits are not sampled: the core computes them (formulas
// from src/boopface-voice.js), so they cost no data.
//   node embedded/tools/sample-web-expressions-browser.mjs   (serves the repo itself)
import { writeFile, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { join, extname } from 'node:path';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../../', import.meta.url));
// Appended to the C++ Action enum in this order (after WaitingWave).
export const NEW_ACTIONS = ['observe', 'ponder', 'think', 'waiting-bloom', 'waiting-cross', 'shape-wait', 'bow', 'shake', 'smug', 'wink', 'dizzy', 'bounce', 'smug-bounce'];
const PROCEDURAL = new Set(['waiting-bloom', 'waiting-cross']);
const LIMIT = 9000;

const hash = createHash('sha256');
for (const name of ['core', 'extension-host', 'actions', 'waiting', 'voice', 'new-expressions', 'love', 'random'])
  hash.update(await readFile(join(root, `src/boopface-${name}.js`)));
const sourceHash = hash.digest('hex');

const types = { '.js': 'text/javascript', '.html': 'text/html' };
const server = createServer(async (q, r) => {
  try { const f = join(root, decodeURIComponent(q.url.split('?')[0])); r.writeHead(200, { 'content-type': types[extname(f)] || 'application/octet-stream' }); r.end(await readFile(f)); }
  catch { r.writeHead(404); r.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch();
const clips = [];
try {
  for (const action of NEW_ACTIONS) {
    if (PROCEDURAL.has(action)) { clips.push({ action, samples: [], procedural: true }); continue; }
    const page = await browser.newPage({ viewport: { width: 400, height: 400 } });
    // Virtual time: performance.now, Date.now, timers and animation frames.
    await page.addInitScript(() => {
      let now = 0, id = 0; const timers = [], frames = [];
      performance.now = () => now; const D = Date.now(); Date.now = () => D + now;
      window.setTimeout = (fn, ms = 0, ...a) => { const t = { id: ++id, at: now + Math.max(0, ms), fn: () => fn(...a) }; timers.push(t); return t.id; };
      window.clearTimeout = tid => { const i = timers.findIndex(t => t.id === tid); if (i >= 0) timers.splice(i, 1); };
      window.setInterval = (fn, ms) => { const t = { id: ++id, at: now + ms, every: ms, fn }; timers.push(t); return t.id; };
      window.clearInterval = window.clearTimeout;
      window.requestAnimationFrame = fn => { frames.push({ id: ++id, fn }); return id; };
      window.cancelAnimationFrame = fid => { const i = frames.findIndex(f => f.id === fid); if (i >= 0) frames.splice(i, 1); };
      window.__advance = async ms => {
        const end = now + ms;
        while (now < end) {
          now += 10;
          for (;;) { timers.sort((a, b) => a.at - b.at); const t = timers[0]; if (!t || t.at > now) break; if (t.every) t.at += t.every; else timers.shift(); t.fn(); await Promise.resolve(); await Promise.resolve(); }
          const run = frames.splice(0); for (const f of run) f.fn(now);
          for (let i = 0; i < 6; i++) await Promise.resolve();
        }
      };
    });
    await page.goto(`${base}/examples/basic.html`);
    await page.evaluate(() => { document.body.innerHTML = '<boop-face id="a" size="240" auto-sleep="0" idle-gaze="false" motion="full"></boop-face>'; });
    await page.waitForFunction(() => window.a?.shadowRoot?.getElementById('leftBase'));
    await page.evaluate(async () => { await window.__advance(400); a._nextBlinkAt = Infinity; });
    const samples = await page.evaluate(async ({ action, limit }) => {
      const r = a.shadowRoot, num = (el, k, d = 0) => { const v = el?.getAttribute(k); return v == null || v === '' ? d : +v; };
      const mat = el => { const l = el?.transform?.baseVal; let m = new DOMMatrix(); if (l) for (let i = 0; i < l.numberOfItems; i++) m = m.multiply(DOMMatrix.fromMatrix(l.getItem(i).matrix)); return m; };
      const head = () => { const hm = a._headMotion, t = hm?.style.transform; if (!t || t === 'none') return new DOMMatrix();
        const [ox, oy] = (hm.style.transformOrigin || '120px 128px').split(' ').map(parseFloat);
        return new DOMMatrix().translate(ox, oy).multiply(new DOMMatrix(t)).translate(-ox, -oy); };
      const read = (side, H) => {
        const g = r.getElementById(side + 'Eye'), base = r.getElementById(side + 'Base'), input = r.getElementById(side + 'InputBase');
        const top = r.getElementById(side + 'Top'), bottom = r.getElementById(side + 'Bottom');
        const M = H.multiply(mat(g)), sx = Math.hypot(M.a, M.b), sy = Math.hypot(M.c, M.d), angle = Math.atan2(M.b, M.a) * 180 / Math.PI;
        let cx, cy, rx, ry, corner = -1, topE = -100, bottomE = 100, ts = 0, bs = 0;
        const shape = base?.getAttribute('data-shape');
        if (num(input, 'opacity', 0) > .01) {
          const w = num(input, 'width'), h = num(input, 'height'), crx = num(input, 'rx'), cry = num(input, 'ry');
          cx = num(input, 'x') + w / 2; cy = num(input, 'y') + h / 2; rx = w / 2; ry = h / 2;
          // Full caps are an ellipse (the voice kit's shapes); smaller ones a rounded rectangle.
          if (!(crx >= rx - .05 && cry >= ry - .05)) corner = Math.min(crx, cry) * sx;
        } else if (shape) {
          // A ready outline (wink capsule, shape-wait circle/square): its box and
          // corner as a rounded rectangle (a superellipse's corner from its diagonal).
          // The points of the path (absolute commands): an arc's radii, rotation
          // and flags are not points, H and V carry one coordinate each.
          const xs = [], ys = []; let px = 0, py = 0;
          for (const [, cmd, args] of shape.matchAll(/([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/gi)) {
            const v = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) || []).map(Number), C = cmd.toUpperCase();
            if (C === 'H') for (const x of v) { px = x; xs.push(px); ys.push(py); }
            else if (C === 'V') for (const y of v) { py = y; xs.push(px); ys.push(py); }
            else if (C === 'A') for (let i = 0; i + 6 < v.length; i += 7) { px = v[i + 5]; py = v[i + 6]; xs.push(px); ys.push(py); }
            else if (C !== 'Z') for (let i = 0; i + 1 < v.length; i += 2) { px = v[i]; py = v[i + 1]; xs.push(px); ys.push(py); }
          }
          const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
          cx = (x0 + x1) / 2; cy = (y0 + y1) / 2; rx = (x1 - x0) / 2; ry = (y1 - y0) / 2;
          let diag = 0; for (let i = 0; i < xs.length; i++) diag = Math.max(diag, Math.min(Math.abs(xs[i] - cx), Math.abs(ys[i] - cy)));
          const a0 = Math.min(rx, ry), rr = /A/.test(shape) ? a0 : Math.min(a0, Math.max(0, (a0 - diag) / (1 - Math.SQRT1_2)));
          corner = rr * sx;
          // The outline clips the eye's own ellipse (shape-wait grows the
          // ellipse into it): what shows is the smaller of the two on each axis,
          // with the ellipse's round ends while it is the smaller one.
          const erx = num(base, 'rx', rx), ery = num(base, 'ry', ry);
          if (erx < rx || ery < ry) { rx = Math.min(rx, erx); ry = Math.min(ry, ery); corner = Math.min(rx, ry) * sx; }
          if (num(base, 'opacity', 1) < .01) rx = ry = 0;
        } else {
          cx = num(base, 'cx'); cy = num(base, 'cy'); rx = num(base, 'rx'); ry = num(base, 'ry');
          if (num(base, 'opacity', 1) < .01) rx = ry = 0;
          const lid = (el, isTop) => { const y = num(el, 'y'), h = num(el, 'height'), edge = isTop ? y + h : y; const m = /rotate\(([-\d.]+)/.exec(el?.getAttribute('transform') || ''); return [edge, Math.tan((m ? +m[1] : 0) * Math.PI / 180)]; };
          [topE, ts] = lid(top, true); [bottomE, bs] = lid(bottom, false);
          topE = (topE - cy) * sy; bottomE = (bottomE - cy) * sy; ts = ts * sy / (sx || 1); bs = bs * sy / (sx || 1);
        }
        const p = new DOMPoint(cx, cy).matrixTransform(M);
        return [p.x - 40, p.y - 76, rx * sx, ry * sy, angle, topE, bottomE, ts, bs, corner];
      };
      a.play(action);
      const out = []; let quietAt = null;
      for (let t = 0; t <= limit; t += 20) {
        await window.__advance(20);
        const H = head();
        out.push([...read('left', H), ...read('right', H)]);
        const busy = a._state !== 'idle' || a._expressionLock || a._waitingFx || a._voiceFx || a._loveFx || a._randomFx || (a._headMotion.style.transform && a._headMotion.style.transform !== 'none');
        if (!busy && t > 200) { quietAt ??= t; if (t - quietAt >= 300) break; } else quietAt = null;
      }
      return out;
    }, { action, limit: LIMIT });
    clips.push({ action, samples });
    await page.close();
    console.log(`${action}: ${samples.length} poses`);
  }
} finally { await browser.close(); server.close(); }

const scales = [100, 100, 100, 100, 100, 100, 100, 4096, 4096, 100];
const lines = ['// Generated by sample-web-expressions-browser.mjs from the project Web source (0.9 expressions).',
  '// Geometric parameters only; no bitmaps. The bloom and cross waits are computed by the core.',
  '#pragma once', '#include <stdint.h>', '#include "BoopFaceWebMotion.h"', 'namespace boopface { namespace web_reference {',
  `static const char NEW_SOURCE_SHA256[] = "${sourceHash}";`];
clips.forEach((clip, i) => {
  if (clip.procedural) return;
  const values = clip.samples.flatMap(f => f.map((v, k) => Math.round(v * scales[k % 10])));
  if (values.some(v => !Number.isFinite(v) || v < -32768 || v > 32767)) throw new Error('Invalid sample ' + clip.action);
  lines.push(`static const int16_t NEW_ACTION_${i}[] = {`, ...Array.from({ length: Math.ceil(values.length / 20) }, (_, row) => '  ' + values.slice(row * 20, row * 20 + 20).join(',') + ','), '};');
});
lines.push('static const Clip NEW_CLIPS[] = {', ...clips.map((c, i) => c.procedural ? `  {nullptr, 0}, // ${c.action} (computed)` : `  {NEW_ACTION_${i}, ${c.samples.length}}, // ${c.action}`), '};', '} }');
await writeFile(join(root, 'embedded/lib/BoopFace/src/BoopFaceWebMotionNew.h'), lines.join('\n') + '\n');
console.log('wrote BoopFaceWebMotionNew.h');
