# Accessify Monorepo

A universal accessibility widget for the web, built with framework-specific bindings for React, Vue, and Svelte.

## Structure

```
accessify/
├── packages/
│   └── accessify/          # @glitchlab/accessify — universal npm package
└── playground/
    ├── vanilla/            # Vite + vanilla TS
    ├── react/              # Vite + React + TypeScript
    ├── nextjs/             # Next.js 14 App Router
    ├── vue/                # Vite + Vue 3 + TypeScript
    ├── nuxt/               # Nuxt 3
    └── svelte/             # SvelteKit
```

## Quick Start

```bash
pnpm install
pnpm dev         # runs all playgrounds
```

## Per-Playground Dev Commands

```bash
pnpm --filter playground-vanilla dev
pnpm --filter playground-react dev
pnpm --filter playground-nextjs dev
pnpm --filter playground-vue dev
pnpm --filter playground-nuxt dev
pnpm --filter playground-svelte dev
```

## Build

```bash
pnpm build
```

## Usage

### Vanilla JS/TS

```ts
import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify({ position: 'bottom-right', size: 'M' })
widget.mount()
```

### React

```tsx
import { AccessifyWidget, useAccessify } from '@glitchlab/accessify/react'

function App() {
  const { open, close, toggle, reset, state } = useAccessify()
  return <AccessifyWidget position="bottom-right" />
}
```

### Vue

```ts
import { createApp } from 'vue'
import { AccessifyPlugin } from '@glitchlab/accessify/vue'

const app = createApp(App)
app.use(AccessifyPlugin, { position: 'bottom-right' })
```

### Svelte

```svelte
<script>
  import { accessifyStore } from '@glitchlab/accessify/svelte'
  accessifyStore.mount()
</script>

<button on:click={() => accessifyStore.toggle()}>Toggle</button>
```

## License

MIT
