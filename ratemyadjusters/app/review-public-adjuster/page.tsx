'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronDown, ChevronUp, Shield, AlertTriangle, UserPlus, ChevronRight, Eye } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import ContentModeration, { ReviewPreview } from '@/components/ContentModeration'
import { trackModerationEvent } from '@/lib/content-moderation'

function ReviewPublicAdjusterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showOptionalRatings, setShowOptionalRatings] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [contentIsValid, setContentIsValid] = useState(true)
  const [contentHasWarnings, setContentHasWarnings] = useState(false)

  const [paSearch, setPaSearch] = useState('')
  const [paResults, setPaResults] = useState<any[]>([])
  const [selectedPA, setSelectedPA] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)

  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const [communicationRating, setCommunicationRating] = useState(0)
  const [knowledgeRating, setKnowledgeRating] = useState(0)
  const [resultsRating, setResultsRating] = useState(0)
  const [professionalismRating, setProfessionalismRating] = useState(0)

  const [claimType, setClaimType] = useState('')
  const [claimOutcome, setClaimOutcome] = useState('')
  const [settlementIncrease, setSettlementIncrease] = useState('')
  const [reviewerType, setReviewerType] = useState('homeowner')

  const [honeypot, setHoneypot] = useState('')

  const claimTypes = [
    { value: 'roof', label: 'Roof' },
    { value: 'water', label: 'Water Damage' },
    { value: 'fire', label: 'Fire' },
    { value: 'wind', label: 'Wind' },
    { value: 'hail', label: 'Hail' },
    { value: 'hurricane', label: 'Hurricane' },
    { value: 'flood', label: 'Flood' },
    { value: 'mold', label: 'Mold' },
    { value: 'theft', label: 'Theft' },
    { value: 'other', label: 'Other' },
  ]

  const claimOutcomes = [
    { value: 'approved', label: 'Fully Approved' },
    { value: 'partial', label: 'Partially Approved' },
    { value: 'denied', label: 'Denied' },
    { value: 'reopened', label: 'Claim Reopened' },
    { value: 'pending', label: 'Still Pending' },
  ]

  const settlementOptions = [
    { value: 'none', label: 'No increase' },
    { value: '1-25%', label: '1-25% increase' },
    { value: '26-50%', label: '26-50% increase' },
    { value: '51-100%', label: '51-100% increase' },
    { value: '100%+', label: 'Over 100% increase' },
    { value: 'unknown', label: 'Not sure' },
  ]

  const handleValidationChange = (isValid: boolean, hasWarnings: boolean) => {
    setContentIsValid(isValid)
    setContentHasWarnings(hasWarnings)
  }

  useEffect(() => {
    const name = searchParams.get('name')
    const paId = searchParams.get('pa')
    const ratingParam = searchParams.get('rating')

    if (name) {
      setPaSearch(name)
      searchPublicAdjusters(name)
    }

    if (paId) {
      fetchPAById(paId)
    }

    if (ratingParam) {
      const rating = parseInt(ratingParam)
      if (rating >= 1 && rating <= 5) {
        setOverallRating(rating)
      }
    }
  }, [searchParams])

  async function fetchPAById(id: string) {
    const { data } = await supabase
      .from('public_adjusters')
      .select('*')
      .eq('id', id)
      .single()

    if (data) {
      setSelectedPA(data)
      setStep(2)
    }
  }

  async function searchPublicAdjusters(query: string) {
    if (query.length < 2) {
      setPaResults([])
      return
    }

    setSearchLoading(true)
    const words = query.trim().split(/\s+/)

    let dbQuery = supabase
      .from('public_adjusters')
      .select('id, first_name, last_name, slug, state, company_name')

    if (words.length >= 2) {
      dbQuery = dbQuery
        .filter('first_name', 'ilike', '%' + words[0] + '%')
        .filter('last_name', 'ilike', '%' + words[1] + '%')
    } else {
      dbQuery = dbQuery.or('first_name.ilike.%' + query + '%,last_name.ilike.%' + query + '%,company_name.ilike.%' + query + '%')
    }

    const { data } = await dbQuery.limit(10)

    if (data) setPaResults(data)
    setSearchLoading(false)
  }

  async function handleSubmit() {
    setError(null)

    if (!selectedPA) {
      setError('Please select a public adjuster')
      return
    }

    if (overallRating === 0) {
      setError('Please select a rating (1-5 stars)')
      return
    }

    if (!reviewText.trim()) {
      setError('Please write a review')
      return
    }

    if (reviewText.trim().length < 20) {
      setError('Please write at least 20 characters in your review')
      return
    }

    if (!contentIsValid) {
      setError('Please fix the content issues highlighted above before submitting.')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (honeypot) {
      setSuccess(true)
      return
    }

    setLoading(true)

    trackModerationEvent('moderation_resolved', {
      textLength: reviewText.length,
    })

    const { error: submitError } = await supabase
      .from('public_adjuster_reviews')
      .insert({
        public_adjuster_id: selectedPA.id,
        overall_rating: overallRating,
        communication_rating: communicationRating || null,
        knowledge_rating: knowledgeRating || null,
        results_rating: resultsRating || null,
        professionalism_rating: professionalismRating || null,
        review_text: reviewText.trim(),
        claim_type: claimType || null,
        claim_outcome: claimOutcome || null,
        settlement_increase: settlementIncrease || null,
        reviewer_type: reviewerType,
        status: 'approved',
      })

    if (submitError) {
      console.error('Submit error:', submitError)
      setError('Failed to submit review. Please try again.')
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  function handlePreviewSubmit() {
    setShowPreview(false)
    handleSubmit()
  }

  const StarRatingInput = ({ rating, setRating, hover, setHover, size = 'lg' }: { rating: number; setRating: (r: number) => void; hover?: number; setHover?: (r: number) => void; size?: 'sm' | 'lg' }) => {
    const starSize = size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'
    const displayRating = hover || rating

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover && setHover(star)}
            onMouseLeave={() => setHover && setHover(0)}
            className="focus:outline-none"
          >
            <Star className={starSize + ' transition-colors ' + (star <= displayRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
          </button>
        ))}
      </div>
    )
  }

  const MiniStarRating = ({ label, rating, setRating }: { label: string; rating: number; setRating: (r: number) => void }) => {
    const [hover, setHover] = useState(0)
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700 text-sm">{label}</span>
        <StarRatingInput rating={rating} setRating={setRating} hover={hover} setHover={setHover} size="sm" />
      </div>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-emerald-600 fill-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">Your review has been submitted successfully.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push('/public-adjuster/' + selectedPA.slug)} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg">View Profile</button>
              <button onClick={() => router.push('/public-adjusters')} className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg">Browse More</button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Public Adjusters', item: 'https://ratemyadjusters.com/public-adjusters' },
      { '@type': 'ListItem', position: 3, name: 'Review', item: 'https://ratemyadjusters.com/review-public-adjuster' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Leave a Review</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Review a Public Adjuster</h1>
            </div>
            <p className="text-gray-600 mb-6">Help others by sharing your experience</p>

            {showGuidelines && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">Review Guidelines</h3>
                      <button onClick={() => setShowGuidelines(false)} className="text-gray-400 hover:text-gray-600 text-sm">Dismiss</button>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Be truthful • Focus on your claim experience • Include settlement results if possible • No personal attacks</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            {step === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search for a public adjuster</label>
                <input
                  type="text"
                  value={paSearch}
                  onChange={(e) => { setPaSearch(e.target.value); searchPublicAdjusters(e.target.value) }}
                  placeholder="Search by name or company..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                />

                {searchLoading && <p className="text-gray-500 text-sm mt-2">Searching...</p>}

                {paResults.length > 0 && (
                  <div className="mt-3 border border-gray-200 rounded-lg divide-y">
                    {paResults.map((pa) => (
                      <button
                        key={pa.id}
                        onClick={() => { setSelectedPA(pa); setStep(2) }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="text-emerald-600 font-semibold text-sm">{pa.first_name?.[0]}{pa.last_name?.[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{pa.first_name} {pa.last_name}</p>
                          <p className="text-sm text-gray-500">{pa.company_name ? `${pa.company_name} • ` : ''}{pa.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {paSearch.length >= 2 && paResults.length === 0 && !searchLoading && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-start gap-3">
                      <UserPlus className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700 text-sm font-medium">Can't find this public adjuster?</p>
                        <p className="text-gray-600 text-sm mt-1">They may not be in our database yet. You can add them and leave a review.</p>
                        <Link
                          href="/add-public-adjuster"
                          className="inline-flex items-center gap-1 mt-3 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add a Public Adjuster
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && selectedPA && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-semibold">{selectedPA.first_name?.[0]}{selectedPA.last_name?.[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedPA.first_name} {selectedPA.last_name}</p>
                    <p className="text-sm text-gray-600">{selectedPA.company_name ? `${selectedPA.company_name} • ` : ''}{selectedPA.state}</p>
                  </div>
                  <button onClick={() => { setSelectedPA(null); setStep(1) }} className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">Change</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Overall Rating *</label>
                  <div className="flex items-center gap-4">
                    <StarRatingInput rating={overallRating} setRating={setOverallRating} hover={hoverRating} setHover={setHoverRating} size="lg" />
                    {overallRating > 0 && <span className="text-gray-600">{['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][overallRating]}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
                  <ContentModeration
                    value={reviewText}
                    onChange={setReviewText}
                    onValidationChange={handleValidationChange}
                    placeholder="Share your experience with this public adjuster. How did they help with your claim? Were they responsive? Did they increase your settlement?"
                    minLength={20}
                    maxLength={2000}
                    rows={5}
                  />
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <button type="button" onClick={() => setShowOptionalRatings(!showOptionalRatings)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50">
                    <span className="font-medium text-gray-700">Rate specific qualities (optional)</span>
                    {showOptionalRatings ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {showOptionalRatings && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <MiniStarRating label="Communication" rating={communicationRating} setRating={setCommunicationRating} />
                      <MiniStarRating label="Knowledge" rating={knowledgeRating} setRating={setKnowledgeRating} />
                      <MiniStarRating label="Results" rating={resultsRating} setRating={setResultsRating} />
                      <MiniStarRating label="Professionalism" rating={professionalismRating} setRating={setProfessionalismRating} />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Claim Type</label>
                    <select value={claimType} onChange={(e) => setClaimType(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900">
                      <option value="">Select...</option>
                      {claimTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Claim Outcome</label>
                    <select value={claimOutcome} onChange={(e) => setClaimOutcome(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900">
                      <option value="">Select...</option>
                      {claimOutcomes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Increase (if any)</label>
                  <select value={settlementIncrease} onChange={(e) => setSettlementIncrease(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900">
                    <option value="">Select...</option>
                    {settlementOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">How much more did you receive compared to the initial offer?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                  <div className="flex gap-4">
                    {[{ value: 'homeowner', label: 'Homeowner' }, { value: 'contractor', label: 'Contractor' }].map((t) => (
                      <label key={t.value} className={'flex-1 text-center py-3 px-4 rounded-lg border cursor-pointer transition-colors ' + (reviewerType === t.value ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-300 text-gray-700 hover:border-gray-400')}>
                        <input type="radio" name="reviewerType" value={t.value} checked={reviewerType === t.value} onChange={(e) => setReviewerType(e.target.value)} className="sr-only" />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    disabled={loading || overallRating === 0 || reviewText.trim().length < 20}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 font-semibold py-4 px-6 rounded-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    Preview
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || overallRating === 0 || reviewText.trim().length < 20 || !contentIsValid}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                  >
                    {loading ? 'Submitting...' : !contentIsValid ? 'Fix Issues to Submit' : 'Submit Review'}
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our <Link href="/review-guidelines" className="text-emerald-600 hover:underline">review guidelines</Link>. All reviews are moderated.
                </p>
              </div>
            )}

            {showPreview && (
              <ReviewPreview
                value={reviewText}
                onClose={() => setShowPreview(false)}
                onSubmit={handlePreviewSubmit}
                isSubmitting={loading}
                hasIssues={!contentIsValid}
              />
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/public-adjusters" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-emerald-600">Browse Public Adjusters</div>
                  <div className="text-sm text-gray-500">Find by state</div>
                </div>
              </Link>
              <Link href="/guides" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-emerald-600">Guides & Resources</div>
                  <div className="text-sm text-gray-500">Helpful articles</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function ReviewPublicAdjusterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ReviewPublicAdjusterContent />
    </Suspense>
  )
}
