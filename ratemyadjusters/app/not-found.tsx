import Link from 'next/link'
import { Home, Search, FileQuestion, ArrowRight } from 'lucide-react'

export default function NotFound() {
  const reasons = [
    "The link may be outdated or broken",
    "The URL might have been typed incorrectly",
    "The page may have been moved or removed",
    "The adjuster profile you're looking for may not exist yet",
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center py-20">
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8 border border-red-400/30">
          <FileQuestion className="w-4 h-4 text-red-400" />
          <span className="text-red-300 font-medium">Error 404</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page Not Found
        </h1>

        {/* Subhead */}
        <p className="text-xl text-slate-300 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>

        {/* Main Body */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <p className="text-slate-300 text-lg leading-relaxed">
            The page you requested doesn't seem to exist. This could be due to an outdated link or a typo in the URL.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mt-4">
            Let's get you back on track. You can return to the homepage or search for the adjuster you're looking for.
          </p>
        </div>

        {/* Reasons Block */}
        <div className="bg-slate-500/10 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-slate-400/20 text-left">
          <h3 className="text-slate-300 font-semibold mb-4 text-center">
            This may have happened because:
          </h3>
          <ul className="space-y-3">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-300">
                <span className="text-slate-400 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
            Search Adjusters
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-slate-500 text-sm mt-12">
          If you believe this is an error, please contact us and we'll look into it.
        </p>
      </div>
    </main>
  )
}
