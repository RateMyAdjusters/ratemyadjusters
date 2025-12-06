'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, Search } from 'lucide-react'
import { CLAIM_TYPES, CLAIM_OUTCOMES, REVIEWER_TYPES } from '@/lib/types'

export default function ReviewPage() {
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAdjuster, setSelectedAdjuster] = useState<any>(null)
  
  // Form state
  const [overallRating, setOverallRating] = useState(0)
  const [communicationRating, setCommunicationRating] = useState(0)
  const [fairnessRating, setFairnessRating] = useState(0)
  const [timelinessRating, setTimelinessRating] = useState(0)
  const [professionalismRating, setProfessionalismRating] = useState(0)
  const [claimType, setClaimType] = useState('')
  const [claimOutcome, setClaimOutcome] = useState('')
  const [reviewerType, setReviewerType] = useState('')
  const [title, setTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')

  const StarInput = ({ value, onChange, label }: { value: number, onChange: (v: number) => void, label: string }) => (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star 
              className={`w-8 h-8 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to Supabase
    alert('Review submitted! (Demo mode - not actually saved)')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
          <p className="text-gray-600 mb-8">
            Share your experience to help others know what to expect.
          </p>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                <span className={`ml-2 hidden sm:inline ${step >= s ? 'text-gray-900' : 'text-gray-500'}`}>
                  {s === 1 ? 'Find Adjuster' : s === 2 ? 'Your Experience' : 'Submit'}
                </span>
                {s < 3 && <div className={`w-12 sm:w-24 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Find Adjuster */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Who was your adjuster?</h2>
              
              <div className="mb-6">
                <label className="label">Search by name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., John Smith"
                    className="input pl-10"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Can't find them? Add a new adjuster:</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="label">First Name *</label>
                    <input type="text" className="input" placeholder="John" />
                  </div>
                  <div>
                    <label className="label">Last Name *</label>
                    <input type="text" className="input" placeholder="Smith" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="label">Insurance Company *</label>
                  <select className="input">
                    <option value="">Select company...</option>
                    <option value="state-farm">State Farm</option>
                    <option value="allstate">Allstate</option>
                    <option value="usaa">USAA</option>
                    <option value="liberty-mutual">Liberty Mutual</option>
                    <option value="farmers">Farmers</option>
                    <option value="nationwide">Nationwide</option>
                    <option value="progressive">Progressive</option>
                    <option value="travelers">Travelers</option>
                    <option value="auto-owners">Auto-Owners</option>
                    <option value="aaa">AAA</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="label">State</label>
                  <select className="input">
                    <option value="">Select state...</option>
                    <option value="MI">Michigan</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="CA">California</option>
                    {/* Add more states */}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-primary w-full mt-6"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Rating & Details */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Rate your experience</h2>
              
              <div className="space-y-6">
                <StarInput value={overallRating} onChange={setOverallRating} label="Overall Rating *" />
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <StarInput value={communicationRating} onChange={setCommunicationRating} label="Communication" />
                  <StarInput value={fairnessRating} onChange={setFairnessRating} label="Fairness" />
                  <StarInput value={timelinessRating} onChange={setTimelinessRating} label="Timeliness" />
                  <StarInput value={professionalismRating} onChange={setProfessionalismRating} label="Professionalism" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Type of Claim</label>
                    <select value={claimType} onChange={(e) => setClaimType(e.target.value)} className="input">
                      <option value="">Select...</option>
                      {CLAIM_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Claim Outcome</label>
                    <select value={claimOutcome} onChange={(e) => setClaimOutcome(e.target.value)} className="input">
                      <option value="">Select...</option>
                      {CLAIM_OUTCOMES.map((outcome) => (
                        <option key={outcome.value} value={outcome.value}>{outcome.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Review Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Summarize your experience"
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Your Review *</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share details about your experience with this adjuster..."
                    rows={5}
                    className="input"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum 50 characters</p>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary flex-1"
                  disabled={!overallRating || reviewText.length < 50}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: About You & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-4">About you</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="label">I am a... *</label>
                  <select value={reviewerType} onChange={(e) => setReviewerType(e.target.value)} className="input">
                    <option value="">Select...</option>
                    {REVIEWER_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Display Name *</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How your name will appear (e.g., John D. or ABC Roofing)"
                    className="input"
                  />
                </div>

                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input"
                  />
                  <p className="text-sm text-gray-500 mt-1">Never shown publicly. Used for verification only.</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-600">
                  By submitting, you confirm this review is based on your genuine experience and 
                  agree to our <Link href="/review-guidelines" className="text-primary-600 hover:underline">Review Guidelines</Link> and {' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={!reviewerType || !displayName || !email}
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
