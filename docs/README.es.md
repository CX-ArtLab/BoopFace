# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: un componente de avatar robot ligero y expresivo para bots de IA, agentes y apps interactivas">
</p>

**Sitio web oficial: [boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace es un componente de avatar robot ligero y expresivo para bots de IA, agentes y apps interactivas. Pensando, esperando, terminado o con error: cada estado de un agente se puede mostrar con una expresión.

Úsalo como rostro y respuesta de estado de asistentes y agentes de IA: asistentes de chat como ChatGPT, Claude, Gemini, Grok y DeepSeek, agentes de programación como Codex, Claude Code, Cursor, Gemini CLI y OpenCode, y agentes personales como Grok Bot, ChatGPT dots, Meta Muse, OpenClaw y Hermes Agent.

También sirve para compañeros de escritorio, mascotas virtuales, mascotas digitales de marca, avatares de chatbot y otros personajes interactivos, o como capa de respuesta visual para interfaces de agentes al estilo AG-UI.

Está hecho con SVG y JavaScript puro, es un Web Component nativo sin dependencias en tiempo de ejecución y tiene licencia MIT. Se muestra plano o en una [cabeza 3D](#cabeza-3d--nuevo-en-09) que gira de verdad; 188 [skins](#skins--novedad-en-07) listas para ponérselas cuando quieras.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

## Nuevo: [BoopFace Embedded](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: las mismas expresiones en pantallas ESP32, STM32 y Raspberry Pi Pico, o en otros programas C++. Incluye ejemplos de firmware para 28 configuraciones y un simulador con exportación de ajustes."></a>
</p>

Las mismas expresiones en pantallas ESP32, STM32 y Raspberry Pi Pico, o en otros programas C++. Incluye ejemplos de firmware para 28 configuraciones y un simulador con exportación de ajustes.

## Demo en vivo

<h3 align="center">Sitio web oficial</h3>

<p align="center">
  <a href="https://boopface.com/">boopface.com</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Web Component</h3>

Desde la 0.9, la demo, las skins y la conexión con IA son una sola página: el Studio. Su escenario cambia entre plano y 3D; al lado puedes probar cada expresión y el kit de voz, cambiar skins y colores, ajustar el comportamiento, chatear con un avatar conectado a una IA y copiar en cualquier momento el código de lo que ves.

<p align="center">
  <a href="https://boopface.com/demo/?lang=es">Abrir el Studio</a> · <a href="https://boopface.com/demo/?lang=es#skins">Elegir una skin</a> · <a href="https://boopface.com/demo/?lang=es#agent">Probar la conexión con IA</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Demostración animada interactiva de BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=es">Abrir el simulador integrado</a> (vista previa de 32 configuraciones de pantalla para dispositivos integrados)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Características

- Web Component nativo
- Renderizado SVG + JavaScript nativo
- Cero dependencias en tiempo de ejecución
- Plano o 3D; la cabeza 3D gira de verdad hacia el puntero
- Parpadeo automático y comportamiento idle sutil
- Ojos que siguen al puntero y cabeza con inercia; cada expresión mueve toda la cabeza
- Acaricia la frente y el avatar cierra los ojos y se acurruca
- Deformación local tipo gelatina al arrastrar, con recuperación elástica
- Compresión al mantener pulsado y antena elástica arrastrable
- Estados y expresiones del Agent controlables por código
- Más de 30 expresiones: waiting, success, failure, affirm, wary, inspect, angry, refuse, love y, nuevas en 0.9, reverencia, observar, pensar, guiño, presumido, mareo, rebote y más
- Ojos redondeados de cualquier color, o transparentes para que se vea el fondo
- Compatibilidad con movimiento reducido
- Comportamiento de sueño configurable
- Redondez de la cabeza ajustable
- 188 skins numerados en 17 series, con luz que sigue al puntero
- Versión ligera sin skins para las páginas más pequeñas
- `connectAgent()`: los eventos de un flujo de IA controlan las expresiones (AG-UI, OpenAI, Anthropic, Vercel AI SDK)
- Kit de expresiones de voz: un conjunto de expresiones para escuchar, pensar y hablar que siguen el volumen real
- Declaraciones TypeScript incluidas
- BoopFace Embedded lleva las mismas expresiones oculares a 28 configuraciones de placa y pantalla con ESP32, ESP32-S3, STM32 y Raspberry Pi Pico, con exportación de ajustes del simulador para el firmware

## Instalación

```bash
npm install boopface
```

```js
import 'boopface';
```

O descarga `boopface-x.y.z.zip` desde la [última versión](https://github.com/CX-ArtLab/boopface/releases/latest). Contiene solo el componente, con las skins. Descomprímelo junto a tu página:

```html
<script type="module" src="./boopface/boopface.js"></script>
```

Después añade el componente:

```html
<boop-face id="avatar"></boop-face>
```

No hace falta código de inicialización. El avatar entra automáticamente en su estado idle predeterminado.

### Actualizar desde Agent Robot Avatar

BoopFace se llamaba Agent Robot Avatar antes de la versión 0.8. Las funciones y el uso no cambian. Para actualizar, cambia el nombre del paquete a `boopface`:

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

La etiqueta antigua `<agent-robot-avatar>` sigue funcionando hasta la 1.0, así que no hay prisa por cambiar tus páginas. El paquete npm antiguo `agent-robot-avatar` ya no recibe actualizaciones; las nuevas versiones se publican solo como `boopface`.

### Versión ligera

Para páginas que nunca usan skins, `boopface/lite` es el mismo avatar sin el código de los skins:

```js
import 'boopface/lite';
```

La versión ligera ignora el atributo `skin` y avisa en la consola de que los skins necesitan la versión completa.

Comparación de tamaño (transferencia por la red, con compresión gzip):

| Versión | Tamaño |
| --- | --- |
| Ligera `boopface/lite` | unos 92 KB |
| Completa, la página no usa skins | unos 104 KB; el código que dibuja las skins no se descarga |
| Completa, con skins | unos 161 KB; la parte extra se descarga la primera vez que se usa una skin |

Al pasar a 3D, cualquiera de las dos versiones descarga unos 19 KB más para el render 3D.

## Uso básico

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

Acciones disponibles:

| Acción | Aspecto | Cuándo usarla |
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

Las acciones de espera reproducen una ronda con `play()`. `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` se repite hasta que empiece otra acción o se llame a `stopWaiting()`.

Los nombres de 0.5 (`send`, `warning`, `error`, `blocked`, `slot` y otros) siguen funcionando hasta 1.0 con un aviso en la consola; consulta la [tabla de actualización](../CHANGELOG.md#upgrading-from-05x).

Un flujo típico para una solicitud de Agent:

```js
avatar.startWaiting();

// Segunda espera: los ojos salen por un lado y vuelven por el otro.
avatar.startWaiting({ variant: 'wrap' });

// Tercera variante de espera: ondas verticales escalonadas de los ojos.
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## Opciones comunes

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

| Atributo | Uso |
| --- | --- |
| `size` | Tamaño del avatar en píxeles |
| `view` | `2d` (por defecto, plano) o `3d` |
| `color` | Color principal del avatar |
| `eye-color` | Color de ojos; `transparent` deja ver el fondo a través de los ojos |
| `eye-style` | Ojos redondeados por defecto; `sharp` recupera los cortes rectos |
| `auto-sleep` | Tiempo de inactividad antes del sueño automático; `0` lo desactiva |
| `wake-on` | Política de activación automática: `activity`, `interaction` o `manual` |
| `motion` | Política de movimiento: `auto`, `reduce` o `full` |
| `press-squeeze` | Mantener pulsado el centro para comprimir; `false` lo desactiva |
| `antenna` | `false` oculta la bola de la antena |
| `antenna-drag` | Arrastre de la antena, retorno elástico y reacción de mareo; `false` lo desactiva |
| `idle-gaze` | En reposo los ojos miran alrededor de vez en cuando; `false` los mantiene mirando al frente |
| `skin` | Número de skin, por ejemplo `301`; omítelo para el color plano |

Controles habituales en tiempo de ejecución:

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // desactivar las caricias
```

El centro del avatar inicia el aplastamiento. Si el puntero se mueve más de 4 píxeles CSS, el mismo gesto pasa al arrastre de cabeza existente. Arrastrar la antena usa el mismo límite que el arrastre de cabeza y termina con la expresión de mareo.

## Cabeza 3D · Nuevo en 0.9

```html
<boop-face view="3d"></boop-face>
```

`view="3d"` (o `avatar.setView('3d')`) convierte el avatar en una cabeza con volumen: gira de verdad hacia el puntero, su cara es curva y tras cada giro da un pequeño rebote antes de quedarse quieta. Todas las expresiones, gestos, skins y colores funcionan en 3D; `view="2d"` vuelve a la vista plana. El código 3D se descarga la primera vez que una página cambia a 3D, así que las páginas solo planas nunca lo cargan.

**Cada expresión mueve la cabeza.** La cabeza gira hacia donde miran los ojos, asiente, se inclina y salta; en 3D gira de verdad y en plano se dibuja el giro. Con `motion="reduce"` se queda quieta.

**Ojos redondeados.** Donde un párpado corta un ojo, la esquina ahora es redondeada, y las rendijas finas (dormir, entornar, parpadear, el cursor de escritura) tienen extremos redondos. Para los cortes rectos de antes, usa `eye-style="sharp"`.

**Color de ojos.** `eye-color="#2bd67b"` (o `setEyeColor()`) colorea los ojos, en el avatar liso y en las 131 skins de ojos lisos. Las otras 57 skins tienen ojos con textura propia (en relieve, de cristal o con dibujo) y los conservan; `SKINS[número].eyeColor` indica cuáles se pueden cambiar. `eye-color="transparent"` recorta los ojos de la cabeza para que se vea lo que hay detrás del avatar; funciona en todas las skins, también con ojos con textura.

**Caricias.** Acaricia la frente unas cuantas veces y el avatar cierra los ojos y se acurruca. Activado por defecto; `setPetting(false)` lo desactiva.

## Skins · Novedad en 0.7

188 skins en 17 series, con una luz que sigue al puntero. Cada skin tiene un número permanente: el número de serie seguido de dos cifras, así que 305 es el quinto skin de la serie 3. Los nombres pueden cambiar; los números nunca cambian ni se reutilizan.

Todas las skins siguen siendo SVG puro: sin imágenes, canvas ni WebGL. Todas las skins juntas ocupan unos 70 KB por la red (unos 290 KB sin comprimir), y la mayor parte solo se carga cuando una página usa una skin. Como referencia, el avatar en sí (la versión lite, sin skins) ocupa unos 92 KB.

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Galería de skins de BoopFace: destacados, filtros y búsqueda" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // o '102'
avatar.setSkin(null); // vuelve al color plano
```

Todas las skins con su número están en la [pestaña de skins del Studio](https://boopface.com/demo/?lang=es#skins).

| Serie | Números | Serie | Números | Serie | Números |
| --- | --- | --- | --- | --- | --- |
| Esmalte | 101–106 | Vidrio hielo | 201–206 | Gominola | 301–312 |
| Vidrio caramelo | 401–406 | Acrílico | 501–512 | Gelatina | 601–612 |
| Degradado | 701–712 | Vidrio esmerilado | 801–806 | Metal | 901–930 |
| Gemas y cerámica | 1001–1012 | Madera | 1101–1106 | Pelotas | 1201–1210 |
| Transparente y brillo | 1301–1305 | Tela y cuero | 1401–1412 | Dulces y fruta | 1501–1512 |
| Naturaleza | 1601–1612 | Estampados y tecnología | 1701–1717 |  |  |

El código que pinta los skins se descarga la primera vez que se usa uno, así que una página sin skins nunca lo carga. `await loadSkins()` lo carga por adelantado. `SKINS` contiene los nombres en chino e inglés y los colores de cada skin, `SKIN_SERIES` las series y `SKIN_NAMES` todos los números.

Todas las expresiones y gestos funcionan con un skin. Al quitar el skin, el atributo `color` vuelve a aplicarse.

## Conectar un flujo de IA · Novedad en 0.9

`connectAgent()` hace que un flujo de IA mueva el avatar directamente. Pásale los eventos que tu SDK de IA ya te da y el avatar mostrará por sí solo cuándo piensa, usa una herramienta, responde, termina, falla o se niega.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // muestra la respuesta como siempre
}
```

`track()` deja pasar cada elemento sin cambios. Un flujo que termina bien cuenta como terminado, un error lanzado como fallo, y una cancelación o un `break` anticipado como cancelado. También puedes pasar los elementos uno a uno con `agent.handle(event)`, o un nombre de estado como `agent.handle('thinking')`.

Entiende eventos de AG-UI, flujos de OpenAI Responses, Realtime y Chat Completions, flujos de Anthropic Messages, partes de flujo de Vercel AI SDK y el estado de `useChat` (`submitted`, `streaming`, `ready`, `error`). Todo lo demás se ignora.

| Estado | Expresión por defecto | Cuándo |
| --- | --- | --- |
| `listening` | `listening`, en bucle | Voz: el usuario está hablando |
| `thinking` | `waiting-spin`, en bucle | Petición enviada, el modelo está pensando |
| `tool` | `waiting-wave`, en bucle | Se está ejecutando una herramienta |
| `replying` | `idle` | Está llegando el texto de la respuesta |
| `speaking` | `speaking`, en bucle | Voz: se está reproduciendo la respuesta de la IA |
| `approval` | `wary` | El agente necesita que el usuario confirme |
| `done` | `success` | Terminado |
| `error` | `failure` | Ha fallado |
| `refused` | `refuse` | El modelo se ha negado |
| `cancelled` | `idle` | Detenido por el usuario |
| `typing` | `input` | El usuario está escribiendo, se indica con `handle('typing')` |
| `idle` | `idle` | No hay nada en curso |

Puedes cambiar cualquiera por un nombre de acción, una función o `null` para no mostrar nada:

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

En el [Studio](https://boopface.com/demo/?lang=es#agent) puedes chatear con un avatar conectado a una IA; en Código › Conectar IA eliges la expresión de cada estado y ves el código de cada formato.

## Kit de expresiones de voz · Novedad en 0.9

Escuchar, pensar, hablar: todo asistente de voz pasa por estos tres pasos en cada turno. El kit de expresiones de voz da al avatar un conjunto de tres expresiones que enlazan entre sí. Sirve para cualquier producto al que se le habla, con cualquier servicio de voz: llama tú mismo a los tres métodos o deja que `connectAgent()` siga a tu API de voz.

```js
avatar.startListening();                   // el usuario habla
avatar.startWaiting({ variant: 'bloom' }); // la IA piensa
avatar.startSpeaking();                    // la IA responde
avatar.setVoiceLevel(0.6);                 // opcional: volumen de 0 a 1
```

Al escuchar, los dos ojos se funden en un solo ojo redondo que se hincha con la voz del usuario. Al pensar, se convierte en una flor de dos óvalos cruzados que respira y gira despacio. Al hablar, vuelve a separarse en dos ojos que se asientan y luego se estiran con la respuesta: los sonidos graves mueven el ojo izquierdo y los agudos el derecho. `setVoiceLevel(level)` o `setVoiceLevel([low, high])` aporta el volumen; sin él, hablar mantiene su propio ritmo y escuchar se queda quieto. Cada paso se repite hasta el siguiente, y al cambiar los ojos se transforman en lugar de saltar.

Pensar es un paso de espera. Flor (`variant: 'bloom'`) y Cruz (`variant: 'cross'`) salen directamente del ojo de escucha; cualquier otro estilo de espera también sirve.

`connectAgent()` también puede cambiarlas por sí solo. Ya entiende los eventos de las API de voz más comunes, como OpenAI Realtime y el `mode` que informan SDK como ElevenLabs. Mientras piensa espera con el estilo Florecer (o con el de `actions.thinking`) y vuelve a escuchar después de cada respuesta. Por ejemplo, con OpenAI Realtime:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` acepta MediaStreams o elementos `<audio>` y pasa su volumen a los ojos. Con la respuesta conectada, el avatar también nota cuándo ha terminado de sonar.

## React y Vue

`<boop-face>` es un Web Component estándar, así que funciona en cualquier framework.

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

En Next.js, marca el archivo con `'use client'`.

**Vue 3**

Indica a Vue que `boop-face` es un elemento personalizado, en `vite.config.js`:

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

Páginas que funcionan sin compilar: [`examples/react.html`](../examples/react.html) y [`examples/vue.html`](../examples/vue.html).

## Eventos e integración

El componente emite `face-state` para cambios de estado visual y `action-state` para cambios semánticos del ciclo de vida de las acciones.

Para integraciones con la aplicación anfitriona y texto de estado accesible, usa preferentemente `action-state`. Consulta [`examples/accessibility.html`](../examples/accessibility.html) para ver un ejemplo ejecutable del ciclo de vida de una solicitud.

Hay un ejemplo mínimo de integración en [`examples/basic.html`](../examples/basic.html).

## Compatibilidad

Diseñado para navegadores modernos con soporte para ES Modules, Custom Elements, SVG, Pointer Events, Web Animations API, `IntersectionObserver`, `ResizeObserver` y `matchMedia`.

Las pruebas automatizadas cubren Chromium, Firefox y WebKit.

<a id="boopface-embedded"></a>

## Nuevo: BoopFace Embedded

Las expresiones oculares de la versión web ahora funcionan en pantallas de robots y placas. El pequeño motor C++11 conserva los movimientos y el ritmo. Los ejemplos cubren 28 configuraciones ESP32, ESP32-S3, STM32 y Raspberry Pi Pico: TFT redondas y rectangulares, pantallas alargadas, AMOLED y OLED monocromas. También admite tamaños personalizados. La versión 0.2 se pone al día con la Web 0.9: los mismos ojos redondeados, 13 expresiones nuevas como reverencia, observar, pensar, guiño, presumido, mareo y rebote, y escuchar y hablar del kit de voz, 33 en total.

| Tu dispositivo | Qué usar |
| --- | --- |
| Web, apps, tabletas Android y robots con navegador | Componente web: avatar completo, pieles e interacción |
| ESP32, STM32 y Raspberry Pi Pico | Motor integrado con ejemplos de firmware |
| Otros microcontroladores o programas C++ | Biblioteca C++; conecta tu controlador de pantalla |


<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="Simulador de BoopFace Embedded: expresiones en una TFT redonda, distribución, colores y exportación" width="100%">

**Pruébalo sin placa.** El [simulador](https://boopface.com/hardware/?lang=es) ejecuta el mismo motor C++ en el navegador con 32 pantallas simuladas. Permite anticipar el resultado y comparar módulos.

**Ajusta, exporta y compila.** Elige pantalla, distribución, colores y fotogramas por segundo. Pulsa **Exportar ajustes**, guarda `eyes_settings.h` junto al `main.cpp` del ejemplo y compila. Consulta los [pasos](../embedded/README.md). La interfaz y los comentarios exportados siguen el idioma elegido.

**Instalar desde ZIP.** Descarga `BoopFace-Embedded-0.2.0.zip` de la [versión integrada](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) y usa **Programa → Incluir librería → Añadir biblioteca .ZIP** en Arduino IDE. La indexación en Arduino Library Manager sigue pendiente; mientras tanto, usa el ZIP o el código fuente. Para [PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace), añade esta dependencia al entorno de `platformio.ini`:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**En tu programa**, reproduce expresiones por su nombre:

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1 bit por píxel

void setup() {
  boopface::EyesConfig config;
  eyes.begin(config, pixels, sizeof pixels, millis());
}

void loop() {
  if (eyes.update(millis())) {
    // Enviar eyes.data() al controlador de pantalla.
  }
}

// Cuando sea necesario
// eyes.play("success", millis());
```

Experimental: CI compila todas las configuraciones, pero aún no se han verificado en hardware real. Si pruebas una, envía un [informe](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml). La [guía](../embedded/README.md) incluye la API y las conexiones.

## Proyectos hechos con BoopFace

Te invitamos a sumarte a esta lista y a compartir lo que has creado con BoopFace. Para enviar tu proyecto, abre el formulario: https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml

[Ver los proyectos de la comunidad](../SHOWCASE.md)

## Contribuir

Se aceptan Issues y Pull Requests. Consulta [`CONTRIBUTING.md`](../CONTRIBUTING.md) antes de enviar cambios.

## Estado del proyecto

**Versión pública actual: v0.9.0**\
BoopFace Embedded: v0.2.0 (experimental)

La API pública se mantiene deliberadamente compacta mientras el proyecto evoluciona hacia un futuro compromiso de estabilidad `1.0.0`.

BoopFace se desarrolla de forma independiente y no está afiliado, respaldado ni representa a ninguna plataforma o marca de IA.

## Diseño del personaje e identidad visual

El personaje BoopFace, incluido su aspecto robótico y su identidad visual, es un diseño original de CX ArtLab.

La licencia MIT se aplica al software y al código fuente. Permite usar, modificar y distribuir el avatar como parte de aplicaciones, pero no transfiere la propiedad del nombre BoopFace, la identidad del personaje o su identidad visual, ni concede el derecho a presentarlos como personaje original o marca independiente de otra parte.

Los nombres de productos de terceros mencionados en este proyecto se usan únicamente para describir posibles casos de uso y no implican afiliación ni respaldo.

## Licencia

MIT License. Consulta [`LICENSE`](../LICENSE).

---

Si este proyecto te resulta útil, puedes invitarme a un café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
