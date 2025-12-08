import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ChevronRight, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Breadcrumb from '@/components/Breadcrumb'
import QuickLinks from '@/components/QuickLinks'

export const metadata: Metadata = {
  title: 'Browse Insurance Adjusters by State | RateMyAdjusters',
  description: 'Find and compare insurance adjusters across all 50 states. See ratings, reviews, and license details from real claim experiences.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/adjusters',
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
      .from('adjusters')
      .select('*', { count: 'exact', head: true })
      .eq('state', state.abbr)
    
    counts[state.abbr] = count || 0
  })
  
  await Promise.all(promises)
  return counts
}

export default async function AdjustersIndexPage() {
  const stateCounts = await getStateCounts()
  const totalAdjusters = Object.values(stateCounts).reduce((a, b) => a + b, 0)

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Adjusters', item: 'https://ratemyadjusters.com/adjusters' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-gray-50">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Adjusters' }]} />

        {/* Hero */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl md:text-4xl font-bold">Browse Adjusters by State</h1>
            </div>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl">
              Find insurance adjuster ratings and reviews across all 50 US states. 
              Select your state to see local adjusters.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 inline-block">
              <div className="text-3xl font-bold">{totalAdjusters.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Total Adjusters</div>
            </div>
          </div>
        </div>

        {/* States Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/adjusters/${state.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {state.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {(stateCounts[state.abbr] || 0).toLocaleString()} adjusters
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <QuickLinks
            links={[
              { label: 'Leave a Review', href: '/review', description: 'Share your experience' },
              { label: 'Insurance Companies', href: '/companies', description: 'Browse by carrier' },
              { label: 'Guides & Resources', href: '/guides', description: 'Helpful articles' },
            ]}
          />
        </div>
      </main>
    </>
  )
}
