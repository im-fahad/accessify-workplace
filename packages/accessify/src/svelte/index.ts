import { writable } from 'svelte/store'
import { Accessify, type AccessifyConfig, type AccessifyState } from '../core'

const DEFAULT_STATE: AccessifyState = {
  profile: null,
  fontSize: 0,
  contentScale: 1,
  lineHeight: 1,
  letterSpacing: 0,
  textAlignment: 'default',
  readableFont: false,
  highlightTitles: false,
  highlightLinks: false,
  textMagnifier: false,
  darkContrast: false,
  lightContrast: false,
  highContrast: false,
  colorBlind: false,
  monochrome: false,
  invertColors: false,
}

export function createAccessifyStore(config: AccessifyConfig = {}) {
  const instance = new Accessify(config)
  const state = writable<AccessifyState>(instance.getState())
  const isOpen = writable(false)

  return {
    subscribe: state.subscribe,
    isOpen,
    mount: (target?: HTMLElement) => instance.mount(target),
    destroy: () => instance.destroy(),
    open: () => {
      instance.open()
      isOpen.set(true)
    },
    close: () => {
      instance.close()
      isOpen.set(false)
    },
    toggle: () => {
      instance.toggle()
      isOpen.update(v => !v)
    },
    reset: () => {
      instance.reset()
      state.set(instance.getState())
    },
  }
}

export const accessifyStore = createAccessifyStore()

export type { AccessifyConfig, AccessifyState } from '../core'
export { Accessify } from '../core'
