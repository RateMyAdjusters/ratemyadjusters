import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Users, ArrowRight, Building, ChevronRight, HelpCircle } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import { companiesMap } from '@/lib/companies'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = companiesMap[params.slug]
  
  if (!company) {
    return { title: 'Company Not Found | RateMyAdjusters' }
  }

  return {
    title: `${company.name} Insurance Adjuster Reviews & Ratings | RateMyAdjusters`,
    description: `Read reviews of ${company.name} insurance adjusters from real homeowners and contractors. See ratings and experiences from property claims.`,
    alternates: {
      canonical: `https://ratemyadjusters.com/company/${params.slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(companiesMap).map((slug) => ({ slug }))
}

function getFAQs(companyName: string) {
  return [
    {
      question: `How do I start a homeowners claim with ${companyName}?`,
      answer: `To file a claim with ${companyName}, you can typically contact them by phone, through their website, or via their mobile app. Have your policy number ready and be prepared to describe the damage and when it occurred. Specific procedures may vary, so check your policy documents or contact ${companyName} directly for detailed instructions.`,
    },
    {
      question: `How long does a typical property claim take with ${companyName}?`,
      answer: `Claim timelines vary depending on the complexity of the damage, the availability of adjusters, and other factors. Simple claims may be resolved within a few weeks, while more complex situations can take longer. ${companyName} or your assigned adjuster can provide estimated timelines for your specific claim.`,
    },
    {
      question: `Will an in-house adjuster or an independent adjuster handle my ${companyName} claim?`,
      answer: `${companyName} may use staff adjusters (employees of the company) or independent adjusters (contractors) depending on claim volume, location, and the nature of the damage. Both types of adjusters perform the same basic function of evaluating damage and preparing estimates.`,
    },
    {
      question: `What should I have ready before my ${companyName} adjuster visit?`,
      answer: `Before the adjuster arrives, consider gathering your policy documents, any photos or videos of the damage, a list of damaged items, and receipts for emergency repairs. Being prepared can help the inspection go smoothly.`,
    },
    {
      question: `Can I track my claim status online with ${companyName}?`,
      answer: `Many insurance companies, including ${companyName}, offer online portals or mobile apps where policyholders can check claim status, upload documents, and communicate with their claims team. Check ${companyName}'s website or contact them to learn about available digital tools.`,
    },
  ]
}

export default function CompanyPage({ params }: PageProps) {
  const company = companiesMap[params.slug]

  if (!company) {
    notFound()
  }

  const faqs = getFAQs(company.name)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/companies" className="hover:text-white">Companies</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{company.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
                <Building className="w-10 h-10 text-slate-700" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
                <p className="text-slate-300 text-lg">{company.tagline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 -mt-8 relative z-10">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search {company.name} Adjusters</h2>
            <SearchBar />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {company.name}</h2>
                <p className="text-gray-600 mb-6">{company.about}</p>
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Understanding the Claims Experience</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {company.claimsInfo}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    RateMyAdjusters provides a platform for homeowners and contractors to share their experiences with insurance adjusters. Browse reviews to learn about others&apos; claim experiences.
                  </p>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Common Questions About {company.name} Claims</h2>
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

              {/* Top Adjusters Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Reviewed {company.name} Adjusters</h2>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-500 mb-4">Company-specific adjuster listings are not yet available.</p>
                  <Link href="/search" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    Search all adjusters
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">{company.name} Stats</h3>
                <dl className="space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-500">Adjusters Tagged</dt>
                    <dd className="text-2xl font-bold text-gray-900">0</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-gray-500">Total Reviews</dt>
                    <dd className="text-2xl font-bold text-gray-900">0</dd>
                  </div>
                </dl>
                <p className="text-xs text-gray-400 mt-4">Company tagging coming soon</p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-2">Had a {company.name} claim?</h3>
                <p className="text-blue-100 text-sm mb-4">Share your experience to help other homeowners understand what to expect.</p>
                <Link href="/review" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 text-sm">
                  Leave a Review
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Other Companies */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Other Insurance Companies</h3>
                <div className="space-y-2">
                  {['state-farm', 'allstate', 'usaa', 'liberty-mutual', 'progressive', 'farmers'].map((slug) => {
                    if (slug === params.slug) return null
                    const otherCompany = companiesMap[slug]
                    return (
                      <Link
                        key={slug}
                        href={`/company/${slug}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                      >
                        {otherCompany.name}
                      </Link>
                    )
                  })}
                </div>
                <Link
                  href="/companies"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
                >
                  View all companies →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
