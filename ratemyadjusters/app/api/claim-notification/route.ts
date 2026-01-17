import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adjusterName, adjusterState, adjusterSlug, adjusterId, email, phone, message } = body

    console.log('=== CLAIM REQUEST RECEIVED ===')
    console.log('Body:', JSON.stringify(body, null, 2))

    const { data, error } = await supabase
      .from('claim_requests')
      .insert({
        adjuster_id: adjusterId || null,
        adjuster_name: adjusterName || 'Unknown',
        adjuster_state: adjusterState || null,
        email: email,
        phone: phone || null,
        message: message || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    console.log('=== CLAIM REQUEST SAVED ===')
    console.log(`ID: ${data.id}`)

    return NextResponse.json({ success: true, id: data.id })

  } catch (error: any) {
    console.error('Claim notification error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Failed to process' }, { status: 500 })
  }
}
