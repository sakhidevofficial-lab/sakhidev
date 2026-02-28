'use client'
import { useReveal } from './useReveal'

const steps = [
  { num: '01', title: 'Discovery Call', desc: 'We learn about your goals, audience, timeline, and technical requirements before anything else.' },
  { num: '02', title: 'Strategy & Scoping', desc: 'A detailed roadmap, tech stack recommendation, and clear deliverables — no ambiguity.' },
  { num: '03', title: 'Design System', desc: 'Figma-first design tokens, component library, and prototype for your sign-off.' },
  { num: '04', title: 'Development Sprints', desc: '2-week sprints with daily updates and staging deploys so you always see progress.' },
  { num: '05', title: 'QA & Performance', desc: 'Cross-browser testing, accessibility audit, Lighthouse optimization before every launch.' },
  { num: '06', title: 'Launch & Beyond', desc: 'Smooth deployment, handoff docs, and ongoing support options to grow with you.' },
]

export default function Process() {
  const ref = useReveal()

  return (
    <section ref={ref} style={{background:'#0D1B3E'}} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">

        <div className="reveal mb-12 sm:mb-16">
          <p className="text-xs tracking-widest uppercase mb-4" style={{color:'rgba(255,255,255,0.4)'}}>How It Works</p>
          <h2 className="font-serif font-light leading-tight" style={{fontSize:'clamp(28px,3.5vw,52px)',letterSpacing:'-1px',color:'#fff'}}>
            A Process Built<br />for <em className="not-italic" style={{color:'#818CF8'}}>Real</em> Results
          </h2>
        </div>

        {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 reveal reveal-delay-1"
          style={{border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', overflow:'hidden'}}>
          {steps.map((s, i) => (
            <div
              key={i}
              className="process-step p-7 sm:p-9 cursor-default"
              style={{
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <p className="font-serif text-xs mb-5" style={{color:'rgba(255,255,255,0.3)'}}>{s.num}</p>
              <h4 className="text-sm sm:text-base font-medium text-white mb-2.5">{s.title}</h4>
              <p className="text-xs sm:text-sm font-light leading-relaxed" style={{color:'rgba(255,255,255,0.45)'}}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
