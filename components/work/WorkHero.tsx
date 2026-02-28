'use client'

export default function WorkHero() {
  return (
    <section
      className="relative min-h-[70vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-28 pb-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 5%, #d8e5ff 0%, transparent 65%), radial-gradient(ellipse 35% 35% at 90% 80%, #e8e4ff 0%, transparent 55%), #FAFAFA',
      }}
    >
      {/* Floating glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div
          className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium border"
          style={{ background: '#EEF2FF', color: '#3B5BDB', borderColor: '#C7D2FE' }}
        >
          ✦ Selected Work
        </div>

        {/* Headline */}
        <h1
          className="hero-anim-2 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', letterSpacing: '-2px', color: '#111827' }}
        >
          Products Built with<br />
          <em className="not-italic" style={{ color: '#3B5BDB' }}>Purpose</em> &amp;{' '}
          <em className="not-italic" style={{ color: '#6366F1' }}>Precision</em>
        </h1>

        {/* Sub */}
        <p
          className="hero-anim-3 font-light leading-relaxed mx-auto max-w-lg mb-10"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280' }}
        >
          From MVPs to full-scale platforms — every project here was built with obsessive attention
          to detail, clean architecture, and outcomes that actually matter.
        </p>

        {/* Scroll hint */}
        <div className="hero-anim-4 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-gray-400">Explore projects</span>
          <div className="w-px h-8 bg-gray-300" />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.2), transparent)' }}
      />
    </section>
  )
}
