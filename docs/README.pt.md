# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: um componente de avatar robô leve e expressivo para bots de IA, agentes e apps interativos">
</p>

**Site oficial: [boopface.com](https://boopface.com/)** · **Demo online: [BoopFace Studio](https://boopface.com/demo/?lang=pt)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace é um componente de avatar robô leve e expressivo para bots de IA, agentes e apps interativos. Pensando, esperando, concluído, erro: cada estado de um agente pode ser mostrado com uma expressão.

Serve como rosto e retorno de estado de assistentes e agentes de IA: assistentes de chat como ChatGPT, Claude e Gemini, agentes de programação como Codex, Claude Code e Cursor, e todo tipo de agente pessoal. Também combina com companheiros de desktop, pets virtuais, mascotes digitais e avatares de chatbot.

Um Web Component nativo feito com SVG e JavaScript puro, sem dependências em tempo de execução, licença MIT. Pode aparecer plano ou virar uma cabeça 3D que gira de verdade; 188 skins estão prontas para usar.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#início-rápido">Início rápido</a> · <a href="#expressões">Expressões</a> · <a href="#configurações">Configurações</a> · <a href="#cabeça-3d-e-olhos">Cabeça 3D e olhos</a> · <a href="#skins">Skins</a> · <a href="#conectar-ia">Conectar IA</a> · <a href="#conversas-por-voz">Conversas por voz</a> · <a href="#react-e-vue">React e Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Experimente online

<h3 align="center">Site oficial</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Demo online do BoopFace Studio</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=pt"><b>Abrir o Studio</b></a> · <a href="https://boopface.com/demo/?lang=pt#skins">Escolher uma skin</a> · <a href="https://boopface.com/demo/?lang=pt#agent">Experimentar Conectar IA</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Demo de interação do BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Simulador do BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=pt"><b>Abrir o simulador embarcado</b></a> (32 telas de placas predefinidas)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Novidades da 0.9

- O BoopFace ganha profundidade. [Detalhes](#cabeça-3d-e-olhos)
- 15 novas expressões e o kit de conversa por voz. [Detalhes](#expressões)
- Nova reação ao carinho: mexa o ponteiro sobre a testa. [Detalhes](#cabeça-3d-e-olhos)
- Conexão com IA atualizada. [Detalhes](#conectar-ia)
- A demo online foi refeita do zero: [BoopFace Studio](https://boopface.com/demo/?lang=pt)
- Embedded 0.2: as novas expressões chegam às placas também. [Detalhes](#boopface-embedded)

Todos os detalhes no [CHANGELOG](../CHANGELOG.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Recursos do BoopFace

- Web Component nativo, renderização SVG + JavaScript puro, sem dependências em tempo de execução, funciona com qualquer framework
- Um componente de avatar que expressa emoções, com uma expressão para cada tipo de estado
- Mais de 30 expressões que o fazem parecer vivo
- Interativo: os olhos seguem o ponteiro; arrastar, apertar, pressionar, puxar a antena e fazer carinho têm reação
- Plano ou 3D para usos diferentes, com 188 skins para trocar quando quiser
- Eventos dos streams de IA movem as expressões diretamente (AG-UI, OpenAI, Anthropic, Vercel AI SDK), com conversas por voz
- Leve: a versão lite tem cerca de 92 KB
- BoopFace Embedded: as mesmas expressões rodam em telas de placas (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Início rápido

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

Não precisa de código de inicialização: o avatar pisca e espera sozinho. `view="3d"` é a cabeça 3D do site oficial; sem ele, é o avatar plano (o padrão, e mais leve).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Sem npm: baixe `boopface-x.y.z.zip` da [versão mais recente](https://github.com/CX-ArtLab/boopface/releases/latest), descompacte ao lado da sua página e carregue com `<script type="module" src="./boopface/boopface.js"></script>`.

**Tamanho** (tamanho de transferência, gzip)

| Versão | Tamanho |
| --- | --- |
| Lite `import 'boopface/lite'`, sem skins | cerca de 92 KB |
| Completa, a página não usa skins | cerca de 104 KB |
| Completa, com skins | cerca de 161 KB (o código das skins carrega na primeira vez que uma é usada) |

Mudar para 3D baixa cerca de 19 KB a mais.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Expressões

```js
avatar.play('success');   // tocar uma vez
avatar.startWaiting();    // esperar até stopWaiting() ou outra expressão
avatar.reset();           // voltar ao repouso
```

| Ação | Aparência | Bom para |
| --- | --- | --- |
| `idle` | Pisca e olha ao redor | Estado padrão |
| `bored` | Olha devagar para um lado e para o outro | Nada aconteceu por um tempo |
| `waiting-spin` | Os olhos giram de um lado para o outro | Aguardando resposta (padrão) |
| `waiting-wrap` | Os olhos saem por um lado e voltam pelo outro | Aguardando resposta |
| `waiting-wave` | Os olhos sobem e descem alternadamente | Aguardando resposta |
| `waiting-bloom` | Dois ovais cruzados respiram e giram como uma flor | Aguardando resposta; feita para conversas por voz |
| `waiting-cross` | Dois ovais cruzados repousam sobre o ×, giram um quarto por vez e alternam entre fino e cheio | Esperando uma resposta; também serve para voz |
| `shape-wait` | Os olhos se fundem numa forma que muda entre círculo e quadrado arredondado | Esperando uma resposta |
| `input` | Os olhos viram cursores piscantes | O usuário está digitando |
| `listening` | Os dois olhos se fundem em um olho redondo que cresce com a voz | Voz: o usuário está falando |
| `speaking` | Os olhos se separam de novo e se esticam com a resposta | Voz: a IA está respondendo |
| `affirm` | Acena com a cabeça | Entendido, confirmado |
| `success` | Olhos felizes e sorridentes | Tarefa concluída |
| `failure` | Abaixa a cabeça e os olhos | Falha de tarefa ou conexão |
| `wary` | Vira a cabeça e olha de cima a baixo com desconfiança | A ação precisa de confirmação |
| `inspect` | Aperta os olhos e examina de cima a baixo | Revisar ou verificar algo |
| `observe` | Arregala os olhos, se aproxima e olha em volta | Olhar com atenção, ler algo |
| `think` | Olha para cima e vira devagar para o outro lado | Pensar antes de responder |
| `ponder` | Olha para baixo, para os lados e depois levanta a cabeça | Pesar algo com cuidado |
| `bow` | Um aceno profundo, uma pausa e volta a subir | Agradecimento, desculpa, saudação |
| `angry` | Olhos baixos e fulminantes | Conteúdo bloqueado |
| `refuse` | Balança a cabeça | Não pode ou não vai atender ao pedido |
| `shake` | Os olhos se viram primeiro e a cabeça acompanha | Discordar, não querer olhar |
| `surprise` | Olhos arregalados | Algo inesperado |
| `love` | Os olhos se unem em um coração que bate | Agradecimento, carinho |
| `wink` | Inclina a cabeça e pisca um olho | Cumprimentar, brincar |
| `smug` | Aperta os olhos, olha para cima e para os lados | Convencido, brincalhão |
| `bounce` | Quica como uma bola | Alegria, comemoração |
| `smug-bounce` | Dois pulinhos sorridentes, inclinando para a esquerda e a direita | Um pouco de orgulho |
| `dizzy` | Os olhos giram em sentidos opostos, um grande e outro pequeno | Tonto, informação demais |
| `random` | Os olhos giram como rolos de caça-níqueis | Escolha aleatória, momento divertido |
| `sleep` | Fecha os olhos e dorme | Muito tempo sem atividade |
| `wake` | Abre os olhos e acorda | A atividade volta |

Estilos de espera: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. Os nomes de ação antigos da 0.5 funcionam até a 1.0; veja a [tabela de atualização](../CHANGELOG.md#upgrading-from-05x).

Uma requisição típica:

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

## Configurações

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Atributo | Para que serve | Método em tempo de execução |
| --- | --- | --- |
| `size` | Tamanho do avatar em pixels |  |
| `view` | `2d` (padrão, plano) ou `3d` | `setView()` |
| `color` | Cor principal do avatar |  |
| `eye-color` | Cor dos olhos; `transparent` deixa o fundo aparecer pelos olhos | `setEyeColor()` |
| `eye-style` | Olhos arredondados por padrão; `sharp` traz de volta os cortes retos |  |
| `skin` | Número do skin, por exemplo `301`; omita para a cor lisa | `setSkin()` |
| `auto-sleep` | Tempo de inatividade antes do sono automático; `0` desativa |  |
| `wake-on` | Política de despertar automático: `activity`, `interaction` ou `manual` |  |
| `motion` | Política de movimento: `auto`, `reduce` ou `full` |  |
| `idle-gaze` | Ocioso, os olhos olham em volta de vez em quando; `false` os mantém olhando para frente | `setIdleGaze()` |
| `petting` | Passe o ponteiro algumas vezes sobre a testa e o avatar fecha os olhos e se aconchega; `false` desativa | `setPetting()` |
| `press-squeeze` | Pressione o centro para comprimir; `false` desativa | `setPressSqueeze()` |
| `antenna` | `false` oculta a bolinha da antena |  |
| `antenna-drag` | Puxar a antena, retorno elástico e reação de tontura; `false` desativa | `setAntennaDrag()` |

Outros métodos: `setPointerFollow(false)` deixa de seguir o ponteiro, `setHeadRoundness(75)` ajusta o arredondamento da cabeça.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Cabeça 3D e olhos

- **3D**: `view="3d"` dá espessura à cabeça e um rosto curvo; ela gira de verdade em direção ao ponteiro e para com um pequeno quique. Todas as expressões, skins e cores funcionam normalmente. O código 3D carrega na primeira vez que o 3D é ativado.
- **As expressões movem a cabeça**: a cabeça gira com os olhos, acena e pula. Com `motion="reduce"` ela fica parada.
- **Olhos arredondados**: fendas como ao apertar os olhos ou piscar têm pontas redondas; `eye-style="sharp"` volta aos cortes retos.
- **Cor dos olhos**: `eye-color` funciona no avatar liso e em 131 skins; as outras 57 mantêm seus olhos com textura (veja `SKINS[id].eyeColor`). `transparent` funciona em todas as skins.
- **Interação**: os olhos seguem o ponteiro; arrastar a cabeça a faz balançar como gelatina; pressionar o centro a aperta; a antena pode ser puxada e volta como mola; mexa o ponteiro sobre a testa e ele fecha os olhos e se aconchega.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Skins

188 skins em 17 séries, iluminadas pelo ponteiro, tudo em SVG puro. Os números nunca mudam: primeiro o número da série, depois dois dígitos para a skin (305 = série 3, skin 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // voltar a uma cor lisa
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Skins do BoopFace: destaques, filtros por série e busca" width="100%">

| Série | Números | Série | Números | Série | Números |
| --- | --- | --- | --- | --- | --- |
| Esmalte | 101–106 | Vidro gelo | 201–206 | Goma | 301–312 |
| Vidro bala | 401–406 | Acrílico | 501–512 | Gelatina | 601–612 |
| Degradê | 701–712 | Vidro fosco | 801–806 | Metal | 901–930 |
| Gemas e cerâmica | 1001–1012 | Madeira | 1101–1106 | Bolas | 1201–1210 |
| Transparente e brilho | 1301–1305 | Tecido e couro | 1401–1412 | Doces e frutas | 1501–1512 |
| Natureza | 1601–1612 | Padrões e tecnologia | 1701–1717 |  |  |

Veja todas na [página de skins do Studio](https://boopface.com/demo/?lang=pt#skins). `await loadSkins()` carrega antes; `SKINS`, `SKIN_SERIES` e `SKIN_NAMES` trazem nomes, séries e números.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Conectar IA

Passe para `connectAgent()` o stream que o seu SDK de IA fornece, e o avatar mostra sozinho quando pensa, chama ferramentas, responde, conclui ou dá erro.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // mostre a resposta como de costume
}
```

Suporta AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, Vercel AI SDK e o status de `useChat`. Também dá para passar itens um a um com `agent.handle(event)`, ou um estado como `agent.handle('thinking')`.

| Estado | Expressão padrão | Estado | Expressão padrão |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Usar outras expressões:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

Converse com um avatar conectado a uma IA no [Studio](https://boopface.com/demo/?lang=pt#agent) e veja como conectar cada formato.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Conversas por voz

Cada turno de um assistente de voz é ouvir, pensar, falar. O BoopFace tem um conjunto de expressões combinando, que passam de uma para outra com naturalidade:

```js
avatar.startListening();                   // o usuário está falando
avatar.startWaiting({ variant: 'bloom' }); // a IA está pensando
avatar.startSpeaking();                    // a IA está respondendo
avatar.setVoiceLevel(0.6);                 // opcional: volume 0–1
```

Com `connectAgent()` a troca é automática (OpenAI Realtime, ElevenLabs e outros). Quando `connectAudio()` recebe o microfone e o áudio da resposta, os olhos acompanham o volume real:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React e Vue

Um Web Component padrão, usado como está em qualquer framework.

```jsx
// React 19 (no Next.js, adicione 'use client')
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

O Vue 3 precisa declarar o elemento personalizado no `vite.config.js`:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Exemplos que rodam ao abrir, sem build: [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). O componente emite os eventos `face-state` (o que está na tela) e `action-state` (início e fim das ações); [`accessibility.html`](../examples/accessibility.html) mostra avisos para leitores de tela. Inclui tipos TypeScript.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: as mesmas expressões dos olhos em telas de placas ESP32, STM32 e Raspberry Pi Pico">
</p>

As mesmas expressões dos olhos em telas de robôs e placas. Um pequeno motor C++11 com 33 expressões; os exemplos de firmware cobrem 28 combinações de placa e tela com ESP32, ESP32-S3, STM32 e Raspberry Pi Pico (TFT redondas e quadradas, telas em barra, AMOLED, OLED monocromático).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: olhos na tela de uma placa, botões de expressões e a lista de telas" width="100%">

1. **Prévia**: o [simulador online](https://boopface.com/hardware/?lang=pt) roda o mesmo motor e simula 32 telas, então dá para ver sem placa.
2. **Exportar**: ajuste o layout, as cores e a taxa de quadros, clique em Exportar configurações e coloque `eyes_settings.h` ao lado do `main.cpp` do firmware de exemplo para compilar. [Passos](../embedded/README.pt.md#ajuste-no-simulador-e-leve-para-a-placa)
3. **Instalar**: no Arduino IDE, adicione `BoopFace-Embedded-0.2.0.zip` da [página da versão](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0); no PlatformIO, use `lib_deps = cxlab/BoopFace@^0.2.0`.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, pixels de 1 bit

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* envie eyes.data() para a tela */ } }
// eyes.play("success", millis());
```

Experimental: todas as configurações compilam no CI, mas nem todas foram verificadas em hardware real. [Relatos de hardware](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) são bem-vindos. Guia completo: [documentação do Embedded](../embedded/README.pt.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Mais

- **Atualizando do Agent Robot Avatar**: renomeado na 0.8, uso igual. Rode `npm uninstall agent-robot-avatar && npm install boopface`; a tag antiga `<agent-robot-avatar>` funciona até a 1.0.
- **Compatibilidade**: navegadores modernos com ES Modules, Custom Elements e Web Animations; os testes automáticos cobrem Chromium, Firefox e WebKit.
- **Versão**: **Web v0.9.0**, Embedded v0.2.0 (experimental). Até a 1.0 a API muda com cuidado.
- **Vitrine**: [projetos da comunidade](../SHOWCASE.md), [envie o seu](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Contribuir**: issues e pull requests são bem-vindos; leia antes o [`CONTRIBUTING.md`](../CONTRIBUTING.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Licença e personagem

O código está sob a [licença MIT](../LICENSE): use, modifique e compartilhe nos seus apps. O personagem BoopFace, sua aparência, nome e identidade visual são criações originais da CX ArtLab; a licença MIT não os transfere nem permite apresentá-los como personagem ou marca original de outra parte.

O BoopFace é um projeto open source independente, sem vínculo nem endosso de nenhuma plataforma ou marca de IA; nomes de produtos são citados apenas para descrever casos de uso.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Me pague um café

Se este projeto for útil para você, você pode me pagar um café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
