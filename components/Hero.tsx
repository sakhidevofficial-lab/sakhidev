'use client'

export default function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center text-center px-6 md:px-10 pt-24 pb-32 overflow-hidden">

      {/* Available badge */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Pill */}
        <div className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium text-green-700 border border-green-200" style={{ background: '#F0FDF4' }}>
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Available for new projects
        </div>

        {/* Eyebrow */}
        <p className="hero-anim-2 text-sm text-gray-400 tracking-wide mb-4">Together,</p>

        {/* Headline */}
        <h1 className="hero-anim-3 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(44px, 7vw, 92px)', letterSpacing: '-2px' }}>
          We Build Digital<br />
          <em className="not-italic font-light" style={{ color: '#3B5BDB' }}>Experiences</em> That Scale
        </h1>

        {/* Sub */}
        <p className="hero-anim-4 text-gray-500 font-light leading-relaxed mb-10 mx-auto max-w-md"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}>
          sakhidev is a freelance dev studio crafting fast, elegant web products — from pixel-perfect UIs to robust backends.
        </p>

        {/* Buttons */}
        <div className="hero-anim-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium text-white rounded-full px-7 py-3.5 transition-all duration-250 hover:scale-105 active:scale-95"
            style={{ background: '#0D1B3E', boxShadow: '0 4px 20px rgba(13,27,62,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3B5BDB'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,91,219,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D1B3E'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(13,27,62,0.25)'; }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium rounded-full px-7 py-3.5 border border-gray-200 text-gray-700 transition-all duration-200 hover:border-blue-400 hover:text-blue-600 active:scale-95"
            style={{ background: 'transparent' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EEF2FF'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            View Work
          </button>
        </div>

        {/* Bottom image strip */}
        <div className="hero-anim-6 flex items-end justify-center gap-2 sm:gap-3 mt-16 sm:mt-20">
          {[
            { label: 'UI', h: 'h-14 sm:h-16', grad: 'from-blue-200 to-indigo-300' },
            { label: 'API', h: 'h-20 sm:h-24', grad: 'from-indigo-200 to-violet-300' },
            { label: '✦ sakhidev', h: 'h-28 sm:h-36', grad: 'from-indigo-300 to-violet-400' },
            { label: 'SaaS', h: 'h-20 sm:h-24', grad: 'from-blue-200 to-cyan-300' },
            { label: 'Web', h: 'h-14 sm:h-16', grad: 'from-cyan-200 to-blue-300' },
          ].map(item => (
            <div
              key={item.label}
              className={`${item.h} w-16 sm:w-24 md:w-32 rounded-t-xl bg-gradient-to-br ${item.grad} flex items-center justify-center text-xs sm:text-sm font-serif text-indigo-700 font-light text-center px-1`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Social links - hidden on small screens */}
      <div className="hidden lg:flex absolute bottom-10 left-10 flex-col gap-2">
        {['GITHUB ↗', 'LINKEDIN ↗'].map(s => (
          <a key={s} href="#" className="text-xs font-medium text-gray-400 hover:text-blue-600 transition-colors tracking-widest">{s}</a>
        ))}
      </div>

      {/* Desc - hidden on small screens */}
      <p className="hidden lg:block absolute bottom-10 right-10 text-xs text-gray-400 max-w-[180px] text-right leading-relaxed font-light">
        Building elegant solutions through thoughtful code and meticulous design.
      </p>
    </section>
  )
}
