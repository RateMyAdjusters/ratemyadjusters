import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Users, Star, MapPin, ChevronRight, ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import SearchBar from '@/components/SearchBar'

interface PageProps {
  params: { state: string }
}

export const revalidate = 3600

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  slug: string
  city: string | null
  avg_rating: number | null
  total_reviews: number
}

interface Review {
  id: string
  overall_rating: number
  review_text: string
  created_at: string
  adjusters: {
    first_name: string
    last_name: string
    slug: string
    state: string
  }
}

interface CityCount {
  city: string
  count: number
}

const STATES: Record<string, { name: string; abbr: string }> = {
  'alabama': { name: 'Alabama', abbr: 'AL' },
  'alaska': { name: 'Alaska', abbr: 'AK' },
  'arizona': { name: 'Arizona', abbr: 'AZ' },
  'arkansas': { name: 'Arkansas', abbr: 'AR' },
  'california': { name: 'California', abbr: 'CA' },
  'colorado': { name: 'Colorado', abbr: 'CO' },
  'connecticut': { name: 'Connecticut', abbr: 'CT' },
  'delaware': { name: 'Delaware', abbr: 'DE' },
  'florida': { name: 'Florida', abbr: 'FL' },
  'georgia': { name: 'Georgia', abbr: 'GA' },
  'hawaii': { name: 'Hawaii', abbr: 'HI' },
  'idaho': { name: 'Idaho', abbr: 'ID' },
  'illinois': { name: 'Illinois', abbr: 'IL' },
  'indiana': { name: 'Indiana', abbr: 'IN' },
  'iowa': { name: 'Iowa', abbr: 'IA' },
  'kansas': { name: 'Kansas', abbr: 'KS' },
  'kentucky': { name: 'Kentucky', abbr: 'KY' },
  'louisiana': { name: 'Louisiana', abbr: 'LA' },
  'maine': { name: 'Maine', abbr: 'ME' },
  'maryland': { name: 'Maryland', abbr: 'MD' },
  'massachusetts': { name: 'Massachusetts', abbr: 'MA' },
  'michigan': { name: 'Michigan', abbr: 'MI' },
  'minnesota': { name: 'Minnesota', abbr: 'MN' },
  'mississippi': { name: 'Mississippi', abbr: 'MS' },
  'missouri': { name: 'Missouri', abbr: 'MO' },
  'montana': { name: 'Montana', abbr: 'MT' },
  'nebraska': { name: 'Nebraska', abbr: 'NE' },
  'nevada': { name: 'Nevada', abbr: 'NV' },
  'new-hampshire': { name: 'New Hampshire', abbr: 'NH' },
  'new-jersey': { name: 'New Jersey', abbr: 'NJ' },
  'new-mexico': { name: 'New Mexico', abbr: 'NM' },
  'new-york': { name: 'New York', abbr: 'NY' },
  'north-carolina': { name: 'North Carolina', abbr: 'NC' },
  'north-dakota': { name: 'North Dakota', abbr: 'ND' },
  'ohio': { name: 'Ohio', abbr: 'OH' },
  'oklahoma': { name: 'Oklahoma', abbr: 'OK' },
  'oregon': { name: 'Oregon', abbr: 'OR' },
  'pennsylvania': { name: 'Pennsylvania', abbr: 'PA' },
  'rhode-island': { name: 'Rhode Island', abbr: 'RI' },
  'south-carolina': { name: 'South Carolina', abbr: 'SC' },
  'south-dakota': { name: 'South Dakota', abbr: 'SD' },
  'tennessee': { name: 'Tennessee', abbr: 'TN' },
  'texas': { name: 'Texas', abbr: 'TX' },
  'utah': { name: 'Utah', abbr: 'UT' },
  'vermont': { name: 'Vermont', abbr: 'VT' },
  'virginia': { name: 'Virginia', abbr: 'VA' },
  'washington': { name: 'Washington', abbr: 'WA' },
  'west-virginia': { name: 'West Virginia', abbr: 'WV' },
  'wisconsin': { name: 'Wisconsin', abbr: 'WI' },
  'wyoming': { name: 'Wyoming', abbr: 'WY' },
  'district-of-columbia': { name: 'District of Columbia', abbr: 'DC' },
}

async function getStateStats(abbr: string) {
  const { count } = await supabase
    .from('adjusters')
    .select('*', { count: 'exact', head: true })
    .eq('state', abbr)

  const { count: reviewCount } = await supabase
    .from('reviews')
    .select('*, adjusters!inner(state)', { count: 'exact', head: true })
    .eq('adjusters.state', abbr)
    .eq('status', 'approved')

  return {
    adjusterCount: count || 0,
    reviewCount: reviewCount || 0,
  }
}

async function getTopAdjusters(abbr: string): Promise<Adjuster[]> {
  const { data } = await supabase
    .from('adjusters')
    .select('id, first_name, last_name, slug, city, avg_rating, total_reviews')
    .eq('state', abbr)
    .gt('total_reviews', 0)
    .order('avg_rating', { ascending: false })
    .order('total_reviews', { ascending: false })
    .limit(10)

  return (data as Adjuster[]) || []
}

