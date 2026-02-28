'use client'
import { useReveal } from './useReveal'

const services = [
  { num: '01', title: 'Full-Stack Web Development', desc: 'End-to-end web apps with Next.js, Node, and PostgreSQL. Fast, scalable, production-ready.' },
  { num: '02', title: 'UI/UX Design & Prototyping', desc: 'Figma-first design systems, interactive prototypes, and pixel-perfect handoff.' },
  { num: '03', title: 'SaaS Product Development', desc: 'MVP to market in weeks. Auth, billing, dashboards — the full SaaS stack done right.' },
  { num: '04', title: 'API Design & Integration', desc: 'REST & GraphQL APIs, third-party integrations, webhooks, and clean documentation.' },
  { num: '05', title: 'Performance Optimization', desc: 'Lighthouse scores above 95. Core Web Vitals tuned. Your users feel the difference.' },
  { num: '06', title: 'Maintenance & Growth', desc: 'Ongoing retainers, feature sprints, and long-term technical partnership.' },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">What We Do</p>
            <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#111827' }}>
              Services Built<br />for <em className="not-italic" style={{ color: '#3B5BDB' }}>Modern</em> Products
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap">
            View all <span>↗</span>
          </a>
        </div>

        {/* Grid */}
        <div className="reveal reveal-delay-1 border border-gray-200 rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-row flex items-start gap-4 sm:gap-8 px-6 sm:px-10 py-7 sm:py-8 cursor-default ${i < services.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <span className="font-serif text-xs text-gray-400 min-w-[28px] mt-1 flex-shrink-0">{s.num}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1.5 leading-snug">{s.title}</h3>
                <p className="text-xs sm:text-sm text-gray-900 font-light leading-relaxed">{s.desc}</p>
              </div>
              <span className="service-arrow text-gray-300 text-lg flex-shrink-0 mt-0.5">→</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
