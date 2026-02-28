'use client'
import { useEffect, useRef } from 'react'

const splitSteps = [
  { num: '01', title: 'Listen & Learn', desc: 'We begin by listening to you deeply — your goals, users, constraints, and vision.' },
  { num: '02', title: 'Co-Create with Conviction', desc: 'Design and development happen in tight loops. You\'re involved every step.' },
  { num: '03', title: 'Support Long-Term Growth', desc: 'Post-launch support, iteration, and scaling — we\'re in it for the long run.' },
]

export default function SplitSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal')
    if (!els) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target) } })
    }, { threshold: 0.08 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Content */}
        <div className="reveal order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.14em] font-medium text-gray-400 uppercase mb-3">Our Approach</p>
          <h2 className="font-serif font-light text-[clamp(26px,3vw,40px)] leading-[1.15] tracking-tight text-gray-900 mb-6">
            How We Create<br />Changes Together
          </h2>
          <button className="flex items-center gap-2 bg-navy text-white text-sm font-medium px-6 py-3 rounded-full mb-8 transition-all duration-200 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 hover:scale-105">
            Join With Us
          </button>

          <div className="flex flex-col">
            {splitSteps.map((s, i) => (
              <div
                key={s.num}
                className="group flex gap-4 py-4 border-b border-gray-100 last:border-0 transition-all duration-200 hover:pl-2 cursor-default"
              >
                <span className="text-xs text-gray-300 flex-shrink-0 mt-0.5 font-light">{s.num}</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-accent transition-colors duration-200">{s.title}</h4>
                  <p className="text-[13px] text-gray-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="reveal reveal-d2 order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-100 to-purple-200 h-80 sm:h-96 lg:h-[480px] flex items-center justify-center">
            <span className="font-serif text-indigo-400/70 text-base font-light">Crafting with purpose</span>
            {/* decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/10" />
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-violet-300/30" />
          </div>
        </div>
      </div>
    </section>
  )
}
