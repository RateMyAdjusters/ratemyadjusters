import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What to Expect When an Insurance Adjuster Visits Your Home | RateMyAdjusters',
  description: 'Prepare for your insurance claim inspection with this homeowner guide. Learn what adjusters look for, how to document damage, and what happens after the visit.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/what-to-expect-when-adjuster-visits',
  },
}

export default function AdjusterVisitGuide() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/guides" className="text-gray-500 hover:text-gray-700">Guides</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Adjuster Home Visit</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              5 min read
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Homeowner Guide
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What to Expect When an Insurance Adjuster Visits Your Home
          </h1>
          <p className="text-xl text-gray-600">
            Your clear, step-by-step overview of the insurance claim inspection process — including how to prepare, what typically happens during the visit, and what you can expect afterward.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Understanding the Role of an Insurance Adjuster</h2>
            <p className="text-gray-700 leading-relaxed">
              An insurance adjuster is a trained professional responsible for evaluating property damage as part of your insurance claim. Their role is to inspect the affected areas, gather documentation, and prepare a report and estimate based on your policy coverage. Adjusters may be employees of your insurance company (staff adjusters) or independent professionals assigned to assist with claim volume.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">How to Prepare Before the Adjuster Arrives</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A little preparation can help the inspection move efficiently and ensure nothing is overlooked:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Review your policy.</strong> Take a moment to understand your coverage, deductible, and any relevant limits. This helps set expectations for the claim process.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Document visible damage.</strong> Before repairs or cleanup, capture photos and videos of all affected areas. Include wide shots for context and close-ups for detail. If safe, retain damaged materials until the inspection is complete.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Create a simple inventory list.</strong> Write down the rooms, items, and areas you want the adjuster to evaluate. This helps ensure all concerns are addressed during the visit.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Organize key documents.</strong> Keep your claim number, policy number, and any receipts for emergency repairs or damaged belongings easily accessible.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">What Happens During the Inspection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              During the visit, the adjuster will conduct a structured assessment of your property. While each claim is unique, most inspections include:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Walkthrough of affected areas.</strong> This may include interior rooms, roofing, exterior structures, or other locations depending on the nature of the claim.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Detailed documentation.</strong> Adjusters typically take photos, measurements, and notes. Many use digital estimating tools to assist in creating an accurate report.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Clarifying questions.</strong> You may be asked when the damage occurred, what temporary measures you've taken, and any other details relevant to the inspection.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Inspection duration.</strong> Smaller claims may take 30–45 minutes. More complex claims or widespread damage can require additional time or follow-up visits.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Communicating Effectively With Your Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Clear communication can support a smooth inspection process:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Be available during the visit.</strong> When possible, accompany the adjuster to point out areas you'd like reviewed.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Share accurate information.</strong> Honest, complete answers help the adjuster understand the situation clearly.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ask questions.</strong> If a part of the process is unclear, or if you're unsure what the next steps are, feel free to ask for clarification.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Take notes.</strong> Jot down the adjuster's name, contact information, and key points from your discussion for your own records.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">What to Expect After the Inspection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Following the visit, the adjuster will compile their findings into a detailed report. This typically includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>A description of the damage</li>
              <li>An itemized estimate for repair or replacement</li>
              <li>Supporting documentation such as photos or measurements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your insurance company will review the report and determine the next steps based on your policy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Timeline.</strong> Processing times vary depending on claim complexity and company procedures. Your adjuster or insurer can provide general expectations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Reviewing your estimate.</strong> When you receive the estimate or settlement documents, review them carefully. If you have questions or believe something needs clarification, contact your adjuster or insurance company.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Learn More About Your Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you'd like to read experiences shared by other homeowners and contractors, you can search for your adjuster on RateMyAdjusters or leave a review about your own experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Search Adjusters
              </Link>
              <Link
                href="/review"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-6 rounded-lg border border-gray-300 transition-colors"
              >
                Leave a Review
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
