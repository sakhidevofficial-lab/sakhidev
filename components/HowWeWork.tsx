'use client'
import { useReveal } from './useReveal'

const steps = [
  { num: '01', title: 'Listen & Learn', desc: 'We begin by listening to you — your goals, users, constraints, local partners, and community.' },
  { num: '02', title: 'Co-Create with Conviction', desc: 'Design and development happen in tight loops. You\'re involved every step of the way.' },
  { num: '03', title: 'Support Long-Term Growth', desc: 'Post-launch support, iteration, and scaling — we\'re committed for the long run.' },
]

export default function HowWeWork() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14" style={{background:'#FAFAFA'}}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Text side */}
        <div className="reveal order-2 lg:order-1">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Approach</p>
          <h2 className="font-serif font-light leading-tight mb-8" style={{fontSize:'clamp(28px,3vw,42px)',letterSpacing:'-1px',color:'#111827'}}>
            How We Create<br />Changes Together
          </h2>

          <button
            className="flex items-center gap-2 text-sm font-medium text-white rounded-full px-6 py-3 mb-10 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{background:'#0D1B3E'}}
            onMouseEnter={e => e.currentTarget.style.background='#3B5BDB'}
            onMouseLeave={e => e.currentTarget.style.background='#0D1B3E'}
          >
            Join With Us
          </button>

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div key={i} className={`split-step flex gap-5 py-5 cursor-default ${i < steps.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="text-xs text-gray-300 min-w-[28px] mt-1 font-serif flex-shrink-0">{s.num}</span>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{s.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div
          className="reveal reveal-delay-2 order-1 lg:order-2 rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center font-serif text-indigo-400 font-light"
          style={{height:'clamp(280px, 45vw, 500px)', background:'linear-gradient(135deg, #C7D2FE 0%, #A5B4FC 50%, #818CF8 100%)', fontSize:'clamp(14px,2vw,17px)'}}
        >
          Crafting with purpose
        </div>

      </div>
    </section>
  )
}
