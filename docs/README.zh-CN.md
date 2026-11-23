# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace：轻量、富表现力的机器人头像组件，适用于 AI 机器人、智能体与交互式应用">
</p>

**官方网站：[boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace 是一个轻量、富表现力的机器人头像组件，适用于 AI 机器人、智能体与交互式应用。思考、等待、完成、出错，智能体的每个状态都能用一个表情说出来。

适合作为 AI 助手和智能体的形象与状态反馈：类似 ChatGPT、Claude、Gemini、Grok、DeepSeek 的对话助手，类似 Codex、Claude Code、Cursor、Gemini CLI、OpenCode 的编程智能体，以及类似 Grok Bot、ChatGPT dots、Meta Muse、OpenClaw、Hermes Agent 的常驻智能体。

也可用于桌面伙伴、虚拟宠物、数字吉祥物、聊天机器人头像等交互角色，或作为 AG-UI 风格 Agent 界面的视觉反馈层。

使用 SVG 与原生 JavaScript 构建，是一个原生 Web Component，运行时零依赖，MIT 开源。可以平面显示，也可以切换成会真正转动的[立体 3D 头像](#立体-3d-头像--09-新增)；另有 188 款[皮肤](#皮肤--07-新功能)可以随时换上。

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace 交互动画演示" width="560">
</p>

## 新支持：[BoopFace Embedded 嵌入式设备版](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded 嵌入式设备版：小巧的 C++ 表情引擎，保留网页版的全部表情、动作和节奏；现成固件支持 ESP32、ESP32-S3、STM32 和树莓派 Pico 上的 28 种开发板与屏幕组合"></a>
</p>

用于 ESP32、STM32、树莓派 Pico 等开发板的屏幕，也可以编译进其他 C++ 程序。\
在桌面小型机器人或各种嵌入式设备上，显示与网页版相同的眼睛表情。\
提供固件示例，以及一个支持多种流行开发板和屏幕的在线模拟器，调好后可直接导出设置用于编译。

## 在线 Demo

0.9 起，演示、皮肤和接入 AI 合并成一个页面：Studio。舞台可以切换平面或立体，旁边能试所有表情和语音套件、换皮肤和颜色、调整行为设置、和接入了 AI 的头像聊天，并随时复制当前效果的代码。

[打开 Studio](https://cx-artlab.github.io/BoopFace/?lang=zh-CN) · [挑选皮肤](https://cx-artlab.github.io/BoopFace/?lang=zh-CN#skins) · [试试接入 AI](https://cx-artlab.github.io/BoopFace/?lang=zh-CN#agent)\
[打开嵌入式设备模拟器](https://cx-artlab.github.io/BoopFace/hardware/?lang=zh-CN)（可预览 32 种常用嵌入式设备屏幕）

## 特点

- 原生 Web Component
- SVG 渲染 + 原生 JavaScript
- 运行时零依赖
- 平面或立体 3D 两种显示，3D 头像会真正转向指针
- 自动眨眼与轻微待机动作
- 眼睛跟随指针与头部惯性运动；每个表情都带着整个头一起动
- 抚摸额头，头像会闭上眼睛蹭过来
- 果冻式局部拖拽形变与弹性恢复
- 按住挤压与可拖动的弹簧天线交互
- 可通过程序控制 Agent 状态与表情
- 30 多个表情：waiting、success、failure、affirm、wary、inspect、angry、refuse、love，以及 0.9 新增的鞠躬、观察、思考、眨眼、得意、眩晕、弹跳等
- 圆角眼睛，可自选眼睛颜色，也可以让眼睛透出背景
- 支持减少动态效果
- 可配置自动睡眠行为
- 可调头部圆角
- 188 款编号皮肤，分 17 个系列，光线跟随鼠标
- 不含皮肤的精简版，适合对大小特别在意的页面
- `connectAgent()`：AI 数据流的事件直接驱动表情（AG-UI、OpenAI、Anthropic、Vercel AI SDK）
- 语音交互表情套件：聆听、思考、说话一组三个表情，跟着真实的音量动
- 内置 TypeScript 类型声明
- BoopFace Embedded 嵌入式设备版：同样的表情跑在 28 种 ESP32、STM32 和树莓派 Pico 开发板与屏幕组合上，在线模拟器里调好后直接导出到固件

## 安装

```bash
npm install boopface
```

```js
import 'boopface';
```

也可以从[最新发布](https://github.com/CX-ArtLab/boopface/releases/latest)下载 `boopface-x.y.z.zip`，里面只有组件本身（含皮肤），解压到网页旁边即可：

```html
<script type="module" src="./boopface/boopface.js"></script>
```

然后添加组件：

```html
<boop-face id="avatar"></boop-face>
```

无需初始化代码，头像会自动进入默认待机状态。

### 从 Agent Robot Avatar 升级

BoopFace 原名 Agent Robot Avatar，0.8 版起改名，功能和用法都没有变。升级只需把包名换成 `boopface`：

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

旧标签 `<agent-robot-avatar>` 在 1.0 之前仍然可以使用，不用急着改页面。旧的 npm 包 `agent-robot-avatar` 不再更新，以后的新版本只发布在 `boopface`。

### 精简版

如果页面完全用不到皮肤，可以改用 `boopface/lite`，头像和所有表情都一样，只是不含任何皮肤代码：

```js
import 'boopface/lite';
```

精简版会忽略 `skin` 属性，并在控制台提示：皮肤需要使用完整版。

大小对比（网络传输大小，gzip 压缩后）：

| 版本 | 大小 |
| --- | --- |
| 精简版 `boopface/lite` | 约 89 KB |
| 完整版，页面没用皮肤 | 约 102 KB，皮肤绘制代码不会下载 |
| 完整版，用到皮肤 | 约 158 KB，多出的部分在第一次用到皮肤时才下载 |

两个版本切到 3D 时都会再下载约 19 KB 的立体渲染代码。

## 基础用法

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

可用动作：

| 动作 | 样子 | 适合的场景 |
| --- | --- | --- |
| `idle` | 眨眼、四处看看 | 默认状态 |
| `bored` | 慢慢往两边张望 | 一段时间没有动静 |
| `waiting-spin` | 双眼左右绕圈 | 等待回复（默认） |
| `waiting-wrap` | 双眼从一侧转出、另一侧回来 | 等待回复 |
| `waiting-wave` | 双眼轮流上下起伏 | 等待回复 |
| `waiting-bloom` | 两个交叉的椭圆像花一样呼吸、转动 | 等待回复；专为语音对话设计 |
| `waiting-cross` | 两个交叉的椭圆停在 × 上，每次转四分之一圈，胖瘦交替 | 等待回复；也适合语音对话 |
| `shape-wait` | 双眼合成一个形状，在圆和圆角方之间转换 | 等待回复 |
| `input` | 双眼变成闪烁的输入光标 | 用户正在输入 |
| `listening` | 两只眼睛合成一个圆，随声音起伏 | 语音对话：用户在说话 |
| `speaking` | 眼睛分回两只，跟着回答伸缩 | 语音对话：AI 在回答 |
| `affirm` | 点头 | 收到、确认 |
| `success` | 开心的笑眼 | 任务完成 |
| `failure` | 低头、眼睛下垂 | 任务或连接失败 |
| `wary` | 侧头、上下打量 | 操作需要用户确认 |
| `inspect` | 眯眼上下扫视 | 检查、审核内容 |
| `observe` | 睁大眼睛凑近，左右上下看一圈 | 仔细查看、读取内容 |
| `think` | 抬眼往上方看，慢慢转向另一边 | 想一想再回答 |
| `ponder` | 低头往下看，左右看看再抬头 | 认真考虑、权衡 |
| `bow` | 深深点一下头，停一下再抬起 | 道谢、致歉、问候 |
| `angry` | 压低眼睛瞪着 | 内容被拦截 |
| `refuse` | 摇头 | 做不到或不愿做 |
| `shake` | 眼睛先转向一边，头跟着转开 | 不认同、不想看 |
| `surprise` | 睁大眼睛 | 出乎意料 |
| `love` | 双眼合成跳动的爱心 | 感谢、喜欢 |
| `wink` | 歪头，眨一只眼 | 打招呼、开玩笑 |
| `smug` | 眯起眼睛，抬头左右看 | 得意、调皮 |
| `bounce` | 像皮球一样连续弹跳 | 开心、庆祝 |
| `smug-bounce` | 笑着弹两下，左右歪头 | 小小的得意 |
| `dizzy` | 双眼反向绕圈，一大一小 | 晕了、信息太多 |
| `random` | 双眼像老虎机一样滚动 | 随机抽取、逗趣 |
| `sleep` | 闭眼睡觉 | 长时间无操作 |
| `wake` | 睁眼醒来 | 重新有动静 |

等待类动作用 `play()` 播放一轮；用 `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` 会一直循环，直到播放其他动作或调用 `stopWaiting()`。

0.5 版的旧名字（`send`、`warning`、`error`、`blocked`、`slot` 等）在 1.0 之前仍可使用，但会在控制台提示改名，详见[升级对照表](../CHANGELOG.md#upgrading-from-05x)。

一个典型的 Agent 请求流程：

```js
avatar.startWaiting();

// 第二种等待：眼睛从一侧转出，再从另一侧转入。
avatar.startWaiting({ variant: 'wrap' });

// 另一种等待动作：双眼错开节奏上下波动。
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## 常用选项

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

| 属性 | 用途 |
| --- | --- |
| `size` | 头像像素尺寸 |
| `view` | `2d`（默认，平面）或 `3d`（立体） |
| `color` | 头像主色 |
| `eye-color` | 眼睛颜色；`transparent` 让眼睛透出背景 |
| `eye-style` | 默认圆角眼睛；设为 `sharp` 恢复直角切口 |
| `auto-sleep` | 自动睡眠前的空闲时间；`0` 为关闭 |
| `wake-on` | 自动唤醒策略：`activity`、`interaction` 或 `manual` |
| `motion` | 动态效果策略：`auto`、`reduce` 或 `full` |
| `press-squeeze` | 按住头像中心进行挤压；设为 `false` 可关闭 |
| `antenna-drag` | 拖动天线、弹簧复原并接愤怒表情；设为 `false` 可关闭 |
| `skin` | 皮肤编号，例如 `301`；不写则为纯色 |

常用运行时控制：

```js
avatar.setPointerFollow(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // 关闭抚摸
```

按住头像中心会开始挤压；移动超过 4 个 CSS 像素后，同一次指针操作会切换为原有的头部拖动。拖动天线沿用头部拖动的距离限制，复原后接原有的愤怒反应。

## 立体 3D 头像 · 0.9 新增

```html
<boop-face view="3d"></boop-face>
```

`view="3d"`（或 `avatar.setView('3d')`）把头像变成有厚度的立体头：会真正转向指针，脸面是弧形的，每次转完还会轻轻弹一下再停稳。所有表情、手势、皮肤和颜色在 3D 下照常使用；`view="2d"` 回到平面。立体渲染的代码在第一次切到 3D 时才下载，只用平面的页面不会加载。

**每个表情都带着头动。** 头会跟着眼睛看的方向转，点头、侧身、跳起来；3D 下是真的转动，平面下画出转动的样子。`motion="reduce"` 时保持不动。

**圆角眼睛。** 眼皮切过眼睛的地方现在是圆角，睡觉、眯眼、眨眼、输入光标这类细缝两头是半圆。想要以前的直角切口，用 `eye-style="sharp"`。

**眼睛颜色。** `eye-color="#2bd67b"`（或 `setEyeColor()`）给眼睛上色。纯色头像和 131 款眼睛是纯色的皮肤都能改；另外 57 款皮肤的眼睛有自己的质感（凸起、玻璃或图案），会保持原样，`SKINS[编号].eyeColor` 可以查到哪款能改。`eye-color="transparent"` 把眼睛从头上镂空，透出头像背后的内容。

**抚摸。** 在额头上来回摸几下，头像会闭上眼睛蹭过来。默认开启，`setPetting(false)` 可关闭。

## 皮肤 · 0.7 新功能

共 188 款皮肤，分 17 个系列，光线会跟随鼠标。每款皮肤都有固定编号：前面是系列号，后两位是系列内序号，例如 305 是第 3 个系列的第 5 款。名字以后可能调整，编号永远不变，也不会重复使用。

所有皮肤仍然是纯 SVG 绘制，没有使用图片、Canvas 或 WebGL。它非常轻：全部皮肤加起来，网络传输只有约 70 KB（不压缩约 290 KB），而且大部分代码只在网页用到皮肤时才会加载。作为对比，头像本身（精简版，不含皮肤）大约 89 KB。

<img src="../assets/readme/skin-gallery.jpg" alt="皮肤美术馆：精选皮肤、分类筛选和搜索" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // 也可以写 '102'
avatar.setSkin(null); // 回到纯色
```

所有皮肤及编号见[全部皮肤页](https://cx-artlab.github.io/BoopFace/materials/?lang=zh-CN)。

| 系列 | 编号 | 系列 | 编号 | 系列 | 编号 |
| --- | --- | --- | --- | --- | --- |
| 彩色玻璃 | 101–106 | 淡彩玻璃 | 201–206 | 软糖 | 301–312 |
| 糖果玻璃 | 401–406 | 亚克力 | 501–512 | 果冻 | 601–612 |
| 渐变 | 701–712 | 磨砂玻璃 | 801–806 | 磨砂金属 | 901–930 |
| 宝石与陶瓷 | 1001–1012 | 木 | 1101–1106 | 球类 | 1201–1210 |
| 透明与流光 | 1301–1305 | 织物与皮革 | 1401–1412 | 甜点与水果 | 1501–1512 |
| 自然 | 1601–1612 | 图案与科技 | 1701–1717 |  |  |

皮肤的绘制代码在第一次用到皮肤时才下载，不用皮肤的页面完全不加载。`await loadSkins()` 可以提前加载。`SKINS` 提供每款皮肤的中英文名称和颜色，`SKIN_SERIES` 提供系列，`SKIN_NAMES` 提供全部编号。

所有表情和手势都能配合皮肤使用。去掉皮肤后，`color` 属性会重新生效。

## 接入 AI 数据流 · 0.9 新增

`connectAgent()` 让 AI 的数据流直接驱动头像。把 AI SDK 本来就给你的事件交给它，头像会自己显示思考、调用工具、回复、完成、失败和拒绝。

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // 照常显示回复
}
```

`track()` 会原样传出每一项。数据流正常结束算完成，抛出错误算失败，中止或提前 `break` 算取消。也可以用 `agent.handle(event)` 一项一项传，或者直接传状态名，比如 `agent.handle('thinking')`。

支持 AG-UI 事件、OpenAI Responses、Realtime 和 Chat Completions 数据流、Anthropic Messages 数据流、Vercel AI SDK 的数据流片段，以及 `useChat` 状态（`submitted`、`streaming`、`ready`、`error`）。认不出的内容会被忽略。

| 状态 | 默认表情 | 什么时候 |
| --- | --- | --- |
| `listening` | `listening`，循环 | 语音对话：用户在说话 |
| `thinking` | `waiting-spin`，循环 | 请求已发出，模型在思考 |
| `tool` | `waiting-wave`，循环 | 正在调用工具 |
| `replying` | `idle` | 回复文字正在到达 |
| `speaking` | `speaking`，循环 | 语音对话：AI 的回答正在播放 |
| `approval` | `wary` | 需要用户确认 |
| `done` | `success` | 完成 |
| `error` | `failure` | 失败 |
| `refused` | `refuse` | 模型拒绝回答 |
| `cancelled` | `idle` | 被用户停止 |
| `typing` | `input` | 用户正在输入，用 `handle('typing')` 设置 |
| `idle` | `idle` | 没有任务 |

每个状态都可以换成别的动作名、一个函数，或者 `null`（什么都不显示）：

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

在 [Studio](https://cx-artlab.github.io/BoopFace/?lang=zh-CN#agent) 里可以和接入了 AI 的头像聊天，在「行为」里给每个状态换表情，在「代码」里看每种格式的接法。

## 语音交互表情套件 · 0.9 新增

聆听、思考、说话：所有语音助手每一轮都会走这三步。语音交互表情套件为头像准备了对应的一组三个表情，前后自然衔接。它适合任何能用声音交流的产品，不限语音服务：可以自己调用这三个方法，也可以让 `connectAgent()` 跟着你的语音接口自动切换。

```js
avatar.startListening();                   // 用户在说话
avatar.startWaiting({ variant: 'bloom' }); // AI 在思考
avatar.startSpeaking();                    // AI 在回答
avatar.setVoiceLevel(0.6);                 // 可选：音量，0 到 1
```

聆听时两只眼睛合成一个圆，随用户的声音一鼓一鼓；思考时变成两个交叉的椭圆，像一朵慢慢转动的花；说话时分回两只眼睛，先停稳，再跟着回答伸缩：低音驱动左眼，高音驱动右眼。用 `setVoiceLevel(level)` 或 `setVoiceLevel([low, high])` 传入音量；不传时，说话会按自己的节奏动，聆听则保持不动。每一步都会循环到下一步开始，步骤之间眼睛会平滑变形，不会跳变。

思考这一步其实是一种等待。绽放（`variant: 'bloom'`）和十字（`variant: 'cross'`）可以直接从聆听的圆变形出来；换成其他任何一种等待样式也可以。

`connectAgent()` 也能自动切换这三个表情。它已经认得常见语音接口的事件，例如 OpenAI Realtime，以及 ElevenLabs 这类 SDK 报告的 `mode`。思考时默认用「绽放」样式等待（也可以用 `actions.thinking` 换成别的样式），每次回答完都会回到聆听。以 OpenAI Realtime 为例：

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` 接收 MediaStream 或 `<audio>` 元素，把它们的音量传给眼睛。接上 AI 的声音后，头像还能自己发现回答已经播完。

## React 和 Vue

`<boop-face>` 是标准的 Web Component，任何框架都能直接用。

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

在 Next.js 里，给文件加上 `'use client'`。

**Vue 3**

先在 `vite.config.js` 里告诉 Vue，`boop-face` 是自定义元素：

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

不需要构建工具、直接打开就能跑的示例：[`examples/react.html`](../examples/react.html) 和 [`examples/vue.html`](../examples/vue.html)。

## 事件与集成

组件通过 `face-state` 报告视觉状态变化，通过 `action-state` 报告语义动作生命周期变化。

宿主应用集成和无障碍状态播报优先使用 `action-state`。可查看 [`examples/accessibility.html`](../examples/accessibility.html) 中的请求生命周期示例。

最小集成示例位于 [`examples/basic.html`](../examples/basic.html)。

## 兼容性

面向支持 ES Modules、Custom Elements、SVG、Pointer Events、Web Animations API、`IntersectionObserver`、`ResizeObserver` 和 `matchMedia` 的现代浏览器。

自动浏览器测试覆盖 Chromium、Firefox 和 WebKit。

<a id="boopface-embedded"></a>

## 新支持：BoopFace Embedded 嵌入式设备版

与网页版相同的表情，现在也可以用在机器人和开发板的屏幕上。一个小巧的 C++ 库移植了网页版的全部表情，动作和节奏都与网页版一致。固件示例支持 28 种开发板和屏幕组合，覆盖 ESP32、ESP32-S3、STM32 和树莓派 Pico：圆形和方形 TFT、长条屏、AMOLED 和单色 OLED，也可以自定义屏幕尺寸。

| 你的设备 | 用哪个 |
| --- | --- |
| 网页、App、安卓平板、带浏览器的机器人 | 网页版（本组件）：完整头像、皮肤和互动 |
| ESP32、STM32、树莓派 Pico 等开发板 | 嵌入式设备版，有固件示例 |
| 其他单片机或 C++ 程序 | 嵌入式设备版的 C++ 库，自己接屏幕驱动 |

<img src="../assets/readme/hardware-preview.jpg" alt="嵌入式设备模拟器：圆形 TFT 模组显示眼睛，旁边是布局、颜色和导出设置" width="100%">

**没有板子也能先预览效果。** [在线模拟器](https://cx-artlab.github.io/BoopFace/hardware/?lang=zh-CN)在浏览器里就能运行同一套 C++ 引擎，模拟 32 种屏幕，你可以大致看到它在真实模组上的样子，选购屏幕时也能拿来参考。

**调好，就能直接用。** 选好你的屏幕，调整布局、颜色和帧率，点「导出设置」。把导出的 `eyes_settings.h` 放进示例固件再编译，板子上显示的就是模拟器里的样子。详见[操作步骤](../embedded/README.zh-CN.md#在模拟器里调好直接用到板子上)。

**安装。** 从[嵌入式发布页](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.1.0)下载 `BoopFace-Embedded-0.1.0.zip`，在 Arduino IDE 里选「项目 → 导入库 → 添加 .ZIP 库」安装。Arduino 库管理器索引仍在更新，目前请使用 ZIP 或源码。[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) 用户可在 `platformio.ini` 的环境配置中添加：

```ini
lib_deps = cxlab/BoopFace@^0.1.0
```

**在你自己的程序里**，按名字播放表情：

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160，每个像素 1 位

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // 把 eyes.data() 发送到屏幕。
  }
}

// 需要时：eyes.play("success", millis());
```

实验版：所有配置都在 CI 中编译通过，但还没有在真实硬件上验证。如果你在实物上运行过，欢迎提交[实机验证报告](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml)。完整说明见[嵌入式设备版说明](../embedded/README.zh-CN.md)。

## 参与贡献

欢迎提交 Issue 和 Pull Request。提交修改前请阅读 [`CONTRIBUTING.md`](../CONTRIBUTING.md)。

## 项目状态

**当前公开版本：v0.9.0**（网页版）\
BoopFace Embedded 嵌入式设备版：v0.1.0（实验版）

公开 API 会在未来 `1.0.0` 稳定性承诺前继续保持精简并谨慎演进。

BoopFace 为独立开发的开源项目，不隶属于、代表或获得任何 AI 平台或品牌的官方背书。

## 角色设计与视觉标识

BoopFace 角色，包括机器人外观与视觉标识，均为 CX ArtLab 的原创设计。

MIT License 适用于软件和源代码，允许在应用中使用、修改和分发该头像，但不会转移 BoopFace 名称、角色身份或视觉标识的所有权，也不授予将其作为其他方原创角色或独立品牌进行展示的权利。

本项目提及的第三方产品名称仅用于说明可能的使用场景，不代表任何关联或官方认可。

## 许可证

MIT License。详见 [`LICENSE`](../LICENSE)。

---

## 请我喝杯咖啡

如果这个项目对你有帮助，也可以请我喝杯咖啡：

| Ko-fi | 支付宝 | 微信支付 |
| --- | --- | --- |
| <a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a> | <img src="../assets/support/alipay.png" alt="支付宝收款码" width="160"> | <img src="../assets/support/wechat-pay.png" alt="微信支付收款码" width="160"> |

