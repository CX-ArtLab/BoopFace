# BoopFace Embedded

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English · vollständige API-Referenz](README.md) · [Zurück zum Hauptprojekt](../docs/README.de.md)

Eine **experimentelle Hardware-Umsetzung** desselben Projekts. Sie zeichnet nur die Augen: Ausdrücke, Blinzeln, Blick, Warten, Schlafen und Aufwachen; welche Aktion wann läuft, entscheidet dein Programm. Ziehen, Quetschen, die Kopfform, die Antenne und das Verfolgen der Maus gehören nicht zu dieser Version. Der Embedded-Ordner ist unabhängig von der SVG-Komponente und ihrer Demo, damit beides getrennt gepflegt werden kann.

Der [Online-Simulator](https://boopface.com/hardware/?lang=de) gibt es in 10 Sprachen, und die Kommentare in den exportierten Einstellungen folgen der gewählten Sprache. Auf der Release-Seite gibt es außerdem eine einzelne HTML-Datei, die offline läuft.

## Für viele Plattformen

Der Ausdruckskern ist eine eigenständige C++11-Bibliothek: unabhängig von ESP32, Arduino, Browser oder einem bestimmten Bildschirmtreiber, und ohne dynamische Speicherbelegung. ESP32 und Raspberry Pi Pico sind die ersten Referenz-Anbindungen; andere Mikrocontroller funktionieren mit einem eigenen Bildschirmadapter.

| Build-Umgebung | Board | Bildschirm |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789, 240×240, SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789, 240×240, SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306, 128×64, I²C, Adresse `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306, 128×32, I²C, Adresse `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106, 128×64, I²C, Adresse `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | Runder GC9A01, 240×240, SPI (Verdrahtung wie `esp32-s3-st7789`) |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1,69″, 240×280, SPI (gleiche Verdrahtung) |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2,0″, 240×320, SPI (gleiche Verdrahtung) |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | Eingebauter runder GC9A01, keine Verdrahtung |
| `cyd-ili9341` | ESP32-2432S028 (CYD) | Eingebauter ILI9341, keine Verdrahtung |
| `t-display-st7789` | LilyGO T-Display | Eingebauter ST7789 1,14″, quer |
| `t-display-s3` | LilyGO T-Display-S3 | Eingebauter ST7789 1,9″, 8-Bit parallel, quer |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | Das jeweilige M5Stack-Modell | Eingebauter Bildschirm, von M5Unified erkannt |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1,14″ / 2,0″ quer (gleiche Verdrahtung) |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1,8″ / 0,96″ (gleiche Verdrahtung) |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3,5″, 480×320 (gleiche Verdrahtung) |
| `xiao-round-display` | Seeed XIAO ESP32S3 + rundes Display | Aufstecken, keine Verdrahtung |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | Eingebauter Bildschirm |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | Eingebautes rundes AMOLED |
| `t-rgb-21` | LilyGO T-RGB 2,1″ | Eingebauter runder RGB-Bildschirm |
| `guition-4848s040` | Guition ESP32-4848S040 (86er-Panel) | Eingebauter quadratischer RGB-Bildschirm |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE (STM32F411) | ST7789, 240×240, SPI, an der Arduino-Buchsenleiste |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306, 128×64, I²C, Adresse `0x3C` |

Der Bildschirmtreiber jeder Konfiguration ist ein kleiner Block in `examples/arduino/boards.h`; das Hauptprogramm ist gemeinsam. Die Pins folgen den Herstellerunterlagen; T-RGB, das 86er-Panel und die BOX-3 nutzen die Board-Konfigurationen aus Arduino_GFX, die AMOLED-Pins stammen von der ESPHome-Geräteseite. Auf echter Hardware zu prüfen: Den ST7735 gibt es in mehreren Varianten (ist das Bild verschoben, `INITR_GREENTAB` probieren); das AMOLED braucht eventuell einen kleinen Spaltenversatz; T-RGB-Revisionen unterscheiden sich in der Init-Sequenz. Die Augen sind weiß auf schwarz, deshalb fällt eine vertauschte Rot/Blau-Reihenfolge nicht auf. Alle Konfigurationen bauen in der CI, sind aber noch nicht auf echter Hardware geprüft; wenn du eine auf einem Gerät laufen lässt, eröffne bitte ein Issue „Hardware-Bericht“, dann markiert der Simulator sie als von der Community bestätigt.

**Diese Version wurde noch nicht auf echter Hardware getestet. Erfolgreiches Bauen und Tests am Rechner bestätigen weder Verdrahtung noch echte Bildrate noch die Darstellung auf dem Gerät.** Web- und Embedded-Version teilen Ausdrucksnamen und Design, zeichnen aber unterschiedlich: Die Embedded-Version tastet die ursprüngliche Geometrie alle 20 ms ab und interpoliert, sodass Bewegung und Timing der Augen erhalten bleiben. Kopf, Antenne und das Zuschneiden an der Kopfkontur werden nicht gezeichnet, und bei niedriger Auflösung wirken die Kanten pixelig.

## Erst am Rechner ansehen, ohne Hardware

Lade [`studio/boopface-embedded-studio.html`](studio/boopface-embedded-studio.html) herunter und öffne sie im Browser. Es ist eine vollständige Offline-Datei: kein Server, kein Board, kein Python, kein Node.js und kein Compiler nötig. Lade das rohe HTML herunter, nicht die GitHub-Dateiansicht. In einem geklonten Projekt genügt ein Doppelklick.

Es ist **derselbe Embedded-C++-Code, nach WebAssembly kompiliert**, nicht die Web-Demo oder eine andere JavaScript-Animation. Es gibt 33 Aktionen (die 18 aus 0.1 plus 13, die 0.2 aus der Web-Version 0.9 übernimmt, etwa Verbeugen, Beobachten, Nachdenken, Zwinkern, selbstzufrieden, schwindelig und Hüpfen, dazu Zuhören und Sprechen aus dem Sprach-Kit), automatischen Durchlauf, Pause und Einzelbild, Blickrichtung, 32 vorgefertigte Bildschirme in fünf Gruppen (rund, quadratisch, Leiste, Entwicklungskits und OLED) und eigene Auflösungen von 16 bis 512 pro Achse. Die Augen sind standardmäßig abgerundet; `setRoundEyes(false)` bringt die geraden Schnitte zurück. Einstellbar sind ganz anzeigen oder zuschneiden zum Füllen, Zoom, Versatz und runder Zuschnitt. Die Ausgabe im Browser ersetzt keine Tests von Verdrahtung, Treiber, Bildwiederholrate und Leistung auf echter Hardware. Neu bauen und prüfen: siehe [Hinweise zum Simulator](preview/README.md).

## Im Simulator einstellen, direkt aufs Board

Stell die Augen im Simulator nach deinem Geschmack ein und baue die Firmware mit genau diesen Einstellungen, ohne Code zu ändern:

1. Öffne den Simulator und wähle deinen Bildschirm. Das Feld **Modell und Verdrahtung** zeigt Board, Verdrahtung und Build-Befehl.
2. Stelle Layout, Farben, Bildrate, Blinzeln und Übergänge ein; ist der Bildschirm gedreht eingebaut, klicke auf „Bildschirm um 90° drehen“.
3. Klicke auf **Einstellungen exportieren**, kopiere oder lade den Text herunter und speichere ihn als `eyes_settings.h`.
4. Lege die Datei in `embedded/examples/arduino/` neben `main.cpp`.
5. Baue und lade die Umgebung hoch, die in den ersten Zeilen der Datei steht, zum Beispiel `pio run -d embedded -e esp32-s3-st7789 -t upload`.

| Einstellung in `eyes_settings.h` | Element im Simulator |
| --- | --- |
| `EYES_MAX_FPS`, `EYES_AUTO_BLINK`, `EYES_TRANSITION_MS` | Bildraten-Obergrenze, Blinzeln, Übergänge |
| `EYES_FIT_COVER`, `EYES_ZOOM`, `EYES_OFFSET_X`, `EYES_OFFSET_Y` | Layout: einpassen oder füllen, Größe, Position |
| `EYES_INK_RGB`, `EYES_BACKGROUND_RGB` | Augen- und Hintergrundfarbe oder eine Palette (nur Farbbildschirme) |
| `EYES_TURN` | Bildschirm um 90° drehen; stehen die Augen auf dem Kopf, `3` durch `1` ersetzen |
| `EYES_FULL_PANEL` | Auf dem quadratischen 1,3″-Referenzbildschirm das ganze Panel statt des 240×160-Streifens nutzen |

Ohne diese Datei nutzt die Firmware ihre Standardwerte, und git ignoriert sie. Blickverfolgung braucht eine Kamera oder einen Abstandssensor am Board und ist deshalb nicht Teil des Exports: Der `GazeTracker` der Bibliothek (`lib/BoopFace/src/BoopFaceGaze.h`) nimmt die Zielposition auf, die dein Sensor meldet.

## Verdrahtung

Das sind GPIO-Nummern, nicht die physische Position an der Stiftleiste. Nutze ein Bildschirmmodul, das bei Logik und Versorgung 3,3 V verträgt und CS/DC/RST herausführt; Boards mit eingebautem Bildschirm brauchen eine eigene Konfiguration nach ihrem Schaltplan.

| ST7789-Pin | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13 (PA5) |
| MOSI / SDA | GPIO11 | GP19 | D11 (PA7) |
| CS | GPIO10 | GP17 | D10 (PB6) |
| DC | GPIO9 | GP20 | D9 (PC7) |
| RST / RES | GPIO8 | GP21 | D8 (PA9) |
| VCC | 3,3 V | 3,3 V | 3V3 |
| GND | GND | GND | GND |

MISO wird nicht angeschlossen. Die Hintergrundbeleuchtung nach der Moduldokumentation verdrahten; das Beispiel steuert diesen Pin nicht.

OLED-Beispiel mit ESP32: SDA → GPIO21, SCL → GPIO22, VCC → 3,3 V des passenden Moduls, GND → GND; hat das Modul eine andere Adresse, `0x3C` ändern.

OLED am STM32 Black Pill: SDA → PB7, SCL → PB6. Hochladen per USB im DFU-Modus (BOOT0 gedrückt halten und einmal NRST drücken); serielle Befehle laufen über dasselbe USB-Kabel. Das NUCLEO lädt hoch und kommuniziert über den USB-Anschluss seines ST-LINK.

## Bauen und benutzen

Installiere PlatformIO und führe im Projektverzeichnis den passenden Befehl aus:

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

Zum Bauen mit den Einstellungen aus dem Simulator siehe [Im Simulator einstellen, direkt aufs Board](#im-simulator-einstellen-direkt-aufs-board).

Alle Boards nutzen dieselbe Ausdrucksbibliothek; nur der kleine Block des Bildschirmtreibers unterscheidet sich. Für ein aufgeräumtes Projekt behalte nur den `[env:...]`-Abschnitt deines Boards in `platformio.ini` und seinen Block in `examples/arduino/boards.h`, den Rest kannst du löschen.

Lade nur die Umgebung hoch, die zu deinem Board und deiner Verdrahtung passt. Zum Beispiel:

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

Über die serielle Schnittstelle den englischen Aktionsnamen mit Zeilenumbruch senden:

- `love`: Herzen.
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`: dauerhaftes Warten (Drehen, Umrunden, Welle, Blüte, Kreuz, Kreis und Quadrat), bis eine andere Aktion es ablöst.
- `listening` / `speaking`: Zuhören und Sprechen aus dem Sprach-Kit, bis zur nächsten Aktion; das Programm kann die Lautstärke mit `setVoiceLevel()` übergeben.
- `success` / `failure`: Aufgabe erledigt oder fehlgeschlagen.
- `wary` / `inspect` / `angry` / `refuse`: misstrauisch, prüfen, wütend, ablehnen.
- `sleep` / `wake`: schlafen, aufwachen.
- `gaze -0.5 0.2`: Das Programm legt die Blickrichtung fest, Koordinaten in `[-1,1]`. Die Reichweite bestimmt `EyesConfig::gazeRange` (oder `setGazeRange()` zur Laufzeit): `Small` sind die ursprünglichen 8 × 6, `Medium` (Standard) 20 × 18 bis zum Rand des Gesichtsbereichs, `Large` 30 × 21, etwas darüber hinaus. Am Rand werden die Augen nach der Formel der Web-Version schmaler und rücken nach innen, als würde sich der Kopf drehen; bei mittigem Blick sehen alle drei Stufen gleich aus.
- `demo`: spielt alle Aktionen im Wechsel; eine gültige manuelle Aktion beendet den Durchlauf.
- `reset`: zurück zur Ruhe.
- `help`: listet die Befehle.

Außerdem gibt es `idle`, `bored`, `input`, `affirm`, `surprise`, `random` und seit 0.2 `observe`, `think`, `ponder`, `bow`, `shake`, `wink`, `smug`, `bounce`, `smug-bounce` und `dizzy`. Die alten Namen aus 0.5 (`send`, `warning`, `blocked`, `error` usw.) funktionieren bis 1.0; die Zuordnungstabelle steht in der englischen Dokumentation.

## In dein eigenes Gerät einbauen

Die Bibliothek liegt in `embedded/lib/BoopFace`. In Arduino diesen Ordner in deinen `libraries`-Ordner kopieren oder `BoopFace-Embedded-0.2.0.zip` von der [Embedded-Release-Seite](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) herunterladen und über *Sketch → Bibliothek einbinden → .ZIP-Bibliothek hinzufügen* installieren. Die Aufnahme in den Arduino-Bibliotheksverwalter läuft noch; bis dahin ZIP oder Quellcode nutzen. Auf anderen C++11-Plattformen den ganzen `src`-Ordner mitkompilieren.

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) führt `cxlab/BoopFace` bereits; in `platformio.ini` zur Umgebung hinzufügen:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

