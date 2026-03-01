'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [focused, setFocused]   = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg,#0D1B3E 0%,#1a2d5a 50%,#0D1B3E 100%)', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Background dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-5"
            style={{ width: `${[300,200,150,250,180,120][i]}px`, height: `${[300,200,150,250,180,120][i]}px`, background: '#3B5BDB', top: `${[10,60,30,80,20,70][i]}%`, left: `${[10,80,50,20,70,40][i]}%`, transform: 'translate(-50%,-50%)' }} />
        ))}
      </div>

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg,#3B5BDB,#6366F1)', boxShadow: '0 0 12px rgba(59,91,219,0.6)' }} />
            <span className="font-serif font-bold text-2xl text-white tracking-tight">SAKHIDEV</span>
          </div>
          <p className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Panel</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          <h1 className="text-xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-sm font-light mb-7" style={{ color: 'rgba(255,255,255,0.4)' }}>Sign in to your admin panel</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Email</label>
              <input
                type="email"
                placeholder="admin@sakhidev.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm font-light outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: focused === 'email' ? '1px solid #3B5BDB' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium block mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm font-light outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: focused === 'password' ? '1px solid #3B5BDB' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <p className="text-xs font-medium" style={{ color: '#F87171' }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full text-sm font-semibold text-white rounded-full py-3.5 transition-all hover:scale-[1.02] disabled:opacity-70 mt-2"
              style={{ background: 'linear-gradient(135deg,#3B5BDB,#6366F1)', boxShadow: '0 4px 20px rgba(59,91,219,0.4)' }}>
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In →'}
            </button>

          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
          SekhDev Admin · Secured by Supabase Auth
        </p>
      </div>
    </div>
  )
}
