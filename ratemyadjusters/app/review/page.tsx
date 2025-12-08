'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronDown, ChevronUp, Shield, AlertTriangle, UserPlus, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function ReviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showOptionalRatings, setShowOptionalRatings] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(true)
  
  const [adjusterSearch, setAdjusterSearch] = useState('')
  const [adjusterResults, setAdjusterResults] = useState<any[]>([])
  const [selectedAdjuster, setSelectedAdjuster] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  
  const [communicationRating, setCommunicationRating] = useState(0)
  const [fairnessRating, setFairnessRating] = useState(0)
  const [speedRating, setSpeedRating] = useState(0)
  const [professionalismRating, setProfessionalismRating] = useState(0)
  
  const [claimType, setClaimType] = useState('')
  const [claimOutcome, setClaimOutcome] = useState('')
  const [reviewerType, setReviewerType] = useState('homeowner')
  
  const [honeypot, setHoneypot] = useState('')
  
  const claimTypes = [
    { value: 'roof', label: 'Roof' },
    { value: 'water', label: 'Water Damage' },
    { value: 'fire', label: 'Fire' },
    { value: 'wind', label: 'Wind' },
    { value: 'hail', label: 'Hail' },
    { value: 'theft', label: 'Theft' },
    { value: 'flood', label: 'Flood' },
    { value: 'other', label: 'Other' },
  ]
  
  const claimOutcomes = [
    { value: 'approved', label: 'Fully Approved' },
    { value: 'partial', label: 'Partially Approved' },
    { value: 'denied', label: 'Denied' },
    { value: 'pending', label: 'Still Pending' },
  ]

  useEffect(() => {
    const name = searchParams.get('name')
    const adjusterId = searchParams.get('adjuster')
    
    if (name) {
      setAdjusterSearch(name)
      searchAdjusters(name)
    }
    
    if (adjusterId) {
      fetchAdjusterById(adjusterId)
    }
  }, [searchParams])

  async function fetchAdjusterById(id: string) {
    const { data } = await supabase
      .from('adjusters')
      .select('*')
      .eq('id', id)
      .single()
    
    if (data) {
      setSelectedAdjuster(data)
      setStep(2)
    }
  }

  async function searchAdjusters(query: string) {
    if (query.length < 2) {
      setAdjusterResults([])
      return
    }
    
    setSearchLoading(true)
    const words = query.trim().split(/\s+/)
    
    let dbQuery = supabase
      .from('adjusters')
      .select('id, first_name, last_name, slug, state')
    
    if (words.length >= 2) {
      dbQuery = dbQuery
        .filter('first_name', 'ilike', '%' + words[0] + '%')
        .filter('last_name', 'ilike', '%' + words[1] + '%')
    } else {
      dbQuery = dbQuery.or('first_name.ilike.%' + query + '%,last_name.ilike.%' + query + '%')
    }
    
    const { data } = await dbQuery.limit(10)
    
    if (data) setAdjusterResults(data)
    setSearchLoading(false)
  }

  async function handleSubmit() {
    if (!selectedAdjuster) {
      setError('Please select an adjuster')
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

    if (honeypot) {
      setSuccess(true)
      return
    }
    
    setLoading(true)
    setError(null)
    
    const { error: submitError } = await supabase
      .from('reviews')
      .insert({
        adjuster_id: selectedAdjuster.id,
        overall_rating: overallRating,
        communication_rating: communicationRating || null,
        fairness_rating: fairnessRating || null,
        timeliness_rating: speedRating || null,
        professionalism_rating: professionalismRating || null,
        review_text: reviewText.trim(),
        claim_type: claimType || null,
        claim_outcome: claimOutcome || null,
        reviewer_type: reviewerType,
        status: 'pending',
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600 fill-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">Your review has been submitted and is pending approval.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push('/adjuster/' + selectedAdjuster.slug)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">View Profile</button>
              <button onClick={() => router.push('/')} className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg">Home</button>
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
      { '@type': 'ListItem', position: 2, name: 'Leave a Review', item: 'https://ratemyadjusters.com/review' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Leave a Review</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
            <p className="text-gray-600 mb-6">Help others by sharing your experience</p>

            {showGuidelines && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">Review Guidelines</h3>
                      <button onClick={() => setShowGuidelines(false)} className="text-gray-400 hover:text-gray-600 text-sm">Dismiss</button>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">Be truthful • No personal attacks • Focus on claim experience • No policy numbers or private info</p>
                    <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block">Read full guidelines →</Link>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Who is your adjuster?</label>
                <input
                  type="text"
                  value={adjusterSearch}
                  onChange={(e) => { setAdjusterSearch(e.target.value); searchAdjusters(e.target.value) }}
                  placeholder="Search by name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                
                {searchLoading && <p className="text-gray-500 text-sm mt-2">Searching...</p>}
                
                {adjusterResults.length > 0 && (
                  <div className="mt-3 border border-gray-200 rounded-lg divide-y">
                    {adjusterResults.map((adj) => (
                      <button
                        key={adj.id}
                        onClick={() => { setSelectedAdjuster(adj); setStep(2) }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">{adj.first_name?.[0]}{adj.last_name?.[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{adj.first_name} {adj.last_name}</p>
                          <p className="text-sm text-gray-500">{adj.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {adjusterSearch.length >= 2 && adjusterResults.length === 0 && !searchLoading && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-start gap-3">
                      <UserPlus className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700 text-sm font-medium">Can't find your adjuster?</p>
                        <p className="text-gray-600 text-sm mt-1">They may not be in our database yet. You can add them and leave a review.</p>
                        <Link 
                          href="/add-adjuster" 
                          className="inline-flex items-center gap-1 mt-3 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors"
                        >
                          <UserPlus className="w-4 h-4" />
                          Add a new adjuster
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 2 && selectedAdjuster && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{selectedAdjuster.first_name?.[0]}{selectedAdjuster.last_name?.[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{selectedAdjuster.first_name} {selectedAdjuster.last_name}</p>
                    <p className="text-sm text-gray-600">{selectedAdjuster.state}</p>
                  </div>
                  <button onClick={() => { setSelectedAdjuster(null); setStep(1) }} className="text-blue-600 hover:text-blue-700 text-sm font-medium">Change</button>
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
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this adjuster. How was their communication? Were they fair? How long did the process take?"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <p className={'text-sm mt-1 ' + (reviewText.trim().length < 20 ? 'text-amber-600' : 'text-gray-500')}>
                    {reviewText.length}/1000 {reviewText.trim().length < 20 && '(minimum 20 characters)'}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg">
                  <button type="button" onClick={() => setShowOptionalRatings(!showOptionalRatings)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50">
                    <span className="font-medium text-gray-700">Rate specific qualities (optional)</span>
                    {showOptionalRatings ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  {showOptionalRatings && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <MiniStarRating label="Communication" rating={communicationRating} setRating={setCommunicationRating} />
                      <MiniStarRating label="Fairness" rating={fairnessRating} setRating={setFairnessRating} />
                      <MiniStarRating label="Speed" rating={speedRating} setRating={setSpeedRating} />
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                  <div className="flex gap-4">
                    {[{ value: 'homeowner', label: 'Homeowner' }, { value: 'contractor', label: 'Contractor' }, { value: 'public_adjuster', label: 'Public Adjuster' }].map((t) => (
                      <label key={t.value} className={'flex-1 text-center py-3 px-4 rounded-lg border cursor-pointer transition-colors ' + (reviewerType === t.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-700 hover:border-gray-400')}>
                        <input type="radio" name="reviewerType" value={t.value} checked={reviewerType === t.value} onChange={(e) => setReviewerType(e.target.value)} className="sr-only" />
                        {t.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || overallRating === 0 || reviewText.trim().length < 20}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our <Link href="/review-guidelines" className="text-blue-600 hover:underline">review guidelines</Link>. All reviews are moderated.
                </p>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="bg-gray-50 rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/adjusters" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Browse Adjusters</div>
                  <div className="text-sm text-gray-500">Search by state</div>
                </div>
              </Link>
              <Link href="/guides" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Guides & Resources</div>
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

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ReviewContent />
    </Suspense>
  )
}
