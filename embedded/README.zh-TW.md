# BoopFace Embedded 嵌入式裝置版

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English / 完整介面說明](README.md) · [返回主專案](../docs/README.zh-TW.md)

這是同一專案下的**實驗性硬體實現**。只繪製眼睛，提供表情、眨眼、注視、等待和休眠喚醒；由你的程式決定什麼時候播放哪個動作。拖動、擠壓、頭部外形、天線和滑鼠監聽不包含在此版本中。嵌入式目錄獨立於 SVG 元件及其 Demo 介面，方便分別維護。

[線上模擬器](https://boopface.com/hardware/?lang=zh-TW)支援十種語言，匯出的設定註釋跟隨所選語言；釋出頁也提供可離線開啟的單檔案 HTML。

## 面向多平臺

表情核心是獨立的 C++11 庫，不依賴 ESP32、Arduino、瀏覽器或具體螢幕驅動，內部不分配堆記憶體。ESP32 和樹莓派 Pico 是首批參考接入，其他控制器可編寫自己的顯示適配。

| 構建環境 | 開發板 | 螢幕 |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789，240×240，SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789，240×240，SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306，128×64，I²C，地址 `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306，128×32，I²C，地址 `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106，128×64，I²C，地址 `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 圓屏，240×240，SPI（接線同 `esp32-s3-st7789`） |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1.69″，240×280，SPI（接線同上） |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2.0″，240×320，SPI（接線同上） |
| `waveshare-s3-round-128` | 微雪 ESP32-S3-Touch-LCD-1.28 | 板載 GC9A01 圓屏，無需接線 |
| `cyd-ili9341` | ESP32-2432S028（CYD 黃板） | 板載 ILI9341，無需接線 |
| `t-display-st7789` | LilyGO T-Display | 板載 ST7789 1.14″，橫屏 |
| `t-display-s3` | LilyGO T-Display-S3 | 板載 ST7789 1.9″，8 位並口，橫屏 |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | M5Stack 對應型號 | 板載螢幕，由 M5Unified 自動識別 |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1.14″ / 2.0″ 橫屏（接線同上） |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1.8″ / 0.96″（接線同上） |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3.5″，480×320（接線同上） |
| `xiao-round-display` | Seeed XIAO ESP32S3 + 圓形擴充套件屏 | 插上即可，無需接線 |
| `esp32-s3-box-3` | 樂鑫 ESP32-S3-BOX-3 | 板載螢幕 |
| `waveshare-amoled-175` | 微雪 ESP32-S3-Touch-AMOLED-1.75 | 板載 AMOLED 圓屏 |
| `t-rgb-21` | LilyGO T-RGB 2.1″ | 板載 RGB 圓屏 |
| `guition-4848s040` | Guition ESP32-4848S040（86 面板） | 板載 RGB 方屏 |
| `nucleo-f411re-st7789` | ST 官方 NUCLEO-F411RE（STM32F411） | ST7789，240×240，SPI，接在 Arduino 排針上 |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306，128×64，I²C，地址 `0x3C` |

每個配置的螢幕驅動在 `examples/arduino/boards.h` 中各佔一小段，主程式共用。引腳依據廠商資料；T-RGB、86 面板和 BOX-3 採用 Arduino_GFX 自帶的板型配置，AMOLED 的引腳來自 ESPHome 裝置庫。實機上需要留意：ST7735 有多種版本（畫面錯位時可改用 `INITR_GREENTAB`）；AMOLED 可能需要微調列偏移；T-RGB 不同批次的初始化序列不同。眼睛是黑底白色，螢幕的紅藍順序不影響顯示。所有配置都在 CI 中編譯通過，尚未實機驗證；如果你在實物上執行過，歡迎提交"實機驗證報告"Issue，模擬器裡會標記為"社羣已實機驗證"。

**本版尚未進行實機測試。編譯通過和電腦端測試，不代表已經確認螢幕接線、實際幀率或裝置上的顯示效果。** Web 與嵌入式版本共用表情名稱和設計，但採用不同繪製器；嵌入式版每 20 毫秒取樣原版幾何引數並插值，保留原有眼部動作和時間過程；不繪製頭部、天線及頭部輪廓裁切，低解析度邊緣會有畫素化差異。

## 不用硬體，先在電腦上看效果

下載並用瀏覽器開啟 [`studio/boopface-embedded-studio.html`](studio/boopface-embedded-studio.html)。這是一個完整的離線檔案，不需要伺服器、開發板、Python、Node.js 或編譯工具；請下載原始 HTML，而不是儲存 GitHub 的檔案檢視頁面。也可在克隆後的專案中直接雙擊這個檔案。

它將**同一份嵌入式 C++ 原始碼編譯成 WebAssembly**，不是原 Web Demo 或另一套 JavaScript 動畫。支援 33 種動作（0.1 的 18 種，加上 0.2 跟隨網頁版 0.9 新增的鞠躬、觀察、思考、眨眼、得意、眩暈、彈跳等 13 種，以及語音套件的聆聽和說話）、自動輪播、暫停/逐幀、注視方向，以及 32 種螢幕預設（圓屏、方屏、長條屏、開發套件和 OLED 五組）和寬高 16–512 的自定義解析度。眼睛預設是圓角，`setRoundEyes(false)` 恢復直角。可設定完整顯示或裁切鋪滿、縮放、偏移與圓形裁切。命名預設使用對應參考模組的 SVG 外框，保留 PCB、玻璃、安裝孔與排線的不同結構；橫屏、豎屏整板旋轉，自定義解析度使用通用外框。開啟「注視跟隨」後，滑鼠可模擬接近的物體；感應範圍、只看移動物體、跟隨速度和離開後的停留時間在庫介面裡設定，真正的攝像頭或感測器接入由宿主程式提供。暫停只凍結時間，仍可切換動作；慢速播放可用於檢查過渡。瀏覽器輸出不能代替真機接線、驅動、重新整理率和效能測試。重建和驗證方法見 [模擬器說明](preview/README.md)。

## 在模擬器裡調好，直接用到板子上

在模擬器裡把眼睛調到滿意，不用改程式，就能按同樣的設定編譯韌體。這條路線需要**完整的專案資料夾**（裡面有 `embedded/` 目錄）：在 [GitHub 頁面](https://github.com/CX-ArtLab/boopface) 點 *Code → Download ZIP*，或用 `git clone`。Arduino 函式庫的 ZIP 裡只有 `.ino` 範例，沒有這些檔案。

1. 打開模擬器，選你的螢幕。右邊「韌體」分頁裡的「型號與接線」有對應的開發板和接線表。
2. 調整佈局、顏色、幀率、眨眼和過渡；螢幕是轉著裝的，就按「旋轉 90°」。
3. 回到「韌體」分頁的 `eyes_settings.h` 頁，點「下載文件」（或點「複製」，自己存成 `eyes_settings.h`）。
4. 把檔案放進專案資料夾的 `embedded/examples/arduino/`，和 `main.cpp` 放在一起。
5. 安裝 [PlatformIO](https://docs.platformio.org/en/latest/core/installation/index.html)，在專案最上層（看得到 `embedded` 資料夾的那一層）打開終端機，執行頁面上的「編譯指令」，例如 `pio run -d embedded -e esp32-s3-st7789 -t upload`。

**用 Arduino IDE**：用 ZIP 安裝函式庫（草稿碼 → 匯入程式庫 → 加入 .ZIP 程式庫），再打開「檔案 → 範例 → BoopFace」裡的 SerialEyes 或 OledSSD1306。這兩個範例不讀取 `eyes_settings.h`；想用模擬器裡調好的設定，請照上面的步驟走。

| `eyes_settings.h` 裡的設定 | 對應模擬器裡的 |
| --- | --- |
| `EYES_MAX_FPS`、`EYES_AUTO_BLINK`、`EYES_TRANSITION_MS` | 幀率上限、眨眼、打斷過渡 |
| `EYES_FIT_COVER`、`EYES_ZOOM`、`EYES_OFFSET_X`、`EYES_OFFSET_Y` | 佈局：完整顯示或填滿、大小、位置 |
| `EYES_INK_RGB`、`EYES_BACKGROUND_RGB` | 眼睛和底色，或選的配色（只用於彩色屏） |
| `EYES_TURN` | 螢幕旋轉 90°；如果眼睛上下顛倒，把 `3` 改成 `1` |
| `EYES_FULL_PANEL` | 1.3 寸方形參考屏用整塊屏，而不是中間 240×160 |

沒有這個檔案時韌體用預設設定；這個檔案不會被提交到 git。注視跟隨需要板子接攝像頭或距離感測器，所以不在匯出內容裡：庫裡的 `GazeTracker`（`lib/BoopFace/src/BoopFaceGaze.h`）接收感測器給出的目標位置。

## 接線

以下是 GPIO 編號，不是排針的物理序號。使用邏輯電平、電源均相容 3.3 V、且引出 CS/DC/RST 的螢幕模組；帶屏開發板需要按其原理圖修改配置。

| ST7789 引腳 | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13（PA5） |
| MOSI / SDA | GPIO11 | GP19 | D11（PA7） |
| CS | GPIO10 | GP17 | D10（PB6） |
| DC | GPIO9 | GP20 | D9（PC7） |
| RST / RES | GPIO8 | GP21 | D8（PA9） |
| VCC | 3.3 V | 3.3 V | 3V3 |
| GND | GND | GND | GND |

不連線 MISO。背光按螢幕模組說明接線，例程不控制背光引腳。

ESP32 OLED 例程使用：SDA → GPIO21，SCL → GPIO22，VCC → 相容模組的 3.3 V，GND → GND；若模組地址不同，需要修改 `0x3C`。

STM32 Black Pill 的 OLED：SDA → PB7，SCL → PB6。用 USB 線以 DFU 方式上傳（按住 BOOT0 再按一下 NRST），串列埠命令也走同一根 USB 線。NUCLEO 透過板上 ST-LINK 的 USB 口上傳和收發串列埠。

## 編譯與使用

安裝 PlatformIO，在專案根目錄執行對應命令：

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

想用模擬器裡調好的效果編譯，見[在模擬器裡調好，直接用到板子上](#在模擬器裡調好直接用到板子上)。

所有板子共用同一個表情庫，區別只在螢幕驅動那一小段。想讓自己的專案清爽一些，可以只保留你那塊板子在 `platformio.ini` 裡的 `[env:...]` 配置和在 `examples/arduino/boards.h` 裡的那一段，其他的都可以刪掉。

只上傳與你的開發板和接線匹配的環境。例如：

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

串列埠中傳送英文動作名，末尾加換行：

- `love`：愛心。
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`：持續等待（旋轉、環繞、波動、綻放、十字、方圓），直到新動作替換。
- `listening` / `speaking`：語音套件的聆聽和說話，持續到新動作替換；程式裡可用 `setVoiceLevel()` 傳入音量。
- `success` / `failure`：任務成功或失敗。
- `wary` / `inspect` / `angry` / `refuse`：警惕、審視、生氣、拒絕。
- `sleep` / `wake`：睡眠、喚醒。
- `gaze -0.5 0.2`：由程式明確指定注視方向，座標範圍 `[-1,1]`。注視幅度由 `EyesConfig::gazeRange`（或執行時 `setGazeRange()`）決定：`Small` 為原來的 8 × 6，`Medium`（預設）為 20 × 18，眼睛最遠到表情區域邊緣；`Large` 為 30 × 21，會稍微越過邊緣。眼睛靠近邊緣時按 Web 版公式變窄並向內收，看起來像在轉向側面；眼睛居中時三檔畫面完全相同。
- `demo`：輪流播放全部動作；有效的手動動作會退出輪播。
- `reset`：回到待機。
- `help`：列出命令。

完整動作還包括 `idle`、`bored`、`input`、`affirm`（肯定）、`surprise`、`random`，以及 0.2 新增的 `observe`、`think`、`ponder`、`bow`、`shake`、`wink`、`smug`、`bounce`、`smug-bounce`、`dizzy`。0.5 版的舊名字（`send`、`warning`、`blocked`、`error` 等）在 1.0 之前仍可使用，對照關係詳見英文介面說明。

## 接入自己的裝置

庫在 `embedded/lib/BoopFace`。Arduino 使用者可將這個目錄複製到自己的 `libraries` 目錄；也可以從[嵌入式釋出頁](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)下載 `BoopFace-Embedded-0.2.0.zip`，用“專案 → 匯入庫 → 新增 .ZIP 庫”安裝。Arduino 庫管理器索引仍在更新，目前請使用 ZIP 或原始碼。其他 C++11 平臺可編譯庫的整個 `src` 目錄。

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) 已收錄 `cxlab/BoopFace`，在 `platformio.ini` 的環境配置中新增：

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

