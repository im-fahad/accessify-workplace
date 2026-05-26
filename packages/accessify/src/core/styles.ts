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

.accessify-root :focus-visible {
  outline: 2px solid var(--acc-primary);
  outline-offset: 2px;
}
`
}
