export type WcagSeverity = 'fail' | 'warn' | 'pass'

export interface WcagIssue {
  id: string
  severity: WcagSeverity
  message: string
  element?: string
  count: number
}

export interface WcagResult {
  score: number
  issues: WcagIssue[]
}

function getSelector(el: Element): string {
  if (el.id) return `#${el.id}`
  const tag = el.tagName.toLowerCase()
  const cls = Array.from(el.classList).slice(0, 2).join('.')
  return cls ? `${tag}.${cls}` : tag
}

function getLuminance(r: number, g: number, b: number): number {
  const toLinear = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

function parseColor(color: string): [number, number, number] | null {
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return null
  return [+m[1], +m[2], +m[3]]
}

function getContrastRatio(fg: string, bg: string): number | null {
  const fgRgb = parseColor(fg)
  const bgRgb = parseColor(bg)
  if (!fgRgb || !bgRgb) return null
  const l1 = getLuminance(...fgRgb)
  const l2 = getLuminance(...bgRgb)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function runWcagScan(scope: Element = document.body): WcagResult {
  const issues: WcagIssue[] = []

  // 1 — Images missing alt text
  const imgs = Array.from(scope.querySelectorAll<HTMLImageElement>('img'))
  const missingAlt = imgs.filter(img => !img.hasAttribute('alt'))
  if (missingAlt.length > 0) {
    issues.push({
      id: 'img-alt',
      severity: 'fail',
      message: 'Images missing alt text',
      element: getSelector(missingAlt[0]),
      count: missingAlt.length,
    })
  }

  // 2 — Form inputs missing labels
  const inputs = Array.from(scope.querySelectorAll<HTMLInputElement>(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea'
  ))
  const unlabeled = inputs.filter(input => {
    const id = input.id
    const hasLabel = id ? !!document.querySelector(`label[for="${id}"]`) : false
    const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby')
    const hasTitle = input.hasAttribute('title')
    const wrappedInLabel = !!input.closest('label')
    return !hasLabel && !hasAriaLabel && !hasTitle && !wrappedInLabel
  })
  if (unlabeled.length > 0) {
    issues.push({
      id: 'input-label',
      severity: 'fail',
      message: 'Form inputs missing labels',
      element: getSelector(unlabeled[0]),
      count: unlabeled.length,
    })
  }

  // 3 — Buttons with no accessible name
  const buttons = Array.from(scope.querySelectorAll<HTMLButtonElement>('button, [role="button"]'))
  const emptyButtons = buttons.filter(btn => {
    const text = btn.textContent?.trim() ?? ''
    const ariaLabel = btn.getAttribute('aria-label')?.trim() ?? ''
    const ariaLabelledby = btn.getAttribute('aria-labelledby')
    const title = btn.getAttribute('title')?.trim() ?? ''
    return !text && !ariaLabel && !ariaLabelledby && !title
  })
  if (emptyButtons.length > 0) {
    issues.push({
      id: 'button-name',
      severity: 'fail',
      message: 'Buttons with no accessible name',
      element: getSelector(emptyButtons[0]),
      count: emptyButtons.length,
    })
  }

  // 4 — Links with no accessible name
  const links = Array.from(scope.querySelectorAll<HTMLAnchorElement>('a[href]'))
  const emptyLinks = links.filter(a => {
    const text = a.textContent?.trim() ?? ''
    const ariaLabel = a.getAttribute('aria-label')?.trim() ?? ''
    const title = a.getAttribute('title')?.trim() ?? ''
    return !text && !ariaLabel && !title
  })
  if (emptyLinks.length > 0) {
    issues.push({
      id: 'link-name',
      severity: 'fail',
      message: 'Links with no accessible text',
      element: getSelector(emptyLinks[0]),
      count: emptyLinks.length,
    })
  }

  // 5 — Heading hierarchy skipped (e.g. h1 → h3)
  const headings = Array.from(scope.querySelectorAll<HTMLHeadingElement>('h1,h2,h3,h4,h5,h6'))
  let skipped = 0
  for (let i = 1; i < headings.length; i++) {
    const prev = parseInt(headings[i - 1].tagName[1])
    const curr = parseInt(headings[i].tagName[1])
    if (curr - prev > 1) skipped++
  }
  if (skipped > 0) {
    issues.push({
      id: 'heading-order',
      severity: 'warn',
      message: 'Heading levels are skipped',
      count: skipped,
    })
  }

  // 6 — Missing page lang attribute
  if (!document.documentElement.hasAttribute('lang') || !document.documentElement.getAttribute('lang')) {
    issues.push({
      id: 'html-lang',
      severity: 'fail',
      message: 'Page is missing a lang attribute',
      element: 'html',
      count: 1,
    })
  }

  // 7 — Low contrast text (sample visible text nodes)
  let contrastFails = 0
  const textEls = Array.from(scope.querySelectorAll<HTMLElement>('p, span, li, td, th, label, a, h1, h2, h3, h4, h5, h6'))
    .filter(el => (el.textContent?.trim().length ?? 0) > 3 && el.children.length === 0)
    .slice(0, 40)

  for (const el of textEls) {
    try {
      const style = window.getComputedStyle(el)
      const ratio = getContrastRatio(style.color, style.backgroundColor)
      const fontSize = parseFloat(style.fontSize)
      const isBold = parseInt(style.fontWeight) >= 700
      const isLarge = fontSize >= 18 || (isBold && fontSize >= 14)
      const threshold = isLarge ? 3 : 4.5
      if (ratio !== null && ratio < threshold) contrastFails++
    } catch {
      // skip elements with no computed style
    }
  }
  if (contrastFails > 0) {
    issues.push({
      id: 'color-contrast',
      severity: 'fail',
      message: 'Text with insufficient color contrast',
      count: contrastFails,
    })
  }

  // 8 — Interactive elements too small (< 24px)
  const interactive = Array.from(scope.querySelectorAll<HTMLElement>('button, a, input, select, textarea, [role="button"]'))
  const tooSmall = interactive.filter(el => {
    const rect = el.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0 && (rect.width < 24 || rect.height < 24)
  })
  if (tooSmall.length > 0) {
    issues.push({
      id: 'target-size',
      severity: 'warn',
      message: 'Interactive elements smaller than 24×24px',
      element: getSelector(tooSmall[0]),
      count: tooSmall.length,
    })
  }

  // 9 — Missing skip-to-main link
  const skipLink = document.querySelector('a[href="#main"], a[href="#content"], a[href="#main-content"]')
  if (!skipLink) {
    issues.push({
      id: 'skip-link',
      severity: 'warn',
      message: 'No skip-to-main-content link found',
      count: 1,
    })
  }

  // 10 — iframes missing title
  const iframes = Array.from(scope.querySelectorAll<HTMLIFrameElement>('iframe'))
  const untitledIframes = iframes.filter(f => !f.getAttribute('title'))
  if (untitledIframes.length > 0) {
    issues.push({
      id: 'iframe-title',
      severity: 'fail',
      message: 'iframes missing title attribute',
      element: getSelector(untitledIframes[0]),
      count: untitledIframes.length,
    })
  }

  const failCount = issues.filter(i => i.severity === 'fail').length
  const warnCount = issues.filter(i => i.severity === 'warn').length
  const score = Math.max(0, Math.round(100 - failCount * 15 - warnCount * 5))

  return { score, issues }
}
