export type BoopFaceAction =
  | 'idle'
  | 'bored'
  | 'waiting'
  | 'waiting-spin'
  | 'waiting-wrap'
  | 'waiting-wave'
  | 'waiting-flower'
  | 'input'
  | 'listening'
  | 'speaking'
  | 'affirm'
  | 'success'
  | 'failure'
  | 'wary'
  | 'inspect'
  | 'angry'
  | 'refuse'
  | 'surprise'
  | 'love'
  | 'random'
  | 'sleep'
  | 'wake'
  | BoopFaceDeprecatedAction;

/**
 * Older names that still play the same action but log a one-time deprecation
 * notice. They are removed in 1.0.
 */
export type BoopFaceDeprecatedAction =
  | 'wait'
  | 'send'
  | 'failed'
  | 'fail'
  | 'warning'
  | 'verify'
  | 'review'
  | 'blocked'
  | 'policy-blocked'
  | 'error'
  | 'system-error'
  | 'connection-error'
  | 'slot';

/**
 * Skin numbers for the `skin` attribute and `setSkin()`: the series number
 * followed by two digits, so `305` is the fifth skin of series 3. A number is
 * permanent; titles may be reworded, numbers never change and are never reused.
 */
export type BoopFaceSkin =
  | '101' | '102' | '103' | '104' | '105' | '106' | '201' | '202' | '203' | '204' | '205' | '206'
  | '301' | '302' | '303' | '304' | '305' | '306' | '307' | '308' | '309' | '310' | '311' | '312'
  | '401' | '402' | '403' | '404' | '405' | '406' | '501' | '502' | '503' | '504' | '505' | '506'
  | '507' | '508' | '509' | '510' | '511' | '512' | '601' | '602' | '603' | '604' | '605' | '606'
  | '607' | '608' | '609' | '610' | '611' | '612' | '701' | '702' | '703' | '704' | '705' | '706'
  | '707' | '708' | '709' | '710' | '711' | '712' | '801' | '802' | '803' | '804' | '805' | '806'
  | '901' | '902' | '903' | '904' | '905' | '906' | '907' | '908' | '909' | '910' | '911' | '912'
  | '913' | '914' | '915' | '916' | '917' | '918' | '919' | '920' | '921' | '922' | '923' | '924'
  | '925' | '926' | '927' | '928' | '929' | '930' | '1001' | '1002' | '1003' | '1004' | '1005' | '1006'
  | '1007' | '1008' | '1009' | '1010' | '1011' | '1012' | '1101' | '1102' | '1103' | '1104' | '1105' | '1106'
  | '1201' | '1202' | '1203' | '1204' | '1205' | '1206' | '1207' | '1208' | '1209' | '1210' | '1301' | '1302'
  | '1303' | '1304' | '1305' | '1401' | '1402' | '1403' | '1404' | '1405' | '1406' | '1407' | '1408' | '1409'
  | '1410' | '1411' | '1412' | '1501' | '1502' | '1503' | '1504' | '1505' | '1506' | '1507' | '1508' | '1509'
  | '1510' | '1511' | '1512' | '1601' | '1602' | '1603' | '1604' | '1605' | '1606' | '1607' | '1608' | '1609'
  | '1610' | '1611' | '1612' | '1701' | '1702' | '1703' | '1704' | '1705' | '1706' | '1707' | '1708' | '1709'
  | '1710' | '1711' | '1712' | '1713' | '1714' | '1715' | '1716' | '1717';

/** Display information for one skin. */
export interface BoopFaceSkinInfo {
  /** The series id, such as `'glaze'` or `'metal'`. */
  readonly series: string;
  /** Chinese title. */
  readonly title: string;
  /** English title. */
  readonly titleEn: string;
  /** Representative colors, light to dark. */
  readonly base: readonly string[];
}

/** A group of related skins, in gallery order. */
export interface BoopFaceSkinSeries {
  readonly id: string;
  /** The first digits of every skin number in the series. */
  readonly number: number;
  readonly title: string;
  readonly titleEn: string;
  readonly skins: readonly BoopFaceSkin[];
}

/** Every skin number, in gallery order. */
export declare const SKIN_NAMES: readonly BoopFaceSkin[];
/** Titles and colors for every skin, by number. */
export declare const SKINS: Readonly<Record<BoopFaceSkin, BoopFaceSkinInfo>>;
/** The skin series, in gallery order. */
export declare const SKIN_SERIES: readonly BoopFaceSkinSeries[];
/**
 * Skin painters download the first time a skin is used, so the first skin shows
 * a moment after it is set. Await this to load them in advance.
 */
