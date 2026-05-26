# @glitchlab/accessify

A lightweight, framework-agnostic accessibility widget for the web. Drop it into any site to give users control over font size, contrast, color filters, dyslexia aids, and more — with zero runtime dependencies.

Works as a plain JavaScript class or with first-class bindings for **React**, **Vue 3**, and **Svelte**.

---

## Features

- **8 accessibility profiles** — Seizure Safe, Vision Impaired, ADHD Friendly, Cognitive Disability, Keyboard Navigation, Screen Reader, Color Blind, Dyslexia
- **Content adjustments** — font size, content scale, line height, letter spacing, text alignment, readable font, text magnifier, title/link highlighting
- **Color adjustments** — dark contrast, light contrast, high contrast, monochrome, invert colors, color blind (protanopia filter)
- **3 widget sizes** — S / M / L
- **State persistence** via `localStorage` (opt-out available)
- **DOM isolation** — all effects are scoped to the host page content; the widget UI is never affected
- **Themeable** — override primary, background, and text colors
- **No dependencies** — core package is pure TypeScript/DOM

---

## Installation

```bash
npm install @glitchlab/accessify
# or
pnpm add @glitchlab/accessify
# or
yarn add @glitchlab/accessify
```

---

## Quick Start

### Vanilla JS / TypeScript

```ts
import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify({
  position: 'bottom-right',
  size: 'M',
})

widget.mount()
```

### React

```tsx
import { AccessifyWidget } from '@glitchlab/accessify/react'

export default function App() {
  return (
    <>
      <YourApp />
      <AccessifyWidget position="bottom-right" size="M" />
    </>
  )
}
```

### Vue 3

```vue
<script setup>
import { AccessifyWidget } from '@glitchlab/accessify/vue'
</script>

<template>
  <AccessifyWidget position="bottom-right" size="M" />
</template>
```

### Svelte

```svelte
<script>
  import { accessifyStore } from '@glitchlab/accessify/svelte'
  accessifyStore.mount()
</script>
```

---

## Configuration

All config options are optional.

```ts
interface AccessifyConfig {
  /** Widget trigger position. Default: 'bottom-right' */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

  /** Panel size. Default: 'M' */
  size?: 'S' | 'M' | 'L'

  /** Override default theme colors */
  theme?: {
    primary?: string     // trigger + panel header background. Default: '#0c0c0c'
    background?: string  // panel body background. Default: '#ffffff'
    text?: string        // panel body text. Default: '#0c0c0c'
  }

  /** Persist state to localStorage. Default: true */
  persistence?: boolean

  /** Language code (reserved for future i18n). Default: 'en' */
  lang?: string

  onOpen?: () => void
  onClose?: () => void
  onReset?: () => void
}
```

### Example with theme

```ts
const widget = new Accessify({
  position: 'bottom-left',
  size: 'L',
  theme: {
    primary: '#1d4ed8',
    background: '#f8fafc',
    text: '#0f172a',
  },
  persistence: false,
  onOpen: () => console.log('widget opened'),
})
```

---

## Core API

```ts
import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify(config?)
```

| Method | Description |
|---|---|
| `mount(target?)` | Inject the widget into the DOM. If no target is given, appends to `document.body` |
| `destroy()` | Remove the widget and all applied effects from the DOM |
| `open()` | Open the settings panel |
| `close()` | Close the settings panel |
| `toggle()` | Toggle the panel open/closed |
| `reset()` | Reset all accessibility settings to defaults |
| `setSize(size)` | Change widget size at runtime (`'S'`, `'M'`, `'L'`) |
| `getState()` | Returns a copy of the current `AccessifyState` |
| `getIsOpen()` | Returns whether the panel is currently open |

---

## React

### `<AccessifyWidget />`

A component that mounts the widget into its own container div.

```tsx
import { AccessifyWidget } from '@glitchlab/accessify/react'

<AccessifyWidget
  position="bottom-right"
  size="M"
  theme={{ primary: '#6d28d9' }}
  persistence={true}
  onOpen={() => {}}
  onClose={() => {}}
  onReset={() => {}}
/>
```

Accepts all `AccessifyConfig` props. Automatically destroys the widget on unmount.

### `useAccessify(config?)`

A hook for programmatic control.

```tsx
import { useAccessify } from '@glitchlab/accessify/react'

function MyComponent() {
  const { open, close, toggle, reset, state, isOpen } = useAccessify({
    position: 'top-right',
  })

  return (
    <button onClick={toggle}>
      {isOpen ? 'Close' : 'Open'} Accessibility
    </button>
  )
}
```

