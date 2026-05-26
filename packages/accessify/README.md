# @glitchlab/accessify

A lightweight, framework-agnostic accessibility widget for the web. Drop it into any site to give users control over font size, contrast, color filters, dyslexia aids, and more — with zero runtime dependencies.

Works as a plain JavaScript class or with first-class bindings for **React**, **Vue 3**, and **Svelte**.

---

## Features

- **8 accessibility profiles** — Seizure Safe, Vision Impaired, ADHD Friendly, Cognitive Disability, Keyboard Navigation, Screen Reader, Color Blind, Dyslexia
- **Content adjustments** — font size, content scale, line height, letter spacing, text alignment, readable font, text magnifier, title/link highlighting
- **Color adjustments** — dark contrast, light contrast, high contrast, monochrome, invert colors, color blind (protanopia filter)
- **Dark mode** — auto-detects OS `prefers-color-scheme`, or set manually via `colorScheme` config
- **Keyboard navigation** — full focus trap in panel, Escape to close, skip-to-main link injection
- **i18n** — built-in translations for English, Spanish, French, German, Portuguese, Arabic (RTL supported)
- **WCAG page scanner** — one-click analysis with score and categorised issues (contrast, alt text, labels, headings, etc.)
- **3 widget sizes** — S / M / L
- **State persistence** via `localStorage` (opt-out available)
- **DOM isolation** — all effects are scoped to the host page; the widget UI is never affected
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
  colorScheme: 'light', // 'light' | 'dark'
  lang: 'en',          // 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar'
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
      <AccessifyWidget position="bottom-right" size="M" colorScheme="light" lang="en" />
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

  /** Color scheme for the widget UI. Default: 'light' */
  colorScheme?: 'light' | 'dark'

  /** Panel language. Default: 'en' */
  lang?: 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar'

  /** Override default theme colors */
  theme?: {
    primary?: string     // trigger + panel header background. Default: '#0c0c0c'
    background?: string  // panel body background. Default: '#ffffff'
    text?: string        // panel body text. Default: '#0c0c0c'
  }

  /** Persist state to localStorage. Default: true */
  persistence?: boolean

  onOpen?: () => void
  onClose?: () => void
  onReset?: () => void
}
```

---

## Core API

```ts
import { Accessify } from '@glitchlab/accessify'

const widget = new Accessify(config?)
```

| Method | Description |
|---|---|
| `mount(target?)` | Inject widget into DOM. No target = appends to `document.body` |
| `destroy()` | Remove widget and all applied effects |
| `open()` | Open the settings panel |
| `close()` | Close the settings panel |
| `toggle()` | Toggle the panel open/closed |
| `reset()` | Reset all settings to defaults |
| `setSize(size)` | Change widget size at runtime (`'S'`, `'M'`, `'L'`) |
| `setLang(lang)` | Change language at runtime |
| `setColorScheme(scheme)` | Change color scheme at runtime (`'light'`, `'dark'`, `'auto'`) |
| `getState()` | Returns a copy of the current `AccessifyState` |
| `getIsOpen()` | Returns whether the panel is open |

---

## Dark Mode

The widget is light by default. Pass `colorScheme: 'dark'` to enable dark mode:

```ts
// Light (default)
new Accessify({ colorScheme: 'light' })

// Dark
new Accessify({ colorScheme: 'dark' })

// Change at runtime
widget.setColorScheme('dark')
widget.setColorScheme('light')
```

---

## Internationalisation (i18n)

All panel text is translated. Pass the `lang` config option or call `setLang()` at runtime:

```ts
new Accessify({ lang: 'fr' })

// Change at runtime
widget.setLang('ar') // also applies RTL layout
```

| Code | Language |
|---|---|
| `en` | English (default) |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `pt` | Portuguese |
| `ar` | Arabic (RTL) |

---

## Keyboard Navigation

The widget is fully keyboard accessible:

- **Tab / Shift+Tab** — cycles focus within the open panel (focus trap)
- **Escape** — closes the panel and returns focus to the trigger button
- **Keyboard Navigation profile** — automatically injects a skip-to-main-content link into the page when activated

The trigger button exposes `aria-expanded` and the panel has `role="dialog"` with `aria-modal="true"`.

---

## WCAG Page Scanner

Click **Analyze Page** inside the widget to run a live accessibility scan. The scanner checks:

| Check | Severity |
|---|---|
| Images missing `alt` text | Fail |
| Form inputs without labels | Fail |
| Buttons with no accessible name | Fail |
| Links with no accessible text | Fail |
| Missing `lang` attribute on `<html>` | Fail |
| iframes missing `title` | Fail |
| Text with insufficient color contrast | Fail |
| Skipped heading levels (e.g. h1 → h3) | Warning |
| Interactive elements smaller than 24×24px | Warning |
| No skip-to-main link | Warning |

Results include a score (0–100), issue count, and per-issue element selectors.

---

## React

### `<AccessifyWidget />`

```tsx
import { AccessifyWidget } from '@glitchlab/accessify/react'

