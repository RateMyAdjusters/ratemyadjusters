import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | RateMyAdjusters',
  description:
    'Privacy Policy for RateMyAdjusters LLC. Learn how we collect, use, and protect your information and the information displayed on our platform.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/privacy',
  },
}

export default function PrivacyPage() {
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
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600">Last Updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                RateMyAdjusters LLC (&quot;RateMyAdjusters,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website
                ratemyadjusters.com (the &quot;Site&quot;). This Privacy Policy explains how we collect, use, disclose,
                and protect information about you when you visit our Site or use our services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy is provided for general informational purposes only and does not constitute legal
                advice. By accessing or using our Site, you agree to this Privacy Policy. If you do not agree with our
                practices, please do not use our Site.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nothing in this Privacy Policy is intended to create, and does not create, any contractual,
                fiduciary, or attorney–client relationship between you and RateMyAdjusters LLC.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.1 Information About Insurance Adjusters
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Site displays information about licensed insurance adjusters. This information is collected from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Public Records:</strong> We aggregate publicly available license data from state insurance
                  department databases, including names, license numbers, license status, license type, issue dates,
                  expiration dates (when available), and business cities/states.
                </li>
                <li>
                  <strong>User Submissions:</strong> Users may submit information to add adjusters not yet in our
                  database.
                </li>
                <li>
                  <strong>User Reviews:</strong> We display reviews submitted by users and, where applicable, reviews
                  compiled from publicly available online sources such as forums and discussion boards.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Privacy Protection for Adjusters:</strong> We do not publicly display personal contact
                information (phone numbers, email addresses, or specific street addresses) for adjusters, even when such
                information exists in public records. In our public interface, such fields may be labeled as &quot;Not
                Available for Display&quot; or similar. Internal records, where maintained, are used only for limited
                purposes such as verification, fraud prevention, or compliance.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">2.2 Information You Provide to Us</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information you voluntarily provide, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Account Information:</strong> If you create an account, we may collect your email address and
                  display name.
                </li>
                <li>
                  <strong>Reviews:</strong> When you submit a review, we collect the review content, ratings, claim
                  type, claim outcome, and your selected reviewer type (homeowner, contractor, or public adjuster).
                </li>
                <li>
                  <strong>Profile Claims:</strong> If you are an adjuster claiming your profile, we collect the
                  verification information you choose to provide so we can attempt to confirm your identity and
                  association with that profile.
                </li>
                <li>
                  <strong>Contact Forms:</strong> If you contact us through a web form on the Site, we collect the
                  information you submit (such as your name, approximate role, and the content of your message).
                  Messages submitted through web forms may be routed internally for handling and record-keeping.
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                2.3 Information Collected Automatically
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our Site, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Device Information:</strong> Browser type, operating system, device type, and similar
                  technical details.
                </li>
                <li>
                  <strong>Usage Information:</strong> Pages viewed, time spent on pages, referring URLs, and general
                  interaction patterns on the Site.
                </li>
                <li>
                  <strong>IP Address:</strong> We may log IP addresses for a limited period for security, fraud
                  prevention, abuse detection, and diagnostics. IP addresses may also be used in aggregate form for
                  analytics. We do not publicly display visitor IP addresses.
                </li>
                <li>
                  <strong>Cookies and Similar Technologies:</strong> As described in Section 6, we use cookies and
                  similar technologies to operate and improve the Site.
                </li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Operate, maintain, and improve our Site and services</li>
                <li>Display adjuster profiles and reviews</li>
                <li>Process and publish user-submitted reviews</li>
                <li>Create and manage user accounts</li>
                <li>Handle profile claims and related communications</li>
                <li>Respond to inquiries and requests submitted through our web forms</li>
                <li>Detect, prevent, and address fraud, abuse, and security issues</li>
                <li>Analyze usage trends and improve user experience</li>
                <li>Comply with applicable laws and regulations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We may also use aggregated or de-identified information (which does not identify you personally) for
                research, reporting, or product development.
              </p>
            </section>

            {/* How We Share Information */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell your personal information. We may share information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Public Content:</strong> Reviews you submit are publicly displayed on our Site along with your
                  display name (or &quot;Anonymous&quot; if that option is used) and reviewer type.
                </li>
                <li>
                  <strong>Service Providers:</strong> We share information with third-party service providers who
                  perform services on our behalf (for example, hosting, analytics, email infrastructure, or security).
                  These providers are expected to use the information only as necessary to provide services to us.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose information if we believe in good faith that such
                  disclosure is required or permitted by law, regulation, legal process, or governmental request, or if
                  we believe disclosure is reasonably necessary to protect our rights, property, or the safety of our
                  users or the public.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale
                  of all or a portion of our assets, information may be transferred as part of that transaction, subject
                  to similar privacy protections.
                </li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain information for as long as reasonably necessary to provide our services, support our business
                operations, and fulfill the purposes described in this Privacy Policy, unless a longer retention period
                is required or permitted by law.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Adjuster Profiles:</strong> Retained as part of our public database and updated periodically
                  from public records or other lawful sources.
                </li>
                <li>
                  <strong>Reviews:</strong> Retained as part of the public record of user-submitted experiences unless
                  removed for policy violations or as required by law.
                </li>
                <li>
                  <strong>Account Information:</strong> Retained while your account is active and for a reasonable
                  period thereafter, or until you request deletion, subject to legal requirements.
                </li>
                <li>
                  <strong>Server Logs:</strong> Retained for a limited period (generally up to 90 days) for security,
                  debugging, and operational purposes.
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar technologies to support and improve the Site. Cookies are small text files
                stored on your device.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>We use cookies to:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Keep you logged in to your account (where applicable)</li>
                <li>Remember your preferences</li>
                <li>Understand how visitors use our Site</li>
                <li>Improve our services and features</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Types of Cookies We May Use:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Essential Cookies:</strong> Required for the Site to function (e.g., authentication, security,
                  basic features).
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors interact with the Site so we can
                  improve performance and usability.
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. If you disable cookies, some features of the Site
                may not function properly.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">7. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Site may use third-party services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Supabase:</strong> Database hosting, storage, and authentication services.
                </li>
                <li>
                  <strong>Vercel:</strong> Website hosting and content delivery.
                </li>
                <li>
                  <strong>Cloudflare:</strong> Security, DDoS protection, and content delivery network services.
                </li>
                <li>
                  <strong>Analytics Providers:</strong> Tools that help us understand Site usage and performance.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                These third parties have their own privacy policies and terms, which govern their use of your
                information. We encourage you to review those policies where relevant.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location and applicable law, you may have certain rights regarding your personal
                information, which may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Access:</strong> Request information about the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate information.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of certain personal information, subject to legal
                  retention requirements and our need to maintain a record of Site activity.
                </li>
                <li>
                  <strong>Opt-Out:</strong> Opt out of receiving any optional communications that you previously opted
                  into.
                </li>
                <li>
                  <strong>Data Portability:</strong> Request, where applicable, a copy of your personal information in a
                  portable format.
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>For Insurance Adjusters:</strong> If you are an insurance adjuster and wish to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Claim your profile and respond to reviews</li>
                <li>Request correction of inaccurate license or profile information</li>
                <li>Report a review that you believe violates our guidelines</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can use the &quot;Claim Profile&quot; feature on your profile page where available, or contact us
                through our web form as described in Section 14. We may request supporting documentation as part of any
                correction or claim process.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Defamation and Abuse Reports:</strong> Requests regarding alleged defamation, harassment, or 
                other abuse on the Site may be handled under our{' '}
                <Link href="/review-guidelines" className="text-blue-600 hover:text-blue-700">Review Guidelines</Link> and{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms of Service</Link>, which govern 
                what content is permitted and how we process reports.
              </p>
            </section>

            {/* Security */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">9. Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement reasonable technical and organizational measures designed to protect the information we
                collect, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Use of HTTPS/TLS to encrypt data in transit</li>
                <li>Access controls and authentication for administrative tools</li>
                <li>Use of reputable hosting and security providers</li>
                <li>Monitoring for unusual or abusive activity</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the Internet or method of electronic storage is completely
                secure. We cannot guarantee absolute security of any information transmitted to or from the Site.
              </p>
            </section>

            {/* Children */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Site is not intended for children under 13 years of age, and we do not knowingly collect personal
                information from children under 13. If you believe we have collected information from a child under 13,
                please contact us so we can take appropriate action.
              </p>
            </section>

            {/* California */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. California Privacy Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you are a California resident, you may have additional rights under the California Consumer Privacy
                Act (CCPA) or similar state laws, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Right to know what categories of personal information we collect and how we use it</li>
                <li>Right to request access to and deletion of certain personal information</li>
                <li>Right to know whether we sell personal information (we do not sell personal information)</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, you may contact us using our web form as described in Section 14. We may need
                to verify your identity before responding to certain requests.
              </p>
            </section>

            {/* International */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">12. International Users</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Site is operated from the United States. If you are accessing the Site from outside the United
                States, please be aware that your information may be transferred to, stored, and processed in the United
                States or other countries where our service providers are located. By using the Site, you consent to
                such transfers.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last
                Updated&quot; date at the top of this page. In some cases, we may provide additional notice (such as a
                banner on the Site). Your continued use of the Site after any changes become effective constitutes your
                acceptance of the revised Privacy Policy.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have questions about this Privacy Policy or our privacy practices, you may contact us using our
                secure online form:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  <strong>RateMyAdjusters LLC</strong>
                </p>
                <p className="text-gray-700 mb-3">
                  For all privacy-related inquiries, please use our secure contact form:<br />
                  <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                    ratemyadjusters.com/contact
                  </Link>
                </p>
                <p className="text-gray-500 text-sm">
                  To protect user and staff privacy, we do not publish a direct email address. 
                  All inquiries are securely routed to our privacy team.
                </p>
              </div>
              <p className="text-gray-500 text-xs mt-4 leading-relaxed">
                Communications submitted through the Site&apos;s contact form are for general inquiries only and do not
                create any professional, fiduciary, or attorney–client relationship. We do not guarantee a response to
                any particular inquiry and do not undertake any obligation to preserve or provide copies of such
                communications except as required by applicable law.
              </p>
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
