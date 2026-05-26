import { createApp } from 'vue'
import { AccessifyPlugin } from '@glitchlab/accessify/vue'
import App from './App.vue'

const app = createApp(App)
app.use(AccessifyPlugin, { position: 'bottom-right', size: 'M' })
app.mount('#app')
