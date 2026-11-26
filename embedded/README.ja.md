# BoopFace Embedded 組み込み版

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English・API の完全な説明](README.md) · [メインプロジェクトへ戻る](../docs/README.ja.md)

同じプロジェクトの**実験的なハードウェア実装**です。描くのは目だけで、表情、まばたき、視線、待機、スリープと起床を備えています。どの動作をいつ再生するかはあなたのプログラムが決めます。ドラッグ、つぶし、頭の形、アンテナ、マウスの監視はこの版には含まれません。組み込み版のディレクトリは SVG コンポーネントやデモ画面から独立しており、別々に保守できます。

[オンラインシミュレーター](https://boopface.com/hardware/?lang=ja)は 10 言語に対応し、書き出す設定のコメントも選んだ言語になります。リリースページにはオフラインで開ける単一ファイルの HTML もあります。

## マルチプラットフォーム

表情のコアは独立した C++11 ライブラリで、ESP32、Arduino、ブラウザ、特定の画面ドライバーに依存せず、内部でヒープを確保しません。ESP32 と Raspberry Pi Pico が最初の参照実装で、ほかのマイコンでも表示アダプターを書けば使えます。

| ビルド環境 | ボード | 画面 |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789、240×240、SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789、240×240、SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306、128×64、I²C、アドレス `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306、128×32、I²C、アドレス `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106、128×64、I²C、アドレス `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 丸型、240×240、SPI（配線は `esp32-s3-st7789` と同じ） |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1.69″、240×280、SPI（配線は同上） |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2.0″、240×320、SPI（配線は同上） |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | 内蔵 GC9A01 丸型、配線不要 |
| `cyd-ili9341` | ESP32-2432S028（CYD） | 内蔵 ILI9341、配線不要 |
| `t-display-st7789` | LilyGO T-Display | 内蔵 ST7789 1.14″、横向き |
| `t-display-s3` | LilyGO T-Display-S3 | 内蔵 ST7789 1.9″、8 ビットパラレル、横向き |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | M5Stack 各モデル | 内蔵画面、M5Unified が自動判別 |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1.14″ / 2.0″ 横向き（配線は同上） |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1.8″ / 0.96″（配線は同上） |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3.5″、480×320（配線は同上） |
| `xiao-round-display` | Seeed XIAO ESP32S3 + 丸型拡張ディスプレイ | 差し込むだけ、配線不要 |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | 内蔵画面 |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | 内蔵 AMOLED 丸型 |
| `t-rgb-21` | LilyGO T-RGB 2.1″ | 内蔵 RGB 丸型 |
| `guition-4848s040` | Guition ESP32-4848S040（86 パネル） | 内蔵 RGB 角型 |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE（STM32F411） | ST7789、240×240、SPI、Arduino ヘッダーに接続 |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306、128×64、I²C、アドレス `0x3C` |

各構成の画面ドライバーは `examples/arduino/boards.h` の小さなブロックにまとまっていて、メインプログラムは共通です。ピンはメーカー資料に基づき、T-RGB、86 パネル、BOX-3 は Arduino_GFX 同梱のボード設定を、AMOLED のピンは ESPHome のデバイスページを使っています。実機で確認したい点：ST7735 には複数のバリエーションがあります（表示がずれる場合は `INITR_GREENTAB` を試してください）。AMOLED は列オフセットの微調整が必要な場合があります。T-RGB はロットによって初期化シーケンスが異なります。目は黒地に白なので、赤青の順序は表示に影響しません。すべての構成は CI でビルドできますが、実機での確認はまだです。実機で動かしたら「実機検証レポート」の Issue をお寄せください。シミュレーターで「コミュニティで実機確認済み」と表示されます。

**この版はまだ実機でテストしていません。ビルドが通ることや PC 上のテストは、画面の配線、実際のフレームレート、デバイス上の見た目を保証するものではありません。** Web 版と組み込み版は表情の名前とデザインを共有しますが、描画は別々です。組み込み版は元の形状を 20 ミリ秒ごとにサンプリングして補間し、目の動きとタイミングを保っています。頭、アンテナ、頭の輪郭による切り抜きは描かず、低解像度では縁にピクセル化の差が出ます。

## ハードウェアなしで、まず PC で確認

[`preview/boopface-embedded-preview.html`](preview/boopface-embedded-preview.html) をダウンロードしてブラウザで開きます。完全なオフラインファイルで、サーバー、開発ボード、Python、Node.js、コンパイラーは不要です。GitHub のファイル表示ページを保存するのではなく、元の HTML をダウンロードしてください。クローンしたプロジェクトでファイルをダブルクリックしても開けます。

**同じ組み込み C++ ソースを WebAssembly にコンパイルしたもの**で、Web デモや別の JavaScript アニメーションではありません。33 の動作（0.1 の 18 種に、0.2 で Web 版 0.9 から加わったお辞儀、観察、考える、ウインク、ドヤ顔、目が回る、弾むなど 13 種と、音声キットの聞く・話すを加えたもの）、自動巡回、一時停止とコマ送り、視線の方向、5 グループ（丸型、角型、横長、開発キット、OLED）32 種の画面プリセット、幅と高さ 16–512 のカスタム解像度に対応します。目は既定で角が丸く、`setRoundEyes(false)` で直角に戻ります。全体表示か切り抜いて埋めるか、拡大縮小、オフセット、円形の切り抜きを設定できます。ブラウザの出力は、実機の配線、ドライバー、リフレッシュレート、性能のテストの代わりにはなりません。再ビルドと検証の方法は[シミュレーターの説明](preview/README.md)をご覧ください。

## シミュレーターで調整して、そのままボードへ

シミュレーターで目を好みに調整すれば、コードを書き換えずに同じ設定でファームウェアをビルドできます：

1. シミュレーターを開き、画面を選びます。「型番と配線」に対応するボード、配線表、ビルドコマンドが表示されます。
2. レイアウト、色、フレームレート、まばたき、切り替えを調整します。画面を回して取り付けている場合は「画面を 90° 回転」を押します。
3. 「設定を書き出す」を押し、コピーまたはダウンロードして `eyes_settings.h` として保存します。
4. ファイルを `embedded/examples/arduino/` の `main.cpp` の隣に置きます。
5. ファイル先頭のコメントにある環境でビルドしてアップロードします。例：`pio run -d embedded -e esp32-s3-st7789 -t upload`。

| `eyes_settings.h` の設定 | シミュレーターの項目 |
| --- | --- |
| `EYES_MAX_FPS`、`EYES_AUTO_BLINK`、`EYES_TRANSITION_MS` | フレームレート上限、まばたき、切り替え |
| `EYES_FIT_COVER`、`EYES_ZOOM`、`EYES_OFFSET_X`、`EYES_OFFSET_Y` | レイアウト：全体表示か埋めるか、大きさ、位置 |
| `EYES_INK_RGB`、`EYES_BACKGROUND_RGB` | 目と背景の色、または選んだ配色（カラー画面のみ） |
| `EYES_TURN` | 画面を 90° 回転。目が上下逆なら `3` を `1` に変更 |
| `EYES_FULL_PANEL` | 1.3 インチ角型の参照画面で、中央の 240×160 ではなく画面全体を使う |

このファイルがなければファームウェアは既定の設定を使い、git にもコミットされません。視線追従にはボードにカメラや距離センサーが必要なので書き出しには含まれません。ライブラリの `GazeTracker`（`lib/BoopFace/src/BoopFaceGaze.h`）がセンサーから得た目標位置を受け取ります。

## 配線

以下は GPIO 番号で、ピンヘッダーの物理的な番号ではありません。ロジックレベルと電源が 3.3 V 対応で、CS/DC/RST が出ている画面モジュールを使ってください。画面付きの開発ボードは回路図に合わせて設定を変更します。

| ST7789 のピン | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13（PA5） |
| MOSI / SDA | GPIO11 | GP19 | D11（PA7） |
| CS | GPIO10 | GP17 | D10（PB6） |
| DC | GPIO9 | GP20 | D9（PC7） |
| RST / RES | GPIO8 | GP21 | D8（PA9） |
| VCC | 3.3 V | 3.3 V | 3V3 |
| GND | GND | GND | GND |

MISO は接続しません。バックライトは画面モジュールの説明に従って配線してください。サンプルはバックライトのピンを制御しません。

ESP32 の OLED サンプル：SDA → GPIO21、SCL → GPIO22、VCC → 対応モジュールの 3.3 V、GND → GND。モジュールのアドレスが異なる場合は `0x3C` を変更します。

STM32 Black Pill の OLED：SDA → PB7、SCL → PB6。USB ケーブルで DFU モードでアップロードし（BOOT0 を押したまま NRST を一度押す）、シリアルコマンドも同じ USB ケーブルで送ります。NUCLEO はボード上の ST-LINK の USB ポートでアップロードとシリアル通信を行います。

## ビルドと使い方

PlatformIO をインストールし、プロジェクトのルートで対応するコマンドを実行します：

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

シミュレーターで調整した設定でビルドするには、[シミュレーターで調整して、そのままボードへ](#シミュレーターで調整してそのままボードへ)をご覧ください。

どのボードも同じ表情ライブラリを使い、違うのは画面ドライバーの小さな部分だけです。プロジェクトをすっきりさせたい場合は、`platformio.ini` にある自分のボードの `[env:...]` と、`examples/arduino/boards.h` の該当ブロックだけを残し、ほかは削除してかまいません。

自分のボードと配線に合った環境だけをアップロードします。例：

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

シリアルで英語の動作名を改行付きで送ります：

- `love`：ハート。
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`：新しい動作に置き換わるまで続く待機（回転、回り込み、波、花、十字、丸と角）。
- `listening` / `speaking`：音声キットの聞く・話す。新しい動作まで続きます。プログラムから `setVoiceLevel()` で音量を渡せます。
- `success` / `failure`：タスクの成功・失敗。
- `wary` / `inspect` / `angry` / `refuse`：警戒、点検、怒り、拒否。
- `sleep` / `wake`：眠る、起きる。
- `gaze -0.5 0.2`：プログラムから視線の方向を指定します。座標の範囲は `[-1,1]`。視線の幅は `EyesConfig::gazeRange`（実行中は `setGazeRange()`）で決まります。`Small` は元の 8 × 6、`Medium`（既定）は 20 × 18 で表情エリアの端まで、`Large` は 30 × 21 で少し端を越えます。端に近づくと Web 版と同じ式で目が細く内側に寄り、横を向いているように見えます。視線が中央なら 3 段階とも同じ表示です。
- `demo`：すべての動作を順に再生します。有効な手動の動作で巡回は止まります。
- `reset`：待機に戻ります。
- `help`：コマンドの一覧。

ほかに `idle`、`bored`、`input`、`affirm`、`surprise`、`random`、0.2 で追加された `observe`、`think`、`ponder`、`bow`、`shake`、`wink`、`smug`、`bounce`、`smug-bounce`、`dizzy` があります。0.5 の旧名（`send`、`warning`、`blocked`、`error` など）は 1.0 まで使えます。対応表は英語の説明をご覧ください。

## 自分のデバイスに組み込む

ライブラリは `embedded/lib/BoopFace` にあります。Arduino ではこのディレクトリを自分の `libraries` にコピーするか、[組み込み版のリリースページ](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)から `BoopFace-Embedded-0.2.0.zip` をダウンロードし、「スケッチ → ライブラリをインクルード → .ZIP 形式のライブラリをインストール」で追加します。Arduino ライブラリマネージャーへの登録は手続き中なので、それまでは ZIP かソースを使ってください。そのほかの C++11 環境ではライブラリの `src` ディレクトリをそのままコンパイルします。

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) には `cxlab/BoopFace` が登録されています。`platformio.ini` の環境に追加します：

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

