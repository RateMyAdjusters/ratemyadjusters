'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronRight, Shield, AlertTriangle, UserPlus, CheckCircle, AlertCircle } from 'lucide-react'
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

const propertyTypes = [
  { value: 'single_family', label: 'Single-family home' },
  { value: 'condo', label: 'Condo' },
  { value: 'multi_unit', label: 'Multi-unit' },
  { value: 'mobile', label: 'Mobile home' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'other', label: 'Other' },
]

const perils = [
  { value: 'wind_hail', label: 'Wind / Hail' },
  { value: 'fire', label: 'Fire / Lightning' },
  { value: 'water', label: 'Water (sudden/accidental)' },
  { value: 'flood', label: 'Flood' },
  { value: 'theft', label: 'Theft / Vandalism' },
  { value: 'liability', label: 'Liability' },
  { value: 'other', label: 'Other' },
]

const claimAmounts = [
  { value: 'under_5k', label: 'Under $5K' },
  { value: '5k_20k', label: '$5K – $20K' },
  { value: '20k_50k', label: '$20K – $50K' },
  { value: '50k_100k', label: '$50K – $100K' },
  { value: 'over_100k', label: '$100K+' },
  { value: 'unknown', label: "I don't know" },
]

const reportTiming = [
  { value: 'same_week', label: 'Same week' },
  { value: 'few_weeks', label: 'A few weeks later' },
  { value: '1_2_months', label: '1–2 months later' },
  { value: '2_plus_months', label: '2+ months later' },
]

const finalStatuses = [
  { value: 'paid_full', label: 'Paid in full' },
  { value: 'paid_partial', label: 'Paid partially (less than expected)' },
  { value: 'denied', label: 'Denied' },
  { value: 'pending', label: 'Still open / pending' },
]

const payoutComparisons = [
  { value: 'way_too_low', label: 'Way too low (under 50%)' },
  { value: 'somewhat_low', label: 'Somewhat low (50–80%)' },
  { value: 'fair', label: 'Fair / as expected (80–100%)' },
  { value: 'more_than_expected', label: 'More than expected (100%+)' },
  { value: 'no_comparison', label: "Didn't have a comparison estimate" },
]

const escalationOptions = [
  { value: 'none', label: 'No, accepted initial offer' },
  { value: 'pushed_back', label: 'Yes, I pushed back myself' },
  { value: 'contractor', label: 'Hired a contractor' },
  { value: 'public_adjuster', label: 'Hired a public adjuster' },
  { value: 'attorney', label: 'Hired an attorney' },
  { value: 'appraisal', label: 'Went to appraisal' },
  { value: 'litigation', label: 'Litigation' },
]

const timeToDecision = [
  { value: 'under_1_month', label: 'Under 1 month' },
  { value: '1_3_months', label: '1–3 months' },
  { value: '3_6_months', label: '3–6 months' },
  { value: '6_12_months', label: '6–12 months' },
  { value: 'over_1_year', label: 'Over 1 year' },
  { value: 'still_waiting', label: 'Still waiting' },
]

const frustrationOptions = [
  { value: 'slow_response', label: 'Adjuster was slow to respond' },
  { value: 'hard_to_reach', label: 'Hard to get them on the phone' },
  { value: 'no_explanation', label: "Didn't explain their reasoning" },
  { value: 'pressured', label: 'Pressured me to accept low offer' },
  { value: 'ignored_estimate', label: "Ignored my contractor's estimate" },
  { value: 'misstated_coverage', label: 'Misstated what my policy covered' },
  { value: 'responsive_fair', label: 'Was responsive & fair' },
  { value: 'explained_clearly', label: 'Took time to explain things clearly' },
]

const premiumImpacts = [
  { value: 'no_change', label: 'No change' },
  { value: 'went_up', label: 'Premium went up' },
  { value: 'threatened_nonrenewal', label: 'Threatened non-renewal' },
  { value: 'nonrenewed', label: 'Non-renewed' },
  { value: 'unknown', label: "Don't know yet" },
]

