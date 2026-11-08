const INSPECT_LABELS = Object.freeze({
  'zh-CN': { action: '审视', state: '审视 / 核对' },
  'zh-TW': { action: '審視', state: '審視 / 核對' },
  en: { action: 'Inspect', state: 'Inspect / Verify' },
  ja: { action: '確認', state: '確認 / 検証' },
  ko: { action: '검토', state: '검토 / 확인' },
  es: { action: 'Revisar', state: 'Revisar / Verificar' },
  pt: { action: 'Revisar', state: 'Revisar / Verificar' },
  de: { action: 'Prüfen', state: 'Prüfen / Kontrollieren' },
  fr: { action: 'Vérifier', state: 'Vérifier / Contrôler' },
});

const FAILURE_LABELS = Object.freeze({
  'zh-CN': { action: '失败', state: '失败' },
  'zh-TW': { action: '失敗', state: '失敗' },
  en: { action: 'Failure', state: 'Failure' },
  ja: { action: '失敗', state: '失敗' },
  ko: { action: '실패', state: '실패' },
  es: { action: 'Fallo', state: 'Fallo' },
  pt: { action: 'Falha', state: 'Falha' },
  de: { action: 'Fehlgeschlagen', state: 'Fehlgeschlagen' },
  fr: { action: 'Échec', state: 'Échec' },
});

const LOVE_LABELS = Object.freeze({
  'zh-CN': { action: '喜欢', state: '喜欢 / 爱心' },
  'zh-TW': { action: '喜歡', state: '喜歡 / 愛心' },
  en: { action: 'Love', state: 'Love / Heart' },
  ja: { action: '好き', state: '好き / ハート' },
  ko: { action: '좋아요', state: '좋아요 / 하트' },
  es: { action: 'Amor', state: 'Amor / Corazón' },
  pt: { action: 'Amor', state: 'Amor / Coração' },
  de: { action: 'Liebe', state: 'Liebe / Herz' },
  fr: { action: 'Amour', state: 'Amour / Cœur' },
});

const RANDOM_LABELS = Object.freeze({
  'zh-CN': { action: '随机', state: '随机 / 老虎机' },
  'zh-TW': { action: '隨機', state: '隨機 / 老虎機' },
  en: { action: 'Random', state: 'Random / Slot machine' },
  ja: { action: 'ランダム', state: 'ランダム / スロット' },
  ko: { action: '랜덤', state: '랜덤 / 슬롯머신' },
  es: { action: 'Azar', state: 'Azar / Tragaperras' },
  pt: { action: 'Aleatório', state: 'Aleatório / Caça-níqueis' },
  de: { action: 'Zufall', state: 'Zufall / Spielautomat' },
  fr: { action: 'Aléatoire', state: 'Aléatoire / Machine à sous' },
});

const LISTENING_LABELS = Object.freeze({
  'zh-CN': { action: '聆听', state: '聆听' }, 'zh-TW': { action: '聆聽', state: '聆聽' },
  en: { action: 'Listening', state: 'Listening' }, ja: { action: '聞く', state: '聞いている' },
  ko: { action: '듣기', state: '듣는 중' }, es: { action: 'Escuchar', state: 'Escuchando' },
  pt: { action: 'Ouvir', state: 'Ouvindo' }, de: { action: 'Zuhören', state: 'Hört zu' },
  fr: { action: 'Écouter', state: 'Écoute' },
});

const THINKING_LABELS = Object.freeze({
  'zh-CN': { state: '思考' }, 'zh-TW': { state: '思考' }, en: { state: 'Thinking' }, ja: { state: '考えている' },
  ko: { state: '생각 중' }, es: { state: 'Pensando' }, pt: { state: 'Pensando' }, de: { state: 'Denkt nach' }, fr: { state: 'Réfléchit' },
});

const SPEAKING_LABELS = Object.freeze({
  'zh-CN': { action: '说话', state: '说话' }, 'zh-TW': { action: '說話', state: '說話' },
  en: { action: 'Speaking', state: 'Speaking' }, ja: { action: '話す', state: '話している' },
  ko: { action: '말하기', state: '말하는 중' }, es: { action: 'Hablar', state: 'Hablando' },
  pt: { action: 'Falar', state: 'Falando' }, de: { action: 'Sprechen', state: 'Spricht' },
  fr: { action: 'Parler', state: 'Parle' },
});

const WRAP_WAITING_LABELS = Object.freeze({
  'zh-CN':'等待 · 滚动', 'zh-TW':'等待 · 滾動', en:'Waiting · Scroll', ja:'待機 · 回り込み',
  ko:'대기 · 감싸기', es:'Espera · Envoltura', pt:'Espera · Contorno', de:'Warten · Umlauf', fr:'Attente · Boucle',
});

const WAVE_WAITING_LABELS = Object.freeze({
  'zh-CN':'等待 · 波动', 'zh-TW':'等待 · 波動', en:'Waiting · Wave', ja:'待機 · ウェーブ',
  ko:'대기 · 물결', es:'Espera · Onda', pt:'Espera · Onda', de:'Warten · Welle', fr:'Attente · Vague',
});

