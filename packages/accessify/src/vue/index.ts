import { ref, reactive, onMounted, onUnmounted, defineComponent, type App, type Plugin } from 'vue'
import { Accessify, type AccessifyConfig, type AccessifyState } from '../core'

export const AccessifyPlugin: Plugin = {
  install(app: App, options: AccessifyConfig = {}) {
    const instance = new Accessify(options)
    app.provide('accessify', instance)
    app.config.globalProperties.$accessify = instance

    onMounted(() => instance.mount())
    onUnmounted(() => instance.destroy())
  },
}

export function useAccessify(config: AccessifyConfig = {}) {
  const instance = ref<Accessify | null>(null)
  const state = reactive<{ value: AccessifyState | null }>({ value: null })
  const isOpen = ref(false)

  onMounted(() => {
    const a = new Accessify(config)
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
    if (instance.value) {
      state.value = instance.value.getState()
    }
  }

  return { open, close, toggle, reset, state, isOpen }
}

export const AccessifyWidget = defineComponent({
  name: 'AccessifyWidget',
  props: {
    position: { type: String, default: 'bottom-right' },
    size: { type: String, default: 'M' },
    persistence: { type: Boolean, default: true },
    lang: { type: String, default: 'en' },
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

    return () => null
  },
})

export type { AccessifyConfig, AccessifyState } from '../core'
export { Accessify } from '../core'
