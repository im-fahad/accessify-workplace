import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  ensureHostWrapper,
  unwrapHost,
  applyEffects,
  clearEffects,
  HOST_WRAPPER_ID,
} from '../core/effects'
import { DEFAULT_STATE } from '../core/types'

function freshState() {
  return { ...DEFAULT_STATE }
}

beforeEach(() => {
  document.body.innerHTML = '<p id="content">hello</p>'
})

afterEach(() => {
  clearEffects()
  unwrapHost()
  document.body.innerHTML = ''
})

describe('ensureHostWrapper', () => {
  it('creates the wrapper div in body', () => {
    ensureHostWrapper()
    expect(document.getElementById(HOST_WRAPPER_ID)).not.toBeNull()
  })

  it('moves existing body children into wrapper', () => {
    ensureHostWrapper()
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    expect(wrapper.querySelector('#content')).not.toBeNull()
  })

  it('does not move .accessify-root elements into wrapper', () => {
    const root = document.createElement('div')
    root.className = 'accessify-root'
    document.body.appendChild(root)
    ensureHostWrapper()
    expect(document.body.contains(root)).toBe(true)
    expect(document.getElementById(HOST_WRAPPER_ID)!.contains(root)).toBe(false)
  })

  it('is idempotent — calling twice returns same wrapper', () => {
    const a = ensureHostWrapper()
    const b = ensureHostWrapper()
    expect(a).toBe(b)
    expect(document.querySelectorAll(`#${HOST_WRAPPER_ID}`)).toHaveLength(1)
  })
})

describe('unwrapHost', () => {
  it('restores children back to body and removes wrapper', () => {
    ensureHostWrapper()
    unwrapHost()
    expect(document.getElementById(HOST_WRAPPER_ID)).toBeNull()
    expect(document.getElementById('content')).not.toBeNull()
  })

  it('is a no-op when wrapper does not exist', () => {
    expect(() => unwrapHost()).not.toThrow()
  })
})

describe('applyEffects', () => {
  beforeEach(() => {
    ensureHostWrapper()
  })

  it('toggles acc-readable-font class', () => {
    const state = freshState()
    state.readableFont = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-readable-font')).toBe(true)
  })

  it('removes acc-readable-font when false', () => {
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    wrapper.classList.add('acc-readable-font')
    applyEffects(freshState())
    expect(wrapper.classList.contains('acc-readable-font')).toBe(false)
  })

  it('toggles acc-highlight-titles', () => {
    const state = freshState()
    state.highlightTitles = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-highlight-titles')).toBe(true)
  })

  it('toggles acc-highlight-links', () => {
    const state = freshState()
    state.highlightLinks = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-highlight-links')).toBe(true)
  })

  it('toggles acc-dark-contrast', () => {
    const state = freshState()
    state.darkContrast = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-dark-contrast')).toBe(true)
  })

  it('toggles acc-light-contrast', () => {
    const state = freshState()
    state.lightContrast = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-light-contrast')).toBe(true)
  })

  it('toggles acc-high-contrast', () => {
    const state = freshState()
    state.highContrast = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-high-contrast')).toBe(true)
  })

  it('toggles acc-monochrome', () => {
    const state = freshState()
    state.monochrome = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-monochrome')).toBe(true)
  })

  it('toggles acc-invert for invertColors', () => {
    const state = freshState()
    state.invertColors = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-invert')).toBe(true)
  })

  it('toggles acc-color-blind and injects SVG filter', () => {
    const state = freshState()
    state.colorBlind = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-color-blind')).toBe(true)
    expect(document.getElementById('acc-protanopia-filter')).not.toBeNull()
  })

  it('toggles acc-dyslexia for dyslexia profile', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)!.classList.contains('acc-dyslexia')).toBe(true)
  })

  it('injects dynamic font-size CSS for non-zero fontSize', () => {
    const state = freshState()
    state.fontSize = 2
    applyEffects(state)
    const style = document.getElementById('accessify-host-effects') as HTMLStyleElement
    expect(style?.textContent).toContain('font-size:')
  })

  it('does nothing when wrapper is absent', () => {
    unwrapHost()
    expect(() => applyEffects(freshState())).not.toThrow()
  })

  it('mounts reading lens element when readingLens is true', () => {
    const state = freshState()
    state.readingLens = true
    applyEffects(state)
    expect(document.querySelector('.acc-reading-lens')).not.toBeNull()
    expect(document.querySelector('.acc-reading-lens-inner')).not.toBeNull()
  })

  it('removes reading lens element when readingLens turns off', () => {
    const state = freshState()
    state.readingLens = true
    applyEffects(state)
    state.readingLens = false
    applyEffects(state)
    expect(document.querySelector('.acc-reading-lens')).toBeNull()
  })

  it('does NOT add acc-reading-lens class to wrapper (avoids style collision with the lens element)', () => {
    const state = freshState()
    state.readingLens = true
    applyEffects(state)
    expect(document.getElementById(HOST_WRAPPER_ID)?.classList.contains('acc-reading-lens')).toBe(false)
  })
})

describe('clearEffects', () => {
  beforeEach(() => {
    ensureHostWrapper()
  })

  it('removes all acc-* classes from wrapper', () => {
    const state = freshState()
    state.readableFont = true
    state.darkContrast = true
    applyEffects(state)
    clearEffects()
    const wrapper = document.getElementById(HOST_WRAPPER_ID)!
    const accClasses = Array.from(wrapper.classList).filter(c => c.startsWith('acc-'))
    expect(accClasses).toHaveLength(0)
  })

  it('clears dynamic style content', () => {
    const state = freshState()
    state.fontSize = 3
    applyEffects(state)
    clearEffects()
    const style = document.getElementById('accessify-host-effects') as HTMLStyleElement
    expect(style?.textContent ?? '').toBe('')
  })

  it('removes the color-blind SVG filter element', () => {
    const state = freshState()
    state.colorBlind = true
    applyEffects(state)
    clearEffects()
    expect(document.getElementById('acc-protanopia-filter')).toBeNull()
  })

  it('is safe to call when nothing was applied', () => {
    expect(() => clearEffects()).not.toThrow()
  })
})
