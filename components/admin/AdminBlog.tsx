'use client'
import { useEffect, useState } from 'react'
import { supabase, type BlogPost } from '@/lib/supabase'

const categories = ['Next.js', 'GSAP', 'Design', 'SaaS', 'Backend', 'TypeScript', 'Business']

const emptyForm: Omit<BlogPost, 'id' | 'created_at' | 'published_at'> = {
  title: '', excerpt: '', category: 'Next.js', read_time: '',
  gradient: 'linear-gradient(135deg,#3B5BDB,#6366F1)', status: 'draft', featured: false,
}

export default function AdminBlog() {
  const [posts, setPosts]       = useState<BlogPost[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing]   = useState<BlogPost | null>(null)
  const [form, setForm]         = useState<Omit<BlogPost, 'id' | 'created_at' | 'published_at'>>(emptyForm)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [filter, setFilter]     = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setPosts(data)
    setLoading(false)
  }

  const filtered = posts.filter(p => filter === 'all' || p.status === filter)

  const openAdd  = () => { setForm(emptyForm); setModal('add'); setSaved(false) }
  const openEdit = (p: BlogPost) => {
    setEditing(p)
    setForm({ title: p.title, excerpt: p.excerpt, category: p.category, read_time: p.read_time, gradient: p.gradient, status: p.status, featured: p.featured })
    setModal('edit'); setSaved(false)
  }
  const closeModal = () => { setModal(null); setEditing(null) }

  const save = async () => {
    if (!form.title.trim()) return
    setSaving(true)
    const payload = {
      ...form,
      published_at: form.status === 'published' ? new Date().toISOString() : null,
    }
    if (modal === 'add') {
      const { error } = await supabase.from('blog_posts').insert([payload])
      if (!error) { setSaved(true); await fetchPosts(); setTimeout(closeModal, 800) }
    } else if (editing) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', editing.id)
      if (!error) { setSaved(true); await fetchPosts(); setTimeout(closeModal, 800) }
    }
    setSaving(false)
  }

  const toggleStatus = async (p: BlogPost) => {
    const newStatus = p.status === 'published' ? 'draft' : 'published'
    await supabase.from('blog_posts').update({ status: newStatus, published_at: newStatus === 'published' ? new Date().toISOString() : null }).eq('id', p.id)
    setPosts(prev => prev.map(x => x.id === p.id ? { ...x, status: newStatus } : x))
  }

  const toggleFeatured = async (p: BlogPost) => {
    await supabase.from('blog_posts').update({ featured: !p.featured }).eq('id', p.id)
    setPosts(prev => prev.map(x => x.id === p.id ? { ...x, featured: !x.featured } : x))
  }

  const deletePost = async (id: number) => {
    await supabase.from('blog_posts').delete().eq('id', id)
    setPosts(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  const inputStyle = { background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', fontFamily: 'DM Sans, sans-serif' }
  const inputCls   = "w-full rounded-xl px-4 py-3 text-sm font-light outline-none transition-all"

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Blog</h1>
          <p className="text-sm text-gray-400 font-light mt-1">
            {posts.filter(p => p.status === 'published').length} published &nbsp;·&nbsp; {posts.filter(p => p.status === 'draft').length} drafts
          </p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 text-sm font-medium text-white rounded-full px-5 py-2.5 transition-all hover:scale-105" style={{ background: '#0D1B3E', boxShadow: '0 4px 14px rgba(13,27,62,0.2)' }}>
          + New Post
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'published', 'draft'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className="text-sm font-medium rounded-full px-5 py-2 capitalize transition-all"
            style={{ background: filter === f ? '#0D1B3E' : '#F3F4F6', color: filter === f ? '#fff' : '#6B7280' }}>
            {f} ({f === 'all' ? posts.length : posts.filter(p => p.status === f).length})
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden w-full" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                {['Post', 'Category', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-400 tracking-wide uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors" style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl flex-shrink-0" style={{ background: p.gradient }} />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate" style={{ maxWidth: '220px' }}>{p.title}</p>
                        <p className="text-xs text-gray-400 font-light mt-0.5">{p.read_time} read {p.featured && <span className="text-amber-500 ml-1">· ★ Featured</span>}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: '#EEF2FF', color: '#3B5BDB' }}>{p.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => toggleStatus(p)} className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                      style={{ background: p.status === 'published' ? '#F0FDF4' : '#FFFBEB', color: p.status === 'published' ? '#059669' : '#B45309' }}>
                      {p.status === 'published' ? '● Published' : '○ Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 font-light whitespace-nowrap">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="text-xs font-semibold px-3 py-2 rounded-lg transition-all hover:bg-indigo-50" style={{ color: '#3B5BDB', background: '#F8F9FF', border: '1px solid #E5E7EB' }}>Edit</button>
                      <button onClick={() => toggleFeatured(p)} className="text-sm px-2.5 py-2 rounded-lg transition-all" style={{ background: p.featured ? '#FFFBEB' : '#F3F4F6', color: p.featured ? '#B45309' : '#9CA3AF', border: '1px solid #E5E7EB' }}>{p.featured ? '★' : '☆'}</button>
                      <button onClick={() => setDeleteId(p.id)} className="text-sm px-2.5 py-2 rounded-lg hover:bg-red-50 transition-all" style={{ color: '#EF4444', border: '1px solid #E5E7EB' }}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg rounded-2xl" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#F3F4F6' }}>
              <h2 className="text-base font-semibold text-gray-900">{modal === 'add' ? 'New Post' : 'Edit Post'}</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Title *</label>
                <input className={inputCls} style={inputStyle} placeholder="Post title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Excerpt</label>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={3} placeholder="Short summary..." value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Category</label>
                  <select className={inputCls} style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Read Time</label>
                  <input className={inputCls} style={inputStyle} placeholder="e.g. 8 min" value={form.read_time} onChange={e => setForm(f => ({ ...f, read_time: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Card Gradient</label>
                <input className={inputCls} style={inputStyle} value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))} />
                <div className="mt-2 h-10 rounded-xl" style={{ background: form.gradient }} />
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={() => setForm(f => ({ ...f, status: f.status === 'published' ? 'draft' : 'published' }))}
                  className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 transition-all"
                  style={{ background: form.status === 'published' ? '#F0FDF4' : '#FFFBEB', color: form.status === 'published' ? '#059669' : '#B45309', border: `1px solid ${form.status === 'published' ? '#BBF7D0' : '#FDE68A'}` }}>
                  {form.status === 'published' ? '● Published' : '○ Draft'}
                </button>
                <button onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                  className="flex items-center gap-2 text-sm font-medium rounded-xl px-4 py-2.5 transition-all"
                  style={{ background: form.featured ? '#FFFBEB' : '#F3F4F6', color: form.featured ? '#B45309' : '#6B7280', border: `1px solid ${form.featured ? '#FDE68A' : '#E5E7EB'}` }}>
                  {form.featured ? '★ Featured' : '☆ Feature this'}
                </button>
              </div>
              <button onClick={save} disabled={saving} className="w-full text-sm font-semibold text-white rounded-full py-4 transition-all hover:scale-[1.02] disabled:opacity-70"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#0D1B3E,#3B5BDB)', boxShadow: '0 4px 16px rgba(59,91,219,0.25)' }}>
                {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span> : saved ? '✓ Saved!' : modal === 'add' ? 'Publish Post' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-2xl p-8 text-center max-w-sm w-full" style={{ background: '#fff' }}>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Delete Post?</h3>
            <p className="text-sm text-gray-400 font-light mb-7">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm font-medium rounded-full py-3 border border-gray-200 text-gray-600">Cancel</button>
              <button onClick={() => deletePost(deleteId)} className="flex-1 text-sm font-semibold rounded-full py-3 text-white" style={{ background: '#DC2626' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
