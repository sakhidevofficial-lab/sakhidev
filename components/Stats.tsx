'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runCounter = () => {
    setCount(0)
    if (timerRef.current) clearInterval(timerRef.current)
    let current = 0
    const duration = 2200
    const steps = 80
    const increment = target / steps
    const intervalMs = duration / steps
    timerRef.current = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timerRef.current!)
      } else {
        setCount(Math.floor(current))
      }
    }, intervalMs)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          runCounter()
        } else {
          if (timerRef.current) clearInterval(timerRef.current)
          setCount(0)
        }
      })
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => { observer.disconnect(); if (timerRef.current) clearInterval(timerRef.current) }
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats() {
  const [stats, setStats] = useState([
    { num: 47, suffix: '+', label: 'Projects' },
    { num: 98, suffix: '%', label: 'Satisfaction' },
    { num: 5, suffix: 'yr', label: 'Experience' },
    { num: 30, suffix: '+', label: 'Clients' },
  ])

  useEffect(() => {
    supabase.from('settings').select('*').then(({ data }) => {
      if (!data) return
      const s: Record<string, string> = {}
      data.forEach((row: { key: string; value: string }) => { s[row.key] = row.value })
      setStats([
        { num: parseInt(s['stat_1_num'] ?? '47'), suffix: s['stat_1_suffix'] ?? '+', label: s['stat_1_label'] ?? 'Projects' },
        { num: parseInt(s['stat_2_num'] ?? '98'), suffix: s['stat_2_suffix'] ?? '%', label: s['stat_2_label'] ?? 'Satisfaction' },
        { num: parseInt(s['stat_3_num'] ?? '5'), suffix: s['stat_3_suffix'] ?? 'yr', label: s['stat_3_label'] ?? 'Experience' },
        { num: parseInt(s['stat_4_num'] ?? '30'), suffix: s['stat_4_suffix'] ?? '+', label: s['stat_4_label'] ?? 'Clients' },
      ])
    })
  }, [])

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-14 px-4 sm:px-6 md:px-10 lg:px-14"
      style={{ background: 'linear-gradient(160deg, #04091a 0%, #091430 50%, #04091a 100%)' }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      {/* Ambient blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '600px', height: '120px', background: 'radial-gradient(ellipse, rgba(59,91,219,0.12), transparent 70%)' }} />

      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.7) 50%, transparent)' }} />
      {/* Bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.4) 50%, transparent)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 flex-nowrap">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group flex-shrink-0 flex flex-col items-center justify-center rounded-full relative cursor-default transition-all duration-300 hover:scale-105"
              style={{
                width: 'clamp(80px,18vw,148px)',
                height: 'clamp(80px,18vw,148px)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle, rgba(59,91,219,0.2), transparent 70%)' }} />

              <span className="font-serif font-bold leading-none relative z-10"
                style={{ fontSize: 'clamp(16px,3.5vw,32px)', color: '#e2e8f0', letterSpacing: '-1px' }}>
                <Counter target={s.num} suffix={s.suffix} />
              </span>
              <span className="font-sans font-light mt-1 relative z-10"
                style={{ fontSize: 'clamp(9px,1.2vw,13px)', color: 'rgba(255,255,255,0.38)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}