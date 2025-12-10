import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Shield, Star, ChevronRight, ArrowRight, Building } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: { state: string; city: string }
}

function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

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
  const { count } = await supabase
    .from('public_adjusters')
    .select('*', { count: 'exact', head: true })
    .eq('state', stateAbbr)
    .ilike('city', cityName)

  return count || 0
}

async function getPublicAdjusters(stateAbbr: string, cityName: string) {
  const { data } = await supabase
    .from('public_adjusters')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews, specialties, phone, website')
    .eq('state', stateAbbr)
    .ilike('city', cityName)
    .order('total_reviews', { ascending: false })
    .limit(20)

  return data || []
}

async function getRecentReviews(stateAbbr: string, cityName: string) {
  const { data: pas } = await supabase
    .from('public_adjusters')
    .select('id')
    .eq('state', stateAbbr)
    .ilike('city', cityName)
    .limit(1000)

  if (!pas || pas.length === 0) return []

  const paIds = pas.map(pa => pa.id)

  const { data: reviews } = await supabase
    .from('public_adjuster_reviews')
    .select(`
      id,
      overall_rating,
      review_text,
      reviewer_type,
      settlement_increase,
      created_at,
      public_adjuster_id,
      public_adjusters (
        first_name,
        last_name,
        slug
      )
    `)
    .in('public_adjuster_id', paIds)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(5)

  return reviews || []
}

async function getNearbyCities(stateAbbr: string, currentCity: string) {
  const { data } = await supabase
    .from('public_adjusters')
    .select('city')
    .eq('state', stateAbbr)
    .not('city', 'is', null)
    .neq('city', '')

  if (!data) return []

  const cityCounts: Record<string, number> = {}
  data.forEach(row => {
    if (row.city && row.city.toLowerCase() !== currentCity.toLowerCase()) {
      cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
    }
  })

  return Object.entries(cityCounts)
    .filter(([_, count]) => count >= 2)
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
    title: `${cityName}, ${stateAbbr} Public Adjusters – Reviews & Ratings | RateMyAdjusters`,
    description: `Find ${count} public adjusters in ${cityName}, ${stateName}. Read reviews from homeowners. Public adjusters work for you to maximize your insurance claim.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/public-adjusters/${params.state}/${params.city}`,
    },
  }
}

export const revalidate = 3600

export default async function PublicAdjusterCityPage({ params }: PageProps) {
  const stateAbbr = getStateAbbr(params.state)
  const cityName = slugToName(params.city)
  const stateName = getStateName(stateAbbr)

  if (!stateAbbr) {
    notFound()
  }

  const [paCount, publicAdjusters, reviews, nearbyCities] = await Promise.all([
    getCityData(stateAbbr, cityName),
    getPublicAdjusters(stateAbbr, cityName),
    getRecentReviews(stateAbbr, cityName),
    getNearbyCities(stateAbbr, cityName),
  ])

  if (paCount === 0) {
    notFound()
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Public Adjusters', item: 'https://ratemyadjusters.com/public-adjusters' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://ratemyadjusters.com/public-adjusters/${params.state}` },
      { '@type': 'ListItem', position: 4, name: cityName, item: `https://ratemyadjusters.com/public-adjusters/${params.state}/${params.city}` },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Public Adjusters in ${cityName}, ${stateAbbr}`,
    description: `Find and review public adjusters serving ${cityName}, ${stateName}`,
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
              <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/public-adjusters/${params.state}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{cityName}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-300" />
              <span className="text-emerald-300 font-medium">{stateName}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Public Adjusters in {cityName}, {stateAbbr}
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              Find {paCount} licensed public adjusters serving {cityName} and surrounding areas. 
              Public adjusters work for YOU to help maximize your insurance claim settlement.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{paCount}</div>
                <div className="text-emerald-200 text-sm">Public Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{reviews.length}</div>
                <div className="text-emerald-200 text-sm">Reviews</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Public Adjusters in {cityName}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {cityName}, {stateName} is served by {paCount} licensed public adjusters who can help 
                  homeowners navigate the insurance claims process. Unlike insurance company adjusters who 
                  work for the carrier, public adjusters work exclusively for you.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When you hire a public adjuster in {cityName}, they handle all aspects of your claim including 
                  documenting damage, preparing detailed estimates, negotiating with your insurance company, and 
                  fighting for the settlement you deserve.
                </p>
              </div>

              {/* Public Adjusters List */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Public Adjusters in {cityName} ({publicAdjusters.length})</h2>
                </div>
                
                {publicAdjusters.length === 0 ? (
                  <div className="p-8 text-center">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No public adjusters found in this city yet.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {publicAdjusters.map((pa) => (
                      <Link
                        key={pa.id}
                        href={`/public-adjuster/${pa.slug}`}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">
                            {pa.first_name?.[0]}{pa.last_name?.[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-gray-900">
                            {pa.first_name} {pa.last_name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {pa.company_name ? `${pa.company_name} • ` : ''}{pa.city}, {pa.state}
                          </div>
                          {pa.specialties && pa.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pa.specialties.slice(0, 2).map((spec: string) => (
                                <span key={spec} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{spec}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          {pa.total_reviews > 0 ? (
                            <>
                              <div className="flex items-center gap-1 justify-end">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold text-gray-900">{pa.avg_rating?.toFixed(1)}</span>
                              </div>
                              <div className="text-xs text-gray-500">{pa.total_reviews} reviews</div>
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

                {publicAdjusters.length >= 20 && (
                  <div className="p-4 border-t bg-gray-50">
                    <p className="text-sm text-gray-500 text-center">Showing top 20 results</p>
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
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-600 font-semibold text-sm">
                              {review.reviewer_type === 'contractor' ? 'C' : 'H'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">
                                {new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            {review.public_adjusters && (
                              <Link
                                href={`/public-adjuster/${review.public_adjusters.slug}`}
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-2 inline-block"
                              >
                                Review for {review.public_adjusters.first_name} {review.public_adjusters.last_name}
                              </Link>
                            )}
                            {review.settlement_increase && review.settlement_increase !== 'unknown' && (
                              <span className="inline-block ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                +{review.settlement_increase} settlement
                              </span>
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
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">Worked with a Public Adjuster in {cityName}?</h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Share your experience to help other homeowners.
                </p>
                <Link
                  href="/review-public-adjuster"
                  className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50 text-sm"
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
                        href={`/public-adjusters/${params.state}/${nameToSlug(city)}`}
                        className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                      >
                        <span>{city}</span>
                        <span className="text-gray-400">{count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href={`/public-adjusters/${params.state}`} className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → All {stateName} Public Adjusters
                  </Link>
                  <Link href="/public-adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Browse by State
                  </Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Insurance Adjusters
                  </Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
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
