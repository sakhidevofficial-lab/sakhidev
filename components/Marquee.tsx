'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const DEFAULT = ['Next.js', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'AWS', 'Vercel', 'GSAP', 'Figma', 'Stripe', 'MongoDB', 'Docker', 'GraphQL', 'Redis']

export default function Marquee() {
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
    <div className="overflow-hidden py-4" style={{ background: '#0D1B3E' }}>
      <div className="flex">
        <div className="marquee-track flex-shrink-0 flex items-center gap-12">
          {doubled.map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="text-sm tracking-widest uppercase text-white/40 font-light whitespace-nowrap">{t}</span>
              <span style={{ color: '#3B5BDB' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}