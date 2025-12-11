import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, UserCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'For Insurance Adjusters | RateMyAdjusters',
  description:
    'Information for insurance adjusters about RateMyAdjusters. Learn how profiles work, how reviews are handled, and how to request corrections or claim your profile.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/for-adjusters',
  },
}

export default function ForAdjustersPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">For Insurance Adjusters</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">For Insurance Adjusters</h1>
          </div>
          <p className="text-gray-600">
            Information about how adjuster profiles and reviews work on RateMyAdjusters.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-gray max-w-none">

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to RateMyAdjusters. This page explains how adjuster profiles work, how reviews are 
                handled, and what options are available if you believe information on the Site requires 
                correction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This page is provided for informational purposes only and does not modify or replace our{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link> or{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. What We Are</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters is a public, user-generated review platform that displays:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Publicly available licensing information</li>
                <li>User-submitted information</li>
                <li>User-submitted reviews, comments, and ratings</li>
                <li>Data compiled from public sources and discussion forums</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not verify the accuracy of user reviews, user statements, or public record data.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We are not:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>A state licensing authority</li>
                <li>An employer verification service</li>
                <li>A background-check or consumer reporting agency</li>
                <li>A mediator or arbitrator of disputes</li>
                <li>A source of legal, insurance, or financial advice</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Nothing on this Site should be relied upon as a statement of fact.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. How Adjuster Profiles Are Created</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Profiles on RateMyAdjusters may originate from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>State insurance department licensing databases</li>
                <li>Publicly available records</li>
                <li>User submissions</li>
                <li>Public discussion forums</li>
                <li>Manual additions by our team</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Profile data may be incomplete, outdated, or superseded by new information.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.1 Mistaken Identity Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Because many adjusters share similar or identical names, we cannot guarantee that all reviews, 
                submissions, or data correspond to the correct individual.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you believe your profile contains information intended for another person, you may request 
                a review through our{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700">contact form</Link>.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. What Adjusters Can Expect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Your profile may display:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Name</li>
                <li>License status (when available)</li>
                <li>State(s) of licensure</li>
                <li>Type of license</li>
                <li>Publicly submitted reviews</li>
                <li>Historical reviews compiled from public sources</li>
                <li>High-level information about claim types handled</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We do not publicly display:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Personal phone numbers</li>
                <li>Personal email addresses</li>
                <li>Residential addresses</li>
                <li>Non-public contact information</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Even if such information exists in public records, RateMyAdjusters may choose not to display 
                it for privacy and safety reasons.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Review Posting &amp; Moderation</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters hosts reviews from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Homeowners</li>
                <li>Contractors</li>
                <li>Public adjusters</li>
                <li>Policyholders</li>
                <li>Industry professionals</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                Reviews represent personal opinions, not factual determinations. <strong>We do not verify:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Identity of the reviewer</li>
                <li>Whether the reviewer had an actual claim with you</li>
                <li>The truth, accuracy, or intent of any statement</li>
                <li>Whether events described actually occurred</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Under Section 230 of the Communications Decency Act</strong>, RateMyAdjusters is not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>User-submitted content</li>
                <li>Opinions</li>
                <li>Ratings</li>
                <li>Commentary</li>
                <li>Allegedly defamatory statements by third parties</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Reviewers are entirely responsible for their own statements.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Non-Removal Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters does not remove reviews simply because:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>They are negative</li>
                <li>They describe unfavorable experiences</li>
                <li>They impact professional reputation</li>
                <li>The subject disagrees with them</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Content may be removed only if it:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Violates{' '}
                  <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700">Review Guidelines</Link>
                </li>
                <li>Contains prohibited content</li>
                <li>Is clearly directed at the wrong individual</li>
                <li>Is required to be removed under applicable law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Adjusters have no contractual right to demand removal of public information or user-submitted reviews.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Responding to Reviews</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Adjusters may &quot;Claim&quot; their profile to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Verify identity</li>
                <li>Respond publicly to reviews</li>
                <li>Submit corrections to licensing information</li>
                <li>Add practice regions or general business details</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
                <p className="text-amber-800 font-semibold text-sm mb-2">Important Notice</p>
                <p className="text-amber-700 text-sm">
                  All responses are public, permanently accessible, and may appear in search engines.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>By responding, you acknowledge:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your statements may be indexed publicly</li>
                <li>You have no expectation of privacy</li>
                <li>Your statements must be professional and accurate</li>
                <li>You are solely responsible for what you post</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We may moderate or remove responses that violate our policies.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Information Accuracy &amp; Updates</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We aim to keep licensing information reasonably up to date, but we do not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Timeliness</li>
                <li>Correct matching of names</li>
                <li>Reflective state of an adjuster&apos;s current licensure</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Adjusters are encouraged to request corrections through our{' '}
                <Link href="/contact" className="text-blue-600 hover:text-blue-700">contact form</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Submitting a correction request does not create any obligation for RateMyAdjusters to modify, 
                update, or remove data.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Requests We Cannot Fulfill</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We cannot:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Remove accurate public record information</li>
                <li>Remove reviews solely because they are negative</li>
                <li>Edit user opinions</li>
                <li>Guarantee that reviews reflect real experiences</li>
                <li>Provide copies of historical data</li>
                <li>Provide private reviewer information</li>
                <li>Act as a dispute arbiter between you and a reviewer</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not intervene in claim disputes, employment disputes, or vendor conflicts.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Legal Disclaimers</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                9.1 Section 230 Protection
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters LLC is not the publisher or speaker of user-submitted content.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We are not liable for:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Defamation claims</li>
                <li>Negligence claims</li>
                <li>Emotional distress claims</li>
                <li>Economic loss</li>
                <li>Business or reputational harm</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                arising from user-generated content.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                9.2 FCRA Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters is not a Consumer Reporting Agency and does not provide Consumer Reports.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>This Site may not be used to:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Evaluate employment eligibility</li>
                <li>Screen job applicants</li>
                <li>Determine professional licensing qualifications</li>
                <li>Make insurance underwriting decisions</li>
                <li>Make credit decisions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Use of the Site for these purposes is strictly prohibited.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. How to Request Profile Review</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you believe your profile contains:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Incorrect license information</li>
                <li>A mistaken identity issue</li>
                <li>A review that violates guidelines</li>
                <li>A technical error</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may submit a request:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
                    ratemyadjusters.com/contact
                  </Link>
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may request verification documents to process your request.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Submitting a request does not guarantee an update, removal, or response.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Arbitration &amp; Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes between you and RateMyAdjusters LLC must be resolved through binding arbitration 
                in accordance with our{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You waive:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>The right to sue in court</li>
                <li>The right to a jury trial</li>
                <li>The right to participate in class actions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Only individual arbitration is permitted.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                All matters relating to your use of RateMyAdjusters are governed by the laws of the State of 
                Delaware, without regard to conflict-of-law principles.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">13. Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For any questions regarding your profile, corrections, or policy interpretation, use our 
                secure contact form:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  <strong>RateMyAdjusters LLC</strong>
                </p>
                <p className="text-gray-700 mb-3">
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                    ratemyadjusters.com/contact
                  </Link>
                </p>
                <p className="text-gray-500 text-sm">
                  We do not guarantee response times and do not provide phone or email support.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
            <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700">
              Review Guidelines
            </Link>
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            <strong>Disclaimer:</strong> RateMyAdjusters LLC publishes information and user-generated content for general
            informational purposes only. Profile data, reviews, and commentary may be incomplete, outdated, or
            inaccurate, and are not independently verified. We do not guarantee the accuracy, reliability, or
            completeness of any content displayed on this site. Nothing on this site constitutes legal, financial, or
            professional advice, and no endorsement of any adjuster, company, or service is implied. Users are
            responsible for their own statements and submissions.
          </p>
        </div>
      </div>
    </main>
  )
}
