'use client'
import { useReveal } from './useReveal'

const posts = [
  {
    date: 'FEB 12, 2025',
    tag: 'Next.js',
    title: 'Why App Router Changed Everything for My Workflow',
    excerpt: 'After 6 months building exclusively with Next.js 14, here\'s what I\'ve learned about structuring complex apps.',
  },
  {
    date: 'JAN 28, 2025',
    tag: 'GSAP',
    title: 'Cinematic Web Animations Without the Complexity',
    excerpt: 'A practical guide to GSAP ScrollTrigger patterns that look incredible without tanking performance.',
  },
  {
    date: 'JAN 10, 2025',
    tag: 'Design',
    title: 'The Light & Minimal Design System I Use on Every Project',
    excerpt: 'From color tokens to typography scales — a reusable system for fast, beautiful UI work.',
  },
]

export default function Blog() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14" style={{background:'#FAFAFA'}}>
      <div className="max-w-6xl mx-auto">

        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">From The Blog</p>
            <h2 className="font-serif font-light leading-tight" style={{fontSize:'clamp(28px,3.5vw,52px)',letterSpacing:'-1px',color:'#111827'}}>
              Dev Insights &<br /><em className="not-italic" style={{color:'#3B5BDB'}}>Technical</em> Musings
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 border-b border-gray-200 pb-0.5 text-link-arrow whitespace-nowrap">
            All articles <span>↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <div
              key={i}
              className={`blog-card rounded-2xl p-6 sm:p-7 border border-gray-200 bg-white cursor-pointer reveal reveal-delay-${i+1}`}
            >
              <p className="text-xs text-gray-300 tracking-widest mb-3">{p.date}</p>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4" style={{background:'#EEF2FF',color:'#3B5BDB',border:'1px solid #C7D2FE'}}>
                {p.tag}
              </span>
              <h3 className="blog-title font-serif font-light text-lg leading-snug mb-3" style={{letterSpacing:'-0.3px',color:'#111827'}}>
                {p.title}
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">{p.excerpt}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
