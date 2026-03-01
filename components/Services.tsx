'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase, type Service } from '@/lib/supabase'
import Link from 'next/link'

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const [services, setServices] = useState<Service[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)

  // Reveal observer
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

  // Fetch
  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setServices(data) })
  }, [])

  const toggle = (id: number) => setExpanded(prev => prev === id ? null : id)

  return (
    <section
      ref={ref}
      className="py-14 sm:py-20 px-6 md:px-10 lg:px-14"
      style={{ background: '#FAFAFA' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">What We Do</p>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#111827' }}
            >
              Services Built<br />for{' '}
              <em className="not-italic" style={{ color: '#3B5BDB' }}>Modern</em> Products
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap self-start sm:self-auto"
          >
            View all <span>↗</span>
          </Link>
        </div>

        {/* Service rows */}
        <div className="reveal reveal-delay-1 border border-gray-200 rounded-2xl overflow-hidden">

          {/* Skeleton */}
          {services.length === 0 && (
            [...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 sm:gap-8 px-6 sm:px-10 py-5 sm:py-6 ${i < 5 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="w-6 h-3 bg-gray-100 rounded animate-pulse mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))
          )}

          {/* Real rows */}
          {services.map((s, i) => {
            const isOpen = expanded === s.id
            return (
              <div
                key={s.id}
                className={i < services.length - 1 ? 'border-b border-gray-200' : ''}
              >
                {/* Clickable header row */}
                <button
                  onClick={() => toggle(s.id)}
                  className="w-full text-left flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-5 sm:py-6 transition-all duration-200 group"
                  style={{
                    background: isOpen ? 'rgba(59,91,219,0.03)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = '#F8F9FF' }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Number */}
                  <span className="font-serif text-xs text-gray-400 min-w-[28px] flex-shrink-0 mt-0.5">
                    {s.num}
                  </span>

                  {/* Icon + title + short */}
                  <div className="flex-1 min-w-0 flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-all duration-200"
                      style={{
                        background: isOpen ? s.accent + '20' : '#F3F4F6',
                        color: isOpen ? s.accent : '#9CA3AF',
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="text-sm sm:text-base font-medium leading-snug transition-colors duration-200"
                        style={{ color: isOpen ? s.accent : '#111827' }}
                      >
                        {s.title}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mt-0.5 truncate">
                          {s.short}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Chevron */}
                  <span
                    className="flex-shrink-0 text-gray-300 transition-all duration-300 text-lg"
                    style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', color: isOpen ? s.accent : undefined }}
                  >
                    →
                  </span>
                </button>

                {/* Expanded details */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <div className="px-6 sm:px-10 pb-6 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
                    style={{ borderTop: `1px solid ${s.accent}20`, background: 'rgba(59,91,219,0.02)' }}
                  >
                    {/* Description */}
                    <div>
                      <p className="text-sm font-light text-gray-600 leading-relaxed">{s.description}</p>
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold transition-colors"
                        style={{ color: s.accent }}
                      >
                        Learn more ↗
                      </Link>
                    </div>

                    {/* Deliverables */}
                    {s.deliverables?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                          What's included
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {s.deliverables.map((d: string, di: number) => (
                            <li key={di} className="flex items-center gap-2 text-xs text-gray-600 font-light">
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}