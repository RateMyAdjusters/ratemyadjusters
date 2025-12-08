'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserPlus, CheckCircle, AlertTriangle } from 'lucide-react'

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

export default function AddAdjusterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim() || !state) {
      setError('First name, last name, and state are required.')
      return
    }
    
    setLoading(true)
    setError(null)
    
    // In production, you'd send this to your API for moderation
    // For now, we'll just show success
    console.log('New adjuster submission:', {
      firstName,
      lastName,
      state,
      city,
      company,
      licenseNumber,
    })
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Submission Received!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for helping us grow our database. We'll review this submission and add the adjuster profile within 24-48 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/search')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Search Adjusters
              </button>
              <button
                onClick={() => {
                  setSuccess(false)
                  setFirstName('')
                  setLastName('')
                  setState('')
                  setCity('')
                  setCompany('')
                  setLicenseNumber('')
                }}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Add Another
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add Missing Adjuster</h1>
              <p className="text-gray-500 text-sm">Help us grow the database</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> All submissions are reviewed before being added. Only add adjusters you've actually worked with.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  required
                >
                  <option value="">Select...</option>
                  {states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Houston"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Company (if known)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="State Farm, Allstate, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Number (if known)
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit for Review'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
