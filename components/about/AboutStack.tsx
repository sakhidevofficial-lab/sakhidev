'use client'
import { useReveal } from '@/components/useReveal'

const categories = [
  {
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'Infrastructure',
    items: ['AWS', 'Vercel', 'Docker', 'GitHub Actions', 'Cloudflare', 'Supabase'],
  },
  {
    label: 'Design & Tools',
    items: ['Figma', 'Storybook', 'Stripe', 'Resend', 'Zod', 'Vitest'],
  },
]

export default function AboutStack() {
  const ref = useReveal()

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Tools of the Trade</p>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#fff' }}
            >
              The stack we trust<br />
              to <em className="not-italic" style={{ color: '#818CF8' }}>ship great products</em>
            </h2>
          </div>
        </div>

        {/* Stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal reveal-delay-1">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-white/15"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#818CF8' }}>{cat.label}</p>
              <ul className="flex flex-col gap-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2.5 group cursor-default">
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-150"
                      style={{ background: 'rgba(255,255,255,0.25)' }}
                    />
                    <span
                      className="text-sm font-light transition-colors duration-200 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.55)' }}
                    >
                      {item}
                    </span>
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
