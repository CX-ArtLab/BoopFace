# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace：輕量、富表現力的機器人頭像元件，適用於 AI 機器人、智慧體與互動式應用">
</p>

**官方網站：[boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [簡體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace 是一個輕量、富表現力的機器人頭像元件，適用於 AI 機器人、智慧體與互動式應用。思考、等待、完成、出錯，智慧體的每個狀態都能用一個表情說出來。

適合作為 AI 助手和智慧體的形象與狀態反饋：類似 ChatGPT、Claude、Gemini、Grok、DeepSeek 的對話助手，類似 Codex、Claude Code、Cursor、Gemini CLI、OpenCode 的程式設計智慧體，以及類似 Grok Bot、ChatGPT dots、Meta Muse、OpenClaw、Hermes Agent 的個人智慧體。

也可用於桌面夥伴、虛擬寵物、數字吉祥物、聊天機器人頭像等互動角色，或作為 AG-UI 風格 Agent 介面的視覺反饋層。

使用 SVG 與原生 JavaScript 構建，是一個原生 Web Component，執行時零依賴，MIT 開源。可以平面顯示，也可以切換成會真正轉動的[立體 3D 頭像](#立體-3d-頭像--09-新增)；另有 188 款[皮膚](#皮膚--07-新功能)可以隨時換上。

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

## 新支援：[BoopFace Embedded 嵌入式裝置版](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded 嵌入式設備版：小巧的 C++11 表情引擎，保留網頁版眼部表情的動作和節奏；現成固件支持 ESP32、ESP32-S3、STM32 和樹莓派 Pico 上的 28 種開發板與屏幕組合"></a>
</p>

用於 ESP32、STM32、樹莓派 Pico 等開發板的屏幕，也可以編譯進其他 C++ 程序。在桌面小型機器人或各種嵌入式設備上，顯示與網頁版相同的眼睛表情。提供 28 種開發板與屏幕組合的固件示例，以及一個支持多種流行開發板和屏幕的在線模擬器，調好後可直接導出設置用於編譯。

## 線上 Demo

<h3 align="center">官方網站</h3>

<p align="center">
  <a href="https://boopface.com/">boopface.com</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Web 元件</h3>

0.9 起，演示、皮膚和接入 AI 合併成一個頁面：Studio。舞臺可以切換平面或立體，旁邊能試所有表情和語音套件、換皮膚和顏色、調整行為設定、和接入了 AI 的頭像聊天，並隨時複製當前效果的程式碼。

<p align="center">
  <a href="https://boopface.com/demo/?lang=zh-TW">開啟 Studio</a> · <a href="https://boopface.com/demo/?lang=zh-TW#skins">挑選皮膚</a> · <a href="https://boopface.com/demo/?lang=zh-TW#agent">試試接入 AI</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace 交互動畫演示" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded 嵌入式設備版</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=zh-TW">打開嵌入式設備模擬器</a> （可預覽 32 種嵌入式螢幕預設）
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 特點

- 原生 Web Component
- SVG 渲染 + 原生 JavaScript
- 執行時零依賴
- 平面或立體 3D 兩種顯示，3D 頭像會真正轉向指標
- 自動眨眼與輕微待機動作
- 眼睛跟隨指標與頭部慣性運動；每個表情都帶著整個頭一起動
- 撫摸額頭，頭像會閉上眼睛蹭過來
- 果凍式區域性拖拽形變與彈性恢復
- 按住擠壓與可拖動的彈簧天線互動
- 可透過程式控制 Agent 狀態與表情
- 30 多個表情：waiting、success、failure、affirm、wary、inspect、angry、refuse、love，以及 0.9 新增的鞠躬、觀察、思考、眨眼、得意、眩暈、彈跳等
- 圓角眼睛，可自選眼睛顏色，也可以讓眼睛透出背景
- 支援減少動態效果
- 可配置自動睡眠行為
- 可調頭部圓角
- 188 款編號皮膚，分 17 個系列，光線跟隨滑鼠
- 不含皮膚的精簡版，適合對大小特別在意的頁面
- `connectAgent()`：AI 資料流的事件直接驅動表情（AG-UI、OpenAI、Anthropic、Vercel AI SDK）
- 語音互動表情套件：聆聽、思考、說話一組三個表情，跟著真實的音量動
- 內置 TypeScript 類型聲明
- BoopFace Embedded 嵌入式設備版：同樣的眼部表情跑在 28 種 ESP32、ESP32-S3、STM32 和樹莓派 Pico 開發板與屏幕組合上，在線模擬器裏調好後直接導出到固件

## 安裝

```bash
npm install boopface
```

```js
import 'boopface';
```

也可以從[最新發布](https://github.com/CX-ArtLab/boopface/releases/latest)下載 `boopface-x.y.z.zip`，裡面只有元件本身（含皮膚），解壓到網頁旁邊即可：

```html
<script type="module" src="./boopface/boopface.js"></script>
```

然後新增元件：

```html
<boop-face id="avatar" view="3d"></boop-face>
```

`view="3d"` 就是[官網](https://boopface.com/)和 Studio 裡的立體頭像。不寫這一項是平面頭像：這是預設值，也更輕（立體會多載入約 19 KB）。

無需初始化程式碼，頭像會自動進入預設待機狀態。

### 從 Agent Robot Avatar 升級

BoopFace 原名 Agent Robot Avatar，0.8 版起改名，功能和用法都沒有變。升級只需把包名換成 `boopface`：

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

舊標籤 `<agent-robot-avatar>` 在 1.0 之前仍然可以使用，不用急著改頁面。舊的 npm 包 `agent-robot-avatar` 不再更新，以後的新版本只發布在 `boopface`。

### 精簡版

如果頁面完全用不到皮膚，可以改用 `boopface/lite`，頭像和所有表情都一樣，只是不含任何皮膚程式碼：

```js
import 'boopface/lite';
```

精簡版會忽略 `skin` 屬性，並在控制檯提示：皮膚需要使用完整版。

大小對比（網路傳輸大小，gzip 壓縮後）：

| 版本 | 大小 |
| --- | --- |
| 精簡版 `boopface/lite` | 約 92 KB |
| 完整版，頁面沒用皮膚 | 約 104 KB，皮膚繪製程式碼不會下載 |
| 完整版，用到皮膚 | 約 161 KB，多出的部分在第一次用到皮膚時才下載 |

兩個版本切到 3D 時都會再下載約 19 KB 的立體渲染程式碼。

## 基礎用法

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

可用動作：

| 動作 | 樣子 | 適合的場景 |
| --- | --- | --- |
| `idle` | 眨眼、四處看看 | 預設狀態 |
| `bored` | 慢慢往兩邊張望 | 一段時間沒有動靜 |
| `waiting-spin` | 雙眼左右繞圈 | 等待回覆（預設） |
| `waiting-wrap` | 雙眼從一側轉出、另一側回來 | 等待回覆 |
| `waiting-wave` | 雙眼輪流上下起伏 | 等待回覆 |
| `waiting-bloom` | 兩個交叉的橢圓像花一樣呼吸、轉動 | 等待回覆；專為語音對話設計 |
| `waiting-cross` | 兩個交叉的橢圓停在 × 上，每次轉四分之一圈，胖瘦交替 | 等待回覆；也適合語音對話 |
| `shape-wait` | 雙眼合成一個形狀，在圓和圓角方之間轉換 | 等待回覆 |
| `input` | 雙眼變成閃爍的輸入游標 | 使用者正在輸入 |
| `listening` | 兩隻眼睛合成一個圓，隨聲音起伏 | 語音對話：使用者在說話 |
| `speaking` | 眼睛分回兩隻，跟著回答伸縮 | 語音對話：AI 在回答 |
| `affirm` | 點頭 | 收到、確認 |
| `success` | 開心的笑眼 | 任務完成 |
| `failure` | 低頭、眼睛下垂 | 任務或連線失敗 |
| `wary` | 側頭、上下打量 | 操作需要使用者確認 |
| `inspect` | 眯眼上下掃視 | 檢查、稽覈內容 |
| `observe` | 睜大眼睛湊近，左右上下看一圈 | 仔細檢視、讀取內容 |
| `think` | 抬眼往上方看，慢慢轉向另一邊 | 想一想再回答 |
| `ponder` | 低頭往下看，左右看看再抬頭 | 認真考慮、權衡 |
| `bow` | 深深點一下頭，停一下再抬起 | 道謝、致歉、問候 |
| `angry` | 壓低眼睛瞪著 | 內容被攔截 |
| `refuse` | 搖頭 | 做不到或不願做 |
| `shake` | 眼睛先轉向一邊，頭跟著轉開 | 不認同、不想看 |
| `surprise` | 睜大眼睛 | 出乎意料 |
| `love` | 雙眼合成跳動的愛心 | 感謝、喜歡 |
| `wink` | 歪頭，眨一隻眼 | 打招呼、開玩笑 |
| `smug` | 眯起眼睛，抬頭左右看 | 得意、調皮 |
| `bounce` | 像皮球一樣連續彈跳 | 開心、慶祝 |
| `smug-bounce` | 笑著彈兩下，左右歪頭 | 小小的得意 |
| `dizzy` | 雙眼反向繞圈，一大一小 | 暈了、資訊太多 |
| `random` | 雙眼像老虎機一樣滾動 | 隨機抽取、逗趣 |
| `sleep` | 閉眼睡覺 | 長時間無操作 |
| `wake` | 睜眼醒來 | 重新有動靜 |

等待類動作用 `play()` 播放一輪；用 `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` 會一直迴圈，直到播放其他動作或呼叫 `stopWaiting()`。

0.5 版的舊名字（`send`、`warning`、`error`、`blocked`、`slot` 等）在 1.0 之前仍可使用，但會在控制檯提示改名，詳見[升級對照表](../CHANGELOG.md#upgrading-from-05x)。

一個典型的 Agent 請求流程：

```js
avatar.startWaiting();

// 第二種等待：眼睛從一側轉出，再從另一側轉入。
avatar.startWaiting({ variant: 'wrap' });

// 另一種等待動作：雙眼錯開節奏上下波動。
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## 常用選項

```html
<boop-face
  size="160"
  view="3d"
  color="#08090b"
  eye-color="#2bd67b"
  auto-sleep="30000"
  wake-on="activity"
  motion="auto">
</boop-face>
```

| 屬性 | 用途 |
| --- | --- |
| `size` | 頭像畫素尺寸 |
| `view` | `2d`（預設，平面）或 `3d`（立體） |
| `color` | 頭像主色 |
| `eye-color` | 眼睛顏色；`transparent` 讓眼睛透出背景 |
| `eye-style` | 預設圓角眼睛；設為 `sharp` 恢復直角切口 |
| `auto-sleep` | 自動睡眠前的空閒時間；`0` 為關閉 |
| `wake-on` | 自動喚醒策略：`activity`、`interaction` 或 `manual` |
| `motion` | 動態效果策略：`auto`、`reduce` 或 `full` |
| `press-squeeze` | 按住頭像中心進行擠壓；設為 `false` 可關閉 |
| `antenna` | 設為 `false` 隱藏頭頂的天線球 |
| `antenna-drag` | 拖動天線、彈簧復原並接眩暈表情；設為 `false` 可關閉 |
| `idle-gaze` | 閒置時眼睛不時四處張望；設為 `false` 則始終看著前方 |
| `skin` | 皮膚編號，例如 `301`；不寫則為純色 |

常用執行時控制：

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // 關閉撫摸
```

按住頭像中心會開始擠壓；移動超過 4 個 CSS 畫素後，同一次指標操作會切換為原有的頭部拖動。拖動天線沿用頭部拖動的距離限制，復原後接眩暈表情。

## 立體 3D 頭像 · 0.9 新增

```html
<boop-face view="3d"></boop-face>
```

`view="3d"`（或 `avatar.setView('3d')`）把頭像變成有厚度的立體頭：會真正轉向指標，臉面是弧形的，每次轉完還會輕輕彈一下再停穩。所有表情、手勢、皮膚和顏色在 3D 下照常使用；`view="2d"` 回到平面。立體渲染的程式碼在第一次切到 3D 時才下載，只用平面的頁面不會載入。

**每個表情都帶著頭動。** 頭會跟著眼睛看的方向轉，點頭、側身、跳起來；3D 下是真的轉動，平面下畫出轉動的樣子。`motion="reduce"` 時保持不動。

**圓角眼睛。** 眼皮切過眼睛的地方現在是圓角，睡覺、眯眼、眨眼、輸入游標這類細縫兩頭是半圓。想要以前的直角切口，用 `eye-style="sharp"`。

**眼睛顏色。** `eye-color="#2bd67b"`（或 `setEyeColor()`）給眼睛上色。純色頭像和 131 款眼睛是純色的皮膚都能改；另外 57 款皮膚的眼睛有自己的質感（凸起、玻璃或圖案），會保持原樣，`SKINS[編號].eyeColor` 可以查到哪款能改。`eye-color="transparent"` 把眼睛從頭上鏤空，透出頭像背後的內容，所有皮膚都能用，包括眼睛有質感的。

**撫摸。** 在額頭上來回摸幾下，頭像會閉上眼睛蹭過來。預設開啟，`setPetting(false)` 可關閉。

## 皮膚 · 0.7 新功能

共 188 款皮膚，分 17 個系列，光線會跟隨滑鼠。每款皮膚都有固定編號：前面是系列號，後兩位是系列內序號，例如 305 是第 3 個系列的第 5 款。名字以後可能調整，編號永遠不變，也不會重複使用。

所有皮膚仍然是純 SVG 繪製，沒有使用圖片、Canvas 或 WebGL。它非常輕：全部皮膚加起來，網路傳輸只有約 70 KB（不壓縮約 290 KB），而且大部分程式碼只在網頁用到皮膚時才會載入。作為對比，頭像本身（精簡版，不含皮膚）大約 92 KB。

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="BoopFace 皮膚美術館：精選皮膚、分類篩選和搜索" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // 也可以寫 '102'
avatar.setSkin(null); // 回到純色
```

所有皮膚及編號可以在 [Studio 的皮膚頁](https://boopface.com/demo/?lang=zh-TW#skins)檢視。

| 系列 | 編號 | 系列 | 編號 | 系列 | 編號 |
| --- | --- | --- | --- | --- | --- |
| 彩色玻璃 | 101–106 | 淡彩玻璃 | 201–206 | 軟糖 | 301–312 |
| 糖果玻璃 | 401–406 | 亞克力 | 501–512 | 果凍 | 601–612 |
| 漸變 | 701–712 | 磨砂玻璃 | 801–806 | 磨砂金屬 | 901–930 |
| 寶石與陶瓷 | 1001–1012 | 木 | 1101–1106 | 球類 | 1201–1210 |
| 透明與流光 | 1301–1305 | 織物與皮革 | 1401–1412 | 甜點與水果 | 1501–1512 |
| 自然 | 1601–1612 | 圖案與科技 | 1701–1717 |  |  |

皮膚的繪製程式碼在第一次用到皮膚時才下載，不用皮膚的頁面完全不載入。`await loadSkins()` 可以提前載入。`SKINS` 提供每款皮膚的中英文名稱和顏色，`SKIN_SERIES` 提供系列，`SKIN_NAMES` 提供全部編號。

所有表情和手勢都能配合皮膚使用。去掉皮膚後，`color` 屬性會重新生效。

## 接入 AI 資料流 · 0.9 新增

`connectAgent()` 讓 AI 的資料流直接驅動頭像。把 AI SDK 本來就給你的事件交給它，頭像會自己顯示思考、呼叫工具、回覆、完成、失敗和拒絕。

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // 照常顯示回覆
}
```

`track()` 會原樣傳出每一項。資料流正常結束算完成，丟擲錯誤算失敗，中止或提前 `break` 算取消。也可以用 `agent.handle(event)` 一項一項傳，或者直接傳狀態名，比如 `agent.handle('thinking')`。

支援 AG-UI 事件、OpenAI Responses、Realtime 和 Chat Completions 資料流、Anthropic Messages 資料流、Vercel AI SDK 的資料流片段，以及 `useChat` 狀態（`submitted`、`streaming`、`ready`、`error`）。認不出的內容會被忽略。

| 狀態 | 預設表情 | 什麼時候 |
| --- | --- | --- |
| `listening` | `listening`，迴圈 | 語音對話：使用者在說話 |
| `thinking` | `waiting-spin`，迴圈 | 請求已發出，模型在思考 |
| `tool` | `waiting-wave`，迴圈 | 正在呼叫工具 |
| `replying` | `idle` | 回覆文字正在到達 |
| `speaking` | `speaking`，迴圈 | 語音對話：AI 的回答正在播放 |
| `approval` | `wary` | 需要使用者確認 |
| `done` | `success` | 完成 |
| `error` | `failure` | 失敗 |
| `refused` | `refuse` | 模型拒絕回答 |
| `cancelled` | `idle` | 被使用者停止 |
| `typing` | `input` | 使用者正在輸入，用 `handle('typing')` 設定 |
| `idle` | `idle` | 沒有任務 |

每個狀態都可以換成別的動作名、一個函式，或者 `null`（什麼都不顯示）：

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

在 [Studio](https://boopface.com/demo/?lang=zh-TW#agent) 裡可以和接入了 AI 的頭像聊天；「程式碼 › 接入 AI」裡可以給每個狀態換表情，並看到每種格式的接法。

## 語音互動表情套件 · 0.9 新增

聆聽、思考、說話：所有語音助手每一輪都會走這三步。語音互動表情套件為頭像準備了對應的一組三個表情，前後自然銜接。它適合任何能用聲音交流的產品，不限語音服務：可以自己呼叫這三個方法，也可以讓 `connectAgent()` 跟著你的語音介面自動切換。

```js
avatar.startListening();                   // 使用者在說話
avatar.startWaiting({ variant: 'bloom' }); // AI 在思考
avatar.startSpeaking();                    // AI 在回答
avatar.setVoiceLevel(0.6);                 // 可選：音量，0 到 1
```

聆聽時兩隻眼睛合成一個圓，隨使用者的聲音一鼓一鼓；思考時變成兩個交叉的橢圓，像一朵慢慢轉動的花；說話時分回兩隻眼睛，先停穩，再跟著回答伸縮：低音驅動左眼，高音驅動右眼。用 `setVoiceLevel(level)` 或 `setVoiceLevel([low, high])` 傳入音量；不傳時，說話會按自己的節奏動，聆聽則保持不動。每一步都會迴圈到下一步開始，步驟之間眼睛會平滑變形，不會跳變。

思考這一步其實是一種等待。綻放（`variant: 'bloom'`）和十字（`variant: 'cross'`）可以直接從聆聽的圓變形出來；換成其他任何一種等待樣式也可以。

`connectAgent()` 也能自動切換這三個表情。它已經認得常見語音介面的事件，例如 OpenAI Realtime，以及 ElevenLabs 這類 SDK 報告的 `mode`。思考時預設用「綻放」樣式等待（也可以用 `actions.thinking` 換成別的樣式），每次回答完都會回到聆聽。以 OpenAI Realtime 為例：

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` 接收 MediaStream 或 `<audio>` 元素，把它們的音量傳給眼睛。接上 AI 的聲音後，頭像還能自己發現回答已經播完。

## React 和 Vue

`<boop-face>` 是標準的 Web Component，任何框架都能直接用。

**React 19**

```jsx
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

在 Next.js 裡，給檔案加上 `'use client'`。

**Vue 3**

先在 `vite.config.js` 裡告訴 Vue，`boop-face` 是自定義元素：

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

```vue
<script setup>
import { onMounted, ref } from 'vue';
import { connectAgent } from 'boopface';

const avatar = ref(null);
let agent;
onMounted(() => { agent = connectAgent(avatar.value); });
</script>

<template>
  <boop-face ref="avatar" size="140" />
</template>
```

不需要構建工具、直接開啟就能跑的示例：[`examples/react.html`](../examples/react.html) 和 [`examples/vue.html`](../examples/vue.html)。

## 事件與整合

元件透過 `face-state` 報告視覺狀態變化，透過 `action-state` 報告語義動作生命週期變化。

宿主應用整合和無障礙狀態播報優先使用 `action-state`。可檢視 [`examples/accessibility.html`](../examples/accessibility.html) 中的請求生命週期示例。

最小整合示例位於 [`examples/basic.html`](../examples/basic.html)。

## 相容性

面向支援 ES Modules、Custom Elements、SVG、Pointer Events、Web Animations API、`IntersectionObserver`、`ResizeObserver` 和 `matchMedia` 的現代瀏覽器。

自動瀏覽器測試覆蓋 Chromium、Firefox 和 WebKit。

<a id="boopface-embedded"></a>

## 新支援：BoopFace Embedded 嵌入式裝置版

與網頁版相同的表情，現在也可以用在機器人和開發板的屏幕上。小巧的 C++11 引擎保留了網頁版眼部表情的動作和節奏。0.2 版跟上網頁版 0.9：眼睛同樣是圓角，新增鞠躬、觀察、思考、眨眼、得意、眩暈、彈跳等 13 個表情，以及語音套件的聆聽和說話，共 33 個。固件示例支持 28 種開發板和屏幕組合，覆蓋 ESP32、ESP32-S3、STM32 和樹莓派 Pico：圓形和方形 TFT、長條屏、AMOLED 和單色 OLED，也可以自定義屏幕尺寸。

| 你的裝置 | 用哪個 |
| --- | --- |
| 網頁、App、安卓平板、帶瀏覽器的機器人 | 網頁版（本元件）：完整頭像、皮膚和互動 |
| ESP32、STM32、樹莓派 Pico 等開發板 | 嵌入式裝置版，有韌體示例 |
| 其他微控制器或 C++ 程式 | 嵌入式裝置版的 C++ 庫，自己接螢幕驅動 |

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded 嵌入式設備模擬器：圓形 TFT 模組顯示眼睛，旁邊是佈局、顏色和導出設置" width="100%">

**沒有板子也能先預覽效果。** [在線模擬器](https://boopface.com/hardware/?lang=zh-TW)在瀏覽器裏就能運行同一套 C++ 引擎，模擬 32 種屏幕，你可以大致看到它在真實模組上的樣子，選購屏幕時也能拿來參考。

**調整、匯出、編譯。** 選好你的屏幕，調整佈局、顏色和幀率，點「導出設置」。把匯出的 `eyes_settings.h` 放在示例固件的 `main.cpp` 旁邊，使用這些設定編譯韌體。詳見[操作步驟](../embedded/README.zh-CN.md#在模拟器里调好直接用到板子上)。模擬器介面和匯出的註解會跟隨所選語言。

**安裝。** 從[嵌入式釋出頁](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)下載 `BoopFace-Embedded-0.2.0.zip`，在 Arduino IDE 裡選「專案 → 匯入庫 → 新增 .ZIP 庫」安裝。Arduino 庫管理器索引仍在更新，目前請使用 ZIP 或原始碼。[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) 使用者可在 `platformio.ini` 的環境配置中新增：

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**在你自己的程式裡**，按名字播放表情：

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160，每個畫素 1 位

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // 把 eyes.data() 傳送到螢幕。
  }
}

// 需要時：eyes.play("success", millis());
```

實驗版：所有配置都在 CI 中編譯透過，但還沒有在真實硬體上驗證。如果你在實物上執行過，歡迎提交[實機驗證報告](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml)。完整說明見[嵌入式裝置版說明](../embedded/README.zh-CN.md)。

## BoopFace 作品展示

歡迎把你的作品加入這份名單，讓更多人看見你用 BoopFace 做出的精彩作品。投稿請開啟表單： https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml

[查看社群作品名單](../SHOWCASE.md)

## 參與貢獻

歡迎提交 Issue 和 Pull Request。提交修改前請閱讀 [`CONTRIBUTING.md`](../CONTRIBUTING.md)。

## 專案狀態

**當前公開版本：v0.9.0**（網頁版）\
BoopFace Embedded 嵌入式裝置版：v0.2.0（實驗版）

公開 API 會在未來 `1.0.0` 穩定性承諾前繼續保持精簡併謹慎演進。

BoopFace 為獨立開發的開源專案，不隸屬於、代表或獲得任何 AI 平臺或品牌的官方背書。

## 角色設計與視覺標識

BoopFace 角色，包括機器人外觀與視覺標識，均為 CX ArtLab 的原創設計。

MIT License 適用於軟體和原始碼，允許在應用中使用、修改和分發該頭像，但不會轉移 BoopFace 名稱、角色身份或視覺標識的所有權，也不授予將其作為其他方原創角色或獨立品牌進行展示的權利。

本專案提及的第三方產品名稱僅用於說明可能的使用場景，不代表任何關聯或官方認可。

## 許可證

MIT License。詳見 [`LICENSE`](../LICENSE)。

---

## 請我喝杯咖啡

如果這個專案對你有幫助，也可以請我喝杯咖啡：

| Ko-fi | 支付寶 | 微信支付 |
| --- | --- | --- |
| <a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> | <img src="../assets/support/alipay.png" alt="支付寶收款碼" width="160"> | <img src="../assets/support/wechat-pay.png" alt="微信支付收款碼" width="160"> |

