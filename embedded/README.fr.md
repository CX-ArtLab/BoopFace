# BoopFace Embedded

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English · référence complète de l’API](README.md) · [Retour au projet principal](../docs/README.fr.md)

Une **implémentation matérielle expérimentale** du même projet. Elle ne dessine que les yeux : expressions, clignement, regard, attente, sommeil et réveil ; c’est votre programme qui décide quelle action jouer et quand. Le glisser, l’écrasement, la forme de la tête, l’antenne et l’écoute de la souris ne font pas partie de cette version. Le dossier embarqué est indépendant du composant SVG et de sa démo, pour les maintenir séparément.

Le [simulateur en ligne](https://boopface.com/hardware/?lang=fr) existe en 10 langues, et les commentaires des réglages exportés suivent la langue choisie. La page de version propose aussi un HTML en un seul fichier qui s’ouvre hors ligne.

## Pour plusieurs plateformes

Le cœur des expressions est une bibliothèque C++11 autonome : elle ne dépend ni de l’ESP32, ni d’Arduino, ni du navigateur, ni d’un pilote d’écran précis, et n’alloue pas de mémoire dynamique. L’ESP32 et le Raspberry Pi Pico sont les premières intégrations de référence ; d’autres microcontrôleurs peuvent l’utiliser avec leur propre adaptateur d’écran.

| Environnement de build | Carte | Écran |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789, 240×240, SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789, 240×240, SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306, 128×64, I²C, adresse `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306, 128×32, I²C, adresse `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106, 128×64, I²C, adresse `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 rond, 240×240, SPI (même câblage que `esp32-s3-st7789`) |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1,69″, 240×280, SPI (même câblage) |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2,0″, 240×320, SPI (même câblage) |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | GC9A01 rond intégré, sans câblage |
| `cyd-ili9341` | ESP32-2432S028 (CYD) | ILI9341 intégré, sans câblage |
| `t-display-st7789` | LilyGO T-Display | ST7789 1,14″ intégré, paysage |
| `t-display-s3` | LilyGO T-Display-S3 | ST7789 1,9″ intégré, parallèle 8 bits, paysage |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | Le modèle M5Stack correspondant | Écran intégré, détecté par M5Unified |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1,14″ / 2,0″ paysage (même câblage) |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1,8″ / 0,96″ (même câblage) |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3,5″, 480×320 (même câblage) |
| `xiao-round-display` | Seeed XIAO ESP32S3 + écran rond | À brancher, sans câblage |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | Écran intégré |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | AMOLED rond intégré |
| `t-rgb-21` | LilyGO T-RGB 2,1″ | Écran RGB rond intégré |
| `guition-4848s040` | Guition ESP32-4848S040 (panneau 86) | Écran RGB carré intégré |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE (STM32F411) | ST7789, 240×240, SPI, sur le connecteur Arduino |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306, 128×64, I²C, adresse `0x3C` |

Le pilote d’écran de chaque configuration tient dans un petit bloc de `examples/arduino/boards.h` ; le programme principal est commun. Les broches suivent la documentation des fabricants ; T-RGB, le panneau 86 et le BOX-3 reprennent les configurations de cartes fournies avec Arduino_GFX, et les broches de l’AMOLED viennent de la page de l’appareil sur ESPHome. À vérifier sur du vrai matériel : le ST7735 existe en plusieurs variantes (si l’image est décalée, essayez `INITR_GREENTAB`) ; l’AMOLED peut demander un petit décalage de colonnes ; les révisions du T-RGB diffèrent par leur séquence d’initialisation. Les yeux sont blancs sur noir, donc l’ordre rouge/bleu ne se voit pas. Toutes les configurations compilent en CI mais n’ont pas encore été testées sur du vrai matériel ; si vous en faites tourner une, ouvrez un issue « Rapport matériel » et le simulateur l’indiquera comme vérifiée par la communauté.

**Cette version n’a pas encore été testée sur du vrai matériel. La compilation et les tests sur ordinateur ne garantissent ni le câblage, ni la fréquence d’images réelle, ni le rendu sur l’appareil.** La version web et la version embarquée partagent les noms d’expressions et le design, mais leurs moteurs de rendu sont distincts : la version embarquée échantillonne la géométrie d’origine toutes les 20 ms et interpole, en gardant le mouvement et le rythme des yeux. La tête, l’antenne et le découpage par le contour de la tête ne sont pas dessinés, et en basse résolution les bords sont pixelisés.

## Voir d’abord sur l’ordinateur, sans matériel

Téléchargez [`studio/boopface-embedded-studio.html`](studio/boopface-embedded-studio.html) et ouvrez-le dans le navigateur. C’est un fichier complet qui fonctionne hors ligne : pas de serveur, de carte, de Python, de Node.js ni de compilateur. Téléchargez le HTML brut, n’enregistrez pas la page d’affichage du fichier sur GitHub. Dans un clone du projet, un double-clic suffit.

C’est **le même code C++ embarqué compilé en WebAssembly**, pas la démo web ni une autre animation JavaScript. Il propose 33 actions (les 18 de la 0.1, plus 13 que la 0.2 reprend de la version web 0.9 : révérence, observer, réfléchir, clin d’œil, air satisfait, vertige, rebond, etc., ainsi qu’écouter et parler du kit vocal), le cycle automatique, la pause et l’image par image, la direction du regard, 32 écrans prédéfinis en cinq groupes (ronds, carrés, en barre, kits de développement et OLED) et des résolutions personnalisées de 16 à 512 par axe. Les yeux sont arrondis par défaut ; `setRoundEyes(false)` rétablit les coupes droites. On peut choisir l’affichage entier ou le recadrage pour remplir, le zoom, les décalages et le découpage circulaire. Le rendu du navigateur ne remplace pas les tests de câblage, de pilote, de rafraîchissement ni de performances sur le vrai matériel. Pour recompiler et vérifier, voir [les notes du simulateur](preview/README.md).

## Réglez dans le simulateur, puis passez à la carte

Réglez les yeux à votre goût dans le simulateur, puis compilez le firmware avec exactement ces réglages, sans toucher au code :

1. Ouvrez le simulateur et choisissez votre écran. Le panneau **Modèle et câblage** indique la carte, le câblage et la commande de compilation.
2. Ajustez la mise en page, les couleurs, la fréquence d’images, le clignement et les transitions ; si l’écran est monté tourné, cliquez sur « Tourner l’écran de 90° ».
3. Cliquez sur **Exporter les réglages**, copiez ou téléchargez le texte et enregistrez-le sous `eyes_settings.h`.
4. Placez le fichier dans `embedded/examples/arduino/`, à côté de `main.cpp`.
5. Compilez et téléversez l’environnement indiqué en tête du fichier, par exemple `pio run -d embedded -e esp32-s3-st7789 -t upload`.

| Réglage dans `eyes_settings.h` | Contrôle du simulateur |
| --- | --- |
| `EYES_MAX_FPS`, `EYES_AUTO_BLINK`, `EYES_TRANSITION_MS` | Limite d’images, clignement, transitions |
| `EYES_FIT_COVER`, `EYES_ZOOM`, `EYES_OFFSET_X`, `EYES_OFFSET_Y` | Mise en page : ajuster ou remplir, taille, position |
| `EYES_INK_RGB`, `EYES_BACKGROUND_RGB` | Couleurs des yeux et du fond, ou une palette (écrans couleur uniquement) |
| `EYES_TURN` | Rotation de l’écran de 90° ; si les yeux sont à l’envers, remplacez `3` par `1` |
| `EYES_FULL_PANEL` | Sur l’écran carré de référence de 1,3″, utiliser tout le panneau au lieu de la bande 240×160 |

Sans ce fichier, le firmware utilise ses valeurs par défaut, et git l’ignore. Le suivi du regard demande une caméra ou un capteur de distance sur la carte, il n’est donc pas exporté : le `GazeTracker` de la bibliothèque (`lib/BoopFace/src/BoopFaceGaze.h`) reçoit la position que votre capteur fournit.

## Câblage

Ce sont des numéros GPIO, pas la position physique sur le connecteur. Utilisez un module d’écran compatible 3,3 V en logique et en alimentation, avec CS/DC/RST accessibles ; les cartes à écran intégré demandent leur propre configuration d’après leur schéma.

| Broche ST7789 | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13 (PA5) |
| MOSI / SDA | GPIO11 | GP19 | D11 (PA7) |
| CS | GPIO10 | GP17 | D10 (PB6) |
| DC | GPIO9 | GP20 | D9 (PC7) |
| RST / RES | GPIO8 | GP21 | D8 (PA9) |
| VCC | 3,3 V | 3,3 V | 3V3 |
| GND | GND | GND | GND |

MISO n’est pas connecté. Câblez le rétroéclairage selon la documentation du module ; l’exemple ne pilote pas cette broche.

Exemple OLED sur ESP32 : SDA → GPIO21, SCL → GPIO22, VCC → 3,3 V du module compatible, GND → GND ; changez `0x3C` si le module utilise une autre adresse.

OLED sur STM32 Black Pill : SDA → PB7, SCL → PB6. Téléversez par USB en mode DFU (maintenez BOOT0 et appuyez une fois sur NRST) ; les commandes série passent par le même câble USB. La NUCLEO téléverse et communique par le port USB de son ST-LINK.

## Compiler et utiliser

Installez PlatformIO, puis lancez la commande voulue à la racine du projet :

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

Pour compiler avec les réglages du simulateur, voir [Réglez dans le simulateur, puis passez à la carte](#réglez-dans-le-simulateur-puis-passez-à-la-carte).

Toutes les cartes partagent la même bibliothèque d’expressions ; seul le petit bloc du pilote d’écran change. Pour un projet plus propre, gardez seulement la section `[env:...]` de votre carte dans `platformio.ini` et son bloc dans `examples/arduino/boards.h`, et supprimez le reste.

Ne téléversez que l’environnement qui correspond à votre carte et à votre câblage. Par exemple :

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

Sur le port série, envoyez le nom anglais de l’action suivi d’un retour à la ligne :

- `love` : des cœurs.
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait` : attente continue (rotation, contournement, vague, fleur, croix, rond et carré) jusqu’à la prochaine action.
- `listening` / `speaking` : écouter et parler du kit vocal, jusqu’à la prochaine action ; le programme peut transmettre le volume avec `setVoiceLevel()`.
- `success` / `failure` : tâche réussie ou échouée.
- `wary` / `inspect` / `angry` / `refuse` : méfiance, inspection, colère, refus.
- `sleep` / `wake` : dormir, se réveiller.
- `gaze -0.5 0.2` : le programme fixe la direction du regard, coordonnées dans `[-1,1]`. L’amplitude vient de `EyesConfig::gazeRange` (ou `setGazeRange()` en cours d’exécution) : `Small` correspond aux 8 × 6 d’origine, `Medium` (par défaut) à 20 × 18, jusqu’au bord de la zone du visage, et `Large` à 30 × 21, un peu au-delà. Près du bord, les yeux s’affinent et se resserrent vers l’intérieur selon la formule de la version web, comme si la tête tournait ; regard centré, les trois niveaux sont identiques.
- `demo` : enchaîne toutes les actions en boucle ; une action manuelle valide arrête la boucle.
- `reset` : retour au repos.
- `help` : liste des commandes.

Il existe aussi `idle`, `bored`, `input`, `affirm`, `surprise`, `random` et, depuis la 0.2, `observe`, `think`, `ponder`, `bow`, `shake`, `wink`, `smug`, `bounce`, `smug-bounce` et `dizzy`. Les anciens noms de la 0.5 (`send`, `warning`, `blocked`, `error`, etc.) fonctionnent jusqu’à la 1.0 ; la table de correspondance est dans la documentation anglaise.

## L’intégrer à votre appareil

La bibliothèque se trouve dans `embedded/lib/BoopFace`. Sous Arduino, copiez ce dossier dans votre dossier `libraries`, ou téléchargez `BoopFace-Embedded-0.2.0.zip` depuis la [page de version embarquée](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) et installez-le avec *Croquis → Inclure une bibliothèque → Ajouter la bibliothèque .ZIP*. L’indexation dans le gestionnaire de bibliothèques Arduino est en cours ; d’ici là, utilisez le ZIP ou les sources. Sur les autres plateformes C++11, compilez tout le dossier `src`.

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) référence déjà `cxlab/BoopFace` ; ajoutez-le à votre environnement dans `platformio.ini` :

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

