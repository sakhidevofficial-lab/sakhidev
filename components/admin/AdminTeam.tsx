'use client'
import { useEffect, useState } from 'react'
import { supabase, type TeamMember } from '@/lib/supabase'

const emptyForm: Omit<TeamMember, 'id' | 'created_at'> = {
  name: '', role: '', bio: '', initials: '', gradient: 'linear-gradient(135deg,#3B5BDB,#6366F1)',
  github: '', linkedin: '', twitter: '', visible: true, sort_order: 0,
}

export default function AdminTeam() {
  const [members, setMembers]   = useState<TeamMember[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [editing, setEditing]   = useState<TeamMember | null>(null)
  const [form, setForm]         = useState<Omit<TeamMember, 'id' | 'created_at'>>(emptyForm)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  useEffect(() => { fetchTeam() }, [])

  const fetchTeam = async () => {
    setLoading(true)
    const { data } = await supabase.from('team').select('*').order('sort_order')
    if (data) setMembers(data)
    setLoading(false)
  }

  const openAdd  = () => { setForm({ ...emptyForm, sort_order: members.length + 1 }); setModal('add'); setSaved(false) }
  const openEdit = (m: TeamMember) => { setEditing(m); setForm({ name: m.name, role: m.role, bio: m.bio, initials: m.initials, gradient: m.gradient, github: m.github, linkedin: m.linkedin, twitter: m.twitter, visible: m.visible, sort_order: m.sort_order }); setModal('edit'); setSaved(false) }
  const closeModal = () => { setModal(null); setEditing(null) }

  const save = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    if (modal === 'add') {
      const { error } = await supabase.from('team').insert([form])
      if (!error) { setSaved(true); await fetchTeam(); setTimeout(closeModal, 800) }
    } else if (editing) {
      const { error } = await supabase.from('team').update(form).eq('id', editing.id)
      if (!error) { setSaved(true); await fetchTeam(); setTimeout(closeModal, 800) }
    }
    setSaving(false)
  }

  const toggleVisible = async (m: TeamMember) => {
    await supabase.from('team').update({ visible: !m.visible }).eq('id', m.id)
    setMembers(prev => prev.map(x => x.id === m.id ? { ...x, visible: !x.visible } : x))
  }

  const deleteMember = async (id: number) => {
    await supabase.from('team').delete().eq('id', id)
    setMembers(prev => prev.filter(m => m.id !== id))
    setDeleteId(null)
  }

  const inputStyle = { background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', fontFamily: 'DM Sans, sans-serif' }
  const inputCls   = "w-full rounded-xl px-4 py-3 text-sm font-light outline-none transition-all"

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Team</h1>
          <p className="text-sm text-gray-400 font-light mt-1">{members.length} members · {members.filter(m => m.visible).length} visible</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 text-sm font-medium text-white rounded-full px-5 py-2.5 transition-all hover:scale-105" style={{ background: '#0D1B3E', boxShadow: '0 4px 14px rgba(13,27,62,0.2)' }}>
          + Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map(m => (
          <div key={m.id} className="rounded-2xl overflow-hidden border bg-white transition-all hover:shadow-md" style={{ borderColor: '#E5E7EB', opacity: m.visible ? 1 : 0.55 }}>
            <div className="h-32 flex items-center justify-center font-serif text-4xl font-light text-white relative" style={{ background: m.gradient }}>
              {m.initials}
              {!m.visible && <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center"><span className="text-white text-xs font-medium">Hidden</span></div>}
            </div>
            <div className="p-5">
              <p className="font-semibold text-gray-900 mb-0.5">{m.name}</p>
              <p className="text-sm font-medium mb-3" style={{ color: '#3B5BDB' }}>{m.role}</p>
              <p className="text-xs font-light text-gray-400 leading-relaxed mb-4 line-clamp-2">{m.bio}</p>
              <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: '#F3F4F6' }}>
                <button onClick={() => openEdit(m)} className="flex-1 text-xs font-semibold py-2 rounded-lg hover:bg-indigo-50 transition-all" style={{ color: '#3B5BDB', background: '#F8F9FF', border: '1px solid #E5E7EB' }}>Edit</button>
                <button onClick={() => toggleVisible(m)} className="text-xs font-medium py-2 px-3 rounded-lg" style={{ background: m.visible ? '#F0FDF4' : '#F3F4F6', color: m.visible ? '#059669' : '#9CA3AF', border: '1px solid #E5E7EB' }}>{m.visible ? '👁' : '🚫'}</button>
                <button onClick={() => setDeleteId(m.id)} className="text-xs py-2 px-3 rounded-lg hover:bg-red-50" style={{ color: '#EF4444', border: '1px solid #E5E7EB' }}>🗑</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-md rounded-2xl" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#F3F4F6' }}>
              <h2 className="text-base font-semibold text-gray-900">{modal === 'add' ? 'Add Member' : 'Edit Member'}</h2>
              <button onClick={closeModal} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="h-20 rounded-2xl flex items-center justify-center font-serif text-3xl text-white" style={{ background: form.gradient }}>{form.initials || '?'}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Full Name *</label>
                  <input className={inputCls} style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Initials</label>
                  <input className={inputCls} style={inputStyle} maxLength={2} placeholder="SD" value={form.initials} onChange={e => setForm(f => ({ ...f, initials: e.target.value.toUpperCase() }))} />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Role / Title</label>
                <input className={inputCls} style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Bio</label>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Avatar Gradient</label>
                <input className={inputCls} style={inputStyle} value={form.gradient} onChange={e => setForm(f => ({ ...f, gradient: e.target.value }))} />
              </div>
              {(['github', 'linkedin', 'twitter'] as const).map(key => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">{key}</label>
                  <input className={inputCls} style={inputStyle} placeholder={`https://${key}.com/...`} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <button onClick={save} disabled={saving} className="w-full text-sm font-semibold text-white rounded-full py-4 transition-all hover:scale-[1.02] disabled:opacity-70"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#0D1B3E,#3B5BDB)' }}>
                {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span> : saved ? '✓ Saved!' : modal === 'add' ? 'Add Member' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="rounded-2xl p-8 text-center max-w-sm w-full" style={{ background: '#fff' }}>
            <p className="text-base font-semibold text-gray-900 mb-2">Remove team member?</p>
            <p className="text-sm text-gray-400 mb-7 font-light">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 text-sm font-medium rounded-full py-3 border border-gray-200 text-gray-600">Cancel</button>
              <button onClick={() => deleteMember(deleteId)} className="flex-1 text-sm font-semibold rounded-full py-3 text-white" style={{ background: '#DC2626' }}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
