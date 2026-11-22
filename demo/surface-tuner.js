// Self-contained on-page dark surface & panel layer tuner for BoopFace Studio v2.
const STORAGE_KEY = 'boopface:studio:v2-surface-tuner-v2';

const PRESETS = [
  { id: 'official', label: '官网纯黑', bg: '#000000', surface: '#0c0c0c', sub: '#141414', track: '#1a1a1a', chip: '#1e1e1e', active: '#2b2b2b', lineAlpha: 9 },
  { id: 'deep', label: '深灰层次', bg: '#080808', surface: '#121212', sub: '#1a1a1a', track: '#202020', chip: '#242424', active: '#2e2e2e', lineAlpha: 10 },
  { id: 'shadcn', label: 'Shadcn 灰', bg: '#0a0a0a', surface: '#171717', sub: '#1d1d1d', track: '#262626', chip: '#262626', active: '#323232', lineAlpha: 10 },
];

const DEFAULTS = { ...PRESETS[0] };

const LAYERS = [
  { key: 'bg', label: '页面背景' },
  { key: 'surface', label: '外层大面板' },
  { key: 'sub', label: '内部子面板' },
  { key: 'track', label: '分段轨道' },
  { key: 'chip', label: '按钮与输入' },
  { key: 'active', label: '选中态高亮' },
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, Math.round(n)));
const toHex2 = n => clamp(n, 0, 255).toString(16).padStart(2, '0');
const grayHex = v => `#${toHex2(v).repeat(3)}`;

function shiftHex(hex, delta) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  return `#${toHex2(((n >> 16) & 255) + delta)}${toHex2(((n >> 8) & 255) + delta)}${toHex2((n & 255) + delta)}`;
}

function hexGrayLevel(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return 16;
  const n = parseInt(m[1], 16);
  return clamp((((n >> 16) & 255) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000, 0, 64);
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (raw && typeof raw === 'object') return { ...DEFAULTS, ...raw };
  } catch {}
  return { ...DEFAULTS };
}

const state = loadState();
let collapsed = false;

const style = document.createElement('style');
style.textContent = `
#surfaceTuner {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 96;
  width: 288px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(14, 14, 14, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.72);
  color: #ededed;
  font: 11.5px/1.4 Inter, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  user-select: none;
  overflow: hidden;
}
#surfaceTuner[data-collapsed="true"] {
  width: auto;
  border-radius: 999px;
}
.st-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: move;
  touch-action: none;
}
#surfaceTuner[data-collapsed="true"] .st-head {
  border-bottom: 0;
  padding: 7px 11px;
  cursor: pointer;
}
.st-title { display: inline-flex; align-items: center; gap: 7px; font-weight: 600; color: #fff; }
.st-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  background: linear-gradient(135deg, var(--bg), var(--surface) 50%, var(--sub-surface));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
}
.st-toggle {
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  color: #cfcfcf;
  font-size: 11px;
}
.st-toggle:hover { background: rgba(255, 255, 255, 0.16); color: #fff; }
.st-body { display: grid; gap: 9px; padding: 10px 12px 12px; }
#surfaceTuner[data-collapsed="true"] .st-body { display: none; }
.st-presets { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
.st-presets button {
  padding: 5px 6px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  color: #a1a1a1;
  font-size: 11px;
}
.st-presets button:hover { background: rgba(255, 255, 255, 0.11); color: #fff; }
.st-presets button[aria-pressed="true"] {
  background: #e5e5e5;
  color: #111;
  font-weight: 600;
}
.st-rows { display: grid; gap: 6px; }
.st-row {
  display: grid;
  grid-template-columns: 76px 22px 1fr 56px;
  align-items: center;
  gap: 6px;
}
.st-row.is-alpha { grid-template-columns: 76px 1fr 56px; }
.st-row span { color: #b4b4b4; white-space: nowrap; }
.st-color {
  width: 22px;
  height: 20px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 5px;
  background: transparent;
  cursor: pointer;
}
.st-color::-webkit-color-swatch-wrapper { padding: 0; }
.st-color::-webkit-color-swatch { border: 0; border-radius: 4px; }
.st-range { width: 100%; margin: 0; accent-color: #d4d4d4; cursor: pointer; }
.st-val {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11px;
  color: #ededed;
  text-align: right;
  text-transform: uppercase;
}
.st-foot { display: grid; grid-template-columns: 1fr auto; gap: 6px; padding-top: 2px; }
.st-foot button {
  height: 28px;
  padding: 0 11px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.08);
  color: #ededed;
  font-size: 11.5px;
}
.st-foot button:hover { background: rgba(255, 255, 255, 0.16); color: #fff; }
.st-foot .st-copy { background: #e5e5e5; color: #111; font-weight: 600; }
.st-foot .st-copy:hover { background: #fff; color: #000; }
`;
document.head.appendChild(style);

