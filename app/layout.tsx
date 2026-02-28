import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SekhiDev — Freelance Dev Studio',
  description: 'Crafting digital products that feel effortless. Full-stack development, UI/UX design, and SaaS products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
