// The offline Embedded Studio (the same page as boopface.com/hardware/) must offer every action the
// C++ core has, run the same engine as the committed preview, and need no network.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const studio = await readFile(join(root, 'studio/boopface-embedded-studio.html'), 'utf8');

// The engine inside the Studio is the one built from this repository's current core sources.
const { createHash } = await import('node:crypto');
const hash = createHash('sha256');
for (const file of ['lib/BoopFace/src/BoopFace.h', 'lib/BoopFace/src/BoopFace.cpp', 'lib/BoopFace/src/BoopFaceGaze.h', 'lib/BoopFace/src/BoopFaceWebMotion.h', 'preview/bridge.cpp']) hash.update(await readFile(join(root, file)));
assert(studio.includes(`CORE_SHA256 = '${hash.digest('hex')}'`), 'the Studio engine is stale: rebuild it (tools/build-core-data.mjs, then rebuild the Studio)');
assert(/const WASM_BASE64 = '[^']{1000,}'/.test(studio), 'the Studio embeds the compiled engine');
assert(studio.includes('eyes_voice_level') || /voice/i.test(studio), 'voice kit present');

const list = studio.slice(studio.indexOf('const ACTIONS = ['), studio.indexOf('];', studio.indexOf('const ACTIONS = [')));
const offered = [...list.matchAll(/^\s*\['([a-z-]+)', previewText\(/gm)].map(m => m[1]);
const expected = ['idle', 'bored', 'waiting-spin', 'waiting-wrap', 'input', 'affirm', 'success', 'failure', 'wary', 'inspect', 'angry', 'refuse', 'surprise', 'love', 'random', 'sleep', 'wake', 'waiting-wave', 'observe', 'ponder', 'think', 'waiting-bloom', 'waiting-cross', 'shape-wait', 'bow', 'shake', 'smug', 'wink', 'dizzy', 'bounce', 'smug-bounce', 'listening', 'speaking'];
assert.deepEqual(offered, expected, 'the Studio offers all 33 actions, in the core order');

for (const name of expected.filter(n => !['listening', 'speaking'].includes(n))) assert(studio.includes(`data-action="${name}"`), `button for ${name}`);
for (const stage of ['listening', 'speaking']) assert(studio.includes(`data-voice-stage="${stage}"`), `voice kit button for ${stage}`);

assert(/Content-Security-Policy[^>]*connect-src 'none'/.test(studio), 'no network access from the offline file');
assert(!/<script[^>]+src=|<link[^>]+href="https?:/.test(studio), 'no external scripts or styles');
console.log('Embedded Studio file: 33 actions, current engine, offline.');
