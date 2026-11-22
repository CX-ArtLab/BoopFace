import { VERSION } from '../boopface.js';
import { createRoundnessFeedback } from './roundness-feedback.js';
import {
  featured,
  filters,
  publicSkins,
  skinById,
  applySkin,
  skinThumbnail,
} from './skin-catalog.js';

await customElements.whenDefined('boop-face');

const PALETTES = [
  { id: 'claude', bg: '#faf9f5', head: '#d97757', name: 'Claude' },
  { id: 'chatgpt', bg: '#ffffff', head: '#0fa578', name: 'ChatGPT' },
  { id: 'comfyui', bg: '#211927', head: '#f2ff59', name: 'ComfyUI' },
  { id: 'ubuntu', bg: '#e95420', head: '#ffffff', name: 'Ubuntu' },
  { id: 'dribbble', bg: '#ea4c89', head: '#ffffff', name: 'Dribbble' },
  { id: 'discord', bg: '#5865f2', head: '#ffffff', name: 'Discord' },
  { id: 'telegram', bg: '#229ed9', head: '#ffffff', name: 'Telegram' },
  { id: 'snapchat', bg: '#fffc00', head: '#000000', name: 'Snapchat' },
  { id: 'youtube', bg: '#ffffff', head: '#ff0000', name: 'YouTube' },
  { id: 'netflix', bg: '#141414', head: '#e50914', name: 'Netflix' },
  { id: 'spotify', bg: '#121212', head: '#1ed760', name: 'Spotify' },
  { id: 'lakers', bg: '#fdb927', head: '#552583', name: '湖人' },
  { id: 'warriors', bg: '#1d428a', head: '#ffc72c', name: '勇士' },
  { id: 'celtics', bg: '#007a33', head: '#ffffff', name: '凯尔特人' },
  { id: 'barca', bg: '#a50044', head: '#edbb00', name: '巴萨' },
  { id: 'mancity', bg: '#6cabdd', head: '#1c2c5b', name: '曼城' },
];

const OFFICIAL_BOTS = [
  {
    name: '当前角色', custom: true, skin: null, round: 50,
    turns: [
      { ask: '帮我看看现在的样式效果怎么样？', reply: '已经套用你当前调试的外观与动作，去右栏切换外观或皮肤，这里会实时同步。', result: 'success' },
    ],
  },
  {
    name: '报告助手', skin: null, round: 50,
    turns: [
      { ask: '帮我把这份季度报告总结成三点', reply: '好了，三个要点：营收增长 18%，新用户主要来自海外，客服响应时间缩短一半。', result: 'success' },
      { ask: '谢谢你，帮了大忙！', reply: '不客气，随时叫我。', result: 'love' },
    ],
    bgTasks: [
      { mode: 'waiting', variant: 'wave', tone: 'working', text: '正在汇总季度数据…' },
      { mode: 'play', action: 'inspect', tone: 'working', text: '正在核对财务口径…' },
      { mode: 'play', action: 'success', tone: 'done', text: '季度摘要已更新' },
      { mode: 'idle' },
    ],
  },
  {
    name: '数据管家', skin: '102', round: 50,
    turns: [
      { ask: '把旧的用户数据表删掉', reply: '这会永久删除 3 张表，共 12 万条记录。确定要删除吗？', result: 'wary' },
      { ask: '先不删了，帮我导出一份备份', reply: '备份好了，放在共享盘的“数据备份”文件夹里。', result: 'success' },
    ],
    bgTasks: [
      { mode: 'waiting', variant: 'spin', tone: 'working', text: '正在扫描冗余数据表…' },
      { mode: 'play', action: 'wary', tone: 'warn', text: '警告：发现 3 张待删旧表' },
      { mode: 'play', action: 'failure', tone: 'error', text: '备份校验异常，待处理' },
      { mode: 'idle' },
    ],
  },
  {
    name: '运维值班', skin: '403', round: 50,
    turns: [
      { ask: '连接一下公司的数据库', reply: '连接失败了：数据库没有响应。请检查网络后再试一次。', result: 'failure' },
      { ask: '网络恢复了，再试一次', reply: '连上了，数据库运行正常。', result: 'success' },
    ],
    bgTasks: [
      { mode: 'play', action: 'inspect', tone: 'working', text: '正在巡检主库节点…' },
      { mode: 'play', action: 'angry', tone: 'error', text: '告警：数据库响应超时' },
      { mode: 'waiting', variant: 'wrap', tone: 'working', text: '正在自动切换备库…' },
      { mode: 'play', action: 'success', tone: 'done', text: '服务已恢复正常' },
    ],
  },
  {
    name: '营养师', skin: '1506', round: 100,
    turns: [
      { ask: '今天还能再喝一杯奶茶吗？', reply: '今天的糖已经超了 12 克，这杯建议换成无糖的。', result: 'wary' },
      { ask: '好吧，那来杯柠檬水呢？', reply: '可以，少放点糖，清爽又解暑。', result: 'love' },
    ],
    bgTasks: [
      { mode: 'waiting', variant: 'wave', tone: 'working', text: '正在核算今日摄入…' },
      { mode: 'play', action: 'wary', tone: 'warn', text: '提醒：今日糖分偏高' },
      { mode: 'play', action: 'love', tone: 'done', text: '已推荐低糖替代方案' },
      { mode: 'idle' },
    ],
  },
  {
    name: '室内设计师', skin: '1102', round: 50,
    turns: [
      { ask: '书房想换成木质风格，预算够吗？', reply: '够的，整面橡木书架大约 2 万元。', result: 'success' },
      { ask: '就按这个方案做！', reply: '好，明天把效果图发给你。', result: 'love' },
    ],
    bgTasks: [
      { mode: 'waiting', variant: 'wrap', tone: 'working', text: '正在渲染书房方案…' },
      { mode: 'play', action: 'surprise', tone: 'working', text: '发现更优橡木配色' },
      { mode: 'play', action: 'success', tone: 'done', text: '效果图已生成' },
      { mode: 'idle' },
    ],
  },
  {
    name: '旅行规划', skin: '705', round: 50,
    turns: [
      { ask: '订下周五去大阪的机票', reply: '这趟要 3800 元，比平时贵两成。要现在下单吗？', result: 'wary' },
      { ask: '那改到周六', reply: '周六只要 2100 元，已经帮你订好了。', result: 'success' },
    ],
    bgTasks: [
      { mode: 'waiting', variant: 'spin', tone: 'working', text: '正在搜索大阪机票…' },
      { mode: 'waiting', variant: 'wave', tone: 'working', text: '正在规划 5 日路程…' },
      { mode: 'play', action: 'wary', tone: 'warn', text: '提醒：周六余票紧张' },
      { mode: 'play', action: 'success', tone: 'done', text: '行程方案已备好' },
    ],
  },
];

const CHAT_REPLIES = [
  { result: 'success', status: 'done', label: '已完成', text: '任务已完成，当前表情与材质都在实时同步。' },
  { result: 'wary', status: 'asking', label: '待确认', text: '这一步操作会修改配置，请确认是否继续？' },
  { result: 'inspect', status: 'thinking', label: '核对中', text: '正在核对参数与渲染状态，目前一切正常。' },
  { result: 'surprise', status: 'done', label: '有新发现', text: '捕捉到一个意外输入！不过状态已安全接管。' },
  { result: 'refuse', status: 'failed', label: '已拒绝', text: '这个测试请求超出演示范围，我先礼貌拒绝。' },
];

const DONE_STATUS = {
  success: ['done', '已完成'],
  wary: ['asking', '待确认'],
  failure: ['failed', '失败'],
  love: ['done', '已收到'],
  inspect: ['thinking', '核对中'],
  surprise: ['done', '有新发现'],
  refuse: ['failed', '已拒绝'],
};

const HEAD_PARTS = ['head', 'leftTop', 'rightTop', 'leftBottom', 'rightBottom', 'antennaDot'];
const EYE_PARTS = ['leftBase', 'rightBase', 'leftInputBase', 'rightInputBase'];
const DEFAULT_FLAT = { bg: '#141416', head: '#ededed', eyeThrough: true };
const SAVED_PALETTES_KEY = 'boopface:studio:saved-palettes';
const SAVED_SKINS_KEY = 'boopface:studio:saved-skins';
const SLOTS_STORAGE_KEY = 'boopface:studio:color-slots';
const SEEN_NEW_ACTIONS_KEY = 'boopface:studio:seen-new-actions';
const MAX_SAVED_PALETTES = 9;
const DEFAULT_BW_PRESETS = [
  { id: 'bw-dark', name: '经典黑白', bg: '#141416', head: '#ededed', fixed: true },
  { id: 'bw-light', name: '白黑反色', bg: '#f4f5f7', head: '#08090b', fixed: true },
];
const LOCKED_DOTS = {
  head: ['#ededed', '#141416'],
  bg: ['#141416', '#f4f5f7'],
};
const DEFAULT_SLOTS = {
  head: ['#d97757', '#f59e0b', '#10b981', '#06b6d4', '#38bdf8', '#a855f7', '#f43f5e'],
  bg: ['#000000', '#0f172a', '#1e1b2e', '#14261c', '#2a1815', '#faf9f5', '#f5e6d3'],
};
const CP_QUICK_COLORS = ['#3478f6', '#9b7bf7', '#ea6aa8', '#e65555', '#ea8b42', '#e5b93c', '#66aa58', '#16a085'];
const CP_MODES = ['hex', 'rgb', 'hsl'];
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const THINK_STYLES = {
  bloom: { label: '绽放', runtime: 'waiting-wrap' },
  spin: { label: '旋转', runtime: 'waiting-spin' },
  wrap: { label: '滚动', runtime: 'waiting-wrap' },
  wave: { label: '波动', runtime: 'waiting-wave' },
};

const CHAT_SCALE = {
  '100': { sideFace: 40, inlineFace: 44, headerFace: 36, railW: 74, defaultSideW: 208, minSideW: 168, maxSideW: 280, snapW: 132 },
  '125': { sideFace: 50, inlineFace: 54, headerFace: 44, railW: 88, defaultSideW: 236, minSideW: 192, maxSideW: 310, snapW: 150 },
  '150': { sideFace: 60, inlineFace: 66, headerFace: 52, railW: 98, defaultSideW: 256, minSideW: 210, maxSideW: 340, snapW: 166 },
};

const state = {
  scene: 'stage',
  backdrop: 'dark',
  size: 168,
  exportSize: '512',
  exportAlpha: true,
  surface: 'skin',
  dimension: '2d',
  skinId: '101',
  lightFollow: true,
  groundShadow: true,
  flatBg: DEFAULT_FLAT.bg,
  flatHead: DEFAULT_FLAT.head,
  eyeThrough: true,
  headSlots: [...DEFAULT_SLOTS.head],
  bgSlots: [...DEFAULT_SLOTS.bg],
  activeSlot: { head: null, bg: null },
  roundness: 50,
  antenna: true,
  pointerFollow: true,
  pressSqueeze: true,
  antennaDrag: true,
  autoSleep: '0',
  wakeOn: 'activity',
  motion: 'auto',
  loop: false,
  action: 'idle',
  dockTab: 'expressions',
  voiceSuite: 'standard',
  voiceStage: null,
  voiceThinkStyle: 'bloom',
  voiceMuted: false,
  voiceDemoPlaying: false,
  skinCategory: 'featured',
  skinQuery: '',
  inspectorTab: 'look',
  devTab: 'html',
  chatLook: 'dark',
  chatAvatarPos: 'inline',
  chatExpanded: false,
  chatZoom: '125',
  chatRail: false,
  activeBotIndex: 0,
  eventTotal: 0,
};

const $ = id => document.getElementById(id);
const app = $('app');
const stageCard = $('stageCard');
const stageFace = $('stageFace');
const skinGrid = $('skinGrid');
const devCode = $('devCode');
const devEvents = $('devEvents');
const lookPreviewStage = $('lookPreviewStage');
const lookPreviewFace = $('lookPreviewFace');
const skinPreviewStage = $('skinPreviewStage');
const skinPreviewFace = $('skinPreviewFace');
const squarePreview = $('shapePreviewSquare');
const roundPreview = $('shapePreviewRound');
squarePreview.setHeadRoundness(0);
roundPreview.setHeadRoundness(100);
squarePreview.setPointerFollow(false);
roundPreview.setPointerFollow(false);
const roundnessFeedback = createRoundnessFeedback($('roundnessSlider').closest('.shape-slider-row'), () => state.voiceMuted);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
  if (stageFace._isReducedMotion()) roundnessFeedback.cancelMotion();
});

