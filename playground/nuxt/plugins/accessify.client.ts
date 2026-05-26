import { Accessify } from '@glitchlab/accessify'

export default defineNuxtPlugin(() => {
  const accessify = new Accessify({
    position: 'bottom-right',
    size: 'M',
    persistence: true,
  })

  accessify.mount()

  return {
    provide: {
      accessify,
    },
  }
})
