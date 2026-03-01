'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-browser'
import { supabase } from '@/lib/supabase'

const SIDEBAR_W = 240

interface Props { children: React.ReactNode; active: string }

export default function AdminLayout({ children, active }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Get logged in user info
    const getUser = async () => {
      const client = createClient()
      const { data: { user } } = await client.auth.getUser()
      if (user) setUserEmail(user.email ?? '')
    }
    getUser()
    fetchUnreadCount()

    // Real-time badge update
    const channel = supabase
      .channel('messages-badge')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => {
        fetchUnreadCount()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const fetchUnreadCount = async () => {
    const { count } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new')
    setUnreadCount(count ?? 0)
  }

  // Real Supabase Auth logout
  const handleLogout = async () => {
    const client = createClient()
    await client.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    {
      id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    },
    {
      id: 'messages', label: 'Messages', href: '/admin/messages', badge: unreadCount,
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    },
    {
      id: 'projects', label: 'Projects', href: '/admin/projects',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
    },
    {
      id: 'blog', label: 'Blog', href: '/admin/blog',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
    },
    {
      id: 'services', label: 'Services', href: '/admin/services',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>,
    },
    {
      id: 'team', label: 'Team', href: '/admin/team',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>,
    },
    {
      id: 'settings', label: 'Settings', href: '/admin/settings',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
    },
  ]

  return (
    <div className="min-h-screen flex" style={{ background: '#F4F6FB', fontFamily: 'DM Sans, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: `${SIDEBAR_W}px`, minWidth: `${SIDEBAR_W}px`,
        background: '#0D1B3E', boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        transform: sidebarOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
        transition: 'transform 0.3s ease',
      }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b flex-shrink-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg,#3B5BDB,#6366F1)', boxShadow: '0 0 8px rgba(59,91,219,0.6)' }} />
          <span className="font-serif font-bold text-lg text-white tracking-tight">SAKHIDEV</span>
          <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'rgba(59,91,219,0.3)', color: '#818CF8' }}>Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto min-h-0">
          <p className="text-xs tracking-widest uppercase px-3 mb-4 font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>Main Menu</p>
          <ul className="flex flex-col gap-1">
            {navItems.map(item => {
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-150"
                    style={{ background: isActive ? 'rgba(59,91,219,0.22)' : 'transparent', color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', borderLeft: isActive ? '2px solid #3B5BDB' : '2px solid transparent' }}>
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge != null && item.badge > 0 && (
                      <span className="ml-auto text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold" style={{ background: '#3B5BDB', color: '#fff' }}>
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User */}
        <div className="px-3 pb-6 pt-4 border-t flex-shrink-0 sticky bottom-0" style={{ borderColor: 'rgba(255,255,255,0.07)', background: '#0D1B3E' }}>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#3B5BDB,#6366F1)' }}>
              {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin</p>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{userEmail}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
            style={{ color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#F87171'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 lg:hidden bg-black/50" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0" id="main-content">
        <header className="h-16 flex items-center justify-between px-6 border-b sticky top-0 z-20"
          style={{ background: '#fff', borderColor: '#E5E7EB', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <p className="font-semibold text-gray-800 text-base capitalize ml-4">{active.charAt(0).toUpperCase() + active.slice(1)}</p>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse" style={{ background: '#3B5BDB' }} />}
            </button>
            <Link href="/" target="_blank" className="flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 transition-all hover:scale-105"
              style={{ background: '#EEF2FF', color: '#3B5BDB', border: '1px solid #C7D2FE' }}>
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none"><path d="M1 6h10M6 1l5 5-5 5" stroke="#3B5BDB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              View Site
            </Link>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          aside { transform: translateX(0) !important; position: fixed !important; }
          #main-content { margin-left: ${SIDEBAR_W}px !important; }
        }
      `}</style>
    </div>
  )
}