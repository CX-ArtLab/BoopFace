# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace : un composant d’avatar robot léger et expressif pour les bots IA, les agents et les apps interactives">
</p>

**Site officiel : [boopface.com](https://boopface.com/)** · **Démo en ligne : [BoopFace Studio](https://boopface.com/demo/?lang=fr)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace est un composant d’avatar robot léger et expressif pour les bots IA, les agents et les apps interactives. Réflexion, attente, terminé, erreur : chaque état d’un agent peut se montrer par une expression.

Il sert de visage et de retour d’état aux assistants et agents IA : assistants de chat comme ChatGPT, Claude et Gemini, agents de code comme Codex, Claude Code et Cursor, et toutes sortes d’agents personnels. Il convient aussi aux compagnons de bureau, animaux virtuels, mascottes numériques et avatars de chatbots.

Un Web Component natif en SVG et JavaScript pur, sans dépendance à l’exécution, sous licence MIT. Il s’affiche à plat ou passe à une tête en 3D qui tourne vraiment ; 188 skins sont prêtes à porter.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#démarrage-rapide">Démarrage rapide</a> · <a href="#expressions">Expressions</a> · <a href="#réglages">Réglages</a> · <a href="#tête-3d-et-yeux">Tête 3D et yeux</a> · <a href="#skins">Skins</a> · <a href="#connecter-une-ia">Connecter une IA</a> · <a href="#conversations-vocales">Conversations vocales</a> · <a href="#react-et-vue">React et Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Essayer en ligne

<h3 align="center">Site officiel</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Démo en ligne BoopFace Studio</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=fr"><b>Ouvrir Studio</b></a> · <a href="https://boopface.com/demo/?lang=fr#skins">Choisir une skin</a> · <a href="https://boopface.com/demo/?lang=fr#agent">Essayer Connecter une IA</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Démo d’interaction BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Simulateur BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=fr"><b>Ouvrir le simulateur embarqué</b></a> (32 écrans de cartes prédéfinis)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Nouveautés de la 0.9

- BoopFace prend du relief. [Détails](#tête-3d-et-yeux)
- 15 nouvelles expressions et le kit de conversation vocale. [Détails](#expressions)
- Nouvelle réaction aux caresses : agitez le pointeur sur son front. [Détails](#tête-3d-et-yeux)
- Connexion IA mise à jour. [Détails](#connecter-une-ia)
- La démo en ligne, refaite de zéro : [BoopFace Studio](https://boopface.com/demo/?lang=fr)
- Embedded 0.2 : les nouvelles expressions arrivent aussi sur les cartes. [Détails](#boopface-embedded)

Tous les détails dans le [CHANGELOG](../CHANGELOG.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Points forts de BoopFace

- Web Component natif, rendu SVG + JavaScript pur, aucune dépendance à l’exécution, fonctionne avec tous les frameworks
- Un composant d’avatar qui exprime des émotions, avec une expression pour chaque type d’état
- Plus de 30 expressions qui le rendent vivant
- Interactif : les yeux suivent le pointeur ; glisser, écraser, appuyer, tirer l’antenne et caresser déclenchent une réaction
- À plat ou en 3D selon l’usage, avec 188 skins à changer à tout moment
- Les événements des flux IA pilotent directement les expressions (AG-UI, OpenAI, Anthropic, Vercel AI SDK), conversations vocales comprises
- Léger : la version lite fait environ 92 Ko
- BoopFace Embedded : les mêmes expressions sur les écrans de cartes (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Démarrage rapide

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

Aucun code d’initialisation : l’avatar cligne des yeux et attend tout seul. `view="3d"` donne la tête 3D du site officiel ; sans lui, c’est l’avatar plat (par défaut, et plus léger).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Sans npm : téléchargez `boopface-x.y.z.zip` depuis la [dernière version](https://github.com/CX-ArtLab/boopface/releases/latest), décompressez-le à côté de votre page et chargez-le avec `<script type="module" src="./boopface/boopface.js"></script>`.

**Taille** (taille transférée, gzip)

| Version | Taille |
| --- | --- |
| Lite `import 'boopface/lite'`, sans skins | environ 92 Ko |
| Complète, la page n’utilise pas de skin | environ 104 Ko |
| Complète, avec skins | environ 161 Ko (le code des skins se charge à la première utilisation) |

Passer en 3D télécharge environ 19 Ko de plus.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Expressions

```js
avatar.play('success');   // jouer une fois
avatar.startWaiting();    // attendre jusqu’à stopWaiting() ou une autre expression
avatar.reset();           // revenir au repos
```

| Action | Aspect | Idéal pour |
| --- | --- | --- |
| `idle` | Cligne des yeux et regarde autour | État par défaut |
| `bored` | Regarde lentement d’un côté puis de l’autre | Rien ne se passe depuis un moment |
| `waiting-spin` | Les yeux tournent d’un côté à l’autre | En attente d’une réponse (par défaut) |
| `waiting-wrap` | Les yeux sortent d’un côté et reviennent par l’autre | En attente d’une réponse |
| `waiting-wave` | Les yeux montent et descendent à tour de rôle | En attente d’une réponse |
| `waiting-bloom` | Deux ovales croisés respirent et tournent comme une fleur | En attente d’une réponse ; conçue pour les conversations vocales |
| `waiting-cross` | Deux ovales croisés reposent sur le ×, tournent d’un quart de tour à la fois et alternent fin et plein | Attente d’une réponse ; convient aussi à la voix |
| `shape-wait` | Les yeux fusionnent en une forme qui passe du cercle au carré arrondi | Attente d’une réponse |
| `input` | Les yeux deviennent des curseurs clignotants | L’utilisateur tape |
| `listening` | Les deux yeux fusionnent en un œil rond qui gonfle avec la voix | Voix : l’utilisateur parle |
| `speaking` | Les yeux se séparent de nouveau et s’étirent avec la réponse | Voix : l’IA répond |
| `affirm` | Hoche la tête | Compris, confirmé |
| `success` | Yeux joyeux et souriants | Tâche terminée |
| `failure` | Baisse la tête et les yeux | Échec d’une tâche ou d’une connexion |
| `wary` | Tourne la tête et toise de haut en bas avec méfiance | L’action demande une confirmation |
| `inspect` | Plisse les yeux et balaie de haut en bas | Vérifier ou relire quelque chose |
| `observe` | Ouvre grand les yeux, se penche et regarde autour | Regarder de près, lire quelque chose |
| `think` | Lève les yeux et se tourne lentement de l’autre côté | Réfléchir avant de répondre |
| `ponder` | Baisse les yeux, regarde à gauche et à droite, puis relève la tête | Peser quelque chose avec soin |
| `bow` | Un profond hochement, une pause, puis remonte | Remerciement, excuse, salut |
| `angry` | Yeux baissés et furieux | Contenu bloqué |
| `refuse` | Secoue la tête | Ne peut pas ou ne veut pas faire la demande |
| `shake` | Les yeux se détournent d’abord, la tête suit | Désaccord, ne pas vouloir regarder |
| `surprise` | Yeux grands ouverts | Quelque chose d’inattendu |
| `love` | Les yeux forment un cœur qui bat | Remerciement, affection |
| `wink` | Penche la tête et fait un clin d’œil | Saluer, plaisanter |
| `smug` | Plisse les yeux, regarde en haut et sur les côtés | Content de soi, espiègle |
| `bounce` | Rebondit comme une balle | Joie, célébration |
| `smug-bounce` | Deux petits bonds souriants, penchés à gauche puis à droite | Un peu de fierté |
| `dizzy` | Les yeux tournent en sens inverse, l’un grand, l’autre petit | Étourdi, trop d’informations |
| `random` | Les yeux tournent comme des rouleaux de machine à sous | Tirage au sort, moment ludique |
| `sleep` | Ferme les yeux et dort | Longue inactivité |
| `wake` | Ouvre les yeux et se réveille | L’activité reprend |

Styles d’attente : `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. Les anciens noms d’action de la 0.5 fonctionnent jusqu’à la 1.0 ; voir le [tableau de migration](../CHANGELOG.md#upgrading-from-05x).

Une requête typique :

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

## Réglages

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Attribut | Rôle | Méthode à l’exécution |
| --- | --- | --- |
| `size` | Taille de l’avatar en pixels |  |
| `view` | `2d` (par défaut, à plat) ou `3d` | `setView()` |
| `color` | Couleur principale de l’avatar |  |
| `eye-color` | Couleur des yeux ; `transparent` laisse voir le fond à travers les yeux | `setEyeColor()` |
| `eye-style` | Yeux arrondis par défaut ; `sharp` rétablit les coupes droites |  |
| `skin` | Numéro de skin, par exemple `301` ; à omettre pour la couleur unie | `setSkin()` |
| `auto-sleep` | Temps d’inactivité avant le sommeil automatique ; `0` le désactive |  |
| `wake-on` | Politique de réveil automatique : `activity`, `interaction` ou `manual` |  |
| `motion` | Politique d’animation : `auto`, `reduce` ou `full` |  |
| `idle-gaze` | Au repos, les yeux regardent autour de temps en temps ; `false` les garde droit devant | `setIdleGaze()` |
| `petting` | Passez le pointeur plusieurs fois sur le front : l’avatar ferme les yeux et vient se blottir ; `false` le désactive | `setPetting()` |
| `press-squeeze` | Maintenir le centre pour comprimer ; `false` désactive le geste | `setPressSqueeze()` |
| `antenna` | `false` masque la boule de l’antenne |  |
| `antenna-drag` | Tirer l’antenne, retour élastique et réaction étourdie ; `false` pour désactiver | `setAntennaDrag()` |

Autres méthodes : `setPointerFollow(false)` arrête de suivre le pointeur, `setHeadRoundness(75)` règle l’arrondi de la tête.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Tête 3D et yeux

- **3D** : `view="3d"` donne à la tête de l’épaisseur et un visage bombé ; elle se tourne vraiment vers le pointeur et se pose avec un petit rebond. Toutes les expressions, skins et couleurs fonctionnent comme d’habitude. Le code 3D se charge la première fois que la 3D est activée.
- **Les expressions bougent la tête** : la tête suit les yeux, hoche et saute. Avec `motion="reduce"`, elle reste immobile.
- **Yeux arrondis** : les fentes, comme un plissement ou un clignement, ont des bouts ronds ; `eye-style="sharp"` rétablit les coupes droites.
- **Couleur des yeux** : `eye-color` fonctionne sur l’avatar uni et 131 skins ; les 57 autres gardent leurs yeux texturés (voir `SKINS[id].eyeColor`). `transparent` fonctionne sur toutes les skins.
- **Interaction** : les yeux suivent le pointeur ; tirer la tête la fait onduler comme de la gelée ; appuyer au centre l’écrase ; l’antenne se tire et revient comme un ressort ; agitez le pointeur sur son front et il ferme les yeux pour venir se blottir.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Skins

188 skins en 17 séries, éclairées par le pointeur, tout en SVG pur. Les numéros ne changent jamais : le numéro de série d’abord, puis deux chiffres pour la skin (305 = série 3, skin 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // revenir à une couleur unie
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Skins BoopFace : sélection, filtres par série et recherche" width="100%">

| Série | Numéros | Série | Numéros | Série | Numéros |
| --- | --- | --- | --- | --- | --- |
| Émail | 101–106 | Verre glacé | 201–206 | Gomme | 301–312 |
| Verre bonbon | 401–406 | Acrylique | 501–512 | Gelée | 601–612 |
| Dégradé | 701–712 | Verre dépoli | 801–806 | Métal | 901–930 |
| Pierres et céramique | 1001–1012 | Bois | 1101–1106 | Balles | 1201–1210 |
| Transparent et chatoyant | 1301–1305 | Tissu et cuir | 1401–1412 | Douceurs et fruits | 1501–1512 |
| Nature | 1601–1612 | Motifs et tech | 1701–1717 |  |  |

Toutes les skins sur la [page des skins de Studio](https://boopface.com/demo/?lang=fr#skins). `await loadSkins()` les charge à l’avance ; `SKINS`, `SKIN_SERIES` et `SKIN_NAMES` donnent noms, séries et numéros.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Connecter une IA

Passez à `connectAgent()` le flux que vous donne votre SDK d’IA, et l’avatar affiche de lui-même la réflexion, les appels d’outils, la réponse, la fin et les erreurs.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // afficher la réponse comme d’habitude
}
```

Prend en charge AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, le Vercel AI SDK et l’état de `useChat`. Vous pouvez aussi passer les éléments un par un avec `agent.handle(event)`, ou un état comme `agent.handle('thinking')`.

| État | Expression par défaut | État | Expression par défaut |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Utiliser d’autres expressions :

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

Le chat du [Studio](https://boopface.com/demo/?lang=fr#agent) est une simulation locale qui montre comment l’avatar change d’expression à l’arrivée d’une réponse ; aucune vraie IA n’y est connectée. En vrai, ce sont les quelques lignes ci-dessus : passez à `connectAgent()` le flux que renvoie votre SDK d’IA. Code › Connecter une IA montre comment brancher chaque format.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Conversations vocales

Chaque tour d’un assistant vocal, c’est écouter, réfléchir, parler. BoopFace a un jeu d’expressions assorti qui s’enchaînent naturellement :

```js
avatar.startListening();                   // l’utilisateur parle
avatar.startWaiting({ variant: 'bloom' }); // l’IA réfléchit
avatar.startSpeaking();                    // l’IA répond
avatar.setVoiceLevel(0.6);                 // facultatif : volume 0–1
```

Avec `connectAgent()`, le passage se fait tout seul (OpenAI Realtime, ElevenLabs et d’autres). Une fois que `connectAudio()` reçoit le micro et l’audio de la réponse, les yeux suivent le volume réel :

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React et Vue

Un Web Component standard, utilisable tel quel dans n’importe quel framework.

```jsx
// React 19 (dans Next.js, ajoutez 'use client')
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3 demande de déclarer l’élément personnalisé dans `vite.config.js` :

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Des exemples qui fonctionnent dès l’ouverture, sans build : [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). Le composant émet les événements `face-state` (ce qui est affiché) et `action-state` (début et fin des actions) ; [`accessibility.html`](../examples/accessibility.html) montre les annonces pour lecteurs d’écran. Les types TypeScript sont inclus.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded : les mêmes expressions des yeux sur des écrans de cartes ESP32, STM32 et Raspberry Pi Pico">
</p>

Les mêmes expressions des yeux sur les écrans de robots et de cartes. Un petit moteur C++11 avec 33 expressions ; les exemples de firmware couvrent 28 combinaisons carte-écran ESP32, ESP32-S3, STM32 et Raspberry Pi Pico (TFT rondes et carrées, écrans en barre, AMOLED, OLED monochromes).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio : yeux sur l’écran d’une carte, boutons d’expressions et liste des écrans" width="100%">

1. **Aperçu** : le [simulateur en ligne](https://boopface.com/hardware/?lang=fr) exécute le même moteur et simule 32 écrans, pour voir le résultat sans carte.
2. **Export** : réglez la mise en page, les couleurs et la fréquence d’images, ouvrez l’onglet **Firmware** et cliquez sur **Télécharger le fichier** ; placez `eyes_settings.h` dans `embedded/examples/arduino/` du projet complet (à côté de `main.cpp`) et compilez. Le ZIP de la bibliothèque Arduino ne contient pas ces fichiers ; voir les [Étapes](../embedded/README.fr.md#réglez-dans-le-simulateur-puis-passez-à-la-carte).
3. **Installation** : dans l’Arduino IDE, ajoutez `BoopFace-Embedded-0.2.0.zip` depuis la [page de version](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) ; dans PlatformIO, utilisez `lib_deps = cxlab/BoopFace@^0.2.0`.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, pixels 1 bit

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* envoyer eyes.data() à l’écran */ } }
// eyes.play("success", millis());
```

Expérimental : toutes les configurations compilent en CI, mais toutes n’ont pas été vérifiées sur du vrai matériel. Les [rapports matériels](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) sont bienvenus. Guide complet : [documentation Embedded](../embedded/README.fr.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Divers

- **Mise à niveau depuis Agent Robot Avatar** : renommé en 0.8, même utilisation. Lancez `npm uninstall agent-robot-avatar && npm install boopface` ; l’ancienne balise `<agent-robot-avatar>` fonctionne jusqu’à la 1.0.
- **Compatibilité** : navigateurs modernes avec ES Modules, Custom Elements et Web Animations ; les tests automatiques couvrent Chromium, Firefox et WebKit.
- **Version** : **Web v0.9.0**, Embedded v0.2.0 (expérimental). Jusqu’à la 1.0, l’API évolue avec prudence.
- **Vitrine** : [projets de la communauté](../SHOWCASE.md), [proposez le vôtre](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Contribuer** : issues et pull requests sont bienvenues ; lisez d’abord [`CONTRIBUTING.md`](../CONTRIBUTING.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Licence et personnage

Le code est sous [licence MIT](../LICENSE) : utilisez-le, modifiez-le et partagez-le dans vos apps. Le personnage BoopFace, son apparence, son nom et son identité visuelle sont des créations originales de CX ArtLab ; la licence MIT ne les transfère pas et ne permet pas de les présenter comme le personnage ou la marque originale d’un tiers.

BoopFace est un projet open source indépendant, sans lien ni soutien officiel d’aucune plateforme ou marque d’IA ; les noms de produits ne sont cités que pour décrire des cas d’usage.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## M’offrir un café

Si ce projet vous est utile, vous pouvez m’offrir un café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
