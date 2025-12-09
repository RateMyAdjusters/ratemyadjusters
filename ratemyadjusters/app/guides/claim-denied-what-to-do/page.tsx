import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What to Do If Your Insurance Claim Is Denied | RateMyAdjusters',
  description: 'Learn your options if your homeowner\'s insurance claim is denied. Understand the appeals process, how to request reconsideration, and when to seek professional assistance.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/claim-denied-what-to-do',
  },
  openGraph: {
    title: 'What to Do If Your Insurance Claim Is Denied',
    description: 'Learn your options if your homeowner\'s insurance claim is denied.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'Why was my insurance claim denied?',
    answer: 'Claims may be denied for various reasons, including damage not covered under your policy, filing after the deadline, insufficient documentation, unpaid premiums, or the damage being attributed to a cause excluded in your policy. The denial letter from your insurance company should explain the specific reason.',
  },
  {
    question: 'Can I appeal a denied insurance claim?',
    answer: 'Yes, in most cases you can appeal a denied claim. The appeals process typically involves submitting a written request for reconsideration along with additional documentation or information that supports your claim. Your insurance company should provide information about their appeals process.',
  },
  {
    question: 'How long do I have to appeal a denied claim?',
    answer: 'Timeframes for appeals vary by insurance company and state. Many insurers have specific deadlines for filing appeals, often ranging from 30 to 180 days. Check your policy documents and denial letter for specific deadlines, and consider contacting your state\'s department of insurance for regulatory requirements.',
  },
  {
    question: 'Should I hire a public adjuster or attorney for a denied claim?',
    answer: 'The decision to hire professional help depends on your specific situation, including the complexity of your claim, the amount at stake, and your comfort level with handling the appeals process yourself. Both public adjusters and attorneys can provide assistance, but they have different roles and fee structures.',
  },
  {
    question: 'What is the difference between a denial and an underpayment?',
    answer: 'A denial means the insurance company has rejected your claim entirely, while an underpayment means they have agreed to cover some damages but you believe the settlement amount is insufficient. Both situations may be addressed through your insurer\'s dispute resolution process.',
  },
  {
    question: 'Can I file a complaint with my state insurance department?',
    answer: 'Yes, if you believe your claim was handled improperly, you can file a complaint with your state\'s department of insurance. They can investigate whether the insurance company followed proper procedures and applicable regulations. This is separate from the appeals process with your insurer.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Claim Denied: What to Do', item: 'https://ratemyadjusters.com/guides/claim-denied-what-to-do' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What to Do If Your Insurance Claim Is Denied',
  description: 'Learn your options if your homeowner\'s insurance claim is denied.',
  author: { '@type': 'Organization', name: 'RateMyAdjusters' },
  publisher: { '@type': 'Organization', name: 'RateMyAdjusters', url: 'https://ratemyadjusters.com' },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/claim-denied-what-to-do',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function ClaimDeniedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/guides" className="text-gray-500 hover:text-gray-700">Guides</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Claim Denied: What to Do</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Claims Process</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">What to Do If Your Insurance Claim Is Denied</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Receiving a claim denial can be frustrating and stressful. However, a denial is not necessarily the final word. This guide explains your options and the steps you can take if your insurance claim has been denied.</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Your Denial</h2>
            <p className="text-gray-700 leading-relaxed mb-4">When an insurance company denies a claim, they are required to provide an explanation. The first step is to carefully review the denial letter to understand the specific reason your claim was not approved.</p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Common Reasons for Claim Denials</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Claims may be denied for various reasons, including:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Coverage exclusions:</strong> The type of damage may not be covered under your policy</li>
              <li><strong>Policy lapse:</strong> Coverage may have lapsed due to non-payment of premiums</li>
              <li><strong>Filing deadlines:</strong> The claim may have been filed after the policy's deadline</li>
              <li><strong>Insufficient documentation:</strong> The claim may lack adequate evidence of damage or loss</li>
              <li><strong>Pre-existing damage:</strong> The damage may have existed before the covered event</li>
              <li><strong>Maintenance issues:</strong> The damage may be attributed to lack of maintenance rather than a covered peril</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm"><strong>Note:</strong> Understanding the specific reason for denial is essential before deciding on next steps. If the denial letter is unclear, contact your insurance company to request a detailed explanation.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Review Your Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">After receiving a denial, carefully review your insurance policy. Look for:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Coverage terms related to your type of damage</li>
              <li>Exclusions that may apply to your situation</li>
              <li>Definitions of key terms used in the denial letter</li>
              <li>Deadlines and procedures for appeals</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">Comparing your policy language to the denial reason can help you determine whether you have grounds to challenge the decision.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Gather Additional Documentation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">If you believe your claim was denied in error, collect any additional evidence that supports your position:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Additional photos or videos of damage</li>
              <li>Repair estimates from licensed contractors</li>
              <li>Expert opinions or reports (e.g., from engineers or restoration specialists)</li>
              <li>Weather reports or incident documentation</li>
              <li>Maintenance records that show proper upkeep</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Contact Your Insurance Company</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Before filing a formal appeal, consider contacting your insurance company to discuss the denial. Sometimes issues can be resolved through direct communication:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Ask for clarification on the denial reason</li>
              <li>Inquire about what additional information might support your claim</li>
              <li>Request a re-inspection if you believe damage was missed</li>
              <li>Ask about the formal appeals process and deadlines</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">Keep records of all communications, including dates, names of representatives, and what was discussed.</p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm"><strong>State Variations:</strong> Insurance regulations, including requirements for denial notifications and appeals processes, vary by state. Your state's department of insurance can provide information about specific requirements and your rights as a policyholder in your jurisdiction.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: File a Formal Appeal</h2>
            <p className="text-gray-700 leading-relaxed mb-4">If direct communication does not resolve the issue, you can file a formal appeal with your insurance company. An effective appeal typically includes:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>A written letter explaining why you believe the denial was incorrect</li>
              <li>Reference to specific policy language that supports your claim</li>
              <li>All supporting documentation and evidence</li>
              <li>A clear request for reconsideration</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">Submit your appeal within any deadlines specified in your policy or denial letter, and keep copies of everything you send.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 5: Consider Professional Assistance</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Depending on your situation, you may want to consider professional help:</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Public Adjusters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Public adjusters are licensed professionals who represent policyholders in insurance claims. They can review your claim, gather evidence, and negotiate with the insurance company on your behalf. Public adjusters typically charge a percentage of the settlement.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Insurance Attorneys</h3>
            <p className="text-gray-700 leading-relaxed mb-4">For complex situations or significant claims, consulting with an attorney who specializes in insurance matters may be appropriate. An attorney can advise you on your legal options and represent you if litigation becomes necessary.</p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm"><strong>Note:</strong> Before hiring any professional, research their credentials, understand their fee structure, and ensure they are properly licensed in your state.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 6: File a Complaint with Your State</h2>
            <p className="text-gray-700 leading-relaxed mb-4">If you believe your insurance company has not handled your claim properly, you can file a complaint with your state's department of insurance. State regulators can:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Investigate whether the insurance company followed proper procedures</li>
              <li>Ensure compliance with state insurance regulations</li>
              <li>Mediate disputes between policyholders and insurers</li>
              <li>Take action against insurers who violate regulations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">Filing a complaint is separate from your appeal with the insurance company and can often be done concurrently.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Important Considerations</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Act promptly:</strong> Be aware of deadlines for appeals and legal action</li>
              <li><strong>Document everything:</strong> Keep copies of all correspondence and records</li>
              <li><strong>Stay professional:</strong> Maintain professional communication throughout the process</li>
              <li><strong>Know your rights:</strong> Familiarize yourself with your state's insurance regulations</li>
              <li><strong>Get expert opinions:</strong> Independent assessments can strengthen your case</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Your Research</h2>
            <p className="text-gray-600 mb-6">Learn more about insurance adjusters and the claims process.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link href="/search" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">Search Adjusters</div>
                  <div className="text-sm text-gray-500">Find adjusters by name or location</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto" />
              </Link>
              <Link href="/guides" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">More Guides</div>
                  <div className="text-sm text-gray-500">Browse all educational resources</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto" />
              </Link>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                <Link href="/guides/what-is-a-public-adjuster" className="text-sm text-blue-600 hover:text-blue-700">What Is a Public Adjuster? →</Link>
                <Link href="/guides/how-to-file-insurance-claim" className="text-sm text-blue-600 hover:text-blue-700">How to File a Claim →</Link>
                <Link href="/companies" className="text-sm text-blue-600 hover:text-blue-700">Browse by Company →</Link>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-500 leading-relaxed">This guide is for general informational purposes only and does not constitute legal, financial, or professional advice. Insurance policies and regulations vary by state and insurer. For specific questions about your policy or claim, please consult your insurance company or a licensed professional.</p>
          </div>
        </article>

        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">RateMyAdjusters does not evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.</p>
          </div>
        </div>
      </main>
    </>
  )
}
