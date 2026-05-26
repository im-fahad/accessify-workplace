import { applyEffects, clearEffects, ensureHostWrapper, unwrapHost } from './effects'
import { ICONS } from './icons'
import { trapFocus, releaseFocus, injectSkipLink, removeSkipLink } from './keyboard'
import { renderPanel } from './render'
import { buildStyles, DEFAULT_VARS, STYLE_ID } from './styles'
import {
  DEFAULT_STATE,
  STORAGE_KEY,
  type AccessibilityProfile,
  type AccessifyConfig,
  type AccessifyState,
  type ColorScheme,
  type Lang,
  type TextAlignment,
  type WidgetSize,
} from './types'
import { runWcagScan, type WcagResult } from './wcag'

export type {
  AccessibilityProfile,
  AccessifyConfig,
  AccessifyState,
  ColorScheme,
  Lang,
  Position,
  TextAlignment,
  WidgetSize,
} from './types'

const PROFILE_PRESETS: Record<AccessibilityProfile, Partial<AccessifyState>> = {
  'seizure-safe':         { darkContrast: false, lightContrast: true, monochrome: true },
  'vision-impaired':      { fontSize: 4, contentScale: 2, lineHeight: 2 },
  'adhd-friendly':        { highlightLinks: true, highlightTitles: true, readableFont: true },
  'cognitive-disability': { highlightLinks: true, highlightTitles: true, readableFont: true, lineHeight: 2 },
  'keyboard-navigation':  {},
  'screen-reader':        {},
  'color-blind':          { colorBlind: true },
  'dyslexia':             { readableFont: true, letterSpacing: 2, lineHeight: 2 },
}

const STEPPER_BOUNDS: Record<string, [number, number]> = {
  contentScale: [-5, 5],
  fontSize: [-5, 10],
  lineHeight: [-2, 6],
  letterSpacing: [-2, 6],
}

const COLOR_EXCLUSIVE: Array<keyof AccessifyState> = [
  'darkContrast',
  'lightContrast',
  'highContrast',
  'monochrome',
  'invertColors',
]

export class Accessify {
  private readonly config: AccessifyConfig
  private size: WidgetSize
  private lang: Lang
  private scheme: ColorScheme
  private state: AccessifyState
  private root: HTMLDivElement | null = null
  private trigger: HTMLButtonElement | null = null
  private overlay: HTMLDivElement | null = null
  private panel: HTMLDivElement | null = null
  private isOpen = false
  private wcagResult: WcagResult | null = null
  private wcagScanning = false

  constructor(config: AccessifyConfig = {}) {
    this.config = {
      position: 'bottom-right',
      persistence: true,
      lang: 'en',
      colorScheme: 'light',
      ...config,
    }
    this.size = this.config.size ?? 'M'
    this.lang = this.config.lang ?? 'en'
    this.scheme = this.config.colorScheme ?? 'light'
    this.state = this.loadState()
  }

  mount(target?: HTMLElement): void {
    if (typeof document === 'undefined') return
    this.injectStyles()

    if (!target) ensureHostWrapper()
    if (this.state.profile === 'keyboard-navigation') {
      injectSkipLink()
    }

    this.root = document.createElement('div')
    this.root.className = 'accessify-root'
    this.root.setAttribute('role', 'complementary')
    this.root.setAttribute('aria-label', 'Accessibility Widget')
    this.root.dataset.scheme = this.scheme === 'dark' ? 'dark' : 'light'
    this.applyTheme()

    this.trigger = document.createElement('button')
    this.trigger.className = 'accessify-trigger'
    this.trigger.type = 'button'
    this.trigger.dataset.position = this.config.position!
    this.trigger.setAttribute('aria-label', 'Open accessibility menu')
    this.trigger.setAttribute('aria-expanded', 'false')
    this.trigger.innerHTML = ICONS.wheelchair
    this.trigger.addEventListener('click', () => this.toggle())

    this.overlay = document.createElement('div')
    this.overlay.className = 'accessify-overlay'
    this.overlay.addEventListener('click', () => this.close())

    this.panel = document.createElement('div')
    this.panel.className = 'accessify-panel'
    this.panel.setAttribute('role', 'dialog')
    this.panel.setAttribute('aria-modal', 'true')
    this.panel.setAttribute('aria-label', 'Accessibility settings')
    this.panel.dataset.position = this.config.position!
    this.panel.dataset.size = this.size
    this.panel.addEventListener('click', e => this.handlePanelClick(e))

    this.root.append(this.trigger, this.overlay, this.panel)
    ;(target ?? document.body).appendChild(this.root)


    this.update()
    applyEffects(this.state)
  }

