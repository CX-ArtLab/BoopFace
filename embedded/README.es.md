# BoopFace Embedded

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English · referencia completa de la API](README.md) · [Volver al proyecto principal](../docs/README.es.md)

Una **implementación experimental para hardware** del mismo proyecto. Solo dibuja los ojos: expresiones, parpadeo, mirada, espera, dormir y despertar; tu programa decide qué acción reproducir y cuándo. Arrastrar, apretar, la forma de la cabeza, la antena y la escucha del ratón no forman parte de esta versión. La carpeta embebida es independiente del componente SVG y de su demo, para mantenerlos por separado.

El [simulador en línea](https://boopface.com/hardware/?lang=es) está en 10 idiomas, y los comentarios de los ajustes exportados siguen el idioma elegido. La página de la versión también ofrece un HTML de un solo archivo que funciona sin conexión.

## Para muchas plataformas

El núcleo de expresiones es una biblioteca C++11 independiente: no depende de ESP32, Arduino, el navegador ni de un controlador de pantalla concreto, y no reserva memoria dinámica. ESP32 y Raspberry Pi Pico son las primeras integraciones de referencia; otros microcontroladores pueden usarlo escribiendo su propio adaptador de pantalla.

| Entorno de compilación | Placa | Pantalla |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789, 240×240, SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789, 240×240, SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306, 128×64, I²C, dirección `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306, 128×32, I²C, dirección `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106, 128×64, I²C, dirección `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 redonda, 240×240, SPI (mismo cableado que `esp32-s3-st7789`) |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1,69″, 240×280, SPI (mismo cableado) |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2,0″, 240×320, SPI (mismo cableado) |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | GC9A01 redonda integrada, sin cables |
| `cyd-ili9341` | ESP32-2432S028 (CYD) | ILI9341 integrada, sin cables |
| `t-display-st7789` | LilyGO T-Display | ST7789 1,14″ integrada, horizontal |
| `t-display-s3` | LilyGO T-Display-S3 | ST7789 1,9″ integrada, paralelo de 8 bits, horizontal |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | El modelo M5Stack correspondiente | Pantalla integrada, detectada por M5Unified |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1,14″ / 2,0″ horizontal (mismo cableado) |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1,8″ / 0,96″ (mismo cableado) |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3,5″, 480×320 (mismo cableado) |
| `xiao-round-display` | Seeed XIAO ESP32S3 + pantalla redonda | Se enchufa, sin cables |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | Pantalla integrada |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | AMOLED redonda integrada |
| `t-rgb-21` | LilyGO T-RGB 2,1″ | Pantalla RGB redonda integrada |
| `guition-4848s040` | Guition ESP32-4848S040 (panel 86) | Pantalla RGB cuadrada integrada |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE (STM32F411) | ST7789, 240×240, SPI, en el conector Arduino |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306, 128×64, I²C, dirección `0x3C` |

El controlador de pantalla de cada configuración ocupa un pequeño bloque en `examples/arduino/boards.h`; el programa principal es común. Los pines siguen la documentación de los fabricantes; T-RGB, el panel 86 y el BOX-3 usan las configuraciones de placa incluidas en Arduino_GFX, y los pines de la AMOLED vienen de la página del dispositivo en ESPHome. A revisar en hardware real: la ST7735 tiene varias variantes (si la imagen sale desplazada, prueba `INITR_GREENTAB`); la AMOLED puede necesitar un pequeño desplazamiento de columna; las revisiones de T-RGB difieren en la secuencia de arranque. Los ojos son blancos sobre negro, así que el orden rojo/azul no se nota. Todas las configuraciones compilan en CI, pero aún no se han probado en hardware real; si ejecutas una en un dispositivo, abre un issue de *informe de hardware* y el simulador la marcará como verificada por la comunidad.

**Esta versión aún no se ha probado en hardware real. Que compile y pase las pruebas en el ordenador no confirma el cableado, la tasa de fotogramas real ni el aspecto en el dispositivo.** La versión web y la embebida comparten nombres de expresiones y diseño, pero tienen renderizadores distintos; la embebida muestrea la geometría original cada 20 ms e interpola, conservando el movimiento y el ritmo de los ojos. No dibuja la cabeza, la antena ni el recorte por el contorno de la cabeza, y a baja resolución los bordes se ven pixelados.

## Míralo primero en el ordenador, sin hardware

Descarga [`preview/boopface-embedded-preview.html`](preview/boopface-embedded-preview.html) y ábrelo en el navegador. Es un archivo completo que funciona sin conexión: no necesita servidor, placa, Python, Node.js ni compilador. Descarga el HTML original, no guardes la página de vista de archivo de GitHub. En un clon del proyecto también puedes abrirlo con doble clic.

Es **el mismo código C++ embebido compilado a WebAssembly**, no la demo web ni otra animación en JavaScript. Ofrece 33 acciones (las 18 de la 0.1, más 13 que la 0.2 trae de la web 0.9, como reverencia, observar, pensar, guiño, presumido, mareo y rebote, y escuchar y hablar del kit de voz), ciclo automático, pausa y avance por fotogramas, dirección de la mirada, 32 pantallas predefinidas en cinco grupos (redondas, cuadradas, alargadas, kits de desarrollo y OLED) y resoluciones personalizadas de 16 a 512 por eje. Los ojos son redondeados por defecto; `setRoundEyes(false)` recupera los cortes rectos. Se puede ajustar mostrar entero o recortar para llenar, zoom, desplazamientos y recorte circular. La salida del navegador no sustituye las pruebas de cableado, controlador, frecuencia de refresco ni rendimiento en hardware real. Para recompilar y verificar, consulta [las notas del simulador](preview/README.md).

## Ajusta en el simulador y pásalo a la placa

Deja los ojos a tu gusto en el simulador y compila el firmware con esos mismos ajustes, sin tocar código:

1. Abre el simulador y elige tu pantalla. El panel **Modelo y cableado** muestra la placa, el cableado y el comando de compilación.
2. Ajusta el diseño, los colores, la tasa de fotogramas, el parpadeo y las transiciones; si la pantalla está montada girada, pulsa «Girar pantalla 90°».
3. Pulsa **Exportar ajustes**, copia o descarga el texto y guárdalo como `eyes_settings.h`.
4. Coloca el archivo en `embedded/examples/arduino/`, junto a `main.cpp`.
5. Compila y sube el entorno indicado en las primeras líneas del archivo, por ejemplo `pio run -d embedded -e esp32-s3-st7789 -t upload`.

| Ajuste en `eyes_settings.h` | Control del simulador |
| --- | --- |
| `EYES_MAX_FPS`, `EYES_AUTO_BLINK`, `EYES_TRANSITION_MS` | Límite de fotogramas, parpadeo, transiciones |
| `EYES_FIT_COVER`, `EYES_ZOOM`, `EYES_OFFSET_X`, `EYES_OFFSET_Y` | Diseño: encajar o llenar, tamaño, posición |
| `EYES_INK_RGB`, `EYES_BACKGROUND_RGB` | Colores de ojos y fondo, o una paleta (solo pantallas a color) |
| `EYES_TURN` | Girar la pantalla 90°; si los ojos salen al revés, cambia `3` por `1` |
| `EYES_FULL_PANEL` | En la pantalla cuadrada de referencia de 1,3″, usar todo el panel en lugar de la franja de 240×160 |

Sin el archivo el firmware usa sus valores por defecto, y git lo ignora. Seguir con la mirada necesita una cámara o un sensor de distancia en la placa, así que no forma parte de la exportación: el `GazeTracker` de la biblioteca (`lib/BoopFace/src/BoopFaceGaze.h`) recibe la posición que informe tu sensor.

## Cableado

Son números GPIO, no la posición física en el conector. Usa un módulo de pantalla compatible con 3,3 V en lógica y alimentación, con CS/DC/RST accesibles; las placas con pantalla integrada necesitan su propia configuración según su esquema.

| Pin ST7789 | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13 (PA5) |
| MOSI / SDA | GPIO11 | GP19 | D11 (PA7) |
| CS | GPIO10 | GP17 | D10 (PB6) |
| DC | GPIO9 | GP20 | D9 (PC7) |
| RST / RES | GPIO8 | GP21 | D8 (PA9) |
| VCC | 3,3 V | 3,3 V | 3V3 |
| GND | GND | GND | GND |

MISO no se conecta. Cablea la retroiluminación según la documentación del módulo; el ejemplo no controla ese pin.

Ejemplo OLED con ESP32: SDA → GPIO21, SCL → GPIO22, VCC → 3,3 V del módulo compatible, GND → GND; cambia `0x3C` si el módulo usa otra dirección.

OLED con STM32 Black Pill: SDA → PB7, SCL → PB6. Sube el firmware por USB en modo DFU (mantén BOOT0 y pulsa NRST una vez); los comandos serie van por el mismo cable USB. La NUCLEO sube y se comunica por el puerto USB de su ST-LINK.

## Compilar y usar

Instala PlatformIO y, desde la raíz del proyecto, ejecuta el comando correspondiente:

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

Para compilar con los ajustes del simulador, consulta [Ajusta en el simulador y pásalo a la placa](#ajusta-en-el-simulador-y-pásalo-a-la-placa).

Todas las placas comparten la misma biblioteca de expresiones; solo cambia el pequeño bloque del controlador de pantalla. Si quieres un proyecto más limpio, conserva solo la sección `[env:...]` de tu placa en `platformio.ini` y su bloque en `examples/arduino/boards.h`, y borra el resto.

Sube solo el entorno que coincide con tu placa y tu cableado. Por ejemplo:

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

Por el puerto serie envía el nombre de la acción en inglés, terminado en salto de línea:

- `love`: corazones.
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`: espera continua (giro, vuelta, ola, flor, cruz, círculo y cuadrado) hasta que otra acción la sustituya.
- `listening` / `speaking`: escuchar y hablar del kit de voz, hasta la siguiente acción; desde el programa puedes pasar el volumen con `setVoiceLevel()`.
- `success` / `failure`: tarea completada o fallida.
- `wary` / `inspect` / `angry` / `refuse`: recelo, inspección, enfado, rechazo.
- `sleep` / `wake`: dormir, despertar.
- `gaze -0.5 0.2`: el programa fija la dirección de la mirada, con coordenadas en `[-1,1]`. El alcance lo define `EyesConfig::gazeRange` (o `setGazeRange()` en ejecución): `Small` es el 8 × 6 original, `Medium` (por defecto) 20 × 18, hasta el borde del área de la cara, y `Large` 30 × 21, algo más allá. Cerca del borde los ojos se estrechan y se recogen hacia dentro con la fórmula de la versión web, como si giraran; con la mirada centrada, los tres niveles se ven igual.
- `demo`: reproduce todas las acciones en ciclo; una acción manual válida lo detiene.
- `reset`: vuelve al reposo.
- `help`: lista los comandos.

También están `idle`, `bored`, `input`, `affirm`, `surprise`, `random` y, desde la 0.2, `observe`, `think`, `ponder`, `bow`, `shake`, `wink`, `smug`, `bounce`, `smug-bounce` y `dizzy`. Los nombres antiguos de la 0.5 (`send`, `warning`, `blocked`, `error`, etc.) funcionan hasta la 1.0; la tabla de equivalencias está en la documentación en inglés.

## Integrarlo en tu dispositivo

La biblioteca está en `embedded/lib/BoopFace`. En Arduino, copia esa carpeta a tu carpeta `libraries`, o descarga `BoopFace-Embedded-0.2.0.zip` desde la [página de la versión embebida](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) e instálalo con *Programa → Incluir biblioteca → Añadir biblioteca .ZIP*. La indexación en el Gestor de bibliotecas de Arduino sigue en curso; hasta entonces usa el ZIP o el código fuente. En otras plataformas C++11, compila la carpeta `src` completa.

[PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) ya incluye `cxlab/BoopFace`; añádelo a tu entorno en `platformio.ini`:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

La biblioteca trae dos ejemplos para el Arduino IDE, en *Archivo → Ejemplos → BoopFace*: **SerialEyes** dibuja los ojos con caracteres en el monitor serie y no necesita pantalla; **OledSSD1306** funciona en una OLED I²C de 0,96″ 128×64 (instala antes la biblioteca Adafruit SSD1306). En ambos se escribe el nombre de la acción en el monitor serie. CI los compila para ESP32 y RP2040.

El núcleo de dibujo no necesita las bibliotecas de Adafruit; solo los controladores de pantalla del ejemplo las usan.

Tu programa aporta un tiempo en milisegundos que siempre avanza, llama a `eyes.update(nowMs)` y entrega el nuevo mapa de bits al controlador de pantalla. Admite el desbordamiento del contador de 32 bits; no mezcles relojes ni manejes la misma instancia desde varias tareas sin protección.

El lienzo de ojos de 240×160 ocupa 4.800 bytes, y el ejemplo TFT necesita 480 bytes más para la fila de conversión de color; el lienzo de 128×64 ocupa 1.024 bytes, y el controlador OLED tiene además su propio búfer. Estas cifras no incluyen el sistema, los controladores ni otras instancias. Las tablas de geometría de solo lectura de las acciones originales ocupan unos 80 KB de flash, sin memoria dinámica. El ejemplo limita a 25 FPS; la tasa real hay que medirla.

La salida es un mapa de bits de 1 bit por filas, con el bit más significativo primero en cada byte, y cada fila redondeada a bytes completos. No es el formato de páginas nativo de la SSD1306; el ejemplo lo convierte con `drawBitmap()` del controlador. El color lo asigna el programa anfitrión, así que sirve para OLED monocromas y para cambiar el color de los ojos en pantallas a color.

**Un mismo producto en distintas plataformas: las expresiones son del proyecto, y ESP32 es solo una de sus puertas.**
