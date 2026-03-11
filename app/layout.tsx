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
      <body className="min-h-screen bg-cl-bg antialiased">
        {children}
      </body>
    </html>
  )
}
