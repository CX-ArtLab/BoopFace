# BoopFace Embedded changelog

Changes to the embedded eyes library for robot and dev-board screens. It is versioned and released separately from the Web component (`embedded-v*` tags from 0.2.1, `eyes-v*` before; not published to npm).

## [0.2.1] - 2026-11-28

### Fixed

- The Arduino library is called **BoopFace Embedded** again, as in 0.1.0. 0.2.0 had renamed it to `BoopFace`, so the Arduino Library Manager kept showing 0.1.0 and never offered the update. If you installed 0.2.0 from the ZIP, delete the old `BoopFace` folder from your Arduino `libraries` folder before installing 0.2.1, or the IDE finds two copies. PlatformIO keeps the name `cxlab/BoopFace`.
- The Arduino IDE examples now appear under *File → Examples → BoopFace Embedded*.
- The settings file exported by the Embedded Studio gives the same build command as the page (`pio run -d embedded -e …`, run from the project's top folder).

### Changed

- Embedded releases are tagged `embedded-v<version>` from now on (0.1.0 and 0.2.0 keep their `eyes-v` tags), so the release name matches the `embedded/` folder.
- The offline Embedded Studio (`boopface-embedded-studio.html`, 33 actions) replaces the older preview as the download; the old file name downloads the same file.

## [0.2.0] - 2026-11-25

Ships together with the Web avatar 0.9.0.

### Changed

- Rounded eyes, as on the Web avatar: every corner a lid cuts into an eye is rounded (radius 4 avatar units), and a thin slit (sleep, a squint) gets half-round ends. `Eyes::setRoundEyes(false)` keeps the straight cuts.

### Added

- The 13 expressions of the Web avatar 0.9: `observe`, `ponder`, `think`, `waiting-bloom`, `waiting-cross`, `shape-wait`, `bow`, `shake`, `smug`, `wink`, `dizzy`, `bounce`, `smug-bounce` (31 in all, 33 with listening and speaking). The bloom and cross waits are computed by the core (no motion data); the rest are sampled from the Web avatar in a browser (`embedded/tools/sample-web-expressions-browser.mjs`, about 85 KB of geometry). On a screen the head motions of bow, shake and bounce become eye motion. Turned shapes interpolate the short way round (no backward spin). The bloom, cross and shape waits are centred on the eyes (the Web avatar centres them on its face, which on a screen of eyes alone sits high).
- The voice kit's `listening` (both eyes one round eye that swells with the voice) and `speaking` (two eyes growing taller with the reply, the left with low sounds, the right with high ones; a speech rhythm of their own without a level), with `Eyes::setVoiceLevel()`; into listening and the bloom and cross in 420 ms, back to two eyes for speaking in 640 ms, as on the Web.
- `embedded/tools/build-core-data.mjs` builds the WebAssembly core for the Embedded Studio page.

## [0.1.0] - 2026-11-05

First experimental release. All reference configurations compile in CI; physical verification is pending. Install the standalone ZIP until registry listings are available.

### Added

- A portable, allocation-free C++11 library that draws the same 18 expressions as the Web avatar on 1-bit framebuffers from 16 to 512 pixels, with fit/fill/zoom layouts, round-screen clipping, proximity gaze with selectable range, and runtime timing changes. Action names match the Web avatar 0.8 (`affirm`, `wary`, `angry`, `refuse`, `waiting-spin`, ...); the older Web names still parse.
- Firmware examples for 28 board and screen configurations (ESP32, ESP32-S3, STM32 and RP2040; ST7789, ST7735, GC9A01, ILI9341, ILI9342C, ILI9488, CO5300 AMOLED, ST7701S RGB panels, SSD1306 and SH1106 OLEDs; LilyGO, M5Stack, Waveshare, Seeed, Espressif, Guition, ST and WeAct boards). All compile in CI; none is verified on real hardware yet, so please send a hardware report if you try one.
- The hardware preview, an offline single-file page that runs the same C++ engine compiled to WebAssembly on 32 simulated screens, with panel-accurate display, module housings, actual-size zoom, wiring tables and a proximity-gaze simulator.
- Two Arduino IDE examples inside the library: SerialEyes (text eyes in the Serial Monitor, no screen needed) and OledSSD1306 (0.96″ I²C OLED). CI compiles them for ESP32 and RP2040.
- A Hardware report issue form for confirming board examples on real hardware.

- BoopFace Embedded naming: `<BoopFace.h>`, `boopface::Eyes`, and a standalone Arduino ZIP with examples and MIT license.
- Simulator language selector: English, Simplified/Traditional Chinese, Japanese, Korean, Spanish, Portuguese, German, French and Russian. Exported `eyes_settings.h` comments follow the selected language.
- Per-screen settings export for layout, colours, frame rate, blinking, transitions and screen rotation.
