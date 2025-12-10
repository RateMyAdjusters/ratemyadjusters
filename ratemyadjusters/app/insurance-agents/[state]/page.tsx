import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, ChevronRight, UserPlus, Filter } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'

export const revalidate = 3600

const stateData: Record<string, { abbr: string; name: string }> = {
  'alabama': { abbr: 'AL', name: 'Alabama' },
  'alaska': { abbr: 'AK', name: 'Alaska' },
  'arizona': { abbr: 'AZ', name: 'Arizona' },
  'arkansas': { abbr: 'AR', name: 'Arkansas' },
  'california': { abbr: 'CA', name: 'California' },
  'colorado': { abbr: 'CO', name: 'Colorado' },
  'connecticut': { abbr: 'CT', name: 'Connecticut' },
  'delaware': { abbr: 'DE', name: 'Delaware' },
  'florida': { abbr: 'FL', name: 'Florida' },
  'georgia': { abbr: 'GA', name: 'Georgia' },
  'hawaii': { abbr: 'HI', name: 'Hawaii' },
  'idaho': { abbr: 'ID', name: 'Idaho' },
  'illinois': { abbr: 'IL', name: 'Illinois' },
  'indiana': { abbr: 'IN', name: 'Indiana' },
  'iowa': { abbr: 'IA', name: 'Iowa' },
  'kansas': { abbr: 'KS', name: 'Kansas' },
  'kentucky': { abbr: 'KY', name: 'Kentucky' },
  'louisiana': { abbr: 'LA', name: 'Louisiana' },
  'maine': { abbr: 'ME', name: 'Maine' },
  'maryland': { abbr: 'MD', name: 'Maryland' },
  'massachusetts': { abbr: 'MA', name: 'Massachusetts' },
  'michigan': { abbr: 'MI', name: 'Michigan' },
  'minnesota': { abbr: 'MN', name: 'Minnesota' },
  'mississippi': { abbr: 'MS', name: 'Mississippi' },
  'missouri': { abbr: 'MO', name: 'Missouri' },
  'montana': { abbr: 'MT', name: 'Montana' },
  'nebraska': { abbr: 'NE', name: 'Nebraska' },
  'nevada': { abbr: 'NV', name: 'Nevada' },
  'new-hampshire': { abbr: 'NH', name: 'New Hampshire' },
  'new-jersey': { abbr: 'NJ', name: 'New Jersey' },
  'new-mexico': { abbr: 'NM', name: 'New Mexico' },
  'new-york': { abbr: 'NY', name: 'New York' },
  'north-carolina': { abbr: 'NC', name: 'North Carolina' },
  'north-dakota': { abbr: 'ND', name: 'North Dakota' },
  'ohio': { abbr: 'OH', name: 'Ohio' },
  'oklahoma': { abbr: 'OK', name: 'Oklahoma' },
  'oregon': { abbr: 'OR', name: 'Oregon' },
  'pennsylvania': { abbr: 'PA', name: 'Pennsylvania' },
  'rhode-island': { abbr: 'RI', name: 'Rhode Island' },
  'south-carolina': { abbr: 'SC', name: 'South Carolina' },
  'south-dakota': { abbr: 'SD', name: 'South Dakota' },
  'tennessee': { abbr: 'TN', name: 'Tennessee' },
  'texas': { abbr: 'TX', name: 'Texas' },
  'utah': { abbr: 'UT', name: 'Utah' },
  'vermont': { abbr: 'VT', name: 'Vermont' },
  'virginia': { abbr: 'VA', name: 'Virginia' },
  'washington': { abbr: 'WA', name: 'Washington' },
  'west-virginia': { abbr: 'WV', name: 'West Virginia' },
  'wisconsin': { abbr: 'WI', name: 'Wisconsin' },
  'wyoming': { abbr: 'WY', name: 'Wyoming' },
  'district-of-columbia': { abbr: 'DC', name: 'District of Columbia' },
}