ライブラリには Arduino IDE のサンプルが 2 つあり、「ファイル → スケッチ例 → BoopFace」にあります。**SerialEyes** はシリアルモニターに文字で目を描くので画面は不要です。**OledSSD1306** は 0.96 インチ 128×64 I²C OLED で動きます（先に Adafruit SSD1306 ライブラリをインストール）。どちらもシリアルモニターに動作名を入力すると再生します。CI で ESP32 と RP2040 向けにビルドしています。

描画のコアには Adafruit ライブラリは不要で、必要なのはサンプルの表示ドライバーだけです。

あなたのプログラムは、増え続けるミリ秒の時刻を渡し、`eyes.update(nowMs)` を呼び、新しく作られたビットマップを画面ドライバーに渡します。32 ビットのカウンターの巻き戻りに対応しています。複数のクロックを混ぜたり、複数のタスクから保護なしに同じインスタンスを操作したりしないでください。

240×160 の目のキャンバスは 4,800 バイト、TFT サンプルは色変換用の行バッファーにさらに 480 バイト必要です。128×64 のキャンバスは 1,024 バイトで、OLED ドライバーは自分の表示バッファーも持ちます。これらにシステム、ドライバー、ほかのインスタンスのメモリは含まれません。元の動作の読み取り専用の形状テーブルがフラッシュを約 80 KB 使い、ヒープは確保しません。サンプルの上限は 25 FPS で、実際のフレームレートは実測が必要です。

出力は行ごと、各バイトの上位ビットから並ぶ 1 ビットのビットマップで、各行はバイト単位に切り上げられます。SSD1306 のネイティブなページ形式ではなく、サンプルではドライバーの `drawBitmap()` で変換しています。色はホストプログラムが割り当てるので、白黒 OLED にもカラー画面での目の色変更にも使えます。

**ひとつの製品を、さまざまなプラットフォームへ。表情はプロジェクトそのものに属し、ESP32 はその入り口のひとつです。**
