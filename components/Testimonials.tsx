'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Testimonial = { quote: string; name: string; role: string; initials: string; bg: string }

const DEFAULTS: Testimonial[] = [
  { quote: "Working with sakhidev was a turning point for our startup. They didn't just build what we asked — they challenged our assumptions and made the product genuinely better.", name: 'Aryan Jhonson', role: 'Founder, NovaBrand', initials: 'A', bg: '#B5EAD7' },
  { quote: "The attention to detail is unmatched. Every interaction, every animation, every API call felt considered. Our users noticed the quality immediately.", name: 'Sara Chen', role: 'CEO, Flowboard', initials: 'S', bg: '#C7CEEA' },
  { quote: "Being part of this process reminded me how powerful small acts of craft can be. Every time we shipped, I knew I was helping someone take a real step forward.", name: 'Marcus Webb', role: 'Product Lead, ShopLane', initials: 'M', bg: '#FAF3DD' },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULTS)
  const [active, setActive] = useState(0)

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
    supabase.from('settings').select('*').then(({ data }) => {
      if (!data) return
      const s: Record<string, string> = {}
      data.forEach((row: { key: string; value: string }) => { s[row.key] = row.value })
      const loaded: Testimonial[] = [1, 2, 3].map((n, i) => ({
        quote: s[`testimonial_${n}_quote`] || DEFAULTS[i].quote,
        name: s[`testimonial_${n}_name`] || DEFAULTS[i].name,
        role: s[`testimonial_${n}_role`] || DEFAULTS[i].role,
        initials: s[`testimonial_${n}_initials`] || DEFAULTS[i].initials,
        bg: s[`testimonial_${n}_bg`] || DEFAULTS[i].bg,
      }))
      setTestimonials(loaded)
    })
  }, [])

  // Each card's position based on its relation to active
  const getCardStyle = (i: number, total: number): React.CSSProperties => {
    // position relative to active: 0 = front, 1 = middle, 2 = back
    const pos = (i - active + total) % total

    if (pos === 0) return {
      // Front card — fully visible
      transform: 'translateX(0) translateY(0) scale(1)',
      opacity: 1,
      zIndex: 30,
      pointerEvents: 'auto',
    }
    if (pos === 1) return {
      // Middle card — peeking right + slightly back
      transform: 'translateX(28px) translateY(10px) scale(0.96)',
      opacity: 0.7,
      zIndex: 20,
      pointerEvents: 'auto',
    }
    // Back card — most behind
    return {
      transform: 'translateX(52px) translateY(20px) scale(0.92)',
      opacity: 0.4,
      zIndex: 10,
      pointerEvents: 'auto',
    }
  }

  const next = () => setActive(a => (a + 1) % testimonials.length)
  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-6 md:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto text-center">

        <div className="reveal">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Stories From The People</p>
          <h2 className="font-serif font-light mb-10 sm:mb-14 text-white"
            style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-1px' }}>
            What Clients Say
          </h2>
        </div>

        {/* Stack container */}
        <div className="reveal reveal-delay-1 relative mx-auto" style={{ height: '260px', maxWidth: '600px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={next}
              className="absolute inset-0 rounded-2xl p-7 sm:p-10 flex flex-col justify-between cursor-pointer"
              style={{
                background: t.bg,
                transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
                ...getCardStyle(i, testimonials.length),
              }}
            >
              <p className="font-serif font-light text-sm sm:text-base leading-relaxed text-left"
                style={{ color: '#0D1B3E' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm font-medium text-white flex-shrink-0"
                  style={{ background: '#0D1B3E' }}>
                  {t.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium" style={{ color: '#0D1B3E' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(13,27,62,0.55)' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-10 reveal reveal-delay-2">
          {/* Prev */}
          <button onClick={prev}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active === i ? '24px' : '8px',
                  height: '8px',
                  background: active === i ? '#3B5BDB' : 'rgba(255,255,255,0.25)',
                }} />
            ))}
          </div>

          {/* Next */}
          <button onClick={next}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}>
            →
          </button>
        </div>

        <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Click card or arrows to browse
        </p>

      </div>
    </section>
  )
}