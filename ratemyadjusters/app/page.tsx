import Link from 'next/link'
import { Search, Users, Shield, Star, ArrowRight, CheckCircle, Sparkles, Clock, Share2 } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export const metadata = {
  title: 'RateMyAdjusters – Know Your Adjuster',
  description: 'Real reviews of insurance adjusters from homeowners and contractors. Search 168,824 licensed adjusters by name, company, or state. Know who\'s handling your claim.',
  keywords: 'insurance adjuster reviews, adjuster ratings, claim adjuster, State Farm adjuster, Allstate adjuster, insurance claim help',
  openGraph: {
    title: 'RateMyAdjusters – Know Your Adjuster',
    description: 'Real reviews of insurance adjusters from homeowners and contractors. Search 168,824 licensed adjusters.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RateMyAdjusters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters – Know Your Adjuster',
    description: 'Real reviews of insurance adjusters from homeowners and contractors.',
  },
}

function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="M24 4L6 12V22C6 33.1 13.68 43.34 24 46C34.32 43.34 42 33.1 42 22V12L24 4Z" 
        fill="url(#shield-gradient)"
        stroke="url(#shield-stroke)"
        strokeWidth="2"
      />
      <g fill="#FCD34D">
        <path d="M14 22L15.09 25.26L18.5 25.26L15.71 27.24L16.8 30.5L14 28.52L11.2 30.5L12.29 27.24L9.5 25.26L12.91 25.26L14 22Z" />
        <path d="M24 16L25.45 20.35L30 20.35L26.27 23.04L27.73 27.39L24 24.7L20.27 27.39L21.73 23.04L18 20.35L22.55 20.35L24 16Z" />
        <path d="M34 22L35.09 25.26L38.5 25.26L35.71 27.24L36.8 30.5L34 28.52L31.2 30.5L32.29 27.24L29.5 25.26L32.91 25.26L34 22Z" />
      </g>
      <defs>
        <linearGradient id="shield-gradient" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F4C81"/>
          <stop offset="1" stopColor="#0D9488"/>
        </linearGradient>
        <linearGradient id="shield-stroke" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E6091"/>
          <stop offset="1" stopColor="#14B8A6"/>
        </linearGradient>
      </defs>
    </svg>
  )
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
    { name: 'Texas', abbr: 'TX', count: '74,853' },
    { name: 'Florida', abbr: 'FL', count: '13,998' },
    { name: 'Georgia', abbr: 'GA', count: '10,940' },
    { name: 'Ohio', abbr: 'OH', count: '10,529' },
    { name: 'Massachusetts', abbr: 'MA', count: '8,682' },
    { name: 'Arizona', abbr: 'AZ', count: '8,507' },
  ]

  const trustPoints = [
    'Exposed: adjusters who lowball claims',
    'Praised: adjusters who play fair',
    'Exposed: delay tactics and denials',
    'Praised: fast and honest settlements',
    'Your voice builds the record',
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
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-blue-400/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Beta</span>
              <span className="text-white/70">— Now open to the public</span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <Logo className="w-14 h-14 md:w-16 md:h-16" />
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-teal-300 bg-clip-text text-transparent">
                RateMyAdjusters
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Know Your Adjuster.
            </h1>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Real reviews from homeowners and contractors. 
              Search 168,824 licensed adjusters before your claim.
            </p>

            <div className="max-w-2xl mx-auto mb-3">
              <SearchBar size="large" showFilters={true} autoFocus={false} />
            </div>
            
            <p className="text-slate-400 text-sm mb-10">
              Try: "John Smith" or "Texas" or "FL"
            </p>

            <div className="flex justify-center items-center gap-8 md:gap-12 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">168,824</div>
                <div className="text-slate-400 text-sm">Adjusters</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">50</div>
                <div className="text-slate-400 text-sm">States</div>
              </div>
              <div className="w-px h-12 bg-slate-700"></div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
                <div className="text-slate-400 text-sm">Free</div>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-4">Updated: Dec 2025</p>
          </div>
        </div>
      </section>

      {/* Viral Paragraph Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">
              The Truth About Insurance Companies
            </h2>
            
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
              <p className="mb-6">
                Insurance companies spend <span className="font-semibold text-slate-900">billions</span> making themselves look like superheroes — friendly neighbors, trusted hands, wise experts, chaos fighters.
              </p>
              
              <p className="mb-6">
                But the moment your claim hits their system, that <span className="text-blue-600 font-medium">"friendly neighbor"</span> suddenly stops answering the door, those <span className="text-blue-600 font-medium">"good hands"</span> drop your estimate, the company that's <span className="text-blue-600 font-medium">"on your side"</span> slides to the far end of the table, the one that <span className="text-blue-600 font-medium">"knows a thing or two"</span> forgets everything when you ask about coverage, and the brand bragging about <span className="text-blue-600 font-medium">"protecting you from mayhem"</span>?
              </p>
              
              <p className="mb-8 text-xl font-semibold text-slate-900 text-center">
                Yeah… sometimes their adjuster <em>is</em> the mayhem.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
                <p className="text-slate-800 mb-0">
                  That's why <span className="font-bold text-blue-700">RateMyAdjusters</span> exists. No jingles. No mascots. No corporate fairy tales. Just <span className="font-semibold">real experiences</span> from the people who actually deal with adjusters every day — <span className="text-teal-700 font-medium">homeowners trying to rebuild</span>, and <span className="text-teal-700 font-medium">contractors who've seen it all</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find by Company */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
            Find Adjusters by Company
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Select a carrier to browse their adjusters
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/company/${company.slug}`}
                className="flex items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all text-gray-700 hover:text-blue-700 font-medium"
              >
                {company.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by State */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
            Browse by State
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Top states by number of licensed adjusters
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topStates.map((state) => (
              <Link
                key={state.abbr}
                href={`/search?state=${state.abbr}`}
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-xl transition-all"
              >
                <span className="text-gray-900 font-medium">{state.name}</span>
                <span className="text-sm text-gray-500">{state.count}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/search" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View all 50 states →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Three simple steps to know exactly who you're dealing with
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Search className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Search</h3>
              <p className="text-gray-600">
                Find any adjuster by name, state, or company.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Read Reviews</h3>
              <p className="text-gray-600">
                See real experiences from homeowners and contractors.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Be Prepared</h3>
              <p className="text-gray-600">
                Know what to expect before your adjuster arrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Panel */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The First Accountability Platform for Insurance Adjusters
              </h2>
              <p className="text-gray-600 mb-8">
                No more guessing. No more surprises. Just transparency from people who've been there.
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
                The reviews were spot on — he tried to lowball me but I was prepared with documentation."
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
      <section className="py-20 bg-slate-50">
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Had a Recent Claim?
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Help other homeowners by sharing your experience. Your review could save someone thousands.
          </p>
          <Link 
            href="/review" 
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold py-4 px-8 rounded-full hover:bg-blue-50 transition-colors text-lg"
          >
            Leave a Review
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Final Search + Disclaimer */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Know Your Adjuster.
          </h2>
          <p className="text-gray-600 mb-6">Search 168,824 licensed adjusters across all 50 states.</p>
          <SearchBar size="default" showFilters={false} />
          
          {/* Disclaimer */}
          <p className="mt-8 text-xs text-gray-400">
            All reviews are user-submitted and moderated for accuracy and civility.
          </p>
        </div>
      </section>
    </div>
  )
}