const root = document.createElement('aside');
root.id = 'surfaceTuner';
root.setAttribute('aria-label', '底色与面板调参器');
root.dataset.collapsed = 'false';
root.innerHTML = `
  <div class="st-head" id="stDragHandle">
    <span class="st-title"><i class="st-dot" aria-hidden="true"></i>背景调参器</span>
    <button type="button" class="st-toggle" id="stToggleBtn">收起</button>
  </div>
  <div class="st-body">
    <div class="st-presets" id="stPresets"></div>
    <div class="st-rows" id="stRows"></div>
    <div class="st-foot">
      <button type="button" class="st-copy" id="stCopyBtn">复制 CSS 参数</button>
      <button type="button" id="stResetBtn">重置</button>
    </div>
  </div>
`;
document.body.appendChild(root);

const presetsEl = root.querySelector('#stPresets');
const rowsEl = root.querySelector('#stRows');
const toggleBtn = root.querySelector('#stToggleBtn');
const copyBtn = root.querySelector('#stCopyBtn');
const rowRefs = {};

for (const preset of PRESETS) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = preset.label;
  btn.dataset.preset = preset.id;
  btn.addEventListener('click', () => {
    Object.assign(state, preset);
    applyAndSync();
  });
  presetsEl.appendChild(btn);
}

for (const { key, label } of LAYERS) {
  const row = document.createElement('label');
  row.className = 'st-row';
  row.innerHTML = `
    <span>${label}</span>
    <input type="color" class="st-color" aria-label="${label}色值">
    <input type="range" class="st-range" min="0" max="64" step="1" aria-label="${label}亮度">
    <code class="st-val"></code>
  `;
  const [colorIn, rangeIn, valEl] = [row.querySelector('.st-color'), row.querySelector('.st-range'), row.querySelector('.st-val')];
  colorIn.addEventListener('input', () => {
    state[key] = colorIn.value.toLowerCase();
    applyAndSync();
  });
  rangeIn.addEventListener('input', () => {
    state[key] = grayHex(Number(rangeIn.value));
    applyAndSync();
  });
  rowRefs[key] = { colorIn, rangeIn, valEl };
  rowsEl.appendChild(row);
}

const alphaRow = document.createElement('label');
alphaRow.className = 'st-row is-alpha';
alphaRow.innerHTML = `
  <span>边框亮度</span>
  <input type="range" class="st-range" min="0" max="25" step="1" aria-label="边框亮度">
  <code class="st-val"></code>
`;
const alphaRange = alphaRow.querySelector('.st-range');
const alphaVal = alphaRow.querySelector('.st-val');
alphaRange.addEventListener('input', () => {
  state.lineAlpha = Number(alphaRange.value);
  applyAndSync();
});
rowsEl.appendChild(alphaRow);

