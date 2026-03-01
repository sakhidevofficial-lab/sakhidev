'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, upsertSetting, type Message } from '@/lib/supabase'

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: '#EEF2FF', color: '#3B5BDB', label: 'New' },
  replied: { bg: '#F0FDF4', color: '#059669', label: 'Replied' },
  closed: { bg: '#F3F4F6', color: '#6B7280', label: 'Closed' },
}

const quickActions = [
  { label: 'View All Messages', href: '/admin/messages', color: '#3B5BDB', bg: '#EEF2FF' },
  { label: 'Manage Projects', href: '/admin/projects', color: '#059669', bg: '#F0FDF4' },
  { label: 'Write Blog Post', href: '/admin/blog', color: '#7C3AED', bg: '#F5F3FF' },
  { label: 'Edit Services', href: '/admin/services', color: '#D97706', bg: '#FFFBEB' },
]

type Stats = {
  totalMessages: number
  unreadMessages: number
  thisWeekMessages: number
  activeProjects: number
  featuredProjects: number
  totalPosts: number
  draftPosts: number
}

export default function AdminDashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const [stats, setStats] = useState<Stats | null>(null)
  const [recentMsgs, setRecentMsgs] = useState<Message[]>([])
  const [availability, setAvailability] = useState<'available' | 'busy'>('available')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)

    // Run all queries in parallel
    const [
      { count: totalMessages },
      { count: unreadMessages },
      { count: thisWeekMessages },
      { count: activeProjects },
      { count: featuredProjects },
      { count: totalPosts },
      { count: draftPosts },
      { data: messages },
      { data: availSetting },
    ] = await Promise.all([
      supabase.from('messages').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('messages').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase.from('projects').select('*', { count: 'exact', head: true }).eq('visible', true),
      supabase.from('projects').select('*', { count: 'exact', head: true }).eq('featured', true),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('settings').select('value').eq('key', 'availability_status').single(),
    ])

    setStats({
      totalMessages: totalMessages ?? 0,
      unreadMessages: unreadMessages ?? 0,
      thisWeekMessages: thisWeekMessages ?? 0,
      activeProjects: activeProjects ?? 0,
      featuredProjects: featuredProjects ?? 0,
      totalPosts: totalPosts ?? 0,
      draftPosts: draftPosts ?? 0,
    })
    setRecentMsgs(messages ?? [])
    setAvailability((availSetting?.value as 'available' | 'busy') ?? 'available')
    setLoading(false)
  }

  const toggleAvailability = async (val: 'available' | 'busy') => {
    setAvailability(val)
    await upsertSetting('availability_status', val)
  }

  // Relative time helper
  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (mins < 60) return `${mins}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const statCards = stats ? [
    {
      label: 'Total Messages', value: String(stats.totalMessages),
      change: `+${stats.thisWeekMessages} this week`, up: true,
      color: '#3B5BDB', bg: '#EEF2FF',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    },
    {
      label: 'Unread Messages', value: String(stats.unreadMessages),
      change: stats.unreadMessages > 0 ? 'Needs attention' : 'All caught up!',
      up: stats.unreadMessages === 0,
      color: '#DC2626', bg: '#FEF2F2',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
    },
    {
      label: 'Active Projects', value: String(stats.activeProjects),
      change: `${stats.featuredProjects} featured`, up: true,
      color: '#059669', bg: '#F0FDF4',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    },
    {
      label: 'Blog Posts', value: String(stats.totalPosts),
      change: `${stats.draftPosts} draft${stats.draftPosts !== 1 ? 's' : ''}`, up: true,
      color: '#7C3AED', bg: '#F5F3FF',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    },
  ] : []

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1" style={{ letterSpacing: '-0.5px' }}>
            Good morning, Sekh 👋
          </h1>
          <p className="text-sm text-gray-400 font-light">{today}</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium self-start sm:self-auto"
          style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0' }}>
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Site is Live
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 hover:shadow-md cursor-default"
            style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
            <div className="flex items-start justify-between gap-2">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full text-right leading-snug"
                style={{ background: s.up ? '#F0FDF4' : '#FEF2F2', color: s.up ? '#059669' : '#DC2626' }}>
                {s.change}
              </span>
            </div>
            <div>
              <p className="text-4xl font-bold mb-1" style={{ color: '#111827', letterSpacing: '-1.5px' }}>{s.value}</p>
              <p className="text-sm font-light text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent messages */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#F3F4F6' }}>
            <h2 className="text-base font-semibold text-gray-800">Recent Messages</h2>
            <Link href="/admin/messages" className="text-sm font-medium hover:underline" style={{ color: '#3B5BDB' }}>
              View all →
            </Link>
          </div>

          {recentMsgs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-3xl mb-3">📭</p>
              <p className="text-sm font-medium text-gray-600">No messages yet</p>
              <p className="text-xs text-gray-400 font-light mt-1">Messages from your contact form will appear here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    {['From', 'Service', 'Budget', 'Time', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400 tracking-wide uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentMsgs.map((m, i) => (
                    <tr key={m.id} className="hover:bg-gray-50/60 transition-colors cursor-pointer"
                      style={{ borderBottom: i < recentMsgs.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                      <td className="px-6 py-4">
                        <p className={`text-sm ${!m.read ? 'font-semibold' : 'font-medium'} text-gray-800`}>{m.name}</p>
                        <p className="text-xs text-gray-400 font-light mt-0.5">{m.email}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-light whitespace-nowrap">{m.service}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700 whitespace-nowrap">{m.budget}</td>
                      <td className="px-6 py-4 text-sm text-gray-400 font-light whitespace-nowrap">{timeAgo(m.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                          style={{ background: statusStyle[m.status]?.bg, color: statusStyle[m.status]?.color }}>
                          {statusStyle[m.status]?.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Quick actions */}
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
            <h2 className="text-base font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-2">
              {quickActions.map((a, i) => (
                <Link key={i} href={a.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:scale-[1.02]"
                  style={{ background: a.bg, border: `1px solid ${a.bg}` }}>
                  <span className="text-sm font-medium" style={{ color: a.color }}>{a.label}</span>
                  <span className="text-base" style={{ color: a.color }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Availability — dynamic from Supabase */}
          <div className="rounded-2xl p-5" style={{ background: '#0D1B3E', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full inline-block ${availability === 'available' ? 'bg-green-400' : 'bg-red-400'}`} />
              <p className="text-sm font-medium text-white">
                {availability === 'available' ? 'Currently Available' : 'Currently Busy'}
              </p>
            </div>
            <p className="text-xs font-light leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Availability status shown to visitors on Contact page.
            </p>
            <div className="flex gap-2">
              <button onClick={() => toggleAvailability('available')}
                className="flex-1 text-xs font-medium py-2.5 rounded-lg transition-all"
                style={{
                  background: availability === 'available' ? 'rgba(59,91,219,0.35)' : 'rgba(255,255,255,0.05)',
                  color: availability === 'available' ? '#818CF8' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${availability === 'available' ? 'rgba(59,91,219,0.4)' : 'rgba(255,255,255,0.07)'}`,
                }}>
                ✓ Available
              </button>
              <button onClick={() => toggleAvailability('busy')}
                className="flex-1 text-xs font-medium py-2.5 rounded-lg transition-all"
                style={{
                  background: availability === 'busy' ? 'rgba(220,38,38,0.25)' : 'rgba(255,255,255,0.05)',
                  color: availability === 'busy' ? '#FCA5A5' : 'rgba(255,255,255,0.3)',
                  border: `1px solid ${availability === 'busy' ? 'rgba(220,38,38,0.4)' : 'rgba(255,255,255,0.07)'}`,
                }}>
                Busy
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}