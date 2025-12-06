import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl text-white">RateMyAdjusters</span>
            </div>
            <p className="text-gray-400 max-w-md">
              The first platform for reviewing insurance company adjusters. 
              Know who's handling your claim before you file.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Find an Adjuster
                </Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-white transition-colors">
                  Write a Review
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition-colors">
                  Insurance Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/review-guidelines" className="hover:text-white transition-colors">
                  Review Guidelines
                </Link>
              </li>
              <li>
                <Link href="/for-adjusters" className="hover:text-white transition-colors">
                  For Adjusters
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RateMyAdjusters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
