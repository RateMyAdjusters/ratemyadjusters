import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Review Guidelines | RateMyAdjusters',
  description:
    'Review Guidelines for RateMyAdjusters. Learn what content is allowed, prohibited conduct, moderation standards, and how reviews are handled on our platform.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/review-guidelines',
  },
}

export default function ReviewGuidelinesPage() {
  const effectiveDate = 'December 2025'

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
            <span className="text-gray-900 font-medium">Review Guidelines</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Review Guidelines</h1>
          </div>
          <p className="text-gray-600">Effective Date: {effectiveDate}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-gray max-w-none">

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                These Review Guidelines (&quot;Guidelines&quot;) explain how reviews, comments, ratings, and 
                other user-submitted content (&quot;User Content&quot;) are handled on RateMyAdjusters.com 
                (&quot;RateMyAdjusters,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By submitting 
                a review or interacting with the Site, you agree to these Guidelines, our{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>, and our{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                RateMyAdjusters LLC reserves the right to update these Guidelines at any time.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Purpose of the Platform</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters exists to collect and display subjective user experiences related to 
                insurance adjusters.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>The platform:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Publishes user opinions, not verified facts</li>
                <li>Displays public licensing information and user-submitted corrections</li>
                <li>Does not verify or endorse any adjuster or review</li>
                <li>Does not provide legal, insurance, or financial advice</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Reviews help other homeowners, contractors, and policyholders understand typical claim experiences.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                They are not authoritative reports, professional evaluations, or factual investigations.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. What You May Submit</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You may submit:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Personal experiences related to a property insurance claim</li>
                <li>Opinions about communication, professionalism, timeliness, accuracy, or process</li>
                <li>Commentary on inspection behavior, estimate practices, or claim handling</li>
                <li>Information helpful to future claimants</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Reviews must be:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Truthful to your personal experience</li>
                <li>Respectful and civil</li>
                <li>Accurate to the best of your knowledge</li>
                <li>Based on your own interaction with the adjuster</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. What You May NOT Submit</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not submit content that includes:
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.1 Unlawful or Restricted Content
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>False statements presented as fact</li>
                <li>Defamation, harassment, or targeted personal attacks</li>
                <li>Hate speech or discriminatory language</li>
                <li>Threats or abusive behavior</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.2 Prohibited Personal Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Do NOT post:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Adjuster phone numbers</li>
                <li>Personal emails</li>
                <li>Home addresses</li>
                <li>Private workplace details</li>
                <li>Family or personal background</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.3 Misuse of the Platform
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fake reviews</li>
                <li>Paid or incentivized reviews</li>
                <li>Reviews written by competitors or coworkers pretending to be customers</li>
                <li>Posting the same review multiple times</li>
                <li>Manipulating the rating system</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Responsibility for Reviews</h2>
              <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                You—and only you—are responsible for the content you submit.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                By posting a review, you represent that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>It reflects your genuine, subjective opinion</li>
                <li>You have the right to post it</li>
                <li>It does not violate any laws</li>
                <li>It is not fabricated, staged, or misleading</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                RateMyAdjusters LLC does not endorse, verify, or guarantee the accuracy of any User Content.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                5. No Duty to Monitor, Investigate, or Fact-Check
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-blue-800 font-semibold text-sm">Critical Protection</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>RateMyAdjusters:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Has no obligation to monitor User Content</li>
                <li>Does not investigate disputes between users and adjusters</li>
                <li>Does not fact-check reviews</li>
                <li>Does not determine which party is &quot;right&quot; or &quot;wrong&quot;</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We may choose to review content voluntarily, but we assume no responsibility for doing so.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Moderation Standards</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may remove or restrict content that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Violates these Guidelines</li>
                <li>Contains prohibited personal information</li>
                <li>Appears to be spam or fraudulent</li>
                <li>Attacks or impersonates other users</li>
                <li>Contains explicit threats, abusive behavior, or discriminatory language</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We may also:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Edit reviews only for formatting, readability, spelling, or removal of private information</li>
                <li>Retain removed content internally for fraud detection, abuse prevention, or legal compliance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                We do not alter the meaning of the reviewer&apos;s opinion.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Non-Removal Policy</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
                <p className="text-amber-800 font-semibold text-sm">Strong Shield</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters does not remove content simply because:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>An adjuster disagrees</li>
                <li>A company dislikes the review</li>
                <li>Someone claims the review is &quot;unfair&quot;</li>
                <li>Someone threatens legal action</li>
                <li>Someone requests removal for reputational reasons</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We only remove content if it violates Guidelines or legal requirements.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>There is no contractual or legal right to demand removal of:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reviews</li>
                <li>Ratings</li>
                <li>Opinions</li>
                <li>Public license information</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Public License Data &amp; Profile Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Adjuster profiles may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Public licensing information</li>
                <li>User-submitted corrections</li>
                <li>User-submitted missing profiles</li>
                <li>Data sourced from forums, discussions, or publicly accessible locations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Important disclaimers:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Data may be incomplete, inaccurate, outdated, or missing fields</li>
                <li>We do not guarantee correctness</li>
                <li>Profiles are not background checks</li>
                <li>Profiles must not be used for employment or credentialing decisions</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                9. &quot;Not a Background Check Service&quot; Disclaimer
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
                <p className="text-red-800 font-semibold text-sm">FCRA Protection</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>RateMyAdjusters:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Is NOT a consumer reporting agency</li>
                <li>Does NOT provide background checks</li>
                <li>Must NOT be used for hiring, discipline, termination, credentialing, or underwriting decisions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Using the Site for employment screening violates our Terms and federal law.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Subjective Ratings Notice</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Star ratings and written reviews:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Represent subjective user opinions, not facts</li>
                <li>Do not reflect professional evaluation or objective performance metrics</li>
                <li>Should not be interpreted as a definitive assessment of adjuster quality</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Adjuster Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Adjusters may:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Claim their profile</li>
                <li>Submit corrections to licensing data</li>
                <li>Respond publicly to reviews</li>
                <li>Report reviews that violate the Guidelines</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>However:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Adjusters have no right to edit, alter, censor, or demand removal of user opinions</li>
                <li>Adjusters cannot require RateMyAdjusters to investigate user claims</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Reporting a Review</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users may report reviews that violate these Guidelines.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Submitting a report:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Does not obligate us to take action</li>
                <li>Does not guarantee removal</li>
                <li>Does not guarantee a response</li>
                <li>Does not create any rights, duties, or expectations</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">13. License You Grant to RateMyAdjusters</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                By submitting content, you grant RateMyAdjusters LLC a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Perpetual</li>
                <li>Irrevocable</li>
                <li>Worldwide</li>
                <li>Royalty-free</li>
                <li>Transferable</li>
                <li>Sublicensable</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>right to:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Display</li>
                <li>Store</li>
                <li>Reproduce</li>
                <li>Publish</li>
                <li>Distribute</li>
                <li>Modify (formatting only)</li>
                <li>Index</li>
                <li>Analyze</li>
                <li>Use for SEO, search, AI training, and platform operations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Even if you delete your account, this license remains.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">14. Enforcement &amp; Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may suspend or terminate:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accounts</li>
                <li>Reviews</li>
                <li>Ability to submit content</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>for:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violations of these Guidelines</li>
                <li>Fraud, abuse, or harassment</li>
                <li>Attempts to manipulate reviews</li>
                <li>Legal risk</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">15. No Guarantee of Review Posting</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may, at our sole discretion:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Refuse to post a review</li>
                <li>Delay posting</li>
                <li>Require additional verification</li>
                <li>Remove or restrict reviews</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Users have no expectation or guarantee that their content will appear on the Site.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">16. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters LLC does not guarantee:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accuracy</li>
                <li>Reliability</li>
                <li>Completeness</li>
                <li>Truthfulness</li>
                <li>Timeliness</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                of any information or User Content.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Nothing in any review should be interpreted as:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>A factual statement</li>
                <li>A legal opinion</li>
                <li>A determination of fault</li>
                <li>A representation of actual claim outcomes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Every reviewer speaks only for themselves.
              </p>
            </section>

            {/* Section 17 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">17. Contact</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Questions about these Guidelines may be submitted through:
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
                  We do not offer email support or guarantee response times.
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
            <Link href="/for-adjusters" className="text-blue-600 hover:text-blue-700">
              Information for Adjusters
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
