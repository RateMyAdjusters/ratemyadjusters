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
                  placeholder="Search by n
