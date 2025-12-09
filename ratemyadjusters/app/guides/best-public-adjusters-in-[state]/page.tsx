import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { statesData, getStateBySlug } from '@/lib/states-data';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return statesData.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  
  if (!state) return { title: 'Not Found' };

  return {
    title: `Best Public Adjusters in ${state.name}? How to Find and Evaluate`,
    description: `Looking for the best public adjuster in ${state.name}? Learn what public adjusters do, how to evaluate them, and where to research their reputation before hiring.`,
    openGraph: {
      title: `Best Public Adjusters in ${state.name}? How to Find and Evaluate`,
      description: `Looking for the best public adjuster in ${state.name}? Learn what public adjusters do, how to evaluate them, and where to research their reputation before hiring.`,
      type: 'article',
    },
  };
}

export default async function BestPublicAdjustersStatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Best Public Adjusters in ${state.name}? How to Find and Evaluate`,
    description: `Looking for the best public adjuster in ${state.name}? Learn what public adjusters do, how to evaluate them, and where to research their reputation before hiring.`,
    author: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ratemyadjusters.com/logo.png',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Are public adjusters legal in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. Public adjusters are licensed and regulated by the ${state.regulator}. They are legally permitted to represent policyholders in insurance claims.`,
        },
      },
      {
        '@type': 'Question',
        name: `How are public adjusters paid in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Most public adjusters work on contingency, meaning they receive a percentage of your insurance settlement (typically 5-15%). You usually don't pay anything upfront. ${state.name} may have specific fee limits for disaster-related claims.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Can I handle my claim without a public adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Many policyholders successfully handle their own claims. Public adjusters are most valuable for complex, disputed, or high-value claims where their expertise and negotiating experience can make a significant difference.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will hiring a public adjuster delay my claim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Not necessarily. While thorough documentation takes time, an experienced public adjuster often streamlines the process by avoiding common mistakes and knowing what ${state.name} insurers need.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is this article recommending specific public adjusters in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. RateMyAdjusters does not rank, certify, or endorse any public adjuster or firm. This article provides general guidance to help you evaluate your options and make an informed decision.',
        },
      },
      {
        '@type': 'Question',
        name: "How is a public adjuster different from my insurance company's adjuster?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Your insurance company's adjuster works for the carrier and represents their interests. A public adjuster works for you and represents your interests. They are paid by you (from your settlement), not by the insurance company.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ratemyadjusters.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: 'https://ratemyadjusters.com/guides',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Public Adjusters in ${state.name}`,
        item: `https://ratemyadjusters.com/guides/best-public-adjusters-in-${state.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-blue-600">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Public Adjusters in {state.name}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Best Public Adjusters in {state.name}? What to Look For
            </h1>
            <p className="text-lg text-gray-600">
              If you're searching for a public adjuster in {state.name}, you're likely dealing with an insurance claim that feels overwhelming or isn't going the way you expected. Finding the "best" public adjuster isn't about rankings — it's about finding someone qualified, experienced, and right for your specific situation.
            </p>
          </header>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> RateMyAdjusters does not rank, certify, or endorse any public adjuster or firm. This article provides general information to help you make an informed decision.
            </p>
          </div>

          {/* What Public Adjusters Do */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Public Adjusters Do in {state.name}</h2>
            <p className="text-gray-700 mb-4">
              Public adjusters are licensed professionals who represent policyholders (not insurance companies) during the claims process. Unlike the adjuster your insurance company sends, a public adjuster works exclusively for you.
            </p>
            <p className="text-gray-700 mb-4"><strong>Public adjusters can help by:</strong></p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Reviewing your policy to identify all applicable coverages</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Documenting damage thoroughly with photos, measurements, and inventories</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Preparing detailed estimates for repairs or replacement</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Negotiating with your insurance company on your behalf</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Managing the paperwork and communication throughout the process</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Advocating for a fair settlement</li>
            </ul>
            <p className="text-gray-700 mt-4">
              In {state.name}, public adjusters must be licensed by the {state.regulator}. This licensing requirement helps ensure basic qualifications and accountability.
            </p>
            {state.notes && (
              <p className="text-gray-600 italic mt-4">{state.notes}</p>
            )}
          </section>

          {/* When a Public Adjuster Might Help */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When a Public Adjuster Might Help</h2>
            <p className="text-gray-700 mb-4">Not every claim requires a public adjuster. They're typically most valuable for:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><strong>Large or complex claims</strong> where the stakes are high</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><strong>Disputed claims</strong> where you disagree with the insurance company's assessment</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><strong>Commercial property claims</strong> that involve business interruption or complex calculations</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><strong>Claims you don't have time to manage</strong> due to work, health, or other obligations</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span><strong>Situations where you feel outmatched</strong> by the insurance company's resources</li>
            </ul>
            <p className="text-gray-700 mt-4">
              For small, straightforward claims, the cost of a public adjuster may outweigh the benefit.
            </p>
          </section>

          {/* How to Research */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Research Public Adjusters in {state.name}</h2>
            <p className="text-gray-700 mb-4">Finding a qualified public adjuster takes some research. Here's where to start:</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Licensing with {state.regulator}</h3>
              <p className="text-gray-700 mb-3">
                Every public adjuster in {state.name} must have an active license. You can verify licenses through the official state website.
              </p>
              <a
                href={state.regulatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Verify Licenses at {state.regulator} →
              </a>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Experience</h3>
            <p className="text-gray-700 mb-4">Not all public adjusters handle every type of claim. Ask about experience with:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Your specific type of damage (hail, wind, fire, water, hurricane, etc.)</li>
              <li>Claims similar in size to yours</li>
              <li>Your insurance company</li>
              <li>The type of property (residential vs. commercial)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Read Reviews and References</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Ask the adjuster for references you can contact</li>
              <li>Search online review platforms</li>
              <li>Check with the Better Business Bureau</li>
              <li>Look for reviews on RateMyAdjusters from policyholders who've shared their experiences</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Professional Affiliations</h3>
            <p className="text-gray-700">Many reputable public adjusters belong to professional associations such as the National Association of Public Insurance Adjusters (NAPIA) or state-level associations. Membership doesn't guarantee quality, but it suggests ongoing professional engagement.</p>
          </section>

          {/* Questions to Ask */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions to Ask Before Hiring</h2>
            <p className="text-gray-700 mb-4">Before committing to any public adjuster, get clear answers to these questions:</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About Fees</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• What is your fee structure?</li>
                  <li>• When is your fee calculated?</li>
                  <li>• Any upfront costs?</li>
                  <li>• Is the fee negotiable?</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About the Process</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Who will work on my claim?</li>
                  <li>• How often will you update me?</li>
                  <li>• What's the estimated timeline?</li>
                  <li>• How do you communicate?</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About Experience</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• How many similar claims handled?</li>
                  <li>• Typical outcome for this type?</li>
                  <li>• Experience with my insurer?</li>
                  <li>• Can you provide references?</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">About the Agreement</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Can I review the contract first?</li>
                  <li>• What if I want to cancel?</li>
                  <li>• What are your obligations?</li>
                  <li>• Any exclusions or limitations?</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4 italic">Get answers in writing before signing anything.</p>
          </section>

          {/* Red Flags */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Red Flags to Watch For</h2>
            <p className="text-gray-700 mb-4">While most public adjusters are professionals, be cautious of:</p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>High-pressure tactics.</strong> Reputable adjusters will give you time to make a decision. Be wary of anyone who insists you sign immediately.</li>
              <li><strong>Upfront fees.</strong> Most legitimate public adjusters work on contingency and don't require payment upfront.</li>
              <li><strong>Guarantees of specific outcomes.</strong> No one can guarantee what an insurance company will pay.</li>
              <li><strong>Reluctance to provide references.</strong> Experienced adjusters should be able to connect you with satisfied clients.</li>
              <li><strong>Unlicensed individuals.</strong> Always verify licensing before hiring.</li>
              <li><strong>Vague contracts.</strong> The agreement should clearly spell out fees, responsibilities, and terms.</li>
              <li><strong>Door-to-door solicitation after storms.</strong> While not all door-knockers are problematic, this is a common tactic for less reputable operators.</li>
            </ul>
          </section>

          {/* Fee Structure */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Fee Structure</h2>
            <p className="text-gray-700 mb-4">Public adjusters in {state.name} typically charge a percentage of your insurance settlement. This fee structure means:</p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start"><span className="text-green-600 mr-2">✓</span><strong>You pay nothing upfront</strong> — fees come out of your settlement</li>
              <li className="flex items-start"><span className="text-green-600 mr-2">✓</span><strong>The adjuster has an incentive</strong> to maximize your claim</li>
              <li className="flex items-start"><span className="text-green-600 mr-2">✓</span><strong>Fees are negotiable</strong> — especially for larger claims</li>
            </ul>
            <p className="text-gray-700">
              {state.name} may have specific fee limits for claims arising from declared disasters. Ask about any applicable regulations. Get the fee structure in writing and make sure you understand it before signing.
            </p>
          </section>

          {/* RateMyAdjusters CTA */}
          <section className="mb-8 bg-gray-900 text-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">Using RateMyAdjusters in Your Research</h2>
            <p className="text-gray-300 mb-4">
              RateMyAdjusters hosts reviews from policyholders and contractors about their experiences with insurance adjusters — including public adjusters. While we don't rank or endorse specific professionals, these reviews can provide insight into others' experiences.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/adjusters/${state.slug}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Search {state.name} Adjusters
              </Link>
              <Link
                href="/review"
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
              >
                Leave a Review
              </Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Are public adjusters legal in {state.name}?</h3>
                <p className="text-gray-700">Yes. Public adjusters are licensed and regulated by the {state.regulator}. They are legally permitted to represent policyholders in insurance claims.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How are public adjusters paid in {state.name}?</h3>
                <p className="text-gray-700">Most public adjusters work on contingency, meaning they receive a percentage of your insurance settlement (typically 5-15%). You usually don't pay anything upfront. {state.name} may have specific fee limits for disaster-related claims.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I handle my claim without a public adjuster?</h3>
                <p className="text-gray-700">Yes. Many policyholders successfully handle their own claims. Public adjusters are most valuable for complex, disputed, or high-value claims where their expertise and negotiating experience can make a significant difference.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Will hiring a public adjuster delay my claim?</h3>
                <p className="text-gray-700">Not necessarily. While thorough documentation takes time, an experienced public adjuster often streamlines the process by avoiding common mistakes and knowing what {state.name} insurers need.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Is this article recommending specific public adjusters in {state.name}?</h3>
                <p className="text-gray-700">No. RateMyAdjusters does not rank, certify, or endorse any public adjuster or firm. This article provides general guidance to help you evaluate your options and make an informed decision.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How is a public adjuster different from my insurance company's adjuster?</h3>
                <p className="text-gray-700">Your insurance company's adjuster works for the carrier and represents their interests. A public adjuster works for you and represents your interests. They are paid by you (from your settlement), not by the insurance company.</p>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/guides/what-is-a-public-adjuster" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What Is a Public Adjuster? →</span>
              </Link>
              <Link href={`/guides/file-complaint-against-insurance-adjuster-${state.slug}`} className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">File a Complaint in {state.name} →</span>
              </Link>
              <Link href="/guides/claim-denied-what-to-do" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What to Do If Your Claim Is Denied →</span>
              </Link>
              <Link href="/guides/staff-vs-independent-adjuster" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">Staff vs. Independent Adjusters →</span>
              </Link>
              <Link href="/guides" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">Browse All Guides →</span>
              </Link>
              <Link href={`/adjusters/${state.slug}`} className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">Search {state.name} Adjusters →</span>
              </Link>
            </div>
          </section>

          {/* Disclaimer */}
          <footer className="text-sm text-gray-500 border-t pt-6">
            <p className="mb-2"><em>Last updated: December 2025</em></p>
            <p>
              This article is for general informational purposes only. RateMyAdjusters does not rank, certify, endorse, or recommend any public adjuster, firm, or professional. The information provided is not legal, financial, or professional advice. Always verify licenses with the {state.regulator} and conduct your own research before hiring any professional.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
