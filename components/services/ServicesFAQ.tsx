'use client'
import { useState } from 'react'
import { useReveal } from '@/components/useReveal'

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope. A landing page or simple web app takes 1–2 weeks. A full SaaS product typically takes 6–12 weeks. We always provide a detailed timeline in our proposal before any work begins.',
  },
  {
    q: 'Do you work with clients outside Pakistan?',
    a: 'Absolutely — most of our clients are international. We\'ve worked with teams across the US, UK, Europe, and the Middle East. We use async communication tools and schedule overlap hours to make collaboration seamless.',
  },
  {
    q: 'What\'s your payment structure?',
    a: 'We typically work on a 50% upfront, 50% on delivery model for fixed projects. For larger projects, we use milestone-based payments. Retainers are billed monthly in advance.',
  },
  {
    q: 'Do you offer design services or just development?',
    a: 'Both. We have a designer on the team who works in Figma and can handle everything from wireframes to full design systems. We can also work from your existing designs or Figma files if you have a design team.',
  },
  {
    q: 'Will I own the code after the project?',
    a: 'Yes — 100%. You get full ownership of all code, design files, and assets. We hand off everything including repository access, documentation, and deployment credentials.',
  },
  {
    q: 'Can you work with my existing codebase?',
    a: 'Yes. We\'re comfortable jumping into existing projects — auditing, refactoring, adding features, or fixing bugs. We\'ll do a code review first and be honest about what we find.',
  },
  {
    q: 'What if I\'m not happy with the work?',
    a: 'We iterate until you\'re happy — that\'s built into our process. We don\'t consider a milestone complete until you sign off. In the rare case of a serious issue, we\'ll make it right, full stop.',
  },
  {
    q: 'Do you do SEO or digital marketing?',
    a: 'We handle technical SEO — meta tags, structured data, Core Web Vitals, sitemap, robots.txt, and performance. We don\'t do content marketing or paid ads, but we can recommend trusted partners.',
  },
]

export default function ServicesFAQ() {
  const ref = useReveal()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      ref={ref}
      style={{ background: '#0D1B3E' }}
      className="py-24 sm:py-32 px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="reveal text-center mb-14">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>FAQ</p>
          <h2
            className="font-serif font-light leading-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#fff' }}
          >
            Questions we get<br />
            <em className="not-italic" style={{ color: '#818CF8' }}>asked a lot</em>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="reveal reveal-delay-1 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: open === i ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${open === i ? 'rgba(129,140,248,0.3)' : 'rgba(255,255,255,0.07)'}`,
              }}
            >
              {/* Question */}
              <button
                className="w-full flex items-center justify-between gap-4 px-6 sm:px-8 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-sm sm:text-base font-medium leading-snug"
                  style={{ color: open === i ? '#fff' : 'rgba(255,255,255,0.8)' }}
                >
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: open === i ? '#3B5BDB' : 'rgba(255,255,255,0.08)',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? '300px' : '0px', opacity: open === i ? 1 : 0 }}
              >
                <p
                  className="px-6 sm:px-8 pb-6 text-sm font-light leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="reveal reveal-delay-2 mt-10 text-center">
          <p className="text-sm font-light mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-white rounded-full px-6 py-3 transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(59,91,219,0.8)', border: '1px solid rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,91,219,1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,91,219,0.8)'}
          >
            Ask us directly →
          </a>
        </div>

      </div>
    </section>
  )
}
