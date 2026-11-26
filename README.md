# BoopFace

<p align="center">
  <img src="assets/readme/boopface-header.jpg" alt="BoopFace: a lightweight, expressive robot avatar component for AI bots, agents and interactive apps">
</p>

**Official site: [boopface.com](https://boopface.com/)** · **Live demo: [BoopFace Studio](https://boopface.com/demo/?lang=en)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace is a lightweight, expressive robot avatar component for AI bots, agents and interactive apps. Thinking, waiting, done, failed: every state of an agent can be shown with an expression.

It works as the face and status feedback of AI assistants and agents: chat assistants like ChatGPT, Claude and Gemini, coding agents like Codex, Claude Code and Cursor, and all kinds of personal agents. It also fits desktop companions, virtual pets, digital mascots and chatbot avatars.

A native Web Component built with SVG and vanilla JavaScript, zero runtime dependencies, MIT licensed. Show it flat, or switch to a 3D head that really turns; 188 skins are ready to put on.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#quick-start">Quick start</a> · <a href="#expressions">Expressions</a> · <a href="#settings">Settings</a> · <a href="#3d-head-and-eyes">3D head and eyes</a> · <a href="#skins">Skins</a> · <a href="#connect-ai">Connect AI</a> · <a href="#voice-conversations">Voice conversations</a> · <a href="#react-and-vue">React and Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Try it online

<h3 align="center">Official site</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Studio live demo</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=en"><b>Open Studio</b></a> · <a href="https://boopface.com/demo/?lang=en#skins">Pick a skin</a> · <a href="https://boopface.com/demo/?lang=en#agent">Try Connect AI</a>
</p>

<p align="center">
  <img src="assets/demo/boopface-demo.gif" alt="BoopFace interaction demo" width="560">
</p>

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded simulator</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=en"><b>Open the embedded simulator</b></a> (32 board screen presets)
</p>

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## What's new in 0.9

- BoopFace gains depth. [Details](#3d-head-and-eyes)
- 15 new expressions and the voice conversation kit. [Details](#expressions)
- New petting reaction: wiggle the pointer over its forehead. [Details](#3d-head-and-eyes)
- Connect AI updated. [Details](#connect-ai)
- The live demo is rebuilt from scratch: [BoopFace Studio](https://boopface.com/demo/?lang=en)
- Embedded 0.2: the new expressions come to boards too. [Details](#boopface-embedded)

Full details in the [CHANGELOG](CHANGELOG.md).

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace features

- Native Web Component, SVG rendering + vanilla JavaScript, zero runtime dependencies, works with any framework
- An avatar component that shows emotion, with an expression for every kind of state
- 30+ expressions that make it feel alive
- Interactive: the eyes follow the pointer; dragging, squeezing, pressing, pulling the antenna and petting all get a reaction
- Flat or 3D, for different uses, with 188 skins to switch at any time
- Events from AI streams drive the expressions directly (AG-UI, OpenAI, Anthropic, Vercel AI SDK), voice conversations included
- Lightweight: the lite build is about 92 KB
- BoopFace Embedded: the same expressions run on board screens (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Quick start

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

No setup code needed: the avatar blinks and idles on its own. `view="3d"` is the 3D head from the official site; leave it out for the flat avatar (the default, and lighter).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Without npm: download `boopface-x.y.z.zip` from the [latest release](https://github.com/CX-ArtLab/boopface/releases/latest), unzip it next to your page and load it with `<script type="module" src="./boopface/boopface.js"></script>`.

**Size** (transfer size, gzip)

| Build | Size |
| --- | --- |
| Lite `import 'boopface/lite'`, no skins | about 92 KB |
| Full, page uses no skin | about 104 KB |
| Full, with skins | about 161 KB (skin code loads the first time a skin is used) |

Switching to 3D downloads about 19 KB more.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Expressions

```js
avatar.play('success');   // play once
avatar.startWaiting();    // keep waiting until stopWaiting() or another expression
avatar.reset();           // back to idle
```

| Action | Looks like | Good for |
| --- | --- | --- |
| `idle` | Blinks and glances around | Default state |
| `bored` | Glances slowly from side to side | Nothing has happened for a while |
| `waiting-spin` | Eyes circle from side to side | Waiting for a reply (default) |
| `waiting-wrap` | Eyes slide out one side and back in the other | Waiting for a reply |
| `waiting-wave` | Eyes bob up and down in turn | Waiting for a reply |
| `waiting-bloom` | Two crossed ovals breathe and turn like a slow flower | Waiting for a reply; made for voice conversations |
| `waiting-cross` | Two crossed ovals rest on the ×, turn a quarter at a time and swap slim and full | Waiting for a reply; also suits voice conversations |
| `shape-wait` | The eyes merge into one shape that changes between a circle and a rounded square | Waiting for a reply |
| `input` | Eyes become blinking text cursors | The user is typing |
| `listening` | Both eyes merge into one round eye that swells with the voice | Voice: the user is speaking |
| `speaking` | The eyes split back and stretch with the reply | Voice: the AI is answering |
| `affirm` | Nods | Got it, confirmed |
| `success` | Happy, smiling eyes | Task completed |
| `failure` | Head and eyes droop | Task or connection failed |
| `wary` | Turns its head and gives a guarded up-and-down look | An action needs confirmation |
| `inspect` | Narrows its eyes and scans up and down | Checking or reviewing something |
| `observe` | Opens its eyes wide, leans in and looks around | Looking closely, reading something |
| `think` | Looks up and slowly turns to the other side | Thinking before an answer |
| `ponder` | Looks down, glances left and right, then looks up | Weighing something carefully |
| `bow` | A deep nod, a pause, then up again | Thanks, apology, greeting |
| `angry` | Lowered, glaring eyes | Content blocked |
| `refuse` | Shakes its head | Cannot or will not do the request |
| `shake` | The eyes turn away first and the head follows | Disagreeing, not wanting to look |
| `surprise` | Wide-open eyes | Something unexpected |
| `love` | Eyes merge into a beating heart | Thanks, affection |
| `wink` | Tilts its head and winks | Saying hi, joking |
| `smug` | Narrows its eyes, looks up and from side to side | Pleased with itself, playful |
| `bounce` | Bounces like a ball | Happy, celebrating |
| `smug-bounce` | Two smiling hops, tilting left and right | A little proud |
| `dizzy` | The eyes circle in opposite directions, one big, one small | Dizzy, too much information |
| `random` | Eyes spin like slot-machine reels | Random pick, playful moment |
| `sleep` | Closes its eyes and sleeps | No activity for a long time |
| `wake` | Opens its eyes and wakes up | Activity resumes |

Waiting styles: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. The old 0.5 action names still work until 1.0, see the [upgrade table](CHANGELOG.md#upgrading-from-05x).

A typical request:

```js
avatar.startWaiting();
try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch {
  await avatar.play('failure');
}
```

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Settings

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Attribute | Purpose | Runtime method |
| --- | --- | --- |
| `size` | Avatar size in pixels |  |
| `view` | `2d` (default, flat) or `3d` | `setView()` |
| `color` | Main avatar color |  |
| `eye-color` | Eye colour; `transparent` lets the background show through the eyes | `setEyeColor()` |
| `eye-style` | Rounded eyes by default; `sharp` brings back the straight cuts |  |
| `skin` | Skin number, such as `301`; leave it out for the flat color | `setSkin()` |
| `auto-sleep` | Idle time before automatic sleep; `0` disables it |  |
| `wake-on` | Automatic wake policy: `activity`, `interaction`, or `manual` |  |
| `motion` | Motion policy: `auto`, `reduce`, or `full` |  |
| `idle-gaze` | While idle the eyes glance around now and then; `false` keeps them looking ahead | `setIdleGaze()` |
| `petting` | Stroke the forehead a few times and the avatar closes its eyes and nuzzles in; `false` turns it off | `setPetting()` |
| `press-squeeze` | Center press-and-hold squeeze; set to `false` to disable | `setPressSqueeze()` |
| `antenna` | `false` hides the antenna ball |  |
| `antenna-drag` | Antenna drag, spring return, and a dizzy reaction; set to `false` to disable | `setAntennaDrag()` |

Other methods: `setPointerFollow(false)` stops following the pointer, `setHeadRoundness(75)` sets the head roundness.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 3D head and eyes

- **3D**: `view="3d"` gives the head depth and a curved face; it really turns toward the pointer and settles with a small bounce. All expressions, skins and colours work as usual. The 3D code loads the first time 3D is turned on.
- **Expressions move the head**: the head turns with the eyes, nods and jumps. With `motion="reduce"` it stays still.
- **Rounded eyes**: slits such as a squint or a blink have round ends; `eye-style="sharp"` brings back square cuts.
- **Eye colour**: `eye-color` works on the plain avatar and 131 skins; the other 57 skins keep their textured eyes (see `SKINS[id].eyeColor`). `transparent` works on every skin.
- **Interaction**: the eyes follow the pointer; dragging the head wobbles it like jelly; pressing the centre squeezes it; the antenna can be pulled and springs back; wiggle the pointer over its forehead and it closes its eyes and nuzzles in.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Skins

188 skins in 17 series, lit by the pointer, all pure SVG. Numbers never change: series number first, then two digits for the skin (305 = series 3, skin 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // back to a plain colour
```

<img src="assets/readme/boopface-skin-gallery.jpg" alt="BoopFace skins: featured skins, series filters and search" width="100%">

| Series | Numbers | Series | Numbers | Series | Numbers |
| --- | --- | --- | --- | --- | --- |
| Glaze | 101–106 | Ice glass | 201–206 | Gummy | 301–312 |
| Candy glass | 401–406 | Acrylic | 501–512 | Jelly | 601–612 |
| Gradient | 701–712 | Frosted glass | 801–806 | Metal | 901–930 |
| Gems and ceramics | 1001–1012 | Wood | 1101–1106 | Balls | 1201–1210 |
| Clear and shimmer | 1301–1305 | Fabric and leather | 1401–1412 | Sweets and fruit | 1501–1512 |
| Nature | 1601–1612 | Patterns and tech | 1701–1717 |  |  |

See them all on the [Studio skins page](https://boopface.com/demo/?lang=en#skins). `await loadSkins()` loads them ahead of time; `SKINS`, `SKIN_SERIES` and `SKIN_NAMES` give names, series and numbers.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Connect AI

Hand the stream your AI SDK gives you to `connectAgent()`, and the avatar shows thinking, tool calls, replying, done and errors by itself.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // show the reply as usual
}
```

Supports AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, the Vercel AI SDK and `useChat` status. You can also pass items one by one with `agent.handle(event)`, or a state such as `agent.handle('thinking')`.

| State | Default expression | State | Default expression |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Use other expressions:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

The chat in the [Studio](https://boopface.com/demo/?lang=en#agent) is a local simulation that shows how the avatar changes expression as a reply arrives; no real AI is connected. Real use is the few lines above: hand the stream your AI SDK returns to `connectAgent()`. Code › Connect AI shows how to connect each format.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Voice conversations

Every voice assistant turn is listen, think, speak. BoopFace has a matching set of expressions that flow into each other:

```js
avatar.startListening();                   // the user is speaking
avatar.startWaiting({ variant: 'bloom' }); // the AI is thinking
avatar.startSpeaking();                    // the AI is answering
avatar.setVoiceLevel(0.6);                 // optional: volume 0–1
```

With `connectAgent()` it switches automatically (OpenAI Realtime, ElevenLabs and more). After `connectAudio()` is given the microphone and the reply audio, the eyes move with the real volume:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React and Vue

A standard Web Component, usable in any framework as is.

```jsx
// React 19 (add 'use client' in Next.js)
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3 needs the custom element declared in `vite.config.js`:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Examples that run when opened, no build step: [`react.html`](examples/react.html), [`vue.html`](examples/vue.html), [`basic.html`](examples/basic.html). The component emits `face-state` (what is shown) and `action-state` (actions starting and ending) events; see [`accessibility.html`](examples/accessibility.html) for screen reader announcements. TypeScript types are included.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: the same eye expressions on ESP32, STM32 and Raspberry Pi Pico board screens">
</p>

The same eye expressions on robot and board screens. A small C++11 engine with 33 expressions; firmware examples cover 28 ESP32, ESP32-S3, STM32 and Raspberry Pi Pico board and screen combinations (round and square TFT, bar screens, AMOLED, monochrome OLED).

<img src="assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: eyes on a board screen, expression buttons and the screen list" width="100%">

1. **Preview**: the [online simulator](https://boopface.com/hardware/?lang=en) runs the same engine and simulates 32 screens, so you can see it without a board.
2. **Export**: set the layout, colours and frame rate, open the **Firmware** tab and press **Download file**, then put `eyes_settings.h` in `embedded/examples/arduino/` of the full project (next to `main.cpp`) and build. The Arduino library ZIP does not contain these files; see the [Steps](embedded/README.md#from-the-preview-to-your-board).
3. **Install**: in the Arduino IDE add `BoopFace-Embedded-0.2.0.zip` from the [release page](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0); in PlatformIO use `lib_deps = cxlab/BoopFace@^0.2.0`.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1-bit pixels

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* send eyes.data() to the screen */ } }
// eyes.play("success", millis());
```

Experimental: every configuration builds in CI, but not all have been checked on real hardware. [Hardware reports](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) are welcome. Full guide: [Embedded docs](embedded/README.md).

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## More

- **Upgrading from Agent Robot Avatar**: renamed in 0.8, same usage. Run `npm uninstall agent-robot-avatar && npm install boopface`; the old `<agent-robot-avatar>` tag keeps working until 1.0.
- **Compatibility**: modern browsers with ES Modules, Custom Elements and Web Animations; automated tests cover Chromium, Firefox and WebKit.
- **Version**: **Web v0.9.0**, Embedded v0.2.0 (experimental). Until 1.0 the API changes carefully.
- **Showcase**: [community projects](SHOWCASE.md), [submit yours](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Contributing**: issues and pull requests are welcome; please read [`CONTRIBUTING.md`](CONTRIBUTING.md) first.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## License and character

The code is under the [MIT License](LICENSE): use, change and share it in your apps. The BoopFace character, its look, name and visual identity are original designs by CX ArtLab; the MIT License does not transfer them, and does not allow presenting them as another party's original character or brand.

BoopFace is an independent open-source project, not affiliated with or endorsed by any AI platform or brand; product names are mentioned only to describe use cases.

<p align="center">
  <img src="assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Buy me a coffee

If this project is useful to you, you can buy me a coffee.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
