'use client'

import { useAccessify } from '@glitchlab/accessify/react'

export default function Home() {
  const { open, close, toggle, reset, state, isOpen } = useAccessify({
    position: 'bottom-right',
    size: 'M',
  })

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1>Accessify — Next.js Playground</h1>

      <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
        <button onClick={open}>Open</button>
        <button onClick={close}>Close</button>
        <button onClick={toggle}>Toggle</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: 8, margin: '1rem 0' }}>
        <h3>Debug Panel</h3>
        <pre>{JSON.stringify({ isOpen, state }, null, 2)}</pre>
      </div>

      <hr />

      <h2>Sample Content</h2>
      <p>This is a demo paragraph to test accessibility features.</p>
      <h3>Links</h3>
      <ul>
        <li><a href="#">Example Link 1</a></li>
        <li><a href="#">Example Link 2</a></li>
        <li><a href="#">Example Link 3</a></li>
      </ul>
      <h3>More Text</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
  )
}
