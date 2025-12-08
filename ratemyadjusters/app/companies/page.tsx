import { Metadata } from 'next'
import Link from 'next/link'
import { Building, ChevronRight } from 'lucide-react'
import { companiesList } from '@/lib/companies'

export const metadata: Metadata = {
  title: 'Insurance Companies | RateMyAdjusters',
  description: 'Browse insurance adjuster reviews by company. Find ratings and experiences for State Farm, Allstate, USAA, Liberty Mutual, and more.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/companies',
  },
}

export default function CompaniesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
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
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl md:text-4xl font-bold">Insurance Companies</h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl">
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
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                  <Building className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
