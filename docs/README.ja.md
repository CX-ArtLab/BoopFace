# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace：AI ボット、エージェント、インタラクティブなアプリのための、軽量で表情豊かなロボットアバターコンポーネント">
</p>

**公式サイト：[boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace は、AI ボット、エージェント、インタラクティブなアプリのための、軽量で表情豊かなロボットアバターコンポーネントです。考え中、待機中、完了、エラー。エージェントのあらゆる状態を表情で伝えられます。

AI アシスタントやエージェントの顔と状態表示に使えます。ChatGPT、Claude、Gemini、Grok、DeepSeek のようなチャットアシスタント、Codex、Claude Code、Cursor、Gemini CLI、OpenCode のようなコーディングエージェント、Grok Bot、ChatGPT dots、Meta Muse、OpenClaw、Hermes Agent のようなパーソナルエージェントに向いています。

デスクトップコンパニオン、バーチャルペット、デジタルマスコット、チャットボットのアバターなどのインタラクティブなキャラクターや、AG-UI スタイルのエージェント UI の視覚フィードバック層としても使えます。

SVG と素の JavaScript で作られたネイティブ Web Component で、実行時の依存関係はゼロ、MIT ライセンスです。平面のまま表示することも、本当に回転する [3D ヘッド](#3d-ヘッド--09-の新機能)に切り替えることもできます。188 種類の[スキン](#スキン--07-の新機能)もいつでも着せ替えられます。

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

## 新対応：[BoopFace Embedded](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded：ESP32、STM32、Raspberry Pi Pico の画面や、その他の C++ プログラムで同じ目の表情を使えます。28種類の構成に対応するサンプルファームウェアと、設定を書き出せるシミュレーターを用意しました。"></a>
</p>

ESP32、STM32、Raspberry Pi Pico の画面や、その他の C++ プログラムで同じ目の表情を使えます。28種類の構成に対応するサンプルファームウェアと、設定を書き出せるシミュレーターを用意しました。

## ライブデモ

<h3 align="center">公式サイト</h3>

<p align="center">
  <a href="https://boopface.com/">boopface.com</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Web Component</h3>

0.9 から、デモ、スキン、AI 接続はひとつのページ「Studio」にまとまりました。ステージは平面と 3D を切り替えられ、横ではすべての表情と音声キットを試し、スキンや色を変え、ふるまいを設定し、AI につないだアバターとチャットし、今の見た目のコードをいつでもコピーできます。

<p align="center">
  <a href="https://boopface.com/demo/?lang=ja">Studio を開く</a> · <a href="https://boopface.com/demo/?lang=ja#skins">スキンを選ぶ</a> · <a href="https://boopface.com/demo/?lang=ja#agent">AI 接続を試す</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace インタラクティブアニメーションデモ" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=ja">組み込みシミュレーターを開く</a> （32種類の組み込み画面プリセットをプレビュー）
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 特長

- ネイティブ Web Component
- SVG レンダリング + Vanilla JavaScript
- ランタイム依存なし
- 平面または 3D。3D ヘッドはポインターの方へ本当に回転
- 自動まばたきと控えめな idle 動作
- ポインターを追う目と慣性のある頭の動き。どの表情も頭全体が動く
- おでこをなでると、目を閉じてすり寄る
- ゼリー風の局所ドラッグ変形と弾性復帰
- 長押しによる圧縮と、ドラッグ可能なばね式アンテナ
- Agent の状態や表情をプログラムから制御可能
- 30 以上の表情：waiting、success、failure、affirm、wary、inspect、angry、refuse、love、そして 0.9 で追加されたお辞儀、観察、考える、ウインク、ドヤ顔、目が回る、バウンスなど
- 丸みのある目は好きな色に。背景が透けて見える設定も
- Reduced Motion 対応
- 設定可能なスリープ動作
- 頭部の丸みを調整可能
- 17 シリーズ・188 種類の番号付きスキン。光はポインターを追います
- スキンを含まない軽量版も用意
- `connectAgent()`：AI ストリームのイベントで表情を自動切り替え（AG-UI、OpenAI、Anthropic、Vercel AI SDK）
- 音声対話表情キット：実際の音量に合わせて動く「聞く・考える・話す」の表情セット
- TypeScript 型定義を同梱
- BoopFace Embedded は ESP32、ESP32-S3、STM32、Raspberry Pi Pico の28種類のボード・画面構成で同じ目の表情を再現し、シミュレーターの設定をファームウェア用に書き出せます

## インストール

```bash
npm install boopface
```

```js
import 'boopface';
```

または[最新リリース](https://github.com/CX-ArtLab/boopface/releases/latest)から `boopface-x.y.z.zip` をダウンロードします。中身はコンポーネントだけ（スキンを含む）です。ページと同じ場所に展開してください。

```html
<script type="module" src="./boopface/boopface.js"></script>
```

続いてコンポーネントを追加します。

```html
<boop-face id="avatar"></boop-face>
```

初期化コードは不要です。アバターは自動的にデフォルトの idle 状態になります。

### Agent Robot Avatar からのアップグレード

BoopFace は 0.8 より前は Agent Robot Avatar という名前でした。機能も使い方も変わりません。パッケージ名を `boopface` に変えるだけでアップグレードできます：

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

古いタグ `<agent-robot-avatar>` は 1.0 まで引き続き使えるので、ページを急いで書き換える必要はありません。古い npm パッケージ `agent-robot-avatar` は今後更新されず、新しいバージョンは `boopface` としてのみ公開されます。

### 軽量版

スキンを使わないページでは `boopface/lite` を使えます。アバターとすべての表情は同じで、スキンのコードだけを含みません：

```js
import 'boopface/lite';
```

軽量版では `skin` 属性は無視され、スキンにはフル版が必要だとコンソールに表示されます。

サイズ比較（ネットワーク転送量、gzip 圧縮後）：

| 版 | サイズ |
| --- | --- |
| 軽量版 `boopface/lite` | 約 92 KB |
| フル版、ページでスキンを使わない | 約 104 KB。スキンの描画コードはダウンロードされません |
| フル版、スキンを使う | 約 161 KB。増えた分は最初にスキンを使ったときにダウンロードされます |

どちらのビルドも 3D に切り替えると、3D 描画用に約 19 KB を追加で読み込みます。

## 基本的な使い方

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

利用可能なアクション：

| アクション | 見た目 | 使う場面 |
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

待機系のアクションは `play()` で 1 回再生されます。`startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` は、別のアクションを再生するか `stopWaiting()` を呼ぶまでループします。

0.5 の旧名（`send`、`warning`、`error`、`blocked`、`slot` など）は 1.0 まで使えますが、コンソールに名前変更の通知が出ます。[移行表](../CHANGELOG.md#upgrading-from-05x)を参照してください。

典型的な Agent リクエストの流れ：

```js
avatar.startWaiting();

// 2 つ目の待機動作：目が片側へ抜け、反対側から戻ります。
avatar.startWaiting({ variant: 'wrap' });

// 3 つ目の待機モーション：時間差で上下する目の波。
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## よく使うオプション

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
| `size` | アバターのサイズ（px） |
| `view` | `2d`（既定、平面）または `3d` |
| `color` | アバターのメインカラー |
| `eye-color` | 目の色。`transparent` で目から背景が透けて見える |
| `eye-style` | 既定は丸みのある目。`sharp` で以前の直線的な切り口に戻す |
| `auto-sleep` | 自動スリープまでの待機時間。`0` で無効 |
| `wake-on` | 自動ウェイク方針：`activity`、`interaction`、`manual` |
| `motion` | モーション方針：`auto`、`reduce`、`full` |
| `press-squeeze` | 中央を長押しして圧縮。`false` で無効化 |
| `antenna` | `false` でアンテナの玉を隠す |
| `antenna-drag` | アンテナを引っぱり、ばねで戻って目が回るリアクション。`false` で無効 |
| `idle-gaze` | 待機中にときどき目がきょろきょろする。`false` で正面を見たまま |
| `skin` | スキン番号（例：`301`）。省略すると単色 |

よく使うランタイム制御：

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // なでる操作をオフ
```

アバターの中央を押すとつぶす操作が始まります。4 CSS ピクセル以上動くと、同じポインター操作が従来の頭のドラッグに切り替わります。アンテナのドラッグは頭のドラッグと同じ距離制限を使い、戻ったあとは目が回る表情になります。

## 3D ヘッド · 0.9 の新機能

```html
<boop-face view="3d"></boop-face>
```

`view="3d"`（または `avatar.setView('3d')`）でアバターが厚みのある立体の頭になります。ポインターの方へ本当に回転し、顔は曲面で、回るたびに少し弾んでから止まります。すべての表情、ジェスチャー、スキン、色は 3D でもそのまま使えます。`view="2d"` で平面に戻ります。3D 描画のコードは初めて 3D に切り替えたときに読み込まれるので、平面だけのページでは読み込まれません。

**どの表情も頭が動く。** 目の向きに合わせて頭が回り、うなずき、傾き、跳ねます。3D では本当に回転し、平面では回転した姿を描きます。`motion="reduce"` のときは動きません。

**丸みのある目。** まぶたが目を切る部分の角が丸くなり、睡眠・細目・まばたき・入力カーソルなどの細いすき間は両端が半円になりました。以前の直線的な切り口は `eye-style="sharp"` で使えます。

**目の色。** `eye-color="#2bd67b"`（または `setEyeColor()`）で目に色を付けられます。単色のアバターと、目が単色の 131 種類のスキンで使えます。残り 57 種類のスキンは目に独自の質感（立体、ガラス、模様）があり、そのまま保たれます。どれが変えられるかは `SKINS[番号].eyeColor` で分かります。`eye-color="transparent"` は目を頭からくり抜き、アバターの後ろにあるものが目から見えるようにします。質感のある目も含め、すべてのスキンで使えます。

**なでる。** おでこを何回かなでると、アバターは目を閉じてすり寄ってきます。既定でオン、`setPetting(false)` でオフにできます。

## スキン · 0.7 の新機能

17 シリーズ・188 種類のスキン。光はポインターを追いかけます。各スキンの番号は固定です：シリーズ番号のあとに 2 桁が続き、305 はシリーズ 3 の 5 番目です。名前は今後変わることがありますが、番号は変わらず、再利用もされません。

スキンもすべて純粋な SVG で描かれており、画像・Canvas・WebGL は使っていません。全スキン合わせても通信量は約 70 KB（非圧縮で約 290 KB）で、その大部分はページがスキンを使うときにだけ読み込まれます。比較として、アバター本体（スキンを含まない lite 版）は約 92 KB です。

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="BoopFace スキンギャラリー：おすすめ、絞り込み、検索" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // '102' でも可
avatar.setSkin(null); // 単色に戻す
```

すべてのスキンと番号は [Studio のスキンタブ](https://boopface.com/demo/?lang=ja#skins)で見られます。

| シリーズ | 番号 | シリーズ | 番号 | シリーズ | 番号 |
| --- | --- | --- | --- | --- | --- |
| グレーズ | 101–106 | アイスガラス | 201–206 | グミ | 301–312 |
| キャンディガラス | 401–406 | アクリル | 501–512 | ゼリー | 601–612 |
| グラデーション | 701–712 | すりガラス | 801–806 | メタル | 901–930 |
| 宝石と陶磁器 | 1001–1012 | 木 | 1101–1106 | ボール | 1201–1210 |
| 透明・きらめき | 1301–1305 | 布と革 | 1401–1412 | スイーツとフルーツ | 1501–1512 |
| 自然 | 1601–1612 | 柄とテック | 1701–1717 |  |  |

スキンの描画コードは初めてスキンを使うときに読み込まれ、スキンを使わないページでは読み込まれません。`await loadSkins()` で事前に読み込めます。`SKINS` は各スキンの中国語・英語名と色、`SKIN_SERIES` はシリーズ、`SKIN_NAMES` は全番号です。

すべての表情とジェスチャーはスキンと一緒に使えます。スキンを外すと `color` 属性が再び適用されます。

## AI ストリームと接続 · 0.9 の新機能

`connectAgent()` を使うと、AI のストリームがそのままアバターを動かします。AI SDK が返すイベントを渡すだけで、考え中・ツール使用・返信中・完了・失敗・拒否をアバターが自分で表現します。

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // 返信はいつも通り表示
}
```

`track()` は各項目をそのまま通します。ストリームが正常に終われば完了、エラーが投げられれば失敗、中断や途中の `break` はキャンセルとして扱います。`agent.handle(event)` で 1 件ずつ渡すことも、`agent.handle('thinking')` のように状態名を直接渡すこともできます。

AG-UI イベント、OpenAI Responses・Realtime・Chat Completions のストリーム、Anthropic Messages のストリーム、Vercel AI SDK のストリームパーツ、`useChat` の状態（`submitted`、`streaming`、`ready`、`error`）に対応しています。認識できないものは無視されます。

| 状態 | 既定の表情 | いつ |
| --- | --- | --- |
| `listening` | `listening`、ループ | 音声会話：ユーザーが話している |
| `thinking` | `waiting-spin`、ループ | リクエスト送信済み、モデルが考え中 |
| `tool` | `waiting-wave`、ループ | ツールを実行中 |
| `replying` | `idle` | 返信テキストが届いている |
| `speaking` | `speaking`、ループ | 音声会話：AI の返答を再生中 |
| `approval` | `wary` | ユーザーの確認が必要 |
| `done` | `success` | 完了 |
| `error` | `failure` | 失敗 |
| `refused` | `refuse` | モデルが回答を拒否 |
| `cancelled` | `idle` | ユーザーが停止 |
| `typing` | `input` | ユーザーが入力中。`handle('typing')` で設定 |
| `idle` | `idle` | 何も実行していない |

どの状態も、アクション名、関数、または何も表示しない `null` に置き換えられます。

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

[Studio](https://boopface.com/demo/?lang=ja#agent) では AI につないだアバターとチャットでき、「コード › AI に接続」で状態ごとの表情を選び、各形式の接続コードを確認できます。

## 音声対話表情キット · 0.9 の新機能

聞く、考える、話す。どの音声アシスタントも毎回この 3 ステップを踏みます。音声対話表情キットは、なめらかにつながる 3 つの表情をアバターに用意します。話しかけて使う製品ならどの音声サービスでも使えます。3 つのメソッドを自分で呼ぶことも、`connectAgent()` に音声 API を追わせることもできます。

```js
avatar.startListening();                   // ユーザーが話している
avatar.startWaiting({ variant: 'bloom' }); // AI が考えている
avatar.startSpeaking();                    // AI が答えている
avatar.setVoiceLevel(0.6);                 // 任意：音量 0〜1
```

聞くときは両目がひとつの丸い目に合わさり、ユーザーの声に合わせてふくらみます。考えるときは交差した 2 つの楕円になり、ゆっくり回る花のように呼吸します。話すときは 2 つの目に戻って一度静止し、返答に合わせて伸び縮みします。低い音は左目、高い音は右目を動かします。音量は `setVoiceLevel(level)` または `setVoiceLevel([low, high])` で渡します。渡さない場合、話す表情は独自のリズムで動き、聞く表情はじっとしています。各ステップは次のステップまでループし、切り替えでは目が飛ばずに変形します。

「考える」は待機の一種です。ブルーム（`variant: 'bloom'`）とクロス（`variant: 'cross'`）は「聞く」の丸い目からそのまま変形し、ほかの待機スタイルも使えます。

`connectAgent()` は表情を自動で切り替えることもできます。OpenAI Realtime や、ElevenLabs などの SDK が返す `mode` といった、よく使われる音声 API のイベントをすでに理解しています。考えている間はブルームで待機し（`actions.thinking` でほかのスタイルにも変更可能）、返答のたびに「聞く」へ戻ります。OpenAI Realtime の例：

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` は MediaStream や `<audio>` 要素を受け取り、その音量を目に伝えます。返答の音声をつなぐと、再生が終わったこともアバターが自分で判断します。

## React と Vue

`<boop-face>` は標準の Web Component なので、どのフレームワークでも使えます。

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

Next.js では、ファイルに `'use client'` を付けてください。

**Vue 3**

`vite.config.js` で、`boop-face` がカスタム要素であることを Vue に伝えます。

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

ビルドなしでそのまま動くページ：[`examples/react.html`](../examples/react.html) と [`examples/vue.html`](../examples/vue.html)。

## イベントと統合

コンポーネントは視覚状態の変化を `face-state`、意味的なアクションライフサイクルの変化を `action-state` で通知します。

ホストアプリとの統合やアクセシビリティ向けステータステキストには `action-state` を推奨します。実行可能なリクエストライフサイクル例は [`examples/accessibility.html`](../examples/accessibility.html) を参照してください。

最小構成の統合例は [`examples/basic.html`](../examples/basic.html) にあります。

## 互換性

ES Modules、Custom Elements、SVG、Pointer Events、Web Animations API、`IntersectionObserver`、`ResizeObserver`、`matchMedia` をサポートするモダンブラウザ向けです。

自動ブラウザテストは Chromium、Firefox、WebKit を対象にしています。

<a id="boopface-embedded"></a>

## 新対応：BoopFace Embedded

Web版の目の表情を、ロボットや開発ボードの画面でも使えます。小さなC++11エンジンが動きとタイミングを再現します。ESP32、ESP32-S3、STM32、Raspberry Pi Pico の28構成に対応し、円形・長方形TFT、横長画面、AMOLED、単色OLEDをカバー。画面サイズも指定できます。0.2 では Web 版 0.9 に追いつき、同じ丸みのある目と、お辞儀・観察・考える・ウインク・ドヤ顔・目が回る・バウンスなど 13 の新しい表情、さらに音声キットの「聞く」と「話す」を加えて全 33 種類になりました。

| 使用する機器 | 選ぶバージョン |
| --- | --- |
| Web、アプリ、Androidタブレット、ブラウザー搭載ロボット | Webコンポーネント：全身のアバター、スキン、操作 |
| ESP32、STM32、Raspberry Pi Pico | 組み込みエンジンとサンプルファームウェア |
| その他のマイコン・C++プログラム | C++ライブラリ。画面ドライバーは自分で接続 |


<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded シミュレーター：円形TFTの目の表情、配置、色、設定の書き出し" width="100%">

**ボードなしでも試せます。** [シミュレーター](https://boopface.com/hardware/?lang=ja)は同じC++エンジンをブラウザーで動かし、32種類の画面を再現します。表示の確認やモジュールの比較に使えます。

**調整して、書き出して、ビルド。** 画面、配置、色、フレームレートを選び、**設定を書き出す**を押します。`eyes_settings.h` をサンプルの `main.cpp` と同じ場所に保存してビルドします。[手順](../embedded/README.md)をご覧ください。画面と書き出すコメントは選んだ言語に切り替わります。

**ZIPからインストール。** [組み込み版リリース](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)から `BoopFace-Embedded-0.2.0.zip` を取得し、Arduino IDE の **スケッチ → ライブラリをインクルード → .ZIP形式のライブラリをインストール**で追加します。Arduino Library Manager のインデックス更新は保留中のため、当面はZIPかソースを使ってください。[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) では、`platformio.ini` の環境設定に次の依存関係を追加します。

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**自分のプログラムから**名前で表情を再生できます：

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160、1ピクセルあたり1ビット

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // eyes.data() を画面ドライバーに送ります。
  }
}

// 必要なときに
// eyes.play("success", millis());
```

実験版：全構成をCIでコンパイルしていますが、実機では未確認です。試した場合は[実機レポート](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml)をお寄せください。APIと配線は[組み込み版ガイド](../embedded/README.md)に記載しています。

## BoopFace で作られた作品

BoopFace で作った作品をこの一覧に載せて、もっと多くの人に見てもらいませんか？ 作品の応募はこちらのフォームからどうぞ。 https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml

[コミュニティの作品を見る](../SHOWCASE.md)

## コントリビューション

Issue と Pull Request を歓迎します。変更を送る前に [`CONTRIBUTING.md`](../CONTRIBUTING.md) を確認してください。

## プロジェクト状況

**現在の公開バージョン：v0.9.0**\
BoopFace Embedded：v0.2.0（実験版）

公開 API は、将来の `1.0.0` における安定性コミットメントに向けて、意図的にコンパクトなまま慎重に進化させています。

BoopFace は独立して開発されたプロジェクトであり、いかなる AI プラットフォームやブランドとも提携・承認・公式な関係はありません。

## キャラクターデザインとビジュアルアイデンティティ

BoopFace のキャラクター、ロボットの外観、ビジュアルアイデンティティは CX ArtLab によるオリジナルデザインです。

MIT License はソフトウェアとソースコードに適用されます。アプリケーションの一部としてアバターを使用・変更・配布できますが、BoopFace の名称、キャラクターアイデンティティ、ビジュアルアイデンティティの所有権を移転するものではなく、他者のオリジナルキャラクターや独立ブランドとして提示する権利を付与するものでもありません。

本プロジェクト内で言及する第三者製品名は、想定される使用例を説明するためのものであり、提携や承認を示すものではありません。

## ライセンス

MIT License。詳しくは [`LICENSE`](../LICENSE) を参照してください。

---

このプロジェクトが役に立ったら、コーヒーを一杯ごちそうしていただけます。

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
