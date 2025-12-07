import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl">RateMyAdjusters</span>
              <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full">Beta</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              The first accountability platform for insurance adjusters. 
              Know who's handling your claim before they show up.
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
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="/review-guidelines" className="text-slate-400 hover:text-white transition-colors">
                  Review Guidelines
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/for-adjusters" className="text-slate-400 hover:text-white transition-colors">
                  For Adjusters
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          {/* Disclaimer */}
          <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
            <p className="text-slate-400 text-xs leading-relaxed">
              <span className="font-semibold text-slate-300">Disclaimer:</span> All reviews represent the opinions of individual users. RateMyAdjusters does not verify or endorse any user-submitted content. Information on this site is for informational purposes only and should not be construed as legal or professional advice. Insurance adjusters may dispute reviews through our response portal.
            </p>
          </div>
          
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} RateMyAdjusters. All rights reserved.
            </p>
            <p className="text-slate-600 text-xs">
              Made for homeowners, by homeowners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
