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

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  // Read URL params on load
  useEffect(() => {
    fetchCompanies()
    const q = searchParams.get('q')
    if (q) {
      setSearchTerm(q)
    } else {
      fetchAdjusters()
    }
  }, [searchParams])

  // Run search when searchTerm or filters change
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
      const words = searchTerm.trim().split(/\s+/)
      if (words.length >= 2) {
        query = query
          .filter('first_name', 'ilike', `%${words[0]}%`)
          .filter('last_name', 'ilike', `%${words[1]}%`)
      } else {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
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

  // Skeleton loader component
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
                {searchTerm ? `Results for "${searchTerm}"` : 'All Adjusters'}
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
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Loading State - Skeleton */}
        {loading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : adjusters.length === 0 ? (
          /* Empty State */
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
          /* Results */
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
