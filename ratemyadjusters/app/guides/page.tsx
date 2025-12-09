import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Homeowner Guides & Resources | RateMyAdjusters',
  description: 'Free guides to help homeowners understand the insurance claims process. Learn about adjusters, how to file claims, what to do if denied, and more.',
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides',
  },
}

const guides = [
  {
    slug: 'what-to-expect-when-adjuster-visits',
    title: 'What to Expect When an Insurance Adjuster Visits Your Home',
    description: 'Your complete guide to the insurance claim inspection process—from preparation to what happens after the adjuster leaves.',
    readTime: '5 min read',
    category: 'Claims Process',
  },
  {
    slug: 'what-is-an-insurance-adjuster',
    title: 'What Is an Insurance Adjuster?',
    description: 'Learn about the role of insurance adjusters, what they do during the claims process, and how they evaluate property damage.',
    readTime: '6 min read',
    category: 'Basics',
  },
  {
    slug: 'staff-vs-independent-adjuster',
    title: 'Staff vs. Independent Adjusters',
    description: 'Understand the differences between staff adjusters, independent adjusters, and public adjusters, and how each type works.',
    readTime: '5 min read',
    category: 'Adjuster Types',
  },
  {
    slug: 'what-is-a-public-adjuster',
    title: 'What Is a Public Adjuster?',
    description: 'Learn what public adjusters do, how they differ from company adjusters, and when homeowners may consider hiring one.',
    readTime: '6 min read',
    category: 'Adjuster Types',
  },
  {
    slug: 'how-to-file-insurance-claim',
    title: 'How to File an Insurance Claim',
    description: 'A step-by-step overview of the insurance claim process, from documenting damage to working with your adjuster.',
    readTime: '7 min read',
    category: 'Claims Process',
  },
  {
    slug: 'claim-denied-what-to-do',
    title: 'What to Do If Your Claim Is Denied',
    description: 'Understand your options if your insurance claim is denied, including the appeals process and when to seek professional help.',
    readTime: '7 min read',
    category: 'Claims Process',
  },
  {
    slug: 'how-to-negotiate-with-adjuster',
    title: 'How to Communicate with Your Adjuster',
    description: 'Tips for effective communication with your insurance adjuster to help ensure a smooth claims process.',
    readTime: '6 min read',
    category: 'Claims Process',
  },
]

export default function GuidesPage() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Homeowner Guides & Resources',
    description: 'Educational guides about insurance adjusters and the claims process',
    url: 'https://ratemyadjusters.com/guides',
    numberOfItems: guides.length,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">Guides</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-teal-400" />
              <h1 className="text-3xl md:text-4xl font-bold">Homeowner Guides & Resources</h1>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl">
              Practical information to help you understand and navigate the insurance claims process with confidence.
            </p>
          </div>
        </div>

        {/* Guides List */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">{guide.category}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{guide.title}</h2>
                    <p className="text-gray-600 mb-3">{guide.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {guide.readTime}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gray-100 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-2">About These Guides</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              These educational resources are provided for general informational purposes only. They do not constitute legal, 
              financial, or professional advice. Insurance policies, regulations, and claims processes vary by state and 
              insurer. For specific questions about your policy or claim, please consult your insurance company or a 
              licensed professional in your area.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Explore More</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/adjusters" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Browse Adjusters</div>
                  <div className="text-sm text-gray-500">Search by state</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
              <Link href="/review" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Leave a Review</div>
                  <div className="text-sm text-gray-500">Share your experience</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
              <Link href="/companies" className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all group">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">Insurance Companies</div>
                  <div className="text-sm text-gray-500">Browse by carrier</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center">
              RateMyAdjusters does not evaluate or rate insurance companies or adjusters. Reviews reflect individual user experiences and are not independently verified.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
