/* Progressive enhancement. No network calls, analytics, or browser storage. */
(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-navigation');
  function closeMenu(returnFocus = false) {
    if (!menu || !nav) return;
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    if (returnFocus) menu.focus();
  }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (menu?.getAttribute('aria-expanded') === 'true' && !event.target.closest('.site-header')) closeMenu();
  });

  const directory = document.querySelector('[data-filter-directory]');
  if (directory) {
    const cards = [...directory.querySelectorAll('[data-product-card]')];
    const buttons = [...directory.querySelectorAll('[data-filter]')];
    const search = directory.querySelector('[data-product-search]');
    let category = 'all';
    const update = () => {
      const words = search.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
      let count = 0;
      cards.forEach(card => {
        const matches = (category === 'all' || card.dataset.category === category) && words.every(word => card.dataset.search.toLocaleLowerCase().includes(word));
        card.hidden = !matches;
        if (matches) count++;
      });
      buttons.forEach(button => {
        const active = button.dataset.filter === category;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      directory.querySelector('[data-results-count]').textContent = count === cards.length ? `Showing all ${count} products` : `Showing ${count} of ${cards.length} products`;
      directory.querySelector('[data-empty-state]').hidden = count !== 0;
    };
    buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; update(); }));
    search.addEventListener('input', update);
    directory.querySelector('[data-reset-filters]').addEventListener('click', () => {category = 'all';search.value = '';update();search.focus();});
    update();
  }

  const services = document.querySelector('[data-service-directory]');
  if (services) {
    const buttons = [...services.querySelectorAll('[data-service-filter]')];
    const cards = [...services.querySelectorAll('[data-service-card]')];
    buttons.forEach(button => button.addEventListener('click', () => {
      let count = 0;
      cards.forEach(card => {card.hidden = button.dataset.serviceFilter !== 'all' && card.dataset.group !== button.dataset.serviceFilter;if (!card.hidden) count++;});
      buttons.forEach(item => {item.classList.toggle('active', item === button);item.setAttribute('aria-pressed', String(item === button));});
      services.querySelector('[data-service-count]').textContent = count === cards.length ? `Showing all ${count} services` : `Showing ${count} of ${cards.length} services`;
    }));
  }

  const form = document.querySelector('[data-enquiry-form]');
  if (form) {
    form.querySelector('fieldset').disabled = false;
    const params = new URLSearchParams(location.search);
    const product = form.elements.namedItem('product');
    const model = form.elements.namedItem('model');
    const message = form.elements.namedItem('message');
    const name = form.elements.namedItem('name');
    const email = form.elements.namedItem('email');
    const preview = form.elements.namedItem('preview');
    const status = form.querySelector('[data-form-status]');
    const modelField = form.querySelector('[data-model-field]');
    const setValidOption = (select, value) => {if ([...select.options].some(option => option.value === value)) select.value = value;};
    setValidOption(product, params.get('product'));
    if (product.value === 'sram') setValidOption(model, params.get('model'));
    // Only supported service names can populate a request; never render query strings as HTML.
    const serviceNames = ['Electrical services','Carpenter services','Plumbing service','Kitchen and Utensil Cleaning','Meal Prep and Serving','Mopping, Dusting, and Wiping','Bathroom Cleaning','Laundry and Ironing','Packing and Unpacking'];
    const service = params.get('service');
    if (product.value === 'seva' && serviceNames.includes(service)) message.value = `I would like to enquire about ${service}.`;
    const updateProduct = () => {modelField.hidden = product.value !== 'sram';model.disabled = product.value !== 'sram';};
    product.addEventListener('change', updateProduct);
    updateProduct();
    const validate = () => {
      name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
      message.setCustomValidity(message.value.trim().length >= 10 ? '' : 'Please enter at least 10 characters about your enquiry.');
      return form.reportValidity();
    };
    [name, message].forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
    const prepare = () => {
      if (!validate()) return null;
      const modelLine = product.value === 'sram' && model.value ? `\nSRAM model: ${model.selectedOptions[0].textContent}` : '';
      const text = `CLARIONX SUPER INTELLIGENCE — ENQUIRY\n\nName: ${name.value.trim()}\nEmail: ${email.value.trim()}\nProduct: ${product.selectedOptions[0].textContent}${modelLine}\n\nEnquiry:\n${message.value.trim()}\n\nPrepared locally. This enquiry has not been sent.\n`;
      preview.value = text;
      form.querySelector('[data-enquiry-preview]').hidden = false;
      return text;
    };
    form.addEventListener('submit', event => {
      event.preventDefault();
      const text = prepare();
      if (!text) return;
      const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `ClarionXSI-Enquiry-${product.value || 'general'}.txt`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      status.textContent = 'Your enquiry file is ready. Check your downloads and share it through your existing contact channel. Nothing has been sent.';
    });
    form.querySelector('[data-copy-enquiry]').addEventListener('click', async () => {
      const text = prepare();
      if (!text) return;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(text);
        status.textContent = 'Enquiry copied. You can paste it into your preferred contact channel. Nothing has been sent.';
      } catch {
        preview.focus();
        preview.select();
        status.textContent = 'Your enquiry is selected below. Use your device’s Copy command to copy it. Nothing has been sent.';
      }
    });
    // Avoid submitting personal details through a native form if enhancement is unavailable.
    form.addEventListener('reset', () => {status.textContent = '';form.querySelector('[data-enquiry-preview]').hidden = true;});
  }
})();
