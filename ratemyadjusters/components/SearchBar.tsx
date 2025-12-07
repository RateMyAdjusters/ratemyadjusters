'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  slug: string
  state: string
  companies: { name: string } | null
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
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedState, setSelectedState] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timer = setTimeout(() => {
      searchAdjusters(query)
    }, 200)

    return () => clearTimeout(timer)
  }, [query, selectedState, selectedCompany])

  async function searchAdjusters(searchQuery: string) {
    setLoading(true)
    
    const words = searchQuery.trim().split(/\s+/)
    
    let dbQuery = supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        slug,
        state,
        companies(name)
      `)
    
    if (words.length >= 2) {
      // Two words: first + last name
      dbQuery = dbQuery
        .ilike('first_name', `%${words[0]}%`)
        .ilike('last_name', `%${words[1]}%`)
    } else {
      // One word: search both fields
      dbQuery = dbQuery.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
    }

    if (selectedState) {
      dbQuery = dbQuery.eq('state', selectedState)
    }

    const { data, error } = await dbQuery.limit(8)

    if (data && !error) {
      setResults(data)
      setIsOpen(true)
    }
    setLoading(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      let url = `/search?q=${encodeURIComponent(query)}`
      if (selectedState) url += `&state=${selectedState}`
      if (selectedCompany) url += `&company=${selectedCompany}`
      router.push(url)
      setIsOpen(false)
    }
  }

  function clearSearch() {
    setQuery('')
    setResults([])
    setIsOpen(false)
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
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            placeholder="Search adjuster name, company, or state..."
            autoFocus={autoFocus}
            className={`
              flex-1 bg-transparent outline-none
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

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="py-2">
            {results.map((adjuster) => (
              <Link
                key={adjuster.id}
                href={`/adjuster/${adjuster.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">
                    {adjuster.first_name?.[0]}{adjuster.last_name?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {adjuster.first_name} {adjuster.last_name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {adjuster.companies?.name || 'Unknown Company'} • {adjuster.state}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View All Results */}
          <div className="border-t border-gray-100">
            <button
              onClick={handleSubmit}
              className="w-full px-5 py-3 text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
            >
              View all results for "{query}"
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-5 py-8 text-center">
            <p className="text-gray-500">No adjusters found for "{query}"</p>
            <p className="text-sm text-gray-400 mt-1">Try a different name or spelling</p>
          </div>
        </div>
      )}

      {/* Loading */}
      {isOpen && loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
          <div className="px-5 py-6 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  )
}
