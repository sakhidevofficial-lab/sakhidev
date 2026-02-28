'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-14 h-16 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.25)'
            : '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: scrolled
            ? '0 4px 32px rgba(59, 91, 219, 0.08), inset 0 1px 0 rgba(255,255,255,0.3)'
            : 'inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        {/* Glass inner highlight line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
        />

        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-2.5 font-serif text-lg font-bold tracking-tight z-10"
          style={{ color: '#0D1B3E' }}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: 'linear-gradient(135deg, #3B5BDB, #6366F1)',
              boxShadow: '0 0 8px rgba(59,91,219,0.5)',
            }}
          />
          sakhidev
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="nav-link-rel relative text-sm transition-colors duration-200"
                style={{
                  color: isActive(l.href) ? '#3B5BDB' : 'rgba(17,24,39,0.65)',
                  fontWeight: isActive(l.href) ? '500' : '400',
                }}
                onMouseEnter={e => {
                  if (!isActive(l.href)) e.currentTarget.style.color = '#111827'
                }}
                onMouseLeave={e => {
                  if (!isActive(l.href)) e.currentTarget.style.color = 'rgba(17,24,39,0.65)'
                }}
              >
                {l.label}
                {isActive(l.href) && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#3B5BDB' }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — links to /contact */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 text-sm font-medium rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: isActive('/contact')
              ? 'rgba(59, 91, 219, 0.9)'
              : 'rgba(13, 27, 62, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: isActive('/contact')
              ? '0 4px 20px rgba(59,91,219,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
              : '0 2px 12px rgba(13,27,62,0.25), inset 0 1px 0 rgba(255,255,255,0.12)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(59, 91, 219, 0.9)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(59,91,219,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
          onMouseLeave={e => {
            if (!isActive('/contact')) {
              e.currentTarget.style.background = 'rgba(13, 27, 62, 0.85)'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(13,27,62,0.25), inset 0 1px 0 rgba(255,255,255,0.12)'
            }
          }}
        >
          Start a Project
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M6 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2 -mr-2 z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 transition-all duration-300 rounded-full ${menuOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'}`}
            style={{ background: '#0D1B3E' }}
          />
          <span
            className={`block h-0.5 transition-all duration-200 rounded-full ${menuOpen ? 'w-0 opacity-0' : 'w-5'}`}
            style={{ background: '#0D1B3E' }}
          />
          <span
            className={`block h-0.5 transition-all duration-300 rounded-full ${menuOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-6'}`}
            style={{ background: '#0D1B3E' }}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu fixed inset-0 z-40 flex flex-col pt-20 px-8 pb-10 ${menuOpen ? 'open' : ''}`}
        style={{
          background: 'rgba(248, 250, 255, 0.92)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.4), transparent)' }}
        />

        <ul className="flex flex-col gap-2 flex-1">
          {links.map((l, i) => (
            <li
              key={l.label}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b text-2xl font-serif font-light transition-colors"
                style={{
                  borderColor: 'rgba(59,91,219,0.1)',
                  color: isActive(l.href) ? '#3B5BDB' : '#111827',
                }}
              >
                {l.label}
                <span
                  className="text-sm transition-opacity"
                  style={{ color: '#3B5BDB', opacity: isActive(l.href) ? 1 : 0 }}
                >
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile CTA — links to /contact */}
        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white rounded-2xl py-4 mt-6 transition-all duration-200 active:scale-95"
          style={{
            background: 'rgba(13, 27, 62, 0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 20px rgba(13,27,62,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          Start a Project →
        </Link>

        <p className="text-center text-xs mt-4" style={{ color: 'rgba(107,114,128,0.6)' }}>
          hello@sakhidev.com
        </p>
      </div>
    </>
  )
}