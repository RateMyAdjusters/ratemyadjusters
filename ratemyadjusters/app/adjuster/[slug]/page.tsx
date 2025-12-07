import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, MapPin, Shield, AlertCircle } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import StarRating from '@/components/StarRating'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Fetch adjuster by slug
async function getAdjuster(slug: string) {
  const { data: adjuster, error } = await supabase
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

  if (error || !adjuster) {
    return null
  }

  // Fetch reviews for this adjuster
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('adjuster_id', adjuster.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  return {
    ...adjuster,
    company: adjuster.companies,
    reviews: reviews || []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const adjuster = await getAdjuster(params.slug)
  
  if (!adjuster) {
    return { title: 'Adjuster Not Found | RateMyAdjusters' }
  }

  const companyName = adjuster.company?.name || 'Insurance'
  const fullName = `${adjuster.first_name} ${adjuster.last_name}`
  const city = adjuster.business_city || adjuster.city || ''
  const state = adjuster.state || 'TX'
  
  const title = `${fullName} - ${companyName} Claims Adjuster Reviews | ${state}`
  const description = adjuster.total_reviews > 0
    ? `Read ${adjuster.total_reviews} reviews of ${fullName}, ${companyName} insurance adjuster in ${city}, ${state}. ${adjuster.avg_rating?.toFixed(1) || 'No'}★ rating. See what homeowners say.`
    : `${fullName} is a ${companyName} insurance adjuster in ${city}, ${state}. Be the first to write a review.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

// Helper functions
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export default async function AdjusterProfile({ params }: { params: { slug: string } }) {
  const adjuster = await getAdjuster(params.slug)

  if (!adjuster) {
    notFound()
  }

  const fullName = `${adjuster.first_name} ${adjuster.last_name}`
  const companyName = adjuster.company?.name || 'Unknown Company'
  const companySlug = adjuster.company?.slug || ''

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/search" className="hover:text-blue-600">Adjusters</Link>
            <span className="mx-2">/</span>
            {companySlug && (
              <>
                <Link href={`/company/${companySlug}`} className="hover:text-blue-600">
                  {companyName}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-900">{fullName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-blue-600">
                      {adjuster.first_name[0]}{adjuster.last_name[0]}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {fullName}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {companySlug ? (
                        <Link href={`/company/${companySlug}`} className="hover:text-blue-600">
                          {companyName}
                        </Link>
                      ) : (
                        <span>{companyName}</span>
                      )}
                    </div>
                    
                    {adjuster.title && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span>{adjuster.title}</span>
                      </>
                    )}
                    
                    {(adjuster.business_city || adjuster.city) && (
                      <>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{adjuster.business_city || adjuster.city}, {adjuster.state}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    {adjuster.avg_rating > 0 ? (
                      <>
                        <StarRating rating={adjuster.avg_rating} size="lg" />
                        <span className="text-gray-600">
                          ({adjuster.total_reviews} {adjuster.total_reviews === 1 ? 'review' : 'reviews'})
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">No reviews yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* License Information */}
            {adjuster.license_number && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  License Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    <p className="font-medium text-gray-900">{adjuster.license_number}</p>
                  </div>
                  {adjuster.license_type && (
                    <div>
                      <p className="text-sm text-gray-500">License Type</p>
                      <p className="font-medium text-gray-900">{adjuster.license_type}</p>
                    </div>
                  )}
                  {adjuster.license_qualification && (
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium text-gray-900">{adjuster.license_qualification}</p>
                    </div>
                  )}
                  {adjuster.license_status && (
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                        adjuster.license_status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {adjuster.license_status.charAt(0).toUpperCase() + adjuster.license_status.slice(1)}
                      </span>
                    </div>
                  )}
                  {adjuster.license_expiration_date && (
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(adjuster.license_expiration_date)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Reviews {adjuster.total_reviews > 0 && `(${adjuster.total_reviews})`}
                </h2>
                <Link 
                  href={`/review?adjuster=${adjuster.id}`} 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Write a Review
                </Link>
              </div>

              {adjuster.reviews.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-4">Be the first to review {adjuster.first_name}</p>
                  <Link 
                    href={`/review?adjuster=${adjuster.id}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-block"
                  >
                    Write the First Review
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {adjuster.reviews.map((review: any) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <StarRating rating={review.overall_rating} size="sm" />
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
                        {review.reviewer_display_name && (
                          <span className="text-gray-500">
                            by {review.reviewer_display_name}
                          </span>
                        )}
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Worked with {adjuster.first_name}?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Share your experience to help other homeowners and contractors.
              </p>
              <Link 
                href={`/review?adjuster=${adjuster.id}`} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full text-center block"
              >
                Write a Review
              </Link>
            </div>

            {/* Claim Profile */}
            {!adjuster.profile_claimed && (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Are you {fullName}?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Claim this profile to respond to reviews and update your information.
                </p>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors w-full">
                  Claim Profile
                </button>
              </div>
            )}

            {/* Need Help CTA */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Having trouble with your claim?
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                A public adjuster works for YOU, not the insurance company. They typically recover 30-50% more.
              </p>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors">
                Get Free Consultation
              </button>
            </div>

            {/* Location Info */}
            {adjuster.business_city && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <p className="text-gray-600">
                  {adjuster.business_city}, {adjuster.business_state || adjuster.state} {adjuster.business_postal_code}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: fullName,
            jobTitle: adjuster.title || 'Insurance Claims Adjuster',
            worksFor: {
              '@type': 'Organization',
              name: companyName,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: adjuster.business_city || adjuster.city,
              addressRegion: adjuster.state,
              postalCode: adjuster.business_postal_code,
            },
            ...(adjuster.avg_rating > 0 && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: adjuster.avg_rating.toFixed(1),
                reviewCount: adjuster.total_reviews,
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }),
        }}
      />
    </div>
  )
}
