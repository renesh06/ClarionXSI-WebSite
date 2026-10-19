const shapes = {
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  northeast:'<path d="M6 18 18 6M6 6h12v12"/>',
  sparkles:'<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Z"/><path d="m20 2 .6 1.4L22 4l-1.4.6L20 6l-.6-1.4L18 4l1.4-.6L20 2Z"/>',
  chip:'<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><rect x="10" y="10" width="4" height="4" rx="1"/>',
  nodes:'<circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="m10.5 7.6-4 7.8m7-7.8 4 7.8M8 18h8"/>',
  orbit:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="5" transform="rotate(35 12 12)"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  building:'<path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18M1 22h22M9 22v-5h6v5M8 6h1m6 0h1M8 10h1m6 0h1M8 14h1m6 0h1"/>',
  home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/>',
  activity:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  search:'<circle cx="10.8" cy="10.8" r="7.3"/><path d="m16 16 5 5"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z"/>',
  tools:'<path d="m14 5 5 5M3 21l9-9m1-8 3-2 6 6-2 3-3-1-7 7-3-3 7-7-1-3Z"/>',
  drop:'<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>',
  meal:'<path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-4 2-5 6-5 10h5"/>',
  shirt:'<path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4a4 4 0 0 1-8 0Z"/>',
  box:'<path d="m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10M7.5 4.5l9 5"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  copy:'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  chevron:'<path d="m9 5 7 7-7 7"/>'
};
export function icon(name, className='') {return `<svg class="icon ${className}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]||shapes.sparkles}</svg>`;}
export const brandMark = '<svg class="brand-mark" width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M10 5h9l11 15-11 15h-9l11-15L10 5Z" fill="currentColor"/><path d="M2 5h5l11 15L7 35H2l11-15L2 5Z" fill="currentColor" opacity=".38"/><path d="M25 5h9L23 20l11 15h-9L14 20 25 5Z" fill="currentColor" opacity=".65"/></svg>';
