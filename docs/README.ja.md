# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace：AI ボット、エージェント、インタラクティブなアプリのための軽量で表情豊かなロボットアバターコンポーネント">
</p>

**公式サイト：[boopface.com](https://boopface.com/)** · **オンラインデモ：[BoopFace Studio](https://boopface.com/demo/?lang=ja)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace は、AI ボット、エージェント、インタラクティブなアプリのための軽量で表情豊かなロボットアバターコンポーネントです。考え中、待機、完了、エラー。エージェントのどの状態も表情ひとつで伝えられます。

AI アシスタントやエージェントの顔とステータス表示に使えます。ChatGPT、Claude、Gemini のようなチャットアシスタント、Codex、Claude Code、Cursor のようなコーディングエージェント、さまざまなパーソナルエージェントに。デスクトップの相棒、バーチャルペット、デジタルマスコット、チャットボットのアバターにも向いています。

SVG と素の JavaScript で作られたネイティブ Web Component。ランタイム依存ゼロ、MIT ライセンス。平面表示のほか、本当に向きを変える立体の頭にも切り替えられます。188 種類のスキンもすぐに着せ替えられます。

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#クイックスタート">クイックスタート</a> · <a href="#表情">表情</a> · <a href="#設定">設定</a> · <a href="#立体表示と目">立体表示と目</a> · <a href="#スキン">スキン</a> · <a href="#ai-と接続">AI と接続</a> · <a href="#音声会話">音声会話</a> · <a href="#react-と-vue">React と Vue</a> · <a href="#boopface-embedded">組み込み版</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## オンラインで試す

<h3 align="center">公式サイト</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Studio オンラインデモ</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=ja"><b>Studio を開く</b></a> · <a href="https://boopface.com/demo/?lang=ja#skins">スキンを選ぶ</a> · <a href="https://boopface.com/demo/?lang=ja#agent">AI 接続を試す</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace のインタラクションデモ" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded 組み込み版シミュレーター</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=ja"><b>組み込み版シミュレーターを開く</b></a>（32 種類のボード画面プリセット）
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 0.9 の更新内容

- BoopFace が立体に進化。[詳しく](#立体表示と目)
- 15 の新しい表情と音声会話キット。[詳しく](#表情)
- なでる反応を追加：おでこの上でポインターを小刻みに動かすだけ。[詳しく](#立体表示と目)
- AI 会話の接続を更新。[詳しく](#ai-と接続)
- オンラインデモを全面リニューアル：[BoopFace Studio](https://boopface.com/demo/?lang=ja)
- 組み込み版 0.2：新しい表情に対応。[詳しく](#boopface-embedded)

詳細は [CHANGELOG](../CHANGELOG.md) をご覧ください。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace の特長

- ネイティブ Web Component、SVG 描画 + 素の JavaScript、ランタイム依存ゼロ、どのフレームワークでも使える
- 感情を表現できるアバターコンポーネント。さまざまな状態にそれぞれの表情で応える
- 30 種類以上の表情で、生きているような存在感
- インタラクティブ：目がポインターを追い、ドラッグ、つぶす、押す、アンテナを引く、なでるのすべてに反応
- 平面と立体の 2 スタイルで用途に合わせられ、188 種類のスキンをいつでも着せ替え
- AI ストリームのイベントがそのまま表情を動かす（AG-UI、OpenAI、Anthropic、Vercel AI SDK）。音声会話にも対応
- 軽量：ライト版は約 92 KB
- BoopFace Embedded 組み込み版：同じ表情が開発ボードの画面でも動く（ESP32、STM32、Raspberry Pi Pico）

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## クイックスタート

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

初期化コードは不要で、アバターは自分でまばたきして待機します。`view="3d"` は公式サイトの立体の頭です。書かなければ平面のアバター（既定値で、より軽量）になります。

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

npm を使わない場合：[最新リリース](https://github.com/CX-ArtLab/boopface/releases/latest)から `boopface-x.y.z.zip` をダウンロードし、ページの隣に展開して `<script type="module" src="./boopface/boopface.js"></script>` で読み込みます。

**サイズ**（gzip 後の転送サイズ）

| ビルド | サイズ |
| --- | --- |
| ライト版 `import 'boopface/lite'`、スキンなし | 約 92 KB |
| フル版、ページでスキン未使用 | 約 104 KB |
| フル版、スキン使用 | 約 161 KB（スキンのコードは初めて使うときに読み込み） |

立体に切り替えると、さらに約 19 KB を読み込みます。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 表情

```js
avatar.play('success');   // 1 回再生
avatar.startWaiting();    // stopWaiting() か別の表情まで待機を続ける
avatar.reset();           // 待機に戻る
```

| アクション | 見た目 | 向いている場面 |
| --- | --- | --- |
| `idle` | まばたきし、あたりを見回す | デフォルト状態 |
| `bored` | ゆっくり左右を見る | しばらく何も起きていない |
| `waiting-spin` | 目が左右に回る | 返信待ち（デフォルト） |
| `waiting-wrap` | 目が片側から出て反対側から戻る | 返信待ち |
| `waiting-wave` | 目が交互に上下に揺れる | 返信待ち |
| `waiting-bloom` | 交差した 2 つの楕円が花のように呼吸して回る | 返答待ち。音声会話のために作られた形 |
| `waiting-cross` | 交差した 2 つの楕円が × の形で止まり、4 分の 1 回転ずつ回って細い・太いが入れ替わる | 返信待ち。音声対話にも |
| `shape-wait` | 両目がひとつの形になり、円と角丸の四角に交互に変わる | 返信待ち |
| `input` | 目が点滅する入力カーソルになる | ユーザーが入力中 |
| `listening` | 両目がひとつの丸い目に合わさり、声に合わせてふくらむ | 音声会話：ユーザーが話している |
| `speaking` | 目が 2 つに戻り、返答に合わせて伸び縮みする | 音声会話：AI が答えている |
| `affirm` | うなずく | 了解・確認 |
| `success` | うれしそうな笑顔の目 | タスク完了 |
| `failure` | 頭と目が下がる | タスクや接続の失敗 |
| `wary` | 首をかしげ、上下に見定める | ユーザーの確認が必要な操作 |
| `inspect` | 目を細めて上下にスキャンする | 内容の確認・レビュー |
| `observe` | 目を大きく開き、身を乗り出して見回す | じっくり見る、読み取る |
| `think` | 上を見上げ、ゆっくり反対側へ向く | 答える前に考える |
| `ponder` | 下を向き、左右を見てから顔を上げる | じっくり検討する |
| `bow` | 深くうなずき、少し止まってから戻る | お礼、お詫び、あいさつ |
| `angry` | 目を伏せてにらむ | コンテンツがブロックされた |
| `refuse` | 首を横に振る | できない、またはしない依頼 |
| `shake` | 先に目がそらされ、頭がそれに続く | 同意しない、見たくない |
| `surprise` | 目を大きく見開く | 予想外のこと |
| `love` | 両目が鼓動するハートになる | 感謝・好意 |
| `wink` | 首をかしげてウインク | あいさつ、冗談 |
| `smug` | 目を細め、上と左右を見る | 得意げ、いたずらっぽく |
| `bounce` | ボールのように弾む | うれしい、お祝い |
| `smug-bounce` | 笑顔で 2 回弾み、左右に首をかしげる | ちょっと得意 |
| `dizzy` | 両目が逆向きに回り、片方は大きく片方は小さい | 目が回る、情報が多すぎる |
| `random` | 目がスロットのリールのように回る | ランダムな選択、遊び心 |
| `sleep` | 目を閉じて眠る | 長時間操作がない |
| `wake` | 目を開けて起きる | 操作が再開した |

待機スタイル：`startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`。0.5 の旧アクション名は 1.0 まで使えます。[移行表](../CHANGELOG.md#upgrading-from-05x)をご覧ください。

典型的なリクエストの流れ：

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
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 設定

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| 属性 | 用途 | 実行時メソッド |
| --- | --- | --- |
| `size` | アバターのサイズ（px） |  |
| `view` | `2d`（既定、平面）または `3d` | `setView()` |
| `color` | アバターのメインカラー |  |
| `eye-color` | 目の色。`transparent` で目から背景が透けて見える | `setEyeColor()` |
| `eye-style` | 既定は丸みのある目。`sharp` で以前の直線的な切り口に戻す |  |
| `skin` | スキン番号（例：`301`）。省略すると単色 | `setSkin()` |
| `auto-sleep` | 自動スリープまでの待機時間。`0` で無効 |  |
| `wake-on` | 自動ウェイク方針：`activity`、`interaction`、`manual` |  |
| `motion` | モーション方針：`auto`、`reduce`、`full` |  |
| `idle-gaze` | 待機中にときどき目がきょろきょろする。`false` で正面を見たまま | `setIdleGaze()` |
| `petting` | おでこの上でポインターを何度か往復させると、目を閉じてすり寄ってくる。`false` で無効 | `setPetting()` |
| `press-squeeze` | 中央を長押しして圧縮。`false` で無効化 | `setPressSqueeze()` |
| `antenna` | `false` でアンテナの玉を隠す |  |
| `antenna-drag` | アンテナを引っぱり、ばねで戻って目が回るリアクション。`false` で無効 | `setAntennaDrag()` |

その他のメソッド：`setPointerFollow(false)` でポインター追従をオフ、`setHeadRoundness(75)` で頭の丸みを調整。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 立体表示と目

- **立体**：`view="3d"` で頭に厚みと曲面が生まれ、本当にポインターの方を向き、向き終わると小さく弾んで止まります。すべての表情、スキン、色はそのまま使えます。立体のコードは初めて 3D にしたときに読み込まれます。
- **表情とともに頭が動く**：頭が目と一緒に向きを変え、うなずき、跳ねます。`motion="reduce"` では静止します。
- **丸い目**：細めた目やまばたきなどの細いすき間は両端が丸くなります。`eye-style="sharp"` で直角の切り口に戻ります。
- **目の色**：`eye-color` は単色のアバターと 131 種類のスキンで使えます。残り 57 種類のスキンは質感のある目のままです（`SKINS[番号].eyeColor` で確認できます）。`transparent` はすべてのスキンで使えます。
- **インタラクション**：目がポインターを追います。頭をドラッグするとゼリーのように変形し、中心を押すとつぶれ、アンテナは引っぱると弾んで戻ります。おでこの上でポインターを何度か動かすと、目を閉じてすり寄ってきます。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## スキン

17 シリーズ 188 種類のスキン。光がポインターを追い、すべて純粋な SVG です。番号は永久に変わりません。先頭がシリーズ番号、下 2 桁がシリーズ内の番号です（305 = シリーズ 3 の 5 番目）。

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // 単色に戻す
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="BoopFace のスキン：おすすめ、シリーズ絞り込み、検索" width="100%">

| シリーズ | 番号 | シリーズ | 番号 | シリーズ | 番号 |
| --- | --- | --- | --- | --- | --- |
| グレーズ | 101–106 | アイスガラス | 201–206 | グミ | 301–312 |
| キャンディガラス | 401–406 | アクリル | 501–512 | ゼリー | 601–612 |
| グラデーション | 701–712 | すりガラス | 801–806 | メタル | 901–930 |
| 宝石と陶磁器 | 1001–1012 | 木 | 1101–1106 | ボール | 1201–1210 |
| 透明・きらめき | 1301–1305 | 布と革 | 1401–1412 | スイーツとフルーツ | 1501–1512 |
| 自然 | 1601–1612 | 柄とテック | 1701–1717 |  |  |

すべてのスキンは [Studio のスキンページ](https://boopface.com/demo/?lang=ja#skins)で見られます。`await loadSkins()` で事前に読み込めます。`SKINS`、`SKIN_SERIES`、`SKIN_NAMES` で名前、シリーズ、番号が得られます。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## AI と接続

AI SDK から受け取ったストリームを `connectAgent()` に渡すだけで、考え中、ツール呼び出し、返信、完了、エラーをアバターが自動で表示します。

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // いつも通り返信を表示
}
```

AG-UI、OpenAI（Responses、Realtime、Chat Completions）、Anthropic Messages、Vercel AI SDK、`useChat` の状態に対応。`agent.handle(event)` で 1 件ずつ渡すことも、`agent.handle('thinking')` のように状態を直接渡すこともできます。

| 状態 | 既定の表情 | 状態 | 既定の表情 |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

表情を変える：

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

[Studio](https://boopface.com/demo/?lang=ja#agent) で AI と接続したアバターとチャットし、各形式の接続方法を確認できます。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 音声会話

音声アシスタントの 1 ターンは、聞く、考える、話すの 3 ステップ。BoopFace には自然につながる表情のセットがあります：

```js
avatar.startListening();                   // ユーザーが話している
avatar.startWaiting({ variant: 'bloom' }); // AI が考えている
avatar.startSpeaking();                    // AI が答えている
avatar.setVoiceLevel(0.6);                 // 任意：音量 0–1
```

`connectAgent()` を使うと自動で切り替わります（OpenAI Realtime、ElevenLabs などに対応）。`connectAudio()` にマイクと返答の音声をつなぐと、目が実際の音量に合わせて動きます：

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React と Vue

標準の Web Component なので、どのフレームワークでもそのまま使えます。

```jsx
// React 19（Next.js では 'use client' を追加）
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3 では `vite.config.js` でカスタム要素を宣言します：

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

ビルド不要で開くだけで動くサンプル：[`react.html`](../examples/react.html)、[`vue.html`](../examples/vue.html)、[`basic.html`](../examples/basic.html)。コンポーネントは `face-state`（表示の状態）と `action-state`（アクションの開始と終了）イベントを発行します。スクリーンリーダー向けの例は [`accessibility.html`](../examples/accessibility.html) にあります。TypeScript の型定義を同梱しています。

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded 組み込み版

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded 組み込み版：ESP32、STM32、Raspberry Pi Pico のボード画面で動く同じ目の表情">
</p>

同じ目の表情が、ロボットや開発ボードの画面で動きます。小さな C++11 エンジンで 33 の表情。ファームウェアのサンプルは ESP32、ESP32-S3、STM32、Raspberry Pi Pico の 28 種類のボードと画面の組み合わせに対応（丸型・角型 TFT、横長画面、AMOLED、モノクロ OLED）。

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio：ボード画面上の目、表情ボタン、画面リスト" width="100%">

1. **プレビュー**：[オンラインシミュレーター](https://boopface.com/hardware/?lang=ja)は同じエンジンで 32 種類の画面を再現するので、ボードがなくても確認できます。
2. **書き出し**：レイアウト、色、フレームレートを調整し、「ファームウェア」タブで「ファイルを保存」を押して、`eyes_settings.h` を完全なプロジェクトの `embedded/examples/arduino/`（`main.cpp` の隣）に置いてビルドします。Arduino ライブラリの ZIP にはこれらのファイルは入っていません。[手順](../embedded/README.ja.md#シミュレーターで調整してそのままボードへ)をご覧ください。
3. **インストール**：Arduino IDE では[リリースページ](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)の `BoopFace-Embedded-0.2.0.zip` を追加、PlatformIO では `lib_deps = cxlab/BoopFace@^0.2.0` を使います。

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160、1 ビットのピクセル

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* eyes.data() を画面に送る */ } }
// eyes.play("success", millis());
```

実験版：すべての構成は CI でビルドできますが、実機での確認はまだすべては済んでいません。[実機レポート](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml)を歓迎します。詳しくは[組み込み版ドキュメント](../embedded/README.ja.md)へ。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## その他

- **Agent Robot Avatar からのアップグレード**：0.8 で改名、使い方は同じです。`npm uninstall agent-robot-avatar && npm install boopface` だけで済み、旧タグ `<agent-robot-avatar>` は 1.0 まで使えます。
- **互換性**：ES Modules、Custom Elements、Web Animations に対応したモダンブラウザ。自動テストは Chromium、Firefox、WebKit で実行しています。
- **バージョン**：**Web 版 v0.9.0**、組み込み版 v0.2.0（実験版）。1.0 までは API を慎重に進化させます。
- **作品紹介**：[コミュニティの作品](../SHOWCASE.md)、[作品を投稿する](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml)。
- **コントリビュート**：Issue と Pull Request を歓迎します。まず [`CONTRIBUTING.md`](../CONTRIBUTING.md) をお読みください。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## ライセンスとキャラクター

コードは [MIT License](../LICENSE) で、アプリでの利用、改変、配布ができます。BoopFace のキャラクター、外見、名前、ビジュアルアイデンティティは CX ArtLab のオリジナルデザインです。MIT License はその所有権を移すものではなく、他者のオリジナルキャラクターやブランドとして示す権利も与えません。

BoopFace は独立したオープンソースプロジェクトであり、いかなる AI プラットフォームやブランドとも提携しておらず、公式な承認も受けていません。製品名は利用場面の説明のためにのみ記載しています。

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## コーヒーをごちそうする

このプロジェクトが役に立ったら、コーヒーを一杯ごちそうしていただけます。

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
