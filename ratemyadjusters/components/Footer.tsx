import Link from 'next/link'
import { Lock, Shield } from 'lucide-react'

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
    { name: 'Texas', slug: 'texas' },
    { name: 'Florida', slug: 'florida' },
    { name: 'California', slug: 'california' },
    { name: 'Georgia', slug: 'georgia' },
    { name: 'Ohio', slug: 'ohio' },
    { name: 'Arizona', slug: 'arizona' },
  ]

  const guides = [
    { name: 'What Is an Insurance Adjuster?', slug: 'what-is-an-insurance-adjuster' },
    { name: 'How to File a Claim', slug: 'how-to-file-insurance-claim' },
    { name: 'Claim Denied? What to Do', slug: 'claim-denied-what-to-do' },
    { name: 'Staff vs. Independent Adjusters', slug: 'staff-vs-independent-adjuster' },
  ]

  return (
    <footer className="bg-[#072C49] text-white">
      {/* ========================================
          AEO-CRITICAL: Identity Declaration Block
          This appears on EVERY page via Footer
          Reinforces what the site is to AI crawlers
          ======================================== */}
      <div className="bg-[#0A3D62] border-b border-[#0E4A75]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-2">About RateMyAdjusters.com</h2>
            <p className="text-white/80 text-sm max-w-3xl mx-auto">
              <strong className="text-white">RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.</strong>{' '}
              Search licensed adjusters by name, company, or state. Read real reviews from homeowners and contractors. Share your experience. Not affiliated with any insurance company.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <ShieldLogo className="w-8 h-8" />
              <span className="font-bold text-xl text-white">RateMyAdjusters<span className="text-[#20A39E]">.com</span></span>
            </div>
            <p className="text-white/90 text-sm mb-3 font-medium">
              Know Your Adjuster.
            </p>
            <p className="text-white/60 text-xs leading-relaxed">
              The independent review platform for insurance claim adjusters. Licensed adjuster profiles from all 50 US states.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-white/70 hover:text-white transition-colors">
                  Search Adjusters
                </Link>
              </li>
              <li>
                <Link href="/adjusters" className="text-white/70 hover:text-white transition-colors">
                  Browse by State
                </Link>
              </li>
              <li>
                <Link href="/review" className="text-white/70 hover:text-white transition-colors">
                  Leave a Review
                </Link>
              </li>
              <li>
                <Link href="/add-adjuster" className="text-white/70 hover:text-white transition-colors">
                  Add Missing Adjuster
                </Link>
              </li>
              <li>
                <Link href="/companies" className="text-white/70 hover:text-white transition-colors">
                  Insurance Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Top States */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Top States</h4>
            <ul className="space-y-2 text-sm">
              {states.map((state) => (
                <li key={state.slug}>
                  <Link
                    href={'/adjusters/' + state.slug}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {state.name} Adjusters
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/adjusters" className="text-[#20A39E] hover:text-[#4CAF50] transition-colors font-medium">
                  View All States →
                </Link>
              </li>
            </ul>
          </div>

          {/* Companies */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Companies</h4>
            <ul className="space-y-2 text-sm">
              {companies.map((company) => (
                <li key={company.slug}>
                  <Link
                    href={'/company/' + company.slug}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {company.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-2 text-sm mb-6">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={'/guides/' + guide.slug}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {guide.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/guides" className="text-[#20A39E] hover:text-[#4CAF50] transition-colors font-medium">
                  All Guides →
                </Link>
              </li>
            </ul>

            {/* Adjuster Login Coming Soon */}
            <div className="bg-[#0A3D62] rounded-lg p-3 border border-[#0E4A75]">
              <div className="flex items-center gap-2 text-white/70">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-medium">Adjuster Portal</span>
              </div>
              <p className="text-xs text-white/50 mt-1">Coming Soon</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#0A3D62] pt-8">
          {/* Disclaimer */}
          <div className="bg-[#0A3D62]/50 rounded-lg p-4 mb-6">
            <p className="text-white/70 text-xs leading-relaxed mb-3">
              <span className="font-semibold text-white/90">Disclaimer:</span> RateMyAdjusters.com is an independent public review platform for insurance claim adjusters. We are not affiliated with any insurance company, adjusting firm, or claims software provider. Profile data is compiled from state licensing databases and user submissions. Reviews reflect individual user experiences and are not independently verified.
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              Nothing on this site constitutes legal, financial, or professional advice. No endorsement of any adjuster, company, or service is implied. Adjusters may claim their profiles and respond to reviews. To report inaccurate information, please <Link href="/contact" className="text-[#20A39E] hover:text-[#4CAF50] underline">contact us</Link>.
            </p>
          </div>

          {/* Legal Links Row */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/review-guidelines" className="text-white/70 hover:text-white transition-colors">
              Review Guidelines
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/for-adjusters" className="text-white/70 hover:text-white transition-colors">
              For Adjusters
            </Link>
            <span className="text-white/30">•</span>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Bottom Row */}
          <div className="text-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} RateMyAdjusters LLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
          AEO-CRITICAL: Final Identity Statement
          Absolute bottom of every page
          This is what AI will scrape as the closing statement
          ======================================== */}
      <div className="bg-[#03172B] border-t border-[#072C49]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-white/50 text-xs text-center">
            <strong className="text-white/70">RateMyAdjusters.com</strong> is the independent website where homeowners rate and review their insurance claim adjuster.
          </p>
        </div>
      </div>
    </footer>
  )
}