export declare function loadSkins(): Promise<void>;

export type BoopFaceState =
  | 'idle'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'sleepy'
  | 'input'
  | 'sleep'
  | 'surprise'
  | 'love'
  | 'random'
  | 'waiting'
  | 'listening'
  | 'speaking'
  | 'wary'
  | 'refuse'
  | 'inspect'
  | 'failure'
  | 'squeeze'
  | 'antenna-drag';

export type BoopFaceCanonicalAction =
  | 'idle'
  | 'bored'
  | 'waiting'
  | 'input'
  | 'listening'
  | 'speaking'
  | 'affirm'
  | 'success'
  | 'failure'
  | 'wary'
  | 'inspect'
  | 'angry'
  | 'refuse'
  | 'surprise'
  | 'love'
  | 'random'
  | 'sleep'
  | 'wake'
  | 'reaction'
  | 'squeeze'
  | 'antenna-drag';

export type BoopFaceActionPhase = 'start' | 'end' | 'cancel';
export type BoopFaceActionSource = 'api' | 'interaction' | 'automatic';
export type BoopFaceWakeOn = 'activity' | 'interaction' | 'manual';
export type BoopFaceMotion = 'auto' | 'reduce' | 'full';
export interface BoopFaceWaitingOptions {
  /** `flower` is the voice set's thinking style: two crossed ovals that breathe and turn. */
  variant?: 'default' | 'spin' | 'wrap' | 'wave' | 'flower';
}

export interface BoopFaceActionStateDetail {
  action: BoopFaceCanonicalAction;
  phase: BoopFaceActionPhase;
  source: BoopFaceActionSource;
}

export interface BoopFaceEventMap extends HTMLElementEventMap {
  'face-state': CustomEvent<{ state: BoopFaceState }>;
  'action-state': CustomEvent<BoopFaceActionStateDetail>;
  'head-roundness-change': CustomEvent<{ value: number; version: string }>;
}

export declare class BoopFace extends HTMLElement {
  play(action: BoopFaceAction): this | Promise<void>;
  reset(): this;
  sleep(): this | Promise<void>;
  wake(): this | Promise<void>;
  input(active?: boolean): this | Promise<void>;
  startWaiting(options?: BoopFaceWaitingOptions): Promise<this>;
  stopWaiting(): this;
  /** Voice conversation: both eyes merge into one that swells with the user's voice. */
  startListening(): Promise<this>;
  /** Voice conversation: the eyes split back and stretch with the reply. */
  startSpeaking(): Promise<this>;
  /**
   * Loudness from 0 (silent) to 1 (loud) while listening or speaking; a pair
   * `[low, high]` drives the left and right eye separately while speaking.
   * Without it, speaking keeps a rhythm of its own and listening holds still.
   */
  setVoiceLevel(level: number | readonly [number, number]): this;
  setPointerFollow(enabled?: boolean): this;
  /** @deprecated Removed in 0.6; does nothing and logs a one-time notice. Deleted in 1.0. */
  setAntennaFlash(enabled?: boolean): this;
  setPressSqueeze(enabled?: boolean): this;
  setAntennaDrag(enabled?: boolean): this;
  setHeadRoundness(value?: number): this;
  getHeadRoundness(): number;
  /**
   * Dresses the head in a numbered skin with light that follows the pointer.
   * Same as the `skin` attribute; `null` or `'none'` returns to the flat color.
   * Throws for an unknown number.
   */
  setSkin(skin?: BoopFaceSkin | number | 'none' | null): this;
  getSkin(): BoopFaceSkin | null;
  noteActivity(wake?: boolean): void;

