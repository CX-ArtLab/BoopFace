import {attachAvatarInteractions} from './interactions.js';
import {FIELDS,DEFAULTS,PRESETS,validateSettings,validateArt,createSkinRenderer,sampleMotion,stepFollow} from './runtime.js';
const $=id=>document.getElementById(id),clone=value=>structuredClone(value);
const DRAFT='boopface.skin-editor.draft.v1',LIBRARY='boopface.skin-editor.library.v1';
const TYPE='boopface-svg-skin',VERSION=1;
let settings={...DEFAULTS},art=[],legacy=null,preset='blue',selected=null,library={},undo=[],redo=[],lastEdit='',lastEditTime=0;
let yaw=18,pitch=0,gazeX=1,gazeY=0,playing=false,following=false,time=0,lastFrame=0,dirty=true,poseDirty=true,saveTimer;
let target={x:1,y:0};const timings=[];
const controls=new Map(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const renderers=['main','front','left','right','small'].map(id=>createSkinRenderer($(id+'-preview')));
let gestureFrame=null;
const interactions=attachAvatarInteractions($('main-preview'),()=>renderers[0],{onStart(){playing=false;syncPose();},onChange(){poseDirty=true;}});
const status=message=>$('status').textContent=message;
const project=()=>({type:TYPE,version:VERSION,renderer:'svg-vector-2',name:$('skin-name').value.trim()||'未命名皮肤',preset,settings:clone(settings),art:clone(art),...(legacy?{legacy:clone(legacy)}:{})});
function validateProject(data){
  if(!data||typeof data!=='object'||Array.isArray(data)||data.type!==TYPE||data.version!==VERSION||!['svg-surface-1','svg-vector-2'].includes(data.renderer)||Object.keys(data).some(k=>!['type','version','renderer','name','preset','settings','art','legacy'].includes(k)))throw Error('不是此编辑器的 v1 皮肤文件');
  if(typeof data.name!=='string'||!data.name.trim()||data.name.length>60||!Object.hasOwn(PRESETS,data.preset)||JSON.stringify(data).length>400000)throw Error('名称、起点或文件大小无效');
  return{...data,renderer:'svg-vector-2',settings:validateSettings({...data.settings,...(data.renderer==='svg-surface-1'&&data.settings?.thickness===38?{thickness:52}:{})}),art:validateArt(data.art)};
}
function saveDraft(){clearTimeout(saveTimer);try{localStorage.setItem(DRAFT,JSON.stringify({project:project(),selected}));status('草稿已自动保存 · 仅在本机当前浏览器');}catch{status('浏览器无法保存，请导出皮肤 JSON 备份');}}
function scheduleSave(){status('正在保存草稿…');clearTimeout(saveTimer);saveTimer=setTimeout(saveDraft,250);}
function history(key=''){
  const now=performance.now();if(!key||key!==lastEdit||now-lastEditTime>700){undo.push(project());if(undo.length>60)undo.shift();}lastEdit=key;lastEditTime=now;redo=[];syncHistory();
}
function syncHistory(){$('undo').disabled=!undo.length;$('redo').disabled=!redo.length;}
function apply(data,{remember=true}={}){
  const checked=validateProject(data);settings=checked.settings;art=checked.art;legacy=checked.legacy||null;preset=checked.preset;$('skin-name').value=checked.name;$('preset').value=preset;
  syncControls();dirty=true;if(remember)scheduleSave();
}
function syncControls(){
  const start={...DEFAULTS,...PRESETS[preset].settings};
  for(const f of FIELDS){const c=controls.get(f.key),v=settings[f.key];c.input.value=v;if(c.number&&document.activeElement!==c.number)c.number.value=v;c.row.classList.toggle('changed',v!==start[f.key]);c.reset.disabled=v===start[f.key];}
  $('art-status').textContent=art.length?`${art.length} 个矢量形状 · 随表面转动`:'尚未添加自定义图案';$('clear-art').disabled=!art.length;
}
for(const [id,p]of Object.entries(PRESETS))$('preset').add(new Option(p.label,id));
const groups=new Map();
for(const f of FIELDS){
  if(!groups.has(f.group)){const details=document.createElement('details'),summary=document.createElement('summary'),body=document.createElement('div');details.dataset.group=f.group;details.open=['形体与立体','底色与渐变'].includes(f.group);summary.textContent=f.group;body.className='param-body';details.append(summary,body);$('parameter-groups').append(details);groups.set(f.group,body);}
  const row=document.createElement('div');row.className='field';row.dataset.key=f.key;
  const top=document.createElement('div');top.className='field-top';const label=document.createElement('label');label.htmlFor='field-'+f.key;label.textContent=f.label;
  const reset=document.createElement('button');reset.textContent='↺';reset.title='恢复此项';reset.setAttribute('aria-label','恢复'+f.label);
  let input,number;
  if(f.type==='select'){input=document.createElement('select');for(const [value,label]of f.options)input.add(new Option(label,value));}
  else{input=document.createElement('input');input.type=f.type==='color'?'color':'range';if(f.type==='range'){Object.assign(input,{min:f.min,max:f.max,step:f.step});number=document.createElement('input');Object.assign(number,{type:'number',min:f.min,max:f.max,step:f.step});number.setAttribute('aria-label',f.label+'数值');}}
  input.id='field-'+f.key;input.setAttribute('aria-label',f.label);top.append(label);if(number)top.append(number);if(f.type==='color')top.append(input);top.append(reset);row.append(top);if(f.type!=='color')row.append(input);
  const set=value=>{history(f.key);settings[f.key]=value;dirty=true;syncControls();scheduleSave();};
  input.oninput=()=>set(f.type==='range'?Number(input.value):input.value);
  if(number){number.oninput=()=>{const value=number.valueAsNumber;if(Number.isFinite(value)&&value>=f.min&&value<=f.max)set(value);};number.onblur=()=>{const value=number.valueAsNumber;if(Number.isFinite(value)){const next=Math.max(f.min,Math.min(f.max,value));if(next!==settings[f.key])set(next);}number.value=settings[f.key];};}
  reset.onclick=()=>{lastEdit='';set(({...DEFAULTS,...PRESETS[preset].settings})[f.key]);};groups.get(f.group).append(row);controls.set(f.key,{row,input,number,reset});
}
$('preset').onchange=()=>{history();preset=$('preset').value;settings={...DEFAULTS,...PRESETS[preset].settings};art=[];legacy=null;selected=null;$('skin-name').value='我的'+PRESETS[preset].label;syncControls();renderLibrary();dirty=true;scheduleSave();};
$('reset-all').onclick=()=>{history();settings={...DEFAULTS,...PRESETS[preset].settings};art=[];legacy=null;syncControls();dirty=true;scheduleSave();};
$('skin-name').onchange=()=>scheduleSave();
$('undo').onclick=()=>{if(!undo.length)return;redo.push(project());apply(undo.pop());lastEdit='';syncHistory();};
$('redo').onclick=()=>{if(!redo.length)return;undo.push(project());apply(redo.pop());lastEdit='';syncHistory();};
document.addEventListener('keydown',event=>{if(event.target.closest('input,select,textarea'))return;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'){event.preventDefault();$(event.shiftKey?'redo':'undo').click();}else if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='y'){event.preventDefault();$('redo').click();}});
function renderLibrary(){
  $('saved-skins').replaceChildren();for(const [id,item]of Object.entries(library)){const button=document.createElement('button');button.textContent=item.name;button.setAttribute('aria-pressed',String(id===selected));button.onclick=()=>{history();selected=id;apply(item);renderLibrary();};$('saved-skins').append(button);}
  if(!Object.keys(library).length){const p=document.createElement('p');p.textContent='还没有保存的皮肤。先调一款，再另存。';$('saved-skins').append(p);}$('save-current').disabled=!selected||!library[selected];
}
function saveSkin(fresh){
  if(fresh||!selected)selected=crypto.randomUUID();const checked=validateProject(project()),next={...library,[selected]:checked};
  try{localStorage.setItem(LIBRARY,JSON.stringify(next));library=next;saveDraft();renderLibrary();status('已保存「'+checked.name+'」；可导出 JSON 备份。');}catch{status('保存失败，请导出皮肤 JSON 备份');}
}
$('save-new').onclick=()=>saveSkin(true);$('save-current').onclick=()=>saveSkin(false);
try{for(const key of [DRAFT,LIBRARY]){const old=localStorage.getItem(key);if(old&&old.includes('svg-surface-1')&&!localStorage.getItem(key+'.before-vector-v2'))localStorage.setItem(key+'.before-vector-v2',old);}}catch{}
try{const saved=JSON.parse(localStorage.getItem(LIBRARY)||'{}');if(!saved||typeof saved!=='object'||Array.isArray(saved))throw Error('方案库格式不正确');for(const [id,item]of Object.entries(saved))library[id]=validateProject(item);}catch{status('方案库读取失败；原存储仍保留，可导入 JSON 恢复');}
try{const draft=JSON.parse(localStorage.getItem(DRAFT)||'null');if(draft){apply(draft.project,{remember:false});selected=typeof draft.selected==='string'?draft.selected:null;}}catch{status('草稿读取失败；使用默认起点，原存储仍保留');}
try{$('wire').checked=localStorage.getItem('boopface.skin-editor.guides.v2')!=='false';}catch{}
syncControls();renderLibrary();syncHistory();

function syncPose(){$('yaw').value=yaw;$('pitch').value=pitch;$('yaw-value').textContent=yaw.toFixed(0)+'°';$('pitch-value').textContent=pitch.toFixed(0)+'°';$('timeline').value=time;$('clock').textContent=(time/1000).toFixed(2)+' / 12 s';$('play').textContent=playing?'Ⅱ 暂停巡览':'▶ 转头巡览';$('follow').checked=following;}
function stop(){playing=false;following=false;if(interactions.active)interactions.cancel();gestureFrame=null;syncPose();}
function setPose(x,y){stop();yaw=x;pitch=y;gazeX=Math.max(-1,Math.min(1,x/18));gazeY=Math.max(-1,Math.min(1,-y/11.7));syncPose();poseDirty=true;}
for(const [label,x,y]of [['正面',0,0],['向左',-18,0],['向右',18,0],['抬头',0,11.7],['低头',0,-11.7],['斜上',15.3,9.945]]){const b=document.createElement('button');b.textContent=label;b.onclick=()=>setPose(x,y);$('pose-presets').append(b);}
$('yaw').oninput=()=>setPose(Number($('yaw').value),pitch);$('pitch').oninput=()=>setPose(yaw,Number($('pitch').value));
$('emotion').onchange=()=>{dirty=true;};$('wire').onchange=()=>{poseDirty=true;try{localStorage.setItem('boopface.skin-editor.guides.v2',String($('wire').checked));}catch{}};
$('play').onclick=()=>{following=false;playing=!playing;lastFrame=0;syncPose();};
$('follow').onchange=()=>{following=$('follow').checked;target={x:gazeX,y:gazeY};playing=false;syncPose();};
function sample(ms){return sampleMotion(ms);}
function applyMotion(p){yaw=p.yaw;pitch=p.pitch;gazeX=p.gazeX;gazeY=p.gazeY;}
$('timeline').oninput=()=>{const nextTime=Number($('timeline').value);stop();time=nextTime;applyMotion(sample(time));syncPose();poseDirty=true;};
$('preview-wrap').addEventListener('pointermove',event=>{if(!following)return;const box=$('main-preview').getBoundingClientRect(),x=(event.clientX-box.left-box.width/2)/Math.max(80,box.width*.6),y=(event.clientY-box.top-box.height*.525)/Math.max(80,box.height*.6),m=Math.hypot(x,y),k=m?Math.tanh(m)/m:0;target={x:x*k,y:y*k};},{passive:true});
$('preview-wrap').addEventListener('pointerleave',()=>{if(following)target={x:0,y:0};},{passive:true});
function mainPose(){return{...(gestureFrame?{interaction:gestureFrame}:{}),yaw,pitch,gazeX,gazeY,emotion:$('emotion').value,wire:$('wire').checked,skin:preset};}
function requestMain(){const start=performance.now();renderers[0].draw(settings,mainPose(),art);timings.push(performance.now()-start);if(timings.length>240)timings.shift();poseDirty=false;}
function renderAll(){requestMain();for(const [i,angle]of [[1,0],[2,-18],[3,18],[4,0]])renderers[i].draw(settings,{yaw:angle,pitch:0,gazeX:angle/18,gazeY:0,emotion:$('emotion').value,wire:false,skin:preset},art);dirty=false;}
let raf=0,lastRender=0;
function frame(now){const elapsed=lastFrame?Math.min(50,now-lastFrame):0;lastFrame=now;
  if(!document.hidden){
    const fx=interactions.step(now,settings.roundness);if(fx){gestureFrame=fx.finished?null:fx;poseDirty=true;}else if(!interactions.active&&gestureFrame){gestureFrame=null;poseDirty=true;}
    if(!interactions.active&&playing){time=(time+elapsed*Number($('speed').value))%12000;applyMotion(sample(time));poseDirty=true;}
    else if(!interactions.active&&following){const next=stepFollow(mainPose(),target,elapsed),distance=Math.abs(next.yaw-yaw)+Math.abs(next.pitch-pitch)+Math.abs(next.gazeX-gazeX)+Math.abs(next.gazeY-gazeY);if(distance>.0002){applyMotion(next);poseDirty=true;}}
    if(dirty)renderAll();else if(poseDirty)requestMain();
    if(playing||following)syncPose();
  }
  raf=requestAnimationFrame(frame);
}
reduced.addEventListener('change',()=>{stop();});document.addEventListener('visibilitychange',()=>{lastFrame=0;});
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);saveDraft();});window.addEventListener('pageshow',e=>{if(e.persisted){lastFrame=0;raf=requestAnimationFrame(frame);}});
syncPose();raf=requestAnimationFrame(frame);

