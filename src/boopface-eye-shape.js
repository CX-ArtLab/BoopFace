// Eye outlines with rounded corners.
//
// The eye is an ellipse with two lid rectangles over it. Where a straight lid
// edge cuts the ellipse it leaves a sharp corner. These helpers compute the
// shape the lids leave, with every corner replaced by a curve, so the ellipse
// can be clipped to it. A thin slit (sleep, a squint, a wink) is drawn as a
// true capsule with half-round ends. Used by the flat face (round-eyes) and by
// the 3D eye plates, which copy the same ellipse and lids.
const SAMPLES = 96;

// Clip one eye's ellipse to the shape its lids leave, with the corners
// rounded (R = how far from a corner the curve starts, in avatar units; 0 =
// the sharp original). The lids stay as they are: the rounded shape always
// lies inside what they leave. An expression can hand over its own outline in
// the ellipse's data-shape attribute; that is used as is.
// t = { svg, id, base, input, top, bottom, also: [more ellipses to clip] }
export function roundInto(t, R) {
  const targets = [t.base, ...(t.also || [])].filter(Boolean), inputs = [t.input, ...(t.alsoInput || [])].filter(Boolean);
  if (!(R > 0) && !t.base?.hasAttribute('data-shape')) {
    for (const el of targets) if (el.hasAttribute('clip-path')) el.removeAttribute('clip-path');
    return;
  }
  for (const el of inputs) { const rx = ((+el.getAttribute('width') || 0) / 2).toFixed(2); if (el.getAttribute('rx') !== rx) el.setAttribute('rx', rx); }
  if (!t.base || !t.top || !t.bottom) return;
  if (!t.path) {
    const ns = t.svg.namespaceURI; let defs = t.svg.querySelector('defs'); if (!defs) { defs = document.createElementNS(ns, 'defs'); t.svg.prepend(defs); }
    const clip = document.createElementNS(ns, 'clipPath'); clip.id = t.id; t.path = document.createElementNS(ns, 'path'); clip.append(t.path); defs.append(clip);
  }
  const d = eyePath(t, R);
  if (d === null) { for (const el of targets) if (el.hasAttribute('clip-path')) el.removeAttribute('clip-path'); return; }
  t.path.setAttribute('d', d);
  for (const el of targets) if (el.getAttribute('clip-path') !== `url(#${t.id})`) el.setAttribute('clip-path', `url(#${t.id})`);
}

// The element's transform as one matrix, read without consolidate(): that
// rewrites the attribute itself (Firefox then shows it as matrix(...)), so the
// next frame's write would no longer find the same value.
export function matrixOf(el) {
  const list = el?.transform?.baseVal; if (!list || !list.numberOfItems) return null;
  let m = new DOMMatrix();
  for (let i = 0; i < list.numberOfItems; i++) m = m.multiply(DOMMatrix.fromMatrix(list.getItem(i).matrix));
  return m;
}
const apply2 = (m, x, y) => m ? [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f] : [x, y];

// One lid edge as a half-plane: [point, direction, which side stays visible].
function lidPlane(rect, isTop, inv) {
  const x = +rect.getAttribute('x') || 0, y = +rect.getAttribute('y') || 0;
  const w = +rect.getAttribute('width') || 0, h = +rect.getAttribute('height') || 0;
  const m = matrixOf(rect), ey = isTop ? y + h : y;
  const to = (px, py) => { const [gx, gy] = apply2(m, px, py); return apply2(inv, gx, gy); };
  const a = to(x, ey), b = to(x + w, ey), c = to(x + w / 2, y + h / 2);
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const inside = Math.sign(dx * (c[1] - a[1]) - dy * (c[0] - a[0]));
  return { a, dx, dy, keep: -inside };
}

