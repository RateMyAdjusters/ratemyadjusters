import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Shield, Users, Star, ArrowRight, HelpCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Find a Public Adjuster by State | RateMyAdjusters',
  description: 'Find and compare public adjusters across all 50 states. Read reviews from homeowners. Public adjusters work for YOU, not the insurance company.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/public-adjusters',
  },
}

export const revalidate = 3600

const STATES = [
  { slug: 'alabama', name: 'Alabama', abbr: 'AL' },
  { slug: 'alaska', name: 'Alaska', abbr: 'AK' },
  { slug: 'arizona', name: 'Arizona', abbr: 'AZ' },
  { slug: 'arkansas', name: 'Arkansas', abbr: 'AR' },
  { slug: 'california', name: 'California', abbr: 'CA' },
  { slug: 'colorado', name: 'Colorado', abbr: 'CO' },
  { slug: 'connecticut', name: 'Connecticut', abbr: 'CT' },
  { slug: 'delaware', name: 'Delaware', abbr: 'DE' },
  { slug: 'florida', name: 'Florida', abbr: 'FL' },
  { slug: 'georgia', name: 'Georgia', abbr: 'GA' },
  { slug: 'hawaii', name: 'Hawaii', abbr: 'HI' },
  { slug: 'idaho', name: 'Idaho', abbr: 'ID' },
  { slug: 'illinois', name: 'Illinois', abbr: 'IL' },
  { slug: 'indiana', name: 'Indiana', abbr: 'IN' },
  { slug: 'iowa', name: 'Iowa', abbr: 'IA' },
  { slug: 'kansas', name: 'Kansas', abbr: 'KS' },
  { slug: 'kentucky', name: 'Kentucky', abbr: 'KY' },
  { slug: 'louisiana', name: 'Louisiana', abbr: 'LA' },
  { slug: 'maine', name: 'Maine', abbr: 'ME' },
  { slug: 'maryland', name: 'Maryland', abbr: 'MD' },
  { slug: 'massachusetts', name: 'Massachusetts', abbr: 'MA' },
  { slug: 'michigan', name: 'Michigan', abbr: 'MI' },
  { slug: 'minnesota', name: 'Minnesota', abbr: 'MN' },
  { slug: 'mississippi', name: 'Mississippi', abbr: 'MS' },
  { slug: 'missouri', name: 'Missouri', abbr: 'MO' },
  { slug: 'montana', name: 'Montana', abbr: 'MT' },
  { slug: 'nebraska', name: 'Nebraska', abbr: 'NE' },
  { slug: 'nevada', name: 'Nevada', abbr: 'NV' },
  { slug: 'new-hampshire', name: 'New Hampshire', abbr: 'NH' },
  { slug: 'new-jersey', name: 'New Jersey', abbr: 'NJ' },
  { slug: 'new-mexico', name: 'New Mexico', abbr: 'NM' },
  { slug: 'new-york', name: 'New York', abbr: 'NY' },
  { slug: 'north-carolina', name: 'North Carolina', abbr: 'NC' },
  { slug: 'north-dakota', name: 'North Dakota', abbr: 'ND' },
  { slug: 'ohio', name: 'Ohio', abbr: 'OH' },
  { slug: 'oklahoma', name: 'Oklahoma', abbr: 'OK' },
  { slug: 'oregon', name: 'Oregon', abbr: 'OR' },
  { slug: 'pennsylvania', name: 'Pennsylvania', abbr: 'PA' },
  { slug: 'rhode-island', name: 'Rhode Island', abbr: 'RI' },
  { slug: 'south-carolina', name: 'South Carolina', abbr: 'SC' },
  { slug: 'south-dakota', name: 'South Dakota', abbr: 'SD' },
  { slug: 'tennessee', name: 'Tennessee', abbr: 'TN' },
  { slug: 'texas', name: 'Texas', abbr: 'TX' },
  { slug: 'utah', name: 'Utah', abbr: 'UT' },
  { slug: 'vermont', name: 'Vermont', abbr: 'VT' },
  { slug: 'virginia', name: 'Virginia', abbr: 'VA' },
  { slug: 'washington', name: 'Washington', abbr: 'WA' },
  { slug: 'west-virginia', name: 'West Virginia', abbr: 'WV' },
  { slug: 'wisconsin', name: 'Wisconsin', abbr: 'WI' },
  { slug: 'wyoming', name: 'Wyoming', abbr: 'WY' },
  { slug: 'district-of-columbia', name: 'District of Columbia', abbr: 'DC' },
]

