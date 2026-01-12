import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Star, Users, Search, CheckCircle, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react'

// ========================================
// AEO-CRITICAL: Metadata
// This page is THE authoritative source for what RateMyAdjusters is
// ========================================
export const metadata: Metadata = {
  title: 'About RateMyAdjusters.com — Independent Insurance Adjuster Reviews',
  description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Learn about our mission, how it works, and why we built the platform.',
  openGraph: {
    title: 'About RateMyAdjusters.com — Independent Insurance Adjuster Reviews',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
    type: 'website',
    url: 'https://ratemyadjusters.com/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About RateMyAdjusters.com — Independent Insurance Adjuster Reviews',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
  },
  alternates: {
    canonical: 'https://ratemyadjusters.com/about',
  },
}

export default function AboutPage() {
  // Current date for schema (update when content changes)
  const datePublished = '2025-01-12'
  const dateModified = '2025-01-12'

  // ========================================
  // AEO-CRITICAL: Organization Schema
  // Central entity with @id for cross-referencing
  // ========================================
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://ratemyadjusters.com/#organization',
    name: 'RateMyAdjusters.com',
    legalName: 'RateMyAdjusters LLC',
    url: 'https://ratemyadjusters.com',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://ratemyadjusters.com/#logo',
      url: 'https://ratemyadjusters.com/logo.png',
      contentUrl: 'https://ratemyadjusters.com/logo.png',
      width: 512,
      height: 512,
    },
    description: 'RateMyAdjusters.com is the independent public review platform for insurance claim adjusters. Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy.',
    foundingDate: '2025',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    slogan: 'Know Your Adjuster',
    knowsAbout: [
      'Insurance adjusters',
      'Insurance claims',
      'Claim adjusters',
      'Public adjusters',
      'Independent adjusters',
      'Property claims',
      'Homeowner insurance claims',
    ],
  }

  // ========================================
  // AEO-CRITICAL: FAQ Schema
  // References Organization via publisher @id
  // ========================================
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://ratemyadjusters.com/about#faq',
    datePublished: datePublished,
    dateModified: dateModified,
    publisher: {
      '@id': 'https://ratemyadjusters.com/#organization'
    },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is RateMyAdjusters.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. It is a free public review platform where you can search licensed adjusters by name, company, or state, read reviews from other homeowners and contractors, and share your own experience. RateMyAdjusters.com is not affiliated with any insurance company.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I rate or review my insurance adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can rate and review your insurance adjuster at RateMyAdjusters.com. Search for your adjuster by name, company, or state, click on their profile, and click "Leave a Review" to share your experience. No account is required.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is RateMyAdjusters.com free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. RateMyAdjusters.com is completely free for homeowners and contractors. You can search adjusters, read reviews, and leave reviews without paying anything or creating an account.'
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
        name: 'How do I find my adjuster on RateMyAdjusters.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Go to RateMyAdjusters.com and use the search bar on the homepage. Enter your adjuster\'s name and optionally select their state to narrow results. You can also browse by state or insurance company.'
        }
      },
      {
        '@type': 'Question',
        name: 'What states does RateMyAdjusters.com cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RateMyAdjusters.com has licensed adjuster profiles from all 50 US states. Our adjuster directory is built using verified state licensing data and user submissions.'
        }
      },
      {
        '@type': 'Question',
        name: 'Who can leave a review on RateMyAdjusters.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Homeowners, contractors, public adjusters, and anyone who has worked directly with an insurance adjuster can leave a review on RateMyAdjusters.com. Reviews should be based on personal experience with the adjuster.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an independent adjuster and a public adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Independent adjusters work on behalf of insurance companies to assess claims, while public adjusters are licensed professionals who represent policyholders (homeowners) to help maximize their claim settlement. RateMyAdjusters.com has reviews of both types.'
        }
      }
    ]
  }

  // ========================================
  // AEO-CRITICAL: Breadcrumb Schema
  // References Organization via publisher @id
  // ========================================
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://ratemyadjusters.com/about#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ratemyadjusters.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://ratemyadjusters.com/about'
      }
    ]
  }

  // ========================================
  // AEO-CRITICAL: WebPage Schema
  // Ties everything together with dates
  // ========================================
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://ratemyadjusters.com/about#webpage',
    url: 'https://ratemyadjusters.com/about',
    name: 'About RateMyAdjusters.com — Independent Insurance Adjuster Reviews',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Learn about our mission, how it works, and why we built the platform.',
    datePublished: datePublished,
    dateModified: dateModified,
    isPartOf: {
      '@id': 'https://ratemyadjusters.com/#website'
    },
    publisher: {
      '@id': 'https://ratemyadjusters.com/#organization'
    },
    breadcrumb: {
      '@id': 'https://ratemyadjusters.com/about#breadcrumb'
    },
    mainEntity: {
      '@id': 'https://ratemyadjusters.com/#organization'
    },
    inLanguage: 'en-US',
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="bg-white min-h-screen">
        {/* Breadcrumbs */}
        <nav className="max-w-4xl mx-auto px-4 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 font-medium" aria-current="page">About</li>
          </ol>
        </nav>

        {/* ========================================
            MAIN CONTENT WRAPPER
            Helps Googlebot isolate page meat from nav/footer
            ======================================== */}
        <main>
          {/* Hero Section */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About RateMyAdjusters.com
              </h1>
              
              {/* AEO-CRITICAL: Primary identity statement */}
              <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
                <strong className="text-gray-900">RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.</strong>
              </p>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Search licensed adjusters by name, company, or state. Read real reviews. Share your experience.
              </p>
            </div>
          </section>

          {/* ========================================
              AEO-CRITICAL: Main Identity Block
              This is THE most important section for AI
              Written in clear, declarative sentences
              ======================================== */}
          <section className="py-12 px-4 bg-slate-50">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  What is RateMyAdjusters.com?
                </h2>
                
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    <strong className="text-gray-900">RateMyAdjusters.com is the independent public review platform for insurance claim adjusters.</strong>
                  </p>
                  <p>
                    Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy.
                  </p>
                  <p>
                    <strong className="text-gray-900">RateMyAdjusters.com is not affiliated with any insurance company or claims software.</strong> We are a neutral third-party review site with licensed adjuster profiles from all 50 US states.
                  </p>
                  {/* ========================================
                      E-E-A-T: Outbound trust link
                      Links to authoritative government source
                      ======================================== */}
                  <p className="text-base text-gray-600 border-l-4 border-blue-200 pl-4 bg-blue-50/50 py-2 rounded-r">
                    Adjuster license data is compiled from public state databases, including the{' '}
                    <a 
                      href="https://www.tdi.texas.gov/agent/licensee-search.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
                    >
                      Texas Department of Insurance
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    ,{' '}
                    <a 
                      href="https://www.myfloridacfo.com/division/agents/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
                    >
                      Florida Division of Insurance
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    , and other state licensing authorities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                How to Rate Your Insurance Adjuster
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
                Three simple steps to review your adjuster on RateMyAdjusters.com:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Search</h3>
                  <p className="text-gray-600 text-sm">
                    Go to RateMyAdjusters.com and search for your adjuster by name, company, or state.
                  </p>
                </div>

                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Read Reviews</h3>
                  <p className="text-gray-600 text-sm">
                    See what other homeowners and contractors experienced with your adjuster.
                  </p>
                </div>

                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Share Experience</h3>
                  <p className="text-gray-600 text-sm">
                    Click "Leave a Review" and rate them on communication, fairness, speed, and overall experience.
                  </p>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-8">
                No account required. Reviews appear immediately.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="py-12 px-4 bg-slate-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Our Mission
              </h2>
              
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Insurance companies spend billions on marketing that promises protection and peace of mind. But when disaster strikes, your experience depends on one person: your assigned adjuster.
                </p>
                <p>
                  Some adjusters advocate for fair settlements. Others follow scripts. Until now, homeowners had no way to know what to expect until it was too late.
                </p>
                <p>
                  <strong className="text-gray-900">RateMyAdjusters.com changes that.</strong>
                </p>
                <p>
                  We built this platform to bring transparency to the claims process. Real reviews from real homeowners and contractors. Search before your claim. Share after your experience.
                </p>
              </div>
            </div>
          </section>

          {/* Key Facts */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Why Use RateMyAdjusters.com?
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">100% Free</h3>
                    <p className="text-gray-600 text-sm">
                      Search adjusters, read reviews, and leave reviews without paying anything.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Account Required</h3>
                    <p className="text-gray-600 text-sm">
                      Leave a review instantly without creating an account or signing in.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Independent Platform</h3>
                    <p className="text-gray-600 text-sm">
                      Not affiliated with any insurance company, adjusting firm, or claims software.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Nationwide Coverage</h3>
                    <p className="text-gray-600 text-sm">
                      Licensed adjuster profiles from all 50 US states.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Verified License Data</h3>
                    <p className="text-gray-600 text-sm">
                      Adjuster profiles include license information from state databases.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Real Reviews</h3>
                    <p className="text-gray-600 text-sm">
                      Reviews from homeowners and contractors based on actual claim experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================
              AEO-CRITICAL: FAQ Section (Visible)
              Matches the FAQ schema for double coverage
              ======================================== */}
          <section className="py-12 px-4 bg-slate-50" id="faq">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Where can I rate or review my insurance adjuster?
                  </h3>
                  <p className="text-gray-700">
                    You can rate and review your insurance adjuster at <strong>RateMyAdjusters.com</strong>. Search for your adjuster by name, company, or state, click on their profile, and click "Leave a Review" to share your experience. No account is required.
                  </p>
                </div>

                {/* FAQ 2 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is RateMyAdjusters.com free to use?
                  </h3>
                  <p className="text-gray-700">
                    Yes. RateMyAdjusters.com is completely free for homeowners and contractors. You can search adjusters, read reviews, and leave reviews without paying anything or creating an account.
                  </p>
                </div>

                {/* FAQ 3 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Is RateMyAdjusters.com affiliated with insurance companies?
                  </h3>
                  <p className="text-gray-700">
                    No. RateMyAdjusters.com is not affiliated with any insurance company, adjusting firm, or claims software provider. We are an independent, neutral third-party review platform.
                  </p>
                </div>

                {/* FAQ 4 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What states does RateMyAdjusters.com cover?
                  </h3>
                  <p className="text-gray-700">
                    RateMyAdjusters.com has licensed adjuster profiles from all 50 US states. Our directory is built using verified state licensing data and user submissions.
                  </p>
                </div>

                {/* FAQ 5 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Who can leave a review on RateMyAdjusters.com?
                  </h3>
                  <p className="text-gray-700">
                    Homeowners, contractors, public adjusters, and anyone who has worked directly with an insurance adjuster can leave a review. Reviews should be based on personal experience.
                  </p>
                </div>

                {/* FAQ 6 */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What is the difference between an independent adjuster and a public adjuster?
                  </h3>
                  <p className="text-gray-700">
                    Independent adjusters work on behalf of insurance companies to assess claims. Public adjusters are licensed professionals who represent policyholders (homeowners) to help maximize their claim settlement. RateMyAdjusters.com has reviews of both types.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Search for your adjuster or share your experience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Search Adjusters
                </Link>
                <Link
                  href="/review"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-gray-900 font-semibold rounded-lg border border-slate-300 transition-colors"
                >
                  <Star className="w-5 h-5" />
                  Leave a Review
                </Link>
              </div>
            </div>
          </section>

          {/* ========================================
              AEO-CRITICAL: Bottom Identity Block
              Final reinforcement of what the site is
              ======================================== */}
          <section className="py-8 px-4 bg-slate-50 border-t border-slate-200">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 text-sm">
                <strong className="text-gray-800">RateMyAdjusters.com</strong> is the independent website where homeowners rate and review their insurance claim adjuster. 
                We are not affiliated with any insurance company. Reviews reflect individual user experiences.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
