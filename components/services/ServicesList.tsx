'use client'
import { useState, useEffect } from 'react'
import { useReveal } from '@/components/useReveal'
import { supabase, type Service } from '@/lib/supabase'

export default function ServicesList() {
  const ref = useReveal()
  const [services, setServices] = useState<Service[]>([])
  const [expanded, setExpanded] = useState<number | null>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('services')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) { setServices(data); setExpanded(data[0]?.id ?? null) }
        setLoading(false)
      })
  }, [])

  return (
    <section id="services-list" ref={ref} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal mb-14">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Services</p>
          <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#111827' }}>
            Six ways we can help<br />
            <em className="not-italic" style={{ color: '#3B5BDB' }}>your product grow</em>
          </h2>
        </div>

        <div className="reveal reveal-delay-1 flex flex-col border border-gray-200 rounded-2xl overflow-hidden">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 last:border-b-0 px-6 sm:px-10 py-6 sm:py-7 flex items-center gap-8">
                <div className="w-6 h-3 bg-gray-100 rounded animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                className={`border-b border-gray-200 last:border-b-0 transition-all duration-300 ${expanded === s.id ? 'bg-white' : 'bg-white hover:bg-gray-50/60'}`}
              >
                <button
                  className="w-full flex items-center gap-4 sm:gap-8 px-6 sm:px-10 py-6 sm:py-7 text-left group"
                  onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                >
                  <span className="font-serif text-xs text-gray-300 min-w-[24px] flex-shrink-0">{s.num}</span>
                  <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-medium leading-snug mb-0.5 truncate"
                        style={{ color: expanded === s.id ? s.accent : '#111827' }}>
                        {s.title}
                      </h3>
                      {expanded !== s.id && (
                        <p className="text-xs text-gray-400 font-light hidden sm:block">{s.short}</p>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ background: expanded === s.id ? s.accent : '#F3F4F6', transform: expanded === s.id ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1v10M1 6h10" stroke={expanded === s.id ? '#fff' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </button>

                <div className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: expanded === s.id ? '600px' : '0px', opacity: expanded === s.id ? 1 : 0 }}>
                  <div className="px-6 sm:px-10 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium mb-5"
                        style={{ background: s.accent + '15', color: s.accent }}>
                        <span>{s.icon}</span> {s.title}
                      </div>
                      <p className="text-sm font-light leading-relaxed text-gray-500 mb-6">{s.description}</p>
                      <a href="/contact" className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                        style={{ color: s.accent }}>
                        Get a quote for this service →
                      </a>
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">What You Get</p>
                      <ul className="flex flex-col gap-3">
                        {(s.deliverables ?? []).map((d, j) => (
                          <li key={j} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.accent }} />
                            <span className="text-sm font-light text-gray-600">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}