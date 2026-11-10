import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

test.setTimeout(60000);
const ready=page=>page.waitForFunction(()=>window.skinEditor?.renderers.every(r=>r.state));
async function front(page){await page.getByRole('button',{name:'正面',exact:true}).click();await page.waitForFunction(()=>window.skinEditor.renderers[0].state.yaw===0);}
async function recover(page){await page.waitForFunction(()=>!window.skinEditor.interactionActive);}

test('Skin Studio renders 24 original SVG skins and keeps motion nodes stable',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>{throw Error('Canvas/WebGL must not be used');};});
  await page.goto('/demo/skin-studio/');await ready(page);
  await expect(page).toHaveTitle('皮肤工坊 · Boopface');
  await expect(page.locator('#preset option')).toHaveCount(24);
  await expect(page.locator('.field')).toHaveCount(53);
  await expect(page.locator('#wire')).toBeChecked();
  await expect(page.locator('#main-preview #editor-volume-guide path')).toHaveCount(17);
  for(const skin of await page.locator('#preset option').evaluateAll(nodes=>nodes.map(n=>n.value))){
    await page.selectOption('#preset',skin);
    await page.waitForFunction(id=>window.skinEditor.renderers.every(r=>r.state.preset===id),skin);
    expect(await page.evaluate(()=>window.skinEditor.renderers.every(r=>!/(?:NaN|Infinity)/.test(r.svg.innerHTML)))).toBe(true);
  }
  const motion=await page.evaluate(()=>{
    const {settings,preset}=window.skinEditor.project,r=window.skinEditor.renderers[0],first=r.svg.querySelector('#skin-body-headShape');
    const observer=new MutationObserver(()=>{});observer.observe(r.svg,{childList:true,subtree:true});
    for(let i=0;i<24;i++)r.draw(settings,{skin:preset,emotion:'idle',yaw:Math.sin(i/6)*18,pitch:0,gazeX:Math.sin(i/6),wire:true});
    const changed=observer.takeRecords().length;observer.disconnect();
    return{changed,identity:first===r.svg.querySelector('#skin-body-headShape'),nodes:r.svg.querySelectorAll('*').length};
  });
  expect(motion.changed).toBe(0);expect(motion.identity).toBe(true);expect(motion.nodes).toBeLessThan(3500);
  expect(errors).toEqual([]);
});

test('original squeeze hands over to drag, then head and antenna can be dragged again',async({page})=>{
  await page.goto('/demo/skin-studio/');await ready(page);await front(page);
  const box=await page.locator('#main-preview').boundingBox(),x=box.x+box.width*.5,y=box.y+box.height*.52;
  await page.mouse.move(x,y);await page.mouse.down();
  await expect.poll(()=>page.evaluate(()=>window.skinEditor.interaction?.kind)).toBe('squeeze');
  await expect.poll(()=>page.locator('#main-preview #headMotion').evaluate(n=>n.style.transform)).toMatch(/scale\(0\./);
  await page.mouse.move(x+50,y,{steps:8});
  await expect.poll(()=>page.evaluate(()=>window.skinEditor.interaction?.kind)).toBe('head-drag');
  await page.mouse.up();await recover(page);
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x-45,y+10,{steps:8});
  await expect.poll(()=>page.evaluate(()=>window.skinEditor.interaction?.kind)).toBe('head-drag');
  await page.mouse.up();await recover(page);
  const dot=await page.locator('#main-preview #antennaDot').boundingBox();
  await page.mouse.move(dot.x+dot.width/2,dot.y+dot.height/2);await page.mouse.down();
  await page.mouse.move(dot.x+dot.width/2+50,dot.y+dot.height/2+20,{steps:8});
  await expect.poll(()=>page.evaluate(()=>window.skinEditor.interaction?.kind)).toBe('antenna-drag');
  await page.mouse.up();await recover(page);
  await expect(page.locator('#main-preview #headMotion')).toHaveCSS('transform','none');
});

test('saved skin JSON, static SVG and offline HTML retain the same renderer and gestures',async({page,browser,browserName},testInfo)=>{
  await page.goto('/demo/skin-studio/');await ready(page);
  await page.selectOption('#preset','black');
  await page.waitForFunction(()=>window.skinEditor.renderers[0].state.preset==='black');
  await page.uncheck('#wire');await front(page);
  await page.fill('#skin-name','导出测试');await page.click('#save-new');
  await expect(page.locator('#saved-skins button')).toHaveText('导出测试');
  const project=await page.evaluate(()=>window.skinEditor.project);
  await page.reload();await ready(page);expect(await page.evaluate(()=>window.skinEditor.project)).toEqual(project);
  const [json]=await Promise.all([page.waitForEvent('download'),page.click('#export-json')]);
  expect(JSON.parse(await readFile(await json.path(),'utf8'))).toEqual(project);
  await front(page);
  const [vector]=await Promise.all([page.waitForEvent('download'),page.click('#export-svg')]);
  const exportedSvg=await readFile(await vector.path(),'utf8');
  expect(exportedSvg).toBe(await page.evaluate(()=>window.skinEditor.renderers[0].serialize()));
  expect(exportedSvg).not.toContain('editor-volume-guide');
  const initial=await page.locator('#main-preview svg').innerHTML();
  const [html]=await Promise.all([page.waitForEvent('download'),page.click('#export-html')]);
  const destination=testInfo.outputPath('skin.html');await html.saveAs(destination);
  const offline=await browser.newContext({offline:browserName!=='webkit'});
  try{
    const output=await offline.newPage(),errors=[],requests=[];output.on('pageerror',e=>errors.push(e.message));output.on('request',r=>requests.push(r.url()));
    // WebKit's offline transport also rejects local Blob modules. Load the same
    // downloaded bytes in memory and block every request except those Blob URLs.
    if(browserName==='webkit'){
      await output.route('**/*',route=>route.request().url().startsWith('blob:')?route.continue():route.abort());
      await output.setContent(await readFile(destination,'utf8'));
    }else await output.goto(pathToFileURL(destination).href);
    await expect(output.locator('.avatar svg')).toBeVisible();
    expect(await output.locator('.avatar svg').innerHTML()).toBe(initial);
    const box=await output.locator('.avatar').boundingBox();await output.mouse.move(box.x+box.width*.5,box.y+box.height*.52);await output.mouse.down();
    await expect.poll(()=>output.locator('.avatar #headMotion').evaluate(n=>n.style.transform)).toMatch(/scale\(0\./);
    await output.mouse.up();
    expect(errors).toEqual([]);expect(requests.every(url=>url.startsWith('file:')||url.startsWith('blob:'))).toBe(true);
  }finally{await offline.close();}
});

test('Skin Studio remains usable on a phone and is linked from the skin library',async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/demo/skin-studio/');await ready(page);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.locator('#preset')).toBeVisible();
  await page.goto('/demo/skins.html');
  await expect(page.getByRole('link',{name:'皮肤工坊',exact:true}).first()).toHaveAttribute('href','./skin-studio/');
});
