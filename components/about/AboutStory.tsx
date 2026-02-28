'use client'
import { useReveal } from '@/components/useReveal'

export default function AboutStory() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Left — Visual block */}
        <div className="reveal order-2 lg:order-1 relative">
          {/* Main image block */}
          <div
            className="rounded-3xl overflow-hidden flex items-center justify-center font-serif font-light text-indigo-300"
            style={{
              height: 'clamp(300px, 40vw, 480px)',
              background: 'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 50%, #818CF8 100%)',
              fontSize: 'clamp(14px, 2vw, 18px)',
            }}
          >
            Where it all began
          </div>

          {/* Floating badge */}
          <div
            className="absolute -bottom-5 -right-4 sm:right-6 rounded-2xl px-5 py-4 shadow-xl"
            style={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="font-serif text-2xl font-bold text-white" style={{ letterSpacing: '-1px' }}>5+</p>
            <p className="text-xs font-light mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Years of craft</p>
          </div>

          {/* Second badge */}
          <div
            className="absolute -top-4 -left-4 sm:left-6 rounded-2xl px-5 py-4 shadow-xl"
            style={{ background: '#3B5BDB', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <p className="font-serif text-2xl font-bold text-white" style={{ letterSpacing: '-1px' }}>47+</p>
            <p className="text-xs font-light text-white/60 mt-0.5">Projects shipped</p>
          </div>
        </div>

        {/* Right — Text */}
        <div className="reveal reveal-delay-2 order-1 lg:order-2">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Story</p>
          <h2
            className="font-serif font-light leading-tight mb-6"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', letterSpacing: '-1px', color: '#111827' }}
          >
            From a single idea to a studio built on relentless <em className="not-italic" style={{ color: '#3B5BDB' }}>attention to detail</em>
          </h2>
          <div className="space-y-4 text-sm sm:text-base font-light leading-relaxed text-gray-500">
            <p>
              sakhidev began not as a company, but as a conviction — that the gap between a good product and a great one is almost always in the details most developers rush past.
            </p>
            <p>
              Over 5 years, we've built everything from solo MVPs to complex SaaS platforms, and the principle has never changed: ship work you're proud of, or don't ship it at all.
            </p>
            <p>
              Today sakhidev is a tight-knit studio where every project gets our full attention — not a ticket in a queue, but a problem we care about solving beautifully.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