let stageMaterial = null;
let lookPreviewMaterial = null;
let skinPreviewMaterial = null;
let talkBotMaterials = new WeakMap();
let activeTalkFace = null;
let studioRowFace = null;
let lastNonCodeTab = 'look';
let loopToken = 0;
let voiceDemoToken = 0;
let bgTaskTimer = 0;
let chatBusy = false;
let chatSideScaleRatio = 1;

$('versionBadge').textContent = `v${VERSION}`;
$('skinTotalCount').textContent = String(publicSkins.length);

function copyText(text, targetBtn) {
  navigator.clipboard?.writeText(text).catch(() => {});
  if (!targetBtn) return;
  targetBtn.dataset.copied = 'true';
  clearTimeout(targetBtn._copyTimer);
  targetBtn._copyTimer = setTimeout(() => delete targetBtn.dataset.copied, 1300);
}

function effectiveBgColor() {
  if (state.backdrop === 'light') return '#e6e8ec';
  if (state.backdrop === 'custom') return state.flatBg;
  return '#18181b';
}

function syncFaceGeometry(face, customRound = state.roundness) {
  face.setHeadRoundness(customRound);
  face.setPointerFollow(state.pointerFollow);
  face.setPressSqueeze(state.pressSqueeze);
  face.setAntennaDrag(state.antennaDrag);
  face.setAttribute('auto-sleep', state.autoSleep);
  face.setAttribute('wake-on', state.wakeOn);
  face.setAttribute('motion', state.motion);
  const dot = face.shadowRoot?.getElementById('antennaDot');
  if (dot) dot.style.display = state.antenna ? '' : 'none';
}

function paintCustomFace(face, { isStage = false, bot = null } = {}) {
  if (bot && !bot.custom) {
    face.setHeadRoundness(bot.round ?? 50);
    if (bot.skin) {
      face.setAttribute('skin', bot.skin);
      applySkin(face, bot.skin);
    } else {
      face.removeAttribute('skin');
      face.removeAttribute('data-custom-color');
      face.setSkin(null);
    }
    return;
  }

  if (isStage) stageMaterial?.dispose();
  else talkBotMaterials.get(face)?.dispose();

  if (state.surface === 'skin') {
    face.removeAttribute('data-custom-color');
    face.setAttribute('skin', state.skinId);
    const ctrl = applySkin(face, state.skinId, { groundShadow: isStage && state.groundShadow });
    if (isStage) stageMaterial = ctrl;
    else talkBotMaterials.set(face, ctrl);
  } else {
    if (isStage) stageMaterial = null;
    else talkBotMaterials.delete(face);
    face.removeAttribute('skin');
    face.setAttribute('data-custom-color', 'true');
    face.setSkin(null);
    face.setAttribute('color', state.flatHead);
    const root = face.shadowRoot;
    if (root) {
      HEAD_PARTS.forEach(id => root.getElementById(id)?.setAttribute('fill', state.flatHead));
      const eyeColor = state.eyeThrough ? (isStage ? effectiveBgColor() : (state.chatLook === 'dark' ? '#1f1f21' : '#e8e9ec')) : '#ffffff';
      EYE_PARTS.forEach(id => root.getElementById(id)?.setAttribute('fill', eyeColor));
    }
  }
  syncFaceGeometry(face, state.roundness);
}

function syncStageMinHeight() {
  const minH = state.scene === 'chat' ? 260 : Math.round(state.size / 0.6);
  app.style.setProperty('--stage-min-h', `${minH}px`);
}

function syncLookPreviewFace() {
  if (!lookPreviewFace || !lookPreviewStage) return;
  lookPreviewMaterial?.dispose();
  if (state.surface === 'skin') {
    lookPreviewFace.removeAttribute('data-custom-color');
    lookPreviewFace.setAttribute('skin', state.skinId);
    lookPreviewMaterial = applySkin(lookPreviewFace, state.skinId, { groundShadow: false });
    const stageBg = state.backdrop === 'light' ? '#e6e8ec' : '#141416';
    lookPreviewStage.style.setProperty('--live-bg', stageBg);
  } else {
    lookPreviewMaterial = null;
    lookPreviewFace.removeAttribute('skin');
    lookPreviewFace.setAttribute('data-custom-color', 'true');
    lookPreviewFace.setSkin(null);
    lookPreviewFace.setAttribute('color', state.flatHead);
    lookPreviewStage.style.setProperty('--live-bg', state.flatBg);
    const root = lookPreviewFace.shadowRoot;
    if (root) {
      HEAD_PARTS.forEach(id => root.getElementById(id)?.setAttribute('fill', state.flatHead));
      const eyeColor = state.eyeThrough ? state.flatBg : '#ffffff';
      EYE_PARTS.forEach(id => root.getElementById(id)?.setAttribute('fill', eyeColor));
    }
  }
  syncFaceGeometry(lookPreviewFace, state.roundness);
}

function syncSkinPreviewFace() {
  if (!skinPreviewFace || !skinPreviewStage) return;
  skinPreviewMaterial?.dispose();
  skinPreviewFace.removeAttribute('data-custom-color');
  skinPreviewFace.setAttribute('skin', state.skinId);
  skinPreviewMaterial = applySkin(skinPreviewFace, state.skinId, { groundShadow: false });
  const stageBg = state.backdrop === 'light' ? '#e6e8ec' : '#141416';
  skinPreviewStage.style.setProperty('--live-bg', stageBg);
  syncFaceGeometry(skinPreviewFace, state.roundness);
}

function syncAllFaces() {
  roundnessFeedback.stop();
  syncStageMinHeight();
  stageFace.setAttribute('size', String(state.size));
  paintCustomFace(stageFace, { isStage: true });
  syncLookPreviewFace();
  syncSkinPreviewFace();
  if (studioRowFace) paintCustomFace(studioRowFace);
  if (state.activeBotIndex === 0 && activeTalkFace) paintCustomFace(activeTalkFace);
  updateUI();
  updateDevCode();
}

function updateSizeReadouts() {
  $('sizeTrigger').title = `缩放尺寸（当前 ${state.size}px）`;
  $('sizePopoverVal').textContent = `${state.size}px`;
  $('sizeSlider').value = String(state.size);
  document.querySelectorAll('[data-size-stop]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(Number(btn.dataset.sizeStop) === state.size));
  });
}

function updateUI() {
  const skin = skinById.get(state.skinId);
  const isSkin = state.surface === 'skin';

  document.querySelectorAll('[data-surface-btn]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.surfaceBtn === state.surface));
  });
  document.querySelectorAll('[data-dimension-btn]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.dimensionBtn === state.dimension));
  });

  const previewHexBtn = $('lookPreviewHex');
  if (!previewHexBtn.dataset.copied) {
    previewHexBtn.textContent = isSkin && skin ? `#${skin.id}` : state.flatHead.toUpperCase();
  }
  previewHexBtn.title = isSkin && skin ? `${skin.label} · 点击复制 skin="${skin.id}"` : '点击复制头部色号';

  const skinCodeBtn = $('skinPreviewCode');
  if (!skinCodeBtn.dataset.copied) {
    skinCodeBtn.textContent = `#${state.skinId}`;
  }
  skinCodeBtn.title = skin ? `${skin.label} · 点击复制 skin="${skin.id}"` : `点击复制 skin="${state.skinId}"`;
  syncSaveSkinBtn();

  if (state.activeBotIndex === 0) {
    $('talkHeadBadge').textContent = isSkin ? `皮肤 #${state.skinId}` : `纯色 ${state.flatHead}`;
  }

  document.querySelectorAll('[data-backdrop-btn]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.backdropBtn === state.backdrop));
  });

  if (state.backdrop === 'skin' && skin?.stage) stageCard.style.setProperty('--skin-stage-bg', skin.stage);
  if (state.backdrop === 'custom') stageCard.style.setProperty('--custom-stage-bg', state.flatBg);
  stageCard.dataset.backdrop = state.backdrop;
  const isLightStage = state.backdrop === 'light' || (state.backdrop === 'skin' && !['1008', '1606', '1702'].includes(state.skinId));
  stageCard.classList.toggle('is-light-bg', isLightStage);

  updateSizeReadouts();
  syncRoundnessControl();
  $('customBgDot').style.setProperty('--cur-color', state.flatBg);
  $('customHeadDot').style.setProperty('--cur-color', state.flatHead);
  $('eyeThroughToggle').checked = state.eyeThrough;
  syncColorDotSelections();
  syncPaletteSelections();
  syncSavePaletteBtn();
}

/* Scene Switch (Solo Stage vs Official Sidebar Chat) */
function effectiveChatZoom() {
  return state.chatExpanded ? state.chatZoom : '100';
}

function currentChatScale() {
  return CHAT_SCALE[effectiveChatZoom()] || CHAT_SCALE['100'];
}

function applyChatSidebarWidth(explicitPx = null) {
  const talkWin = $('talkWindow');
  const scale = currentChatScale();
  talkWin.classList.toggle('is-rail', state.chatRail);
  if (state.chatRail) {
    talkWin.style.setProperty('--talk-side-w', `${scale.railW}px`);
    return;
  }
  const target = explicitPx ?? Math.round(scale.defaultSideW * chatSideScaleRatio);
  const clamped = Math.round(Math.max(scale.minSideW, Math.min(scale.maxSideW, target)));
  chatSideScaleRatio = clamped / scale.defaultSideW;
  talkWin.style.setProperty('--talk-side-w', `${clamped}px`);
}

function syncChatScale() {
  const zoom = effectiveChatZoom();
  const scale = currentChatScale();
  const talkWin = $('talkWindow');
  talkWin.dataset.zoom = zoom;

  botRowEls.forEach(row => row.face.setAttribute('size', String(scale.sideFace)));
  if (activeTalkFace) {
    const size = state.chatAvatarPos === 'header' ? scale.headerFace : scale.inlineFace;
    activeTalkFace.setAttribute('size', String(size));
  }
  applyChatSidebarWidth();

  document.querySelectorAll('[data-chat-zoom]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.chatZoom === state.chatZoom));
  });
}

function setChatExpanded(expanded) {
  state.chatExpanded = Boolean(expanded && state.scene === 'chat');
  app.classList.toggle('is-chat-expanded', state.chatExpanded);
  document.body.classList.toggle('has-chat-modal', state.chatExpanded);
  $('chatModalBackdrop').hidden = !state.chatExpanded;
  $('chatZoomGroup').hidden = !state.chatExpanded;

  const btn = $('chatExpandBtn');
  btn.setAttribute('aria-pressed', String(state.chatExpanded));
  btn.title = state.chatExpanded ? '退出放大对话（Esc）' : '放大对话窗口';
  btn.querySelector('.icon-expand').hidden = state.chatExpanded;
  btn.querySelector('.icon-collapse').hidden = !state.chatExpanded;
  $('chatExpandLabel').textContent = state.chatExpanded ? '收起' : '放大';
  syncChatScale();
}

function setScene(scene) {
  state.scene = scene;
  if (scene !== 'chat') {
    setChatExpanded(false);
    stopBackgroundBots();
  }
  syncStageMinHeight();
  stageCard.dataset.scene = scene;
  $('soloStageView').hidden = scene !== 'stage';
  $('chatSceneView').hidden = scene !== 'chat';
  $('stageToolsSolo').hidden = scene !== 'stage';
  $('stageToolsChat').hidden = scene !== 'chat';
  document.querySelectorAll('[data-scene-tab]').forEach(btn => {
    btn.setAttribute('aria-selected', String(btn.dataset.sceneTab === scene));
  });
  closePopovers();
  if (scene === 'chat') {
    if (studioRowFace) paintCustomFace(studioRowFace);
    if (state.activeBotIndex === 0 && activeTalkFace) paintCustomFace(activeTalkFace);
    startBackgroundBots();
  }
}
$('chatExpandBtn').addEventListener('click', () => setChatExpanded(!state.chatExpanded));
$('chatModalBackdrop').addEventListener('click', () => setChatExpanded(false));
document.querySelectorAll('[data-chat-zoom]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.chatZoom = btn.dataset.chatZoom;
    syncChatScale();
  });
});
document.querySelectorAll('[data-scene-tab]').forEach(btn => {
  btn.addEventListener('click', () => setScene(btn.dataset.sceneTab));
});
stageFace.addEventListener('dblclick', () => setScene('chat'));

