# @glitchlab/accessify

A universal accessibility widget with framework-specific bindings for React, Vue, and Svelte.

## Installation

```bash
npm install @glitchlab/accessify
# or
pnpm add @glitchlab/accessify
```

## Core API

```ts
import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify(config?)
widget.mount(target?)    // inject widget into DOM
widget.destroy()         // remove widget from DOM
widget.open()            // open panel
widget.close()           // close panel
widget.toggle()          // toggle panel
widget.reset()           // reset all settings
widget.getState()        // get current state
widget.getIsOpen()       // get open status
```

## Configuration

```ts
interface AccessifyConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'S' | 'M' | 'L'
  theme?: {
    primary?: string
    background?: string
    text?: string
  }
  persistence?: boolean    // save to localStorage (default: true)
  lang?: string            // language code (default: 'en')
  onOpen?: () => void
  onClose?: () => void
  onReset?: () => void
}
```

## State

```ts
interface AccessifyState {
  profile: AccessibilityProfile | null
  fontSize: number              // -3 to +3 steps
  contentScale: number
  lineHeight: number
  letterSpacing: number
  textAlignment: 'left' | 'center' | 'right' | 'default'
  readableFont: boolean
  highlightTitles: boolean
  highlightLinks: boolean
  textMagnifier: boolean
  darkContrast: boolean
  lightContrast: boolean
  highContrast: boolean
  colorBlind: boolean
  monochrome: boolean
  invertColors: boolean
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

## React

```tsx
import { AccessifyWidget, useAccessify } from '@glitchlab/accessify/react'

// Component
<AccessifyWidget position="bottom-right" size="M" />

// Hook
const { open, close, toggle, reset, state, isOpen } = useAccessify(config?)
```

## Vue

```ts
import { AccessifyPlugin, AccessifyWidget, useAccessify } from '@glitchlab/accessify/vue'

// Plugin
app.use(AccessifyPlugin, config?)

// Component
<AccessifyWidget position="bottom-right" />

// Composable
const { open, close, toggle, reset, state, isOpen } = useAccessify(config?)
```

## Svelte

```ts
import { accessifyStore, createAccessifyStore } from '@glitchlab/accessify/svelte'

// Default store
accessifyStore.mount()
accessifyStore.open()
accessifyStore.toggle()
accessifyStore.reset()

// Custom store
const store = createAccessifyStore(config?)
```

## License

MIT
