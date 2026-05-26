const svg = (inner: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`

export const ICONS = {
  close: svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
  chevronUp: svg('<polyline points="18 15 12 9 6 15"/>'),
  chevronDown: svg('<polyline points="6 9 12 15 18 9"/>'),
  wheelchair: svg(
    '<circle cx="12" cy="4" r="1.5"/><path d="M11 6v6h5l3 6"/><path d="M16 12a5 5 0 1 1-5 5"/>'
  ),
  seizure: svg(
    '<circle cx="12" cy="12" r="9"/><path d="M9 9l1.5 3-2 3h3l-1 3 3.5-4-1.5-3h2.5"/>'
  ),
  vision: svg(
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>'
  ),
  adhd: svg(
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M5 5l-2-2"/><path d="M19 5l2-2"/>'
  ),
  cognitive: svg(
    '<path d="M9 21V11"/><path d="M9 11a4 4 0 0 1-4-4V5a3 3 0 0 1 6 0v1a4 4 0 0 0 4 4h2a3 3 0 0 1 0 6h-2a4 4 0 0 0-4 4z"/>'
  ),
  keyboard: svg(
    '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"/>'
  ),
  screenReader: svg(
    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z"/><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z"/>'
  ),
  colorBlind: svg(
    '<circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6" opacity="0.6"/>'
  ),
  dyslexia: svg(
    '<path d="M4 7h16M4 12h10M4 17h16"/><circle cx="18" cy="12" r="2"/>'
  ),
  contentScaling: svg(
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5M8 17h8"/>'
  ),
  readableFont: svg(
    '<path d="M4 7V5h16v2"/><path d="M9 5v14"/><path d="M15 5v14"/><path d="M7 19h4M13 19h4"/>'
  ),
  highlightTitles: svg(
    '<path d="M6 4v16M18 4v16M6 12h12"/>'
  ),
  fontSizing: svg(
    '<path d="M3 19l5-14 5 14M5 14h6"/><path d="M14 19l3-9 3 9M15.5 16h3"/>'
  ),
  textMagnifier: svg(
    '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/><path d="M9 11h4M11 9v4"/>'
  ),
  highlightLinks: svg(
    '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>'
  ),
  lineHeight: svg(
    '<path d="M3 6h18M3 12h18M3 18h18"/><path d="M6 3v3M6 18v3"/>'
  ),
  letterSpacing: svg(
    '<path d="M5 18V8l3-4 3 4v10"/><path d="M14 18V8l3-4 3 4v10"/><path d="M5 14h6M14 14h6"/>'
  ),
  textAlignLeft: svg('<path d="M3 6h18M3 12h12M3 18h18"/>'),
  textAlignCenter: svg('<path d="M3 6h18M6 12h12M3 18h18"/>'),
  textAlignRight: svg('<path d="M3 6h18M9 12h12M3 18h18"/>'),
  darkContrast: svg('<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/><circle cx="17" cy="6" r="0.7"/><circle cx="19" cy="10" r="0.5"/>'),
  lightContrast: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'),
  highContrast: svg('<circle cx="12" cy="12" r="9"/><path d="M12 3v18" stroke-width="0" fill="currentColor"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>'),
}
