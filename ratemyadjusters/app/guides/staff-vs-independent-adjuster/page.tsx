import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Users, FileText, ArrowRight, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Staff vs. Independent Adjusters: Understanding the Differences | RateMyAdjusters',
  description: 'Learn the differences between staff adjusters, independent adjusters, and public adjusters. Understand how each type works and their role in the claims process.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/staff-vs-independent-adjuster',
  },
  openGraph: {
    title: 'Staff vs. Independent Adjusters: Understanding the Differences',
    description: 'Learn the differences between staff adjusters, independent adjusters, and public adjusters.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What is the difference between a staff adjuster and an independent adjuster?',
    answer: 'Staff adjusters are full-time employees of a single insurance company, while independent adjusters are contractors who work for multiple insurance companies on a per-assignment basis. Both represent the insurance company during the claims process.',
  },
  {
    question: 'Can I request a specific type of adjuster for my claim?',
    answer: 'In most cases, the insurance company assigns the adjuster to your claim based on availability and workload. You typically cannot request a staff adjuster versus an independent adjuster. However, you always have the option to hire your own public adjuster.',
  },
  {
    question: 'Are independent adjusters less experienced than staff adjusters?',
    answer: 'Not necessarily. Independent adjusters often have extensive experience and may handle claims for multiple insurance companies. Many independent adjusters have years of industry experience and hold multiple state licenses.',
  },
  {
    question: 'Do staff and independent adjusters use the same software and methods?',
    answer: 'Generally, yes. Insurance companies typically require all adjusters handling their claims to use standardized estimating software and follow company-specific guidelines, regardless of employment status.',
  },
  {
    question: 'Why would an insurance company use independent adjusters?',
    answer: 'Insurance companies often use independent adjusters during high-claim periods, such as after natural disasters, when their staff adjusters cannot handle the volume. Independent adjusters provide flexibility and additional capacity when needed.',
  },
  {
    question: 'How is a public adjuster different from other adjusters?',
    answer: 'Unlike staff and independent adjusters who work for the insurance company, public adjusters work exclusively for the policyholder. Homeowners hire and pay public adjusters directly, typically as a percentage of the claim settlement, to represent their interests during the claims process.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Staff vs. Independent Adjusters', item: 'https://ratemyadjusters.com/guides/staff-vs-independent-adjuster' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Staff vs. Independent Adjusters: Understanding the Differences',
  description: 'Learn the differences between staff adjusters, independent adjusters, and public adjusters.',
  author: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
  },
  publisher: {
    '@type': 'Organization',
    name: 'RateMyAdjusters',
    url: 'https://ratemyadjusters.com',
  },
  mainEntityOfPage: 'https://ratemyadjusters.com/guides/staff-vs-independent-adjuster',
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

export default function StaffVsIndependentAdjusterPage() {
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
              <span className="text-gray-900 font-medium">Staff vs. Independent Adjusters</span>
            </nav>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-8">
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Adjuster Types</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Staff vs. Independent Adjusters: Understanding the Differences
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              When you file an insurance claim, an adjuster will be assigned to evaluate your damage. Understanding the different 
              types of adjusters can help you know what to expect during the claims process.
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Overview of Adjuster Types</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Insurance adjusters fall into three main categories: staff adjusters, independent adjusters, and public adjusters. 
              Each type has a different relationship with the insurance company and the policyholder, which affects how they 
              operate during the claims process.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding these distinctions can help you navigate your claim more effectively and make informed decisions 
              about whether you might benefit from professional assistance.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Staff Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Staff adjusters are full-time employees of an insurance company. They receive a salary, benefits, and typically 
              work exclusively for their employer. Staff adjusters handle claims for policyholders insured by their company.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Characteristics of Staff Adjusters</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Employed directly by the insurance company</li>
              <li>Receive salary and employee benefits</li>
              <li>Work exclusively for one insurer</li>
              <li>Often have established territories or regions</li>
              <li>May have specialized training in company procedures</li>
              <li>Generally available during normal business hours</li>
            </ul>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Note:</strong> Staff adjusters are trained on their specific company's policies, procedures, and 
                estimating guidelines. This can mean consistent handling of claims according to company standards.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Independent Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Independent adjusters are contractors who work for multiple insurance companies on a per-assignment basis. 
              They are often employed by independent adjusting firms that contract with insurers to handle claims.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Characteristics of Independent Adjusters</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Work as independent contractors, not employees</li>
              <li>May handle claims for multiple insurance companies</li>
              <li>Often work through independent adjusting firms</li>
              <li>Frequently deployed during catastrophe events</li>
              <li>May travel to areas with high claim volumes</li>
              <li>Licensed in multiple states in many cases</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">When Independent Adjusters Are Used</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Insurance companies typically bring in independent adjusters when:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Claim volumes exceed staff adjuster capacity</li>
              <li>Natural disasters create sudden spikes in claims</li>
              <li>Claims occur in areas without local staff adjusters</li>
              <li>Specialized expertise is needed for certain claim types</li>
            </ul>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 my-6">
              <p className="text-amber-900 text-sm">
                <strong>State Variations:</strong> Licensing requirements for independent adjusters vary by state. Most states 
                require independent adjusters to hold a valid license, pass an examination, and complete continuing education. 
                Some states have reciprocity agreements that allow adjusters licensed in one state to work in another.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Comparing Staff and Independent Adjusters</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While staff and independent adjusters have different employment relationships with insurance companies, 
              they perform similar functions when handling claims:
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto my-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Aspect</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Staff Adjuster</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Independent Adjuster</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Employment</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Employee of insurer</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Independent contractor</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Works For</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Single insurance company</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Multiple insurance companies</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Paid By</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Salary from employer</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Fee per claim or assignment</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Availability</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Regular hours, set territory</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Variable, may travel</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700 font-medium">Common Use</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Routine daily claims</td>
                    <td className="border border-gray-200 px-4 py-3 text-gray-700">Catastrophe response, overflow</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Public Adjusters: A Different Option</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike staff and independent adjusters, public adjusters represent the policyholder rather than the insurance 
              company. Homeowners may choose to hire a public adjuster to help navigate the claims process and advocate 
              for their interests.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Public adjusters typically charge a percentage of the claim settlement as their fee. Before hiring a public 
              adjuster, homeowners may want to research their licensing, experience, and fee structure.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
              <p className="text-blue-900 text-sm">
                <strong>Learn More:</strong> For detailed information about public adjusters, see our guide on{' '}
                <Link href="/guides/what-is-a-public-adjuster" className="text-blue-700 underline hover:text-blue-800">
                  What Is a Public Adjuster?
                </Link>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What This Means for Your Claim</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether your claim is handled by a staff adjuster or an independent adjuster, the claims process generally 
              follows the same steps. Both types of adjusters are expected to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Inspect and document the damage to your property</li>
              <li>Review your policy coverage and applicable terms</li>
              <li>Prepare an estimate for repairs or replacement</li>
              <li>Communicate findings to the insurance company</li>
              <li>Keep you informed about your claim status</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Regardless of the adjuster type assigned to your claim, maintaining good documentation and clear communication 
              can help facilitate a smoother claims process.
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
                <Link href="/guides/what-is-a-public-adjuster" className="text-sm text-blue-600 hover:text-blue-700">What Is a Public Adjuster? →</Link>
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
