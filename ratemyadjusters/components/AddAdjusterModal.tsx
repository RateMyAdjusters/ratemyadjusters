'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, UserPlus, AlertTriangle, CheckCircle, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface AddAdjusterModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (adjuster: any) => void
  redirectToReview?: boolean
}

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

const licenseTypes = [
  'Adjuster - All Lines',
  'Adjuster - P&C',
  'Public Adjuster',
  'Independent Adjuster',
  'Staff Adjuster',
  'Other',
]

export default function AddAdjusterModal({ isOpen, onClose, onSuccess, redirectToReview = true }: AddAdjusterModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [createdAdjuster, setCreatedAdjuster] = useState<any>(null)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [state, setState] = useState('')
  const [company, setCompany] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [notes, setNotes] = useState('')

  const generateSlug = (first: string, last: string, st: string) => {
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    return clean(first) + '-' + clean(last) + '-' + st.toLowerCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim() || !state) {
      setError('First name, last name, and state are required.')
      return
    }
    
    setLoading(true)
    setError(null)

    const slug = generateSlug(firstName, lastName, state)
    
    // Check if slug already exists
    const { data: existing } = await supabase
      .from('adjusters')
      .select('id, slug')
      .eq('slug', slug)
      .single()

    if (existing) {
      setError('An adjuster with this name already exists in ' + state + '. Please search for them instead.')
      setLoading(false)
      return
    }

    // Create the adjuster profile immediately
    const { data: newAdjuster, error: insertError } = await supabase
      .from('adjusters')
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        state: state.toUpperCase(),
        slug: slug,
        qualification: licenseType || null,
        license_status: 'pending_verification',
        city: null,
        license_number: null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      setError('Failed to create adjuster profile. Please try again.')
      setLoading(false)
      return
    }

    setCreatedAdjuster(newAdjuster)
    setSuccess(true)
    setLoading(false)

    if (onSuccess) {
      onSuccess(newAdjuster)
    }

    // Auto-redirect to review page after 2 seconds
    if (redirectToReview) {
      setTimeout(() => {
        router.push('/review?adjuster=' + newAdjuster.id)
      }, 2000)
    }
  }

  const handleClose = () => {
    setFirstName('')
    setLastName('')
    setState('')
    setCompany('')
    setLicenseType('')
    setNotes('')
    setError(null)
    setSuccess(false)
    setCreatedAdjuster(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Missing Adjuster</h2>
              <p className="text-sm text-gray-500">Help us grow the database</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!success ? (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-6">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> A profile will be created immediately so you can leave a review. It will be marked as "Pending Verification" until confirmed.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Smith"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  >
                    <option value="">Select state...</option>
                    {states.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company (optional)</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="State Farm, Allstate, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Type (optional)</label>
                  <select
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  >
                    <option value="">Select if known...</option>
                    {licenseTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anything else you know? (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="License number, city, or any other details..."
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? 'Creating Profile...' : 'Create Profile & Write Review'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profile Created!</h3>
              <p className="text-gray-600 mb-4">
                {createdAdjuster?.first_name} {createdAdjuster?.last_name} has been added.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting you to write a review...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
