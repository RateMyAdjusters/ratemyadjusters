import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Is a Public Adjuster? | RateMyAdjusters',
  description: 'Learn what public adjusters do, how they differ from company adjusters, when homeowners may consider hiring one, and what to look for when selecting a public adjuster.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/what-is-a-public-adjuster',
  },
  openGraph: {
    title: 'What Is a Public Adjuster?',
    description: 'Learn what public adjusters do and how they differ from company adjusters.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What does a public adjuster do?',
    answer: 'A public adjuster is a licensed professional who represents policyholders in insurance claims. They inspect damage, document losses, prepare claim estimates, negotiate with the insurance company, and work to help the policyholder receive a fair settlement based on their policy terms.',
  },
  {
    question: 'How is a public adjuster different from the insurance company\'s adjuster?',
    answer: 'The insurance company\'s adjuster (staff or independent) represents the insurer, while a public adjuster represents you, the policyholder. Public adjusters are hired and paid by homeowners to advocate for their interests during the claims process.',
  },
  {
    question: 'How much do public adjusters charge?',
    answer: 'Public adjusters typically charge a percentage of the claim settlement, often ranging from 5% to 15% depending on the claim size, complexity, and state regulations. Some states cap public adjuster fees. Always review the contract terms before signing.',
  },
  {
    question: 'When should I consider hiring a public adjuster?',
    answer: 'Homeowners may consider hiring a public adjuster for complex claims, large losses, claims where they feel the initial estimate is insufficient, or when they lack time or expertise to manage the claims process themselves. It is a personal decision based on individual circumstances.',
  },
  {
    question: 'Are public adjusters licensed?',
    answer: 'Yes, public adjusters must be licensed in most states. Licensing requirements typically include passing an examination, meeting education requirements, and maintaining continuing education. You can verify a public adjuster\'s license through your state\'s department of insurance.',
  },
  {
    question: 'Can I hire a public adjuster after I\'ve already filed a claim?',
    answer: 'In many cases, yes. You can often hire a public adjuster at various stages of the claims process, including after you have already filed a claim or received an initial estimate. However, the fee structure may vary depending on when you hire them.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'What Is a Public Adjuster?', item: 'https://ratemyadjusters.com/guides/what-is-a-public-adjuster' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Is a Public Adjuster?',
  description: 'Learn what public adjusters do, how they differ from company adjusters, and when homeowners may consider hiring one.',
  author: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
  },
  publisher: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
    url: 'https://ratemyadjusters.com',
  },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/what-is-a-public-adjuster',
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

export default function WhatIsAPublicAdjusterPage() {
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
              <span className="text-gray-900 font-medium">What Is a Public Adjuster?</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Adjuster Types</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              What Is a Public Adjuster?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A public adjuster is a licensed professional who works on behalf of policyholders during insurance claims. 
              This guide explains what public adjusters do, how they differ from company adjusters, and what to consider 
              before hiring one.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding Public Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you file an insurance claim, the insurance company assigns an adjuster to evaluate your damage and 
              determine the settlement amount. This adjuster works for the insurance company. A public adjuster, by contrast, 
              works for you, the policyholder.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Public adjusters are independent professionals who specialize in helping policyholders navigate the claims 
              process. They review your policy, document your damage, prepare estimates, and communicate with the insurance 
              company on your behalf.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Note:</strong> Public adjusters are licensed and regulated professionals. They must meet state 
                licensing requirements, which typically include passing an examination and maintaining continuing education.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What Public Adjusters Do</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Public adjusters provide a range of services throughout the claims process:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Policy review:</strong> Analyzing your insurance policy to understand coverage, limits, and exclusions</li>
              <li><strong>Damage documentation:</strong> Thoroughly inspecting and documenting all damage to your property</li>
              <li><strong>Estimate preparation:</strong> Creating detailed repair or replacement estimates</li>
              <li><strong>Claim filing:</strong> Preparing and submitting claim documentation to your insurance company</li>
              <li><strong>Negotiation:</strong> Communicating with the insurance company and negotiating settlement amounts</li>
              <li><strong>Appeals:</strong> Assisting with the appeals process if a claim is denied or underpaid</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Public Adjusters vs. Company Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding the key differences between public adjusters and company adjusters can help clarify their 
              respective roles:
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Aspect</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Company Adjuster</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Public Adjuster</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Represents</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Insurance company</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Policyholder</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Hired By</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Insurance company</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Homeowner</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Paid By</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Insurance company</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Homeowner (% of settlement)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Primary Goal</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Evaluate claim per policy</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Maximize policyholder settlement</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Cost to You</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">None (paid by insurer)</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Typically 5-15% of settlement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">When Homeowners May Consider a Public Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The decision to hire a public adjuster is personal and depends on individual circumstances. Some situations 
              where homeowners may find a public adjuster helpful include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Large or complex claims involving significant damage</li>
              <li>Claims where the policyholder lacks time to manage the process</li>
              <li>Situations where the policyholder feels unfamiliar with insurance processes</li>
              <li>Claims that have been denied or where the settlement offer seems insufficient</li>
              <li>Commercial or business-related claims with multiple components</li>
            </ul>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm">
                <strong>State Variations:</strong> Public adjuster regulations and fee caps vary by state. Some states 
                limit the percentage a public adjuster can charge, particularly after declared disasters. Check with your 
                state's department of insurance for specific regulations in your area.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Public Adjuster Fees</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Public adjusters typically charge a percentage of the claim settlement, which may range from 5% to 15% 
              or more depending on several factors:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>The size and complexity of the claim</li>
              <li>When in the claims process you hire them</li>
              <li>State regulations that may cap fees</li>
              <li>The specific services included in the agreement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before hiring a public adjuster, carefully review the contract terms, including the fee structure, 
              what services are included, and any conditions for payment.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Selecting a Public Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you decide to hire a public adjuster, consider the following when making your selection:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li><strong>Licensing:</strong> Verify the adjuster is licensed in your state through the state insurance department</li>
              <li><strong>Experience:</strong> Ask about their experience with claims similar to yours</li>
              <li><strong>References:</strong> Request references from previous clients</li>
              <li><strong>Fee structure:</strong> Understand exactly how and when you will be charged</li>
              <li><strong>Contract terms:</strong> Read the entire contract before signing</li>
              <li><strong>Communication:</strong> Ensure they are responsive and explain things clearly</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Tip:</strong> Be cautious of any public adjuster who contacts you unsolicited immediately after 
                a disaster, makes guarantees about settlement amounts, or pressures you to sign a contract quickly. 
                Take time to research and compare options.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions to Ask a Public Adjuster</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before hiring a public adjuster, consider asking these questions:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Are you licensed in this state? Can I see your license?</li>
              <li>How many years of experience do you have?</li>
              <li>Have you handled claims similar to mine?</li>
              <li>What is your fee structure?</li>
              <li>What services are included in your fee?</li>
              <li>How will you keep me informed about my claim's progress?</li>
              <li>Can you provide references from previous clients?</li>
              <li>What happens if my claim is denied?</li>
            </ul>

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
                <Link href="/guides/staff-vs-independent-adjuster" className="text-sm text-blue-600 hover:text-blue-700">Staff vs. Independent Adjusters →</Link>
                <Link href="/adjusters" className="text-sm text-blue-600 hover:text-blue-700">Browse by State →</Link>
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
