# Deployment and customization

## Static hosting

1. Run `npm run build` and `npm run verify`.
2. Upload the **contents of `dist/`** to your static host’s web root.
3. Set `index.html` as the default page and `404.html` as the custom not-found page.
4. Preserve the `.html` paths. This is a multi-page site; do not rewrite every route to `index.html`.
5. Serve `.css`, `.js`, and `.svg` using their standard MIME types.

The downloadable `dist/` is already built. You can upload it without Node.js or a build step. No server framework, database, API key, remote font, or CDN asset is required. Relative links allow deployment beneath a subfolder as well as a domain root.

## Local server

`npm start` rebuilds and serves the site at `http://127.0.0.1:3000`. This development server supports GET and HEAD, rejects writes, and prevents encoded path traversal. It binds to the local machine by default. Use a dedicated static hosting platform for a public release.

## Brand and content

| Change | File |
| --- | --- |
| Company name and year | `src/data/site.mjs` |
| Product names, descriptions, and related links | `src/data/products.mjs` |
| Global colors and typography | `public/assets/css/base.css` |
| Header, footer, navigation | `src/templates/layout.mjs` |
| Main homepage | `src/pages/home.mjs` |
| Enquiry behavior | `public/assets/js/main.js`, `src/pages/contact.mjs` |
| Icons and brand symbol | `src/templates/icons.mjs` |

If changing Seva service names, also update the allowlist in `public/assets/js/main.js`. The verification script checks this consistency.

## Connecting real enquiries later

Once a verified contact destination is available, replace the local enquiry export with an approved backend or link to the actual product application. Keep API credentials on a server, validate inputs, add abuse protection, and update the privacy text to match the real data flow. Show successful submission only after the backend confirms receipt. Until then, the supplied controls intentionally say “Download enquiry” and “Copy text.”

## Product applications and appointments

Each product page currently links to a relevant enquiry. Configure verified product URLs to launch the corresponding applications. A company product description does not establish that an application or service is available for a visitor’s location. In particular, Apexphysio requires its own actual booking and clinical workflow before appointments can be confirmed.

## Hosted edition

The edition launched with this delivery uses owner-only access. Audience settings are separate from this portable ZIP. The exported project excludes hosting credentials, source-control metadata, and service-specific site identity so it can be deployed independently.
