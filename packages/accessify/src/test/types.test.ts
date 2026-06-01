import { describe, it, expect } from 'vitest'
import { DEFAULT_STATE, STORAGE_KEY } from '../core/types'

describe('DEFAULT_STATE', () => {
  it('has null profile', () => {
    expect(DEFAULT_STATE.profile).toBeNull()
  })

  it('has all numeric fields at 0', () => {
    expect(DEFAULT_STATE.fontSize).toBe(0)
    expect(DEFAULT_STATE.contentScale).toBe(0)
    expect(DEFAULT_STATE.lineHeight).toBe(0)
    expect(DEFAULT_STATE.letterSpacing).toBe(0)
  })

  it('has default text alignment', () => {
    expect(DEFAULT_STATE.textAlignment).toBe('default')
  })

  it('has all boolean flags false', () => {
    const boolKeys = [
      'readableFont', 'highlightTitles', 'highlightLinks', 'textMagnifier',
      'readingLens',
      'darkContrast', 'lightContrast', 'highContrast', 'colorBlind',
      'monochrome', 'invertColors',
    ] as const
    for (const key of boolKeys) {
      expect(DEFAULT_STATE[key], key).toBe(false)
    }
  })
})

describe('STORAGE_KEY', () => {
  it('is a non-empty string', () => {
    expect(typeof STORAGE_KEY).toBe('string')
    expect(STORAGE_KEY.length).toBeGreaterThan(0)
  })
})
