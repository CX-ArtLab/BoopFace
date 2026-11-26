# BoopFace Embedded 임베디드 버전

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English · 전체 API 설명](README.md) · [메인 프로젝트로 돌아가기](../docs/README.ko.md)

같은 프로젝트의 **실험적인 하드웨어 구현**입니다. 눈만 그리며 표정, 깜빡임, 시선, 대기, 잠들기와 깨기를 제공합니다. 어떤 동작을 언제 재생할지는 여러분의 프로그램이 정합니다. 끌기, 찌그러뜨리기, 머리 모양, 안테나, 마우스 감지는 이 버전에 포함되지 않습니다. 임베디드 디렉터리는 SVG 컴포넌트와 데모 화면에서 독립되어 있어 따로 관리할 수 있습니다.

[온라인 시뮬레이터](https://boopface.com/hardware/?lang=ko)는 10개 언어를 지원하며, 내보내는 설정의 주석도 선택한 언어를 따릅니다. 릴리스 페이지에는 오프라인으로 열 수 있는 단일 HTML 파일도 있습니다.

## 여러 플랫폼 지원

표정 코어는 독립적인 C++11 라이브러리로, ESP32, Arduino, 브라우저, 특정 화면 드라이버에 의존하지 않으며 내부에서 힙을 할당하지 않습니다. ESP32와 Raspberry Pi Pico가 첫 참조 구현이며, 다른 마이크로컨트롤러도 디스플레이 어댑터를 작성하면 쓸 수 있습니다.

| 빌드 환경 | 보드 | 화면 |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789, 240×240, SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789, 240×240, SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306, 128×64, I²C, 주소 `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306, 128×32, I²C, 주소 `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106, 128×64, I²C, 주소 `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 원형, 240×240, SPI (배선은 `esp32-s3-st7789`와 동일) |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1.69″, 240×280, SPI (배선 동일) |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2.0″, 240×320, SPI (배선 동일) |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | 내장 GC9A01 원형, 배선 불필요 |
| `cyd-ili9341` | ESP32-2432S028 (CYD) | 내장 ILI9341, 배선 불필요 |
| `t-display-st7789` | LilyGO T-Display | 내장 ST7789 1.14″, 가로 |
| `t-display-s3` | LilyGO T-Display-S3 | 내장 ST7789 1.9″, 8비트 병렬, 가로 |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | M5Stack 각 모델 | 내장 화면, M5Unified가 자동 인식 |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1.14″ / 2.0″ 가로 (배선 동일) |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1.8″ / 0.96″ (배선 동일) |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3.5″, 480×320 (배선 동일) |
| `xiao-round-display` | Seeed XIAO ESP32S3 + 원형 확장 디스플레이 | 꽂기만 하면 됨, 배선 불필요 |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | 내장 화면 |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | 내장 AMOLED 원형 |
| `t-rgb-21` | LilyGO T-RGB 2.1″ | 내장 RGB 원형 |
| `guition-4848s040` | Guition ESP32-4848S040 (86 패널) | 내장 RGB 사각형 |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE (STM32F411) | ST7789, 240×240, SPI, Arduino 헤더에 연결 |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306, 128×64, I²C, 주소 `0x3C` |

각 구성의 화면 드라이버는 `examples/arduino/boards.h` 안의 작은 블록에 들어 있고, 메인 프로그램은 공통입니다. 핀은 제조사 자료를 따르며, T-RGB, 86 패널, BOX-3는 Arduino_GFX에 포함된 보드 설정을, AMOLED 핀은 ESPHome 장치 페이지를 사용합니다. 실제 하드웨어에서 확인할 점: ST7735는 여러 변형이 있습니다(화면이 어긋나면 `INITR_GREENTAB`을 시도하세요). AMOLED는 열 오프셋을 조금 조정해야 할 수 있습니다. T-RGB는 생산 시기에 따라 초기화 순서가 다릅니다. 눈은 검은 바탕에 흰색이라 빨강·파랑 순서는 표시에 영향을 주지 않습니다. 모든 구성은 CI에서 빌드되지만 아직 실제 하드웨어로 확인하지 않았습니다. 실물에서 돌려 보셨다면 "하드웨어 검증 보고" Issue를 남겨 주세요. 시뮬레이터에 "커뮤니티 실기 확인"으로 표시됩니다.

**이 버전은 아직 실제 하드웨어로 테스트하지 않았습니다. 빌드 성공과 PC 테스트는 화면 배선, 실제 프레임 레이트, 장치에서의 표시를 보장하지 않습니다.** 웹 버전과 임베디드 버전은 표정 이름과 디자인을 공유하지만 렌더러는 따로입니다. 임베디드 버전은 원래 형상을 20밀리초마다 샘플링해 보간하여 눈의 움직임과 타이밍을 유지합니다. 머리, 안테나, 머리 윤곽에 따른 잘라내기는 그리지 않으며, 저해상도에서는 가장자리에 픽셀화 차이가 있습니다.

## 하드웨어 없이 먼저 PC에서 확인

[`preview/boopface-embedded-preview.html`](preview/boopface-embedded-preview.html)을 내려받아 브라우저로 엽니다. 완전한 오프라인 파일이라 서버, 개발 보드, Python, Node.js, 컴파일러가 필요 없습니다. GitHub 파일 보기 페이지를 저장하지 말고 원본 HTML을 내려받으세요. 클론한 프로젝트에서 파일을 더블클릭해도 됩니다.

**같은 임베디드 C++ 소스를 WebAssembly로 컴파일한 것**으로, 웹 데모나 별도의 JavaScript 애니메이션이 아닙니다. 동작 33개(0.1의 18개에, 0.2에서 웹 버전 0.9를 따라 추가된 인사, 관찰, 생각, 윙크, 으쓱, 어지러움, 통통 튀기 등 13개와 음성 키트의 듣기·말하기), 자동 순환, 일시 정지와 한 프레임씩 보기, 시선 방향, 5개 그룹(원형, 사각형, 가로형, 개발 키트, OLED) 32가지 화면 프리셋, 가로세로 16–512의 사용자 해상도를 지원합니다. 눈은 기본으로 모서리가 둥글며 `setRoundEyes(false)`로 직각으로 되돌릴 수 있습니다. 전체 표시 또는 잘라서 채우기, 확대·축소, 오프셋, 원형 잘라내기를 설정할 수 있습니다. 브라우저 출력은 실제 배선, 드라이버, 주사율, 성능 테스트를 대신하지 못합니다. 다시 빌드하고 검증하는 방법은 [시뮬레이터 설명](preview/README.md)을 보세요.

## 시뮬레이터에서 맞추고 바로 보드로

시뮬레이터에서 눈을 마음에 들게 맞추면 코드를 고치지 않고 같은 설정으로 펌웨어를 빌드할 수 있습니다:

1. 시뮬레이터를 열고 화면을 고릅니다. "모델과 배선"에 해당 보드, 배선표, 빌드 명령이 나옵니다.
2. 레이아웃, 색상, 프레임 레이트, 깜빡임, 전환을 조정합니다. 화면을 돌려서 장착했다면 "화면 90° 회전"을 누릅니다.
3. "설정 내보내기"를 누르고 복사하거나 내려받아 `eyes_settings.h`로 저장합니다.
4. 파일을 `embedded/examples/arduino/` 안 `main.cpp` 옆에 둡니다.
5. 파일 첫 주석에 적힌 환경으로 빌드하고 업로드합니다. 예: `pio run -d embedded -e esp32-s3-st7789 -t upload`.

| `eyes_settings.h`의 설정 | 시뮬레이터 항목 |
| --- | --- |
| `EYES_MAX_FPS`, `EYES_AUTO_BLINK`, `EYES_TRANSITION_MS` | 프레임 레이트 상한, 깜빡임, 전환 |
| `EYES_FIT_COVER`, `EYES_ZOOM`, `EYES_OFFSET_X`, `EYES_OFFSET_Y` | 레이아웃: 전체 표시 또는 채우기, 크기, 위치 |
| `EYES_INK_RGB`, `EYES_BACKGROUND_RGB` | 눈과 배경 색상, 또는 고른 배색(컬러 화면만) |
| `EYES_TURN` | 화면 90° 회전. 눈이 위아래로 뒤집혀 보이면 `3`을 `1`로 변경 |
| `EYES_FULL_PANEL` | 1.3인치 사각 참조 화면에서 가운데 240×160 대신 화면 전체 사용 |

이 파일이 없으면 펌웨어는 기본 설정을 쓰며, 파일은 git에 커밋되지 않습니다. 시선 따라가기는 보드에 카메라나 거리 센서가 있어야 하므로 내보내기에 포함되지 않습니다. 라이브러리의 `GazeTracker`(`lib/BoopFace/src/BoopFaceGaze.h`)가 센서가 알려 준 목표 위치를 받습니다.

## 배선

아래는 GPIO 번호이며 핀 헤더의 물리적 순서가 아닙니다. 로직 레벨과 전원이 3.3 V와 호환되고 CS/DC/RST가 나와 있는 화면 모듈을 쓰세요. 화면이 달린 개발 보드는 회로도에 맞게 설정을 바꿔야 합니다.

| ST7789 핀 | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13 (PA5) |
| MOSI / SDA | GPIO11 | GP19 | D11 (PA7) |
| CS | GPIO10 | GP17 | D10 (PB6) |
| DC | GPIO9 | GP20 | D9 (PC7) |
| RST / RES | GPIO8 | GP21 | D8 (PA9) |
| VCC | 3.3 V | 3.3 V | 3V3 |
| GND | GND | GND | GND |

MISO는 연결하지 않습니다. 백라이트는 화면 모듈 설명에 따라 배선하세요. 예제는 백라이트 핀을 제어하지 않습니다.

ESP32 OLED 예제: SDA → GPIO21, SCL → GPIO22, VCC → 호환 모듈의 3.3 V, GND → GND. 모듈 주소가 다르면 `0x3C`를 바꿉니다.

STM32 Black Pill의 OLED: SDA → PB7, SCL → PB6. USB 케이블로 DFU 모드에서 업로드하고(BOOT0을 누른 채 NRST를 한 번 누름), 시리얼 명령도 같은 USB 케이블로 보냅니다. NUCLEO는 보드의 ST-LINK USB 포트로 업로드와 시리얼 통신을 합니다.

## 빌드와 사용

PlatformIO를 설치하고 프로젝트 루트에서 해당 명령을 실행합니다:

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

시뮬레이터에서 맞춘 설정으로 빌드하려면 [시뮬레이터에서 맞추고 바로 보드로](#시뮬레이터에서-맞추고-바로-보드로)를 보세요.

모든 보드가 같은 표정 라이브러리를 쓰고, 다른 것은 화면 드라이버의 작은 부분뿐입니다. 프로젝트를 깔끔하게 하려면 `platformio.ini`에서 내 보드의 `[env:...]`와 `examples/arduino/boards.h`의 해당 블록만 남기고 나머지는 지워도 됩니다.

내 보드와 배선에 맞는 환경만 업로드합니다. 예:

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

시리얼로 영어 동작 이름을 줄바꿈과 함께 보냅니다:

- `love`: 하트.
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`: 새 동작으로 바뀔 때까지 이어지는 대기(회전, 감싸기, 물결, 꽃, 십자, 원과 사각).
- `listening` / `speaking`: 음성 키트의 듣기와 말하기. 새 동작이 올 때까지 이어집니다. 프로그램에서 `setVoiceLevel()`로 음량을 넘길 수 있습니다.
- `success` / `failure`: 작업 성공 또는 실패.
- `wary` / `inspect` / `angry` / `refuse`: 경계, 살펴보기, 화남, 거절.
- `sleep` / `wake`: 잠들기, 깨기.
- `gaze -0.5 0.2`: 프로그램에서 시선 방향을 지정합니다. 좌표 범위는 `[-1,1]`. 시선 폭은 `EyesConfig::gazeRange`(실행 중에는 `setGazeRange()`)로 정합니다. `Small`은 원래의 8 × 6, `Medium`(기본)은 20 × 18로 표정 영역 가장자리까지, `Large`는 30 × 21로 가장자리를 조금 넘습니다. 가장자리에 가까워지면 웹 버전과 같은 공식으로 눈이 가늘어지고 안쪽으로 모여 옆을 보는 것처럼 보입니다. 시선이 가운데면 세 단계 모두 같은 모습입니다.
- `demo`: 모든 동작을 차례로 재생합니다. 유효한 수동 동작이 오면 순환이 멈춥니다.
- `reset`: 대기 상태로 돌아갑니다.
- `help`: 명령 목록.

그 밖에 `idle`, `bored`, `input`, `affirm`, `surprise`, `random`, 그리고 0.2에서 추가된 `observe`, `think`, `ponder`, `bow`, `shake`, `wink`, `smug`, `bounce`, `smug-bounce`, `dizzy`가 있습니다. 0.5의 옛 이름(`send`, `warning`, `blocked`, `error` 등)은 1.0까지 쓸 수 있으며, 대응표는 영어 설명을 보세요.

## 내 장치에 넣기

라이브러리는 `embedded/lib/BoopFace`에 있습니다. Arduino에서는 이 디렉터리를 내 `libraries` 폴더에 복사하거나, [임베디드 릴리스 페이지](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0)에서 `BoopFace-Embedded-0.2.0.zip`을 내려받아 "스케치 → 라이브러리 포함하기 → .ZIP 라이브러리 추가"로 설치합니다. Arduino 라이브러리 관리자 등록은 진행 중이니 그때까지는 ZIP이나 소스를 쓰세요. 다른 C++11 환경에서는 라이브러리의 `src` 디렉터리 전체를 컴파일하면 됩니다.

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace)에 `cxlab/BoopFace`가 등록되어 있습니다. `platformio.ini`의 환경에 추가하세요:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

