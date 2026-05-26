import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Accessify } from '../core/index'
import { DEFAULT_STATE, STORAGE_KEY } from '../core/types'
import { HOST_WRAPPER_ID } from '../core/effects'

beforeEach(() => {
  document.body.innerHTML = '<p id="page-content">page</p>'
  localStorage.clear()
})

afterEach(() => {
  document.body.innerHTML = ''
  localStorage.clear()
})

describe('Accessify — constructor', () => {
  it('applies defaults when no config provided', () => {
    const a = new Accessify()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('loads persisted state from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 3 }))
    const a = new Accessify()
    expect(a.getState().fontSize).toBe(3)
    a.destroy()
  })

  it('ignores localStorage when persistence is false', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 5 }))
    const a = new Accessify({ persistence: false })
    expect(a.getState().fontSize).toBe(0)
    a.destroy()
  })

  it('uses default size M', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector<HTMLElement>('.accessify-panel')
    expect(panel?.dataset.size).toBe('M')
    a.destroy()
  })

  it('respects custom size', () => {
    const a = new Accessify({ size: 'L' })
    a.mount()
    const panel = document.querySelector<HTMLElement>('.accessify-panel')
    expect(panel?.dataset.size).toBe('L')
    a.destroy()
  })
})

describe('Accessify — mount / destroy', () => {
  it('appends accessify-root to body', () => {
    const a = new Accessify()
    a.mount()
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    a.destroy()
  })

  it('creates host wrapper when no target given', () => {
    const a = new Accessify()
    a.mount()
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
    a.destroy()
  })

  it('always creates host wrapper so effects work, even with custom target', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const a = new Accessify()
    a.mount(container)
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
    a.destroy()
  })

  it('injects the styles tag into head', () => {
    const a = new Accessify()
    a.mount()
    expect(document.getElementById('accessify-styles')).not.toBeNull()
    a.destroy()
  })

  it('removes accessify-root on destroy', () => {
    const a = new Accessify()
    a.mount()
    a.destroy()
    expect(document.querySelector('.accessify-root')).toBeNull()
  })

  it('removes host wrapper on destroy', () => {
    const a = new Accessify()
    a.mount()
    a.destroy()
    expect(document.getElementById(HOST_WRAPPER_ID)).toBeNull()
  })
})

describe('Accessify — open / close / toggle', () => {
  it('panel does not have .open class initially', () => {
    const a = new Accessify()
    a.mount()
    expect(document.querySelector('.accessify-panel')?.classList.contains('open')).toBe(false)
    a.destroy()
  })

  it('open() adds .open class to panel', () => {
    const a = new Accessify()
    a.mount()
    a.open()
    expect(document.querySelector('.accessify-panel')?.classList.contains('open')).toBe(true)
    a.destroy()
  })

  it('close() removes .open class from panel', () => {
    const a = new Accessify()
    a.mount()
    a.open()
    a.close()
    expect(document.querySelector('.accessify-panel')?.classList.contains('open')).toBe(false)
    a.destroy()
  })

  it('toggle() flips open state', () => {
    const a = new Accessify()
    a.mount()
    a.toggle()
    expect(a.getIsOpen()).toBe(true)
    a.toggle()
    expect(a.getIsOpen()).toBe(false)
    a.destroy()
  })

  it('calls onOpen callback', () => {
    const onOpen = vi.fn()
    const a = new Accessify({ onOpen })
    a.mount()
    a.open()
    expect(onOpen).toHaveBeenCalledOnce()
    a.destroy()
  })

  it('calls onClose callback', () => {
    const onClose = vi.fn()
    const a = new Accessify({ onClose })
    a.mount()
    a.open()
    a.close()
    expect(onClose).toHaveBeenCalledOnce()
    a.destroy()
  })
})

