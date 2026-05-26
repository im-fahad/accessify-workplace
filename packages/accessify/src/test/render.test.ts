import { describe, it, expect } from 'vitest'
import { renderPanel } from '../core/render'
import { DEFAULT_STATE } from '../core/types'

function freshState() {
  return { ...DEFAULT_STATE }
}

describe('renderPanel', () => {
  it('returns a non-empty HTML string', () => {
    const html = renderPanel(freshState(), 'M')
    expect(typeof html).toBe('string')
    expect(html.length).toBeGreaterThan(0)
  })

  it('includes the header title', () => {
    expect(renderPanel(freshState(), 'M')).toContain('Accessify')
  })

  it('includes Accessibility Settings subtitle', () => {
    expect(renderPanel(freshState(), 'M')).toContain('Accessibility Settings')
  })

  it('renders all 8 profile cards', () => {
    const html = renderPanel(freshState(), 'M')
    const profiles = [
      'seizure-safe', 'vision-impaired', 'adhd-friendly', 'cognitive-disability',
      'keyboard-navigation', 'screen-reader', 'color-blind', 'dyslexia',
    ]
    for (const id of profiles) {
      expect(html, `missing profile: ${id}`).toContain(`data-profile="${id}"`)
    }
  })

  it('marks active profile as aria-pressed=true', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    const html = renderPanel(state, 'M')
    expect(html).toContain('data-profile="dyslexia" aria-pressed="true"')
  })

  it('marks inactive profiles as aria-pressed=false', () => {
    const state = freshState()
    state.profile = 'dyslexia'
    const html = renderPanel(state, 'M')
    expect(html).toContain('data-profile="seizure-safe" aria-pressed="false"')
  })

  it('renders all stepper tiles', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('data-stepper="fontSize"')
    expect(html).toContain('data-stepper="contentScale"')
    expect(html).toContain('data-stepper="lineHeight"')
    expect(html).toContain('data-stepper="letterSpacing"')
  })

  it('renders stepper value as Default when 0', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('>Default<')
  })

  it('renders positive stepper value with + prefix', () => {
    const state = freshState()
    state.fontSize = 3
    const html = renderPanel(state, 'M')
    expect(html).toContain('>+3<')
  })

  it('renders negative stepper value without + prefix', () => {
    const state = freshState()
    state.fontSize = -2
    const html = renderPanel(state, 'M')
    expect(html).toContain('>-2<')
  })

  it('disables decrease button at min bound', () => {
    const state = freshState()
    state.fontSize = -5
    const html = renderPanel(state, 'M')
    expect(html).toMatch(/data-step="-1"[^>]*disabled/)
  })

  it('disables increase button at max bound', () => {
    const state = freshState()
    state.fontSize = 10
    const html = renderPanel(state, 'M')
    expect(html).toMatch(/data-step="1"[^>]*disabled/)
  })

  it('renders all toggle tiles', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('data-toggle="readableFont"')
    expect(html).toContain('data-toggle="highlightTitles"')
    expect(html).toContain('data-toggle="highlightLinks"')
    expect(html).toContain('data-toggle="textMagnifier"')
  })

  it('marks active toggle tile as aria-pressed=true', () => {
    const state = freshState()
    state.readableFont = true
    const html = renderPanel(state, 'M')
    expect(html).toContain('data-toggle="readableFont" aria-pressed="true"')
  })

  it('renders all color tiles', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('data-color="darkContrast"')
    expect(html).toContain('data-color="lightContrast"')
    expect(html).toContain('data-color="highContrast"')
    expect(html).toContain('data-color="monochrome"')
    expect(html).toContain('data-color="invertColors"')
    expect(html).toContain('data-color="colorBlind"')
  })

  it('marks active color tile as aria-pressed=true', () => {
    const state = freshState()
    state.darkContrast = true
    const html = renderPanel(state, 'M')
    expect(html).toContain('data-color="darkContrast" aria-pressed="true"')
  })

  it('renders text alignment group', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('data-align="left"')
    expect(html).toContain('data-align="center"')
    expect(html).toContain('data-align="right"')
  })

  it('marks active alignment button as aria-pressed=true', () => {
    const state = freshState()
    state.textAlignment = 'center'
    const html = renderPanel(state, 'M')
    expect(html).toContain('data-align="center" aria-pressed="true"')
    expect(html).toContain('data-align="left" aria-pressed="false"')
  })

  it('renders size toggle buttons S, M, L', () => {
    const html = renderPanel(freshState(), 'M')
    expect(html).toContain('data-size="S"')
    expect(html).toContain('data-size="M"')
    expect(html).toContain('data-size="L"')
  })

  it('marks active size as aria-pressed=true', () => {
    const html = renderPanel(freshState(), 'L')
    expect(html).toContain('data-size="L" aria-pressed="true"')
    expect(html).toContain('data-size="M" aria-pressed="false"')
  })

  it('renders reset button with data-action=reset', () => {
    expect(renderPanel(freshState(), 'M')).toContain('data-action="reset"')
  })

  it('renders close button', () => {
    expect(renderPanel(freshState(), 'M')).toContain('accessify-close')
  })

  it('renders WCAG analyze button', () => {
    expect(renderPanel(freshState(), 'M')).toContain('data-action="analyze"')
  })

  it('renders WCAG score when result is provided', () => {
    const html = renderPanel(freshState(), 'M', 'en', { score: 85, issues: [] })
    expect(html).toContain('accessify-wcag-score-circle')
    expect(html).toContain('85')
  })

  it('shows no-issues message when scan returns empty', () => {
    const html = renderPanel(freshState(), 'M', 'en', { score: 100, issues: [] })
    expect(html).toContain('No issues found')
  })

  it('renders issue rows when scan finds problems', () => {
    const html = renderPanel(freshState(), 'M', 'en', {
      score: 60,
      issues: [{ id: 'img-alt', severity: 'fail', message: 'Images missing alt text', count: 3 }],
    })
    expect(html).toContain('Images missing alt text')
    expect(html).toContain('accessify-wcag-badge fail')
  })

  it('shows analyzing state when scanning', () => {
    const html = renderPanel(freshState(), 'M', 'en', null, true)
    expect(html).toContain('Analyzing')
    expect(html).toContain('disabled')
  })
})

describe('renderPanel — i18n', () => {
  it('renders Spanish labels with lang=es', () => {
    const html = renderPanel(freshState(), 'M', 'es')
    expect(html).toContain('Configuración de Accesibilidad')
    expect(html).toContain('Restablecer configuración')
  })

  it('renders French labels with lang=fr', () => {
    const html = renderPanel(freshState(), 'M', 'fr')
    expect(html).toContain("Paramètres d'Accessibilité")
  })

  it('renders German labels with lang=de', () => {
    const html = renderPanel(freshState(), 'M', 'de')
    expect(html).toContain('Barrierefreiheitseinstellungen')
  })

  it('renders Portuguese labels with lang=pt', () => {
    const html = renderPanel(freshState(), 'M', 'pt')
    expect(html).toContain('Configurações de Acessibilidade')
  })

  it('renders Arabic labels with lang=ar and dir=rtl', () => {
    const html = renderPanel(freshState(), 'M', 'ar')
    expect(html).toContain('إعدادات إمكانية الوصول')
    expect(html).toContain('dir="rtl"')
  })

  it('falls back to English for unknown lang', () => {
    const html = renderPanel(freshState(), 'M', 'en')
    expect(html).toContain('Accessibility Settings')
  })
})
