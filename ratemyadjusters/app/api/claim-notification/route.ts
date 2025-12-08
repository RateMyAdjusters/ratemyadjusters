import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adjusterName, adjusterState, adjusterSlug, adjusterId, email, phone } = body

    // Save to database
    const { data, error } = await supabase
      .from('claim_requests')
      .insert({
        adjuster_id: adjusterId || null,
        adjuster_name: adjusterName,
        adjuster_state: adjusterState,
        email: email,
        phone: phone || null,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ success: false, error: 'Failed to save request' }, { status: 500 })
    }

    console.log('=== CLAIM REQUEST SAVED ===')
    console.log(`ID: ${data.id}`)
    console.log(`Adjuster: ${adjusterName} (${adjusterState})`)
    console.log(`Email: ${email}`)
    console.log(`Phone: ${phone || 'Not provided'}`)
    console.log('===========================')

    return NextResponse.json({ success: true, id: data.id })

  } catch (error) {
    console.error('Claim notification error:', error)
    return NextResponse.json({ success: false, error: 'Failed to process' }, { status: 500 })
  }
}
