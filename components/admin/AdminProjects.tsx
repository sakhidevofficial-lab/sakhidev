'use client'
import { useEffect, useState } from 'react'
import { supabase, type Project } from '@/lib/supabase'

const emptyForm: Omit<Project, 'id' | 'created_at'> = {
  title: '', label: '', category: 'SaaS', description: '', result: '',
  tags: [], year: '2025', gradient: 'linear-gradient(135deg,#3B5BDB,#6366F1)',
  featured: false, visible: true, sort_order: 0,
}

const categories = ['SaaS', 'E-Commerce', 'Web Design', 'Mobile Web']

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing]   = useState<Project | null>(null)
  const [form, setForm]         = useState<Omit<Project, 'id' | 'created_at'>>(emptyForm)
  const [tagInput, setTagInput] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  // ── Fetch ──
  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
    if (!error && data) setProjects(data)
    setLoading(false)
  }

  // ── Open modals ──
  const openAdd  = () => { setForm({ ...emptyForm, sort_order: projects.length + 1 }); setTagInput(''); setModal('add'); setSaved(false) }
  const openEdit = (p: Project) => { setEditing(p); setForm({ title: p.title, label: p.label, category: p.category, description: p.description, result: p.result, tags: p.tags ?? [], year: p.year, gradient: p.gradient, featured: p.featured, visible: p.visible, sort_order: p.sort_order }); setTagInput(''); setModal('edit'); setSaved(false) }
  const closeModal = () => { setModal(null); setEditing(null) }

  // ── Save ──
  const saveProject = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    if (modal === 'add') {
      const { error } = await supabase.from('projects').insert([form])
      if (!error) { setSaved(true); await fetchProjects(); setTimeout(closeModal, 800) }
    } else if (editing) {
      const { error } = await supabase.from('projects').update(form).eq('id', editing.id)
      if (!error) { setSaved(true); await fetchProjects(); setTimeout(closeModal, 800) }
    }
    setSaving(false)
  }

  // ── Toggle ──
  const toggleVisible = async (p: Project) => {
    await supabase.from('projects').update({ visible: !p.visible }).eq('id', p.id)
    setProjects(prev => prev.map(x => x.id === p.id ? { ...x, visible: !x.visible } : x))
  }

  const toggleFeatured = async (p: Project) => {
    await supabase.from('projects').update({ featured: !p.featured }).eq('id', p.id)
    setProjects(prev => prev.map(x => x.id === p.id ? { ...x, featured: !x.featured } : x))
  }

  // ── Delete ──
  const deleteProject = async (id: number) => {
    await supabase.from('projects').delete().eq('id', id)
    setProjects(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  // ── Tags ──
  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }))
    setTagInput('')
  }
  const removeTag = (t: string) => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))

  const inputCls   = "w-full rounded-xl px-4 py-2.5 text-sm font-light outline-none transition-all"
  const inputStyle = { background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', fontFamily: 'DM Sans, sans-serif' }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Projects</h1>
          <p className="text-sm text-gray-400 font-light mt-1">{projects.length} total · {projects.filter(p => p.visible).length} visible · {projects.filter(p => p.featured).length} featured</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 text-sm font-medium text-white rounded-full px-5 py-2.5 transition-all hover:scale-105" style={{ background: '#0D1B3E', boxShadow: '0 4px 14px rgba(13,27,62,0.2)' }}>
          + Add Project
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map(p => (
          <div key={p.id} className="rounded-2xl overflow-hidden border bg-white transition-all hover:shadow-md" style={{ borderColor: '#E5E7EB', opacity: p.visible ? 1 : 0.55 }}>
            <div className="h-28 flex items-end justify-between p-4" style={{ background: p.gradient }}>
              <span className="text-xs text-white/70 font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.2)' }}>{p.category}</span>
              <div className="flex gap-1.5">
                {p.featured && <span className="text-xs text-amber-300 font-medium px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.25)' }}>★ Featured</span>}
                {!p.visible && <span className="text-xs text-white/50 px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.25)' }}>Hidden</span>}
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
                <span className="text-xs text-gray-400 flex-shrink-0">{p.year}</span>
              </div>
              <p className="text-xs font-light text-gray-400 leading-relaxed mb-3 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(p.tags ?? []).slice(0, 3).map(t => (
                  <span key={t} className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#EEF2FF', color: '#3B5BDB' }}>{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
                <button onClick={() => openEdit(p)} className="flex-1 text-xs font-medium py-2 rounded-lg transition-all hover:bg-indigo-50" style={{ color: '#3B5BDB', background: '#F8F9FF', border: '1px solid #E5E7EB' }}>Edit</button>
                <button onClick={() => toggleFeatured(p)} className="text-xs font-medium py-2 px-3 rounded-lg" style={{ background: p.featured ? '#FFFBEB' : '#F3F4F6', color: p.featured ? '#B45309' : '#6B7280', border: '1px solid #E5E7EB' }}>{p.featured ? '★' : '☆'}</button>
                <button onClick={() => toggleVisible(p)} className="text-xs font-medium py-2 px-3 rounded-lg" style={{ background: p.visible ? '#F0FDF4' : '#F3F4F6', color: p.visible ? '#059669' : '#9CA3AF', border: '1px solid #E5E7EB' }}>{p.visible ? '👁' : '🚫'}</button>
                <button onClick={() => setDeleteId(p.id)} className="text-xs py-2 px-3 rounded-lg hover:bg-red-50" style={{ color: '#EF4444', border: '1px solid #E5E7EB' }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg rounded-2xl" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#F3F4F6' }}>
              <h2 className="text-base font-semibold text-gray-900">{modal === 'add' ? 'Add New Project' : 'Edit Project'}</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Project Title *</label>
                <input className={inputCls} style={inputStyle} placeholder="e.g. Flowboard" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Category</label>
                  <select className={inputCls} style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Year</label>
                  <input className={inputCls} style={inputStyle} placeholder="2025" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Card Label</label>
                <input className={inputCls} style={inputStyle} placeholder="e.g. Project Management SaaS" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Description</label>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Key Result</label>
                <input className={inputCls} style={inputStyle} placeholder="e.g. 3x faster onboarding" value={form.result} onChange={e => setForm(f => ({ ...f, result: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Tech Tags</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {form.tags.map(t => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ background: '#EEF2FF', color: '#3B5BDB' }}>
                      {t} <button onClick={() => removeTag(t)} className="text-blue-300 hover:text-blue-600">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className={inputCls} style={inputStyle} placeholder="Add tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                  <button onClick={addTag} className="text-xs font-medium px-4 rounded-xl whitespace-nowrap" style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}>+ Add</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Card Gradient</label>
                <input className={inputCls} style={inputStyle} value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))} />
                <div className="mt-2 h-10 rounded-xl" style={{ background: form.gradient }} />
              </div>
              <div className="flex gap-3 flex-wrap">
                {([['featured', 'Featured'], ['visible', 'Visible on site']] as const).map(([key, label]) => (
                  <button key={key} onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                    className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 transition-all"
                    style={{ background: form[key as keyof typeof form] ? '#F0FDF4' : '#F3F4F6', color: form[key as keyof typeof form] ? '#059669' : '#6B7280', border: `1px solid ${form[key as keyof typeof form] ? '#BBF7D0' : '#E5E7EB'}` }}>
                    {form[key as keyof typeof form] ? '✓' : '○'} {label}
                  </button>
                ))}
              </div>
              <button onClick={saveProject} disabled={saving}
                className="w-full text-sm font-semibold text-white rounded-full py-4 transition-all hover:scale-[1.02] disabled:opacity-70 mt-1"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#0D1B3E,#3B5BDB)', boxShadow: '0 4px 16px rgba(59,91,219,0.25)' }}>
                {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</span> : saved ? '✓ Saved!' : modal === 'add' ? 'Add Project' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-2xl p-8 text-center max-w-sm w-full" style={{ background: '#fff' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: '#FEF2F2' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Project?</h3>
            <p className="text-sm text-gray-400 font-light mb-7">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm font-medium rounded-full py-3 border border-gray-200 text-gray-600">Cancel</button>
              <button onClick={() => deleteProject(deleteId)} className="flex-1 text-sm font-semibold rounded-full py-3 text-white" style={{ background: '#DC2626' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
