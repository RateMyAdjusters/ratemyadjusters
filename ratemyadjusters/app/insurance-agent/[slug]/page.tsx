import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, MapPin, Building, Shield, ChevronRight, Clock, Users, Phone, Mail, Globe, Award, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import ShareButtons from '@/components/ShareButtons'
import ReportReviewButton from '@/components/ReportReviewButton'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

async function getAgent(slug: string) {
  const { data, error } = await supabase
    .from('insurance_agents')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getReviews(agentId: string) {
  const { data } = await supabase
    .from('insurance_agent_reviews')
    .select('*')
    .eq('insurance_agent_id', agentId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

async function getSimilarAgents(state: string, currentId: string) {
  const { data } = await supabase
    .from('insurance_agents')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews')
    .eq('state', state)
    .neq('id', currentId)
    .order('total_reviews', { ascending: false })
    .limit(5)

  return data || []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const agent = await getAgent(params.slug)
  
  if (!agent) {
    return { title: 'Insurance Agent Not Found | RateMyAdjusters' }
  }

  const fullName = `${agent.first_name} ${agent.last_name}`
  const stateFullName = getStateName(agent.state)
  const cityText = agent.city ? agent.city + ', ' : ''
  
  return {
    title: `${fullName} – Insurance Agent Reviews (${agent.state}) | RateMyAdjusters`,
    description: `Read reviews of ${fullName}, an insurance agent in ${cityText}${stateFullName}. See ratings from policyholders and claim experiences.`,
    alternates: {
      canonical: 'https://ratemyadjusters.com/insurance-agent/' + agent.slug,
    },
  }
}

function getStateName(abbr: string): string {
  const states: Record<string, string> = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
    CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
    HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
    KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
    MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
    NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
    OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
    SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
    VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
    DC: 'District of Columbia',
  }
  return states[abbr] || abbr
}

function getStateSlug(abbr: string): string {
  const stateName = getStateName(abbr)
  return stateName.toLowerCase().replace(/\s+/g, '-')
}

function formatReviewDate(dateStr: string | null): string {
  if (!dateStr) return 'Historical Review'
  try {
    const date = new Date(dateStr)
    if (date.getFullYear() < 1980) return 'Historical Review'
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Historical Review'
  }
}

export default async function InsuranceAgentProfile({ params }: PageProps) {
  const agent = await getAgent(params.slug)
  if (!agent) notFound()

  const reviews = await getReviews(agent.id)
  const similarAgents = await getSimilarAgents(agent.state, agent.id)
  
  const fullName = `${agent.first_name} ${agent.last_name}`
  const profileUrl = 'https://ratemyadjusters.com/insurance-agent/' + agent.slug
  const isPendingVerification = agent.license_status === 'pending_verification'
  const stateName = getStateName(agent.state)
  const stateSlug = getStateSlug(agent.state)
  const location = agent.city ? `${agent.city}, ${stateName}` : stateName

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {isPendingVerification && (
          <div className="bg-amber-50 border-b border-amber-200">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <p className="text-amber-800 text-sm">
                <strong>Pending Verification:</strong> This profile was recently added and is awaiting verification.
              </p>
            </div>
          </div>
        )}

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/insurance-agents" className="text-gray-500 hover:text-gray-700">Insurance Agents</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/insurance-agents/${stateSlug}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{fullName}</span>
            </nav>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{agent.first_name?.[0]}{agent.last_name?.[0]}</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                  {!agent.profile_claimed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                      <Shield className="w-3 h-3" />
                      Profile Unclaimed
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  {agent.company_name && (
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {agent.company_name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </span>
                  {agent.years_experience && (
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {agent.years_experience} years experience
                    </span>
                  )}
                </div>

                {/* Stats Box */}
                <div className="flex flex-wrap items-center gap-6 p-4 bg-indigo-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={agent.avg_rating || 0} size="lg" />
                      <span className="text-2xl font-bold text-gray-900">{agent.avg_rating?.toFixed(1) || '0.0'}</span>
                    </div>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                  <div className="h-10 w-px bg-indigo-200 hidden sm:block" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{agent.total_reviews || 0}</p>
                    <p className="text-sm text-gray-500">Reviews</p>
                  </div>
                  <div className="h-10 w-px bg-indigo-200 hidden sm:block" />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{location}</p>
                    <p className="text-sm text-gray-500">Service Area</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href={'/review-insurance-agent?agent=' + agent.id} className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  Leave a Review
                </Link>
                <ShareButtons url={profileUrl} title={fullName + ' - Insurance Agent Reviews'} />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {fullName}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {fullName} is an insurance agent serving clients in {stateName}.
                  {agent.company_name && ` Currently working with ${agent.company_name}.`}
                  {' '}Insurance agents help policyholders find the right coverage, understand their policies, and navigate the claims process.
                </p>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Reviews ({reviews.length})</h2>
                </div>

                {reviews.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-4">Be the first to share your experience with {fullName}.</p>
                    <Link href={'/review-insurance-agent?agent=' + agent.id} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg">
                      Leave a Review
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-600 font-semibold text-sm">{review.reviewer_display_name?.[0] || 'A'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{review.reviewer_display_name || 'Anonymous'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">Policyholder</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">{formatReviewDate(review.created_at)}</span>
                            </div>
                            {review.claim_type && (
                              <div className="flex gap-2 mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 capitalize">{review.claim_type} Claim</span>
                              </div>
                            )}
                            <p className="text-gray-700 leading-relaxed mb-3">{review.review_text}</p>
                            <ReportReviewButton reviewId={review.id} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Name</dt>
                    <dd className="text-gray-900 font-medium">{fullName}</dd>
                  </div>
                  {agent.company_name && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Company</dt>
                      <dd className="text-gray-900 font-medium">{agent.company_name}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-500">State</dt>
                    <dd className="text-gray-900 font-medium">{stateName}</dd>
                  </div>
                  {agent.city && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">City</dt>
                      <dd className="text-gray-900 font-medium">{agent.city}</dd>
                    </div>
                  )}
                  {agent.phone && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</dt>
                      <dd><a href={`tel:${agent.phone}`} className="text-indigo-600 hover:text-indigo-700 font-medium">{agent.phone}</a></dd>
                    </div>
                  )}
                  {agent.email && (
                    <div className="flex justify-between items-center">
                      <dt className="text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</dt>
                      <dd><a href={`mailto:${agent.email}`} className="text-indigo-600 hover:text-indigo-700 font-medium">{agent.email}</a></dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* License Info */}
              {agent.license_number && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">License Information</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">License #</dt>
                      <dd className="text-gray-900 font-medium">{agent.license_number}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Status</dt>
                      <dd className={'font-medium ' + (agent.license_status === 'active' ? 'text-green-600' : 'text-amber-600')}>
                        {agent.license_status === 'active' ? 'Active' : 'Pending Verification'}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}

              {/* Similar Agents */}
              {similarAgents.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">Other Agents in {stateName}</h3>
                  </div>
                  <div className="space-y-3">
                    {similarAgents.map((a) => (
                      <Link
                        key={a.id}
                        href={`/insurance-agent/${a.slug}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{a.first_name} {a.last_name}</div>
                          <div className="text-xs text-gray-500">{a.company_name || `${a.city || ''} ${a.state}`}</div>
                        </div>
                        {a.total_reviews > 0 && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-900">{a.avg_rating?.toFixed(1)}</span>
                            </div>
                            <div className="text-xs text-gray-500">{a.total_reviews} reviews</div>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
