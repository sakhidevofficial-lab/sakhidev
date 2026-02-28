'use client'
import { useState, useEffect } from 'react'
import WorkFilter from './WorkFilter'
import { projects } from './projects'

export default function WorkGrid() {
  const [active, setActive]       = useState('All')
  const [visible, setVisible]     = useState(projects)
  const [animating, setAnimating] = useState(false)

  const handleFilter = (cat: string) => {
    if (cat === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(cat)
      setVisible(cat === 'All' ? projects : projects.filter(p => p.category === cat))
      setAnimating(false)
    }, 220)
  }

  return (
    <section className="pb-24 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        {/* Filter bar */}
        <WorkFilter active={active} onChange={handleFilter} />

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 transition-all duration-200"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
        >
          {visible.map((p, i) => (
            <div
              key={p.id}
              className={`group work-card rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer ${p.featured ? 'md:col-span-2' : ''}`}
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
            >
              {/* Thumbnail */}
              <div
                className={`overflow-hidden ${p.featured ? 'h-56 sm:h-72 md:h-80' : 'h-44 sm:h-52'}`}
              >
                <div
                  className="work-card-img w-full h-full flex flex-col items-center justify-center gap-2"
                  style={{ background: p.gradient }}
                >
                  <span className="font-serif text-white/30 text-xs tracking-widest uppercase">{p.category}</span>
                  <span
                    className="font-serif font-light text-white text-center px-6"
                    style={{ fontSize: 'clamp(16px, 2.5vw, 22px)' }}
                  >
                    {p.label}
                  </span>
                  <span className="font-sans text-white/40 text-xs">{p.year}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(t => (
                    <span
                      key={t}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title + Year */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3
                    className="font-serif font-light leading-snug"
                    style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', letterSpacing: '-0.5px', color: '#111827' }}
                  >
                    {p.title}
                  </h3>
                  <span
                    className="text-xs font-medium flex-shrink-0 mt-1 px-2.5 py-1 rounded-full"
                    style={{ background: '#F3F4F6', color: '#6B7280' }}
                  >
                    {p.year}
                  </span>
                </div>

                {/* Desc */}
                <p className="text-sm font-light leading-relaxed text-gray-500 mb-5">{p.desc}</p>

                {/* Result */}
                <div
                  className="flex items-start gap-3 rounded-xl p-4"
                  style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}
                >
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✦</span>
                  <p className="text-xs font-medium text-green-800 leading-relaxed">{p.result}</p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-light">{p.category}</span>
                  <button
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5"
                    style={{ color: '#3B5BDB' }}
                  >
                    View Case Study
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6h10M6 1l5 5-5 5" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl font-light text-gray-300">No projects in this category yet.</p>
          </div>
        )}

      </div>
    </section>
  )
}