/* Popovers & Topbar */
function closePopovers() {
  $('langPopover').hidden = true;
  $('langToggle').setAttribute('aria-expanded', 'false');
  $('sizePopover').hidden = true;
  $('sizeTrigger').setAttribute('aria-expanded', 'false');
  $('exportPopover').hidden = true;
  $('exportTrigger').setAttribute('aria-expanded', 'false');
  $('voiceThinkPopover').hidden = true;
  $('voiceThinkMenuBtn').setAttribute('aria-expanded', 'false');
  if (typeof closeColorPopover === 'function') closeColorPopover();
  if ($('skinSearchRow') && !$('skinSearchRow').hidden && !state.skinQuery.trim()) {
    setSkinSearchOpen(false);
  }
}

$('langToggle').addEventListener('click', e => {
  e.stopPropagation();
  const next = $('langPopover').hidden;
  closePopovers();
  $('langPopover').hidden = !next;
  $('langToggle').setAttribute('aria-expanded', String(next));
});
$('langPopover').addEventListener('click', e => {
  const btn = e.target.closest('[data-lang]');
  if (!btn) return;
  document.documentElement.lang = btn.dataset.lang;
  $('langToggle').title = `语言：${btn.textContent}`;
  $('langPopover').querySelectorAll('[data-lang]').forEach(el => el.setAttribute('aria-checked', String(el === btn)));
  closePopovers();
});

$('sizeTrigger').addEventListener('click', e => {
  e.stopPropagation();
  const next = $('sizePopover').hidden;
  closePopovers();
  $('sizePopover').hidden = !next;
  $('sizeTrigger').setAttribute('aria-expanded', String(next));
});
$('sizePopover').addEventListener('click', e => e.stopPropagation());
$('sizeSlider').addEventListener('input', e => {
  state.size = Number(e.target.value);
  syncAllFaces();
});
document.querySelectorAll('[data-size-stop]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.size = Number(btn.dataset.sizeStop);
    syncAllFaces();
  });
});

function resolvedExportSize() {
  return state.exportSize === 'current' ? state.size : Number(state.exportSize);
}
function updateExportUI() {
  const px = resolvedExportSize();
  $('exportResHint').textContent = `${px} × ${px}`;
  document.querySelectorAll('[data-export-size]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(btn.dataset.exportSize === state.exportSize));
  });
}
function exportBackdropColor() {
  if (state.backdrop === 'light') return '#e6e8ec';
  if (state.backdrop === 'custom') return state.flatBg;
  if (state.backdrop === 'skin') {
    const raw = skinById.get(state.skinId)?.stage || '';
    return raw.replace(/rgba\(0,\s*0,\s*0,\s*0\)/g, '').match(/(?:rgba?|hsla?)\([^)]+\)|#[0-9a-f]{3,8}/i)?.[0] || '#f4f5f6';
  }
  return '#141416';
}
async function exportAvatarImage(fmt) {
  const svgNode = stageFace.shadowRoot?.querySelector('svg');
  if (!svgNode) return;
  const px = resolvedExportSize();
  const clone = svgNode.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(px));
  clone.setAttribute('height', String(px));
  for (const prop of stageFace.style) {
    if (prop.startsWith('--')) clone.style.setProperty(prop, stageFace.style.getPropertyValue(prop));
  }
  const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  styleEl.textContent = [...stageFace.shadowRoot.querySelectorAll('style')].map(s => s.textContent).join('\n');
  clone.prepend(styleEl);

  const svgText = new XMLSerializer().serializeToString(clone);
  const svgUrl = URL.createObjectURL(new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' }));
  const statusEl = $('exportStatus');
  try {
    const img = new Image();
    img.src = svgUrl;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext('2d');
    if (fmt === 'jpeg' || !state.exportAlpha) {
      ctx.fillStyle = exportBackdropColor();
      ctx.fillRect(0, 0, px, px);
    }
    ctx.drawImage(img, 0, 0, px, px);
    const mime = fmt === 'jpeg' ? 'image/jpeg' : 'image/png';
    const ext = fmt === 'jpeg' ? 'jpg' : 'png';
    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Canvas export failed'))), mime, 0.94);
    });
    const outUrl = URL.createObjectURL(blob);
    const nameId = state.surface === 'skin' ? state.skinId : state.flatHead.replace('#', '');
    const fileName = `boopface-${nameId}-${px}.${ext}`;
    const link = Object.assign(document.createElement('a'), { href: outUrl, download: fileName });
    link.click();
    setTimeout(() => URL.revokeObjectURL(outUrl), 1000);
    statusEl.textContent = `已导出 ${fileName}`;
    statusEl.classList.add('is-ok');
  } catch (err) {
    statusEl.textContent = '导出失败，请重试';
    statusEl.classList.remove('is-ok');
    console.error(err);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

$('exportTrigger').addEventListener('click', e => {
  e.stopPropagation();
  const next = $('exportPopover').hidden;
  closePopovers();
  $('exportPopover').hidden = !next;
  $('exportTrigger').setAttribute('aria-expanded', String(next));
  if (next) {
    updateExportUI();
    $('exportStatus').textContent = '导出当前皮肤、圆度与瞬时表情';
    $('exportStatus').classList.remove('is-ok');
  }
});
$('exportPopover').addEventListener('click', e => e.stopPropagation());
document.querySelectorAll('[data-export-size]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.exportSize = btn.dataset.exportSize;
    updateExportUI();
  });
});
$('exportTransparentToggle').addEventListener('change', e => {
  state.exportAlpha = e.target.checked;
});
document.querySelectorAll('[data-export-fmt]').forEach(btn => {
  btn.addEventListener('click', () => exportAvatarImage(btn.dataset.exportFmt));
});

document.addEventListener('click', closePopovers);

/* Stage Toolbar & Look Preview Chip */
$('lookPreviewHex').addEventListener('click', () => {
  const btn = $('lookPreviewHex');
  const val = state.surface === 'skin' ? `skin="${state.skinId}"` : state.flatHead.toUpperCase();
  copyText(val, btn);
  btn.textContent = '已复制';
  clearTimeout(btn._hexTxtTimer);
  btn._hexTxtTimer = setTimeout(() => updateUI(), 1000);
});
document.querySelectorAll('[data-surface-btn]').forEach(btn => {
  btn.addEventListener('click', () => setSurfaceMode(btn.dataset.surfaceBtn));
});
document.querySelectorAll('[data-dimension-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.dimension = btn.dataset.dimensionBtn;
    updateUI();
  });
});
document.querySelectorAll('[data-backdrop-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.backdrop = btn.dataset.backdropBtn;
    syncAllFaces();
  });
});
$('stageResetBtn').addEventListener('click', () => {
  stopVoiceDemo(false);
  setVoiceStage(null, { play: false });
  Object.assign(state, {
    backdrop: 'dark', size: 168, surface: 'skin', dimension: '2d', skinId: '101',
    roundness: 50, antenna: true, pointerFollow: true,
    pressSqueeze: true, antennaDrag: true, autoSleep: '0', wakeOn: 'activity', motion: 'auto',
    flatBg: DEFAULT_FLAT.bg, flatHead: DEFAULT_FLAT.head, eyeThrough: true,
    activeSlot: { head: null, bg: null },
  });
  $('antennaToggle').checked = true;
  $('pointerFollowToggle').checked = true;
  $('pressSqueezeToggle').checked = true;
  $('antennaDragToggle').checked = true;
  renderSkinGrid();
  syncAllFaces();
  playAction('idle');
});

/* Stage Pointer Light */
const stageCanvas = $('stageCanvas');
stageCanvas.addEventListener('pointermove', e => {
  if (!state.lightFollow || !stageMaterial || state.scene !== 'stage') return;
  const r = stageCanvas.getBoundingClientRect();
  stageMaterial.light(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
});
stageCanvas.addEventListener('pointerleave', () => stageMaterial?.light(-0.5, -0.5));

/* Actions Dock & Voice Suite */
function activeAvatarFace() {
  return state.scene === 'chat' && activeTalkFace ? activeTalkFace : stageFace;
}

function formatApiCall(action) {
  if (state.dockTab === 'voice' && state.voiceStage) {
    if (state.voiceStage === 'thinking') {
      return `avatar.playVoice('thinking', { style: '${state.voiceThinkStyle}' })`;
    }
    return `avatar.playVoice('${state.voiceStage}')`;
  }
  if (action.startsWith('waiting-') && state.loop) {
    return `avatar.startWaiting({ variant: '${action.replace('waiting-', '')}' })`;
  }
  return `avatar.play('${action}')`;
}

let seenNewActions = new Set();

function loadSeenNewActions() {
  try {
    const raw = JSON.parse(localStorage.getItem(SEEN_NEW_ACTIONS_KEY) || 'null');
    if (Array.isArray(raw)) return new Set(raw.map(String));
  } catch {}
  return new Set();
}

function syncNewActionBadges() {
  document.querySelectorAll('#actionGroups button[data-action][data-new]').forEach(btn => {
    if (seenNewActions.has(btn.dataset.action)) btn.removeAttribute('data-new');
  });
}

function markActionSeen(action) {
  const btn = document.querySelector(`#actionGroups button[data-action="${CSS.escape(action)}"][data-new="true"]`);
  if (!btn) return;
  btn.removeAttribute('data-new');
  seenNewActions.add(action);
  try { localStorage.setItem(SEEN_NEW_ACTIONS_KEY, JSON.stringify([...seenNewActions])); } catch {}
}

async function playAction(action) {
  stopVoiceDemo(false);
  state.action = action;
  markActionSeen(action);
  const token = ++loopToken;
  document.querySelectorAll('#actionGroups button[data-action]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.action === action);
  });
  updateDevCode();

  const targetFace = activeAvatarFace();
  const runtimeAction = action === 'waiting-bloom' ? 'waiting-wrap' : action;
  if (state.loop && runtimeAction.startsWith('waiting-')) {
    await targetFace.startWaiting({ variant: runtimeAction.replace('waiting-', '') });
    return;
  }
  do {
    if (token !== loopToken) return;
    if (runtimeAction === 'wake' && !targetFace._sleeping) {
      await targetFace.play('sleep');
      if (token !== loopToken) return;
    }
    await targetFace.play(runtimeAction);
    if (!state.loop || token !== loopToken) return;
    await new Promise(r => setTimeout(r, 420));
  } while (state.loop && token === loopToken && state.action === action);
}

$('actionGroups').addEventListener('click', e => {
  const btn = e.target.closest('button[data-action]');
  if (btn) playAction(btn.dataset.action);
});
$('loopToggle').addEventListener('change', e => {
  state.loop = e.target.checked;
  if (!state.loop) {
    loopToken++;
    stageFace.stopWaiting?.();
    activeTalkFace?.stopWaiting?.();
  } else if (state.action.startsWith('waiting-')) {
    playAction(state.action);
  }
  updateDevCode();
});
$('randomActionBtn').addEventListener('click', () => {
  const btns = [...document.querySelectorAll('#actionGroups button[data-action]')];
  const pick = btns[Math.floor(Math.random() * btns.length)];
  if (pick) playAction(pick.dataset.action);
});

const VOICE_STAGE_INFO = {
  listening: '正在聆听',
  speaking: '正在说话',
  ready: '待机就绪',
};

function setTabPanelHidden(el, hidden) {
  el.classList.toggle('is-tab-hidden', hidden);
  el.setAttribute('aria-hidden', String(hidden));
  el.inert = hidden;
}

function setDockTab(tab) {
  state.dockTab = tab;
  const isVoice = tab === 'voice';
  $('actionDock').dataset.activeTab = tab;
  document.querySelectorAll('[data-dock-tab]').forEach(btn => {
    btn.setAttribute('aria-selected', String(btn.dataset.dockTab === tab));
  });
  setTabPanelHidden($('actionGroups'), isVoice);
  setTabPanelHidden($('dockToolsExpr'), isVoice);
  setTabPanelHidden($('voiceSuitePanel'), !isVoice);
  setTabPanelHidden($('dockToolsVoice'), !isVoice);
  $('voiceThinkPopover').hidden = true;
  $('voiceThinkMenuBtn').setAttribute('aria-expanded', 'false');
  if (!isVoice) {
    stopVoiceDemo(false);
  }
  updateDevCode();
}

