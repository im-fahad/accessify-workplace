import { describe, it, expect, afterEach, vi } from 'vitest'
import { get } from 'svelte/store'
import { createAccessifyStore, accessifyStore } from '../svelte/index'

afterEach(() => {
  document.body.innerHTML = ''
  document.head.querySelectorAll('style').forEach(s => s.remove())
  localStorage.clear()
  vi.restoreAllMocks()
})

describe('createAccessifyStore', () => {
  it('creates a store that exposes the expected API', () => {
    const store = createAccessifyStore()
    expect(typeof store.subscribe).toBe('function')
    expect(typeof store.mount).toBe('function')
    expect(typeof store.destroy).toBe('function')
    expect(typeof store.open).toBe('function')
    expect(typeof store.close).toBe('function')
    expect(typeof store.toggle).toBe('function')
    expect(typeof store.reset).toBe('function')
    expect(typeof store.setSize).toBe('function')
    expect(typeof store.setLang).toBe('function')
    expect(typeof store.setColorScheme).toBe('function')
  })

  it('mount() injects accessify-root into DOM', () => {
    const store = createAccessifyStore()
    store.mount()
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    store.destroy()
  })

  it('destroy() removes accessify-root from DOM', () => {
    const store = createAccessifyStore()
    store.mount()
    store.destroy()
    expect(document.querySelector('.accessify-root')).toBeNull()
  })

  it('open/close update isOpen store', () => {
    const store = createAccessifyStore()
    store.mount()
    expect(get(store.isOpen)).toBe(false)
    store.open()
    expect(get(store.isOpen)).toBe(true)
    store.close()
    expect(get(store.isOpen)).toBe(false)
    store.destroy()
  })

  it('toggle() flips isOpen', () => {
    const store = createAccessifyStore()
    store.mount()
    store.toggle()
    expect(get(store.isOpen)).toBe(true)
    store.toggle()
    expect(get(store.isOpen)).toBe(false)
    store.destroy()
  })

  it('subscribe() emits current state', () => {
    const store = createAccessifyStore()
    store.mount()
    const state = get(store)
    expect(state.profile).toBeNull()
    expect(state.fontSize).toBe(0)
    store.destroy()
  })

  it('setColorScheme() updates data-scheme on root', () => {
    const store = createAccessifyStore()
    store.mount()
    store.setColorScheme('dark')
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('dark')
    store.destroy()
  })

  it('passes config to underlying Accessify', () => {
    const store = createAccessifyStore({ colorScheme: 'dark', size: 'L' })
    store.mount()
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('dark')
    expect(document.querySelector<HTMLElement>('.accessify-panel')?.dataset.size).toBe('L')
    store.destroy()
  })
})

describe('accessifyStore (default singleton)', () => {
  it('exposes the same API as createAccessifyStore()', () => {
    expect(typeof accessifyStore.subscribe).toBe('function')
    expect(typeof accessifyStore.mount).toBe('function')
    expect(typeof accessifyStore.destroy).toBe('function')
  })

  it('is lazily constructed — accessing it does not throw before DOM is available', () => {
    expect(() => accessifyStore.subscribe).not.toThrow()
  })

  it('mount() works on the singleton', () => {
    accessifyStore.mount()
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    accessifyStore.destroy()
  })
})
