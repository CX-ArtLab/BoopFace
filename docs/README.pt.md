# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: um componente de avatar robô leve e expressivo para bots de IA, agentes e apps interativos">
</p>

**Site oficial: [boopface.com](https://boopface.com/)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace é um componente de avatar robô leve e expressivo para bots de IA, agentes e apps interativos. Pensando, esperando, concluído ou com erro: cada estado de um agente pode ser mostrado com uma expressão.

Use-o como rosto e feedback de status de assistentes e agentes de IA: assistentes de chat como ChatGPT, Claude, Gemini, Grok e DeepSeek, agentes de programação como Codex, Claude Code, Cursor, Gemini CLI e OpenCode, e agentes sempre ativos como Grok Bot, ChatGPT dots, Meta Muse, OpenClaw e Hermes Agent.

Também serve para companheiros de desktop, pets virtuais, mascotes digitais, avatares de chatbot e outros personagens interativos, ou como camada de feedback visual para interfaces de agentes no estilo AG-UI.

Feito com SVG e JavaScript puro, é um Web Component nativo sem dependências em tempo de execução, com licença MIT. Aparece plano ou como uma [cabeça 3D](#cabeça-3d--novo-na-09) que gira de verdade; 188 [skins](#skins--novidade-na-07) prontas para usar a qualquer momento.

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Demonstração animada interativa do BoopFace" width="560">
</p>

## Novo: [BoopFace Embedded](#boopface-embedded)

<p align="center">
  <a href="#boopface-embedded"><img src="../assets/readme/boopface-embedded.jpg" alt="As mesmas expressões nas telas ESP32, STM32 e Raspberry Pi Pico, ou em outros programas C++. Inclui exemplos de firmware para 28 configurações e simulador com exportação de ajustes."></a>
</p>

As mesmas expressões nas telas ESP32, STM32 e Raspberry Pi Pico, ou em outros programas C++. Inclui exemplos de firmware para 28 configurações e simulador com exportação de ajustes.

## Demo ao vivo

A partir da 0.9, a demo, as skins e a conexão com IA são uma só página: o Studio. O palco alterna entre plano e 3D; ao lado você experimenta cada expressão e o kit de voz, troca skins e cores, ajusta o comportamento, conversa com um avatar conectado a uma IA e copia a qualquer momento o código do que está vendo.

[Abrir o Studio](https://cx-artlab.github.io/BoopFace/?lang=pt) · [Escolher uma skin](https://cx-artlab.github.io/BoopFace/?lang=pt#skins) · [Experimentar a conexão com IA](https://cx-artlab.github.io/BoopFace/?lang=pt#agent)

[Abrir o simulador embarcado](https://cx-artlab.github.io/BoopFace/hardware/?lang=pt)

## Destaques

- Web Component nativo
- Renderização SVG + JavaScript nativo
- Zero dependências em tempo de execução
- Plano ou 3D; a cabeça 3D gira de verdade para o ponteiro
- Piscar automático e comportamento idle sutil
- Olhos que seguem o ponteiro e cabeça com inércia; cada expressão move a cabeça inteira
- Acaricie a testa e o avatar fecha os olhos e se aconchega
- Deformação local tipo gelatina ao arrastar, com recuperação elástica
- Compressão ao manter pressionado e antena elástica arrastável
- Estados e expressões do Agent controláveis por código
- Mais de 30 expressões: waiting, success, failure, affirm, wary, inspect, angry, refuse, love e, novas na 0.9, reverência, observar, pensar, piscadela, convencido, tontura, pulo e mais
- Olhos arredondados de qualquer cor, ou transparentes para mostrar o fundo
- Suporte a movimento reduzido
- Comportamento de sono configurável
- Arredondamento da cabeça ajustável
- 188 skins numerados em 17 séries, com luz que segue o ponteiro
- Versão leve sem skins para as páginas mais enxutas
- `connectAgent()`: eventos de um stream de IA controlam as expressões (AG-UI, OpenAI, Anthropic, Vercel AI SDK)
- Kit de expressões de voz: um conjunto de expressões de ouvir, pensar e falar que seguem o volume real
- Declarações TypeScript incluídas

## Instalação

```bash
npm install boopface
```

```js
import 'boopface';
```

Ou baixe `boopface-x.y.z.zip` da [versão mais recente](https://github.com/CX-ArtLab/boopface/releases/latest). Ele contém só o componente, com as skins. Descompacte-o ao lado da sua página:

```html
<script type="module" src="./boopface/boopface.js"></script>
```

Depois, adicione o componente:

```html
<boop-face id="avatar"></boop-face>
```

Nenhum código de inicialização é necessário. O avatar entra automaticamente no estado idle padrão.

### Atualizando a partir do Agent Robot Avatar

Antes da versão 0.8, o BoopFace se chamava Agent Robot Avatar. Os recursos e o uso não mudam. Para atualizar, basta trocar o nome do pacote para `boopface`:

```bash
npm uninstall agent-robot-avatar
npm install boopface
```

A tag antiga `<agent-robot-avatar>` continua funcionando até a 1.0, então não há pressa para mudar suas páginas. O pacote npm antigo `agent-robot-avatar` não recebe mais atualizações; as novas versões são publicadas apenas como `boopface`.

### Versão leve

Para páginas que nunca usam skins, `boopface/lite` é o mesmo avatar sem o código dos skins:

```js
import 'boopface/lite';
```

A versão leve ignora o atributo `skin` e avisa no console que os skins precisam da versão completa.

Comparação de tamanho (transferência pela rede, com compressão gzip):

| Versão | Tamanho |
| --- | --- |
| Leve `boopface/lite` | cerca de 92 KB |
| Completa, a página não usa skins | cerca de 104 KB; o código que desenha as skins não é baixado |
| Completa, com skins | cerca de 161 KB; a parte extra só é baixada na primeira vez que uma skin é usada |

Ao mudar para 3D, qualquer das duas versões baixa cerca de 19 KB a mais para a renderização 3D.

## Uso básico

```js
const avatar = document.querySelector('#avatar');

avatar.play('success');
avatar.play('wary');
avatar.play('refuse');

avatar.reset();
```

Ações disponíveis:

| Ação | Aparência | Quando usar |
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

As ações de espera tocam uma rodada com `play()`. `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })` repete até outra ação começar ou `stopWaiting()` ser chamado.

Os nomes da 0.5 (`send`, `warning`, `error`, `blocked`, `slot` e outros) continuam funcionando até a 1.0, com um aviso no console; consulte a [tabela de atualização](../CHANGELOG.md#upgrading-from-05x).

Um fluxo típico de solicitação de Agent:

```js
avatar.startWaiting();

// Segunda espera: os olhos saem por um lado e voltam pelo outro.
avatar.startWaiting({ variant: 'wrap' });

// Terceiro movimento de espera: ondas verticais escalonadas dos olhos.
avatar.startWaiting({ variant: 'wave' });

try {
  const result = await runAgentRequest();
  await avatar.play(result.ok ? 'success' : 'failure');
} catch (error) {
  await avatar.play('failure');
}
```

## Opções comuns

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
| `size` | Tamanho do avatar em pixels |
| `view` | `2d` (padrão, plano) ou `3d` |
| `color` | Cor principal do avatar |
| `eye-color` | Cor dos olhos; `transparent` deixa o fundo aparecer pelos olhos |
| `eye-style` | Olhos arredondados por padrão; `sharp` traz de volta os cortes retos |
| `auto-sleep` | Tempo de inatividade antes do sono automático; `0` desativa |
| `wake-on` | Política de despertar automático: `activity`, `interaction` ou `manual` |
| `motion` | Política de movimento: `auto`, `reduce` ou `full` |
| `press-squeeze` | Pressione o centro para comprimir; `false` desativa |
| `antenna` | `false` oculta a bolinha da antena |
| `antenna-drag` | Puxar a antena, retorno elástico e reação de tontura; `false` desativa |
| `idle-gaze` | Ocioso, os olhos olham em volta de vez em quando; `false` os mantém olhando para frente |
| `skin` | Número do skin, por exemplo `301`; omita para a cor lisa |

Controles comuns em tempo de execução:

```js
avatar.setPointerFollow(false);
avatar.setIdleGaze(false);
avatar.setHeadRoundness(75);
avatar.setPressSqueeze(true);
avatar.setAntennaDrag(true);
avatar.setView('3d');
avatar.setEyeColor('#2bd67b');
avatar.setPetting(false); // desativar o carinho
```

O centro do avatar inicia o amassar. Se o ponteiro se mover mais de 4 pixels CSS, o mesmo gesto passa para o arrastar da cabeça já existente. Puxar a antena usa o mesmo limite do arrastar da cabeça e termina com a expressão de tontura.

## Cabeça 3D · Novo na 0.9

```html
<boop-face view="3d"></boop-face>
```

`view="3d"` (ou `avatar.setView('3d')`) transforma o avatar numa cabeça com volume: ela gira de verdade para o ponteiro, o rosto é curvo e, após cada giro, dá um pequeno quique antes de parar. Todas as expressões, gestos, skins e cores funcionam em 3D; `view="2d"` volta ao plano. O código 3D só é baixado na primeira vez que uma página muda para 3D, então páginas só planas nunca o carregam.

**Cada expressão move a cabeça.** A cabeça gira para onde os olhos olham, acena, se inclina e pula; em 3D gira de verdade, no plano o giro é desenhado. Com `motion="reduce"` fica parada.

**Olhos arredondados.** Onde a pálpebra corta o olho, o canto agora é arredondado, e fendas finas (dormir, apertar os olhos, piscar, o cursor de digitação) têm pontas redondas. Para os cortes retos antigos, use `eye-style="sharp"`.

**Cor dos olhos.** `eye-color="#2bd67b"` (ou `setEyeColor()`) colore os olhos, no avatar liso e nas 131 skins de olhos lisos. As outras 57 skins têm olhos com textura própria (em relevo, vítreos ou estampados) e os mantêm; `SKINS[número].eyeColor` diz quais podem mudar. `eye-color="transparent"` recorta os olhos da cabeça para mostrar o que está atrás do avatar; funciona em todas as skins, inclusive com olhos texturizados.

**Carinho.** Acaricie a testa algumas vezes e o avatar fecha os olhos e se aconchega. Ativado por padrão; `setPetting(false)` desativa.

## Skins · Novidade na 0.7

188 skins em 17 séries, com uma luz que segue o ponteiro. Cada skin tem um número permanente: o número da série seguido de dois dígitos, então 305 é o quinto skin da série 3. Os nomes podem mudar; os números nunca mudam nem são reutilizados.

Todas as skins continuam sendo SVG puro: sem imagens, canvas nem WebGL. Todas as skins juntas somam cerca de 70 KB pela rede (cerca de 290 KB sem compressão), e a maior parte só é carregada quando uma página usa uma skin. Para comparar, o avatar em si (a versão lite, sem skins) tem cerca de 92 KB.

<img src="../assets/readme/skin-gallery.jpg" alt="Galeria de skins: destaques, filtros e busca" width="100%">

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);  // ou '102'
avatar.setSkin(null); // volta à cor lisa
```

Todas as skins com seus números estão na [aba de skins do Studio](https://cx-artlab.github.io/BoopFace/?lang=pt#skins).

| Série | Números | Série | Números | Série | Números |
| --- | --- | --- | --- | --- | --- |
| Esmalte | 101–106 | Vidro gelo | 201–206 | Goma | 301–312 |
| Vidro bala | 401–406 | Acrílico | 501–512 | Gelatina | 601–612 |
| Degradê | 701–712 | Vidro fosco | 801–806 | Metal | 901–930 |
| Gemas e cerâmica | 1001–1012 | Madeira | 1101–1106 | Bolas | 1201–1210 |
| Transparente e brilho | 1301–1305 | Tecido e couro | 1401–1412 | Doces e frutas | 1501–1512 |
| Natureza | 1601–1612 | Padrões e tecnologia | 1701–1717 |  |  |

O código que desenha os skins é baixado na primeira vez que um skin é usado, então uma página sem skins nunca o carrega. `await loadSkins()` o carrega antecipadamente. `SKINS` traz os nomes em chinês e inglês e as cores de cada skin, `SKIN_SERIES` as séries e `SKIN_NAMES` todos os números.

Todas as expressões e gestos funcionam com um skin. Ao remover o skin, o atributo `color` volta a valer.

## Conectar um stream de IA · Novidade na 0.9

Com `connectAgent()`, um stream de IA controla o avatar diretamente. Passe os eventos que o seu SDK de IA já entrega e o avatar mostra sozinho quando está pensando, usando uma ferramenta, respondendo, terminou, falhou ou recusou.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);

for await (const event of agent.track(stream)) {
  // mostre a resposta como de costume
}
```

`track()` repassa cada item sem alterações. Um stream que termina normalmente conta como concluído, um erro lançado como falha e um cancelamento ou `break` antecipado como cancelado. Você também pode passar os itens um a um com `agent.handle(event)`, ou um nome de estado como `agent.handle('thinking')`.

Entende eventos AG-UI, streams do OpenAI Responses, Realtime e Chat Completions, streams do Anthropic Messages, partes de stream do Vercel AI SDK e o status do `useChat` (`submitted`, `streaming`, `ready`, `error`). O resto é ignorado.

| Estado | Expressão padrão | Quando |
| --- | --- | --- |
| `listening` | `listening`, em loop | Voz: o usuário está falando |
| `thinking` | `waiting-spin`, em loop | Pedido enviado, o modelo está pensando |
| `tool` | `waiting-wave`, em loop | Uma ferramenta está em execução |
| `replying` | `idle` | O texto da resposta está chegando |
| `speaking` | `speaking`, em loop | Voz: a resposta da IA está tocando |
| `approval` | `wary` | O agente precisa da confirmação do usuário |
| `done` | `success` | Concluído |
| `error` | `failure` | Falhou |
| `refused` | `refuse` | O modelo recusou |
| `cancelled` | `idle` | Parado pelo usuário |
| `typing` | `input` | O usuário está digitando, definido com `handle('typing')` |
| `idle` | `idle` | Nada em andamento |

Qualquer estado pode ser trocado por um nome de ação, uma função ou `null` para não mostrar nada:

```js
connectAgent(avatar, {
  actions: { replying: 'input', tool: 'inspect' },
  onChange: (state, previous) => console.log(previous, '→', state),
});
```

No [Studio](https://cx-artlab.github.io/BoopFace/?lang=pt#agent) você conversa com um avatar conectado a uma IA; em Código › Conectar IA escolhe a expressão de cada estado e vê o código de cada formato.

## Kit de expressões de voz · Novidade na 0.9

Ouvir, pensar, falar: todo assistente de voz passa por esses três passos a cada turno. O kit de expressões de voz dá ao avatar um conjunto de três expressões que se encadeiam. Ele serve para qualquer produto com que se fala, com qualquer serviço de voz: chame você mesmo os três métodos ou deixe o `connectAgent()` seguir a sua API de voz.

```js
avatar.startListening();                   // o usuário está falando
avatar.startWaiting({ variant: 'bloom' }); // a IA está pensando
avatar.startSpeaking();                    // a IA está respondendo
avatar.setVoiceLevel(0.6);                 // opcional: volume de 0 a 1
```

Ao ouvir, os dois olhos se fundem em um único olho redondo que cresce com a voz do usuário. Ao pensar, ele vira uma flor de dois ovais cruzados que respira e gira devagar. Ao falar, volta a se dividir em dois olhos, que se acomodam e depois se esticam com a resposta: sons graves no olho esquerdo, agudos no direito. `setVoiceLevel(level)` ou `setVoiceLevel([low, high])` informa o volume; sem ele, falar mantém um ritmo próprio e ouvir fica parado. Cada passo se repete até o próximo, e na troca os olhos se transformam em vez de pular.

Pensar é uma etapa de espera. Flor (`variant: 'bloom'`) e Cruz (`variant: 'cross'`) saem direto do olho de escuta; qualquer outro estilo de espera também funciona.

`connectAgent()` também pode trocá-las sozinho. Ele já entende os eventos das APIs de voz mais comuns, como o OpenAI Realtime e o `mode` informado por SDKs como o ElevenLabs. Enquanto pensa, espera com o estilo Florescer (ou com o de `actions.thinking`) e volta a ouvir depois de cada resposta. Por exemplo, com o OpenAI Realtime:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

`connectAudio()` aceita MediaStreams ou elementos `<audio>` e passa o volume deles para os olhos. Com a resposta conectada, o avatar também percebe quando ela terminou de tocar.

## React e Vue

`<boop-face>` é um Web Component padrão, então funciona em qualquer framework.

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

No Next.js, marque o arquivo com `'use client'`.

**Vue 3**

Informe ao Vue que `boop-face` é um elemento personalizado, no `vite.config.js`:

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

Páginas que rodam sem build: [`examples/react.html`](../examples/react.html) e [`examples/vue.html`](../examples/vue.html).

## Eventos e integração

O componente emite `face-state` para mudanças de estado visual e `action-state` para mudanças semânticas no ciclo de vida das ações.

Para integrações com a aplicação host e textos de status acessíveis, prefira `action-state`. Veja [`examples/accessibility.html`](../examples/accessibility.html) para um exemplo executável do ciclo de vida de uma solicitação.

Um exemplo mínimo de integração está disponível em [`examples/basic.html`](../examples/basic.html).

## Compatibilidade

Projetado para navegadores modernos com suporte a ES Modules, Custom Elements, SVG, Pointer Events, Web Animations API, `IntersectionObserver`, `ResizeObserver` e `matchMedia`.

Os testes automatizados cobrem Chromium, Firefox e WebKit.

<a id="boopface-embedded"></a>

## Novo: BoopFace Embedded

As expressões dos olhos da versão web agora funcionam em telas de robôs e placas. O pequeno motor C++11 preserva movimentos e ritmo. Os exemplos cobrem 28 configurações ESP32, ESP32-S3, STM32 e Raspberry Pi Pico: TFT redondas e retangulares, telas alongadas, AMOLED e OLED monocromáticas. Também aceita tamanhos personalizados. A versão 0.2 acompanha a Web 0.9: os mesmos olhos arredondados, 13 expressões novas como reverência, observar, pensar, piscadela, convencido, tontura e pulo, e ouvir e falar do kit de voz, 33 no total.

| Seu dispositivo | Qual usar |
| --- | --- |
| Sites, apps, tablets Android e robôs com navegador | Componente web: avatar completo, skins e interação |
| ESP32, STM32 e Raspberry Pi Pico | Motor embarcado com exemplos de firmware |
| Outros microcontroladores ou programas C++ | Biblioteca C++; forneça o driver da tela |


<img src="../assets/readme/hardware-preview.jpg" alt="Simulador: expressões numa TFT redonda, disposição, cores e exportação" width="100%">

**Experimente sem placa.** O [simulador](https://cx-artlab.github.io/BoopFace/hardware/?lang=pt) executa o mesmo motor C++ no navegador com 32 telas simuladas. Ajuda a prever o resultado e comparar módulos.

**Ajuste, exporte e compile.** Escolha a tela, disposição, cores e taxa de quadros. Clique em **Exportar ajustes**, salve `eyes_settings.h` ao lado do `main.cpp` do exemplo e compile. Veja os [passos](../embedded/README.md). A interface e os comentários exportados seguem o idioma escolhido.

**Instalar por ZIP.** Baixe `BoopFace-Embedded-0.2.0.zip` na [versão embarcada](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0) e use **Sketch → Incluir Biblioteca → Adicionar Biblioteca .ZIP** no Arduino IDE. A indexação no Arduino Library Manager está pendente; enquanto isso, use ZIP ou código-fonte. Para [PlatformIO](https://registry.platformio.org/libraries/cxlab/BoopFace), adicione esta dependência ao ambiente em `platformio.ini`:

```ini
lib_deps = cxlab/BoopFace@^0.2.0
```

**No seu programa**, reproduza expressões pelo nome:

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

Experimental: o CI compila todas as configurações, mas nenhuma foi verificada em hardware real. Se testar, envie um [relatório](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml). Veja a [documentação](../embedded/README.md) para API e conexões.

## Contribuindo

Issues e Pull Requests são bem-vindos. Consulte [`CONTRIBUTING.md`](../CONTRIBUTING.md) antes de enviar alterações.

## Status do projeto

**Versão pública atual: v0.9.0**\
BoopFace Embedded: v0.2.0 (experimental)

A API pública é mantida deliberadamente compacta enquanto o projeto evolui em direção a um futuro compromisso de estabilidade `1.0.0`.

BoopFace é desenvolvido de forma independente e não é afiliado, endossado nem representa qualquer plataforma ou marca de IA.

## Design do personagem e identidade visual

O personagem BoopFace, incluindo sua aparência robótica e identidade visual, é um design original da CX ArtLab.

A licença MIT se aplica ao software e ao código-fonte. Ela permite usar, modificar e distribuir o avatar como parte de aplicações, mas não transfere a propriedade do nome BoopFace, da identidade do personagem ou de sua identidade visual, nem concede o direito de apresentá-los como personagem original ou marca independente de outra parte.

Os nomes de produtos de terceiros mencionados neste projeto servem apenas para descrever possíveis casos de uso e não indicam afiliação ou endosso.

## Licença

MIT License. Consulte [`LICENSE`](../LICENSE).

---

Se este projeto for útil para você, você pode me pagar um café.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
