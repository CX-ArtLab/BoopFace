// Portable snapshot for portable HTML. The editor imports these same modules.
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const workspace=fileURLToPath(new URL('../',import.meta.url)),sources={};
const pattern=/((?:\bfrom\s*|\bimport\s*(?:\(\s*)?))(['"])(\.{1,2}\/[^'"]+\.js)\2/g;
async function collect(id){
  if(sources[id])return;const source=(await readFile(path.join(workspace,id),'utf8')).replace(/\r\n/g,'\n');sources[id]=source;
  for(const match of source.matchAll(pattern)){
    const target=path.posix.normalize(path.posix.join(path.posix.dirname(id),match[3]));
    if(target.startsWith('../'))throw Error('Dependency escaped workspace');await collect(target);
  }
}
await collect('demo/skin-studio/interactions.js');
await writeFile(new URL('../demo/skin-studio/interaction-sources.json',import.meta.url),JSON.stringify(sources));
console.log(`Saved ${Object.keys(sources).length} original interaction modules for the Skin Studio.`);
