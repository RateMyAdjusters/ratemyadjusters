'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronRight, AlertTriangle, UserPlus, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const carriers = [
  'Allstate', 'American Family', 'Amica', 'Auto-Owners', 'Citizens', 'Chubb',
  'Erie Insurance', 'Farmers', 'GEICO', 'Hartford', 'Liberty Mutual', 'Mercury',
  'MetLife', 'Nationwide', 'Progressive', 'Safeco', 'State Farm', 'Travelers',
  'USAA', 'Other'
]

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const insuranceTypes = [
  { value: 'homeowners', label: 'Homeowners' },
  { value: 'auto', label: 'Auto' },
  { value: 'life', label: 'Life Insurance' },
  { value: 'renters', label: 'Renters' },
  { value: 'umbrella', label: 'Umbrella' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'flood', label: 'Flood' },
  { value: 'other', label: 'Other' },
]

const experienceTypes = [
  { value: 'new_policy', label: 'Buying new policy' },
  { value: 'renewal', label: 'Policy renewal' },
  { value: 'claim', label: 'Filing a claim' },
  { value: 'question', label: 'Question/Support' },
  { value: 'cancellation', label: 'Cancellation' },
  { value: 'other', label: 'Other' },
]

const satisfactionLevels = [
  { value: 'very_satisfied', label: 'Very satisfied' },
  { value: 'satisfied', label: 'Satisfied' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'dissatisfied', label: 'Dissatisfied' },
  { value: 'very_dissatisfied', label: 'Very dissatisfied' },
]

const responseTimeOptions = [
  { value: 'same_day', label: 'Same day' },
  { value: '1_2_days', label: '1-2 days' },
  { value: '3_5_days', label: '3-5 days' },
  { value: 'over_week', label: 'Over a week' },
  { value: 'never', label: 'Never responded' },
]

const impressionOptions = [
  { value: 'knowledgeable', label: 'Knowledgeable about products' },
  { value: 'responsive', label: 'Quick to respond' },
  { value: 'helpful', label: 'Helpful & patient' },
  { value: 'pushy', label: 'Too pushy/salesy' },
  { value: 'slow', label: 'Slow to respond' },
  { value: 'unclear', label: "Didn't explain things clearly" },
  { value: 'great_rates', label: 'Found me great rates' },
  { value: 'professional', label: 'Very professional' },
]

const roleOptions = [
  { value: 'policyholder', label: 'Policyholder' },
  { value: 'shopping', label: 'Shopping for insurance' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'other', label: 'Other' },
]

function ReviewInsuranceAgentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Step 1: The Vent
  const [agentName, setAgentName] = useState('')
  const [carrierName, setCarrierName] = useState('')
  const [carrierOther, setCarrierOther] = useState('')
  const [whatHappened, setWhatHappened] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [whatWentWellPoorly, setWhatWentWellPoorly] = useState('')

  // Step 2: The Data
  const [agentState, setAgentState] = useState('')
  const [insuranceType, setInsuranceType] = useState('')
  const [experienceType, setExperienceType] = useState('')
  const [responseTime, setResponseTime] = useState('')

  // Step 3: The Outcome
  const [satisfaction, setSatisfaction] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState('')
  const [impressions, setImpressions] = useState<string[]>([])
  const [impressionOther, setImpressionOther] = useState('')

  // Step 4: Contact
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [firstName, setFirstName] = useState('')

  // Honeypot
  const [honeypot, setHoneypot] = useState('')

  // Agent search/selection
  const [agentResults, setAgentResults] = useState<any[]>([])
  const [selectedAgent, setSelectedAgent] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)

  useEffect(() => {
    const agentId = searchParams.get('id')
    if (agentId) {
      fetchAgentById(agentId)
    }
  }, [searchParams])

  async function fetchAgentById(id: string) {
    const { data } = await supabase
      .from('insurance_agents')
      .select('*')
      .eq('id', id)
      .single()
    if (data) {
      setSelectedAgent(data)
      setAgentName(`${data.first_name} ${data.last_name}`)
      if (data.state) setAgentState(data.state)
      if (data.company_name) setCarrierName(data.company_name)
    }
  }

  async function searchAgents(query: string) {
    if (query.length < 2) {
      setAgentResults([])
      setShowAgentDropdown(false)
      return
    }
    setSearchLoading(true)
    const words = query.trim().split(/\s+/)
    let dbQuery = supabase.from('insurance_agents').select('id, first_name, last_name, slug, state, company_name')
    if (words.length >= 2) {
      dbQuery = dbQuery.ilike('first_name', `${words[0]}%`).ilike('last_name', `${words[1]}%`)
    } else {
      dbQuery = dbQuery.or(`first_name.ilike.${query}%,last_name.ilike.${query}%`)
    }
    const { data } = await dbQuery.limit(8)
    if (data) {
      setAgentResults(data)
      setShowAgentDropdown(true)
    }
    setSearchLoading(false)
  }

  function handleAgentNameChange(value: string) {
    setAgentName(value)
    setSelectedAgent(null)
    searchAgents(value)
  }

  function selectAgent(agent: any) {
    setSelectedAgent(agent)
    setAgentName(`${agent.first_name} ${agent.last_name}`)
    if (agent.state) setAgentState(agent.state)
    if (agent.company_name) setCarrierName(agent.company_name)
    setShowAgentDropdown(false)
    setAgentResults([])
  }

  function toggleImpression(value: string) {
    setImpressions(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    )
  }

  function validateStep(stepNum: number): boolean {
    setError(null)
    if (stepNum === 1) {
      if (!agentName.trim()) { setError('Please enter the agent\'s name'); return false }
      if (!carrierName) { setError('Please select a carrier'); return false }
      if (carrierName === 'Other' && !carrierOther.trim()) { setError('Please enter the carrier name'); return false }
      if (!whatHappened.trim() || whatHappened.trim().length < 20) { setError('Please describe your experience (at least 20 characters)'); return false }
      if (overallRating === 0) { setError('Please select a star rating'); return false }
    }
    if (stepNum === 2) {
      if (!agentState) { setError('Please select a state'); return false }
      if (!insuranceType) { setError('Please select insurance type'); return false }
      if (!experienceType) { setError('Please select what you needed help with'); return false }
    }
    if (stepNum === 3) {
      if (!satisfaction) { setError('Please select your satisfaction level'); return false }
      if (!wouldRecommend) { setError('Please select if you would recommend'); return false }
    }
    return true
  }

  function nextStep() {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function prevStep() {
    setError(null)
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    if (honeypot) { setSuccess(true); return }
    setLoading(true)
    setError(null)

    try {
      let agentId = selectedAgent?.id
      if (!agentId && agentName.trim()) {
        const nameParts = agentName.trim().split(/\s+/)
        const first = nameParts[0] || ''
        const last = nameParts.slice(1).join(' ') || 'Unknown'
        const slug = `${first}-${last}-${agentState}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')

        const { data: newAgent, error: agentError } = await supabase
          .from('insurance_agents')
          .insert({
            first_name: first,
            last_name: last,
            state: agentState,
            slug: slug,
            company_name: carrierName !== 'Other' ? carrierName : carrierOther,
          })
          .select()
          .single()

        if (agentError) {
          console.error('Agent insert error:', agentError)
          setError('Failed to create agent profile')
          setLoading(false)
          return
        }
        agentId = newAgent.id
      }

      const { error: reviewError } = await supabase
        .from('insurance_agent_reviews')
        .insert({
          insurance_agent_id: agentId,
          overall_rating: overallRating,
          review_text: whatHappened.trim(),
          reviewer_type: role || 'policyholder',
          status: 'pending',
          carrier_name: carrierName !== 'Other' ? carrierName : null,
          carrier_other: carrierName === 'Other' ? carrierOther : null,
          insurance_type: insuranceType || null,
          experience_type: experienceType || null,
          response_time: responseTime || null,
          satisfaction: satisfaction || null,
          would_recommend: wouldRecommend === 'yes',
          impressions: impressions.length > 0 ? impressions : null,
          impression_other: impressionOther || null,
          what_went_well_poorly: whatWentWellPoorly || null,
          reviewer_email: email || null,
          reviewer_first_name: firstName || null,
          reviewer_opt_in: optIn,
        })

      if (reviewError) {
        console.error('Review insert error:', reviewError)
        setError('Failed to submit review. Please try again.')
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err) {
      console.error('Submit error:', err)
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const StarRatingInput = ({ rating, setRating, hover, setHover }: { rating: number; setRating: (r: number) => void; hover: number; setHover: (r: number) => void }) => {
    const displayRating = hover || rating
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
          >
            <Star className={`w-10 h-10 transition-colors ${star <= displayRating ? 'text-warm-500 fill-warm-500' : 'text-gray-300'}`} />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-3 text-gray-600 self-center">
            {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
          </span>
        )}
      </div>
    )
  }

  if (success) {
    return (
      <main className="min-h-screen bg-offwhite py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success-500" />
            </div>
            <h1 className="text-2xl font-bold text-navy-500 mb-2">Thank You!</h1>
            <p className="text-slate mb-6">Your review has been submitted successfully.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push('/insurance-agents')} className="bg-warm-500 hover:bg-warm-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Browse Agents</button>
              <button onClick={() => router.push('/')} className="border border-lightgray text-charcoal font-semibold py-2 px-6 rounded-lg hover:bg-offwhite transition-colors">Home</button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const progressPercent = ((step - 1) / 3) * 100

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/insurance-agents" className="text-gray-500 hover:text-gray-700">Insurance Agents</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Leave a Review</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-offwhite py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal">Step {step} of 4</span>
              <span className="text-sm text-slate">
                {step === 1 && 'Tell us about your experience'}
                {step === 2 && 'Details'}
                {step === 3 && 'Your impression'}
                {step === 4 && 'Almost done'}
              </span>
            </div>
            <div className="w-full bg-lightgray rounded-full h-2">
              <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercent + 25}%`, background: `linear-gradient(to right, #0A3D62, ${step >= 3 ? '#4CAF50' : '#20A39E'})` }} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            {error && (
              <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Tell us about your experience</h2>
                  <p className="text-slate text-sm">Share your experience with this insurance agent to help others.</p>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-charcoal mb-1">Agent Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => handleAgentNameChange(e.target.value)}
                    onFocus={() => agentResults.length > 0 && setShowAgentDropdown(true)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-charcoal"
                  />
                  {searchLoading && <p className="text-slate text-xs mt-1">Searching...</p>}
                  {showAgentDropdown && agentResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-lightgray rounded-lg shadow-lg max-h-60 overflow-auto">
                      {agentResults.map((agent) => (
                        <button
                          key={agent.id}
                          type="button"
                          onClick={() => selectAgent(agent)}
                          className="w-full px-4 py-3 text-left hover:bg-offwhite flex items-center gap-3 border-b border-lightgray last:border-0"
                        >
                          <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-navy-500 font-semibold text-xs">{agent.first_name?.[0]}{agent.last_name?.[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal text-sm">{agent.first_name} {agent.last_name}</p>
                            <p className="text-xs text-slate">{agent.company_name ? `${agent.company_name} • ` : ''}{agent.state}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedAgent && (
                    <p className="text-xs text-success-500 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Matched to existing profile
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Insurance Company <span className="text-red-500">*</span></label>
                  <select
                    value={carrierName}
                    onChange={(e) => setCarrierName(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select company...</option>
                    {carriers.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {carrierName === 'Other' && (
                    <input
                      type="text"
                      value={carrierOther}
                      onChange={(e) => setCarrierOther(e.target.value)}
                      placeholder="Enter company name"
                      className="w-full mt-2 px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">What was your experience? <span className="text-red-500">*</span></label>
                  <textarea
                    value={whatHappened}
                    onChange={(e) => setWhatHappened(e.target.value.slice(0, 500))}
                    placeholder="Example: Helped me find a great homeowners policy at a competitive rate. Very responsive and explained everything clearly."
                    rows={4}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                  <p className={`text-xs mt-1 ${whatHappened.length < 20 ? 'text-warm-600' : 'text-slate'}`}>
                    {whatHappened.length}/500 {whatHappened.length < 20 && '(minimum 20 characters)'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Overall Rating <span className="text-red-500">*</span></label>
                  <StarRatingInput rating={overallRating} setRating={setOverallRating} hover={hoverRating} setHover={setHoverRating} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Anything else? <span className="text-slate font-normal">(optional)</span></label>
                  <textarea
                    value={whatWentWellPoorly}
                    onChange={(e) => setWhatWentWellPoorly(e.target.value.slice(0, 300))}
                    placeholder="Any other details about your experience..."
                    rows={2}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                </div>

                <button type="button" onClick={nextStep} className="w-full bg-warm-500 hover:bg-warm-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">A few more details</h2>
                  <p className="text-slate text-sm">This helps us provide better insights.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">State <span className="text-red-500">*</span></label>
                  <select
                    value={agentState}
                    onChange={(e) => setAgentState(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Type of Insurance <span className="text-red-500">*</span></label>
                  <select
                    value={insuranceType}
                    onChange={(e) => setInsuranceType(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {insuranceTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">What did you need help with? <span className="text-red-500">*</span></label>
                  <select
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {experienceTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">How quickly did they respond? <span className="text-slate font-normal">(optional)</span></label>
                  <select
                    value={responseTime}
                    onChange={(e) => setResponseTime(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {responseTimeOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="flex-1 border border-lightgray text-charcoal font-semibold py-4 px-6 rounded-lg hover:bg-offwhite transition-colors">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="flex-1 bg-warm-500 hover:bg-warm-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Your overall impression</h2>
                  <p className="text-slate text-sm">Help others know what to expect.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">How satisfied were you? <span className="text-red-500">*</span></label>
                  <select
                    value={satisfaction}
                    onChange={(e) => setSatisfaction(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {satisfactionLevels.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Would you recommend this agent? <span className="text-red-500">*</span></label>
                  <div className="flex gap-4">
                    {[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }].map((opt) => (
                      <label key={opt.value} className={`flex-1 text-center py-3 px-4 rounded-lg border cursor-pointer transition-colors ${wouldRecommend === opt.value ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-lightgray text-charcoal hover:border-slate'}`}>
                        <input type="radio" name="recommend" value={opt.value} checked={wouldRecommend === opt.value} onChange={(e) => setWouldRecommend(e.target.value)} className="sr-only" />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">What stood out? <span className="text-slate font-normal">(optional)</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {impressionOptions.map((f) => (
                      <label key={f.value} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${impressions.includes(f.value) ? 'border-teal-500 bg-teal-50' : 'border-lightgray hover:border-slate'}`}>
                        <input
                          type="checkbox"
                          checked={impressions.includes(f.value)}
                          onChange={() => toggleImpression(f.value)}
                          className="w-4 h-4 text-teal-500 rounded"
                        />
                        <span className="text-sm text-charcoal">{f.label}</span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={impressionOther}
                    onChange={(e) => setImpressionOther(e.target.value)}
                    placeholder="Other (optional)"
                    className="w-full mt-2 px-4 py-2 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal text-sm"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="flex-1 border border-lightgray text-charcoal font-semibold py-4 px-6 rounded-lg hover:bg-offwhite transition-colors">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="flex-1 bg-warm-500 hover:bg-warm-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Last step</h2>
                  <p className="text-slate text-sm">Your email is optional—but if you share it, we'll:</p>
                  <ul className="text-sm text-slate mt-2 space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Show you how your agent compares to others in your area</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Connect you with top-rated agents if you're looking for better service</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Keep you updated on agent ratings and reviews</li>
                  </ul>
                  <p className="text-xs text-slate mt-2">We don't spam. Promise.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Email <span className="text-slate font-normal">(optional)</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@email.com"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                </div>

                {email && (
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">I am a...</label>
                    <div className="grid grid-cols-2 gap-2">
                      {roleOptions.map((r) => (
                        <label key={r.value} className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors text-center ${role === r.value ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-lightgray text-charcoal hover:border-slate'}`}>
                          <input type="radio" name="role" value={r.value} checked={role === r.value} onChange={(e) => setRole(e.target.value)} className="sr-only" />
                          <span className="text-sm">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {email && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} className="w-5 h-5 text-teal-500 rounded mt-0.5" />
                    <span className="text-sm text-charcoal">Yes, send me helpful updates about insurance agents in my area.</span>
                  </label>
                )}

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">First Name <span className="text-slate font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name only is fine"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="flex-1 border border-lightgray text-charcoal font-semibold py-4 px-6 rounded-lg hover:bg-offwhite transition-colors">
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-warm-500 hover:bg-warm-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                  >
                    {loading ? 'Submitting...' : 'Submit My Review'}
                  </button>
                </div>

                <p className="text-xs text-slate text-center">
                  By submitting, you agree to our <Link href="/review-guidelines" className="text-teal-500 hover:underline">review guidelines</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default function ReviewInsuranceAgentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center text-charcoal">Loading...</div>}>
      <ReviewInsuranceAgentContent />
    </Suspense>
  )
}
