import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Communicate with Your Insurance Adjuster | RateMyAdjusters',
  description: 'Learn effective communication strategies when working with your insurance adjuster. Understand how to prepare for meetings, ask questions, and document your interactions.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/how-to-negotiate-with-adjuster',
  },
  openGraph: {
    title: 'How to Communicate with Your Insurance Adjuster',
    description: 'Learn effective communication strategies when working with your insurance adjuster.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What should I say when I first meet the adjuster?',
    answer: 'When you first meet your adjuster, be polite and professional. Provide factual information about what happened and the damage to your property. Let them know you are available to answer questions and show them the affected areas. You do not need to speculate about causes or provide unnecessary details.',
  },
  {
    question: 'Should I accept the first settlement offer?',
    answer: 'You are not required to accept the first settlement offer. Take time to review the estimate carefully and compare it to your own documentation and any contractor estimates you have obtained. If you believe the offer does not adequately cover your damages, you can provide additional information and request reconsideration.',
  },
  {
    question: 'Can I have someone with me during the adjuster inspection?',
    answer: 'Yes, you can generally have someone present during the inspection, such as a family member, contractor, or public adjuster if you have hired one. Having another person present can help ensure all damage is documented and provide an additional perspective on the inspection.',
  },
  {
    question: 'How should I follow up if I have not heard back from my adjuster?',
    answer: 'If you have not received a response within a reasonable timeframe, follow up in writing (email is often preferable) to create a record. Be polite but clear about what information you are waiting for. If continued delays occur, you may contact your insurance company\'s customer service or claims department.',
  },
  {
    question: 'What if I disagree with the adjuster\'s findings?',
    answer: 'If you disagree with the adjuster\'s assessment, provide specific information and documentation that supports your position. You can request a re-inspection, provide independent contractor estimates, or submit additional evidence. If disagreements persist, you may consider hiring a public adjuster or using your insurer\'s dispute resolution process.',
  },
  {
    question: 'Should I sign documents the adjuster provides?',
    answer: 'Read any documents carefully before signing. You may be asked to sign acknowledgments, authorizations, or settlement agreements. Understand what you are agreeing to before signing. If you are unsure about any document, ask for clarification or take time to review it before signing.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'How to Communicate with Your Adjuster', item: 'https://ratemyadjusters.com/guides/how-to-negotiate-with-adjuster' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Communicate with Your Insurance Adjuster',
  description: 'Learn effective communication strategies when working with your insurance adjuster.',
  author: { '@type': 'Organization', name: 'RateMyAdjusters' },
  publisher: { '@type': 'Organization', name: 'RateMyAdjusters', url: 'https://ratemyadjusters.com' },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/how-to-negotiate-with-adjuster',
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

export default function HowToNegotiateWithAdjusterPage() {
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
              <span className="text-gray-900 font-medium">How to Communicate with Your Adjuster</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Claims Process</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">How to Communicate with Your Insurance Adjuster</h1>
            <p className="text-xl text-gray-600 leading-relaxed">Effective communication with your insurance adjuster can help facilitate a smoother claims process. This guide provides practical tips for preparing for adjuster interactions and ensuring clear, productive communication throughout your claim.</p>
          </header>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Your Adjuster's Role</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Before communicating with your adjuster, it helps to understand their role in the claims process. Insurance adjusters are professionals who:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Inspect and document property damage</li>
              <li>Review policy coverage and terms</li>
              <li>Prepare estimates for repairs or replacement</li>
              <li>Help determine appropriate settlement amounts</li>
              <li>Serve as a point of contact during your claim</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">Approaching your interactions with this understanding can help set appropriate expectations and facilitate productive conversations.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Preparing for the Adjuster's Visit</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Being well-prepared for your adjuster's inspection can help ensure all damage is documented and your questions are addressed:</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Before the Visit</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Review your insurance policy to understand your coverage</li>
              <li>Organize your documentation (photos, videos, receipts for temporary repairs)</li>
              <li>Prepare a list of all damaged items with descriptions and estimated values</li>
              <li>Write down questions you want to ask the adjuster</li>
              <li>Ensure all damaged areas are accessible for inspection</li>
              <li>Consider obtaining independent contractor estimates for comparison</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm"><strong>Tip:</strong> Create a claim file or folder where you keep all related documents, correspondence, and notes. This will help you stay organized throughout the process.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">During the Visit</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Be present during the entire inspection when possible</li>
              <li>Walk through the property with the adjuster to point out damage</li>
              <li>Provide factual information without speculation</li>
              <li>Take your own notes and photos during the inspection</li>
              <li>Ask questions about the process and timeline</li>
              <li>Get the adjuster's contact information for follow-up</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Communication Best Practices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Maintaining professional, clear communication throughout the claims process can help things move more smoothly:</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Be Professional and Courteous</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Even if you are frustrated, maintaining a professional tone helps keep the focus on resolving your claim. Adjusters are more likely to be responsive when communication remains respectful and constructive.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Be Clear and Specific</h3>
            <p className="text-gray-700 leading-relaxed mb-4">When describing damage or asking questions, be as specific as possible. Instead of general statements, provide concrete details that can help the adjuster understand your situation and needs.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Document Everything</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Keep written records of all communications:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Note the date, time, and content of phone conversations</li>
              <li>Save copies of all emails and written correspondence</li>
              <li>Follow up verbal conversations with written confirmation</li>
              <li>Keep a log of all claim-related activities</li>
            </ul>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm"><strong>State Variations:</strong> Insurance claim procedures and communication requirements may vary by state. Some states have specific regulations regarding response times and claim handling procedures. Your state's department of insurance can provide information about requirements in your jurisdiction.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Ask Questions</h3>
            <p className="text-gray-700 leading-relaxed mb-4">Do not hesitate to ask questions throughout the process. Consider asking:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>What is the expected timeline for my claim?</li>
              <li>What documentation do you need from me?</li>
              <li>How was the estimate calculated?</li>
              <li>What does my policy cover in this situation?</li>
              <li>What are my options if I disagree with the assessment?</li>
              <li>What are the next steps in the process?</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reviewing Settlement Offers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">When you receive a settlement offer or estimate from your adjuster, take time to review it carefully:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Compare the estimate to your own documentation and contractor estimates</li>
              <li>Check that all damaged items and areas are included</li>
              <li>Review the calculations and pricing used</li>
              <li>Understand what is and is not covered</li>
              <li>Ask questions about anything unclear</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm"><strong>Note:</strong> You are not required to accept the first offer. If you believe the estimate does not accurately reflect your damages, you can provide additional documentation and request reconsideration.</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">If You Disagree with the Assessment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">If you believe the adjuster's assessment does not accurately reflect your damage or loss, you have several options:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Provide additional documentation:</strong> Submit photos, contractor estimates, or other evidence</li>
              <li><strong>Request a re-inspection:</strong> Ask the adjuster to take another look at specific areas</li>
              <li><strong>Ask for a detailed explanation:</strong> Understand the reasoning behind the assessment</li>
              <li><strong>Use the appeals process:</strong> Most insurance companies have formal dispute procedures</li>
              <li><strong>Consider professional help:</strong> A public adjuster can provide an independent assessment</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Summary: Key Communication Points</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Be prepared with documentation before meetings</li>
              <li>Maintain a professional, courteous tone</li>
              <li>Be specific and factual in your communications</li>
              <li>Document all interactions in writing</li>
              <li>Ask questions when you need clarification</li>
              <li>Review offers carefully before responding</li>
              <li>Know your options if you disagree with assessments</li>
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
                <Link href="/guides/how-to-file-insurance-claim" className="text-sm text-blue-600 hover:text-blue-700">How to File a Claim →</Link>
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
