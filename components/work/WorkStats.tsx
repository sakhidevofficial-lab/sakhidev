'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function WorkStats() {
  const ref = useRef<HTMLElement>(null)
  const [stats, setStats] = useState([
    { num: '47+', label: 'Projects Delivered' },
    { num: '8', label: 'Countries' },
    { num: '98%', label: 'Client Satisfaction' },
    { num: '5yr', label: 'Of Experience' },
  ])

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
      setStats([
        { num: `${s['stat_1_num'] ?? '47'}${s['stat_1_suffix'] ?? '+'}`, label: s['stat_1_label'] ?? 'Projects Delivered' },
        { num: '8', label: 'Countries' },
        { num: `${s['stat_2_num'] ?? '98'}${s['stat_2_suffix'] ?? '%'}`, label: s['stat_2_label'] ?? 'Client Satisfaction' },
        { num: `${s['stat_3_num'] ?? '5'}${s['stat_3_suffix'] ?? 'yr'}`, label: s['stat_3_label'] ?? 'Of Experience' },
      ])
    })
  }, [])

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="py-12 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 reveal"
          style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
          {stats.map((s, i) => (
            <div key={i} className="py-8 px-6 sm:px-10 text-center"
              style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <p className="font-serif font-bold mb-1"
                style={{ fontSize: 'clamp(26px,3.5vw,40px)', color: '#fff', letterSpacing: '-1px' }}>{s.num}</p>
              <p className="text-xs font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}