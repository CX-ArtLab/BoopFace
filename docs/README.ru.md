# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: лёгкий и выразительный компонент аватара-робота для ИИ-ботов, агентов и интерактивных приложений">
</p>

**Официальный сайт: [boopface.com](https://boopface.com/)** · **Онлайн-демо: [BoopFace Studio](https://boopface.com/demo/?lang=ru)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace — лёгкий и выразительный компонент аватара-робота для ИИ-ботов, агентов и интерактивных приложений. Думает, ждёт, готово, ошибка: любое состояние агента можно показать выражением лица.

Подходит как лицо и индикатор состояния ИИ-ассистентов и агентов: чат-ассистентов вроде ChatGPT, Claude и Gemini, агентов для программирования вроде Codex, Claude Code и Cursor и самых разных личных агентов. Также годится для настольных компаньонов, виртуальных питомцев, цифровых маскотов и аватаров чат-ботов.

Нативный Web Component на SVG и чистом JavaScript, без зависимостей во время выполнения, лицензия MIT. Можно показывать плоским или переключить на объёмную голову, которая действительно поворачивается; 188 скинов готовы к использованию.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#быстрый-старт">Быстрый старт</a> · <a href="#выражения">Выражения</a> · <a href="#настройки">Настройки</a> · <a href="#объёмная-голова-и-глаза">Объёмная голова и глаза</a> · <a href="#скины">Скины</a> · <a href="#подключение-ии">Подключение ИИ</a> · <a href="#голосовые-разговоры">Голосовые разговоры</a> · <a href="#react-и-vue">React и Vue</a> · <a href="#boopface-embedded">Embedded</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Попробовать онлайн

<h3 align="center">Официальный сайт</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Онлайн-демо BoopFace Studio</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=ru"><b>Открыть Studio</b></a> · <a href="https://boopface.com/demo/?lang=ru#skins">Выбрать скин</a> · <a href="https://boopface.com/demo/?lang=ru#agent">Попробовать подключение ИИ</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="Демо взаимодействия с BoopFace" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">Симулятор BoopFace Embedded</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=ru"><b>Открыть симулятор для плат</b></a> (32 готовых экрана плат)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Что нового в 0.9

- BoopFace стал объёмным. [Подробнее](#объёмная-голова-и-глаза)
- 15 новых выражений и набор для голосовых разговоров. [Подробнее](#выражения)
- Новая реакция на поглаживание: поводите указателем по лбу. [Подробнее](#объёмная-голова-и-глаза)
- Обновлено подключение ИИ. [Подробнее](#подключение-ии)
- Онлайн-демо переделано с нуля: [BoopFace Studio](https://boopface.com/demo/?lang=ru)
- Embedded 0.2: новые выражения появились и на платах. [Подробнее](#boopface-embedded)

Все подробности — в [CHANGELOG](../CHANGELOG.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Возможности BoopFace

- Нативный Web Component, рендеринг SVG + чистый JavaScript, без зависимостей во время выполнения, работает с любым фреймворком
- Компонент аватара, который выражает эмоции, с выражением для каждого состояния
- Более 30 выражений — как будто живой
- Интерактивный: глаза следят за указателем; на перетаскивание, сжатие, нажатие, оттягивание антенны и поглаживание есть реакция
- Плоский или объёмный стиль для разных задач, 188 скинов можно сменить в любой момент
- События из потоков ИИ напрямую управляют выражениями (AG-UI, OpenAI, Anthropic, Vercel AI SDK), включая голосовые разговоры
- Лёгкий: lite-сборка около 92 КБ
- BoopFace Embedded: те же выражения работают на экранах плат (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Быстрый старт

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

Код инициализации не нужен: аватар сам моргает и ждёт. `view="3d"` — объёмная голова с официального сайта; без него будет плоский аватар (по умолчанию, и он легче).

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

Без npm: скачайте `boopface-x.y.z.zip` из [последнего релиза](https://github.com/CX-ArtLab/boopface/releases/latest), распакуйте рядом со страницей и подключите через `<script type="module" src="./boopface/boopface.js"></script>`.

**Размер** (объём передачи, gzip)

| Сборка | Размер |
| --- | --- |
| Lite `import 'boopface/lite'`, без скинов | около 92 КБ |
| Полная, страница не использует скины | около 104 КБ |
| Полная, со скинами | около 161 КБ (код скинов загружается при первом использовании) |

При переходе на объёмный вид загружается ещё около 19 КБ.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Выражения

```js
avatar.play('success');   // проиграть один раз
avatar.startWaiting();    // ждать до stopWaiting() или другого выражения
avatar.reset();           // вернуться в покой
```

| Действие | Как выглядит | Когда использовать |
| --- | --- | --- |
| `idle` | Моргает и оглядывается | Состояние по умолчанию |
| `bored` | Медленно смотрит то в одну, то в другую сторону | Давно ничего не происходит |
| `waiting-spin` | Глаза кружат из стороны в сторону | Ожидание ответа (по умолчанию) |
| `waiting-wrap` | Глаза уходят в одну сторону и возвращаются с другой | Ожидание ответа |
| `waiting-wave` | Глаза поочерёдно покачиваются вверх и вниз | Ожидание ответа |
| `waiting-bloom` | Два скрещённых овала дышат и вращаются, как цветок | Ожидание ответа; создано для голосовых диалогов |
| `waiting-cross` | Два скрещённых овала стоят на «×», поворачиваются на четверть и меняются: тонкий и полный | Ожидание ответа; подходит и для голоса |
| `shape-wait` | Глаза сливаются в одну фигуру, которая меняется от круга к скруглённому квадрату | Ожидание ответа |
| `input` | Глаза становятся мигающими курсорами | Пользователь печатает |
| `listening` | Оба глаза сливаются в один круглый, который набухает от голоса | Голос: говорит пользователь |
| `speaking` | Глаза снова разделяются и вытягиваются в такт ответу | Голос: отвечает ИИ |
| `affirm` | Кивает | Понял, подтверждаю |
| `success` | Радостные улыбающиеся глаза | Задача выполнена |
| `failure` | Опускает голову и глаза | Сбой задачи или соединения |
| `wary` | Поворачивает голову и настороженно оглядывает сверху вниз | Действие требует подтверждения |
| `inspect` | Щурится и осматривает сверху вниз | Проверка или ревью |
| `observe` | Широко открывает глаза, наклоняется и осматривается | Внимательно смотреть, читать |
| `think` | Смотрит вверх и медленно поворачивается в другую сторону | Подумать перед ответом |
| `ponder` | Смотрит вниз, влево и вправо, затем поднимает взгляд | Тщательно взвешивать |
| `bow` | Глубокий кивок, пауза и снова вверх | Благодарность, извинение, приветствие |
| `angry` | Опущенные сердитые глаза | Контент заблокирован |
| `refuse` | Качает головой | Не может или не будет выполнять запрос |
| `shake` | Сначала отводит глаза, затем поворачивается голова | Несогласие, нежелание смотреть |
| `surprise` | Широко открытые глаза | Что-то неожиданное |
| `love` | Глаза сливаются в бьющееся сердце | Благодарность, симпатия |
| `wink` | Наклоняет голову и подмигивает | Приветствие, шутка |
| `smug` | Прищуривается, смотрит вверх и по сторонам | Довольство собой, озорство |
| `bounce` | Прыгает, как мяч | Радость, праздник |
| `smug-bounce` | Два улыбчивых прыжка с наклонами влево и вправо | Немного гордости |
| `dizzy` | Глаза кружатся в разные стороны, один большой, другой маленький | Голова кругом, слишком много информации |
| `random` | Глаза крутятся, как барабаны игрового автомата | Случайный выбор, игривый момент |
| `sleep` | Закрывает глаза и спит | Долго нет активности |
| `wake` | Открывает глаза и просыпается | Активность возобновилась |

Стили ожидания: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. Старые названия действий из 0.5 работают до 1.0, см. [таблицу перехода](../CHANGELOG.md#upgrading-from-05x).

Типичный запрос:

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

## Настройки

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| Атрибут | Назначение | Метод во время выполнения |
| --- | --- | --- |
| `size` | Размер аватара в пикселях |  |
| `view` | `2d` (по умолчанию, плоский) или `3d` | `setView()` |
| `color` | Основной цвет аватара |  |
| `eye-color` | Цвет глаз; `transparent` делает глаза прозрачными, сквозь них виден фон | `setEyeColor()` |
| `eye-style` | По умолчанию глаза скруглены; `sharp` возвращает прямые срезы |  |
| `skin` | Номер скина, например `301`; без атрибута — сплошной цвет | `setSkin()` |
| `auto-sleep` | Время бездействия до автоматического сна; `0` отключает его |  |
| `wake-on` | Политика автоматического пробуждения: `activity`, `interaction` или `manual` |  |
| `motion` | Политика движения: `auto`, `reduce` или `full` |  |
| `idle-gaze` | В покое глаза время от времени оглядываются; `false` оставляет взгляд прямо | `setIdleGaze()` |
| `petting` | Несколько раз проведите указателем по лбу — аватар закроет глаза и прильнёт; `false` отключает | `setPetting()` |
| `press-squeeze` | Удержание центра для сжатия; `false` отключает жест | `setPressSqueeze()` |
| `antenna` | `false` скрывает шарик антенны |  |
| `antenna-drag` | Перетаскивание антенны, пружинный возврат и головокружение; `false` отключает | `setAntennaDrag()` |

Другие методы: `setPointerFollow(false)` отключает слежение за указателем, `setHeadRoundness(75)` задаёт скругление головы.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Объёмная голова и глаза

- **Объём**: `view="3d"` придаёт голове толщину и изогнутое лицо; она по-настоящему поворачивается к указателю и останавливается с лёгким отскоком. Все выражения, скины и цвета работают как обычно. Код объёмного вида загружается при первом включении.
- **Выражения двигают голову**: голова поворачивается вслед за глазами, кивает и подпрыгивает. С `motion="reduce"` она остаётся неподвижной.
- **Скруглённые глаза**: щёлочки, например при прищуре или моргании, имеют круглые концы; `eye-style="sharp"` возвращает прямые срезы.
- **Цвет глаз**: `eye-color` работает на однотонном аватаре и 131 скине; остальные 57 скинов сохраняют свои фактурные глаза (см. `SKINS[номер].eyeColor`). `transparent` работает на всех скинах.
- **Взаимодействие**: глаза следят за указателем; если тянуть голову, она колышется как желе; при нажатии на центр сжимается; антенну можно оттянуть, и она пружинит обратно; поводите указателем по лбу — аватар закроет глаза и прильнёт.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Скины

188 скинов в 17 сериях, свет следует за указателем, всё на чистом SVG. Номера никогда не меняются: сначала номер серии, затем две цифры скина (305 = серия 3, скин 5).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // вернуться к однотонному цвету
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="Скины BoopFace: избранные, фильтры по сериям и поиск" width="100%">

| Серия | Номера | Серия | Номера | Серия | Номера |
| --- | --- | --- | --- | --- | --- |
| Глазурь | 101–106 | Ледяное стекло | 201–206 | Мармелад | 301–312 |
| Карамельное стекло | 401–406 | Акрил | 501–512 | Желе | 601–612 |
| Градиент | 701–712 | Матовое стекло | 801–806 | Металл | 901–930 |
| Камни и керамика | 1001–1012 | Дерево | 1101–1106 | Мячи | 1201–1210 |
| Прозрачность и блеск | 1301–1305 | Ткань и кожа | 1401–1412 | Сладости и фрукты | 1501–1512 |
| Природа | 1601–1612 | Узоры и техника | 1701–1717 |  |  |

Все скины — на [странице скинов в Studio](https://boopface.com/demo/?lang=ru#skins). `await loadSkins()` загружает их заранее; `SKINS`, `SKIN_SERIES` и `SKIN_NAMES` дают названия, серии и номера.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Подключение ИИ

Передайте в `connectAgent()` поток, который даёт ваш ИИ-SDK, и аватар сам покажет размышление, вызов инструментов, ответ, завершение и ошибки.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // показывайте ответ как обычно
}
```

Поддерживаются AG-UI, OpenAI (Responses, Realtime, Chat Completions), Anthropic Messages, Vercel AI SDK и состояние `useChat`. Можно передавать элементы по одному через `agent.handle(event)` или состояние, например `agent.handle('thinking')`.

| Состояние | Выражение по умолчанию | Состояние | Выражение по умолчанию |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

Другие выражения:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

Чат в [Studio](https://boopface.com/demo/?lang=ru#agent) — локальная имитация: он показывает, как аватар меняет выражение, пока приходит ответ; настоящий ИИ не подключён. В реальном проекте это те несколько строк выше: передайте в `connectAgent()` поток, который возвращает ваш ИИ-SDK. Как подключить каждый формат, видно на вкладке «Код › Подключение ИИ».

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Голосовые разговоры

Каждый ход голосового ассистента — слушать, думать, говорить. В BoopFace есть подходящий набор выражений, плавно переходящих друг в друга:

```js
avatar.startListening();                   // пользователь говорит
avatar.startWaiting({ variant: 'bloom' }); // ИИ думает
avatar.startSpeaking();                    // ИИ отвечает
avatar.setVoiceLevel(0.6);                 // необязательно: громкость 0–1
```

С `connectAgent()` переключение происходит автоматически (OpenAI Realtime, ElevenLabs и другие). Если передать в `connectAudio()` микрофон и звук ответа, глаза двигаются в такт реальной громкости:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React и Vue

Стандартный Web Component, работает в любом фреймворке как есть.

```jsx
// React 19 (в Next.js добавьте 'use client')
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

В Vue 3 нужно объявить пользовательский элемент в `vite.config.js`:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

Примеры, которые работают сразу после открытия, без сборки: [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). Компонент отправляет события `face-state` (что показано) и `action-state` (начало и конец действий); объявления для экранных чтецов — в [`accessibility.html`](../examples/accessibility.html). Типы TypeScript включены.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded: те же выражения глаз на экранах плат ESP32, STM32 и Raspberry Pi Pico">
</p>

Те же выражения глаз на экранах роботов и плат. Небольшой движок на C++11 с 33 выражениями; примеры прошивок охватывают 28 сочетаний плат и экранов на ESP32, ESP32-S3, STM32 и Raspberry Pi Pico (круглые и квадратные TFT, вытянутые экраны, AMOLED, монохромные OLED).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: глаза на экране платы, кнопки выражений и список экранов" width="100%">

1. **Предпросмотр**: [онлайн-симулятор](https://boopface.com/hardware/?lang=ru) запускает тот же движок и имитирует 32 экрана, так что всё видно и без платы.
2. **Экспорт**: настройте раскладку, цвета и частоту кадров, откройте вкладку **Прошивка** и нажмите **Скачать файл**; положите `eyes_settings.h` в `embedded/examples/arduino/` полного проекта (рядом с `main.cpp`) и соберите. В ZIP библиотеки Arduino этих файлов нет; см. [Шаги](../embedded/README.ru.md#настройте-в-симуляторе-и-сразу-на-плату).
3. **Установка**: в Arduino IDE добавьте `BoopFace-Embedded-0.2.0.zip` со [страницы релиза](https://github.com/CX-ArtLab/boopface/releases/tag/eyes-v0.2.0); в PlatformIO используйте `lib_deps = cxlab/BoopFace@^0.2.0`.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1-битные пиксели

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* отправьте eyes.data() на экран */ } }
// eyes.play("success", millis());
```

Экспериментальная версия: все конфигурации собираются в CI, но не все проверены на реальном железе. [Отчёты о проверке на железе](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml) приветствуются. Полное руководство: [документация Embedded](../embedded/README.ru.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Прочее

- **Переход с Agent Robot Avatar**: переименован в 0.8, использование не изменилось. Выполните `npm uninstall agent-robot-avatar && npm install boopface`; старый тег `<agent-robot-avatar>` работает до 1.0.
- **Совместимость**: современные браузеры с ES Modules, Custom Elements и Web Animations; автотесты охватывают Chromium, Firefox и WebKit.
- **Версия**: **Web v0.9.0**, Embedded v0.2.0 (экспериментальная). До 1.0 API меняется осторожно.
- **Витрина**: [проекты сообщества](../SHOWCASE.md), [добавьте свой](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **Участие**: issues и pull requests приветствуются; сначала прочитайте [`CONTRIBUTING.md`](../CONTRIBUTING.md).

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Лицензия и персонаж

Код распространяется по [лицензии MIT](../LICENSE): используйте, изменяйте и распространяйте его в своих приложениях. Персонаж BoopFace, его внешний вид, имя и визуальный стиль — оригинальный дизайн CX ArtLab; лицензия MIT не передаёт их и не позволяет представлять их как оригинального персонажа или бренд другой стороны.

BoopFace — независимый проект с открытым исходным кодом, не связанный ни с одной ИИ-платформой или брендом и не одобренный ими; названия продуктов упомянуты только для описания сценариев использования.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## Угостить меня кофе

Если этот проект оказался полезен, вы можете угостить меня кофе.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
