import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const stateAbbreviations = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchTerm = searchParams.get('q')?.trim() || ''
    const state = searchParams.get('state')?.toUpperCase() || ''
    const company = searchParams.get('company') || ''

    // Must have at least one filter
    if (!searchTerm && !state && !company) {
      return NextResponse.json({ adjusters: [], message: 'Please provide a search filter' })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    let query = supabase
      .from('adjusters')
      .select('id, first_name, last_name, slug, company_name, state, city, avg_rating, total_reviews')

    // Apply state filter
    if (state && stateAbbreviations.includes(state)) {
      query = query.eq('state', state)
    }

    // Apply company filter
    if (company) {
      query = query.ilike('company_name', `%${company}%`)
    }

    // Apply name search
    if (searchTerm) {
      if (stateAbbreviations.includes(searchTerm.toUpperCase())) {
        query = query.eq('state', searchTerm.toUpperCase())
      } else if (searchTerm.includes(' ')) {
        const parts = searchTerm.split(' ')
        const firstName = parts[0]
        const lastName = parts.slice(1).join(' ')
        query = query
          .ilike('first_name', `${firstName}%`)
          .ilike('last_name', `${lastName}%`)
      } else {
        query = query.ilike('last_name', `${searchTerm}%`)
      }
    }

    const { data, error } = await query
      .order('total_reviews', { ascending: false, nullsFirst: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ adjusters: [], error: error.message }, { status: 500 })
    }

    return NextResponse.json({ adjusters: data || [] })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ adjusters: [], error: 'Server error' }, { status: 500 })
  }
}
