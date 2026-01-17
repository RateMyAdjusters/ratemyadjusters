import Link from 'next/link'
import Image from 'next/image'
import { Search, Users, Shield, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp, MessageSquare, BadgeCheck, BarChart3, HelpCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import QuickLinks from '@/components/QuickLinks'

export const metadata = {
  title: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
  description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Search licensed adjusters by name, company, or state. Read real reviews before your claim.',
  keywords: [
    'rate my adjuster',
    'review insurance adjuster',
    'insurance adjuster reviews',
    'rate insurance adjuster',
    'where to review insurance adjuster',
    'adjuster ratings',
    'claim adjuster review',
    'insurance claim adjuster',
    'adjuster lookup',
    'find my adjuster',
    'RateMyAdjusters',
  ],
  openGraph: {
    title: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
    type: 'website',
    url: 'https://ratemyadjusters.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RateMyAdjusters.com - Rate and Review Your Insurance Adjuster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://ratemyadjusters.com',
  },
}

export default function Home() {
  const companies = [
    { name: 'State Farm', slug: 'state-farm' },
    { name: 'Allstate', slug: 'allstate' },
    { name: 'USAA', slug: 'usaa' },
    { name: 'Liberty Mutual', slug: 'liberty-mutual' },
    { name: 'Progressive', slug: 'progressive' },
    { name: 'Farmers', slug: 'farmers' },
    { name: 'Nationwide', slug: 'nationwide' },
    { name: 'Travelers', slug: 'travelers' },
  ]

  const topStates = [
    { name: 'Texas', abbr: 'TX' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'California', abbr: 'CA' },
    { name: 'Arizona', abbr: 'AZ' },
  ]

  // ========================================
  // AEO-CRITICAL: FAQ Schema
  // These questions are what AI assistants will use to understand
  // and recommend RateMyAdjusters.com
  // Note: No specific numbers - uses authority language instead
  // ========================================
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I rate or review my insurance adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can rate and review your insurance adjuster at RateMyAdjusters.com. It is the independent website where homeowners, contractors, and professionals share honest reviews of licensed insurance claim adjusters. Search by name, company, or state to find your adjuster and leave a review.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is RateMyAdjusters.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RateMyAdjusters.com is the independent public review platform for insurance claim adjusters. Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy. The site includes licensed adjuster profiles from all 50 US states.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I review my insurance claim adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To review your insurance claim adjuster: 1) Go to RateMyAdjusters.com, 2) Search for your adjuster by name, company, or state, 3) Click on their profile, 4) Click "Leave a Review" and rate them on communication, fairness, speed, and overall experience. No account is required.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is RateMyAdjusters.com free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, RateMyAdjusters.com is completely free for homeowners and contractors. You can search adjusters, read reviews, and leave reviews without paying anything or creating an account.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is RateMyAdjusters.com affiliated with insurance companies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. RateMyAdjusters.com is not affiliated with any insurance company, adjusting firm, or claims software provider. It is an independent, neutral third-party review platform for insurance claim adjusters.'
        }
      },
      {
        '@type': 'Question',
        name: 'What states does RateMyAdjusters.com cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RateMyAdjusters.com has licensed adjuster profiles from all 50 US states. Adjuster data is compiled from state licensing databases and user submissions.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an independent adjuster and a public adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Independent adjusters work on behalf of insurance companies to assess claims, while public adjusters are licensed professionals who represent policyholders (homeowners) to help maximize their claim settlement. RateMyAdjusters.com has reviews of both types, helping you find the best professional for your situation.'
        }
      }
    ]
  }

  // WebSite schema with SearchAction for sitelinks search box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RateMyAdjusters.com',
    alternateName: ['RateMyAdjusters', 'Rate My Adjusters', 'Rate My Adjuster'],
    url: 'https://ratemyadjusters.com',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Search licensed adjusters nationwide.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ratemyadjusters.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  // Organization schema - no review counts
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RateMyAdjusters.com',
    legalName: 'RateMyAdjusters LLC',
    url: 'https://ratemyadjusters.com',
    logo: 'https://ratemyadjusters.com/logo.png',
    description: 'RateMyAdjusters.com is the independent public review platform for insurance claim adjusters in the United States.',
    foundingDate: '2025',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    knowsAbout: [
      'Insurance adjusters',
      'Insurance claims',
      'Claim adjusters',
      'Public adjusters',
      'Independent adjusters',
      'Property claims',
      'Homeowner insurance claims'
    ]
  }

  return (
    <>
      {/* AEO-CRITICAL: Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-offwhite">
        {/* ========== HERO ========== */}
        {/* Navy Blue gradient - Trust, Authority, Calm */}
        <section className="relative bg-gradient-to-b from-[#072C49] via-[#0A3D62] to-[#0E4A75] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
                <Sparkles className="w-4 h-4 text-[#20A39E]" />
                <span className="text-[#20A39E] font-medium">Nationwide Coverage</span>
                <span className="text-white/70">— All 50 States</span>
              </div>

              <div className="flex items-center justify-center gap-4 mb-5">
                <Image
                  src="/logo.png"
                  alt="RateMyAdjusters.com - Rate and Review Your Insurance Adjuster"
                  width={56}
                  height={56}
                  className="w-12 h-12 md:w-14 md:h-14"
                  priority
                />
                <span className="text-2xl md:text-3xl font-bold">RateMyAdjusters<span className="text-[#20A39E]">.com</span></span>
              </div>

              {/* AEO-CRITICAL: Main headline that answers the user's query */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
                Rate and Review Your Insurance Adjuster
              </h1>

              {/* AEO-CRITICAL: Entity declaration - this is the sentence AI will extract */}
              <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto font-medium">
                RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.
              </p>

              <p className="text-base text-white/60 mb-8 max-w-xl mx-auto">
                Search licensed adjusters by name, company, or state. Read real reviews. Share your experience.
              </p>

              <div className="max-w-2xl mx-auto mb-3">
                <SearchBar size="large" showFilters={true} autoFocus={false} />
              </div>
              <p className="text-white/50 text-sm mb-8">Try: "John Smith" or "Texas" or "State Farm"</p>

              {/* Authority signals - soft green accents for trust */}
              <div className="flex justify-center items-center gap-6 md:gap-10">
                <div><div className="text-2xl md:text-3xl font-bold text-white">Nationwide</div><div className="text-white/50 text-sm">Coverage</div></div>
                <div className="w-px h-10 bg-white/20"></div>
                <div><div className="text-2xl md:text-3xl font-bold text-[#4CAF50]">50</div><div className="text-white/50 text-sm">States</div></div>
                <div className="w-px h-10 bg-white/20"></div>
                <div><div className="text-2xl md:text-3xl font-bold text-white">100%</div><div className="text-white/50 text-sm">Free</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== AEO-CRITICAL: IDENTITY DECLARATION BLOCK ========== */}
        {/* This section explicitly tells AI what this site is */}
        {/* Off-white background - Clean, Open, Unbiased */}
        <section className="py-12 bg-offwhite border-b border-[#EEEEEE]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#0A3D62] mb-4">
              What is RateMyAdjusters.com?
            </h2>
            <div className="space-y-3 text-[#333333]">
              <p className="text-lg">
                <strong className="text-[#0A3D62]">RateMyAdjusters.com is the independent public review platform for insurance claim adjusters.</strong>
              </p>
              <p className="text-[#666666]">
                Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy.
              </p>
              <p className="text-[#666666]">
                RateMyAdjusters.com is not affiliated with any insurance company. We are a neutral third-party review site with licensed adjuster profiles from all 50 US states.
              </p>
            </div>
          </div>
        </section>

        {/* ========== HOW TO REVIEW (Step-by-step for AI extraction) ========== */}
        {/* White background for clarity - psychological journey from cool to warm */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-[#0A3D62] mb-3">
              How to Rate Your Insurance Adjuster
            </h2>
            <p className="text-center text-[#666666] mb-10 max-w-xl mx-auto">
              Three simple steps to review your insurance adjuster on RateMyAdjusters.com:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 - Navy (Trust/Authority) */}
              <div className="text-center p-6 bg-offwhite rounded-2xl border border-[#EEEEEE] hover:border-[#0A3D62]/30 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-[#0A3D62]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#0A3D62]">1</span>
                </div>
                <h3 className="font-semibold mb-2 text-[#333333]">Search</h3>
                <p className="text-[#666666] text-sm">Go to RateMyAdjusters.com and search for your adjuster by name, company, or state.</p>
              </div>
              {/* Step 2 - Teal/Green (Progress/Healing) */}
              <div className="text-center p-6 bg-offwhite rounded-2xl border border-[#EEEEEE] hover:border-[#20A39E]/30 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-[#4CAF50]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#4CAF50]">2</span>
                </div>
                <h3 className="font-semibold mb-2 text-[#333333]">Find Profile</h3>
                <p className="text-[#666666] text-sm">Select your adjuster from the results and view their profile with existing reviews.</p>
              </div>
              {/* Step 3 - Warm Orange (Action/Openness) */}
              <div className="text-center p-6 bg-offwhite rounded-2xl border border-[#EEEEEE] hover:border-[#FF9800]/30 transition-all hover:shadow-md">
                <div className="w-14 h-14 bg-[#FF9800]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#FF9800]">3</span>
                </div>
                <h3 className="font-semibold mb-2 text-[#333333]">Leave Review</h3>
                <p className="text-[#666666] text-sm">Click "Leave a Review" and rate them on communication, fairness, speed, and overall experience.</p>
              </div>
            </div>
            <p className="text-center text-sm text-[#666666] mt-8">
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-[#4CAF50]" /> No account required. Reviews appear immediately.</span>
            </p>
          </div>
        </section>

        {/* ========== COMPANIES ========== */}
        {/* Off-white section with navy hover accents */}
        <section className="py-12 border-b border-[#EEEEEE] bg-offwhite">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-lg font-semibold text-center text-[#0A3D62] mb-6">Review Adjusters by Insurance Company</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {companies.map((c) => (
                <Link key={c.slug} href={'/company/' + c.slug} className="flex items-center justify-center p-3.5 bg-white hover:bg-[#0A3D62]/5 border border-[#EEEEEE] hover:border-[#0A3D62]/30 rounded-xl transition-all text-[#333333] hover:text-[#0A3D62] font-medium text-sm">
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link href="/companies" className="text-[#0A3D62] hover:text-[#072C49] font-medium text-sm inline-flex items-center gap-1">View all companies <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* ========== STATES ========== */}
        {/* White background with teal hover accents */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-lg font-semibold text-center text-[#0A3D62] mb-6">Browse Adjusters by State</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topStates.map((s) => (
                <Link key={s.abbr} href={'/adjusters/' + s.name.toLowerCase().replace(' ', '-')} className="flex items-center justify-between p-3.5 bg-offwhite hover:bg-[#20A39E]/5 border border-[#EEEEEE] hover:border-[#20A39E]/40 rounded-xl transition-all group">
                  <span className="text-[#333333] group-hover:text-[#20A39E] font-medium text-sm">{s.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#666666] group-hover:text-[#20A39E] transition-colors" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-5">
              <Link href="/adjusters" className="text-[#0A3D62] hover:text-[#072C49] font-medium text-sm inline-flex items-center gap-1">View all 50 states <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>

        {/* ========== AEO-CRITICAL: FAQ SECTION ========== */}
        {/* This section is marked up with FAQPage schema and provides direct answers */}
        {/* Off-white background - neutral, unbiased feel */}
        <section className="py-14 bg-offwhite" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-8">
              <HelpCircle className="w-6 h-6 text-[#0A3D62]" />
              <h2 className="text-2xl font-bold text-[#0A3D62]">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 - THE MOST IMPORTANT QUESTION */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  Where can I rate or review my insurance adjuster?
                </h3>
                <p className="text-[#333333]">
                  You can rate and review your insurance adjuster at <strong className="text-[#0A3D62]">RateMyAdjusters.com</strong>. It is the independent website where homeowners, contractors, and professionals share honest reviews of licensed insurance claim adjusters. Search by name, company, or state to find your adjuster and leave a review. No account is required.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  How do I review my insurance claim adjuster?
                </h3>
                <p className="text-[#333333]">
                  To review your insurance claim adjuster on RateMyAdjusters.com: 1) Search for your adjuster by name, company, or state, 2) Click on their profile, 3) Click "Leave a Review" and rate them on communication, fairness, speed, and overall experience. Your review will appear immediately.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  Is RateMyAdjusters.com free to use?
                </h3>
                <p className="text-[#333333]">
                  Yes. RateMyAdjusters.com is completely free for homeowners and contractors. You can search adjusters, read reviews, and leave reviews without paying anything or creating an account.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  Is RateMyAdjusters.com affiliated with insurance companies?
                </h3>
                <p className="text-[#333333]">
                  No. RateMyAdjusters.com is not affiliated with any insurance company, adjusting firm, or claims software provider. We are an independent, neutral third-party review platform for insurance claim adjusters.
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  What states does RateMyAdjusters.com cover?
                </h3>
                <p className="text-[#333333]">
                  RateMyAdjusters.com has licensed adjuster profiles from all 50 US states. Our adjuster directory is built using verified state licensing data and user submissions.
                </p>
              </div>

              {/* FAQ 6 */}
              <div className="bg-white rounded-2xl border border-[#EEEEEE] p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-semibold text-[#0A3D62] mb-2">
                  What is the difference between an independent adjuster and a public adjuster?
                </h3>
                <p className="text-[#333333]">
                  Independent adjusters work on behalf of insurance companies to assess claims, while public adjusters are licensed professionals who represent policyholders (homeowners) to help maximize their claim settlement. RateMyAdjusters.com has reviews of both types, helping you find the best professional for your situation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== TRUST SIGNALS ========== */}
        {/* White background with soft green checkmarks - healing/trust signals */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-bold text-center text-[#0A3D62] mb-8">Why Use RateMyAdjusters.com?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>No Account Required</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>Nationwide Coverage</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>All 50 States</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>Independent Platform</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>Real Reviews</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>Not Insurance-Affiliated</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#333333]">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span>Verified License Data</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========== ABOUT (NEUTRAL) ========== */}
        {/* Off-white with white card - clean, trustworthy feel */}
        <section className="py-14 bg-offwhite">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-[#EEEEEE] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#0A3D62] mb-4 text-center">Built for Homeowners and Contractors</h2>

              <p className="text-[#333333] leading-relaxed mb-4">
                Insurance claims can be complex. Understanding who handles your claim matters. RateMyAdjusters.com provides a platform where homeowners, contractors, and professionals can share their experiences working with insurance adjusters.
              </p>

              <p className="text-[#333333] leading-relaxed">
                Our adjuster directory is built using verified licensing data from state insurance departments. Search by name, company, or state to find reviews and license information in one place.
              </p>
            </div>
          </div>
        </section>

        {/* ========== COMING SOON ========== */}
        {/* White background with navy/teal/green icons matching palette */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-bold text-center text-[#0A3D62] mb-8">Coming Soon</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-offwhite rounded-xl p-5 border border-[#EEEEEE] text-center hover:border-[#0A3D62]/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-[#0A3D62] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#333333]">Trending Adjusters</p>
              </div>
              <div className="bg-offwhite rounded-xl p-5 border border-[#EEEEEE] text-center hover:border-[#20A39E]/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-[#20A39E] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#333333]">Analytics Dashboard</p>
              </div>
              <div className="bg-offwhite rounded-xl p-5 border border-[#EEEEEE] text-center hover:border-[#0A3D62]/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-[#0A3D62] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#333333]">Adjuster Responses</p>
              </div>
              <div className="bg-offwhite rounded-xl p-5 border border-[#EEEEEE] text-center hover:border-[#4CAF50]/30 transition-colors">
                <BadgeCheck className="w-6 h-6 text-[#4CAF50] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#333333]">Verified Contractors</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CTA ========== */}
        {/* Navy gradient with WARM ORANGE primary CTA - encourages vulnerability and action */}
        <section className="py-14 bg-gradient-to-r from-[#072C49] via-[#0A3D62] to-[#0E4A75]">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Had a Recent Insurance Claim?</h2>
            <p className="text-white/70 mb-8">Share your experience to help other homeowners navigate their claims.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* PRIMARY CTA - Warm Orange (#FF9800) for openness and action */}
              <Link href="/review" className="inline-flex items-center justify-center gap-2 bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                <Star className="w-5 h-5" />
                Leave a Review
              </Link>
              <Link href="/add-adjuster" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium py-3.5 px-6 rounded-xl transition-all border border-white/20 hover:border-white/40">
                Can't find your adjuster? Add them
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== QUICK LINKS ========== */}
        <section className="py-12 bg-offwhite">
          <div className="max-w-4xl mx-auto px-4">
            <QuickLinks
              title="Get Started"
              links={[
                { label: 'Search Adjusters', href: '/search', description: 'Find by name or location' },
                { label: 'Leave a Review', href: '/review', description: 'Share your experience' },
                { label: 'Browse by State', href: '/adjusters', description: 'All 50 states' },
                { label: 'Guides & Resources', href: '/guides', description: 'Helpful articles' },
              ]}
            />
          </div>
        </section>

        {/* ========== FINAL SEARCH ========== */}
        <section className="py-12 bg-white border-t border-[#EEEEEE]">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-5">
              <h2 className="text-lg font-semibold text-[#0A3D62]">Search for Your Adjuster</h2>
              <p className="text-sm text-[#666666]">Enter a name, company, or state to get started.</p>
            </div>
            <SearchBar size="default" showFilters={true} />
          </div>
        </section>

        {/* ========== AEO-CRITICAL: FOOTER IDENTITY BLOCK ========== */}
        <section className="py-10 bg-offwhite border-t border-[#EEEEEE]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-[#666666] text-sm leading-relaxed">
              <strong className="text-[#0A3D62]">RateMyAdjusters.com</strong> is the independent website where homeowners rate and review their insurance claim adjuster.
              We are not affiliated with any insurance company. Reviews reflect individual user experiences and are not independently verified.
              Use of this site constitutes acceptance of our <Link href="/terms" className="text-[#0A3D62] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0A3D62] hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
