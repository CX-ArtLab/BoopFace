# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: eine leichte, ausdrucksstarke Roboter-Avatar-Komponente für KI-Bots, Agenten und interaktive Apps">
</p>

**Offizielle Website: [boopface.com](https://boopface.com/)** · **Online-Demo: [BoopFace Studio](https://boopface.com/demo/?lang=de)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace ist eine leichte, ausdrucksstarke Roboter-Avatar-Komponente für KI-Bots, Agenten und interaktive Apps. Denken, warten, fertig, Fehler: Jeder Zustand eines Agenten lässt sich mit einem Gesichtsausdruck zeigen.

Sie dient als Gesicht und Statusanzeige für KI-Assistenten und Agenten: Chat-Assistenten wie ChatGPT, Claude und Gemini, Coding-Agenten wie Codex, Claude Code und Cursor und alle Arten persönlicher Agenten. Sie passt auch zu Desktop-Begleitern, virtuellen Haustieren, digitalen Maskottchen und Chatbot-Avataren.

Eine native Web Component aus SVG und reinem JavaScript, ohne Laufzeitabhängigkeiten, MIT-lizenziert. Flach anzeigen oder auf einen 3D-Kopf umschalten, der sich wirklich dreht; 188 Skins stehen bereit.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#schnellstart">Schnellstart</a> · <a href="#ausdrücke">Ausdrücke</a> · <a href="#einstellungen">Einstellungen</a> · <a href="#3d-kopf-und-augen">3D-Kopf und Augen</a> · <a href="#skins">Skins</a> · <a href="#ki-anbinden">KI anbinden</a> · <a href="#sprachgespräche">Sprachgespräche</a> · <a href="#react-und-vue">React und Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Online ausprobieren

<h3 align="center">Offizielle Website</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Studio Online-Demo</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=de"><b>Studio öffnen</b></a> · <a href="https://boopface.com/demo/?lang=de#skins">Skin wählen</a> · <a href="https://boopface.com/demo/?lang=de#agent">KI-Anbindung ausprobieren</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace-Interaktionsdemo" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded Simulator</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=de"><b>Embedded-Simulator öffnen</b></a> (32 Board-Bildschirm-Vorlagen)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Neu in 0.9

- BoopFace bekommt Tiefe. [Details](#3d-kopf-und-augen)
- 15 neue Ausdrücke und das Sprachgesprächs-Kit. [Details](#ausdrücke)
- Neue Streichel-Reaktion: den Zeiger über der Stirn hin und her bewegen. [Details](#3d-kopf-und-augen)
- KI-Anbindung aktualisiert. [Details](#ki-anbinden)
- Die Online-Demo, komplett neu gebaut: [BoopFace Studio](https://boopface.com/demo/?lang=de)
- Embedded 0.2: Die neuen Ausdrücke kommen auch auf die Boards. [Details](#boopface-embedded)

Alle Details im [CHANGELOG](../CHANGELOG.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace im Überblick

- Native Web Component, SVG-Rendering + reines JavaScript, keine Laufzeitabhängigkeiten, funktioniert mit jedem Framework
- Eine Avatar-Komponente, die Gefühle zeigt, mit einem Ausdruck für jede Art von Zustand
- Über 30 Ausdrücke, die ihn lebendig wirken lassen
- Interaktiv: Die Augen folgen dem Zeiger; Ziehen, Quetschen, Drücken, an der Antenne Ziehen und Streicheln lösen eine Reaktion aus
- Flach oder 3D für verschiedene Zwecke, mit 188 Skins zum jederzeitigen Wechseln
- Ereignisse aus KI-Streams steuern die Ausdrücke direkt (AG-UI, OpenAI, Anthropic, Vercel AI SDK), Sprachgespräche inklusive
- Leicht: Der Lite-Build hat etwa 92 KB
- BoopFace Embedded: Dieselben Ausdrücke laufen auf Board-Bildschirmen (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Schnellstart

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

Kein Setup-Code nötig: Der Avatar blinzelt und wartet von selbst. `view="3d"` ist der 3D-Kopf der offiziellen Website; ohne es gibt es den flachen Avatar (Standard, und leichter).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Ohne npm: `boopface-x.y.z.zip` aus dem [neuesten Release](https://github.com/CX-ArtLab/boopface/releases/latest) herunterladen, neben der Seite entpacken und mit `<script type="module" src="./boopface/boopface.js"></script>` laden.

**Größe** (Übertragungsgröße, gzip)

| Build | Größe |
| --- | --- |
| Lite `import 'boopface/lite'`, ohne Skins | etwa 92 KB |
| Voll, Seite nutzt keine Skins | etwa 104 KB |
| Voll, mit Skins | etwa 161 KB (der Skin-Code lädt beim ersten genutzten Skin) |

Der Wechsel zu 3D lädt etwa 19 KB nach.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Ausdrücke

```js
avatar.play('success');   // einmal abspielen
avatar.startWaiting();    // warten bis stopWaiting() oder ein anderer Ausdruck
avatar.reset();           // zurück zur Ruhe
```

| Aktion | Aussehen | Passt zu |
| --- | --- | --- |
| `idle` | Blinzelt und schaut sich um | Standardzustand |
| `bored` | Schaut langsam von einer Seite zur anderen | Länger ist nichts passiert |
| `waiting-spin` | Augen kreisen von Seite zu Seite | Warten auf eine Antwort (Standard) |
| `waiting-wrap` | Augen gleiten auf einer Seite hinaus und auf der anderen zurück | Warten auf eine Antwort |
| `waiting-wave` | Augen wippen abwechselnd auf und ab | Warten auf eine Antwort |
| `waiting-bloom` | Zwei gekreuzte Ovale atmen und drehen sich wie eine Blüte | Auf eine Antwort warten; gemacht für Sprachdialoge |
| `waiting-cross` | Zwei gekreuzte Ovale ruhen auf dem ×, drehen sich je eine Vierteldrehung und wechseln zwischen schmal und voll | Warten auf eine Antwort; passt auch zu Sprachdialogen |
| `shape-wait` | Die Augen verschmelzen zu einer Form, die zwischen Kreis und abgerundetem Quadrat wechselt | Warten auf eine Antwort |
| `input` | Augen werden zu blinkenden Textcursorn | Nutzer tippt |
| `listening` | Beide Augen verschmelzen zu einem runden Auge, das mit der Stimme anschwillt | Sprache: der Nutzer spricht |
| `speaking` | Die Augen teilen sich wieder und strecken sich mit der Antwort | Sprache: die KI antwortet |
| `affirm` | Nickt | Verstanden, bestätigt |
| `success` | Fröhlich lächelnde Augen | Aufgabe erledigt |
| `failure` | Kopf und Augen sinken | Aufgabe oder Verbindung fehlgeschlagen |
| `wary` | Dreht den Kopf und mustert misstrauisch von oben bis unten | Aktion braucht eine Bestätigung |
| `inspect` | Kneift die Augen zusammen und scannt auf und ab | Etwas prüfen oder überprüfen |
| `observe` | Reißt die Augen auf, beugt sich vor und schaut sich um | Genau hinsehen, etwas lesen |
| `think` | Schaut nach oben und dreht sich langsam zur anderen Seite | Nachdenken vor einer Antwort |
| `ponder` | Schaut nach unten, blickt nach links und rechts, dann wieder auf | Etwas sorgfältig abwägen |
| `bow` | Ein tiefes Nicken, eine Pause, dann wieder hoch | Dank, Entschuldigung, Gruß |
| `angry` | Gesenkte, finster blickende Augen | Inhalt blockiert |
| `refuse` | Schüttelt den Kopf | Anfrage kann oder will es nicht ausführen |
| `shake` | Erst wenden sich die Augen ab, dann folgt der Kopf | Widerspruch, nicht hinsehen wollen |
| `surprise` | Weit aufgerissene Augen | Etwas Unerwartetes |
| `love` | Augen verschmelzen zu einem schlagenden Herz | Dank, Zuneigung |
| `wink` | Neigt den Kopf und zwinkert | Grüßen, scherzen |
| `smug` | Kneift die Augen zusammen, schaut auf und zur Seite | Selbstzufrieden, verspielt |
| `bounce` | Hüpft wie ein Ball | Freude, feiern |
| `smug-bounce` | Zwei lächelnde Hüpfer, nach links und rechts geneigt | Ein bisschen stolz |
| `dizzy` | Die Augen kreisen gegenläufig, eins groß, eins klein | Schwindlig, zu viele Informationen |
| `random` | Augen drehen sich wie Spielautomatenwalzen | Zufallsauswahl, verspielter Moment |
| `sleep` | Schließt die Augen und schläft | Lange keine Aktivität |
| `wake` | Öffnet die Augen und wacht auf | Aktivität setzt wieder ein |

Wartestile: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. Die alten Aktionsnamen aus 0.5 funktionieren bis 1.0, siehe [Umstiegstabelle](../CHANGELOG.md#upgrading-from-05x).

Eine typische Anfrage:

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

## Einstellungen

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Attribut | Zweck | Laufzeitmethode |
| --- | --- | --- |
| `size` | Avatargröße in Pixeln |  |
| `view` | `2d` (Standard, flach) oder `3d` | `setView()` |
| `color` | Hauptfarbe des Avatars |  |
| `eye-color` | Augenfarbe; `transparent` lässt den Hintergrund durch die Augen scheinen | `setEyeColor()` |
| `eye-style` | Standardmäßig abgerundete Augen; `sharp` bringt die geraden Schnitte zurück |  |
| `skin` | Skin-Nummer, z. B. `301`; weglassen für die flache Farbe | `setSkin()` |
| `auto-sleep` | Leerlaufzeit vor automatischem Schlaf; `0` deaktiviert ihn |  |
| `wake-on` | Automatische Aufwachstrategie: `activity`, `interaction` oder `manual` |  |
| `motion` | Bewegungsstrategie: `auto`, `reduce` oder `full` |  |
| `idle-gaze` | In Ruhe schauen die Augen ab und zu umher; `false` lässt sie geradeaus schauen | `setIdleGaze()` |
| `petting` | Fährst du ein paar Mal mit dem Zeiger über die Stirn, schließt der Avatar die Augen und schmiegt sich an; `false` schaltet es aus | `setPetting()` |
| `press-squeeze` | Mitte gedrückt halten und stauchen; `false` deaktiviert die Geste | `setPressSqueeze()` |
| `antenna` | `false` blendet die Antennenkugel aus |  |
| `antenna-drag` | Antenne ziehen, zurückfedern und schwindlige Reaktion; mit `false` abschalten | `setAntennaDrag()` |

Weitere Methoden: `setPointerFollow(false)` folgt dem Zeiger nicht mehr, `setHeadRoundness(75)` stellt die Kopfrundung ein.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 3D-Kopf und Augen

- **3D**: `view="3d"` gibt dem Kopf Tiefe und ein gewölbtes Gesicht; er dreht sich wirklich zum Zeiger und kommt mit einem kleinen Federn zur Ruhe. Alle Ausdrücke, Skins und Farben funktionieren wie gewohnt. Der 3D-Code lädt beim ersten Einschalten.
- **Ausdrücke bewegen den Kopf**: Der Kopf dreht sich mit den Augen, nickt und springt. Mit `motion="reduce"` bleibt er still.
- **Runde Augen**: Schlitze wie beim Zusammenkneifen oder Blinzeln haben runde Enden; `eye-style="sharp"` bringt die geraden Schnitte zurück.
- **Augenfarbe**: `eye-color` wirkt beim einfarbigen Avatar und bei 131 Skins; die übrigen 57 behalten ihre strukturierten Augen (siehe `SKINS[Nummer].eyeColor`). `transparent` wirkt bei allen Skins.
- **Interaktion**: Die Augen folgen dem Zeiger; beim Ziehen wackelt der Kopf wie Wackelpudding; Drücken in der Mitte quetscht ihn; die Antenne lässt sich ziehen und federt zurück; bewegt man den Zeiger über der Stirn hin und her, schließt er die Augen und schmiegt sich an.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Skins

188 Skins in 17 Serien, vom Zeiger beleuchtet, alles reines SVG. Die Nummern ändern sich nie: zuerst die Seriennummer, dann zwei Ziffern für den Skin (305 = Serie 3, Skin 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // zurück zu einer einfachen Farbe
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="BoopFace-Skins: Auswahl, Serienfilter und Suche" width="100%">

| Serie | Nummern | Serie | Nummern | Serie | Nummern |
| --- | --- | --- | --- | --- | --- |
| Glasur | 101–106 | Eisglas | 201–206 | Gummi | 301–312 |
| Bonbonglas | 401–406 | Acryl | 501–512 | Gelee | 601–612 |
| Verlauf | 701–712 | Milchglas | 801–806 | Metall | 901–930 |
| Edelsteine und Keramik | 1001–1012 | Holz | 1101–1106 | Bälle | 1201–1210 |
| Klar und schimmernd | 1301–1305 | Stoff und Leder | 1401–1412 | Süßes und Obst | 1501–1512 |
| Natur | 1601–1612 | Muster und Technik | 1701–1717 |  |  |

Alle Skins auf der [Skins-Seite im Studio](https://boopface.com/demo/?lang=de#skins). `await loadSkins()` lädt sie vorab; `SKINS`, `SKIN_SERIES` und `SKIN_NAMES` liefern Namen, Serien und Nummern.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## KI anbinden

Gib `connectAgent()` den Stream, den dein KI-SDK liefert, und der Avatar zeigt von selbst Denken, Tool-Aufrufe, Antworten, Fertig und Fehler.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // Antwort wie gewohnt anzeigen
}
```

Unterstützt AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, das Vercel AI SDK und den Status von `useChat`. Elemente lassen sich auch einzeln mit `agent.handle(event)` übergeben, oder ein Zustand wie `agent.handle('thinking')`.

| Zustand | Standardausdruck | Zustand | Standardausdruck |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Andere Ausdrücke verwenden:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

Im [Studio](https://boopface.com/demo/?lang=de#agent) kannst du mit einem KI-angebundenen Avatar chatten und sehen, wie jedes Format angebunden wird.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Sprachgespräche

Jede Runde eines Sprachassistenten ist Zuhören, Nachdenken, Sprechen. BoopFace hat dazu passende Ausdrücke, die fließend ineinander übergehen:

```js
avatar.startListening();                   // der Nutzer spricht
avatar.startWaiting({ variant: 'bloom' }); // die KI denkt nach
avatar.startSpeaking();                    // die KI antwortet
avatar.setVoiceLevel(0.6);                 // optional: Lautstärke 0–1
```

Mit `connectAgent()` wechselt es automatisch (OpenAI Realtime, ElevenLabs und mehr). Bekommt `connectAudio()` das Mikrofon und das Antwort-Audio, bewegen sich die Augen mit der echten Lautstärke:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React und Vue

Eine Standard-Web-Component, in jedem Framework direkt nutzbar.

```jsx
// React 19 (in Next.js 'use client' ergänzen)
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3 braucht die Deklaration des Custom Elements in `vite.config.js`:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Beispiele, die beim Öffnen laufen, ohne Build: [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). Die Komponente sendet die Ereignisse `face-state` (was angezeigt wird) und `action-state` (Beginn und Ende von Aktionen); [`accessibility.html`](../examples/accessibility.html) zeigt Ansagen für Screenreader. TypeScript-Typen sind enthalten.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: dieselben Augenausdrücke auf Board-Bildschirmen mit ESP32, STM32 und Raspberry Pi Pico">
</p>

Dieselben Augenausdrücke auf Roboter- und Board-Bildschirmen. Eine kleine C++11-Engine mit 33 Ausdrücken; Firmware-Beispiele decken 28 Board-Bildschirm-Kombinationen mit ESP32, ESP32-S3, STM32 und Raspberry Pi Pico ab (runde und eckige TFTs, Leistenbildschirme, AMOLED, monochrome OLEDs).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: Augen auf einem Board-Bildschirm, Ausdrucksknöpfe und die Bildschirmliste" width="100%">

1. **Vorschau**: Der [Online-Simulator](https://boopface.com/hardware/?lang=de) nutzt dieselbe Engine und simuliert 32 Bildschirme, so siehst du es auch ohne Board.
2. **Export**: Layout, Farben und Bildrate einstellen, auf Einstellungen exportieren klicken und `eyes_settings.h` neben die `main.cpp` der Beispiel-Firmware legen und bauen. [Schritte](../embedded/README.de.md#im-simulator-einstellen-direkt-aufs-board)
3. **Installation**: In der Arduino IDE `BoopFace-Embedded-0.2.0.zip` von der [Release-Seite](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) hinzufügen; in PlatformIO `lib_deps = cxlab/BoopFace@^0.2.0` verwenden.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1-Bit-Pixel

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* eyes.data() an den Bildschirm senden */ } }
// eyes.play("success", millis());
```

Experimentell: Alle Konfigurationen bauen in der CI, aber nicht alle wurden auf echter Hardware geprüft. [Hardware-Berichte](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) sind willkommen. Vollständige Anleitung: [Embedded-Dokumentation](../embedded/README.de.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Weiteres

- **Umstieg von Agent Robot Avatar**: in 0.8 umbenannt, gleiche Nutzung. `npm uninstall agent-robot-avatar && npm install boopface` ausführen; das alte Tag `<agent-robot-avatar>` funktioniert bis 1.0.
- **Kompatibilität**: moderne Browser mit ES Modules, Custom Elements und Web Animations; automatische Tests laufen in Chromium, Firefox und WebKit.
- **Version**: **Web v0.9.0**, Embedded v0.2.0 (experimentell). Bis 1.0 ändert sich die API behutsam.
- **Showcase**: [Projekte der Community](../SHOWCASE.md), [eigenes einreichen](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Mitmachen**: Issues und Pull Requests sind willkommen; bitte zuerst [`CONTRIBUTING.md`](../CONTRIBUTING.md) lesen.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Lizenz und Figur

Der Code steht unter der [MIT-Lizenz](../LICENSE): in deinen Apps nutzen, ändern und weitergeben. Die Figur BoopFace, ihr Aussehen, Name und visuelle Identität sind Originalentwürfe von CX ArtLab; die MIT-Lizenz überträgt sie nicht und erlaubt nicht, sie als Originalfigur oder Marke eines anderen auszugeben.

BoopFace ist ein unabhängiges Open-Source-Projekt, weder mit einer KI-Plattform oder Marke verbunden noch von ihr unterstützt; Produktnamen werden nur zur Beschreibung von Einsatzzwecken genannt.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Spendier mir einen Kaffee

Wenn dir dieses Projekt nützlich ist, kannst du mir einen Kaffee spendieren.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
