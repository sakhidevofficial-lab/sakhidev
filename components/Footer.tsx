'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const footerLinks = {
  Studio: [{ label: 'Home', href: '/' }, { label: 'About', href: '/about' }, { label: 'Work', href: '/work' }, { label: 'Blog', href: '/blog' }],
  Services: [{ label: 'Web Dev', href: '/services' }, { label: 'UI/UX Design', href: '/services' }, { label: 'SaaS Build', href: '/services' }, { label: 'Consulting', href: '/services' }],
  Connect: [{ label: 'GitHub', href: '' }, { label: 'LinkedIn', href: '' }, { label: 'Twitter', href: '' }, { label: 'Contact', href: '/contact' }],
}

export default function Footer() {
  const [tagline, setTagline] = useState('A freelance dev studio building elegant, fast, and scalable web products for ambitious teams.')
  const [copyright, setCopyright] = useState('© 2025 sakhidev. All rights reserved.')
  const [credit, setCredit] = useState('Crafted with ✦ precision')
  const [links, setLinks] = useState(footerLinks)

  useEffect(() => {
    supabase.from('settings').select('*').then(({ data }) => {
      if (!data) return
      const s: Record<string, string> = {}
      data.forEach((row: { key: string; value: string }) => { s[row.key] = row.value })

      if (s['footer_tagline']) setTagline(s['footer_tagline'])
      if (s['footer_copyright']) setCopyright(s['footer_copyright'])
      if (s['footer_credit']) setCredit(s['footer_credit'])

      // Update Connect social links dynamically
      setLinks(prev => ({
        ...prev,
        Connect: [
          { label: 'GitHub', href: s['social_github'] || '' },
          { label: 'LinkedIn', href: s['social_linkedin'] || '' },
          { label: 'Twitter', href: s['social_twitter'] || '' },
          { label: 'Contact', href: '/contact' },
        ],
      }))
    })
  }, [])

  return (
    <footer style={{ background: '#0D1B3E' }} className="px-6 md:px-10 lg:px-14 pt-16 sm:pt-20 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8 mb-12 sm:mb-16">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-white mb-4">
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#3B5BDB' }} />
              sakhidev
            </div>
            <p className="text-sm font-light leading-relaxed max-w-[220px]"
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              {tagline}
            </p>
          </div>

          {/* Links */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <h5 className="text-xs font-semibold text-white tracking-widest uppercase mb-5">{col}</h5>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item.label}>
                    {item.href.startsWith('/') ? (
                      <Link href={item.href}
                        className="text-sm font-light transition-colors duration-200 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-light transition-colors duration-200 hover:text-white"
                        style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{copyright}</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{credit}</p>
        </div>

      </div>
    </footer>
  )
}