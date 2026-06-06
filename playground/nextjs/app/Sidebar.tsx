'use client'

import { useState } from 'react'

export type WidgetConfig = {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size: 'S' | 'M' | 'L'
  colorScheme: 'light' | 'dark'
  lang: 'en' | 'es' | 'fr' | 'de' | 'pt' | 'ar'
  persistence: boolean
  primary: string
  triggerScheme: 'auto' | 'dark' | 'light'
}

const COLORS = [
  { label: 'Black',   value: '#0c0c0c' },
  { label: 'Violet',  value: '#7c3aed' },
  { label: 'Blue',    value: '#2563eb' },
  { label: 'Rose',    value: '#e11d48' },
  { label: 'Emerald', value: '#059669' },
  { label: 'Orange',  value: '#ea580c' },
]

const LANGS = [
  { value: 'en', label: '🇬🇧 EN' },
  { value: 'es', label: '🇪🇸 ES' },
  { value: 'fr', label: '🇫🇷 FR' },
  { value: 'de', label: '🇩🇪 DE' },
  { value: 'pt', label: '🇧🇷 PT' },
  { value: 'ar', label: '🇸🇦 AR' },
]

type Props = {
  config: WidgetConfig
  onChange: (next: WidgetConfig) => void
}

function Segmented<T extends string>({
  value, options, onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="ctrl-segmented">
      {options.map(o => (
        <button
          key={o.value}
          className={value === o.value ? 'active' : ''}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function CtrlToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button className="ctrl-toggle" onClick={() => onChange(!value)}>
      <span className="ctrl-toggle-label">{label}</span>
      <span className={`toggle-switch${value ? ' on' : ''}`} />
    </button>
  )
}

export default function Sidebar({ config, onChange }: Props) {
  const set = <K extends keyof WidgetConfig>(key: K, value: WidgetConfig[K]) =>
    onChange({ ...config, [key]: value })

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          <span className="sidebar-logo-name">Accessify</span>
        </div>
        <div className="sidebar-version">v0.1.2 · Live Playground</div>
      </div>

      {/* Controls */}
      <div className="sidebar-body">

        <div className="ctrl-group">
          <span className="ctrl-label">Color Scheme</span>
          <Segmented
            value={config.colorScheme}
            options={[{ value: 'light', label: '☀️ Light' }, { value: 'dark', label: '🌙 Dark' }]}
            onChange={v => set('colorScheme', v)}
          />
        </div>

        <div className="ctrl-group">
          <span className="ctrl-label">Position</span>
          <Segmented
            value={config.position}
            options={[
              { value: 'bottom-right', label: '↘' },
              { value: 'bottom-left',  label: '↙' },
              { value: 'top-right',    label: '↗' },
              { value: 'top-left',     label: '↖' },
            ]}
            onChange={v => set('position', v)}
          />
        </div>

        <div className="ctrl-group">
          <span className="ctrl-label">Widget Size</span>
          <Segmented
            value={config.size}
            options={[
              { value: 'S', label: 'S — Small' },
              { value: 'M', label: 'M — Medium' },
              { value: 'L', label: 'L — Large' },
            ]}
            onChange={v => set('size', v)}
          />
        </div>

        <div className="ctrl-group">
          <span className="ctrl-label">Language</span>
          <div className="ctrl-segmented" style={{ flexWrap: 'wrap' }}>
            {LANGS.map(l => (
              <button
                key={l.value}
                className={config.lang === l.value ? 'active' : ''}
                onClick={() => set('lang', l.value as WidgetConfig['lang'])}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ctrl-group">
          <span className="ctrl-label">Accent Color</span>
          <div className="ctrl-color-row">
            {COLORS.map(c => (
              <button
                key={c.value}
                title={c.label}
                className={`ctrl-color-swatch${config.primary === c.value ? ' active' : ''}`}
                style={{ background: c.value, color: '#fff' }}
                onClick={() => set('primary', c.value)}
              />
            ))}
          </div>
        </div>

        <div className="ctrl-group">
          <span className="ctrl-label">Trigger Button</span>
          <Segmented
            value={config.triggerScheme}
            options={[
              { value: 'auto',  label: 'Auto' },
              { value: 'dark',  label: '🌙 Dark' },
              { value: 'light', label: '☀️ Light' },
            ]}
            onChange={v => set('triggerScheme', v)}
          />
        </div>

        <div className="sidebar-divider" />

        <CtrlToggle
          label="Persist state"
          value={config.persistence}
          onChange={v => set('persistence', v)}
        />

        {/* Live config preview */}
        <div className="ctrl-group">
          <span className="ctrl-label">Current Config</span>
          <div style={{
            background: '#0c0c0c',
            color: '#86efac',
            borderRadius: 8,
            padding: '12px 14px',
            fontFamily: '"SF Mono", "Fira Code", Menlo, monospace',
            fontSize: 11,
            lineHeight: 1.7,
            wordBreak: 'break-all',
          }}>
            {(() => {
              const lines: string[] = [
                '<AccessifyWidget',
                `  position="${config.position}"`,
                `  size="${config.size}"`,
                `  colorScheme="${config.colorScheme}"`,
                `  lang="${config.lang}"`,
                ...(config.triggerScheme === 'auto' ? [] : [`  triggerScheme="${config.triggerScheme}"`]),
                ...(config.primary === '#0c0c0c' ? [] : [`  theme={{ primary: "${config.primary}" }}`]),
                ...(config.persistence ? [] : [`  persistence={false}`]),
                '/>',
              ]
              return lines.join('\n')
            })()}
          </div>
        </div>

      </div>

      {/* Footer links */}
      <div className="sidebar-links">
        <a className="sidebar-link" href="https://www.npmjs.com/package/@glitchlab/accessify" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h24v24H0V0zm6.872 18.624V8.4h3.816v10.224H6.872zm4.684-10.224h3.816v7.2h2.556V8.4H24v10.224H11.556V8.4z"/></svg>
          npm · @glitchlab/accessify
        </a>
        <a className="sidebar-link" href="https://github.com/im-fahad/accessify" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          GitHub · im-fahad/accessify
        </a>
      </div>
    </aside>
  )
}
