import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is an Insurance Adjuster? | RateMyAdjusters',
  description: 'Learn what insurance adjusters do, their role in the claims process, how they evaluate property damage, and what to expect when working with one.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/what-is-an-insurance-adjuster',
  },
  openGraph: {
    title: 'What Is an Insurance Adjuster?',
    description: 'Learn what insurance adjusters do and their role in the claims process.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What does an insurance adjuster do?',
    answer: 'An insurance adjuster evaluates property damage claims on behalf of an insurance company. They inspect damaged property, review policy coverage, document findings, estimate repair costs, and help determine the settlement amount based on policy terms.',
  },
  {
    question: 'Who pays the insurance adjuster?',
    answer: 'Staff adjusters and independent adjusters are paid by the insurance company. Public adjusters, on the other hand, are hired and paid by the policyholder, typically as a percentage of the claim settlement.',
  },
  {
    question: 'Can I choose my own insurance adjuster?',
    answer: 'In most cases, the insurance company assigns an adjuster to your claim. However, you may have the option to hire a public adjuster to represent your interests. Public adjusters work for the policyholder, not the insurance company.',
  },
  {
    question: 'How long does an adjuster have to respond to a claim?',
    answer: 'Response times vary by state and insurer. Many states have regulations requiring insurers to acknowledge claims within a certain timeframe, often 15 to 30 days. Contact your insurance company or state insurance department for specific requirements.',
  },
  {
    question: 'What should I do before the adjuster arrives?',
    answer: 'Before your adjuster visit, document all damage with photos and videos, make temporary repairs to prevent further damage (keeping receipts), gather relevant documents like your policy and previous repair records, and prepare a list of damaged items.',
  },
  {
    question: 'Can I disagree with the adjuster\'s assessment?',
    answer: 'Yes. If you believe the assessment does not accurately reflect your damages, you can provide additional documentation, request a re-inspection, or file an appeal through your insurance company. You may also consider hiring a public adjuster or consulting with a licensed professional.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'What Is an Insurance Adjuster?', item: 'https://ratemyadjusters.com/guides/what-is-an-insurance-adjuster' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is an Insurance Adjuster?',
  description: 'Learn what insurance adjusters do, their role in the claims process, and what to expect when working with one.',
  author: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
  },
  publisher: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
    url: 'https://ratemyadjusters.com',
  },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/what-is-an-insurance-adjuster',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function WhatIsAnInsuranceAdjusterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/guides" className="text-gray-500 hover:text-gray-700">Guides</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">What Is an Insurance Adjuster?</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Claims Basics</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What Is an Insurance Adjuster?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Understanding the role of insurance adjusters can help you navigate the claims process more effectively. 
              This guide explains what adjusters do, the different types, and what to expect during your claim.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">The Role of an Insurance Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              An insurance adjuster is a professional who evaluates property damage claims on behalf of an insurance company. 
              When you file a claim for damage to your home or property, an adjuster is typically assigned to assess the situation, 
              document the damage, and help determine the appropriate settlement based on your policy terms.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Adjusters serve as intermediaries between policyholders and insurance companies. Their primary responsibility is to 
              investigate claims, verify coverage, and prepare estimates for repairs or replacement. The adjuster's findings generally 
              form the basis for the insurance company's settlement offer.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Note:</strong> Insurance adjusters are licensed professionals. Licensing requirements vary by state, 
                and most states require adjusters to pass an examination and maintain continuing education credits.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Types of Insurance Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              There are several types of insurance adjusters, each with a different relationship to the insurance company and policyholder:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Staff Adjusters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Staff adjusters are employees of an insurance company. They work exclusively for their employer and handle claims 
              for that company's policyholders. Staff adjusters typically receive a salary and benefits from the insurance company.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Independent Adjusters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Independent adjusters are contractors who work for multiple insurance companies. They are often called upon during 
              high-volume periods, such as after natural disasters, when insurance companies need additional resources to handle 
              the influx of claims.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Public Adjusters</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike staff and independent adjusters, public adjusters work for the policyholder, not the insurance company. 
              Homeowners may choose to hire a public adjuster to represent their interests during the claims process. Public 
              adjusters typically charge a percentage of the claim settlement as their fee.
            </p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm">
                <strong>State Variations:</strong> The claims process and adjuster licensing requirements vary by state. 
                Some states have specific regulations regarding response times, documentation requirements, and adjuster conduct. 
                Contact your state's department of insurance for information specific to your location.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What to Expect During an Adjuster Visit</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When an adjuster is assigned to your claim, they will typically schedule an inspection of your property. 
              During this visit, you can generally expect the adjuster to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Examine and photograph the damaged areas</li>
              <li>Take measurements and notes about the extent of damage</li>
              <li>Ask questions about the incident and circumstances</li>
              <li>Review relevant documentation you provide</li>
              <li>Explain the next steps in the claims process</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              It can be helpful to be present during the inspection so you can point out all areas of damage and ask questions 
              about the process. You may also want to have your own documentation ready, including photos, videos, and any 
              receipts for emergency repairs you've made.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How Adjusters Evaluate Claims</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Insurance adjusters use several factors when evaluating a claim:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Policy coverage:</strong> Reviewing what your policy covers and any applicable deductibles or limits</li>
              <li><strong>Cause of damage:</strong> Determining what caused the damage and whether it's covered under your policy</li>
              <li><strong>Extent of damage:</strong> Assessing the scope and severity of the damage</li>
              <li><strong>Repair estimates:</strong> Calculating the cost to repair or replace damaged property</li>
              <li><strong>Documentation:</strong> Reviewing photos, receipts, and other evidence related to the claim</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Tip:</strong> Maintaining thorough documentation throughout the claims process can help ensure your 
                damage is accurately assessed. Consider keeping a file with all correspondence, photos, estimates, and receipts.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights During the Claims Process</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As a policyholder, you generally have certain rights during the claims process. While these vary by state and policy, 
              they may include the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Receive timely communication about your claim status</li>
              <li>Obtain a copy of your policy and claim documentation</li>
              <li>Request a re-inspection if you believe damage was missed</li>
              <li>Appeal a claim decision through your insurance company</li>
              <li>Hire a public adjuster or other professional to represent you</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about your rights or the claims process, your insurance company's customer service department 
              or your state's department of insurance can provide guidance.
            </p>

            {/* FAQs */}
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

          {/* Continue Research CTA */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Continue Your Research</h2>
            <p className="text-gray-600 mb-6">
              Learn more about insurance adjusters and the claims process with these resources.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/search"
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
              >
                <Users className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-700">Search Adjusters</div>
                  <div className="text-sm text-gray-500">Find adjusters by name or location</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 ml-auto" />
              </Link>
              <Link
                href="/guides"
                className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
              >
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
                <Link href="/adjusters/texas" className="text-sm text-blue-600 hover:text-blue-700">Texas Adjusters →</Link>
                <Link href="/adjusters/florida" className="text-sm text-blue-600 hover:text-blue-700">Florida Adjusters →</Link>
                <Link href="/adjusters/california" className="text-sm text-blue-600 hover:text-blue-700">California Adjusters →</Link>
                <Link href="/companies" className="text-sm text-blue-600 hover:text-blue-700">Browse by Company →</Link>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-500 leading-relaxed">
              This guide is for general informational purposes only and does not constitute legal, financial, or professional advice. 
              Insurance policies and regulations vary by state and insurer. For specific questions about your policy or claim, 
              please consult your insurance company or a licensed professional. RateMyAdjusters does not evaluate or rate 
              insurance companies or adjusters. Reviews on our platform reflect individual user experiences.
            </p>
          </div>
        </article>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
