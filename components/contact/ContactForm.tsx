'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type FormData = { name: string; email: string; budget: string; service: string; timeline: string; message: string }

const budgets = ['Under $2,500', '$2,500 – $7,500', '$7,500 – $15,000', '$15,000+', 'Let\'s discuss']
const timelines = ['ASAP', '1–2 months', '2–4 months', '4+ months', 'Flexible']
const DEFAULT_SERVICES = ['Full-Stack Development', 'UI/UX Design', 'SaaS Product', 'API Integration', 'Performance Optimization', 'Maintenance Retainer', 'Not sure yet']

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null)
  const [services, setServices] = useState<string[]>(DEFAULT_SERVICES)
  const [form, setForm] = useState<FormData>({ name: '', email: '', budget: '', service: '', timeline: '', message: '' })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  useEffect(() => {
    const section = ref.current; if (!section) return
    const els = section.querySelectorAll('.reveal')
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Pull service names from services table
  useEffect(() => {
    supabase.from('services').select('title').eq('visible', true).order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setServices([...data.map(s => s.title), 'Not sure yet'])
        }
      })
  }, [])

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Tell us about your project'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch('/admin/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) setSubmitted(true)
    } catch (err) { console.error(err) } finally { setLoading(false) }
  }

  const inputStyle = (field: string) => ({
    background: focused === field ? 'rgba(59,91,219,0.03)' : '#fff',
    border: errors[field as keyof FormData] ? '1px solid #FCA5A5' : focused === field ? '1px solid #3B5BDB' : '1px solid #E5E7EB',
    transition: 'all 0.2s', outline: 'none', width: '100%', borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: '#111827', fontFamily: 'DM Sans, sans-serif', fontWeight: '300',
  })

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: '500' as const, color: '#374151', marginBottom: '6px', letterSpacing: '0.02em' }

  if (submitted) return (
    <section className="py-24 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{ background: 'linear-gradient(135deg,#3B5BDB,#6366F1)', boxShadow: '0 12px 40px rgba(59,91,219,0.3)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <h2 className="font-serif font-light mb-4" style={{ fontSize: 'clamp(28px,4vw,42px)', letterSpacing: '-1px', color: '#111827' }}>Message Received!</h2>
        <p className="text-sm font-light leading-relaxed text-gray-500 mb-8 max-w-md mx-auto">
          Thanks <strong className="font-medium text-gray-800">{form.name}</strong>! We'll get back to you at <strong className="font-medium text-gray-800">{form.email}</strong> within 24 hours.
        </p>
        <div className="rounded-2xl p-6 text-left" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
          <p className="text-xs tracking-widest uppercase text-indigo-400 mb-3">What happens next</p>
          <ul className="flex flex-col gap-2.5">
            {['We review your project details carefully', 'We prepare a tailored response or proposal', 'You hear from us within 24 hours — guaranteed'].map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-light text-indigo-800">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style={{ background: '#3B5BDB' }}>{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )

  return (
    <section ref={ref} className="py-20 sm:py-28 px-6 md:px-10 lg:px-14" style={{ background: '#FAFAFA' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <div className="lg:col-span-2 reveal">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Get In Touch</p>
          <h2 className="font-serif font-light leading-tight mb-6" style={{ fontSize: 'clamp(26px,3vw,40px)', letterSpacing: '-1px', color: '#111827' }}>
            Tell us about<br /><em className="not-italic" style={{ color: '#3B5BDB' }}>your project</em>
          </h2>
          <p className="text-sm font-light leading-relaxed text-gray-500 mb-8">The more detail you share, the better we can tailor our response.</p>
          <div className="flex flex-col gap-4">
            {[{ icon: '⚡', label: '24hr Response', desc: 'We reply to every message within one business day' }, { icon: '🔒', label: 'NDA Available', desc: 'Happy to sign an NDA before discussing your project' }, { icon: '📞', label: 'Free Discovery Call', desc: '30-minute call to discuss your project at no cost' }].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg" style={{ background: '#EEF2FF' }}>{item.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-800 mb-0.5">{item.label}</p>
                  <p className="text-xs font-light text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-3 reveal reveal-delay-2 rounded-2xl p-7 sm:p-10"
          style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type="text" placeholder="John Doe" value={form.name} style={inputStyle('name')}
                onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }} />
              {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
            </div>
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" placeholder="john@company.com" value={form.email} style={inputStyle('email')}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }} />
              {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
            </div>
          </div>

          <div className="mb-5">
            <label style={labelStyle}>Service Needed</label>
            <div className="flex flex-wrap gap-2">
              {services.map(s => (
                <button key={s} type="button" onClick={() => setForm({ ...form, service: s })}
                  className="text-xs font-medium rounded-full px-3.5 py-2 transition-all duration-150"
                  style={{ background: form.service === s ? '#0D1B3E' : '#F3F4F6', color: form.service === s ? '#fff' : '#6B7280', border: form.service === s ? '1px solid transparent' : '1px solid #E5E7EB' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label style={labelStyle}>Budget Range</label>
              <div className="flex flex-col gap-2">
                {budgets.map(b => (
                  <button key={b} type="button" onClick={() => setForm({ ...form, budget: b })}
                    className="text-xs font-medium rounded-xl px-4 py-2.5 text-left transition-all duration-150"
                    style={{ background: form.budget === b ? '#EEF2FF' : '#F9FAFB', color: form.budget === b ? '#3B5BDB' : '#6B7280', border: form.budget === b ? '1px solid #C7D2FE' : '1px solid #F3F4F6' }}>
                    {form.budget === b ? '✓ ' : ''}{b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Timeline</label>
              <div className="flex flex-col gap-2">
                {timelines.map(t => (
                  <button key={t} type="button" onClick={() => setForm({ ...form, timeline: t })}
                    className="text-xs font-medium rounded-xl px-4 py-2.5 text-left transition-all duration-150"
                    style={{ background: form.timeline === t ? '#EEF2FF' : '#F9FAFB', color: form.timeline === t ? '#3B5BDB' : '#6B7280', border: form.timeline === t ? '1px solid #C7D2FE' : '1px solid #F3F4F6' }}>
                    {form.timeline === t ? '✓ ' : ''}{t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-7">
            <label style={labelStyle}>Project Details *</label>
            <textarea rows={5} placeholder="Tell us what you're building..." value={form.message} style={{ ...inputStyle('message'), resize: 'none' } as React.CSSProperties}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
              onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }) }} />
            {errors.message && <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>}
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-3 text-sm font-medium text-white rounded-full py-4 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            style={{ background: 'linear-gradient(135deg,#0D1B3E 0%,#3B5BDB 100%)', boxShadow: '0 6px 24px rgba(59,91,219,0.3)' }}>
            {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</> : <>Send Message <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>}
          </button>
          <p className="text-center text-xs text-gray-400 font-light mt-4">We respond within 24 hours · No spam, ever</p>
        </form>
      </div>
    </section>
  )
}