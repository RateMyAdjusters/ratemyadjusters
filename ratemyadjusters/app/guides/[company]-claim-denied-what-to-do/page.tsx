import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { companiesData, getCompanyBySlug } from '@/lib/companies-data';

interface PageProps {
  params: Promise<{ company: string }>;
}

export async function generateStaticParams() {
  return companiesData.map((company) => ({
    company: company.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company: companySlug } = await params;
  const company = getCompanyBySlug(companySlug);
  
  if (!company) return { title: 'Not Found' };

  return {
    title: `${company.name} Claim Denied – What to Do Next`,
    description: `If your ${company.name} insurance claim was denied, here are practical steps you can take to understand the decision, request a review, and explore your options.`,
    openGraph: {
      title: `${company.name} Claim Denied – What to Do Next`,
      description: `If your ${company.name} insurance claim was denied, here are practical steps you can take to understand the decision, request a review, and explore your options.`,
      type: 'article',
    },
  };
}

export default async function CompanyClaimDeniedPage({ params }: PageProps) {
  const { company: companySlug } = await params;
  const company = getCompanyBySlug(companySlug);

  if (!company) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${company.name} Claim Denied – What to Do Next`,
    description: `If your ${company.name} insurance claim was denied, here are practical steps you can take to understand the decision, request a review, and explore your options.`,
    author: { '@type': 'Organization', name: 'RateMyAdjusters' },
    publisher: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
      logo: { '@type': 'ImageObject', url: 'https://ratemyadjusters.com/logo.png' },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does a denied claim mean I have no options?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A denial is an initial decision, not necessarily a final one. Many denied claims are successfully appealed or resolved through additional documentation, negotiation, or formal dispute processes.',
        },
      },
      {
        '@type': 'Question',
        name: `Can I request a second review of my ${company.name} claim?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. You have the right to appeal a denial and request that ${company.name} reconsider.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Should I hire a public adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on your situation. Public adjusters can be helpful for complex claims or significant disputes, but they typically charge a percentage of your settlement.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this legal advice?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. This article provides general information only. For advice about your specific situation, please consult with a licensed attorney or public adjuster in your state.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
      { '@type': 'ListItem', position: 3, name: `${company.name} Claim Denied`, item: `https://ratemyadjusters.com/guides/${company.slug}-claim-denied-what-to-do` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-blue-600">Guides</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{company.name} Claim Denied</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {company.name} Claim Denied – What to Do Next
            </h1>
            <p className="text-lg text-gray-600">
              Receiving a claim denial from {company.name} can be frustrating and stressful. The good news is that a denial isn't necessarily the final word. Many policyholders successfully appeal or resolve denied claims by following a structured approach.
            </p>
          </header>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> This article provides general information only and is not legal advice. Every claim is different. If you have questions about your specific situation, consider consulting with a licensed attorney or public adjuster.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Reasons Insurance Claims Are Denied</h2>
            <p className="text-gray-700 mb-4">Before taking action, it helps to understand why claims are typically denied:</p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>Policy exclusions.</strong> Your policy may not cover certain types of damage.</li>
              <li><strong>Lapsed coverage.</strong> If your policy wasn't active at the time of the loss.</li>
              <li><strong>Late reporting.</strong> Most policies require timely damage reporting.</li>
              <li><strong>Insufficient documentation.</strong> Not enough evidence to support the claim.</li>
              <li><strong>Pre-existing damage.</strong> Damage that existed before the covered event.</li>
              <li><strong>Maintenance issues.</strong> Damage from lack of maintenance is typically excluded.</li>
              <li><strong>Coverage limits.</strong> Claim exceeds policy or sub-limits.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Carefully Review the Denial Letter</h2>
            <p className="text-gray-700 mb-4">
              {company.name} must provide a written explanation of why your claim was denied. When reviewing:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Note the specific reason(s) for denial</li>
              <li>Find the policy sections referenced</li>
              <li>Check for appeal deadlines</li>
              <li>Look for information about your right to review</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Review Your Policy</h2>
            <p className="text-gray-700 mb-4">Compare the denial reason against your actual policy language:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Does the denial accurately reflect your policy?</li>
              <li>Are there provisions that might apply?</li>
              <li>Did {company.name} interpret the language correctly?</li>
              <li>Any endorsements or riders that provide coverage?</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Organize Your Documentation</h2>
            <p className="text-gray-700 mb-4">Gather everything related to your claim:</p>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Photos and videos of damage</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Contractor estimates</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Emergency repair receipts</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>All communications with {company.name}</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Weather reports or event evidence</li>
              <li className="flex items-start"><span className="text-blue-600 mr-2">•</span>Previous inspection reports</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Contact {company.name} for Clarification</h2>
            <p className="text-gray-700 mb-4">Before escalating, contact {company.name} directly:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
              <li>Stay calm and professional</li>
              <li>Ask specific questions about the denial</li>
              <li>Request clarification on policy language</li>
              <li>Ask what additional information might help</li>
              <li>Take detailed notes</li>
            </ul>
            {company.claimsPhone && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-700">
                  <strong>{company.name} Claims:</strong>{' '}
                  <a href={`tel:${company.claimsPhone}`} className="text-blue-600 hover:underline">{company.claimsPhone}</a>
                </p>
              </div>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 5: Submit a Formal Appeal</h2>
            <p className="text-gray-700 mb-4">If you believe your claim was wrongly denied, your appeal should include:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Clear statement that you're appealing</li>
              <li>Specific reasons the denial was incorrect</li>
              <li>Reference to relevant policy language</li>
              <li>Additional supporting documentation</li>
              <li>Request for written response</li>
            </ul>
            <p className="text-gray-700 mt-4">Send via certified mail and keep copies of everything.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 6: Consider Independent Estimates</h2>
            <p className="text-gray-700 mb-4">Independent professional opinions can strengthen your position:</p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Contractors</strong> can provide repair estimates</li>
              <li><strong>Engineers</strong> can offer expert opinions on damage cause</li>
              <li><strong>Public adjusters</strong> can assess damage and advocate for you</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 7: Know Your Escalation Options</h2>
            <p className="text-gray-700 mb-4">If your appeal is unsuccessful:</p>
            <ul className="space-y-3 text-gray-700">
              <li><strong>State insurance department.</strong> File a complaint with your state's regulator.</li>
              <li><strong>Appraisal process.</strong> Many policies have appraisal clauses for disputes.</li>
              <li><strong>Mediation.</strong> Some states offer mediation programs.</li>
              <li><strong>Legal action.</strong> Consult an insurance attorney if appropriate.</li>
            </ul>
          </section>

          <section className="mb-8 bg-gray-900 text-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-3">How RateMyAdjusters Can Help</h2>
            <p className="text-gray-300 mb-4">
              RateMyAdjusters is a platform where policyholders share experiences with insurance adjusters. While we can't resolve disputes, transparency helps everyone in the insurance process.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/company/${company.slug}`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View {company.name} Adjusters
              </Link>
              <Link href="/review" className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition">
                Leave a Review
              </Link>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Does a denied claim mean I have no options?</h3>
                <p className="text-gray-700">No. Many denied claims are successfully appealed through additional documentation, negotiation, or formal dispute processes.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Can I request a second review of my {company.name} claim?</h3>
                <p className="text-gray-700">Yes. You have the right to appeal and request reconsideration. Check your denial letter for the appeals process.</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Should I hire a public adjuster?</h3>
                <p className="text-gray-700">It depends on complexity and claim size. They charge a percentage of your settlement but can be valuable for significant disputes.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is this legal advice?</h3>
                <p className="text-gray-700">No. This is general information only. Consult a licensed attorney or public adjuster for your specific situation.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Resources</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/guides/claim-denied-what-to-do" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">General Guide: Claim Denied →</span>
              </Link>
              <Link href="/guides/what-is-a-public-adjuster" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">What Is a Public Adjuster? →</span>
              </Link>
              <Link href="/guides" className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">Browse All Guides →</span>
              </Link>
              <Link href={`/company/${company.slug}`} className="block p-4 bg-white border rounded-lg hover:border-blue-500 transition">
                <span className="text-blue-600">View {company.name} Adjusters →</span>
              </Link>
            </div>
          </section>

          <footer className="text-sm text-gray-500 border-t pt-6">
            <p className="mb-2"><em>Last updated: December 2025</em></p>
            <p>
              This article is for general informational purposes only and does not constitute legal advice. Every claim is unique. For advice about your specific situation, please consult a licensed attorney or public adjuster.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