라이브러리에는 Arduino IDE 예제가 두 개 있으며 "파일 → 예제 → BoopFace"에 있습니다. **SerialEyes**는 시리얼 모니터에 문자로 눈을 그려 화면이 필요 없고, **OledSSD1306**은 0.96인치 128×64 I²C OLED에서 동작합니다(먼저 Adafruit SSD1306 라이브러리 설치). 두 예제 모두 시리얼 모니터에 동작 이름을 입력하면 재생합니다. CI에서 ESP32와 RP2040용으로 빌드합니다.

그리기 코어에는 Adafruit 라이브러리가 필요 없고, 예제의 디스플레이 드라이버에만 필요합니다.

여러분의 프로그램은 계속 증가하는 밀리초 시간을 주고, `eyes.update(nowMs)`를 호출하고, 새로 만들어진 비트맵을 화면 드라이버에 넘깁니다. 32비트 카운터가 한 바퀴 도는 것도 지원합니다. 여러 시계를 섞거나 여러 작업에서 보호 없이 같은 인스턴스를 다루지 마세요.

240×160 눈 캔버스는 4,800바이트, TFT 예제는 색 변환용 행 버퍼로 480바이트가 더 필요합니다. 128×64 캔버스는 1,024바이트이고 OLED 드라이버는 자체 표시 버퍼도 가집니다. 이 숫자에는 시스템, 드라이버, 다른 인스턴스의 메모리가 포함되지 않습니다. 원래 동작의 읽기 전용 형상 표가 플래시를 약 80 KB 쓰며, 힙은 할당하지 않습니다. 예제의 상한은 25 FPS이며 실제 프레임 레이트는 직접 측정해야 합니다.

출력은 행 단위, 각 바이트의 상위 비트부터 채우는 1비트 비트맵이며, 각 행은 바이트 단위로 올림됩니다. SSD1306 고유의 페이지 형식이 아니며 예제는 드라이버의 `drawBitmap()`으로 변환합니다. 색은 호스트 프로그램이 정하므로 흑백 OLED에도, 컬러 화면에서 눈 색을 바꾸는 데도 쓸 수 있습니다.

**하나의 제품을 여러 플랫폼으로. 표정은 프로젝트 자체에 속하고, ESP32는 그 입구 중 하나입니다.**
