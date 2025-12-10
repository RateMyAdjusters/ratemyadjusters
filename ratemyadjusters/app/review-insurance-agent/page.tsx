'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const claimTypes = [
  'Homeowners',
  'Auto',
  'Water Damage',
  'Fire',
  'Wind/Hail',
  'Hurricane',
  'Theft',
  'Liability',
  'Other',
]

export default function ReviewInsuranceAgentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const agentId = searchParams.get('agent')

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [agent, setAgent] = useState<any>(null)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [claimType, setClaimType] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(() => {
    if (agentId) {
      fetchAgent()
    }
  }, [agentId])

  const fetchAgent = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('insurance_agents')
      .select('*')
      .eq('id', agentId)
      .single()

    if (error || !data) {
      setError('Agent not found.')
    } else {
      setAgent(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating) {
      setError('Please select a star rating.')
      return
    }

    if (!reviewText.trim() || reviewText.trim().length < 20) {
      setError('Please write at least 20 characters in your review.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('insurance_agent_reviews')
      .insert({
        insurance_agent_id: agentId,
        overall_rating: rating,
        review_text: reviewText.trim(),
        reviewer_type: 'policyholder',
        reviewer_display_name: isAnonymous ? 'Anonymous' : (displayName.trim() || 'Anonymous'),
        claim_type: claimType || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('Insert error:', insertError)
      setError('Failed to submit review. Please try again.')
      setSubmitting(false)
      return
    }

    setSuccess(true)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </main>
    )
  }

  if (!agentId || (!agent && !loading)) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find the agent you're looking for.</p>
            <Link href="/insurance-agents" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Browse Insurance Agents →
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-6">
              Your review has been submitted and is pending approval. It will appear on the agent's profile once reviewed.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/insurance-agent/${agent.slug}`}
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View Agent Profile
              </Link>
              <Link
                href="/insurance-agents"
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Browse More Agents
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const fullName = `${agent.first_name} ${agent.last_name}`

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/insurance-agents" className="text-gray-500 hover:text-gray-700">Insurance Agents</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href={`/insurance-agent/${agent.slug}`} className="text-gray-500 hover:text-gray-700">{fullName}</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Write Review</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">{agent.first_name?.[0]}{agent.last_name?.[0]}</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Review {fullName}</h1>
              <p className="text-gray-500">
                {agent.company_name && `${agent.company_name} • `}{agent.city ? `${agent.city}, ` : ''}{agent.state}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating *</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="mt-2 text-sm text-gray-500">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Insurance/Claim</label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                >
                  <option value="">Select type (optional)</option>
                  {claimTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this agent. Was the agent helpful? Did they explain your coverage clearly? How was communication?"
                  rows={5}
                  required
                  minLength={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 resize-none"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {reviewText.length}/20 minimum characters
                </p>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John D."
                  disabled={isAnonymous}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 disabled:bg-gray-100"
                />
                <div className="mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">Post anonymously</span>
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our{' '}
                <Link href="/review-guidelines" className="text-indigo-600 hover:underline">Review Guidelines</Link>.
                Reviews are moderated before publishing.
              </p>
            </form>
          </div>

          {/* Bottom Link */}
          <div className="mt-6 text-center">
            <Link href={`/insurance-agent/${agent.slug}`} className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              ← Back to {fullName}'s Profile
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
