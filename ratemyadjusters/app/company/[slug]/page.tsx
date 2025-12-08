import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, Users, ArrowRight, Building } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

interface PageProps {
  params: { slug: string }
}

const companies: Record<string, { name: string; description: string; tagline: string }> = {
  'state-farm': {
    name: 'State Farm',
    description: 'State Farm is the largest property and casualty insurance provider in the United States.',
    tagline: 'Like a good neighbor...',
  },
  'allstate': {
    name: 'Allstate',
    description: 'Allstate is one of the largest insurance companies in the US.',
    tagline: 'You\'re in good hands...',
  },
  'usaa': {
    name: 'USAA',
    description: 'USAA provides insurance and financial services primarily to military members and their families.',
    tagline: 'Serving those who serve...',
  },
  'liberty-mutual': {
    name: 'Liberty Mutual',
    description: 'Liberty Mutual is a global insurance company offering a wide range of insurance products.',
    tagline: 'Only pay for what you need...',
  },
  'progressive': {
    name: 'Progressive',
    description: 'Progressive is known for their innovative approach to insurance.',
    tagline: 'Helping you save...',
  },
  'farmers': {
    name: 'Farmers',
    description: 'Farmers Insurance is known for their experienced approach to claims.',
    tagline: 'We know a thing or two...',
  },
  'nationwide': {
    name: 'Nationwide',
    description: 'Nationwide is one of the largest insurance and financial services companies in the US.',
    tagline: 'Nationwide is on your side...',
  },
  'travelers': {
    name: 'Travelers',
    description: 'Travelers is a leading provider of property and casualty insurance.',
    tagline: 'Protecting what matters...',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const company = companies[params.slug]
  
  if (!company) {
    return { title: 'Company Not Found | RateMyAdjusters' }
  }

  return {
    title: company.name + ' Adjuster Reviews | RateMyAdjusters',
    description: 'Read reviews of ' + company.name + ' insurance adjusters from real homeowners and contractors.',
  }
}

export default function CompanyPage({ params }: PageProps) {
  const company = companies[params.slug]

  if (!company) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">{company.name}</span>
          </div>

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
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 -mt-8 relative z-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search {company.name} Adjusters</h2>
          <SearchBar size="default" showFilters={true} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {company.name}</h2>
              <p className="text-gray-600 mb-6">{company.description}</p>
              
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">The Reality Check</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Insurance companies spend billions making themselves look like superheroes. But the moment your claim hits their system, that promise can feel very different.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  That&apos;s why <span className="font-semibold text-blue-700">RateMyAdjusters</span> exists. No jingles. No mascots. Just real experiences from homeowners and contractors.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top {company.name} Adjusters</h2>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-500 mb-4">Company tagging is not yet available.</p>
                <Link href="/search" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                  Search all adjusters
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
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

            <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Had a {company.name} claim?</h3>
              <p className="text-blue-100 text-sm mb-4">Share your experience and help other homeowners.</p>
              <Link href="/review" className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 text-sm">
                Leave a Review
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
