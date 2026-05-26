import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { runWcagScan } from '../core/wcag'

beforeEach(() => {
  document.body.innerHTML = ''
  document.documentElement.removeAttribute('lang')
})

afterEach(() => {
  document.body.innerHTML = ''
  document.documentElement.setAttribute('lang', 'en')
})

describe('runWcagScan', () => {
  it('returns a score between 0 and 100', () => {
    document.documentElement.setAttribute('lang', 'en')
    const result = runWcagScan(document.body)
    expect(result.score).toBeGreaterThanOrEqual(0)
    expect(result.score).toBeLessThanOrEqual(100)
  })

  it('returns issues array', () => {
    const result = runWcagScan(document.body)
    expect(Array.isArray(result.issues)).toBe(true)
  })

  it('detects images missing alt text', () => {
    document.body.innerHTML = '<img src="test.png">'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'img-alt')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
    expect(issue?.count).toBe(1)
  })

  it('does not flag images with alt text', () => {
    document.body.innerHTML = '<img src="test.png" alt="A test image">'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'img-alt')).toBeUndefined()
  })

  it('does not flag images with empty alt (decorative)', () => {
    document.body.innerHTML = '<img src="test.png" alt="">'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'img-alt')).toBeUndefined()
  })

  it('detects inputs missing labels', () => {
    document.body.innerHTML = '<input type="text">'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'input-label')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
  })

  it('does not flag inputs with aria-label', () => {
    document.body.innerHTML = '<input type="text" aria-label="Search">'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'input-label')).toBeUndefined()
  })

  it('does not flag inputs wrapped in label', () => {
    document.body.innerHTML = '<label>Name <input type="text"></label>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'input-label')).toBeUndefined()
  })

  it('detects buttons with no accessible name', () => {
    document.body.innerHTML = '<button></button>'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'button-name')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
  })

  it('does not flag buttons with text content', () => {
    document.body.innerHTML = '<button>Submit</button>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'button-name')).toBeUndefined()
  })

  it('does not flag buttons with aria-label', () => {
    document.body.innerHTML = '<button aria-label="Close dialog"></button>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'button-name')).toBeUndefined()
  })

  it('detects links with no accessible text', () => {
    document.body.innerHTML = '<a href="/page"></a>'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'link-name')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
  })

  it('does not flag links with text content', () => {
    document.body.innerHTML = '<a href="/page">Read more</a>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'link-name')).toBeUndefined()
  })

  it('detects missing html lang attribute', () => {
    // lang is removed in beforeEach
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'html-lang')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
  })

  it('does not flag missing lang when lang is set', () => {
    document.documentElement.setAttribute('lang', 'en')
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'html-lang')).toBeUndefined()
  })

  it('detects skipped heading levels', () => {
    document.documentElement.setAttribute('lang', 'en')
    document.body.innerHTML = '<h1>Title</h1><h3>Skipped</h3>'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'heading-order')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('warn')
  })

  it('does not flag sequential headings', () => {
    document.documentElement.setAttribute('lang', 'en')
    document.body.innerHTML = '<h1>Title</h1><h2>Subtitle</h2><h3>Section</h3>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'heading-order')).toBeUndefined()
  })

  it('detects iframes missing title', () => {
    document.documentElement.setAttribute('lang', 'en')
    document.body.innerHTML = '<iframe src="about:blank"></iframe>'
    const result = runWcagScan(document.body)
    const issue = result.issues.find(i => i.id === 'iframe-title')
    expect(issue).toBeDefined()
    expect(issue?.severity).toBe('fail')
  })

  it('does not flag iframes with title', () => {
    document.documentElement.setAttribute('lang', 'en')
    document.body.innerHTML = '<iframe src="about:blank" title="Embedded content"></iframe>'
    const result = runWcagScan(document.body)
    expect(result.issues.find(i => i.id === 'iframe-title')).toBeUndefined()
  })

  it('has no structural fail issues for a clean accessible page', () => {
    document.documentElement.setAttribute('lang', 'en')
    document.body.innerHTML = `
      <main id="main">
        <a href="#main" class="skip">Skip</a>
        <h1>Title</h1>
        <h2>Subtitle</h2>
        <img src="img.png" alt="Description">
        <label for="name">Name</label>
        <input id="name" type="text">
        <button>Submit</button>
        <a href="/page">Read more</a>
      </main>
    `
    const result = runWcagScan(document.body)
    // jsdom cannot simulate real rendering (getBoundingClientRect returns 0×0,
    // computed colors return defaults) so we exclude layout-dependent checks
    const structuralFails = result.issues.filter(
      i => i.severity === 'fail' && !['color-contrast', 'target-size'].includes(i.id)
    )
    expect(structuralFails).toHaveLength(0)
  })

  it('lower score for page with multiple failures', () => {
    // lang removed in beforeEach — that alone gives a fail
    document.body.innerHTML = `
      <img src="test.png">
      <button></button>
      <a href="/page"></a>
    `
    const result = runWcagScan(document.body)
    expect(result.score).toBeLessThan(60)
  })
})
