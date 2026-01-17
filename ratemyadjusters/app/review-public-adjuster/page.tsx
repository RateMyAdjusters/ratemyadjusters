'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, ChevronRight, Shield, AlertTriangle, UserPlus, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const claimTypes = [
  { value: 'wind_hail', label: 'Wind / Hail' },
  { value: 'fire', label: 'Fire / Lightning' },
  { value: 'water', label: 'Water (sudden/accidental)' },
  { value: 'flood', label: 'Flood' },
  { value: 'hurricane', label: 'Hurricane' },
  { value: 'roof', label: 'Roof' },
  { value: 'mold', label: 'Mold' },
  { value: 'theft', label: 'Theft / Vandalism' },
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

const claimOutcomes = [
  { value: 'paid_full', label: 'Paid in full' },
  { value: 'paid_partial', label: 'Paid partially' },
  { value: 'denied', label: 'Denied' },
  { value: 'reopened', label: 'Claim reopened' },
  { value: 'pending', label: 'Still pending' },
]

const settlementOptions = [
  { value: 'none', label: 'No increase' },
  { value: '1_25', label: '1-25% increase' },
  { value: '26_50', label: '26-50% increase' },
  { value: '51_100', label: '51-100% increase' },
  { value: 'over_100', label: 'Over 100% increase' },
  { value: 'unknown', label: 'Not sure' },
]

const impressionOptions = [
  { value: 'responsive', label: 'Very responsive' },
  { value: 'knowledgeable', label: 'Knowledgeable about policies' },
  { value: 'fought_hard', label: 'Fought hard for my claim' },
  { value: 'great_results', label: 'Got great results' },
  { value: 'slow', label: 'Slow to respond' },
  { value: 'poor_communication', label: 'Poor communication' },
  { value: 'didnt_help', label: "Didn't help much" },
  { value: 'professional', label: 'Very professional' },
]

const roleOptions = [
  { value: 'homeowner', label: 'Homeowner' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'attorney', label: 'Attorney' },
  { value: 'other', label: 'Other' },
]

function ReviewPublicAdjusterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Step 1: The Vent
  const [paName, setPaName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [whatHappened, setWhatHappened] = useState('')
  const [overallRating, setOverallRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [whatWentWellPoorly, setWhatWentWellPoorly] = useState('')

  // Step 2: The Data
  const [paState, setPaState] = useState('')
  const [claimType, setClaimType] = useState('')
  const [claimAmount, setClaimAmount] = useState('')
  const [initialOffer, setInitialOffer] = useState('')

  // Step 3: The Outcome
  const [claimOutcome, setClaimOutcome] = useState('')
  const [settlementIncrease, setSettlementIncrease] = useState('')
  const [impressions, setImpressions] = useState<string[]>([])
  const [impressionOther, setImpressionOther] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState('')

  // Step 4: Contact
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [firstName, setFirstName] = useState('')

  // Honeypot
  const [honeypot, setHoneypot] = useState('')

  // PA search/selection
  const [paResults, setPaResults] = useState<any[]>([])
  const [selectedPA, setSelectedPA] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [showPADropdown, setShowPADropdown] = useState(false)

  useEffect(() => {
    const paId = searchParams.get('pa')
    if (paId) {
      fetchPAById(paId)
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
      setPaName(`${data.first_name} ${data.last_name}`)
      if (data.state) setPaState(data.state)
      if (data.company_name) setCompanyName(data.company_name)
    }
  }

  async function searchPAs(query: string) {
    if (query.length < 2) {
      setPaResults([])
      setShowPADropdown(false)
      return
    }
    setSearchLoading(true)
    const words = query.trim().split(/\s+/)
    let dbQuery = supabase.from('public_adjusters').select('id, first_name, last_name, slug, state, company_name')
    if (words.length >= 2) {
      dbQuery = dbQuery.ilike('first_name', `${words[0]}%`).ilike('last_name', `${words[1]}%`)
    } else {
      dbQuery = dbQuery.or(`first_name.ilike.${query}%,last_name.ilike.${query}%,company_name.ilike.${query}%`)
    }
    const { data } = await dbQuery.limit(8)
    if (data) {
      setPaResults(data)
      setShowPADropdown(true)
    }
    setSearchLoading(false)
  }

  function handlePANameChange(value: string) {
    setPaName(value)
    setSelectedPA(null)
    searchPAs(value)
  }

  function selectPA(pa: any) {
    setSelectedPA(pa)
    setPaName(`${pa.first_name} ${pa.last_name}`)
    if (pa.state) setPaState(pa.state)
    if (pa.company_name) setCompanyName(pa.company_name)
    setShowPADropdown(false)
    setPaResults([])
  }

  function toggleImpression(value: string) {
    setImpressions(prev =>
      prev.includes(value) ? prev.filter(f => f !== value) : [...prev, value]
    )
  }

  function validateStep(stepNum: number): boolean {
    setError(null)
    if (stepNum === 1) {
      if (!paName.trim()) { setError('Please enter the public adjuster\'s name'); return false }
      if (!whatHappened.trim() || whatHappened.trim().length < 20) { setError('Please describe your experience (at least 20 characters)'); return false }
      if (overallRating === 0) { setError('Please select a star rating'); return false }
    }
    if (stepNum === 2) {
      if (!paState) { setError('Please select a state'); return false }
      if (!claimType) { setError('Please select claim type'); return false }
    }
    if (stepNum === 3) {
      if (!claimOutcome) { setError('Please select the claim outcome'); return false }
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
      let paId = selectedPA?.id
      if (!paId && paName.trim()) {
        const nameParts = paName.trim().split(/\s+/)
        const first = nameParts[0] || ''
        const last = nameParts.slice(1).join(' ') || 'Unknown'
        const slug = `${first}-${last}-${paState}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9-]/g, '-')

        const { data: newPA, error: paError } = await supabase
          .from('public_adjusters')
          .insert({
            first_name: first,
            last_name: last,
            state: paState,
            slug: slug,
            company_name: companyName || null,
          })
          .select()
          .single()

        if (paError) {
          console.error('PA insert error:', paError)
          setError('Failed to create profile')
          setLoading(false)
          return
        }
        paId = newPA.id
      }

      const { error: reviewError } = await supabase
        .from('public_adjuster_reviews')
        .insert({
          public_adjuster_id: paId,
          overall_rating: overallRating,
          review_text: whatHappened.trim(),
          reviewer_type: role || 'homeowner',
          status: 'approved',
          company_name: companyName || null,
          claim_type: claimType || null,
          claim_amount: claimAmount || null,
          initial_offer: initialOffer || null,
          claim_outcome: claimOutcome || null,
          settlement_increase: settlementIncrease || null,
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
              <button onClick={() => router.push('/public-adjusters')} className="bg-warm-500 hover:bg-warm-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">Browse PAs</button>
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
            <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
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
                {step === 2 && 'Claim details'}
                {step === 3 && 'Results'}
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
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-6 h-6 text-navy-500" />
                  <div>
                    <h2 className="text-xl font-bold text-navy-500">Tell us about your experience</h2>
                    <p className="text-slate text-sm">Help others by sharing your experience with this public adjuster.</p>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-charcoal mb-1">Public Adjuster Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={paName}
                    onChange={(e) => handlePANameChange(e.target.value)}
                    onFocus={() => paResults.length > 0 && setShowPADropdown(true)}
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-charcoal"
                  />
                  {searchLoading && <p className="text-slate text-xs mt-1">Searching...</p>}
                  {showPADropdown && paResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-lightgray rounded-lg shadow-lg max-h-60 overflow-auto">
                      {paResults.map((pa) => (
                        <button
                          key={pa.id}
                          type="button"
                          onClick={() => selectPA(pa)}
                          className="w-full px-4 py-3 text-left hover:bg-offwhite flex items-center gap-3 border-b border-lightgray last:border-0"
                        >
                          <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-navy-500 font-semibold text-xs">{pa.first_name?.[0]}{pa.last_name?.[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal text-sm">{pa.first_name} {pa.last_name}</p>
                            <p className="text-xs text-slate">{pa.company_name ? `${pa.company_name} • ` : ''}{pa.state}</p>
                          </div>
                        </button>
                      ))}
                      <Link href="/add-public-adjuster" className="w-full px-4 py-3 text-left hover:bg-warm-100 flex items-center gap-3 text-warm-600 bg-warm-50">
                        <UserPlus className="w-5 h-5" />
                        <span className="text-sm font-medium">Add new public adjuster</span>
                      </Link>
                    </div>
                  )}
                  {selectedPA && (
                    <p className="text-xs text-success-500 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Matched to existing profile
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Company Name <span className="text-slate font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. ABC Public Adjusters"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">What was your experience? <span className="text-red-500">*</span></label>
                  <textarea
                    value={whatHappened}
                    onChange={(e) => setWhatHappened(e.target.value.slice(0, 500))}
                    placeholder="Example: Hired them after my insurance company lowballed my roof claim. They got my settlement increased from $8K to $22K. Very responsive and knew exactly what to look for."
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
                    placeholder="Any other details..."
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
                  <h2 className="text-xl font-bold text-navy-500 mb-1">Claim details</h2>
                  <p className="text-slate text-sm">Tell us about the claim they helped with.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">State <span className="text-red-500">*</span></label>
                  <select
                    value={paState}
                    onChange={(e) => setPaState(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {states.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Type of Claim <span className="text-red-500">*</span></label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {claimTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Claim Amount (approximate) <span className="text-slate font-normal">(optional)</span></label>
                  <select
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {claimAmounts.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Insurance company's initial offer <span className="text-slate font-normal">(optional)</span></label>
                  <input
                    type="text"
                    value={initialOffer}
                    onChange={(e) => setInitialOffer(e.target.value)}
                    placeholder="e.g. $5,000"
                    className="w-full px-4 py-3 border border-lightgray rounded-lg focus:ring-2 focus:ring-teal-500 text-charcoal"
                  />
                  <p className="text-xs text-slate mt-1">What did the insurance company offer before you hired the PA?</p>
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
                  <h2 className="text-xl font-bold text-navy-500 mb-1">How did it turn out?</h2>
                  <p className="text-slate text-sm">This is the most valuable part - the results they got for you.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Claim Outcome <span className="text-red-500">*</span></label>
                  <select
                    value={claimOutcome}
                    onChange={(e) => setClaimOutcome(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {claimOutcomes.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">Settlement Increase <span className="text-slate font-normal">(optional)</span></label>
                  <select
                    value={settlementIncrease}
                    onChange={(e) => setSettlementIncrease(e.target.value)}
                    className="w-full px-4 py-3 border border-lightgray rounded-lg bg-white text-charcoal focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select...</option>
                    {settlementOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  <p className="text-xs text-slate mt-1">How much more did you receive vs. the initial offer?</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Would you recommend this PA? <span className="text-red-500">*</span></label>
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
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Show you how your claim compares to others in your area (is it fair?)</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Connect you with verified professionals (PAs, attorneys, contractors) who can help if needed</li>
                    <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" /> Keep you updated on carrier behavior trends that affect you</li>
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
                    <span className="text-sm text-charcoal">Yes, send me helpful updates about public adjusters in my area.</span>
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

export default function ReviewPublicAdjusterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-offwhite flex items-center justify-center text-charcoal">Loading...</div>}>
      <ReviewPublicAdjusterContent />
    </Suspense>
  )
}
