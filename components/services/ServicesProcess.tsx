'use client'
import { useReveal } from '@/components/useReveal'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'A free 30-minute call where we learn about your goals, constraints, and what success looks like for your project.',
    duration: '30 min',
    icon: '📞',
  },
  {
    num: '02',
    title: 'Proposal & Scope',
    desc: 'We send a detailed proposal with scope, timeline, tech stack recommendation, and a fixed or milestone-based price.',
    duration: '1–2 days',
    icon: '📋',
  },
  {
    num: '03',
    title: 'Design Sprint',
    desc: 'Before a single line of code, we nail the design. Figma wireframes, component library, and your sign-off.',
    duration: '1–2 weeks',
    icon: '🎨',
  },
  {
    num: '04',
    title: 'Build & Iterate',
    desc: 'Two-week development sprints with a staging deploy at each milestone. You see real progress, not just updates.',
    duration: '2–8 weeks',
    icon: '⚡',
  },
  {
    num: '05',
    title: 'QA & Launch',
    desc: 'Full cross-browser testing, accessibility check, Lighthouse optimization, and a smooth production deployment.',
    duration: '3–5 days',
    icon: '🚀',
  },
  {
    num: '06',
    title: 'Post-Launch Support',
    desc: 'Two weeks of free bug fixes after launch. Then flexible retainer options to keep growing your product.',
    duration: 'Ongoing',
    icon: '🤝',
  },
]

export default function ServicesProcess() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      style={{ background: '#0D1B3E' }}
      className="py-24 sm:py-32 px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              How It Works
            </p>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#fff' }}
            >
              From first call to<br />
              <em className="not-italic" style={{ color: '#818CF8' }}>live product</em>
            </h2>
          </div>
          <p
            className="text-sm font-light max-w-xs sm:text-right hidden sm:block"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            A process refined over 47+ projects to eliminate surprises and deliver great results.
          </p>
        </div>

        {/* Steps */}
        <div className="reveal reveal-delay-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="group rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:border-white/15 cursor-default"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl">{s.icon}</span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(129,140,248,0.15)', color: '#818CF8' }}
                  >
                    {s.duration}
                  </span>
                  <span
                    className="font-serif text-xs"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {s.num}
                  </span>
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-medium text-white mb-3">{s.title}</h4>
              <p
                className="text-xs sm:text-sm font-light leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                {s.desc}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-6 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: 'linear-gradient(90deg, #3B5BDB, #818CF8)' }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