const roleOptions = [
  { value: 'homeowner', label: 'Homeowner / policyholder' },
  { value: 'public_adjuster', label: 'Public adjuster' },
  { value: 'attorney', label: 'Attorney' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'other', label: 'Other' },
]

function generateMonthOptions() {
  const options = []
  const now = new Date()
  for (let i = 0; i < 36; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    options.push({ value, label })
  }
  return options
}

function ReviewContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const monthOptions = generateMonthOptions()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Step 1: The Vent
  const [adjusterName, setAdjusterName] = useState('')
  const [carrierName, setCarrierName] = useState('')
  const [carrierOther, setCarrierOther] = useState('')
  const [whatHappened, setWhatHappened] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [whatWentWellPoorly, setWhatWentWellPoorly] = useState('')

  // Step 2: The Data
  const [claimState, setClaimState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [peril, setPeril] = useState('')
  const [claimAmount, setClaimAmount] = useState('')
  const [lossDate, setLossDate] = useState('')
  const [reportDate, setReportDate] = useState('')

  // Step 3: The Outcome
  const [finalStatus, setFinalStatus] = useState('')
  const [payoutComparison, setPayoutComparison] = useState('')
  const [escalation, setEscalation] = useState('')
  const [decisionTime, setDecisionTime] = useState('')
  const [frustrations, setFrustrations] = useState<string[]>([])
  const [frustrationOther, setFrustrationOther] = useState('')
  const [premiumImpact, setPremiumImpact] = useState('')

  // Step 4: Contact
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [firstName, setFirstName] = useState('')

  // Honeypot
  const [honeypot, setHoneypot] = useState('')

  // Adjuster search/selection
  const [adjusterResults, setAdjusterResults] = useState<any[]>([])
  const [selectedAdjuster, setSelectedAdjuster] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [showAdjusterDropdown, setShowAdjusterDropdown] = useState(false)

  useEffect(() => {
    const adjusterId = searchParams.get('adjuster')
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
      setAdjusterName(`${data.first_name} ${data.last_name}`)
      if (data.state) setClaimState(data.state)
    }
  }

  async function searchAdjusters(query: string) {
    if (query.length < 2) {
      setAdjusterResults([])
      setShowAdjusterDropdown(false)
      return
    }
    setSearchLoading(true)
    const words = query.trim().split(/\s+/)
    let dbQuery = supabase.from('adjusters').select('id, first_name, last_name, slug, state')
    if (words.length >= 2) {
      dbQuery = dbQuery.ilike('first_name', `${words[0]}%`).ilike('last_name', `${words[1]}%`)
    } else {
      dbQuery = dbQuery.or(`first_name.ilike.${query}%,last_name.ilike.${query}%`)
    }
    const { data } = await dbQuery.limit(8)
    if (data) {
      setAdjusterResults(data)
      setShowAdjusterDropdown(true)
    }
    setSearchLoading(false)
  }

  function handleAdjusterNameChange(value: string) {
    setAdjusterName(value)
    setSelectedAdjuster(null)
    searchAdjusters(value)
  }

  function selectAdjuster(adj: any) {
    setSelectedAdjuster(adj)
    setAdjusterName(`${adj.first_name} ${adj.last_name}`)
    if (adj.state) setClaimState(adj.state)
    setShowAdjusterDropdown(false)
    setAdjusterResults([])
  }

  function toggleFrustration(value: string) {
    setFrustrations(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    )
  }

  function validateStep(stepNum: number): boolean {
    setError(null)
    if (stepNum === 1) {
      if (!adjusterName.trim()) { setError('Please enter the adjuster\'s name'); return false }
      if (!carrierName) { setError('Please select a carrier'); return false }
      if (carrierName === 'Other' && !carrierOther.trim()) { setError('Please enter the carrier name'); return false }
      if (!whatHappened.trim() || whatHappened.trim().length < 20) { setError('Please describe what happened (at least 20 characters)'); return false }
      if (overallRating === 0) { setError('Please select a star rating'); return false }
    }
    if (stepNum === 2) {
      if (!claimState) { setError('Please select a state'); return false }
      if (!propertyType) { setError('Please select property type'); return false }
      if (!peril) { setError('Please select type of loss'); return false }
      if (!claimAmount) { setError('Please select claim amount range'); return false }
      if (!lossDate) { setError('Please select when the loss occurred'); return false }
      if (!reportDate) { setError('Please select when you reported the claim'); return false }
    }
    if (stepNum === 3) {
      if (!finalStatus) { setError('Please select the final status'); return false }
      if (!payoutComparison) { setError('Please select how payout compared to estimate'); return false }
      if (!escalation) { setError('Please select if you escalated'); return false }
      if (!decisionTime) { setError('Please select time to decision'); return false }
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
      // Create adjuster if not selected from DB
      let adjusterId = selectedAdjuster?.id
      if (!adjusterId && adjusterName.trim()) {
        const nameParts = adjusterName.trim().split(/\s+/)
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || 'Unknown'
        const slug = `${firstName}-${lastName}-${claimState}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')

        const { data: newAdj, error: adjError } = await supabase
          .from('adjusters')
          .insert({
            first_name: firstName,
            last_name: lastName,
            state: claimState,
            slug: slug,
          })
          .select()
          .single()

        if (adjError) {
          console.error('Adjuster insert error:', adjError)
          setError('Failed to create adjuster profile')
          setLoading(false)
          return
        }
        adjusterId = newAdj.id
      }

      // Insert review with all fields
      const { error: reviewError } = await supabase
        .from('reviews')
        .insert({
          adjuster_id: adjusterId,
          overall_rating: overallRating,
          review_text: whatHappened.trim(),
          claim_type: peril || null,
          claim_outcome: finalStatus || null,
          reviewer_type: role || 'homeowner',
          status: 'approved',
          // New extended fields
          carrier_name: carrierName !== 'Other' ? carrierName : null,
          carrier_other: carrierName === 'Other' ? carrierOther : null,
          zip_code: zipCode || null,
          property_type: propertyType || null,
          claim_amount: claimAmount || null,
          loss_date: lossDate || null,
          report_timing: reportDate || null,
          payout_comparison: payoutComparison || null,
          escalation: escalation || null,
          decision_time: decisionTime || null,
          frustrations: frustrations.length > 0 ? frustrations : null,
          frustration_other: frustrationOther || null,
          premium_impact: premiumImpact || null,
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
          <span className="ml-3 text-slate self-center">
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
            <p className="text-slate mb-6">Your review has been submitted successfully. You're helping thousands of homeowners make better decisions.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => router.push('/')} className="bg-warm-500 hover:bg-warm-600 text-white font-semibold py-2 px-6 rounded-lg">Back to Home</button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const progressPercent = ((step - 1) / 3) * 100

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate hover:text-charcoal">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate" />
            <span className="text-charcoal font-medium">Leave a Review</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-offwhite py-8">
        <div className="max-w-2xl mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-charcoal">Step {step} of 4</span>
              <span className="text-sm text-slate">
                {step === 1 && 'Tell us about the claim'}
                {step === 2 && 'Claim details'}
                {step === 3 && 'How it turned out'}
                {step === 4 && 'Almost done'}
              </span>
            </div>
            <div className="w-full bg-lightgray rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent + 25}%`, background: `linear-gradient(to right, #0A3D62, ${step >= 3 ? '#4CAF50' : '#20A39E'})` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {/* Honeypot */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* STEP 1: The Vent */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Tell us about the claim</h2>
                  <p className="text-slate text-sm">We're building the most complete review platform for insurance adjusters. Share your honest experience—it helps thousands of homeowners and contractors make better decisions.</p>
                </div>

                {/* Adjuster Name */}
                <div className="relative">
                  <label className="block text-sm font-medium text-charcoal mb-1">Adjuster Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={adjusterName}
                    onChange={(e) => handleAdjusterNameChange(e.target.value)}
                    onFocus={() => adjusterResults.length > 0 && setShowAdjusterDropdown(true)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-charcoal"
                  />
                  {searchLoading && <p className="text-slate text-xs mt-1">Searching...</p>}
                  {showAdjusterDropdown && adjusterResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-lightgray rounded-lg shadow-lg max-h-60 overflow-auto">
                      {adjusterResults.map((adj) => (
                        <button
                          key={adj.id}
                          type="button"
                          onClick={() => selectAdjuster(adj)}
                          className="w-full px-4 py-3 text-left hover:bg-offwhite flex items-center gap-3 border-b border-lightgray last:border-0"
                        >
                          <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-500 font-semibold text-xs">{adj.first_name?.[0]}{adj.last_name?.[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal text-sm">{adj.first_name} {adj.last_name}</p>
                            <p className="text-xs text-slate">{adj.state}</p>
                          </div>
                        </button>
                      ))}
                      <Link
                        href="/add-adjuster"
                        className="w-full px-4 py-3 text-left hover:bg-amber-50 flex items-center gap-3 text-amber-700 bg-amber-50"
                      >
                        <UserPlus className="w-5 h-5" />
                        <span className="text-sm font-medium">Add new adjuster</span>
                      </Link>
                    </div>
                  )}
                  {selectedAdjuster && (
                    <p className="text-xs text-success-500 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Matched to existing profile
                    </p>
                  )}
                </div>

                {/* Carrier */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Insurance Carrier <span className="text-red-500">*</span></label>
                  <select
                    value={carrierName}
                    onChange={(e) => setCarrierName(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select carrier...</option>
                    {carriers.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {carrierName === 'Other' && (
                    <input
                      type="text"
                      value={carrierOther}
                      onChange={(e) => setCarrierOther(e.target.value)}
                      placeholder="Enter carrier name"
                      className="w-full mt-2 px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                    />
                  )}
                </div>

                {/* What Happened */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">What happened? <span className="text-red-500">*</span></label>
                  <textarea
                    value={whatHappened}
                    onChange={(e) => setWhatHappened(e.target.value.slice(0, 500))}
                    placeholder="Example: Water damage from burst pipe, adjuster approved initial $8K estimate but then cut it to $4.5K saying some wasn't covered. Felt rushed and not heard."
                    rows={4}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                  <p className={`text-xs mt-1 ${whatHappened.length < 20 ? 'text-amber-600' : 'text-slate'}`}>
                    {whatHappened.length}/500 {whatHappened.length < 20 && '(minimum 20 characters)'}
                  </p>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Overall, how would you rate this adjuster? <span className="text-red-500">*</span></label>
                  <StarRatingInput rating={overallRating} setRating={setOverallRating} hover={hoverRating} setHover={setHoverRating} />
                </div>

                {/* What went well/poorly (optional) */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Briefly, what went well or poorly? <span className="text-slate font-normal">(optional)</span></label>
                  <textarea
                    value={whatWentWellPoorly}
                    onChange={(e) => setWhatWentWellPoorly(e.target.value.slice(0, 300))}
                    placeholder="Example: Responsive but didn't explain his reasoning. Never got a copy of his report."
                    rows={2}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                  <p className="text-xs text-slate mt-1">{whatWentWellPoorly.length}/300</p>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-warm-500 hover:bg-warm-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {/* STEP 2: The Data */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Claim details</h2>
                  <p className="text-slate text-sm">Just a bit more context about your claim. This helps us identify patterns.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">State <span className="text-red-500">*</span></label>
                    <select
                      value={claimState}
                      onChange={(e) => setClaimState(e.target.value)}
                      className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select...</option>
                      {states.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* ZIP (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">ZIP Code <span className="text-slate font-normal">(optional)</span></label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
                      placeholder="12345"
                      className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                    />
                    <p className="text-xs text-slate mt-1">Helps us see regional patterns</p>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Property Type <span className="text-red-500">*</span></label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {propertyTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                {/* Peril */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Type of Loss / Peril <span className="text-red-500">*</span></label>
                  <select
                    value={peril}
                    onChange={(e) => setPeril(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {perils.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>

                {/* Claim Amount */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Claim Amount (approximate) <span className="text-red-500">*</span></label>
                  <select
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {claimAmounts.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                  <p className="text-xs text-slate mt-1">We don't need exact amounts</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Loss Date */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">When did loss occur? <span className="text-red-500">*</span></label>
                    <select
                      value={lossDate}
                      onChange={(e) => setLossDate(e.target.value)}
                      className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select...</option>
                      {monthOptions.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>

                  {/* Report Timing */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-1">When did you report? <span className="text-red-500">*</span></label>
                    <select
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select...</option>
                      {reportTiming.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
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

            {/* STEP 3: The Outcome */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">How did the claim turn out?</h2>
                  <p className="text-slate text-sm">Finally, how things ended. This is where we spot trends in carrier behavior.</p>
                </div>

                {/* Final Status */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">What was the final status? <span className="text-red-500">*</span></label>
                  <select
                    value={finalStatus}
                    onChange={(e) => setFinalStatus(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {finalStatuses.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>

                {/* Payout vs Estimate */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Did payout match your/contractor's estimate? <span className="text-red-500">*</span></label>
                  <select
                    value={payoutComparison}
                    onChange={(e) => setPayoutComparison(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {payoutComparisons.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>

                {/* Escalation */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Did you escalate this claim? <span className="text-red-500">*</span></label>
                  <select
                    value={escalation}
                    onChange={(e) => setEscalation(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {escalationOptions.map((e) => <option key={e.value} value={e.value}>{e.label}</option>)}
                  </select>
                </div>

                {/* Time to Decision */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">How long from loss to final decision? <span className="text-red-500">*</span></label>
                  <select
                    value={decisionTime}
                    onChange={(e) => setDecisionTime(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {timeToDecision.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                {/* Frustrations/Impressions (checkboxes) */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">What frustrated or impressed you? <span className="text-slate font-normal">(optional)</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {frustrationOptions.map((f) => (
                      <label key={f.value} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${frustrations.includes(f.value) ? 'border-teal-500 bg-teal-50' : 'border-lightgray hover:border-lightgray'}`}>
                        <input
                          type="checkbox"
                          checked={frustrations.includes(f.value)}
                          onChange={() => toggleFrustration(f.value)}
                          className="w-4 h-4 text-teal-500 rounded"
                        />
                        <span className="text-sm text-charcoal">{f.label}</span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={frustrationOther}
                    onChange={(e) => setFrustrationOther(e.target.value)}
                    placeholder="Other (optional)"
                    className="w-full mt-2 px-4 py-2 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal text-sm"
                  />
                </div>

                {/* Premium Impact (optional) */}
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Has your premium gone up or non-renewal? <span className="text-slate font-normal">(optional)</span></label>
                  <select
                    value={premiumImpact}
                    onChange={(e) => setPremiumImpact(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {premiumImpacts.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
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

            {/* STEP 4: Contact */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Last step</h2>
                  <p className="text-slate text-sm">Your email is optional—but if you share it, we'll:</p>
                  <ul className="text-sm text-slate mt-2 space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Show you how your claim compares to others in your area (is it fair?)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Connect you with verified professionals (PAs, attorneys, contractors) who can help if needed</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Keep you updated on carrier behavior trends that affect you</li>
                  </ul>
                  <p className="text-xs text-slate mt-2">We don't spam. Promise.</p>
                </div>

                {/* Email */}
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

                {/* Role (conditional on email) */}
                {email && (
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">I am a...</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {roleOptions.map((r) => (
                        <label key={r.value} className={`flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors text-center ${role === r.value ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-lightgray text-charcoal hover:border-lightgray'}`}>
                          <input
                            type="radio"
                            name="role"
                            value={r.value}
                            checked={role === r.value}
                            onChange={(e) => setRole(e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-sm">{r.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Opt-in */}
                {email && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optIn}
                      onChange={(e) => setOptIn(e.target.checked)}
                      className="w-5 h-5 text-teal-500 rounded mt-0.5"
                    />
                    <span className="text-sm text-charcoal">Yes, I want to hear about PAs, attorneys, or contractors in my area.</span>
                  </label>
                )}

                {/* First Name */}
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

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center">Loading...</div>}>
      <ReviewContent />
    </Suspense>
  )
}
