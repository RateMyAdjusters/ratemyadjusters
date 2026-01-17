'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Adjuster {
  id: string
  slug: string
  first_name: string
  last_name: string
  state: string
  avg_rating: number | null
  total_reviews: number
  company_name?: string
}

interface SearchBarProps {
  size?: 'default' | 'large'
  showFilters?: boolean
  autoFocus?: boolean
  className?: string
}

export default function SearchBar({
  size = 'default',
  showFilters = false,
  autoFocus = false,
  className = ''
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Adjuster[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedState, setSelectedState] = useState('')

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const requestIdRef = useRef(0)

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Debounced search - 300ms delay
  useEffect(() => {
    const q = query.trim()

    if (q.length < 2) {
      setResults([])
      setOpen(false)
      return
    }

    const timer = setTimeout(() => {
      searchAdjusters(q)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  async function searchAdjusters(q: string) {
    setLoading(true)

    // Increment request ID and capture locally
    requestIdRef.current++
    const currentRequestId = requestIdRef.current

    try {
      const parts = q.split(/\s+/).filter(Boolean)
      let allData: any[] = []

      // Two-word search: "Giovanni Odeh" -> first_name ILIKE 'Giovanni%' AND last_name ILIKE 'Odeh%'
      if (parts.length >= 2) {
        const firstName = parts[0]
        const lastName = parts.slice(1).join(' ')

        // Exact match query
        const exactResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('first_name', `${firstName}%`)
          .ilike('last_name', `${lastName}%`)
          .limit(20)

        // Fuzzy: also try with shorter prefixes for typo tolerance (min 2 chars)
        const fuzzyFirstName = firstName.length > 2 ? firstName.slice(0, Math.max(2, firstName.length - 1)) : firstName
        const fuzzyLastName = lastName.length > 2 ? lastName.slice(0, Math.max(2, lastName.length - 1)) : lastName

        const fuzzyResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('first_name', `${fuzzyFirstName}%`)
          .ilike('last_name', `${fuzzyLastName}%`)
          .limit(20)

        allData = [...(exactResult.data || []), ...(fuzzyResult.data || [])]
      }
      // Single-word search
      else {
        // Exact prefix match on first_name and last_name
        const firstNameResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('first_name', `${q}%`)
          .limit(20)

        const lastNameResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('last_name', `${q}%`)
          .limit(20)

        // Fuzzy: shorter prefix for typo tolerance (min 2 chars)
        const fuzzyQ = q.length > 2 ? q.slice(0, Math.max(2, q.length - 1)) : q

        const fuzzyFirstResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('first_name', `${fuzzyQ}%`)
          .limit(15)

        const fuzzyLastResult = await supabase
          .from("adjusters")
          .select("id, slug, first_name, last_name, state, avg_rating, total_reviews, companies(name)")
          .ilike('last_name', `${fuzzyQ}%`)
          .limit(15)

        allData = [
          ...(firstNameResult.data || []),
          ...(lastNameResult.data || []),
          ...(fuzzyFirstResult.data || []),
          ...(fuzzyLastResult.data || [])
        ]
      }

      // Only apply results if this is still the current request
      if (currentRequestId !== requestIdRef.current) {
        return
      }

      const qLower = q.toLowerCase()
      const partsLower = parts.map(p => p.toLowerCase())

      // Sort by total_reviews DESC before deduplication to keep the entry with reviews
      allData.sort((a, b) => (b.total_reviews || 0) - (a.total_reviews || 0))

      // Deduplicate by first_name + last_name + state (keeps first = most reviewed)
      const seen = new Set()
      let uniqueAdjusters = allData.filter(adj => {
        const key = `${adj.first_name.toLowerCase()}-${adj.last_name.toLowerCase()}-${adj.state}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      }).map(adj => ({
        ...adj,
        company_name: (adj.companies as { name: string } | null)?.name || undefined
      }))

      // Fetch LIVE review counts from reviews table
      if (uniqueAdjusters.length > 0) {
        const adjusterIds = uniqueAdjusters.map(a => a.id)
        const { data: reviewData } = await supabase
          .from('reviews')
          .select('adjuster_id, overall_rating')
          .in('adjuster_id', adjusterIds)

        const reviewStats: { [id: string]: { count: number; total: number } } = {}
        for (const review of (reviewData || [])) {
          if (!reviewStats[review.adjuster_id]) {
            reviewStats[review.adjuster_id] = { count: 0, total: 0 }
          }
          reviewStats[review.adjuster_id].count++
          reviewStats[review.adjuster_id].total += review.overall_rating
        }

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

      // Smart sort: exact match > starts with > has reviews > highest rated
      uniqueAdjusters.sort((a, b) => {
        const aFirstLower = a.first_name.toLowerCase()
        const aLastLower = a.last_name.toLowerCase()
        const bFirstLower = b.first_name.toLowerCase()
        const bLastLower = b.last_name.toLowerCase()

        // For two-word search, prioritize full name match
        if (parts.length >= 2) {
          const aFullMatch = aFirstLower.startsWith(partsLower[0]) && aLastLower.startsWith(partsLower[1])
          const bFullMatch = bFirstLower.startsWith(partsLower[0]) && bLastLower.startsWith(partsLower[1])
          if (aFullMatch && !bFullMatch) return -1
          if (!aFullMatch && bFullMatch) return 1
        }

        // Exact first name match wins
        const aFirstExact = aFirstLower === qLower || (partsLower[0] && aFirstLower === partsLower[0])
        const bFirstExact = bFirstLower === qLower || (partsLower[0] && bFirstLower === partsLower[0])
        if (aFirstExact && !bFirstExact) return -1
        if (!aFirstExact && bFirstExact) return 1

        // Exact last name match
        const aLastExact = aLastLower === qLower || (partsLower[1] && aLastLower === partsLower[1])
        const bLastExact = bLastLower === qLower || (partsLower[1] && bLastLower === partsLower[1])
        if (aLastExact && !bLastExact) return -1
        if (!aLastExact && bLastExact) return 1

        // Then by number of reviews (most reviewed first)
        if ((a.total_reviews || 0) !== (b.total_reviews || 0)) {
          return (b.total_reviews || 0) - (a.total_reviews || 0)
        }
        // Then by rating
        return (b.avg_rating || 0) - (a.avg_rating || 0)
      })

      setTotalCount(uniqueAdjusters.length)
      setResults(uniqueAdjusters.slice(0, 5))
      setOpen(true)
    } catch (error) {
      // Only apply if still current request
      if (currentRequestId === requestIdRef.current) {
        console.error('Search error:', error)
        setResults([])
        setTotalCount(0)
      }
    }

    // Only update loading if still current request
    if (currentRequestId === requestIdRef.current) {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      let url = `/search?query=${encodeURIComponent(query.trim())}`
      if (selectedState) url += `&state=${selectedState}`
      router.push(url)
      setOpen(false)
    }
  }

  function handleResultClick(slug: string) {
    router.push(`/adjuster/${slug}`)
    setOpen(false)
  }

  function clearSearch() {
    setQuery('')
    setResults([])
    setOpen(false)
    inputRef.current?.focus()
  }

  const isLarge = size === 'large'

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className={`
          flex items-center bg-white rounded-full border border-gray-200 shadow-sm
          ${isLarge ? 'shadow-lg' : ''}
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
          transition-all duration-200
        `}>
          {/* Search Icon */}
          <div className={`${isLarge ? 'pl-6' : 'pl-4'}`}>
            <Search className={`text-gray-400 ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && results.length > 0 && setOpen(true)}
            placeholder="Search adjuster name, company, or state..."
            autoFocus={autoFocus}
            className={`
              flex-1 bg-transparent outline-none text-gray-900
              ${isLarge ? 'py-5 px-4 text-lg' : 'py-3 px-3 text-base'}
              placeholder-gray-400
            `}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 hover:bg-gray-100 rounded-full mr-1"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}

          {/* Filters (optional) */}
          {showFilters && (
            <div className="hidden sm:flex items-center border-l border-gray-200 px-3 gap-2">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-sm text-gray-600 outline-none cursor-pointer py-2"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className={`
              bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full
              transition-colors
              ${isLarge ? 'py-4 px-8 mr-2 text-lg' : 'py-2 px-5 mr-1.5 text-sm'}
            `}
          >
            Search
          </button>
        </div>
      </form>

      {/* Loading Spinner */}
      {open && loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-5 py-6 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      )}

      {/* Dropdown Results */}
      {open && !loading && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="py-2">
            {results.map((adjuster) => (
              <button
                key={adjuster.id}
                type="button"
                onClick={() => handleResultClick(adjuster.slug)}
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">
                    {adjuster.first_name?.[0]}{adjuster.last_name?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {adjuster.first_name} {adjuster.last_name}
                    <span className="text-gray-500 font-normal">
                      {' '}({adjuster.state}{adjuster.company_name ? ` – ${adjuster.company_name}` : ''})
                    </span>
                  </p>
                  {adjuster.total_reviews > 0 && (
                    <p className="text-sm text-gray-500 truncate flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {adjuster.avg_rating?.toFixed(1) || '–'} · {adjuster.total_reviews} review{adjuster.total_reviews !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* View All Results */}
          <div className="border-t border-gray-100">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full px-5 py-3 text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors flex items-center justify-center gap-1"
            >
              View all {totalCount > 5 ? totalCount : ''} results for "{query}" →
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {open && !loading && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-5 py-8 text-center">
            <p className="text-gray-500">No matches</p>
            <p className="text-sm text-gray-400 mt-1">Try a different name or spelling</p>
          </div>
        </div>
      )}
    </div>
  )
}