function download(text,name,type){const url=URL.createObjectURL(new Blob([text],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
const filename=()=>($('skin-name').value.trim()||'boopface-skin').replace(/[<>:"/\\|?*\u0000-\u001f]/g,'-');
$('export-json').onclick=()=>{download(JSON.stringify(project(),null,2),filename()+'.json','application/json');status('已导出完整皮肤数据，包括自定义图案；可重新导入继续调。');};
$('export-svg').onclick=()=>{requestMain();download(renderers[0].serialize(),filename()+'.svg','image/svg+xml');status('已导出当前姿态的原生 SVG。');};
$('export-html').onclick=async()=>{
  try{
    const [response,packResponse]=await Promise.all([fetch('./runtime.js'),fetch('./interaction-sources.json')]);if(!response.ok||!packResponse.ok)throw Error('绘制或交互代码读取失败');
    let source=await response.text();const match=source.match(/^const CANONICAL = (.*);$/m),paints=JSON.parse(match[1]);
    source=source.replace(match[0],'const CANONICAL = '+JSON.stringify({[preset]:paints[preset]})+';');
    const code=source.replace(/^export /gm,''),data=JSON.stringify(project()).replace(/</g,'\\u003c'),sources=JSON.stringify(await packResponse.json()).replace(/</g,'\\u003c'),initial={...mainPose(),wire:false};delete initial.interaction;
    const loader=`const SOURCES=${sources},moduleCache=new Map();async function packaged(id){if(moduleCache.has(id))return moduleCache.get(id);const promise=(async()=>{let code=SOURCES[id];if(!code)throw Error('Missing interaction module: '+id);const pattern=/((?:\\bfrom\\s*|\\bimport\\s*(?:\\(\\s*)?))(['"])(\\.{1,2}\\/[^'"]+\\.js)\\2/g;const matches=[...code.matchAll(pattern)];for(const match of matches.reverse()){const resolved=new URL(match[3],'https://local.invalid/'+id).pathname.slice(1),url=await packaged(resolved),offset=match.index+match[1].length;code=code.slice(0,offset)+JSON.stringify(url)+code.slice(offset+match[3].length+2);}return URL.createObjectURL(new Blob([code],{type:'text/javascript'}));})();moduleCache.set(id,promise);return promise;}const {attachAvatarInteractions}=await import(await packaged('demo/skin-studio/interactions.js'));`;
    const controller=`const data=${data},initial=${JSON.stringify(initial)};document.querySelector('h1').textContent=data.name;const host=document.querySelector('.avatar'),renderer=createSkinRenderer(host),settings=validateSettings(data.settings),art=validateArt(data.art);let pose=initial,playing=false,following=false,target={x:pose.gazeX,y:pose.gazeY},time=0,last=0,dirty=true;const interactions=attachAvatarInteractions(host,()=>renderer,{onStart(){playing=false;document.getElementById('turn').textContent='▶ 转头';},onChange(){dirty=true;}});function draw(){renderer.draw(settings,pose,art);dirty=false;}draw();document.getElementById('turn').onclick=()=>{interactions.cancel();delete pose.interaction;playing=!playing;following=false;document.getElementById('turn').textContent=playing?'Ⅱ 暂停':'▶ 转头';};document.getElementById('front').onclick=()=>{interactions.cancel();playing=false;following=false;pose={...pose,yaw:0,pitch:0,gazeX:0,gazeY:0};delete pose.interaction;document.getElementById('turn').textContent='▶ 转头';draw();};host.onpointermove=e=>{if(playing)return;const b=host.getBoundingClientRect(),x=(e.clientX-b.left-b.width/2)/Math.max(80,b.width*.6),y=(e.clientY-b.top-b.height*.525)/Math.max(80,b.height*.6),m=Math.hypot(x,y),k=m?Math.tanh(m)/m:0;target={x:x*k,y:y*k};following=true;};host.onpointerleave=()=>{target={x:0,y:0};};function frame(now){const dt=last?Math.min(50,now-last):0;last=now;if(!document.hidden){const fx=interactions.step(now,settings.roundness);if(fx){if(fx.finished)delete pose.interaction;else pose.interaction=fx;dirty=true;}else if(!interactions.active&&pose.interaction){delete pose.interaction;dirty=true;}if(!interactions.active&&playing){time=(time+dt)%12000;pose={...pose,...sampleMotion(time)};dirty=true;}else if(!interactions.active&&following){const next=stepFollow(pose,target,dt),distance=Math.abs(next.yaw-pose.yaw)+Math.abs(next.pitch-pose.pitch)+Math.abs(next.gazeX-pose.gazeX)+Math.abs(next.gazeY-pose.gazeY);if(distance>.0002){pose={...pose,...next};dirty=true;}}if(dirty)draw();}requestAnimationFrame(frame);}requestAnimationFrame(frame);`;
    const html=`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Boopface 自定义皮肤</title><style>body{margin:0;background:#f5f6f1;color:#3c5848;font:14px system-ui;display:grid;place-content:center;min-height:100vh;text-align:center}.avatar{width:min(80vw,420px);aspect-ratio:1}button{border:1px solid #cbd7c5;background:white;border-radius:8px;padding:9px 16px;color:inherit;cursor:pointer}p{font-size:12px;color:#87947e}</style><h1></h1><div class="avatar"></div><div><button id="turn">▶ 转头</button> <button id="front">正面</button></div><p>拖天线 · 按住挤压 · 移动拖拽 · 纯 SVG，可离线打开</p><script type="module">\n${code}\n${loader}\n${controller}\n<\/script></html>`;
    download(html,filename()+'.html','text/html');status('已导出独立 HTML：相同皮肤与原组件交互，可离线拖天线、挤压、拖拽和转头。');
  }catch(error){status('HTML 导出失败：'+error.message);}
};
function migrateOld(data){
  let raw=data?.tune||data?.values||data;if(!raw||typeof raw!=='object'||Array.isArray(raw)||(!Array.isArray(raw.colors)&&typeof raw.color1!=='string'&&typeof raw.flesh1!=='string'&&typeof raw.baseColor!=='string'))throw Error('未识别的旧参数；请选择此编辑器JSON或旧调参器的完整参数');
  const result={...DEFAULTS},mapped=new Set();const set=(from,to,transform=v=>v)=>{if(Object.hasOwn(raw,from)){if(raw[from]===''&&FIELDS.find(f=>f.key===to)?.type==='color')return;result[to]=transform(raw[from]);mapped.add(from);}};
  if(raw.colors){if(raw.colors.length!==4||raw.colors.some(c=>!/^#[0-9a-f]{6}$/i.test(c)))throw Error('旧参数配色无效');[result.topColor,result.midColor,,result.bottomColor]=raw.colors;mapped.add('colors');}
  for(const [from,to]of [['color1','topColor'],['color2','midColor'],['color4','bottomColor'],['flesh1','topColor'],['flesh2','midColor'],['flesh4','bottomColor'],['baseColor','bottomColor'],['bodyColor','midColor'],['bodyEndColor','bottomColor'],['eye','eyeColor'],['eyeColor','eyeColor'],['antenna2','antennaColor'],['antennaMid','antennaColor'],['antenna1','antennaLight'],['mainColor','highlightColor'],['reflectionColor','reflectionColor'],['sideColor','sideColor'],['gradient','gradient'],['angle','gradientAngle'],['bodyGradientAngle','gradientAngle'],['shine','highlight'],['shade','shade'],['faceGlow','highlight'],['glintFollow','highlightX'],['mainOpacity','highlight'],['reflectionOpacity','reflection'],['sideOpacity','sideOpacity'],['lineFollow','rim']]){
    if(['glintFollow','lineFollow'].includes(from))continue;
    set(from,to,v=>['mainOpacity','reflectionOpacity'].includes(from)?Number(v)/100:v);
  }
  if(result.gradient==='auto')result.gradient='linear';
  set('depth','shade',v=>Math.max(0,Math.min(.9,Number(v)))); // Old acrylic depth is darkness, never shell thickness.
  set('sideThickness','thickness',v=>Math.max(4,Math.min(65,12+Number(v)*1.6)));
  set('glintWidth','highlightSize',v=>Math.max(.04,Math.min(.8,Number(v)/30)));
  set('weaveSize','patternScale',v=>Math.max(.5,Math.min(3,Number(v)/8)));
  if(Object.hasOwn(raw,'weaveSize')){result.pattern='weave';set('weaveLight','patternColor');set('weaveLightOpacity','patternOpacity');}
  validateSettings(result);
  const original=clone(data),count=Object.keys(raw).filter(k=>!mapped.has(k)).length;
  return{data:{type:TYPE,version:VERSION,renderer:'svg-surface-1',name:'旧方案迁移',preset:'blue',settings:result,art:[],legacy:{original,mapped:[...mapped],unmappedCount:count}},message:`已迁移 ${mapped.size} 项旧参数；其余 ${count} 项原值随JSON保留。外观需重新检查，旧depth已按边缘暗度处理。`};
}
$('import-json').onchange=async()=>{try{const file=$('import-json').files[0];if(!file)return;if(file.size>400000)throw Error('参数文件超过400 KB');const input=JSON.parse(await file.text());let next,message='已导入完整皮肤；可继续编辑。';if(input?.type===TYPE)next=validateProject(input);else{const converted=migrateOld(input);next=validateProject(converted.data);message=converted.message;}history();selected=null;apply(next);renderLibrary();saveDraft();status(message);}catch(error){status('导入失败：'+error.message);}finally{$('import-json').value='';}};

async function readSvg(file){
  if(file.size>200000)throw Error('SVG 图案超过200 KB');const documentSvg=new DOMParser().parseFromString(await file.text(),'image/svg+xml');if(documentSvg.querySelector('parsererror')||documentSvg.documentElement.localName!=='svg')throw Error('SVG 格式不正确');
  const allowed=new Set(['svg','g','path','rect','circle','ellipse','polygon','polyline','line','title','desc']);
  for(const node of documentSvg.querySelectorAll('*')){if(!allowed.has(node.localName))throw Error('请使用纯色矢量形状；暂不支持 '+node.localName);if([...node.attributes].some(a=>/^on/i.test(a.name)||/href/i.test(a.name)))throw Error('图案含有不支持的事件或外部引用');}
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',documentSvg.documentElement.getAttribute('viewBox')||`0 0 ${parseFloat(documentSvg.documentElement.getAttribute('width'))||240} ${parseFloat(documentSvg.documentElement.getAttribute('height'))||240}`);svg.setAttribute('width','240');svg.setAttribute('height','240');svg.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden';
  const attributes=new Set(['d','x','y','width','height','rx','ry','r','cx','cy','x1','y1','x2','y2','points','transform','fill','stroke','stroke-width','opacity','fill-opacity','stroke-opacity']);
  const copy=(original,parent)=>{if(['title','desc'].includes(original.localName))return;const node=document.createElementNS(ns,original.localName==='svg'?'g':original.localName);for(const attr of original.attributes)if(attributes.has(attr.name))node.setAttribute(attr.name,attr.value);for(const property of ['fill','stroke','stroke-width','opacity','fill-opacity','stroke-opacity']){const value=original.style.getPropertyValue(property);if(value)node.style.setProperty(property,value);}parent.append(node);for(const child of original.children)copy(child,node);};copy(documentSvg.documentElement,svg);document.body.append(svg);
  try{
    const shapes=[];for(const node of svg.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line')){
      if(shapes.length>=40)throw Error('图案最多40个形状');if(node.localName==='path'&&(node.getAttribute('d')?.match(/[mM]/g)||[]).length>1)throw Error('请将含多个子路径的图形拆分成独立路径');
      const length=node.getTotalLength(),count=Math.max(24,Math.min(200,Math.ceil(length/3)));if(!Number.isFinite(length)||length<=0)continue;
      const matrix=node.getCTM(),style=getComputedStyle(node),asColor=value=>{if(value==='none')return value;const match=value.match(/^rgba?\(\s*(\d+)[, ]+\s*(\d+)[, ]+\s*(\d+)/);if(!match)throw Error('图案只支持纯色填充和描边');return '#'+match.slice(1,4).map(v=>Number(v).toString(16).padStart(2,'0')).join('');};
      const points=Array.from({length:count},(_,i)=>{const p=node.getPointAtLength(length*i/(count-1)),q=new DOMPoint(p.x,p.y).matrixTransform(matrix);return[+(q.x-120).toFixed(4),+(q.y-120).toFixed(4)];});
      const closed=['circle','ellipse','rect','polygon'].includes(node.localName)||/z\s*$/i.test(node.getAttribute('d')||'');
      shapes.push({points,closed,fill:closed?asColor(style.fill):'none',stroke:asColor(style.stroke),width:Math.max(0,Math.min(30,parseFloat(style.strokeWidth)*Math.sqrt(Math.abs(matrix.a*matrix.d-matrix.b*matrix.c)))),opacity:Math.max(0,Math.min(1,Number(style.opacity)))});
    }
    if(!shapes.length)throw Error('未找到可绘制的形状');return validateArt(shapes);
  }finally{svg.remove();}
}
$('import-art').onchange=async()=>{try{const file=$('import-art').files[0];if(!file)return;const shapes=await readSvg(file);history();art=shapes;syncControls();dirty=true;saveDraft();status('已导入矢量图案；可在底纹分组调整缩放、位置和浓度。');}catch(error){status('图案导入失败：'+error.message);}finally{$('import-art').value='';}};
$('clear-art').onclick=()=>{history();art=[];syncControls();dirty=true;scheduleSave();};
// Deterministic read-only state and seek hook for local verification.
window.skinEditor={get project(){return project();},get renderers(){return renderers;},get pose(){return mainPose();},get interaction(){return interactions.state;},get interactionActive(){return interactions.active;},get performance(){return{samples:timings.length,average:timings.reduce((a,b)=>a+b,0)/(timings.length||1),max:Math.max(0,...timings)};},seek(ms){stop();time=Math.max(0,Math.min(12000,ms));applyMotion(sample(time));syncPose();renderAll();}};
