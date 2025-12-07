import Link from 'next/link'
import { Search, Users, Shield, Star, ArrowRight, CheckCircle, Sparkles, Clock } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const companies = [
    'State Farm', 'Allstate', 'USAA', 'Liberty Mutual', 
    'Farmers', 'Nationwide', 'Progressive', 'Travelers'
  ]

  const trendingSearches = [
    { label: 'State Farm – Texas', query: 'State Farm', state: 'TX' },
    { label: 'Allstate – Florida', query: 'Allstate', state: 'FL' },
    { label: 'USAA – California', query: 'USAA', state: 'CA' },
    { label: 'Liberty Mutual – Michigan', query: 'Liberty Mutual', state: 'MI' },
  ]

  const trustPoints = [
    'Adjusters can\'t hide bad behavior',
    'Homeowners get transparency',
    'Contractors gain clarity and documentation',
    'Good adjusters get rewarded',
    'Bad adjusters get exposed',
  ]

  const roadmapItems = [
    { title: 'Trending Adjusters', description: 'See who\'s getting reviewed the most' },
    { title: 'AI Fraud Scoring', description: 'Detect suspicious claim patterns' },
    { title: 'Adjuster Response Portal', description: 'Let adjusters tell their side' },
    { title: 'Verified Contractor Program', description: 'Trusted reviews from licensed pros' },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            {/* Beta Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-blue-400/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Beta</span>
              <span className="text-white/70">— Now open to the public</span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Know Your Adjuster
              <span className="block text-blue-400">Before They Touch Your Claim</span>
            </h1>

            {/* Subtext */}
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Real reviews from homeowners, contractors, and public adjusters. 
              Check their reputation instantly.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <SearchBar size="large" showFilters={true} autoFocus={false} />
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <span className="text-slate-400 text-sm">Trending:</span>
              {trendingSearches.map((item) => (
                <Link
                  key={item.label}
                  href={`/search?q=${encodeURIComponent(item.query)}&state=${item.state}`}
                  className="text-sm text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center items-center gap-8 md:gap-12 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">12,847</div>
                <div className="text-slate-400 text-sm">Adjusters</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">4,291</div>
                <div className="text-slate-400 text-sm">Reviews</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">156</div>
                <div className="text-slate-400 text-sm">Companies</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-4">Updated daily from verified submissions</p>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm text-gray-500 mb-6">
            Find adjusters from major insurance carriers
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {companies.map((company) => (
              <Link
                key={company}
                href={`/search?q=${encodeURIComponent(company)}`}
                className="text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors"
              >
                {company}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Three simple steps to know exactly who you're dealing with
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Search className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-5xl font-bold text-gray-200 mb-2">①</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Search</h3>
              <p className="text-gray-600">
                Find any adjuster in seconds by name, company, or location.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-5xl font-bold text-gray-200 mb-2">②</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Read Reviews</h3>
              <p className="text-gray-600">
                See transparent ratings from real claimants and contractors.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <div className="text-5xl font-bold text-gray-200 mb-2">③</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Be Prepared</h3>
              <p className="text-gray-600">
                Know exactly how to deal with that adjuster before they show up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Panel */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why RateMyAdjusters Works
              </h2>
              <p className="text-gray-600 mb-8">
                We're building the first accountability platform for insurance adjusters. 
                No more guessing. No more surprises. Just transparency.
              </p>
              <ul className="space-y-4">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg text-gray-700 mb-6">
                "I looked up my adjuster before our meeting and knew exactly what to expect. 
                The reviews were spot on — he tried to lowball me but I was prepared."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">MR</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Mike R.</p>
                  <p className="text-sm text-gray-500">Homeowner, Texas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Coming Soon
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We're Building Next
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              RateMyAdjusters is actively evolving. Here's what's on our roadmap.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {roadmapItems.map((item) => (
              <div 
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <span className="inline-block mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Had a Recent Claim?
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Help other homeowners by sharing your experience. Your review builds 
            transparency and helps the next person know what to expect.
          </p>
          <Link 
            href="/review" 
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors text-lg"
          >
            Write a Review
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Final Search CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Ready to look up your adjuster?
          </h2>
          <SearchBar size="default" showFilters={false} />
        </div>
      </section>
    </div>
  )
}
