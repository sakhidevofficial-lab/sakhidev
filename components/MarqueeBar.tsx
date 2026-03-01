'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DEFAULT = ['Next.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'AWS', 'Vercel', 'GSAP', 'Figma', 'Stripe']

export default function MarqueeBar() {
  const [techs, setTechs] = useState<string[]>(DEFAULT)

  useEffect(() => {
    supabase.from('settings').select('value').eq('key', 'marquee_techs').single()
      .then(({ data }) => {
        if (data?.value) {
          const parsed = data.value.split(',').map((t: string) => t.trim()).filter(Boolean)
          if (parsed.length > 0) setTechs(parsed)
        }
      })
  }, [])

  const doubled = [...techs, ...techs]

  return (
    <div className="bg-navy overflow-hidden py-3.5 select-none">
      <div className="flex animate-marquee whitespace-nowrap w-max gap-12">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-[13px] tracking-widest font-light text-white/40">
            {t}
            <span className="text-accent text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}