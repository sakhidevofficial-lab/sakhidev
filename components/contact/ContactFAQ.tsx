'use client'
import { useState } from 'react'
import { useReveal } from '@/components/useReveal'

const faqs = [
  {
    q: 'How quickly will you respond to my message?',
    a: 'Within 24 hours on business days — always. If your project is urgent, mention it and we\'ll prioritize your inquiry.',
  },
  {
    q: 'Do you offer a free consultation?',
    a: 'Yes. We offer a free 30-minute discovery call for every serious inquiry. No pitch, no pressure — just an honest conversation about your project.',
  },
  {
    q: 'What information should I include in my message?',
    a: 'The more the better — what you\'re building, who it\'s for, your timeline, and your budget range. Even rough answers help us give you a more useful response.',
  },
  {
    q: 'Can you sign an NDA before we talk?',
    a: 'Absolutely. If your project is sensitive or confidential, just let us know and we\'ll sign an NDA before any details are shared.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Most of our clients are international. We work across time zones using async communication, and schedule calls during overlap hours that work for both parties.',
  },
]

export default function ContactFAQ() {
  const ref = useReveal()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 px-6 md:px-10 lg:px-14"
      style={{ background: '#F8F9FF' }}
    >
      <div className="max-w-3xl mx-auto">

        <div className="reveal text-center mb-12">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">FAQ</p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-1px', color: '#111827' }}
          >
            Quick answers before<br />
            <em className="not-italic" style={{ color: '#3B5BDB' }}>you reach out</em>
          </h2>
        </div>

        <div className="reveal reveal-delay-1 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer"
              style={{
                background: open === i ? '#fff' : '#fff',
                border: `1px solid ${open === i ? '#C7D2FE' : '#E5E7EB'}`,
                boxShadow: open === i ? '0 4px 20px rgba(59,91,219,0.08)' : 'none',
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-sm sm:text-base font-medium leading-snug"
                  style={{ color: open === i ? '#3B5BDB' : '#111827' }}
                >
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? '#3B5BDB' : '#F3F4F6',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke={open === i ? '#fff' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '200px' : '0px', opacity: open === i ? 1 : 0 }}
              >
                <p className="px-6 sm:px-8 pb-6 text-sm font-light leading-relaxed text-gray-500">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
