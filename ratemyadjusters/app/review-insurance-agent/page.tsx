'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function ReviewFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const agentId = searchParams.get('id')

  const [agent, setAgent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [claimType, setClaimType] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(() => {
    if (agentId) {
      fetchAgent()
    } else {
      setLoading(false)
    }
  }, [agentId])

  async function fetchAgent() {
    const { data } = await supabase
      .from('insurance_agents')
      .select('id, first_name, last_name, slug, state, city, company_name')
      .eq('id', agentId)
      .single()

    setAgent(data)
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!agent) {
      setError('No agent selected')
      return
    }

    if (rating === 0) {
      setError('Please select a rating')
      return
    }

    if (reviewText.trim().length < 20) {
      setError('Review must be at least 20 characters')
      return
    }

    setSubmitting(true)

    try {
      const { error: insertError } = await supabase
        .from('insurance_agent_reviews')
        .insert({
          insurance_agent_id: agent.id,
          overall_rating: rating,
          review_text: reviewText.trim(),
          reviewer_type: 'policyholder',
          reviewer_display_name: isAnonymous ? 'Anonymous' : displayName.trim() || 'Anonymous',
          claim_type: claimType || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        })

      if (insertError) throw insertError

      router.push(`/insurance-agent/${agent.slug}?review=success`)
    } catch (err) {
      console.error('Error submitting review:', err)
      setError('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    )
  }

  if (!agent) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
          <p className="text-gray-600 mb-6">Please select an agent to review.</p>
          <Link
            href="/insurance-agents"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Browse Insurance Agents →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/insurance-agents" className="text-gray-500 hover:text-gray-700">Insurance Agents</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/insurance-agent/${agent.slug}`} className="text-gray-500 hover:text-gray-700">
              {agent.first_name} {agent.last_name}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Write Review</span>
          </nav>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Review {agent.first_name} {agent.last_name}
          </h1>
          <p className="text-gray-600 mb-6">
            {agent.company_name && `${agent.company_name} • `}
            {agent.city ? `${agent.city}, ` : ''}{agent.state}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Claim Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Insurance
              </label>
              <select
                value={claimType}
                onChange={(e) => setClaimType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select type (optional)</option>
                <option value="Homeowners">Homeowners</option>
                <option value="Auto">Auto</option>
                <option value="Life">Life Insurance</option>
                <option value="Renters">Renters</option>
                <option value="Umbrella">Umbrella</option>
                <option value="Commercial">Commercial</option>
                <option value="Flood">Flood</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={5}
                placeholder="Share your experience with this insurance agent..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                minLength={20}
              />
              <p className="text-xs text-gray-500 mt-1">
                {reviewText.length}/20 minimum characters
              </p>
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="John D."
                disabled={isAnonymous}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
              />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Post anonymously</span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree that your review is based on your genuine experience.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    </div>
  )
}

export default function ReviewInsuranceAgentPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReviewFormContent />
    </Suspense>
  )
}
