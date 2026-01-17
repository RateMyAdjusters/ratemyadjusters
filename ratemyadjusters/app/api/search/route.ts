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

const stateNames: { [key: string]: string } = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
  'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
  'WI': 'Wisconsin', 'WY': 'Wyoming'
}

// Create reverse lookup: state name -> abbreviation (case insensitive)
const stateNameToAbbr: { [key: string]: string } = {}
for (const [abbr, name] of Object.entries(stateNames)) {
  stateNameToAbbr[name.toLowerCase()] = abbr
}

const ITEMS_PER_PAGE = 20

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const rawSearchTerm = searchParams.get('q') || searchParams.get('query') || ''
    const searchTerm = rawSearchTerm.trim()
    const state = searchParams.get('state')?.toUpperCase() || ''
    const hasReviews = searchParams.get('hasReviews') === 'true'
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : null
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

    // Check if searchTerm is a state name (e.g., "Michigan" -> "MI")
    let effectiveState = state
    let effectiveSearchTerm = searchTerm

    if (searchTerm && !state) {
      const searchLower = searchTerm.toLowerCase()
      // Check if it's a full state name
      if (stateNameToAbbr[searchLower]) {
        effectiveState = stateNameToAbbr[searchLower]
        effectiveSearchTerm = '' // Clear search term, treat as state-only search
      }
      // Check if it's a state abbreviation (e.g., "MI", "mi")
      else if (stateAbbreviations.includes(searchTerm.toUpperCase()) && searchTerm.length === 2) {
        effectiveState = searchTerm.toUpperCase()
        effectiveSearchTerm = ''
      }
    }

    console.log('Search request:', { searchTerm: effectiveSearchTerm, state: effectiveState, hasReviews, minRating, page })

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Must have a filter
    if (!effectiveSearchTerm && !effectiveState) {
      return NextResponse.json({
        adjusters: [],
        total: 0,
        page: 1,
        totalPages: 0,
        message: 'Enter a name or select a state to search'
      })
    }

    let allResults: any[] = []

    // State-only search (fast, uses index)
    // Fetch limited results, sort client-side to avoid ORDER BY timeout
    if (effectiveState && !effectiveSearchTerm) {
      const MAX_FETCH = 200

      // Simple query without ORDER BY to use index efficiently
      const result = await supabase
        .from('adjusters')
        .select('id, slug, first_name, last_name, state, avg_rating, total_reviews')
        .eq('state', effectiveState)
        .limit(MAX_FETCH)

      if (result.error) {
        console.error('Supabase error:', result.error)
        return NextResponse.json({ adjusters: [], total: 0, page: 1, totalPages: 0, error: result.error.message }, { status: 500 })
      }

      let allResults = (result.data || []).map(adj => ({
        ...adj,
        company_name: null
      }))

      // Sort client-side by total_reviews DESC
      allResults.sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0))

      const totalCount = allResults.length
      const offset = (page - 1) * ITEMS_PER_PAGE
      const paginatedResults = allResults.slice(offset, offset + ITEMS_PER_PAGE)
      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

      // Show "100+" if we hit the limit (meaning there might be more)
      const displayTotal = totalCount >= MAX_FETCH ? '100+' : totalCount

      console.log('State search results:', { state: effectiveState, total: totalCount, page, totalPages })

      return NextResponse.json({
        adjusters: paginatedResults,
        total: totalCount,
        displayTotal,
        page,
        totalPages,
        stateBreakdown: null,
        topResults: null
      })
    }
    // Name search with optional state
    else if (effectiveSearchTerm) {
      const parts = effectiveSearchTerm.split(/\s+/).filter(Boolean)

      // Two-word search: "Giovanni Odeh" -> first_name ILIKE 'Giovanni%' AND last_name ILIKE 'Odeh%'
      if (parts.length >= 2) {
        const firstName = parts[0]
        const lastName = parts.slice(1).join(' ')

        console.log('Two-word search:', { firstName, lastName })

        // Exact match
        const fullNameResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('first_name', `${firstName}%`)
          .ilike('last_name', `${lastName}%`)
          .limit(100)

        // Fuzzy match with shorter prefix for typo tolerance (min 2 chars)
        const fuzzyFirstName = firstName.length > 2 ? firstName.slice(0, Math.max(2, firstName.length - 1)) : firstName
        const fuzzyLastName = lastName.length > 2 ? lastName.slice(0, Math.max(2, lastName.length - 1)) : lastName

        const fuzzyResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('first_name', `${fuzzyFirstName}%`)
          .ilike('last_name', `${fuzzyLastName}%`)
          .limit(50)

        allResults = [
          ...(fullNameResult.data || []),
          ...(fuzzyResult.data || [])
        ]

        if (fullNameResult.error && fuzzyResult.error) {
          console.error('Full name search error:', fullNameResult.error)
          return NextResponse.json({ adjusters: [], total: 0, page: 1, totalPages: 0, message: 'No results found' })
        }
      }
      // Single-word search: search both first_name and last_name separately
      else {
        // Exact prefix match
        const firstNameResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('first_name', `${effectiveSearchTerm}%`)
          .limit(100)

        const lastNameResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('last_name', `${effectiveSearchTerm}%`)
          .limit(100)

        // Fuzzy match with shorter prefix for typo tolerance (min 2 chars)
        const fuzzyTerm = effectiveSearchTerm.length > 2 ? effectiveSearchTerm.slice(0, Math.max(2, effectiveSearchTerm.length - 1)) : effectiveSearchTerm

        const fuzzyFirstResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('first_name', `${fuzzyTerm}%`)
          .limit(50)

        const fuzzyLastResult = await supabase
          .from('adjusters')
          .select('id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)')
          .ilike('last_name', `${fuzzyTerm}%`)
          .limit(50)

        if (firstNameResult.error) {
          console.error('First name search error:', firstNameResult.error)
        }
        if (lastNameResult.error) {
          console.error('Last name search error:', lastNameResult.error)
        }

        // If ALL queries failed/timed out, return empty results (not 500)
        if (firstNameResult.error && lastNameResult.error && fuzzyFirstResult.error && fuzzyLastResult.error) {
          console.error('All queries failed:', firstNameResult.error?.message)
          return NextResponse.json({ adjusters: [], total: 0, page: 1, totalPages: 0, message: 'No results found' })
        }

        // Combine all results
        allResults = [
          ...(firstNameResult.data || []),
          ...(lastNameResult.data || []),
          ...(fuzzyFirstResult.data || []),
          ...(fuzzyLastResult.data || [])
        ]
      }

      // Filter by state if provided
      if (effectiveState && stateAbbreviations.includes(effectiveState)) {
        allResults = allResults.filter(adj => adj.state === effectiveState)
      }
    }

    console.log('Raw results count:', allResults.length)

    // Sort by total_reviews DESC before deduplication to keep the entry with reviews
    allResults.sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0))

    // Deduplicate by first_name + last_name + state (keeps first = most reviewed)
    const seen = new Set()
    let uniqueAdjusters = allResults.filter(adj => {
      const key = `${adj.first_name.toLowerCase()}-${adj.last_name.toLowerCase()}-${adj.state}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).map(adj => ({
      ...adj,
      company_name: (adj.companies as { name: string } | null)?.name || null
    }))

    // Fetch LIVE review counts from reviews table (not cached columns)
    if (uniqueAdjusters.length > 0) {
      const adjusterIds = uniqueAdjusters.map(a => a.id)

      const { data: reviewData } = await supabase
        .from('reviews')
        .select('adjuster_id, overall_rating')
        .in('adjuster_id', adjusterIds)

      // Build a map of adjuster_id -> { count, avgRating }
      const reviewStats: { [id: string]: { count: number; total: number } } = {}
      for (const review of (reviewData || [])) {
        if (!reviewStats[review.adjuster_id]) {
          reviewStats[review.adjuster_id] = { count: 0, total: 0 }
        }
        reviewStats[review.adjuster_id].count++
        reviewStats[review.adjuster_id].total += review.overall_rating
      }

      // Update adjusters with live review data
      uniqueAdjusters = uniqueAdjusters.map(adj => {
        const stats = reviewStats[adj.id]
        if (stats) {
          return {
            ...adj,
            total_reviews: stats.count,
            avg_rating: Math.round((stats.total / stats.count) * 100) / 100
          }
        }
        return adj
      })
    }

    // Apply filters
    if (hasReviews) {
      uniqueAdjusters = uniqueAdjusters.filter(adj => (adj.total_reviews || 0) > 0)
    }
    if (minRating !== null) {
      uniqueAdjusters = uniqueAdjusters.filter(adj => (adj.avg_rating || 0) >= minRating)
    }

    // Smart sort: exact match > reviewed > rated > alphabetical
    const searchLower = effectiveSearchTerm.toLowerCase()
    uniqueAdjusters.sort((a, b) => {
      // Exact first name match wins
      const aFirstExact = a.first_name.toLowerCase() === searchLower
      const bFirstExact = b.first_name.toLowerCase() === searchLower
      if (aFirstExact && !bFirstExact) return -1
      if (!aFirstExact && bFirstExact) return 1

      // Exact last name match
      const aLastExact = a.last_name.toLowerCase() === searchLower
      const bLastExact = b.last_name.toLowerCase() === searchLower
      if (aLastExact && !bLastExact) return -1
      if (!aLastExact && bLastExact) return 1

      // Most reviewed first
      if ((a.total_reviews || 0) !== (b.total_reviews || 0)) {
        return (b.total_reviews || 0) - (a.total_reviews || 0)
      }

      // Highest rated
      if ((a.avg_rating || 0) !== (b.avg_rating || 0)) {
        return (b.avg_rating || 0) - (a.avg_rating || 0)
      }

      // Alphabetical by last name
      return a.last_name.localeCompare(b.last_name)
    })

    const total = uniqueAdjusters.length
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedResults = uniqueAdjusters.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    // Group by state for smart grouping (only return if > 50 results)
    let stateBreakdown: { [key: string]: number } | null = null
    if (total > 50) {
      stateBreakdown = {}
      uniqueAdjusters.forEach(adj => {
        if (adj.state) {
          stateBreakdown![adj.state] = (stateBreakdown![adj.state] || 0) + 1
        }
      })
    }

    console.log('Final results count:', total, 'Page:', page, 'of', totalPages)

    const displayTotal = total > 100 ? '100+' : total

    return NextResponse.json({
      adjusters: paginatedResults,
      total,
      displayTotal,
      page,
      totalPages,
      stateBreakdown,
      topResults: total > 50 ? uniqueAdjusters.slice(0, 5) : null
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ adjusters: [], total: 0, page: 1, totalPages: 0, error: 'Server error' }, { status: 500 })
  }
}
