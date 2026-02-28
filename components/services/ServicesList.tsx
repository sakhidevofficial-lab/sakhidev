'use client'
import { useState } from 'react'
import { useReveal } from '@/components/useReveal'

const services = [
  {
    num: '01',
    title: 'Full-Stack Web Development',
    short: 'End-to-end web applications built to scale.',
    desc: 'From database schema to pixel-perfect UI — we architect and build complete web applications using Next.js, Node.js, and PostgreSQL. Every decision is made with performance, security, and maintainability in mind.',
    deliverables: ['Next.js / React frontend', 'REST or GraphQL API', 'Database design & migrations', 'Authentication & authorization', 'CI/CD pipeline setup', 'Deployment on Vercel / AWS'],
    accent: '#3B5BDB',
    icon: '⚡',
  },
  {
    num: '02',
    title: 'UI/UX Design & Prototyping',
    short: 'Interfaces people love to use.',
    desc: 'We design in Figma with a systems-first approach — every component, spacing token, and color decision is intentional. We prototype interactions and hand off production-ready design specs your devs will actually love.',
    deliverables: ['Full Figma design system', 'Responsive UI for all screens', 'Interactive prototype', 'Design tokens & variables', 'Component library', 'Dev handoff with specs'],
    accent: '#6366F1',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'SaaS Product Development',
    short: 'MVP to market in weeks, not months.',
    desc: 'We\'ve built SaaS products from scratch dozens of times. We know the patterns, the shortcuts that are safe, and the ones that kill you in year two. Get a production-ready SaaS with auth, billing, dashboards, and onboarding.',
    deliverables: ['User auth (magic link, OAuth, SSO)', 'Stripe billing & subscription management', 'Multi-tenant architecture', 'Admin dashboard', 'User onboarding flow', 'Email notifications (Resend)'],
    accent: '#0891B2',
    icon: '🚀',
  },
  {
    num: '04',
    title: 'API Design & Integration',
    short: 'Clean APIs. Zero ambiguity.',
    desc: 'Whether you need a new API built from scratch or third-party integrations wired together, we write well-documented, versioned, and testable APIs. We also handle webhooks, event-driven systems, and real-time connections.',
    deliverables: ['RESTful or GraphQL API', 'OpenAPI / Swagger docs', 'Webhook handling', 'Third-party integrations', 'Rate limiting & security', 'API testing suite'],
    accent: '#059669',
    icon: '🔌',
  },
  {
    num: '05',
    title: 'Performance Optimization',
    short: 'Fast websites. Better conversions.',
    desc: 'Slow sites lose users and revenue. We audit your existing codebase, identify bottlenecks, and fix them — from bundle sizes and render blocking to database queries and caching strategies. Target: Lighthouse 95+ across the board.',
    deliverables: ['Full Lighthouse audit report', 'Core Web Vitals optimization', 'Bundle size reduction', 'Image & asset optimization', 'Database query tuning', 'CDN & caching setup'],
    accent: '#D97706',
    icon: '⚡',
  },
  {
    num: '06',
    title: 'Maintenance & Growth Retainer',
    short: 'A technical partner, not just a vendor.',
    desc: 'Don\'t lose momentum after launch. Our retainer model gives you a dedicated senior engineer on call — handling bugs, shipping features, and growing your product alongside your business. Monthly, flexible, no long-term lock-in.',
    deliverables: ['Dedicated engineer (part or full time)', 'Weekly progress updates', 'Bug fixes & hotfixes', 'Feature development sprints', 'Monthly performance review', 'On-call for critical issues'],
    accent: '#7C3AED',
    icon: '🤝',
  },
]

export default function ServicesList() {
  const ref = useReveal()
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section
      id="services-list"
      ref={ref}
      className="py-24 sm:py-32 px-6 md:px-10 lg:px-14"
      style={{ background: '#FAFAFA' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal mb-14">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Services</p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#111827' }}
          >
            Six ways we can help<br />
            <em className="not-italic" style={{ color: '#3B5BDB' }}>your product grow</em>
          </h2>
        </div>

        {/* Accordion list */}
        <div className="reveal reveal-delay-1 flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <div
              key={i}
              className={`border-b border-gray-200 last:border-b-0 transition-all duration-300 ${expanded === i ? 'bg-white' : 'bg-white hover:bg-gray-50/60'}`}
            >
              {/* Row header */}
              <button
                className="w-full flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-6 sm:py-7 text-left group"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="font-serif text-xs text-gray-300 min-w-[24px] flex-shrink-0">{s.num}</span>

                <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <h3
                      className="text-sm sm:text-base font-medium text-gray-900 leading-snug mb-0.5 truncate"
                      style={{ color: expanded === i ? s.accent : '#111827' }}
                    >
                      {s.title}
                    </h3>
                    {expanded !== i && (
                      <p className="text-xs text-gray-400 font-light hidden sm:block">{s.short}</p>
                    )}
                  </div>

                  {/* Expand icon */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: expanded === i ? s.accent : '#F3F4F6',
                      transform: expanded === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1v10M1 6h10" stroke={expanded === i ? '#fff' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              <div
                className="overflow-hidden transition-all duration-400"
                style={{ maxHeight: expanded === i ? '600px' : '0px', opacity: expanded === i ? 1 : 0 }}
              >
                <div className="px-6 sm:px-10 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Description */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium mb-5"
                      style={{ background: s.accent + '15', color: s.accent }}
                    >
                      <span>{s.icon}</span> {s.title}
                    </div>
                    <p className="text-sm font-light leading-relaxed text-gray-500 mb-6">{s.desc}</p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                      style={{ color: s.accent }}
                    >
                      Get a quote for this service →
                    </a>
                  </div>

                  {/* Deliverables */}
                  <div>
                    <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">What You Get</p>
                    <ul className="flex flex-col gap-3">
                      {s.deliverables.map((d, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: s.accent }}
                          />
                          <span className="text-sm font-light text-gray-600">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
