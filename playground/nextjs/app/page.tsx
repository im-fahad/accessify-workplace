'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Sidebar, { type WidgetConfig } from './Sidebar'

const AccessifyWidget = dynamic(
  () => import('@glitchlab/accessify/react').then(m => m.AccessifyWidget),
  { ssr: false }
)

const DEFAULT_CONFIG: WidgetConfig = {
  position: 'bottom-right',
  size: 'M',
  colorScheme: 'light',
  lang: 'en',
  persistence: true,
  primary: '#0c0c0c',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button className="hero-code-copy" onClick={copy} title="Copy">
      {copied ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      )}
    </button>
  )
}

export default function Home() {
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_CONFIG)

  const theme = config.primary !== '#0c0c0c' ? { primary: config.primary } : undefined

  return (
    <div className="layout">
      <Sidebar config={config} onChange={setConfig} />

      <main className="main" id="main">

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Live Interactive Demo
          </div>
          <h1>
            The accessibility widget<br />
            <span>your users deserve</span>
          </h1>
          <p className="hero-desc">
            Drop <strong>@glitchlab/accessify</strong> into any web app to give users control over
            font size, contrast, dyslexia aids, color filters, and more — with zero runtime
            dependencies. Use the sidebar to tweak every prop live.
          </p>
          <div className="hero-code">
            <span>npm install @glitchlab/accessify</span>
            <CopyButton text="npm install @glitchlab/accessify" />
          </div>
        </section>

        {/* Features */}
        <div className="section-title">Features</div>
        <div className="feature-grid">
          {[
            { icon: '🔤', title: 'Font & Content', desc: 'Font size, line height, letter spacing, readable font, text magnifier' },
            { icon: '🎨', title: 'Color Filters', desc: 'Dark/light/high contrast, monochrome, invert, color blind (protanopia)' },
            { icon: '🌍', title: 'i18n — 6 langs', desc: 'English, Spanish, French, German, Portuguese, Arabic (RTL)' },
            { icon: '⌨️', title: 'Keyboard Nav', desc: 'Full focus trap, Escape to close, skip-to-main link injection' },
            { icon: '♿', title: '8 Profiles', desc: 'Seizure Safe, Vision Impaired, ADHD, Cognitive, Dyslexia and more' },
            { icon: '🔍', title: 'WCAG Scanner', desc: 'One-click page scan with score, contrast, alt text, labels, headings' },
          ].map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card-icon">
                <span style={{ fontSize: 18 }}>{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Sample article content */}
        <div className="section-title">Sample Content</div>
        <article className="article section">
          <h2>What is Web Accessibility?</h2>
          <p>
            Web accessibility means that websites, tools, and technologies are designed and
            developed so that people with disabilities can use them. More specifically, people can
            perceive, understand, navigate, and interact with the web, and contribute to the web.
          </p>

          <div className="article-img-placeholder">
            <span>📸 Image placeholder — test alt text &amp; contrast</span>
          </div>

          <blockquote>
            "The power of the Web is in its universality. Access by everyone regardless of
            disability is an essential aspect." — Tim Berners-Lee
          </blockquote>

          <h3>Why it matters</h3>
          <p>
            Over 1 billion people worldwide live with some form of disability. Accessibility
            doesn&apos;t just benefit people with permanent disabilities — it helps everyone in
            situational or temporary limitations, like someone with a broken arm or bright sunlight
            on their phone screen.
          </p>

          <h3>Common barriers</h3>
          <ul>
            <li>Images without alternative text</li>
            <li>Poor color contrast between text and background</li>
            <li>Forms without proper labels</li>
            <li>Keyboard traps preventing navigation</li>
            <li>Videos without captions or audio descriptions</li>
          </ul>

          <h3>WCAG guidelines</h3>
          <p>
            The <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
            Web Content Accessibility Guidelines (WCAG)</a> provide a shared standard for web
            content accessibility. The current version, WCAG 2.1, is organized around four
            principles: Perceivable, Operable, Understandable, and Robust (POUR).
          </p>

          <ol>
            <li><strong>Perceivable</strong> — Information must be presentable to users in ways they can perceive</li>
            <li><strong>Operable</strong> — UI components and navigation must be operable</li>
            <li><strong>Understandable</strong> — Information and UI must be understandable</li>
            <li><strong>Robust</strong> — Content must be robust enough to be interpreted by assistive technologies</li>
          </ol>
        </article>

        {/* Sample form */}
        <div className="section-title">Sample Form</div>
        <div className="form-section section">
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="fname">First name</label>
              <input id="fname" type="text" placeholder="Jane" />
            </div>
            <div className="form-row">
              <label htmlFor="lname">Last name</label>
              <input id="lname" type="text" placeholder="Doe" />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="jane@example.com" />
          </div>
          <div className="form-row">
            <label htmlFor="topic">Topic</label>
            <select id="topic">
              <option>Accessibility</option>
              <option>Color contrast</option>
              <option>Keyboard navigation</option>
              <option>Screen readers</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your message…" />
          </div>
          <button className="form-submit" type="button">Send message</button>
        </div>

        {/* Code snippet */}
        <div className="section-title">Quick Start</div>
        <pre className="code-block section">{[
          `// React`,
          `import { AccessifyWidget } from '@glitchlab/accessify/react'`,
          ``,
          `export default function App() {`,
          `  return (`,
          `    <>`,
          `      <YourApp />`,
          `      <AccessifyWidget`,
          `        position="bottom-right"`,
          `        size="M"`,
          `        colorScheme="light"`,
          `        lang="en"`,
          `      />`,
          `    </>`,
          `  )`,
          `}`,
        ].join('\n')}</pre>

      </main>

      {/* The actual widget — driven by sidebar config */}
      <AccessifyWidget
        key={`${config.position}-${config.colorScheme}-${config.lang}-${config.persistence}`}
        position={config.position}
        size={config.size}
        colorScheme={config.colorScheme}
        lang={config.lang}
        persistence={config.persistence}
        theme={theme}
      />
    </div>
  )
}
