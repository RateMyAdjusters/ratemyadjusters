'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, CheckCircle, AlertTriangle, Shield, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

const specialtyOptions = [
  'Residential',
  'Commercial',
  'Hurricane/Wind',
  'Water Damage',
  'Fire Damage',
  'Hail Damage',
  'Roof Claims',
  'Flood',
  'Mold',
  'Theft/Vandalism',
]

export default function AddPublicAdjusterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [createdPA, setCreatedPA] = useState<any>(null)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')
  const [specialties, setSpecialties] = useState<string[]>([])

  const generateSlug = (first: string, last: string, st: string) => {
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    const timestamp = Date.now().toString(36)
    return clean(first) + '-' + clean(last) + '-' + st.toLowerCase() + '-' + timestamp
  }

  const toggleSpecialty = (spec: string) => {
    setSpecialties(prev => 
      prev.includes(spec) 
        ? prev.filter(s => s !== spec)
        : [...prev, spec]
    )
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

    const { data: newPA, error: insertError } = await supabase
      .from('public_adjusters')
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        state: state.toUpperCase(),
        city: city.trim() || null,
        slug: slug,
        company_name: companyName.trim() || null,
        license_number: licenseNumber.trim() || null,
        license_status: 'pending_verification',
        phone: phone.trim() || null,
        email: email.trim() || null,
        website: website.trim() || null,
        years_experience: yearsExperience ? parseInt(yearsExperience) : null,
        specialties: specialties.length > 0 ? specialties : null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      setError('Failed to create profile. Please try again.')
      setLoading(false)
      return
    }

    setCreatedPA(newPA)
    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      router.push('/review-public-adjuster?pa=' + newPA.id)
    }, 2000)
  }

  if (success && createdPA) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Created!</h1>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">{createdPA.first_name} {createdPA.last_name}</span> has been added.
            </p>
            <p className="text-sm text-amber-600 mb-4">
              This profile is marked as "Pending Verification" until confirmed.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you to write a review...
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/public-adjusters" className="text-gray-500 hover:text-gray-700">Public Adjusters</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Add Profile</span>
          </nav>
        </div>
      </div>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Public Adjuster</h1>
                <p className="text-gray-500 text-sm">List a public adjuster so homeowners can find and review them.</p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mb-6">
              <p className="text-emerald-800 text-sm">
                <strong>Note:</strong> A profile will be created immediately so reviews can be added. It will be marked as "Pending Verification" until we confirm the information.
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
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Houston"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ABC Public Adjusters, LLC"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="PA-123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
                  <input
                    type="number"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    placeholder="10"
                    min="0"
                    max="50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                <div className="flex flex-wrap gap-2">
                  {specialtyOptions.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialty(spec)}
                      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                        specialties.includes(spec)
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                {loading ? 'Creating Profile...' : 'Create Profile & Write Review'}
              </button>
            </form>
          </div>

          {/* Bottom Links */}
          <div className="mt-6 text-center">
            <Link href="/public-adjusters" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              ← Back to Public Adjusters
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
