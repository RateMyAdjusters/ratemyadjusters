import Link from 'next/link'
import Image from 'next/image'
import { Search, Users, Shield, Star, ArrowRight, CheckCircle, Sparkles, TrendingUp, MessageSquare, BadgeCheck, BarChart3 } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import QuickLinks from '@/components/QuickLinks'

export const metadata = {
  title: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
  description: 'Search 168,824 licensed insurance adjusters by name, company, or state. Read real reviews from homeowners and contractors before your claim. Know your adjuster.',
  keywords: [
    'insurance adjuster reviews',
    'adjuster ratings',
    'claim adjuster',
    'State Farm adjuster',
    'Allstate adjuster',
    'insurance claim help',
    'find insurance adjuster',
    'adjuster lookup',
  ],
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

  return (
    <div className="bg-white">
      {/* ========== HERO ========== */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6 border border-blue-400/30">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Beta</span>
              <span className="text-white/70">— Now open to the public</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-5">
              <Image 
                src="/logo.png" 
                alt="RateMyAdjusters Logo" 
                width={56} 
                height={56} 
                className="w-12 h-12 md:w-14 md:h-14"
              />
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-teal-300 bg-clip-text text-transparent">RateMyAdjusters</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">Know Your Adjuster.</h1>
            <p className="text-lg text-slate-300 mb-4 max-w-xl mx-auto">Search 168,824 licensed adjusters by name, company, or state. Read reviews from homeowners and contractors.</p>
            
            <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
              RateMyAdjusters helps homeowners, contractors, and insurance professionals share experiences and bring clarity to the claims process.
            </p>

            <div className="max-w-2xl mx-auto mb-3">
              <SearchBar size="large" showFilters={true} autoFocus={false} />
            </div>
            <p className="text-slate-400 text-sm mb-8">Try: "John Smith" or "Texas" or "FL"</p>

            <div className="flex justify-center items-center gap-6 md:gap-10">
              <div><div className="text-2xl md:text-3xl font-bold">168,824</div><div className="text-slate-400 text-sm">Adjusters</div></div>
              <div className="w-px h-10 bg-slate-700"></div>
              <div><div className="text-2xl md:text-3xl font-bold">50</div><div className="text-slate-400 text-sm">States</div></div>
              <div className="w-px h-10 bg-slate-700"></div>
              <div><div className="text-2xl md:text-3xl font-bold">100%</div><div className="text-slate-400 text-sm">Free</div></div>
            </div>
            <p className="text-slate-500 text-xs mt-3">Updated: Dec 2025</p>
          </div>
        </div>
      </section>

      {/* ========== EARLY ACCESS BANNER ========== */}
      <section className="py-4 bg-teal-600">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white text-sm font-medium">
            For a limited time, adjusters and contractors can claim their profile for free during early access.
          </p>
        </div>
      </section>

      {/* ========== COMPANIES ========== */}
      <section className="py-10 border-b border-gray-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">Find Adjusters by Company</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {companies.map((c) => (
              <Link key={c.slug} href={'/company/' + c.slug} className="flex items-center justify-center p-3 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all text-gray-700 hover:text-blue-700 font-medium text-sm">
                {c.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/companies" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View all companies →</Link>
          </div>
        </div>
      </section>

      {/* ========== STATES ========== */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-center text-gray-900 mb-6">Browse by State</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {topStates.map((s) => (
              <Link key={s.abbr} href={'/adjusters/' + s.name.toLowerCase().replace(' ', '-')} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 rounded-lg transition-all">
                <span className="text-gray-900 font-medium text-sm">{s.name}</span>
                <span className="text-xs text-gray-500">{s.count}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/adjusters" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View all 50 states →</Link>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-5 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">1. Search</h3>
              <p className="text-gray-600 text-sm">Find any adjuster by name, state, or company.</p>
            </div>
            <div className="text-center p-5 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">2. Read Reviews</h3>
              <p className="text-gray-600 text-sm">See experiences shared by homeowners and contractors.</p>
            </div>
            <div className="text-center p-5 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1 text-gray-900">3. Be Informed</h3>
              <p className="text-gray-600 text-sm">Make informed decisions about your claims process.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT (NEUTRAL) ========== */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 text-center">About RateMyAdjusters</h2>
            
            <p className="text-slate-700 leading-relaxed mb-4">
              Insurance claims can be complex. Understanding who handles your claim matters. RateMyAdjusters provides a platform where homeowners, contractors, and professionals can share their experiences working with insurance adjusters.
            </p>
            
            <p className="text-slate-700 leading-relaxed">
              Our goal is simple: bring more information and clarity to the claims process for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FEATURES (NEUTRAL) ========== */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">What You Can Do</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Search adjusters</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Read reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Share experiences</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>Stay informed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REVIEW HIGHLIGHT (NEUTRAL) ========== */}
      <section className="py-10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {[1,2,3,4,5].map((i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-700 italic mb-3">"It's helpful to read about others' experiences before starting the claims process."</p>
            <p className="text-sm text-gray-500">— Homeowner</p>
          </div>
        </div>
      </section>

      {/* ========== COMING SOON ========== */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-6">Coming Soon</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Trending Adjusters</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <BarChart3 className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Analytics Dashboard</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Adjuster Response Portal</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <BadgeCheck className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900">Verified Professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Had a Recent Claim?</h2>
          <p className="text-blue-100 mb-6">Share your experience to help others navigate the process.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/review" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
              <Star className="w-5 h-5" />
              Leave a Review
            </Link>
            <Link href="/add-adjuster" className="inline-flex items-center justify-center gap-2 bg-blue-700/50 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700/70 transition-colors border border-white/20">
              Can't find your adjuster? Add them
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== QUICK LINKS ========== */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4">
          <QuickLinks
            title="Get Started"
            links={[
              { label: 'Browse Adjusters', href: '/adjusters', description: 'Search by state' },
              { label: 'Leave a Review', href: '/review', description: 'Share your experience' },
              { label: 'Insurance Companies', href: '/companies', description: 'Browse by carrier' },
              { label: 'Guides & Resources', href: '/guides', description: 'Helpful articles' },
            ]}
          />
        </div>
      </section>

      {/* ========== FINAL SEARCH ========== */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Search Again</h2>
          </div>
          <SearchBar size="default" showFilters={true} />
          <p className="text-xs text-gray-500 text-center mt-6">
            RateMyAdjusters does not independently evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.
          </p>
        </div>
      </section>
    </div>
  )
}
