import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Users, Star, ChevronRight, ArrowRight, Building } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: { state: string }
}

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  slug: string
  state: string
  city: string | null
  avg_rating: number | null
  total_reviews: number
  qualification: string | null
}

interface Review {
  id: string
  overall_rating: number
  review_text: string
  reviewer_type: string
  created_at: string
  adjusters: {
    first_name: string
    last_name: string
    slug: string
  } | null
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

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

function getStateClaimInfo(abbr: string, stateName: string): string {
  const stateInfo: Record<string, string> = {
    TX: 'Texas experiences frequent weather-related claims including hail, wind, and hurricane damage. Homeowners in the state often file claims for roof damage, water intrusion, and storm-related property damage.',
    FL: 'Florida homeowners commonly file claims for hurricane damage, water damage, and wind-related losses. The state sees high volumes of roof claims and flood-related incidents.',
    CA: 'California property claims frequently involve wildfire damage, earthquake coverage, and water damage. Homeowners may also file claims for mudslides and structural damage.',
    GA: 'Georgia residents often file claims for storm damage, including hail, wind, and tornado-related losses. Water damage and roof claims are also common in the state.',
    OH: 'Ohio homeowners typically file claims for winter storm damage, wind damage, and water-related losses. Hail and tornado damage are also common in certain regions.',
    AZ: 'Arizona property claims often involve monsoon damage, dust storm damage, and water intrusion. Roof damage from extreme heat and sun exposure is also common.',
    NY: 'New York homeowners file claims for winter storm damage, water damage, and wind-related losses. Urban areas may see more theft and liability claims.',
    PA: 'Pennsylvania residents commonly file claims for winter weather damage, water damage, and wind-related losses. Flooding claims are common in certain regions.',
    IL: 'Illinois homeowners often file claims for severe storm damage, including hail, wind, and tornado damage. Winter weather and water damage claims are also frequent.',
    NC: 'North Carolina sees frequent hurricane-related claims, wind damage, and water intrusion claims. Coastal areas have higher volumes of storm-related losses.',
  }
  return stateInfo[abbr] || `Homeowners in ${stateName} file insurance claims for various types of property damage including weather-related losses, water damage, fire damage, and theft. The specific types of claims vary by region and local weather patterns.`
}

async function getStateData(stateAbbr: string) {
  const { count } = await supabase
    .from('adjusters')
    .select('*', { count: 'exact', head: true })
    .eq('state', stateAbbr)

  return count || 0
}

async function getTopAdjusters(stateAbbr: string): Promise<Adjuster[]> {
  const { data } = await supabase
    .from('adjusters')
    .select('id, first_name, last_name, slug, state, city, avg_rating, total_reviews, qualification')
    .eq('state', stateAbbr)
    .order('total_reviews', { ascending: false })
    .limit(10)

  return (data || []) as Adjuster[]
}

async function getRecentReviews(stateAbbr: string): Promise<Review[]> {
  const { data: adjusters } = await supabase
    .from('adjusters')
    .select('id')
    .eq('state', stateAbbr)
    .limit(5000)

  if (!adjusters || adjusters.length === 0) return []

  const adjusterIds = adjusters.map(a => a.id)

  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      id,
      overall_rating,
      review_text,
      reviewer_type,
      created_at,
      adjusters (
        first_name,
        last_name,
        slug
      )
    `)
    .in('adjuster_id', adjusterIds)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(5)

  return (reviews || []) as Review[]
}

async function getTopCities(stateAbbr: string): Promise<CityCount[]> {
  const { data } = await supabase
    .from('adjusters')
    .select('city')
    .eq('state', stateAbbr)
    .not('city', 'is', null)
    .neq('city', '')

  if (!data) return []

  // Count adjusters per city
  const cityCounts: Record<string, number> = {}
  data.forEach(row => {
    if (row.city) {
      cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
    }
  })

  // Get top 20 cities with 50+ adjusters
  return Object.entries(cityCounts)
    .filter(([_, count]) => count >= 50)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([city, count]) => ({ city, count }))
}

async function getReviewCount(stateAbbr: string): Promise<number> {
  const { data: adjusters } = await supabase
    .from('adjusters')
    .select('id')
    .eq('state', stateAbbr)

  if (!adjusters || adjusters.length === 0) return 0

  const { count } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .in('adjuster_id', adjusters.map(a => a.id))
    .eq('status', 'approved')

  return count || 0
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const stateData = STATES[params.state]
  
  if (!stateData) {
    return { title: 'State Not Found | RateMyAdjusters' }
  }

  const count = await getStateData(stateData.abbr)

  return {
    title: `${stateData.name} Insurance Adjusters – Reviews & Ratings | RateMyAdjusters`,
    description: `Find ${count.toLocaleString()} insurance adjusters in ${stateData.name}. Read reviews from homeowners and contractors. See ratings, license details, and claim experiences.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/adjusters/${params.state}`,
    },
    openGraph: {
      title: `${stateData.name} Insurance Adjusters`,
      description: `Search ${count.toLocaleString()} adjusters in ${stateData.name}. Read real reviews from homeowners and contractors.`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(STATES).map((state) => ({ state }))
}

export const revalidate = 3600

export default async function StatePage({ params }: PageProps) {
  const stateData = STATES[params.state]

  if (!stateData) {
    notFound()
  }

  const [adjusterCount, adjusters, reviews, topCities, reviewCount] = await Promise.all([
    getStateData(stateData.abbr),
    getTopAdjusters(stateData.abbr),
    getRecentReviews(stateData.abbr),
    getTopCities(stateData.abbr),
    getReviewCount(stateData.abbr),
  ])

  // Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Adjusters', item: 'https://ratemyadjusters.com/adjusters' },
      { '@type': 'ListItem', position: 3, name: stateData.name, item: `https://ratemyadjusters.com/adjusters/${params.state}` },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Insurance Adjusters in ${stateData.name}`,
    description: `Browse ${adjusterCount.toLocaleString()} insurance adjusters in ${stateData.name}`,
    url: `https://ratemyadjusters.com/adjusters/${params.state}`,
    numberOfItems: adjusterCount,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

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
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-teal-400" />
              <span className="text-teal-400 font-medium">{stateData.abbr}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Insurance Adjusters in {stateData.name}
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Browse {adjusterCount.toLocaleString()} licensed insurance adjusters in {stateData.name}. 
              Read reviews from homeowners and contractors.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{adjusterCount.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{reviewCount.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{topCities.length}</div>
                <div className="text-slate-400 text-sm">Major Cities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Insurance Claims in {stateData.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {getStateClaimInfo(stateData.abbr, stateData.name)}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Insurance adjusters in {stateData.name} evaluate property damage and help process claims for homeowners throughout the state. 
                  RateMyAdjusters helps you learn about adjusters through reviews from other policyholders.
                </p>
              </div>

              {/* Cities Section */}
              {topCities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by City</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {topCities.map(({ city, count }) => (
                      <Link
                        key={city}
                        href={`/adjusters/${params.state}/${nameToSlug(city)}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <span className="text-gray-900 group-hover:text-blue-700 font-medium text-sm">{city}</span>
                        <span className="text-xs text-gray-500">{count.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Adjusters */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Top Reviewed Adjusters in {stateData.name}</h2>
                </div>
                
                {adjusters.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No adjusters with reviews yet.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {adjusters.map((adjuster) => (
                      <Link
                        key={adjuster.id}
                        href={`/adjuster/${adjuster.slug}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">
                            {adjuster.first_name?.[0]}{adjuster.last_name?.[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">
                            {adjuster.first_name} {adjuster.last_name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {adjuster.city ? `${adjuster.city}, ` : ''}{adjuster.state}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {adjuster.total_reviews > 0 ? (
                            <>
                              <div className="flex items-center gap-1 justify-end">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold text-gray-900">{adjuster.avg_rating?.toFixed(1)}</span>
                              </div>
                              <div className="text-xs text-gray-500">{adjuster.total_reviews} reviews</div>
                            </>
                          ) : (
                            <span className="text-xs text-gray-400">No reviews</span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                )}

                <div className="p-4 border-t bg-gray-50">
                  <Link
                    href={`/search?state=${stateData.abbr}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 justify-center"
                  >
                    View all {adjusterCount.toLocaleString()} adjusters in {stateData.name}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Recent Reviews */}
              {reviews.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Recent Reviews in {stateData.name}</h2>
                  </div>
                  <div className="divide-y">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-semibold text-sm">
                              {review.reviewer_type === 'contractor' ? 'C' : review.reviewer_type === 'public_adjuster' ? 'PA' : 'H'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            {review.adjusters && (
                              <Link
                                href={`/adjuster/${review.adjusters.slug}`}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-2 inline-block"
                              >
                                Review for {review.adjusters.first_name} {review.adjusters.last_name}
                              </Link>
                            )}
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                              {review.review_text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">Had a claim in {stateData.name}?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Share your experience to help other homeowners.
                </p>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 text-sm"
                >
                  <Star className="w-4 h-4" />
                  Leave a Review
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse All States
                  </Link>
                  <Link href="/companies" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse by Company
                  </Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Homeowner Guides
                  </Link>
                  <Link href="/review" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Leave a Review
                  </Link>
                </div>
              </div>

              {/* Other States */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Other States</h3>
                <div className="space-y-2">
                  {['texas', 'florida', 'california', 'georgia', 'ohio', 'arizona'].map((state) => {
                    if (state === params.state) return null
                    const data = STATES[state]
                    return (
                      <Link
                        key={state}
                        href={`/adjusters/${state}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                      >
                        {data.name}
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/adjusters"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
                >
                  View all 50 states →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
