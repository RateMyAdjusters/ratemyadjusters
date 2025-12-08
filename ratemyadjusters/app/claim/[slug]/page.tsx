'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Shield, ArrowLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Adjuster {
  id: string
  first_name: string
  last_name: string
  state: string
  slug: string
  profile_claimed: boolean
}

export default function ClaimProfilePage() {
  const params = useParams()
  const slug = params.slug as string

  const [adjuster, setAdjuster] = useState<Adjuster | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmChecked, setConfirmChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchAdjuster() {
      if (!slug) return

      const { data, error } = await supabase
        .from('adjusters')
        .select('id, first_name, last_name, state, slug, profile_claimed')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setAdjuster(null)
      } else {
        setAdjuster(data)
      }
      setLoading(false)
    }

    fetchAdjuster()
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setErrorMessage('Email is required')
      setSubmitStatus('error')
      return
    }

    if (!confirmChecked) {
      setErrorMessage('Please confirm you are this adjuster')
      setSubmitStatus('error')
      return
    }

    if (!adjuster) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/claim-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adjusterId: adjuster.id,
          adjusterName: `${adjuster.first_name} ${adjuster.last_name}`,
          adjusterState: adjuster.state,
          adjusterSlug: adjuster.slug,
          email: email.trim(),
          phone: phone.trim() || 'Not provided',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitStatus('success')

    } catch (error: any) {
      console.error('Claim submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!adjuster) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Adjuster Not Found</h1>
          <p className="text-gray-600 mb-4">This profile doesn't exist.</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (adjuster.profile_claimed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Profile Already Claimed</h1>
          <p className="text-gray-600 mb-6">
            The profile for <strong>{adjuster.first_name} {adjuster.last_name}</strong> has already been claimed.
          </p>
          <Link 
            href={`/adjuster/${adjuster.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Profile
          </Link>
        </div>
      </div>
    )
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Request Submitted</h1>
          <p className="text-gray-600 mb-6">
            We've received your claim request for <strong>{adjuster.first_name} {adjuster.last_name}</strong>. 
            We'll review it and get back to you within 1-2 business days.
          </p>
          <Link 
            href={`/adjuster/${adjuster.slug}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Link 
          href={`/adjuster/${adjuster.slug}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Claim This Profile</h1>
            <p className="text-gray-600 text-sm">
              {adjuster.first_name} {adjuster.last_name} • {adjuster.state}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 555-5555"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="confirm"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="confirm" className="text-sm text-gray-700">
                I confirm that I am <strong>{adjuster.first_name} {adjuster.last_name}</strong> or am authorized to manage this profile.
              </label>
            </div>

            {submitStatus === 'error' && errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Claim Request'
              )}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            We'll verify your identity before approving your claim. This helps protect adjusters from impersonation.
          </p>
        </div>
      </div>
    </div>
  )
}
