import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | RateMyAdjusters',
  description:
    'Terms of Service for RateMyAdjusters LLC. Read our terms governing use of the platform, user content, liability limitations, and dispute resolution.',
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

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service (&quot;Terms&quot;) form a binding agreement between you (&quot;User&quot; or 
                &quot;you&quot;) and RateMyAdjusters LLC (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or 
                &quot;us&quot;). By accessing or using ratemyadjusters.com (the &quot;Site&quot;), you confirm that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>You have read and understand these Terms;</li>
                <li>You agree to be legally bound by them; and</li>
                <li>You are at least 18 years old and legally able to enter into a binding contract.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                If you do not agree to these Terms, you must not access or use the Site.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Nature of the Platform</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters is an informational and review platform that publishes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Publicly available licensing information about insurance adjusters;</li>
                <li>User-submitted reviews, comments, ratings, and suggested edits (&quot;User Content&quot;);</li>
                <li>Compiled, summarized, categorized, or paraphrased content derived from publicly available sources such as forums, discussion boards, and social media platforms; and</li>
                <li>AI-assisted summaries, labels, and formatting applied to that content.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We do not:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Verify the accuracy of any review or third-party statement</li>
                <li>Endorse any adjuster or reviewer</li>
                <li>Perform background checks</li>
                <li>Provide legal, insurance, or financial advice</li>
                <li>Guarantee completeness or accuracy of data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                All information is provided &quot;AS IS&quot; for general informational purposes only.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Content &amp; Reviews</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.1 User Responsibility
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are solely responsible for any content you submit, including reviews, ratings, comments, 
                feedback, or profile updates. By submitting content, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>It reflects your genuine experience or opinion;</li>
                <li>It is not false, defamatory, misleading, or unlawful;</li>
                <li>You have the right to submit it;</li>
                <li>It does not violate a confidentiality agreement, employment agreement, or insurance company policy.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You understand and agree that RateMyAdjusters LLC does not independently verify your statements.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.2 License Granted to RateMyAdjusters LLC
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By submitting content, you grant RateMyAdjusters LLC a perpetual, irrevocable, worldwide, 
                royalty-free license to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Store, display, publish, index, distribute, reproduce, modify, summarize, and create derivative works from your content</li>
                <li>Use your content for SEO, search indexing, testing, development, and marketing</li>
                <li>Retain the content even if you delete your account or request changes</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                This license survives termination.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.3 Non-Removal Policy
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We do not remove content simply because:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>An adjuster dislikes it</li>
                <li>An employer complains</li>
                <li>A carrier requests removal</li>
                <li>It is &quot;negative&quot;</li>
                <li>It allegedly &quot;hurts reputation&quot;</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Removal occurs only when content violates written guidelines or applicable law.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                There is no contractual right for any individual, employer, insurer, or adjuster to demand removal.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                3.4 Aggregated, Paraphrased, and Third-Party Content
              </h3>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
                <p className="text-amber-800 font-semibold text-sm mb-2">Critical Protection</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Site may display content that consists of summaries, paraphrases, categorizations, or 
                compilations of statements made by third parties on public websites (forums, social media, 
                discussion boards, complaint sites, etc.).
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>To the fullest extent permitted by law:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Such content remains third-party opinion, not statements by RateMyAdjusters LLC</li>
                <li>We do not endorse, adopt, guarantee, or verify any underlying statement</li>
                <li>Summaries or paraphrases are for readability and do not change the underlying nature of the content</li>
                <li>Original posters remain solely responsible for their statements</li>
                <li>Users should refer to original sources for full context</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Site may use automated tools—including AI—to format, summarize, classify, or label content. 
                Automated output may contain errors.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                You agree not to rely on AI-generated content as authoritative, factual, or complete.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Adjuster Profile Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Adjuster profiles may include data from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>State insurance departments</li>
                <li>Public licensing databases</li>
                <li>Public-record filings</li>
                <li>User submissions</li>
                <li>Other lawful sources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                Profiles may reflect a blend of these data sources.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We do not guarantee:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Accuracy</li>
                <li>Completeness</li>
                <li>Current license status</li>
                <li>Employer affiliation</li>
                <li>Geographic coverage</li>
                <li>Claim specialization</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Profiles are not official records and should not be treated as such.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. No Warranties (No-Reliance Clause)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Site, data, and all content are provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;, 
                without warranties of any kind—express or implied.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You agree not to rely on:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Reviews</li>
                <li>Ratings</li>
                <li>Summaries</li>
                <li>Profile data</li>
                <li>AI-generated content</li>
                <li>Any information on the Site</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                as authoritative, factual, complete, or a substitute for professional advice.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                6. Section 230 Protection (Federal Law Shield)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under 47 U.S.C. § 230:
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters LLC is not the publisher or speaker of User Content or third-party commentary.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We are not liable for:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Defamation claims based on user statements</li>
                <li>Inaccuracies in reviews</li>
                <li>Harassment allegations</li>
                <li>Opinions expressed by third parties</li>
                <li>Content aggregated or paraphrased from external sources</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Every reviewer is solely responsible for their statements.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                7. Communications Disclaimer
              </h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>The Site does not guarantee receipt, review, or response to any message.</li>
                <li>Contact form submissions do not create any contractual, legal, or professional relationship.</li>
                <li>No communication constitutes legal or professional advice.</li>
                <li>Email confirmations, timestamps, or lack thereof cannot be used as evidence of wrongdoing or damages.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Contact Information Masking</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To protect privacy and prevent harassment, the Site may hide, withhold, or obscure adjuster 
                contact information—even if publicly available.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Labels such as:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>&quot;Not Available for Display&quot;</li>
                <li>&quot;Not Provided in State Records&quot;</li>
                <li>&quot;Verified — Not Publicly Displayed&quot;</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                do not indicate whether additional information exists in private records.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Prohibited Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You may not:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Scrape, harvest, extract, or copy data (manual or automated)</li>
                <li>Use bots, scripts, crawlers, or automated tools</li>
                <li>Attempt to reverse-engineer the Site</li>
                <li>Interfere with operation or security</li>
                <li>Submit fraudulent reviews</li>
                <li>Impersonate individuals</li>
                <li>Misuse the Site for harassment or retaliation</li>
              </ul>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Violations may result in account termination and legal action.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the maximum extent permitted by law, RateMyAdjusters LLC and its owners, officers, and 
                employees are <strong>not liable</strong> for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Damages from reliance on Site content</li>
                <li>Reputational harm</li>
                <li>Emotional distress</li>
                <li>Lost business, clients, or revenue</li>
                <li>Alleged defamation based on third-party statements</li>
                <li>Errors or delays in data</li>
                <li>System outages or interruptions</li>
              </ul>
              <div className="bg-gray-100 border-l-4 border-blue-600 p-4 my-4">
                <p className="text-gray-800 font-semibold">
                  TOTAL LIABILITY IS LIMITED TO $50 USD.
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                You personally are fully protected—liability stays with the LLC.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You agree to indemnify and hold harmless RateMyAdjusters LLC, including its owners, from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your content</li>
                <li>Your use of the Site</li>
                <li>Your violations of these Terms</li>
                <li>Any claims brought against the Company based on your conduct</li>
                <li>All associated costs, fees, and attorney fees</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed exclusively by the laws of the State of Delaware, without regard to 
                conflict-of-law principles.
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
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>All disputes must be resolved by binding arbitration administered by the AAA</li>
                <li>No lawsuits in court</li>
                <li>No jury trials</li>
                <li>No class actions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                Only individual arbitration is permitted.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This clause survives termination of your account.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">14. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may suspend or terminate access to the Site at any time, without notice, for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Guideline violations</li>
                <li>Fraud</li>
                <li>Abuse</li>
                <li>Legal risk</li>
                <li>Attempts to manipulate ratings</li>
              </ul>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may modify these Terms at any time. Continued use of the Site constitutes acceptance 
                of updated Terms.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">16. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To contact us, please use our secure online form:
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
                  We do not publish a direct email address and do not guarantee response times.
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