function setVoiceStage(stage, { play = true } = {}) {
  state.voiceStage = stage;
  document.querySelectorAll('.voice-stage-btn[data-voice-stage]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.voiceStage === stage);
  });

  const dot = $('voiceLiveDot');
  dot.classList.remove('is-active', 'is-thinking');
  const thinkStyle = THINK_STYLES[state.voiceThinkStyle] || THINK_STYLES.bloom;

  if (stage === 'thinking') {
    dot.classList.add('is-thinking');
    $('voiceLiveLabel').textContent = `思考 · ${thinkStyle.label}`;
  } else if (stage === 'listening' || stage === 'speaking') {
    dot.classList.add('is-active');
    $('voiceLiveLabel').textContent = VOICE_STAGE_INFO[stage];
  } else {
    $('voiceLiveLabel').textContent = VOICE_STAGE_INFO.ready;
  }
  updateDevCode();

  if (!play) return;
  const targetFace = activeAvatarFace();
  loopToken++;
  targetFace.stopWaiting?.();
  if (stage === 'listening') {
    targetFace.play('input');
  } else if (stage === 'thinking') {
    if (state.voiceDemoPlaying) {
      targetFace.startWaiting?.({ variant: thinkStyle.runtime.replace('waiting-', '') });
    } else {
      targetFace.play(thinkStyle.runtime);
    }
  } else if (stage === 'speaking') {
    targetFace.play('affirm');
  } else {
    targetFace.play('idle');
  }
}

function setThinkStyle(style) {
  if (!THINK_STYLES[style]) return;
  state.voiceThinkStyle = style;
  $('voiceThinkLabel').textContent = THINK_STYLES[style].label;
  document.querySelectorAll('#voiceThinkPopover [data-think-style]').forEach(btn => {
    btn.setAttribute('aria-checked', String(btn.dataset.thinkStyle === style));
  });
  $('voiceThinkPopover').hidden = true;
  $('voiceThinkMenuBtn').setAttribute('aria-expanded', 'false');
  setVoiceStage('thinking');
}

function syncVoiceDemoButton() {
  const btn = $('voiceDemoBtn');
  btn.classList.toggle('is-playing', state.voiceDemoPlaying);
  btn.querySelector('.play-icon').hidden = state.voiceDemoPlaying;
  btn.querySelector('.stop-icon').hidden = !state.voiceDemoPlaying;
  $('voiceDemoLabel').textContent = state.voiceDemoPlaying ? '停止演示' : '播放演示对话';
}

function stopVoiceDemo(resetFace = true) {
  voiceDemoToken++;
  if (!state.voiceDemoPlaying) return;
  state.voiceDemoPlaying = false;
  syncVoiceDemoButton();
  if (resetFace) {
    setVoiceStage(null, { play: true });
  }
}

async function playVoiceDemo() {
  if (state.voiceDemoPlaying) {
    stopVoiceDemo(true);
    return;
  }
  const token = ++voiceDemoToken;
  state.voiceDemoPlaying = true;
  syncVoiceDemoButton();

  const steps = [
    ['listening', 1500],
    ['thinking', 1800],
    ['speaking', 1900],
  ];
  for (const [stage, duration] of steps) {
    if (token !== voiceDemoToken) return;
    setVoiceStage(stage);
    await new Promise(r => setTimeout(r, duration));
  }
  if (token !== voiceDemoToken) return;
  state.voiceDemoPlaying = false;
  syncVoiceDemoButton();
  setVoiceStage(null, { play: true });
}

document.querySelectorAll('[data-dock-tab]').forEach(tab => {
  tab.addEventListener('click', () => setDockTab(tab.dataset.dockTab));
});
document.querySelectorAll('.voice-stage-btn[data-voice-stage]').forEach(btn => {
  btn.addEventListener('click', () => {
    stopVoiceDemo(false);
    setVoiceStage(btn.dataset.voiceStage);
  });
});
$('voiceThinkMenuBtn').addEventListener('click', e => {
  e.stopPropagation();
  const next = $('voiceThinkPopover').hidden;
  closePopovers();
  $('voiceThinkPopover').hidden = !next;
  $('voiceThinkMenuBtn').setAttribute('aria-expanded', String(next));
});
$('voiceThinkPopover').addEventListener('click', e => {
  e.stopPropagation();
  const item = e.target.closest('[data-think-style]');
  if (item) setThinkStyle(item.dataset.thinkStyle);
});
$('voiceDemoBtn').addEventListener('click', playVoiceDemo);
$('voiceMuteBtn').addEventListener('click', () => {
  state.voiceMuted = !state.voiceMuted;
  const btn = $('voiceMuteBtn');
  btn.setAttribute('aria-pressed', String(state.voiceMuted));
  btn.querySelector('.vol-on').hidden = state.voiceMuted;
  btn.querySelector('.vol-off').hidden = !state.voiceMuted;
});

/* Inspector Tabs & Skin Search */
function setInspectorTab(name) {
  state.inspectorTab = name;
  if (name !== 'code') lastNonCodeTab = name;
  document.querySelectorAll('[data-inspector-tab]').forEach(el => {
    el.setAttribute('aria-selected', String(el.dataset.inspectorTab === name));
  });
  document.querySelectorAll('[data-panel]').forEach(panel => {
    panel.hidden = panel.dataset.panel !== name;
  });
  if (name === 'code') updateDevCode();
  if (name === 'skins') requestAnimationFrame(syncSkinPreviewFace);
}
document.querySelectorAll('[data-inspector-tab]').forEach(tab => {
  tab.addEventListener('click', () => setInspectorTab(tab.dataset.inspectorTab));
});

/* Skin Library */
let savedSkins = [];

function loadSavedSkins() {
  try {
    const raw = JSON.parse(localStorage.getItem(SAVED_SKINS_KEY) || 'null');
    if (!Array.isArray(raw)) return [];
    return raw.map(String).filter(id => skinById.has(id)).slice(0, 24);
  } catch {
    return [];
  }
}

function persistSavedSkins() {
  try { localStorage.setItem(SAVED_SKINS_KEY, JSON.stringify(savedSkins)); } catch {}
}

function syncSaveSkinBtn() {
  const btn = $('saveSkinBtn');
  if (!btn) return;
  const saved = savedSkins.includes(state.skinId);
  btn.dataset.saved = String(saved);
  btn.setAttribute('aria-pressed', String(saved));
}

const thumbObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const img = entry.target;
    thumbObserver.unobserve(img);
    skinThumbnail(img.dataset.skin).then(url => { img.src = url; });
  }
}, { root: skinGrid, rootMargin: '120px' });

function renderFilters() {
  const container = $('skinFilters');
  if (state.skinCategory === 'saved' && !savedSkins.length) state.skinCategory = 'featured';
  const items = savedSkins.length ? [['saved', '收藏'], ...filters] : filters;
  container.replaceChildren(...items.map(([id, label]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = label;
    btn.dataset.filter = id;
    btn.setAttribute('aria-pressed', String(id === state.skinCategory));
    btn.addEventListener('click', () => {
      state.skinCategory = id;
      renderFilters();
      renderSkinGrid();
    });
    return btn;
  }));
}

function renderSkinGrid() {
  thumbObserver.disconnect();
  const q = state.skinQuery.trim().toLowerCase();
  const cat = (state.skinCategory === 'featured' || state.skinCategory === 'saved') && q ? 'all' : state.skinCategory;
  const source = cat === 'saved'
    ? savedSkins.map(id => skinById.get(id)).filter(Boolean)
    : cat === 'featured'
      ? featured.map(id => skinById.get(id)).filter(Boolean)
      : publicSkins.filter(s => cat === 'all' || s.group === cat);
  const matches = q
    ? source.filter(s => `${s.id} ${s.label} ${s.english}`.toLowerCase().includes(q))
    : source;

  const frag = document.createDocumentFragment();
  for (const skin of matches) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'skin-card';
    card.dataset.skin = skin.id;
    card.setAttribute('aria-pressed', String(state.surface === 'skin' && skin.id === state.skinId));

    const img = document.createElement('img');
    img.alt = '';
    img.width = 60;
    img.height = 60;
    img.dataset.skin = skin.id;

    const name = document.createElement('span');
    name.className = 'skin-card-name';
    name.textContent = skin.label;

    const code = document.createElement('span');
    code.className = 'skin-card-id';
    code.textContent = `#${skin.id}`;

    card.append(img, name, code);
    if (savedSkins.includes(skin.id)) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('viewBox', '0 0 24 24');
      star.setAttribute('aria-hidden', 'true');
      star.setAttribute('class', 'skin-card-star');
      const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      poly.setAttribute('points', '12 3.5 14.8 9.2 21 10.1 16.5 14.5 17.6 20.7 12 17.8 6.4 20.7 7.5 14.5 3 10.1 9.2 9.2 12 3.5');
      star.append(poly);
      card.append(star);
    }
    frag.appendChild(card);
    thumbObserver.observe(img);
  }
  skinGrid.replaceChildren(frag);
  skinGrid.hidden = !matches.length;
  $('skinEmpty').hidden = Boolean(matches.length);
  $('skinResultLabel').textContent = q
    ? '搜索结果'
    : cat === 'saved'
      ? '已收藏'
      : filters.find(([id]) => id === cat)?.[1] || '全部';
  $('skinResultCount').textContent = `${matches.length} 款`;
}

function setSurfaceMode(mode) {
  state.surface = mode;
  if (state.surface === 'flat' && state.backdrop === 'skin') state.backdrop = 'dark';
  renderSkinGrid();
  syncAllFaces();
}

function setSkinSearchOpen(open) {
  $('skinSearchRow').hidden = !open;
  $('skinSearchToggle').setAttribute('aria-expanded', String(open));
  if (open) {
    $('skinSearch').focus();
  } else {
    state.skinQuery = '';
    $('skinSearch').value = '';
    renderSkinGrid();
  }
}

skinGrid.addEventListener('click', e => {
  const card = e.target.closest('.skin-card');
  if (!card) return;
  state.surface = 'skin';
  state.skinId = card.dataset.skin;
  skinGrid.querySelectorAll('.skin-card').forEach(el => el.setAttribute('aria-pressed', String(el === card)));
  syncAllFaces();
});

$('skinPreviewCode').addEventListener('click', () => {
  const btn = $('skinPreviewCode');
  copyText(`skin="${state.skinId}"`, btn);
  btn.textContent = '已复制';
  clearTimeout(btn._codeTimer);
  btn._codeTimer = setTimeout(() => updateUI(), 1000);
});
$('saveSkinBtn').addEventListener('click', () => {
  state.surface = 'skin';
  const idx = savedSkins.indexOf(state.skinId);
  if (idx >= 0) savedSkins.splice(idx, 1);
  else savedSkins.unshift(state.skinId);
  persistSavedSkins();
  renderFilters();
  renderSkinGrid();
  syncAllFaces();
});
$('skinSearchRow').addEventListener('click', e => e.stopPropagation());
$('skinSearchToggle').addEventListener('click', e => {
  e.stopPropagation();
  const next = $('skinSearchRow').hidden;
  closePopovers();
  setSkinSearchOpen(next);
});
$('closeSkinSearch').addEventListener('click', () => setSkinSearchOpen(false));
$('skinSearch').addEventListener('input', e => { state.skinQuery = e.target.value; renderSkinGrid(); });
$('skinSearch').addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.stopPropagation();
    setSkinSearchOpen(false);
  }
});
$('clearSkinSearch').addEventListener('click', () => {
  state.skinCategory = 'all';
  state.skinQuery = '';
  $('skinSearch').value = '';
  renderFilters();
  renderSkinGrid();
});
$('randomSkinBtn').addEventListener('click', () => {
  const pool = publicSkins.filter(s => s.id !== state.skinId);
  const pick = pool[Math.floor(Math.random() * pool.length)];
  state.surface = 'skin';
  state.skinId = pick.id;
  renderSkinGrid();
  syncAllFaces();
});
$('lightFollowToggle').addEventListener('change', e => {
  state.lightFollow = e.target.checked;
  if (!state.lightFollow) stageMaterial?.light(-0.5, -0.5);
});
$('groundShadowToggle').addEventListener('change', e => {
  state.groundShadow = e.target.checked;
  stageMaterial?.setGroundShadow(state.groundShadow);
});

