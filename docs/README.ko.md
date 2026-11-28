# BoopFace

<p align="center">
  <img src="../assets/readme/boopface-header.jpg" alt="BoopFace: AI 봇, 에이전트, 인터랙티브 앱을 위한 가볍고 표현력 있는 로봇 아바타 컴포넌트">
</p>

**공식 사이트: [boopface.com](https://boopface.com/)** · **온라인 데모: [BoopFace Studio](https://boopface.com/demo/?lang=ko)**

[English](https://github.com/CX-ArtLab/boopface/blob/main/README.md) | [简体中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-CN.md) | [Español](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.es.md) | [Русский](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ru.md) | [Français](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.fr.md) | [Português](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.pt.md) | [Deutsch](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.de.md) | [日本語](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ja.md) | [한국어](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.ko.md) | [繁體中文](https://github.com/CX-ArtLab/boopface/blob/main/docs/README.zh-TW.md)

![Version](https://img.shields.io/badge/version-v0.9.0-111111?style=flat-square) [![License](https://img.shields.io/badge/license-MIT-0A7EA4?style=flat-square)](../LICENSE) [![CI](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/CX-ArtLab/boopface/actions/workflows/validate.yml) [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=flat-square&logo=ko-fi&logoColor=white)](https://ko-fi.com/P0E625WIOI)

![Vanilla JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000) ![Web Component](https://img.shields.io/badge/Web-Native%20Component-5A67D8?style=flat-square) ![SVG](https://img.shields.io/badge/Rendering-SVG-FFB13B?style=flat-square&logo=svg&logoColor=000) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-2EA44F?style=flat-square) ![Embedded](https://img.shields.io/badge/Embedded-ESP32%20%7C%20STM32%20%7C%20Pico-E7352C?style=flat-square&logo=espressif&logoColor=white)

BoopFace는 AI 봇, 에이전트, 인터랙티브 앱을 위한 가볍고 표현력 있는 로봇 아바타 컴포넌트입니다. 생각 중, 대기, 완료, 오류. 에이전트의 모든 상태를 표정 하나로 보여 줄 수 있습니다.

AI 어시스턴트와 에이전트의 얼굴이자 상태 표시로 쓸 수 있습니다. ChatGPT, Claude, Gemini 같은 채팅 어시스턴트, Codex, Claude Code, Cursor 같은 코딩 에이전트, 그리고 다양한 개인 에이전트에 어울립니다. 데스크톱 친구, 가상 펫, 디지털 마스코트, 챗봇 아바타로도 좋습니다.

SVG와 순수 JavaScript로 만든 네이티브 Web Component로, 런타임 의존성이 없고 MIT 라이선스입니다. 평면으로 보여 주거나, 실제로 고개를 돌리는 입체 머리로 바꿀 수 있습니다. 188가지 스킨도 바로 입힐 수 있습니다.

https://github.com/user-attachments/assets/533940e6-38e8-45e3-a276-606e1e7bba51

<p align="center">
  <a href="#빠른-시작">빠른 시작</a> · <a href="#표정">표정</a> · <a href="#설정">설정</a> · <a href="#입체-머리와-눈">입체 머리와 눈</a> · <a href="#스킨">스킨</a> · <a href="#ai-연결">AI 연결</a> · <a href="#음성-대화">음성 대화</a> · <a href="#react와-vue">React와 Vue</a> · <a href="#boopface-embedded">임베디드 버전</a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 온라인으로 써 보기

<h3 align="center">공식 사이트</h3>

<p align="center">
  <a href="https://boopface.com/"><b>boopface.com</b></a>
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Studio 온라인 데모</h3>

<p align="center">
  <a href="https://boopface.com/demo/?lang=ko"><b>Studio 열기</b></a> · <a href="https://boopface.com/demo/?lang=ko#skins">스킨 고르기</a> · <a href="https://boopface.com/demo/?lang=ko#agent">AI 연결 해 보기</a>
</p>

<p align="center">
  <img src="../assets/demo/boopface-demo.gif" alt="BoopFace 인터랙션 데모" width="560">
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

<h3 align="center">BoopFace Embedded 임베디드 시뮬레이터</h3>

<p align="center">
  <a href="https://boopface.com/hardware/?lang=ko"><b>임베디드 시뮬레이터 열기</b></a> (보드 화면 프리셋 32종)
</p>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 0.9 업데이트

- BoopFace가 입체로 진화했습니다. [자세히](#입체-머리와-눈)
- 새 표정 15개와 음성 대화 키트. [자세히](#표정)
- 쓰다듬기 반응 추가: 이마 위에서 포인터를 흔들어 보세요. [자세히](#입체-머리와-눈)
- AI 대화 연결 업데이트. [자세히](#ai-연결)
- 온라인 데모 페이지를 새로 만들었습니다: [BoopFace Studio](https://boopface.com/demo/?lang=ko)
- 임베디드 버전 0.2: 새 표정을 함께 지원합니다. [자세히](#boopface-embedded)

자세한 내용은 [CHANGELOG](../CHANGELOG.md)를 보세요.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace 특징

- 네이티브 Web Component, SVG 렌더링 + 순수 JavaScript, 런타임 의존성 없음, 어떤 프레임워크에서도 사용 가능
- 감정을 표현하는 아바타 컴포넌트, 다양한 상태마다 그에 맞는 표정
- 30가지가 넘는 표정으로 살아 있는 듯한 느낌
- 인터랙티브: 눈이 포인터를 따라가고, 끌기, 찌그러뜨리기, 누르기, 안테나 당기기, 쓰다듬기에 모두 반응
- 평면과 입체 두 가지 스타일로 용도에 맞게, 188가지 스킨을 언제든 교체
- AI 스트림 이벤트가 표정을 바로 움직임 (AG-UI, OpenAI, Anthropic, Vercel AI SDK), 음성 대화 지원
- 가벼움: 라이트 빌드 약 92 KB
- BoopFace Embedded 임베디드 버전: 같은 표정이 개발 보드 화면에서도 동작 (ESP32, STM32, Raspberry Pi Pico)

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 빠른 시작

```bash
npm install boopface
```

```js
import 'boopface';
```

```html
<boop-face id="avatar" view="3d"></boop-face>
```

초기화 코드가 필요 없습니다. 아바타가 알아서 눈을 깜빡이며 대기합니다. `view="3d"`는 공식 사이트의 입체 머리이고, 생략하면 평면 아바타(기본값, 더 가벼움)입니다.

```js
const avatar = document.querySelector('#avatar');
avatar.play('success');
```

npm 없이: [최신 릴리스](https://github.com/CX-ArtLab/boopface/releases/latest)에서 `boopface-x.y.z.zip`을 내려받아 페이지 옆에 풀고 `<script type="module" src="./boopface/boopface.js"></script>`로 불러옵니다.

**크기** (gzip 전송 크기)

| 빌드 | 크기 |
| --- | --- |
| 라이트 `import 'boopface/lite'`, 스킨 없음 | 약 92 KB |
| 풀 빌드, 페이지에서 스킨 미사용 | 약 104 KB |
| 풀 빌드, 스킨 사용 | 약 161 KB (스킨 코드는 처음 쓸 때 로드) |

입체로 바꾸면 약 19 KB를 더 내려받습니다.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 표정

```js
avatar.play('success');   // 한 번 재생
avatar.startWaiting();    // stopWaiting()이나 다른 표정까지 계속 대기
avatar.reset();           // 대기 상태로 돌아가기
```

| 동작 | 모습 | 어울리는 상황 |
| --- | --- | --- |
| `idle` | 눈을 깜박이며 주변을 둘러봄 | 기본 상태 |
| `bored` | 천천히 양옆을 둘러봄 | 한동안 아무 일도 없을 때 |
| `waiting-spin` | 두 눈이 좌우로 회전 | 응답 대기 (기본) |
| `waiting-wrap` | 두 눈이 한쪽으로 나갔다 반대쪽으로 돌아옴 | 응답 대기 |
| `waiting-wave` | 두 눈이 번갈아 위아래로 출렁임 | 응답 대기 |
| `waiting-bloom` | 교차한 두 타원이 꽃처럼 숨 쉬며 돎 | 답변 대기. 음성 대화를 위해 만든 모양 |
| `waiting-cross` | 교차한 두 타원이 × 모양으로 멈췄다가 4분의 1씩 돌며 가늘고 굵음이 바뀜 | 답장 기다림. 음성 대화에도 어울림 |
| `shape-wait` | 두 눈이 하나의 모양이 되어 원과 둥근 사각형 사이를 오감 | 답장 기다림 |
| `input` | 두 눈이 깜박이는 입력 커서가 됨 | 사용자가 입력 중 |
| `listening` | 두 눈이 하나의 둥근 눈으로 합쳐져 목소리에 따라 부풂 | 음성 대화: 사용자가 말하는 중 |
| `speaking` | 두 눈으로 다시 나뉘어 답변에 맞춰 늘어남 | 음성 대화: AI가 답하는 중 |
| `affirm` | 고개를 끄덕임 | 확인, 알겠음 |
| `success` | 기쁘게 웃는 눈 | 작업 완료 |
| `failure` | 고개와 눈이 처짐 | 작업 또는 연결 실패 |
| `wary` | 고개를 돌려 경계하며 위아래로 훑어봄 | 사용자 확인이 필요한 작업 |
| `inspect` | 눈을 가늘게 뜨고 위아래로 살핌 | 내용 확인·검토 |
| `observe` | 눈을 크게 뜨고 다가와 둘러봄 | 자세히 보기, 읽기 |
| `think` | 위를 올려다보고 천천히 반대쪽으로 돌아감 | 답하기 전에 생각하기 |
| `ponder` | 아래를 보고 좌우를 살핀 뒤 고개를 듦 | 신중하게 따져 보기 |
| `bow` | 깊게 끄덕이고 잠시 멈췄다가 다시 듦 | 감사, 사과, 인사 |
| `angry` | 눈을 내리깔고 노려봄 | 콘텐츠가 차단됨 |
| `refuse` | 고개를 저음 | 할 수 없거나 하지 않을 요청 |
| `shake` | 눈이 먼저 돌아가고 머리가 따라감 | 동의하지 않음, 보기 싫음 |
| `surprise` | 눈을 크게 뜸 | 예상 밖의 일 |
| `love` | 두 눈이 뛰는 하트로 합쳐짐 | 감사, 애정 |
| `wink` | 고개를 갸웃하며 윙크 | 인사, 농담 |
| `smug` | 눈을 가늘게 뜨고 위와 좌우를 봄 | 으쓱함, 장난스러움 |
| `bounce` | 공처럼 통통 튐 | 기쁨, 축하 |
| `smug-bounce` | 웃으며 두 번 튀고 좌우로 고개를 갸웃 | 살짝 뿌듯함 |
| `dizzy` | 두 눈이 반대 방향으로 돌며 하나는 크고 하나는 작음 | 어지러움, 정보가 너무 많음 |
| `random` | 두 눈이 슬롯머신 릴처럼 돌아감 | 무작위 선택, 장난스러운 순간 |
| `sleep` | 눈을 감고 잠듦 | 오랫동안 조작이 없을 때 |
| `wake` | 눈을 뜨고 깨어남 | 활동이 다시 시작될 때 |

대기 스타일: `startWaiting({ variant: 'spin' | 'wrap' | 'wave' | 'bloom' | 'cross' })`. 0.5의 예전 동작 이름은 1.0까지 쓸 수 있습니다. [업그레이드 표](../CHANGELOG.md#upgrading-from-05x)를 보세요.

일반적인 요청 흐름:

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

## 설정

```html
<boop-face size="160" view="3d" color="#08090b" eye-color="#2bd67b" auto-sleep="30000"></boop-face>
```

| 속성 | 용도 | 런타임 메서드 |
| --- | --- | --- |
| `size` | 아바타 크기(px) |  |
| `view` | `2d`(기본, 평면) 또는 `3d` | `setView()` |
| `color` | 아바타 기본 색상 |  |
| `eye-color` | 눈 색상. `transparent`이면 눈으로 배경이 비쳐 보임 | `setEyeColor()` |
| `eye-style` | 기본은 둥근 눈. `sharp`이면 예전의 직선 절단으로 돌아감 |  |
| `skin` | 스킨 번호(예: `301`). 생략하면 단색 | `setSkin()` |
| `auto-sleep` | 자동 수면까지의 유휴 시간; `0`이면 비활성화 |  |
| `wake-on` | 자동 깨우기 정책: `activity`, `interaction`, `manual` |  |
| `motion` | 모션 정책: `auto`, `reduce`, `full` |  |
| `idle-gaze` | 쉬는 동안 눈이 가끔 주위를 둘러봄. `false`이면 계속 앞을 봄 | `setIdleGaze()` |
| `petting` | 이마 위에서 포인터를 몇 번 왔다 갔다 하면 눈을 감고 비벼 옴. `false`이면 끔 | `setPetting()` |
| `press-squeeze` | 중앙을 길게 눌러 압축; `false`로 비활성화 | `setPressSqueeze()` |
| `antenna` | `false`이면 안테나 공을 숨김 |  |
| `antenna-drag` | 안테나 당기기, 스프링 복귀와 어지러운 반응. `false`로 끔 | `setAntennaDrag()` |

기타 메서드: `setPointerFollow(false)`로 포인터 따라가기 끄기, `setHeadRoundness(75)`로 머리 둥글기 조절.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 입체 머리와 눈

- **입체**: `view="3d"`를 쓰면 머리에 두께와 곡면이 생기고, 실제로 포인터 쪽으로 고개를 돌린 뒤 살짝 튕기며 멈춥니다. 모든 표정, 스킨, 색상을 그대로 쓸 수 있습니다. 입체 코드는 처음 3D로 바꿀 때 로드됩니다.
- **표정과 함께 머리가 움직임**: 머리가 눈을 따라 돌고, 끄덕이고, 뛰어오릅니다. `motion="reduce"`에서는 움직이지 않습니다.
- **둥근 눈**: 눈을 가늘게 뜨거나 깜빡이는 가는 틈은 양 끝이 둥급니다. `eye-style="sharp"`로 직각 모서리로 되돌릴 수 있습니다.
- **눈 색상**: `eye-color`는 단색 아바타와 131가지 스킨에서 쓸 수 있습니다. 나머지 57가지 스킨은 질감 있는 눈을 그대로 유지합니다(`SKINS[번호].eyeColor`로 확인). `transparent`는 모든 스킨에서 쓸 수 있습니다.
- **인터랙션**: 눈이 포인터를 따라가고, 머리를 끌면 젤리처럼 흔들리며, 가운데를 누르면 찌그러지고, 안테나는 당겼다 놓으면 튕겨 돌아옵니다. 이마 위에서 포인터를 몇 번 흔들면 눈을 감고 비벼 옵니다.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 스킨

17개 시리즈, 188가지 스킨. 빛이 포인터를 따라가며 모두 순수 SVG입니다. 번호는 영원히 바뀌지 않습니다. 앞자리는 시리즈 번호, 뒤 두 자리는 시리즈 안의 순서입니다(305 = 3번 시리즈의 5번째).

```html
<boop-face skin="301"></boop-face>
```

```js
avatar.setSkin(102);
avatar.setSkin(null); // 단색으로 돌아가기
```

<img src="../assets/readme/boopface-skin-gallery.jpg" alt="BoopFace 스킨: 추천 스킨, 시리즈 필터, 검색" width="100%">

| 시리즈 | 번호 | 시리즈 | 번호 | 시리즈 | 번호 |
| --- | --- | --- | --- | --- | --- |
| 글레이즈 | 101–106 | 아이스 글라스 | 201–206 | 젤리곰 | 301–312 |
| 캔디 글라스 | 401–406 | 아크릴 | 501–512 | 젤리 | 601–612 |
| 그라데이션 | 701–712 | 반투명 유리 | 801–806 | 메탈 | 901–930 |
| 보석과 도자기 | 1001–1012 | 나무 | 1101–1106 | 공 | 1201–1210 |
| 투명·반짝임 | 1301–1305 | 패브릭과 가죽 | 1401–1412 | 디저트와 과일 | 1501–1512 |
| 자연 | 1601–1612 | 패턴과 테크 | 1701–1717 |  |  |

모든 스킨은 [Studio 스킨 페이지](https://boopface.com/demo/?lang=ko#skins)에서 볼 수 있습니다. `await loadSkins()`로 미리 로드할 수 있고, `SKINS`, `SKIN_SERIES`, `SKIN_NAMES`로 이름, 시리즈, 번호를 얻을 수 있습니다.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## AI 연결

AI SDK가 주는 스트림을 `connectAgent()`에 넘기면, 아바타가 생각 중, 도구 호출, 답변, 완료, 오류를 스스로 보여 줍니다.

```js
import { connectAgent } from 'boopface';

const agent = connectAgent(avatar);
for await (const event of agent.track(stream)) {
  // 평소처럼 답변 표시
}
```

AG-UI, OpenAI(Responses, Realtime, Chat Completions), Anthropic Messages, Vercel AI SDK, `useChat` 상태를 지원합니다. `agent.handle(event)`로 하나씩 넘기거나 `agent.handle('thinking')`처럼 상태를 바로 넘길 수도 있습니다.

| 상태 | 기본 표정 | 상태 | 기본 표정 |
| --- | --- | --- | --- |
| `thinking` | `waiting-spin` | `done` | `success` |
| `tool` | `waiting-wave` | `error` | `failure` |
| `replying` | `idle` | `refused` | `refuse` |
| `approval` | `wary` | `cancelled` | `idle` |
| `listening` | `listening` | `speaking` | `speaking` |
| `typing` | `input` | `idle` | `idle` |

표정 바꾸기:

```js
connectAgent(avatar, { actions: { replying: 'input', tool: 'inspect' } });
```

[Studio](https://boopface.com/demo/?lang=ko#agent)의 채팅은 로컬에서 흉내 낸 것으로, 답변이 올 때 아바타 표정이 어떻게 바뀌는지 보여 줍니다. 실제 AI와는 연결되어 있지 않습니다. 실제 연결은 위의 몇 줄처럼 AI SDK가 돌려주는 스트림을 `connectAgent()`에 넘기면 됩니다. 형식별 연결 방법은 "코드 › AI 연결"에서 볼 수 있습니다.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 음성 대화

음성 어시스턴트의 한 턴은 듣기, 생각하기, 말하기 세 단계입니다. BoopFace에는 자연스럽게 이어지는 표정 세트가 있습니다:

```js
avatar.startListening();                   // 사용자가 말하는 중
avatar.startWaiting({ variant: 'bloom' }); // AI가 생각하는 중
avatar.startSpeaking();                    // AI가 답하는 중
avatar.setVoiceLevel(0.6);                 // 선택: 음량 0–1
```

`connectAgent()`를 쓰면 자동으로 전환됩니다(OpenAI Realtime, ElevenLabs 등 지원). `connectAudio()`에 마이크와 답변 오디오를 연결하면 눈이 실제 음량에 맞춰 움직입니다:

```js
const agent = connectAgent(avatar);
events.onmessage = ({ data }) => agent.handle(JSON.parse(data));
agent.connectAudio({ input: microphone, output: replyAudio });
```

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## React와 Vue

표준 Web Component이므로 어떤 프레임워크에서도 그대로 쓸 수 있습니다.

```jsx
// React 19 (Next.js에서는 'use client' 추가)
import { useEffect, useRef } from 'react';
import { connectAgent } from 'boopface';

export function Avatar({ onReady }) {
  const ref = useRef(null);
  useEffect(() => { onReady(connectAgent(ref.current)); }, []);
  return <boop-face ref={ref} size="140" />;
}
```

Vue 3에서는 `vite.config.js`에서 커스텀 요소를 선언합니다:

```js
vue({ template: { compilerOptions: { isCustomElement: tag => tag === 'boop-face' } } })
```

빌드 없이 열기만 하면 동작하는 예제: [`react.html`](../examples/react.html), [`vue.html`](../examples/vue.html), [`basic.html`](../examples/basic.html). 컴포넌트는 `face-state`(화면 상태)와 `action-state`(동작 시작과 끝) 이벤트를 보냅니다. 스크린 리더 안내 예제는 [`accessibility.html`](../examples/accessibility.html)에 있습니다. TypeScript 타입이 포함되어 있습니다.

<a id="boopface-embedded"></a>

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## BoopFace Embedded 임베디드 버전

<p align="center">
  <img src="../assets/readme/boopface-embedded.jpg" alt="BoopFace Embedded 임베디드 버전: ESP32, STM32, Raspberry Pi Pico 보드 화면에서 동작하는 같은 눈 표정">
</p>

같은 눈 표정이 로봇과 개발 보드 화면에서 동작합니다. 작은 C++11 엔진에 표정 33개. 펌웨어 예제는 ESP32, ESP32-S3, STM32, Raspberry Pi Pico의 보드와 화면 조합 28가지를 지원합니다(원형/사각 TFT, 가로로 긴 화면, AMOLED, 흑백 OLED).

<img src="../assets/readme/boopface-embedded-simulator.jpg" alt="BoopFace Embedded Studio: 보드 화면 위의 눈, 표정 버튼, 화면 목록" width="100%">

1. **미리 보기**: [온라인 시뮬레이터](https://boopface.com/hardware/?lang=ko)가 같은 엔진으로 화면 32가지를 재현하므로 보드 없이도 볼 수 있습니다.
2. **내보내기**: 레이아웃, 색상, 프레임 레이트를 맞추고 "펌웨어" 탭에서 "파일 다운로드"를 누른 뒤, `eyes_settings.h`를 전체 프로젝트의 `embedded/examples/arduino/`(`main.cpp` 옆)에 두고 빌드합니다. Arduino 라이브러리 ZIP에는 이 파일들이 없습니다. [절차](../embedded/README.ko.md#시뮬레이터에서-맞추고-바로-보드로)를 보세요.
3. **설치**: Arduino IDE에서는 [릴리스 페이지](https://github.com/CX-ArtLab/boopface/releases/tag/embedded-v0.2.1)의 `BoopFace-Embedded-0.2.1.zip`을 추가하고, PlatformIO에서는 `lib_deps = cxlab/BoopFace@^0.2.1`을 씁니다.

```cpp
#include <BoopFace.h>
boopface::Eyes eyes;
uint8_t pixels[4800]; // 240 x 160, 1비트 픽셀

boopface::EyesConfig config;

void setup() { eyes.begin(config, pixels, sizeof pixels, millis()); }
void loop()  { if (eyes.update(millis())) { /* eyes.data()를 화면으로 보내기 */ } }
// eyes.play("success", millis());
```

실험 버전: 모든 구성이 CI에서 빌드되지만, 실제 하드웨어에서 모두 확인된 것은 아닙니다. [하드웨어 보고](https://github.com/CX-ArtLab/boopface/issues/new?template=hardware_report.yml)를 환영합니다. 자세한 내용은 [임베디드 문서](../embedded/README.ko.md)를 보세요.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 기타

- **Agent Robot Avatar에서 업그레이드**: 0.8에서 이름이 바뀌었고 사용법은 같습니다. `npm uninstall agent-robot-avatar && npm install boopface`면 되고, 예전 태그 `<agent-robot-avatar>`는 1.0까지 쓸 수 있습니다.
- **호환성**: ES Modules, Custom Elements, Web Animations를 지원하는 최신 브라우저. 자동 테스트는 Chromium, Firefox, WebKit에서 실행합니다.
- **버전**: **웹 버전 v0.9.0**, 임베디드 버전 v0.2.1(실험 버전). 1.0까지 API는 신중하게 발전시킵니다.
- **작품 소개**: [커뮤니티 작품](../SHOWCASE.md), [작품 제출하기](https://github.com/CX-ArtLab/BoopFace/issues/new?template=showcase-submission.yml).
- **기여하기**: Issue와 Pull Request를 환영합니다. 먼저 [`CONTRIBUTING.md`](../CONTRIBUTING.md)를 읽어 주세요.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 라이선스와 캐릭터

코드는 [MIT License](../LICENSE)로, 앱에서 사용, 수정, 배포할 수 있습니다. BoopFace 캐릭터의 외형, 이름, 시각적 아이덴티티는 CX ArtLab의 오리지널 디자인입니다. MIT License는 그 소유권을 넘기지 않으며, 다른 이의 오리지널 캐릭터나 브랜드로 내세울 권리도 주지 않습니다.

BoopFace는 독립적인 오픈소스 프로젝트로, 어떤 AI 플랫폼이나 브랜드와도 제휴하지 않았고 공식 승인을 받지 않았습니다. 제품 이름은 사용 사례를 설명하기 위해서만 언급합니다.

<p align="center">
  <img src="../assets/readme/divider.svg" width="100%" height="1" alt="">
</p>

## 커피 한 잔 사 주기

이 프로젝트가 유용하다면 커피 한 잔을 사 주셔도 좋습니다.

<a href='https://ko-fi.com/P0E625WIOI' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
