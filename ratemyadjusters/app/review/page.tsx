'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Star } from 'lucide-react'

interface Company {
  id: string
  name: string
  slug: string
}

export default function ReviewPage() {
  const [step, setStep] = useState(1)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  // Adjuster info
  const [adjusterFirstName, setAdjusterFirstName] = useState('')
  const [adjusterLastName, setAdjusterLastName] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [adjusterState, setAdjusterState] = useState('')
  
  // Review info
  const [overallRating, setOverallRating] = useState(0)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [fairnessRating, setFairnessRating] = useState(0)
  const [timelinessRating, setTimelinessRating] = useState(0)
  const [professionalismRating, setProfessionalismRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [claimType, setClaimType] = useState('')
  const [claimOutcome, setClaimOutcome] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)
  
  // Reviewer info
  const [reviewerType, setReviewerType] = useState('')
  const [reviewerName, setReviewerName] = useState('')

  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase
        .from('companies')
        .select('id, name, slug')
        .order('name')
      if (data) setCompanies(data)
    }
    fetchCompanies()
  }, [])

  const generateSlug = (firstName: string, lastName: string, companySlug: string) => {
    const base = `${firstName}-${lastName}-${companySlug}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const random = Math.random().toString(36).substring(2, 6)
    return `${base}-${random}`
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Get company slug
      const company = companies.find(c => c.id === companyId)
      if (!company) throw new Error('Please select a company')
      
      // Create slug for adjuster
      const slug = generateSlug(adjusterFirstName, adjusterLastName, company.slug)
      
      // First, create the adjuster
      const { data: adjusterData, error: adjusterError } = await supabase
        .from('adjusters')
        .insert({
          first_name: adjusterFirstName,
          last_name: adjusterLastName,
          slug: slug,
          company_id: companyId,
          state: adjusterState || null,
        })
        .select()
        .single()
      
      if (adjusterError) {
        console.error('Adjuster error:', adjusterError)
        throw new Error('Failed to create adjuster profile')
      }
      
      // Then create the review
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          adjuster_id: adjusterData.id,
          overall_rating: overallRating,
          communication_rating: communicationRating || null,
          fairness_rating: fairnessRating || null,
          timeliness_rating: timelinessRating || null,
          professionalism_rating: professionalismRating || null,
          title: reviewTitle || null,
          review_text: reviewText,
          claim_type: claimType || null,
          claim_outcome: claimOutcome || null,
          would_recommend: wouldRecommend,
          reviewer_type: reviewerType,
          reviewer_display_name: reviewerName || null,
          status: 'approved', // Auto-approve for now
        })
      
      if (reviewError) {
        console.error('Review error:', reviewError)
        throw new Error('Failed to submit review')
      }
      
      setSuccess(true)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const StarRating = ({ rating, setRating, label }: { rating: number, setRating: (r: number) => void, label: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              size={28}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    </div>
  )

  if (success) {
    return (
      <>
        <main className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h1>
              <p className="text-gray-600 mb-6">Thank you for sharing your experience. Your review helps other homeowners.</p>
              <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Back to Home
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
            <p className="text-gray-600 mb-8">Share your experience with an insurance adjuster</p>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`w-24 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Step 1: Adjuster Info */}
            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Who are you reviewing?</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={adjusterFirstName}
                      onChange={(e) => setAdjusterFirstName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={adjusterLastName}
                      onChange={(e) => setAdjusterLastName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company *</label>
                  <select
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select company...</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">State (optional)</label>
                  <input
                    type="text"
                    value={adjusterState}
                    onChange={(e) => setAdjusterState(e.target.value.toUpperCase().slice(0, 2))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="TX"
                    maxLength={2}
                  />
                </div>
                
                <button
                  onClick={() => {
                    if (!adjusterFirstName || !adjusterLastName || !companyId) {
                      setError('Please fill in the adjuster name and company')
                      return
                    }
                    setError('')
                    setStep(2)
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Rating */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Rate your experience</h2>
                
                <StarRating rating={overallRating} setRating={setOverallRating} label="Overall Rating *" />
                <StarRating rating={communicationRating} setRating={setCommunicationRating} label="Communication" />
                <StarRating rating={fairnessRating} setRating={setFairnessRating} label="Fairness" />
                <StarRating rating={timelinessRating} setRating={setTimelinessRating} label="Timeliness" />
                <StarRating rating={professionalismRating} setRating={setProfessionalismRating} label="Professionalism" />
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Type</label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type...</option>
                    <option value="roof">Roof</option>
                    <option value="water_damage">Water Damage</option>
                    <option value="fire">Fire</option>
                    <option value="wind">Wind</option>
                    <option value="hail">Hail</option>
                    <option value="theft">Theft</option>
                    <option value="auto">Auto</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Outcome</label>
                  <select
                    value={claimOutcome}
                    onChange={(e) => setClaimOutcome(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select outcome...</option>
                    <option value="approved">Approved</option>
                    <option value="partial">Partially Approved</option>
                    <option value="denied">Denied</option>
                    <option value="pending">Still Pending</option>
                  </select>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!overallRating) {
                        setError('Please provide an overall rating')
                        return
                      }
                      setError('')
                      setStep(3)
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Text */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Tell us about your experience</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Summarize your experience"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={5}
                    placeholder="Share details about your experience with this adjuster..."
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Would you recommend this adjuster?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(true)}
                      className={`flex-1 py-2 rounded-lg border-2 ${
                        wouldRecommend === true ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setWouldRecommend(false)}
                      className={`flex-1 py-2 rounded-lg border-2 ${
                        wouldRecommend === false ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">I am a... *</label>
                  <select
                    value={reviewerType}
                    onChange={(e) => setReviewerType(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select...</option>
                    <option value="homeowner">Homeowner</option>
                    <option value="contractor">Contractor</option>
                    <option value="public_adjuster">Public Adjuster</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name (optional)</label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How should we display your name?"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (!reviewText) {
                        setError('Please write a review')
                        return
                      }
                      if (!reviewerType) {
                        setError('Please select your role')
                        return
                      }
                      setError('')
                      handleSubmit()
                    }}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