/* Look Panel (Scheme 3B + Redesigned Color Popover without Alpha) */
let cpTarget = null;
let cpSlotIdx = null;
let cpMode = 'hex';
let cpHsv = { h: 219, s: 0, v: 0 };
let savedPalettes = [];

function normalizeHex(raw) {
  const s = String(raw || '').trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(s)) {
    return `#${s.split('').map(ch => ch + ch).join('').toLowerCase()}`;
  }
  if (/^[0-9a-f]{6}$/i.test(s)) {
    return `#${s.toLowerCase()}`;
  }
  return null;
}

function hexToRgb(hex) {
  const c = normalizeHex(hex) || '#000000';
  return {
    r: parseInt(c.slice(1, 3), 16),
    g: parseInt(c.slice(3, 5), 16),
    b: parseInt(c.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  const h = n => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function hexToHsv(hex, fallbackHue = 0) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = fallbackHue;
  if (d > 0) {
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return {
    h: Math.round(h) % 360,
    s: max === 0 ? 0 : d / max,
    v: max,
  };
}

function hsvToHex(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

function hexToHsl(hex, fallbackHue = 0) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn), d = max - min;
  const l = (max + min) / 2;
  let h = fallbackHue, s = 0;
  if (d > 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return { h: Math.round(h) % 360, s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h, s, l) {
  const sn = clamp(s, 0, 100) / 100, ln = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = ln - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

function slotsFor(target) { return target === 'bg' ? state.bgSlots : state.headSlots; }
function colorVal(target) { return target === 'bg' ? state.flatBg : state.flatHead; }
function setColorVal(target, hex) {
  if (target === 'bg') state.flatBg = hex;
  else state.flatHead = hex;
}

function loadColorSlots() {
  try {
    const raw = JSON.parse(localStorage.getItem(SLOTS_STORAGE_KEY) || 'null');
    const clean = (arr, def) => Array.isArray(arr) && arr.length === def.length && arr.every(x => normalizeHex(x))
      ? arr.map(normalizeHex)
      : [...def];
    if (raw) {
      state.headSlots = clean(raw.head, DEFAULT_SLOTS.head);
      state.bgSlots = clean(raw.bg, DEFAULT_SLOTS.bg);
    }
  } catch {}
}

function persistColorSlots() {
  try {
    localStorage.setItem(SLOTS_STORAGE_KEY, JSON.stringify({ head: state.headSlots, bg: state.bgSlots }));
  } catch {}
}

function buildColorDotRows() {
  [['head', $('headDotsRow')], ['bg', $('bgDotsRow')]].forEach(([target, row]) => {
    const label = target === 'head' ? '头部' : '背景';
    const nodes = [];

    LOCKED_DOTS[target].forEach(hex => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'aw-dot';
      btn.style.setProperty('--dot', hex);
      btn.dataset.locked = 'true';
      btn.dataset.dotTarget = target;
      btn.dataset.dotHex = hex;
      btn.title = `${label}固定黑白 ${hex.toUpperCase()}（点击直接切换）`;
      btn.setAttribute('aria-label', btn.title);
      btn.addEventListener('click', () => {
        state.surface = 'flat';
        state.backdrop = 'custom';
        setColorVal(target, hex);
        state.activeSlot[target] = null;
        closeColorPopover();
        syncAllFaces();
      });
      nodes.push(btn);
    });

    const sep = document.createElement('span');
    sep.className = 'aw-sep';
    sep.setAttribute('aria-hidden', 'true');
    nodes.push(sep);

    slotsFor(target).forEach((hex, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'aw-dot';
      btn.style.setProperty('--dot', hex);
      btn.dataset.slotTarget = target;
      btn.dataset.slotIdx = String(idx);
      btn.title = `${label}预设彩点 ${idx + 1} (${hex.toUpperCase()}) · 点击应用`;
      btn.setAttribute('aria-label', btn.title);
      btn.addEventListener('click', () => {
        state.surface = 'flat';
        state.backdrop = 'custom';
        setColorVal(target, slotsFor(target)[idx]);
        state.activeSlot[target] = idx;
        closeColorPopover();
        syncAllFaces();
      });
      nodes.push(btn);
    });

    const rainbow = document.createElement('button');
    rainbow.type = 'button';
    rainbow.className = 'aw-dot is-rainbow';
    rainbow.dataset.rainbowTarget = target;
    rainbow.title = `${label}调色盘 · 点此自定义颜色`;
    rainbow.setAttribute('aria-label', `${label}自定义选色`);
    rainbow.setAttribute('aria-expanded', 'false');
    rainbow.setAttribute('aria-controls', 'colorPopover');
    rainbow.addEventListener('click', e => {
      e.stopPropagation();
      openColorPopover(target, rainbow);
    });
    nodes.push(rainbow);

    row.replaceChildren(...nodes);
  });
}

function syncColorDotSelections() {
  const isFlat = state.surface === 'flat';
  const cur = {
    head: state.flatHead.toLowerCase(),
    bg: state.flatBg.toLowerCase(),
  };

  ['head', 'bg'].forEach(target => {
    const active = state.activeSlot[target];
    const slots = slotsFor(target);
    const curHex = cur[target];
    const isSlotMode = isFlat && typeof active === 'number' && slots[active]?.toLowerCase() === curHex;
    const isRainbowMode = isFlat && active === 'rainbow';
    const lockedMatch = isFlat && !isSlotMode && !isRainbowMode && LOCKED_DOTS[target].some(h => h.toLowerCase() === curHex);
    const fallbackSlotIdx = (isFlat && !isSlotMode && !isRainbowMode && !lockedMatch)
      ? slots.findIndex(h => h.toLowerCase() === curHex)
      : -1;

    document.querySelectorAll(`.aw-dot[data-locked][data-dot-target="${target}"]`).forEach(btn => {
      const pressed = isFlat && !isSlotMode && !isRainbowMode && btn.dataset.dotHex.toLowerCase() === curHex;
      btn.setAttribute('aria-pressed', String(pressed));
    });

    document.querySelectorAll(`.aw-dot[data-slot-target="${target}"]`).forEach(btn => {
      const idx = Number(btn.dataset.slotIdx);
      const slotHex = slots[idx];
      btn.style.setProperty('--dot', slotHex);
      btn.title = `${target === 'head' ? '头部' : '背景'}预设彩点 ${idx + 1} (${slotHex.toUpperCase()}) · 点击应用`;
      const pressed = isSlotMode ? idx === active : (isFlat && !isRainbowMode && !lockedMatch && idx === fallbackSlotIdx);
      btn.setAttribute('aria-pressed', String(pressed));
    });

    const rainbowActive = isRainbowMode || (isFlat && !isSlotMode && !lockedMatch && fallbackSlotIdx === -1);
    document.querySelectorAll(`.aw-dot.is-rainbow[data-rainbow-target="${target}"]`).forEach(btn => {
      btn.setAttribute('aria-pressed', String(rainbowActive));
    });
  });
}

function paletteMatchesCurrent(bg, head) {
  if (state.surface !== 'flat') return false;
  const curBg = state.flatBg.toLowerCase();
  const curHd = state.flatHead.toLowerCase();
  const a = bg.toLowerCase();
  const b = head.toLowerCase();
  return (curBg === a && curHd === b) || (curBg === b && curHd === a);
}

function syncPaletteSelections() {
  document.querySelectorAll('.preset-dot[data-bg]').forEach(btn => {
    btn.setAttribute('aria-pressed', String(paletteMatchesCurrent(btn.dataset.bg, btn.dataset.head)));
  });
}

function syncSavePaletteBtn() {
  const btn = $('savePaletteBtn');
  if (!btn) return;
  const isFlat = state.surface === 'flat';
  const curBg = state.flatBg.toLowerCase();
  const curHd = state.flatHead.toLowerCase();
  const saved = isFlat && savedPalettes.some(p => p.bg.toLowerCase() === curBg && p.head.toLowerCase() === curHd);
  btn.dataset.saved = String(saved);
  btn.setAttribute('aria-pressed', String(saved));
}

function applyPalettePair(bg, head, currentlyActive) {
  state.surface = 'flat';
  state.backdrop = 'custom';
  state.flatBg = (currentlyActive ? head : bg).toLowerCase();
  state.flatHead = (currentlyActive ? bg : head).toLowerCase();
  state.activeSlot.head = null;
  state.activeSlot.bg = null;
  closeColorPopover();
  syncAllFaces();
}

function renderPalettes() {
  const grid = $('paletteGrid');
  const defaultCaption = '悬停预览 · 18 套';
  const presets = [...DEFAULT_BW_PRESETS, ...PALETTES];
  grid.replaceChildren(...presets.map(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-dot';
    btn.title = `${p.name} (头部 ${p.head.toUpperCase()} / 背景 ${p.bg.toUpperCase()})`;
    btn.setAttribute('aria-label', p.name);
    btn.dataset.bg = p.bg;
    btn.dataset.head = p.head;
    btn.style.setProperty('--sw-bg', p.bg);
    btn.style.setProperty('--sw-head', p.head);
    btn.addEventListener('mouseenter', () => { $('paletteCaption').textContent = `${p.name} · 再点可互换`; });
    btn.addEventListener('mouseleave', () => { $('paletteCaption').textContent = defaultCaption; });
    btn.addEventListener('click', () => {
      applyPalettePair(p.bg, p.head, btn.getAttribute('aria-pressed') === 'true');
    });
    return btn;
  }));
}

function loadSavedPalettes() {
  try {
    const raw = localStorage.getItem(SAVED_PALETTES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(item => ({
        bg: normalizeHex(item?.bg),
        head: normalizeHex(item?.head),
      }))
      .filter(item => item.bg && item.head)
      .slice(0, MAX_SAVED_PALETTES);
  } catch {
    return [];
  }
}

function persistSavedPalettes() {
  try {
    localStorage.setItem(SAVED_PALETTES_KEY, JSON.stringify(savedPalettes));
  } catch {}
}

function renderSavedPalettes() {
  const row = $('savedPaletteRow');
  row.hidden = savedPalettes.length === 0;
  if (!savedPalettes.length) {
    row.replaceChildren();
    syncPaletteSelections();
    syncSavePaletteBtn();
    return;
  }

  const lbl = document.createElement('span');
  lbl.className = 'saved-label';
  lbl.textContent = '收藏';

  const nodes = savedPalettes.map((item, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'preset-save-wrap';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'preset-dot';
    btn.title = `收藏 ${index + 1} (${item.head.toUpperCase()} / ${item.bg.toUpperCase()})`;
    btn.setAttribute('aria-label', `收藏 ${index + 1}`);
    btn.dataset.bg = item.bg;
    btn.dataset.head = item.head;
    btn.style.setProperty('--sw-bg', item.bg);
    btn.style.setProperty('--sw-head', item.head);
    btn.addEventListener('click', () => {
      applyPalettePair(item.bg, item.head, btn.getAttribute('aria-pressed') === 'true');
    });

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'preset-del';
    del.textContent = '×';
    del.title = '删除此收藏配色';
    del.setAttribute('aria-label', `删除收藏 ${index + 1}`);
    del.addEventListener('click', e => {
      e.stopPropagation();
      savedPalettes.splice(index, 1);
      persistSavedPalettes();
      renderSavedPalettes();
    });

    wrap.append(btn, del);
    return wrap;
  });

  row.replaceChildren(lbl, ...nodes);
  syncPaletteSelections();
  syncSavePaletteBtn();
}

function toggleSaveCurrentPalette() {
  const bg = normalizeHex(state.flatBg) || DEFAULT_FLAT.bg;
  const head = normalizeHex(state.flatHead) || DEFAULT_FLAT.head;
  state.surface = 'flat';
  state.backdrop = 'custom';
  const existingIdx = savedPalettes.findIndex(p => p.bg.toLowerCase() === bg && p.head.toLowerCase() === head);
  if (existingIdx >= 0) {
    savedPalettes.splice(existingIdx, 1);
  } else {
    if (savedPalettes.length >= MAX_SAVED_PALETTES) savedPalettes.pop();
    savedPalettes.unshift({ bg, head });
  }
  persistSavedPalettes();
  renderSavedPalettes();
  syncAllFaces();
}

function pickRandomPalette() {
  const presets = [...DEFAULT_BW_PRESETS, ...PALETTES];
  const pool = state.surface === 'flat'
    ? presets.filter(p => !(p.bg.toLowerCase() === state.flatBg.toLowerCase() && p.head.toLowerCase() === state.flatHead.toLowerCase()))
    : presets;
  const pick = pool[Math.floor(Math.random() * pool.length)] || presets[0];
  applyPalettePair(pick.bg, pick.head, false);
}

function resetLookColors() {
  state.surface = 'flat';
  state.backdrop = 'custom';
  state.flatBg = DEFAULT_FLAT.bg;
  state.flatHead = DEFAULT_FLAT.head;
  state.eyeThrough = true;
  state.headSlots = [...DEFAULT_SLOTS.head];
  state.bgSlots = [...DEFAULT_SLOTS.bg];
  state.activeSlot = { head: null, bg: null };
  try { localStorage.removeItem(SLOTS_STORAGE_KEY); } catch {}
  closeColorPopover();
  syncAllFaces();
}

function closeColorPopover() {
  cpTarget = null;
  cpSlotIdx = null;
  $('colorPopover').hidden = true;
  document.querySelectorAll('.aw-dot.is-rainbow').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
}

function renderColorPopoverState() {
  if (!cpTarget) return;
  const hex = colorVal(cpTarget);
  const rgb = hexToRgb(hex);
  const hsl = hexToHsl(hex, cpHsv.h);

  $('cpSv').style.setProperty('--cp-h', String(cpHsv.h));
  $('cpSv').style.setProperty('--cur-picked', hex);
  $('cpSvThumb').style.left = `${cpHsv.s * 100}%`;
  $('cpSvThumb').style.top = `${(1 - cpHsv.v) * 100}%`;
  $('cpHue').style.setProperty('--cp-h', String(cpHsv.h));
  $('cpHueThumb').style.left = `${(cpHsv.h / 360) * 100}%`;
  $('cpColorTile').style.setProperty('--cur-picked', hex);
  $('cpSlotTag').textContent = cpSlotIdx !== null ? `改写彩点 ${cpSlotIdx + 1}` : '自由选色';

  if (document.activeElement !== $('cpHexInput')) $('cpHexInput').value = hex.slice(1).toUpperCase();
  if (document.activeElement !== $('cpR')) $('cpR').value = String(rgb.r);
  if (document.activeElement !== $('cpG')) $('cpG').value = String(rgb.g);
  if (document.activeElement !== $('cpB')) $('cpB').value = String(rgb.b);
  if (document.activeElement !== $('cpH')) $('cpH').value = String(hsl.h);
  if (document.activeElement !== $('cpS')) $('cpS').value = String(hsl.s);
  if (document.activeElement !== $('cpL')) $('cpL').value = String(hsl.l);

  const curLower = hex.toLowerCase();
  $('cpQuick').querySelectorAll('button').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.quickHex === curLower));
  });
  $('cpModeBtn').textContent = cpMode.toUpperCase();
  document.querySelectorAll('[data-cp-panel]').forEach(panel => {
    panel.hidden = panel.dataset.cpPanel !== cpMode;
  });
}

