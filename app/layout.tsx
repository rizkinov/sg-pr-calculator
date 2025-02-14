import type { Metadata } from 'next'
import { inter } from '@/lib/fonts'
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
      <body className={inter.className}>
        {children}
        <footer className="text-center text-sm text-gray-500 py-4">
          Last Updated: February 2025
        </footer>
      </body>
    </html>
  )
} 