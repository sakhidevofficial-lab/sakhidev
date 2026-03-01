import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'sakhidev — Freelance Dev Studio',
  description: 'Crafting digital products that feel effortless. Full-stack development, UI/UX design, and SaaS products.',
  icons: {
    icon: '/favicon-round.png',
    apple: '/favicon-round.png',
    shortcut: '/favicon-round.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}