async function getStateCounts(): Promise<Record<string, number>> {
  const counts: Record<string, number> = {}
  
  const promises = STATES.map(async (state) => {
    const { count } = await supabase
      .from('public_adjusters')
      .select('*', { count: 'exact', head: true })
      .eq('state', state.abbr)
    
    counts[state.abbr] = count || 0
  })
  
  await Promise.all(promises)
  return counts
}

export default async function PublicAdjustersIndexPage() {
  const stateCounts = await getStateCounts()
  const totalPAs = Object.values(stateCounts).reduce((a, b) => a + b, 0)

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Public Adjusters', item: 'https://ratemyadjusters.com/public-adjusters' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Public Adjusters</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-emerald-300" />
              <h1 className="text-3xl md:text-4xl font-bold">Find a Public Adjuster</h1>
            </div>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl">
              Public adjusters work for YOU, not the insurance company. Find a licensed public adjuster 
              in your state to help maximize your insurance claim settlement.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">{totalPAs.toLocaleString()}</div>
                <div className="text-emerald-200 text-sm">Public Adjusters</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
                <div className="text-3xl font-bold">50</div>
                <div className="text-emerald-200 text-sm">States Covered</div>
              </div>
            </div>
          </div>
        </div>

        {/* What is a Public Adjuster */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">What is a Public Adjuster?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>public adjuster</strong> is a licensed insurance professional who works exclusively for policyholders (you), 
                  not insurance companies. They help you document damage, prepare your claim, and negotiate with your insurance company 
                  to get the maximum settlement you are entitled to.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 border border-emerald-100">
                    <div className="font-semibold text-emerald-700 mb-1">Works for YOU</div>
                    <p className="text-sm text-gray-600">Unlike company adjusters, public adjusters advocate for your interests</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-emerald-100">
                    <div className="font-semibold text-emerald-700 mb-1">Licensed & Regulated</div>
                    <p className="text-sm text-gray-600">Must be licensed by state insurance departments</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-emerald-100">
                    <div className="font-semibold text-emerald-700 mb-1">Higher Settlements</div>
                    <p className="text-sm text-gray-600">Studies show 30-50% higher settlements on average</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* States Grid */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by State</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/public-adjusters/${state.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {state.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(stateCounts[state.abbr] || 0).toLocaleString()} public adjusters
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 group-hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="font-bold text-xl mb-2">Worked with a Public Adjuster?</h3>
              <p className="text-emerald-100 mb-4">Share your experience to help other homeowners find the right representation.</p>
              <Link href="/review-public-adjuster" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold py-2 px-4 rounded-lg hover:bg-emerald-50">
                <Star className="w-4 h-4" />
                Leave a Review
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-xl text-gray-900 mb-2">Are You a Public Adjuster?</h3>
              <p className="text-gray-600 mb-4">Get listed and let homeowners find you. Claim your profile to respond to reviews.</p>
              <Link href="/add-public-adjuster" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-700">
                <Users className="w-4 h-4" />
                Add Your Profile
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Related Resources</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/adjusters" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Insurance Adjusters</div>
                  <div className="text-sm text-gray-500">Company adjusters by state</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/guides" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Guides</div>
                  <div className="text-sm text-gray-500">Claims help & tips</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link href="/companies" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Companies</div>
                  <div className="text-sm text-gray-500">Browse by carrier</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not endorse or recommend any specific public adjuster. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
