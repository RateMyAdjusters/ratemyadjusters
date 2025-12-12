'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client directly to avoid any import issues
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

const stateAbbreviations = Object.keys(stateNames)

const majorCompanies = [
  'State Farm', 'Allstate', 'USAA', 'Liberty Mutual', 'Progressive',
  'Farmers', 'Nationwide', 'Travelers', 'GEICO', 'American Family',
  'Erie Insurance', 'Chubb', 'The Hartford', 'Sedgwick', 'Crawford & Company'
]

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  slug: string
  company_name: string | null
  state: string
  city: string | null
  avg_rating: number | null
  total_reviews: number | null
}

function StarRatingDisplay({ rating }: { rating: number }) {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    } else if (i === fullStars && hasHalf) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill={`url(#half-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    } else {
      stars.push(
        <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }
  }

  return <div className="flex gap-0.5">{stars}</div>
}

function SearchContent() {
  const searchParams = useSearchParams()
  
  const urlQuery = searchParams.get('q') || ''
  const urlState = searchParams.get('state')?.toUpperCase() || ''
  
  const [searchTerm, setSearchTerm] = useState(urlQuery)
  const [selectedState, setSelectedState] = useState(
    stateAbbreviations.includes(urlState) ? urlState : ''
  )
  const [selectedCompany, setSelectedCompany] = useState('')
  const [adjusters, setAdjusters] = useState<Adjuster[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    async function loadAdjusters() {
      setLoading(true)
      setError(null)
      setDebugInfo('')

      try {
        // Check if Supabase is configured
        if (!supabaseUrl || !supabaseAnonKey) {
          setError('Supabase is not configured. Please check environment variables.')
          setDebugInfo('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
          setLoading(false)
          return
        }

        // Build the query
        let query = supabase
          .from('adjusters')
          .select('id, first_name, last_name, slug, company_name, state, city, avg_rating, total_reviews')

        // Apply filters
        const trimmedSearch = searchTerm.trim()
        
        if (trimmedSearch) {
          // Check if search term is a state abbreviation
          if (stateAbbreviations.includes(trimmedSearch.toUpperCase())) {
            query = query.eq('state', trimmedSearch.toUpperCase())
          }
          // Check if search term is a full state name
          else if (Object.values(stateNames).map(s => s.toLowerCase()).includes(trimmedSearch.toLowerCase())) {
            const abbrev = Object.entries(stateNames).find(
              ([, name]) => name.toLowerCase() === trimmedSearch.toLowerCase()
            )?.[0]
            if (abbrev) {
              query = query.eq('state', abbrev)
            }
          }
          // Check if it looks like a name search
          else if (trimmedSearch.includes(' ')) {
            // Full name search
            const parts = trimmedSearch.split(' ')
            const firstName = parts[0]
            const lastName = parts.slice(1).join(' ')
            query = query
              .ilike('first_name', `${firstName}%`)
              .ilike('last_name', `${lastName}%`)
          } else {
            // Single term - search in both first and last name
            query = query.or(`first_name.ilike.${trimmedSearch}%,last_name.ilike.${trimmedSearch}%`)
          }
        }

        // State filter from dropdown
        if (selectedState) {
          query = query.eq('state', selectedState)
        }

        // Company filter
        if (selectedCompany) {
          query = query.ilike('company_name', `%${selectedCompany}%`)
        }

        // Order and limit
        query = query
          .order('total_reviews', { ascending: false, nullsFirst: false })
          .limit(50)

        const { data, error: queryError } = await query

        if (queryError) {
          console.error('Supabase error:', queryError)
          setError(`Database error: ${queryError.message}`)
          setDebugInfo(JSON.stringify(queryError, null, 2))
          setAdjusters([])
        } else {
          setAdjusters(data || [])
          setDebugInfo(`Found ${data?.length || 0} adjusters`)
        }
      } catch (err: any) {
        console.error('Error loading adjusters:', err)
        setError(`Error: ${err.message || 'Unknown error'}`)
        setDebugInfo(err.stack || '')
        setAdjusters([])
      } finally {
        setLoading(false)
      }
    }

    loadAdjusters()
  }, [searchTerm, selectedState, selectedCompany])

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const getPageTitle = () => {
    if (searchTerm) return `Search results for "${searchTerm}"`
    if (selectedState && selectedCompany) return `${selectedCompany} Adjusters in ${stateNames[selectedState]}`
    if (selectedState) return `Adjusters in ${stateNames[selectedState]}`
    if (selectedCompany) return `${selectedCompany} Adjusters`
    return 'Browse Insurance Adjusters'
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading...' : `${adjusters.length} adjuster${adjusters.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All States</option>
              {stateAbbreviations.map((abbr) => (
                <option key={abbr} value={abbr}>
                  {abbr} - {stateNames[abbr]}
                </option>
              ))}
            </select>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Companies</option>
              {majorCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 font-medium">{error}</p>
            {debugInfo && (
              <pre className="mt-2 text-xs text-red-600 overflow-auto">{debugInfo}</pre>
            )}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-64 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && adjusters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No adjusters found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <Link
              href="/add-adjuster"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Add a New Adjuster
            </Link>
          </div>
        )}

        {/* Results list */}
        {!loading && adjusters.length > 0 && (
          <div className="space-y-4">
            {adjusters.map((adjuster) => (
              <Link
                key={adjuster.id}
                href={`/adjuster/${adjuster.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {getInitials(adjuster.first_name, adjuster.last_name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {adjuster.first_name} {adjuster.last_name}
                    </h3>
                    <p className="text-gray-600 truncate">
                      {adjuster.company_name || 'Independent Adjuster'}
                      {adjuster.city && ` • ${adjuster.city}`}
                      {adjuster.state && `, ${adjuster.state}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRatingDisplay rating={adjuster.avg_rating || 0} />
                      <span className="text-gray-900 font-medium">
                        {adjuster.avg_rating ? adjuster.avg_rating.toFixed(1) : '0.0'}
                      </span>
                      <span className="text-gray-500">
                        ({adjuster.total_reviews || 0} review{(adjuster.total_reviews || 0) !== 1 ? 's' : ''})
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-blue-600 font-medium">View Profile →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Add adjuster CTA at bottom */}
        {!loading && adjusters.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-3">Can&#39;t find the adjuster you&#39;re looking for?</p>
            <Link
              href="/add-adjuster"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Add a New Adjuster
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50">
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-64 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
