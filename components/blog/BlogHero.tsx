'use client'

export default function BlogHero() {
  return (
    <section
      className="relative min-h-[65vh] flex items-center justify-center px-6 md:px-10 lg:px-14 pt-28 pb-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 5%, #d8e5ff 0%, transparent 65%), radial-gradient(ellipse 35% 35% at 85% 85%, #fce7f3 0%, transparent 55%), radial-gradient(ellipse 30% 30% at 10% 70%, #ede9fe 0%, transparent 60%), #FAFAFA',
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #3B5BDB 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        <div
          className="hero-anim-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium border"
          style={{ background: '#EEF2FF', color: '#3B5BDB', borderColor: '#C7D2FE' }}
        >
          ✦ Dev Journal
        </div>

        <h1
          className="hero-anim-2 font-serif font-light leading-[1.05] tracking-tight mb-6"
          style={{ fontSize: 'clamp(40px, 6.5vw, 86px)', letterSpacing: '-2px', color: '#111827' }}
        >
          Insights from<br />
          <em className="not-italic" style={{ color: '#3B5BDB' }}>the trenches</em>
        </h1>

        <p
          className="hero-anim-3 font-light leading-relaxed mx-auto max-w-lg mb-10"
          style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6B7280' }}
        >
          Real-world lessons on building products, writing clean code, working with clients, and growing a dev studio — no fluff, no filler.
        </p>

        {/* Stats row */}
        <div className="hero-anim-4 flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
          {[
            { num: '8+', label: 'Articles' },
            { num: '5', label: 'Categories' },
            { num: '~8min', label: 'Avg read' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-serif font-light text-2xl sm:text-3xl" style={{ color: '#0D1B3E', letterSpacing: '-1px' }}>{s.num}</p>
              <p className="text-xs text-gray-400 mt-0.5 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(59,91,219,0.2), transparent)' }}
      />
    </section>
  )
}
