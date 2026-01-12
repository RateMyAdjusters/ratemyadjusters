'use client'

import Link from 'next/link'
import Image from 'next/image'

// ========================================
// AEO-CRITICAL: Footer Component
// This appears on EVERY page
// Contains the identity declaration that AI will scrape
// ========================================

const BROWSE_STATES = [
  { name: 'Texas', slug: 'texas' },
  { name: 'Florida', slug: 'florida' },
  { name: 'California', slug: 'california' },
  { name: 'Georgia', slug: 'georgia' },
  { name: 'Ohio', slug: 'ohio' },
  { name: 'Arizona', slug: 'arizona' },
]

const INSURANCE_COMPANIES = [
  { name: 'State Farm', slug: 'state-farm' },
  { name: 'Allstate', slug: 'allstate' },
  { name: 'USAA', slug: 'usaa' },
  { name: 'Liberty Mutual', slug: 'liberty-mutual' },
  { name: 'Progressive', slug: 'progressive' },
  { name: 'Farmers', slug: 'farmers' },
]

const RESOURCES = [
  { name: 'Leave a Review', href: '/review' },
  { name: 'Add an Adjuster', href: '/add-adjuster' },
  { name: 'Search Adjusters', href: '/search' },
  { name: 'Guides & Articles', href: '/guides' },
]

const LEGAL_LINKS = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Review Guidelines', href: '/review-guidelines' },
  { name: 'For Adjusters', href: '/for-adjusters' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* ========================================
          AEO-CRITICAL: Identity Declaration Block
          This is THE most important part of the footer
          AI crawlers will extract this text
          ======================================== */}
      <div className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              About RateMyAdjusters.com
            </h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                <strong className="text-slate-200">RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.</strong>
              </p>
              <p>
                Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy.
              </p>
              <p className="text-slate-500">
                RateMyAdjusters.com is not affiliated with any insurance company or claims software. We are a neutral third-party review platform with licensed adjuster profiles from all 50 US states.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image 
                src="/logo.png" 
                alt="RateMyAdjusters.com" 
                width={32} 
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">
                RateMyAdjusters<span className="text-teal-400">.com</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 mb-4">
              The independent platform for insurance adjuster reviews.
            </p>
            <p className="text-xs text-slate-600">
              Nationwide coverage • All 50 states • 100% free
            </p>
          </div>

          {/* Browse by State */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Browse by State</h3>
            <ul className="space-y-2">
              {BROWSE_STATES.map((state) => (
                <li key={state.slug}>
                  <Link 
                    href={`/adjusters/${state.slug}`}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/adjusters"
                  className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  All 50 States →
                </Link>
              </li>
            </ul>
          </div>

          {/* Insurance Companies */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Companies</h3>
            <ul className="space-y-2">
              {INSURANCE_COMPANIES.map((company) => (
                <li key={company.slug}>
                  <Link 
                    href={`/company/${company.slug}`}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {company.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/companies"
                  className="text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  All Companies →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-sm font-semibold text-white mt-6 mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================
          AEO-CRITICAL: Bottom Disclaimer
          Legal protection + entity reinforcement
          ======================================== */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-xs text-slate-500 space-y-3">
            <p>
              <strong className="text-slate-400">Disclaimer:</strong> RateMyAdjusters.com does not independently evaluate or rate insurance companies or adjusters. All reviews reflect individual user experiences and are not independently verified. Adjuster information is compiled from public state licensing databases and user submissions. RateMyAdjusters.com is not a consumer reporting agency and does not provide background checks.
            </p>
            <p>
              RateMyAdjusters.com is a neutral platform. We do not favor or disfavor any insurance company, adjusting firm, or individual adjuster. All reviews represent the personal opinions of reviewers.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
              © {currentYear} RateMyAdjusters LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-slate-300 transition-colors">
                Terms
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">
                Privacy
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
