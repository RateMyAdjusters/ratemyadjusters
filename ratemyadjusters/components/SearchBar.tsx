'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, User, MapPin, Star, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Adjuster {
  id: string
  slug: string
  first_name: string
  last_name: string
  state: string
  avg_rating: number | null
  total_reviews: number
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
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

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
        setSelectedIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!open) return

      if (event.key === 'Escape') {
        setOpen(false)
        setSelectedIndex(-1)
      } else if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, -1))
      } else if (event.key === 'Enter' && selectedIndex >= 0) {
        event.preventDefault()
        handleResultClick(results[selectedIndex].slug)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex])

  // Simplified, single-query search
  const searchAdjusters = useCallback(async (searchQuery: string) => {
    const q = searchQuery.trim()

    if (q.length < 2) {
      setResults([])
      setTotalCount(0)
      setOpen(false)
      return
    }

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    setLoading(true)

    try {
      const parts = q.split(/\s+/).filter(Boolean)

      // Fast query - minimal fields, small limit
      let queryBuilder = supabase
        .from("adjusters")
        .select("id, slug, first_name, last_name, state, avg_rating, total_reviews")

      if (parts.length >= 2) {
        queryBuilder = queryBuilder
          .ilike('first_name', `${parts[0]}%`)
          .ilike('last_name', `${parts.slice(1).join(' ')}%`)
      } else {
        queryBuilder = queryBuilder
          .or(`first_name.ilike.${q}%,last_name.ilike.${q}%`)
      }

      const { data, error } = await queryBuilder
        .order('total_reviews', { ascending: false, nullsFirst: false })
        .limit(20)

      if (error) throw error

      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) return

      // Process results - fast dedup
      const seen = new Set<string>()
      const uniqueResults: Adjuster[] = []

      for (const adj of (data || [])) {
        const key = `${adj.first_name}-${adj.last_name}-${adj.state}`.toLowerCase()
        if (seen.has(key)) continue
        seen.add(key)

        uniqueResults.push({
          id: adj.id,
          slug: adj.slug,
          first_name: adj.first_name,
          last_name: adj.last_name,
          state: adj.state,
          avg_rating: adj.avg_rating,
          total_reviews: adj.total_reviews || 0
        })

        if (uniqueResults.length >= 6) break // Stop early
      }

      setTotalCount(data?.length || 0)
      setResults(uniqueResults)
      setOpen(true)
      setSelectedIndex(-1)
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Search error:', error)
        setResults([])
        setTotalCount(0)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Instant search - 20ms debounce
  useEffect(() => {
    const q = query.trim()

    if (q.length >= 2) {
      setLoading(true)
    }

    const timer = setTimeout(() => {
      searchAdjusters(query)
    }, 20)

    return () => clearTimeout(timer)
  }, [query, searchAdjusters])

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
    setQuery('')
  }

  function clearSearch() {
    setQuery('')
    setResults([])
    setTotalCount(0)
    setOpen(false)
    inputRef.current?.focus()
  }

  const isLarge = size === 'large'

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className={`
          flex items-center bg-white rounded-2xl border-2
          ${isLarge ? 'border-white/20 shadow-2xl' : 'border-[#EEEEEE] shadow-sm'}
          focus-within:border-[#0A3D62] focus-within:ring-4 focus-within:ring-[#0A3D62]/10
          transition-all duration-300 ease-out
          ${isLarge ? 'hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]' : 'hover:shadow-md hover:border-[#0A3D62]/30'}
        `}>
          {/* Search Icon */}
          <div className={`flex items-center justify-center ${isLarge ? 'pl-6' : 'pl-4'}`}>
            {loading ? (
              <Loader2 className={`text-[#0A3D62] animate-spin ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
            ) : (
              <Search className={`text-[#666666] ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim().length >= 2 && results.length > 0 && setOpen(true)}
            placeholder={isLarge ? "Search by adjuster name, company, or state..." : "Search adjusters..."}
            autoFocus={autoFocus}
            autoComplete="off"
            className={`
              flex-1 bg-transparent outline-none text-[#333333]
              ${isLarge ? 'py-5 px-4 text-lg' : 'py-3.5 px-3 text-base'}
              placeholder-[#999999]
            `}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 hover:bg-[#F8F9FA] rounded-full mr-1 transition-colors"
            >
              <X className="w-5 h-5 text-[#666666]" />
            </button>
          )}

          {/* State Filter */}
          {showFilters && (
            <div className="hidden sm:flex items-center border-l border-[#EEEEEE] px-3">
              <MapPin className="w-4 h-4 text-[#999999] mr-1" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-sm text-[#666666] outline-none cursor-pointer py-2 pr-2 font-medium"
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
              bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold rounded-xl
              transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              ${isLarge ? 'py-4 px-8 mr-2 text-lg shadow-lg hover:shadow-xl' : 'py-2.5 px-5 mr-1.5 text-sm'}
            `}
          >
            Search
          </button>
        </div>
      </form>

      {/* Dropdown Results */}
      {open && (
        <div
          className={`
            absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl
            border border-[#EEEEEE] overflow-hidden z-50
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
        >
          {/* Results List */}
          {results.length > 0 ? (
            <>
              <div className="py-2 max-h-[360px] overflow-y-auto">
                {results.map((adjuster, index) => (
                  <button
                    key={adjuster.id}
                    type="button"
                    onClick={() => handleResultClick(adjuster.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`
                      flex items-center gap-4 px-5 py-3.5 w-full text-left transition-all duration-150
                      ${selectedIndex === index ? 'bg-[#F8F9FA]' : 'hover:bg-[#F8F9FA]'}
                    `}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A3D62] to-[#20A39E] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">
                        {adjuster.first_name?.[0]}{adjuster.last_name?.[0]}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#333333] truncate text-base">
                        {adjuster.first_name} {adjuster.last_name}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-[#666666]">
                        <MapPin className="w-3.5 h-3.5" />
                        {adjuster.state}
                      </p>
                    </div>

                    {/* Rating Badge */}
                    {adjuster.total_reviews > 0 ? (
                      <div className="flex flex-col items-end flex-shrink-0">
                        <div className="flex items-center gap-1 bg-[#FFF8E1] px-2.5 py-1 rounded-lg">
                          <Star className="w-4 h-4 text-[#FF9800] fill-[#FF9800]" />
                          <span className="font-bold text-[#333333]">{adjuster.avg_rating?.toFixed(1) || '–'}</span>
                        </div>
                        <span className="text-xs text-[#999999] mt-1">
                          {adjuster.total_reviews} review{adjuster.total_reviews !== 1 ? 's' : ''}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-[#999999] bg-[#F8F9FA] px-2.5 py-1.5 rounded-lg">
                        No reviews yet
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* View All Results */}
              {totalCount > 6 && (
                <div className="border-t border-[#EEEEEE]">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full px-5 py-4 text-sm text-[#0A3D62] hover:bg-[#F8F9FA] font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    View all {totalCount} results for "{query}"
                    <span className="text-[#0A3D62]">→</span>
                  </button>
                </div>
              )}
            </>
          ) : query.trim().length >= 2 && !loading ? (
            /* No Results */
            <div className="px-6 py-10 text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#CCCCCC]" />
              </div>
              <p className="text-[#333333] font-medium mb-1">No adjusters found</p>
              <p className="text-sm text-[#666666]">Try a different name or check your spelling</p>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 text-sm text-[#0A3D62] hover:underline font-medium"
              >
                Search all results →
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
