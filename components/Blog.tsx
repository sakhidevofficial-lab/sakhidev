'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase, type BlogPost } from '@/lib/supabase'
import Link from 'next/link'

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Next.js': { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' },
  'GSAP': { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  'Design': { bg: '#ECFEFF', text: '#0891B2', border: '#A5F3FC' },
  'SaaS': { bg: '#F0FDF4', text: '#059669', border: '#A7F3D0' },
  'Backend': { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  'TypeScript': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'Business': { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
}

export default function Blog() {
  const ref = useRef<HTMLElement>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])

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
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setPosts(data) })
  }, [])

  return (
    <section ref={ref} className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">From The Blog</p>
            <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#111827' }}>
              Dev Insights &<br /><em className="not-italic" style={{ color: '#3B5BDB' }}>Technical</em> Musings
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap">
            All articles <span>↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.length === 0 ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className={`rounded-2xl p-6 sm:p-7 border border-gray-200 bg-white reveal reveal-delay-${i + 1}`}>
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse mb-3" />
                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse mb-4" />
                <div className="h-5 bg-gray-100 rounded animate-pulse w-full mb-2" />
                <div className="h-5 bg-gray-100 rounded animate-pulse w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-full mb-1" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
              </div>
            ))
          ) : (
            posts.map((p, i) => {
              const color = categoryColors[p.category] ?? { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' }
              const date = p.published_at
                ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
                : ''
              return (
                <div key={p.id} className={`blog-card rounded-2xl p-6 sm:p-7 border border-gray-200 bg-white cursor-pointer reveal reveal-delay-${i + 1}`}>
                  <p className="text-xs text-gray-300 tracking-widest mb-3">{date}</p>
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4"
                    style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
                  >
                    {p.category}
                  </span>
                  <h3 className="blog-title font-serif font-light text-lg leading-snug mb-3" style={{ letterSpacing: '-0.3px', color: '#111827' }}>
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{p.excerpt}</p>
                  <p className="text-xs text-gray-300 mt-4">{p.read_time}</p>
                </div>
              )
            })
          )}
        </div>

      </div>
    </section>
  )
}