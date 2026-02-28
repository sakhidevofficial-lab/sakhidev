'use client'
import { useReveal } from '@/components/useReveal'

const plans = [
  {
    name: 'Starter',
    price: '$2,500',
    period: 'per project',
    desc: 'Perfect for landing pages, simple web apps, or early-stage MVPs with a clear scope.',
    features: [
      'Up to 5 pages / screens',
      'Responsive design',
      'Next.js frontend',
      'Basic CMS integration',
      'SEO & performance setup',
      '2 weeks of bug fixes',
    ],
    cta: 'Get Started',
    href: '/contact',
    popular: false,
    accent: '#6B7280',
  },
  {
    name: 'Growth',
    price: '$7,500',
    period: 'per project',
    desc: 'For startups and businesses that need a production-ready full-stack product that scales.',
    features: [
      'Full-stack web application',
      'Custom design system',
      'Database design & API',
      'Authentication & user accounts',
      'Stripe payment integration',
      'Admin dashboard',
      'Deployment & CI/CD',
      '1 month post-launch support',
    ],
    cta: 'Most Popular',
    href: '/contact',
    popular: true,
    accent: '#3B5BDB',
  },
  {
    name: 'Retainer',
    price: '$3,500',
    period: 'per month',
    desc: 'A dedicated senior engineer on your team — features, fixes, and growth, ongoing.',
    features: [
      '40 hours / month',
      'Feature development',
      'Bug fixes & maintenance',
      'Weekly progress reports',
      'On-call for critical issues',
      'Monthly strategy review',
    ],
    cta: 'Let\'s Talk',
    href: '/contact',
    popular: false,
    accent: '#6366F1',
  },
]

export default function ServicesPricing() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-6 md:px-10 lg:px-14"
      style={{ background: '#F8F9FF' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Pricing</p>
          <h2
            className="font-serif font-light leading-tight mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#111827' }}
          >
            Transparent pricing.<br />
            <em className="not-italic" style={{ color: '#3B5BDB' }}>No surprises.</em>
          </h2>
          <p className="text-sm font-light text-gray-400 max-w-md mx-auto">
            Starting prices for common project types. Every project is scoped individually — these are guides, not limits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal reveal-delay-1">
          {plans.map((p, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-7 sm:p-8 flex flex-col transition-all duration-300"
              style={{
                background: p.popular ? '#0D1B3E' : '#fff',
                border: p.popular ? 'none' : '1px solid #E5E7EB',
                boxShadow: p.popular
                  ? '0 24px 64px rgba(13,27,62,0.25)'
                  : '0 2px 12px rgba(0,0,0,0.04)',
                transform: p.popular ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              {/* Popular badge */}
              {p.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-medium text-white rounded-full px-4 py-1.5"
                  style={{ background: 'linear-gradient(90deg, #3B5BDB, #6366F1)' }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <p
                className="text-xs tracking-widest uppercase font-medium mb-4"
                style={{ color: p.popular ? 'rgba(255,255,255,0.5)' : '#6B7280' }}
              >
                {p.name}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span
                  className="font-serif font-bold"
                  style={{
                    fontSize: 'clamp(32px, 4vw, 44px)',
                    letterSpacing: '-2px',
                    color: p.popular ? '#fff' : '#111827',
                  }}
                >
                  {p.price}
                </span>
                <span
                  className="text-sm font-light ml-2"
                  style={{ color: p.popular ? 'rgba(255,255,255,0.4)' : '#9CA3AF' }}
                >
                  {p.period}
                </span>
              </div>

              <p
                className="text-sm font-light leading-relaxed mb-7 pb-7"
                style={{
                  color: p.popular ? 'rgba(255,255,255,0.55)' : '#6B7280',
                  borderBottom: `1px solid ${p.popular ? 'rgba(255,255,255,0.08)' : '#F3F4F6'}`,
                }}
              >
                {p.desc}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg
                      className="flex-shrink-0 mt-0.5"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <circle cx="7" cy="7" r="7" fill={p.popular ? 'rgba(59,91,219,0.3)' : '#EEF2FF'} />
                      <path d="M4 7l2 2 4-4" stroke={p.popular ? '#818CF8' : '#3B5BDB'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      className="text-sm font-light"
                      style={{ color: p.popular ? 'rgba(255,255,255,0.7)' : '#374151' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={p.href}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium rounded-full py-3.5 transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: p.popular ? 'rgba(255,255,255,0.12)' : p.accent,
                  color: p.popular ? '#fff' : '#fff',
                  border: p.popular ? '1px solid rgba(255,255,255,0.15)' : 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = p.popular ? 'rgba(255,255,255,0.2)' : '#0D1B3E'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = p.popular ? 'rgba(255,255,255,0.12)' : p.accent
                }}
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Custom note */}
        <div
          className="reveal reveal-delay-2 mt-8 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-4 justify-between text-center sm:text-left"
          style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
        >
          <div>
            <p className="font-medium text-gray-900 mb-1">Need something custom?</p>
            <p className="text-sm font-light text-gray-500">
              Large teams, enterprise requirements, or something unique? Let's scope it together.
            </p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-medium text-white rounded-full px-6 py-3 transition-all duration-200 hover:scale-105"
            style={{ background: '#0D1B3E' }}
            onMouseEnter={e => e.currentTarget.style.background = '#3B5BDB'}
            onMouseLeave={e => e.currentTarget.style.background = '#0D1B3E'}
          >
            Contact Us →
          </a>
        </div>

      </div>
    </section>
  )
}
