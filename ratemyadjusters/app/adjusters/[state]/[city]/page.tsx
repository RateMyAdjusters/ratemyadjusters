import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Users, Star, ChevronRight, ArrowRight, Building } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: { state: string; city: string }
}

// Helper: Convert slug to display name
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper: Convert name to slug
function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// Helper: Get state abbreviation from slug
function getStateAbbr(stateSlug: string): string {
  const stateMap: Record<string, string> = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA',
    'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA',
    'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA',
    'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO',
    'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new-hampshire': 'NH', 'new-jersey': 'NJ',
    'new-mexico': 'NM', 'new-york': 'NY', 'north-carolina': 'NC', 'north-dakota': 'ND', 'ohio': 'OH',
    'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode-island': 'RI', 'south-carolina': 'SC',
    'south-dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT',
    'virginia': 'VA', 'washington': 'WA', 'west-virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY',
    'district-of-columbia': 'DC',
  }
  return stateMap[stateSlug] || ''
}

// Helper: Get state name from abbreviation
function getStateName(abbr: string): string {
  const states: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
    HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
    MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
    NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
    DC: 'District of Columbia',
  }
  return states[abbr] || abbr
}

async function getCityData(stateAbbr: string, cityName: string) {
  // Get adjuster count for this city
  const { count } = await supabase
    .from('adjusters')
    .select('*', { count: 'exact', head: true })
    .eq('state', stateAbbr)
    .ilike('city', cityName)

  return count || 0
}

async function getTopAdjusters(stateAbbr: string, cityName: string) {
  const { data } = await supabase
    .from('adjusters')
    .select('id, first_name, last_name, slug, state, city, avg_rating, total_reviews, qualification')
    .eq('state', stateAbbr)
    .ilike('city', cityName)
    .order('total_reviews', { ascending: false })
    .limit(20)

  return data || []
}

async function getRecentReviews(stateAbbr: string, cityName: string) {
  // Get adjuster IDs in this city
  const { data: adjusters } = await supabase
    .from('adjusters')
    .select('id')
    .eq('state', stateAbbr)
    .ilike('city', cityName)
    .limit(1000)

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
      adjuster_id,
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

  return reviews || []
}

async function getNearbyCities(stateAbbr: string, currentCity: string) {
  const { data } = await supabase
    .from('adjusters')
    .select('city')
    .eq('state', stateAbbr)
    .not('city', 'is', null)
    .neq('city', '')
    .neq('city', currentCity)

  if (!data) return []

  // Count adjusters per city
  const cityCounts: Record<string, number> = {}
  data.forEach(row => {
    if (row.city) {
      cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
    }
  })

  // Get top 8 cities with 100+ adjusters
  return Object.entries(cityCounts)
    .filter(([_, count]) => count >= 100)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([city, count]) => ({ city, count }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const stateAbbr = getStateAbbr(params.state)
  const cityName = slugToName(params.city)
  const stateName = getStateName(stateAbbr)
  
  if (!stateAbbr) {
    return { title: 'City Not Found | RateMyAdjusters' }
  }

  const count = await getCityData(stateAbbr, cityName)
  
  if (count === 0) {
    return { title: 'City Not Found | RateMyAdjusters' }
  }

  return {
    title: `${cityName}, ${stateAbbr} Insurance Adjusters – Reviews & Ratings | RateMyAdjusters`,
    description: `Find ${count.toLocaleString()} insurance adjusters in ${cityName}, ${stateName}. Read reviews from homeowners and contractors. See ratings and license details.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/adjusters/${params.state}/${params.city}`,
    },
    openGraph: {
      title: `${cityName}, ${stateAbbr} Insurance Adjusters`,
      description: `Search ${count.toLocaleString()} adjusters in ${cityName}. Read real reviews from homeowners and contractors.`,
    },
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function CityPage({ params }: PageProps) {
  const stateAbbr = getStateAbbr(params.state)
  const cityName = slugToName(params.city)
  const stateName = getStateName(stateAbbr)

  if (!stateAbbr) {
    notFound()
  }

  const [adjusterCount, adjusters, reviews, nearbyCities] = await Promise.all([
    getCityData(stateAbbr, cityName),
    getTopAdjusters(stateAbbr, cityName),
    getRecentReviews(stateAbbr, cityName),
    getNearbyCities(stateAbbr, cityName),
  ])

  if (adjusterCount === 0) {
    notFound()
  }

  const reviewCount = reviews.length

  // Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Adjusters', item: 'https://ratemyadjusters.com/adjusters' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://ratemyadjusters.com/adjusters/${params.state}` },
      { '@type': 'ListItem', position: 4, name: cityName, item: `https://ratemyadjusters.com/adjusters/${params.state}/${params.city}` },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Insurance Adjusters in ${cityName}, ${stateAbbr}`,
    description: `Find and review insurance adjusters serving ${cityName}, ${stateName}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: stateAbbr,
      addressCountry: 'US',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/adjusters" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/adjusters/${params.state}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{cityName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-teal-400" />
              <span className="text-teal-400 font-medium">{stateName}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Insurance Adjusters in {cityName}, {stateAbbr}
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl">
              Browse {adjusterCount.toLocaleString()} licensed insurance adjusters serving {cityName} and surrounding areas. 
              Read reviews from homeowners and contractors.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{adjusterCount.toLocaleString()}</div>
                <div className="text-slate-400 text-sm">Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{reviewCount}</div>
                <div className="text-slate-400 text-sm">Reviews</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Insurance Adjusters in {cityName}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {cityName}, {stateName} is served by {adjusterCount.toLocaleString()} licensed insurance adjusters who handle property damage claims for homeowners in the area. 
                  These professionals evaluate damage from weather events, water damage, fire, theft, and other covered losses.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When you file an insurance claim in {cityName}, an adjuster will be assigned to inspect your property, document the damage, and prepare an estimate. 
                  RateMyAdjusters helps you learn about adjusters in your area through reviews from other homeowners and contractors.
                </p>
              </div>

              {/* Adjusters List */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Adjusters in {cityName} ({adjusters.length})</h2>
                </div>
                
                {adjusters.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No adjusters found in this city yet.</p>
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
                            {adjuster.qualification || 'Insurance Adjuster'} • {adjuster.city}, {adjuster.state}
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

                {adjusters.length >= 20 && (
                  <div className="p-4 border-t bg-gray-50">
                    <Link
                      href={`/search?state=${stateAbbr}&city=${encodeURIComponent(cityName)}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 justify-center"
                    >
                      View all {adjusterCount.toLocaleString()} adjusters in {cityName}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Recent Reviews */}
              {reviews.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Recent Reviews in {cityName}</h2>
                  </div>
                  <div className="divide-y">
                    {reviews.map((review: any) => (
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
                <h3 className="font-semibold mb-2">Had a claim in {cityName}?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Share your experience to help other homeowners in your area.
                </p>
                <Link
                  href="/review"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 text-sm"
                >
                  <Star className="w-4 h-4" />
                  Leave a Review
                </Link>
              </div>

              {/* Nearby Cities */}
              {nearbyCities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Other Cities in {stateName}</h3>
                  <div className="space-y-2">
                    {nearbyCities.map(({ city, count }) => (
                      <Link
                        key={city}
                        href={`/adjusters/${params.state}/${nameToSlug(city)}`}
                        className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <span>{city}</span>
                        <span className="text-gray-400">{count.toLocaleString()}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href={`/adjusters/${params.state}`} className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → All {stateName} Adjusters
                  </Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse by State
                  </Link>
                  <Link href="/companies" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse by Company
                  </Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Homeowner Guides
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
