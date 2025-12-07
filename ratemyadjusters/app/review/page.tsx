'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Star, ChevronDown, ChevronUp, Shield, AlertTriangle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Script from 'next/script'

declare global {
  interface Window {
    grecaptcha: any
  }
}

function ReviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showOptionalRatings, setShowOptionalRatings] = useState(false)
  const [showGuidelines, setShowGuidelines] = useState(true)
  
  // Adjuster search
  const [adjusterSearch, setAdjusterSearch] = useState('')
  const [adjusterResults, setAdjusterResults] = useState<any[]>([])
  const [selectedAdjuster, setSelectedAdjuster] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  
  // Review data
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  
  // Optional ratings (tags)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [fairnessRating, setFairnessRating] = useState(0)
  const [speedRating, setSpeedRating] = useState(0)
  const [professionalismRating, setProfessionalismRating] = useState(0)
  
  // Claim details
  const [claimType, setClaimType] = useState('')
  const [claimOutcome, setClaimOutcome] = useState('')
  const [reviewerType, setReviewerType] = useState('homeowner')
  
  // Honeypot field (hidden from users, bots will fill it)
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

  // Pre-fill from URL params
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
      .select(`*, companies(name)`)
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
      .select(`id, first_name, last_name, slug, state, companies(name)`)
    
    if (words.length >= 2) {
      dbQuery = dbQuery
        .filter('first_name', 'ilike', `%${words[0]}%`)
        .filter('last_name', 'ilike', `%${words[1]}%`)
    } else {
      dbQuery = dbQuery.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
    }
    
    const { data } = await dbQuery.limit(10)
    
    if (data) setAdjusterResults(data)
    setSearchLoading(false)
  }

  async function executeRecaptcha(): Promise<string | null> {
    return new Promise((resolve) => {
      if (!window.grecaptcha) {
        console.error('reCAPTCHA not loaded')
        resolve(null)
        return
      }
      
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit_review' })
          .then((token: string) => {
            resolve(token)
          })
          .catch(() => {
            resolve(null)
          })
      })
    })
  }

  async function handleSubmit() {
    if (!selectedAdjuster || overallRating === 0 || !reviewText.trim()) {
      setError('Please fill in all required fields')
      return
    }

    // Check honeypot (if filled, it's a bot)
    if (honeypot) {
      // Silently fail for bots
      setSuccess(true)
      return
    }

    // Check minimum review length
    if (reviewText.trim().length < 20) {
      setError('Please write at least 20 characters in your review')
      return
    }
    
    setLoading(true)
    setError(null)

    // Get reCAPTCHA token
    const recaptchaToken = await executeRecaptcha()
    
    if (!recaptchaToken) {
      setError('Security verification failed. Please refresh and try again.')
      setLoading(false)
      return
    }

    // Verify reCAPTCHA on server
    try {
      const verifyResponse = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyData.success || verifyData.score < 0.5) {
        setError('Security verification failed. Please try again.')
        setLoading(false)
        return
      }
    } catch (err) {
      // If verification endpoint fails, still allow submission but log it
      console.error('reCAPTCHA verification error:', err)
    }
    
    // Submit review
    const { error: submitError } = await supabase
      .from('reviews')
      .insert({
        adjuster_id: selectedAdjuster.id,
        overall_rating: overallRating,
        communication_rating: communicationRating || null,
        fairness_rating: fairnessRating || null,
        speed_rating: speedRating || null,
        review_text: reviewText.trim(),
        claim_type: claimType || null,
        claim_outcome: claimOutcome || null,
        reviewer_type: reviewerType,
        status: 'pending',
      })
    
    if (submitError) {
      setError('Failed to submit review. Please try again.')
      setLoading(false)
      return
    }
    
    setSuccess(true)
    setLoading(false)
  }

  const StarRatingInput = ({ 
    rating, 
    setRating, 
    hover, 
    setHover,
    size = 'lg'
  }: { 
    rating: number
    setRating: (r: number) => void
    hover?: number
    setHover?: (r: number) => void
    size?: 'sm' | 'lg'
  }) => {
    const starSize = size === 'lg' ? 'w-10 h-10' : 'w-6 h-6'
    const displayRating = hover || rating
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover?.(star)}
            onMouseLeave={() => setHover?.(0)}
            className="focus:outline-none"
          >
            <Star
              className={`${starSize} transition-colors ${
                star <= displayRating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  const MiniStarRating = ({ 
    label, 
    rating, 
    setRating 
  }: { 
    label: string
    rating: number
    setRating: (r: number) => void
  }) => {
    const [hover, setHover] = useState(0)
    
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-gray-700 text-sm">{label}</span>
        <StarRatingInput 
          rating={rating} 
          setRating={setRating} 
          hover={hover}
          setHover={setHover}
          size="sm" 
        />
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
            <p className="text-gray-600 mb-6">
              Your review has been submitted and is pending approval. 
              It will be visible once reviewed by our team.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push(`/adjuster/${selectedAdjuster.slug}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                View Adjuster Profile
              </button>
              <button
                onClick={() => router.push('/')}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Load reCAPTCHA v3 */}
      <Script 
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
      />

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
            <p className="text-gray-600 mb-6">Help others by sharing your experience</p>

            {/* Review Guidelines Reminder */}
            {showGuidelines && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">Review Guidelines</h3>
                      <button 
                        onClick={() => setShowGuidelines(false)}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                      >
                        Dismiss
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      • Be truthful • No personal attacks • Focus on claim experience • No policy numbers or private info
                    </p>
                    <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Read full guidelines →
                    </Link>
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

            {/* Honeypot field - hidden from users */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Step 1: Find Adjuster */}
            {step === 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Who is your adjuster?
                </label>
                <input
                  type="text"
                  value={adjusterSearch}
                  onChange={(e) => {
                    setAdjusterSearch(e.target.value)
                    searchAdjusters(e.target.value)
                  }}
                  placeholder="Search by name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                
                {searchLoading && (
                  <p className="text-gray-500 text-sm mt-2">Searching...</p>
                )}
                
                {adjusterResults.length > 0 && (
                  <div className="mt-3 border border-gray-200 rounded-lg divide-y">
                    {adjusterResults.map((adj) => (
                      <button
                        key={adj.id}
                        onClick={() => {
                          setSelectedAdjuster(adj)
                          setStep(2)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {adj.first_name?.[0]}{adj.last_name?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {adj.first_name} {adj.last_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {adj.companies?.name || 'Unknown Company'} • {adj.state}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {adjusterSearch.length >= 2 && adjusterResults.length === 0 && !searchLoading && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      Can't find your adjuster? They may not be in our database yet.
                    </p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Add a new adjuster →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Write Review */}
            {step === 2 && selectedAdjuster && (
              <div className="space-y-6">
                {/* Selected Adjuster */}
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {selectedAdjuster.first_name?.[0]}{selectedAdjuster.last_name?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {selectedAdjuster.first_name} {selectedAdjuster.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedAdjuster.companies?.name || 'Unknown Company'} • {selectedAdjuster.state}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAdjuster(null)
                      setStep(1)
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Change
                  </button>
                </div>

                {/* Main Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Overall Rating *
                  </label>
                  <div className="flex items-center gap-4">
                    <StarRatingInput
                      rating={overallRating}
                      setRating={setOverallRating}
                      hover={hoverRating}
                      setHover={setHoverRating}
                      size="lg"
                    />
                    {overallRating > 0 && (
                      <span className="text-gray-600">
                        {overallRating === 1 && 'Poor'}
                        {overallRating === 2 && 'Fair'}
                        {overallRating === 3 && 'Good'}
                        {overallRating === 4 && 'Very Good'}
                        {overallRating === 5 && 'Excellent'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience with this adjuster. What happened during your claim? Were they professional, fair, and responsive?"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {reviewText.length}/1000 characters (minimum 20)
                  </p>
                </div>

                {/* Optional Ratings (Expandable) */}
                <div className="border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setShowOptionalRatings(!showOptionalRatings)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-700">
                      Rate specific qualities (optional)
                    </span>
                    {showOptionalRatings ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  {showOptionalRatings && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <MiniStarRating
                        label="Communication"
                        rating={communicationRating}
                        setRating={setCommunicationRating}
                      />
                      <MiniStarRating
                        label="Fairness"
                        rating={fairnessRating}
                        setRating={setFairnessRating}
                      />
                      <MiniStarRating
                        label="Speed"
                        rating={speedRating}
                        setRating={setSpeedRating}
                      />
                      <MiniStarRating
                        label="Professionalism"
                        rating={professionalismRating}
                        setRating={setProfessionalismRating}
                      />
                    </div>
                  )}
                </div>

                {/* Claim Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Type
                    </label>
                    <select
                      value={claimType}
                      onChange={(e) => setClaimType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {claimTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Claim Outcome
                    </label>
                    <select
                      value={claimOutcome}
                      onChange={(e) => setClaimOutcome(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      <option value="">Select...</option>
                      {claimOutcomes.map((outcome) => (
                        <option key={outcome.value} value={outcome.value}>
                          {outcome.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reviewer Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: 'homeowner', label: 'Homeowner' },
                      { value: 'contractor', label: 'Contractor' },
                      { value: 'public_adjuster', label: 'Public Adjuster' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex-1 text-center py-3 px-4 rounded-lg border cursor-pointer transition-colors ${
                          reviewerType === type.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reviewerType"
                          value={type.value}
                          checked={reviewerType === type.value}
                          onChange={(e) => setReviewerType(e.target.value)}
                          className="sr-only"
                        />
                        {type.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || overallRating === 0 || !reviewText.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our <Link href="/review-guidelines" className="text-blue-600 hover:underline">review guidelines</Link>. All reviews are moderated before being published.
                  <br />
                  <span className="text-gray-400">Protected by reCAPTCHA</span>
                </p>
              </div>
            )}
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
