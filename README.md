# ClarionX Super Intelligence — Corporate Website

A complete, responsive corporate website for **ClarionX Super Intelligence (ClarionXSI)**. It includes 14 pages, original vector artwork, mobile navigation, a searchable product directory, Seva service filters, and a local enquiry export tool.

## Launch in seconds

**No installation needed:** extract the ZIP and open `dist/index.html` in a modern browser. All navigation, artwork, search, filters, and enquiry downloads use local files. Clipboard support depends on your browser; a text-selection fallback is included.

**Local web server:** install Node.js 20 or later, open a terminal in this folder, and run:

```sh
npm start
```

Open **http://127.0.0.1:3000**. Press Ctrl+C to stop. There are no packages to install and no API keys to configure.

- Windows: double-click `start.bat` to build, start the server, and open the browser.
- macOS / Linux: run `sh start.sh`, then open the printed URL.
- Custom port: set the `PORT` environment variable before running `npm start`.

## Company and product content

ClarionX Super Intelligence is the corporate / parent company. The website includes only these eight products:

| Product | Focus |
| --- | --- |
| ClarionX ONE | Consumer + enterprise AI super application |
| ClarionX SRAM | Self-Reasoning Retrieval Augmented Model |
| ClarionX Agents | Agent platform / runtime |
| ClarionX Research | Frontier AI research |
| ClarionX Hub | Application Integration Platform |
| ClarionX Stay | Hostels Management System |
| ClarionX Seva | Electrical, carpenter, plumbing, and household services |
| Apexphysio Rehabilitation | Doctor bookings and treatment for physiotherapy |

All six SRAM names are included: **Nano, Lite, Plus, Pro, Ultra, Ultra Frontier**.

All nine Seva service categories are included: electrical services; carpenter services; plumbing service; kitchen and utensil cleaning; meal prep and serving; mopping, dusting, and wiping; bathroom cleaning; laundry and ironing; packing and unpacking.

## Complete folder structure

| Folder / file | Contents |
| --- | --- |
| `src/data/site.mjs` | Company identity, description, copyright year |
| `src/data/products.mjs` | All product descriptions, SRAM family, Seva services |
| `src/templates/layout.mjs` | Shared HTML shell, header, footer, product cards, calls to action |
| `src/templates/icons.mjs` | Local SVG icons and logo mark |
| `src/pages/home.mjs` | Homepage sections |
| `src/pages/products.mjs` | Searchable directory |
| `src/pages/product.mjs` | Dedicated pages for all eight products |
| `src/pages/about.mjs` | Company identity and parent/product structure |
| `src/pages/contact.mjs` | Enquiry builder and FAQ |
| `src/pages/privacy.mjs` | Privacy and 404 pages |
| `public/assets/css/` | Base, component, and responsive page styles |
| `public/assets/js/main.js` | Navigation, filters, and enquiry interactions |
| `public/assets/images/` | Original hero artwork and favicon |
| `scripts/build.mjs` | Dependency-free static site generation |
| `scripts/serve.mjs` | Local static HTTP server |
| `scripts/verify.mjs` | Content, links, syntax, and request-handler checks |
| `scripts/create-art.mjs` | Regenerates the original SVG assets |
| `docs/DEPLOYMENT.md` | Hosting and customization instructions |
| `docs/VERIFICATION.md` | Verification coverage and limitations |
| `dist/` | Complete ready-to-open / ready-to-deploy website |
| `start.bat` / `start.sh` | Platform-specific launchers |
| `package.json` | Build, run, and verification commands |

### Generated pages in `dist/`

`index.html`, `products.html`, `about.html`, `contact.html`, `privacy.html`, `404.html`, `product-one.html`, `product-sram.html`, `product-agents.html`, `product-research.html`, `product-hub.html`, `product-stay.html`, `product-seva.html`, and `product-apexphysio.html`.

## Edit and rebuild

Edit source files and assets, then run:

```sh
npm run build
npm run verify
```

Do not edit generated HTML in `dist/`; the next build replaces it. Run `node scripts/create-art.mjs` only when you want to regenerate the vector art. CSS and product data can be edited without third-party tools.

The site has no runtime dependencies. The optional Node.js scripts use built-in modules only.

## What the enquiry form does

The form validates the visitor’s name, email address, product selection, and message. It downloads a plain-text enquiry or copies the text. Product, SRAM model, and service links preselect the relevant choices. The form never sends messages, stores the enquiry on a server, or confirms a booking. A readonly preview and clipboard fallback are included. Without JavaScript, the form controls remain disabled to prevent accidental native submission.

No verified company email, phone number, address, product application URL, booking provider, model specifications, pricing, or availability was supplied. None is invented. Add verified contact and application details before using this site as a lead-generation or booking channel.

This is the corporate website, not the eight underlying applications. Live bookings, doctor calendars, payments, user accounts, and operating AI services require their respective product backends.

## Accessibility and privacy

- Semantic landmarks, labelled inputs, descriptive links, and a skip link.
- Keyboard focus styling, Escape-to-close mobile navigation, and live filter counts.
- Responsive layouts and reduced-motion support.
- All artwork, fonts, scripts, and styles are local; no analytics or ad trackers are included.
- Enquiry data stays in the current browser page unless the visitor downloads, copies, or shares it.

See `docs/VERIFICATION.md` for the limits of the checks performed.
