// Capture the unwrapped move method, then load the real gesture/runtime extensions.
// The detached source never starts its own RAF or global pointer listeners.
import Core from '../../src/boopface-core.js';
const moveCore=Core.prototype._onDragMove;
await import('../../boopface.js');

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const numbers=text=>(text?.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[]).map(Number);
export function attachAvatarInteractions(host,getRenderer,{onStart=()=>{},onChange=()=>{}}={}){
  const source=new Core();source.setAttribute('auto-sleep','0');source.setPointerFollow(false);source.setHeadRoundness(50);source._draw(performance.now());
  let roundness=50,engaged=false,returnUntil=0,last=0,frame=null,revision=0;
  source.getBoundingClientRect=()=>host.getBoundingClientRect();
  source.setPointerCapture=id=>host.setPointerCapture(id);
  source.releasePointerCapture=id=>{if(host.hasPointerCapture(id))host.releasePointerCapture(id);};
  source.hasPointerCapture=id=>host.hasPointerCapture(id);
  source._antennaDot.getBoundingClientRect=()=>getRenderer()?.svg?.querySelector('#antennaDot')?.getBoundingClientRect()||host.getBoundingClientRect();
  host.style.touchAction='none';host.style.userSelect='none';host.style.cursor='grab';
  const active=()=>!!(source._gestureFx||source._dragJelly.active||source._dragJelly.returning||engaged&&performance.now()<returnUntil);
  function cancel(){source._cancelGesture?.(true);source._onDragEnd({type:'pointercancel',pointerId:source._dragJelly.pointerId});source.reset();source._headMotion.style.transform='';source._dragMotion.style.transform='';engaged=false;returnUntil=0;frame=null;revision++;host.style.cursor='grab';onChange();}
  function hit(event){
    const svg=getRenderer()?.svg,dot=svg?.querySelector('#antennaDot'),body=svg?.querySelector('#editor-volume');if(!svg||!body)return false;
    const box=dot.getBoundingClientRect(),radius=Math.max(10,box.width/2+3);
    if(Math.hypot(event.clientX-box.left-box.width/2,event.clientY-box.top-box.height/2)<=radius)return true;
    const matrix=body.getScreenCTM();if(!matrix)return false;const p=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());return body.isPointInFill(p);
  }
  function down(event){
    if(event.button!==0||event.isPrimary===false||!hit(event))return;
    event.preventDefault();if(active())cancel();source.reset();source._look={x:0,y:0};source._blink=1;source._draw(performance.now());
    source._onDragStart(event);engaged=!!(source._gestureFx||source._dragJelly.active);returnUntil=Infinity;last=performance.now();host.style.cursor='grabbing';onStart();onChange();
  }
  function move(event){if(!engaged)return;source._onDragMove(event);onChange();}
  function up(event){if(!engaged)return;source._onDragEnd(event);returnUntil=performance.now()+1800;host.style.cursor='grab';onChange();}
  function lost(event){if(source._gestureFx?.held||source._dragJelly.active)up({...event,type:'pointercancel',pointerId:event.pointerId});}
  host.addEventListener('pointerdown',down);host.addEventListener('pointermove',move);host.addEventListener('pointerup',up);host.addEventListener('pointercancel',up);host.addEventListener('lostpointercapture',lost);
  const hide=()=>{if(document.hidden)cancel();};document.addEventListener('visibilitychange',hide);window.addEventListener('blur',cancel);
  return{
    get active(){return active();},get held(){return !!(source._gestureFx?.held||source._dragJelly.active);},get state(){return frame;},
    step(now,value){
      if(value!==roundness){if(active())cancel();source.setHeadRoundness(value);roundness=value;}
      if(!active()){if(engaged){cancel();return{revision:++revision,finished:true};}return null;}
      const dt=Math.min(34,Math.max(0,now-(last||now)));last=now;
      const pending=source._pendingDragEvent;source._pendingDragEvent=null;if(pending&&source._dragJelly.active)moveCore.call(source,pending);
      source._updateMorph(now);source._blink=1;
      const fx=source._gestureFx;if(fx?.kind==='antenna-drag'&&fx.held){source._look.x+=(fx.gazeX-source._look.x)*.42;source._look.y+=(fx.gazeY-source._look.y)*.42;}else source._look={x:0,y:0};
      source._updateDragJelly(dt);source._draw(now);
      const j=source._dragJelly,s=source._gestureFx;
      let deform=null;
      if(s?.kind==='antenna-drag'){const x=clamp(s.hx,-25,25),y=clamp(s.hy,-25,25);deform={x,y,hotX:s.home.x,hotY:clamp(s.home.y,20,220),radius:(50+Math.hypot(x,y)*.8)*.92};}
      else if(j.active||j.returning)deform={x:j.pullX,y:j.pullY,hotX:j.hotX,hotY:j.hotY,radius:(50+Math.hypot(j.pullX,j.pullY)*.8)*.92};
      const root=source.shadowRoot,eyePose=['left','right'].map(side=>{const eye=root.getElementById(side+'Eye'),base=root.getElementById(side+'Base');return{transform:eye.getAttribute('transform'),rx:Number(base.getAttribute('rx')),ry:Number(base.getAttribute('ry')),cy:Number(base.getAttribute('cy')||0),lids:['Top','Bottom'].map(end=>{const n=root.getElementById(side+end);return{y:Number(n.getAttribute('y')),height:Number(n.getAttribute('height')),transform:n.getAttribute('transform')};})};});
      const dot=source._antennaDot,scale=dot.getAttribute('transform')?.match(/scale\(([^)]+)\)/)?.[1];
      frame={revision:++revision,kind:s?.kind||(j.active?'head-drag':j.returning?'head-return':'settling'),deform,eyePose,headTransform:source._headMotion.style.transform,dragTransform:source._dragMotion.style.transform,dragOrigin:source._dragMotion.style.transformOrigin,antenna:[Number(dot.getAttribute('cx'))-120,Number(dot.getAttribute('cy'))-12],antennaScale:scale?numbers(scale):null,held:!!(s?.held||j.active)};
      return frame;
    },
    cancel,
    dispose(){cancel();host.removeEventListener('pointerdown',down);host.removeEventListener('pointermove',move);host.removeEventListener('pointerup',up);host.removeEventListener('pointercancel',up);host.removeEventListener('lostpointercapture',lost);document.removeEventListener('visibilitychange',hide);window.removeEventListener('blur',cancel);source._teardownRuntime?.();}
  };
}
