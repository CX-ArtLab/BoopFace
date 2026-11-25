# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: eine leichte, ausdrucksstarke Roboter-Avatar-Komponente für KI-Bots, Agenten und interaktive Apps">
</p>

**Offizielle Website: [boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace ist eine leichte, ausdrucksstarke Roboter-Avatar-Komponente für KI-Bots, Agenten und interaktive Apps. Nachdenken, Warten, Fertig oder Fehler: Jeder Zustand eines Agenten lässt sich mit einem Gesichtsausdruck zeigen.

Geeignet als Gesicht und Statusanzeige für KI-Assistenten und Agenten: Chat-Assistenten wie ChatGPT, Claude, Gemini, Grok und DeepSeek, Coding-Agenten wie Codex, Claude Code, Cursor, Gemini CLI und OpenCode sowie persönliche Agenten wie Grok Bot, ChatGPT dots, Meta Muse, OpenClaw und Hermes Agent.

Auch für Desktop-Begleiter, virtuelle Haustiere, digitale Maskottchen, Chatbot-Avatare und andere interaktive Figuren geeignet, oder als visuelle Feedback-Ebene für Agenten-Oberflächen im AG-UI-Stil.

Gebaut mit SVG und reinem JavaScript, ist es eine native Web Component ohne Laufzeitabhängigkeiten, MIT-lizenziert. Es lässt sich flach zeigen oder auf einen [3D-Kopf](#3d-kopf--neu-in-09) umschalten, der sich wirklich dreht; 188 [Skins](#skins--neu-in-07) stehen jederzeit bereit.

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Interaktive Animationsdemo von BoopFace" width="560">
</p>

## Neu: [BoopFace Embedded](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="Dieselben Augenausdrücke auf ESP32-, STM32- und Raspberry-Pi-Pico-Bildschirmen oder in anderen C++-Programmen. Mit Firmware-Beispielen für 28 Konfigurationen und einem Simulator samt Einstellungsexport."></a>
</p>

Dieselben Augenausdrücke auf ESP32-, STM32- und Raspberry-Pi-Pico-Bildschirmen oder in anderen C++-Programmen. Mit Firmware-Beispielen für 28 Konfigurationen und einem Simulator samt Einstellungsexport.

## Live-Demo

Ab 0.9 sind Demo, Skins und KI-Anbindung eine Seite: das Studio. Die Bühne schaltet zwischen flach und 3D; daneben kannst du jeden Ausdruck und das Sprach-Kit ausprobieren, Skins und Farben wechseln, das Verhalten einstellen, mit einem an eine KI angebundenen Avatar chatten und jederzeit den Code für das Gezeigte kopieren.

[Studio öffnen](https://cx-artlab.github.io/BoopFace/?lang=de) · [Skin aussuchen](https://cx-artlab.github.io/BoopFace/?lang=de#skins) · [KI-Anbindung ausprobieren](https://cx-artlab.github.io/BoopFace/?lang=de#agent)

[Embedded-Simulator öffnen](https://cx-artlab.github.io/BoopFace/hardware/?lang=de)

## Besondere Merkmale

- Native Web Component
- SVG-Rendering + Vanilla JavaScript
- Keine Runtime-Abhängigkeiten
- Flach oder 3D; der 3D-Kopf dreht sich wirklich zum Zeiger
- Automatisches Blinzeln und dezentes Idle-Verhalten
- Augen folgen dem Zeiger, Kopf mit Trägheit; jeder Ausdruck bewegt den ganzen Kopf
- Über die Stirn streicheln: der Avatar schließt die Augen und schmiegt sich an
- Lokale Jelly-Drag-Verformung mit elastischer Rückkehr
- Drücken-und-Halten-Stauchung und ziehbare Federantenne
- Programmatisch steuerbare Agent-Zustände und Ausdrücke
- Über 30 Ausdrücke: waiting, success, failure, affirm, wary, inspect, angry, refuse, love und neu in 0.9 Verbeugen, Beobachten, Denken, Zwinkern, Selbstzufrieden, Schwindlig, Hüpfen und mehr
- Abgerundete Augen in jeder Farbe oder durchsichtig, sodass der Hintergrund durchscheint
- Unterstützung für reduzierte Bewegung
- Konfigurierbares Schlafverhalten
- Einstellbare Kopfrundung
- 188 nummerierte Skins in 17 Serien, mit Licht, das dem Zeiger folgt
- Schlanke Version ohne Skins für besonders kleine Seiten
- `connectAgent()`: Ereignisse eines KI-Streams steuern die Ausdrücke (AG-UI, OpenAI, Anthropic, Vercel AI SDK)
- Sprach-Interaktions-Kit: ein Set aus Zuhören, Nachdenken und Sprechen, das der echten Lautstärke folgt
- TypeScript-Deklarationen enthalten

## Installation

```bash
npm install boopface
```

```js
import 'boopface';
```

Oder lade `boopface-x.y.z.zip` aus dem [neuesten Release](https://github.com/CX-ArtLab/boopface/releases/latest) herunter. Es enthält nur die Komponente, samt Skins. Entpacke es neben deine Seite:

```html
<script type="module" src="./boopface/boopface.js"></script>
```

Dann die Komponente hinzufügen:

```html
<boop-face id="avatar"></boop-face>
```

Es ist kein Initialisierungscode nötig. Der Avatar wechselt automatisch in seinen standardmäßigen Idle-Zustand.

### Umstieg von Agent Robot Avatar

Bis Version 0.8 hieß BoopFace Agent Robot Avatar. Funktionen und Verwendung bleiben gleich. Zum Aktualisieren genügt es, den Paketnamen auf `boopface` zu ändern:

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

Das alte Tag `<agent-robot-avatar>` funktioniert bis 1.0 weiter, deine Seiten musst du also nicht sofort ändern. Das alte npm-Paket `agent-robot-avatar` erhält keine Updates mehr; neue Versionen erscheinen nur noch als `boopface`.

### Schlanke Version

Für Seiten ohne Skins ist `boopface/lite` derselbe Avatar ganz ohne Skin-Code:

```js
import 'boopface/lite';
```

Die schlanke Version ignoriert das Attribut `skin` und weist in der Konsole darauf hin, dass Skins die vollständige Version brauchen.

Größenvergleich (Übertragung über das Netz, gzip-komprimiert):

| Version | Größe |
| --- | --- |
| Schlanke Version `boopface/lite` | etwa 92 KB |
| Vollständig, Seite nutzt keine Skins | etwa 104 KB; der Code zum Zeichnen der Skins wird nicht geladen |
| Vollständig, mit Skins | etwa 161 KB; der zusätzliche Teil lädt erst, wenn zum ersten Mal ein Skin verwendet wird |

Wechselt eine der beiden Varianten auf 3D, lädt sie etwa 19 KB für die 3D-Darstellung nach.

## Grundlegende Verwendung

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

Verfügbare Aktionen:

| Aktion | Aussehen | Wann verwenden |
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

Warte-Aktionen spielen mit `play()` eine Runde. `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` läuft in Schleife, bis eine andere Aktion startet oder `stopWaiting()` aufgerufen wird.

Namen aus 0.5 (`send`, `warning`, `error`, `blocked`, `slot` und weitere) funktionieren bis 1.0 weiter, mit einem Hinweis in der Konsole; siehe die [Upgrade-Tabelle](../CHANGELOG.md#upgrading-from-05x).

Ein typischer Agent-Anfrageablauf:

```js
avatar.startWaiting();

// Zweite Wartebewegung: Die Augen drehen seitlich heraus und kommen von der anderen Seite zurück.
avatar.startWaiting({ variant: 'wrap' });

// Dritte Wartebewegung: versetzte Augenwellen auf und ab.
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## Häufige Optionen

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

| Attribut | Zweck |
| --- | --- |
| `size` | Avatargröße in Pixeln |
| `view` | `2d` (Standard, flach) oder `3d` |
| `color` | Hauptfarbe des Avatars |
| `eye-color` | Augenfarbe; `transparent` lässt den Hintergrund durch die Augen scheinen |
| `eye-style` | Standardmäßig abgerundete Augen; `sharp` bringt die geraden Schnitte zurück |
| `auto-sleep` | Leerlaufzeit vor automatischem Schlaf; `0` deaktiviert ihn |
| `wake-on` | Automatische Aufwachstrategie: `activity`, `interaction` oder `manual` |
| `motion` | Bewegungsstrategie: `auto`, `reduce` oder `full` |
| `press-squeeze` | Mitte gedrückt halten und stauchen; `false` deaktiviert die Geste |
| `antenna` | `false` blendet die Antennenkugel aus |
| `antenna-drag` | Antenne ziehen, zurückfedern und schwindlige Reaktion; mit `false` abschalten |
| `idle-gaze` | In Ruhe schauen die Augen ab und zu umher; `false` lässt sie geradeaus schauen |
| `skin` | Skin-Nummer, z. B. `301`; weglassen für die flache Farbe |

Häufige Runtime-Steuerungen:

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // Streicheln abschalten
```

Ein Druck auf die Mitte des Avatars startet das Quetschen. Bewegt sich der Zeiger mehr als 4 CSS-Pixel, geht dieselbe Geste in das bestehende Ziehen des Kopfes über. Das Ziehen der Antenne nutzt dieselbe Zuggrenze wie das Ziehen des Kopfes und endet mit dem schwindligen Ausdruck.

## 3D-Kopf · Neu in 0.9

```html
<boop-face view="3d"></boop-face>
```

`view="3d"` (oder `avatar.setView('3d')`) macht den Avatar zu einem Kopf mit Tiefe: Er dreht sich wirklich zum Zeiger, sein Gesicht ist gewölbt, und nach jeder Drehung federt er kurz nach, bevor er ruht. Alle Ausdrücke, Gesten, Skins und Farben funktionieren in 3D; `view="2d"` kehrt zur flachen Ansicht zurück. Der 3D-Code wird erst geladen, wenn eine Seite zum ersten Mal auf 3D schaltet; rein flache Seiten laden ihn nie.

**Jeder Ausdruck bewegt den Kopf.** Der Kopf dreht sich dorthin, wohin die Augen schauen, nickt, neigt sich und springt; in 3D dreht er sich wirklich, flach wird die Drehung gezeichnet. Mit `motion="reduce"` bleibt er still.

**Abgerundete Augen.** Wo ein Lid ein Auge schneidet, ist die Ecke jetzt abgerundet, und schmale Schlitze (Schlaf, Blinzeln, Zwinkern, der Eingabecursor) haben runde Enden. Für die alten geraden Schnitte `eye-style="sharp"` verwenden.

**Augenfarbe.** `eye-color="#2bd67b"` (oder `setEyeColor()`) färbt die Augen, beim schlichten Avatar und bei den 131 Skins mit schlichten Augen. Die übrigen 57 Skins haben Augen mit eigener Textur (erhaben, gläsern oder gemustert) und behalten sie; `SKINS[Nummer].eyeColor` zeigt, welche sich ändern lassen. `eye-color="transparent"` schneidet die Augen aus dem Kopf, sodass alles hinter dem Avatar darin zu sehen ist; das funktioniert bei jedem Skin, auch bei texturierten Augen.

**Streicheln.** Ein paar Mal über die Stirn streichen, und der Avatar schließt die Augen und schmiegt sich an. Standardmäßig an; `setPetting(false)` schaltet es ab.

## Skins · Neu in 0.7

188 Skins in 17 Serien; das Licht folgt dem Zeiger. Jeder Skin hat eine feste Nummer: die Seriennummer und zwei Ziffern, 305 ist also der fünfte Skin der Serie 3. Namen können sich ändern, Nummern nie, und sie werden nicht wiederverwendet.

Alle Skins sind weiterhin reines SVG – ohne Bilder, Canvas oder WebGL. Alle Skins zusammen sind über das Netz nur etwa 70 KB groß (unkomprimiert etwa 290 KB), und das meiste davon lädt erst, wenn eine Seite einen Skin verwendet. Zum Vergleich: Der Avatar selbst (der Lite-Build, ohne Skins) ist etwa 92 KB groß.

<img src="../assets/readme/skin-gallery.jpg" alt="Skin-Galerie: Empfehlungen, Filter und Suche" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // oder '102'
avatar.setSkin(null); // zurück zur flachen Farbe
```

Alle Skins mit ihren Nummern gibt es im [Skin-Tab des Studios](https://cx-artlab.github.io/BoopFace/?lang=de#skins).

| Serie | Nummern | Serie | Nummern | Serie | Nummern |
| --- | --- | --- | --- | --- | --- |
| Glasur | 101–106 | Eisglas | 201–206 | Gummi | 301–312 |
| Bonbonglas | 401–406 | Acryl | 501–512 | Gelee | 601–612 |
| Verlauf | 701–712 | Milchglas | 801–806 | Metall | 901–930 |
| Edelsteine und Keramik | 1001–1012 | Holz | 1101–1106 | Bälle | 1201–1210 |
| Klar und schimmernd | 1301–1305 | Stoff und Leder | 1401–1412 | Süßes und Obst | 1501–1512 |
| Natur | 1601–1612 | Muster und Technik | 1701–1717 |  |  |

Der Code, der die Skins zeichnet, wird erst beim ersten Skin geladen; eine Seite ohne Skins lädt ihn nie. `await loadSkins()` lädt ihn vorab. `SKINS` enthält die chinesischen und englischen Namen und Farben jedes Skins, `SKIN_SERIES` die Serien und `SKIN_NAMES` alle Nummern.

Alle Ausdrücke und Gesten funktionieren mit einem Skin. Ohne Skin gilt wieder das Attribut `color`.

## Einen KI-Stream anbinden · Neu in 0.9

Mit `connectAgent()` steuert ein KI-Stream den Avatar direkt. Übergeben Sie die Ereignisse, die Ihr KI-SDK ohnehin liefert, und der Avatar zeigt Nachdenken, Werkzeugnutzung, Antworten, Fertig, Fehler und Ablehnung von selbst.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // Antwort wie gewohnt anzeigen
}
```

`track()` reicht jedes Element unverändert weiter. Ein sauber beendeter Stream gilt als fertig, ein geworfener Fehler als Fehlschlag, ein Abbruch oder ein vorzeitiges `break` als abgebrochen. Sie können Elemente auch einzeln mit `agent.handle(event)` übergeben oder direkt einen Zustand wie `agent.handle('thinking')`.

Unterstützt werden AG-UI-Ereignisse, OpenAI-Responses-, Realtime- und Chat-Completions-Streams, Anthropic-Messages-Streams, Vercel-AI-SDK-Stream-Parts und der `useChat`-Status (`submitted`, `streaming`, `ready`, `error`). Alles andere wird ignoriert.

| Zustand | Standardausdruck | Wann |
| --- | --- | --- |
| `listening` | `listening`, in Schleife | Sprache: der Nutzer spricht |
| `thinking` | `waiting-spin`, in Schleife | Anfrage gesendet, das Modell denkt nach |
| `tool` | `waiting-wave`, in Schleife | Ein Werkzeugaufruf läuft |
| `replying` | `idle` | Antworttext trifft ein |
| `speaking` | `speaking`, in Schleife | Sprache: die Antwort der KI wird abgespielt |
| `approval` | `wary` | Der Agent braucht eine Bestätigung |
| `done` | `success` | Fertig |
| `error` | `failure` | Fehlgeschlagen |
| `refused` | `refuse` | Das Modell hat abgelehnt |
| `cancelled` | `idle` | Vom Nutzer gestoppt |
| `typing` | `input` | Der Nutzer tippt, gesetzt mit `handle('typing')` |
| `idle` | `idle` | Nichts läuft |

Jeden Zustand können Sie durch einen Aktionsnamen, eine Funktion oder `null` (nichts anzeigen) ersetzen:

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

Im [Studio](https://cx-artlab.github.io/BoopFace/?lang=de#agent) kannst du mit einem an eine KI angebundenen Avatar chatten; unter Code › KI anbinden legst du den Ausdruck für jeden Zustand fest und siehst den Code für jedes Format.

## Sprach-Interaktions-Kit · Neu in 0.9

Zuhören, nachdenken, sprechen: Diese drei Schritte durchläuft jeder Sprachassistent in jeder Runde. Das Sprach-Interaktions-Kit gibt dem Avatar dafür ein Set aus drei Ausdrücken, die ineinander übergehen. Es passt zu jedem Produkt, mit dem man spricht, unabhängig vom Sprachdienst: Rufen Sie die drei Methoden selbst auf oder lassen Sie `connectAgent()` Ihrer Sprach-API folgen.

```js
avatar.startListening();                   // der Nutzer spricht
avatar.startWaiting({ variant: 'bloom' }); // die KI denkt nach
avatar.startSpeaking();                    // die KI antwortet
avatar.setVoiceLevel(0.6);                 // optional: Lautstärke von 0 bis 1
```

Beim Zuhören verschmelzen beide Augen zu einem runden Auge, das mit der Stimme des Nutzers anschwillt. Beim Nachdenken wird daraus eine langsam drehende Blüte aus zwei gekreuzten Ovalen. Beim Sprechen teilt es sich wieder in zwei Augen, die kurz zur Ruhe kommen und sich dann mit der Antwort strecken: tiefe Töne im linken, hohe im rechten Auge. `setVoiceLevel(level)` oder `setVoiceLevel([low, high])` liefert die Lautstärke; ohne sie behält das Sprechen einen eigenen Rhythmus, und das Zuhören hält still. Jeder Schritt läuft in Schleife bis zum nächsten, und beim Wechsel verformen sich die Augen, statt zu springen.

Nachdenken ist ein Warteschritt. Erblühen (`variant: 'bloom'`) und Kreuz (`variant: 'cross'`) gehen direkt aus dem Zuhör-Auge hervor; jeder andere Wartestil funktioniert ebenso.

`connectAgent()` kann sie auch selbst umschalten. Es versteht bereits die Ereignisse gängiger Sprach-APIs, etwa OpenAI Realtime und den `mode`, den SDKs wie ElevenLabs melden. Beim Nachdenken wartet es mit Erblühen (oder mit dem Stil aus `actions.thinking`) und kehrt nach jeder Antwort zum Zuhören zurück. Beispiel mit OpenAI Realtime:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` nimmt MediaStreams oder `<audio>`-Elemente und gibt ihre Lautstärke an die Augen weiter. Ist die Antwort verbunden, merkt der Avatar auch, wann sie fertig abgespielt ist.

## React und Vue

`<boop-face>` ist eine Standard-Web-Component und funktioniert deshalb in jedem Framework.

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

Markieren Sie die Datei in Next.js mit `'use client'`.

**Vue 3**

Teilen Sie Vue in `vite.config.js` mit, dass `boop-face` ein Custom Element ist:

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

Seiten, die ohne Build-Schritt laufen: [`examples/react.html`](../examples/react.html) und [`examples/vue.html`](../examples/vue.html).

## Ereignisse und Integration

Die Komponente sendet `face-state` für visuelle Zustandsänderungen und `action-state` für semantische Änderungen im Aktionslebenszyklus.

Für Host-Integrationen und barrierefreie Statustexte sollte `action-state` bevorzugt werden. Ein ausführbares Anfrage-Lifecycle-Beispiel befindet sich in [`examples/accessibility.html`](../examples/accessibility.html).

Ein minimales Integrationsbeispiel ist unter [`examples/basic.html`](../examples/basic.html) verfügbar.

## Kompatibilität

Für moderne Browser mit Unterstützung für ES Modules, Custom Elements, SVG, Pointer Events, Web Animations API, `IntersectionObserver`, `ResizeObserver` und `matchMedia`.

Automatisierte Browsertests decken Chromium, Firefox und WebKit ab.

<a id="boopface-embedded"></a>

## Neu: BoopFace Embedded

Die Augenausdrücke der Webversion laufen jetzt auf Robotern und Entwicklungsplatinen. Die kleine C++11-Engine erhält Bewegungen und Timing. Die Beispiele decken 28 Konfigurationen mit ESP32, ESP32-S3, STM32 und Raspberry Pi Pico ab: runde und rechteckige TFTs, längliche Displays, AMOLED und monochrome OLEDs. Eigene Bildschirmgrößen werden unterstützt. Version 0.2 zieht mit dem Web 0.9 gleich: dieselben abgerundeten Augen, 13 neue Ausdrücke wie Verbeugen, Beobachten, Denken, Zwinkern, Selbstzufrieden, Schwindlig und Hüpfen sowie Zuhören und Sprechen aus dem Sprach-Kit, 33 insgesamt.

| Dein Gerät | Passende Version |
| --- | --- |
| Websites, Apps, Android-Tablets und Roboter mit Browser | Webkomponente: vollständiger Avatar, Skins und Interaktionen |
| ESP32, STM32 und Raspberry Pi Pico | Embedded-Engine mit Firmware-Beispielen |
| Andere Mikrocontroller oder C++-Programme | C++-Bibliothek; eigenen Bildschirmtreiber einbinden |


<img src="../assets/readme/hardware-preview.jpg" alt="Simulator: Augenausdrücke auf rundem TFT, Anordnung, Farben und Export" width="100%">

**Ohne Platine ausprobieren.** Der [Simulator](https://cx-artlab.github.io/BoopFace/hardware/?lang=de) führt dieselbe C++-Engine im Browser auf 32 simulierten Bildschirmen aus. So kannst du Module vergleichen und die Darstellung vorab ansehen.

**Anpassen, exportieren, bauen.** Wähle Bildschirm, Anordnung, Farben und Bildrate, dann **Einstellungen exportieren**. Speichere `eyes_settings.h` neben der `main.cpp` des Beispiels und kompiliere. Siehe die [Anleitung](../embedded/README.md). Oberfläche und exportierte Kommentare folgen der gewählten Sprache.

**Per ZIP installieren.** Lade `BoopFace-Embedded-0.2.0.zip` vom [Embedded-Release](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) und verwende **Sketch → Bibliothek einbinden → .ZIP-Bibliothek hinzufügen** in der Arduino IDE. Die Indexierung im Arduino Library Manager steht noch aus; nutze dafür vorerst ZIP oder Quellcode. Für [PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) füge diese Abhängigkeit zur Umgebung in `platformio.ini` hinzu:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**In deinem Programm** spielst du Ausdrücke nach Namen ab:

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1 bit per pixel

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // Send eyes.data() to the display driver.
  }
}

// When needed: eyes.play("success", millis());
```

Experimentell: CI kompiliert alle Konfigurationen, auf realer Hardware sind sie noch nicht geprüft. Sende nach einem Test einen [Hardwarebericht](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml). API und Anschlüsse stehen in der [Anleitung](../embedded/README.md).

## Mitwirken

Issues und Pull Requests sind willkommen. Bitte vor Änderungen [`CONTRIBUTING.md`](../CONTRIBUTING.md) lesen.

## Projektstatus

**Aktuelle öffentliche Version: v0.9.0**\
BoopFace Embedded: v0.2.0 (experimentell)

Die öffentliche API bleibt bewusst kompakt, während sich das Projekt in Richtung einer zukünftigen Stabilitätszusage mit `1.0.0` entwickelt.

BoopFace wird unabhängig entwickelt und ist mit keiner KI-Plattform oder Marke verbunden, von ihr unterstützt oder deren offizieller Vertreter.

## Charakterdesign und visuelle Identität

Der BoopFace-Charakter einschließlich seines Roboterdesigns und seiner visuellen Identität ist ein Originaldesign von CX ArtLab.

Die MIT-Lizenz gilt für Software und Quellcode. Sie erlaubt die Nutzung, Änderung und Verteilung des Avatars als Teil von Anwendungen, überträgt jedoch nicht das Eigentum am Namen BoopFace, an der Charakteridentität oder der visuellen Identität und gewährt nicht das Recht, diese als eigenen Originalcharakter oder eigenständige Marke eines Dritten darzustellen.

In diesem Projekt genannte Produktnamen Dritter dienen nur zur Beschreibung möglicher Anwendungsfälle und bedeuten keine Verbindung oder Unterstützung.

## Lizenz

MIT License. Siehe [`LICENSE`](../LICENSE).

---

Wenn dir dieses Projekt nützlich ist, kannst du mir einen Kaffee spendieren.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