<AccessifyWidget
  position="bottom-right"
  size="M"
  colorScheme="dark"
  lang="en"
  theme={{ primary: '#6d28d9' }}
  persistence={true}
  onOpen={() => {}}
  onClose={() => {}}
  onReset={() => {}}
/>
```

The `colorScheme`, `lang`, and `size` props are **reactive** — changing them after mount will update the widget at runtime.

```tsx
```

### `useAccessify(config?)`

```tsx
import { useAccessify } from '@glitchlab/accessify/react'

function MyComponent() {
  const { open, close, toggle, reset, state, isOpen } = useAccessify({
    position: 'top-right',
    lang: 'fr',
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
  <AccessifyWidget position="bottom-right" size="M" :persistence="true" />
</template>
```

### `useAccessify(config?)`

```vue
<script setup>
import { useAccessify } from '@glitchlab/accessify/vue'

const { open, close, toggle, reset, state, isOpen } = useAccessify({ lang: 'de' })
</script>
```

### `AccessifyPlugin`

```ts
import { createApp } from 'vue'
import { AccessifyPlugin } from '@glitchlab/accessify/vue'

const app = createApp(App)
app.use(AccessifyPlugin, { position: 'bottom-right', lang: 'es' })
```

---

## Svelte

### `accessifyStore`

```svelte
<script>
  import { accessifyStore } from '@glitchlab/accessify/svelte'
  accessifyStore.mount()
</script>

<button on:click={accessifyStore.toggle}>Toggle</button>
```

### `createAccessifyStore(config?)`

```ts
import { createAccessifyStore } from '@glitchlab/accessify/svelte'

const widget = createAccessifyStore({ lang: 'pt', colorScheme: 'dark' })
widget.mount()
```

---

## Accessibility State

```ts
interface AccessifyState {
  profile: AccessibilityProfile | null

  // Numeric adjustments (0 = default)
  fontSize: number        // range: -5 to +10
  contentScale: number    // range: -5 to +5
  lineHeight: number      // range: -2 to +6
  letterSpacing: number   // range: -2 to +6

  textAlignment: 'left' | 'center' | 'right' | 'default'

  // Content toggles
  readableFont: boolean
  highlightTitles: boolean
  highlightLinks: boolean
  textMagnifier: boolean

  // Color toggles (dark/light/high/monochrome/invert are mutually exclusive)
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

| Profile | Applied settings |
|---|---|
| `seizure-safe` | Light contrast, monochrome |
| `vision-impaired` | Font size +4, content scale +2, line height +2 |
| `adhd-friendly` | Highlight links, highlight titles, readable font |
| `cognitive-disability` | Highlight links, highlight titles, readable font, line height +2 |
| `keyboard-navigation` | Skip-to-main link injection |
| `screen-reader` | Screen reader optimised layout |
| `color-blind` | Protanopia SVG filter |
| `dyslexia` | Readable font, letter spacing +2, line height +2 |

Selecting an active profile a second time resets all settings to defaults.

---

## DOM Isolation

All effects are scoped to a `#accessify-host` wrapper that contains the host page content. The widget UI is a **sibling** of this wrapper and is never affected by filters or contrast changes.

---

## Development

```bash
pnpm install

# Build
pnpm --filter @glitchlab/accessify build

# Watch
pnpm --filter @glitchlab/accessify dev

# Test
pnpm --filter @glitchlab/accessify test

# Watch mode
pnpm --filter @glitchlab/accessify test:watch

# Coverage
pnpm --filter @glitchlab/accessify test:coverage
```

---

## License

MIT © [GlitchLab](https://github.com/im-fahad)
