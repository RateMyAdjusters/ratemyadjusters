import Link from 'next/link'
import { Search, Shield, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  const companies = [
    { name: 'State Farm', slug: 'state-farm' },
    { name: 'Allstate', slug: 'allstate' },
    { name: 'USAA', slug: 'usaa' },
    { name: 'Liberty Mutual', slug: 'liberty-mutual' },
    { name: 'Farmers', slug: 'farmers' },
    { name: 'Nationwide', slug: 'nationwide' },
    { name: 'Progressive', slug: 'progressive' },
    { name: 'Travelers', slug: 'travelers' },
    { name: 'Auto-Owners', slug: 'auto-owners' },
    { name: 'AAA', slug: 'aaa' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Know Your Insurance Adjuster
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Read reviews from homeowners and contractors. 
              See ratings before your claim.
            </p>
            
            {/* Search Box */}
            <form action="/search" method="GET" className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="q"
                    placeholder="Search by adjuster name or company..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-4 focus:ring-primary-300 outline-none"
                  />
                </div>
                <button type="submit" className="bg-primary-900 hover:bg-primary-950 text-white font-semibold py-4 px-8 rounded-xl transition-colors">
                  Search
                </button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-12 text-primary-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm">Adjusters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">20</div>
                <div className="text-sm">Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">
                Find the adjuster assigned to your claim by name or insurance company.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Read Reviews</h3>
              <p className="text-gray-600">
                See what other homeowners and contractors say about their experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Be Prepared</h3>
              <p className="text-gray-600">
                Know what to expect and how to best work with your adjuster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Company */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Browse by Insurance Company
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Find adjusters from major insurance carriers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-center"
              >
                <span className="font-medium text-gray-900">{company.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Had a Recent Claim?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Help other homeowners by sharing your experience with your insurance adjuster.
            Your review helps build transparency in the claims process.
          </p>
          <Link href="/review" className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Write a Review
          </Link>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why RateMyAdjusters?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Real Experiences</h3>
                <p className="text-gray-600">
                  Every review comes from someone who actually worked with the adjuster on a real claim.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Unbiased Platform</h3>
                <p className="text-gray-600">
                  We don't work for insurance companies. We work for homeowners and contractors.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                <p className="text-gray-600">
                  Built by contractors and homeowners who've been through the claims process.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Free to Use</h3>
                <p className="text-gray-600">
                  Search adjusters, read reviews, and write your own—completely free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