function applyPickedColor(hex, { preserveHue = false } = {}) {
  if (!cpTarget) return;
  state.surface = 'flat';
  state.backdrop = 'custom';
  setColorVal(cpTarget, hex);
  if (cpSlotIdx !== null) {
    slotsFor(cpTarget)[cpSlotIdx] = hex;
    state.activeSlot[cpTarget] = cpSlotIdx;
    persistColorSlots();
  } else {
    state.activeSlot[cpTarget] = 'rainbow';
  }
  if (!preserveHue) cpHsv = hexToHsv(hex, cpHsv.h);
  renderColorPopoverState();
  syncAllFaces();
}

function positionColorPopover(triggerEl) {
  const pop = $('colorPopover');
  const rect = triggerEl.getBoundingClientRect();
  const popW = pop.offsetWidth || 264;
  const popH = pop.offsetHeight || 310;
  const vw = document.documentElement.clientWidth || window.innerWidth;
  const vh = document.documentElement.clientHeight || window.innerHeight;
  const left = Math.max(10, Math.min(vw - popW - 10, rect.right - popW));
  const fitsBelow = rect.bottom + 8 + popH <= vh - 10;
  const top = fitsBelow ? rect.bottom + 8 : Math.max(10, rect.top - popH - 8);
  pop.style.left = `${Math.round(left)}px`;
  pop.style.top = `${Math.round(top)}px`;
}

function openColorPopover(target, triggerEl) {
  const sameTarget = cpTarget === target && !$('colorPopover').hidden;
  closePopovers();
  if (sameTarget) return;

  const curHex = colorVal(target).toLowerCase();
  const active = state.activeSlot[target];
  const slotIdx = (state.surface === 'flat' && typeof active === 'number' && slotsFor(target)[active]?.toLowerCase() === curHex)
    ? active
    : null;

  cpTarget = target;
  cpSlotIdx = slotIdx;
  $('cpTitle').textContent = target === 'bg' ? '舞台背景' : '头部颜色';
  cpHsv = hexToHsv(curHex, cpHsv.h);
  $('colorPopover').hidden = false;
  triggerEl.setAttribute('aria-expanded', 'true');
  renderColorPopoverState();
  positionColorPopover(triggerEl);
}

function renderCpQuick() {
  const box = $('cpQuick');
  box.replaceChildren(...CP_QUICK_COLORS.map(hex => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.background = hex;
    btn.dataset.quickHex = hex;
    btn.title = hex.toUpperCase();
    btn.setAttribute('aria-label', `快捷色 ${hex}`);
    btn.addEventListener('click', () => applyPickedColor(hex));
    return btn;
  }));
}

function bindSliderDrag(el, onMove) {
  let active = false;
  const update = e => {
    const r = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    onMove(x, y);
  };
  el.addEventListener('pointerdown', e => {
    e.preventDefault();
    active = true;
    el.setPointerCapture(e.pointerId);
    update(e);
  });
  el.addEventListener('pointermove', e => {
    if (active) update(e);
  });
  const end = () => { active = false; };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
}

bindSliderDrag($('cpSv'), (x, y) => {
  cpHsv.s = x;
  cpHsv.v = 1 - y;
  applyPickedColor(hsvToHex(cpHsv.h, cpHsv.s, cpHsv.v), { preserveHue: true });
});

bindSliderDrag($('cpHue'), x => {
  cpHsv.h = Math.round(x * 359);
  applyPickedColor(hsvToHex(cpHsv.h, cpHsv.s, cpHsv.v), { preserveHue: true });
});

$('colorPopover').addEventListener('click', e => e.stopPropagation());
$('cpModeBtn').addEventListener('click', () => {
  cpMode = CP_MODES[(CP_MODES.indexOf(cpMode) + 1) % CP_MODES.length];
  renderColorPopoverState();
});
$('cpColorTile').addEventListener('click', () => {
  if (!cpTarget) return;
  copyText(colorVal(cpTarget).toUpperCase(), $('cpColorTile'));
  $('cpSlotTag').textContent = '已复制色号';
  clearTimeout($('cpColorTile')._t);
  $('cpColorTile')._t = setTimeout(renderColorPopoverState, 900);
});
$('cpEyedropperBtn').addEventListener('click', async () => {
  if (!cpTarget || typeof window.EyeDropper !== 'function') return;
  try {
    const res = await new window.EyeDropper().open();
    const hex = normalizeHex(res?.sRGBHex);
    if (hex) applyPickedColor(hex);
  } catch {}
});
$('cpHexInput').addEventListener('input', e => {
  const valid = normalizeHex(e.target.value);
  if (valid) applyPickedColor(valid);
});
const commitHexInput = () => {
  if (!cpTarget) return;
  const valid = normalizeHex($('cpHexInput').value);
  if (valid) {
    applyPickedColor(valid);
  } else {
    $('cpHexInput').value = colorVal(cpTarget).slice(1).toUpperCase();
  }
};
$('cpHexInput').addEventListener('blur', commitHexInput);
$('cpHexInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    commitHexInput();
    $('cpHexInput').blur();
  }
});
['cpR', 'cpG', 'cpB'].forEach(id => {
  $(id).addEventListener('input', () => {
    if (!cpTarget) return;
    const r = Number($('cpR').value), g = Number($('cpG').value), b = Number($('cpB').value);
    if (![r, g, b].some(Number.isNaN)) applyPickedColor(rgbToHex(r, g, b));
  });
});
['cpH', 'cpS', 'cpL'].forEach(id => {
  $(id).addEventListener('input', () => {
    if (!cpTarget) return;
    const h = Number($('cpH').value), s = Number($('cpS').value), l = Number($('cpL').value);
    if (![h, s, l].some(Number.isNaN)) {
      const ch = clamp(h, 0, 360);
      cpHsv = hexToHsv(hslToHex(ch, s, l), ch);
      applyPickedColor(hslToHex(ch, s, l), { preserveHue: true });
    }
  });
});

document.querySelector('[data-panel="look"]').addEventListener('scroll', closeColorPopover);
window.addEventListener('resize', () => { if (cpTarget) closeColorPopover(); });

$('savePaletteBtn').addEventListener('click', toggleSaveCurrentPalette);
$('randomPaletteBtn').addEventListener('click', pickRandomPalette);
$('resetLookColorsBtn').addEventListener('click', resetLookColors);

$('swapColorsBtn').addEventListener('click', () => {
  state.surface = 'flat';
  state.backdrop = 'custom';
  [state.flatBg, state.flatHead] = [state.flatHead, state.flatBg];
  state.activeSlot.head = null;
  state.activeSlot.bg = null;
  cpSlotIdx = null;
  if (cpTarget) {
    cpHsv = hexToHsv(colorVal(cpTarget), cpHsv.h);
    renderColorPopoverState();
  }
  syncAllFaces();
});
$('eyeThroughToggle').addEventListener('change', e => {
  state.surface = 'flat';
  state.backdrop = 'custom';
  state.eyeThrough = e.target.checked;
  syncAllFaces();
});

function syncRoundnessControl() {
  if (document.activeElement !== $('roundnessInput')) {
    $('roundnessInput').value = String(state.roundness);
  }
  $('roundnessSlider').value = String(state.roundness);
  $('roundnessSquareBtn').setAttribute('aria-pressed', String(state.roundness === 0));
  $('roundnessRoundBtn').setAttribute('aria-pressed', String(state.roundness === 100));
}

function setRoundnessValue(val) {
  const next = Math.max(0, Math.min(100, Math.round(val)));
  const previous = state.roundness;
  if (next === previous) return;
  state.roundness = next;
  const faces = [stageFace, lookPreviewFace, skinPreviewFace, studioRowFace];
  if (state.activeBotIndex === 0) faces.push(activeTalkFace);
  for (const face of faces) face?.setHeadRoundness(next);
  roundnessFeedback.cross(previous, next, faces, stageFace._isReducedMotion());
  syncRoundnessControl();
  updateDevCode();
}

$('roundnessSlider').addEventListener('input', e => setRoundnessValue(e.target.valueAsNumber));
$('roundnessSquareBtn').addEventListener('click', () => setRoundnessValue(0));
$('roundnessRoundBtn').addEventListener('click', () => setRoundnessValue(100));
$('roundnessInput').addEventListener('input', e => {
  const raw = e.target.value.trim();
  if (raw === '') return;
  const num = Number(raw);
  if (Number.isFinite(num)) setRoundnessValue(num);
});
const commitRoundnessInput = () => {
  const num = Number($('roundnessInput').value.trim());
  if (Number.isFinite(num) && $('roundnessInput').value.trim() !== '') {
    setRoundnessValue(num);
  }
  $('roundnessInput').value = String(state.roundness);
};
$('roundnessInput').addEventListener('blur', commitRoundnessInput);
$('roundnessInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    commitRoundnessInput();
    $('roundnessInput').blur();
  }
});
$('antennaToggle').addEventListener('change', e => {
  state.antenna = e.target.checked;
  syncAllFaces();
});

