import { ICONS } from './icons'
import type { AccessibilityProfile, AccessifyState, TextAlignment, WidgetSize } from './types'

interface ProfileDef {
  id: AccessibilityProfile
  label: string
  icon: string
}

const PROFILES: ProfileDef[] = [
  { id: 'seizure-safe',          label: 'Seizure Safe Profile',        icon: ICONS.seizure },
  { id: 'vision-impaired',       label: 'Vision Impaired Profile',     icon: ICONS.vision },
  { id: 'adhd-friendly',         label: 'ADHD Friendly Profile',       icon: ICONS.adhd },
  { id: 'cognitive-disability',  label: 'Cognitive Disability Profile',icon: ICONS.cognitive },
  { id: 'keyboard-navigation',   label: 'Keyboard Navigation (Motor)', icon: ICONS.keyboard },
  { id: 'screen-reader',         label: 'Blind Users (Screen Reader)', icon: ICONS.screenReader },
  { id: 'color-blind',           label: 'Color Blind',                 icon: ICONS.colorBlind },
  { id: 'dyslexia',              label: 'Dyslexia',                    icon: ICONS.dyslexia },
]

function stepperLabel(v: number): string {
  if (v === 0) return 'Default'
  return v > 0 ? `+${v}` : `${v}`
}

function sizeToggle(active: WidgetSize): string {
  return (['S', 'M', 'L'] as WidgetSize[])
    .map(s => `<button type="button" data-size="${s}" aria-pressed="${s === active}">${s}</button>`)
    .join('')
}

function profileCard(p: ProfileDef, active: boolean): string {
  return `
    <button class="accessify-card" type="button" data-profile="${p.id}" aria-pressed="${active}">
      <span class="icon">${p.icon}</span>
      <span class="label">${p.label}</span>
    </button>
  `
}

function stepperTile(opts: {
  key: string
  icon: string
  label: string
  value: number
  min: number
  max: number
}): string {
  const { key, icon, label, value, min, max } = opts
  const pressed = value !== 0
  return `
    <div class="accessify-tile" data-stepper="${key}" aria-pressed="${pressed}" role="group" aria-label="${label}">
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
      <div class="accessify-stepper">
        <button type="button" data-step="-1" aria-label="Decrease ${label}" ${value <= min ? 'disabled' : ''}>${ICONS.chevronDown}</button>
        <span class="value">${stepperLabel(value)}</span>
        <button type="button" data-step="1" aria-label="Increase ${label}" ${value >= max ? 'disabled' : ''}>${ICONS.chevronUp}</button>
      </div>
    </div>
  `
}

function toggleTile(opts: { key: string; icon: string; label: string; active: boolean }): string {
  return `
    <button class="accessify-tile" type="button" data-toggle="${opts.key}" aria-pressed="${opts.active}">
      <span class="icon">${opts.icon}</span>
      <span class="label">${opts.label}</span>
    </button>
  `
}

function alignmentTile(active: TextAlignment): string {
  const btn = (a: TextAlignment, icon: string) =>
    `<button type="button" data-align="${a}" aria-pressed="${active === a}" aria-label="Align ${a}">${icon}</button>`
  return `
    <div class="accessify-tile" aria-pressed="${active !== 'default'}" role="group" aria-label="Text Alignment">
      <span class="icon">${ICONS.textAlignLeft}</span>
      <span class="label">Text Alignment</span>
      <div class="accessify-align-group">
        ${btn('left', ICONS.textAlignLeft)}
        ${btn('center', ICONS.textAlignCenter)}
        ${btn('right', ICONS.textAlignRight)}
      </div>
    </div>
  `
}

function colorTile(opts: { key: string; icon: string; label: string; active: boolean }): string {
  return `
    <button class="accessify-tile" type="button" data-color="${opts.key}" aria-pressed="${opts.active}">
      <span class="icon">${opts.icon}</span>
      <span class="label">${opts.label}</span>
    </button>
  `
}

export function renderPanel(state: AccessifyState, size: WidgetSize): string {
  return `
    <div class="accessify-header">
      <h2>Accessify</h2>
      <button type="button" class="accessify-close" aria-label="Close accessibility menu">${ICONS.close}</button>
    </div>
    <div class="accessify-body">
      <div class="accessify-section">
        <div class="accessify-section-head">
          <h3>Widget Size</h3>
          <div class="accessify-size-toggle">${sizeToggle(size)}</div>
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head"><h3>Accessibility Profiles</h3></div>
        <div class="accessify-grid">
          ${PROFILES.map(p => profileCard(p, state.profile === p.id)).join('')}
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head"><h3>Content Adjustments</h3></div>
        <div class="accessify-grid accessify-grid-3">
          ${stepperTile({ key: 'contentScale', icon: ICONS.contentScaling, label: 'Content Scaling', value: state.contentScale, min: -5, max: 5 })}
          ${toggleTile({ key: 'readableFont',   icon: ICONS.readableFont,   label: 'Readable Font',   active: state.readableFont })}
          ${toggleTile({ key: 'highlightTitles',icon: ICONS.highlightTitles,label: 'Highlight Titles',active: state.highlightTitles })}

          ${stepperTile({ key: 'fontSize',  icon: ICONS.fontSizing,    label: 'Font Sizing',   value: state.fontSize, min: -5, max: 10 })}
          ${toggleTile({ key: 'textMagnifier', icon: ICONS.textMagnifier, label: 'Text Magnifier', active: state.textMagnifier })}
          ${toggleTile({ key: 'highlightLinks',icon: ICONS.highlightLinks,label: 'Highlight Links',active: state.highlightLinks })}

          ${stepperTile({ key: 'lineHeight',    icon: ICONS.lineHeight,    label: 'Line Height',     value: state.lineHeight, min: -2, max: 6 })}
          ${stepperTile({ key: 'letterSpacing', icon: ICONS.letterSpacing, label: 'Letter Spacing',  value: state.letterSpacing, min: -2, max: 6 })}
          ${alignmentTile(state.textAlignment)}
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head"><h3>Color Adjustments</h3></div>
        <div class="accessify-grid accessify-grid-3">
          ${colorTile({ key: 'darkContrast',  icon: ICONS.darkContrast,  label: 'Dark Contrast',  active: state.darkContrast })}
          ${colorTile({ key: 'lightContrast', icon: ICONS.lightContrast, label: 'Light Contrast', active: state.lightContrast })}
          ${colorTile({ key: 'highContrast',  icon: ICONS.highContrast,  label: 'High Contrast',  active: state.highContrast })}
          ${colorTile({ key: 'monochrome',    icon: ICONS.colorBlind,    label: 'Monochrome',     active: state.monochrome })}
          ${colorTile({ key: 'invertColors',  icon: ICONS.lightContrast, label: 'Invert Colors',  active: state.invertColors })}
          ${colorTile({ key: 'colorBlind',    icon: ICONS.colorBlind,    label: 'Color Blind',    active: state.colorBlind })}
        </div>
      </div>
    </div>
  `
}
