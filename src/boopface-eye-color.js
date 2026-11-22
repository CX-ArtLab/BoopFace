import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';

// Eye colour. eye-color="#2bd67b" paints the eyes in that colour (over a
// skin's own eye colour too). eye-color="transparent" makes the eyes see-
// through: their live outlines are cut out of the whole head, so whatever is
// behind the avatar (a page colour, a gradient, a picture) shows in them.
const NS = 'http://www.w3.org/2000/svg';
const EYES = '#leftBase,#rightBase,#leftInputBase,#rightInputBase';

function el(tag, attrs, parent) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  parent?.append(node);
  return node;
}

function parts(instance) {
  if (instance._eyeColorParts) return instance._eyeColorParts;
  const root = instance.shadowRoot, defs = root?.querySelector('defs'), head = root?.getElementById('headMotion');
  if (!defs || !head) return null;
  // The see-through mask: white everywhere, black where the eyes are.
  const filter = el('filter', { id: 'eye-through-silhouette', 'color-interpolation-filters': 'sRGB' }, defs);
  el('feColorMatrix', { type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0' }, filter);
  const mask = el('mask', { id: 'eye-through', maskUnits: 'userSpaceOnUse', x: '-120', y: '-120', width: '480', height: '480', style: 'mask-type:luminance' }, defs);
  el('rect', { x: '-120', y: '-120', width: '480', height: '480', fill: '#fff' }, mask);
  const holes = el('g', { filter: 'url(#eye-through-silhouette)' }, mask);
  for (const side of ['left', 'right']) el('use', { href: `#${side}Eye` }, holes);
  const style = document.createElement('style');
  root.append(style);
  instance._eyeColorParts = { head, style };
  return instance._eyeColorParts;
}

function apply(instance) {
  const p = parts(instance); if (!p) return;
  const raw = String(instance.getAttribute('eye-color') || '').trim();
  const through = /^(transparent|none|through)$/i.test(raw);
  if (through) {
    p.head.setAttribute('mask', 'url(#eye-through)');
    // The lids are part of each eye group, so they would be cut out too: they
    // are hidden, and round-eyes clips each eye to exactly what they leave.
    p.style.textContent = `#leftEye,#rightEye{filter:none!important}${EYES}{fill:#fff!important;fill-opacity:1!important;stroke:none!important}#leftTop,#rightTop,#leftBottom,#rightBottom{visibility:hidden!important}`;
  } else {
    p.head.removeAttribute('mask');
    // Only simple colour values; anything else is ignored.
    // Skins paint their eyes from --material-eye; plain eyes from their fill.
    p.style.textContent = raw && /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\)|[a-z]+)$/i.test(raw)
      ? `svg{--material-eye:${raw}!important;--material-eye-right:${raw}!important}${EYES}{fill:${raw}!important}` : '';
  }
  instance._eyeColorApplied = raw;
  instance._resumeFrames?.();
}

BoopFace.prototype.setEyeColor = function(value) {
  if (value == null || value === '') this.removeAttribute('eye-color');
  else this.setAttribute('eye-color', String(value));
  return this;
};

registerAvatarExtension({
  name: 'eye-color',
  draw() {
    if (!this._eyeColorObserver && typeof MutationObserver !== 'undefined') {
      this._eyeColorObserver = new MutationObserver(() => apply(this));
      this._eyeColorObserver.observe(this, { attributes: true, attributeFilter: ['eye-color'] });
    }
    if (this._eyeColorApplied !== String(this.getAttribute('eye-color') || '').trim()) apply(this);
  },
});
