import type { AccessifyState } from './types'

const HOST_STYLE_ID = 'accessify-host-effects'
export const HOST_WRAPPER_ID = 'accessify-host'
const COLOR_BLIND_FILTER_ID = 'acc-protanopia-filter'

function ensureColorBlindFilter(): void {
  if (document.getElementById(COLOR_BLIND_FILTER_ID)) return
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.id = COLOR_BLIND_FILTER_ID
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;'
  svg.innerHTML = `
    <defs>
      <filter id="acc-protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0 1 0"/>
      </filter>
    </defs>`
  document.body.appendChild(svg)
}

function ensureHostStyle(): HTMLStyleElement {
  let el = document.getElementById(HOST_STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = document.createElement('style')
    el.id = HOST_STYLE_ID
    document.head.appendChild(el)
  }
  return el
}

export function ensureHostWrapper(): HTMLDivElement {
  let wrapper = document.getElementById(HOST_WRAPPER_ID) as HTMLDivElement | null
  if (wrapper) return wrapper

  wrapper = document.createElement('div')
  wrapper.id = HOST_WRAPPER_ID
  const body = document.body
  const moved: Node[] = []
  for (const node of Array.from(body.childNodes)) {
    if (node instanceof HTMLElement && (node.classList.contains('accessify-root') || node.id === HOST_WRAPPER_ID)) {
      continue
    }
    moved.push(node)
  }
  for (const node of moved) wrapper.appendChild(node)
  body.insertBefore(wrapper, body.firstChild)
  return wrapper
}

export function unwrapHost(): void {
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (!wrapper) return
  const body = wrapper.parentElement
  if (!body) return
  while (wrapper.firstChild) body.insertBefore(wrapper.firstChild, wrapper)
  wrapper.remove()
}

const FONT_STEP = 0.1
const SCALE_STEP = 0.1
const LH_STEP = 0.25
const LS_STEP = 0.05

function dynamicCss(state: AccessifyState): string {
  const rules: string[] = []
  const scope = `#${HOST_WRAPPER_ID}`

  if (state.fontSize !== 0) {
    const pct = 100 + state.fontSize * FONT_STEP * 100
    // Set on wrapper so inheritance does the work — avoids compounding on nested elements
    rules.push(`${scope} { font-size: ${pct}% !important; }`)
  }
  if (state.contentScale !== 0) {
    const factor = 1 + state.contentScale * SCALE_STEP
    // zoom for Chromium/Safari, transform+origin for Firefox
    rules.push(`${scope} { zoom: ${factor}; transform: scale(${factor}); transform-origin: top left; }`)
  }
  if (state.lineHeight !== 0) {
    const lh = 1.5 + state.lineHeight * LH_STEP
    rules.push(`${scope} * { line-height: ${lh} !important; }`)
  }
  if (state.letterSpacing !== 0) {
    const ls = state.letterSpacing * LS_STEP
    rules.push(`${scope} * { letter-spacing: ${ls}em !important; }`)
  }
  if (state.textAlignment !== 'default') {
    rules.push(`${scope} * { text-align: ${state.textAlignment} !important; }`)
  }
  return rules.join('\n')
}

let magnifierHandler: ((e: MouseEvent) => void) | null = null
let magnifierEl: HTMLDivElement | null = null

function enableMagnifier(): void {
  if (magnifierHandler) return
  magnifierEl = document.createElement('div')
  magnifierEl.className = 'acc-magnify-cursor'
  magnifierEl.style.display = 'none'
  document.body.appendChild(magnifierEl)

  magnifierHandler = (e: MouseEvent) => {
    if (!magnifierEl) return
    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!el || el.closest('.accessify-root') || el.closest('.acc-magnify-cursor')) {
      magnifierEl.style.display = 'none'
      return
    }
    const text = (el.textContent || '').trim().slice(0, 200)
    if (!text) {
      magnifierEl.style.display = 'none'
      return
    }
    magnifierEl.textContent = text
    magnifierEl.style.display = 'block'
    magnifierEl.style.left = `${Math.min(e.clientX + 14, window.innerWidth - 340)}px`
    magnifierEl.style.top = `${Math.min(e.clientY + 14, window.innerHeight - 80)}px`
  }
  document.addEventListener('mousemove', magnifierHandler)
}

function disableMagnifier(): void {
  if (magnifierHandler) {
    document.removeEventListener('mousemove', magnifierHandler)
    magnifierHandler = null
  }
  if (magnifierEl) {
    magnifierEl.remove()
    magnifierEl = null
  }
}

const LENS_DIAMETER = 260
const LENS_ZOOM = 2.75

