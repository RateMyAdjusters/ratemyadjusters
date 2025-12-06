import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin, Calendar, ThumbsUp, AlertCircle } from 'lucide-react'
import StarRating from '@/components/StarRating'
import { formatDate, formatRating, getRatingBgColor } from '@/lib/utils'

// This would come from Supabase in production
async function getAdjuster(company: string, slug: string) {
  // Mock data for now - replace with Supabase query
  return {
    id: '1',
    first_name: 'John',
    last_name: 'Smith',
    full_name: 'John Smith',
    slug: 'john-smith',
    company: {
      id: '1',
      name: 'State Farm',
      slug: 'state-farm',
    },
    title: 'Field Adjuster',
    region: 'Michigan',
    state: 'MI',
    total_reviews: 12,
    avg_rating: 3.8,
    communication_score: 4.1,
    fairness_score: 3.5,
    timeliness_score: 3.8,
    professionalism_score: 4.0,
    approval_rate: 72,
    profile_claimed: false,
    reviews: [
      {
        id: '1',
        overall_rating: 4,
        title: 'Professional but slow',
        review_text: 'John was professional and thorough, but the process took longer than expected. He was responsive to calls and explained everything well.',
        claim_type: 'water_damage',
        claim_outcome: 'approved',
        reviewer_type: 'homeowner',
        reviewer_display_name: 'Mike T.',
        created_at: '2024-01-15T00:00:00Z',
        helpful_count: 5,
      },
      {
        id: '2',
        overall_rating: 3,
        title: 'Fair assessment',
        review_text: 'Initial offer was low but he was willing to work with us after we provided additional documentation. Communication could have been better.',
        claim_type: 'hail',
        claim_outcome: 'partial',
        reviewer_type: 'contractor',
        reviewer_display_name: 'ABC Roofing',
        created_at: '2024-01-10T00:00:00Z',
        helpful_count: 3,
      },
    ],
  }
}

