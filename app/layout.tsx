import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Advertorial Generator | Cold Lava',
  description: 'Create high-converting landing pages in minutes with professional templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        background: '#030305',
        color: '#FFFFFF',
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}>
        {children}
      </body>
    </html>
  )
}
