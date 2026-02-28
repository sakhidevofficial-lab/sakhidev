'use client'
import { useReveal } from '@/components/useReveal'

const team = [
  {
    name: 'Sekh Dev',
    role: 'Founder & Lead Engineer',
    bio: 'Full-stack engineer with 5+ years building products. Obsessed with performance, clean architecture, and interfaces that feel inevitable.',
    initials: 'SD',
    gradient: 'linear-gradient(135deg, #3B5BDB, #6366F1)',
    links: { github: '#', linkedin: '#', twitter: '#' },
  },
  {
    name: 'Alex Rivera',
    role: 'UI/UX Designer',
    bio: 'Designs with a systems-first mindset. Bridges the gap between beautiful and functional with a bias for simplicity.',
    initials: 'AR',
    gradient: 'linear-gradient(135deg, #6366F1, #818CF8)',
    links: { github: '#', linkedin: '#', twitter: '#' },
  },
  {
    name: 'Jordan Kim',
    role: 'Backend Engineer',
    bio: 'Infrastructure and API specialist. If it scales, Jordan probably had a hand in it.',
    initials: 'JK',
    gradient: 'linear-gradient(135deg, #0891B2, #06B6D4)',
    links: { github: '#', linkedin: '#', twitter: '#' },
  },
]

const SocialIcon = ({ type }: { type: string }) => {
  if (type === 'github') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
  if (type === 'linkedin') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export default function AboutTeam() {
  const ref = useReveal()

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">The People</p>
            <h2
              className="font-serif font-light leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', letterSpacing: '-1px', color: '#111827' }}
            >
              Small team.<br />
              <em className="not-italic" style={{ color: '#3B5BDB' }}>Outsized</em> impact.
            </h2>
          </div>
          <p className="text-sm font-light text-gray-400 max-w-xs text-right hidden sm:block">
            We stay intentionally small so every project gets real attention from real people.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal reveal-delay-1">
          {team.map((member, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-default transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}
            >
              {/* Avatar block */}
              <div
                className="h-48 sm:h-52 flex items-center justify-center font-serif text-4xl font-light text-white relative overflow-hidden"
                style={{ background: member.gradient }}
              >
                {member.initials}
                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
                />
              </div>

              {/* Info */}
              <div className="p-6 sm:p-7">
                <h3 className="font-serif text-lg font-light text-gray-900 mb-0.5" style={{ letterSpacing: '-0.3px' }}>
                  {member.name}
                </h3>
                <p className="text-xs font-medium mb-4" style={{ color: '#3B5BDB' }}>{member.role}</p>
                <p className="text-sm font-light leading-relaxed text-gray-500 mb-5">{member.bio}</p>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  {Object.entries(member.links).map(([type, href]) => (
                    <a
                      key={type}
                      href={href}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{
                        background: '#F3F4F6',
                        color: '#6B7280',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#EEF2FF'
                        e.currentTarget.style.color = '#3B5BDB'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#F3F4F6'
                        e.currentTarget.style.color = '#6B7280'
                      }}
                    >
                      <SocialIcon type={type} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiring banner */}
        <div
          className="reveal reveal-delay-2 mt-8 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}
        >
          <div>
            <h4 className="font-serif text-xl font-light mb-1" style={{ color: '#0D1B3E', letterSpacing: '-0.5px' }}>
              Want to join the team?
            </h4>
            <p className="text-sm font-light text-gray-500">We occasionally collaborate with talented designers and engineers.</p>
          </div>
          <button
            className="flex-shrink-0 flex items-center gap-2 text-sm font-medium text-white rounded-full px-6 py-3 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: '#0D1B3E' }}
            onMouseEnter={e => e.currentTarget.style.background = '#3B5BDB'}
            onMouseLeave={e => e.currentTarget.style.background = '#0D1B3E'}
          >
            Say Hello →
          </button>
        </div>

      </div>
    </section>
  )
}
