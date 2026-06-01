import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://accessify-playground.vercel.app'
const TITLE = 'Accessify — Live Playground'
const DESC = 'Interactive demo of @glitchlab/accessify — a lightweight, framework-agnostic accessibility widget for the web. Try every prop live.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  keywords: ['accessibility', 'a11y', 'widget', 'react', 'vue', 'svelte', 'wcag', 'dyslexia', 'contrast'],
  authors: [{ name: 'GlitchLab', url: 'https://github.com/im-fahad' }],
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: DESC,
    siteName: 'Accessify',
    images: [{ url: '/demo.gif', width: 1280, height: 800, alt: 'Accessify widget demo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    images: ['/demo.gif'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0c0c0c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
