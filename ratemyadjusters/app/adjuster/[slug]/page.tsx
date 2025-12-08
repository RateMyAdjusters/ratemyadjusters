import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, Shield, AlertCircle, ChevronRight, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import ShareButtons from '@/components/ShareButtons'
import ConfirmAdjusterButton from '@/components/ConfirmAdjusterButton'
import DisagreeButton from '@/components/DisagreeButton'
import ClaimButton from '@/components/ClaimButton'

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const adjuster = await getAdjuster(params.slug)
  
  if (!adjuster) {
    return { title: 'Adjuster Not Found | RateMyAdjusters' }
  }

  const fullName = adjuster.first_name + ' ' + adjuster.last_name
  const stateFullName = getStateName(adjuster.state)
  
  return {
    title: fullName + ' – Insurance Adjuster Reviews (' + adjuster.state + ') | RateMyAdjusters',
    description: 'See real homeowner and contractor experiences with ' + fullName + ', an insurance adjuster licensed in ' + stateFullName + '. Ratings, reviews, license details, and more.',
    alternates: {
      canonical: 'https://ratemyadjusters.com/adjuster/' + adjuster.slug,
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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Not listed'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Not listed'
  }
}

export default async function AdjusterProfile({ params }: PageProps) {
  const adjuster = await getAdjuster(params.slug)
  if (!adjuster) notFound()

  const reviews = await getReviews(adjuster.id)
  const fullName = adjuster.first_name + ' ' + adjuster.last_name
  const profileUrl = 'https://ratemyadjusters.com/adjuster/' + adjuster.slug
  const isPendingVerification = adjuster.license_status === 'pending_verification'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    jobTitle: adjuster.qualification || 'Insurance Adjuster',
    address: { '@type': 'PostalAddress', addressRegion: adjuster.state, addressCountry: 'US' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Pending Verification Banner */}
        {isPendingVerification && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                <strong>Pending Verification:</strong> This profile was recently added by a user and is awaiting verification.
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
              <Link href="/search" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={'/search?state=' + adjuster.state} className="text-gray-500 hover:text-gray-700">{adjuster.state}</Link>
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
                  {isPendingVerification ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-300 text-amber-700 bg-amber-50">
                      <Clock className="w-3 h-3" />
                      Pending Verification
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                      <Shield className="w-3 h-3" />
                      Unverified
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Unknown Company
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {adjuster.city ? adjuster.city + ', ' : ''}{adjuster.state}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <StarRating rating={adjuster.avg_rating || 0} size="lg" />
                    <span className="text-2xl font-bold text-gray-900">{adjuster.avg_rating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <span className="text-gray-500">({adjuster.total_reviews || 0} reviews)</span>
                </div>
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
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Reviews ({adjuster.total_reviews || 0})</h2>
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
                              <span className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            {review.claim_type && (
                              <div className="flex gap-2 mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{review.claim_type} Claim</span>
                                {review.claim_outcome && (
                                  <span className={'inline-block px-2 py-1 rounded text-xs ' + (review.claim_outcome === 'approved' ? 'bg-green-100 text-green-700' : review.claim_outcome === 'denied' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600')}>
                                    {review.claim_outcome}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="text-gray-700 leading-relaxed mb-3">{review.review_text}</p>
                            <DisagreeButton reviewId={review.id} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">License Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-gray-900 font-medium">{fullName}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">State</dt><dd className="text-gray-900 font-medium">{getStateName(adjuster.state)}</dd></div>
                  {adjuster.city && <div className="flex justify-between"><dt className="text-gray-500">City</dt><dd className="text-gray-900 font-medium">{adjuster.city}</dd></div>}
                  {adjuster.license_number && <div className="flex justify-between"><dt className="text-gray-500">License #</dt><dd className="text-gray-900 font-medium">{adjuster.license_number}</dd></div>}
                  {adjuster.qualification && <div className="flex justify-between"><dt className="text-gray-500">License Type</dt><dd className="text-gray-900 font-medium text-right">{adjuster.qualification}</dd></div>}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd className={'font-medium ' + (adjuster.license_status === 'active' ? 'text-green-600' : adjuster.license_status === 'pending_verification' ? 'text-amber-600' : 'text-gray-600')}>
                      {adjuster.license_status === 'pending_verification' ? 'Pending Verification' : adjuster.license_status === 'active' ? 'Active' : adjuster.license_status === 'expired' ? 'Expired' : 'Unknown'}
                    </dd>
                  </div>
                  <div className="flex justify-between"><dt className="text-gray-500">Issued</dt><dd className="text-gray-900 font-medium">{formatDate(adjuster.issued_on)}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Expires</dt><dd className="text-gray-900 font-medium">{formatDate(adjuster.expires_on)}</dd></div>
                </dl>
              </div>

              <div className="mb-6">
                <ClaimButton slug={adjuster.slug} isClaimed={adjuster.profile_claimed || false} />
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Is this you?</h3>
                    <p className="text-sm text-gray-600 mb-3">Claim your profile to respond to reviews and update your information.</p>
                    <Link href="/for-adjusters" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Learn more →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
