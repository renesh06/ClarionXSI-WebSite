import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {layout} from '../src/templates/layout.mjs';
import {products} from '../src/data/products.mjs';
import {homePage} from '../src/pages/home.mjs';
import {productsPage} from '../src/pages/products.mjs';
import {productPage} from '../src/pages/product.mjs';
import {aboutPage} from '../src/pages/about.mjs';
import {contactPage} from '../src/pages/contact.mjs';
import {privacyPage,notFoundPage} from '../src/pages/privacy.mjs';
import {brandMark} from '../src/templates/icons.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
await cp(path.join(root,'public'),dist,{recursive:true});
const pages=[
  ['index.html',{title:'Intelligence with a human purpose',body:homePage().replace(/<img class="orb-image"[^>]*>/,'<div class="brand-hero-visual" aria-label="ClarionX Super Intelligence world illustration"><div class="brand-hero-copy"><h2>ClarionX<br><em>Super Intelligence</em></h2><p>Human-centered intelligence, connected across every direction.</p></div><div class="brand-hero-stage"><svg class="intelligence-network" viewBox="0 0 400 320" aria-hidden="true"><circle cx="200" cy="162" r="105"/><circle class="network-inner" cx="200" cy="162" r="70"/><path d="M200 162V38M200 162L344 116M200 162L290 276M200 162L110 276M200 162L56 116"/></svg><span class="network-orbit" aria-hidden="true"></span><div class="intelligence-core"><img class="brand-hero-brain" src="assets/images/world-globe.svg" alt="Blue world globe with continents and ocean"></div><a class="network-product network-one" href="product-one.html">ONE</a><a class="network-product network-sram" href="product-sram.html">SRAM</a><a class="network-product network-agents" href="product-agents.html">AgentCode</a><a class="network-product network-research" href="product-research.html">Research</a><a class="network-product network-hub" href="product-hub.html">Hub</a></div></div>').replace(/<div class="art-topline">.*?<\/div>/,'').replace(/<div class="art-note">.*?<\/div><div class="art-bottomline">.*?<\/div>/,'')}],
  ['products.html',{title:'Our products',page:'products',body:productsPage()}],
  ['about.html',{title:'Our company',page:'about',body:aboutPage()}],
  ['contact.html',{title:'Prepare an enquiry',page:'contact',body:contactPage()}],
  ['privacy.html',{title:'Privacy',page:'privacy',body:privacyPage()}],
  ['404.html',{title:'Page not found',page:'404',body:notFoundPage()}],
  ...products.map(p=>[`product-${p.slug}.html`,{title:p.name,description:p.summary,page:`product-${p.slug}`,body:productPage(p)}])
];
for(const [filename,options] of pages) await writeFile(path.join(dist,filename),layout(options).replaceAll(brandMark,'<img class="brand-mark-image" src="assets/images/clarionxsi-logo.svg" width="61" height="44" alt="ClarionXSI CX logo">'));
console.log(`Built ${pages.length} pages and local assets into dist/. No dependencies or network access required.`);
