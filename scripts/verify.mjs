import assert from 'node:assert/strict';
import {readdir,readFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {products,sramModels,sevaServices} from '../src/data/products.mjs';
import {handleRequest} from './serve.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const files=(await readdir(dist)).filter(f=>f.endsWith('.html') && f!=='logo-options.html');
assert.equal(files.length,14,'The complete site must contain 14 pages.');
const htmlMap=new Map(await Promise.all(files.map(async f=>[f,await readFile(path.join(dist,f),'utf8')])));
let checkedLinks=0;
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"');
for(const [file,html] of htmlMap){
  assert.match(html,/<!doctype html>/i,`${file}: HTML doctype`);
  assert.match(html,/<html lang="en">/,`${file}: document language`);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: exactly one H1`);
  assert.match(html,/<meta name="viewport"/,`${file}: responsive viewport`);
  assert.match(html,/<meta name="description" content="[^"]+"/,`${file}: description`);
  assert.match(html,/<main id="main">/,`${file}: main landmark`);
  assert.match(html,/class="skip-link"/,`${file}: skip navigation`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${file}: unique IDs`);
  for(const match of html.matchAll(/<(?:a|link|script|img)\b[^>]*\b(?:href|src)="([^"]+)"/g)){
    const ref=decode(match[1]);
    assert.ok(!/^(?:javascript|data):/i.test(ref),`${file}: unsafe reference`);
    if(/^(?:https?:|mailto:|tel:)/.test(ref))continue;
    const url=new URL(ref,'https://verify.invalid/'+file);
    const target=url.pathname.slice(1)||file;
    await access(path.join(dist,target));
    if(url.hash){const targetHTML=htmlMap.get(target);assert.ok(targetHTML?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`${file}: missing anchor ${ref}`);}
    checkedLinks++;
  }
  for(const img of html.matchAll(/<img\b[^>]*>/g))assert.match(img[0],/\balt="[^"]*"/,`${file}: image alt text`);
  assert.ok(!/https?:\/\/[^"\s>]+\.(?:css|js)/.test(html),`${file}: remote runtime dependency`);
}
for(const p of products){
  assert.ok(htmlMap.get(`product-${p.slug}.html`)?.includes(p.name),`${p.name}: dedicated page`);
  assert.ok(htmlMap.get('products.html').includes(`data-search="${p.name}`),`${p.name}: searchable directory entry`);
  assert.ok(htmlMap.get('index.html').includes(p.name),`${p.name}: on homepage`);
}
for(const m of sramModels)assert.ok(htmlMap.get('product-sram.html').includes(`id="${m.key}"`),`${m.name}: linkable section`);
for(const s of sevaServices)assert.ok(htmlMap.get('product-seva.html').includes(`<h3>${s.name}</h3>`),`${s.name}: complete service list`);
const contact=htmlMap.get('contact.html');
assert.match(contact,/<fieldset disabled>/,'Enquiry controls must not submit details without JavaScript.');
assert.match(contact,/does not send messages or confirm appointments/,'Enquiry behavior must be clearly explained.');
const clientJS=await readFile(path.join(dist,'assets/js/main.js'),'utf8');
assert.ok(!/\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage)\b/.test(clientJS),'No form network submissions or browser storage.');
for(const s of sevaServices)assert.ok(clientJS.includes(s.name),`Deep link supports ${s.name}`);
for(const cssFile of await readdir(path.join(dist,'assets/css'))){
  const css=await readFile(path.join(dist,'assets/css',cssFile),'utf8');
  for(const m of css.matchAll(/@import url\(['"]([^'"]+)['"]\)/g))await access(path.resolve(dist,'assets/css',m[1]));
}
for(const jsFile of ['public/assets/js/main.js','scripts/build.mjs','scripts/serve.mjs','scripts/create-art.mjs']){
  const result=spawnSync(process.execPath,['--check',path.join(root,jsFile)],{encoding:'utf8'});
  assert.equal(result.status,0,`${jsFile}: ${result.stderr}`);
}

// Exercise the actual request handler without starting a preview server.
async function request(url,method='GET'){
  const result={headers:{},status:0,body:null};
  await handleRequest({url,method},{writeHead(status,headers={}){result.status=status;result.headers=headers;},end(body){result.body=body;}});
  return result;
}
for(const file of files){const response=await request('/'+file);assert.equal(response.status,200,`${file}: served`);assert.equal(response.headers['Content-Type'],'text/html; charset=utf-8');}
assert.equal((await request('/')).status,200,'Root serves the homepage');
assert.equal((await request('/missing-page.html')).status,404,'Missing routes return 404');
assert.equal((await request('/product-sram.html','HEAD')).body,undefined,'HEAD has no response body');
assert.equal((await request('/','POST')).status,405,'Static server rejects writes');
assert.equal((await request('/%00')).status,400,'NUL path rejected');
assert.equal((await request('/%2e%2e%2fpackage.json')).status,403,'Encoded traversal rejected');
assert.equal((await request('/assets/css/styles.css')).headers['Content-Type'],'text/css; charset=utf-8','Stylesheet served with correct MIME');
assert.equal((await request('/assets/images/favicon.svg')).headers['Content-Type'],'image/svg+xml','SVG served with correct MIME');
console.log(`PASS: ${files.length} pages; ${checkedLinks} local links/assets/anchors; all 8 products, 6 SRAM members, and 9 Seva services.`);
console.log('PASS: document structure, enquiry privacy safeguards, JavaScript syntax, and 22 request-handler checks.');
console.log('Browser visual and interaction QA is not included in these checks.');