interface PageProps {
  params: { state: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const state = stateData[params.state]
  if (!state) {
    return { title: 'State Not Found | RateMyAdjusters' }
  }

  return {
    title: `${state.name} Insurance Agents | Find & Review Agents in ${state.abbr}`,
    description: `Browse insurance agents in ${state.name}. Read reviews from policyholders, see ratings, and find trusted insurance agents in ${state.name}.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/insurance-agents/${params.state}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(stateData).map((state) => ({ state }))
}

async function getAgents(stateAbbr: string) {
  const { data } = await supabase
    .from('insurance_agents')
    .select('*')
    .eq('state', stateAbbr)
    .order('total_reviews', { ascending: false })
    .limit(100)

  return data || []
}

async function getCities(stateAbbr: string) {
  const { data } = await supabase
    .from('insurance_agents')
    .select('city')
    .eq('state', stateAbbr)
    .not('city', 'is', null)

  const cities = new Set<string>()
  data?.forEach((row) => {
    if (row.city) cities.add(row.city)
  })
  return Array.from(cities).sort()
}

export default async function InsuranceAgentsStatePage({ params }: PageProps) {
  const state = stateData[params.state]
  if (!state) notFound()

  const [agents, cities] = await Promise.all([
    getAgents(state.abbr),
    getCities(state.abbr),
  ])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Insurance Agents', item: 'https://ratemyadjusters.com/insurance-agents' },
      { '@type': 'ListItem', position: 3, name: state.name, item: `https://ratemyadjusters.com/insurance-agents/${params.state}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/insurance-agents" className="text-gray-500 hover:text-gray-700">Insurance Agents</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{state.name}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Insurance Agents in {state.name}
            </h1>
            <p className="text-indigo-100 text-lg mb-6">
              {agents.length} insurance agent{agents.length !== 1 ? 's' : ''} found in {state.name}
            </p>
            <Link
              href="/add-insurance-agent"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add an Agent
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Cities Filter */}
              {cities.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Cities
                  </h3>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {cities.map((city) => (
                      <div key={city} className="text-sm text-gray-600 py-1">
                        {city}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/insurance-agents" className="block text-sm text-gray-600 hover:text-indigo-600 py-1">
                    → All States
                  </Link>
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-indigo-600 py-1">
                    → Insurance Adjusters
                  </Link>
                  <Link href="/public-adjusters" className="block text-sm text-gray-600 hover:text-indigo-600 py-1">
                    → Public Adjusters
                  </Link>
                </div>
              </div>
            </div>

            {/* Agents List */}
            <div className="lg:col-span-3">
              {agents.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">No agents found in {state.name}</h2>
                  <p className="text-gray-500 mb-6">Be the first to add an insurance agent in this state.</p>
                  <Link
                    href="/add-insurance-agent"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add an Agent
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <Link
                      key={agent.id}
                      href={`/insurance-agent/${agent.slug}`}
                      className="block bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">{agent.first_name?.[0]}{agent.last_name?.[0]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-lg font-semibold text-gray-900">
                                {agent.first_name} {agent.last_name}
                              </h2>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                                {agent.company_name && (
                                  <span className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    {agent.company_name}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {agent.city ? `${agent.city}, ` : ''}{agent.state}
                                </span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              {agent.total_reviews > 0 ? (
                                <>
                                  <div className="flex items-center gap-1 justify-end">
                                    <StarRating rating={agent.avg_rating || 0} size="sm" />
                                    <span className="font-semibold text-gray-900">{agent.avg_rating?.toFixed(1)}</span>
                                  </div>
                                  <div className="text-xs text-gray-500">{agent.total_reviews} review{agent.total_reviews !== 1 ? 's' : ''}</div>
                                </>
                              ) : (
                                <span className="text-xs text-gray-400">No reviews yet</span>
                              )}
                            </div>
                          </div>
                          {agent.years_experience && (
                            <div className="mt-2 text-sm text-gray-600">
                              {agent.years_experience} years experience
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