describe('Accessify — reset', () => {
  it('resets state to defaults', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...DEFAULT_STATE, fontSize: 5, readableFont: true }))
    const a = new Accessify()
    a.mount()
    a.reset()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('calls onReset callback', () => {
    const onReset = vi.fn()
    const a = new Accessify({ onReset })
    a.mount()
    a.reset()
    expect(onReset).toHaveBeenCalledOnce()
    a.destroy()
  })

  it('clears persisted state', () => {
    const a = new Accessify()
    a.mount()
    a.reset()
    const stored = localStorage.getItem(STORAGE_KEY)
    expect(stored ? JSON.parse(stored) : {}).toEqual(DEFAULT_STATE)
    a.destroy()
  })
})

describe('Accessify — setSize', () => {
  it('updates panel data-size attribute', () => {
    const a = new Accessify()
    a.mount()
    a.setSize('S')
    expect(document.querySelector<HTMLElement>('.accessify-panel')?.dataset.size).toBe('S')
    a.setSize('L')
    expect(document.querySelector<HTMLElement>('.accessify-panel')?.dataset.size).toBe('L')
    a.destroy()
  })
})

describe('Accessify — panel click interactions', () => {
  it('close button closes the panel', () => {
    const a = new Accessify()
    a.mount()
    a.open()
    const closeBtn = document.querySelector<HTMLButtonElement>('.accessify-close')!
    closeBtn.click()
    expect(a.getIsOpen()).toBe(false)
    a.destroy()
  })

  it('reset button resets state', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    const resetBtn = panel.querySelector<HTMLButtonElement>('[data-action="reset"]')!
    resetBtn.click()
    expect(a.getState()).toEqual(DEFAULT_STATE)
    a.destroy()
  })

  it('profile button activates profile', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    const profileBtn = panel.querySelector<HTMLButtonElement>('[data-profile="dyslexia"]')!
    profileBtn.click()
    expect(a.getState().profile).toBe('dyslexia')
    a.destroy()
  })

  it('clicking active profile resets to default state', () => {
    const a = new Accessify()
    a.mount()
    // Query fresh after each click — panel innerHTML is replaced on state change
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="dyslexia"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="dyslexia"]')!.click()
    expect(a.getState().profile).toBeNull()
    a.destroy()
  })

  it('toggle tile flips boolean flag', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-toggle="readableFont"]')!.click()
    expect(a.getState().readableFont).toBe(true)
    a.destroy()
  })

  it('color tile toggles color flag', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-color="monochrome"]')!.click()
    expect(a.getState().monochrome).toBe(true)
    a.destroy()
  })

  it('activating a color flag turns off exclusive others', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-color="darkContrast"]')!.click()
    panel.querySelector<HTMLButtonElement>('[data-color="lightContrast"]')!.click()
    const state = a.getState()
    expect(state.lightContrast).toBe(true)
    expect(state.darkContrast).toBe(false)
    a.destroy()
  })

  it('stepper increase button increments value', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    const tile = panel.querySelector<HTMLElement>('[data-stepper="fontSize"]')!
    tile.querySelector<HTMLButtonElement>('[data-step="1"]')!.click()
    expect(a.getState().fontSize).toBe(1)
    a.destroy()
  })

  it('stepper decrease button decrements value', () => {
    const a = new Accessify()
    a.mount()
    // Re-query after each click — panel HTML is replaced on state change
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-stepper="fontSize"] [data-step="1"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-stepper="fontSize"] [data-step="-1"]')!.click()
    expect(a.getState().fontSize).toBe(0)
    a.destroy()
  })

  it('alignment button sets textAlignment', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-align="center"]')!.click()
    expect(a.getState().textAlignment).toBe('center')
    a.destroy()
  })

  it('clicking active alignment resets to default', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-align="left"]')!.click()
    panel.querySelector<HTMLButtonElement>('[data-align="left"]')!.click()
    expect(a.getState().textAlignment).toBe('default')
    a.destroy()
  })

  it('size button changes widget size', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    const sizeBtn = panel.querySelector<HTMLButtonElement>('.accessify-size-toggle [data-size="S"]')!
    sizeBtn.click()
    expect(document.querySelector<HTMLElement>('.accessify-panel')?.dataset.size).toBe('S')
    a.destroy()
  })
})

