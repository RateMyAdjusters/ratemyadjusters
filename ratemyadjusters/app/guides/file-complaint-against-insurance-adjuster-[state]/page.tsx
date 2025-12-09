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
    title: `How to File a Complaint Against an Insurance Adjuster in ${state.name}`,
    description: `Learn how to file a complaint against an insurance adjuster in ${state.name}. Understand your options, where to start, and how to document your concerns.`,
    openGraph: {
      title: `How to File a Complaint Against an Insurance Adjuster in ${state.name}`,
      description: `Learn how to file a complaint against an insurance adjuster in ${state.name}. Understand your options, where to start, and how to document your concerns.`,
      type: 'article',
    },
  };
}

export default async function FileComplaintStatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const state = getStateBySlug(stateSlug);

  if (!state) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `How to File a Complaint Against an Insurance Adjuster in ${state.name}`,
    description: `Learn how to file a complaint against an insurance adjuster in ${state.name}. Understand your options, where to start, and how to document your concerns.`,
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
        name: `How long does the complaint process take in ${state.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Timelines vary depending on the complexity of the complaint and the regulator's workload. Many state insurance departments aim to respond within 30-60 days, but complex cases may take longer. Check with the ${state.regulator} for current processing times.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Will filing a complaint affect my insurance rates or coverage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Insurance companies are generally prohibited from retaliating against policyholders who file legitimate complaints. However, if you have concerns, you may want to discuss them with an attorney before filing.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I file a complaint if my claim is still open?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, you can file a complaint at any time. However, it's often helpful to first try resolving the issue directly with your insurance company, as regulators may ask whether you've done so.",
        },
      },
      {
        '@type': 'Question',
        name: "What if I disagree with the regulator's decision?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The complaint process is separate from legal action. If you're unsatisfied with the outcome of a complaint, you may still have legal options available. Consider consulting with an insurance attorney to understand your rights.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does filing a complaint guarantee my claim will be paid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. State regulators enforce insurance laws but cannot force specific claim outcomes. Their role is to ensure insurance companies follow the law, not to act as arbiters of individual disputes.',
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
        name: `File Complaint in ${state.name}`,
        item: `https://ratemyadjusters.com/guides/file-complaint-against-insurance-adjuster-${state.slug}`,
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
              <span className="text-gray-900">File Complaint in {state.name}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to File a Complaint Against an Insurance Adjuster in {state.name}
            </h1>
            <p className="text-lg text-gray-600">
              If you've had a difficult experience with an insurance adjuster in {state.name}, you may be wondering what options are available to you. This guide explains the general process for filing a complaint and what to expect.
            </p>
          </header>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> This article provides general information only and is not legal advice. Every situation is different. If you have questions about your specific circumstances, consider consulting with a licensed attorney or public adjuster in {state.name}.
            </p>
          </div>

          {/* Before You File */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You File a Complaint</h2>
            <p className="text-gray-700 mb-4">Before initiating a formal complaint, consider these preliminary steps:</p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Contact the insurance company directly.</strong> Many issues can be resolved by speaking with a supervisor or the company's customer service department. Ask to escalate your concern if you feel your adjuster isn't addressing it.</li>
              <li><strong>Get everything in writing.</strong> Request written explanations for any decisions you disagree with. Email is often the easiest way to create a paper trail.</li>
              <li><strong>Organize your documentation.</strong> Gather your policy, claim number, correspondence, photos, estimates, and any other relevant materials.</li>
              <li><strong>Review your policy.</strong> Make sure you understand what your policy covers and any relevant deadlines or requirements.</li>
            </ul>
          </section>

          {/* Where to File */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Where to File a Complaint in {state.name}</h2>
            <p className="text-gray-700 mb-4">
              If you've attempted to resolve the issue directly with your insurance company and are still unsatisfied, there are several options available to {state.name} residents:
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{state.regulator}</h3>
              <p className="text-gray-700 mb-3">
                The {state.regulator} regulates insurance companies and handles consumer complaints in {state.name}.
              </p>
              <p className="text-gray-700 mb-3">They can:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>Accept complaints about insurance companies and adjusters</li>
                <li>Investigate patterns of behavior</li>
                <li>Enforce {state.name} insurance laws and regulations</li>
                <li>Provide information about your rights as a policyholder</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href={state.regulatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Visit Official Website →
                </a>
                {state.phone && (
                  <a
                    href={`tel:${state.phone}`}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    Call {state.phone}
                  </a>
                )}
              </div>
            </div>

            {state.notes && (
              <p className="text-gray-600 italic mb-4">{state.notes}</p>
            )}

            <h3 className="text-lg font-semibold text-gray-900 mb-2">The Insurance Company's Internal Process</h3>
            <p className="text-gray-700 mb-4">
              Many insurance companies have formal internal complaint or appeals processes. Check your policy documents or the company's website for information about how to request a review of a claim decision.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Other Resources</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>{state.name} consumer protection office</li>
              <li>National Association of Insurance Commissioners (NAIC) complaint database</li>
              <li>Local consumer advocacy organizations</li>
            </ul>
          </section>

          {/* Information to Gather */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information to Gather Before Filing</h2>
            <p className="text-gray-700 mb-4">When preparing your complaint, having complete documentation will help regulators understand your situation:</p>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Policy number, coverage type, effective dates</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Claim number, date of loss, type of claim</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Adjuster name and contact information</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Timeline of inspections and communications</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Copies of emails, letters, phone notes</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Photos, estimates, invoices, expert opinions</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Clear description of your concerns</li>
            </ul>
          </section>

          {/* What a Complaint Can and Cannot Do */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What a Complaint Can and Cannot Do</h2>
            <p className="text-gray-700 mb-4">It's important to have realistic expectations about the complaint process.</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">A state regulator may:</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Review your complaint and contact the insurer</li>
                  <li>• Investigate potential law violations</li>
                  <li>• Track complaints to identify patterns</li>
                  <li>• Take enforcement action if laws were violated</li>
                  <li>• Provide information about your options</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">A state regulator typically cannot:</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Act as your personal attorney</li>
                  <li>• Force a specific payment amount</li>
                  <li>• Resolve factual disputes about damage</li>
                  <li>• Override legal policy terms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Professional Help */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Consider Professional Help</h2>
            <p className="text-gray-700 mb-4">
              If your claim involves significant money, complex coverage questions, or you believe your insurance company is not acting in good faith, you may want to consult with a professional:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Public adjusters</strong> are licensed professionals who can represent policyholders in the claims process. They typically work on a contingency basis.</li>
              <li><strong>Insurance attorneys</strong> specialize in coverage disputes and can advise you on your legal options.</li>
              <li><strong>Contractors and restoration professionals</strong> can provide independent estimates that may support your position.</li>
            </ul>
            <p className="text-gray-600 text-sm mt-4 italic">
              Note: RateMyAdjusters does not provide legal advice or representation. We encourage you to consult with licensed professionals for guidance on your specific situation.
            </p>
          </section>

          {/* RateMyAdjusters CTA */}
          <section className="mb-8 bg-gray-900 text-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">How RateMyAdjusters Fits In</h2>
            <p className="text-gray-300 mb-4">
              RateMyAdjusters is a platform where policyholders and contractors can share their experiences with insurance adjusters. While we can't resolve individual disputes, we believe transparency helps everyone make more informed decisions.
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
                <h3 className="font-semibold text-gray-900 mb-2">How long does the complaint process take in {state.name}?</h3>
                <p className="text-gray-700">Timelines vary depending on the complexity of the complaint and the regulator's workload. Many state insurance departments aim to respond within 30-60 days, but complex cases may take longer. Check with the {state.regulator} for current processing times.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Will filing a complaint affect my insurance rates or coverage?</h3>
                <p className="text-gray-700">Insurance companies are generally prohibited from retaliating against policyholders who file legitimate complaints. However, if you have concerns, you may want to discuss them with an attorney before filing.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I file a complaint if my claim is still open?</h3>
                <p className="text-gray-700">Yes, you can file a complaint at any time. However, it's often helpful to first try resolving the issue directly with your insurance company, as regulators may ask whether you've done so.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">What if I disagree with the regulator's decision?</h3>
                <p className="text-gray-700">The complaint process is separate from legal action. If you're unsatisfied with the outcome of a complaint, you may still have legal options available. Consider consulting with an insurance attorney to understand your rights.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Does filing a complaint guarantee my claim will be paid?</h3>
                <p className="text-gray-700">No. State regulators enforce insurance laws but cannot force specific claim outcomes. Their role is to ensure insurance companies follow the law, not to act as arbiters of individual disputes.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is RateMyAdjusters affiliated with any insurance company or regulator?</h3>
                <p className="text-gray-700">No. RateMyAdjusters is an independent platform that hosts user-submitted reviews. We are not affiliated with any insurance company, regulatory body, or legal firm.</p>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/guides/what-to-expect-when-adjuster-visits" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What to Expect When an Adjuster Visits →</span>
              </Link>
              <Link href="/guides/claim-denied-what-to-do" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What to Do If Your Claim Is Denied →</span>
              </Link>
              <Link href="/guides/what-is-a-public-adjuster" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What Is a Public Adjuster? →</span>
              </Link>
              <Link href={`/guides/best-public-adjusters-in-${state.slug}`} className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">Best Public Adjusters in {state.name}? →</span>
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
              This article is for general informational purposes only and does not constitute legal advice. Laws and procedures vary by state and change over time. For advice about your specific situation, please consult a licensed attorney or public adjuster in {state.name}.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
