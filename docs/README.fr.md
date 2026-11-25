# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace : un composant d’avatar robot léger et expressif pour les bots IA, les agents et les applications interactives">
</p>

**Site officiel: [boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace est un composant d’avatar robot léger et expressif pour les bots IA, les agents et les applications interactives. Réflexion, attente, réussite ou erreur : chaque état d’un agent peut s’afficher sous forme d’expression.

Utilisez-le comme visage et retour d’état pour les assistants et agents IA : assistants de chat comme ChatGPT, Claude, Gemini, Grok et DeepSeek, agents de code comme Codex, Claude Code, Cursor, Gemini CLI et OpenCode, et agents personnels comme Grok Bot, ChatGPT dots, Meta Muse, OpenClaw et Hermes Agent.

Il convient aussi aux compagnons de bureau, animaux virtuels, mascottes numériques, avatars de chatbot et autres personnages interactifs, ou comme couche de retour visuel pour les interfaces d’agents de style AG-UI.

Construit avec SVG et JavaScript natif, c’est un Web Component natif sans dépendance à l’exécution, sous licence MIT. Il s’affiche à plat ou en [tête 3D](#tête-3d--nouveau-dans-09) qui tourne vraiment ; 188 [skins](#skins--nouveau-dans-la-07) sont prêts à être portés à tout moment.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

## Nouveau : [BoopFace Embedded](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded : les mêmes expressions sur les écrans ESP32, STM32 et Raspberry Pi Pico, ou dans d’autres programmes C++. Avec des exemples de firmware pour 28 configurations et un simulateur avec export des réglages."></a>
</p>

Les mêmes expressions sur les écrans ESP32, STM32 et Raspberry Pi Pico, ou dans d’autres programmes C++. Avec des exemples de firmware pour 28 configurations et un simulateur avec export des réglages.

## Démo en ligne

<h3 align="center">Site officiel</h3>

<p align="center">
  <a href="https://boopface.com/">boopface.com</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Web Component</h3>

Depuis la 0.9, la démo, les skins et la connexion à une IA tiennent sur une seule page : le Studio. Sa scène passe du plat à la 3D ; à côté, vous pouvez essayer chaque expression et le kit vocal, changer de skin et de couleurs, régler le comportement, discuter avec un avatar connecté à une IA et copier à tout moment le code de ce que vous voyez.

<p align="center">
  <a href="https://boopface.com/demo/?lang=fr">Ouvrir le Studio</a> · <a href="https://boopface.com/demo/?lang=fr#skins">Choisir un skin</a> · <a href="https://boopface.com/demo/?lang=fr#agent">Essayer la connexion IA</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Démo animée interactive de BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=fr">Ouvrir le simulateur embarqué</a> (aperçu de 32 préréglages d’écrans embarqués)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Points forts

- Web Component natif
- Rendu SVG + JavaScript natif
- Zéro dépendance d’exécution
- À plat ou en 3D ; la tête 3D se tourne vraiment vers le pointeur
- Clignements automatiques et comportement idle discret
- Yeux qui suivent le pointeur et tête à inertie ; chaque expression fait bouger toute la tête
- Caressez le front : l’avatar ferme les yeux et vient se blottir
- Déformation locale façon gelée lors du glisser, avec retour élastique
- Compression par appui prolongé et antenne ressort déplaçable
- États et expressions d’Agent contrôlables par code
- Plus de 30 expressions : waiting, success, failure, affirm, wary, inspect, angry, refuse, love et, nouvelles en 0.9, révérence, observer, réfléchir, clin d’œil, fier, étourdi, rebond et d’autres
- Yeux arrondis de n’importe quelle couleur, ou transparents pour laisser voir le fond
- Prise en charge du mouvement réduit
- Comportement de sommeil configurable
- Arrondi de la tête réglable
- 188 skins numérotés en 17 séries, avec une lumière qui suit le pointeur
- Version légère sans skins pour les pages les plus sobres
- `connectAgent()` : les événements d’un flux d’IA pilotent les expressions (AG-UI, OpenAI, Anthropic, Vercel AI SDK)
- Kit d’expressions vocales : un ensemble d’expressions d’écoute, de réflexion et de parole qui suivent le volume réel
- Déclarations TypeScript incluses
- BoopFace Embedded propose les mêmes expressions des yeux sur 28 configurations de cartes et d’écrans ESP32, ESP32-S3, STM32 et Raspberry Pi Pico, avec export des réglages du simulateur pour le firmware

## Installation

```bash
npm install boopface
```

```js
import 'boopface';
```

Ou téléchargez `boopface-x.y.z.zip` depuis la [dernière version](https://github.com/CX-ArtLab/boopface/releases/latest). Il ne contient que le composant, skins comprises. Décompressez-le à côté de votre page :

```html
<script type="module" src="./boopface/boopface.js"></script>
```

Puis ajouter le composant :

```html
<boop-face id="avatar"></boop-face>
```

Aucun code d’initialisation n’est nécessaire. L’avatar entre automatiquement dans son état idle par défaut.

### Passer d’Agent Robot Avatar à BoopFace

Avant la version 0.8, BoopFace s’appelait Agent Robot Avatar. Les fonctionnalités et l’utilisation ne changent pas. Pour mettre à jour, remplacez le nom du paquet par `boopface` :

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

L’ancienne balise `<agent-robot-avatar>` fonctionne encore jusqu’à la 1.0 : rien ne presse pour modifier vos pages. L’ancien paquet npm `agent-robot-avatar` ne reçoit plus de mises à jour ; les nouvelles versions sont publiées uniquement sous `boopface`.

### Version légère

Pour les pages qui n’utilisent jamais de skins, `boopface/lite` est le même avatar sans le code des skins :

```js
import 'boopface/lite';
```

La version légère ignore l’attribut `skin` et indique dans la console que les skins nécessitent la version complète.

Comparaison des tailles (transfert réseau, compression gzip) :

| Version | Taille |
| --- | --- |
| Légère `boopface/lite` | environ 92 Ko |
| Complète, page sans skin | environ 104 Ko ; le code qui dessine les skins n’est pas téléchargé |
| Complète, avec skins | environ 161 Ko ; la partie supplémentaire n’est téléchargée qu’à la première utilisation d’un skin |

En passant en 3D, chacune des deux versions télécharge environ 19 Ko de plus pour le rendu 3D.

## Utilisation de base

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

Actions disponibles :

| Action | Apparence | Quand l’utiliser |
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

Les actions d’attente jouent un tour avec `play()`. `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` boucle jusqu’à une autre action ou un appel à `stopWaiting()`.

Les noms de 0.5 (`send`, `warning`, `error`, `blocked`, `slot` et d’autres) fonctionnent encore jusqu’à 1.0, avec un avis dans la console ; voir le [tableau de mise à niveau](../CHANGELOG.md#upgrading-from-05x).

Exemple de cycle de requête Agent :

```js
avatar.startWaiting();

// Deuxième attente : les yeux sortent d'un côté et reviennent par l'autre.
avatar.startWaiting({ variant: 'wrap' });

// Troisième mouvement d’attente : vagues verticales décalées des yeux.
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## Options courantes

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

| Attribut | Usage |
| --- | --- |
| `size` | Taille de l’avatar en pixels |
| `view` | `2d` (par défaut, à plat) ou `3d` |
| `color` | Couleur principale de l’avatar |
| `eye-color` | Couleur des yeux ; `transparent` laisse voir le fond à travers les yeux |
| `eye-style` | Yeux arrondis par défaut ; `sharp` rétablit les coupes droites |
| `auto-sleep` | Temps d’inactivité avant le sommeil automatique ; `0` le désactive |
| `wake-on` | Politique de réveil automatique : `activity`, `interaction` ou `manual` |
| `motion` | Politique d’animation : `auto`, `reduce` ou `full` |
| `press-squeeze` | Maintenir le centre pour comprimer ; `false` désactive le geste |
| `antenna` | `false` masque la boule de l’antenne |
| `antenna-drag` | Tirer l’antenne, retour élastique et réaction étourdie ; `false` pour désactiver |
| `idle-gaze` | Au repos, les yeux regardent autour de temps en temps ; `false` les garde droit devant |
| `skin` | Numéro de skin, par exemple `301` ; à omettre pour la couleur unie |

Contrôles courants à l’exécution :

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // désactiver les caresses
```

Le centre de l’avatar déclenche l’écrasement. Au-delà de 4 pixels CSS de déplacement, le même geste passe au glissement de tête existant. Tirer l’antenne utilise la même limite que le glissement de tête et se termine par l’expression étourdie.

## Tête 3D · Nouveau dans 0.9

```html
<boop-face view="3d"></boop-face>
```

`view="3d"` (ou `avatar.setView('3d')`) transforme l’avatar en tête en volume : elle se tourne vraiment vers le pointeur, son visage est bombé et, après chaque rotation, elle rebondit légèrement avant de s’immobiliser. Toutes les expressions, gestes, skins et couleurs fonctionnent en 3D ; `view="2d"` revient à plat. Le code 3D n’est téléchargé que la première fois qu’une page passe en 3D ; les pages uniquement à plat ne le chargent jamais.

**Chaque expression fait bouger la tête.** La tête se tourne là où regardent les yeux, acquiesce, se penche et saute ; en 3D elle tourne vraiment, à plat la rotation est dessinée. Avec `motion="reduce"` elle reste immobile.

**Yeux arrondis.** Là où une paupière coupe un œil, l’angle est désormais arrondi, et les fentes fines (sommeil, plissement, clignement, curseur de saisie) ont des bouts ronds. Pour retrouver les coupes droites, utilisez `eye-style="sharp"`.

**Couleur des yeux.** `eye-color="#2bd67b"` (ou `setEyeColor()`) colore les yeux, sur l’avatar uni et sur les 131 skins aux yeux unis. Les 57 autres skins ont des yeux à la texture propre (en relief, vitrés ou à motif) et les gardent ; `SKINS[numéro].eyeColor` indique lesquelles peuvent changer. `eye-color="transparent"` découpe les yeux dans la tête pour laisser voir ce qui se trouve derrière l’avatar ; cela fonctionne sur tous les skins, yeux texturés compris.

**Caresses.** Caressez le front quelques fois : l’avatar ferme les yeux et vient se blottir. Activé par défaut ; `setPetting(false)` le désactive.

## Skins · Nouveau dans la 0.7

188 skins en 17 séries, avec une lumière qui suit le pointeur. Chaque skin a un numéro permanent : le numéro de série suivi de deux chiffres, donc 305 est le cinquième skin de la série 3. Les noms peuvent changer ; les numéros jamais, et ils ne sont pas réutilisés.

Tous les skins restent en SVG pur : sans images, canvas ni WebGL. Tous les skins réunis pèsent environ 70 Ko sur le réseau (environ 290 Ko non compressés), et l’essentiel ne se charge que lorsqu’une page utilise un skin. À titre de comparaison, l’avatar lui-même (la version lite, sans skins) pèse environ 92 Ko.

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Galerie de skins BoopFace : sélection, filtres et recherche" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // ou '102'
avatar.setSkin(null); // retour à la couleur unie
```

Tous les skins avec leur numéro sont dans l’[onglet Skins du Studio](https://boopface.com/demo/?lang=fr#skins).

| Série | Numéros | Série | Numéros | Série | Numéros |
| --- | --- | --- | --- | --- | --- |
| Émail | 101–106 | Verre glacé | 201–206 | Gomme | 301–312 |
| Verre bonbon | 401–406 | Acrylique | 501–512 | Gelée | 601–612 |
| Dégradé | 701–712 | Verre dépoli | 801–806 | Métal | 901–930 |
| Pierres et céramique | 1001–1012 | Bois | 1101–1106 | Balles | 1201–1210 |
| Transparent et chatoyant | 1301–1305 | Tissu et cuir | 1401–1412 | Douceurs et fruits | 1501–1512 |
| Nature | 1601–1612 | Motifs et tech | 1701–1717 |  |  |

Le code qui dessine les skins est téléchargé la première fois qu’un skin est utilisé : une page sans skin ne le charge jamais. `await loadSkins()` le charge à l’avance. `SKINS` donne les noms chinois et anglais et les couleurs de chaque skin, `SKIN_SERIES` les séries et `SKIN_NAMES` tous les numéros.

Toutes les expressions et tous les gestes fonctionnent avec un skin. Sans skin, l’attribut `color` s’applique de nouveau.

## Brancher un flux d’IA · Nouveau dans la 0.9

Avec `connectAgent()`, un flux d’IA pilote directement l’avatar. Donnez-lui les événements que votre SDK d’IA fournit déjà : l’avatar montre tout seul la réflexion, l’usage d’un outil, la réponse, la fin, l’échec et le refus.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // affichez la réponse comme d’habitude
}
```

`track()` laisse passer chaque élément tel quel. Un flux qui se termine normalement compte comme terminé, une erreur levée comme un échec, et une interruption ou un `break` anticipé comme annulé. Vous pouvez aussi passer les éléments un par un avec `agent.handle(event)`, ou un nom d’état comme `agent.handle('thinking')`.

Il comprend les événements AG-UI, les flux OpenAI Responses, Realtime et Chat Completions, les flux Anthropic Messages, les parties de flux du Vercel AI SDK et l’état de `useChat` (`submitted`, `streaming`, `ready`, `error`). Le reste est ignoré.

| État | Expression par défaut | Quand |
| --- | --- | --- |
| `listening` | `listening`, en boucle | Voix : l’utilisateur parle |
| `thinking` | `waiting-spin`, en boucle | Requête envoyée, le modèle réfléchit |
| `tool` | `waiting-wave`, en boucle | Un appel d’outil est en cours |
| `replying` | `idle` | Le texte de la réponse arrive |
| `speaking` | `speaking`, en boucle | Voix : la réponse de l’IA est en lecture |
| `approval` | `wary` | L’agent attend une confirmation |
| `done` | `success` | Terminé |
| `error` | `failure` | Échec |
| `refused` | `refuse` | Le modèle a refusé |
| `cancelled` | `idle` | Arrêté par l’utilisateur |
| `typing` | `input` | L’utilisateur tape, défini avec `handle('typing')` |
| `idle` | `idle` | Rien en cours |

Chaque état peut être remplacé par un nom d’action, une fonction, ou `null` pour ne rien afficher :

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

Dans le [Studio](https://boopface.com/demo/?lang=fr#agent), vous pouvez discuter avec un avatar connecté à une IA ; Code › Connecter l’IA règle l’expression de chaque état et montre le code de chaque format.

## Kit d’expressions vocales · Nouveau dans la 0.9

Écouter, réfléchir, parler : tout assistant vocal passe par ces trois étapes à chaque tour. Le kit d’expressions vocales donne à l’avatar un ensemble de trois expressions qui s’enchaînent. Il convient à tout produit auquel on parle, quel que soit le service vocal : appelez vous-même les trois méthodes, ou laissez `connectAgent()` suivre votre API vocale.

```js
avatar.startListening();                   // l’utilisateur parle
avatar.startWaiting({ variant: 'bloom' }); // l’IA réfléchit
avatar.startSpeaking();                    // l’IA répond
avatar.setVoiceLevel(0.6);                 // facultatif : volume de 0 à 1
```

En écoute, les deux yeux fusionnent en un seul œil rond qui gonfle avec la voix de l’utilisateur. En réflexion, il devient une fleur de deux ovales croisés qui respire et tourne lentement. En parlant, il se sépare de nouveau en deux yeux, qui se posent puis s’étirent avec la réponse : les sons graves dans l’œil gauche, les aigus dans le droit. `setVoiceLevel(level)` ou `setVoiceLevel([low, high])` fournit le volume ; sans lui, la parole garde son propre rythme et l’écoute reste immobile. Chaque étape tourne en boucle jusqu’à la suivante, et au changement les yeux se transforment au lieu de sauter.

Réfléchir est une étape d’attente. Éclosion (`variant: 'bloom'`) et Croix (`variant: 'cross'`) naissent directement de l’œil d’écoute ; tout autre style d’attente convient aussi.

`connectAgent()` peut aussi les enchaîner tout seul. Il comprend déjà les événements des API vocales courantes, comme OpenAI Realtime et le `mode` signalé par des SDK comme ElevenLabs. Pendant la réflexion il attend avec le style Éclosion (ou celui de `actions.thinking`) et revient à l’écoute après chaque réponse. Par exemple, avec OpenAI Realtime :

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` accepte des MediaStream ou des éléments `<audio>` et transmet leur volume aux yeux. Avec la réponse branchée, l’avatar remarque aussi quand elle a fini d’être lue.

## React et Vue

`<boop-face>` est un Web Component standard : il fonctionne dans n’importe quel framework.

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

Dans Next.js, marquez le fichier avec `'use client'`.

**Vue 3**

Indiquez à Vue que `boop-face` est un élément personnalisé, dans `vite.config.js` :

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

Pages qui fonctionnent sans étape de build : [`examples/react.html`](../examples/react.html) et [`examples/vue.html`](../examples/vue.html).

## Événements et intégration

Le composant émet `face-state` pour les changements d’état visuel et `action-state` pour les changements sémantiques du cycle de vie des actions.

Pour les intégrations avec l’application hôte et les textes d’état accessibles, préférez `action-state`. Consultez [`examples/accessibility.html`](../examples/accessibility.html) pour un exemple exécutable de cycle de requête.

Un exemple minimal d’intégration est disponible dans [`examples/basic.html`](../examples/basic.html).

## Compatibilité

Conçu pour les navigateurs modernes prenant en charge ES Modules, Custom Elements, SVG, Pointer Events, Web Animations API, `IntersectionObserver`, `ResizeObserver` et `matchMedia`.

Les tests automatisés couvrent Chromium, Firefox et WebKit.

<a id="boopface-embedded"></a>

## Nouveau : BoopFace Embedded

Les expressions des yeux de la version web fonctionnent désormais sur les écrans des robots et cartes. Le petit moteur C++11 conserve les mouvements et le rythme. Les exemples couvrent 28 configurations ESP32, ESP32-S3, STM32 et Raspberry Pi Pico : TFT ronds et rectangulaires, écrans allongés, AMOLED et OLED monochromes. Les dimensions personnalisées sont prises en charge. La version 0.2 rattrape le Web 0.9 : les mêmes yeux arrondis, 13 nouvelles expressions comme révérence, observer, réfléchir, clin d’œil, fier, étourdi et rebond, ainsi que l’écoute et la parole du kit vocal, 33 en tout.

| Votre appareil | Version à utiliser |
| --- | --- |
| Sites, apps, tablettes Android et robots avec navigateur | Composant web : avatar complet, habillages et interactions |
| ESP32, STM32 et Raspberry Pi Pico | Moteur embarqué avec exemples de firmware |
| Autres microcontrôleurs ou programmes C++ | Bibliothèque C++ ; fournissez votre pilote d’écran |


<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="Simulateur BoopFace Embedded : expressions sur un TFT rond, disposition, couleurs et export" width="100%">

**Essayez sans carte.** Le [simulateur](https://boopface.com/hardware/?lang=fr) exécute le même moteur C++ dans le navigateur sur 32 écrans simulés. Il permet de prévisualiser le résultat et de comparer les modules.

**Réglez, exportez, compilez.** Choisissez l’écran, la disposition, les couleurs et la cadence, puis **Exporter les réglages**. Placez `eyes_settings.h` à côté du `main.cpp` de l’exemple et compilez. Voir les [étapes](../embedded/README.md). L’interface et les commentaires exportés suivent la langue choisie.

**Installation par ZIP.** Téléchargez `BoopFace-Embedded-0.2.0.zip` depuis la [version embarquée](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0), puis utilisez **Croquis → Inclure une bibliothèque → Ajouter la bibliothèque .ZIP** dans Arduino IDE. L’indexation dans Arduino Library Manager est en attente ; utilisez le ZIP ou les sources en attendant. Pour [PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace), ajoutez cette dépendance à l’environnement dans `platformio.ini` :

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**Dans votre programme**, lancez les expressions par leur nom :

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1 bit par pixel

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // Envoyer eyes.data() au pilote d’écran.
  }
}

// Au besoin
// eyes.play("success", millis());
```

Expérimental : le CI compile toutes les configurations, mais aucune n’a encore été vérifiée sur du matériel réel. Envoyez un [rapport matériel](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) après essai. Le [guide](../embedded/README.md) décrit l’API et le câblage.

## Projets créés avec BoopFace

Rejoignez cette liste pour faire découvrir vos créations avec BoopFace. Pour proposer votre projet, ouvrez le formulaire : https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml

[Voir les projets de la communauté](../SHOWCASE.md)

## Contribution

Issues et Pull Requests sont les bienvenus. Consultez [`CONTRIBUTING.md`](../CONTRIBUTING.md) avant de proposer des modifications.

## État du projet

**Version publique actuelle : v0.9.0**\
BoopFace Embedded : v0.2.0 (expérimental)

L’API publique reste volontairement compacte pendant l’évolution du projet vers un futur engagement de stabilité `1.0.0`.

BoopFace est développé indépendamment et n’est affilié, approuvé ou représentatif d’aucune plateforme ou marque d’IA.

## Design du personnage et identité visuelle

Le personnage BoopFace, y compris son apparence robotique et son identité visuelle, est une création originale de CX ArtLab.

La licence MIT s’applique au logiciel et au code source. Elle permet d’utiliser, modifier et distribuer l’avatar dans des applications, mais ne transfère pas la propriété du nom BoopFace, de l’identité du personnage ou de son identité visuelle, et n’accorde pas le droit de les présenter comme le personnage original ou la marque autonome d’un tiers.

Les noms de produits tiers mentionnés dans ce projet servent uniquement à décrire des cas d’usage possibles et n’impliquent aucune affiliation ni approbation.

## Licence

MIT License. Voir [`LICENSE`](../LICENSE).

---

Si ce projet vous est utile, vous pouvez m’offrir un café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
