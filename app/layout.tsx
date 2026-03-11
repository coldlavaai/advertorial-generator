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
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
