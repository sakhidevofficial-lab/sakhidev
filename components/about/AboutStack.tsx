'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DEFAULT_CATEGORIES = [
  { label: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { label: 'Infrastructure', items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Cloudflare', 'Supabase'] },
  { label: 'Design & Tools', items: ['Figma', 'Storybook', 'Stripe', 'Resend', 'Zod', 'Vitest'] },
]

export default function AboutStack() {
  const ref = useRef<HTMLElement>(null)
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)

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
      const loaded = [1, 2, 3, 4].map((n, i) => ({
        label: s[`stack_${n}_label`] || DEFAULT_CATEGORIES[i].label,
        items: s[`stack_${n}_items`]
          ? s[`stack_${n}_items`].split(',').map(t => t.trim()).filter(Boolean)
          : DEFAULT_CATEGORIES[i].items,
      }))
      setCategories(loaded)
    })
  }, [])

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Tools of the Trade</p>
            <h2 className="font-serif font-light leading-tight" style={{ fontSize: 'clamp(28px,3.5vw,52px)', letterSpacing: '-1px', color: '#fff' }}>
              The stack we trust<br />to <em className="not-italic" style={{ color: '#818CF8' }}>ship great products</em>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal reveal-delay-1">
          {categories.map((cat, i) => (
            <div key={i} className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-white/15"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#818CF8' }}>{cat.label}</p>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 group cursor-default">
                    <span className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-150" style={{ background: 'rgba(255,255,255,0.25)' }} />
                    <span className="text-sm font-light transition-colors duration-200 group-hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}