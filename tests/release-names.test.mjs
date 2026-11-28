// Guards against names left over from before the project was renamed (the embedded library was once
// "AgentRobotEyes", released under eyes-v tags). Old names may only live in changelogs and in the note
// that 0.1.0 and 0.2.0 were tagged eyes-v.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const read = file => readFileSync(path.join(root, file), 'utf8');
const files = dir => readdirSync(path.join(root, dir)).flatMap(name => {
  const rel = path.join(dir, name);
  return statSync(path.join(root, rel)).isDirectory() ? files(rel) : [rel];
});

test('the Arduino library keeps the name it is registered under', () => {
  const props = read('embedded/lib/BoopFace/library.properties');
  assert.match(props, /^name=BoopFace Embedded$/m, 'Arduino Library Manager knows it as "BoopFace Embedded"; a new name is a new library');
  const version = props.match(/^version=(.+)$/m)[1];
  assert.equal(JSON.parse(read('embedded/lib/BoopFace/library.json')).version, version);
  assert.match(read('embedded/lib/BoopFace/src/BoopFace.h'), new RegExp(`version\\(\\) \\{ return "${version.replace(/\./g, '\\.')}"; \\}`));
});

test('embedded releases use embedded-v tags and can never start the npm publish', () => {
  const npm = read('.github/workflows/publish-npm.yml');
  assert.match(npm, /startsWith\(inputs\.tag \|\| github\.event\.release\.tag_name, 'v'\)/, 'npm only publishes v… tags');
  assert.ok(!'embedded-v0.2.1'.startsWith('v'));
  assert.match(read('.github/workflows/publish-embedded.yml'), /startsWith\(inputs\.tag \|\| github\.event\.release\.tag_name, 'embedded-v'\)/);
  assert.match(read('embedded/tools/package-release.mjs'), /`embedded-v\$\{version\}`/);
});

test('no old names in release setup and docs', () => {
  const scanned = ['.github/workflows', 'embedded/tools', 'scripts'].flatMap(files)
    .concat(['README.md', 'RELEASING.md', 'embedded/preview/README.md'], files('docs'), readdirSync(path.join(root, 'embedded')).filter(n => /^README.*\.md$/.test(n)).map(n => path.join('embedded', n)))
    .filter(file => /\.(md|mjs|js|yml|sh)$/.test(file) && !/CHANGELOG/.test(file));
  for (const file of scanned) {
    const text = read(file).replace(/0\.1\.0 and 0\.2\.0 were eyes-v0\.1\.0 and eyes-v0\.2\.0|eyes-v\* up to 0\.2\.0/g, '');
    assert.doesNotMatch(text, /eyes-v\d|AgentRobotEyes/, `${file} still uses an old name`);
  }
});
