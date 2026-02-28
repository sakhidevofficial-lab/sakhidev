'use client'
import { useReveal } from '@/components/useReveal'

const stats = [
  { num: '47+', label: 'Projects Delivered' },
  { num: '8',   label: 'Countries' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '5yr', label: 'Of Experience' },
]

export default function WorkStats() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      style={{ background: '#0D1B3E' }}
      className="py-12 px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 reveal"
          style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="py-8 px-6 sm:px-10 text-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <p
                className="font-serif font-bold mb-1"
                style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: '#fff', letterSpacing: '-1px' }}
              >
                {s.num}
              </p>
              <p className="text-xs font-light tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
