export const STYLE_ID = 'accessify-styles'

export interface StyleVars {
  primary: string
  primaryDark: string
  background: string
  text: string
  border: string
  muted: string
  surface: string
}

export const DEFAULT_VARS: StyleVars = {
  primary: '#0c0c0c',
  primaryDark: '#18181b',
  background: '#ffffff',
  text: '#0c0c0c',
  border: '#e4e4e7',
  muted: '#71717a',
  surface: '#f4f4f5',
}

export function buildStyles(vars: StyleVars): string {
  return `
.accessify-root {
  --acc-primary: ${vars.primary};
  --acc-primary-dark: ${vars.primaryDark};
  --acc-bg: ${vars.background};
  --acc-text: ${vars.text};
  --acc-border: ${vars.border};
  --acc-muted: ${vars.muted};
  --acc-surface: ${vars.surface};
  --acc-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--acc-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}
.accessify-root *, .accessify-root *::before, .accessify-root *::after {
  box-sizing: border-box;
}

/* ── Trigger ── */
.accessify-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  background: var(--acc-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.accessify-trigger:hover {
  transform: scale(1.06);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}
.accessify-trigger svg { width: 22px; height: 22px; }
.accessify-trigger[data-position="bottom-right"] { right: 20px; bottom: 20px; }
.accessify-trigger[data-position="bottom-left"]  { left: 20px;  bottom: 20px; }
.accessify-trigger[data-position="top-right"]    { right: 20px; top: 20px; }
.accessify-trigger[data-position="top-left"]     { left: 20px;  top: 20px; }

/* ── Overlay ── */
.accessify-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.accessify-overlay.open { opacity: 1; pointer-events: auto; }

/* ── Panel ── */
.accessify-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--acc-bg);
  width: 388px;
  max-width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  max-height: 780px;
  border-radius: 12px;
  border: 1px solid var(--acc-border);
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  transform: translateY(12px) scale(0.98);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease;
  transform-origin: bottom center;
}
.accessify-panel.open {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
}
.accessify-panel[data-size="S"] { width: 320px; max-height: 620px; }
.accessify-panel[data-size="M"] { width: 388px; max-height: 780px; }
.accessify-panel[data-size="L"] { width: 460px; max-height: 920px; }
.accessify-panel[data-position="bottom-right"] { right: 8px; bottom: 8px; transform-origin: bottom right; }
.accessify-panel[data-position="bottom-left"]  { left: 8px;  bottom: 8px; transform-origin: bottom left; }
.accessify-panel[data-position="top-right"]    { right: 8px; top: 8px;    transform-origin: top right; }
.accessify-panel[data-position="top-left"]     { left: 8px;  top: 8px;    transform-origin: top left; }

/* ── Header ── */
.accessify-header {
  background: var(--acc-primary);
  color: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.accessify-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.accessify-header-icon {
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.12);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.accessify-header-icon svg { width: 18px; height: 18px; }
.accessify-header h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
}
.accessify-header-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
.accessify-header-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #fff;
  line-height: 1;
}
.accessify-header-sub {
  font-size: 11px;
  color: rgba(255,255,255,0.72);
  letter-spacing: 0.01em;
  line-height: 1;
}
.accessify-header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}
.accessify-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessify-icon-btn:hover {
  background: rgba(255,255,255,0.12);
  color: #fff;
}
.accessify-icon-btn svg { width: 15px; height: 15px; }

/* ── Body ── */
.accessify-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  background: var(--acc-bg);
  min-width: 0;
}
.accessify-body::-webkit-scrollbar { width: 6px; }
.accessify-body::-webkit-scrollbar-track { background: transparent; }
.accessify-body::-webkit-scrollbar-thumb { background: var(--acc-border); border-radius: 3px; }

/* ── Section ── */
.accessify-section {
  padding: 16px 18px;
  border-bottom: 1px solid var(--acc-border);
}
.accessify-section:last-child { border-bottom: none; }
.accessify-section--compact { padding: 10px 18px; }
.accessify-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.accessify-section--compact .accessify-section-head { margin-bottom: 0; }
.accessify-section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--acc-muted);
}

/* ── Size toggle ── */
.accessify-size-toggle {
  display: flex;
  gap: 2px;
  background: var(--acc-surface);
  border: 1px solid var(--acc-border);
  border-radius: 7px;
  padding: 2px;
}
.accessify-size-toggle button {
  width: 26px;
  height: 22px;
  border-radius: 5px;
  border: none;
  background: transparent;
  color: var(--acc-muted);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}
.accessify-size-toggle button[aria-pressed="true"] {
  background: var(--acc-bg);
  color: var(--acc-text);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* ── Profile cards ── */
.accessify-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.accessify-grid-3 { grid-template-columns: repeat(3, 1fr); }
[data-size="S"] .accessify-grid-3 { grid-template-columns: repeat(2, 1fr); }
.accessify-grid > *, .accessify-grid-3 > * { min-width: 0; }

.accessify-card {
  border: 1px solid var(--acc-border);
  border-radius: var(--acc-radius);
  padding: 10px 12px;
  background: var(--acc-bg);
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
  display: flex;
  align-items: center;
  gap: 9px;
  min-height: 52px;
}
.accessify-card:hover {
  background: var(--acc-surface);
  border-color: #a1a1aa;
}
.accessify-card[aria-pressed="true"] {
  border-color: var(--acc-primary);
  background: var(--acc-primary);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.accessify-card[aria-pressed="true"] .icon { color: rgba(255,255,255,0.85); }
.accessify-card[aria-pressed="true"]:hover { background: var(--acc-primary); border-color: var(--acc-primary); }
.accessify-card[aria-pressed="true"]:hover .icon { color: #fff; }
.accessify-card .icon { width: 22px; height: 22px; color: var(--acc-muted); flex-shrink: 0; transition: color 0.12s ease; }
.accessify-card:not([aria-pressed="true"]):hover .icon { color: var(--acc-text); }
.accessify-card .icon svg { width: 100%; height: 100%; }
.accessify-card .label { font-size: 12px; font-weight: 500; line-height: 1.3; min-width: 0; overflow-wrap: break-word; }

/* ── Tiles (content & color adjustments) ── */
.accessify-tile {
  border: 1px solid var(--acc-border);
  border-radius: var(--acc-radius);
  padding: 12px 8px 10px;
  background: var(--acc-bg);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.12s ease, background 0.12s ease, box-shadow 0.12s ease;
  min-height: 100px;
  width: 100%;
}
.accessify-tile:hover {
  background: var(--acc-surface);
  border-color: #a1a1aa;
}
.accessify-tile[aria-pressed="true"] {
  border-color: var(--acc-primary);
  background: var(--acc-primary);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.accessify-tile[aria-pressed="true"] .icon { color: rgba(255,255,255,0.85); }
.accessify-tile[aria-pressed="true"]:hover,
div.accessify-tile[aria-pressed="true"]:hover { background: var(--acc-primary); border-color: var(--acc-primary); }
.accessify-tile[aria-pressed="true"]:hover .icon { color: #fff; }
div.accessify-tile[aria-pressed="true"] { cursor: default; }
div.accessify-tile { cursor: default; }
.accessify-tile[aria-pressed="true"] .accessify-stepper {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.2);
}
.accessify-tile[aria-pressed="true"] .accessify-stepper .value { color: #fff; }
.accessify-tile[aria-pressed="true"] .accessify-stepper button { background: rgba(255,255,255,0.2); color: #fff; }
.accessify-tile[aria-pressed="true"] .accessify-align-group button { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }
.accessify-tile[aria-pressed="true"] .accessify-align-group button[aria-pressed="true"] { background: rgba(255,255,255,0.25); color: #fff; }
.accessify-tile .icon { width: 28px; height: 28px; color: var(--acc-muted); transition: color 0.12s ease; }
.accessify-tile:not([aria-pressed="true"]):hover .icon { color: var(--acc-text); }
.accessify-tile .icon svg { width: 100%; height: 100%; }
.accessify-tile .label { font-size: 11px; font-weight: 500; line-height: 1.25; overflow-wrap: break-word; width: 100%; text-align: center; color: inherit; }

/* ── Stepper ── */
.accessify-stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: var(--acc-surface);
  border: 1px solid var(--acc-border);
  border-radius: 6px;
  padding: 2px 3px;
  margin-top: 2px;
  max-width: 100%;
  width: 100%;
}
.accessify-stepper button {
  width: 20px; height: 20px;
  border-radius: 4px;
  border: none;
  background: var(--acc-bg);
  color: var(--acc-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  transition: background 0.1s ease;
  flex-shrink: 0;
}
.accessify-stepper button:hover { background: var(--acc-border); }
.accessify-stepper button:disabled { opacity: 0.35; cursor: default; box-shadow: none; }
.accessify-stepper button svg { width: 10px; height: 10px; }
.accessify-stepper .value { font-size: 11px; font-weight: 600; min-width: 36px; text-align: center; color: var(--acc-text); }

/* ── Text align ── */
.accessify-align-group { display: flex; gap: 3px; margin-top: 2px; width: 100%; }
.accessify-align-group button {
  flex: 1;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--acc-border);
  background: var(--acc-bg);
  color: var(--acc-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.1s ease, color 0.1s ease, border-color 0.1s ease;
}
.accessify-align-group button:hover { background: var(--acc-surface); color: var(--acc-text); border-color: #a1a1aa; }
.accessify-align-group button[aria-pressed="true"] {
  background: var(--acc-text);
  border-color: var(--acc-text);
  color: var(--acc-bg);
}
.accessify-tile[aria-pressed="true"] .accessify-align-group button {
  border-color: rgba(255,255,255,0.25);
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.75);
}
.accessify-tile[aria-pressed="true"] .accessify-align-group button:hover {
  background: rgba(255,255,255,0.2);
  color: #fff;
}
.accessify-tile[aria-pressed="true"] .accessify-align-group button[aria-pressed="true"] {
  background: rgba(255,255,255,0.9);
  border-color: rgba(255,255,255,0.9);
  color: var(--acc-primary);
}
.accessify-align-group svg { width: 12px; height: 12px; }

/* ── Reset bar ── */
.accessify-reset-bar {
  padding: 12px 18px;
  border-top: 1px solid var(--acc-border);
  flex-shrink: 0;
  background: var(--acc-bg);
}
.accessify-reset-btn {
  width: 100%;
  height: 34px;
  border-radius: var(--acc-radius);
  border: 1px solid var(--acc-border);
  background: var(--acc-bg);
  color: var(--acc-text);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  transition: background 0.12s ease, border-color 0.12s ease;
}
.accessify-reset-btn:hover { background: var(--acc-surface); border-color: #a1a1aa; }
.accessify-reset-btn svg { width: 14px; height: 14px; color: var(--acc-muted); }

/* ── Applied host effects ── */
#accessify-host.acc-readable-font, #accessify-host.acc-readable-font * {
  font-family: "Open Dyslexic", Tahoma, Verdana, Arial, sans-serif !important;
}
#accessify-host.acc-dyslexia, #accessify-host.acc-dyslexia * {
  font-family: "Open Dyslexic", Comic Sans MS, Tahoma, sans-serif !important;
  letter-spacing: 0.05em !important;
}
#accessify-host.acc-highlight-titles h1,
#accessify-host.acc-highlight-titles h2,
#accessify-host.acc-highlight-titles h3,
#accessify-host.acc-highlight-titles h4,
#accessify-host.acc-highlight-titles h5,
#accessify-host.acc-highlight-titles h6 {
  outline: 2px solid #f59e0b !important;
  outline-offset: 2px !important;
  background: rgba(245,158,11,0.07) !important;
}
#accessify-host.acc-highlight-links a {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 2px !important;
  background: rgba(59,130,246,0.07) !important;
  text-decoration: underline !important;
}
#accessify-host.acc-dark-contrast {
  background: #000 !important;
  color: #fff !important;
}
#accessify-host.acc-dark-contrast * {
  background-color: transparent !important;
  color: #fff !important;
  border-color: #333 !important;
}
#accessify-host.acc-light-contrast {
  background: #fff !important;
  color: #000 !important;
}
#accessify-host.acc-light-contrast * {
  background-color: transparent !important;
  color: #000 !important;
}
#accessify-host.acc-high-contrast {
  background: #000 !important;
  color: #ff0 !important;
}
#accessify-host.acc-high-contrast * {
  background-color: #000 !important;
  color: #ff0 !important;
  border-color: #ff0 !important;
}
#accessify-host.acc-monochrome { filter: grayscale(100%) !important; }
#accessify-host.acc-invert { filter: invert(100%) hue-rotate(180deg) !important; }
#accessify-host.acc-color-blind { filter: url('#acc-protanopia') !important; }

/* ── Keyboard Navigation profile ──
   Strong, always-visible focus rings on every interactive element so
   keyboard users can clearly see what's focused. */
#accessify-host.acc-keyboard-nav a:focus,
#accessify-host.acc-keyboard-nav button:focus,
#accessify-host.acc-keyboard-nav input:focus,
#accessify-host.acc-keyboard-nav select:focus,
#accessify-host.acc-keyboard-nav textarea:focus,
#accessify-host.acc-keyboard-nav [tabindex]:focus,
#accessify-host.acc-keyboard-nav summary:focus,
#accessify-host.acc-keyboard-nav [role="button"]:focus,
#accessify-host.acc-keyboard-nav [role="link"]:focus {
  outline: 3px solid #2563eb !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.25) !important;
  border-radius: 2px;
}
#accessify-host.acc-keyboard-nav a:hover,
#accessify-host.acc-keyboard-nav button:hover {
  outline: 2px dashed #2563eb !important;
  outline-offset: 2px !important;
}

/* ── Screen Reader profile ──
   Visually reinforce semantic landmarks and ensure links/headings are
   distinguishable. Show hidden landmarks visually. Enlarge tap targets. */
#accessify-host.acc-screen-reader main,
#accessify-host.acc-screen-reader [role="main"],
#accessify-host.acc-screen-reader nav,
#accessify-host.acc-screen-reader [role="navigation"],
#accessify-host.acc-screen-reader header,
#accessify-host.acc-screen-reader [role="banner"],
#accessify-host.acc-screen-reader footer,
#accessify-host.acc-screen-reader [role="contentinfo"],
#accessify-host.acc-screen-reader aside,
#accessify-host.acc-screen-reader [role="complementary"],
#accessify-host.acc-screen-reader section,
#accessify-host.acc-screen-reader article,
#accessify-host.acc-screen-reader form {
  outline: 2px dashed rgba(37, 99, 235, 0.55) !important;
  outline-offset: 4px !important;
  position: relative;
}
#accessify-host.acc-screen-reader main::before { content: 'main'; }
#accessify-host.acc-screen-reader nav::before { content: 'nav'; }
#accessify-host.acc-screen-reader header::before { content: 'header'; }
#accessify-host.acc-screen-reader footer::before { content: 'footer'; }
#accessify-host.acc-screen-reader aside::before { content: 'aside'; }
#accessify-host.acc-screen-reader section::before { content: 'section'; }
#accessify-host.acc-screen-reader article::before { content: 'article'; }
#accessify-host.acc-screen-reader form::before { content: 'form'; }
#accessify-host.acc-screen-reader main::before,
#accessify-host.acc-screen-reader nav::before,
#accessify-host.acc-screen-reader header::before,
#accessify-host.acc-screen-reader footer::before,
#accessify-host.acc-screen-reader aside::before,
#accessify-host.acc-screen-reader section::before,
#accessify-host.acc-screen-reader article::before,
#accessify-host.acc-screen-reader form::before {
  position: absolute;
  top: -10px;
  left: 8px;
  background: #2563eb;
  color: #fff;
  font: 600 10px/1 -apple-system, sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: 3px;
  pointer-events: none;
  z-index: 1;
}
#accessify-host.acc-screen-reader a {
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}
#accessify-host.acc-screen-reader img:not([alt]),
#accessify-host.acc-screen-reader img[alt=""] {
  outline: 3px solid #dc2626 !important;
}
#accessify-host.acc-screen-reader img:not([alt])::after,
#accessify-host.acc-screen-reader img[alt=""]::after {
  content: '⚠ missing alt';
  color: #dc2626;
}
#accessify-host.acc-screen-reader button,
#accessify-host.acc-screen-reader a,
#accessify-host.acc-screen-reader [role="button"] {
  min-height: 32px;
  min-width: 32px;
}

.acc-magnify-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 2147483645;
  background: #fff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 20px;
  max-width: 320px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  color: #0c0c0c;
}

/* ── Reading lens (circular zoom that follows the cursor) ── */
.acc-reading-lens {
  position: fixed;
  pointer-events: none;
  z-index: 2147483645;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  border: 4px solid #0c0c0c;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.5),
    0 12px 32px rgba(0,0,0,0.35),
    inset 0 0 0 1px rgba(255,255,255,0.4);
}
.acc-reading-lens-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform-origin: 0 0;
}
.acc-reading-lens-inner > * {
  margin: 0 !important;
}

.accessify-root :focus-visible {
  outline: 2px solid var(--acc-primary);
  outline-offset: 2px;
}

/* ── Skip link ── */
.accessify-skip-link {
  position: fixed;
  top: -100%;
  left: 8px;
  z-index: 2147483647;
  padding: 8px 16px;
  background: #0c0c0c;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 0 0 var(--acc-radius, 8px) var(--acc-radius, 8px);
  text-decoration: none;
  transition: top 0.15s ease;
}
.accessify-skip-link:focus {
  top: 0;
  outline: 2px solid #fff;
  outline-offset: -4px;
}

/* ── Dark mode ── */
/* Explicit light override — wins over OS preference and data-scheme="dark" */
.accessify-root[data-scheme="light"] {
  --acc-primary: #0c0c0c;
  --acc-primary-dark: #18181b;
  --acc-bg: #ffffff;
  --acc-text: #0c0c0c;
  --acc-border: #e4e4e7;
  --acc-muted: #71717a;
  --acc-surface: #f4f4f5;
}
.accessify-root[data-scheme="dark"] {
  --acc-primary: #fafafa;
  --acc-primary-dark: #e4e4e7;
  --acc-bg: #0c0c0c;
  --acc-text: #fafafa;
  --acc-border: #27272a;
  --acc-muted: #71717a;
  --acc-surface: #18181b;
}
.accessify-root[data-scheme="dark"] .accessify-header {
  background: #18181b;
  border-bottom-color: rgba(255,255,255,0.06);
}
.accessify-root[data-scheme="dark"] .accessify-trigger {
  background: #fafafa;
  color: #0c0c0c;
  border-color: rgba(0,0,0,0.12);
}
.accessify-root[data-scheme="dark"] .accessify-reset-bar { background: #0c0c0c; }
.accessify-root[data-scheme="dark"] .acc-magnify-cursor {
  background: #18181b;
  border-color: #27272a;
  color: #fafafa;
}
.accessify-root[data-scheme="dark"] .accessify-card[aria-pressed="true"],
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"] {
  background: #fafafa;
  color: #0c0c0c;
  border-color: #fafafa;
}
.accessify-root[data-scheme="dark"] .accessify-card[aria-pressed="true"] .icon,
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"] .icon { color: rgba(0,0,0,0.75); }
.accessify-root[data-scheme="dark"] .accessify-card[aria-pressed="true"]:hover,
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"]:hover { background: #e4e4e7; }
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"] .accessify-stepper {
  background: rgba(0,0,0,0.1);
  border-color: rgba(0,0,0,0.2);
}
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"] .accessify-stepper .value { color: #0c0c0c; }
.accessify-root[data-scheme="dark"] .accessify-tile[aria-pressed="true"] .accessify-stepper button { background: rgba(0,0,0,0.15); color: #0c0c0c; }
.accessify-root[data-scheme="dark"] .accessify-align-group button[aria-pressed="true"] {
  background: #fafafa;
  border-color: #fafafa;
  color: #0c0c0c;
}
.accessify-root[data-scheme="dark"] .accessify-size-toggle button[aria-pressed="true"] {
  background: #27272a;
  color: #fafafa;
}

/* ── WCAG Scanner ── */
.accessify-wcag-score {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0 8px;
}
.accessify-wcag-score-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 3px solid var(--acc-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--acc-text);
}
.accessify-wcag-score-circle.good  { border-color: #22c55e; color: #22c55e; }
.accessify-wcag-score-circle.ok    { border-color: #f59e0b; color: #f59e0b; }
.accessify-wcag-score-circle.poor  { border-color: #ef4444; color: #ef4444; }
.accessify-wcag-score-meta { flex: 1; min-width: 0; }
.accessify-wcag-score-label { font-size: 12px; font-weight: 600; color: var(--acc-text); }
.accessify-wcag-score-sub { font-size: 11px; color: var(--acc-muted); margin-top: 2px; }
.accessify-wcag-analyze-btn {
  width: 100%;
  height: 32px;
  border-radius: var(--acc-radius);
  border: 1px solid var(--acc-border);
  background: var(--acc-bg);
  color: var(--acc-text);
  font: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background 0.12s ease, border-color 0.12s ease;
  margin-top: 4px;
}
.accessify-wcag-analyze-btn:hover { background: var(--acc-surface); border-color: #a1a1aa; }
.accessify-wcag-analyze-btn:disabled { opacity: 0.5; cursor: default; }
.accessify-wcag-issues { margin-top: 8px; display: flex; flex-direction: column; gap: 4px; }
.accessify-wcag-issue {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  background: var(--acc-surface);
  border: 1px solid var(--acc-border);
  font-size: 11px;
  line-height: 1.4;
}
.accessify-wcag-badge {
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 3px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.accessify-wcag-badge.fail { background: #fef2f2; color: #dc2626; }
.accessify-wcag-badge.warn { background: #fffbeb; color: #d97706; }
.accessify-wcag-badge.pass { background: #f0fdf4; color: #16a34a; }
.accessify-root[data-scheme="dark"] .accessify-wcag-badge.fail { background: rgba(220,38,38,0.15); color: #f87171; }
.accessify-root[data-scheme="dark"] .accessify-wcag-badge.warn { background: rgba(217,119,6,0.15); color: #fbbf24; }
.accessify-root[data-scheme="dark"] .accessify-wcag-badge.pass { background: rgba(22,163,74,0.15); color: #4ade80; }
.accessify-wcag-issue-text { flex: 1; min-width: 0; color: var(--acc-text); }
.accessify-wcag-issue-count { flex-shrink: 0; font-weight: 600; color: var(--acc-muted); }
.accessify-wcag-empty {
  text-align: center;
  padding: 16px 0 8px;
  font-size: 12px;
  color: var(--acc-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.accessify-wcag-empty svg { width: 24px; height: 24px; color: #22c55e; }
`
}
