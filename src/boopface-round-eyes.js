import { registerAvatarExtension } from './boopface-extension-host.js';
import { roundInto } from './boopface-eye-shape.js';

// Rounded eyes. Every corner a lid cuts into an eye is rounded, and a thin
// slit (sleep, a squint, a wink, the typing cursor) gets half-round ends.
// eye-style="sharp" keeps the original straight cuts.
const ROUND = 4; // how far from a corner the curve starts, in avatar units

function targets(instance) {
  if (instance._roundEyeTargets) return instance._roundEyeTargets;
  const root = instance.shadowRoot, svg = root?.querySelector('svg');
  if (!svg) return null;
  instance._roundEyeTargets = ['left', 'right'].map(side => ({
    svg, id: `round-eye-${side}`,
    base: root.getElementById(`${side}Base`), input: root.getElementById(`${side}InputBase`),
    top: root.getElementById(`${side}Top`), bottom: root.getElementById(`${side}Bottom`),
  }));
  // A changed eye-style must show even while the avatar rests.
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(() => { instance._roundEyeSig = ''; instance._resumeFrames?.(); })
      .observe(instance, { attributes: true, attributeFilter: ['eye-style'] });
  }
  return instance._roundEyeTargets;
}

const attrs = (el, names) => names.map(n => el?.getAttribute(n)).join(',');

registerAvatarExtension({
  name: 'round-eyes',
  // Runs after every other draw step, so whatever an expression wrote to the
  // eyes this frame is already in place.
  draw() {
    const list = targets(this); if (!list) return;
    const R = String(this.getAttribute('eye-style') || '').trim().toLowerCase() === 'sharp' ? 0 : ROUND;
    // The core writes the cursor's corner (3) every frame: round it every frame.
    if (R > 0) for (const t of list) { const el = t.input, rx = el && ((+el.getAttribute('width') || 0) / 2).toFixed(2); if (el && el.getAttribute('rx') !== rx) el.setAttribute('rx', rx); }
    let sig = String(R);
    for (const t of list) sig += attrs(t.base, ['cx', 'cy', 'rx', 'ry', 'transform', 'data-shape']) + attrs(t.top, ['y', 'height', 'transform']) + attrs(t.bottom, ['y', 'height', 'transform']);
    if (sig === this._roundEyeSig) return;
    this._roundEyeSig = sig;
    for (const t of list) roundInto(t, R);
  },
});
