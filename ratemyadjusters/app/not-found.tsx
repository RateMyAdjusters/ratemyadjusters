import Link from 'next/link'
import { Home, Search, FileQuestion, ArrowRight } from 'lucide-react'

export default function NotFound() {
  const reasons = [
    "The link expired faster than an adjuster's voicemail inbox",
    "Someone fat-fingered a button like a rookie IA on their first storm",
    'The adjuster you\'re searching for vanished into the "We\'ll review and get back to you" dimension',
    "Or… the universe just denied your claim for no reason",
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
          Oops… Looks Like This Claim Got Mishandled.
        </h1>

        {/* Subhead */}
        <p className="text-xl text-slate-300 mb-8">
          Don't worry — it happens in the insurance world way more often than it happens on our website.
        </p>

        {/* Main Body */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
          <p className="text-slate-300 text-lg leading-relaxed">
            The page you're looking for didn't load… kind of like a proper estimate the first time around.
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mt-4">
            But you're still in the right place. Let's get you back to finding the adjuster you're dealing with — <span className="text-white font-semibold">BEFORE</span> the next surprise shows up.
          </p>
        </div>

        {/* Humor Block */}
        <div className="bg-amber-500/10 backdrop-blur-sm rounded-2xl p-6 mb-10 border border-amber-400/20 text-left">
          <h3 className="text-amber-300 font-semibold mb-4 text-center">
            Here are a few possibilities for what went wrong:
          </h3>
          <ul className="space-y-3">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-300">
                <span className="text-amber-400 mt-1">•</span>
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
          If you think this is an error on our end, let us know. Unlike some adjusters, we actually respond.
        </p>

        {/* Easter Egg */}
        <p className="text-slate-600 text-xs mt-4 italic">
          If this was an adjuster decision, we'd call it "within guidelines." 😉
        </p>
      </div>
    </main>
  )
}
