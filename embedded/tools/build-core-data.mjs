// Builds the WebAssembly eyes core and writes it as a script for the
// Embedded Studio (gemini-embedded-demo/vendor/core-data.js):
//   ZIG=/path/to/zig node tools/build-core-data.mjs <output.js>
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const zig = process.env.ZIG || 'zig';
const exported = ['eyes_init', 'eyes_play', 'eyes_gaze', 'eyes_update', 'eyes_action', 'eyes_data', 'eyes_size', 'eyes_stride',
  'eyes_layout', 'eyes_tracking', 'eyes_target', 'eyes_motion_target', 'eyes_gaze_config', 'eyes_is_tracking', 'eyes_duration', 'eyes_gaze_range', 'eyes_timing', 'eyes_voice_level'];
const temp = await mkdtemp(join(tmpdir(), 'boopface-core-'));
try {
  const wasmPath = join(temp, 'eyes.wasm');
  execFileSync(zig, ['build-exe', '-target', 'wasm32-wasi', '-mexec-model=reactor', '-lc', '-O', 'ReleaseFast',
    '-I', join(root, 'lib/BoopFace/src'),
    '-cflags', '-std=c++11', '-fno-exceptions', '-fno-rtti', '-Wall', '-Wextra', '-Werror', '--',
    join(root, 'lib/BoopFace/src/BoopFace.cpp'), join(root, 'preview/bridge.cpp'),
    ...exported.map(name => `--export=${name}`), '-fstrip', `-femit-bin=${wasmPath}`], { stdio: 'inherit' });
  const wasm = await readFile(wasmPath);
  const hash = createHash('sha256');
  for (const path of ['lib/BoopFace/src/BoopFace.h', 'lib/BoopFace/src/BoopFace.cpp', 'lib/BoopFace/src/BoopFaceGaze.h', 'lib/BoopFace/src/BoopFaceWebMotion.h', 'preview/bridge.cpp'])
    hash.update(await readFile(join(root, path)));
  const version = (await readFile(join(root, 'lib/BoopFace/library.properties'), 'utf8')).match(/^version=(.+)$/m)[1].trim();
  const out = resolve(process.argv[2]);
  await writeFile(out, `// Built by embedded/tools/build-core-data.mjs (BoopFace Embedded v${version})\nconst LIBRARY_VERSION = "${version}";\nconst WASM_BASE64 = '${wasm.toString('base64')}';\nconst CORE_SHA256 = '${hash.digest('hex')}';\n`);
  console.log(`core ${wasm.length} bytes -> ${out}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
