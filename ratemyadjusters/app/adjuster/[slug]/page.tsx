import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, Shield, AlertCircle, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

interface PageProps {
  params: { slug: string }
}

async function getAdjuster(slug: string) {
  const { data, error } = await supabase
    .from('adjusters')
    .select(`
      *,
      companies (
        id,
        name,
        slug
      )
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return null
  }

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
    return {
      title: 'Adjuster Not Found | RateMyAdjusters',
    }
  }

  const companyName = adjuster.companies?.name || 'Insurance'
  const fullName = `${adjuster.first_name} ${adjuster.last_name}`
  
  return {
    title: `${fullName} - ${companyName} Adjuster Reviews | ${adjuster.state} | RateMyAdjusters`,
    description: `Read ${adjuster.total_reviews || 0} reviews of ${fullName}, ${companyName} insurance adjuster in ${adjuster.state}. ${adjuster.avg_rating?.toFixed(1) || '0.0'}★ rating. See what homeowners say.`,
    openGraph: {
      title: `${fullName} - ${companyName} Adjuster Reviews`,
      description: `${adjuster.total_reviews || 0} reviews • ${adjuster.avg_rating?.toFixed(1) || '0.0'}★ rating`,
      type: 'profile',
    },
  }
}

export default async function AdjusterProfile({ params }: PageProps) {
  const adjuster = await getAdjuster(params.slug)

  if (!adjuster) {
    notFound()
  }

  const reviews = await getReviews(adjuster.id)
  const companyName = adjuster.companies?.name || 'Unknown Company'
  const fullName = `${adjuster.first_name} ${adjuster.last_name}`

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/search" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{fullName}</span>
          </nav>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-3xl">
                  {adjuster.first_name?.[0]}{adjuster.last_name?.[0]}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                {/* Verified Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                  <Shield className="w-3 h-3" />
                  Unverified
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {companyName}
                </span>
                {adjuster.title && (
                  <span>• {adjuster.title}</span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {adjuster.state}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <StarRating rating={adjuster.avg_rating || 0} size="lg" />
                  <span className="text-2xl font-bold text-gray-900">
                    {adjuster.avg_rating?.toFixed(1) || '0.0'}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({adjuster.total_reviews || 0} review{adjuster.total_reviews !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <Link
                href={`/review?adjuster=${adjuster.id}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Star className="w-5 h-5" />
                Write a Review
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            {(adjuster.communication_score || adjuster.fairness_score || adjuster.speed_score) && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {adjuster.communication_score && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{adjuster.communication_score.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">Communication</div>
                  </div>
                )}
                {adjuster.fairness_score && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{adjuster.fairness_score.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">Fairness</div>
                  </div>
                )}
                {adjuster.speed_score && (
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-gray-900">{adjuster.speed_score.toFixed(1)}</div>
                    <div className="text-sm text-gray-500">Speed</div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Reviews ({adjuster.total_reviews || 0})
                </h2>
              </div>

              {reviews.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to share your experience with {fullName}.</p>
                  <Link
                    href={`/review?adjuster=${adjuster.id}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Write a Review
                  </Link>
                </div>
              ) : (
                <div className="divide-y">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">
                            {review.reviewer_display_name?.[0] || 'A'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              {review.reviewer_display_name || 'Anonymous'}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">
                              {review.reviewer_type === 'contractor' ? 'Contractor' : 
                               review.reviewer_type === 'public_adjuster' ? 'Public Adjuster' : 'Homeowner'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <StarRating rating={review.overall_rating} />
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {review.claim_type && (
                            <div className="flex gap-2 mb-3">
                              <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                {review.claim_type.charAt(0).toUpperCase() + review.claim_type.slice(1)} Claim
                              </span>
                              {review.claim_outcome && (
                                <span className={`inline-block px-2 py-1 rounded text-xs ${
                                  review.claim_outcome === 'approved' ? 'bg-green-100 text-green-700' :
                                  review.claim_outcome === 'denied' ? 'bg-red-100 text-red-700' :
                                  review.claim_outcome === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {review.claim_outcome.charAt(0).toUpperCase() + review.claim_outcome.slice(1)}
                                </span>
                              )}
                            </div>
                          )}
                          <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Adjuster Information</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Company</dt>
                  <dd className="text-gray-900 font-medium">{companyName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">State</dt>
                  <dd className="text-gray-900 font-medium">{adjuster.state}</dd>
                </div>
                {adjuster.license_number && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">License #</dt>
                    <dd className="text-gray-900 font-medium">{adjuster.license_number}</dd>
                  </div>
                )}
                {adjuster.license_status && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd className={`font-medium ${
                      adjuster.license_status === 'active' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {adjuster.license_status.charAt(0).toUpperCase() + adjuster.license_status.slice(1)}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Claim Profile CTA */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Is this you?</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Claim your profile to respond to reviews and update your information.
                  </p>
                  <Link
                    href="/for-adjusters"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
