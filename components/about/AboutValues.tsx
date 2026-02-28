'use client'
import { useReveal } from '@/components/useReveal'

const values = [
  {
    num: '01',
    title: 'Craft Over Speed',
    desc: 'We\'d rather take one more day and deliver something exceptional than rush something mediocre. Quality is non-negotiable.',
    accent: '#3B5BDB',
  },
  {
    num: '02',
    title: 'Radical Transparency',
    desc: 'No surprises. We communicate early and often — about progress, blockers, timelines, and even when we\'re wrong.',
    accent: '#6366F1',
  },
  {
    num: '03',
    title: 'Ownership Mentality',
    desc: 'We treat every project like it\'s our own product. Your KPIs matter to us. Your deadlines are our deadlines.',
    accent: '#818CF8',
  },
  {
    num: '04',
    title: 'Simplicity Wins',
    desc: 'The best solution is almost always the simplest one. We resist complexity for its own sake and write code that lasts.',
    accent: '#3B5BDB',
  },
  {
    num: '05',
    title: 'Long-Term Thinking',
    desc: 'We design for maintainability and scale — not just the launch. Every architectural decision has the future in mind.',
    accent: '#6366F1',
  },
  {
    num: '06',
    title: 'People First',
    desc: 'Behind every screen is a human. We design experiences that respect people\'s time, attention, and intelligence.',
    accent: '#818CF8',
  },
]

export default function AboutValues() {
  const ref = useReveal()

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>What We Stand For</p>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#fff' }}
            >
              Six values that guide<br />
              <em className="not-italic" style={{ color: '#818CF8' }}>everything</em> we do
            </h2>
          </div>
          <p className="text-sm font-light max-w-xs text-right hidden sm:block" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Not just words on a wall — these are decisions we make every single day.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 reveal reveal-delay-1"
          style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
          {values.map((v, i) => (
            <div
              key={i}
              className="group p-8 sm:p-10 cursor-default transition-all duration-300 hover:bg-white/[0.03]"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              {/* Number + accent line */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-serif text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{v.num}</span>
                <div className="h-px flex-1 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                  style={{ background: v.accent, boxShadow: `0 0 8px ${v.accent}60` }}
                />
              </div>
              <h4 className="text-sm sm:text-base font-medium text-white mb-3 leading-snug">{v.title}</h4>
              <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