  destroy(): void {
    clearEffects()
    unwrapHost()
    releaseFocus()
    removeSkipLink()
    if (this.root) {
      this.root.remove()
      this.root = null
    }
    this.trigger = null
    this.overlay = null
    this.panel = null
  }

  open(): void {
    this.isOpen = true
    this.trigger?.setAttribute('aria-expanded', 'true')
    this.config.onOpen?.()
    this.update()
    if (this.panel && this.trigger) trapFocus(this.panel, this.trigger)
  }

  close(): void {
    this.isOpen = false
    this.trigger?.setAttribute('aria-expanded', 'false')
    this.config.onClose?.()
    releaseFocus()
    this.update()
  }

  toggle(): void {
    if (this.isOpen) this.close()
    else this.open()
  }

  reset(): void {
    this.state = { ...DEFAULT_STATE }
    this.saveState()
    applyEffects(this.state)
    this.config.onReset?.()
    this.update()
  }

  getState(): AccessifyState {
    return { ...this.state }
  }

  getIsOpen(): boolean {
    return this.isOpen
  }

  setSize(size: WidgetSize): void {
    this.size = size
    if (this.panel) this.panel.dataset.size = size
    this.update()
  }

  setLang(lang: Lang): void {
    this.lang = lang
    this.update()
  }

  setColorScheme(scheme: ColorScheme): void {
    this.scheme = scheme
    this.applyScheme()
  }

  private applyScheme(): void {
    if (!this.root) return
    this.root.dataset.scheme = this.scheme === 'dark' ? 'dark' : 'light'
  }

  private applyTheme(): void {
    if (!this.root) return
    const t = this.config.theme
    if (!t) return
    if (t.primary) this.root.style.setProperty('--acc-primary', t.primary)
    if (t.background) this.root.style.setProperty('--acc-bg', t.background)
    if (t.text) this.root.style.setProperty('--acc-text', t.text)
  }