function applyAndSync(persist = true) {
  const vars = document.documentElement.style;
  vars.setProperty('--bg', state.bg);
  vars.setProperty('--surface', state.surface);
  vars.setProperty('--surface-2', state.sub);
  vars.setProperty('--sub-surface', state.sub);
  vars.setProperty('--chip', state.chip);
  vars.setProperty('--seg-track', state.track);
  vars.setProperty('--chip-hover', shiftHex(state.chip, 10));
  vars.setProperty('--surface-tile', shiftHex(state.chip, -4));
  vars.setProperty('--seg-active', state.active);
  vars.setProperty('--chip-active', state.active);
  vars.setProperty('--line-alpha', (state.lineAlpha / 100).toFixed(3));

  for (const { key } of LAYERS) {
    const ref = rowRefs[key];
    ref.colorIn.value = state[key];
    ref.rangeIn.value = String(hexGrayLevel(state[key]));
    ref.valEl.textContent = state[key];
  }
  alphaRange.value = String(state.lineAlpha);
  alphaVal.textContent = `${state.lineAlpha}%`;

  presetsEl.querySelectorAll('button').forEach(btn => {
    const p = PRESETS.find(item => item.id === btn.dataset.preset);
    const match = Boolean(p && LAYERS.every(l => state[l.key] === p[l.key]) && state.lineAlpha === p.lineAlpha);
    btn.setAttribute('aria-pressed', String(match));
  });

  if (persist) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }
}

function setCollapsed(next) {
  collapsed = next;
  root.dataset.collapsed = String(collapsed);
  toggleBtn.textContent = collapsed ? '展开' : '收起';
  clampPosition();
}

toggleBtn.addEventListener('click', () => setCollapsed(!collapsed));
root.querySelector('#stDragHandle').addEventListener('click', e => {
  if (collapsed && !e.target.closest('button')) setCollapsed(false);
});

root.querySelector('#stResetBtn').addEventListener('click', () => {
  Object.assign(state, DEFAULTS);
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  applyAndSync(false);
});

copyBtn.addEventListener('click', async () => {
  const snippet = `:root {\n  --bg: ${state.bg};\n  --surface: ${state.surface};\n  --sub-surface: ${state.sub};\n  --seg-track: ${state.track};\n  --chip: ${state.chip};\n  --seg-active: ${state.active};\n  --line-alpha: ${(state.lineAlpha / 100).toFixed(3)};\n}`;
  try {
    await navigator.clipboard.writeText(snippet);
    copyBtn.textContent = '已复制';
    setTimeout(() => { copyBtn.textContent = '复制 CSS 参数'; }, 1400);
  } catch {
    copyBtn.textContent = '请手动复制';
    setTimeout(() => { copyBtn.textContent = '复制 CSS 参数'; }, 1400);
  }
});

// Pointer dragging on header
let drag = null;
function clampPosition() {
  if (!root.style.left) return;
  const r = root.getBoundingClientRect();
  root.style.left = `${clamp(parseFloat(root.style.left), 8, window.innerWidth - r.width - 8)}px`;
  root.style.top = `${clamp(parseFloat(root.style.top), 8, window.innerHeight - r.height - 8)}px`;
}

root.querySelector('#stDragHandle').addEventListener('pointerdown', e => {
  if (e.target.closest('button') || collapsed) return;
  const r = root.getBoundingClientRect();
  drag = { id: e.pointerId, startX: e.clientX, startY: e.clientY, left: r.left, top: r.top, w: r.width, h: r.height };
  root.style.left = `${r.left}px`;
  root.style.top = `${r.top}px`;
  root.style.bottom = 'auto';
  e.currentTarget.setPointerCapture(e.pointerId);
});
root.querySelector('#stDragHandle').addEventListener('pointermove', e => {
  if (!drag || e.pointerId !== drag.id) return;
  root.style.left = `${clamp(drag.left + e.clientX - drag.startX, 8, window.innerWidth - drag.w - 8)}px`;
  root.style.top = `${clamp(drag.top + e.clientY - drag.startY, 8, window.innerHeight - drag.h - 8)}px`;
});
root.querySelector('#stDragHandle').addEventListener('pointerup', () => { drag = null; });
root.querySelector('#stDragHandle').addEventListener('pointercancel', () => { drag = null; });
window.addEventListener('resize', clampPosition);

applyAndSync(false);
