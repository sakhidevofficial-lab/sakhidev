'use client'
import { useReveal } from '@/components/useReveal'

const socials = [
  {
    name: 'GitHub',
    handle: '@sakhidev',
    href: 'https://github.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'sakhidev Studio',
    href: 'https://linkedin.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    handle: '@sakhidev',
    href: 'https://twitter.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const contacts = [
  {
    label: 'Email Us',
    value: 'hello@sakhidev.com',
    href: 'mailto:hello@sakhidev.com',
    icon: '✉',
    desc: 'Best for project inquiries',
  },
  {
    label: 'WhatsApp',
    value: '+92 300 000 0000',
    href: 'https://wa.me/923000000000',
    icon: '💬',
    desc: 'Quick questions & calls',
  },
  {
    label: 'Based In',
    value: 'Pakistan (PKT, UTC+5)',
    href: null,
    icon: '📍',
    desc: 'Working with clients worldwide',
  },
]

export default function ContactInfo() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      style={{ background: '#0D1B3E' }}
      className="py-20 sm:py-28 px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

        {/* Left — Contact details */}
        <div className="reveal">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Direct Contact
          </p>
          <h2
            className="font-serif font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(26px, 3vw, 42px)', letterSpacing: '-1px', color: '#fff' }}
          >
            Prefer to reach out<br />
            <em className="not-italic" style={{ color: '#818CF8' }}>directly?</em>
          </h2>

          <div className="flex flex-col gap-4">
            {contacts.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-5 rounded-2xl p-5 transition-all duration-200 hover:border-white/15"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-sm font-medium text-white hover:text-indigo-300 transition-colors truncate block"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-white truncate">{c.value}</p>
                  )}
                  <p className="text-xs font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Socials + availability */}
        <div className="reveal reveal-delay-2">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Find Us Online
          </p>
          <h2
            className="font-serif font-light leading-tight mb-8"
            style={{ fontSize: 'clamp(26px, 3vw, 42px)', letterSpacing: '-1px', color: '#fff' }}
          >
            Follow our<br />
            <em className="not-italic" style={{ color: '#818CF8' }}>journey</em>
          </h2>

          <div className="flex flex-col gap-3 mb-10">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl p-5 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.handle}</p>
                  </div>
                </div>
                <span
                  className="text-sm transition-all duration-200 group-hover:translate-x-1 inline-block"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Availability card */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(59,91,219,0.12)', border: '1px solid rgba(59,91,219,0.25)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="pulse-dot w-2 h-2 rounded-full bg-green-400 inline-block" />
              <p className="text-sm font-medium" style={{ color: '#818CF8' }}>Currently Available</p>
            </div>
            <p className="text-xs font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              We're accepting new projects starting <strong className="text-white/70">March 2025</strong>. Spots are limited — reach out early to secure your place in the queue.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