/* Behavior Panel */
$('pointerFollowToggle').addEventListener('change', e => { state.pointerFollow = e.target.checked; syncAllFaces(); });
$('pressSqueezeToggle').addEventListener('change', e => { state.pressSqueeze = e.target.checked; syncAllFaces(); });
$('antennaDragToggle').addEventListener('change', e => { state.antennaDrag = e.target.checked; syncAllFaces(); });
document.querySelectorAll('[data-autosleep]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.autoSleep = btn.dataset.autosleep;
    document.querySelectorAll('[data-autosleep]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    syncAllFaces();
  });
});
document.querySelectorAll('[data-wakeon]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.wakeOn = btn.dataset.wakeon;
    document.querySelectorAll('[data-wakeon]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    syncAllFaces();
  });
});
document.querySelectorAll('[data-motion]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.motion = btn.dataset.motion;
    document.querySelectorAll('[data-motion]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    syncAllFaces();
  });
});

/* Official boopface.com Sidebar Chat Simulation */
const botRowEls = [];

function createBotFace(bot, size) {
  const face = document.createElement('boop-face');
  face.setAttribute('size', String(size));
  face.setAttribute('auto-sleep', '0');
  return face;
}

function buildSidebarBots() {
  const list = $('talkBots');
  list.replaceChildren();
  botRowEls.length = 0;

  OFFICIAL_BOTS.forEach((bot, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'talk-bot';
    btn.title = bot.name;
    const face = createBotFace(bot, currentChatScale().sideFace);
    const textWrap = document.createElement('span');
    textWrap.className = 'talk-bot-text';
    const name = document.createElement('span');
    name.className = 'talk-bot-name';
    name.textContent = bot.name;
    const defaultReply = bot.turns.at(-1).reply;
    const preview = document.createElement('span');
    preview.className = 'talk-bot-preview';
    preview.textContent = defaultReply;
    textWrap.append(name, preview);
    btn.append(face, textWrap);
    btn.addEventListener('click', () => openBot(index));
    li.append(btn);
    list.append(li);
    paintCustomFace(face, { bot });
    if (bot.custom) studioRowFace = face;
    botRowEls.push({ btn, face, preview, defaultReply, taskCursor: -1 });
  });
}

function applyBotBgStep(index, step) {
  const row = botRowEls[index];
  const bot = OFFICIAL_BOTS[index];
  if (!row || !bot) return;
  row.face.stopWaiting?.();
  if (!step || step.mode === 'idle') {
    row.face.play?.('idle');
    row.preview.textContent = row.defaultReply;
    delete row.preview.dataset.tone;
    row.btn.title = bot.name;
    return;
  }
  if (step.mode === 'waiting') {
    row.face.startWaiting?.({ variant: step.variant });
  } else if (step.mode === 'play') {
    row.face.play?.(step.action);
  }
  row.preview.textContent = step.text;
  if (step.tone) row.preview.dataset.tone = step.tone;
  else delete row.preview.dataset.tone;
  row.btn.title = `${bot.name} · ${step.text}`;
}

function advanceOneBackgroundBot(index) {
  const bot = OFFICIAL_BOTS[index];
  const row = botRowEls[index];
  if (!bot?.bgTasks?.length || !row || index === state.activeBotIndex) return;
  row.taskCursor = (row.taskCursor + 1) % bot.bgTasks.length;
  applyBotBgStep(index, bot.bgTasks[row.taskCursor]);
}

function startBackgroundBots() {
  clearInterval(bgTaskTimer);
  const bgIndices = OFFICIAL_BOTS.map((_, i) => i).filter(i => OFFICIAL_BOTS[i].bgTasks?.length);
  [2, 6, 1].forEach((idx, order) => {
    if (idx === state.activeBotIndex || !OFFICIAL_BOTS[idx]?.bgTasks) return;
    const presetIdx = order === 0 ? 1 : 0;
    botRowEls[idx].taskCursor = presetIdx;
    applyBotBgStep(idx, OFFICIAL_BOTS[idx].bgTasks[presetIdx]);
  });
  let pointer = 0;
  bgTaskTimer = setInterval(() => {
    if (state.scene !== 'chat') return;
    const candidates = bgIndices.filter(i => i !== state.activeBotIndex);
    if (!candidates.length) return;
    const idx = candidates[pointer % candidates.length];
    pointer += 1;
    advanceOneBackgroundBot(idx);
  }, 2600);
}

function stopBackgroundBots() {
  clearInterval(bgTaskTimer);
  bgTaskTimer = 0;
  botRowEls.forEach((row, index) => {
    if (OFFICIAL_BOTS[index]?.bgTasks) applyBotBgStep(index, null);
  });
}

function createAgentTurnElement(bot, replyText, statusKey, statusLabel) {
  const row = document.createElement('div');
  row.className = 'talk-agent';
  const mount = document.createElement('div');
  mount.className = 'talk-agent-face';
  const textCol = document.createElement('div');
  textCol.className = 'talk-text';
  const bubble = document.createElement('p');
  bubble.className = 'talk-reply';
  bubble.textContent = replyText;
  const status = document.createElement('p');
  status.className = 'talk-status';
  status.dataset.state = statusKey;
  status.append(document.createElement('i'), Object.assign(document.createElement('span'), { textContent: statusLabel }));
  textCol.append(bubble, status);
  row.append(mount, textCol);
  return { row, mount, bubble, status };
}

function placeActiveTalkFace(bot, lastTurnElement) {
  const scale = currentChatScale();
  if (!activeTalkFace) activeTalkFace = createBotFace(bot, scale.inlineFace);
  if (state.chatAvatarPos === 'header') {
    activeTalkFace.setAttribute('size', String(scale.headerFace));
    $('talkHeadFaceSlot').replaceChildren(activeTalkFace);
  } else if (lastTurnElement) {
    activeTalkFace.setAttribute('size', String(scale.inlineFace));
    lastTurnElement.mount.replaceChildren(activeTalkFace);
  }
  paintCustomFace(activeTalkFace, { bot });
}

function openBot(index) {
  roundnessFeedback.stop();
  state.activeBotIndex = index;
  const bot = OFFICIAL_BOTS[index];
  if (bot?.bgTasks) applyBotBgStep(index, null);
  botRowEls.forEach(({ btn }, i) => btn.classList.toggle('is-open', i === index));
  $('talkTitle').textContent = bot.name;
  $('talkHeadBadge').textContent = bot.custom
    ? (state.surface === 'skin' ? `皮肤 #${state.skinId}` : `纯色 ${state.flatHead}`)
    : (bot.skin ? `皮肤 #${bot.skin}` : '经典纯色');

  const thread = $('talkThread');
  thread.replaceChildren();
  let lastAgentTurn = null;
  let lastResult = 'idle';

  for (const turn of bot.turns) {
    const ask = document.createElement('p');
    ask.className = 'talk-ask';
    ask.textContent = turn.ask;
    const [stKey, stLabel] = DONE_STATUS[turn.result] || ['done', '已完成'];
    lastAgentTurn = createAgentTurnElement(bot, turn.reply, stKey, stLabel);
    thread.append(ask, lastAgentTurn.row);
    lastResult = turn.result;
  }

  placeActiveTalkFace(bot, lastAgentTurn);
  $('talkBody').scrollTop = $('talkBody').scrollHeight;
  if (lastResult !== 'idle') activeTalkFace?.play(lastResult);
}

document.querySelectorAll('[data-chat-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.chatLook = btn.dataset.chatTheme;
    $('talkWindow').dataset.look = state.chatLook;
    document.querySelectorAll('[data-chat-theme]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    if (state.activeBotIndex === 0 && activeTalkFace) paintCustomFace(activeTalkFace);
  });
});

document.querySelectorAll('[data-chat-pos]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.chatAvatarPos = btn.dataset.chatPos;
    $('talkWindow').dataset.avatarPos = state.chatAvatarPos;
    document.querySelectorAll('[data-chat-pos]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const agentMounts = $('talkThread').querySelectorAll('.talk-agent-face');
    const lastMount = agentMounts[agentMounts.length - 1];
    const bot = OFFICIAL_BOTS[state.activeBotIndex];
    placeActiveTalkFace(bot, lastMount ? { mount: lastMount } : null);
  });
});

$('chatResetBtn').addEventListener('click', () => openBot(state.activeBotIndex));

(() => {
  const resizer = $('talkResizer');
  const talkWin = $('talkWindow');
  const side = talkWin?.querySelector('.talk-side');
  if (!resizer || !talkWin || !side) return;
  let dragging = false;
  let startX = 0;
  let startW = 208;

  function setChatRail(rail, widthPx = null) {
    state.chatRail = rail;
    applyChatSidebarWidth(rail ? null : widthPx);
  }

  resizer.addEventListener('pointerdown', e => {
    dragging = true;
    startX = e.clientX;
    startW = side.getBoundingClientRect().width;
    talkWin.classList.add('is-resizing');
    resizer.setPointerCapture(e.pointerId);
  });
  resizer.addEventListener('pointermove', e => {
    if (!dragging) return;
    const rawW = startW + (e.clientX - startX);
    if (rawW < currentChatScale().snapW) setChatRail(true);
    else setChatRail(false, rawW);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    talkWin.classList.remove('is-resizing');
  };
  resizer.addEventListener('pointerup', endDrag);
  resizer.addEventListener('pointercancel', endDrag);
  resizer.addEventListener('dblclick', () => setChatRail(!state.chatRail));
})();

$('chatInput').addEventListener('input', () => {
  if (!chatBusy && $('chatInput').value.trim()) activeTalkFace?.play('input');
});

$('chatForm').addEventListener('submit', async e => {
  e.preventDefault();
  const text = $('chatInput').value.trim();
  if (!text || chatBusy) return;
  chatBusy = true;
  $('chatInput').value = '';
  const bot = OFFICIAL_BOTS[state.activeBotIndex];

  const ask = document.createElement('p');
  ask.className = 'talk-ask';
  ask.textContent = text;
  const replyEl = createAgentTurnElement(bot, '•••', 'thinking', '思考中…');
  $('talkThread').append(ask, replyEl.row);
  placeActiveTalkFace(bot, replyEl);
  $('talkBody').scrollTop = $('talkBody').scrollHeight;

  await activeTalkFace.play('affirm');
  activeTalkFace.startWaiting({ variant: 'wrap' });
  await new Promise(r => setTimeout(r, 750));

  const reply = CHAT_REPLIES[Math.floor(Math.random() * CHAT_REPLIES.length)];
  replyEl.bubble.textContent = reply.text;
  replyEl.status.dataset.state = reply.status;
  replyEl.status.lastChild.textContent = reply.label;
  botRowEls[state.activeBotIndex].preview.textContent = reply.text;
  $('talkBody').scrollTop = $('talkBody').scrollHeight;
  activeTalkFace.play(reply.result);
  chatBusy = false;
});

/* Live State HUD + Event Stream + Code Generator */
function logEvent(name, detail) {
  state.eventTotal += 1;
  $('eventCount').textContent = String(state.eventTotal);
  const row = document.createElement('div');
  row.className = 'event-line';
  const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
  row.innerHTML = `<span class="event-time"></span><span class="event-name"></span><span class="event-payload"></span>`;
  row.children[0].textContent = ts;
  row.children[1].textContent = name;
  row.children[2].textContent = JSON.stringify(detail);
  devEvents.prepend(row);
  while (devEvents.children.length > 40) devEvents.lastChild.remove();
}

stageFace.addEventListener('face-state', e => logEvent('face-state', e.detail));
stageFace.addEventListener('action-state', e => logEvent('action-state', e.detail));
stageFace.addEventListener('head-roundness-change', e => logEvent('head-roundness-change', e.detail));

function buildAttributes() {
  const attrs = [`id="avatar"`];
  if (state.size !== 112) attrs.push(`size="${state.size}"`);
  if (state.surface === 'skin') attrs.push(`skin="${state.skinId}"`);
  else if (state.flatHead !== '#08090b') attrs.push(`color="${state.flatHead}"`);
  if (state.autoSleep !== '0') attrs.push(`auto-sleep="${state.autoSleep}"`);
  if (state.wakeOn !== 'activity') attrs.push(`wake-on="${state.wakeOn}"`);
  if (state.motion !== 'auto') attrs.push(`motion="${state.motion}"`);
  if (!state.pressSqueeze) attrs.push(`press-squeeze="false"`);
  if (!state.antennaDrag) attrs.push(`antenna-drag="false"`);
  return attrs.join(' ');
}

function updateDevCode() {
  const attrs = buildAttributes();
  const actionLine = formatApiCall(state.action);
  $('devQuickAction').textContent = `${actionLine};`;
  const roundLine = state.roundness !== 50 ? `\navatar.setHeadRoundness(${state.roundness});` : '';
  const followLine = !state.pointerFollow ? `\navatar.setPointerFollow(false);` : '';

  if (state.devTab === 'html') {
    devCode.textContent = `<boop-face ${attrs}></boop-face>\n\n<script type="module">\n  import 'boopface';\n  const avatar = document.querySelector('#avatar');${roundLine}${followLine}\n  ${actionLine};\n</script>`;
  } else if (state.devTab === 'js') {
    const skinLine = state.surface === 'skin' ? `avatar.setSkin('${state.skinId}');` : `avatar.setSkin(null);\navatar.setAttribute('color', '${state.flatHead}');`;
    devCode.textContent = `import 'boopface';\n\nconst avatar = document.querySelector('#avatar');\nawait customElements.whenDefined('boop-face');\n${skinLine}${roundLine}${followLine}\n${actionLine};`;
  } else if (state.devTab === 'cdn') {
    const pkg = state.surface === 'skin' ? `boopface@${VERSION}/boopface.js` : `boopface@${VERSION}/boopface-lite.js`;
    devCode.textContent = `<script type="module" src="https://cdn.jsdelivr.net/npm/${pkg}"></script>\n<boop-face ${attrs}></boop-face>`;
  }
}

document.querySelectorAll('[data-dev-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    state.devTab = tab.dataset.devTab;
    document.querySelectorAll('[data-dev-tab]').forEach(el => el.setAttribute('aria-selected', String(el === tab)));
    const isEvents = state.devTab === 'events';
    $('devQuickRow').hidden = isEvents;
    $('devCodePre').hidden = isEvents;
    $('codeActionsRow').hidden = isEvents;
    $('codeBuildStats').hidden = isEvents;
    $('codeEventsBar').hidden = !isEvents;
    devEvents.hidden = !isEvents;
    if (!isEvents) updateDevCode();
  });
});

