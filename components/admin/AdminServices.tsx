'use client'
import { useEffect, useState } from 'react'
import { supabase, type Service } from '@/lib/supabase'

export default function AdminServices() {
  const [services, setServices]   = useState<Service[]>([])
  const [loading, setLoading]     = useState(true)
  const [editing, setEditing]     = useState<Service | null>(null)
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)
  const [newDeliverable, setNewD] = useState('')

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('sort_order')
    if (data) setServices(data)
    setLoading(false)
  }

  const toggleVisible = async (s: Service) => {
    await supabase.from('services').update({ visible: !s.visible }).eq('id', s.id)
    setServices(prev => prev.map(x => x.id === s.id ? { ...x, visible: !x.visible } : x))
  }

  const saveEdit = async () => {
    if (!editing) return
    setSaving(true)
    const { error } = await supabase.from('services').update({
      title: editing.title, short: editing.short, description: editing.description,
      deliverables: editing.deliverables, accent: editing.accent, icon: editing.icon,
    }).eq('id', editing.id)
    if (!error) {
      setSaved(true)
      setServices(prev => prev.map(s => s.id === editing.id ? editing : s))
      setTimeout(() => { setEditing(null); setSaved(false) }, 800)
    }
    setSaving(false)
  }

  const addDeliverable = () => {
    if (!newDeliverable.trim() || !editing) return
    setEditing({ ...editing, deliverables: [...editing.deliverables, newDeliverable.trim()] })
    setNewD('')
  }
  const removeDeliverable = (i: number) => {
    if (!editing) return
    setEditing({ ...editing, deliverables: editing.deliverables.filter((_, idx) => idx !== i) })
  }

  const inputStyle = { background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#111827', fontFamily: 'DM Sans, sans-serif' }
  const inputCls   = "w-full rounded-xl px-4 py-3 text-sm font-light outline-none transition-all"

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>

  return (
    <div className="flex flex-col gap-6 w-full">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Services</h1>
        <p className="text-sm text-gray-400 font-light mt-1">{services.filter(s => s.visible).length} of {services.length} visible</p>
      </div>

      <div className="flex flex-col gap-3">
        {services.map(s => (
          <div key={s.id} className="rounded-2xl p-5 transition-all" style={{ background: '#fff', border: '1px solid #E5E7EB', opacity: s.visible ? 1 : 0.55, boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: s.accent + '15' }}>{s.icon}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-base font-semibold text-gray-900">{s.title}</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: s.accent + '15', color: s.accent }}>{s.num}</span>
                  </div>
                  <p className="text-sm text-gray-400 font-light">{s.short}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVisible(s)} className="text-xs font-medium px-3 py-2 rounded-lg transition-all"
                  style={{ background: s.visible ? '#F0FDF4' : '#F3F4F6', color: s.visible ? '#059669' : '#9CA3AF', border: '1px solid #E5E7EB' }}>
                  {s.visible ? '👁 Visible' : '🚫 Hidden'}
                </button>
                <button onClick={() => { setEditing(s); setSaved(false) }} className="text-xs font-semibold px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all"
                  style={{ color: '#3B5BDB', background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="w-full max-w-lg rounded-2xl" style={{ background: '#fff', boxShadow: '0 24px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-white z-10" style={{ borderColor: '#F3F4F6' }}>
              <h2 className="text-base font-semibold text-gray-900">Edit Service</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">✕</button>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Icon</label>
                  <input className={inputCls} style={inputStyle} value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Accent Color</label>
                  <div className="flex gap-2">
                    <input className={inputCls} style={inputStyle} value={editing.accent} onChange={e => setEditing({ ...editing, accent: e.target.value })} />
                    <div className="w-11 h-11 rounded-xl flex-shrink-0" style={{ background: editing.accent }} />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Title</label>
                <input className={inputCls} style={inputStyle} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Short Description</label>
                <input className={inputCls} style={inputStyle} value={editing.short} onChange={e => setEditing({ ...editing, short: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Full Description</label>
                <textarea className={inputCls} style={{ ...inputStyle, resize: 'none' }} rows={3} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 block mb-2 uppercase tracking-wide">Deliverables</label>
                <div className="flex flex-col gap-2 mb-3">
                  {editing.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: editing.accent }} />
                      <span className="text-sm text-gray-600 flex-1 font-light">{d}</span>
                      <button onClick={() => removeDeliverable(i)} className="text-red-300 hover:text-red-500">×</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className={inputCls} style={inputStyle} placeholder="Add deliverable..." value={newDeliverable} onChange={e => setNewD(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDeliverable())} />
                  <button onClick={addDeliverable} className="text-xs font-semibold px-4 rounded-xl whitespace-nowrap" style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}>+ Add</button>
                </div>
              </div>
              <button onClick={saveEdit} disabled={saving} className="w-full text-sm font-semibold text-white rounded-full py-4 transition-all hover:scale-[1.02] disabled:opacity-70"
                style={{ background: saved ? '#059669' : 'linear-gradient(135deg,#0D1B3E,#3B5BDB)' }}>
                {saving ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span> : saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
