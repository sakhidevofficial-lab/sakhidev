'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase, type Project } from '@/lib/supabase'
import Link from 'next/link'

export default function Work() {
  const ref = useRef<HTMLElement>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const section = ref.current
    if (!section) return
    const elements = section.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .limit(4)
      .then(({ data }) => { if (data) setProjects(data) })
  }, [])

  return (
    <section ref={ref} className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-6 md:px-10 lg:px-14" style={{ background: '#F8F9FF' }}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">Selected Work</p>
            <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#111827' }}>
              Projects That<br /><em className="not-italic" style={{ color: '#3B5BDB' }}>Define</em> Our Craft
            </h2>
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap">
            All projects <span>↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.length === 0 ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden border border-gray-200 bg-white ${i === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`animate-pulse bg-gray-100 ${i === 0 ? 'h-52 sm:h-72 md:h-80' : 'h-44 sm:h-56'}`} />
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                  </div>
                  <div className="h-5 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
                </div>
              </div>
            ))
          ) : (
            projects.map((p) => (
              <div
                key={p.id}
                className={`work-card rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
              >
                <div className={`overflow-hidden ${p.featured ? 'h-52 sm:h-72 md:h-80' : 'h-44 sm:h-56'}`}>
                  <div
                    className="work-card-img w-full h-full flex items-center justify-center font-serif text-white font-light"
                    style={{ background: p.gradient, fontSize: 'clamp(14px,2vw,18px)' }}
                  >
                    {p.featured ? `✦ ${p.label}` : p.label}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(p.tags ?? []).slice(0, 3).map(t => (
                      <span key={t} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-serif font-light text-xl sm:text-2xl leading-snug mb-2" style={{ letterSpacing: '-0.5px', color: '#111827' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  )
}