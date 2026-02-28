'use client'
import { useReveal } from './useReveal'
import { useState } from 'react'

const testimonials = [
  {
    quote: "Working with sakhidev was a turning point for our startup. They didn't just build what we asked — they challenged our assumptions and made the product genuinely better.",
    name: 'Aryan Jhonson',
    role: 'Founder, NovaBrand',
    initials: 'A',
    bg: '#B5EAD7',
  },
  {
    quote: "The attention to detail is unmatched. Every interaction, every animation, every API call felt considered. Our users noticed the quality immediately.",
    name: 'Sara Chen',
    role: 'CEO, Flowboard',
    initials: 'S',
    bg: '#C7CEEA',
  },
  {
    quote: "Being part of this process reminded me how powerful small acts of craft can be. Every time we shipped, I knew I was helping someone take a real step forward.",
    name: 'Marcus Webb',
    role: 'Product Lead, ShopLane',
    initials: 'M',
    bg: '#FAF3DD',
  },
]

export default function Testimonials() {
  const ref = useReveal()
  const [active, setActive] = useState(2)

  return (
    <section ref={ref} style={{ background: '#0D1B3E' }} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto text-center">

        <div className="reveal">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Stories From The People</p>
          <h2 className="font-serif font-light mb-12 sm:mb-16 text-white" style={{ fontSize: 'clamp(28px,3.5vw,48px)', letterSpacing: '-1px' }}>
            What Clients Say
          </h2>
        </div>

        {/* Stack */}
        <div className="reveal reveal-delay-1 t-stack relative mx-auto cursor-pointer" style={{ height: '280px', maxWidth: '640px' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`t-card-${i + 1} absolute inset-0 rounded-2xl p-8 sm:p-10 flex flex-col justify-between`}
              style={{ background: t.bg, zIndex: i + 1 }}
              onClick={() => setActive(i)}
            >
              <p className="font-serif font-light text-base sm:text-lg leading-relaxed text-left" style={{ color: '#0D1B3E' }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-light text-white flex-shrink-0" style={{ background: '#0D1B3E' }}>
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

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8 reveal reveal-delay-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width: active === i ? '24px' : '8px',
                height: '8px',
                background: active === i ? '#3B5BDB' : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