describe('Accessify — persistence', () => {
  it('saves state to localStorage on change', () => {
    const a = new Accessify()
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-toggle="readableFont"]')!.click()
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!)
    expect(stored.readableFont).toBe(true)
    a.destroy()
  })

  it('does not write to localStorage when persistence=false', () => {
    const a = new Accessify({ persistence: false })
    a.mount()
    const panel = document.querySelector('.accessify-panel')!
    panel.querySelector<HTMLButtonElement>('[data-toggle="readableFont"]')!.click()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    a.destroy()
  })
})

describe('Accessify — dark mode', () => {
  it('applies light scheme by default', () => {
    const a = new Accessify()
    a.mount()
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('light')
    a.destroy()
  })

  it('applies dark scheme when colorScheme=dark', () => {
    const a = new Accessify({ colorScheme: 'dark' })
    a.mount()
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('dark')
    a.destroy()
  })

  it('applies light scheme when colorScheme=light', () => {
    const a = new Accessify({ colorScheme: 'light' })
    a.mount()
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('light')
    a.destroy()
  })

  it('setColorScheme updates scheme at runtime', () => {
    const a = new Accessify({ colorScheme: 'light' })
    a.mount()
    a.setColorScheme('dark')
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('dark')
    a.destroy()
  })
})

describe('Accessify — i18n', () => {
  it('renders Spanish labels when lang=es', () => {
    const a = new Accessify({ lang: 'es' })
    a.mount()
    a.open()
    expect(document.querySelector('.accessify-panel')?.innerHTML).toContain('Configuración de Accesibilidad')
    a.destroy()
  })

  it('setLang updates panel language at runtime', () => {
    const a = new Accessify({ lang: 'en' })
    a.mount()
    a.open()
    a.setLang('fr')
    expect(document.querySelector('.accessify-panel')?.innerHTML).toContain("Paramètres d'Accessibilité")
    a.destroy()
  })
})

describe('Accessify — keyboard navigation profile', () => {
  it('injects skip link when keyboard-navigation profile is activated', () => {
    const a = new Accessify()
    a.mount()
    const main = document.createElement('main')
    main.id = 'main'
    document.body.appendChild(main)
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="keyboard-navigation"]')!.click()
    expect(document.getElementById('accessify-skip-link')).not.toBeNull()
    a.destroy()
  })

  it('removes skip link when keyboard-navigation profile is deactivated', () => {
    const a = new Accessify()
    a.mount()
    const main = document.createElement('main')
    main.id = 'main'
    document.body.appendChild(main)
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="keyboard-navigation"]')!.click()
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="keyboard-navigation"]')!.click()
    expect(document.getElementById('accessify-skip-link')).toBeNull()
    a.destroy()
  })

  it('adds acc-keyboard-nav class to host when keyboard-navigation profile is activated', () => {
    const a = new Accessify()
    a.mount()
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="keyboard-navigation"]')!.click()
    expect(document.getElementById('accessify-host')?.classList.contains('acc-keyboard-nav')).toBe(true)
    a.destroy()
  })
})

describe('Accessify — screen-reader profile', () => {
  it('adds acc-screen-reader class to host when activated', () => {
    const a = new Accessify()
    a.mount()
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="screen-reader"]')!.click()
    expect(document.getElementById('accessify-host')?.classList.contains('acc-screen-reader')).toBe(true)
    a.destroy()
  })

  it('injects skip link when screen-reader profile is activated', () => {
    const a = new Accessify()
    a.mount()
    const main = document.createElement('main')
    main.id = 'main'
    document.body.appendChild(main)
    document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="screen-reader"]')!.click()
    expect(document.getElementById('accessify-skip-link')).not.toBeNull()
    a.destroy()
  })

  it('removes acc-screen-reader class when deactivated', () => {
    const a = new Accessify()
    a.mount()
    const btn = () => document.querySelector<HTMLButtonElement>('.accessify-panel [data-profile="screen-reader"]')!
    btn().click()
    btn().click()
    expect(document.getElementById('accessify-host')?.classList.contains('acc-screen-reader')).toBe(false)
    a.destroy()
  })
})
