'use client'

import { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
  'Farmers', 'Nationwide', 'Travelers', 'GEICO', 'Sedgwick'
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
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  
  return (
    <div className="flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < fullStars ? 'text-yellow-400' : (i === fullStars && hasHalf) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [minRating, setMinRating] = useState<string>('')
  const [adjusters, setAdjusters] = useState<Adjuster[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const requestIdRef = useRef(0)

  // Sync URL params to state on mount and when URL changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') || ''
    const urlState = searchParams.get('state')?.toUpperCase() || ''
    
    setSearchTerm(urlQuery)
    setSelectedState(stateAbbreviations.includes(urlState) ? urlState : '')
    setMounted(true)
  }, [searchParams])

  const hasFilter = searchTerm.trim() !== '' || selectedState !== '' || selectedCompany !== ''

  const doSearch = useCallback(async () => {
    if (!hasFilter) {
      setAdjusters([])
      setHasSearched(false)
      return
    }

    const currentRequestId = ++requestIdRef.current
    setLoading(true)
    setHasSearched(true)

    try {
      const params = new URLSearchParams()
      if (searchTerm.trim()) params.set('q', searchTerm.trim())
      if (selectedState) params.set('state', selectedState)
      if (selectedCompany) params.set('company', selectedCompany)
      if (minRating) params.set('min_rating', minRating)

      const response = await fetch(`/api/search?${params.toString()}`)

      if (currentRequestId !== requestIdRef.current) return

      if (!response.ok) {
        setAdjusters([])
        return
      }

      const data = await response.json()
      
      if (currentRequestId !== requestIdRef.current) return

      setAdjusters(data.adjusters || [])
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) return
      console.error('Search error:', err)
      setAdjusters([])
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }, [searchTerm, selectedState, selectedCompany, minRating, hasFilter])

  // Run search when filters change (after mount)
  useEffect(() => {
    if (!mounted) return
    
    const timer = setTimeout(doSearch, 100)
    return () => clearTimeout(timer)
  }, [mounted, doSearch])

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const getPageTitle = () => {
    if (searchTerm) return `Results for "${searchTerm}"`
    if (selectedState && selectedCompany) return `${selectedCompany} Adjusters in ${stateNames[selectedState]}`
    if (selectedState) return `Adjusters in ${stateNames[selectedState]}`
    if (selectedCompany) return `${selectedCompany} Adjusters`
    return 'Search Insurance Adjusters'
  }

  // Show loading until mounted
  if (!mounted) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Searching...' : hasSearched ? `${adjusters.length} adjuster${adjusters.length !== 1 ? 's' : ''} found` : 'Enter a name, select a state, or choose a company to search'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search by last name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select State</option>
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
              <option value="">Select Company</option>
              {majorCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Prompt to search */}
        {!hasFilter && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Find Your Adjuster</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Enter an adjuster&apos;s name, select a state, or choose an insurance company to get started.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedState('TX')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                Texas
              </button>
              <button
                onClick={() => setSelectedState('FL')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                Florida
              </button>
              <button
                onClick={() => setSelectedState('CA')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                California
              </button>
              <button
                onClick={() => setSelectedCompany('State Farm')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                State Farm
              </button>
              <button
                onClick={() => setSelectedCompany('Allstate')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                Allstate
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
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
        {!loading && hasSearched && adjusters.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No adjusters found</h2>
            <p className="text-gray-600 mb-6">
              Try a different search or broaden your filters
            </p>
            <Link
              href="/add-adjuster"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Add a New Adjuster
            </Link>
          </div>
        )}

        {/* Results */}
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
                    <span className="text-blue-600 font-medium">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Add adjuster CTA */}
        {!loading && adjusters.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-3">Can&apos;t find who you&apos;re looking for?</p>
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
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading...</p>
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
