'use client'

export default function ContactHero() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-28 pb-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 5%, #d8e5ff 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 90% 85%, #ede9fe 0%, transparent 55%), radial-gradient(ellipse 30% 30% at 5% 70%, #dbeeff 0%, transparent 60%), #FAFAFA',
      }}
    >
      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Available badge */}
        <div className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium border"
          style={{ background: '#F0FDF4', color: '#166534', borderColor: '#BBF7D0' }}>
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Available for new projects
        </div>

        {/* Headline */}
        <h1
          className="hero-anim-2 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', letterSpacing: '-2px', color: '#111827' }}
        >
          Let's Build Something<br />
          <em className="not-italic" style={{ color: '#3B5BDB' }}>Great Together</em>
        </h1>

        <p
          className="hero-anim-3 font-light leading-relaxed mx-auto max-w-lg"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280' }}
        >
          Tell us about your project — what you're building, when you need it, and what success looks like. We'll get back to you within 24 hours.
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.2), transparent)' }}
      />
    </section>
  )
}
