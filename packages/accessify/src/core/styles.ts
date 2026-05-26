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
  primary: '#8b1d4a',
  primaryDark: '#6e1339',
  background: '#ffffff',
  text: '#1a1a1a',
  border: '#e7d9e0',
  muted: '#6b6b6b',
  surface: '#faf7f8',
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--acc-text);
  box-sizing: border-box;
}
.accessify-root *, .accessify-root *::before, .accessify-root *::after { box-sizing: border-box; }

.accessify-trigger {
  position: fixed;
  z-index: 2147483646;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--acc-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.accessify-trigger:hover { transform: scale(1.05); background: var(--acc-primary-dark); }
.accessify-trigger svg { width: 28px; height: 28px; }
.accessify-trigger[data-position="bottom-right"] { right: 20px; bottom: 20px; }
.accessify-trigger[data-position="bottom-left"]  { left: 20px;  bottom: 20px; }
.accessify-trigger[data-position="top-right"]    { right: 20px; top: 20px; }
.accessify-trigger[data-position="top-left"]     { left: 20px;  top: 20px; }

.accessify-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 2147483646;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.accessify-overlay.open { opacity: 1; pointer-events: auto; }

.accessify-panel {
  position: fixed;
  z-index: 2147483647;
  background: var(--acc-bg);
  width: 380px;
  max-width: calc(100vw - 24px);
  height: calc(100vh - 24px);
  max-height: 760px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  transform: translateY(20px);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.accessify-panel.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
.accessify-panel[data-size="S"] { width: 320px; }
.accessify-panel[data-size="L"] { width: 440px; }
.accessify-panel[data-position="bottom-right"] { right: 12px; bottom: 12px; }
.accessify-panel[data-position="bottom-left"]  { left: 12px;  bottom: 12px; }
.accessify-panel[data-position="top-right"]    { right: 12px; top: 12px; }
.accessify-panel[data-position="top-left"]     { left: 12px;  top: 12px; }

.accessify-header {
  background: var(--acc-primary);
  color: #fff;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.accessify-header h2 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
.accessify-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.accessify-close:hover { background: rgba(255,255,255,0.15); }
.accessify-close svg { width: 18px; height: 18px; }

.accessify-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px 20px 20px;
  background: var(--acc-bg);
  min-width: 0;
}
.accessify-body::-webkit-scrollbar { width: 8px; }
.accessify-body::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }

.accessify-section { margin-bottom: 18px; }
.accessify-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0 10px;
}
.accessify-section-head h3 { margin: 0; font-size: 17px; font-weight: 700; }

.accessify-size-toggle { display: flex; gap: 6px; }
.accessify-size-toggle button {
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 1px solid var(--acc-border);
  background: #fff;
  color: var(--acc-primary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
.accessify-size-toggle button[aria-pressed="true"] {
  background: var(--acc-primary);
  border-color: var(--acc-primary);
  color: #fff;
}

.accessify-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.accessify-grid-3 { grid-template-columns: repeat(3, 1fr); }
.accessify-grid > *, .accessify-grid-3 > * { min-width: 0; }

.accessify-card {
  border: 1px solid var(--acc-border);
  border-radius: 10px;
  padding: 12px;
  background: #fff;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 56px;
}
.accessify-card:hover { border-color: var(--acc-primary); }
.accessify-card[aria-pressed="true"] {
  border-color: var(--acc-primary);
  background: var(--acc-surface);
  box-shadow: inset 0 0 0 1px var(--acc-primary);
}
.accessify-card .icon { width: 28px; height: 28px; color: var(--acc-primary); flex-shrink: 0; }
.accessify-card .icon svg { width: 100%; height: 100%; }
.accessify-card .label { font-size: 13px; font-weight: 600; line-height: 1.25; min-width: 0; overflow-wrap: break-word; }

.accessify-tile {
  border: 1px solid var(--acc-border);
  border-radius: 10px;
  padding: 14px 8px 10px;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  min-height: 110px;
}
.accessify-tile:hover { border-color: var(--acc-primary); }
.accessify-tile[aria-pressed="true"] {
  border-color: var(--acc-primary);
  background: var(--acc-surface);
  box-shadow: inset 0 0 0 1px var(--acc-primary);
}
.accessify-tile .icon { width: 32px; height: 32px; color: var(--acc-text); }
.accessify-tile .icon svg { width: 100%; height: 100%; }
.accessify-tile .label { font-size: 13px; font-weight: 600; line-height: 1.2; overflow-wrap: break-word; max-width: 100%; }

.accessify-stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #fff;
  border: 1px solid var(--acc-border);
  border-radius: 999px;
  padding: 2px 4px;
  margin-top: 2px;
}
.accessify-stepper button {
  width: 22px; height: 22px;
  border-radius: 50%;
  border: none;
  background: var(--acc-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.accessify-stepper button:disabled { opacity: 0.5; cursor: default; }
.accessify-stepper button svg { width: 12px; height: 12px; }
.accessify-stepper { max-width: 100%; }
.accessify-stepper .value { font-size: 12px; font-weight: 600; min-width: 40px; text-align: center; }

.accessify-align-group { display: flex; gap: 4px; margin-top: 2px; }
.accessify-align-group button {
  flex: 1;
  height: 26px;
  border-radius: 999px;
  border: 1px solid var(--acc-border);
  background: #fff;
  color: var(--acc-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.accessify-align-group button[aria-pressed="true"] {
  background: var(--acc-primary);
  border-color: var(--acc-primary);
  color: #fff;
}
.accessify-align-group svg { width: 14px; height: 14px; }

/* ===== applied effects on host page (scoped to #accessify-host wrapper) ===== */
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
  outline: 2px solid #ffb800 !important;
  outline-offset: 2px !important;
  background: rgba(255,184,0,0.08) !important;
}
#accessify-host.acc-highlight-links a {
  outline: 2px solid #1d70ff !important;
  outline-offset: 2px !important;
  background: rgba(29,112,255,0.08) !important;
  text-decoration: underline !important;
}
#accessify-host.acc-dark-contrast {
  background: #000 !important;
  color: #fff !important;
}
#accessify-host.acc-dark-contrast * {
  background-color: transparent !important;
  color: #fff !important;
  border-color: #444 !important;
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
  background: #fffbe6;
  border: 2px solid #8b1d4a;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 22px;
  max-width: 320px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

.accessify-root :focus-visible { outline: 2px solid var(--acc-primary); outline-offset: 2px; }
`
}
