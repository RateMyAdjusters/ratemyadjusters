import { Metadata } from 'next'
import Link from 'next/link'
import { Building, ChevronRight, ArrowRight } from 'lucide-react'
import { companiesList } from '@/lib/companies'

export const metadata: Metadata = {
  title: 'Insurance Companies | RateMyAdjusters',
  description: 'Browse adjuster reviews by insurance company. See ratings for State Farm, Allstate, USAA, Liberty Mutual, and 20+ carriers.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/companies',
  },
}

export default function CompaniesPage() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Companies', item: 'https://ratemyadjusters.com/companies' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      <main className="min-h-screen bg-offwhite">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Insurance Companies</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-b from-navy-500 to-navy-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl md:text-4xl font-bold">Insurance Companies</h1>
            </div>
            <p className="text-white/80 text-lg max-w-2xl">
              Browse insurance adjuster reviews by company. Select a company to see adjuster ratings and homeowner experiences.
            </p>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {companiesList.map((company) => (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-teal-300 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 group-hover:bg-teal-100 rounded-full flex items-center justify-center transition-colors">
                    <Building className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                  </div>
                  <div className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {company.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-offwhite rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/adjusters" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Browse Adjusters</div>
                  <div className="text-sm text-gray-500">Search by state</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
              <Link href="/review" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Leave a Review</div>
                  <div className="text-sm text-gray-500">Share your experience</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
              <Link href="/guides" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-teal-600">Guides & Resources</div>
                  <div className="text-sm text-gray-500">Helpful articles</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
