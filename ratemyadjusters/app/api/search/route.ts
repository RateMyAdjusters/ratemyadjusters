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
    const minRating = searchParams.get('min_rating') ? parseFloat(searchParams.get('min_rating')!) : null

    // Must have at least one filter
    if (!searchTerm && !state && !company) {
      return NextResponse.json({ adjusters: [], message: 'Please provide a search filter' })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Use a query that fetches adjusters with their review stats computed dynamically
    // This ensures accurate counts even if triggers haven't updated the denormalized columns
    let query = supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        slug,
        company_name,
        state,
        city,
        reviews!left(overall_rating, status)
      `)

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

    const { data, error } = await query.limit(100)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ adjusters: [], error: error.message }, { status: 500 })
    }

    // Compute review stats from the joined data
    let adjusters = (data || []).map((adjuster: any) => {
      // Filter to only approved reviews
      const approvedReviews = (adjuster.reviews || []).filter(
        (r: any) => r.status === 'approved'
      )

      const total_reviews = approvedReviews.length
      const avg_rating = total_reviews > 0
        ? Math.round(
            (approvedReviews.reduce((sum: number, r: any) => sum + r.overall_rating, 0) / total_reviews) * 100
          ) / 100
        : null

      // Return adjuster without the nested reviews array
      const { reviews, ...adjusterData } = adjuster
      return {
        ...adjusterData,
        total_reviews,
        avg_rating,
      }
    })

    // Apply minimum rating filter if specified
    if (minRating !== null) {
      adjusters = adjusters.filter(
        (a: any) => a.avg_rating !== null && a.avg_rating >= minRating
      )
    }

    // Sort by total_reviews descending, then by avg_rating
    adjusters.sort((a: any, b: any) => {
      if ((b.total_reviews || 0) !== (a.total_reviews || 0)) {
        return (b.total_reviews || 0) - (a.total_reviews || 0)
      }
      return (b.avg_rating || 0) - (a.avg_rating || 0)
    })

    // Limit to 50 results
    adjusters = adjusters.slice(0, 50)

    return NextResponse.json({ adjusters })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ adjusters: [], error: 'Server error' }, { status: 500 })
  }
}