庫裡帶兩個 Arduino IDE 示例，在“檔案 → 示例 → BoopFace”下：**SerialEyes** 在串列埠監視器裡用字元畫出眼睛，不需要螢幕；**OledSSD1306** 執行在 0.96 寸 128×64 I²C OLED 上（需先安裝 Adafruit SSD1306 庫）。兩個示例都可以在串列埠監視器裡輸入動作名來播放。CI 會為 ESP32 和 RP2040 編譯它們。

繪製核心不要求安裝 Adafruit 庫，例程中的顯示驅動才需要它們。

你的程式負責提供持續遞增的毫秒時間、呼叫 `eyes.update(nowMs)`，並將新生成的點陣圖交給螢幕驅動。時間支援 32 位計數器迴繞；不要混用多個時鐘，也不要讓多個任務同時無保護地操作同一例項。

240×160 眼睛畫布需要 4,800 位元組，TFT 例程另需 480 位元組顏色轉換行緩衝；128×64 畫布需要 1,024 位元組，OLED 驅動還會擁有自己的顯示緩衝。上述數字不包含系統、驅動和其他例項記憶體；原版動作的只讀幾何表另佔約 80 KB 快閃記憶體，不分配堆記憶體。例程限制最高 25 FPS，實際幀率需要實測。

輸出是按行、每位元組高位優先的 1 位點陣圖，每行向上補齊到整位元組。它不是 SSD1306 原生分頁格式；例程透過驅動的 `drawBitmap()` 轉換。顏色由宿主程式對映，因此可以用於黑白 OLED，也可以在彩屏上設定不同眼睛顏色。

**同一個產品、不同平臺適配：表情屬於專案本身，ESP32 只是其中一個入口。**