const BLOOM_WAITING_LABELS = Object.freeze({
  'zh-CN':'等待 · 绽放', 'zh-TW':'等待 · 綻放', en:'Waiting · Bloom', ja:'待機 · ブルーム',
  ko:'대기 · 피어나기', es:'Espera · Florecer', pt:'Espera · Florescer', de:'Warten · Erblühen', fr:'Attente · Éclosion',
});

function activeLanguage(table) {
  const lang = document.documentElement.lang || 'zh-CN';
  if (table[lang]) return lang;
  return lang.startsWith('zh') ? 'zh-CN' : 'en';
}

// Actions added in the latest release are shown last and flagged with a corner badge.
function markAsNew(button) {
  button.classList.add('is-new');
  button.dataset.new = 'NEW';
}

function ensureActionButton(action, afterAction) {
  const controls = document.querySelector('.controls');
  if (!controls) return null;
  let button = controls.querySelector(`[data-action="${action}"]`);
  if (button) return button;
  button = document.createElement('button');
  button.type = 'button';
  button.dataset.action = action;
  const anchor = controls.querySelector(`[data-action="${afterAction}"]`);
  if (anchor) anchor.insertAdjacentElement('afterend', button);
  else controls.appendChild(button);
  return button;
}

function syncActionLabels() {
  const inspect = INSPECT_LABELS[activeLanguage(INSPECT_LABELS)];
  const failure = FAILURE_LABELS[activeLanguage(FAILURE_LABELS)];
  const love = LOVE_LABELS[activeLanguage(LOVE_LABELS)];
  const random = RANDOM_LABELS[activeLanguage(RANDOM_LABELS)];
  const inspectButton = ensureActionButton('inspect', 'wary');
  const failureButton = ensureActionButton('failure', 'success');
  const wrapButton = ensureActionButton('waiting-wrap', 'waiting-spin');
  const waveButton = ensureActionButton('waiting-wave', 'waiting-wrap');
  const bloomButton = ensureActionButton('waiting-bloom', 'waiting-wave');
  // New actions go at the very end of the row, in the order they were added.
  const loveButton = ensureActionButton('love', 'sleep');
  const randomButton = ensureActionButton('random', 'love');
  for (const button of [loveButton, randomButton]) if (button) markAsNew(button);
  if (inspectButton) inspectButton.textContent = inspect.action;
  if (failureButton) failureButton.textContent = failure.action;
  if (loveButton) loveButton.textContent = love.action;
  if (randomButton) randomButton.textContent = random.action;
  if (wrapButton) wrapButton.textContent = WRAP_WAITING_LABELS[activeLanguage(WRAP_WAITING_LABELS)];
  if (waveButton) {
    waveButton.textContent = WAVE_WAITING_LABELS[activeLanguage(WAVE_WAITING_LABELS)];
    markAsNew(waveButton);
  }
  if (bloomButton) {
    bloomButton.textContent = BLOOM_WAITING_LABELS[activeLanguage(BLOOM_WAITING_LABELS)];
    markAsNew(bloomButton);
  }
}

function mountWaitingSync() {
  const face = document.getElementById('face');
  const chat = document.getElementById('chat');
  if (!face || !chat) return;
  const sync = () => {
    const typing = chat.querySelector('.message.agent.typing');
    if (!typing || typing.dataset.avatarWaitingStarted === '1') return;
    typing.dataset.avatarWaitingStarted = '1';
    if (typeof face.startWaiting === 'function') face.startWaiting();
  };
  new MutationObserver(sync).observe(chat, { childList: true, subtree: true });
  sync();
}

function mountStateLabels() {
  const face = document.getElementById('face');
  const status = document.getElementById('status');
  if (!face || !status) return;
  face.addEventListener('face-state', event => {
    if (document.documentElement.dataset.demoIntro) return;
    const state = event.detail?.state;
    if (state === 'inspect') {
      const t = INSPECT_LABELS[activeLanguage(INSPECT_LABELS)];
      status.textContent = `inspect · ${t.state}`;
    } else if (state === 'failure') {
      const t = FAILURE_LABELS[activeLanguage(FAILURE_LABELS)];
      status.textContent = `failure · ${t.state}`;
    } else if (state === 'love') {
      const t = LOVE_LABELS[activeLanguage(LOVE_LABELS)];
      status.textContent = `love · ${t.state}`;
    } else if (state === 'random') {
      const t = RANDOM_LABELS[activeLanguage(RANDOM_LABELS)];
      status.textContent = `random · ${t.state}`;
    } else if (state === 'listening') {
      status.textContent = `listening · ${LISTENING_LABELS[activeLanguage(LISTENING_LABELS)].state}`;
    } else if (state === 'thinking') {
      status.textContent = `thinking · ${THINKING_LABELS[activeLanguage(THINKING_LABELS)].state}`;
    } else if (state === 'speaking') {
      status.textContent = `speaking · ${SPEAKING_LABELS[activeLanguage(SPEAKING_LABELS)].state}`;
    }
  });
}

function mountExtras() {
  syncActionLabels();
  mountWaitingSync();
  mountStateLabels();

  new MutationObserver(() => {
    syncActionLabels();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountExtras, { once: true });
else mountExtras();

export { mountExtras };

