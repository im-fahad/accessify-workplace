import { describe, it, expect, afterEach } from 'vitest'
import { createApp, defineComponent, h, nextTick } from 'vue'
import { AccessifyWidget, AccessifyPlugin, useAccessify } from '../vue/index'

afterEach(() => {
  document.body.innerHTML = ''
  document.head.querySelectorAll('style').forEach(s => s.remove())
  localStorage.clear()
})

function mountVue(component: ReturnType<typeof defineComponent>) {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const app = createApp(component)
  app.mount(root)
  return app
}

describe('AccessifyWidget (Vue)', () => {
  it('mounts accessify-root into the DOM', async () => {
    const app = mountVue(defineComponent({ render: () => h(AccessifyWidget) }))
    await nextTick()
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    app.unmount()
  })

  it('applies position prop to trigger', async () => {
    const app = mountVue(defineComponent({ render: () => h(AccessifyWidget, { position: 'top-left' }) }))
    await nextTick()
    expect(document.querySelector<HTMLElement>('.accessify-trigger')?.dataset.position).toBe('top-left')
    app.unmount()
  })

  it('applies size prop to panel', async () => {
    const app = mountVue(defineComponent({ render: () => h(AccessifyWidget, { size: 'S' }) }))
    await nextTick()
    expect(document.querySelector<HTMLElement>('.accessify-panel')?.dataset.size).toBe('S')
    app.unmount()
  })

  it('applies colorScheme="dark" prop to root', async () => {
    const app = mountVue(defineComponent({ render: () => h(AccessifyWidget, { colorScheme: 'dark' }) }))
    await nextTick()
    expect(document.querySelector<HTMLElement>('.accessify-root')?.dataset.scheme).toBe('dark')
    app.unmount()
  })

  it('unmounting destroys the widget', async () => {
    const app = mountVue(defineComponent({ render: () => h(AccessifyWidget) }))
    await nextTick()
    app.unmount()
    await nextTick()
    expect(document.querySelector('.accessify-root')).toBeNull()
  })
})

describe('useAccessify (Vue)', () => {
  it('mounts the widget on component mount', async () => {
    const Comp = defineComponent({
      setup() {
        useAccessify()
        return () => null
      },
    })
    const app = mountVue(Comp)
    await nextTick()
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    app.unmount()
  })

  it('open() opens the panel', async () => {
    let api!: ReturnType<typeof useAccessify>
    const Comp = defineComponent({
      setup() {
        api = useAccessify()
        return () => null
      },
    })
    const app = mountVue(Comp)
    await nextTick()
    api.open()
    await nextTick()
    expect(document.querySelector('.accessify-panel')?.classList.contains('open')).toBe(true)
    app.unmount()
  })

  it('toggle() flips open state', async () => {
    let api!: ReturnType<typeof useAccessify>
    const Comp = defineComponent({
      setup() {
        api = useAccessify()
        return () => null
      },
    })
    const app = mountVue(Comp)
    await nextTick()
    api.toggle()
    expect(api.isOpen.value).toBe(true)
    api.toggle()
    expect(api.isOpen.value).toBe(false)
    app.unmount()
  })
})

describe('AccessifyPlugin (Vue)', () => {
  it('installs and mounts the widget eagerly', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const app = createApp(defineComponent({ render: () => null }))
    app.use(AccessifyPlugin, { position: 'bottom-left' })
    app.mount(root)
    expect(document.querySelector('.accessify-root')).not.toBeNull()
    expect(document.querySelector<HTMLElement>('.accessify-trigger')?.dataset.position).toBe('bottom-left')
    app.unmount()
  })

  it('exposes instance via $accessify global property', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const app = createApp(defineComponent({ render: () => null }))
    app.use(AccessifyPlugin)
    app.mount(root)
    expect(app.config.globalProperties.$accessify).toBeDefined()
    expect(typeof app.config.globalProperties.$accessify.open).toBe('function')
    app.unmount()
  })
})
