'use client'
import { useEffect, useState } from 'react'
import { supabase, type Message } from '@/lib/supabase'

const statusConfig: Record<string, { bg: string; color: string; label: string }> = {
  new:     { bg: '#EEF2FF', color: '#3B5BDB', label: 'New' },
  replied: { bg: '#F0FDF4', color: '#059669', label: 'Replied' },
  closed:  { bg: '#F3F4F6', color: '#6B7280', label: 'Closed' },
}

export default function AdminMessages() {
  const [messages, setMessages]   = useState<Message[]>([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('all')
  const [search, setSearch]       = useState('')
  const [selected, setSelected]   = useState<Message | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replySent, setReplySent] = useState(false)

  useEffect(() => { fetchMessages() }, [])

  const fetchMessages = async () => {
    setLoading(true)
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  const filtered = messages.filter(m => {
    const matchFilter = filter === 'all' || m.status === filter
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const newCount = messages.filter(m => m.status === 'new').length

  const openMessage = async (m: Message) => {
    setSelected(m); setReplySent(false); setReplyText('')
    if (!m.read) {
      await supabase.from('messages').update({ read: true }).eq('id', m.id)
      setMessages(prev => prev.map(x => x.id === m.id ? { ...x, read: true } : x))
    }
  }

  const updateStatus = async (id: number, status: string) => {
    await supabase.from('messages').update({ status }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: status as Message['status'] } : m))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as Message['status'] } : null)
  }

  const deleteMessage = async (id: number) => {
    await supabase.from('messages').delete().eq('id', id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const sendReply = async () => {
    if (!replyText.trim() || !selected) return
    await updateStatus(selected.id, 'replied')
    setReplySent(true); setReplyText('')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.5px' }}>Messages</h1>
        <p className="text-sm text-gray-400 font-light mt-1">{newCount > 0 ? `${newCount} unread messages need your attention` : 'All caught up!'}</p>
      </div>

      <div className="rounded-2xl overflow-hidden flex" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)', minHeight: '600px' }}>
        {/* List */}
        <div className={`flex flex-col border-r ${selected ? 'hidden md:flex md:w-72 lg:w-80' : 'w-full'}`} style={{ borderColor: '#F3F4F6' }}>
          <div className="p-4 border-b flex flex-col gap-3" style={{ borderColor: '#F3F4F6' }}>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} className="w-full text-sm font-light rounded-xl pl-8 pr-3 py-2.5 outline-none" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', color: '#374151' }} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['all', 'new', 'replied', 'closed'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className="text-xs font-medium rounded-full px-3 py-1.5 capitalize transition-all"
                  style={{ background: filter === f ? '#0D1B3E' : '#F3F4F6', color: filter === f ? '#fff' : '#6B7280' }}>
                  {f}{f === 'new' && newCount > 0 && ` (${newCount})`}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16"><p className="text-2xl mb-2">📭</p><p className="text-sm text-gray-400">No messages found</p></div>
            ) : filtered.map(m => (
              <div key={m.id} onClick={() => openMessage(m)} className="flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ background: selected?.id === m.id ? '#F8F9FF' : undefined, borderLeft: selected?.id === m.id ? '2px solid #3B5BDB' : '2px solid transparent' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white flex-shrink-0" style={{ background: `hsl(${(m.id * 47) % 360}, 60%, 50%)` }}>{m.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={`text-sm truncate ${!m.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{m.name}</p>
                    <p className="text-xs text-gray-400 flex-shrink-0">{new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-1">{m.service} · {m.budget}</p>
                  <p className="text-xs text-gray-400 font-light truncate">{m.message}</p>
                </div>
                {!m.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        {selected ? (
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#F3F4F6' }}>
              <div className="flex items-center gap-3">
                <button className="md:hidden p-1.5 rounded-lg hover:bg-gray-100" onClick={() => setSelected(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{ background: `hsl(${(selected.id * 47) % 360}, 60%, 50%)` }}>{selected.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                  <p className="text-xs text-gray-400">{selected.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: statusConfig[selected.status].bg, color: statusConfig[selected.status].color }}>{statusConfig[selected.status].label}</span>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 outline-none cursor-pointer" style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB' }}>
                  <option value="new">Mark New</option>
                  <option value="replied">Mark Replied</option>
                  <option value="closed">Mark Closed</option>
                </select>
                <button onClick={() => deleteMessage(selected.id)} className="p-1.5 rounded-lg hover:bg-red-50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {[{ label: 'Service', value: selected.service }, { label: 'Budget', value: selected.budget }, { label: 'Timeline', value: selected.timeline }, { label: 'Received', value: new Date(selected.created_at).toLocaleDateString() }].map((item, i) => (
                  <div key={i} className="rounded-xl px-4 py-2.5" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-xs font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl p-5 mb-6" style={{ background: '#F8F9FF', border: '1px solid #E5E7EB' }}>
                <p className="text-xs text-gray-400 mb-3 font-medium">Message from {selected.name}</p>
                <p className="text-sm font-light leading-relaxed text-gray-700">{selected.message}</p>
              </div>
              {replySent ? (
                <div className="rounded-2xl p-5 flex items-center gap-3" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <span className="text-green-500 text-lg">✓</span>
                  <p className="text-sm font-medium text-green-800">Reply sent to {selected.email}</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Reply</p>
                  <textarea rows={4} placeholder={`Write your reply to ${selected.name}...`} value={replyText} onChange={e => setReplyText(e.target.value)}
                    className="w-full text-sm font-light rounded-xl px-4 py-3 outline-none resize-none transition-all"
                    style={{ background: '#F9FAFB', border: replyText ? '1px solid #3B5BDB' : '1px solid #E5E7EB', color: '#374151', fontFamily: 'DM Sans, sans-serif' }} />
                  <div className="flex items-center justify-between mt-3">
                    <a href={`mailto:${selected.email}`} className="text-xs font-medium text-gray-400 flex items-center gap-1.5">✉ Open in email app</a>
                    <button onClick={sendReply} disabled={!replyText.trim()} className="flex items-center gap-2 text-xs font-semibold text-white rounded-full px-5 py-2.5 transition-all hover:scale-105 disabled:opacity-40"
                      style={{ background: '#3B5BDB', boxShadow: replyText ? '0 4px 14px rgba(59,91,219,0.3)' : 'none' }}>
                      Send Reply →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center flex-col gap-3 text-center px-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2" style={{ background: '#EEF2FF' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            </div>
            <p className="text-sm font-semibold text-gray-700">Select a message</p>
            <p className="text-xs text-gray-400 font-light max-w-xs">Click on any message from the list to read and reply</p>
          </div>
        )}
      </div>
    </div>
  )
}
