import BoopFace, { registerAvatarExtension } from './boopface-extension-host.js';
import { captureSkin, createLayeredAvatar } from './boopface-3d-layers.js';
import { newExpressionPose } from './boopface-new-expressions.js';
import { bodyMotionPose } from './boopface-body-motion.js';
import { petPose } from './boopface-petting.js';

// The 3D view: view="3d" (or setView('3d')). The avatar keeps running as usual
// underneath (its expressions, gestures, eyes, skin light) with its own flat
// drawing hidden; a layered 3D head copies all of that every frame and turns
// for real. view="2d" (the default) is the flat drawing.
const SQUASH_GAIN = 0.3; // the settle bounce after a turn (the approved 30%)

function wantedView(face) {
  return String(face.getAttribute('view') || face._viewWanted || '2d').trim().toLowerCase() === '3d' ? '3d' : '2d';
}

// What the 3D head is painted from; when any of it changes, it is rebuilt.
function paintKey(face) {
  return [face.getAttribute('skin') || '', face.getAttribute('color') || '', face.getAttribute('eye-color') || '', face.getAttribute('eye-style') || '',
    Math.round(face._headRoundness ?? 50), Math.round(face.getBoundingClientRect().width || 0)].join('|');
}

async function wallColors(face) {
  const skin = face.getAttribute('skin');
  if (skin) {
    try { const { SKIN_CATALOG } = await import('./skins/catalog.js'); const base = SKIN_CATALOG[skin]?.base; if (base?.length) return base; } catch { /* lite build */ }
  }
  return [face.getAttribute('color') || '#08090b'];
}

// The official head motion for the 3D head: the expression's own motion plus
// the official "head follows the eyes" tilt, both around the head centre.
function headOf(b) {
  const hmEl = b._headMotion, t = hmEl.getAnimations?.().length ? getComputedStyle(hmEl).transform : hmEl.style.transform;
  const hm = t && t !== 'none' ? new DOMMatrix(t) : new DOMMatrix(), f = b._headFollowPose || { rot: 0, x: 0, y: 0 }, a = f.rot * Math.PI / 180;
  if (!f.rot && !f.x && !f.y) return t;
  return hm.multiply(new DOMMatrix([Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a), f.x, f.y])).toString();
}

function view3d(face) {
  let v = face._view3dState;
  if (v) return v;
  const root = face.shadowRoot;
  const host = document.createElement('div');
  host.className = 'view-3d';
  host.setAttribute('aria-hidden', 'true');
  const style = document.createElement('style');
  style.textContent = ':host{position:relative}.view-3d{position:absolute;inset:0}:host([data-view="3d"]) svg{visibility:hidden}';
  root.append(style, host);
  v = face._view3dState = { host, avatar: null, key: '', building: null, pose: { yaw: 0, pitch: 0 }, t: performance.now() };
  return v;
}

async function build(face, v, key) {
  const token = (v.token || 0) + 1; v.token = token;
  const size = Math.round(face.getBoundingClientRect().width) || 112;
  const captured = await captureSkin(face.getAttribute('skin'), face._headRoundness ?? 50, {
    color: face.getAttribute('color'), eyeColor: face.getAttribute('eye-color'), eyeStyle: face.getAttribute('eye-style'),
  });
  if (token !== v.token || !face.isConnected) return;
  const host = document.createElement('div');
  host.className = 'view-3d'; host.setAttribute('aria-hidden', 'true');
  v.host.replaceWith(host); v.host = host;
  v.avatar = createLayeredAvatar(host, captured, { size, sideColors: await wallColors(face), squash: 'settle' });
  v.avatar.setSquashGain(SQUASH_GAIN);
  v.avatar.setRoundEyes(() => (String(face.getAttribute('eye-style') || '').toLowerCase() === 'sharp' ? 0 : 4));
  v.key = key;
  face._motionHost = host;
  face.dataset.view = '3d';
  face._resumeFrames?.();
}

function leave3d(face) {
  const v = face._view3dState; if (!v) return;
  v.token = (v.token || 0) + 1;
  v.host.replaceChildren(); v.host.shadowRoot && (v.host.shadowRoot.innerHTML = '');
  v.avatar = null; v.key = '';
  face._view3d = false; face._motionHost = null;
  delete face.dataset.view;
}

BoopFace.prototype.setView = function(value = '2d') {
  this._viewWanted = String(value).toLowerCase() === '3d' ? '3d' : '2d';
  if (this.hasAttribute('view')) this.setAttribute('view', this._viewWanted);
  this._resumeFrames?.();
  return this;
};
Object.defineProperty(BoopFace.prototype, 'view', { get() { return wantedView(this); }, configurable: true });

registerAvatarExtension({
  name: 'view-3d',
  draw(now) {
    if (!this._viewObserver && typeof MutationObserver !== 'undefined') {
      this._viewObserver = new MutationObserver(() => this._resumeFrames?.());
      this._viewObserver.observe(this, { attributes: true, attributeFilter: ['view', 'skin', 'color', 'eye-color', 'eye-style', 'size'] });
    }
    if (wantedView(this) !== '3d') { if (this._view3d || this._view3dState?.avatar) leave3d(this); return; }
    this._view3d = true;
    const v = view3d(this), key = paintKey(this);
    if (key !== v.key && v.building !== key) {
      v.building = key;
      clearTimeout(v.timer);
      // Debounced: a slider dragging the roundness or the size rebuilds once it rests.
      v.timer = setTimeout(() => build(this, v, key).finally(() => { if (v.building === key) v.building = null; }), v.avatar ? 150 : 0);
    }
    if (!v.avatar) return;
    // Head turn: follows where the eyes look (the avatar's own look, which
    // already follows the pointer, wanders, or keeps still for an expression).
    const dt = Math.min(50, now - v.t); v.t = now;
    const look = this._look || { x: 0, y: 0 }, tx = look.x / 36, ty = look.y / 27, k = 1 - Math.exp(-dt / 200);
    v.pose.yaw += (tx * 18 - v.pose.yaw) * k; v.pose.pitch += (-ty * 18 * .65 - v.pose.pitch) * k;
    let p = { yaw: v.pose.yaw, pitch: v.pose.pitch, gazeX: 0, gazeY: 0 };
    p = newExpressionPose(this, p);
    v.avatar.syncEyes(this);
    v.avatar.setHeadMotion(headOf(this));
    const petted = petPose(this, p), body = bodyMotionPose(this, petted);
    // The body motion and petting turn the head even while an expression
    // holds the gaze still (that lock straightens the 3D turn otherwise).
    if (body !== p) {
      const lock = this._expressionLock, hc = this._headCenteringUntil;
      this._expressionLock = false; this._headCenteringUntil = 0;
      try { v.avatar.pose(body); } finally { this._expressionLock = lock; this._headCenteringUntil = hc; }
    } else v.avatar.pose(p);
  },
});
