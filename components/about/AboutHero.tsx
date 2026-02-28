'use client'

export default function AboutHero() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-24 pb-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 10%, #d8e5ff 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 85% 80%, #e8e4ff 0%, transparent 55%), #FAFAFA',
      }}
    >
      {/* Floating orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium border"
          style={{ background: '#EEF2FF', color: '#3B5BDB', borderColor: '#C7D2FE' }}>
          ✦ Our Story
        </div>

        {/* Headline */}
        <h1
          className="hero-anim-2 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(42px, 6.5vw, 88px)', letterSpacing: '-2px', color: '#111827' }}
        >
          Built on <em className="not-italic" style={{ color: '#3B5BDB' }}>Craft.</em><br />
          Driven by <em className="not-italic" style={{ color: '#3B5BDB' }}>Purpose.</em>
        </h1>

        {/* Sub */}
        <p
          className="hero-anim-3 font-light leading-relaxed mx-auto max-w-lg mb-10"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280' }}
        >
          sakhidev started as a belief — that digital products should feel effortless, work beautifully, and be built with genuine care for the people who use them.
        </p>

        {/* Scroll hint */}
        <div className="hero-anim-4 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-gray-400">Scroll to explore</span>
          <div className="w-px h-8 bg-gray-300" />
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.2), transparent)' }} />
    </section>
  )
}