function flashBtnText(btn, doneText, idleText) {
  btn.textContent = doneText;
  clearTimeout(btn._txtTimer);
  btn._txtTimer = setTimeout(() => { btn.textContent = idleText; }, 1300);
}

$('copyActionBtn').addEventListener('click', () => {
  copyText($('devQuickAction').textContent, $('copyActionBtn'));
  flashBtnText($('copyActionBtn'), '已复制', '复制调用');
});

$('clearEventsBtn').addEventListener('click', () => {
  state.eventTotal = 0;
  $('eventCount').textContent = '0';
  devEvents.replaceChildren();
});
$('copyCodeBtn').addEventListener('click', () => {
  copyText(devCode.textContent, $('copyCodeBtn'));
  flashBtnText($('copyCodeBtn'), '已复制代码', '复制代码');
});
$('copyShareBtn').addEventListener('click', () => {
  const url = new URL(location.href);
  if (state.surface === 'skin') url.searchParams.set('skin', state.skinId);
  else url.searchParams.delete('skin');
  url.searchParams.set('action', state.action);
  copyText(url.href, $('copyShareBtn'));
  flashBtnText($('copyShareBtn'), '已复制链接', '复制分享链接');
});

/* Keyboard Shortcuts */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePopovers();
    if (state.chatExpanded) setChatExpanded(false);
  }
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
  if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
    setInspectorTab(state.inspectorTab === 'code' ? lastNonCodeTab : 'code');
  } else if (e.code === 'Space' && document.activeElement?.tagName !== 'BUTTON') {
    e.preventDefault();
    if (state.dockTab === 'voice') {
      if (state.voiceStage) setVoiceStage(state.voiceStage);
      else playVoiceDemo();
    } else {
      playAction(state.action);
    }
  }
});

/* Stage Hand-Drawn Onboarding Callouts */
const stageCenter = $('stageCenter');
const stageHints = $('stageHints');
const stageHintsSvg = $('stageHintsSvg');
const hintAntennaLabel = $('hintAntennaLabel');
const hintBodyLabel = $('hintBodyLabel');
const hintAntennaShaft = $('hintAntennaShaft');
const hintAntennaHead = $('hintAntennaHead');
const hintBodyShaft = $('hintBodyShaft');
const hintBodyHead = $('hintBodyHead');

let stageHintsDismissed = false;
let stageHintsDrawn = false;
let stageHintsRaf = 0;
let stageHintsObserver = null;

function buildArrowHead(tip, c2) {
  const angle = Math.atan2(tip.y - c2.y, tip.x - c2.x);
  const wing = (turn, length) =>
    `${(tip.x - length * Math.cos(angle + turn)).toFixed(1)} ${(tip.y - length * Math.sin(angle + turn)).toFixed(1)}`;
  return `M${wing(0.52, 10.5)}L${tip.x.toFixed(1)} ${tip.y.toFixed(1)}L${wing(-0.46, 9.5)}`;
}

function measureStageTarget(el, faceBox, fallback) {
  const raw = el?.getBoundingClientRect();
  const valid = raw && raw.width > 0 && raw.left >= faceBox.left - 24 && raw.right <= faceBox.right + 24;
  return valid ? raw : fallback;
}

function layoutStageHints() {
  if (stageHintsDismissed || state.scene !== 'stage' || stageHints.hidden) return;
  const box = stageCenter.getBoundingClientRect();
  const faceBox = stageFace.getBoundingClientRect();
  if (box.width < 120 || faceBox.width < 40) return;

  const root = stageFace.shadowRoot;
  const dotRect = measureStageTarget(root?.querySelector('#antennaDot'), faceBox, {
    left: faceBox.left + faceBox.width * 0.45,
    right: faceBox.left + faceBox.width * 0.56,
    top: faceBox.top + faceBox.height * 0.04,
    bottom: faceBox.top + faceBox.height * 0.14,
  });
  const headRect = measureStageTarget(root?.querySelector('#head'), faceBox, {
    left: faceBox.left + faceBox.width * 0.12,
    right: faceBox.left + faceBox.width * 0.88,
    top: faceBox.top + faceBox.height * 0.25,
    bottom: faceBox.top + faceBox.height * 0.92,
  });

  const dotRight = dotRect.right - box.left;
  const dotTop = dotRect.top - box.top;
  const dotCenterY = (dotRect.top + dotRect.bottom) / 2 - box.top;
  const headLeft = headRect.left - box.left;
  const headRight = headRect.right - box.left;
  const headCenterY = (headRect.top + headRect.bottom) / 2 - box.top;

  const compact = box.width < 500;
  const gap = compact
    ? Math.max(24, (box.width - faceBox.width) * 0.18)
    : Math.min(82, Math.max(46, (box.width - faceBox.width) * 0.18));

  const w1 = hintAntennaLabel.offsetWidth || 64;
  const h1 = hintAntennaLabel.offsetHeight || 20;
  const x1 = Math.max(dotRight + 28, Math.min(box.width - w1 - 8, headRight + gap));
  const y1 = Math.max(8, Math.min(box.height - h1 - 8, dotCenterY - h1 * 0.25 + (compact ? -2 : 4)));
  hintAntennaLabel.style.left = `${Math.round(x1)}px`;
  hintAntennaLabel.style.top = `${Math.round(y1)}px`;

  const start1 = { x: x1 - 7, y: y1 + h1 * 0.45 };
  const aim1 = { x: dotRight + 14, y: dotTop - 2 };
  const end1 = start1.x - aim1.x > 92
    ? {
        x: start1.x + ((dotRight + 8) - start1.x) * 0.78,
        y: start1.y + ((dotCenterY - 6) - start1.y) * 0.78,
      }
    : { x: Math.min(start1.x - 18, aim1.x), y: aim1.y };
  const dx1 = start1.x - end1.x;
  const arch1 = compact ? 18 : 26;
  const c1_1 = { x: start1.x - dx1 * 0.18, y: start1.y - arch1 };
  const c1_2 = { x: end1.x + dx1 * 0.22, y: Math.min(start1.y, end1.y) - arch1 * 0.92 };
  hintAntennaShaft.setAttribute('d', `M${start1.x.toFixed(1)} ${start1.y.toFixed(1)}C${c1_1.x.toFixed(1)} ${c1_1.y.toFixed(1)} ${c1_2.x.toFixed(1)} ${c1_2.y.toFixed(1)} ${end1.x.toFixed(1)} ${end1.y.toFixed(1)}`);
  hintAntennaHead.setAttribute('d', buildArrowHead(end1, c1_2));

  const w2 = hintBodyLabel.offsetWidth || 64;
  const h2 = hintBodyLabel.offsetHeight || 34;
  const bodyGap = compact ? Math.max(30, gap) : gap;
  const x2 = Math.max(8, headLeft - bodyGap - w2);
  const y2 = Math.max(8, Math.min(box.height - h2 - 8, headCenterY + (compact ? 14 : 8)));
  hintBodyLabel.style.left = `${Math.round(x2)}px`;
  hintBodyLabel.style.top = `${Math.round(y2)}px`;

  const start2 = { x: x2 + w2 + 7, y: y2 + h2 * 0.45 };
  let end2 = { x: headLeft - 14, y: headCenterY + 6 };
  if (end2.x - start2.x < 18) {
    end2.x = Math.min(headLeft - 8, start2.x + 22);
  }
  const span2 = Math.max(18, end2.x - start2.x);
  const c2_1 = { x: start2.x + span2 * 0.3, y: start2.y + (compact ? 12 : 18) };
  const c2_2 = { x: end2.x - span2 * 0.25, y: end2.y + (compact ? 11 : 16) };
  hintBodyShaft.setAttribute('d', `M${start2.x.toFixed(1)} ${start2.y.toFixed(1)}C${c2_1.x.toFixed(1)} ${c2_1.y.toFixed(1)} ${c2_2.x.toFixed(1)} ${c2_2.y.toFixed(1)} ${end2.x.toFixed(1)} ${end2.y.toFixed(1)}`);
  hintBodyHead.setAttribute('d', buildArrowHead(end2, c2_2));

  const paths = stageHintsSvg.querySelectorAll('path');
  const played = stageHintsDrawn && stageHintsSvg.getAnimations({ subtree: true }).every(a => a.playState === 'finished');
  if (played) {
    paths.forEach(p => {
      p.style.strokeDasharray = 'none';
      p.style.strokeDashoffset = '0';
    });
    return;
  }
  stageHintsDrawn = true;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  paths.forEach(p => {
    const length = Math.ceil(p.getTotalLength());
    p.style.strokeDasharray = String(length);
    p.style.strokeDashoffset = still ? '0' : String(length);
  });
  stageHints.classList.add('is-ready');
  stageHints.classList.remove('is-drawing');
  stageHints.getBoundingClientRect();
  stageHints.classList.add('is-drawing');
}

function scheduleStageHintsLayout() {
  if (stageHintsDismissed) return;
  cancelAnimationFrame(stageHintsRaf);
  stageHintsRaf = requestAnimationFrame(layoutStageHints);
}

function dismissStageHints() {
  if (stageHintsDismissed) return;
  stageHintsDismissed = true;
  stageHintsObserver?.disconnect();
  stageHintsObserver = null;
  cancelAnimationFrame(stageHintsRaf);
  document.removeEventListener('pointerdown', dismissStageHints, { capture: true });
  document.removeEventListener('keydown', onFirstKeyForHints, { capture: true });
  stageHints.classList.add('is-dismissed');
  setTimeout(() => { stageHints.hidden = true; }, 300);
}

function onFirstKeyForHints(e) {
  if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) return;
  dismissStageHints();
}

document.addEventListener('pointerdown', dismissStageHints, { capture: true });
document.addEventListener('keydown', onFirstKeyForHints, { capture: true });

stageHintsObserver = new ResizeObserver(scheduleStageHintsLayout);
stageHintsObserver.observe(stageCenter);
stageHintsObserver.observe(stageFace);
document.fonts?.ready.then(scheduleStageHintsLayout);
setTimeout(scheduleStageHintsLayout, 260);

/* Boot */
savedPalettes = loadSavedPalettes();
savedSkins = loadSavedSkins();
seenNewActions = loadSeenNewActions();
syncNewActionBadges();
loadColorSlots();
buildColorDotRows();
renderFilters();
renderSkinGrid();
renderSavedPalettes();
renderPalettes();
renderCpQuick();
buildSidebarBots();
openBot(0);
syncChatScale();
syncAllFaces();
requestAnimationFrame(() => {
  syncLookPreviewFace();
  syncSkinPreviewFace();
});
scheduleStageHintsLayout();
