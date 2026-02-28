'use client'
import { useState } from 'react'
import { posts, categories, type Post } from './posts'

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Next.js':    { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' },
  'GSAP':       { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
  'Design':     { bg: '#ECFEFF', text: '#0891B2', border: '#A5F3FC' },
  'SaaS':       { bg: '#F0FDF4', text: '#059669', border: '#A7F3D0' },
  'Backend':    { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  'TypeScript': { bg: '#EFF6FF', text: '#1D4ED8', border: '#BFDBFE' },
  'Business':   { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
}

function FeaturedCard({ post }: { post: Post }) {
  const color = categoryColors[post.category] ?? { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' }

  return (
    <div className="work-card group md:col-span-2 rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}>
      {/* Thumbnail */}
      <div className="overflow-hidden h-56 sm:h-72 md:h-80">
        <div
          className="work-card-img w-full h-full flex flex-col items-end justify-end p-8"
          style={{ background: post.gradient }}
        >
          <span
            className="font-serif font-light text-white/80 text-right leading-snug"
            style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', maxWidth: '420px' }}
          >
            {post.title}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
          >
            {post.category}
          </span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="text-xs text-gray-300">·</span>
          <span className="text-xs text-gray-400">{post.readTime}</span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full ml-auto"
            style={{ background: '#FFF7ED', color: '#C2410C', border: '1px solid #FED7AA' }}
          >
            ✦ Featured
          </span>
        </div>
        <h2
          className="blog-title font-serif font-light mb-3 leading-snug"
          style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', letterSpacing: '-0.5px', color: '#111827' }}
        >
          {post.title}
        </h2>
        <p className="text-sm font-light leading-relaxed text-gray-500 mb-6">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-serif text-sm text-white font-light"
              style={{ background: 'linear-gradient(135deg, #3B5BDB, #6366F1)' }}
            >
              S
            </div>
            <span className="text-xs text-gray-400 font-light">Sekh Dev</span>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5"
            style={{ color: '#3B5BDB' }}
          >
            Read Article →
          </span>
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post }: { post: Post }) {
  const color = categoryColors[post.category] ?? { bg: '#EEF2FF', text: '#3B5BDB', border: '#C7D2FE' }

  return (
    <div className="blog-card group rounded-2xl overflow-hidden border border-gray-200 bg-white cursor-pointer flex flex-col"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      {/* Thumb */}
      <div className="overflow-hidden h-40 sm:h-44">
        <div
          className="work-card-img w-full h-full flex items-end justify-start p-5"
          style={{ background: post.gradient }}
        >
          <span
            className="font-sans text-xs font-medium text-white/70 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
          >
            {post.category}
          </span>
          <span className="text-xs text-gray-300 ml-auto">{post.date}</span>
        </div>

        <h3
          className="blog-title font-serif font-light leading-snug mb-2 flex-1"
          style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', letterSpacing: '-0.3px', color: '#111827' }}
        >
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-400 mb-5 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center font-serif text-xs text-white"
              style={{ background: 'linear-gradient(135deg, #3B5BDB, #6366F1)' }}
            >
              S
            </div>
            <span className="text-xs text-gray-400">Sekh Dev</span>
          </div>
          <span
            className="text-xs font-medium transition-all duration-200 group-hover:translate-x-1 inline-block"
            style={{ color: '#3B5BDB' }}
          >
            Read →
          </span>
        </div>
      </div>
    </div>
  )
}

export default function BlogGrid() {
  const [active, setActive] = useState('All')
  const [animating, setAnimating] = useState(false)
  const [visible, setVisible] = useState(posts)

  const featured = visible.find(p => p.featured)
  const rest = visible.filter(p => !p.featured)

  const handleFilter = (cat: string) => {
    if (cat === active) return
    setAnimating(true)
    setTimeout(() => {
      setActive(cat)
      const filtered = cat === 'All' ? posts : posts.filter(p => p.category === cat)
      setVisible(filtered)
      setAnimating(false)
    }, 220)
  }

  return (
    <section className="py-16 sm:py-24 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleFilter(cat)}
              className="text-xs sm:text-sm font-medium rounded-full px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: active === cat ? '#0D1B3E' : '#F3F4F6',
                color: active === cat ? '#fff' : '#6B7280',
                border: active === cat ? '1px solid transparent' : '1px solid #E5E7EB',
                boxShadow: active === cat ? '0 4px 14px rgba(13,27,62,0.2)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="transition-all duration-200"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
        >
          {visible.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl font-light text-gray-300">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Featured card spans 2 cols */}
              {featured && active === 'All' && <FeaturedCard post={featured} />}

              {/* Regular cards */}
              {(active === 'All' ? rest : visible).map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
