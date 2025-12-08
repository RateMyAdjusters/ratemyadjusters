'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Star, Send, CheckCircle, AlertCircle, Loader2, RefreshCw, Lock } from 'lucide-react'

// ⚠️ CHANGE THIS PASSWORD - set it in your .env.local file
// Add to .env.local: NEXT_PUBLIC_ADMIN_PASSWORD=your_secret_password_here
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'rma2025admin'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  state: string
  company_name?: string
  slug: string
}

const CLAIM_TYPES = [
  { value: 'roof', label: 'Roof' },
  { value: 'water', label: 'Water Damage' },
  { value: 'fire', label: 'Fire' },
  { value: 'wind', label: 'Wind' },
  { value: 'hail', label: 'Hail' },
  { value: 'theft', label: 'Theft' },
  { value: 'flood', label: 'Flood' },
  { value: 'mold', label: 'Mold' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'other', label: 'Other' },
]

const CLAIM_OUTCOMES = [
  { value: 'approved', label: 'Approved' },
  { value: 'partial', label: 'Partial Approval' },
  { value: 'denied', label: 'Denied' },
  { value: 'pending', label: 'Pending' },
  { value: 'withdrawn', label: 'Withdrawn' },
]

const REVIEWER_TYPES = [
  { value: 'homeowner', label: 'Homeowner' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'public_adjuster', label: 'Public Adjuster' },
]

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MA', 'MD',
  'ME', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

