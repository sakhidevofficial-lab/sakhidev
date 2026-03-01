import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Type definitions ───────────────────────────────────────────

export type Project = {
  id: number
  title: string
  label: string
  category: string
  description: string
  result: string
  tags: string[]
  year: string
  gradient: string
  featured: boolean
  visible: boolean
  sort_order: number
  created_at: string
}

export type BlogPost = {
  id: number
  title: string
  excerpt: string
  category: string
  read_time: string
  gradient: string
  status: 'published' | 'draft'
  featured: boolean
  published_at: string | null
  created_at: string
}

export type Service = {
  id: number
  num: string
  title: string
  short: string
  description: string
  deliverables: string[]
  accent: string
  icon: string
  visible: boolean
  sort_order: number
  created_at: string
}

export type TeamMember = {
  id: number
  name: string
  role: string
  bio: string
  initials: string
  gradient: string
  github: string
  linkedin: string
  twitter: string
  visible: boolean
  sort_order: number
  created_at: string
}

export type Message = {
  id: number
  name: string
  email: string
  service: string
  budget: string
  timeline: string
  message: string
  status: 'new' | 'replied' | 'closed'
  read: boolean
  created_at: string
}

export type Setting = {
  id: number
  key: string
  value: string
  updated_at: string
}

// ─── Helper: get single setting value ───────────────────────────
export async function getSetting(key: string): Promise<string> {
  const { data } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single()
  return data?.value ?? ''
}

// ─── Helper: upsert setting ─────────────────────────────────────
export async function upsertSetting(key: string, value: string) {
  return supabase
    .from('settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
}
