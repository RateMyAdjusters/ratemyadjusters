import { Metadata } from 'next'
import Link from 'next/link'
import { Users, MapPin, ChevronRight, Search, UserPlus } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Browse Insurance Agents by State | RateMyAdjusters',
  description: 'Find and review insurance agents in your state. Read ratings from policyholders, see agent profiles, and share your experience.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/insurance-agents',
  },
}

const stateData: Record<string, { name: string; slug: string }> = {
  AL: { name: 'Alabama', slug: 'alabama' },
  AK: { name: 'Alaska', slug: 'alaska' },
  AZ: { name: 'Arizona', slug: 'arizona' },
  AR: { name: 'Arkansas', slug: 'arkansas' },
  CA: { name: 'California', slug: 'california' },
  CO: { name: 'Colorado', slug: 'colorado' },
  CT: { name: 'Connecticut', slug: 'connecticut' },
  DE: { name: 'Delaware', slug: 'delaware' },
  FL: { name: 'Florida', slug: 'florida' },
  GA: { name: 'Georgia', slug: 'georgia' },
  HI: { name: 'Hawaii', slug: 'hawaii' },
  ID: { name: 'Idaho', slug: 'idaho' },
  IL: { name: 'Illinois', slug: 'illinois' },
  IN: { name: 'Indiana', slug: 'indiana' },
  IA: { name: 'Iowa', slug: 'iowa' },
  KS: { name: 'Kansas', slug: 'kansas' },
  KY: { name: 'Kentucky', slug: 'kentucky' },
  LA: { name: 'Louisiana', slug: 'louisiana' },
  ME: { name: 'Maine', slug: 'maine' },
  MD: { name: 'Maryland', slug: 'maryland' },
  MA: { name: 'Massachusetts', slug: 'massachusetts' },
  MI: { name: 'Michigan', slug: 'michigan' },
  MN: { name: 'Minnesota', slug: 'minnesota' },
  MS: { name: 'Mississippi', slug: 'mississippi' },
  MO: { name: 'Missouri', slug: 'missouri' },
  MT: { name: 'Montana', slug: 'montana' },
  NE: { name: 'Nebraska', slug: 'nebraska' },
  NV: { name: 'Nevada', slug: 'nevada' },
  NH: { name: 'New Hampshire', slug: 'new-hampshire' },
  NJ: { name: 'New Jersey', slug: 'new-jersey' },
  NM: { name: 'New Mexico', slug: 'new-mexico' },
  NY: { name: 'New York', slug: 'new-york' },
  NC: { name: 'North Carolina', slug: 'north-carolina' },
  ND: { name: 'North Dakota', slug: 'north-dakota' },
  OH: { name: 'Ohio', slug: 'ohio' },
  OK: { name: 'Oklahoma', slug: 'oklahoma' },
  OR: { name: 'Oregon', slug: 'oregon' },
  PA: { name: 'Pennsylvania', slug: 'pennsylvania' },
  RI: { name: 'Rhode Island', slug: 'rhode-island' },
  SC: { name: 'South Carolina', slug: 'south-carolina' },
  SD: { name: 'South Dakota', slug: 'south-dakota' },
  TN: { name: 'Tennessee', slug: 'tennessee' },
  TX: { name: 'Texas', slug: 'texas' },
  UT: { name: 'Utah', slug: 'utah' },
  VT: { name: 'Vermont', slug: 'vermont' },
  VA: { name: 'Virginia', slug: 'virginia' },
  WA: { name: 'Washington', slug: 'washington' },
  WV: { name: 'West Virginia', slug: 'west-virginia' },
  WI: { name: 'Wisconsin', slug: 'wisconsin' },
  WY: { name: 'Wyoming', slug: 'wyoming' },
  DC: { name: 'District of Columbia', slug: 'district-of-columbia' },
}

async function getStateCounts() {
  const { data } = await supabase
    .from('insurance_agents')
    .select('state')
  
  const counts: Record<string, number> = {}
  data?.forEach((row) => {
    counts[row.state] = (counts[row.state] || 0) + 1
  })
  return counts
}

async function getTotalCount() {
  const { count } = await supabase
    .from('insurance_agents')
    .select('*', { count: 'exact', head: true })
  
  return count || 0
}

async function getRecentAgents() {
  const { data } = await supabase
    .from('insurance_agents')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews')
    .order('created_at', { ascending: false })
    .limit(6)
  
  return data || []
}

export default async function InsuranceAgentsBrowsePage() {
  const [stateCounts, totalCount, recentAgents] = await Promise.all([
    getStateCounts(),
    getTotalCount(),
    getRecentAgents(),
  ])

  const statesWithAgents = Object.entries(stateData)
    .map(([abbr, info]) => ({
      abbr,
      ...info,
      count: stateCounts[abbr] || 0,
    }))
    .sort((a, b) => b.count - a.count)

  const topStates = statesWithAgents.filter(s => s.count > 0).slice(0, 10)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Insurance Agents</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Insurance Agents by State
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Browse {totalCount.toLocaleString()} insurance agents across all 50 states. Read reviews from policyholders and find trusted agents in your area.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/add-insurance-agent"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Add an Agent
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-400 transition-colors"
              >
                <Search className="w-5 h-5" />
                Search Agents
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top States */}
        {topStates.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top States</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {topStates.map((state) => (
                <Link
                  key={state.abbr}
                  href={`/insurance-agents/${state.slug}`}
                  className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl font-bold text-indigo-600">{state.count}</div>
                  <div className="text-gray-900 font-medium">{state.name}</div>
                  <div className="text-xs text-gray-500">agents</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All States */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All States</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {statesWithAgents.map((state) => (
                <Link
                  key={state.abbr}
                  href={`/insurance-agents/${state.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <span className="text-gray-700 hover:text-indigo-600">{state.name}</span>
                  {state.count > 0 && (
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                      {state.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Added */}
        {recentAgents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Added Agents</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentAgents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/insurance-agent/${agent.slug}`}
                  className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{agent.first_name?.[0]}{agent.last_name?.[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{agent.first_name} {agent.last_name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {agent.city ? `${agent.city}, ` : ''}{agent.state}
                      </div>
                      {agent.company_name && (
                        <div className="text-xs text-indigo-600">{agent.company_name}</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-indigo-50 rounded-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About Insurance Agents</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Insurance agents help policyholders find the right coverage for their needs. They work with insurance companies to provide quotes, explain policy options, and assist with claims. A good insurance agent can make a significant difference when you need to file a claim or understand your coverage.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Use RateMyAdjusters to find insurance agents in your area, read reviews from other policyholders, and share your own experiences. Your feedback helps others find trustworthy insurance professionals.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
