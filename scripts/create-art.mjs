/* Original procedural vector artwork; regenerates the editable local SVG. */
import {writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dir=path.join(root,'public/assets/images');
await mkdir(dir,{recursive:true});
const point=(u,v)=>{
  const radius=147+65*Math.cos(v);
  let x=radius*Math.cos(u),y=radius*Math.sin(u),z=65*Math.sin(v);
  const a=1.03,b=-.55;
  [y,z]=[y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)];
  [x,y]=[x*Math.cos(b)-y*Math.sin(b),x*Math.sin(b)+y*Math.cos(b)];
  return {x:320+x,y:300+y,z};
};
const faces=[];const U=144,V=48;
for(let i=0;i<U;i++)for(let j=0;j<V;j++){
  const u=i/U*Math.PI*2,v=j/V*Math.PI*2;
  const p=[point(u,v),point(u+2*Math.PI/U,v),point(u+2*Math.PI/U,v+2*Math.PI/V),point(u,v+2*Math.PI/V)];
  const shade=Math.max(.12,Math.min(.93,.5+.27*Math.sin(v+.5)+.2*Math.cos(u+1.5)));
  const r=Math.round(12+135*shade),g=Math.round(33+148*shade),b=Math.round(156+90*shade);
  faces.push({z:p.reduce((s,a)=>s+a.z,0)/4,svg:`<path d="M${p.map(a=>`${a.x.toFixed(2)},${a.y.toFixed(2)}`).join('L')}Z" fill="rgb(${r},${g},${b})" stroke="${i%4===0?'#ccd5ff':'rgb('+r+','+g+','+b+')'}" stroke-width="${i%4===0?.55:.8}" stroke-opacity="${i%4===0?.52:1}"/>`});
}
faces.sort((a,b)=>a.z-b.z);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><defs><filter id="blur"><feGaussianBlur stdDeviation="17"/></filter><radialGradient id="halo"><stop stop-color="#c5d0ff" stop-opacity=".6"/><stop offset="1" stop-color="#c5d0ff" stop-opacity="0"/></radialGradient></defs><ellipse cx="330" cy="465" rx="165" ry="23" fill="#3458aa" opacity=".2" filter="url(#blur)"/><circle cx="320" cy="310" r="260" fill="url(#halo)"/>${faces.map(f=>f.svg).join('')}<ellipse cx="320" cy="315" rx="257" ry="115" fill="none" stroke="#6d85c8" stroke-opacity=".25" stroke-width=".8" transform="rotate(-34 320 315)"/><circle cx="102" cy="433" r="4" fill="#6383df"/><circle cx="536" cy="204" r="3" fill="#8ba3ed"/></svg>`;
await writeFile(path.join(dir,'intelligence-orb.svg'),svg);
await writeFile(path.join(dir,'favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#3458ed"/><path d="M13 9h8l11 15-11 15h-8l11-15L13 9Z" fill="#fff"/><path d="M27 9h8L24 24l11 15h-8L16 24 27 9Z" fill="#fff" opacity=".55"/></svg>');
console.log('Created original SVG hero artwork and favicon.');
