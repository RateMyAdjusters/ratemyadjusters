'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

function SearchContent() {
  const searchParams = useSearchParams()
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [adjusters, setAdjusters] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)

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

  const states = Object.keys(stateNames)

  useEffect(() => {
    fetchCompanies()
    const q = searchParams.get('q')?.trim() || ''
    const stateParam = searchParams.get('state')?.trim().toUpperCase() || ''
    
    if (stateParam && states.includes(stateParam)) {
      setSelectedState(stateParam)
    }
    
    if (q) {
      setSearchTerm(q)
    } else if (!stateParam) {
      fetchAdjusters()
    }
  }, [searchParams])

  useEffect(() => {
    if (searchTerm || selectedCompany || selectedState) {
      applyFilters()
    }
  }, [searchTerm, selectedCompany, selectedState])

  async function fetchCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, slug')
      .order('name')
    if (error) {
      console.error('Error fetching companies:', error)
      return
    }
    if (data) setCompanies(data)
  }

  async function fetchAdjusters() {
    setLoading(true)
    setError(null)
    
    const { data, error } = await supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        slug,
        title,
        state,
        avg_rating,
        total_reviews,
        companies(name, slug)
      `)
      .order('total_reviews', { ascending: false })
      .limit(50)
    
    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }
    
    if (data) setAdjusters(data)
    setLoading(false)
  }

  function parseSearchTerm(term: string) {
    const normalized = term.trim().toLowerCase()
    
    // Check if it's a state abbreviation (e.g., "TX", "tx")
    const upperTerm = term.trim().toUpperCase()
    if (states.includes(upperTerm)) {
      return { type: 'state', value: upperTerm }
    }
    
    // Check if it's a full state name (e.g., "Texas", "texas")
    for (const [abbrev, name] of Object.entries(stateNames)) {
      if (name.toLowerCase() === normalized) {
        return { type: 'state', value: abbrev }
      }
    }
    
    // Check if it's a company name
    const matchedCompany = companies.find(c => 
      c.name.toLowerCase().includes(normalized) || 
      c.slug.toLowerCase().includes(normalized)
    )
    if (matchedCompany) {
      return { type: 'company', value: matchedCompany.id, name: matchedCompany.name }
    }
    
    // Otherwise treat as name search
    const words = term.trim().split(/\s+/)
    if (words.length >= 2) {
      return { type: 'fullname', firstName: words[0], lastName: words.slice(1).join(' ') }
    }
    
    return { type: 'name', value: term.trim() }
  }

  async function applyFilters() {
    setLoading(true)
    setError(null)
    
    let query = supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        slug,
        title,
        state,
        avg_rating,
        total_reviews,
        companies(name, slug)
      `)

    if (searchTerm) {
      const parsed = parseSearchTerm(searchTerm)
      
      if (parsed.type === 'state') {
        query = query.eq('state', parsed.value)
      } else if (parsed.type === 'company') {
        query = query.eq('company_id', parsed.value)
      } else if (parsed.type === 'fullname') {
        query = query
          .filter('first_name', 'ilike', `%${parsed.firstName}%`)
          .filter('last_name', 'ilike', `%${parsed.lastName}%`)
      } else {
        query = query.or(`first_name.ilike.%${parsed.value}%,last_name.ilike.%${parsed.value}%`)
      }
    }

    if (selectedCompany) {
      query = query.eq('company_id', selectedCompany)
    }

    if (selectedState) {
      query = query.eq('state', selectedState)
    }

    const { data, error } = await query.order('total_reviews', { ascending: false }).limit(50)

    if (error) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    if (data) setAdjusters(data)
    setLoading(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
  }

  const getCompanyName = (adj: any) => {
    if (adj.companies) return adj.companies.name
    return 'Unknown Company'
  }

  const getSearchDescription = () => {
    if (!searchTerm) return 'All Adjusters'
    
    const parsed = parseSearchTerm(searchTerm)
    if (parsed.type === 'state') {
      return `Adjusters in ${stateNames[parsed.value] || parsed.value}`
    }
    if (parsed.type === 'company') {
      return `${parsed.name} Adjusters`
    }
    return `Results for "${searchTerm}"`
  }

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {getSearchDescription()}
              </h1>
              {!loading && !error && (
                <p className="text-gray-600 mt-1">
                  {adjusters.length} adjuster{adjusters.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="">All Companies</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
              
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
              >
                <option value="">All States</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state} - {stateNames[state]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : adjusters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No adjusters found</p>
            <p className="text-gray-400 mt-2">Try a different search or adjust filters</p>
            <Link 
              href={`/review${searchTerm ? `?name=${encodeURIComponent(searchTerm)}` : ''}`}
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Can't find your adjuster? Add them now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {adjusters.map((adjuster) => (
              <Link
                key={adjuster.id}
                href={`/adjuster/${adjuster.slug}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {getInitials(adjuster.first_name, adjuster.last_name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {adjuster.first_name} {adjuster.last_name}
                    </h3>
                    <p className="text-gray-600">
                      {getCompanyName(adjuster)}
                      {adjuster.title && ` • ${adjuster.title}`}
                      {adjuster.state && ` • ${adjuster.state}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={adjuster.avg_rating || 0} />
                      <span className="text-gray-700 font-medium">{adjuster.avg_rating?.toFixed(1) || '0.0'}</span>
                      <span className="text-gray-500">({adjuster.total_reviews || 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
