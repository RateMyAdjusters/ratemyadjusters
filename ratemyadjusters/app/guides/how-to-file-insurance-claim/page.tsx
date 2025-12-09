import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to File an Insurance Claim: A Step-by-Step Guide | RateMyAdjusters',
  description: 'Learn how to file a homeowner\'s insurance claim step by step. Understand the claims process, what documentation to gather, and how to work effectively with your adjuster.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/how-to-file-insurance-claim',
  },
  openGraph: {
    title: 'How to File an Insurance Claim: A Step-by-Step Guide',
    description: 'Learn how to file a homeowner\'s insurance claim and navigate the claims process.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'How soon should I file an insurance claim after damage occurs?',
    answer: 'It is generally advisable to report damage to your insurance company as soon as reasonably possible. Many policies have time limits for reporting claims, and prompt reporting allows the insurance company to assess the damage while evidence is still fresh.',
  },
  {
    question: 'What information do I need to file a claim?',
    answer: 'You will typically need your policy number, the date and description of the damage, photos or videos of the damage, a list of damaged items with estimated values, and any relevant documentation such as police reports for theft or vandalism.',
  },
  {
    question: 'Should I make repairs before the adjuster inspects the damage?',
    answer: 'You should make reasonable temporary repairs to prevent further damage to your property, but avoid making permanent repairs until the adjuster has inspected and documented the damage. Keep all receipts for any temporary repairs you make.',
  },
  {
    question: 'How long does the claims process typically take?',
    answer: 'The timeline varies depending on the complexity of the claim, the extent of damage, and your insurance company\'s processes. Simple claims may be resolved in a few weeks, while complex claims could take several months. Your state may have regulations regarding claim response times.',
  },
  {
    question: 'What if I disagree with the claim settlement offer?',
    answer: 'If you believe the settlement offer does not adequately cover your damages, you can provide additional documentation, request a re-inspection, or file an appeal through your insurance company. You may also consider consulting with a public adjuster or other licensed professional.',
  },
  {
    question: 'Will filing a claim increase my insurance premium?',
    answer: 'Filing a claim may or may not affect your premium, depending on your policy, claims history, the type of claim, and your insurance company\'s policies. Some insurers offer claim forgiveness programs. Contact your insurance company for information about how claims may affect your specific policy.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'How to File an Insurance Claim', item: 'https://ratemyadjusters.com/guides/how-to-file-insurance-claim' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to File an Insurance Claim: A Step-by-Step Guide',
  description: 'Learn how to file a homeowner\'s insurance claim and navigate the claims process effectively.',
  author: { '@type': 'Organization', name: 'RateMyAdjusters' },
  publisher: { '@type': 'Organization', name: 'RateMyAdjusters', url: 'https://ratemyadjusters.com' },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/how-to-file-insurance-claim',
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

export default function HowToFileInsuranceClaimPage() {
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
              <span className="text-gray-900 font-medium">How to File an Insurance Claim</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Claims Process</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">How to File an Insurance Claim: A Step-by-Step Guide</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Filing an insurance claim can feel overwhelming, especially after experiencing property damage. This guide walks you through the general process of filing a homeowner's insurance claim and what to expect along the way.</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Before You File: Immediate Steps</h2>
            <p className="text-gray-700 leading-relaxed mb-4">When property damage occurs, there are several steps you can take before formally filing your claim:</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Ensure Safety First</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Your safety and the safety of your family should be the top priority. If there is significant damage to your home, ensure everyone is safe and, if necessary, contact emergency services. Do not enter areas that may be structurally unsafe.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Document the Damage</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Before making any repairs or cleaning up, document the damage thoroughly:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Take photos and videos of all damaged areas from multiple angles</li>
              <li>Document damaged personal property, including brand names and estimated values</li>
              <li>Note the date and time the damage occurred, if known</li>
              <li>Keep any damaged items as evidence when possible</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm"><strong>Tip:</strong> Use your smartphone to take date-stamped photos and videos. Consider creating a folder or album specifically for claim documentation to keep everything organized.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Make Temporary Repairs</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Take reasonable steps to prevent further damage to your property. This might include covering broken windows or damaged roofs with tarps, turning off water to prevent flooding, or moving undamaged items away from affected areas. Keep all receipts for materials and services related to temporary repairs.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 1: Review Your Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Before filing your claim, review your insurance policy to understand what types of damage are covered, your deductible amount, coverage limits for different types of property, any exclusions that may apply, and time limits for reporting claims.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 2: Contact Your Insurance Company</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Report the damage to your insurance company as soon as reasonably possible. You can typically do this by calling the claims phone number, filing online through your insurer's website or app, or contacting your insurance agent directly.</p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm"><strong>State Variations:</strong> Claims procedures and timelines may vary by state and insurance company. Some states have specific regulations about how quickly insurance companies must respond to claims. Check with your state's department of insurance for requirements in your area.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 3: Meet with the Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">After you file your claim, the insurance company will assign an adjuster to evaluate your damage. To prepare for the adjuster's visit, have your documentation ready, prepare a list of damaged items, make sure all damaged areas are accessible, and be present during the inspection.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 4: Receive and Review the Estimate</h2>
            <p className="text-gray-700 leading-relaxed mb-4">After the inspection, the adjuster will prepare an estimate of the repair costs. Review this documentation carefully. If you have questions or believe something is missing, contact your adjuster or insurance company to discuss your concerns.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step 5: Settlement and Repairs</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Once you accept the settlement offer, you can proceed with repairs. Keep records of all repair work, including contracts, invoices, and receipts, as your insurance company may request documentation.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tips for a Smoother Claims Process</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Communicate promptly:</strong> Respond to requests from your insurance company in a timely manner</li>
              <li><strong>Keep records:</strong> Maintain copies of all documents, correspondence, and receipts</li>
              <li><strong>Ask questions:</strong> Don't hesitate to ask for clarification if something is unclear</li>
              <li><strong>Follow up:</strong> If you haven't heard back within expected timeframes, follow up</li>
              <li><strong>Stay organized:</strong> Create a dedicated file for all claim-related documents</li>
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
                <Link href="/guides/what-is-an-insurance-adjuster" className="text-sm text-blue-600 hover:text-blue-700">What Is an Insurance Adjuster? →</Link>
                <Link href="/guides/claim-denied-what-to-do" className="text-sm text-blue-600 hover:text-blue-700">What If Your Claim Is Denied? →</Link>
                <Link href="/adjusters" className="text-sm text-blue-600 hover:text-blue-700">Browse by State →</Link>
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
