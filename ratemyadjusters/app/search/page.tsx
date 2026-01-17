'use client'

import { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  slug: string
  state: string
  avg_rating: number | null
  total_reviews: number | null
  company_name?: string | null
}

interface SearchResponse {
  adjusters: Adjuster[]
  total: number
  displayTotal?: string | number
  page: number
  totalPages: number
  stateBreakdown?: { [key: string]: number } | null
  topResults?: Adjuster[] | null
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-warm-500' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function AdjusterCard({ adjuster, rank }: { adjuster: Adjuster; rank?: number }) {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const isTopRated = (adjuster.avg_rating || 0) >= 4.5 && (adjuster.total_reviews || 0) >= 3
  const isMostReviewed = (adjuster.total_reviews || 0) >= 10

  return (
    <Link
      href={`/adjuster/${adjuster.slug}`}
      className="group bg-white rounded-xl p-4 md:p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 hover:border-teal-200 flex items-center gap-4"
    >
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-navy-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
          <span className="text-white font-bold text-lg">
            {getInitials(adjuster.first_name, adjuster.last_name)}
          </span>
        </div>
        {rank && rank <= 3 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-warm-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow">
            {rank}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-gray-900 text-lg group-hover:text-teal-600 transition-colors truncate">
            {adjuster.first_name} {adjuster.last_name}
          </h3>
          {isTopRated && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Top Rated
            </span>
          )}
          {isMostReviewed && !isTopRated && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Most Reviewed
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
          <span className="text-gray-500 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {adjuster.state ? stateNames[adjuster.state] || adjuster.state : 'Unknown'}
          </span>
          {adjuster.company_name && (
            <span className="text-gray-400 text-sm">
              {adjuster.company_name}
            </span>
          )}
          <div className="flex items-center gap-1">
            <StarRating rating={adjuster.avg_rating || 0} />
            <span className="text-gray-900 font-medium text-sm ml-1">
              {adjuster.avg_rating ? Number(adjuster.avg_rating).toFixed(1) : '0.0'}
            </span>
            <span className="text-gray-400 text-sm">
              ({adjuster.total_reviews || 0})
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center text-gray-300 group-hover:text-teal-500 transition-colors">
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  if (totalPages <= 1) return null

  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (page > 3) pages.push('...')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-offwhite disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {pages.map((p, i) => (
        typeof p === 'number' ? (
          <button
            key={i}
            onClick={() => onPageChange(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              p === page
                ? 'bg-warm-500 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-offwhite'
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={i} className="px-2 text-gray-400">...</span>
        )
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-offwhite disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [hasReviews, setHasReviews] = useState(false)
  const [minRating, setMinRating] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Load URL params on mount
  useEffect(() => {
    const urlQuery = searchParams.get('q') || searchParams.get('query') || ''
    const urlState = searchParams.get('state')?.toUpperCase() || ''
    const urlHasReviews = searchParams.get('hasReviews') === 'true'
    const urlMinRating = searchParams.get('minRating') === '4'
    const urlPage = parseInt(searchParams.get('page') || '1')

    setSearchTerm(urlQuery)
    setSelectedState(stateAbbreviations.includes(urlState) ? urlState : '')
    setHasReviews(urlHasReviews)
    setMinRating(urlMinRating)
    setCurrentPage(urlPage)
    setMounted(true)
  }, [searchParams])

  // Update URL when filters change
  const updateURL = useCallback((newParams: { q?: string; state?: string; hasReviews?: boolean; minRating?: boolean; page?: number }) => {
    const params = new URLSearchParams()

    const q = newParams.q ?? searchTerm
    const state = newParams.state ?? selectedState
    const reviews = newParams.hasReviews ?? hasReviews
    const rating = newParams.minRating ?? minRating
    const page = newParams.page ?? currentPage

    if (q.trim()) params.set('q', q.trim())
    if (state) params.set('state', state)
    if (reviews) params.set('hasReviews', 'true')
    if (rating) params.set('minRating', '4')
    if (page > 1) params.set('page', page.toString())

    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search'
    router.push(newUrl, { scroll: false })
  }, [searchTerm, selectedState, hasReviews, minRating, currentPage, router])

  const hasFilter = searchTerm.trim().length >= 2 || selectedState !== ''

  // Server-side search with debounce
  const doSearch = useCallback(async () => {
    if (!hasFilter) {
      setData(null)
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
      if (hasReviews) params.set('hasReviews', 'true')
      if (minRating) params.set('minRating', '4')
      params.set('page', currentPage.toString())

      const response = await fetch(`/api/search?${params.toString()}`)

      if (currentRequestId !== requestIdRef.current) return

      if (!response.ok) {
        setData(null)
        return
      }

      const responseData = await response.json()

      if (currentRequestId !== requestIdRef.current) return

      setData(responseData)
    } catch (err) {
      if (currentRequestId !== requestIdRef.current) return
      console.error('Search error:', err)
      setData(null)
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }, [searchTerm, selectedState, hasReviews, minRating, currentPage, hasFilter])

  // Debounced search - 300ms delay
  useEffect(() => {
    if (!mounted) return

    const timer = setTimeout(doSearch, 300)
    return () => clearTimeout(timer)
  }, [mounted, doSearch])

  // Reset to page 1 when filters change
  const handleFilterChange = (type: 'state' | 'hasReviews' | 'minRating', value: any) => {
    setCurrentPage(1)
    if (type === 'state') {
      setSelectedState(value)
      updateURL({ state: value, page: 1 })
    } else if (type === 'hasReviews') {
      setHasReviews(value)
      updateURL({ hasReviews: value, page: 1 })
    } else if (type === 'minRating') {
      setMinRating(value)
      updateURL({ minRating: value, page: 1 })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    updateURL({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedState('')
    setHasReviews(false)
    setMinRating(false)
    setCurrentPage(1)
    router.push('/search')
  }

  const activeFilterCount = [selectedState, hasReviews, minRating].filter(Boolean).length

  if (!mounted) {
    return (
      <main className="min-h-screen bg-offwhite">
        <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="h-10 bg-white/20 rounded-lg w-72 animate-pulse mb-4" />
            <div className="h-6 bg-white/10 rounded w-48 animate-pulse mb-8" />
            <div className="bg-white/10 rounded-2xl h-20 animate-pulse" />
          </div>
        </div>
      </main>
    )
  }

  const adjusters = data?.adjusters || []
  const total = data?.total || 0
  const displayTotal = data?.displayTotal ?? total
  const totalPages = data?.totalPages || 0
  const stateBreakdown = data?.stateBreakdown
  const topResults = data?.topResults

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Insurance Adjusters</h1>
          <p className="text-white/80 text-lg mb-8">Search adjusters nationwide by name or state</p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-3xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by name (e.g. John Smith)..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateURL({ q: searchTerm, page: 1 })
                    }
                  }}
                  className="w-full pl-12 pr-10 py-4 text-gray-900 text-lg rounded-xl border-0 focus:ring-2 focus:ring-teal-500 bg-offwhite focus:bg-white transition-colors placeholder-gray-400"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setCurrentPage(1)
                      updateURL({ q: '', page: 1 })
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={() => updateURL({ q: searchTerm, page: 1 })}
                className="bg-warm-500 hover:bg-warm-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Quick State Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['CA', 'TX', 'FL', 'NY', 'IL', 'PA'].map((state) => (
              <button
                key={state}
                onClick={() => handleFilterChange('state', selectedState === state ? '' : state)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedState === state
                    ? 'bg-white text-teal-700 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {stateNames[state]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-teal-600 hover:text-teal-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* State Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value="">All States</option>
                  {stateAbbreviations.map((abbr) => (
                    <option key={abbr} value={abbr}>{stateNames[abbr]}</option>
                  ))}
                </select>
              </div>

              {/* Has Reviews Toggle */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasReviews}
                    onChange={(e) => handleFilterChange('hasReviews', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700">Has reviews</span>
                </label>
              </div>

              {/* Rating 4+ Toggle */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minRating}
                    onChange={(e) => handleFilterChange('minRating', e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-gray-700 flex items-center gap-1">
                    4+ stars
                    <svg className="w-4 h-4 text-warm-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </label>
              </div>

              {/* State Breakdown (when > 50 results) */}
              {stateBreakdown && Object.keys(stateBreakdown).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Results by State</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {Object.entries(stateBreakdown)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 10)
                      .map(([state, count]) => (
                        <button
                          key={state}
                          onClick={() => handleFilterChange('state', state)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedState === state
                              ? 'bg-teal-50 text-teal-700'
                              : 'hover:bg-offwhite text-gray-600'
                          }`}
                        >
                          <span>{stateNames[state] || state}</span>
                          <span className="text-gray-400">{count}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden fixed bottom-4 right-4 z-40 bg-warm-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-white text-teal-600 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowMobileFilters(false)}>
              <div
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold text-gray-900 text-lg">Filters</h2>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* State Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-200 rounded-lg text-gray-700 text-base"
                  >
                    <option value="">All States</option>
                    {stateAbbreviations.map((abbr) => (
                      <option key={abbr} value={abbr}>{stateNames[abbr]}</option>
                    ))}
                  </select>
                </div>

                {/* Has Reviews Toggle */}
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasReviews}
                      onChange={(e) => handleFilterChange('hasReviews', e.target.checked)}
                      className="w-6 h-6 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Has reviews</span>
                  </label>
                </div>

                {/* Rating 4+ Toggle */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={minRating}
                      onChange={(e) => handleFilterChange('minRating', e.target.checked)}
                      className="w-6 h-6 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700 flex items-center gap-1">
                      4+ stars
                      <svg className="w-4 h-4 text-warm-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      clearAllFilters()
                      setShowMobileFilters(false)
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl font-medium text-gray-700"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 py-3 bg-warm-500 text-white rounded-xl font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            {hasFilter && (
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <>
                      <span className="font-semibold text-gray-900">{displayTotal}</span>
                      {' '}adjuster{total !== 1 ? 's' : ''} found
                      {searchTerm && <span className="text-gray-500"> for &quot;{searchTerm}&quot;</span>}
                      {selectedState && <span className="text-gray-500"> in {stateNames[selectedState]}</span>}
                    </>
                  )}
                </p>
                {(searchTerm || selectedState || hasReviews || minRating) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Initial State - No Search Yet */}
            {!hasFilter && !loading && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Find Your Adjuster</h2>
                <p className="text-gray-500 mb-2 max-w-md mx-auto text-lg">
                  Enter a name or select a state to get started
                </p>
                <p className="text-gray-400 text-sm">
                  Example: &quot;John Smith&quot;, &quot;Daniel&quot;, or just pick a state above
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-5 animate-pulse border border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-32" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results - Empty State */}
            {!loading && hasSearched && adjusters.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  {/* Shield Icon */}
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                    This adjuster doesn&apos;t have a public profile yet
                  </h3>

                  <p className="text-gray-600 mb-8 max-w-md mx-auto text-center text-lg">
                    Your input helps create transparency for other policyholders
                  </p>

                  {/* Ghost Preview */}
                  <div className="max-w-sm mx-auto mb-8 p-4 bg-offwhite rounded-xl border border-gray-200 border-dashed">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Profile Preview</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-navy-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {searchTerm ? searchTerm.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{searchTerm || 'Adjuster Name'}</p>
                        <p className="text-sm text-gray-500">{selectedState ? stateNames[selectedState] : 'State'} · Company</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-warm-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">Created once you submit</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <Link
                      href="/add-adjuster"
                      className="inline-flex items-center gap-2 bg-warm-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-warm-600 transition-all hover:shadow-lg hover:scale-[1.02] text-lg"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Start Their Public Profile
                    </Link>
                    <p className="text-sm text-gray-500 mt-4">
                      Takes under 30 seconds · Helps others make informed decisions
                    </p>
                  </div>
                </div>

                <div className="bg-offwhite px-8 py-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 text-center">
                    Not seeing who you&apos;re looking for? Some adjusters aren&apos;t listed yet — you&apos;re early.
                  </p>
                </div>
              </div>
            )}

            {/* Top Results Section (when > 50 results) */}
            {!loading && topResults && topResults.length > 0 && currentPage === 1 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-warm-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Top Results
                </h2>
                <div className="grid gap-3">
                  {topResults.map((adjuster, index) => (
                    <AdjusterCard key={adjuster.id} adjuster={adjuster} rank={index + 1} />
                  ))}
                </div>
              </div>
            )}

            {/* All Results Section */}
            {!loading && adjusters.length > 0 && (
              <>
                {topResults && topResults.length > 0 && currentPage === 1 && (
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">All Results</h2>
                )}
                <div className="grid gap-3">
                  {adjusters.map((adjuster) => (
                    <AdjusterCard key={adjuster.id} adjuster={adjuster} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}

            {/* Bottom CTA */}
            {!loading && adjusters.length > 0 && (
              <div className="mt-12">
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-teal-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">Not seeing who you&apos;re looking for?</p>
                      <p className="text-gray-600">Some adjusters aren&apos;t listed yet — you can be the first to add them.</p>
                    </div>
                    <Link
                      href="/add-adjuster"
                      className="inline-flex items-center gap-2 bg-warm-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-warm-600 transition-all hover:shadow-lg whitespace-nowrap"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Start Their Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-offwhite">
          <div className="bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="h-10 bg-white/20 rounded-lg w-72 animate-pulse mb-4" />
              <div className="h-6 bg-white/10 rounded w-48 animate-pulse mb-8" />
              <div className="bg-white/10 rounded-2xl h-20 animate-pulse" />
            </div>
          </div>
        </main>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
