import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { 
  Star, MapPin, Building, Shield, ChevronRight, Clock, Users, HelpCircle, 
  ArrowRight, MessageSquare, Phone, Briefcase, Globe, Lock, Mail, TrendingUp,
  Zap, Target, BarChart3, AlertTriangle, FileText, Activity, Award
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import StarRating from '@/components/StarRating'
import ShareButtons from '@/components/ShareButtons'
import ConfirmAdjusterButton from '@/components/ConfirmAdjusterButton'
import ReportReviewButton from '@/components/ReportReviewButton'
import ClaimProfileForm from '@/components/ClaimProfileForm'
import FastReviewWidget from '@/components/FastReviewWidget'
import FairnessPoll from '@/components/FairnessPoll'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

async function getAdjuster(slug: string) {
  const { data, error } = await supabase
    .from('adjusters')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

async function getReviews(adjusterId: string) {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('adjuster_id', adjusterId)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

async function getSimilarAdjusters(state: string, city: string | null, companyName: string | null, currentId: string) {
  if (companyName) {
    const { data: sameCompany } = await supabase
      .from('adjusters')
      .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews')
      .eq('state', state)
      .eq('company_name', companyName)
      .neq('id', currentId)
      .order('total_reviews', { ascending: false })
      .limit(3)

    if (sameCompany && sameCompany.length >= 3) {
      return sameCompany
    }
  }

  let query = supabase
    .from('adjusters')
    .select('id, first_name, last_name, slug, state, city, company_name, avg_rating, total_reviews')
    .eq('state', state)
    .neq('id', currentId)
    .order('total_reviews', { ascending: false })
    .limit(5)

  if (city) {
    query = query.eq('city', city)
  }

  const { data } = await query
  return data || []
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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Not Available'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return 'Not Available'
  }
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

function formatLicenseType(qualification: string | null): string {
  if (!qualification) return 'Insurance Adjuster'
  const typeMap: Record<string, string> = {
    '6-20': 'All-Lines Adjuster',
    '620': 'All-Lines Adjuster',
    'PA': 'Public Adjuster',
    'IA': 'Independent Adjuster',
    'SA': 'Staff Adjuster',
    'CAT': 'Catastrophe Adjuster',
  }
  return typeMap[qualification.toUpperCase()] || qualification
}

function calculateTenureYears(issuedOn: string | null, createdAt: string | null): number | null {
  const startDate = issuedOn || createdAt
  if (!startDate) return null
  const start = new Date(startDate)
  const now = new Date()
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  return Math.round(years * 10) / 10
}

function getStateRiskContext(state: string): string {
  const contexts: Record<string, string> = {
    FL: 'hurricanes, tropical storms, and water damage',
    TX: 'hailstorms, tornadoes, and wind damage',
    CA: 'wildfires, earthquakes, and mudslides',
    LA: 'hurricanes, flooding, and storm surge',
    OK: 'tornadoes, hail, and severe thunderstorms',
    KS: 'tornadoes, hail, and prairie fires',
    CO: 'hailstorms, wildfires, and winter storms',
    NC: 'hurricanes, flooding, and wind damage',
    SC: 'hurricanes, coastal flooding, and wind damage',
    GA: 'severe storms, tornadoes, and hail',
    AL: 'tornadoes, hurricanes, and severe thunderstorms',
    MS: 'hurricanes, tornadoes, and flooding',
  }
  return contexts[state] || 'property damage from weather events and accidents'
}

function getVerificationLink(state: string): { name: string; url: string } {
  const links: Record<string, { name: string; url: string }> = {
    FL: { name: 'Florida DFS', url: 'https://www.myfloridacfo.com/division/agents/' },
    TX: { name: 'Texas DOI', url: 'https://www.tdi.texas.gov/agent/licensee-search.html' },
    CA: { name: 'California DOI', url: 'https://interactive.web.insurance.ca.gov/webuser/licw_name_search$.startup' },
    NY: { name: 'NY DFS', url: 'https://myportal.dfs.ny.gov/web/guest/individual-lookup' },
  }
  return links[state] || { name: 'NIPR', url: 'https://nipr.com/help/look-up-a-license' }
}

function getFAQs(fullName: string, state: string, companyName: string | null, city: string | null, licenseType: string) {
  const stateName = getStateName(state)
  const companyText = companyName ? ` at ${companyName}` : ''
  const locationText = city ? `${city}, ${stateName}` : stateName
  const riskContext = getStateRiskContext(state)
  const verifyLink = getVerificationLink(state)

  return [
    {
      question: `What does ${fullName} do as an insurance adjuster?`,
      answer: `${fullName} is a licensed ${licenseType.toLowerCase()} in ${stateName} who evaluates property damage claims for insurance companies and policyholders. This includes inspecting damaged property, reviewing documentation, preparing repair estimates, and determining coverage amounts under the insurance policy.`,
    },
    {
      question: `What types of claims do insurance adjusters in ${stateName} typically handle?`,
      answer: `Insurance adjusters in ${stateName} commonly handle property claims related to ${riskContext}. They also process claims for roof damage, water intrusion, fire loss, theft, vandalism, and liability incidents covered under homeowners insurance policies.`,
    },
    {
      question: `How can I verify ${fullName}'s license?`,
      answer: `You can verify ${fullName}'s insurance adjuster license through the ${verifyLink.name} website. Look up the license number shown on this profile to confirm active status, license type, and any disciplinary history.`,
    },
    {
      question: `Why should I read reviews before filing a claim?`,
      answer: `Reading reviews helps you understand what to expect from your insurance adjuster. Past experiences from other homeowners and contractors can reveal communication styles, fairness in claim assessments, response times, and overall professionalism. This information helps you prepare for the claims process.`,
    },
    {
      question: `How can I leave a review for ${fullName}?`,
      answer: `Click the "Leave a Review" button on this page to share your experience. Reviews from homeowners, contractors, and public adjusters help others in ${locationText} make informed decisions about their insurance claims.`,
    },
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const adjuster = await getAdjuster(params.slug)
  
  if (!adjuster) {
    return { title: 'Adjuster Not Found | RateMyAdjusters' }
  }

  const fullName = [adjuster.first_name, adjuster.middle_name, adjuster.last_name].filter(Boolean).join(' ')
  const stateName = getStateName(adjuster.state)
  const licenseType = formatLicenseType(adjuster.qualification)
  const companyText = adjuster.company_name ? ` at ${adjuster.company_name}` : ''
  const profileUrl = `https://ratemyadjusters.com/adjuster/${adjuster.slug}`
  
  const locationText = adjuster.city ? `${adjuster.city}, ${adjuster.state}` : stateName
  
  const reviewCount = adjuster.total_reviews || 0
  const ratingText = adjuster.avg_rating ? `${adjuster.avg_rating.toFixed(1)}★` : ''
  
  // Include metrics in meta description for SEO
  const cityUpper = adjuster.city ? adjuster.city.toUpperCase() : ''
  const locationUpper = adjuster.city ? `${cityUpper}, ${adjuster.state}` : stateName.toUpperCase()
  const locationNormal = adjuster.city ? `${adjuster.city}, ${stateName}` : stateName

  return {
    title: `${fullName} – ${locationUpper} Insurance Adjuster Reviews | RateMyAdjusters`,
    description: `Read reviews and claim estimates for ${fullName}, a licensed ${stateName} insurance adjuster${adjuster.city ? ` based in ${adjuster.city}` : ''}. ${ratingText ? `${ratingText} rating. ` : ''}See licensing info, experience metrics, and what homeowners say.`.slice(0, 160),
    alternates: {
      canonical: profileUrl,
    },
    openGraph: {
      title: `${fullName} – ${locationUpper} Insurance Adjuster Reviews`,
      description: `See what homeowners and contractors say about ${fullName} in ${locationNormal}. Read real reviews about claim handling, communication, and fairness.`,
      type: 'profile',
      url: profileUrl,
      siteName: 'RateMyAdjusters',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fullName} – ${adjuster.state} Insurance Adjuster`,
      description: `${reviewCount > 0 ? `${reviewCount} reviews` : 'No reviews yet'} for ${fullName} in ${locationNormal}. See ratings and claim experiences.`,
    },
  }
}

export default async function AdjusterProfile({ params }: PageProps) {
  const adjuster = await getAdjuster(params.slug)
  if (!adjuster) notFound()

  const reviews = await getReviews(adjuster.id)
  const similarAdjusters = await getSimilarAdjusters(adjuster.state, adjuster.city, adjuster.company_name, adjuster.id)
  
  const fullName = [adjuster.first_name, adjuster.middle_name, adjuster.last_name].filter(Boolean).join(' ')
  const displayName = adjuster.first_name + ' ' + adjuster.last_name
  const profileUrl = `https://ratemyadjusters.com/adjuster/${adjuster.slug}`
  const isPendingVerification = adjuster.license_status === 'pending_verification'
  const stateName = getStateName(adjuster.state)
  const stateSlug = getStateSlug(adjuster.state)
  const location = adjuster.city ? `${adjuster.city}, ${stateName}` : stateName
  const licenseType = formatLicenseType(adjuster.qualification)
  const tenureYears = calculateTenureYears(adjuster.issued_on, adjuster.created_at)
  const riskContext = getStateRiskContext(adjuster.state)
  const verifyLink = getVerificationLink(adjuster.state)
  const faqs = getFAQs(fullName, adjuster.state, adjuster.company_name, adjuster.city, licenseType)

  // Privacy display helpers
  const hasPhone = !!adjuster.phone_raw
  const hasEmail = !!adjuster.email
  
  // Rating helpers
  const avgRating = adjuster.avg_rating || 0
  const totalReviews = adjuster.total_reviews || 0
  const hasValidRating = totalReviews > 0 && avgRating > 0

  // Metrics from database
  const hasMetrics = !!adjuster.experience_index
  const metrics = {
    annualLow: adjuster.est_annual_low,
    annualHigh: adjuster.est_annual_high,
    monthlyLow: adjuster.est_monthly_low,
    monthlyHigh: adjuster.est_monthly_high,
    experienceIndex: adjuster.experience_index,
    experienceLabel: adjuster.experience_label,
    careerStage: adjuster.career_stage,
    careerDescription: adjuster.career_description,
    claimDistribution: adjuster.claim_distribution as Record<string, number> | null,
    primaryClaimType: adjuster.primary_claim_type,
    catExposureScore: adjuster.cat_exposure_score,
    catExposureLabel: adjuster.cat_exposure_label,
    catDescription: adjuster.cat_description,
    complexityTier: adjuster.complexity_tier,
    complexityDescription: adjuster.complexity_description,
    serviceRange: adjuster.service_range,
    serviceDescription: adjuster.service_description,
    marketImpactScore: adjuster.market_impact_score,
    marketImpactLabel: adjuster.market_impact_label,
    riskEnvironmentIndex: adjuster.risk_environment_index,
    riskLabel: adjuster.risk_label,
    interactionLow: adjuster.interaction_low,
    interactionHigh: adjuster.interaction_high,
    confidenceLevel: adjuster.confidence_level,
    confidencePercentage: adjuster.confidence_percentage,
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    url: profileUrl,
    mainEntityOfPage: profileUrl,
    jobTitle: licenseType,
    ...(adjuster.company_name && {
      worksFor: {
        '@type': 'Organization',
        name: adjuster.company_name,
      },
    }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: adjuster.city || undefined,
      addressRegion: adjuster.state,
      addressCountry: 'US',
    },
    ...(hasValidRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: totalReviews,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  }

  // LocalBusiness schema for local SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${fullName} - Insurance Adjuster`,
    description: `Licensed ${licenseType.toLowerCase()} handling property insurance claims in ${location}`,
    url: profileUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: adjuster.city || undefined,
      addressRegion: adjuster.state,
      addressCountry: 'US',
    },
    geo: adjuster.city ? {
      '@type': 'GeoCoordinates',
      addressRegion: adjuster.state,
    } : undefined,
    areaServed: {
      '@type': 'State',
      name: stateName,
    },
    priceRange: '$$',
    ...(hasValidRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: totalReviews,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Adjusters', item: 'https://ratemyadjusters.com/adjusters' },
      { '@type': 'ListItem', position: 3, name: stateName, item: `https://ratemyadjusters.com/adjusters/${stateSlug}` },
      { '@type': 'ListItem', position: 4, name: fullName, item: profileUrl },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
            <nav className="flex items-center gap-2 text-sm flex-wrap">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/adjusters" className="text-gray-500 hover:text-gray-700">Adjusters</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href={`/adjusters/${stateSlug}`} className="text-gray-500 hover:text-gray-700">{stateName}</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{displayName}</span>
            </nav>
          </div>
        </div>

        {/* Hero Rating Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${star <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-blue-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">{avgRating.toFixed(1)}</span>
                </div>
                <div className="h-8 w-px bg-blue-400" />
                <div>
                  <span className="text-xl font-semibold">{totalReviews}</span>
                  <span className="text-blue-200 ml-1">Reviews</span>
                </div>
                {hasMetrics && metrics.experienceIndex && (
                  <>
                    <div className="h-8 w-px bg-blue-400 hidden sm:block" />
                    <div className="hidden sm:block">
                      <span className="text-xl font-semibold">{metrics.experienceIndex}/10</span>
                      <span className="text-blue-200 ml-1">Experience</span>
                    </div>
                  </>
                )}
              </div>
              <Link 
                href={'/review?adjuster=' + adjuster.id} 
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <Star className="w-4 h-4" />
                Write a Review
              </Link>
            </div>
          </div>
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-3xl">{adjuster.first_name?.[0]}{adjuster.last_name?.[0]}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                  {!adjuster.profile_claimed && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-gray-300 text-gray-600 bg-gray-50">
                      <Shield className="w-3 h-3" />
                      Profile Unclaimed
                    </span>
                  )}
                </div>
                
                <p className="text-lg text-gray-700 mb-2">
                  {licenseType} in <strong>{location}</strong>
                  {tenureYears !== null && tenureYears > 0 ? (
                    <span className="text-gray-500"> • {tenureYears}+ years experience</span>
                  ) : null}
                </p>
                
                {/* Company & Role */}
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                  {adjuster.company_name && (
                    <span className="flex items-center gap-1.5 font-medium text-gray-900">
                      <Building className="w-4 h-4 text-blue-600" />
                      {adjuster.company_name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </span>
                  {adjuster.residency_type && (
                    <span className="text-sm text-gray-500">
                      ({adjuster.residency_type === 'Resident' ? 'Resident' : 'Non-Resident'} License)
                    </span>
                  )}
                </div>

                {/* Quick Stats Row */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-800 rounded-full border border-yellow-200">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{avgRating > 0 ? `${avgRating.toFixed(1)} Rating` : 'Not Rated'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 rounded-full border border-blue-200">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-semibold">{totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}</span>
                  </div>
                  {hasMetrics && metrics.careerStage && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
                      <Award className="w-4 h-4" />
                      <span className="font-semibold">{metrics.careerStage}</span>
                    </div>
                  )}
                  {adjuster.license_status === 'active' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-800 rounded-full border border-green-200">
                      <Shield className="w-4 h-4" />
                      <span className="font-semibold">Active License</span>
                    </div>
                  )}
                  {adjuster.residency_type === 'Resident' && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
                      <MapPin className="w-4 h-4" />
                      <span className="font-semibold">Resident</span>
                    </div>
                  )}
                </div>

                {/* Fast Review Widget */}
                <div className="mt-4">
                  <FastReviewWidget adjusterId={adjuster.id} adjusterName={fullName} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link href={'/review?adjuster=' + adjuster.id} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  <Star className="w-5 h-5" />
                  Leave a Review
                </Link>
                <ShareButtons url={profileUrl} title={fullName + ' - Insurance Adjuster Reviews'} />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <ConfirmAdjusterButton adjusterId={adjuster.id} adjusterName={fullName} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Fairness Poll */}
              <FairnessPoll adjusterId={adjuster.id} />

              {/* About Section - SEO Rich */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {fullName}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {fullName} is a licensed <strong>{licenseType.toLowerCase()}</strong> (License #{adjuster.license_number || 'on file'}) handling property insurance claims in <strong>{location}</strong>.
                  {tenureYears !== null && tenureYears > 0 ? (
                    <> With approximately <strong>{tenureYears} years</strong> of experience in the insurance industry, {adjuster.first_name} evaluates property damage, prepares estimates, and processes claims for policyholders.</>
                  ) : (
                    <> {adjuster.first_name} evaluates property damage, prepares estimates, and processes claims for policyholders in {stateName}.</>
                  )}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {adjuster.company_name ? (
                    <>Working with <strong>{adjuster.company_name}</strong>, {adjuster.first_name} handles homeowners insurance claims related to {riskContext}.</>
                  ) : (
                    <>As an insurance adjuster in {stateName}, {adjuster.first_name} handles homeowners insurance claims related to {riskContext}.</>
                  )}
                  {' '}Common claim types include roof damage, water damage, fire loss, wind and hail damage, theft, and liability claims.
                </p>
                {hasMetrics && metrics.annualLow && metrics.annualHigh && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Based on licensing data and {stateName} claim patterns, {adjuster.first_name} is estimated to handle approximately <strong>{metrics.annualLow}–{metrics.annualHigh} claims per year</strong>, or about {metrics.monthlyLow}–{metrics.monthlyHigh} files per month.
                  </p>
                )}
                <p className="text-gray-600 text-sm">
                  <Link href={`/adjusters/${stateSlug}`} className="text-blue-600 hover:text-blue-700 underline">
                    View all {stateName} insurance adjusters
                  </Link>
                  {adjuster.company_name && (
                    <>
                      {' '} • {' '}
                      <Link href={`/search?q=${encodeURIComponent(adjuster.company_name)}`} className="text-blue-600 hover:text-blue-700 underline">
                        More {adjuster.company_name} adjusters
                      </Link>
                    </>
                  )}
                  {' '} • {' '}
                  <Link href="/guides" className="text-blue-600 hover:text-blue-700 underline">
                    Insurance claim guides
                  </Link>
                </p>
              </div>

              {/* ADJUSTER INTELLIGENCE METRICS SECTION */}
              {hasMetrics && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                      <h2 className="text-xl font-bold text-gray-900">Adjuster Intelligence Profile</h2>
                    </div>
                    {metrics.confidenceLevel && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {metrics.confidenceLevel} Confidence ({metrics.confidencePercentage}%)
                      </span>
                    )}
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {/* Experience Index */}
                    {metrics.experienceIndex && (
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-blue-700">{metrics.experienceIndex}</div>
                        <div className="text-xs text-blue-600 font-medium">/ 10</div>
                        <div className="text-sm text-gray-700 mt-1">{metrics.experienceLabel}</div>
                        <div className="text-xs text-gray-500">Experience Index</div>
                      </div>
                    )}

                    {/* Annual Claims */}
                    {metrics.annualLow && metrics.annualHigh && (
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-700">{metrics.annualLow}–{metrics.annualHigh}</div>
                        <div className="text-sm text-green-600">claims/year</div>
                        <div className="text-xs text-gray-500 mt-1">Estimated Volume</div>
                      </div>
                    )}

                    {/* CAT Exposure */}
                    {metrics.catExposureScore && (
                      <div className="bg-orange-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-orange-700">{metrics.catExposureScore}</div>
                        <div className="text-xs text-orange-600 font-medium">/ 100</div>
                        <div className="text-sm text-gray-700 mt-1">{metrics.catExposureLabel}</div>
                        <div className="text-xs text-gray-500">Storm Exposure</div>
                      </div>
                    )}

                    {/* Market Impact */}
                    {metrics.marketImpactScore && (
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-purple-700">{metrics.marketImpactScore}</div>
                        <div className="text-xs text-purple-600 font-medium">/ 100</div>
                        <div className="text-sm text-gray-700 mt-1">{metrics.marketImpactLabel}</div>
                        <div className="text-xs text-gray-500">Market Impact</div>
                      </div>
                    )}
                  </div>

                  {/* Detailed Metrics */}
                  <div className="space-y-4">
                    
                    {/* Career Stage */}
                    {metrics.careerStage && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-gray-500" />
                          Career Stage: {metrics.careerStage}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {metrics.careerDescription || `${adjuster.first_name} is classified as ${metrics.careerStage?.toLowerCase()} based on tenure and licensing history.`}
                          {tenureYears !== null && tenureYears > 0 ? ` With ${tenureYears} years in the industry, this adjuster has developed expertise in handling ${stateName} property claims.` : ''}
                        </p>
                      </div>
                    )}

                    {/* Estimated Workload */}
                    {metrics.annualLow && metrics.annualHigh && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-gray-500" />
                          Estimated Claims Handled: {metrics.annualLow}–{metrics.annualHigh} per year
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Based on {stateName} claim volumes and license type, {adjuster.first_name} is estimated to process approximately {metrics.monthlyLow}–{metrics.monthlyHigh} claim files per month. This workload estimate reflects typical industry patterns for {licenseType.toLowerCase()}s in this market.
                        </p>
                      </div>
                    )}

                    {/* Claim Type Distribution */}
                    {metrics.claimDistribution && Object.keys(metrics.claimDistribution).length > 0 && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          Typical Claim Types in {stateName}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {Object.entries(metrics.claimDistribution)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 6)
                            .map(([type, pct]) => (
                              <span 
                                key={type}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {type.charAt(0).toUpperCase() + type.slice(1)}: {pct}%
                              </span>
                            ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                          Adjusters in {stateName} commonly handle claims related to {riskContext}. The distribution above reflects typical claim patterns in this market.
                        </p>
                      </div>
                    )}

                    {/* CAT Exposure */}
                    {metrics.catExposureScore && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Zap className="w-4 h-4 text-gray-500" />
                          Catastrophe Exposure Score: {metrics.catExposureScore}/100 ({metrics.catExposureLabel})
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {metrics.catDescription || `This score indicates ${adjuster.first_name}'s likely exposure to catastrophe and storm-related claims.`}
                          {' '}{stateName} experiences {riskContext}, which contributes to this rating.
                        </p>
                      </div>
                    )}

                    {/* Complexity Tier */}
                    {metrics.complexityTier && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-gray-500" />
                          Claim Complexity Tier: {metrics.complexityTier}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {metrics.complexityDescription || `Based on license type, experience, and market, ${adjuster.first_name} typically handles claims in the ${metrics.complexityTier?.toLowerCase()} complexity range.`}
                        </p>
                      </div>
                    )}

                    {/* Policyholder Interactions */}
                    {metrics.interactionLow && metrics.interactionHigh && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          Estimated Policyholder Interactions: {metrics.interactionLow.toLocaleString()}–{metrics.interactionHigh.toLocaleString()} per year
                        </h3>
                        <p className="text-gray-600 text-sm">
                          This includes phone calls, emails, site visits, and follow-ups with homeowners and contractors throughout the claims process. Higher interaction volumes indicate greater communication demands.
                        </p>
                      </div>
                    )}

                    {/* Service Range */}
                    {metrics.serviceRange && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          Geographic Service Range: {metrics.serviceRange}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {metrics.serviceDescription || `${adjuster.first_name} ${metrics.serviceRange === 'Local' ? `primarily operates within ${stateName}` : `is licensed in multiple states and may handle claims across state lines`}.`}
                          {adjuster.residency_type === 'Non-Resident' && ` As a non-resident licensee, this adjuster may be deployed to ${stateName} during high-volume periods or catastrophe events.`}
                        </p>
                      </div>
                    )}

                    {/* Market Impact */}
                    {metrics.marketImpactScore && (
                      <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-gray-500" />
                          Market Impact Score: {metrics.marketImpactScore}/100 ({metrics.marketImpactLabel})
                        </h3>
                        <p className="text-gray-600 text-sm">
                          This score reflects {adjuster.first_name}'s relative impact in the {stateName} insurance market based on experience, estimated volume, and state claim activity. {metrics.marketImpactLabel === 'High Impact' || metrics.marketImpactLabel === 'Exceptional Impact' ? 'This is a high-activity adjuster in a busy market.' : 'This represents typical activity for the market.'}
                        </p>
                      </div>
                    )}

                    {/* Risk Environment */}
                    {metrics.riskEnvironmentIndex && (
                      <div>
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-gray-500" />
                          State Risk Environment: {metrics.riskEnvironmentIndex}/10 ({metrics.riskLabel})
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {stateName} is classified as a <strong>{metrics.riskLabel?.toLowerCase()}</strong> state due to factors including storm frequency, litigation rates, claim complexity, and regulatory environment. Adjusters in high-risk states typically handle more complex and contested claims.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100">
                    <strong>Note:</strong> These estimates are derived from public licensing data, state-level claim patterns, and industry benchmarks. Actual claim volumes and experience may vary. This data is not verified by the adjuster and should be used for general informational purposes only.
                  </p>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Reviews for {fullName}</h2>
                    <p className="text-gray-500 text-sm">{totalReviews} reviews from homeowners and contractors</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-gray-900">{avgRating.toFixed(1)}</span>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className="p-8 text-center bg-gradient-to-b from-blue-50 to-white">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Be the First to Review {fullName}</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      No one has shared their experience yet. Your review helps other {stateName} homeowners know what to expect with this adjuster.
                    </p>
                    <Link 
                      href={'/review?adjuster=' + adjuster.id} 
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      <Star className="w-5 h-5" />
                      Write the First Review
                    </Link>
                    <p className="text-sm text-gray-500 mt-4">It only takes 2 minutes</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-semibold text-sm">{review.reviewer_display_name?.[0] || 'A'}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">{review.reviewer_display_name || 'Anonymous'}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-500">
                                {review.reviewer_type === 'contractor' ? 'Contractor' : review.reviewer_type === 'public_adjuster' ? 'Public Adjuster' : 'Homeowner'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <StarRating rating={review.overall_rating} />
                              <span className="text-sm text-gray-500">{formatReviewDate(review.created_at)}</span>
                            </div>
                            {review.claim_type && (
                              <div className="flex gap-2 mb-3">
                                <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 capitalize">{review.claim_type} Claim</span>
                                {review.claim_outcome && (
                                  <span className={`inline-block px-2 py-1 rounded text-xs ${
                                    review.claim_outcome === 'approved' ? 'bg-green-100 text-green-700' :
                                    review.claim_outcome === 'denied' ? 'bg-red-100 text-red-700' :
                                    review.claim_outcome === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-600'
                                  } capitalize`}>
                                    {review.claim_outcome}
                                  </span>
                                )}
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
                
                {/* CTA after reviews */}
                <div className="p-6 bg-gray-50 border-t text-center">
                  <p className="text-gray-600 mb-3">Worked with {adjuster.first_name}? Share your experience.</p>
                  <Link href={'/review?adjuster=' + adjuster.id} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                    <Star className="w-4 h-4" />
                    Write a Review
                  </Link>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verify License Link */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Verify This License</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      You can independently verify {fullName}'s insurance adjuster license through official state records.
                    </p>
                    <a 
                      href={verifyLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Verify at {verifyLink.name}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Rating Summary Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Rating Summary
                </h3>
                {totalReviews === 0 ? (
                  <div className="text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <p className="text-gray-600 font-medium mb-1">No ratings yet</p>
                    <p className="text-sm text-gray-500 mb-4">Be the first to rate this adjuster</p>
                    <Link 
                      href={'/review?adjuster=' + adjuster.id}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                      Write First Review
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <div className="text-5xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
                      <div className="flex justify-center my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 ${star <= Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-500">{totalReviews} reviews</p>
                    </div>
                    <Link 
                      href={'/review?adjuster=' + adjuster.id}
                      className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Rate This Adjuster
                    </Link>
                  </>
                )}
              </div>

              {/* Quick Metrics Card (Sidebar) */}
              {hasMetrics && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Quick Stats
                  </h3>
                  <dl className="space-y-3 text-sm">
                    {metrics.experienceIndex && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Experience</dt>
                        <dd className="text-gray-900 font-medium">{metrics.experienceIndex}/10 ({metrics.experienceLabel})</dd>
                      </div>
                    )}
                    {metrics.annualLow && metrics.annualHigh && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Est. Claims/Year</dt>
                        <dd className="text-gray-900 font-medium">{metrics.annualLow}–{metrics.annualHigh}</dd>
                      </div>
                    )}
                    {metrics.careerStage && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Career Stage</dt>
                        <dd className="text-gray-900 font-medium">{metrics.careerStage}</dd>
                      </div>
                    )}
                    {metrics.catExposureScore && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Storm Exposure</dt>
                        <dd className="text-gray-900 font-medium">{metrics.catExposureScore}/100</dd>
                      </div>
                    )}
                    {metrics.complexityTier && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Complexity</dt>
                        <dd className="text-gray-900 font-medium">{metrics.complexityTier}</dd>
                      </div>
                    )}
                    {metrics.serviceRange && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Service Range</dt>
                        <dd className="text-gray-900 font-medium">{metrics.serviceRange}</dd>
                      </div>
                    )}
                    {metrics.riskLabel && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">State Risk</dt>
                        <dd className={`font-medium ${
                          metrics.riskLabel.includes('Very High') || metrics.riskLabel.includes('Extreme') ? 'text-red-600' :
                          metrics.riskLabel.includes('High') ? 'text-orange-600' :
                          'text-gray-900'
                        }`}>{metrics.riskLabel}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* License Info */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  License Information
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                    <Shield className="w-3 h-3" />
                    Verified Public Record
                  </span>
                  {adjuster.updated_at && (
                    <span className="text-xs text-gray-400">
                      Updated {new Date(adjuster.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  )}
                </div>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Name</dt>
                    <dd className="text-gray-900 font-medium text-right">{fullName}</dd>
                  </div>
                  
                  {adjuster.company_name && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Company</dt>
                      <dd className="text-gray-900 font-medium text-right">{adjuster.company_name}</dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">State</dt>
                    <dd className="text-gray-900 font-medium">{stateName}</dd>
                  </div>
                  
                  {adjuster.city && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">City</dt>
                      <dd className="text-gray-900 font-medium">{adjuster.city}</dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">License #</dt>
                    <dd className="text-gray-900 font-medium font-mono text-xs">
                      {adjuster.license_number || 'Not Available'}
                    </dd>
                  </div>
                  
                  {adjuster.npn && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">NPN</dt>
                      <dd className="text-gray-900 font-medium font-mono text-xs">{adjuster.npn}</dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Type</dt>
                    <dd className="text-gray-900 font-medium">{licenseType}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Status</dt>
                    <dd className={`font-medium ${
                      adjuster.license_status === 'active' ? 'text-green-600' : 
                      adjuster.license_status === 'expired' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {adjuster.license_status === 'active' ? '● Active' : 
                       adjuster.license_status === 'expired' ? '● Expired' : 
                       adjuster.license_status === 'pending_verification' ? '● Pending' :
                       '● Unknown'}
                    </dd>
                  </div>
                  
                  {adjuster.residency_type && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Residency</dt>
                      <dd className="text-gray-900 font-medium">{adjuster.residency_type}</dd>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Issued</dt>
                    <dd className="text-gray-900 font-medium">{formatDate(adjuster.issued_on)}</dd>
                  </div>
                  
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Expires</dt>
                    <dd className="text-gray-900 font-medium">{formatDate(adjuster.expires_on)}</dd>
                  </div>
                </dl>
              </div>

              {/* Contact Information - Privacy Protected */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-600" />
                  Contact Information
                </h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between items-start">
                    <dt className="text-gray-500 flex items-center gap-1.5">
                      <Phone className="w-4 h-4" />
                      Phone
                    </dt>
                    <dd className="text-right">
                      {hasPhone ? (
                        <span className="inline-flex items-center gap-1.5 text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded">
                          <Lock className="w-3 h-3" />
                          Not Publicly Displayed
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Not Available</span>
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between items-start">
                    <dt className="text-gray-500 flex items-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      Email
                    </dt>
                    <dd className="text-right">
                      {hasEmail ? (
                        <span className="inline-flex items-center gap-1.5 text-gray-600 text-xs bg-gray-50 px-2 py-1 rounded">
                          <Lock className="w-3 h-3" />
                          Not Publicly Displayed
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">Not Available</span>
                      )}
                    </dd>
                  </div>
                </dl>
                <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-100 leading-relaxed">
                  Contact details are withheld for privacy. Adjusters may update their profile by claiming it.
                </p>
              </div>

              {/* Claim Profile Form */}
              <ClaimProfileForm adjusterId={adjuster.id} adjusterName={fullName} isClaimed={adjuster.profile_claimed || false} />

              {/* Similar Adjusters */}
              {similarAdjusters.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">
                      {adjuster.company_name ? `Other ${adjuster.company_name} Adjusters` : `Other ${stateName} Adjusters`}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {similarAdjusters.map((adj) => (
                      <Link
                        key={adj.id}
                        href={`/adjuster/${adj.slug}`}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{adj.first_name} {adj.last_name}</div>
                          <div className="text-xs text-gray-500">
                            {adj.city ? `${adj.city}, ${adj.state}` : adj.state}
                          </div>
                        </div>
                        {adj.total_reviews > 0 ? (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-medium text-gray-900">{adj.avg_rating?.toFixed(1)}</span>
                            </div>
                            <div className="text-xs text-gray-500">{adj.total_reviews} reviews</div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">No reviews</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link 
                    href={`/adjusters/${stateSlug}`}
                    className="mt-4 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all {stateName} adjusters
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
                <div className="space-y-2">
                  <Link href={`/adjusters/${stateSlug}`} className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → All {stateName} insurance adjusters
                  </Link>
                  {adjuster.city && (
                    <Link href={`/search?q=${encodeURIComponent(adjuster.city)}`} className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                      → Adjusters in {adjuster.city}
                    </Link>
                  )}
                  <Link href="/adjusters" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse adjusters by state
                  </Link>
                  <Link href="/companies" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Browse adjusters by company
                  </Link>
                  <Link href="/guides" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → Insurance claim guides
                  </Link>
                  <Link href="/guides/what-is-an-insurance-adjuster" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                    → What is an insurance adjuster?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50 pb-20 md:pb-0">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> RateMyAdjusters provides information for general educational purposes only. 
              Profile data, metrics, reviews, and estimates may be incomplete, outdated, or inaccurate and are not independently verified. 
              Estimated claims volumes and experience metrics are derived from public licensing data and industry benchmarks, not actual performance records. 
              We do not guarantee the accuracy of any content on this site. Nothing here constitutes legal, financial, or professional advice.
            </p>
          </div>
        </div>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 md:hidden shadow-lg z-50">
          <Link 
            href={'/review?adjuster=' + adjuster.id}
            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            <Star className="w-5 h-5" />
            {totalReviews === 0 ? 'Write First Review' : 'Leave a Review'}
          </Link>
        </div>
      </main>
    </>
  )
}