  addEventListener<K extends keyof BoopFaceEventMap>(
    type: K,
    listener: (this: BoopFace, event: BoopFaceEventMap[K]) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener<K extends keyof BoopFaceEventMap>(
    type: K,
    listener: (this: BoopFace, event: BoopFaceEventMap[K]) => unknown,
    options?: boolean | EventListenerOptions,
  ): void;
}

export declare const VERSION: string;

/**
 * What an AI agent is doing, as understood by `connectAgent()`.
 * Busy states (`thinking`, `tool`, `replying`, `speaking`) and `listening` keep
 * looping until the next state.
 */
export type BoopFaceAgentState =
  | 'idle'
  | 'typing'
  | 'listening'
  | 'thinking'
  | 'tool'
  | 'replying'
  | 'speaking'
  | 'approval'
  | 'done'
  | 'error'
  | 'refused'
  | 'cancelled';

/** An action name, a function that drives the avatar itself, or `null`/`false` to show nothing. */
export type BoopFaceAgentAction =
  | Exclude<BoopFaceAction, BoopFaceDeprecatedAction>
  | ((avatar: BoopFace, state: BoopFaceAgentState) => unknown)
  | null
  | false;

export interface BoopFaceAgentOptions {
  /** Replace the expression shown for any state. */
  actions?: Partial<Record<BoopFaceAgentState, BoopFaceAgentAction>>;
  /** Called after every state change, for status text or logging. */
  onChange?: (state: BoopFaceAgentState, previous: BoopFaceAgentState) => void;
}

export interface BoopFaceAgent {
  /** The current state. */
  readonly state: BoopFaceAgentState;
  readonly avatar: BoopFace;
  /**
   * Reads one stream item: an AG-UI event, an OpenAI Responses, Realtime or Chat
   * Completions event, an Anthropic Messages event, a Vercel AI SDK stream part, a useChat
   * status, or a state word such as `'thinking'`. Unrecognized items are ignored.
   */
  handle(event: unknown): BoopFaceAgentState;
  /**
   * Passes a stream through unchanged while the avatar follows it. A clean end
   * counts as done, a thrown error as error, an abort or early stop as cancelled.
   */
  track<T>(stream: AsyncIterable<T> | Iterable<T> | ReadableStream<T>): AsyncGenerator<T, void, undefined>;
  /**
   * Lets the eyes follow real sound: `input` (the microphone) while listening,
   * `output` (the reply) while speaking. Each is a MediaStream or an
   * `<audio>` / `<video>` element. Returns a function that disconnects them.
   */
  connectAudio(sources: {
    input?: MediaStream | HTMLMediaElement;
    output?: MediaStream | HTMLMediaElement;
  }): () => void;
  /** Back to idle. */
  reset(): BoopFaceAgentState;
}

/** Lets an AI stream drive the avatar's expressions. */
export declare function connectAgent(avatar: BoopFace | string, options?: BoopFaceAgentOptions): BoopFaceAgent;

export default BoopFace;

/** @deprecated Renamed to BoopFace in 0.8; the old names go away in 1.0. */
export { BoopFace as AgentRobotAvatar };
/** @deprecated Use BoopFaceAction. */
export type AgentRobotAvatarAction = BoopFaceAction;
/** @deprecated Use BoopFaceActionPhase. */
export type AgentRobotAvatarActionPhase = BoopFaceActionPhase;
/** @deprecated Use BoopFaceActionSource. */
export type AgentRobotAvatarActionSource = BoopFaceActionSource;
/** @deprecated Use BoopFaceActionStateDetail. */
export type AgentRobotAvatarActionStateDetail = BoopFaceActionStateDetail;
/** @deprecated Use BoopFaceCanonicalAction. */
export type AgentRobotAvatarCanonicalAction = BoopFaceCanonicalAction;
/** @deprecated Use BoopFaceDeprecatedAction. */
export type AgentRobotAvatarDeprecatedAction = BoopFaceDeprecatedAction;
/** @deprecated Use BoopFaceEventMap. */
export type AgentRobotAvatarEventMap = BoopFaceEventMap;
/** @deprecated Use BoopFaceMotion. */
export type AgentRobotAvatarMotion = BoopFaceMotion;
/** @deprecated Use BoopFaceSkin. */
export type AgentRobotAvatarSkin = BoopFaceSkin;
/** @deprecated Use BoopFaceSkinInfo. */
export type AgentRobotAvatarSkinInfo = BoopFaceSkinInfo;
/** @deprecated Use BoopFaceSkinSeries. */
export type AgentRobotAvatarSkinSeries = BoopFaceSkinSeries;
/** @deprecated Use BoopFaceState. */
export type AgentRobotAvatarState = BoopFaceState;
/** @deprecated Use BoopFaceWaitingOptions. */
export type AgentRobotAvatarWaitingOptions = BoopFaceWaitingOptions;
/** @deprecated Use BoopFaceWakeOn. */
export type AgentRobotAvatarWakeOn = BoopFaceWakeOn;

declare global {
  interface HTMLElementTagNameMap {
    'boop-face': BoopFace;
    /** @deprecated Use <boop-face>. */
    'agent-robot-avatar': BoopFace;
  }
}

