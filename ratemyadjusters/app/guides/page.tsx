import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen, Clock, ArrowRight, MapPin, Building2, FileWarning, Sparkles, TrendingUp } from 'lucide-react'
import { statesData } from '@/lib/states-data'
import { companiesData } from '@/lib/companies-data'
import { guidesData } from '@/lib/guides-data'

export const metadata: Metadata = {
  title: 'Homeowner Guides & Resources | RateMyAdjusters',
  description: 'Free guides to help homeowners understand the insurance claims process. Learn about adjusters, how to file claims, what to do if denied, and more.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides',
  },
}

export default function GuidesPage() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    ],
  }

  const totalGuides = guidesData.length + (statesData.length * 2) + companiesData.length

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Homeowner Guides & Resources',
    description: 'Educational guides about insurance adjusters and the claims process',
    url: 'https://ratemyadjusters.com/guides',
    numberOfItems: totalGuides,
  }

  // Auto-separate guides by category
  const coreGuides = guidesData.filter(g => 
    ['Claims Process', 'Basics', 'Adjuster Types'].includes(g.category)
  )
  const industryGuides = guidesData.filter(g => 
    ['Industry Analysis', 'Industry History', 'Technology'].includes(g.category)
  )
  const newGuides = guidesData.filter(g => g.new)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <main className="min-h-screen bg-offwhite">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Guides</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-b from-navy-500 to-navy-600 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl md:text-4xl font-bold">Homeowner Guides & Resources</h1>
            </div>
            <p className="text-white/80 text-lg max-w-2xl">
              {totalGuides}+ guides to help you understand and navigate the insurance claims process with confidence.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">

          {/* Recently Added - only shows if there are new guides */}
          {newGuides.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-teal-500" />
                <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {newGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block bg-gradient-to-br from-teal-50 to-offwhite rounded-xl border border-teal-200 p-5 hover:border-teal-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">NEW</span>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{guide.category}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {guide.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
          
          {/* Core Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
            <div className="space-y-4">
              {coreGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-teal-600 uppercase tracking-wide">{guide.category}</span>
                        {guide.featured && (
                          <span className="text-xs font-medium text-warm-600 bg-warm-50 px-2 py-0.5 rounded-full">Popular</span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                      <p className="text-gray-600 mb-3">{guide.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {guide.readTime}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Industry Deep Dives - only shows if there are industry guides */}
          {industryGuides.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-navy-500" />
                <h2 className="text-2xl font-bold text-gray-900">Industry Deep Dives</h2>
              </div>
              <p className="text-gray-600 mb-6">
                In-depth analysis of how the insurance industry works behind the scenes — from Wall Street to vendor networks.
              </p>
              <div className="space-y-4">
                {industryGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-teal-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium text-navy-500 uppercase tracking-wide">{guide.category}</span>
                          {guide.new && (
                            <span className="text-xs font-bold text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">NEW</span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h3>
                        <p className="text-gray-600 mb-3">{guide.description}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {guide.readTime}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* File a Complaint by State */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileWarning className="w-6 h-6 text-warm-500" />
              <h2 className="text-2xl font-bold text-gray-900">How to File a Complaint by State</h2>
            </div>
            <p className="text-gray-600 mb-6">
              State-specific guides for filing complaints against insurance adjusters, including regulator contact information and step-by-step instructions.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {statesData.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/guides/file-complaint-against-insurance-adjuster-${state.slug}`}
                    className="px-3 py-2 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Best Public Adjusters by State */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-success-500" />
              <h2 className="text-2xl font-bold text-gray-900">Find Public Adjusters by State</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Learn how to evaluate and find qualified public adjusters in your state, including licensing verification and questions to ask before hiring.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {statesData.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/guides/best-public-adjusters-in-${state.slug}`}
                    className="px-3 py-2 text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Claim Denied by Company */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Claim Denied? Guides by Insurance Company</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Step-by-step guides for what to do if your claim was denied by a specific insurance company, including appeal processes and escalation options.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {companiesData.map((company) => (
                  <Link
                    key={company.slug}
                    href={`/guides/${company.slug}-claim-denied-what-to-do`}
                    className="flex items-center justify-between p-4 bg-offwhite rounded-lg hover:bg-red-50 hover:border-red-200 border border-transparent transition-all group"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-red-700">{company.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="p-6 bg-offwhite rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">About These Guides</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              These educational resources are provided for general informational purposes only. They do not constitute legal, 
              financial, or professional advice. Insurance policies, regulations, and claims processes vary by state and 
              insurer. For specific questions about your policy or claim, please consult your insurance company or a 
              licensed professional in your area.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/adjusters" className="flex items-center justify-between p-4 bg-offwhite rounded-lg hover:bg-teal-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Browse Adjusters</div>
                  <div className="text-sm text-gray-500">Search by state</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
              <Link href="/review" className="flex items-center justify-between p-4 bg-offwhite rounded-lg hover:bg-teal-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Leave a Review</div>
                  <div className="text-sm text-gray-500">Share your experience</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
              <Link href="/companies" className="flex items-center justify-between p-4 bg-offwhite rounded-lg hover:bg-teal-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Insurance Companies</div>
                  <div className="text-sm text-gray-500">Browse by carrier</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-200 bg-offwhite">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
