import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Shield, Star, ChevronRight, ArrowRight, Building, Phone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: { state: string }
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

async function getStateData(stateAbbr: string) {
  const { count } = await supabase
    .from('public_adjusters')
    .select('*', { count: 'exact', head: true })
    .eq('state', stateAbbr)

  return count || 0
}

async function getTopPublicAdjusters(stateAbbr: string) {
  const { data } = await supabase
    .from('public_adjusters')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews, specialties, years_experience')
    .eq('state', stateAbbr)
    .order('total_reviews', { ascending: false })
    .limit(10)

  return data || []
}

async function getRecentReviews(stateAbbr: string) {
  const { data: pas } = await supabase
    .from('public_adjusters')
    .select('id')
    .eq('state', stateAbbr)
    .limit(5000)

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

async function getTopCities(stateAbbr: string) {
  const { data } = await supabase
    .from('public_adjusters')
    .select('city')
    .eq('state', stateAbbr)
    .not('city', 'is', null)
    .neq('city', '')

  if (!data) return []

  const cityCounts: Record<string, number> = {}
  data.forEach(row => {
    if (row.city) {
      cityCounts[row.city] = (cityCounts[row.city] || 0) + 1
    }
  })

  return Object.entries(cityCounts)
    .filter(([_, count]) => count >= 5)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([city, count]) => ({ city, count }))
}

async function getReviewCount(stateAbbr: string): Promise<number> {
  const { data: pas } = await supabase
    .from('public_adjusters')
    .select('id')
    .eq('state', stateAbbr)

  if (!pas || pas.length === 0) return 0

  const { count } = await supabase
    .from('public_adjuster_reviews')
    .select('*', { count: 'exact', head: true })
    .in('public_adjuster_id', pas.map(pa => pa.id))
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
    title: `${stateData.name} Public Adjusters – Reviews & Ratings | RateMyAdjusters`,
    description: `Find ${count.toLocaleString()} public adjusters in ${stateData.name}. Read reviews from homeowners. Public adjusters work for you to maximize your insurance claim.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/public-adjusters/${params.state}`,
    },
    openGraph: {
      title: `${stateData.name} Public Adjusters`,
      description: `Find ${count.toLocaleString()} public adjusters in ${stateData.name}. Read real reviews from homeowners.`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(STATES).map((state) => ({ state }))
}

export const revalidate = 3600

export default async function PublicAdjusterStatePage({ params }: PageProps) {
  const stateData = STATES[params.state]

  if (!stateData) {
    notFound()
  }

  const [paCount, publicAdjusters, reviews, topCities, reviewCount] = await Promise.all([
    getStateData(stateData.abbr),
    getTopPublicAdjusters(stateData.abbr),
    getRecentReviews(stateData.abbr),
    getTopCities(stateData.abbr),
    getReviewCount(stateData.abbr),
  ])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Public Adjusters', item: 'https://ratemyadjusters.com/public-adjusters' },
      { '@type': 'ListItem', position: 3, name: stateData.name, item: `https://ratemyadjusters.com/public-adjusters/${params.state}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{stateData.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-300" />
              <span className="text-emerald-300 font-medium">{stateData.abbr}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Public Adjusters in {stateData.name}
            </h1>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
              Find {paCount.toLocaleString()} licensed public adjusters in {stateData.name}. 
              Public adjusters work for YOU to help maximize your insurance claim settlement.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{paCount.toLocaleString()}</div>
                <div className="text-emerald-200 text-sm">Public Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{reviewCount.toLocaleString()}</div>
                <div className="text-emerald-200 text-sm">Reviews</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-2xl font-bold">{topCities.length}</div>
                <div className="text-emerald-200 text-sm">Cities</div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Public Adjusters in {stateData.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Public adjusters in {stateData.name} are licensed professionals who represent homeowners 
                  in insurance claims. Unlike insurance company adjusters who work for the carrier, public adjusters 
                  work exclusively for you to ensure you receive the full settlement you are entitled to.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When you hire a public adjuster, they handle all aspects of your claim including documenting damage, 
                  preparing estimates, negotiating with your insurance company, and advocating for your interests. 
                  Studies show homeowners who use public adjusters often receive 30-50% higher settlements.
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
                        href={`/public-adjusters/${params.state}/${nameToSlug(city)}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group"
                      >
                        <span className="text-gray-900 group-hover:text-emerald-700 font-medium text-sm">{city}</span>
                        <span className="text-xs text-gray-500">{count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Top Public Adjusters */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Top Reviewed Public Adjusters in {stateData.name}</h2>
                </div>
                
                {publicAdjusters.length === 0 ? (
                  <div className="p-8 text-center">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No public adjusters listed yet in {stateData.name}.</p>
                    <Link href="/add-public-adjuster" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg">
                      Add a Public Adjuster
                    </Link>
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
                            {pa.company_name ? `${pa.company_name} • ` : ''}{pa.city ? `${pa.city}, ` : ''}{pa.state}
                          </div>
                          {pa.specialties && pa.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {pa.specialties.slice(0, 3).map((spec: string) => (
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
              </div>

              {/* Recent Reviews */}
              {reviews.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Recent Reviews in {stateData.name}</h2>
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
                            {review.public_adjusters && review.public_adjusters[0] && (
                              <Link
                                href={`/public-adjuster/${review.public_adjusters[0].slug}`}
                                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-2 inline-block"
                              >
                                Review for {review.public_adjusters[0].first_name} {review.public_adjusters[0].last_name}
                              </Link>
                            )}
                            {review.settlement_increase && review.settlement_increase !== 'unknown' && (
                              <span className="inline-block ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                +{review.settlement_increase} settlement increase
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
                <h3 className="font-semibold mb-2">Worked with a Public Adjuster in {stateData.name}?</h3>
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

              {/* Add PA CTA */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Are You a Public Adjuster?</h3>
                <p className="text-gray-600 text-sm mb-4">Get listed and let homeowners find you.</p>
                <Link
                  href="/add-public-adjuster"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg text-sm w-full justify-center"
                >
                  Add Your Profile
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href="/public-adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Browse All States
                  </Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Insurance Adjusters
                  </Link>
                  <Link href="/companies" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Browse by Company
                  </Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">
                    → Homeowner Guides
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
                        href={`/public-adjusters/${state}`}
                        className="block text-sm text-gray-600 hover:text-emerald-600 py-1"
                      >
                        {data.name}
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/public-adjusters"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-4 inline-block"
                >
                  View all 50 states →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not endorse or recommend any specific public adjuster. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
