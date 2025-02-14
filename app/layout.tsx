import type { Metadata } from 'next'
import { geistSans } from './lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'SG PR Calculator',
  description: 'Singapore PR Application Points Calculator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        {children}
      </body>
    </html>
  )
} 