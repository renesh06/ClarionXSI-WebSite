# Verification

Run from the project root:

```sh
npm test
```

The command rebuilds the static website, then runs dependency-free automated checks.

## Checks included

- All 14 pages build successfully.
- All eight products appear on the homepage, in the directory, and on dedicated pages.
- All six SRAM family members and all nine Seva service categories are present.
- Local links, asset references, and fragment anchors resolve to generated files and section IDs.
- Each page has an English language declaration, viewport metadata, a description, one H1, a main landmark, and a skip link.
- IDs are unique and images include alternative text.
- JavaScript parses successfully.
- The enquiry form is disabled when JavaScript is unavailable and has no network submission or browser-storage implementation.
- Service enquiry deep links use an allowlist consistent with the catalogue.
- The actual local server request handler serves all pages and the homepage, returns 404 for missing pages, supports HEAD, rejects POST and invalid paths, and supplies correct asset MIME types.

## Verification limitations

The available environment does not expose the supported browser-control capability. Desktop/mobile visual checks and real browser interaction tests were therefore not run. The automated checks do not establish pixel-perfect rendering, assistive-technology conformance, clipboard permission behavior, or a real-device download flow.

Recommended browser review after opening the website:

1. Check the homepage, navigation, product cards, and footer at phone and desktop widths.
2. Search the directory for “Nano” or “plumbing”; combine search with the category filters; reset a no-results state.
3. Filter Seva services and open a service enquiry.
4. Open a SRAM model enquiry and confirm the selected family member.
5. Confirm invalid form input is rejected, a valid enquiry downloads, and copy or its selection fallback works.
6. Navigate with the keyboard, open and close the mobile menu, and expand FAQ items.

The site contains no external product backend, email delivery, payment processing, or appointment booking integration. No live transactions or bookings are performed.