export async function generateMetadata({ params }: { params: { company: string, slug: string } }): Promise<Metadata> {
  const adjuster = await getAdjuster(params.company, params.slug)
  
  if (!adjuster) {
    return { title: 'Adjuster Not Found' }
  }

  const title = `${adjuster.full_name} - ${adjuster.company.name} Adjuster Reviews`
  const description = `Read ${adjuster.total_reviews} reviews of ${adjuster.full_name}, ${adjuster.company.name} insurance adjuster. ${adjuster.avg_rating?.toFixed(1)}★ rating • ${adjuster.approval_rate}% approval rate.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
  }
}

export default async function AdjusterProfile({ params }: { params: { company: string, slug: string } }) {
  const adjuster = await getAdjuster(params.company, params.slug)

  if (!adjuster) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/company/${adjuster.company.slug}`} className="hover:text-primary-600">
              {adjuster.company.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{adjuster.full_name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="card">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-400">
                      {adjuster.first_name[0]}{adjuster.last_name[0]}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {adjuster.full_name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <Link href={`/company/${adjuster.company.slug}`} className="hover:text-primary-600">
                        {adjuster.company.name}
                      </Link>
                    </div>
                    {adjuster.title && (
                      <span className="text-gray-400">•</span>
                    )}
                    {adjuster.title && (
                      <span>{adjuster.title}</span>
                    )}
                    {adjuster.state && (
                      <>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{adjuster.region || adjuster.state}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <StarRating 
                    rating={adjuster.avg_rating} 
                    size="lg" 
                    reviewCount={adjuster.total_reviews}
                  />
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className={`card text-center ${getRatingBgColor(adjuster.communication_score)}`}>
                <div className="text-2xl font-bold text-gray-900">
                  {formatRating(adjuster.communication_score)}
                </div>
                <div className="text-sm text-gray-600">Communication</div>
              </div>
              <div className={`card text-center ${getRatingBgColor(adjuster.fairness_score)}`}>
                <div className="text-2xl font-bold text-gray-900">
                  {formatRating(adjuster.fairness_score)}
                </div>
                <div className="text-sm text-gray-600">Fairness</div>
              </div>
              <div className={`card text-center ${getRatingBgColor(adjuster.timeliness_score)}`}>
                <div className="text-2xl font-bold text-gray-900">
                  {formatRating(adjuster.timeliness_score)}
                </div>
                <div className="text-sm text-gray-600">Timeliness</div>
              </div>
              <div className={`card text-center ${getRatingBgColor(adjuster.professionalism_score)}`}>
                <div className="text-2xl font-bold text-gray-900">
                  {formatRating(adjuster.professionalism_score)}
                </div>
                <div className="text-sm text-gray-600">Professionalism</div>
              </div>
            </div>

            {/* Approval Rate */}
            {adjuster.approval_rate !== null && (
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Claim Outcomes</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-grow bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${adjuster.approval_rate}%` }}
                    />
                  </div>
                  <span className="font-semibold text-gray-900 whitespace-nowrap">
                    {adjuster.approval_rate}% approved
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Based on {adjuster.total_reviews} reported claim outcomes
                </p>
              </div>
            )}

            {/* Reviews */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reviews ({adjuster.total_reviews})
                </h2>
                <Link href={`/review?adjuster=${adjuster.id}`} className="btn-primary">
                  Write a Review
                </Link>
              </div>

              {adjuster.reviews.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to review this adjuster</p>
                  <Link href={`/review?adjuster=${adjuster.id}`} className="btn-primary">
                    Write the First Review
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {adjuster.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <StarRating rating={review.overall_rating} size="sm" showNumber={false} />
                          {review.title && (
                            <h4 className="font-semibold text-gray-900 mt-1">{review.title}</h4>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{review.review_text}</p>

                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        {review.claim_type && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {review.claim_type.replace('_', ' ')}
                          </span>
                        )}
                        {review.claim_outcome && (
                          <span className={`px-2 py-1 rounded ${
                            review.claim_outcome === 'approved' ? 'bg-green-100 text-green-700' :
                            review.claim_outcome === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {review.claim_outcome}
                          </span>
                        )}
                        <span className="text-gray-500">
                          by {review.reviewer_display_name} ({review.reviewer_type})
                        </span>
                        <button className="flex items-center gap-1 text-gray-500 hover:text-primary-600">
                          <ThumbsUp className="w-4 h-4" />
                          Helpful ({review.helpful_count})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Write Review CTA */}
            <div className="card bg-primary-50 border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Worked with {adjuster.first_name}?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Share your experience to help other homeowners and contractors.
              </p>
              <Link href={`/review?adjuster=${adjuster.id}`} className="btn-primary w-full text-center block">
                Write a Review
              </Link>
            </div>

            {/* Claim Profile */}
            {!adjuster.profile_claimed && (
              <div className="card border-dashed">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are you {adjuster.full_name}?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Claim this profile to respond to reviews and update your information.
                </p>
                <button className="btn-secondary w-full">
                  Claim Profile
                </button>
              </div>
            )}

            {/* Need Help CTA */}
            <div className="card bg-yellow-50 border-yellow-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Having trouble with your claim?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                A public adjuster works for YOU, not the insurance company.
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors">
                Get Free Consultation
              </button>
            </div>

            {/* Other Adjusters */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">
                Other {adjuster.company.name} Adjusters
              </h3>
              <p className="text-gray-500 text-sm">
                More adjusters coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: adjuster.full_name,
            jobTitle: adjuster.title || 'Insurance Adjuster',
            worksFor: {
              '@type': 'Organization',
              name: adjuster.company.name,
            },
            address: {
              '@type': 'PostalAddress',
              addressRegion: adjuster.state,
            },
            aggregateRating: adjuster.avg_rating ? {
              '@type': 'AggregateRating',
              ratingValue: adjuster.avg_rating.toFixed(1),
              reviewCount: adjuster.total_reviews,
              bestRating: '5',
              worstRating: '1',
            } : undefined,
          }),
        }}
      />
    </div>
  )
}
