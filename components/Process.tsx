'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DEFAULT_STEPS = [
  { num: '01', title: 'Discovery Call', desc: 'We learn about your goals, audience, timeline, and technical requirements before anything else.' },
  { num: '02', title: 'Strategy & Scoping', desc: 'A detailed roadmap, tech stack recommendation, and clear deliverables — no ambiguity.' },
  { num: '03', title: 'Design System', desc: 'Figma-first design tokens, component library, and prototype for your sign-off.' },
  { num: '04', title: 'Development Sprints', desc: '2-week sprints with daily updates and staging deploys so you always see progress.' },
  { num: '05', title: 'QA & Performance', desc: 'Cross-browser testing, accessibility audit, Lighthouse optimization before every launch.' },
  { num: '06', title: 'Launch & Beyond', desc: 'Smooth deployment, handoff docs, and ongoing support options to grow with you.' },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const [steps, setSteps] = useState(DEFAULT_STEPS)

  useEffect(() => {
    const section = ref.current; if (!section) return
    const els = section.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    supabase.from('settings').select('*').then(({ data }) => {
      if (!data) return
      const s: Record<string, string> = {}
      data.forEach((row: { key: string; value: string }) => { s[row.key] = row.value })
      const loaded = [1, 2, 3, 4, 5, 6].map((n, i) => ({
        num: `0${n}`,
        title: s[`process_step_${n}_title`] || DEFAULT_STEPS[i].title,
        desc: s[`process_step_${n}_desc`] || DEFAULT_STEPS[i].desc,
      }))
      setSteps(loaded)
    })
  }, [])

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-10 sm:mb-14">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>How It Works</p>
          <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#fff' }}>
            A Process Built<br />for <em className="not-italic" style={{ color: '#818CF8' }}>Real</em> Results
          </h2>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 reveal reveal-delay-1"
          style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {steps.map((s, i) => (
            <div
              key={i}
              className="process-step p-7 sm:p-9 cursor-default"
              style={{
                borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <p className="font-serif text-xs mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.num}</p>
              <h4 className="text-sm sm:text-base font-medium text-white mb-2.5">{s.title}</h4>
              <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}