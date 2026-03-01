import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, service, budget, timeline, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from('messages').insert([{
      name,
      email,
      service:  service  ?? '',
      budget:   budget   ?? '',
      timeline: timeline ?? '',
      message,
      status: 'new',
      read:   false,
    }])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' })

  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
