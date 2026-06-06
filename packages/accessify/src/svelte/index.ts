import { writable } from 'svelte/store'
import { Accessify, type AccessifyConfig, type AccessifyState, type ColorScheme, type Lang, type TriggerScheme, type WidgetSize } from '../core'

export function createAccessifyStore(config: AccessifyConfig = {}) {
  const instance = new Accessify(config)
  const state = writable<AccessifyState>(instance.getState())
  const isOpen = writable(false)

  const sync = () => state.set(instance.getState())

  return {
    subscribe: state.subscribe,
    isOpen: { subscribe: isOpen.subscribe },
    mount: () => { instance.mount(); sync() },
    destroy: () => instance.destroy(),
    open: () => { instance.open(); isOpen.set(true) },
    close: () => { instance.close(); isOpen.set(false) },
    toggle: () => { instance.toggle(); isOpen.update(v => !v) },
    reset: () => { instance.reset(); sync() },
    setSize: (size: WidgetSize) => { instance.setSize(size); sync() },
    setLang: (lang: Lang) => { instance.setLang(lang); sync() },
    setColorScheme: (scheme: ColorScheme) => { instance.setColorScheme(scheme); sync() },
    setTriggerScheme: (scheme: TriggerScheme) => { instance.setTriggerScheme(scheme); sync() },
  }
}

let _defaultStore: ReturnType<typeof createAccessifyStore> | null = null

/**
 * Default singleton store. Lazily created so it doesn't construct an
 * Accessify instance during SSR module evaluation.
 */
export const accessifyStore = new Proxy({} as ReturnType<typeof createAccessifyStore>, {
  get(_, prop) {
    _defaultStore ??= createAccessifyStore()
    return Reflect.get(_defaultStore as object, prop)
  },
})

export type { AccessifyConfig, AccessifyState } from '../core'
export { Accessify } from '../core'