| Return value | Type | Description |
|---|---|---|
| `open` | `() => void` | Open the panel |
| `close` | `() => void` | Close the panel |
| `toggle` | `() => void` | Toggle the panel |
| `reset` | `() => void` | Reset all settings |
| `state` | `AccessifyState \| null` | Current accessibility state |
| `isOpen` | `boolean` | Whether the panel is open |

---

## Vue 3

### `<AccessifyWidget />`

```vue
<script setup>
import { AccessifyWidget } from '@glitchlab/accessify/vue'
</script>

<template>
  <AccessifyWidget
    position="bottom-right"
    size="M"
    :persistence="true"
  />
</template>
```

Props: `position`, `size`, `persistence`, `lang`.

### `useAccessify(config?)`

```vue
<script setup>
import { useAccessify } from '@glitchlab/accessify/vue'

const { open, close, toggle, reset, state, isOpen } = useAccessify()
</script>
```

### `AccessifyPlugin`

Register globally via the Vue plugin API:

```ts
import { createApp } from 'vue'
import { AccessifyPlugin } from '@glitchlab/accessify/vue'

const app = createApp(App)
app.use(AccessifyPlugin, { position: 'bottom-right' })
```

This provides the `Accessify` instance via `inject('accessify')` and `this.$accessify`.

---

## Svelte

### `accessifyStore`

A pre-built Svelte store for simple usage:

```svelte
<script>
  import { accessifyStore } from '@glitchlab/accessify/svelte'

  accessifyStore.mount()

  // Subscribe to state
  $: state = $accessifyStore
  $: isOpen = $accessifyStore.isOpen
</script>

<button on:click={accessifyStore.toggle}>Toggle</button>
```

| Method | Description |
|---|---|
| `mount(target?)` | Mount the widget |
| `destroy()` | Destroy the widget |
| `open()` | Open the panel |
| `close()` | Close the panel |
| `toggle()` | Toggle the panel |
| `reset()` | Reset all settings |

### `createAccessifyStore(config?)`

Create a custom store with your own config:

```ts
import { createAccessifyStore } from '@glitchlab/accessify/svelte'

const widget = createAccessifyStore({
  position: 'top-left',
  persistence: false,
})

widget.mount()
```

---

## Accessibility State

The full shape of the state object:

```ts
interface AccessifyState {
  // Active profile (null = none selected)
  profile: AccessibilityProfile | null

  // Numeric adjustments (0 = default)
  fontSize: number        // range: -5 to +10
  contentScale: number    // range: -5 to +5
  lineHeight: number      // range: -2 to +6
  letterSpacing: number   // range: -2 to +6

  // Text
  textAlignment: 'left' | 'center' | 'right' | 'default'

  // Content toggles
  readableFont: boolean
  highlightTitles: boolean
  highlightLinks: boolean
  textMagnifier: boolean

  // Color toggles (mutually exclusive group: dark/light/high/monochrome/invert)
  darkContrast: boolean
  lightContrast: boolean
  highContrast: boolean
  monochrome: boolean
  invertColors: boolean
  colorBlind: boolean
}

type AccessibilityProfile =
  | 'seizure-safe'
  | 'vision-impaired'
  | 'adhd-friendly'
  | 'cognitive-disability'
  | 'keyboard-navigation'
  | 'screen-reader'
  | 'color-blind'
  | 'dyslexia'
```

---

## Accessibility Profiles

Each profile applies a preset combination of settings. Selecting an active profile a second time resets all settings to defaults.

| Profile | Applied settings |
|---|---|
| `seizure-safe` | Light contrast, monochrome |
| `vision-impaired` | Font size +4, content scale +2, line height +2 |
| `adhd-friendly` | Highlight links, highlight titles, readable font |
| `cognitive-disability` | Highlight links, highlight titles, readable font, line height +2 |
| `keyboard-navigation` | _(focus styles only — no state changes)_ |
| `screen-reader` | _(screen reader optimized — no state changes)_ |
| `color-blind` | Color blind filter (protanopia SVG matrix) |
| `dyslexia` | Readable font, letter spacing +2, line height +2 |

---

## DOM Isolation

All effects (font size, filters, contrast) are scoped to a `#accessify-host` wrapper that contains the host page content. The widget UI is a **sibling** of this wrapper and is never affected by filters or contrast changes.

This means effects like `filter: grayscale(100%)` or `filter: invert(100%)` only apply to the page content, not to the accessibility widget itself.

---

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm --filter @glitchlab/accessify build

# Watch mode
pnpm --filter @glitchlab/accessify dev

# Run tests
pnpm --filter @glitchlab/accessify test

# Run tests in watch mode
pnpm --filter @glitchlab/accessify test:watch

# Coverage report
pnpm --filter @glitchlab/accessify test:coverage
```

---

## License

MIT © [GlitchLab](https://github.com/im-fahad)