function eyePath(p, R) {
  const e = p.base;
  // An expression can hand over a ready outline for the eye (data-shape, in
  // the eye's own coordinates): that is the clip, as it is.
  const given = e.getAttribute('data-shape'); if (given) return given;
  if (!(R > 0)) return null;
  const cx = +e.getAttribute('cx') || 0, cy = +e.getAttribute('cy') || 0, rx = +e.getAttribute('rx') || 0, ry = +e.getAttribute('ry') || 0;
  const em = matrixOf(e), inv = em ? em.inverse() : null;
  // The ellipse as a fine polygon, then cut by both lid edges.
  let poly = [];
  for (let i = 0; i < SAMPLES; i++) { const t = i / SAMPLES * Math.PI * 2; poly.push({ x: cx + rx * Math.cos(t), y: cy + ry * Math.sin(t), corner: false }); }
  const planes = [lidPlane(p.top, true, inv), lidPlane(p.bottom, false, inv)];
  for (const pl of planes) poly = clip(poly, pl);
  if (poly.length < 3) return 'M0 0Z';
  // Nothing cut by a lid (open eye, heart, a blink or a reel squashing the
  // ellipse itself): no corner to round, so no clip at all (null). Drawing
  // such a thin ellipse as a capsule would shrink it to a dot.
  if (!poly.some(q => q.corner)) return null;
  // Squinting eyes (a thin slit: sleep, petting, inspect) always get fully
  // round ends like a capsule; open eyes keep the chosen corner size. The
  // change is blended between 24 and 14 units of height, so an eye closing
  // into a slit rounds off smoothly instead of switching.
  // Thickness is measured straight through the middle of the eye, so a
  // slanted slit (petting) counts as thin, not as tall as its slope.
  let top = Infinity, bottom = -Infinity;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    if ((a.x - cx) * (b.x - cx) > 0 || a.x === b.x) continue;
    const y = a.y + (b.y - a.y) * (cx - a.x) / (b.x - a.x);
    if (y < top) top = y; if (y > bottom) bottom = y;
  }
  if (!(bottom > top)) { for (const q of poly) { if (q.y < top) top = q.y; if (q.y > bottom) bottom = q.y; } }
  const h = bottom - top, w = Math.min(1, Math.max(0, (24 - h) / 10)), k = w * w * (3 - 2 * w);
  // A real slit (14 units or less: sleep, petting, a wink) is drawn as a true
  // capsule along the lids' direction, so both ends are half circles even
  // when the slit sits high on the eye where the outline is slanted.
  if (h <= 14) return capsule(poly, planes, cx, (top + bottom) / 2, h, { cx, cy, rx, ry });
  return rounded(poly, R + k * (h / 2 - R));
}

function capsule(poly, planes, cx, cy, h, ell) {
  // Direction of the slit: the two lid edges, averaged (made to point the same way).
  let [ux, uy] = [planes[0].dx, planes[0].dy], [vx, vy] = [planes[1].dx, planes[1].dy];
  if (ux < 0) { ux = -ux; uy = -uy; } if (vx < 0) { vx = -vx; vy = -vy; }
  const la = Math.hypot(ux, uy) || 1, lb = Math.hypot(vx, vy) || 1;
  ux = ux / la + vx / lb; uy = uy / la + vy / lb; const l = Math.hypot(ux, uy) || 1; ux /= l; uy /= l;
  const nx = -uy, ny = ux, r = Math.max(.6, h * Math.abs(ux) / 2); // thickness across the slit
  let smin = Infinity, smax = -Infinity;
  for (const q of poly) { const s = (q.x - cx) * ux + (q.y - cy) * uy; if (s < smin) smin = s; if (s > smax) smax = s; }
  let s0 = smin + r, s1 = smax - r; if (s1 < s0) s0 = s1 = (smin + smax) / 2;
  // The eye is the ellipse seen through this clip, so each round end must lie
  // inside the ellipse, or the ellipse edge cuts it slanted: pull the ends in
  // until the whole half circle fits.
  const fits = (s, dir) => { for (let i = 0; i <= 8; i++) { const t = (i / 8 - .5) * Math.PI, ca = Math.cos(t), sa = Math.sin(t);
      const x = cx + ux * s + (ux * ca * dir + nx * sa) * r, y = cy + uy * s + (uy * ca * dir + ny * sa) * r;
      if (((x - ell.cx) / ell.rx) ** 2 + ((y - ell.cy) / ell.ry) ** 2 > 1.0001) return false; } return true; };
  const mid = (s0 + s1) / 2;
  for (let n = 0; n < 40 && !fits(s1, 1) && s1 > mid; n++) s1 -= .5;
  for (let n = 0; n < 40 && !fits(s0, -1) && s0 < mid; n++) s0 += .5;
  const A = [cx + ux * s0, cy + uy * s0], B = [cx + ux * s1, cy + uy * s1], f = v => v.toFixed(2);
  return `M${f(A[0] + nx * r)} ${f(A[1] + ny * r)}L${f(B[0] + nx * r)} ${f(B[1] + ny * r)}`
    + `A${f(r)} ${f(r)} 0 0 0 ${f(B[0] - nx * r)} ${f(B[1] - ny * r)}`
    + `L${f(A[0] - nx * r)} ${f(A[1] - ny * r)}A${f(r)} ${f(r)} 0 0 0 ${f(A[0] + nx * r)} ${f(A[1] + ny * r)}Z`;
}

