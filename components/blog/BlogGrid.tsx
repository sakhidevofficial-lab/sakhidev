'use client'
import { useState, useEffect } from 'react'
import { supabase, type BlogPost } from '@/lib/supabase'

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Next.js': { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' },
  'GSAP': { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  'Design': { bg: '#ECFEFF', text: '#0891B2', border: '#A5F3FC' },
  'SaaS': { bg: '#F0FDF4', text: '#059669', border: '#A7F3D0' },
  'Backend': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  'TypeScript': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'Business': { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
}

const ALL_CATS = ['All', 'Next.js', 'GSAP', 'Design', 'SaaS', 'Backend', 'TypeScript', 'Business']

export default function BlogGrid() {
  const [all, setAll] = useState<BlogPost[]>([])
  const [visible, setVisible] = useState<BlogPost[]>([])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (data) { setAll(data); setVisible(data) }
        setLoading(false)
      })
  }, [])

  const handleFilter = (cat: string) => {
    if (cat === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(cat)
      setVisible(cat === 'All' ? all : all.filter(p => p.category === cat))
      setAnimating(false)
    }, 220)
  }

  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  return (
    <section className="pb-24 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        {/* Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center py-10">
          {ALL_CATS.map(cat => (
            <button key={cat} onClick={() => handleFilter(cat)}
              className="text-xs sm:text-sm font-medium rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 hover:scale-105"
              style={{ background: active === cat ? '#0D1B3E' : '#F3F4F6', color: active === cat ? '#fff' : '#6B7280', border: active === cat ? '1px solid transparent' : '1px solid #E5E7EB' }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="transition-all duration-200" style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`rounded-2xl overflow-hidden border border-gray-200 bg-white ${i === 0 ? 'sm:col-span-2' : ''}`}>
                  <div className="h-40 animate-pulse bg-gray-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl font-light text-gray-300">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Featured post */}
              {featured && (
                <div className="work-card group md:col-span-2 rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
                  style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
                  <div className="h-48 sm:h-64 overflow-hidden">
                    <div className="work-card-img w-full h-full flex items-center justify-center font-serif text-white/80 font-light text-lg"
                      style={{ background: featured.gradient }}>
                      ✦ Featured
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    {(() => {
                      const c = categoryColors[featured.category] ?? categoryColors['Next.js']; return (
                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                          style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
                          {featured.category}
                        </span>
                      )
                    })()}
                    <h2 className="blog-title font-serif font-light mb-3 leading-snug"
                      style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.5px', color: '#111827' }}>
                      {featured.title}
                    </h2>
                    <p className="text-sm font-light leading-relaxed text-gray-500 mb-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{featured.published_at ? new Date(featured.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                      <span>·</span>
                      <span>{featured.read_time}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rest of posts */}
              {rest.map((p) => {
                const color = categoryColors[p.category] ?? { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' }
                return (
                  <div key={p.id} className="blog-card rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
                    style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    <div className="h-36 overflow-hidden">
                      <div className="work-card-img w-full h-full" style={{ background: p.gradient }} />
                    </div>
                    <div className="p-6">
                      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                        style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                        {p.category}
                      </span>
                      <h3 className="blog-title font-serif font-light text-lg leading-snug mb-3"
                        style={{ letterSpacing: '-0.3px', color: '#111827' }}>
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-400 font-light leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span>
                        <span>·</span>
                        <span>{p.read_time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}