La bibliothèque contient deux exemples pour l’Arduino IDE, dans *Fichier → Exemples → BoopFace* : **SerialEyes** dessine les yeux en caractères dans le moniteur série, sans écran ; **OledSSD1306** tourne sur un OLED I²C 0,96″ 128×64 (installez d’abord la bibliothèque Adafruit SSD1306). Dans les deux, on tape le nom de l’action dans le moniteur série. La CI les compile pour ESP32 et RP2040.

Le cœur de dessin n’a pas besoin des bibliothèques Adafruit ; seuls les pilotes d’écran de l’exemple les utilisent.

Votre programme fournit une heure en millisecondes qui avance toujours, appelle `eyes.update(nowMs)` et transmet la nouvelle image au pilote d’écran. Le débordement du compteur 32 bits est géré ; ne mélangez pas plusieurs horloges et n’utilisez pas la même instance depuis plusieurs tâches sans protection.

Le canevas des yeux en 240×160 occupe 4 800 octets, et l’exemple TFT demande 480 octets de plus pour la ligne de conversion des couleurs ; le canevas 128×64 occupe 1 024 octets, et le pilote OLED a en plus son propre tampon. Ces chiffres n’incluent ni le système, ni les pilotes, ni d’autres instances. Les tables de géométrie en lecture seule des actions d’origine prennent environ 80 Ko de flash, sans mémoire dynamique. L’exemple est limité à 25 FPS ; la fréquence réelle est à mesurer.

La sortie est une image 1 bit par lignes, bit de poids fort en premier dans chaque octet, chaque ligne arrondie à l’octet. Ce n’est pas le format natif en pages du SSD1306 ; l’exemple le convertit avec `drawBitmap()` du pilote. La couleur est choisie par le programme hôte : ça marche pour les OLED monochromes comme pour changer la couleur des yeux sur un écran couleur.

**Un même produit sur plusieurs plateformes : les expressions appartiennent au projet, et l’ESP32 n’en est qu’une porte d’entrée.**
