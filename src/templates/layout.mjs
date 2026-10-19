import {site} from '../data/site.mjs';
import {products,sramModels,sevaServices} from '../data/products.mjs';
import {brandMark, icon} from './icons.mjs';

export const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const productUrl = p => `product-${typeof p==='string'?p:p.slug}.html`;

export function card(p, {compact=false}={}) {
  const extraSearch=p.slug==='sram'?sramModels.map(m=>m.name).join(' '):p.slug==='seva'?sevaServices.map(s=>s.name).join(' '):'';
  return `<article class="product-card accent-${p.accent}${compact?' compact':''}" data-product-card data-category="${p.category}" data-search="${escape(p.name+' '+p.summary+' '+p.categoryLabel+' '+extraSearch)}">
    <div class="card-top"><span class="product-icon">${icon(p.icon)}</span><span class="card-category">${p.categoryLabel}</span></div>
    <h3><a href="${productUrl(p)}">${p.name}</a></h3><p>${p.summary}</p>
    <span class="card-link" aria-hidden="true">Explore ${p.short} ${icon('northeast')}</span>
  </article>`;
}

export function cta(title='Find your place in the ecosystem.', text='Explore the products and services that fit your world.') {
  return `<section class="cta-section container"><div><p class="eyebrow">THE NEXT STEP</p><h2>${title}</h2><p>${text}</p></div><a class="button button-light" href="contact.html">Prepare an enquiry ${icon('arrow')}</a></section>`;
}

export function layout({title,description=site.description,page='home',body}) {
  const active=page==='product-sram'?'sram':page.startsWith('product')?'products':page;
  const nav=[['products','products.html','Products'],['sram','product-sram.html','SRAM family'],['about','about.html','Company']];
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(title)} | ClarionXSI</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#f7f8fc"><meta property="og:type" content="website"><meta property="og:title" content="${escape(title)} | ClarionXSI"><meta property="og:description" content="${escape(description)}"><link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="assets/css/styles.css"><script src="assets/js/main.js" defer></script></head>
<body data-page="${page}"><a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html" aria-label="ClarionXSI home">${brandMark}<span>ClarionX<span class="brand-si">SI</span><small>SUPER INTELLIGENCE</small></span></a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation" aria-label="Open navigation"><span></span><span></span></button>
<nav class="main-nav" id="main-navigation" aria-label="Main navigation">${nav.map(([key,url,label])=>`<a href="${url}"${active===key?' aria-current="page"':''}>${label}</a>`).join('')}<a href="contact.html" class="nav-contact"${page==='contact'?' aria-current="page"':''}>Get in touch ${icon('northeast')}</a></nav></div></header>
<main id="main">${body}</main>
<footer class="site-footer"><div class="container footer-main"><div class="footer-brand"><a class="brand" href="index.html">${brandMark}<span>ClarionX<span class="brand-si">SI</span><small>SUPER INTELLIGENCE</small></span></a><p>Intelligence with a human purpose.<br>AI, applications, and everyday services.</p></div><div><h2>AI & research</h2>${products.filter(p=>p.category==='ai').map(p=>`<a href="${productUrl(p)}">${p.name}</a>`).join('')}</div><div><h2>Platforms & services</h2>${products.filter(p=>p.category!=='ai').map(p=>`<a href="${productUrl(p)}">${p.name}</a>`).join('')}</div><div><h2>Company</h2><a href="about.html">About ClarionXSI</a><a href="products.html">All products</a><a href="contact.html">Enquiries</a><a href="privacy.html">Privacy</a></div></div><div class="container footer-bottom"><span>© ${site.year} ClarionX Super Intelligence.</span><span>Developed and Maintained by ClarionXSI<br class="mobile-only"> (ClarionX Super Intelligence)</span><a href="#main" class="back-top" aria-label="Back to top">↑</a></div></footer>
</body></html>`;
}
