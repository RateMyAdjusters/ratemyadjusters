import Link from 'next/link'
import { Lock } from 'lucide-react'

function ShieldLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="M24 4L6 12V22C6 33.1 13.68 43.34 24 46C34.32 43.34 42 33.1 42 22V12L24 4Z" 
        fill="url(#footer-shield-gradient)"
        stroke="url(#footer-shield-stroke)"
        strokeWidth="2"
      />
      <g fill="#FCD34D">
        <path d="M14 22L15.09 25.26L18.5 25.26L15.71 27.24L16.8 30.5L14 28.52L11.2 30.5L12.29 27.24L9.5 25.26L12.91 25.26L14 22Z" />
        <path d="M24 16L25.45 20.35L30 20.35L26.27 23.04L27.73 27.39L24 24.7L20.27 27.39L21.73 23.04L18 20.35L22.55 20.35L24 16Z" />
        <path d="M34 22L35.09 25.26L38.5 25.26L35.71 27.24L36.8 30.5L34 28.52L31.2 30.5L32.29 27.24L29.5 25.26L32.91 25.26L34 22Z" />
      </g>
      <defs>
        <linearGradient id="footer-shield-gradient" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F4C81"/>
          <stop offset="1" stopColor="#0D9488"/>
        </linearGradient>
        <linearGradient id="footer-shield-stroke" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E6091"/>
          <stop offset="1" stopColor="#14B8A6"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

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
              <ShieldLogo className="w-8 h-8" />
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
                <Link href="/add-adjuster" className="text-slate-400 hover:text-white transition-colors">
                  Add Missing Adjuster
                </Link>
              </li>
              <li>
                <Link href="/review-guidelines" className="text-slate-400 hover:text-white transition-colors">
                  Review Guidelines
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
                    href={'/company/' + company.slug} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {company.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Top States + Adjuster Login */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Top States</h4>
            <ul className="space-y-2 text-sm mb-6">
              {states.map((state) => (
                <li key={state.abbr}>
                  <Link 
                    href={'/search?state=' + state.abbr} 
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {state.name} Adjusters
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Adjuster Login Coming Soon */}
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-2 text-slate-400">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Adjuster Login</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Coming Soon</p>
            </div>
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
              <Link href="/for-adjusters" className="text-slate-400 hover:text-white transition-colors">
                For Adjusters
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
