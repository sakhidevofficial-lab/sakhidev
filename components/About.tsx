'use client'
import { useReveal } from './useReveal'

const cards = [
  {
    icon: '⚡',
    title: 'Turning Ideas Into Action',
    desc: 'Real change happens when great ideas meet disciplined execution. We bring both to every project.',
  },
  {
    icon: '🎯',
    title: 'Pixel-Perfect Delivery',
    desc: "Every detail matters. We never ship until it reflects the quality we're proud to put our name on.",
  },
  {
    icon: '🤝',
    title: 'Long-Term Partnerships',
    desc: "We don't disappear after launch. Ongoing support, iteration, and genuine care for your success — always.",
    wide: true,
  },
]

export default function About() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 sm:pt-20 pb-20 sm:pb-28 px-6 md:px-10 lg:px-14"
      style={{ background: '#0D1B3E' }}
    >
      {/* Subtle radial glow top-right to break monotony */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '500px',
          height: '400px',
          background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Faint horizontal rule at top — visually separates from Stats */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)' }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

        {/* Text */}
        <div className="reveal">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            About sakhidev
          </p>
          <h2
            className="font-serif font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(28px,3.5vw,46px)', letterSpacing: '-1px', color: '#fff' }}
          >
            Caring Isn't Enough Anymore. It's About Opening Real Doors. Building Through Them Together.
          </h2>
          <p
            className="font-light leading-relaxed mb-8 text-sm sm:text-base"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            sakhidev isn't just a dev studio — it's a commitment to craft. Every line of code is intentional,
            every interface considered. We build digital products that feel effortless because we obsess over
            the details others skip.
          </p>
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-white text-link-arrow border-b pb-0.5"
            style={{ borderColor: 'rgba(255,255,255,0.3)' }}
          >
            About us <span>↗</span>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal reveal-delay-2">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`group rounded-2xl p-6 transition-all duration-300 cursor-default ${c.wide ? 'sm:col-span-2' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(59,91,219,0.1)'
                el.style.border = '1px solid rgba(99,102,241,0.35)'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 32px rgba(59,91,219,0.15)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,255,255,0.04)'
                el.style.border = '1px solid rgba(255,255,255,0.08)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              <div className="text-2xl mb-4">{c.icon}</div>
              <h4 className="text-sm font-semibold text-white mb-2">{c.title}</h4>
              <p className="text-xs leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}