import { Metadata } from 'next'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Review Guidelines | RateMyAdjusters',
  description: 'Guidelines for writing fair, honest, and helpful reviews on RateMyAdjusters.',
}

export default function ReviewGuidelines() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Guidelines</h1>
        <p className="text-gray-600 mb-8">
          Help us maintain a trustworthy platform by following these guidelines when writing reviews.
        </p>

        {/* Do's */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">Do's</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700"><strong>Be truthful</strong> — Share your genuine experience as it happened.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700"><strong>Be specific</strong> — Include details about the claim type, timeline, and outcome.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700"><strong>Focus on the claim experience</strong> — How did they communicate? Were they fair? Timely?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700"><strong>Be balanced</strong> — Mention both positives and negatives if applicable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">✓</span>
              <span className="text-gray-700"><strong>Help others</strong> — Write the review you wish you had before your claim.</span>
            </li>
          </ul>
        </div>

        {/* Don'ts */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Don'ts</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-gray-700"><strong>No personal attacks</strong> — Criticize actions, not character.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-gray-700"><strong>No private information</strong> — Don't include policy numbers, addresses, phone numbers, or SSNs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-gray-700"><strong>No false statements</strong> — Don't make claims you can't support.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-gray-700"><strong>No threats or harassment</strong> — Keep it professional.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 mt-1">✗</span>
              <span className="text-gray-700"><strong>No fake reviews</strong> — Only review adjusters you've actually worked with.</span>
            </li>
          </ul>
        </div>

        {/* Moderation Notice */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Moderation Policy</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All reviews are moderated before being published. Reviews that violate these guidelines 
                may be edited or removed. Adjusters may respond to reviews through our response portal. 
                We reserve the right to remove any content that we determine to be inappropriate, 
                false, or harmful.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="mt-8 p-6 bg-slate-900 rounded-xl text-white">
          <h3 className="font-semibold mb-3">Quick Summary</h3>
          <p className="text-slate-300 text-sm">
            • Be truthful • No personal attacks • Focus on claim experience • 
            No policy numbers or private info • All reviews may be moderated
          </p>
        </div>
      </div>
    </main>
  )
}
