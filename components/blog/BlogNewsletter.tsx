'use client'
import { useState } from 'react'
import { useReveal } from '@/components/useReveal'

export default function BlogNewsletter() {
  const ref = useReveal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <section
      ref={ref}
      style={{ background: '#0D1B3E' }}
      className="py-24 sm:py-28 px-6 md:px-10 lg:px-14"
    >
      <div className="max-w-2xl mx-auto text-center reveal">

        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-medium"
          style={{ background: 'rgba(129,140,248,0.15)', color: '#818CF8', border: '1px solid rgba(129,140,248,0.25)' }}
        >
          ✦ Stay in the Loop
        </div>

        <h2
          className="font-serif font-light leading-tight mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-1.5px', color: '#fff' }}
        >
          New articles, no spam.<br />
          <em className="not-italic" style={{ color: '#818CF8' }}>Ever.</em>
        </h2>

        <p
          className="font-light leading-relaxed mb-10"
          style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.45)' }}
        >
          Get new posts delivered to your inbox when they drop — dev deep-dives, product lessons, and the occasional honest take on freelancing.
        </p>

        {submitted ? (
          <div
            className="flex items-center justify-center gap-3 rounded-2xl px-8 py-5"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
          >
            <span className="text-green-400 text-xl">✓</span>
            <p className="text-sm font-medium text-green-300">You're in! First article lands in your inbox soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full px-5 py-3.5 text-sm font-light outline-none transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
              }}
              onFocus={e => e.currentTarget.style.border = '1px solid rgba(129,140,248,0.5)'}
              onBlur={e => e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)'}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex-shrink-0 flex items-center justify-center gap-2 text-sm font-medium text-white rounded-full px-6 py-3.5 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100"
              style={{
                background: loading ? 'rgba(59,91,219,0.6)' : '#3B5BDB',
                boxShadow: '0 4px 16px rgba(59,91,219,0.35)',
              }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Subscribe →</>
              )}
            </button>
          </form>
        )}

        <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.25)' }}>
          No spam, unsubscribe any time. 100% free.
        </p>
      </div>
    </section>
  )
}
