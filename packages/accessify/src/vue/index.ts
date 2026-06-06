import { ref, shallowRef, onMounted, onUnmounted, watch, defineComponent, type App, type Plugin, type PropType } from 'vue'
import {
  Accessify,
  type AccessifyConfig,
  type AccessifyState,
  type ColorScheme,
  type Lang,
  type WidgetSize,
} from '../core'

export const AccessifyPlugin: Plugin = {
  install(app: App, options: AccessifyConfig = {}) {
    if (typeof document === 'undefined') return
    const instance = new Accessify(options)
    instance.mount()
    app.provide('accessify', instance)
    app.config.globalProperties.$accessify = instance
  },
}

export function useAccessify(config: AccessifyConfig = {}) {
  const instance = shallowRef<Accessify | null>(null)
  const state = ref<AccessifyState | null>(null)
  const isOpen = ref(false)

  onMounted(() => {
    const a = new Accessify(config)
    a.mount()
    instance.value = a
    state.value = a.getState()
  })

  onUnmounted(() => {
    instance.value?.destroy()
  })

  const open = () => {
    instance.value?.open()
    isOpen.value = true
  }
  const close = () => {
    instance.value?.close()
    isOpen.value = false
  }
  const toggle = () => {
    instance.value?.toggle()
    isOpen.value = !isOpen.value
  }
  const reset = () => {
    instance.value?.reset()
    if (instance.value) state.value = instance.value.getState()
  }

  return { open, close, toggle, reset, state, isOpen }
}

export const AccessifyWidget = defineComponent({
  name: 'AccessifyWidget',
  props: {
    position: { type: String as PropType<AccessifyConfig['position']>, default: 'bottom-right' },
    size: { type: String as PropType<WidgetSize>, default: 'M' },
    colorScheme: { type: String as PropType<ColorScheme>, default: 'light' },
    lang: { type: String as PropType<Lang>, default: 'en' },
    triggerScheme: { type: String as PropType<AccessifyConfig['triggerScheme']>, default: undefined },
    persistence: { type: Boolean, default: true },
    theme: { type: Object as PropType<AccessifyConfig['theme']>, default: undefined },
  },
  setup(props) {
    let instance: Accessify | null = null

    onMounted(() => {
      instance = new Accessify(props as AccessifyConfig)
      instance.mount()
    })

    onUnmounted(() => {
      instance?.destroy()
    })

    watch(() => props.colorScheme, v => { if (v) instance?.setColorScheme(v) })
    watch(() => props.lang, v => { if (v) instance?.setLang(v) })
    watch(() => props.size, v => { if (v) instance?.setSize(v) })
    watch(() => props.triggerScheme, v => { if (v) instance?.setTriggerScheme(v) })

    return () => null
  },
})

export type { AccessifyConfig, AccessifyState } from '../core'
export { Accessify } from '../core'
