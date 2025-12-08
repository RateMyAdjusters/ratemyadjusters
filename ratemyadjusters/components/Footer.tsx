import Link from 'next/link'

export default function Footer() {
  const companies = [
    { name: 'State Farm', slug: 'state-farm' },
    { name: 'Allstate', slug: 'allstate' },
    { name: 'USAA', slug: 'usaa' },
    { name: 'Liberty Mutual', slug: 'liberty-mutual' },
    { name: 'Progressive', slug: 'progressive' },
    { name: 'Farmers', slug: 'farmers' },
    { name: 'Nationwide', slug: 'nationwide' },
  ]

  const states = [
    { name: 'Texas', abbr: 'TX' },
    { name: 'Florida', abbr: 'FL' },
    { name: 'California', abbr: 'CA' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Ohio', abbr: 'OH' },
    { name: 'Arizona', abbr: 'AZ' },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl">RateMyAdjusters</span>
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">Beta</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Know Your Adjuster.
            </p>
            <p className="text-slate-500 text-xs">
              168,824 adjusters across 50 states
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-slate-400 hover:text-white transition-colors">
                  Browse Adjusters
                </Link>
              </li>
              <li>
                <Link href="/review" className="text-slate-400 hover:text-white transition-colors">
                  Leave a Review
                </Link>
              </li>
              <li>
                <Link href="/review-guidelines" className="text-slate-400 hover:text-white transition-colors">
                  Review Guidelines
                </Link>
              </li>
              <li>
                <Link href="/for-adjusters" className="text-slate-400 hover:text-white transition-colors">
                  For Adjusters
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Companies */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Companies</h4>
            <ul className="space-y-2 text-sm">
              {companies.map((company) => (
                <li key={company.slug}>
                  <Link 
                    href={`/company/${company.slug}`} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {company.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Top States */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Top States</h4>
            <ul className="space-y-2 text-sm">
              {states.map((state) => (
                <li key={state.abbr}>
                  <Link 
                    href={`/search?state=${state.abbr}`} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {state.name} Adjusters
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Disclaimer */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <p className="text-slate-400 text-xs leading-relaxed">
              <span className="font-semibold text-slate-300">Disclaimer:</span> All reviews are user-submitted and moderated for accuracy and civility. RateMyAdjusters does not verify or endorse any user-submitted content. Information on this site is for informational purposes only and should not be construed as legal or professional advice. Insurance adjusters may dispute reviews through our response portal.
            </p>
          </div>
          
          {/* Bottom Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} RateMyAdjusters. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
