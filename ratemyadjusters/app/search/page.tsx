'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  full_name: string
  slug: string
  company: { name: string; slug: string } | null
  title: string | null
  state: string | null
  avg_rating: number
  total_reviews: number
}

interface Company {
  id: string
  name: string
  slug: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [adjusters, setAdjusters] = useState<Adjuster[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ]

  useEffect(() => {
    fetchCompanies()
    fetchAdjusters()
  }, [])

  async function fetchCompanies() {
    const { data } = await supabase
      .from('companies')
      .select('id, name, slug')
      .order('name')
    if (data) setCompanies(data)
  }

  async function fetchAdjusters() {
    setLoading(true)
    const { data, error } = await supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        full_name,
        slug,
        title,
        state,
        avg_rating,
        total_reviews,
        company:companies(name, slug)
      `)
      .order('total_reviews', { ascending: false })
      .limit(50)
    
    if (data) {
      setAdjusters(data as Adjuster[])
    }
    setLoading(false)
  }

  async function handleSearch() {
    setLoading(true)
    let query = supabase
      .from('adjusters')
      .select(`
        id,
        first_name,
        last_name,
        full_name,
        slug,
        title,
        state,
        avg_rating,
        total_reviews,
        company:companies(name, slug)
      `)

    if (searchQuery) {
      query = query.or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`)
    }

    if (selectedCompany) {
      query = query.eq('company_id', selectedCompany)
    }

    if (selectedState) {
      query = query.eq('state', selectedState)
    }

    query = query.order('total_reviews', { ascending: false }).limit(50)

    const { data } = await query

    if (data) {
      setAdjusters(data as Adjuster[])
    }
    setLoading(false)
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Find an Adjuster</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by adjuster name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : adjusters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No adjusters found</p>
            <p className="text-gray-400 mt-2">Try a different search or add a new adjuster</p>
            <Link href="/review" className="inline-block mt-4 text-blue-600 hover:underline">
              Add an adjuster →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">{adjusters.length} adjuster{adjusters.length !== 1 ? 's' : ''} found</p>
            <div className="space-y-4">
              {adjusters.map((adjuster) => (
                <Link
                  key={adjuster.id}
                  href={`/adjuster/${adjuster.company?.slug || 'unknown'}/${adjuster.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">
                        {getInitials(adjuster.first_name, adjuster.last_name)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{adjuster.full_name}</h3>
                      <p className="text-gray-600">
                        {adjuster.company?.name || 'Unknown Company'}
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
          </>
        )}
      </div>
    </main>
  )
}
