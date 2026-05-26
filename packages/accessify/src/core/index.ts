import { applyEffects, clearEffects, ensureHostWrapper, unwrapHost } from './effects'
import { ICONS } from './icons'
import { renderPanel } from './render'
import { buildStyles, DEFAULT_VARS, STYLE_ID, type StyleVars } from './styles'
import {
  DEFAULT_STATE,
  STORAGE_KEY,
  type AccessibilityProfile,
  type AccessifyConfig,
  type AccessifyState,
  type TextAlignment,
  type WidgetSize,
} from './types'

export type {
  AccessibilityProfile,
  AccessifyConfig,
  AccessifyState,
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
  private state: AccessifyState
  private root: HTMLDivElement | null = null
  private trigger: HTMLButtonElement | null = null
  private overlay: HTMLDivElement | null = null
  private panel: HTMLDivElement | null = null
  private isOpen = false

  constructor(config: AccessifyConfig = {}) {
    this.config = {
      position: 'bottom-right',
      persistence: true,
      lang: 'en',
      ...config,
    }
    this.size = config.size ?? 'M'
    this.state = this.loadState()
  }

  mount(target?: HTMLElement): void {
    if (typeof document === 'undefined') return
    this.injectStyles()

    if (!target) ensureHostWrapper()

    this.root = document.createElement('div')
    this.root.className = 'accessify-root'
    this.root.setAttribute('role', 'complementary')
    this.root.setAttribute('aria-label', 'Accessibility Widget')

    this.trigger = document.createElement('button')
    this.trigger.className = 'accessify-trigger'
    this.trigger.type = 'button'
    this.trigger.dataset.position = this.config.position!
    this.trigger.setAttribute('aria-label', 'Open accessibility menu')
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
    this.config.onOpen?.()
    this.update()
  }

  close(): void {
    this.isOpen = false
    this.config.onClose?.()
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

  private handlePanelClick(e: MouseEvent): void {
    const target = e.target as HTMLElement
    const closeBtn = target.closest<HTMLElement>('.accessify-close')
    if (closeBtn) {
      this.close()
      return
    }

    const resetBtn = target.closest<HTMLElement>('[data-action="reset"]')
    if (resetBtn) {
      this.reset()
      return
    }

    const sizeBtn = target.closest<HTMLElement>('[data-size]')
    if (sizeBtn && this.panel?.contains(sizeBtn) && sizeBtn.parentElement?.classList.contains('accessify-size-toggle')) {
      this.setSize(sizeBtn.dataset.size as WidgetSize)
      return
    }

    const profileBtn = target.closest<HTMLElement>('[data-profile]')
    if (profileBtn) {
      this.toggleProfile(profileBtn.dataset.profile as AccessibilityProfile)
      return
    }

    const stepBtn = target.closest<HTMLElement>('[data-step]')
    if (stepBtn) {
      const tile = stepBtn.closest<HTMLElement>('[data-stepper]')
      if (tile) {
        const key = tile.dataset.stepper as keyof AccessifyState
        const delta = Number.parseInt(stepBtn.dataset.step!, 10)
        this.adjustStepper(key, delta)
      }
      return
    }

    const toggleBtn = target.closest<HTMLElement>('[data-toggle]')
    if (toggleBtn) {
      this.toggleFlag(toggleBtn.dataset.toggle as keyof AccessifyState)
      return
    }

    const alignBtn = target.closest<HTMLElement>('[data-align]')
    if (alignBtn) {
      const a = alignBtn.dataset.align as TextAlignment
      this.state.textAlignment = this.state.textAlignment === a ? 'default' : a
      this.commit()
      return
    }

    const colorBtn = target.closest<HTMLElement>('[data-color]')
    if (colorBtn) {
      this.toggleColor(colorBtn.dataset.color as keyof AccessifyState)
    }
  }

  private toggleProfile(id: AccessibilityProfile): void {
    if (this.state.profile === id) {
      this.state = { ...DEFAULT_STATE }
    } else {
      const preset = PROFILE_PRESETS[id] ?? {}
      this.state = { ...DEFAULT_STATE, profile: id, ...preset }
    }
    this.commit()
  }

  private adjustStepper(key: keyof AccessifyState, delta: number): void {
    const bounds = STEPPER_BOUNDS[key as string]
    if (!bounds) return
    const current = this.state[key] as number
    const next = Math.max(bounds[0], Math.min(bounds[1], current + delta))
    ;(this.state as any)[key] = next
    this.commit()
  }

  private toggleFlag(key: keyof AccessifyState): void {
    const v = this.state[key]
    if (typeof v !== 'boolean') return;
    (this.state as any)[key] = !v
    this.commit()
  }

  private toggleColor(key: keyof AccessifyState): void {
    const current = this.state[key]
    if (typeof current !== 'boolean') return
    const next = !current
    if (next && COLOR_EXCLUSIVE.includes(key)) {
      for (const k of COLOR_EXCLUSIVE) {
        if (k !== key) (this.state as any)[k] = false
      }
    }
    ;(this.state as any)[key] = next
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
    this.panel.innerHTML = renderPanel(this.state, this.size)
    const nextBody = this.panel.querySelector<HTMLElement>('.accessify-body')
    if (nextBody) nextBody.scrollTop = prevScroll
  }

  private injectStyles(): void {
    if (typeof document === 'undefined') return
    if (document.getElementById(STYLE_ID)) return
    const vars: StyleVars = { ...DEFAULT_VARS }
    if (this.config.theme?.primary) vars.primary = this.config.theme.primary
    if (this.config.theme?.background) vars.background = this.config.theme.background
    if (this.config.theme?.text) vars.text = this.config.theme.text
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = buildStyles(vars)
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