export default function AdminSeedPage() {
  // ALL HOOKS MUST BE DECLARED FIRST - before any conditional returns
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchState, setSearchState] = useState('')
  const [searchResults, setSearchResults] = useState<Adjuster[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedAdjuster, setSelectedAdjuster] = useState<Adjuster | null>(null)

  // Review form state
  const [overallRating, setOverallRating] = useState(3)
  const [claimType, setClaimType] = useState('roof')
  const [claimOutcome, setClaimOutcome] = useState('approved')
  const [reviewerType, setReviewerType] = useState('homeowner')
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [displayName, setDisplayName] = useState('')

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [reviewCount, setReviewCount] = useState(0)

  // Check for saved session on mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('rma_admin_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Login handler
  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('rma_admin_auth', 'true')
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPasswordInput('')
    }
  }

  // Search for adjusters
  const handleSearch = async () => {
    if (!searchQuery.trim() && !searchState) return
    
    setIsSearching(true)
    setSearchResults([])

    try {
      let query = supabase
        .from('adjusters')
        .select('id, first_name, last_name, state, slug')
        .limit(20)

      if (searchQuery.trim()) {
        const searchTerm = searchQuery.trim().toLowerCase()
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
      }

      if (searchState) {
        query = query.eq('state', searchState)
      }

      const { data, error } = await query

      if (error) throw error
      setSearchResults(data || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Get random adjuster
  const getRandomAdjuster = async () => {
    setIsSearching(true)
    try {
      const { count } = await supabase
        .from('adjusters')
        .select('*', { count: 'exact', head: true })

      if (count) {
        const randomOffset = Math.floor(Math.random() * Math.min(count, 10000))
        
        let query = supabase
          .from('adjusters')
          .select('id, first_name, last_name, state, slug')
          .range(randomOffset, randomOffset)
          .limit(1)

        if (searchState) {
          query = query.eq('state', searchState)
        }

        const { data, error } = await query

        if (error) throw error
        if (data && data.length > 0) {
          setSelectedAdjuster(data[0])
          setSearchResults([])
        }
      }
    } catch (error) {
      console.error('Random adjuster error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setSelectedAdjuster(null)
    setOverallRating(3)
    setClaimType('roof')
    setClaimOutcome('approved')
    setReviewerType('homeowner')
    setReviewTitle('')
    setReviewText('')
    setDisplayName('')
    setSearchQuery('')
    setSearchResults([])
  }

  // Submit review
  const handleSubmit = async () => {
    if (!selectedAdjuster) {
      setSubmitStatus('error')
      setSubmitMessage('Please select an adjuster first')
      return
    }

    if (!reviewText.trim() || reviewText.length < 20) {
      setSubmitStatus('error')
      setSubmitMessage('Review text must be at least 20 characters')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { error } = await supabase.from('reviews').insert({
        adjuster_id: selectedAdjuster.id,
        overall_rating: overallRating,
        claim_type: claimType,
        claim_outcome: claimOutcome,
        reviewer_type: reviewerType,
        title: reviewTitle || null,
        review_text: reviewText,
        reviewer_display_name: displayName || null,
        status: 'approved',
        reviewer_verified: false,
      })

      if (error) throw error

      setSubmitStatus('success')
      setSubmitMessage(`Review added for ${selectedAdjuster.first_name} ${selectedAdjuster.last_name}`)
      setReviewCount(prev => prev + 1)
      resetForm()

    } catch (error: any) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      setSubmitMessage(error.message || 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Star rating component
  const StarRating = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number
    onChange: (v: number) => void
    label: string 
  }) => (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-32">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= value
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500 w-8">{value}/5</span>
    </div>
  )

  // ============================================
  // RENDER: Password Gate
  // ============================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Access</h1>
            <p className="text-sm text-gray-400 mt-1">Enter password to continue</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value)
                setPasswordError(false)
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 ${
                passwordError ? 'border-red-500' : 'border-gray-600'
              }`}
              autoFocus
            />
            
            {passwordError && (
              <p className="text-red-400 text-sm text-center">Incorrect password</p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Enter
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Authorized personnel only
          </p>
        </div>
      </div>
    )
  }

  // ============================================
  // RENDER: Main Admin Interface
  // ============================================
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">🌱 Admin Review Seeder</h1>
            <p className="text-sm text-gray-400">Fast review entry for database seeding</p>
          </div>
          <div className="bg-green-600 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium">Session: {reviewCount} reviews</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* LEFT: Adjuster Search */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                1. Find Adjuster
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />

                <select
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">All States</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Search
                  </button>
                  <button
                    onClick={getRandomAdjuster}
                    disabled={isSearching}
                    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    title="Get random adjuster"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Random
                  </button>
                </div>
              </div>

              {searchResults.length > 0 && (
                <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                  {searchResults.map((adj) => (
                    <button
                      key={adj.id}
                      onClick={() => {
                        setSelectedAdjuster(adj)
                        setSearchResults([])
                      }}
                      className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <div className="font-medium">{adj.first_name} {adj.last_name}</div>
                      <div className="text-sm text-gray-400">{adj.state}</div>
                    </button>
                  ))}
                </div>
              )}

              {selectedAdjuster && (
                <div className="mt-4 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-green-400">
                        ✓ {selectedAdjuster.first_name} {selectedAdjuster.last_name}
                      </div>
                      <div className="text-sm text-gray-400">{selectedAdjuster.state}</div>
                    </div>
                    <button
                      onClick={() => setSelectedAdjuster(null)}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="font-semibold mb-3 text-yellow-400">💡 Tips for Realistic Reviews</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>• Vary ratings (don't make them all 1 or 5 stars)</li>
                <li>• Mix claim types and outcomes</li>
                <li>• Use different reviewer types</li>
                <li>• Keep reviews 2-4 sentences</li>
                <li>• Include specific details (timeline, communication)</li>
                <li>• Some positive, some negative, some mixed</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Review Form */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              2. Write Review
            </h2>

            <div className="space-y-5">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <StarRating value={overallRating} onChange={setOverallRating} label="Overall Rating" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Claim Type</label>
                  <select
                    value={claimType}
                    onChange={(e) => setClaimType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {CLAIM_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Outcome</label>
                  <select
                    value={claimOutcome}
                    onChange={(e) => setClaimOutcome(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {CLAIM_OUTCOMES.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Reviewer</label>
                  <select
                    value={reviewerType}
                    onChange={(e) => setReviewerType(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  >
                    {REVIEWER_TYPES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Display Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Texas Homeowner, Mike R., Anonymous"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Title (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Great experience, Slow but fair"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Review Text *</label>
                <textarea
                  placeholder="Write the review here... (minimum 20 characters)"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">{reviewText.length} characters</div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedAdjuster}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>

              {submitStatus !== 'idle' && (
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus === 'success' 
                    ? 'bg-green-900/30 border border-green-700 text-green-400' 
                    : 'bg-red-900/30 border border-red-700 text-red-400'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg text-center">
          <p className="text-yellow-400 text-sm">
            ⚠️ This page is for admin use only. Do not share this URL publicly.
          </p>
        </div>
      </div>
    </div>
  )
}
