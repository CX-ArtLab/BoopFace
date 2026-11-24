// Layered 3D avatar (from the spatial-css prototype, the version with squash).
// Layered 3D avatar: the head is a stack of pre-painted SVG slices placed in a
// CSS 3D scene. Every layer is painted once; turning the head only changes CSS
// transforms, so the browser compositor (GPU) does the per-frame work.
// Same camera as the spatial-eyes experiment: pinhole distance 180, depth 52.
import { roundInto, matrixOf } from './boopface-eye-shape.js';
const D = 180;
const NS = 'http://www.w3.org/2000/svg';
const EYES = [['leftEye', 86, 126], ['rightEye', 154, 126]];

// Render the real component once with the chosen skin and keep its finished SVG.
// Show only one part of a cloned drawing: hide everything beside the path
// from the drawing down to that part. (Hiding the whole drawing and making
// the part visible again works in Chrome and Firefox, but Safari then
// paints nothing at all on a 3D-placed layer.)
// The hidden parts are then deleted (they cost memory in every copy), except
// anything the drawing still points at by id (a clip or mask using the head
// outline, say): those stay, hidden.
function showOnly(svg, keep) {
  const hidden = [];
  for (let n = keep; n && n !== svg && n.parentElement; n = n.parentElement)
    for (const s of n.parentElement.children) if (s !== n && !/^(defs|style)$/i.test(s.tagName)) { s.style.visibility = 'hidden'; hidden.push(s); }
  const used = new Set();
  for (const el of [svg, ...svg.querySelectorAll('*')]) for (const a of el.attributes) for (const m of a.value.matchAll(/url\(\s*['"]?#([^'")\s]+)|^#(.+)$/g)) used.add(m[1] || m[2]);
  const needed = el => (el.id && used.has(el.id)) || [...el.querySelectorAll('[id]')].some(n => used.has(n.id));
  const prune = el => { if (el.id && used.has(el.id)) return; if (!needed(el)) { el.remove(); return; } for (const c of [...el.children]) prune(c); };
  for (const s of hidden) prune(s);
}

export async function captureSkin(skin, roundness = 50, { color = null, eyeColor = null, eyeStyle = null } = {}) {
  const el = document.createElement('boop-face');
  el.style.cssText = 'position:fixed;left:-9999px;top:0;--face-size:240px';
  if (skin) el.setAttribute('skin', skin);
  if (color) el.setAttribute('color', color);
  if (eyeColor) el.setAttribute('eye-color', eyeColor);
  if (eyeStyle) el.setAttribute('eye-style', eyeStyle);
  el.setAttribute('aria-hidden', 'true');
  document.body.append(el);
  // The square-to-round head shape is part of what gets painted.
  el.setHeadRoundness?.(roundness);
  const root = el.shadowRoot;
  // Painters are preloaded by the page, so a skin is usually in place within a
  // frame or two; check every frame instead of waiting a fixed time.
  for (let i = 0; i < 120; i++) {
    if (!skin || root.querySelector('svg defs linearGradient, svg defs radialGradient')) break;
    await new Promise(r => requestAnimationFrame(r));
  }
  // Draw one frame ourselves: a background tab may never run the component's
  // own frames, and the first frame is what adds the antenna and the standard
  // (flattened) head outline.
  for (let i = 0; i < 3; i++) el._draw?.(performance.now());
  // That frame changes the outline, and the skin re-traces its highlight
  // ribbons from it right afterwards; let that happen before copying.
  for (let i = 0; i < 2; i++) await new Promise(r => requestAnimationFrame(r));
  const styles = [...root.querySelectorAll('style')].map(s => s.textContent).join('\n');
  const svg = root.querySelector('svg').cloneNode(true);
  const vars = [...el.style].filter(p => p.startsWith('--')).map(p => [p, el.style.getPropertyValue(p)]);
  el.remove();
  // Freeze the neutral pose: no blink, no look offset, no idle sway.
  for (const id of ['dragMotion', 'headFollow', 'headMotion']) {
    const n = svg.querySelector('#' + id); n?.removeAttribute('transform'); n?.removeAttribute('style');
  }
  for (const [id, x, y] of EYES) svg.querySelector('#' + id)?.setAttribute('transform', `translate(${x} ${y})`);
  const eyeLids = { Top: -96, Bottom: 36 };
  for (const side of ['left', 'right']) for (const [k, y] of Object.entries(eyeLids)) { const n = svg.querySelector(`#${side}${k}`); n?.setAttribute('y', y); n?.setAttribute('height', 60); n?.setAttribute('transform', `rotate(0 0 ${k === 'Top' ? -36 : 36})`); }
  return { styles, svg, vars };
}

// Give a cloned SVG its own definition ids so its gradients and patterns
// never collide with the other layers' copies in the same shadow root.
function uniqueIds(svg, prefix) {
  const ids = new Set([...svg.querySelectorAll('defs [id]')].map(n => n.id));
  for (const n of svg.querySelectorAll('defs [id]')) n.id = prefix + n.id;
  const fix = v => v.replace(/url\(#([^)]+)\)/g, (m, id) => ids.has(id) ? `url(#${prefix}${id})` : m).replace(/^#(.+)$/, (m, id) => ids.has(id) ? '#' + prefix + id : m);
  for (const n of svg.querySelectorAll('*')) for (const a of [...n.attributes]) if (/url\(#|^#/.test(a.value)) n.setAttribute(a.name, fix(a.value));
  return svg;
}

// Like uniqueIds, but for every id in the clone (eye groups included), so a
// copy that shows both eyes never borrows another layer's eyes.
function uniqueAllIds(svg, prefix) {
  const ids = new Set([...svg.querySelectorAll('[id]')].map(n => n.id));
  for (const n of svg.querySelectorAll('[id]')) n.id = prefix + n.id;
  const fix = v => v.replace(/url\(#([^)]+)\)/g, (m, id) => ids.has(id) ? `url(#${prefix}${id})` : m).replace(/^#(.+)$/, (m, id) => ids.has(id) ? '#' + prefix + id : m);
  for (const n of svg.querySelectorAll('*')) for (const a of [...n.attributes]) if (/url\(#|^#/.test(a.value)) n.setAttribute(a.name, fix(a.value));
  return svg;
}

function radiusTable(outline) {
  return Array.from({ length: 720 }, (_, i) => {
    const a = i * Math.PI / 360, dx = Math.cos(a), dy = Math.sin(a); let radius = Infinity;
    for (let j = 0; j < outline.length; j++) {
      const p = outline[j], q = outline[(j + 1) % outline.length], ex = q[0] - p[0], ey = q[1] - p[1], den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-8) continue;
      const t = (p[0] * ey - p[1] * ex) / den, u = (p[0] * dy - p[1] * dx) / den;
      if (t > 0 && u >= 0 && u <= 1) radius = Math.min(radius, t);
    }
    return radius;
  });
}

const hex = c => { const m = /^#?([0-9a-f]{6})$/i.exec(c || ''); return m ? [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16)) : null; };
const css = c => 'rgb(' + c.map(v => Math.round(Math.max(0, Math.min(255, v)))).join(',') + ')';

// Copy of layered.js with two Grok-inspired extras (layered.js stays as is):
//  - wrapStrips: each eye is cut into vertical strips, every strip lies on the
//    dome at its own spot, so the eye itself bends around the face.
//  - squash: turning the head squeezes it a little in the direction of the
//    turn and it springs back with a small wobble.
export function createLayeredAvatar(host, captured, { size = 300, depth = 52, slices = 10, sideColors = ['#08090b'], wrapStrips = 1, squash = false } = {}) {
  const STRIPS = Math.max(1, wrapStrips | 0);
  // Squash modes: 'off'; 'narrow' (a sideways turn narrows the head, a nod
  // flattens it); 'stretch' (the opposite: stretched along the motion, the
  // usual cartoon rule); 'settle' (no change while moving, one springy bounce
  // when the turn stops). true means 'narrow' (the first version).
  // Strength of the settle bounce (1 = as designed; the page has a slider).
  const squashGain = { value: 1 };
  const squashOn = { value: squash === true ? 'narrow' : (squash || 'off') };
  const u = size / 240, zoom = Math.sqrt(1 - (depth / D) ** 2);
  const root = host.shadowRoot || host.attachShadow({ mode: 'open' });
  for (const [k, v] of captured.vars) host.style.setProperty(k, v);
  // The skin's eye rules again for the renamed eyes of the two-eye plate.
  const pairStyles = captured.styles.split('}').filter(r => /#(left|right)(Eye|Base|InputBase)\b/.test(r)).map(r => r.replace(/#(left|right)(Eye|Base|InputBase)\b/g, '#pair-$1$2') + '}').join('\n');
  root.innerHTML = `<style>${captured.styles}
${pairStyles}
    :host{display:block;width:${size}px;height:${size}px}
    .stage{position:relative;width:${size}px;height:${size}px}
    .cut{position:absolute;inset:0}
    .scene{position:absolute;inset:0;perspective:${D * u}px;perspective-origin:50% 50%}
    .probe{position:absolute;width:0;height:0;overflow:hidden}
    /* See-through eyes: the eyes are holes cut through the whole head (below). */
    .stage.through .layer.eyes{opacity:0}
    .head{position:absolute;inset:0;transform-style:preserve-3d;will-change:transform}
    .wall{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
    .layer{position:absolute;left:0;top:0;width:${size}px;height:${size}px;pointer-events:none;will-change:transform;overflow:hidden}
    .layer svg{width:100%;height:100%;overflow:visible}
    /* The copied drawings are frozen: their motion groups must not become GPU
       layers of their own (each one a large hidden texture per avatar). */
    #dragMotion,#headFollow,#headMotion,[id$="dragMotion"],[id$="headFollow"],[id$="headMotion"]{will-change:auto}
  </style><div class="stage" role="img" aria-label="Robot avatar"><div class="cut"><div class="cut"><div class="cut"><div class="cut"><div class="scene"><div class="head" aria-hidden="true"></div></div></div></div></div></div></div><svg class="probe" aria-hidden="true"><path/></svg>`;
  // See-through eyes are cut by the 3D view itself (below), not by the flat
  // drawing's mask, which would punch its holes at the flat eye positions.
  for (const n of captured.svg.querySelectorAll('[mask]')) if (/eye-through/.test(n.getAttribute('mask'))) n.removeAttribute('mask');
  const head = root.querySelector('.head');
  const headD = captured.svg.querySelector('#headShape').getAttribute('d');
  const outline = (headD.match(/-?\d*\.?\d+/g) || []).map(Number).reduce((a, v, i, all) => (i % 2 ? a : a.concat([[(v - 120) * .94, (all[i + 1] - 120) * .94]])), []);
  const radii = radiusTable(outline);
  const radiusAt = (x, y) => { const a = ((Math.atan2(y, x) * 360 / Math.PI) % 720 + 720) % 720, i = Math.floor(a), f = a - i; return radii[i] * (1 - f) + radii[(i + 1) % 720] * f; };
  const height = (x, y) => { const r = radiusAt(x, y); return depth * Math.sqrt(Math.max(0, 1 - (x * x + y * y) / (r * r))); };
  const SKIP = '';
  // box crops a layer to its own region (240 units) so the compositor never
  // carries a large mostly-empty texture.
  const layer = (svg, transform, kind = '', box = null) => {
    const d = document.createElement('div'); d.className = 'layer ' + kind;
    if (box) { const [x, y, w, h] = box; svg.setAttribute('viewBox', box.join(' ')); Object.assign(d.style, { left: x * u + 'px', top: y * u + 'px', width: w * u + 'px', height: h * u + 'px' }); }
    if (transform) d.style.transform = transform; d.append(svg); if (!SKIP.includes(kind || 'x')) head.append(d); return d;
  };
  const scaleAt = z => Math.sqrt(Math.max(0, 1 - (z / depth) ** 2));

  // 1) Side wall. Instead of a stack of composited slices, one flat SVG path
  // behind the head: each frame the silhouette of a few cross sections is
  // projected with the same camera and wrapped in a hull. A few hundred
  // points of maths and one small repaint, rather than ten moving layers.
  const front = depth * depth / D; // plane where the dome silhouette is widest on camera
  const tones = (Array.isArray(sideColors) ? sideColors : [sideColors]).map(hex).filter(Boolean);
  if (!tones.length) tones.push([8, 9, 11]);
  const wall = document.createElementNS(NS, 'svg');
  wall.setAttribute('viewBox', '0 0 240 240'); wall.setAttribute('class', 'wall');
  wall.innerHTML = `<defs><linearGradient id="wall-paint" x1="0" y1="0" x2=".35" y2="1">${tones.map((c, n) => `<stop offset="${tones.length > 1 ? n / (tones.length - 1) : 0}" stop-color="${css(c.map(v => v * .8))}"/>`).join('')}</linearGradient></defs><path fill="url(#wall-paint)"/>`;
  root.querySelector('.scene').prepend(wall);
  const wallPath = wall.querySelector('path');
  const sectionCount = Math.max(2, Math.min(slices, 5)), sections = Array.from({ length: sectionCount }, (_, i) => front - (front + depth * .92) * i / (sectionCount - 1));
  let wallOutline = outline, wallCache = null;
  // Section points are scaled once per outline (drags change it); each frame
  // only rotates and projects them and wraps them in a hull.
  // In plain turning (no squeeze, no drag) the silhouette depends only on the
  // angle: remember it per half degree and reuse it instead of recomputing.
  const wallMemo = new Map();
  let lastWallD = '';
  const drawWall = (Y, P, hm) => {
    const plain = wallOutline === outline && hm[0] === 1 && hm[1] === 0 && hm[2] === 0 && hm[3] === 1 && hm[4] === 0 && hm[5] === 0;
    const memoKey = plain ? Math.round(Y * 2) + ',' + Math.round(P * 2) : '';
    if (plain && wallMemo.has(memoKey)) { const d = wallMemo.get(memoKey); if (d !== lastWallD) { wallPath.setAttribute('d', d); lastWallD = d; } return; }
    if (plain) { Y = Math.round(Y * 2) / 2; P = Math.round(P * 2) / 2; }
    if (!wallCache || wallCache.src !== wallOutline) {
      const pts = [];
      for (const z of sections) { const sc = scaleAt(z); for (let i = 0; i < wallOutline.length; i += 2) pts.push(wallOutline[i][0] * sc, wallOutline[i][1] * sc, z); }
      wallCache = { src: wallOutline, pts: new Float64Array(pts) };
    }
    const r = Math.PI / 180, cY = Math.cos(Y * r), sY = Math.sin(Y * r), cP = Math.cos(P * r), sP = Math.sin(P * r), a = wallCache.pts, pts = [];
    for (let i = 0; i < a.length; i += 3) {
      const x0 = a[i], y0 = a[i + 1], z0 = a[i + 2];
      const x1 = x0 * cY + z0 * sY, z1 = -x0 * sY + z0 * cY, y2 = y0 * cP - z1 * sP, z2 = y0 * sP + z1 * cP;
      const xa = x1 * zoom, ya = y2 * zoom, f = D / (D - z2);
      pts.push([120 + (hm[0] * xa + hm[2] * ya + hm[4]) * f, 120 + (hm[1] * xa + hm[3] * ya + hm[5]) * f]);
    }
    // Convex hull (the body is convex): always the true outer silhouette.
    pts.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
    const half = list => { const out = []; for (const q of list) { while (out.length > 1) { const A = out[out.length - 2], B = out[out.length - 1]; if ((B[0] - A[0]) * (q[1] - A[1]) - (B[1] - A[1]) * (q[0] - A[0]) > 0) break; out.pop(); } out.push(q); } return out; };
    const hull = [...half(pts).slice(0, -1), ...half(pts.reverse()).slice(0, -1)];
    let d = 'M' + hull.map(q => (Math.round(q[0] * 10) / 10) + ' ' + (Math.round(q[1] * 10) / 10)).join('L');
    d += 'Z';
    if (plain && wallMemo.size < 4000) wallMemo.set(memoKey, d);
    if (d !== lastWallD) { wallPath.setAttribute('d', d); lastWallD = d; }
  };

  // 2) Face plate: the original skin painting without eyes and antenna.
  const face = captured.svg.cloneNode(true);
  // Delete the eyes (and the skin's joined eye surface) from the face for
  // real; a hidden copy could still be picked up and drawn flat here.
  face.querySelector('[id$="joined-eye-surface"]')?.remove();
  for (const id of ['antennaDot']) face.querySelector('#' + id)?.style.setProperty('visibility', 'hidden');
  {
    const eyesHolder = face.querySelector('#leftEye')?.parentElement;
    for (const id of ['leftEye', 'rightEye']) { const n = face.querySelector('#' + id); n?.removeAttribute('id'); n?.replaceChildren(); }
    eyesHolder?.style.setProperty('display', 'none');
  }
  layer(face, `translateZ(${front * u}px) scale(${scaleAt(front)})`, 'face');

  // 2b) Highlights stay painted on the face exactly as the skin draws them.
  // During a drag or antenna tug they are nudged along with the bent outline
  // (the face repaints only while that lasts).
  const GLOSS = ['main', 'secondary', 'reflection'].map(k => face.querySelector(`[id$="-texture-${k}"]`)).filter(Boolean)
    .map(node => ({ node, original: node.getAttribute('transform') || '', center: null }));
  const decals = [], decalShapes = [];
  // Inverse camera: the surface point that a 2D spot of the original covers.
  const onSurface = (sx, sy) => {
    const x = sx / zoom, y = sy / zoom, a = (x * x + y * y) / radiusAt(x, y) ** 2, d2 = depth * depth;
    const A = 1 + d2 * a / (D * D), B = -2 * d2 * a / D, C = d2 * (a - 1), z = (-B + Math.sqrt(Math.max(0, B * B - 4 * A * C))) / (2 * A), k = 1 - z / D;
    return [x * k, y * k, z];
  };
  // Every copy of the outline that a drag may bend (skins keep their own copy).
  const outlinePaths = [...face.querySelectorAll('path[id$="headShape"]'), ...decalShapes];
  const basePoints = outline.map(([x, y]) => [x / .94 + 120, y / .94 + 120]);
  let bent = false;
  // Centre of a highlight stroke in headShape coordinates (pattern space).
  const glossCenter = h => {
    try {
      const b = h.node.getBBox(), m = matrixOf(h.node) || new DOMMatrix();
      const q = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(m);
      return b.width && Number.isFinite(q.x) ? [q.x, q.y] : [120, 120];
    } catch { return [120, 120]; }
  };
  // Same local pull as the official component: the part you hold bulges out.
  let bendNow = { x: 0, y: 0, hx: 120, hy: 120, r: 50 };
  const bendAt = (X, Y) => { const w = Math.exp(-((X - bendNow.hx) ** 2 + (Y - bendNow.hy) ** 2) / (2 * bendNow.r * bendNow.r)); return [bendNow.x * w, bendNow.y * w]; };
  const bend = (pullX, pullY, hotX, hotY) => {
    const amount = Math.hypot(pullX, pullY);
    bendNow = { x: pullX, y: pullY, hx: hotX, hy: hotY, r: (50 + amount * .8) * .92 };
    if (amount < .015) { if (bent) { for (const n of outlinePaths) n.setAttribute('d', headD); for (const h of GLOSS) h.node.setAttribute('transform', h.original); wallOutline = outline; bent = false; } return; }
    const radius = (50 + amount * .8) * .92;
    const d = 'M ' + basePoints.map(([x, y], i) => { const w = Math.exp(-((x - hotX) ** 2 + (y - hotY) ** 2) / (2 * radius * radius)); return (i ? 'L ' : '') + (x + pullX * w).toFixed(2) + ' ' + (y + pullY * w).toFixed(2); }).join(' ') + ' Z';
    for (const n of outlinePaths) n.setAttribute('d', d); bent = true;
    wallOutline = basePoints.map(([x, y]) => { const w = Math.exp(-((x - hotX) ** 2 + (y - hotY) ** 2) / (2 * radius * radius)); return [(x + pullX * w - 120) * .94, (y + pullY * w - 120) * .94]; });
    for (const h of GLOSS) {
      h.center ??= glossCenter(h);
      const [cx, cy] = h.center, w = Math.exp(-((cx - hotX) ** 2 + (cy - hotY) ** 2) / (2 * radius * radius));
      h.node.setAttribute('transform', `translate(${(pullX * w).toFixed(2)} ${(pullY * w).toFixed(2)}) ${h.original}`);
    }
  };

  // 3) Antenna: a billboard. It rides on the head but always faces the
  // camera, so it stays a round ball at every angle.
  const antenna = captured.svg.cloneNode(true);
  const dot = antenna.querySelector('#antennaDot');
  let antennaNode = null, home = { x: 120, y: 12, r: 15 };
  if (dot) {
    showOnly(antenna, dot);
    const [cx, cy, r] = ['cx', 'cy', 'r'].map(a => +dot.getAttribute(a)), pad = r + 6;
    home = { x: cx, y: cy, r };
    antennaNode = layer(antenna, '', 'antenna', [cx - pad, cy - pad, pad * 2, pad * 2]);
    antennaNode.style.transformOrigin = `${pad * u}px ${pad * u}px`;
  }

  // 4) Each eye is its own rigid plate lying on the curved surface.
  // With wrapping, one copy per strip; each copy shows its own slice of the eye.
  const STRIP_W = 80 / STRIPS, OVERLAP = STRIPS > 1 ? 1.2 : 0;
  const eyeCopy = (id, ex, ey, i, j) => {
    const side = i ? 'right' : 'left', pre = STRIPS > 1 ? `eye${i}s${j}-` : `eye${i}-`;
    const svg = uniqueIds(captured.svg.cloneNode(true), pre);
    const eye = svg.querySelector('#' + id); showOnly(svg, eye);
    // The head-outline clip belongs to the flat drawing; on a moved, tilted
    // eye plate its edge slices through the eye and smears it. The 3D
    // placement already keeps the eyes on the face.
    eye.parentElement.removeAttribute('clip-path');
    // Just big enough for one eye (with its relief shadow): the two tilted eye
    // plates then only meet in transparent corners, so the browser's 3D sorting
    // never slices through an eye where the planes cross.
    // Strip j covers [x0, x0 + w] (plus a hair of overlap so no seam shows).
    const x0 = ex - 40 + j * STRIP_W - (j ? OVERLAP : 0), x1 = ex - 40 + (j + 1) * STRIP_W + (j < STRIPS - 1 ? OVERLAP : 0);
    const node = layer(svg, '', 'eyes', [x0, ey - 48, x1 - x0, 98]); node.style.transformOrigin = `${(ex - x0) * u}px ${48 * u}px`;
    const parts = { base: svg.querySelector(`#${side}Base`), input: svg.querySelector(`#${side}InputBase`),
      top: svg.querySelector(`[id$="${side}Top"]`), bottom: svg.querySelector(`[id$="${side}Bottom"]`) };
    // Plain (unskinned) lids are head-coloured bars drawn over the eye. On a
    // separate plate that leaves a hairline of eye white around them and can
    // poke past the face, so turn them into a mask that cuts the eye instead
    // (what the skins already do).
    if (parts.top && parts.base && !parts.top.closest('mask')) {
      const lids = parts.top.parentElement, mask = document.createElementNS(NS, 'mask');
      mask.id = `${pre}lids`;
      for (const [k, v] of Object.entries({ maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', x: -180, y: -240, width: 360, height: 480 })) mask.setAttribute(k, v);
      mask.innerHTML = '<rect x="-180" y="-240" width="360" height="480" fill="#fff"/>';
      for (const r of [parts.top, parts.bottom]) r?.style.setProperty('fill', '#000');
      mask.append(lids); svg.querySelector('defs').append(mask);
      for (const n of [parts.base, parts.input]) n?.setAttribute('mask', `url(#${pre}lids)`);
    }
    outlinePaths.push(...svg.querySelectorAll('path[id$="headShape"]'));
    // dx: the strip's centre, measured from the eye centre (eye units).
    // box/origin: where the plate sits, for the see-through cut.
    return { node, svg, pre, parts, dx: (x0 + x1) / 2 - ex, box: [x0, ey - 48], origin: [(ex - x0) * u, 48 * u] };
  };
  const eyes = EYES.map(([id, ex, ey], i) => {
    const copies = Array.from({ length: STRIPS }, (_, j) => eyeCopy(id, ex, ey, i, j));
    return { copies, ex, ey, side: i ? 'right' : 'left', off: [0, 0], lin: [1, 0, 0, 1] };
  });
  // Both eyes on one plate, used while they overlap (heart, crossing orbits):
  // the skin then paints them as one surface, exactly like the original.
  // Built by deleting everything else (no hidden/visible tricks), and painted
  // the original's way: with a skin the eyes themselves stay invisible and
  // the joined eye surface, cut to both eyes together, is what shows.
  const pairSvg = uniqueAllIds(captured.svg.cloneNode(true), 'pair-');
  let pairModes = null;
  {
    const eyesGroup = pairSvg.querySelector('#pair-leftEye').parentElement, joined = pairSvg.querySelector('[id$="joined-eye-surface"]');
    const motion = pairSvg.querySelector('#pair-headMotion');
    for (const c of [...motion.children]) if (c !== eyesGroup && c !== joined) c.remove();
    pairSvg.querySelector('#pair-antennaDot')?.remove();
    // Paint both eyes as one surface, the original's way: the eyes only shape
    // a mask, and a single eye-coloured sheet with the raised-eye relief shows
    // through it. Where they overlap there is one outline and no seam.
    joined?.remove();
    eyesGroup.removeAttribute('clip-path'); eyesGroup.style.opacity = '0';
    // The eyes only cut the shape: without their own relief blur, or the
    // blur would leak into the outline as a halo.
    for (const n of eyesGroup.querySelectorAll('#pair-leftEye,#pair-rightEye')) n.style.filter = 'none';
    const union = document.createElementNS(NS, 'mask');
    union.id = 'pair-union'; union.style.maskType = 'alpha';
    for (const [k, v] of Object.entries({ maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', x: -60, y: -60, width: 360, height: 360 })) union.setAttribute(k, v);
    // Plain white copies of the eye shapes, kept in step every frame: some
    // skins make the eyes themselves transparent, which would cut nothing.
    union.innerHTML = ['left', 'right'].map(side => `<g id="pair-m-${side}"><ellipse id="pair-m-${side}Base" fill="#fff"/><rect id="pair-m-${side}InputBase" fill="#fff" opacity="0"/></g>`).join('');
    pairSvg.querySelector('defs').append(union);
    const sheet = document.createElementNS(NS, 'g');
    sheet.setAttribute('style', 'filter:var(--material-eye-relief,none)');
    sheet.innerHTML = '<rect x="-60" y="-60" width="360" height="360" fill="var(--material-eye,#fff)" mask="url(#pair-union)"/>';
    eyesGroup.after(sheet);
    pairModes = { eyesGroup, sheet, eyes: [...eyesGroup.querySelectorAll('#pair-leftEye,#pair-rightEye')] };
  }
  const pair = { node: layer(pairSvg, '', 'eyes', [0, 0, 240, 240]), sides: ['left', 'right'].map((side, i) => {
    const parts = { group: pairSvg.querySelector(`#pair-${side}Eye`), base: pairSvg.querySelector(`#pair-${side}Base`), input: pairSvg.querySelector(`#pair-${side}InputBase`),
      top: pairSvg.querySelector(`[id$="${side}Top"]`), bottom: pairSvg.querySelector(`[id$="${side}Bottom"]`) };
    if (parts.top && parts.base && !parts.top.closest('mask')) {
      const lids = parts.top.parentElement, mask = document.createElementNS(NS, 'mask');
      mask.id = `pair-lids-${i}`;
      for (const [k, v] of Object.entries({ maskUnits: 'userSpaceOnUse', maskContentUnits: 'userSpaceOnUse', x: -180, y: -240, width: 360, height: 480 })) mask.setAttribute(k, v);
      mask.innerHTML = '<rect x="-180" y="-240" width="360" height="480" fill="#fff"/>';
      for (const r of [parts.top, parts.bottom]) r?.style.setProperty('fill', '#000');
      mask.append(lids); pairSvg.querySelector('defs').append(mask);
      for (const n of [parts.base, parts.input]) n?.setAttribute('mask', `url(#pair-lids-${i})`);
    }
    const m = { group: pairSvg.querySelector(`#pair-m-${side}`), base: pairSvg.querySelector(`#pair-m-${side}Base`), input: pairSvg.querySelector(`#pair-m-${side}InputBase`) };
    for (const k of ['base', 'input']) { const lid = parts[k]?.getAttribute('mask'); if (lid && m[k]) m[k].setAttribute('mask', lid); }
    return { side, parts, m };
  }) };
  pair.node.style.transformOrigin = `${120 * u}px ${126 * u}px`; pair.node.style.display = 'none';
  // Skins that paint each eye with their own gradient and shadow (the native
  // ones) colour the joined heart with that gradient spread over both eyes,
  // like the original's joined surface; their eye shadow goes on the sheet.
  let unionPaint = null;
  {
    const sheetRect = pairSvg.querySelector('rect[mask="url(#pair-union)"]'), sheet = sheetRect?.parentElement, base = pair.sides[0].parts.base;
    const fillId = base && getComputedStyle(base).fill.match(/url\("?#([^")]+)"?\)/)?.[1], grad = fillId && (pairSvg.querySelector('#' + CSS.escape(fillId.startsWith('pair-') ? fillId : 'pair-' + fillId)) || pairSvg.querySelector('#' + CSS.escape(fillId)));
    // Eyes painted with a plain colour (set by a rule rather than the eye
    // colour variable) give the joined sheet that same colour.
    const plain = base && getComputedStyle(base).fill;
    if (sheetRect && plain && !/url\(/.test(plain) && plain !== 'none') sheetRect.setAttribute('fill', plain);
    if (sheetRect && /Gradient$/.test(grad?.tagName || '')) {
      unionPaint = grad.cloneNode(true); unionPaint.id = 'pair-union-paint'; unionPaint.setAttribute('gradientUnits', 'userSpaceOnUse'); unionPaint.removeAttribute('gradientTransform');
      pairSvg.querySelector('defs').append(unionPaint); sheetRect.setAttribute('fill', 'url(#pair-union-paint)');
    }
    const eyeFilter = pair.sides[0].parts.group?.getAttribute('filter'), fid = eyeFilter?.match(/url\(#([^)]+)\)/)?.[1], f = fid && pairSvg.querySelector('#' + CSS.escape(fid));
    if (sheet && f) {
      const copy = f.cloneNode(true); copy.id = 'pair-union-sink';
      for (const [k, v] of [['filterUnits', 'userSpaceOnUse'], ['x', -60], ['y', -60], ['width', 360], ['height', 360]]) copy.setAttribute(k, v);
      pairSvg.querySelector('defs').append(copy); sheet.setAttribute('style', 'filter:url(#pair-union-sink)');
    }
    for (const { parts } of pair.sides) { parts.filterAttr = parts.group?.getAttribute('filter'); parts.group?.removeAttribute('filter'); }
  }
  // Two ways to draw the overlapping eyes, as the original does: joined into
  // one surface for shapes designed as one (the heart, the voice kit's circle
  // and crossed ovals, the shape wait: the avatar's _eyesAsOne); otherwise two
  // separate eyes, one over the other with their own shading (crossing orbits
  // keep both visible).
  let joinedNow = null;
  const setJoined = on => {
    if (!pairModes || joinedNow === on) return; joinedNow = on;
    pairModes.eyesGroup.style.opacity = on ? '0' : '1';
    pairModes.sheet.style.display = on ? '' : 'none';
    for (const { parts } of pair.sides) {
      if (!parts.group) continue;
      parts.group.style.filter = on ? 'none' : '';
      if (parts.filterAttr) on ? parts.group.removeAttribute('filter') : parts.group.setAttribute('filter', parts.filterAttr);
    }
  };
  // Spread the joined gradient over both eyes' current box, as the original does.
  const fitUnionPaint = () => {
    if (!unionPaint || pair.node.style.display === 'none') return;
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const { m } of pair.sides) { const b = m.base.getBBox(), mt = matrixOf(m.group) || new DOMMatrix();
      for (const [x, y] of [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]]) { const q = new DOMPoint(x, y).matrixTransform(mt); x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y); } }
    if (unionPaint.tagName === 'linearGradient') { unionPaint.setAttribute('x1', x1.toFixed(2)); unionPaint.setAttribute('y1', y0.toFixed(2)); unionPaint.setAttribute('x2', x0.toFixed(2)); unionPaint.setAttribute('y2', y1.toFixed(2)); }
    else { // radial: same relative centre and radius, now over the joined box
      const rel = k => parseFloat(unionPaint.dataset[k] ??= (unionPaint.getAttribute(k) ?? (k === 'r' ? '.5' : '.5')));
      const w = x1 - x0, h = y1 - y0;
      unionPaint.setAttribute('cx', (x0 + rel('cx') * w).toFixed(2)); unionPaint.setAttribute('cy', (y0 + rel('cy') * h).toFixed(2)); unionPaint.setAttribute('r', (rel('r') * Math.max(w, h)).toFixed(2));
      if (unionPaint.hasAttribute('fx')) { unionPaint.setAttribute('fx', (x0 + rel('fx') * w).toFixed(2)); unionPaint.setAttribute('fy', (y0 + rel('fy') * h).toFixed(2)); }
    }
  };
  outlinePaths.push(...pairSvg.querySelectorAll('path[id$="headShape"]'));

  // Copy the eye shapes (expression, blink, lids) from a live official avatar.
  // Only the small eye plates repaint, and only when a shape actually changes.
  const SHAPE = { base: ['cx', 'cy', 'rx', 'ry', 'opacity', 'data-shape'], input: ['x', 'y', 'width', 'height', 'opacity', 'rx', 'ry'], top: ['y', 'height', 'transform'], bottom: ['y', 'height', 'transform'] };
  let lastSig = '', roundR = () => 0;
  // Rounded eyes on every eye plate (the same shape as the flat card's).
  const roundTargets = [];
  const syncEyes = brain => {
    const r = brain?.shadowRoot; if (!r) return;
    const look = brain._look || { x: 0, y: 0 };
    // Skip the copy entirely on frames where the official eyes did not change.
    const R = roundR();
    let sig = R + ',' + look.x.toFixed(2) + ',' + look.y.toFixed(2);
    for (const side of ['left', 'right']) {
      sig += r.getElementById(side + 'Eye')?.getAttribute('transform');
      const b = r.getElementById(side + 'Base'), t = r.getElementById(side + 'Top'), bo = r.getElementById(side + 'Bottom'), ib = r.getElementById(side + 'InputBase');
      sig += b?.getAttribute('data-shape') + b?.getAttribute('rx') + b?.getAttribute('ry') + b?.getAttribute('cy') + b?.getAttribute('opacity') + t?.getAttribute('y') + t?.getAttribute('transform') + bo?.getAttribute('y') + bo?.getAttribute('transform') + ib?.getAttribute('opacity') + ib?.getAttribute('width') + ib?.getAttribute('height') + ib?.getAttribute('x') + ib?.getAttribute('y') + ib?.getAttribute('rx') + ib?.getAttribute('ry');
    }
    if (sig === lastSig) return; lastSig = sig;
    // Where the official face is looking by itself (bored, inspect, random).
    // Scaled so the eyes travel exactly as far as the official ones: gaze 1
    // moves an eye 36 sideways (.40 × 90) and 27 up or down (.30 × 90).
    lookAdd = [look.x / 36, look.y / 27];
    for (const eye of eyes) {
      const from = { base: r.getElementById(eye.side + 'Base'), input: r.getElementById(eye.side + 'InputBase'), top: r.getElementById(eye.side + 'Top'), bottom: r.getElementById(eye.side + 'Bottom') };
      for (const copy of eye.copies) for (const [k, attrs] of Object.entries(SHAPE)) {
        const a = from[k], b = copy.parts[k]; if (!a || !b) continue;
        for (const name of attrs) { const v = a.getAttribute(name); if (v !== null && v !== b.getAttribute(name)) b.setAttribute(name, v); else if (v === null && name === 'data-shape' && b.hasAttribute(name)) b.removeAttribute(name); }
      }
      // The whole eye transform (position, tilt, scale: hearts, orbits, nods),
      // minus the look, which the 3D placement turns into gaze instead.
      const src = r.getElementById(eye.side + 'Eye'), m = matrixOf(src);
      if (m) { eye.off = [m.e - eye.ex - look.x, m.f - eye.ey - look.y]; eye.lin = [m.a, m.b, m.c, m.d]; }
      // The random reels roll the eye inside its group (its centre's cx/cy
      // move, up to the head's top and bottom edges). The plate only shows a
      // small box round the eye, so the reel's move goes into the plate's
      // position instead: the plate itself rolls over the dome.
      if (brain._randomFx) {
        const fb = from.base, rcx = +(fb?.getAttribute('cx') || 0), rcy = +(fb?.getAttribute('cy') || 0);
        eye.off = [eye.off[0] + rcx * eye.lin[0] + rcy * eye.lin[2], eye.off[1] + rcx * eye.lin[1] + rcy * eye.lin[3]];
        for (const part of eye.copies.map(c => c.parts.base)) { if (part?.getAttribute('cx') !== '0') part?.setAttribute('cx', '0'); if (part?.getAttribute('cy') !== '0') part?.setAttribute('cy', '0'); }
      }
      // How narrow the official eye is (1 = a sliver seen edge-on, as in the wrap waiting).
      // (An eye squeezed to rx 0 is 0, not the default: the wrap's departed eye.)
      const rxA = r.getElementById(eye.side + 'Base')?.getAttribute('rx'); eye.rx = rxA == null ? 27 : +rxA;
      // Measured against the eye's own height: a small round eye (the moment
      // before surprise, a shrinking dizzy eye) is not narrow and must not be
      // pushed out to the outline; only an eye squeezed sideways is.
      const ryA = r.getElementById(eye.side + 'Base')?.getAttribute('ry'), ry = ryA == null ? 29 : +ryA;
      // Both must hold: narrower than a normal eye AND narrower than it is tall
      // (a heart's tall lobes are not narrow; a small round eye is not either).
      eye.narrowX = Math.max(0, Math.min(1, 1 - 2 * eye.rx / 54, 1 - (eye.rx / Math.max(ry, 1)) / (27 / 29)));
      // The typing cursor is narrow because it is a cursor, not an eye seen
      // edge-on: while it forms or splits back into eyes it stays where the
      // official face draws it (never pushed out to the outline).
      if ((brain._center ?? 0) > 0.001 || brain._state === 'input') eye.narrowX = 0;
      // The random reels flatten an eye top-to-bottom as it rolls over the
      // top or bottom edge; that counts as narrowing too (only then: blinks
      // also flatten the eye and must change nothing).
      eye.narrow = Math.max(eye.narrowX, brain._randomFx ? Math.max(0, Math.min(1, 1 - ry / 29)) : 0);
    }
    for (const { side, parts } of pair.sides) {
      const from = { base: r.getElementById(side + 'Base'), input: r.getElementById(side + 'InputBase'), top: r.getElementById(side + 'Top'), bottom: r.getElementById(side + 'Bottom') };
      for (const [k, attrs] of Object.entries(SHAPE)) {
        const a = from[k], b = parts[k]; if (!a || !b) continue;
        for (const name of attrs) { const v = a.getAttribute(name); if (v !== null && v !== b.getAttribute(name)) b.setAttribute(name, v); else if (v === null && name === 'data-shape' && b.hasAttribute(name)) b.removeAttribute(name); }
      }
      const t = `translate(${(-look.x).toFixed(2)} ${(-look.y).toFixed(2)}) ${r.getElementById(side + 'Eye')?.getAttribute('transform') || ''}`;
      if (parts.group && parts.group.getAttribute('transform') !== t) parts.group.setAttribute('transform', t);
      const m = pair.sides.find(x => x.side === side).m;
      if (m.group && m.group.getAttribute('transform') !== t) m.group.setAttribute('transform', t);
      for (const k of ['base', 'input']) { const a = from[k], b = m[k]; if (!a || !b) continue; for (const name of SHAPE[k]) { const v = a.getAttribute(name); if (v !== null && v !== b.getAttribute(name)) b.setAttribute(name, v); } }
    }
    if (!roundTargets.length) {
      eyes.forEach((eye, i) => eye.copies.forEach((c, j) => roundTargets.push({ svg: c.svg, id: `${c.pre}round`, ...c.parts })));
      for (const { side, parts, m } of pair.sides) roundTargets.push({ svg: pairSvg, id: `pair-round-${side}`, base: parts.base, input: parts.input, top: parts.top, bottom: parts.bottom, also: [m.base], alsoInput: [m.input] });
    }
    for (const t of roundTargets) roundInto(t, R);
  };
  // Eye placement. Each eye normally lies on the dome under its own spot; when
  // the two eyes come close (heart, crossing orbits) they become one rigid
  // pair on a shared tangent plane, so their overlap stays exactly as drawn.
  const EYE_TILT = 1;
  const surface = (sx, sy, limit = .75) => {
    let z = 0, x = 0, y = 0;
    for (let k = 0; k < 5; k++) {
      x = sx * (D - z) / (D * zoom); y = sy * (D - z) / (D * zoom);
      const reach = Math.hypot(x, y) / (limit * radiusAt(x, y)); if (reach > 1) { x /= reach; y /= reach; }
      // A little below the true dome so parallax never lifts an eye off the face.
      z = Math.max(front + 3, front + (height(x, y) - front) * .9);
    }
    const e = .5, hx = (height(x + e, y) - height(x - e, y)) / (2 * e), hy = (height(x, y + e) - height(x, y - e)) / (2 * e);
    // The eye plate tilts with the surface (the far eye narrows, the near one
    // grows, as on a curved face). Lift it by its own tilt so no part of a
    // ~34-unit eye dips behind the face plate and gets cut off.
    const lift = front + 2 + 34 * Math.hypot(hx, hy) * EYE_TILT;
    if (z < lift) { z = lift; x = sx * (D - z) / (D * zoom); y = sy * (D - z) / (D * zoom); }
    return { x, y, z, hx, hy, k: (D - z) / (D * zoom) };
  };
  const eyeMatrix = (eye, c, ox = 0, oy = 0) => {
    // A narrowing eye (the wrap's sliver) is already foreshortened by the
    // official drawing; tilting its plate with the slope too would squeeze it
    // twice, so the tilt fades out as the eye narrows.
    const tilt = EYE_TILT * (1 - (eye.narrow || 0));
    const [a, b, cc, d] = eye.lin, k = c.k, hx = c.hx * tilt, hy = c.hy * tilt, n = [-hx, -hy, 1], nl = Math.hypot(...n);
    const x = c.x + k * ox, y = c.y + k * oy, z = c.z + k * (ox * hx + oy * hy);
    return [k * a, k * b, k * (a * hx + b * hy), 0, k * cc, k * d, k * (cc * hx + d * hy), 0, n[0] / nl, n[1] / nl, n[2] / nl, 0, (120 + x - eye.ex) * u, (120 + y - eye.ey) * u, z * u, 1];
  };
  // A narrowing eye (the wrap's sliver) is placed on the head's visible
  // outline as the head is turned right now: the outline at the eye's row is
  // found by projecting the rim of every cross section (front to back) with
  // the current turn and perspective; the eye is then slid sideways (in the
  // head's own space) until it sits half its width inside that outline. With
  // the head facing front this is the face rim, as in the official drawing.
  let curY = 0, curP = 0, hullFor = null, hullPts = [];
  const project = (x, y, z) => {
    const r = Math.PI / 180, cY = Math.cos(curY * r), sY = Math.sin(curY * r), cP = Math.cos(curP * r), sP = Math.sin(curP * r);
    const x1 = x * cY + z * sY, z1 = -x * sY + z * cY, y2 = y * cP - z1 * sP, z2 = y * sP + z1 * cP, f = D / (D - z2);
    return { x: x1 * zoom * f, y: y2 * zoom * f };
  };
  // The official head's left and right edge (240-unit space), for the wrap:
  // the outline as drawn, i.e. through the head's own transform (it is drawn
  // at 94% of the outline path; the bare path would put the rim 6 units out
  // and keep the eye that far off the edge).
  let rimFor = '', rimX = [26, 214];
  const headRim = () => {
    const shape = brain?._headShape, head = brain?._head, key = (shape?.getAttribute('d') || '') + '|' + (head?.getAttribute('transform') || '');
    if (shape && key !== rimFor) {
      rimFor = key;
      try {
        const b = shape.getBBox(), m = head?.transform?.baseVal?.consolidate?.()?.matrix;
        if (b.width) rimX = m ? [m.a * b.x + m.e, m.a * (b.x + b.width) + m.e] : [b.x, b.x + b.width];
      } catch { /* not rendered */ }
    }
    return rimX;
  };
  const hugSide = (c, sx, sy, eye) => {
    const n = eye.narrowX || 0; if (n <= 0) return c;
    const sign = Math.sign(sx) || 1, eyeScr = project(c.x, c.y, c.z);
    // The outline at this row, read from the silhouette actually drawn this
    // frame (the side wall's hull, which includes the face rim).
    if (hullFor !== lastWallD) { hullFor = lastWallD; hullPts = (lastWallD.match(/-?\d+(?:\.\d+)?/g) || []).map(Number); }
    let edge = -Infinity;
    for (let i = 0; i + 1 < hullPts.length; i += 2) {
      const ax = hullPts[i] - 120, ay = hullPts[i + 1] - 120, j = (i + 2) % hullPts.length, bx = hullPts[j] - 120, by = hullPts[j + 1] - 120;
      // where this hull edge crosses the eye's row
      if ((ay - eyeScr.y) * (by - eyeScr.y) <= 0 && ay !== by) edge = Math.max(edge, sign * (ax + (bx - ax) * (eyeScr.y - ay) / (by - ay)));
    }
    if (!isFinite(edge)) return c;
    const want = edge - eye.rx * (eye.lin[0] || 1) + .3; // the eye's outer side on the outline (as the flat drawing clips it there)
    let x = c.x;
    for (let k = 0; k < 3; k++) { const q = project(x, c.y, c.z), d = want - sign * q.x, slope = Math.max(.3, Math.abs(project(x + sign, c.y, c.z).x - q.x)); x += sign * d / slope; }
    // Outward or inward: the official eye drifts a little further out as it
    // narrows, which in 3D can end past the outline, so it is pulled back too.
    // In the wrap it follows the flat drawing's timing: the official eye
    // reaches the rim and is clipped there, so the plate goes onto the outline
    // over the official eye's last 10 units to the rim, never earlier (an
    // early move would open a gap between the two eyes). Other expressions
    // narrow an eye a little (a head shake) and only go to the outline once it
    // is a real sliver.
    let w;
    if (brain?._waitingFx?.variant === 'wrap') {
      const rim = headRim(), ox = eye.ex + eye.off[0], half = eye.rx * Math.abs(eye.lin[0] || 1);
      const gap = sign < 0 ? (ox - half) - rim[0] : rim[1] - (ox + half);
      w = Math.max(0, Math.min(1, 1 - gap / 10));
    } else w = Math.max(0, Math.min(1, (n - .15) / .45));
    const s = w * w * (3 - 2 * w);
    // Moved out to the outline, the plate faces the head's front (its own slope there would turn it edge-on).
    return { ...c, x: c.x + (x - c.x) * s, hx: c.hx * (1 - s), hy: c.hy * (1 - s) };
  };
  const placeEyes = (gx, gy) => {
    const t = eyes.map(e => [e.ex - 120 + e.off[0] + gx * 90, e.ey - 120 + e.off[1] + gy * 90]);
    // The eyes become one rigid pair only when they really come close for
    // their size (heart, crossing orbits). Two eyes side by side where one is
    // a narrow sliver (the wrap waiting) do not overlap and stay separate.
    const size = ((1 - (eyes[0].narrow || 0)) + (1 - (eyes[1].narrow || 0))) / 2;
    // An eye squeezed to nothing (the wrap's first eye, gone past the rim)
    // does not pair up with the one coming after it, or it would pull that
    // one off the outline.
    const gone = eyes.some(e => (e.rx ?? 27) < 1);
    const gap = Math.hypot(t[0][0] - t[1][0], t[0][1] - t[1][1]), rigid = gone ? 0 : Math.max(0, Math.min(1, (56 * size - gap) / 20));
    // Shapes drawn as one (bloom, cross, the listening circle, shape wait)
    // become the one-surface pair the moment the eyes touch, as on the flat
    // face; otherwise two shaded eyes would show a seam while they merge.
    const asOne = !!brain?._eyesAsOne?.(8);
    const mid = [(t[0][0] + t[1][0]) / 2, (t[0][1] + t[1][1]) / 2], anchor = rigid > 0 || asOne ? surface(...mid, .7) : null;
    const together = asOne || rigid >= .5;
    // display, not visibility: the eye clones force their eye visible inside.
    pair.node.style.display = together ? '' : 'none';
    for (const e of eyes) for (const c of e.copies) c.node.style.display = together ? 'none' : '';
    if (together) {
      const mo = [(eyes[0].off[0] + eyes[1].off[0]) / 2, (eyes[0].off[1] + eyes[1].off[1]) / 2];
      const pm = eyeMatrix({ ex: 120, ey: 126, lin: [1, 0, 0, 1] }, anchor, -mo[0], -mo[1]);
      pair.node.style.transform = `matrix3d(${pm.map(v => +v.toFixed(5)).join(',')})`; pair.m = pm; pair.on = true;
      setJoined(asOne || !!(!brain?._eyesAsOne && brain?._loveFx));
      fitUnionPaint();
      return;
    }
    pair.on = false;
    eyes.forEach((eye, i) => {
      const [a, b, cc, d] = eye.lin;
      // Strip edges on the dome: neighbours share the exact same edge point,
      // so the eye bends without a step where two strips meet.
      const edges = STRIPS > 1 ? Array.from({ length: STRIPS + 1 }, (_, j) => { const bx = -40 + j * STRIP_W; return { bx, s: surface(t[i][0] + bx * a, t[i][1] + bx * b) }; }) : null;
      eye.copies.forEach((c, j) => {
        let m;
        // A round eye stays within 75% of the radius; a narrowing eye may go
        // further, up to the rim, so the wrap sliver hugs the edge.
        if (!edges) m = eyeMatrix(eye, hugSide(surface(...t[i], .75 + .25 * (eye.narrow || 0) ** .6), t[i][0], t[i][1], eye));
        else {
          const A = edges[j], B = edges[j + 1], s = A.s, e = B.s;
          // Across: straight from one edge point to the next. Down: the eye's
          // own vertical, tilted with the dome halfway between the edges.
          const X = [(e.x - s.x) / STRIP_W, (e.y - s.y) / STRIP_W, (e.z - s.z) / STRIP_W];
          const k = (s.k + e.k) / 2, hx = (s.hx + e.hx) / 2 * EYE_TILT, hy = (s.hy + e.hy) / 2 * EYE_TILT;
          const Yv = [k * cc, k * d, k * (cc * hx + d * hy)], n = [-hx, -hy, 1], nl = Math.hypot(...n);
          // The eye centre (this strip's transform origin), carried out along the strip.
          const o = [s.x - X[0] * A.bx, s.y - X[1] * A.bx, s.z - X[2] * A.bx];
          m = [X[0], X[1], X[2], 0, Yv[0], Yv[1], Yv[2], 0, n[0] / nl, n[1] / nl, n[2] / nl, 0, (120 + o[0] - eye.ex) * u, (120 + o[1] - eye.ey) * u, o[2] * u, 1];
        }
        if (anchor) { const r = eyeMatrix(eye, anchor, t[i][0] - mid[0], t[i][1] - mid[1]); m = m.map((v, j) => v + (r[j] - v) * rigid); }
        c.node.style.transform = `matrix3d(${m.map(v => +v.toFixed(5)).join(',')})`; c.m = m;
      });
    });
  };

  // ---- See-through eyes (eye-color="transparent"). ----
  // The official face cuts its eyes out of the head; here every eye is a
  // plate floating in 3D, so each frame the eye's current outline (lids,
  // shapes and the typing cursor included) is carried through its plate's 3D
  // placement onto the screen and cut out of the whole head (face, side wall,
  // highlights). One wrapper per outline, each clipping its own hole, so
  // overlapping holes (a heart, the cursor forming) simply add up.
  const cuts = [...root.querySelectorAll('.cut')], probe = root.querySelector('.probe path');
  const sampled = new Map();
  const sampleD = d => {
    let pts = sampled.get(d); if (pts) return pts;
    probe.setAttribute('d', d); const L = probe.getTotalLength(); pts = [];
    for (let i = 0; i < 64; i++) { const q = probe.getPointAtLength(L * i / 64); pts.push([q.x, q.y]); }
    if (sampled.size > 300) sampled.clear(); sampled.set(d, pts); return pts;
  };
  const num = (el, a, dflt = 0) => { const v = el?.getAttribute(a); return v == null || v === '' ? dflt : +v; };
  const ring = (cx, cy, rx, ry) => Array.from({ length: 48 }, (_, i) => { const t = i / 48 * Math.PI * 2; return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)]; });
  const roundRect = (x, y, w, h, r) => { r = Math.max(0, Math.min(r, w / 2, h / 2)); const p = [];
    for (const [cx, cy, a0] of [[x + w - r, y + r, -90], [x + w - r, y + h - r, 0], [x + r, y + h - r, 90], [x + r, y + r, 180]])
      for (let i = 0; i <= 6; i++) { const a = (a0 + 15 * i) * Math.PI / 180; p.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
    return p; };
  // One eye's visible outline in its own group's units: [eye shape, typing cursor].
  const outlines = (r, side) => {
    const base = r.getElementById(side + 'Base'), input = r.getElementById(side + 'InputBase'); let a = null, b = null;
    if (base && num(base, 'opacity', 1) > .01) {
      const id = base.getAttribute('clip-path')?.match(/#([^)"']+)/)?.[1], d = id && r.getElementById(id)?.querySelector('path')?.getAttribute('d');
      const rx = num(base, 'rx'), ry = num(base, 'ry');
      a = d ? sampleD(d) : rx > .05 && ry > .05 ? ring(num(base, 'cx'), num(base, 'cy'), rx, ry) : null;
      const m = a ? matrixOf(base) : null;
      if (m) a = a.map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
    }
    if (input && num(input, 'opacity', 1) > .01 && num(input, 'width') > .05 && num(input, 'height') > .05)
      b = roundRect(num(input, 'x'), num(input, 'y'), num(input, 'width'), num(input, 'height'), num(input, 'rx'));
    return [a, b];
  };
  let cutOn = false;
  const cutHoles = () => {
    const through = /^(transparent|none|through)$/i.test(String(brain?._eyeColorApplied || ''));
    if (!through) { if (cutOn) { cutOn = false; stage.classList.remove('through'); for (const c of cuts) c.style.clipPath = ''; } return; }
    if (!cutOn) { cutOn = true; stage.classList.add('through'); }
    const r = brain.shadowRoot, c0 = size / 2;
    const H = new DOMMatrix().translate(c0, c0).multiply(new DOMMatrix(head.style.transform || 'matrix(1,0,0,1,0,0)')).translate(-c0, -c0);
    const P = new DOMMatrix().translate(c0, c0).multiply(new DOMMatrix([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / (D * u), 0, 0, 0, 1])).translate(-c0, -c0);
    const PH = P.multiply(H), big = size * 2, f = v => (Math.round(v * 10) / 10);
    ['left', 'right'].forEach((side, i) => {
      const eye = eyes[i], copy = eye.copies[0];
      // The plate this eye is drawn on: its own, or the shared one of the pair.
      let box, origin, m, place;
      if (pair.on && pair.m) { box = [0, 0]; origin = [120 * u, 126 * u]; m = pair.m; const gm = matrixOf(pair.sides[i].parts.group) || new DOMMatrix(); place = ([x, y]) => [gm.a * x + gm.c * y + gm.e, gm.b * x + gm.d * y + gm.f]; }
      else { box = copy.box; origin = copy.origin; m = copy.m; place = ([x, y]) => [eye.ex + x, eye.ey + y]; }
      const F = m && PH.multiply(new DOMMatrix().translate(box[0] * u + origin[0], box[1] * u + origin[1]).multiply(new DOMMatrix(m)).translate(-origin[0], -origin[1]));
      outlines(r, side).forEach((pts, k) => {
        let clip = '';
        if (pts && F) {
          let d = '';
          for (const q of pts) { const [x, y] = place(q), v = F.transformPoint(new DOMPoint((x - box[0]) * u, (y - box[1]) * u, 0, 1)); d += (d ? 'L' : 'M') + f(v.x / v.w) + ' ' + f(v.y / v.w); }
          clip = `path(evenodd, "M${-big} ${-big}H${big}V${big}H${-big}Z${d}Z")`;
        }
        const el = cuts[i * 2 + k]; if (el._clip !== clip) { el._clip = clip; el.style.clipPath = clip; }
      });
    });
  };

  // ---- Touch, driven by the official component itself. ----
  // The brain (a hidden official avatar) gets the real pointer events as if
  // it sat where this face is; its own gesture code then squeezes, drags,
  // tugs and shakes, and this face copies the result into 3D.
  const stage = root.querySelector('.stage');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  host.style.touchAction = 'none'; host.style.cursor = 'pointer';
  let brain = null, lastTime = performance.now(), last = '', touch = 0, center = 0, headAnim = '';
  var lookAdd = [0, 0];
  // The avatar itself is the brain (its own drawing stays hidden underneath).
  const attachBrain = b => { brain = b; };
  host.addEventListener('pointerdown', e => {
    if (!brain || e.button !== 0) return;
    // The ball is small on screen; a press near it counts as grabbing it
    // (like the original's generous hit area), instead of dragging the head.
    if (brain._antennaDot && antennaNode) {
      // Where the ball is on screen, from our own camera maths rather than the
      // browser's box for a 3D layer.
      const hr = host.getBoundingClientRect(), b = ballScreen(), cx = hr.left + b.x * u, cy = hr.top + b.y * u;
      const r = { width: (home.r * 2 + 4) * u * b.s, height: (home.r * 2 + 4) * u * b.s };
      const near = Math.hypot(e.clientX - cx, e.clientY - cy) <= Math.max(18, r.width * .8);
      brain._antennaDot.getBoundingClientRect = near
        ? () => new DOMRect(e.clientX - r.width / 2, e.clientY - r.height / 2, r.width, r.height)
        : () => new DOMRect(cx - r.width / 2, cy - r.height / 2, r.width, r.height);
    }
    // The press itself reaches the avatar's own handler as it bubbles up.
  });
  const busy = () => !!(brain && (brain._gestureFx || brain._dragJelly?.active || brain._dragJelly?.returning));
  let shown = { Y: 0, P: 0, hm: [1, 0, 0, 1, 0, 0], ax: 0, ay: 0 }, tugAngle = null;
  const sq = { a: 0, v: 0, Y: 0, P: 0, sY: 0, sP: 0 };
  // Skin light that follows the pointer: the brain wears the same skin and is
  // told where the light is; whenever its light moves, the light-driven
  // definitions (gradient centres, shadow offsets, stops) are copied onto the
  // face plate. Nothing is copied while the light rests.
  const LIGHT_ATTRS = ['cx', 'cy', 'fx', 'fy', 'r', 'x1', 'x2', 'y1', 'y2', 'dx', 'dy', 'gradientTransform', 'offset', 'stop-color', 'stop-opacity', 'opacity', 'transform'];
  let lightPairs = null, lastLight = '', pairsFor, lightSeen = 0;
  const lightTargets = [[face, ''], ...eyes.flatMap(e => e.copies.map(c => [c.svg, c.pre])), [pairSvg, 'pair-']];
  const syncLight = b => {
    const L = b._skinLight; if (!L) return;
    // Rebuild the pairing once the brain has put on (or changed) its skin.
    if (b._skinShown !== pairsFor) { pairsFor = b._skinShown; lightPairs = null; lastLight = ''; lightSeen = 0; }
    const key = L.x.toFixed(3) + ',' + L.y.toFixed(3); if (key === lastLight) return; lastLight = key;
    if (!lightPairs) {
      lightPairs = []; lightSeen = 0;
      const bd = b.shadowRoot?.querySelector('svg defs'); if (!bd) return;
      for (const src of bd.children) {
        if (!src.id) continue;
        // The face and every eye copy (single eyes, the two-eye plate) carry
        // their own copies of these definitions, e.g. the eye-socket shadow
        // whose offset follows the light: update them all.
        const a = [src, ...src.querySelectorAll('*')];
        for (const [svg, prefix] of lightTargets) {
          const dst = svg.querySelector('defs #' + CSS.escape(prefix + src.id)); if (!dst) continue;
          const c = [dst, ...dst.querySelectorAll('*')];
          if (a.length === c.length) a.forEach((n, i) => lightPairs.push([n, c[i]]));
        }
      }
    }
    // Watch everything for the first light moves, then keep only the
    // definitions that actually change with the light.
    lightSeen++;
    for (const pair of lightPairs) for (const name of LIGHT_ATTRS) { const v = pair[0].getAttribute(name); if (v !== null && v !== pair[1].getAttribute(name)) { pair[1].setAttribute(name, v); pair.live = true; } }
    if (lightSeen === 12) lightPairs = lightPairs.filter(p => p.live);
  };
  // Screen position (240 units) of the antenna ball as last drawn.
  const ballScreen = () => {
    const { Y, P, hm, ax, ay } = shown, r = Math.PI / 180;
    const x0 = home.x + ax - 120, y0 = home.y + ay - 120;
    const x1 = x0 * Math.cos(Y * r), z1 = -x0 * Math.sin(Y * r), y2 = y0 * Math.cos(P * r) - z1 * Math.sin(P * r), z2 = y0 * Math.sin(P * r) + z1 * Math.cos(P * r);
    const xa = x1 * zoom, ya = y2 * zoom, f = D / (D - z2);
    return { x: 120 + (hm[0] * xa + hm[2] * ya + hm[4]) * f, y: 120 + (hm[1] * xa + hm[3] * ya + hm[5]) * f, s: f * zoom };
  };

  return {
    // Call each frame with the running official avatar.
    syncEyes(b) { attachBrain(b); syncEyes(b); syncLight(b); },
    // The official expression motion (bounce, droop, surprise pop, squeeze
    // shake) as a CSS transform string, applied around the head centre.
    setHeadMotion(t) { headAnim = t && t !== 'none' ? (t.startsWith('matrix(') ? t : new DOMMatrix(t).toString()) : ''; },
    // yaw/pitch in degrees, gaze in -1..1. Turning only changes CSS transforms.
    pose({ yaw = 0, pitch = 0, gazeX = 0, gazeY = 0 }) {
      const now = performance.now(), dt = Math.min(.034, (now - lastTime) / 1000); lastTime = now;
      gazeX += lookAdd[0]; gazeY += lookAdd[1];
      // While touched, ease the 3D turn back to face the viewer, the way the
      // original faces you during a gesture; ease back out afterwards.
      // Tugging the antenna leaves the head where it is (only the ball moves
      // and springs); the other gestures ease the head to face the viewer.
      const tug = brain?._gestureFx?.kind === 'antenna-drag' || (tugAngle && brain?._gestureFx?.kind === 'antenna-drag');
      if (brain?._gestureFx?.kind === 'antenna-drag') { tugAngle ??= { yaw: shown.Y, pitch: shown.P }; yaw = tugAngle.yaw; pitch = tugAngle.pitch; }
      else if (tugAngle && !brain?._gestureFx) tugAngle = null;
      const touchTarget = busy() && !tug && !tugAngle ? 1 : 0;
      touch += (touchTarget - touch) * (1 - Math.exp(-dt / .12));
      // Before and during an expression the original locks its gaze to the
      // centre and straightens its head; the 3D turn and gaze follow suit.
      const locked = !!(brain && (brain._expressionLock || now < (brain._headCenteringUntil || 0)));
      center += ((locked ? 1 : 0) - center) * (1 - Math.exp(-dt / .09));
      gazeX = (gazeX - lookAdd[0]) * (1 - center) + lookAdd[0]; gazeY = (gazeY - lookAdd[1]) * (1 - center) + lookAdd[1];
      // The official drag jelly is written straight into style.transform.
      const dm = brain?._dragMotion, ds = dm?.style.transform || '', dragT = ds && ds !== 'none' ? new DOMMatrix(ds).toString() : 'none', dragO = dm?.style.transformOrigin || '';
      const shape = brain?._headShape?.getAttribute('d') || '', dot = brain?._antennaDot;
      // The official ball lives outside the moving head; ours rides inside it,
      // so undo the head motion to land the ball where the original puts it.
      const hm = (headAnim.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number)) || [1, 0, 0, 1, 0, 0];
      let ax = 0, ay = 0;
      if (dot) {
        const px = +dot.getAttribute('cx') - 120 - hm[4], py = +dot.getAttribute('cy') - 120 - hm[5], det = hm[0] * hm[3] - hm[1] * hm[2] || 1;
        ax = (hm[3] * px - hm[2] * py) / det + 120 - home.x; ay = (-hm[1] * px + hm[0] * py) / det + 120 - home.y;
      }
      const still = Math.max(touch, center), Y = clamp(yaw, -22, 22) * (1 - still), P = clamp(pitch, -15, 15) * (1 - still);
      // Squash: a turn sideways narrows the head a little (a nod flattens it),
      // a damped spring brings it back with one small wobble. Area is kept.
      const mode = squashOn.value;
      if (mode !== 'off' && dt > 0) {
        const vY = (Y - sq.Y) / dt, vP = (P - sq.P) / dt, speed = Math.abs(vY) - Math.abs(vP);
        let target = 0;
        if (mode === 'narrow') target = clamp(-.0006 * speed, -.06, .06);
        else if (mode === 'stretch') target = clamp(.0006 * speed, -.06, .06);
        else {
          // Settle: nothing while turning; once the turn has come (almost) to
          // rest, one kick, sized by how fast the turn was. A stopping turn
          // bulges sideways, a stopping nod bulges up and down.
          const sY = Math.abs(vY), sP = Math.abs(vP);
          sq.sY = Math.max(sq.sY, sY); sq.sP = Math.max(sq.sP, sP);
          const peak = Math.max(sq.sY, sq.sP);
          if (peak > 25 && Math.max(sY, sP) < peak * .12) {
            sq.v += (sq.sY >= sq.sP ? 1 : -1) * Math.min(1.2, peak * .012) * squashGain.value;
            sq.sY = sq.sP = 0;
          }
        }
        const w = 15, z = .38; sq.v += (w * w * (target - sq.a) - 2 * z * w * sq.v) * dt; sq.a = clamp(sq.a + sq.v * dt, -.07 * Math.max(1, squashGain.value), .07 * Math.max(1, squashGain.value));
        if (Math.abs(sq.a) < 1e-4 && Math.abs(sq.v) < 1e-3 && target === 0) sq.a = sq.v = 0;
      } else sq.a = sq.v = 0;
      sq.Y = Y; sq.P = P;
      const key = [yaw, pitch, gazeX, gazeY, touch, center, ax, ay, sq.a, ...eyes.flatMap(e => [...e.off, ...e.lin])].map(v => v.toFixed(3)).join() + headAnim + dragT + shape.length + shape.slice(-40);
      if (key === last) { cutHoles(); return; } last = key;
      const m0 = headAnim.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
      // The squash is folded into the head motion, so the side wall and the
      // antenna billboard follow it with no extra work.
      const sX = 1 + sq.a, sY = 1 / sX, m = sq.a ? (([a, b, c, d, e, f]) => [a * sX, b * sX, c * sY, d * sY, e, f])(m0 || [1, 0, 0, 1, 0, 0]) : m0;
      const anim = m ? `matrix(${m[0]},${m[1]},${m[2]},${m[3]},${m[4] * u},${m[5] * u}) ` : '';
      head.style.transform = `${anim}scale3d(${zoom},${zoom},1) rotateX(${P}deg) rotateY(${Y}deg)`;
      // The official drag jelly (translate, stretch, shear around the anchor).
      const dmM = dragT.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
      if (dmM) { stage.style.transformOrigin = dragO; stage.style.transform = `matrix(${dmM[0]},${dmM[1]},${dmM[2]},${dmM[3]},${dmM[4] * u},${dmM[5] * u})`; }
      else stage.style.transform = '';
      // The official outline bulge, and the highlights nudged along with it.
      const fx = brain?._gestureFx, jj = brain?._dragJelly;
      if (fx?.kind === 'antenna-drag') bend(clamp(fx.hx, -25, 25), clamp(fx.hy, -25, 25), fx.home.x, clamp(fx.home.y, 20, 220));
      else if (jj && (jj.active || jj.returning)) bend(jj.pullX, jj.pullY, jj.hotX, jj.hotY);
      else bend(0, 0, 120, 120);
      drawWall(Y, P, m || [1, 0, 0, 1, 0, 0]);
      const r = Math.PI / 180, gx = gazeX * .40 - Y * r * .65, gy = gazeY * .30 + P * r * .65;
      curY = Y; curP = P;
      placeEyes(gx, gy);
      cutHoles();
      // Billboard: the ball follows the official spring but always faces the camera.
      const hs = m || hm;
      shown = { Y, P, hm: hs, ax, ay };
      if (antennaNode) antennaNode.style.transform = `translate3d(${ax * u}px,${ay * u}px,0) rotateY(${-Y}deg) rotateX(${-P}deg) scale(${1 / Math.hypot(hs[0], hs[1])},${1 / Math.hypot(hs[2], hs[3])})`;
    },
    // A rebuilt head (new colour, skin or size) takes over the old one's turn,
    // springs and squash, so the swap shows no jump or settle bounce.
    snapshot() { return { touch, center, sq: { ...sq }, shown: { ...shown }, headAnim, tugAngle, lastTime }; },
    restore(s) {
      if (!s) return;
      touch = s.touch; center = s.center; Object.assign(sq, s.sq); shown = { ...s.shown };
      headAnim = s.headAnim; tugAngle = s.tugAngle; lastTime = s.lastTime;
    },
    // Squash can be switched on and off live.
    setSquashGain(g) { squashGain.value = Math.max(0, +g || 0); },
    // Rounded eyes: a function giving the corner size (0 = the sharp original).
    setRoundEyes(fn) { roundR = fn; lastSig = ''; },
    setSquash(mode) { squashOn.value = mode === true ? 'narrow' : (mode || 'off'); last = ''; },
  };
}