// Sutherland–Hodgman against one half-plane; new points are marked as corners.
function clip(poly, { a, dx, dy, keep }) {
  const side = q => (dx * (q.y - a[1]) - dy * (q.x - a[0])) * keep;
  const out = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i], prev = poly[(i + poly.length - 1) % poly.length];
    const sc = side(cur), sp = side(prev);
    if (sc >= 0) {
      if (sp < 0) out.push(cross(prev, cur, sp, sc));
      out.push(cur);
    } else if (sp >= 0) out.push(cross(prev, cur, sp, sc));
  }
  return out;
}
const cross = (p, q, sp, sq) => { const t = sp / (sp - sq); return { x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t, corner: true }; };

// Replace each corner by a curve that starts and ends up to R away from it
// along the outline (less when the next corner is close, so a thin slit gets
// round ends like a capsule).
function rounded(poly, R) {
  const n = poly.length, seg = [], cum = [0];
  for (let i = 0; i < n; i++) { const a = poly[i], b = poly[(i + 1) % n]; seg.push(Math.hypot(b.x - a.x, b.y - a.y)); cum.push(cum[i] + seg[i]); }
  const total = cum[n];
  const corners = [];
  for (let i = 0; i < n; i++) if (poly[i].corner) corners.push(i);
  if (!corners.length) return 'M' + poly.map(q => q.x.toFixed(2) + ' ' + q.y.toFixed(2)).join('L') + 'Z';
  // Point at arc length s along the outline.
  const at = s => {
    s = ((s % total) + total) % total;
    let i = 0; while (i < n - 1 && cum[i + 1] < s) i++;
    const t = seg[i] ? (s - cum[i]) / seg[i] : 0, a = poly[i], b = poly[(i + 1) % n];
    return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, i, s };
  };
  const k = corners.length;
  const fil = corners.map((ci, j) => {
    const prev = corners[(j + k - 1) % k], next = corners[(j + 1) % k];
    const back = k === 1 ? total : ((cum[ci] - cum[prev]) + total) % total || total;
    const fwd = k === 1 ? total : ((cum[next] - cum[ci]) + total) % total || total;
    const dA = Math.min(R, back * .5), dB = Math.min(R, fwd * .5);
    return { c: poly[ci], s: cum[ci], A: at(cum[ci] - dA), B: at(cum[ci] + dB) };
  });
  const f = v => v.toFixed(2);
  let d = `M${f(fil[0].B.x)} ${f(fil[0].B.y)}`;
  for (let j = 0; j < k; j++) {
    const from = fil[j], to = fil[(j + 1) % k];
    // Outline points strictly between this curve's end and the next one's start.
    // On a short stretch (the ends of a thin slit) the two curves meet; a
    // tiny negative gap from rounding must not turn into a whole lap.
    let gap = ((to.A.s - from.B.s) % total + total) % total; if (gap > total - 1e-3) gap = 0;
    const s0 = from.B.s, s1 = s0 + gap;
    for (let i = 0; i < 2 * n; i++) {
      const idx = i % n, s = cum[idx] + (i >= n ? total : 0);
      if (s > s0 + 1e-6 && s < s1 - 1e-6) d += `L${f(poly[idx].x)} ${f(poly[idx].y)}`;
      if (s >= s1) break;
    }
    d += `L${f(to.A.x)} ${f(to.A.y)}Q${f(to.c.x)} ${f(to.c.y)} ${f(to.B.x)} ${f(to.B.y)}`;
  }
  return d + 'Z';
}