let lensEl: HTMLDivElement | null = null
let lensInner: HTMLDivElement | null = null
let lensMoveHandler: ((e: MouseEvent) => void) | null = null
let lensRefreshTimer: number | null = null

function snapshotHostIntoLens(): void {
  if (!lensInner) return
  const host = document.getElementById(HOST_WRAPPER_ID)
  if (!host) return
  const rect = host.getBoundingClientRect()
  lensInner.innerHTML = ''
  const clone = host.cloneNode(true) as HTMLElement
  clone.id = ''
  clone.style.position = 'absolute'
  clone.style.top = `${rect.top}px`
  clone.style.left = `${rect.left}px`
  clone.style.width = `${rect.width}px`
  clone.style.pointerEvents = 'none'
  // Strip interactive cloned widgets that would re-mount/clash
  clone.querySelectorAll('.accessify-root, .acc-reading-lens, script, iframe').forEach(n => n.remove())
  lensInner.appendChild(clone)
}

function enableReadingLens(): void {
  if (lensEl) return
  lensEl = document.createElement('div')
  lensEl.className = 'acc-reading-lens'
  lensEl.setAttribute('aria-hidden', 'true')
  lensEl.style.display = 'none'

  lensInner = document.createElement('div')
  lensInner.className = 'acc-reading-lens-inner'
  lensInner.style.transform = `scale(${LENS_ZOOM})`
  lensEl.appendChild(lensInner)

  document.body.appendChild(lensEl)
  snapshotHostIntoLens()

  lensMoveHandler = (e: MouseEvent) => {
    if (!lensEl || !lensInner) return
    const target = e.target as Element | null
    if (target?.closest('.accessify-root')) {
      lensEl.style.display = 'none'
      return
    }
    lensEl.style.display = 'block'
    const half = LENS_DIAMETER / 2
    lensEl.style.left = `${e.clientX - half}px`
    lensEl.style.top = `${e.clientY - half}px`
    // Translate the scaled clone so the cursor point ends up at lens center.
    // After scale(Z) around top-left, point (x,y) → (x*Z, y*Z); we want it at (half, half).
    const tx = half - e.clientX * LENS_ZOOM
    const ty = half - e.clientY * LENS_ZOOM
    lensInner.style.transform = `translate(${tx}px, ${ty}px) scale(${LENS_ZOOM})`
  }
  document.addEventListener('mousemove', lensMoveHandler)
  lensRefreshTimer = globalThis.setInterval(snapshotHostIntoLens, 800)
}

function disableReadingLens(): void {
  if (lensMoveHandler) {
    document.removeEventListener('mousemove', lensMoveHandler)
    lensMoveHandler = null
  }
  if (lensRefreshTimer !== null) {
    clearInterval(lensRefreshTimer)
    lensRefreshTimer = null
  }
  if (lensEl) {
    lensEl.remove()
    lensEl = null
    lensInner = null
  }
}

export function applyEffects(state: AccessifyState): void {
  if (typeof document === 'undefined') return
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (!wrapper) return

  const toggles: Array<[string, boolean]> = [
    ['acc-readable-font', state.readableFont],
    ['acc-dyslexia', state.profile === 'dyslexia'],
    ['acc-highlight-titles', state.highlightTitles],
    ['acc-highlight-links', state.highlightLinks],
    ['acc-dark-contrast', state.darkContrast],
    ['acc-light-contrast', state.lightContrast],
    ['acc-high-contrast', state.highContrast],
    ['acc-monochrome', state.monochrome],
    ['acc-invert', state.invertColors],
    ['acc-color-blind', state.colorBlind],
    ['acc-text-magnifier', state.textMagnifier],
    ['acc-keyboard-nav', state.profile === 'keyboard-navigation'],
    ['acc-screen-reader', state.profile === 'screen-reader'],
  ]
  for (const [cls, on] of toggles) {
    wrapper.classList.toggle(cls, on)
  }
  if (state.colorBlind) ensureColorBlindFilter()
  ensureHostStyle().textContent = dynamicCss(state)
  if (state.textMagnifier) enableMagnifier()
  else disableMagnifier()
  if (state.readingLens) enableReadingLens()
  else disableReadingLens()
}

export function clearEffects(): void {
  if (typeof document === 'undefined') return
  const wrapper = document.getElementById(HOST_WRAPPER_ID)
  if (wrapper) {
    for (const cls of Array.from(wrapper.classList)) {
      if (cls.startsWith('acc-')) wrapper.classList.remove(cls)
    }
  }
  const host = document.getElementById(HOST_STYLE_ID)
  if (host) host.textContent = ''
  document.getElementById(COLOR_BLIND_FILTER_ID)?.remove()
  disableMagnifier()
  disableReadingLens()
}
