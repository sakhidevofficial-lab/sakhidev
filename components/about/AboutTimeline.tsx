'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DEFAULT_MILESTONES = [
  { year: '2019', title: 'The Beginning', desc: 'sakhidev launched as a solo freelance practice, taking on first client projects in web development and UI design.', tag: 'Founded' },
  { year: '2020', title: 'First SaaS Product', desc: 'Built and launched a full SaaS MVP for a client from scratch — auth, billing, dashboard — in 6 weeks.', tag: 'Milestone' },
  { year: '2021', title: 'Growing the Stack', desc: 'Expanded into backend architecture, API design, and cloud infrastructure. Started working with international clients.', tag: 'Expansion' },
  { year: '2022', title: '20 Projects Shipped', desc: 'Crossed 20 shipped projects. Refined the development process into repeatable sprints that clients love.', tag: 'Growth' },
  { year: '2023', title: 'Studio Model', desc: 'Evolved from solo freelancer to a tight studio with trusted collaborators. Bigger projects, same careful craft.', tag: 'Evolution' },
  { year: '2024', title: '47+ Projects & Counting', desc: 'Now working with startups and established companies across 8 countries. Every project still gets full attention.', tag: 'Today' },
]

export default function AboutTimeline() {
  const ref = useRef<HTMLElement>(null)
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES)

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
        year: s[`timeline_${n}_year`] || DEFAULT_MILESTONES[i].year,
        title: s[`timeline_${n}_title`] || DEFAULT_MILESTONES[i].title,
        desc: s[`timeline_${n}_desc`] || DEFAULT_MILESTONES[i].desc,
        tag: s[`timeline_${n}_tag`] || DEFAULT_MILESTONES[i].tag,
      }))
      setMilestones(loaded)
    })
  }, [])

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14" style={{ background: '#F8F9FF' }}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Journey</p>
          <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#111827' }}>
            Five years of growing<br /><em className="not-italic" style={{ color: '#3B5BDB' }}>deliberately</em>
          </h2>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom,transparent,#C7D2FE 10%,#C7D2FE 90%,transparent)' }} />
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 4) + 1} flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-b border-gray-100 group cursor-default`}>
                <div className="flex items-start gap-4 md:w-[120px] md:flex-shrink-0 md:justify-end md:pt-1">
                  <span className="font-serif text-2xl font-light leading-none" style={{ color: '#3B5BDB', letterSpacing: '-1px' }}>{m.year}</span>
                </div>
                <div className="hidden md:flex items-start pt-2 -ml-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full border-2 transition-all duration-300 group-hover:scale-125"
                    style={{ background: '#fff', borderColor: '#3B5BDB', boxShadow: '0 0 0 4px rgba(59,91,219,0.1)' }} />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">{m.title}</h3>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}>{m.tag}</span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-gray-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}