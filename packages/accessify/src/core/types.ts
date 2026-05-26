export type WidgetSize = 'S' | 'M' | 'L'
export type Position = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
export type TextAlignment = 'left' | 'center' | 'right' | 'default'

export type AccessibilityProfile =
  | 'seizure-safe'
  | 'vision-impaired'
  | 'adhd-friendly'
  | 'cognitive-disability'
  | 'keyboard-navigation'
  | 'screen-reader'
  | 'color-blind'
  | 'dyslexia'

export interface AccessifyConfig {
  position?: Position
  size?: WidgetSize
  theme?: {
    primary?: string
    background?: string
    text?: string
  }
  persistence?: boolean
  lang?: string
  onOpen?: () => void
  onClose?: () => void
  onReset?: () => void
}

export interface AccessifyState {
  profile: AccessibilityProfile | null
  fontSize: number
  contentScale: number
  lineHeight: number
  letterSpacing: number
  textAlignment: TextAlignment
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

export const DEFAULT_STATE: AccessifyState = {
  profile: null,
  fontSize: 0,
  contentScale: 0,
  lineHeight: 0,
  letterSpacing: 0,
  textAlignment: 'default',
  readableFont: false,
  highlightTitles: false,
  highlightLinks: false,
  textMagnifier: false,
  darkContrast: false,
  lightContrast: false,
  highContrast: false,
  colorBlind: false,
  monochrome: false,
  invertColors: false,
}

export const STORAGE_KEY = 'accessify-state'
