import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, Shield, ChevronRight, Clock, Users, Phone, Mail, Globe, Award, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import ShareButtons from '@/components/ShareButtons'
import ReportReviewButton from '@/components/ReportReviewButton'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

async function getPublicAdjuster(slug: string) {
  const { data, error } = await supabase
    .from('public_adjusters')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getReviews(paId: string) {
  const { data } = await supabase
    .from('public_adjuster_reviews')
    .select('*')
    .eq('public_adjuster_id', paId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

async function getSimilarPAs(state: string, currentId: string) {
  const { data } = await supabase
    .from('public_adjusters')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews')
    .eq('state', state)
    .neq('id', currentId)
    .order('total_reviews', { ascending: false })
    .limit(5)

  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pa = await getPublicAdjuster(params.slug)
  
  if (!pa) {
    return { title: 'Public Adjuster Not Found | RateMyAdjusters' }
  }

  const displayName = pa.company_name || `${pa.first_name} ${pa.last_name}`
  const stateFullName = getStateName(pa.state)
  const cityText = pa.city ? pa.city + ', ' : ''
  
  return {
    title: `${displayName} – Public Adjuster Reviews (${pa.state}) | RateMyAdjusters`,
    description: `Read reviews of ${displayName}, a licensed public adjuster in ${cityText}${stateFullName}. See ratings from homeowners, settlement results, and claim experiences.`,
    alternates: {
      canonical: 'https://ratemyadjusters.com/public-adjuster/' + pa.slug,
    },
    openGraph: {
      title: `${displayName} – Public Adjuster Reviews`,
      description: `See what homeowners say about ${displayName}, a public adjuster in ${stateFullName}.`,
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
    if (date.getFullYear() < 1980) return 'Historical Review'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Historical Review'
  }
}

function formatSettlementIncrease(value: string | null): string {
  if (!value) return ''
  const labels: Record<string, string> = {
    'none': 'No increase',
    '1-25%': '1-25% increase',
    '26-50%': '26-50% increase',
    '51-100%': '51-100% increase',
    '100%+': '100%+ increase',
    'unknown': 'Unknown',
  }
  return labels[value] || value
}

function getFAQs(displayName: string, state: string) {
  const stateName = getStateName(state)
  
  return [
    {
      question: `What does a public adjuster do?`,
      answer: `A public adjuster represents homeowners (not insurance companies) in property damage claims. They inspect damage, prepare estimates, negotiate with insurers, and work to maximize your settlement.`,
    },
    {
      question: `How can I leave a review for ${displayName}?`,
      answer: `Click the "Leave a Review" button above. Your feedback helps other homeowners find trustworthy public adjusters.`,
    },
    {
      question: `Is ${displayName} licensed in ${stateName}?`,
      answer: `${displayName} is listed as a public adjuster in ${stateName}. License details are shown when available. Always verify licensing with your state's insurance department.`,
    },
    {
      question: `How much do public adjusters charge?`,
      answer: `Public adjusters typically charge 5-15% of the settlement amount. Fees vary by state and claim complexity. Always get the fee structure in writing before signing.`,
    },
  ]
}

export default async function PublicAdjusterProfile({ params }: PageProps) {
  const pa = await getPublicAdjuster(params.slug)
  if (!pa) notFound()

  const reviews = await getReviews(pa.id)
  const similarPAs = await getSimilarPAs(pa.state, pa.id)
  
  const displayName = pa.company_name || `${pa.first_name} ${pa.last_name}`
  const fullName = `${pa.first_name} ${pa.last_name}`
  const profileUrl = 'https://ratemyadjusters.com/public-adjuster/' + pa.slug
  const isPendingVerification = pa.license_status === 'pending_verification'
  const stateName = getStateName(pa.state)
  const stateSlug = getStateSlug(pa.state)
  const location = pa.city ? `${pa.city}, ${stateName}` : stateName
  const faqs = getFAQs(displayName, pa.state)
  const specialties = pa.specialties || []

  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: displayName,
    url: profileUrl,
    description: `Public adjuster serving ${stateName}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: pa.city || undefined,
      addressRegion: pa.state,
      addressCountry: 'US',
    },
    ...(pa.phone && { telephone: pa.phone }),
    ...(pa.total_reviews > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: pa.avg_rating?.toFixed(1) || '0',
        reviewCount: pa.total_reviews || 0,
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
      { '@type': 'ListItem', position: 2, name: 'Public Adjusters', item: 'https://ratemyadjusters.com/public-adjusters' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://ratemyadjusters.com/public-adjusters/${stateSlug}` },
      { '@type': 'ListItem', position: 4, name: displayName, item: profileUrl },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
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
              <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/public-adjusters/${stateSlug}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{displayName}</span>
            </nav>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{pa.first_name?.[0]}{pa.last_name?.[0]}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{displayName}</h1>
                  {!pa.profile_claimed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                      <Shield className="w-3 h-3" />
                      Profile Unclaimed
                    </span>
                  )}
                </div>
                
                {pa.company_name && (
                  <p className="text-gray-600 mb-2">{fullName}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Public Adjuster
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </span>
                  {pa.years_experience && (
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {pa.years_experience} years experience
                    </span>
                  )}
                </div>

                {/* Stats Box */}
                <div className="flex flex-wrap items-center gap-6 p-4 bg-emerald-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={pa.avg_rating || 0} size="lg" />
                      <span className="text-2xl font-bold text-gray-900">{pa.avg_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                  <div className="h-10 w-px bg-emerald-200 hidden sm:block" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{pa.total_reviews || 0}</p>
                    <p className="text-sm text-gray-500">Reviews</p>
                  </div>
                  <div className="h-10 w-px bg-emerald-200 hidden sm:block" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{location}</p>
                    <p className="text-sm text-gray-500">Service Area</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href={'/review-public-adjuster?pa=' + pa.id} className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  Leave a Review
                </Link>
                <ShareButtons url={profileUrl} title={displayName + ' - Public Adjuster Reviews'} />
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {displayName}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {displayName} is a public adjuster serving homeowners in {stateName}.
                  Public adjusters work on behalf of policyholders (not insurance companies) to help maximize claim settlements. They inspect property damage, prepare detailed estimates, and negotiate with insurance carriers.
                </p>
              </div>

              {/* Specialties */}
              {specialties.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((spec: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Hire a Public Adjuster */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Why Hire a Public Adjuster?</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Insurance company adjusters work for the insurer. Public adjusters work for YOU. They can help ensure you receive a fair settlement for your property damage claim.
                    </p>
                  </div>
                </div>
              </div>

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
                    <p className="text-gray-500 mb-4">Be the first to share your experience with {displayName}.</p>
                    <Link href={'/review-public-adjuster?pa=' + pa.id} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg">
                      Leave a Review
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-600 font-semibold text-sm">{review.reviewer_display_name?.[0] || 'A'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{review.reviewer_display_name || 'Anonymous'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">
                                {review.reviewer_type === 'contractor' ? 'Contractor' : 'Homeowner'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">{formatReviewDate(review.created_at)}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {review.claim_type && (
                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{review.claim_type} Claim</span>
                              )}
                              {review.settlement_increase && review.settlement_increase !== 'unknown' && (
                                <span className="inline-block px-2 py-1 bg-emerald-100 rounded text-xs text-emerald-700">
                                  {formatSettlementIncrease(review.settlement_increase)}
                                </span>
                              )}
                              {review.claim_outcome && (
                                <span className="inline-block px-2 py-1 bg-blue-100 rounded text-xs text-blue-700 capitalize">
                                  {review.claim_outcome}
                                </span>
                              )}
                            </div>
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
                  <HelpCircle className="w-5 h-5 text-emerald-600" />
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
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Name</dt>
                    <dd className="text-gray-900 font-medium">{fullName}</dd>
                  </div>
                  {pa.company_name && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Company</dt>
                      <dd className="text-gray-900 font-medium">{pa.company_name}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">State</dt>
                    <dd className="text-gray-900 font-medium">{stateName}</dd>
                  </div>
                  {pa.city && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">City</dt>
                      <dd className="text-gray-900 font-medium">{pa.city}</dd>
                    </div>
                  )}
                  {pa.phone && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</dt>
                      <dd><a href={`tel:${pa.phone}`} className="text-emerald-600 hover:text-emerald-700 font-medium">{pa.phone}</a></dd>
                    </div>
                  )}
                  {pa.email && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</dt>
                      <dd><a href={`mailto:${pa.email}`} className="text-emerald-600 hover:text-emerald-700 font-medium">{pa.email}</a></dd>
                    </div>
                  )}
                  {pa.website && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3" /> Website</dt>
                      <dd><a href={pa.website.startsWith('http') ? pa.website : `https://${pa.website}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">Visit Site</a></dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* License Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">License Information</h3>
                <dl className="space-y-3 text-sm">
                  {pa.license_number && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">License #</dt>
                      <dd className="text-gray-900 font-medium">{pa.license_number}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd className={'font-medium ' + (pa.license_status === 'active' ? 'text-green-600' : pa.license_status === 'pending_verification' ? 'text-amber-600' : 'text-gray-600')}>
                      {pa.license_status === 'active' ? 'Active' : pa.license_status === 'pending_verification' ? 'Pending Verification' : pa.license_status === 'expired' ? 'Expired' : 'Unknown'}
                    </dd>
                  </div>
                  {pa.years_experience && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Experience</dt>
                      <dd className="text-gray-900 font-medium">{pa.years_experience} years</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Similar PAs */}
              {similarPAs.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Other Public Adjusters in {stateName}</h3>
                  </div>
                  <div className="space-y-3">
                    {similarPAs.map((adj) => (
                      <Link
                        key={adj.id}
                        href={`/public-adjuster/${adj.slug}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{adj.company_name || `${adj.first_name} ${adj.last_name}`}</div>
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
                    href={`/public-adjusters/${stateSlug}`}
                    className="mt-4 inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
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
                  <Link href={`/public-adjusters/${stateSlug}`} className="block text-sm text-gray-600 hover:text-emerald-600 py-1">→ All {stateName} Public Adjusters</Link>
                  <Link href="/public-adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">→ Browse by State</Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">→ Insurance Adjusters</Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-emerald-600 py-1">→ Homeowner Guides</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not evaluate or endorse public adjusters. Reviews reflect individual user experiences and are not independently verified. Always verify licensing with your state's insurance department.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
