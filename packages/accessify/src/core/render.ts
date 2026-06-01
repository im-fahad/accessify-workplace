import { ICONS } from './icons'
import { getTranslations } from './i18n'
import type { WcagResult } from './wcag'
import type { AccessibilityProfile, AccessifyState, Lang, TextAlignment, WidgetSize } from './types'

interface ProfileDef {
  id: AccessibilityProfile
  label: string
  icon: string
}

function stepperLabel(v: number, defaultLabel: string): string {
  if (v === 0) return defaultLabel
  return v > 0 ? `+${v}` : `${v}`
}

function sizeToggle(active: WidgetSize): string {
  return (['S', 'M', 'L'] as WidgetSize[])
    .map(s => `<button type="button" data-size="${s}" aria-pressed="${s === active}">${s}</button>`)
    .join('')
}

function profileCard(id: AccessibilityProfile, label: string, icon: string, active: boolean): string {
  return `
    <button class="accessify-card" type="button" data-profile="${id}" aria-pressed="${active}">
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
    </button>
  `
}

function stepperTile(opts: {
  key: string; icon: string; label: string; value: number; min: number; max: number; defaultLabel: string
}): string {
  const { key, icon, label, value, min, max, defaultLabel } = opts
  return `
    <div class="accessify-tile" data-stepper="${key}" aria-pressed="${value !== 0}" role="group" aria-label="${label}">
      <span class="icon">${icon}</span>
      <span class="label">${label}</span>
      <div class="accessify-stepper">
        <button type="button" data-step="-1" aria-label="Decrease ${label}" ${value <= min ? 'disabled' : ''}>${ICONS.chevronDown}</button>
        <span class="value">${stepperLabel(value, defaultLabel)}</span>
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

function alignmentTile(active: TextAlignment, label: string, alignLeft: string, alignCenter: string, alignRight: string): string {
  const btn = (a: TextAlignment, icon: string, ariaLabel: string) =>
    `<button type="button" data-align="${a}" aria-pressed="${active === a}" aria-label="${ariaLabel}">${icon}</button>`
  return `
    <div class="accessify-tile" aria-pressed="${active !== 'default'}" role="group" aria-label="${label}">
      <span class="icon">${ICONS.textAlignLeft}</span>
      <span class="label">${label}</span>
      <div class="accessify-align-group">
        ${btn('left', ICONS.textAlignLeft, alignLeft)}
        ${btn('center', ICONS.textAlignCenter, alignCenter)}
        ${btn('right', ICONS.textAlignRight, alignRight)}
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

function scoreClass(result: WcagResult | null): string {
  if (!result) return ''
  if (result.score >= 80) return 'good'
  if (result.score >= 50) return 'ok'
  return 'poor'
}

function wcagIssuesHtml(result: WcagResult | null, t: ReturnType<typeof getTranslations>): string {
  if (!result) return ''
  if (result.issues.length === 0) {
    return `<div class="accessify-wcag-empty">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      ${t.noIssues}
    </div>`
  }
  const rows = result.issues.map(issue => {
    const badge = issue.severity === 'fail' ? t.wcagFail : t.wcagWarn
    return `<div class="accessify-wcag-issue">
      <span class="accessify-wcag-badge ${issue.severity}">${badge}</span>
      <span class="accessify-wcag-issue-text">${issue.message}</span>
      <span class="accessify-wcag-issue-count">${issue.count}</span>
    </div>`
  }).join('')
  return `<div class="accessify-wcag-issues">${rows}</div>`
}

function wcagSection(result: WcagResult | null, scanning: boolean, t: ReturnType<typeof getTranslations>): string {
  const cls = scoreClass(result)
  const issueCount = result?.issues.filter(i => i.severity !== 'pass').length ?? 0
  const issuesHtml = wcagIssuesHtml(result, t)

  return `
    <div class="accessify-section">
      <div class="accessify-section-head">
        <span class="accessify-section-title">${t.pageAnalysis}</span>
      </div>
      ${result ? `
        <div class="accessify-wcag-score">
          <div class="accessify-wcag-score-circle ${cls}">${result.score}</div>
          <div class="accessify-wcag-score-meta">
            <div class="accessify-wcag-score-label">${t.score}: ${result.score}/100</div>
            <div class="accessify-wcag-score-sub">${issueCount} ${t.issuesFound}</div>
          </div>
        </div>
      ` : ''}
      <button type="button" class="accessify-wcag-analyze-btn" data-action="analyze" ${scanning ? 'disabled' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:13px;height:13px" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>
        ${scanning ? t.analyzing : t.analyzeNow}
      </button>
      ${issuesHtml}
    </div>
  `
}

const RESET_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`

export function renderPanel(
  state: AccessifyState,
  size: WidgetSize,
  lang: Lang = 'en',
  wcagResult: WcagResult | null = null,
  wcagScanning = false,
): string {
  const t = getTranslations(lang)

  const PROFILES: Array<{ id: AccessibilityProfile; label: string; icon: string }> = [
    { id: 'seizure-safe',         label: t.seizureSafe,         icon: ICONS.seizure },
    { id: 'vision-impaired',      label: t.visionImpaired,      icon: ICONS.vision },
    { id: 'adhd-friendly',        label: t.adhdFriendly,        icon: ICONS.adhd },
    { id: 'cognitive-disability', label: t.cognitiveDisability,  icon: ICONS.cognitive },
    { id: 'keyboard-navigation',  label: t.keyboardNavigation,  icon: ICONS.keyboard },
    { id: 'screen-reader',        label: t.screenReader,        icon: ICONS.screenReader },
    { id: 'color-blind',          label: t.colorBlind,          icon: ICONS.colorBlind },
    { id: 'dyslexia',             label: t.dyslexia,            icon: ICONS.dyslexia },
  ]

  const dir = lang === 'ar' ? ' dir="rtl"' : ''

  return `
    <div class="accessify-header"${dir}>
      <div class="accessify-header-left">
        <div class="accessify-header-icon">${ICONS.wheelchair}</div>
        <div class="accessify-header-text">
          <div class="accessify-header-title">${t.title}</div>
          <div class="accessify-header-sub">${t.subtitle}</div>
        </div>
      </div>
      <div class="accessify-header-actions">
        <button type="button" class="accessify-icon-btn accessify-close" aria-label="${t.close}">${ICONS.close}</button>
      </div>
    </div>

    <div class="accessify-body"${dir}>

      <div class="accessify-section accessify-section--compact">
        <div class="accessify-section-head">
          <span class="accessify-section-title">${t.widgetSize}</span>
          <div class="accessify-size-toggle">${sizeToggle(size)}</div>
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head">
          <span class="accessify-section-title">${t.profiles}</span>
        </div>
        <div class="accessify-grid">
          ${PROFILES.map(p => profileCard(p.id, p.label, p.icon, state.profile === p.id)).join('')}
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head">
          <span class="accessify-section-title">${t.contentAdjustments}</span>
        </div>
        <div class="accessify-grid accessify-grid-3">
          ${stepperTile({ key: 'contentScale',   icon: ICONS.contentScaling,  label: t.contentScale,   value: state.contentScale,  min: -5, max: 5,  defaultLabel: t.default })}
          ${toggleTile({  key: 'readableFont',   icon: ICONS.readableFont,    label: t.readableFont,   active: state.readableFont })}
          ${toggleTile({  key: 'highlightTitles',icon: ICONS.highlightTitles, label: t.highlightTitles,active: state.highlightTitles })}
          ${stepperTile({ key: 'fontSize',       icon: ICONS.fontSizing,      label: t.fontSize,       value: state.fontSize,      min: -5, max: 10, defaultLabel: t.default })}
          ${toggleTile({  key: 'textMagnifier',  icon: ICONS.textMagnifier,   label: t.textMagnifier,  active: state.textMagnifier })}
          ${toggleTile({  key: 'highlightLinks', icon: ICONS.highlightLinks,  label: t.highlightLinks, active: state.highlightLinks })}
          ${toggleTile({  key: 'readingLens',    icon: ICONS.readingLens,     label: t.readingLens,    active: state.readingLens })}
          ${stepperTile({ key: 'lineHeight',     icon: ICONS.lineHeight,      label: t.lineHeight,     value: state.lineHeight,    min: -2, max: 6,  defaultLabel: t.default })}
          ${stepperTile({ key: 'letterSpacing',  icon: ICONS.letterSpacing,   label: t.letterSpacing,  value: state.letterSpacing, min: -2, max: 6,  defaultLabel: t.default })}
          ${alignmentTile(state.textAlignment, t.textAlign, t.alignLeft, t.alignCenter, t.alignRight)}
        </div>
      </div>

      <div class="accessify-section">
        <div class="accessify-section-head">
          <span class="accessify-section-title">${t.colorAdjustments}</span>
        </div>
        <div class="accessify-grid accessify-grid-3">
          ${colorTile({ key: 'darkContrast',  icon: ICONS.darkContrast,  label: t.darkContrast,  active: state.darkContrast })}
          ${colorTile({ key: 'lightContrast', icon: ICONS.lightContrast, label: t.lightContrast, active: state.lightContrast })}
          ${colorTile({ key: 'highContrast',  icon: ICONS.highContrast,  label: t.highContrast,  active: state.highContrast })}
          ${colorTile({ key: 'monochrome',    icon: ICONS.monochrome,    label: t.monochrome,    active: state.monochrome })}
          ${colorTile({ key: 'invertColors',  icon: ICONS.invertColors,  label: t.invertColors,  active: state.invertColors })}
          ${colorTile({ key: 'colorBlind',    icon: ICONS.colorBlind,    label: t.colorBlind,    active: state.colorBlind })}
        </div>
      </div>

      ${wcagSection(wcagResult, wcagScanning, t)}

    </div>

    <div class="accessify-reset-bar"${dir}>
      <button type="button" class="accessify-reset-btn" data-action="reset" aria-label="${t.resetAll}">
        ${RESET_ICON}
        ${t.resetAll}
      </button>
    </div>
  `
}
