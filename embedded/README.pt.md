# BoopFace Embedded

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Русский](README.ru.md) · [Français](README.fr.md) · [Português](README.pt.md) · [Deutsch](README.de.md)

[English · referência completa da API](README.md) · [Voltar ao projeto principal](../docs/README.pt.md)

Uma **implementação experimental para hardware** do mesmo projeto. Desenha só os olhos: expressões, piscar, olhar, espera, dormir e acordar; o seu programa decide qual ação tocar e quando. Arrastar, apertar, o formato da cabeça, a antena e o acompanhamento do mouse não fazem parte desta versão. A pasta embarcada é independente do componente SVG e da sua demo, para mantê-los separadamente.

O [simulador online](https://boopface.com/hardware/?lang=pt) está em 10 idiomas, e os comentários das configurações exportadas seguem o idioma escolhido. A página da versão também traz um HTML de arquivo único que abre offline.

## Para várias plataformas

O núcleo das expressões é uma biblioteca C++11 independente: não depende de ESP32, Arduino, navegador nem de um driver de tela específico, e não aloca memória dinâmica. ESP32 e Raspberry Pi Pico são as primeiras integrações de referência; outros microcontroladores podem usá-lo com o seu próprio adaptador de tela.

| Ambiente de build | Placa | Tela |
| --- | --- | --- |
| `esp32-s3-st7789` | ESP32-S3-DevKitC-1 | ST7789, 240×240, SPI |
| `pico-st7789` | Raspberry Pi Pico / RP2040 | ST7789, 240×240, SPI |
| `esp32-ssd1306` | ESP32 Dev Module | SSD1306, 128×64, I²C, endereço `0x3C` |
| `esp32-ssd1306-128x32` | ESP32 Dev Module | SSD1306, 128×32, I²C, endereço `0x3C` |
| `esp32-sh1106` | ESP32 Dev Module | SH1106, 128×64, I²C, endereço `0x3C` |
| `esp32-s3-gc9a01` | ESP32-S3-DevKitC-1 | GC9A01 redonda, 240×240, SPI (mesma ligação que `esp32-s3-st7789`) |
| `esp32-s3-st7789-240x280` | ESP32-S3-DevKitC-1 | ST7789 1,69″, 240×280, SPI (mesma ligação) |
| `esp32-s3-st7789-240x320` | ESP32-S3-DevKitC-1 | ST7789 2,0″, 240×320, SPI (mesma ligação) |
| `waveshare-s3-round-128` | Waveshare ESP32-S3-Touch-LCD-1.28 | GC9A01 redonda integrada, sem fios |
| `cyd-ili9341` | ESP32-2432S028 (CYD) | ILI9341 integrada, sem fios |
| `t-display-st7789` | LilyGO T-Display | ST7789 1,14″ integrada, paisagem |
| `t-display-s3` | LilyGO T-Display-S3 | ST7789 1,9″ integrada, paralelo de 8 bits, paisagem |
| `m5-dial` / `m5-atoms3` / `m5-cores3` / `m5-stickc-plus2` | O modelo M5Stack correspondente | Tela integrada, detectada pelo M5Unified |
| `esp32-s3-st7789-240x135` / `-320x240` | ESP32-S3-DevKitC-1 | ST7789 1,14″ / 2,0″ paisagem (mesma ligação) |
| `esp32-s3-st7735-128x160` / `-160x80` | ESP32-S3-DevKitC-1 | ST7735 1,8″ / 0,96″ (mesma ligação) |
| `esp32-s3-ili9488` | ESP32-S3-DevKitC-1 | ILI9488 3,5″, 480×320 (mesma ligação) |
| `xiao-round-display` | Seeed XIAO ESP32S3 + tela redonda | É só encaixar, sem fios |
| `esp32-s3-box-3` | Espressif ESP32-S3-BOX-3 | Tela integrada |
| `waveshare-amoled-175` | Waveshare ESP32-S3-Touch-AMOLED-1.75 | AMOLED redonda integrada |
| `t-rgb-21` | LilyGO T-RGB 2,1″ | Tela RGB redonda integrada |
| `guition-4848s040` | Guition ESP32-4848S040 (painel 86) | Tela RGB quadrada integrada |
| `nucleo-f411re-st7789` | ST NUCLEO-F411RE (STM32F411) | ST7789, 240×240, SPI, no conector Arduino |
| `blackpill-f411-ssd1306` | WeAct Black Pill STM32F411CE | SSD1306, 128×64, I²C, endereço `0x3C` |

O driver de tela de cada configuração é um pequeno bloco em `examples/arduino/boards.h`; o programa principal é comum. Os pinos seguem a documentação dos fabricantes; T-RGB, o painel 86 e o BOX-3 usam as configurações de placa que vêm com o Arduino_GFX, e os pinos da AMOLED vêm da página do dispositivo no ESPHome. Para conferir no hardware real: a ST7735 tem várias variantes (se a imagem ficar deslocada, tente `INITR_GREENTAB`); a AMOLED pode precisar de um pequeno deslocamento de coluna; as revisões da T-RGB diferem na sequência de inicialização. Os olhos são brancos no preto, então a ordem vermelho/azul não aparece. Todas as configurações compilam no CI, mas ainda não foram testadas em hardware real; se você rodar uma num dispositivo, abra um issue de *Relato de hardware* e o simulador vai marcá-la como verificada pela comunidade.

**Esta versão ainda não foi testada em hardware real. Compilar e passar nos testes no computador não confirma a ligação, a taxa de quadros real nem a aparência no dispositivo.** A versão web e a embarcada compartilham os nomes das expressões e o design, mas têm renderizadores diferentes: a embarcada amostra a geometria original a cada 20 ms e interpola, mantendo o movimento e o ritmo dos olhos. A cabeça, a antena e o recorte pelo contorno da cabeça não são desenhados, e em baixa resolução as bordas ficam pixeladas.

## Veja primeiro no computador, sem hardware

Baixe [`studio/boopface-embedded-studio.html`](studio/boopface-embedded-studio.html) e abra no navegador. É um arquivo completo que funciona offline: não precisa de servidor, placa, Python, Node.js nem compilador. Baixe o HTML original, não salve a página de visualização do arquivo no GitHub. Num clone do projeto, dá para abrir com dois cliques.

É **o mesmo código C++ embarcado compilado para WebAssembly**, não a demo web nem outra animação em JavaScript. Oferece 33 ações (as 18 da 0.1, mais 13 que a 0.2 traz da web 0.9, como reverência, observar, pensar, piscadela, convencido, tontura e quicar, além de ouvir e falar do kit de voz), ciclo automático, pausa e avanço quadro a quadro, direção do olhar, 32 telas predefinidas em cinco grupos (redondas, quadradas, em barra, kits de desenvolvimento e OLED) e resoluções personalizadas de 16 a 512 por eixo. Os olhos são arredondados por padrão; `setRoundEyes(false)` volta aos cortes retos. Dá para escolher mostrar inteiro ou recortar para preencher, zoom, deslocamentos e recorte circular. A saída do navegador não substitui testes de ligação, driver, taxa de atualização e desempenho no hardware real. Para recompilar e verificar, veja [as notas do simulador](preview/README.md).

## Ajuste no simulador e leve para a placa

Deixe os olhos do seu jeito no simulador e compile o firmware com essas mesmas configurações, sem mexer no código. Este caminho precisa da **pasta completa do projeto** (a que contém `embedded/`): na [página do GitHub](https://github.com/CX-ArtLab/boopface) escolha *Code → Download ZIP* ou use `git clone`. O ZIP da biblioteca do Arduino traz só os exemplos `.ino`.

1. Abra o simulador e escolha a sua tela. Na aba **Firmware**, *Modelo e conexões* mostra a placa e a sua tabela de ligação.
2. Ajuste o layout, as cores, a taxa de quadros, o piscar e as transições; se a tela estiver montada girada, gire-a 90°.
3. De volta à aba **Firmware**, na página `eyes_settings.h`, clique em **Baixar arquivo** (ou em **Copiar** e salve o texto como `eyes_settings.h`).
4. Coloque o arquivo em `embedded/examples/arduino/` da pasta do projeto, ao lado de `main.cpp`.
5. Instale o [PlatformIO](https://docs.platformio.org/en/latest/core/installation/index.html), abra um terminal na pasta mais acima do projeto (a que contém `embedded`) e execute o comando de compilação mostrado na página, por exemplo `pio run -d embedded -e esp32-s3-st7789 -t upload`.

**Arduino IDE**: instale a biblioteca pelo ZIP (*Sketch → Incluir biblioteca → Adicionar biblioteca .ZIP*) e abra *Arquivo → Exemplos → BoopFace Embedded* (SerialEyes, OledSSD1306). Esses dois exemplos não leem `eyes_settings.h`; para usar as configurações do simulador, siga os passos acima.

| Configuração em `eyes_settings.h` | Controle do simulador |
| --- | --- |
| `EYES_MAX_FPS`, `EYES_AUTO_BLINK`, `EYES_TRANSITION_MS` | Limite de quadros, piscar, transições |
| `EYES_FIT_COVER`, `EYES_ZOOM`, `EYES_OFFSET_X`, `EYES_OFFSET_Y` | Layout: encaixar ou preencher, tamanho, posição |
| `EYES_INK_RGB`, `EYES_BACKGROUND_RGB` | Cores dos olhos e do fundo, ou uma paleta (só telas coloridas) |
| `EYES_TURN` | Girar a tela 90°; se os olhos ficarem de cabeça para baixo, troque `3` por `1` |
| `EYES_FULL_PANEL` | Na tela quadrada de referência de 1,3″, usar o painel inteiro em vez da faixa de 240×160 |

Sem o arquivo, o firmware usa os valores padrão, e o git o ignora. Seguir com o olhar precisa de uma câmera ou sensor de distância na placa, por isso não entra na exportação: o `GazeTracker` da biblioteca (`lib/BoopFace/src/BoopFaceGaze.h`) recebe a posição que o seu sensor informar.

## Ligação

São números de GPIO, não a posição física no conector. Use um módulo de tela compatível com 3,3 V na lógica e na alimentação, com CS/DC/RST acessíveis; placas com tela integrada precisam de configuração própria conforme o esquema.

| Pino ST7789 | ESP32-S3 | Pico | NUCLEO-F411RE |
| --- | --- | --- | --- |
| SCK / SCL | GPIO12 | GP18 | D13 (PA5) |
| MOSI / SDA | GPIO11 | GP19 | D11 (PA7) |
| CS | GPIO10 | GP17 | D10 (PB6) |
| DC | GPIO9 | GP20 | D9 (PC7) |
| RST / RES | GPIO8 | GP21 | D8 (PA9) |
| VCC | 3,3 V | 3,3 V | 3V3 |
| GND | GND | GND | GND |

MISO não é ligado. Ligue a luz de fundo conforme a documentação do módulo; o exemplo não controla esse pino.

Exemplo OLED com ESP32: SDA → GPIO21, SCL → GPIO22, VCC → 3,3 V do módulo compatível, GND → GND; troque `0x3C` se o módulo usar outro endereço.

OLED com STM32 Black Pill: SDA → PB7, SCL → PB6. Envie o firmware por USB em modo DFU (segure BOOT0 e aperte NRST uma vez); os comandos seriais vão pelo mesmo cabo USB. A NUCLEO grava e se comunica pela porta USB do seu ST-LINK.

## Compilar e usar

Instale o PlatformIO e, na raiz do projeto, rode o comando correspondente:

```sh
pio run -d embedded -e esp32-s3-st7789
pio run -d embedded -e pico-st7789
pio run -d embedded -e esp32-ssd1306
```

Para compilar com as configurações do simulador, veja [Ajuste no simulador e leve para a placa](#ajuste-no-simulador-e-leve-para-a-placa).

Todas as placas usam a mesma biblioteca de expressões; só muda o pequeno bloco do driver de tela. Para um projeto mais limpo, mantenha só a seção `[env:...]` da sua placa em `platformio.ini` e o bloco dela em `examples/arduino/boards.h`, e apague o resto.

Envie só o ambiente que corresponde à sua placa e à sua ligação. Por exemplo:

```sh
pio run -d embedded -e esp32-s3-st7789 -t upload
pio device monitor -b 115200
```

Pela serial, envie o nome da ação em inglês, terminado com quebra de linha:

- `love`: corações.
- `waiting-spin` / `waiting-wrap` / `waiting-wave` / `waiting-bloom` / `waiting-cross` / `shape-wait`: espera contínua (giro, volta, onda, flor, cruz, círculo e quadrado) até outra ação substituí-la.
- `listening` / `speaking`: ouvir e falar do kit de voz, até a próxima ação; o programa pode passar o volume com `setVoiceLevel()`.
- `success` / `failure`: tarefa concluída ou com falha.
- `wary` / `inspect` / `angry` / `refuse`: desconfiança, inspeção, raiva, recusa.
- `sleep` / `wake`: dormir, acordar.
- `gaze -0.5 0.2`: o programa define a direção do olhar, com coordenadas em `[-1,1]`. O alcance vem de `EyesConfig::gazeRange` (ou `setGazeRange()` em execução): `Small` é o 8 × 6 original, `Medium` (padrão) 20 × 18, até a borda da área do rosto, e `Large` 30 × 21, um pouco além. Perto da borda os olhos afinam e se recolhem para dentro com a fórmula da versão web, como se a cabeça virasse; com o olhar no centro, os três níveis ficam iguais.
- `demo`: toca todas as ações em ciclo; uma ação manual válida interrompe o ciclo.
- `reset`: volta ao repouso.
- `help`: lista os comandos.

Também há `idle`, `bored`, `input`, `affirm`, `surprise`, `random` e, desde a 0.2, `observe`, `think`, `ponder`, `bow`, `shake`, `wink`, `smug`, `bounce`, `smug-bounce` e `dizzy`. Os nomes antigos da 0.5 (`send`, `warning`, `blocked`, `error` etc.) funcionam até a 1.0; a tabela de equivalência está na documentação em inglês.

## Integrar no seu dispositivo

A biblioteca fica em `embedded/lib/BoopFace`. No Arduino, copie essa pasta para a sua pasta `libraries`, ou baixe `BoopFace-Embedded-0.2.1.zip` na [página da versão embarcada](https://github.com/CX-ArtLab/boopface/releases/tag/embedded-v0.2.1) e instale com *Sketch → Incluir biblioteca → Adicionar biblioteca .ZIP*. A indexação no Gerenciador de bibliotecas do Arduino ainda está em andamento; até lá, use o ZIP ou o código-fonte. Em outras plataformas C++11, compile a pasta `src` inteira.

O [PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace) já inclui `cxlab/BoopFace`; adicione ao seu ambiente em `platformio.ini`:

```ini
lib_deps = cxlab/BoopFace@^0.2.1
```

A biblioteca traz dois exemplos para o Arduino IDE, em *Arquivo → Exemplos → BoopFace Embedded*: **SerialEyes** desenha os olhos com caracteres no monitor serial e não precisa de tela; **OledSSD1306** roda num OLED I²C de 0,96″ 128×64 (instale antes a biblioteca Adafruit SSD1306). Nos dois, digita-se o nome da ação no monitor serial. O CI os compila para ESP32 e RP2040.

O núcleo de desenho não precisa das bibliotecas da Adafruit; só os drivers de tela do exemplo as usam.

O seu programa fornece um tempo em milissegundos que sempre avança, chama `eyes.update(nowMs)` e entrega o novo bitmap ao driver da tela. O estouro do contador de 32 bits é suportado; não misture relógios nem use a mesma instância a partir de várias tarefas sem proteção.

A tela dos olhos de 240×160 ocupa 4.800 bytes, e o exemplo TFT precisa de mais 480 bytes para a linha de conversão de cor; a de 128×64 ocupa 1.024 bytes, e o driver OLED tem ainda o seu próprio buffer. Esses números não incluem o sistema, os drivers nem outras instâncias. As tabelas de geometria somente leitura das ações originais ocupam cerca de 80 KB de flash, sem memória dinâmica. O exemplo limita a 25 FPS; a taxa real precisa ser medida.

A saída é um bitmap de 1 bit por linhas, com o bit mais significativo primeiro em cada byte, e cada linha arredondada para bytes inteiros. Não é o formato nativo em páginas do SSD1306; o exemplo converte com o `drawBitmap()` do driver. A cor é definida pelo programa hospedeiro, então serve para OLEDs monocromáticos e para trocar a cor dos olhos em telas coloridas.

**Um mesmo produto em várias plataformas: as expressões pertencem ao projeto, e o ESP32 é só uma das portas de entrada.**
