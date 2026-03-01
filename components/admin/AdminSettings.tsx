'use client'
import { useEffect, useState } from 'react'
import { supabase, upsertSetting } from '@/lib/supabase'
import { createClient } from '@/lib/supabase-browser'

// ── Sub-components OUTSIDE to prevent scroll-jump on keystroke ──

const Section = ({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) => (
  <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
    <div className="px-6 py-4 border-b" style={{ borderColor: '#F3F4F6' }}>
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
      {desc && <p className="text-xs text-gray-400 font-light mt-0.5">{desc}</p>}
    </div>
    <div className="p-6">{children}</div>
  </div>
)

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{children}</label>
)

const SaveBtn = ({ id, saving, saved, onClick }: { id: string; saving: string | null; saved: string | null; onClick: () => void }) => (
  <button onClick={onClick} disabled={saving === id}
    className="mt-5 text-sm font-semibold text-white rounded-full px-6 py-2.5 transition-all hover:scale-105 disabled:opacity-70"
    style={{ background: saved === id ? '#059669' : '#0D1B3E' }}>
    {saving === id
      ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span>
      : saved === id ? '✓ Saved!' : 'Save Changes'}
  </button>
)

// ── Main Component ──

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

  // ── State for every section ──
  const [availability, setAvailability] = useState<'available' | 'busy'>('available')
  const [availNote, setAvailNote] = useState('')
  const [contact, setContact] = useState({ email: '', whatsapp: '', location: '' })
  const [socials, setSocials] = useState({ github: '', linkedin: '', twitter: '' })
  const [seo, setSeo] = useState({ title: '', description: '', keywords: '' })
  const [footer, setFooter] = useState({ tagline: '', copyright: '', credit: '' })
  const [marquee, setMarquee] = useState('')

  const [stats, setStats] = useState([
    { num: '47', suffix: '+', label: 'Projects' },
    { num: '98', suffix: '%', label: 'Satisfaction' },
    { num: '5', suffix: 'yr', label: 'Experience' },
    { num: '30', suffix: '+', label: 'Clients' },
  ])

  const [testimonials, setTestimonials] = useState([
    { quote: '', name: '', role: '', initials: '', bg: '#B5EAD7' },
    { quote: '', name: '', role: '', initials: '', bg: '#C7CEEA' },
    { quote: '', name: '', role: '', initials: '', bg: '#FAF3DD' },
  ])

  const [howSteps, setHowSteps] = useState([
    { title: 'Listen & Learn', desc: 'We begin by listening to you — your goals, users, constraints, local partners, and community.' },
    { title: 'Co-Create with Conviction', desc: 'Design and development happen in tight loops. You\'re involved every step of the way.' },
    { title: 'Support Long-Term Growth', desc: 'Post-launch support, iteration, and scaling — we\'re committed for the long run.' },
  ])

  const [processSteps, setProcessSteps] = useState([
    { title: 'Discovery Call', desc: 'We learn about your goals, audience, timeline, and technical requirements.' },
    { title: 'Strategy & Scoping', desc: 'A detailed roadmap, tech stack recommendation, and clear deliverables.' },
    { title: 'Design System', desc: 'Figma-first design tokens, component library, and prototype for your sign-off.' },
    { title: 'Development Sprints', desc: '2-week sprints with daily updates and staging deploys.' },
    { title: 'QA & Performance', desc: 'Cross-browser testing, accessibility audit, Lighthouse optimization.' },
    { title: 'Launch & Beyond', desc: 'Smooth deployment, handoff docs, and ongoing support options.' },
  ])

  const [svcProcessSteps, setSvcProcessSteps] = useState([
    { title: 'Discovery Call', desc: 'A free 30-minute call about your goals and what success looks like.', duration: '30 min', icon: '📞' },
    { title: 'Proposal & Scope', desc: 'A detailed proposal with scope, timeline, and fixed price.', duration: '1–2 days', icon: '📋' },
    { title: 'Design Sprint', desc: 'Figma wireframes, component library, and your sign-off.', duration: '1–2 weeks', icon: '🎨' },
    { title: 'Build & Iterate', desc: 'Two-week development sprints with staging deploy at each milestone.', duration: '2–8 weeks', icon: '⚡' },
    { title: 'QA & Launch', desc: 'Cross-browser testing, Lighthouse optimization, and deployment.', duration: '3–5 days', icon: '🚀' },
    { title: 'Post-Launch Support', desc: 'Two weeks of free bug fixes, then flexible retainer options.', duration: 'Ongoing', icon: '🤝' },
  ])

  const [pricing, setPricing] = useState([
    { name: 'Starter', price: '$2,500', period: 'per project', desc: 'Perfect for landing pages and early-stage MVPs.', features: 'Up to 5 pages / screens|Responsive design|Next.js frontend|Basic CMS integration|SEO & performance setup|2 weeks of bug fixes', popular: false, accent: '#6B7280' },
    { name: 'Growth', price: '$7,500', period: 'per project', desc: 'For startups that need a production-ready full-stack product.', features: 'Full-stack web application|Custom design system|Database design & API|Authentication & user accounts|Stripe payment integration|Admin dashboard|Deployment & CI/CD|1 month post-launch support', popular: true, accent: '#3B5BDB' },
    { name: 'Retainer', price: '$3,500', period: 'per month', desc: 'A dedicated senior engineer on your team, ongoing.', features: '40 hours / month|Feature development|Bug fixes & maintenance|Weekly progress reports|On-call for critical issues|Monthly strategy review', popular: false, accent: '#6366F1' },
  ])

  const [servicesFaqs, setServicesFaqs] = useState([
    { q: 'How long does a typical project take?', a: 'It depends on scope. A landing page or simple web app takes 1–2 weeks. A full SaaS product typically takes 6–12 weeks.' },
    { q: 'Do you work with clients outside Pakistan?', a: 'Absolutely — most of our clients are international. We\'ve worked with teams across the US, UK, Europe, and the Middle East.' },
    { q: 'What\'s your payment structure?', a: 'We typically work on a 50% upfront, 50% on delivery model. For larger projects, we use milestone-based payments.' },
    { q: 'Will I own the code after the project?', a: 'Yes — 100%. You get full ownership of all code, design files, and assets.' },
    { q: 'Can you work with my existing codebase?', a: 'Yes. We\'re comfortable jumping into existing projects — auditing, refactoring, adding features, or fixing bugs.' },
    { q: 'What if I\'m not happy with the work?', a: 'We iterate until you\'re happy. We don\'t consider a milestone complete until you sign off.' },
    { q: 'Do you offer design services or just development?', a: 'Both. We have a designer on the team who works in Figma and handles everything from wireframes to full design systems.' },
    { q: 'Do you do SEO or digital marketing?', a: 'We handle technical SEO. We don\'t do content marketing or paid ads, but we can recommend trusted partners.' },
  ])

  const [contactFaqs, setContactFaqs] = useState([
    { q: 'How quickly will you respond?', a: 'Within 24 hours on business days — always.' },
    { q: 'Do you offer a free consultation?', a: 'Yes. We offer a free 30-minute discovery call for every serious inquiry.' },
    { q: 'What information should I include?', a: 'The more the better — what you\'re building, who it\'s for, your timeline, and budget range.' },
    { q: 'Can you sign an NDA before we talk?', a: 'Absolutely. Just let us know and we\'ll sign an NDA before any details are shared.' },
    { q: 'Do you work with clients outside Pakistan?', a: 'Most of our clients are international. We work across time zones using async communication.' },
  ])

  const [values, setValues] = useState([
    { title: 'Craft Over Speed', desc: 'We\'d rather take one more day and deliver something exceptional.', accent: '#3B5BDB' },
    { title: 'Radical Transparency', desc: 'No surprises. We communicate early and often — about everything.', accent: '#6366F1' },
    { title: 'Ownership Mentality', desc: 'We treat every project like it\'s our own. Your KPIs matter to us.', accent: '#818CF8' },
    { title: 'Simplicity Wins', desc: 'The best solution is almost always the simplest one.', accent: '#3B5BDB' },
    { title: 'Long-Term Thinking', desc: 'We design for maintainability and scale — not just the launch.', accent: '#6366F1' },
    { title: 'People First', desc: 'Behind every screen is a human. We design experiences that respect them.', accent: '#818CF8' },
  ])

  const [timeline, setTimeline] = useState([
    { year: '2019', title: 'The Beginning', desc: 'sakhidev launched as a solo freelance practice.', tag: 'Founded' },
    { year: '2020', title: 'First SaaS Product', desc: 'Built and launched a full SaaS MVP from scratch in 6 weeks.', tag: 'Milestone' },
    { year: '2021', title: 'Growing the Stack', desc: 'Expanded into backend, API design, cloud. International clients.', tag: 'Expansion' },
    { year: '2022', title: '20 Projects Shipped', desc: 'Crossed 20 shipped projects. Refined the development process.', tag: 'Growth' },
    { year: '2023', title: 'Studio Model', desc: 'Evolved from solo freelancer to a studio with trusted collaborators.', tag: 'Evolution' },
    { year: '2024', title: '47+ Projects', desc: 'Working with startups across 8 countries. Every project gets care.', tag: 'Today' },
  ])

  const [stack, setStack] = useState([
    { label: 'Frontend', items: 'Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP' },
    { label: 'Backend', items: 'Node.js, Express, Prisma, PostgreSQL, MongoDB, Redis' },
    { label: 'Infrastructure', items: 'AWS, Vercel, Docker, GitHub Actions, Cloudflare, Supabase' },
    { label: 'Design & Tools', items: 'Figma, Storybook, Stripe, Resend, Zod, Vitest' },
  ])

  // Password
  const [password, setPassword] = useState({ new_: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaving, setPwSaving] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)

  useEffect(() => { fetchSettings() }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data } = await supabase.from('settings').select('*')
    if (data) {
      const s: Record<string, string> = {}
      data.forEach((row: { key: string; value: string }) => { s[row.key] = row.value })

      setAvailability((s['availability_status'] as 'available' | 'busy') ?? 'available')
      setAvailNote(s['availability_note'] ?? '')
      setContact({ email: s['contact_email'] ?? '', whatsapp: s['contact_whatsapp'] ?? '', location: s['contact_location'] ?? '' })
      setSocials({ github: s['social_github'] ?? '', linkedin: s['social_linkedin'] ?? '', twitter: s['social_twitter'] ?? '' })
      setSeo({ title: s['seo_title'] ?? '', description: s['seo_description'] ?? '', keywords: s['seo_keywords'] ?? '' })
      setFooter({ tagline: s['footer_tagline'] ?? '', copyright: s['footer_copyright'] ?? '', credit: s['footer_credit'] ?? '' })
      setMarquee(s['marquee_techs'] ?? '')

      setStats([
        { num: s['stat_1_num'] ?? '47', suffix: s['stat_1_suffix'] ?? '+', label: s['stat_1_label'] ?? 'Projects' },
        { num: s['stat_2_num'] ?? '98', suffix: s['stat_2_suffix'] ?? '%', label: s['stat_2_label'] ?? 'Satisfaction' },
        { num: s['stat_3_num'] ?? '5', suffix: s['stat_3_suffix'] ?? 'yr', label: s['stat_3_label'] ?? 'Experience' },
        { num: s['stat_4_num'] ?? '30', suffix: s['stat_4_suffix'] ?? '+', label: s['stat_4_label'] ?? 'Clients' },
      ])

      setTestimonials([
        { quote: s['testimonial_1_quote'] ?? '', name: s['testimonial_1_name'] ?? '', role: s['testimonial_1_role'] ?? '', initials: s['testimonial_1_initials'] ?? '', bg: s['testimonial_1_bg'] ?? '#B5EAD7' },
        { quote: s['testimonial_2_quote'] ?? '', name: s['testimonial_2_name'] ?? '', role: s['testimonial_2_role'] ?? '', initials: s['testimonial_2_initials'] ?? '', bg: s['testimonial_2_bg'] ?? '#C7CEEA' },
        { quote: s['testimonial_3_quote'] ?? '', name: s['testimonial_3_name'] ?? '', role: s['testimonial_3_role'] ?? '', initials: s['testimonial_3_initials'] ?? '', bg: s['testimonial_3_bg'] ?? '#FAF3DD' },
      ])

      setHowSteps([1, 2, 3].map((n, i) => ({
        title: s[`how_step_${n}_title`] ?? howSteps[i].title,
        desc: s[`how_step_${n}_desc`] ?? howSteps[i].desc,
      })))

      setProcessSteps([1, 2, 3, 4, 5, 6].map((n, i) => ({
        title: s[`process_step_${n}_title`] ?? processSteps[i].title,
        desc: s[`process_step_${n}_desc`] ?? processSteps[i].desc,
      })))

      setSvcProcessSteps([1, 2, 3, 4, 5, 6].map((n, i) => ({
        title: s[`svc_process_${n}_title`] ?? svcProcessSteps[i].title,
        desc: s[`svc_process_${n}_desc`] ?? svcProcessSteps[i].desc,
        duration: s[`svc_process_${n}_duration`] ?? svcProcessSteps[i].duration,
        icon: s[`svc_process_${n}_icon`] ?? svcProcessSteps[i].icon,
      })))

      setPricing([1, 2, 3].map((n, i) => ({
        name: s[`pricing_${n}_name`] ?? pricing[i].name,
        price: s[`pricing_${n}_price`] ?? pricing[i].price,
        period: s[`pricing_${n}_period`] ?? pricing[i].period,
        desc: s[`pricing_${n}_desc`] ?? pricing[i].desc,
        features: s[`pricing_${n}_features`] ?? pricing[i].features,
        popular: s[`pricing_${n}_popular`] === 'true' ? true : s[`pricing_${n}_popular`] === 'false' ? false : pricing[i].popular,
        accent: s[`pricing_${n}_accent`] ?? pricing[i].accent,
      })))

      setServicesFaqs([1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => ({
        q: s[`services_faq_${n}_q`] ?? servicesFaqs[i]?.q ?? '',
        a: s[`services_faq_${n}_a`] ?? servicesFaqs[i]?.a ?? '',
      })))

      setContactFaqs([1, 2, 3, 4, 5].map((n, i) => ({
        q: s[`contact_faq_${n}_q`] ?? contactFaqs[i]?.q ?? '',
        a: s[`contact_faq_${n}_a`] ?? contactFaqs[i]?.a ?? '',
      })))

      setValues([1, 2, 3, 4, 5, 6].map((n, i) => ({
        title: s[`value_${n}_title`] ?? values[i].title,
        desc: s[`value_${n}_desc`] ?? values[i].desc,
        accent: s[`value_${n}_accent`] ?? values[i].accent,
      })))

      setTimeline([1, 2, 3, 4, 5, 6].map((n, i) => ({
        year: s[`timeline_${n}_year`] ?? timeline[i].year,
        title: s[`timeline_${n}_title`] ?? timeline[i].title,
        desc: s[`timeline_${n}_desc`] ?? timeline[i].desc,
        tag: s[`timeline_${n}_tag`] ?? timeline[i].tag,
      })))

      setStack([1, 2, 3, 4].map((n, i) => ({
        label: s[`stack_${n}_label`] ?? stack[i].label,
        items: s[`stack_${n}_items`]
          ? s[`stack_${n}_items`].split(',').map(t => t.trim()).join(', ')
          : stack[i].items,
      })))
    }
    setLoading(false)
  }

  const saveSection = async (section: string, pairs: [string, string][]) => {
    setSaving(section)
    await Promise.all(pairs.map(([k, v]) => upsertSetting(k, v)))
    setSaving(null); setSaved(section)
    setTimeout(() => setSaved(null), 2000)
  }

  const savePassword = async () => {
    setPwError('')
    if (password.new_.length < 6) { setPwError('Password must be at least 6 characters'); return }
    if (password.new_ !== password.confirm) { setPwError('Passwords do not match'); return }
    setPwSaving(true)
    const client = createClient()
    const { error } = await client.auth.updateUser({ password: password.new_ })
    if (error) { setPwError(error.message) } else {
      setPwSaved(true); setPassword({ new_: '', confirm: '' })
      setTimeout(() => setPwSaved(false), 3000)
    }
    setPwSaving(false)
  }

  const clearAllMessages = async () => {
    if (!confirm('Are you sure? This will delete ALL messages permanently.')) return
    await supabase.from('messages').delete().neq('id', 0)
  }

  const inp = (field: string): React.CSSProperties => ({
    width: '100%', background: focused === field ? 'rgba(59,91,219,0.03)' : '#F9FAFB',
    border: focused === field ? '1px solid #3B5BDB' : '1px solid #E5E7EB',
    borderRadius: '12px', padding: '12px 16px', fontSize: '14px', color: '#111827',
    outline: 'none', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif', fontWeight: 300,
  })

  const ta = (field: string, rows = 2): React.CSSProperties => ({ ...inp(field), resize: 'none' } as React.CSSProperties)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Settings</h1>
        <p className="text-sm text-gray-400 font-light mt-1">Changes save directly to your website</p>
      </div>

      {/* ── Availability ── */}
      <Section title="Availability Status" desc="Shown on Contact page to potential clients.">
        <div className="flex gap-3 mb-5">
          {(['available', 'busy'] as const).map(s => (
            <button key={s} onClick={() => setAvailability(s)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all capitalize"
              style={{ background: availability === s ? (s === 'available' ? '#F0FDF4' : '#FEF2F2') : '#F9FAFB', color: availability === s ? (s === 'available' ? '#166534' : '#DC2626') : '#9CA3AF', border: `1px solid ${availability === s ? (s === 'available' ? '#BBF7D0' : '#FECACA') : '#E5E7EB'}` }}>
              <span className={`w-2 h-2 rounded-full ${s === 'available' ? 'bg-green-500' : 'bg-red-400'}`} />
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <Label>Availability Note</Label>
        <textarea value={availNote} style={ta('availNote')} rows={2}
          onFocus={() => setFocused('availNote')} onBlur={() => setFocused(null)} onChange={e => setAvailNote(e.target.value)} />
        <SaveBtn id="availability" saving={saving} saved={saved} onClick={() => saveSection('availability', [['availability_status', availability], ['availability_note', availNote]])} />
      </Section>

      {/* ── Stats ── */}
      <Section title="Stats Bubbles" desc="The 4 animated number bubbles on the homepage.">
        <div className="flex flex-col gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Stat {i + 1}</p>
              <div className="grid grid-cols-3 gap-3">
                <div><Label>Number</Label><input style={inp(`s${i}n`)} value={stat.num} onFocus={() => setFocused(`s${i}n`)} onBlur={() => setFocused(null)} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, num: e.target.value } : x))} /></div>
                <div><Label>Suffix</Label><input style={inp(`s${i}s`)} value={stat.suffix} placeholder="+ % yr" onFocus={() => setFocused(`s${i}s`)} onBlur={() => setFocused(null)} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} /></div>
                <div><Label>Label</Label><input style={inp(`s${i}l`)} value={stat.label} onFocus={() => setFocused(`s${i}l`)} onBlur={() => setFocused(null)} onChange={e => setStats(p => p.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="stats" saving={saving} saved={saved} onClick={() => saveSection('stats', stats.flatMap((s, i) => [[`stat_${i + 1}_num`, s.num], [`stat_${i + 1}_suffix`, s.suffix], [`stat_${i + 1}_label`, s.label]] as [string, string][]))} />
      </Section>

      {/* ── Marquee ── */}
      <Section title="Tech Stack Marquee" desc="Comma-separated list shown in the scrolling bar.">
        <Label>Technologies (comma separated)</Label>
        <textarea value={marquee} style={ta('marquee')} rows={3} placeholder="Next.js, React, Node.js, ..."
          onFocus={() => setFocused('marquee')} onBlur={() => setFocused(null)} onChange={e => setMarquee(e.target.value)} />
        <p className="text-xs text-gray-400 mt-2">{marquee.split(',').filter(Boolean).length} technologies listed</p>
        <SaveBtn id="marquee" saving={saving} saved={saved} onClick={() => saveSection('marquee', [['marquee_techs', marquee]])} />
      </Section>

      {/* ── Testimonials ── */}
      <Section title="Testimonials" desc="3 client quotes on the homepage.">
        <div className="flex flex-col gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-gray-700" style={{ background: t.bg, border: '1px solid #E5E7EB' }}>{t.initials || (i + 1)}</div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Testimonial {i + 1}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div><Label>Quote</Label><textarea value={t.quote} style={ta(`t${i}q`)} rows={3} placeholder="Client quote..." onFocus={() => setFocused(`t${i}q`)} onBlur={() => setFocused(null)} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, quote: e.target.value } : x))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Name</Label><input style={inp(`t${i}n`)} value={t.name} placeholder="John Doe" onFocus={() => setFocused(`t${i}n`)} onBlur={() => setFocused(null)} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} /></div>
                  <div><Label>Role</Label><input style={inp(`t${i}r`)} value={t.role} placeholder="CEO, Company" onFocus={() => setFocused(`t${i}r`)} onBlur={() => setFocused(null)} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, role: e.target.value } : x))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Initials (2 letters)</Label><input style={inp(`t${i}i`)} value={t.initials} placeholder="JD" maxLength={2} onFocus={() => setFocused(`t${i}i`)} onBlur={() => setFocused(null)} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, initials: e.target.value } : x))} /></div>
                  <div><Label>Card Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={t.bg} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, bg: e.target.value } : x))} className="w-10 h-10 rounded-lg cursor-pointer p-0.5" style={{ border: '1px solid #E5E7EB', background: '#F9FAFB' }} />
                      <input style={{ ...inp(`t${i}bg`), flex: 1 }} value={t.bg} onFocus={() => setFocused(`t${i}bg`)} onBlur={() => setFocused(null)} onChange={e => setTestimonials(p => p.map((x, j) => j === i ? { ...x, bg: e.target.value } : x))} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="testimonials" saving={saving} saved={saved} onClick={() => saveSection('testimonials', testimonials.flatMap((t, i) => [[`testimonial_${i + 1}_quote`, t.quote], [`testimonial_${i + 1}_name`, t.name], [`testimonial_${i + 1}_role`, t.role], [`testimonial_${i + 1}_initials`, t.initials], [`testimonial_${i + 1}_bg`, t.bg]] as [string, string][]))} />
      </Section>

      {/* ── How We Work Steps ── */}
      <Section title="How We Work Steps" desc="3 steps shown in the 'Our Approach' section.">
        <div className="flex flex-col gap-4">
          {howSteps.map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Step 0{i + 1}</p>
              <div className="flex flex-col gap-3">
                <div><Label>Title</Label><input style={inp(`hw${i}t`)} value={s.title} onFocus={() => setFocused(`hw${i}t`)} onBlur={() => setFocused(null)} onChange={e => setHowSteps(p => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></div>
                <div><Label>Description</Label><textarea value={s.desc} style={ta(`hw${i}d`)} rows={2} onFocus={() => setFocused(`hw${i}d`)} onBlur={() => setFocused(null)} onChange={e => setHowSteps(p => p.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="howSteps" saving={saving} saved={saved} onClick={() => saveSection('howSteps', howSteps.flatMap((s, i) => [[`how_step_${i + 1}_title`, s.title], [`how_step_${i + 1}_desc`, s.desc]] as [string, string][]))} />
      </Section>

      {/* ── Homepage Process ── */}
      <Section title="Homepage Process Steps" desc="6-step process grid on the homepage dark section.">
        <div className="flex flex-col gap-4">
          {processSteps.map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Step 0{i + 1}</p>
              <div className="flex flex-col gap-3">
                <div><Label>Title</Label><input style={inp(`ps${i}t`)} value={s.title} onFocus={() => setFocused(`ps${i}t`)} onBlur={() => setFocused(null)} onChange={e => setProcessSteps(p => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></div>
                <div><Label>Description</Label><textarea value={s.desc} style={ta(`ps${i}d`)} rows={2} onFocus={() => setFocused(`ps${i}d`)} onBlur={() => setFocused(null)} onChange={e => setProcessSteps(p => p.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="processSteps" saving={saving} saved={saved} onClick={() => saveSection('processSteps', processSteps.flatMap((s, i) => [[`process_step_${i + 1}_title`, s.title], [`process_step_${i + 1}_desc`, s.desc]] as [string, string][]))} />
      </Section>

      {/* ── Services Page Process ── */}
      <Section title="Services Page — Process Steps" desc="6 steps shown on the Services page.">
        <div className="flex flex-col gap-4">
          {svcProcessSteps.map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Step 0{i + 1}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><Label>Icon (emoji)</Label><input style={inp(`sp${i}ic`)} value={s.icon} onFocus={() => setFocused(`sp${i}ic`)} onBlur={() => setFocused(null)} onChange={e => setSvcProcessSteps(p => p.map((x, j) => j === i ? { ...x, icon: e.target.value } : x))} /></div>
                <div><Label>Duration</Label><input style={inp(`sp${i}du`)} value={s.duration} placeholder="30 min" onFocus={() => setFocused(`sp${i}du`)} onBlur={() => setFocused(null)} onChange={e => setSvcProcessSteps(p => p.map((x, j) => j === i ? { ...x, duration: e.target.value } : x))} /></div>
              </div>
              <div className="flex flex-col gap-3">
                <div><Label>Title</Label><input style={inp(`sp${i}t`)} value={s.title} onFocus={() => setFocused(`sp${i}t`)} onBlur={() => setFocused(null)} onChange={e => setSvcProcessSteps(p => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></div>
                <div><Label>Description</Label><textarea value={s.desc} style={ta(`sp${i}d`)} rows={2} onFocus={() => setFocused(`sp${i}d`)} onBlur={() => setFocused(null)} onChange={e => setSvcProcessSteps(p => p.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="svcProcess" saving={saving} saved={saved} onClick={() => saveSection('svcProcess', svcProcessSteps.flatMap((s, i) => [[`svc_process_${i + 1}_title`, s.title], [`svc_process_${i + 1}_desc`, s.desc], [`svc_process_${i + 1}_duration`, s.duration], [`svc_process_${i + 1}_icon`, s.icon]] as [string, string][]))} />
      </Section>

      {/* ── Pricing Plans ── */}
      <Section title="Pricing Plans" desc="3 pricing cards on the Services page. Features separated by | pipe character.">
        <div className="flex flex-col gap-5">
          {pricing.map((p, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Plan {i + 1} — {p.name}</p>
                <button onClick={() => setPricing(prev => prev.map((x, j) => j === i ? { ...x, popular: !x.popular } : { ...x, popular: false }))}
                  className="text-xs font-medium px-3 py-1 rounded-full transition-all"
                  style={{ background: p.popular ? '#EEF2FF' : '#F3F4F6', color: p.popular ? '#3B5BDB' : '#9CA3AF', border: p.popular ? '1px solid #C7D2FE' : '1px solid #E5E7EB' }}>
                  {p.popular ? '⭐ Popular' : 'Mark Popular'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><Label>Plan Name</Label><input style={inp(`pr${i}n`)} value={p.name} onFocus={() => setFocused(`pr${i}n`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} /></div>
                <div><Label>Accent Color</Label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={p.accent} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, accent: e.target.value } : x))} className="w-10 h-10 rounded-lg cursor-pointer p-0.5" style={{ border: '1px solid #E5E7EB' }} />
                    <input style={{ ...inp(`pr${i}ac`), flex: 1 }} value={p.accent} onFocus={() => setFocused(`pr${i}ac`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, accent: e.target.value } : x))} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><Label>Price</Label><input style={inp(`pr${i}p`)} value={p.price} placeholder="$2,500" onFocus={() => setFocused(`pr${i}p`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, price: e.target.value } : x))} /></div>
                <div><Label>Period</Label><input style={inp(`pr${i}pe`)} value={p.period} placeholder="per project" onFocus={() => setFocused(`pr${i}pe`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, period: e.target.value } : x))} /></div>
              </div>
              <div className="mb-3"><Label>Description</Label><textarea value={p.desc} style={ta(`pr${i}d`)} rows={2} onFocus={() => setFocused(`pr${i}d`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              <div><Label>Features (one per line, separated by |)</Label><textarea value={p.features} style={ta(`pr${i}f`)} rows={5} placeholder="Feature one|Feature two|Feature three" onFocus={() => setFocused(`pr${i}f`)} onBlur={() => setFocused(null)} onChange={e => setPricing(prev => prev.map((x, j) => j === i ? { ...x, features: e.target.value } : x))} /></div>
            </div>
          ))}
        </div>
        <SaveBtn id="pricing" saving={saving} saved={saved} onClick={() => saveSection('pricing', pricing.flatMap((p, i) => [[`pricing_${i + 1}_name`, p.name], [`pricing_${i + 1}_price`, p.price], [`pricing_${i + 1}_period`, p.period], [`pricing_${i + 1}_desc`, p.desc], [`pricing_${i + 1}_features`, p.features], [`pricing_${i + 1}_popular`, String(p.popular)], [`pricing_${i + 1}_accent`, p.accent]] as [string, string][]))} />
      </Section>

      {/* ── Services FAQ ── */}
      <Section title="Services Page FAQ" desc="8 Q&A pairs on the Services page.">
        <div className="flex flex-col gap-4">
          {servicesFaqs.map((f, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">FAQ {i + 1}</p>
              <div className="flex flex-col gap-3">
                <div><Label>Question</Label><input style={inp(`sf${i}q`)} value={f.q} onFocus={() => setFocused(`sf${i}q`)} onBlur={() => setFocused(null)} onChange={e => setServicesFaqs(p => p.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} /></div>
                <div><Label>Answer</Label><textarea value={f.a} style={ta(`sf${i}a`)} rows={2} onFocus={() => setFocused(`sf${i}a`)} onBlur={() => setFocused(null)} onChange={e => setServicesFaqs(p => p.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="servicesFaqs" saving={saving} saved={saved} onClick={() => saveSection('servicesFaqs', servicesFaqs.flatMap((f, i) => [[`services_faq_${i + 1}_q`, f.q], [`services_faq_${i + 1}_a`, f.a]] as [string, string][]))} />
      </Section>

      {/* ── Contact FAQ ── */}
      <Section title="Contact Page FAQ" desc="5 Q&A pairs on the Contact page.">
        <div className="flex flex-col gap-4">
          {contactFaqs.map((f, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">FAQ {i + 1}</p>
              <div className="flex flex-col gap-3">
                <div><Label>Question</Label><input style={inp(`cf${i}q`)} value={f.q} onFocus={() => setFocused(`cf${i}q`)} onBlur={() => setFocused(null)} onChange={e => setContactFaqs(p => p.map((x, j) => j === i ? { ...x, q: e.target.value } : x))} /></div>
                <div><Label>Answer</Label><textarea value={f.a} style={ta(`cf${i}a`)} rows={2} onFocus={() => setFocused(`cf${i}a`)} onBlur={() => setFocused(null)} onChange={e => setContactFaqs(p => p.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="contactFaqs" saving={saving} saved={saved} onClick={() => saveSection('contactFaqs', contactFaqs.flatMap((f, i) => [[`contact_faq_${i + 1}_q`, f.q], [`contact_faq_${i + 1}_a`, f.a]] as [string, string][]))} />
      </Section>

      {/* ── About Values ── */}
      <Section title="About — Company Values" desc="6 value cards on the About page.">
        <div className="flex flex-col gap-4">
          {values.map((v, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Value {i + 1}</p>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Title</Label><input style={inp(`v${i}t`)} value={v.title} onFocus={() => setFocused(`v${i}t`)} onBlur={() => setFocused(null)} onChange={e => setValues(p => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></div>
                  <div><Label>Accent Color</Label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={v.accent} onChange={e => setValues(p => p.map((x, j) => j === i ? { ...x, accent: e.target.value } : x))} className="w-10 h-10 rounded-lg cursor-pointer p-0.5" style={{ border: '1px solid #E5E7EB' }} />
                      <input style={{ ...inp(`v${i}ac`), flex: 1 }} value={v.accent} onFocus={() => setFocused(`v${i}ac`)} onBlur={() => setFocused(null)} onChange={e => setValues(p => p.map((x, j) => j === i ? { ...x, accent: e.target.value } : x))} />
                    </div>
                  </div>
                </div>
                <div><Label>Description</Label><textarea value={v.desc} style={ta(`v${i}d`)} rows={2} onFocus={() => setFocused(`v${i}d`)} onBlur={() => setFocused(null)} onChange={e => setValues(p => p.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="values" saving={saving} saved={saved} onClick={() => saveSection('values', values.flatMap((v, i) => [[`value_${i + 1}_title`, v.title], [`value_${i + 1}_desc`, v.desc], [`value_${i + 1}_accent`, v.accent]] as [string, string][]))} />
      </Section>

      {/* ── About Timeline ── */}
      <Section title="About — Timeline / Journey" desc="6 milestone entries on the About page.">
        <div className="flex flex-col gap-4">
          {timeline.map((m, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">Milestone {i + 1}</p>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><Label>Year</Label><input style={inp(`tm${i}y`)} value={m.year} placeholder="2024" onFocus={() => setFocused(`tm${i}y`)} onBlur={() => setFocused(null)} onChange={e => setTimeline(p => p.map((x, j) => j === i ? { ...x, year: e.target.value } : x))} /></div>
                <div><Label>Tag</Label><input style={inp(`tm${i}tg`)} value={m.tag} placeholder="Milestone" onFocus={() => setFocused(`tm${i}tg`)} onBlur={() => setFocused(null)} onChange={e => setTimeline(p => p.map((x, j) => j === i ? { ...x, tag: e.target.value } : x))} /></div>
              </div>
              <div className="flex flex-col gap-3">
                <div><Label>Title</Label><input style={inp(`tm${i}t`)} value={m.title} onFocus={() => setFocused(`tm${i}t`)} onBlur={() => setFocused(null)} onChange={e => setTimeline(p => p.map((x, j) => j === i ? { ...x, title: e.target.value } : x))} /></div>
                <div><Label>Description</Label><textarea value={m.desc} style={ta(`tm${i}d`)} rows={2} onFocus={() => setFocused(`tm${i}d`)} onBlur={() => setFocused(null)} onChange={e => setTimeline(p => p.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="timeline" saving={saving} saved={saved} onClick={() => saveSection('timeline', timeline.flatMap((m, i) => [[`timeline_${i + 1}_year`, m.year], [`timeline_${i + 1}_title`, m.title], [`timeline_${i + 1}_desc`, m.desc], [`timeline_${i + 1}_tag`, m.tag]] as [string, string][]))} />
      </Section>

      {/* ── Tech Stack ── */}
      <Section title="About — Tech Stack" desc="4 categories shown on the About page stack section.">
        <div className="flex flex-col gap-4">
          {stack.map((cat, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
              <div className="flex flex-col gap-3">
                <div><Label>Category Label</Label><input style={inp(`stk${i}l`)} value={cat.label} onFocus={() => setFocused(`stk${i}l`)} onBlur={() => setFocused(null)} onChange={e => setStack(p => p.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} /></div>
                <div><Label>Tools (comma separated)</Label><textarea value={cat.items} style={ta(`stk${i}i`)} rows={2} placeholder="Next.js, React, TypeScript, ..." onFocus={() => setFocused(`stk${i}i`)} onBlur={() => setFocused(null)} onChange={e => setStack(p => p.map((x, j) => j === i ? { ...x, items: e.target.value } : x))} /></div>
              </div>
            </div>
          ))}
        </div>
        <SaveBtn id="stack" saving={saving} saved={saved} onClick={() => saveSection('stack', stack.flatMap((c, i) => [[`stack_${i + 1}_label`, c.label], [`stack_${i + 1}_items`, c.items]] as [string, string][]))} />
      </Section>

      {/* ── Contact Info ── */}
      <Section title="Contact Information">
        <div className="flex flex-col gap-4">
          {([['email', 'Email Address'], ['whatsapp', 'WhatsApp'], ['location', 'Location']] as const).map(([key, label]) => (
            <div key={key}><Label>{label}</Label><input style={inp(key)} value={contact[key]} onFocus={() => setFocused(key)} onBlur={() => setFocused(null)} onChange={e => setContact(c => ({ ...c, [key]: e.target.value }))} /></div>
          ))}
        </div>
        <SaveBtn id="contact" saving={saving} saved={saved} onClick={() => saveSection('contact', [['contact_email', contact.email], ['contact_whatsapp', contact.whatsapp], ['contact_location', contact.location]])} />
      </Section>

      {/* ── Social Links ── */}
      <Section title="Social Media Links">
        <div className="flex flex-col gap-4">
          {([['github', 'GitHub URL'], ['linkedin', 'LinkedIn URL'], ['twitter', 'Twitter / X URL']] as const).map(([key, label]) => (
            <div key={key}><Label>{label}</Label><input style={inp(key)} placeholder={`https://${key}.com/...`} value={socials[key]} onFocus={() => setFocused(key)} onBlur={() => setFocused(null)} onChange={e => setSocials(s => ({ ...s, [key]: e.target.value }))} /></div>
          ))}
        </div>
        <SaveBtn id="socials" saving={saving} saved={saved} onClick={() => saveSection('socials', [['social_github', socials.github], ['social_linkedin', socials.linkedin], ['social_twitter', socials.twitter]])} />
      </Section>

      {/* ── Footer ── */}
      <Section title="Footer Content">
        <div className="flex flex-col gap-4">
          <div><Label>Brand Tagline</Label><textarea value={footer.tagline} style={ta('ftTag')} rows={2} onFocus={() => setFocused('ftTag')} onBlur={() => setFocused(null)} onChange={e => setFooter(f => ({ ...f, tagline: e.target.value }))} /></div>
          <div><Label>Copyright Text</Label><input style={inp('ftCopy')} value={footer.copyright} placeholder="© 2025 sakhidev. All rights reserved." onFocus={() => setFocused('ftCopy')} onBlur={() => setFocused(null)} onChange={e => setFooter(f => ({ ...f, copyright: e.target.value }))} /></div>
          <div><Label>Credit Text</Label><input style={inp('ftCred')} value={footer.credit} placeholder="Crafted with ✦ precision" onFocus={() => setFocused('ftCred')} onBlur={() => setFocused(null)} onChange={e => setFooter(f => ({ ...f, credit: e.target.value }))} /></div>
        </div>
        <SaveBtn id="footer" saving={saving} saved={saved} onClick={() => saveSection('footer', [['footer_tagline', footer.tagline], ['footer_copyright', footer.copyright], ['footer_credit', footer.credit]])} />
      </Section>

      {/* ── SEO ── */}
      <Section title="SEO Settings">
        <div className="flex flex-col gap-4">
          <div><Label>Site Title</Label><input style={inp('seoTitle')} value={seo.title} onFocus={() => setFocused('seoTitle')} onBlur={() => setFocused(null)} onChange={e => setSeo(s => ({ ...s, title: e.target.value }))} /><p className="text-xs text-gray-400 mt-1">{seo.title.length}/60 characters</p></div>
          <div><Label>Meta Description</Label><textarea style={ta('seoDesc')} rows={3} value={seo.description} onFocus={() => setFocused('seoDesc')} onBlur={() => setFocused(null)} onChange={e => setSeo(s => ({ ...s, description: e.target.value }))} /><p className="text-xs text-gray-400 mt-1">{seo.description.length}/160 characters</p></div>
          <div><Label>Keywords</Label><input style={inp('seoKw')} value={seo.keywords} onFocus={() => setFocused('seoKw')} onBlur={() => setFocused(null)} onChange={e => setSeo(s => ({ ...s, keywords: e.target.value }))} /></div>
        </div>
        <SaveBtn id="seo" saving={saving} saved={saved} onClick={() => saveSection('seo', [['seo_title', seo.title], ['seo_description', seo.description], ['seo_keywords', seo.keywords]])} />
      </Section>

      {/* ── Password ── */}
      <Section title="Change Password" desc="Update your Supabase Auth password.">
        <div className="flex flex-col gap-4">
          <div><Label>New Password</Label><input type="password" style={inp('new_')} placeholder="Min. 6 characters" value={password.new_} onFocus={() => setFocused('new_')} onBlur={() => setFocused(null)} onChange={e => setPassword(p => ({ ...p, new_: e.target.value }))} /></div>
          <div><Label>Confirm Password</Label><input type="password" style={inp('confirm')} placeholder="••••••••" value={password.confirm} onFocus={() => setFocused('confirm')} onBlur={() => setFocused(null)} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} /></div>
          {pwError && (<div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg><p className="text-xs font-medium text-red-600">{pwError}</p></div>)}
          {pwSaved && (<div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}><span className="text-green-500">✓</span><p className="text-xs font-medium text-green-700">Password updated successfully!</p></div>)}
        </div>
        <button onClick={savePassword} disabled={pwSaving}
          className="mt-5 text-sm font-semibold text-white rounded-full px-6 py-2.5 transition-all hover:scale-105 disabled:opacity-70"
          style={{ background: pwSaved ? '#059669' : '#DC2626' }}>
          {pwSaving ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Updating...</span> : pwSaved ? '✓ Updated!' : 'Update Password'}
        </button>
      </Section>

      {/* ── Danger Zone ── */}
      <div className="rounded-2xl p-6" style={{ background: '#FFF5F5', border: '1px solid #FED7D7' }}>
        <h2 className="text-sm font-semibold text-red-800 mb-1">Danger Zone</h2>
        <p className="text-xs text-red-400 font-light mb-4">Irreversible actions. Proceed with caution.</p>
        <button onClick={clearAllMessages} className="text-xs font-semibold text-red-600 rounded-full px-5 py-2.5 border border-red-200 hover:bg-red-50 transition-all">Clear All Messages</button>
      </div>
    </div>
  )
}