async function getRecentReviews(abbr: string): Promise<Review[]> {
  const { data } = await supabase
    .from('reviews')
    .select('id, overall_rating, review_text, created_at, adjusters!inner(first_name, last_name, slug, state)')
    .eq('adjusters.state', abbr)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(5)

  return (data as unknown as Review[]) || []
}

async function getCities(abbr: string): Promise<CityCount[]> {
  const { data } = await supabase
    .from('adjusters')
    .select('city')
    .eq('state', abbr)
    .not('city', 'is', null)
    .limit(1000)

  if (!data) return []

  const cityCounts: Record<string, number> = {}
  data.forEach((row) => {
    if (row.city) {
      cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
    }
  })

  return Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([city, count]) => ({ city, count }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const stateData = STATES[params.state.toLowerCase()]
  
  if (!stateData) {
    return { title: 'State Not Found | RateMyAdjusters' }
  }

  const stats = await getStateStats(stateData.abbr)

  return {
    title: `${stateData.name} Insurance Adjusters – Ratings & Reviews | RateMyAdjusters`,
    description: `Browse ${stats.adjusterCount.toLocaleString()} insurance adjuster ratings in ${stateData.name}. Read real reviews from homeowners and contractors. Find adjusters by city.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/adjusters/${params.state.toLowerCase()}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(STATES).map((state) => ({ state }))
}

export default async function StatePage({ params }: PageProps) {
  const stateData = STATES[params.state.toLowerCase()]
  if (!stateData) notFound()

  const [stats, topAdjusters, recentReviews, cities] = await Promise.all([
    getStateStats(stateData.abbr),
    getTopAdjusters(stateData.abbr),
    getRecentReviews(stateData.abbr),
    getCities(stateData.abbr),
  ])

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${stateData.name} Insurance Adjusters`,
    description: `Browse insurance adjuster ratings and reviews in ${stateData.name}`,
    url: `https://ratemyadjusters.com/adjusters/${params.state.toLowerCase()}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/adjusters" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{stateData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl md:text-4xl font-bold">{stateData.name} Insurance Adjusters</h1>
            </div>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Browse {stats.adjusterCount.toLocaleString()} licensed insurance adjusters in {stateData.name}. 
              Read reviews from homeowners and contractors before your claim.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{stats.adjusterCount.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{stats.reviewCount.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Reviews</div>
              </div>
            </div>

            <div className="max-w-xl">
              <SearchBar />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Top Rated Adjusters */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Top Rated Adjusters in {stateData.name}</h2>
                </div>
                {topAdjusters.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No reviewed adjusters yet in {stateData.name}.</p>
                    <p className="text-gray-400 text-sm mt-1">Be the first to leave a review!</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {topAdjusters.map((adj) => (
                      <Link
                        key={adj.id}
                        href={`/adjuster/${adj.slug}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{adj.first_name?.[0]}{adj.last_name?.[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{adj.first_name} {adj.last_name}</div>
                          <div className="text-sm text-gray-500">{adj.city || stateData.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-semibold text-gray-900">{adj.avg_rating?.toFixed(1) || '0.0'}</span>
                          </div>
                          <div className="text-xs text-gray-500">{adj.total_reviews} reviews</div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}
                <div className="p-4 border-t">
                  <Link
                    href={`/search?state=${stateData.abbr}`}
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all {stateData.name} adjusters
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Recent Reviews in {stateData.name}</h2>
                </div>
                {recentReviews.length === 0 ? (
                  <div className="p-8 text-center">
                    <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No reviews yet in {stateData.name}.</p>
                    <Link href="/review" className="text-blue-600 hover:text-blue-700 font-medium text-sm mt-2 inline-block">
                      Be the first to leave a review →
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                href={`/adjuster/${review.adjusters.slug}`}
                                className="font-medium text-gray-900 hover:text-blue-600"
                              >
                                {review.adjusters.first_name} {review.adjusters.last_name}
                              </Link>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`w-3 h-3 ${star <= review.overall_rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">{review.review_text}</p>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(review.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Cities */}
              {cities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Cities in {stateData.name}</h3>
                  <div className="space-y-2">
                    {cities.map(({ city, count }) => (
                      <Link
                        key={city}
                        href={`/search?state=${stateData.abbr}&city=${encodeURIComponent(city)}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-700">{city}</span>
                        <span className="text-sm text-gray-400">{count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Had a claim in {stateData.name}?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your experience to help other homeowners know what to expect.
                </p>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full justify-center"
                >
                  <Star className="w-4 h-4" />
                  Leave a Review
                </Link>
              </div>

              {/* Other States */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Other States</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['texas', 'florida', 'california', 'georgia', 'ohio', 'arizona'].map((state) => {
                    if (state === params.state.toLowerCase()) return null
                    const stateInfo = STATES[state]
                    return (
                      <Link
                        key={state}
                        href={`/adjusters/${state}`}
                        className="text-sm text-gray-600 hover:text-blue-600 py-1"
                      >
                        {stateInfo.name}
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/adjusters"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
                >
                  View all states →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
