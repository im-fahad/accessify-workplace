'use client'

import { AccessifyWidget } from '@glitchlab/accessify/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: '2rem' }}>
        {children}
        <AccessifyWidget position="bottom-right" size="M" />
      </body>
    </html>
  )
}
