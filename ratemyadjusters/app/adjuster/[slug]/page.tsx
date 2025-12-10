import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, Shield, ChevronRight, Clock, Users, FileText, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import ShareButtons from '@/components/ShareButtons'
import ConfirmAdjusterButton from '@/components/ConfirmAdjusterButton'
import ReportReviewButton from '@/components/ReportReviewButton'
import ClaimProfileForm from '@/components/ClaimProfileForm'
import FastReviewWidget from '@/components/FastReviewWidget'
import FairnessPoll from '@/components/FairnessPoll'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

async function getAdjuster(slug: string) {
  const { data, error } = await supabase
    .from('adjusters')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getReviews(adjusterId: string) {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('adjuster_id', adjusterId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

async function getSimilarAdjusters(state: string, city: string | null, currentId: string) {
  let query = supabase
    .from('adjusters')
    .select('id, first_name, last_name, slug, state, city, avg_rating, total_reviews')
    .eq('state', state)
    .neq('id', currentId)
    .order('total_reviews', { ascending: false })
    .limit(5)

  if (city) {
    query = query.eq('city', city)
  }

  const { data } = await query
  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const adjuster = await getAdjuster(params.slug)
  
  if (!adjuster) {
    return { title: 'Adjuster Not Found | RateMyAdjusters' }
  }

  const fullName = adjuster.first_name + ' ' + adjuster.last_name
  const stateFullName = getStateName(adjuster.state)
  const cityText = adjuster.city ? adjuster.city + ', ' : ''
  
  return {
    title: `${fullName} – Insurance Adjuster Reviews (${adjuster.state}) | RateMyAdjusters`,
    description: `Read reviews of ${fullName}, a licensed insurance adjuster in ${cityText}${stateFullName}. See ratings from homeowners and contractors, license details, and claim experiences.`,
    alternates: {
      canonical: 'https://ratemyadjusters.com/adjuster/' + adjuster.slug,
    },
    openGraph: {
      title: `${fullName} – Insurance Adjuster Reviews`,
      description: `See what homeowners and contractors say about ${fullName}, an insurance adjuster in ${stateFullName}.`,
      type: 'profile',
    },
  }
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

function getStateSlug(abbr: string): string {
  const stateName = getStateName(abbr)
  return stateName.toLowerCase().replace(/\s+/g, '-')
}

function getStateClaimInfo(abbr: string): string {
  const stateInfo: Record<string, string> = {
    TX: 'Texas experiences frequent weather-related claims including hail, wind, and hurricane damage.',
    FL: 'Florida homeowners commonly file claims for hurricane damage, water damage, and wind-related losses.',
    CA: 'California property claims frequently involve wildfire damage, earthquake coverage, and water damage.',
    GA: 'Georgia residents often file claims for storm damage, including hail, wind, and tornado-related losses.',
    OH: 'Ohio homeowners typically file claims for winter storm damage, wind damage, and water-related losses.',
  }
  return stateInfo[abbr] || `Homeowners in ${getStateName(abbr)} file insurance claims for various types of property damage.`
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Not listed'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Not listed'
  }
}

function formatReviewDate(dateStr: string | null): string {
  if (!dateStr) return 'Historical Review'
  try {
    const date = new Date(dateStr)
    // Check for epoch date (Jan 1, 1970) which indicates null
    if (date.getFullYear() < 1980) return 'Historical Review'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Historical Review'
  }
}

function getCommonExperiences(reviews: any[]): string[] {
  if (reviews.length === 0) return []
  
  const experiences = []
  const hasPositive = reviews.some(r => r.overall_rating >= 4)
  
  if (hasPositive) {
    experiences.push('Communication')
    experiences.push('Professionalism')
    experiences.push('Timeliness')
    experiences.push('Clarity of the process')
  }
  
  return experiences
}

function getFAQs(fullName: string, state: string) {
  const stateName = getStateName(state)
  
  return [
    {
      question: `How can I leave a review for ${fullName}?`,
      answer: `You can leave a review by clicking the stars above or the "Leave a Review" button. Your feedback helps other homeowners.`,
    },
    {
      question: `Is ${fullName} a licensed insurance adjuster?`,
      answer: `${fullName} is listed as an insurance adjuster in ${stateName}. License details are shown in the sidebar when available.`,
    },
    {
      question: `What types of claims does ${fullName} handle?`,
      answer: `Insurance adjusters in ${stateName} typically handle roof damage, water damage, fire damage, wind and hail damage, and other covered losses.`,
    },
    {
      question: `Are the reviews on this page verified?`,
      answer: `Reviews are submitted by homeowners and contractors who have worked with adjusters. We moderate for guidelines but cannot independently verify each experience.`,
    },
  ]
}

export default async function AdjusterProfile({ params }: PageProps) {
  const adjuster = await getAdjuster(params.slug)
  if (!adjuster) notFound()

  const reviews = await getReviews(adjuster.id)
  const similarAdjusters = await getSimilarAdjusters(adjuster.state, adjuster.city, adjuster.id)
  
  const fullName = adjuster.first_name + ' ' + adjuster.last_name
  const profileUrl = 'https://ratemyadjusters.com/adjuster/' + adjuster.slug
  const isPendingVerification = adjuster.license_status === 'pending_verification'
  const stateName = getStateName(adjuster.state)
  const stateSlug = getStateSlug(adjuster.state)
  const location = adjuster.city ? `${adjuster.city}, ${stateName}` : stateName
  const faqs = getFAQs(fullName, adjuster.state)
  const commonExperiences = getCommonExperiences(reviews)

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    url: profileUrl,
    jobTitle: adjuster.qualification || 'Insurance Adjuster',
    address: {
      '@type': 'PostalAddress',
      addressLocality: adjuster.city || undefined,
      addressRegion: adjuster.state,
      addressCountry: 'US',
    },
    ...(adjuster.total_reviews > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: adjuster.avg_rating?.toFixed(1) || '0',
        reviewCount: adjuster.total_reviews || 0,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Adjusters', item: 'https://ratemyadjusters.com/adjusters' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://ratemyadjusters.com/adjusters/${stateSlug}` },
      { '@type': 'ListItem', position: 4, name: fullName, item: profileUrl },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {isPendingVerification && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                <strong>Pending Verification:</strong> This profile was recently added and is awaiting verification.
              </p>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/adjusters" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/adjusters/${stateSlug}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{fullName}</span>
            </nav>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{adjuster.first_name?.[0]}{adjuster.last_name?.[0]}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                  {!adjuster.profile_claimed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                      <Shield className="w-3 h-3" />
                      Profile Unclaimed
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Property Claims Adjuster ({adjuster.state})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </span>
                </div>

                {/* Stats Box */}
                <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={adjuster.avg_rating || 0} size="lg" />
                      <span className="text-2xl font-bold text-gray-900">{adjuster.avg_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                  <div className="h-10 w-px bg-gray-300 hidden sm:block" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adjuster.total_reviews || 0}</p>
                    <p className="text-sm text-gray-500">Reviews</p>
                  </div>
                  <div className="h-10 w-px bg-gray-300 hidden sm:block" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{location}</p>
                    <p className="text-sm text-gray-500">Service Area</p>
                  </div>
                </div>

                {/* Fast Review Widget */}
                <FastReviewWidget adjusterId={adjuster.id} adjusterName={fullName} />
              </div>

              <div className="flex flex-col gap-3">
                <Link href={'/review?adjuster=' + adjuster.id} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  Leave a Review
                </Link>
                <ShareButtons url={profileUrl} title={fullName + ' - Insurance Adjuster Reviews'} />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <ConfirmAdjusterButton adjusterId={adjuster.id} adjusterName={fullName} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Fairness Poll */}
              <FairnessPoll adjusterId={adjuster.id} />

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {fullName}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {fullName} is {adjuster.license_status === 'active' ? 'a licensed' : 'listed as an'} insurance adjuster in {stateName}.
                  {adjuster.city && ` Based in ${adjuster.city}, this`} This adjuster evaluates property damage claims and prepares estimates for insurance companies and policyholders.
                </p>
              </div>

              {/* Why Your Experience Matters */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Why Your Experience Matters</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Millions of homeowners search for claim help every year. Your review helps the next person understand what to expect with this adjuster.
                    </p>
                  </div>
                </div>
              </div>

              {/* Common Experiences */}
              {commonExperiences.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What homeowners often mention:</h3>
                  <div className="flex flex-wrap gap-2">
                    {commonExperiences.map((exp, i) => (
                      <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        ✓ {exp}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Based on user-submitted reviews</p>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Reviews ({reviews.length})</h2>
                </div>

                {reviews.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-4">Be the first to share your experience with {fullName}.</p>
                    <Link href={'/review?adjuster=' + adjuster.id} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
                      Leave a Review
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-semibold text-sm">{review.reviewer_display_name?.[0] || 'A'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{review.reviewer_display_name || 'Anonymous'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">
                                {review.reviewer_type === 'contractor' ? 'Contractor' : review.reviewer_type === 'public_adjuster' ? 'Public Adjuster' : 'Homeowner'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">{formatReviewDate(review.created_at)}</span>
                            </div>
                            {review.claim_type && (
                              <div className="flex gap-2 mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{review.claim_type} Claim</span>
                              </div>
                            )}
                            <p className="text-gray-700 leading-relaxed mb-3">{review.review_text}</p>
                            <ReportReviewButton reviewId={review.id} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* License Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">License Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-gray-900 font-medium">{fullName}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">State</dt><dd className="text-gray-900 font-medium">{stateName}</dd></div>
                  {adjuster.city && <div className="flex justify-between"><dt className="text-gray-500">City</dt><dd className="text-gray-900 font-medium">{adjuster.city}</dd></div>}
                  {adjuster.license_number && <div className="flex justify-between"><dt className="text-gray-500">License #</dt><dd className="text-gray-900 font-medium">{adjuster.license_number}</dd></div>}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd className={'font-medium ' + (adjuster.license_status === 'active' ? 'text-green-600' : 'text-gray-600')}>
                      {adjuster.license_status === 'active' ? 'Active' : adjuster.license_status === 'expired' ? 'Expired' : 'Unknown'}
                    </dd>
                  </div>
                  <div className="flex justify-between"><dt className="text-gray-500">Issued</dt><dd className="text-gray-900 font-medium">{formatDate(adjuster.issued_on)}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Expires</dt><dd className="text-gray-900 font-medium">{formatDate(adjuster.expires_on)}</dd></div>
                </dl>
              </div>

              {/* Claim Profile Form */}
              <ClaimProfileForm adjusterId={adjuster.id} adjusterName={fullName} isClaimed={adjuster.profile_claimed || false} />

              {/* Similar Adjusters */}
              {similarAdjusters.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Other Adjusters Nearby</h3>
                  </div>
                  <div className="space-y-3">
                    {similarAdjusters.map((adj) => (
                      <Link
                        key={adj.id}
                        href={`/adjuster/${adj.slug}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{adj.first_name} {adj.last_name}</div>
                          <div className="text-xs text-gray-500">{adj.city ? `${adj.city}, ` : ''}{adj.state}</div>
                        </div>
                        {adj.total_reviews > 0 && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-900">{adj.avg_rating?.toFixed(1)}</span>
                            </div>
                            <div className="text-xs text-gray-500">{adj.total_reviews} reviews</div>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link 
                    href={`/adjusters/${stateSlug}`}
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all in {stateName}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href={`/adjusters/${stateSlug}`} className="block text-sm text-gray-600 hover:text-blue-600 py-1">→ All {stateName} Adjusters</Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-blue-600 py-1">→ Browse by State</Link>
                  <Link href="/companies" className="block text-sm text-gray-600 hover:text-blue-600 py-1">→ Browse by Company</Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-blue-600 py-1">→ Homeowner Guides</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
