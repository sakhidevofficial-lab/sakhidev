'use client'

export default function ServicesHero() {
  return (
    <section
      className="relative min-h-[72vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-28 pb-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 75% 55% at 50% 5%, #d8e5ff 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 90%, #ede9fe 0%, transparent 55%), radial-gradient(ellipse 30% 30% at 90% 60%, #dbeeff 0%, transparent 60%), #FAFAFA',
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div
          className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium border"
          style={{ background: '#EEF2FF', color: '#3B5BDB', borderColor: '#C7D2FE' }}
        >
          ✦ What We Offer
        </div>

        {/* Headline */}
        <h1
          className="hero-anim-2 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', letterSpacing: '-2px', color: '#111827' }}
        >
          Every Service Built<br />
          to <em className="not-italic" style={{ color: '#3B5BDB' }}>Solve Real</em> Problems
        </h1>

        {/* Sub */}
        <p
          className="hero-anim-3 font-light leading-relaxed mx-auto max-w-xl mb-10"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280' }}
        >
          We don't offer packages — we solve problems. Tell us what you're building and we'll tell you exactly how we can help.
        </p>

        {/* CTA row */}
        <div className="hero-anim-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/contact"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium text-white rounded-full px-7 py-3.5 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: '#0D1B3E', boxShadow: '0 4px 20px rgba(13,27,62,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B5BDB'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,91,219,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D1B3E'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,27,62,0.25)' }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a
            href="#services-list"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium rounded-full px-7 py-3.5 border border-gray-200 text-gray-700 transition-all duration-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95"
          >
            Browse Services
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.2), transparent)' }}
      />
    </section>
  )
}
