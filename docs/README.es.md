# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: un componente de avatar robot ligero y expresivo para bots de IA, agentes y apps interactivas">
</p>

**Sitio oficial: [boopface.com](https://boopface.com/)** · **Demo en línea: [BoopFace Studio](https://boopface.com/demo/?lang=es)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace es un componente de avatar robot ligero y expresivo para bots de IA, agentes y apps interactivas. Pensando, esperando, listo, error: cada estado de un agente se puede mostrar con una expresión.

Sirve como cara y respuesta de estado de asistentes y agentes de IA: asistentes de chat como ChatGPT, Claude y Gemini, agentes de programación como Codex, Claude Code y Cursor, y todo tipo de agentes personales. También va bien para compañeros de escritorio, mascotas virtuales, mascotas digitales y avatares de chatbots.

Un Web Component nativo hecho con SVG y JavaScript puro, sin dependencias en tiempo de ejecución, con licencia MIT. Se puede mostrar plano o cambiar a una cabeza en 3D que gira de verdad; además hay 188 skins listas para ponerle.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#inicio-rápido">Inicio rápido</a> · <a href="#expresiones">Expresiones</a> · <a href="#ajustes">Ajustes</a> · <a href="#cabeza-3d-y-ojos">Cabeza 3D y ojos</a> · <a href="#skins">Skins</a> · <a href="#conectar-ia">Conectar IA</a> · <a href="#conversaciones-de-voz">Conversaciones de voz</a> · <a href="#react-y-vue">React y Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Pruébalo en línea

<h3 align="center">Sitio oficial</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Demo en línea de BoopFace Studio</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=es"><b>Abrir Studio</b></a> · <a href="https://boopface.com/demo/?lang=es#skins">Elegir una skin</a> · <a href="https://boopface.com/demo/?lang=es#agent">Probar Conectar IA</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Demo de interacción de BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Simulador de BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=es"><b>Abrir el simulador embebido</b></a> (32 pantallas de placas predefinidas)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Novedades de 0.9

- BoopFace gana profundidad. [Detalles](#cabeza-3d-y-ojos)
- 15 expresiones nuevas y el kit de conversación por voz. [Detalles](#expresiones)
- Nueva reacción a las caricias: mueve el puntero sobre su frente. [Detalles](#cabeza-3d-y-ojos)
- Conexión con IA actualizada. [Detalles](#conectar-ia)
- La demo en línea, rehecha desde cero: [BoopFace Studio](https://boopface.com/demo/?lang=es)
- Embedded 0.2: las nuevas expresiones también llegan a las placas. [Detalles](#boopface-embedded)

Todos los detalles en el [CHANGELOG](../CHANGELOG.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Características de BoopFace

- Web Component nativo, renderizado SVG + JavaScript puro, sin dependencias en tiempo de ejecución, funciona con cualquier framework
- Un componente de avatar que expresa emociones, con una expresión para cada tipo de estado
- Más de 30 expresiones que lo hacen sentir vivo
- Interactivo: los ojos siguen el puntero; arrastrar, apretar, presionar, tirar de la antena y acariciar tienen respuesta
- Plano o 3D, para distintos usos, con 188 skins para cambiar cuando quieras
- Los eventos de los streams de IA mueven las expresiones directamente (AG-UI, OpenAI, Anthropic, Vercel AI SDK), con conversaciones de voz
- Ligero: la versión lite pesa unos 92 KB
- BoopFace Embedded: las mismas expresiones funcionan en pantallas de placas (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Inicio rápido

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

No hace falta código de inicio: el avatar parpadea y espera solo. `view="3d"` es la cabeza 3D del sitio oficial; sin él es el avatar plano (el valor por defecto, y más ligero).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Sin npm: descarga `boopface-x.y.z.zip` de la [última versión](https://github.com/CX-ArtLab/boopface/releases/latest), descomprímelo junto a tu página y cárgalo con `<script type="module" src="./boopface/boopface.js"></script>`.

**Tamaño** (tamaño de transferencia con gzip)

| Versión | Tamaño |
| --- | --- |
| Lite `import 'boopface/lite'`, sin skins | unos 92 KB |
| Completa, la página no usa skins | unos 104 KB |
| Completa, con skins | unos 161 KB (el código de skins se carga la primera vez que se usa una) |

Al pasar a 3D se descargan unos 19 KB más.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Expresiones

```js
avatar.play('success');   // reproducir una vez
avatar.startWaiting();    // esperar hasta stopWaiting() u otra expresión
avatar.reset();           // volver al reposo
```

| Acción | Aspecto | Útil para |
| --- | --- | --- |
| `idle` | Parpadea y mira alrededor | Estado predeterminado |
| `bored` | Mira despacio a un lado y al otro | No ha pasado nada en un rato |
| `waiting-spin` | Los ojos giran de lado a lado | Esperando respuesta (predeterminado) |
| `waiting-wrap` | Los ojos salen por un lado y vuelven por el otro | Esperando respuesta |
| `waiting-wave` | Los ojos suben y bajan por turnos | Esperando respuesta |
| `waiting-bloom` | Dos óvalos cruzados respiran y giran como una flor | Esperando respuesta; pensada para conversaciones por voz |
| `waiting-cross` | Dos óvalos cruzados reposan sobre la ×, giran un cuarto cada vez y alternan entre fino y lleno | Esperando una respuesta; también para voz |
| `shape-wait` | Los ojos se funden en una forma que cambia entre círculo y cuadrado redondeado | Esperando una respuesta |
| `input` | Los ojos se convierten en cursores parpadeantes | El usuario está escribiendo |
| `listening` | Los dos ojos se funden en uno redondo que se hincha con la voz | Voz: el usuario está hablando |
| `speaking` | Los ojos se separan de nuevo y se estiran con la respuesta | Voz: la IA está respondiendo |
| `affirm` | Asiente | Entendido, confirmado |
| `success` | Ojos felices y sonrientes | Tarea completada |
| `failure` | Baja la cabeza y los ojos | Fallo de tarea o conexión |
| `wary` | Gira la cabeza y mira de arriba abajo con recelo | La acción necesita confirmación |
| `inspect` | Entrecierra los ojos y escanea arriba y abajo | Revisar o comprobar algo |
| `observe` | Abre mucho los ojos, se acerca y mira alrededor | Mirar con atención, leer algo |
| `think` | Mira hacia arriba y gira despacio al otro lado | Pensar antes de responder |
| `ponder` | Mira hacia abajo, a izquierda y derecha, y luego levanta la vista | Sopesar algo con cuidado |
| `bow` | Un asentimiento profundo, una pausa y arriba de nuevo | Gracias, disculpa, saludo |
| `angry` | Ojos bajos y fulminantes | Contenido bloqueado |
| `refuse` | Niega con la cabeza | No puede o no quiere hacer la petición |
| `shake` | Primero apartan los ojos y luego gira la cabeza | No estar de acuerdo, no querer mirar |
| `surprise` | Ojos muy abiertos | Algo inesperado |
| `love` | Los ojos se unen en un corazón que late | Agradecimiento, cariño |
| `wink` | Inclina la cabeza y guiña un ojo | Saludar, bromear |
| `smug` | Entorna los ojos, mira arriba y a los lados | Satisfecho, juguetón |
| `bounce` | Rebota como una pelota | Alegría, celebración |
| `smug-bounce` | Dos saltitos sonrientes, inclinándose a izquierda y derecha | Un poco de orgullo |
| `dizzy` | Los ojos giran en sentidos opuestos, uno grande y otro pequeño | Mareado, demasiada información |
| `random` | Los ojos giran como rodillos de tragaperras | Elección al azar, momento lúdico |
| `sleep` | Cierra los ojos y duerme | Mucho tiempo sin actividad |
| `wake` | Abre los ojos y despierta | Vuelve la actividad |

Estilos de espera: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. Los nombres de acción antiguos de 0.5 siguen funcionando hasta 1.0; consulta la [tabla de actualización](../CHANGELOG.md#upgrading-from-05x).

Una petición típica:

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

## Ajustes

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Atributo | Para qué sirve | Método en tiempo de ejecución |
| --- | --- | --- |
| `size` | Tamaño del avatar en píxeles |  |
| `view` | `2d` (por defecto, plano) o `3d` | `setView()` |
| `color` | Color principal del avatar |  |
| `eye-color` | Color de ojos; `transparent` deja ver el fondo a través de los ojos | `setEyeColor()` |
| `eye-style` | Ojos redondeados por defecto; `sharp` recupera los cortes rectos |  |
| `skin` | Número de skin, por ejemplo `301`; omítelo para el color plano | `setSkin()` |
| `auto-sleep` | Tiempo de inactividad antes del sueño automático; `0` lo desactiva |  |
| `wake-on` | Política de activación automática: `activity`, `interaction` o `manual` |  |
| `motion` | Política de movimiento: `auto`, `reduce` o `full` |  |
| `idle-gaze` | En reposo los ojos miran alrededor de vez en cuando; `false` los mantiene mirando al frente | `setIdleGaze()` |
| `petting` | Pasa el puntero varias veces sobre la frente y el avatar cierra los ojos y se acurruca; `false` lo desactiva | `setPetting()` |
| `press-squeeze` | Mantener pulsado el centro para comprimir; `false` lo desactiva | `setPressSqueeze()` |
| `antenna` | `false` oculta la bola de la antena |  |
| `antenna-drag` | Arrastre de la antena, retorno elástico y reacción de mareo; `false` lo desactiva | `setAntennaDrag()` |

Otros métodos: `setPointerFollow(false)` deja de seguir el puntero, `setHeadRoundness(75)` ajusta el redondeo de la cabeza.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Cabeza 3D y ojos

- **3D**: `view="3d"` da a la cabeza grosor y una cara curva; gira de verdad hacia el puntero y se asienta con un pequeño rebote. Todas las expresiones, skins y colores funcionan igual. El código 3D se carga la primera vez que se activa.
- **Las expresiones mueven la cabeza**: la cabeza gira con los ojos, asiente y salta. Con `motion="reduce"` se queda quieta.
- **Ojos redondeados**: las rendijas, como al entrecerrar o parpadear, tienen extremos redondos; `eye-style="sharp"` recupera los cortes rectos.
- **Color de ojos**: `eye-color` funciona en el avatar liso y en 131 skins; las otras 57 conservan sus ojos con textura (consulta `SKINS[id].eyeColor`). `transparent` funciona en todas las skins.
- **Interacción**: los ojos siguen el puntero; al arrastrar la cabeza se deforma como gelatina; al presionar el centro se aplasta; la antena se puede estirar y vuelve con un muelle; si mueves el puntero sobre su frente, cierra los ojos y se acurruca.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Skins

188 skins en 17 series, iluminadas por el puntero, todas en SVG puro. Los números nunca cambian: primero el número de serie y luego dos cifras para la skin (305 = serie 3, skin 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // volver a un color liso
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Skins de BoopFace: destacadas, filtros por serie y búsqueda" width="100%">

| Serie | Números | Serie | Números | Serie | Números |
| --- | --- | --- | --- | --- | --- |
| Esmalte | 101–106 | Vidrio hielo | 201–206 | Gominola | 301–312 |
| Vidrio caramelo | 401–406 | Acrílico | 501–512 | Gelatina | 601–612 |
| Degradado | 701–712 | Vidrio esmerilado | 801–806 | Metal | 901–930 |
| Gemas y cerámica | 1001–1012 | Madera | 1101–1106 | Pelotas | 1201–1210 |
| Transparente y brillo | 1301–1305 | Tela y cuero | 1401–1412 | Dulces y fruta | 1501–1512 |
| Naturaleza | 1601–1612 | Estampados y tecnología | 1701–1717 |  |  |

Míralas todas en la [página de skins de Studio](https://boopface.com/demo/?lang=es#skins). `await loadSkins()` las carga por adelantado; `SKINS`, `SKIN_SERIES` y `SKIN_NAMES` dan nombres, series y números.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Conectar IA

Pasa a `connectAgent()` el stream que te da tu SDK de IA y el avatar mostrará por sí solo cuándo piensa, usa herramientas, responde, termina o falla.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // mostrar la respuesta como siempre
}
```

Compatible con AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, Vercel AI SDK y el estado de `useChat`. También puedes pasar elementos uno a uno con `agent.handle(event)`, o un estado como `agent.handle('thinking')`.

| Estado | Expresión por defecto | Estado | Expresión por defecto |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Usar otras expresiones:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

El chat del [Studio](https://boopface.com/demo/?lang=es#agent) es una simulación local que muestra cómo cambia de expresión el avatar al llegar una respuesta; no hay ninguna IA real conectada. El uso real son las pocas líneas de arriba: pasa a `connectAgent()` el stream que devuelve tu SDK de IA. En Código › Conectar IA ves cómo conectar cada formato.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Conversaciones de voz

Cada turno de un asistente de voz es escuchar, pensar, hablar. BoopFace tiene un conjunto de expresiones a juego que enlazan entre sí:

```js
avatar.startListening();                   // el usuario está hablando
avatar.startWaiting({ variant: 'bloom' }); // la IA está pensando
avatar.startSpeaking();                    // la IA está respondiendo
avatar.setVoiceLevel(0.6);                 // opcional: volumen 0–1
```

Con `connectAgent()` cambia automáticamente (OpenAI Realtime, ElevenLabs y más). Cuando `connectAudio()` recibe el micrófono y el audio de la respuesta, los ojos se mueven con el volumen real:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React y Vue

Un Web Component estándar, se usa tal cual en cualquier framework.

```jsx
// React 19 (en Next.js añade 'use client')
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3 necesita declarar el elemento personalizado en `vite.config.js`:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Ejemplos que funcionan al abrirlos, sin compilar: [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). El componente emite los eventos `face-state` (lo que se muestra) y `action-state` (inicio y fin de acciones); en [`accessibility.html`](../examples/accessibility.html) hay anuncios para lectores de pantalla. Incluye tipos de TypeScript.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: las mismas expresiones de ojos en pantallas de placas ESP32, STM32 y Raspberry Pi Pico">
</p>

Las mismas expresiones de ojos en pantallas de robots y placas. Un pequeño motor en C++11 con 33 expresiones; los ejemplos de firmware cubren 28 combinaciones de placa y pantalla con ESP32, ESP32-S3, STM32 y Raspberry Pi Pico (TFT redondas y cuadradas, pantallas alargadas, AMOLED, OLED monocromo).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: ojos en la pantalla de una placa, botones de expresiones y la lista de pantallas" width="100%">

1. **Vista previa**: el [simulador en línea](https://boopface.com/hardware/?lang=es) ejecuta el mismo motor y simula 32 pantallas, así que puedes verlo sin placa.
2. **Exportar**: ajusta el diseño, los colores y la tasa de fotogramas, abre la pestaña **Firmware** y pulsa **Descargar archivo**; coloca `eyes_settings.h` en `embedded/examples/arduino/` del proyecto completo (junto a `main.cpp`) y compila. El ZIP de la biblioteca de Arduino no incluye esos archivos; consulta los [Pasos](../embedded/README.es.md#ajusta-en-el-simulador-y-pásalo-a-la-placa).
3. **Instalar**: en el Arduino IDE añade `BoopFace-Embedded-0.2.0.zip` desde la [página de la versión](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0); en PlatformIO usa `lib_deps = cxlab/BoopFace@^0.2.0`.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, píxeles de 1 bit

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* enviar eyes.data() a la pantalla */ } }
// eyes.play("success", millis());
```

Experimental: todas las configuraciones compilan en CI, pero no todas se han probado en hardware real. Se agradecen los [informes de hardware](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml). Guía completa: [documentación de Embedded](../embedded/README.es.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Más

- **Actualizar desde Agent Robot Avatar**: cambió de nombre en 0.8, se usa igual. Ejecuta `npm uninstall agent-robot-avatar && npm install boopface`; la etiqueta antigua `<agent-robot-avatar>` sigue funcionando hasta 1.0.
- **Compatibilidad**: navegadores modernos con ES Modules, Custom Elements y Web Animations; las pruebas automáticas cubren Chromium, Firefox y WebKit.
- **Versión**: **Web v0.9.0**, Embedded v0.2.0 (experimental). Hasta 1.0 la API cambia con cuidado.
- **Galería**: [proyectos de la comunidad](../SHOWCASE.md), [envía el tuyo](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Contribuir**: los issues y pull requests son bienvenidos; lee antes [`CONTRIBUTING.md`](../CONTRIBUTING.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Licencia y personaje

El código está bajo la [licencia MIT](../LICENSE): úsalo, modifícalo y compártelo en tus apps. El personaje BoopFace, su aspecto, nombre e identidad visual son diseños originales de CX ArtLab; la licencia MIT no los transfiere ni permite presentarlos como personaje o marca original de otra parte.

BoopFace es un proyecto de código abierto independiente, sin afiliación ni respaldo de ninguna plataforma o marca de IA; los nombres de productos solo se mencionan para describir casos de uso.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Invítame a un café

Si este proyecto te resulta útil, puedes invitarme a un café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
