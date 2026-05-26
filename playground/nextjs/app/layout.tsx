import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Accessify Playground — Live Demo',
  description: 'Interactive demo of @glitchlab/accessify — a lightweight accessibility widget for the web. Try all props live.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
