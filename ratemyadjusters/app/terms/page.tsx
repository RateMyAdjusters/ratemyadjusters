import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | RateMyAdjusters',
  description:
    'Terms of Service for RateMyAdjusters. Read our terms governing use of the platform, user content, liability limitations, and dispute resolution.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/terms',
  },
}

export default function TermsPage() {
  const effectiveDate = 'December 2025'
  const lastUpdated = 'December 10, 2025'

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
            <span className="text-gray-900 font-medium">Terms of Service</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600">Effective Date: {effectiveDate}</p>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-gray max-w-none">

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to RateMyAdjusters.com. These Terms of Service (&quot;Terms&quot;) constitute a binding 
                agreement between you (&quot;User,&quot; &quot;you&quot;) and RateMyAdjusters LLC (&quot;Company,&quot; 
                &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, services, 
                or database (collectively, the &quot;Site&quot;), you confirm that you have read, understood, and 
                agree to be legally bound by these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                If you do not agree to these Terms, do not access or use the Site.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Overview of the Platform</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters is a user-generated review platform that displays publicly available licensing 
                information about insurance adjusters, along with user-submitted reviews, comments, ratings, 
                and feedback (&quot;User Content&quot;).
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We do not:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Verify the accuracy of any review or user content</li>
                <li>Endorse or guarantee any adjuster</li>
                <li>Provide legal, insurance, or financial advice</li>
                <li>Act as an intermediary between adjusters and reviewers</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All information is provided &quot;as is&quot; for general informational purposes only.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must be at least 18 years old to use this Site. By using the Site, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You are legally capable of entering a binding agreement</li>
                <li>You will comply with these Terms and all applicable laws</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Content &amp; Reviews</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.1 You Are Solely Responsible for Your Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any content you submit—including ratings, reviews, comments, suggestions, or profile 
                updates—is your responsibility alone.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                By submitting content, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>It is your genuine opinion</li>
                <li>It is not false, defamatory, misleading, or unlawful</li>
                <li>You have the legal right to post it</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.2 License to Use Your Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By submitting content, you grant RateMyAdjusters LLC a perpetual, irrevocable, royalty-free, 
                worldwide license to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Display, store, distribute, reproduce, publish, modify, index, and otherwise use your content</li>
                <li>Use your content for SEO, marketing, search indexing, and platform operations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You agree this license continues even if you delete your account or request removal.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.3 No Obligation to Remove Content (Non-Removal Policy)
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters does not remove content simply because someone dislikes it. Content is removed 
                only if it violates our guidelines or legal requirements.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Users, companies, employers, insurance carriers, and adjusters have no contractual right to 
                demand removal of reviews or public information.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Public License Data</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We display insurance adjuster information sourced from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Public licensing databases</li>
                <li>State insurance departments</li>
                <li>Public records</li>
                <li>User submissions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may modify or update this data at our discretion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We do not guarantee:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Timeliness</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. No Warranties (No-Reliance Clause)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Site, data, profiles, and reviews are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; 
                without warranties of any kind.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, RateMyAdjusters LLC disclaims all warranties, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Reliability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                You agree you are not relying on the Site as an authoritative source of fact, legal 
                interpretation, or professional judgment.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                6. Section 230 Safe Harbor (Protection From Liability for User Reviews)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under 47 U.S.C. § 230 (Section 230):
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>RateMyAdjusters LLC is not liable for:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>User-submitted reviews</li>
                <li>Opinions</li>
                <li>Ratings</li>
                <li>Comments</li>
                <li>Third-party information</li>
                <li>Allegedly defamatory or inaccurate statements submitted by users</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are not the publisher or speaker of any third-party content.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Every reviewer is solely responsible for their statements.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                7. Communications Disclaimer
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree and acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>The Site does not guarantee receipt, review, or response to any communication.</li>
                <li>Contact form submissions are not monitored continuously.</li>
                <li>No communication sent to us creates any legal obligation or relationship.</li>
                <li>
                  Email confirmations, timestamps, or lack of response cannot be used as evidence of 
                  wrongdoing or damages.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We strongly encourage users to resolve disputes through proper legal or professional 
                channels, not through the Site.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Contact Information Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To protect privacy and security, the Site may withhold, mask, or obscure adjuster contact 
                information even if it exists in public records.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Users may see phrases including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>&quot;Not Available for Display&quot;</li>
                <li>&quot;Not Provided in State Records&quot;</li>
                <li>&quot;Verified — Not Publicly Displayed&quot;</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                This does not imply whether we do or do not possess additional data.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Prohibited Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You may NOT:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Post false or misleading reviews</li>
                <li>Attempt to reverse-engineer, harvest, scrape, or collect adjuster data</li>
                <li>Impersonate others</li>
                <li>Interfere with Site operations</li>
                <li>Attempt unauthorized access</li>
                <li>Use automated bots or scraping tools</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Violations may result in account termination or legal action.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the maximum extent allowed by law:
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                RateMyAdjusters LLC, its owners, officers, employees, and contractors are <strong>not liable</strong> for any:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Damages arising from use of the Site</li>
                <li>Losses based on user-submitted reviews</li>
                <li>Business losses, reputational harm, emotional distress, lost income, or lost clients</li>
                <li>Claims of defamation based on third-party content</li>
                <li>Errors in public record licensing data</li>
                <li>Delays, outages, or system failures</li>
              </ul>
              <div className="bg-gray-100 border-l-4 border-blue-600 p-4 my-4">
                <p className="text-gray-800 font-semibold">
                  TOTAL LIABILITY MAY NOT EXCEED $50 USD UNDER ANY CIRCUMSTANCE.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree to indemnify and hold harmless RateMyAdjusters LLC and its owners from any claims 
                arising out of:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your use of the Site</li>
                <li>Your content</li>
                <li>Your violation of these Terms</li>
                <li>Your breach of any law</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of the State of Delaware, without regard to its 
                conflict-of-law principles. You agree that any dispute arising under these Terms shall 
                be resolved exclusively through binding arbitration as described below.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                13. Mandatory Arbitration &amp; Class Action Waiver
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You agree that:</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                All disputes must be resolved by binding arbitration, administered by the American 
                Arbitration Association (AAA).
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

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">14. Account Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may suspend or terminate access to any user at our discretion, without notice, for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violations</li>
                <li>Fraud</li>
                <li>Abuse</li>
                <li>Attempts to manipulate reviews</li>
                <li>Legal risk</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">15. Changes to the Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms at any time. Continued use of the Site constitutes acceptance 
                of the revised Terms.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">16. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To contact us, please use our secure contact form:
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
                  We do not guarantee response times and do not provide email support as a matter of policy.
                  To protect user and staff privacy, we do not publish a direct email address.
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Related Links */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
            <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700">
              Review Guidelines
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
            <strong>Disclaimer:</strong> RateMyAdjusters publishes information and user-generated content for general
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
