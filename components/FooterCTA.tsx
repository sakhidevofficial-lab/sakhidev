'use client'
import { useReveal } from './useReveal'

export default function FooterCTA() {
  const ref = useReveal()

  return (
    <section ref={ref} className="footer-cta-bg py-24 sm:py-32 px-6 md:px-10 text-center">
      <div className="max-w-3xl mx-auto reveal">
        <p className="text-xs tracking-widest uppercase text-indigo-400 mb-6">Let's Build Together</p>
        <h2 className="font-serif font-light mb-8 leading-tight" style={{ fontSize: 'clamp(36px,6vw,80px)', letterSpacing: '-2px', color: '#0D1B3E' }}>
          Ready to Build<br />Something <em className="not-italic" style={{ color: '#3B5BDB' }}>Great?</em>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base font-medium text-white rounded-full px-8 py-4 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: '#0D1B3E', boxShadow: '0 6px 24px rgba(13,27,62,0.2)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B5BDB'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D1B3E'; }}
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <a
            href="mailto:hello@sakhidev.com"
            className="w-full sm:w-auto flex items-center justify-center text-sm sm:text-base font-medium rounded-full px-8 py-4 border border-indigo-200 text-indigo-700 transition-all duration-200 hover:border-indigo-400 hover:bg-white/60 active:scale-95"
          >
            hello@sakhidev.com
          </a>
        </div>
      </div>
    </section>
  )
}