Die Bibliothek bringt zwei Beispiele für die Arduino IDE mit, unter *Datei → Beispiele → BoopFace*: **SerialEyes** zeichnet die Augen als Zeichen im seriellen Monitor und braucht keinen Bildschirm; **OledSSD1306** läuft auf einem 0,96″-I²C-OLED mit 128×64 (vorher die Bibliothek Adafruit SSD1306 installieren). In beiden tippt man den Aktionsnamen in den seriellen Monitor. Die CI baut sie für ESP32 und RP2040.

Der Zeichenkern braucht die Adafruit-Bibliotheken nicht; nur die Bildschirmtreiber im Beispiel nutzen sie.

Dein Programm liefert eine stetig steigende Zeit in Millisekunden, ruft `eyes.update(nowMs)` auf und gibt die neue Bitmap an den Bildschirmtreiber. Der Überlauf des 32-Bit-Zählers wird unterstützt; mische keine verschiedenen Uhren und greife nicht ohne Schutz aus mehreren Tasks auf dieselbe Instanz zu.

Die Augenfläche mit 240×160 braucht 4.800 Byte, das TFT-Beispiel weitere 480 Byte für die Farbumrechnungszeile; die Fläche mit 128×64 braucht 1.024 Byte, und der OLED-Treiber hat zusätzlich seinen eigenen Puffer. Diese Zahlen enthalten weder System noch Treiber noch weitere Instanzen. Die schreibgeschützten Geometrietabellen der Original-Aktionen belegen etwa 80 KB Flash, dynamischer Speicher wird nicht belegt. Das Beispiel ist auf 25 FPS begrenzt; die echte Bildrate muss gemessen werden.

Die Ausgabe ist eine 1-Bit-Bitmap zeilenweise, höchstwertiges Bit zuerst in jedem Byte, jede Zeile auf ganze Bytes aufgerundet. Das ist nicht das native Seitenformat des SSD1306; das Beispiel wandelt mit `drawBitmap()` des Treibers um. Die Farbe vergibt das Hostprogramm, daher passt es für einfarbige OLEDs ebenso wie für andere Augenfarben auf Farbbildschirmen.

**Ein Produkt auf vielen Plattformen: Die Ausdrücke gehören zum Projekt, und der ESP32 ist nur einer der Zugänge.**
