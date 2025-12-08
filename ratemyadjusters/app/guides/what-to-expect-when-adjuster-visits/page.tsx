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
            Your step-by-step guide to understanding the insurance claim inspection process, preparing for the visit, and knowing what comes next.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Understanding the Role of an Insurance Adjuster</h2>
            <p className="text-gray-700 leading-relaxed">
              An insurance adjuster is a trained professional who assesses property damage on behalf of an insurance company. Their primary responsibility is to inspect the damage, document their findings, and provide an estimate that helps determine your settlement amount based on your policy. Adjusters may work directly for your insurance company (staff adjusters) or operate as independent contractors assigned to handle specific claims.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">How to Prepare Before the Adjuster Arrives</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A little preparation goes a long way. Taking these steps before your adjuster's visit can help the inspection process run smoothly:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Review your insurance policy.</strong> Understand your coverage limits, deductible amounts, and what types of damage are included. This knowledge helps you set realistic expectations for your claim.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Document all damage thoroughly.</strong> Before any cleanup or temporary repairs, photograph and video all affected areas. Capture both wide-angle shots for context and close-ups for detail. If possible, keep damaged materials for the adjuster to examine.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Create a written inventory.</strong> List every damaged item and area you want inspected. During the visit, it's easy to overlook something—a checklist ensures nothing gets missed.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Organize your paperwork.</strong> Have your policy number, claim number, and receipts for any emergency repairs or damaged items easily accessible.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">What Happens During the Inspection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              During the visit, the adjuster will conduct a thorough assessment of your property. Here's what to expect:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Complete property walkthrough.</strong> The adjuster will examine all areas affected by the damage—this may include your roof, interior spaces, foundation, or exterior structures depending on your claim.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Detailed documentation.</strong> Expect the adjuster to take photographs, measurements, and written notes. Many adjusters use specialized estimating software to calculate repair costs during the visit.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Questions about the damage.</strong> Be prepared to explain when and how the damage occurred, describe any temporary repairs you've made, and provide other relevant details about your claim.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Time required.</strong> Inspection length varies based on damage extent. Simple claims may take 30–45 minutes, while significant damage could require several hours or multiple visits.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Communicating Effectively With Your Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Good communication helps ensure a thorough and accurate assessment:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Be present during the inspection.</strong> Whenever possible, accompany the adjuster so you can point out all damaged areas and provide context they might otherwise miss.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Provide accurate information.</strong> Answer questions truthfully and completely. Accurate information supports a fair evaluation of your claim.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ask questions freely.</strong> If anything is unclear—whether about the inspection process or next steps—don't hesitate to ask. Adjusters can explain how they're evaluating damage and what to expect going forward.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Document the visit.</strong> Write down the adjuster's name, contact information, and key points discussed. These notes can be helpful for future reference.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">What to Expect After the Inspection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Once the inspection is complete, the adjuster will compile their findings into a detailed report that typically includes:
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              A comprehensive description of the damage, an itemized estimate of repair or replacement costs, and their recommendation regarding your claim. Your insurance company reviews this report before making a final coverage decision.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Expected timeline.</strong> Processing times vary based on claim complexity and your insurer's procedures. Your adjuster or insurance company can provide an estimated timeline for your specific situation.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Reviewing your estimate.</strong> When you receive the settlement offer or repair estimate, review it carefully. If you have questions or believe damage was overlooked, contact your adjuster or insurance company to discuss your concerns.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Learn More About Your Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Want to know more about the adjuster assigned to your claim? RateMyAdjusters helps homeowners and contractors share their experiences with insurance adjusters across the country.
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