  private handlePanelClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    if (target.closest<HTMLElement>('.accessify-close')) { this.close(); return }
    if (this.handleActionClick(target)) return
    if (this.handleSizeClick(target)) return
    if (this.handleProfileClick(target)) return
    if (this.handleStepClick(target)) return
    if (this.handleToggleClick(target)) return
    if (this.handleAlignClick(target)) return
    this.handleColorClick(target)
  }

  private handleActionClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-action]')
    if (!btn) return false
    if (btn.dataset.action === 'reset') this.reset()
    else if (btn.dataset.action === 'analyze') this.runAnalysis()
    return true
  }

  private handleSizeClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-size]')
    if (!btn || !this.panel?.contains(btn) || !btn.parentElement?.classList.contains('accessify-size-toggle')) return false
    this.setSize(btn.dataset.size as WidgetSize)
    return true
  }

  private handleProfileClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-profile]')
    if (!btn) return false
    this.toggleProfile(btn.dataset.profile as AccessibilityProfile)
    return true
  }

  private handleStepClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-step]')
    if (!btn) return false
    const tile = btn.closest<HTMLElement>('[data-stepper]')
    if (tile) this.adjustStepper(tile.dataset.stepper as keyof AccessifyState, Number.parseInt(btn.dataset.step!, 10))
    return true
  }

  private handleToggleClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-toggle]')
    if (!btn) return false
    this.toggleFlag(btn.dataset.toggle as keyof AccessifyState)
    return true
  }

  private handleAlignClick(target: HTMLElement): boolean {
    const btn = target.closest<HTMLElement>('[data-align]')
    if (!btn) return false
    const a = btn.dataset.align as TextAlignment
    this.state.textAlignment = this.state.textAlignment === a ? 'default' : a
    this.commit()
    return true
  }

  private handleColorClick(target: HTMLElement): void {
    const btn = target.closest<HTMLElement>('[data-color]')
    if (btn) this.toggleColor(btn.dataset.color as keyof AccessifyState)
  }

  private async runAnalysis(): Promise<void> {
    this.wcagScanning = true
    this.update()
    // Yield to allow re-render before scanning
    await new Promise(r => setTimeout(r, 30))
    const host = document.getElementById('accessify-host') ?? document.body
    this.wcagResult = runWcagScan(host)
    this.wcagScanning = false
    this.update()
  }

  private toggleProfile(id: AccessibilityProfile): void {
    if (this.state.profile === id) {
      this.state = { ...DEFAULT_STATE }
    } else {
      const preset = PROFILE_PRESETS[id] ?? {}
      this.state = { ...DEFAULT_STATE, profile: id, ...preset }
    }
    if (this.state.profile === 'keyboard-navigation') injectSkipLink()
    else removeSkipLink()
    this.commit()
  }

  private adjustStepper(key: keyof AccessifyState, delta: number): void {
    const bounds = STEPPER_BOUNDS[key as string]
    if (!bounds) return
    const current = this.state[key] as number
    const next = Math.max(bounds[0], Math.min(bounds[1], current + delta))
    ;(this.state as unknown as Record<string, unknown>)[key] = next
    this.commit()
  }

  private toggleFlag(key: keyof AccessifyState): void {
    const v = this.state[key]
    if (typeof v !== 'boolean') return;
    (this.state as unknown as Record<string, unknown>)[key] = !v
    this.commit()
  }

  private toggleColor(key: keyof AccessifyState): void {
    const current = this.state[key]
    if (typeof current !== 'boolean') return
    const next = !current
    if (next && COLOR_EXCLUSIVE.includes(key)) {
      for (const k of COLOR_EXCLUSIVE) {
        if (k !== key) (this.state as unknown as Record<string, unknown>)[k] = false
      }
    }
    ;(this.state as unknown as Record<string, unknown>)[key] = next
    this.commit()
  }

  private commit(): void {
    this.saveState()
    applyEffects(this.state)
    this.update()
  }

  private update(): void {
    if (!this.panel) return
    this.panel.classList.toggle('open', this.isOpen)
    this.overlay?.classList.toggle('open', this.isOpen)
    const prevScroll = this.panel.querySelector<HTMLElement>('.accessify-body')?.scrollTop ?? 0
    this.panel.innerHTML = renderPanel(this.state, this.size, this.lang, this.wcagResult, this.wcagScanning)
    const nextBody = this.panel.querySelector<HTMLElement>('.accessify-body')
    if (nextBody) nextBody.scrollTop = prevScroll
    this.applyScheme()
  }

  private injectStyles(): void {
    if (typeof document === 'undefined') return
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = buildStyles(DEFAULT_VARS)
    document.head.appendChild(style)
  }

  private loadState(): AccessifyState {
    if (!this.config.persistence) return { ...DEFAULT_STATE }
    if (typeof localStorage === 'undefined') return { ...DEFAULT_STATE }
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return { ...DEFAULT_STATE, ...JSON.parse(stored) }
    } catch {
      // ignore
    }
    return { ...DEFAULT_STATE }
  }

  private saveState(): void {
    if (!this.config.persistence) return
    if (typeof localStorage === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
    } catch {
      // ignore
    }
  }
}
