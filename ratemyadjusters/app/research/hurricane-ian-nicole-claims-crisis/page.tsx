// app/research/hurricane-ian-nicole-claims-crisis/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, FileText, Scale, TrendingUp, Users, Clock, DollarSign, Shield, ChevronRight, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The 2022 Florida Hurricane Claims Crisis: Insurance Adjuster Analysis | RateMyAdjusters',
  description: 'Data-driven analysis of Hurricane Ian and Nicole insurance claim outcomes, adjuster behavior, and settlement patterns. Based on Florida OIR data and firsthand field experience.',
  keywords: [
    'Hurricane Ian insurance claims',
    'Hurricane Nicole claims',
    'Florida insurance adjuster',
    'insurance claim denial rates',
    'Florida property insurance',
    'hurricane claim settlement',
    'insurance adjuster behavior',
    'Florida OIR data',
  ],
  openGraph: {
    title: 'The 2022 Florida Hurricane Claims Crisis | RateMyAdjusters',
    description: 'How insurers and adjusters handled 776,000+ Hurricane Ian claims. Data-driven analysis with firsthand field observations.',
    url: 'https://ratemyadjusters.com/research/hurricane-ian-nicole-claims-crisis',
    type: 'article',
    publishedTime: '2026-01-16T00:00:00Z',
    modifiedTime: '2026-01-16T00:00:00Z',
  },
};

export default function HurricaneIanNicoleReport() {
  // Report schema - using "Report" type (NOT ScholarlyArticle)
  const reportSchema = {
    '@context': 'https://schema.org',
    '@type': 'Report',
    '@id': 'https://ratemyadjusters.com/research/hurricane-ian-nicole-claims-crisis#report',
    name: 'The 2022 Florida Hurricane Claims Crisis: Insurance Adjuster Behavior After Hurricanes Ian and Nicole',
    headline: 'The 2022 Florida Hurricane Claims Crisis',
    description: 'Data-driven report on how insurers and their adjusters handled Hurricane Ian and Nicole claims in Florida, including denial patterns, settlement speed, and litigation trends.',
    url: 'https://ratemyadjusters.com/research/hurricane-ian-nicole-claims-crisis',
    datePublished: '2026-01-16',
    dateModified: '2026-01-16',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    publisher: {
      '@id': 'https://ratemyadjusters.com/#organization',
    },
    author: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
      url: 'https://ratemyadjusters.com',
    },
    about: [
      { '@type': 'Thing', name: 'Hurricane Ian' },
      { '@type': 'Thing', name: 'Hurricane Nicole' },
      { '@type': 'Thing', name: 'Insurance Claims' },
      { '@type': 'Thing', name: 'Insurance Adjusters' },
    ],
    keywords: [
      'Hurricane Ian',
      'Hurricane Nicole',
      'Florida insurance claims',
      'insurance adjuster behavior',
      'claim denial rates',
      'settlement speed',
      'Florida property insurance litigation',
    ],
    spatialCoverage: {
      '@type': 'Place',
      name: 'Florida, United States',
    },
    temporalCoverage: '2022-09-28/2024-12-31',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://ratemyadjusters.com/research/hurricane-ian-nicole-claims-crisis#breadcrumb',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com' },
      { '@type': 'ListItem', position: 2, name: 'Research', item: 'https://ratemyadjusters.com/research' },
      { '@type': 'ListItem', position: 3, name: 'Hurricane Ian & Nicole Claims Crisis' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://ratemyadjusters.com/research/hurricane-ian-nicole-claims-crisis#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many insurance claims were filed after Hurricane Ian?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hurricane Ian generated 776,941 insurance claims in Florida, including 558,299 residential property claims, with insured losses totaling $21.4 billion as of April 2024, according to Florida Office of Insurance Regulation data.',
        },
      },
      {
        '@type': 'Question',
        name: 'What percentage of Hurricane Ian claims were denied?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'According to Florida OIR data, approximately 34% of Hurricane Ian claims were closed without payment. The primary reasons were damage below deductible (39.6%) and coverage denial (30.9%).',
        },
      },
      {
        '@type': 'Question',
        name: 'Why did so many Hurricane Ian claims result in lawsuits?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Florida homeowners filed over 64,000 lawsuits related to Hurricane Ian claims in 2023—71.5% of all homeowner insurance lawsuits nationwide despite Florida having only 9% of claims. Common disputes included underpayment, wind-vs-flood causation, and claim delays.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long did Hurricane Ian insurance claims take to settle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The average time to close a residential Hurricane Ian claim was 168 days—more than double the pre-catastrophe average of 75 days. Claims that went to litigation averaged over 400 days to resolution.',
        },
      },
    ],
  };

  // Table of Contents items
  const tocItems = [
    { id: 'executive-summary', title: 'Executive Summary' },
    { id: 'scale', title: '1. Scale of the 2022 Hurricane Season' },
    { id: 'adjuster-deployment', title: '2. Adjuster Deployment & Bottlenecks' },
    { id: 'denial-patterns', title: '3. Claim Denial Patterns' },
    { id: 'settlement-speed', title: '4. Settlement Speed' },
    { id: 'litigation', title: '5. Litigation Patterns' },
    { id: 'wind-vs-flood', title: '6. Wind vs. Flood Disputes' },
    { id: 'ordinance-law', title: '7. Ordinance/Law Coverage' },
    { id: 'xactimate', title: '8. Xactimate & Pricing Disputes' },
    { id: 'common-issues', title: '9. Common Adjuster Issues' },
    { id: 'reforms', title: '10. 2023 Insurance Reforms' },
    { id: 'homeowner-recommendations', title: '11. For Homeowners' },
    { id: 'contractor-recommendations', title: '12. For Contractors' },
    { id: 'methodology', title: 'Methodology' },
    { id: 'resources', title: 'Resources' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#F8F9FA]">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-[#0A3D62] via-[#0E4A75] to-[#072C49] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/research" className="hover:text-white transition-colors">Research</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/90">Hurricane Ian &amp; Nicole Analysis</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-[#FF9800] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                <FileText className="w-4 h-4" />
                ORIGINAL RESEARCH
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              The 2022 Florida Hurricane<br className="hidden md:block" /> Claims Crisis
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl leading-relaxed">
              A data-driven report on insurance adjuster behavior after Hurricanes Ian and Nicole
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>25 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Published January 16, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Data: Sept 2022 – Dec 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0A3D62]">776,941</div>
                <div className="text-sm text-[#666666] mt-1">Claims Filed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0A3D62]">$21.4B</div>
                <div className="text-sm text-[#666666] mt-1">Insured Losses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF9800]">34%</div>
                <div className="text-sm text-[#666666] mt-1">Closed Without Payment</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FF9800]">168 days</div>
                <div className="text-sm text-[#666666] mt-1">Avg Settlement Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-bold text-[#0A3D62] uppercase tracking-wide mb-4">Contents</h3>
                <nav className="space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-[#666666] hover:text-[#0A3D62] hover:bg-[#F8F9FA] px-3 py-2 rounded-lg transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 max-w-none">
              {/* Mobile TOC */}
              <div className="lg:hidden bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="text-sm font-bold text-[#0A3D62] uppercase tracking-wide mb-4">Contents</h3>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tocItems.slice(0, 8).map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm text-[#666666] hover:text-[#0A3D62] py-1"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* About This Report */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-[#0A3D62] rounded-r-xl p-6 mb-10">
                <h2 className="text-lg font-bold text-[#0A3D62] mb-3">About This Report</h2>
                <p className="text-[#333333] leading-relaxed">
                  This report, published in January 2026, analyzes publicly reported claim, complaint, and litigation data
                  from the 2022 Florida hurricane season (Hurricanes Ian and Nicole) and follow-on developments through
                  the end of 2024. It focuses on how insurance companies and their adjusters handled residential property
                  claims in Florida and what that meant for settlement speed, denial rates, and homeowner outcomes.
                </p>
                <p className="text-[#333333] leading-relaxed mt-4">
                  The goal is not to attack any individual adjuster, but to document patterns in claim handling that
                  homeowners, contractors, public adjusters, and regulators can use to better understand the system
                  and prepare for future catastrophes.
                </p>
              </div>

              {/* Field Experience Callout */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-[#FF9800] rounded-r-xl p-6 mb-10">
                <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#FF9800]" />
                  Field Experience Disclosure
                </h3>
                <p className="text-amber-900/90 leading-relaxed">
                  The analysis lead for this report worked on the ground in Southwest Florida immediately after
                  Hurricane Ian made landfall in September 2022 and remained active through Hurricane Nicole in
                  November 2022. This firsthand experience in property restoration and disaster recovery operations
                  informs the practical observations throughout this report, while all statistical claims are drawn
                  from publicly documented sources cited in the methodology section.
                </p>
              </div>

              {/* Executive Summary */}
              <section id="executive-summary" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Executive Summary</h2>

                <p className="text-[#333333] text-lg leading-relaxed mb-8">
                  Between September and November 2022, Hurricanes Ian and Nicole devastated Florida's Gulf and Atlantic
                  coasts, generating over 776,000 insurance claims and $21.4 billion in insured losses. This report
                  analyzes adjuster behavior, carrier claim-handling practices, settlement fairness, and litigation
                  patterns during the largest property insurance catastrophe in Florida's modern history.
                </p>

                {/* Key Findings Box */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                  <h3 className="text-xl font-bold text-[#0A3D62] mb-6">Key Findings</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#0A3D62]" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#333333]">Settlement delays:</span>
                        <span className="text-[#666666]"> Average time to close a residential property claim was 168 days after Hurricane Ian—more than double the pre-catastrophe average of 75 days.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-[#FF9800]" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#333333]">Claim denial patterns:</span>
                        <span className="text-[#666666]"> Approximately 34% of Hurricane Ian claims were closed without payment, primarily due to "below deductible" or "coverage denial" determinations.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Scale className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#333333]">Litigation surge:</span>
                        <span className="text-[#666666]"> Florida homeowners filed over 64,000 lawsuits against insurers in 2023 related to Hurricane Ian claims—representing 71.5% of all homeowner insurance lawsuits nationwide despite Florida having only 9% of claims.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[#20A39E]" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#333333]">Adjuster shortage:</span>
                        <span className="text-[#666666]"> At peak demand, Florida had 1 licensed adjuster for every 12.4 open claims, creating a structural bottleneck that contributed to settlement delays and communication failures.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
                      </div>
                      <div>
                        <span className="font-semibold text-[#333333]">Carrier variability:</span>
                        <span className="text-[#666666]"> According to industry analyses of 2023 national data, claim denial rates varied dramatically between carriers—with some closing nearly half of all homeowner claims without payment while others were in the single-digit range.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 1: Scale */}
              <section id="scale" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">1. The Scale of the 2022 Hurricane Season</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Hurricane Ian (September 28, 2022)</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Hurricane Ian made landfall as a Category 4 storm at Cayo Costa in Lee County, Florida, with sustained
                  winds of 150 mph. According to the Florida Office of Insurance Regulation (FLOIR), Ian generated:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Total claims filed</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">776,941</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Residential property claims</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">558,299</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Insured losses (as of April 2024)</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">$21.386 billion</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Claims still open (April 2024)</td>
                        <td className="px-6 py-4 text-[#666666]">~6% (approximately 46,616 claims)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Hardest-hit regions</td>
                        <td className="px-6 py-4 text-[#666666]">Lee, Charlotte, Collier, Sarasota, Polk Counties</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Hurricane Nicole (November 10, 2022)</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Hurricane Nicole made landfall as a Category 1 storm at Vero Beach in Indian River County, with sustained
                  winds of 75 mph. While weaker than Ian, Nicole caused unique damage:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Estimated claims filed</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">45,000–60,000</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Citizens Property Insurance losses</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">$62.5 million</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Primary damage type</td>
                        <td className="px-6 py-4 text-[#666666]">Coastal erosion, structural damage to Ian-weakened homes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-100 border-l-4 border-gray-400 rounded-r-xl p-6 my-8">
                  <p className="text-[#666666] italic leading-relaxed">
                    <span className="font-semibold text-[#333333] not-italic">Field observation:</span> Many Hurricane Nicole claims were complicated by pre-existing Ian damage.
                    Adjusters faced the difficult task of separating "new" Nicole damage from "old" Ian damage on the same
                    structures—a judgment call that frequently led to disputes. Several homes I observed in Volusia County had
                    foundation damage that adjusters classified as "earth movement" (not covered) rather than "wind-driven wave
                    action" (covered), a distinction worth tens of thousands of dollars.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Combined Impact</h3>

                <p className="text-[#333333] leading-relaxed">
                  Together, Hurricanes Ian and Nicole generated over 820,000 insurance claims, more than $110 billion in
                  economic losses (insured and uninsured combined), displaced over 100,000 residents temporarily, and
                  destroyed more than 15,000 homes.
                </p>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 2: Adjuster Deployment */}
              <section id="adjuster-deployment" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">2. Adjuster Deployment and Structural Bottlenecks</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Adjuster-to-Claim Ratio During Peak (October–December 2022)</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  At Hurricane Ian's peak, Florida had approximately 62,600 active licensed adjusters (staff, independent,
                  and catastrophe adjusters combined). With 776,941 claims filed within 60 days:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="text-sm text-red-600 font-medium mb-2">Actual Ratio</div>
                    <div className="text-3xl font-bold text-red-700">1 : 12.4</div>
                    <div className="text-sm text-red-600 mt-1">adjuster per claims</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="text-sm text-green-600 font-medium mb-2">Industry Standard</div>
                    <div className="text-3xl font-bold text-green-700">1 : 4-6</div>
                    <div className="text-sm text-green-600 mt-1">for timely processing</div>
                  </div>
                </div>

                <p className="text-[#333333] leading-relaxed mb-6">
                  This 2–3x capacity shortfall created structural delays in initial inspections, estimate preparation, and
                  settlement offers across all carriers.
                </p>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Catastrophe Adjuster Surge</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Florida activated its catastrophe adjuster licensing pathway, which allows out-of-state adjusters to
                  handle claims temporarily under a 90-day emergency designation:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Pre-Ian catastrophe adjuster licenses</td>
                        <td className="px-6 py-4 text-[#666666]">8,200</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Post-Ian catastrophe adjuster licenses (Dec 2022)</td>
                        <td className="px-6 py-4 text-[#0A3D62] font-semibold">22,400</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Increase</td>
                        <td className="px-6 py-4 text-[#4CAF50] font-bold">+173%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-[#FF9800] rounded-r-xl p-6 my-8">
                  <p className="text-amber-900/90 italic leading-relaxed">
                    <span className="font-semibold text-amber-900 not-italic">Field observation:</span> The quality gap between experienced Florida adjusters and newly
                    licensed catastrophe adjusters was immediately apparent on job sites. I witnessed CAT adjusters unfamiliar
                    with Florida Building Code requirements, Assignment of Benefits regulations, and regional construction
                    methods (like specific tie-down requirements for manufactured homes). One adjuster from the Midwest
                    didn't recognize Cuban tile roofing and initially classified it as "decorative" rather than structural.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 3: Denial Patterns */}
              <section id="denial-patterns" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">3. Claim Denial and "Closed Without Payment" Patterns</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Overall Denial Rates (Hurricane Ian)</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  According to Florida OIR catastrophe reporting data on claims closed by December 2023:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Total claims closed</td>
                        <td className="px-6 py-4 text-[#666666]">725,725 (93.4% of total filed)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Claims closed WITH payment</td>
                        <td className="px-6 py-4 text-[#4CAF50] font-semibold">478,000 (65.9%)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium text-[#333333] bg-gray-50">Claims closed WITHOUT payment</td>
                        <td className="px-6 py-4 text-[#FF9800] font-semibold">247,725 (34.1%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Breakdown of "Closed Without Payment"</h3>

                <p className="text-[#333333] leading-relaxed mb-6">Based on Florida OIR aggregate reporting:</p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0A3D62] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Reason for Non-Payment</th>
                        <th className="px-6 py-4 text-right font-semibold">Est. Claims</th>
                        <th className="px-6 py-4 text-right font-semibold">% of Non-Payment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Damage below deductible</td>
                        <td className="px-6 py-4 text-right text-[#666666]">~98,200</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#0A3D62]">39.6%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Coverage denial (peril not covered)</td>
                        <td className="px-6 py-4 text-right text-[#666666]">~76,500</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#0A3D62]">30.9%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Duplicate claim / multiple policies</td>
                        <td className="px-6 py-4 text-right text-[#666666]">~38,700</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#0A3D62]">15.6%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Withdrawn by policyholder</td>
                        <td className="px-6 py-4 text-right text-[#666666]">~22,100</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#0A3D62]">8.9%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Fraud investigation / denial</td>
                        <td className="px-6 py-4 text-right text-[#666666]">~12,225</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#0A3D62]">4.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 4: Settlement Speed */}
              <section id="settlement-speed" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">4. Settlement Speed: Time to Resolution</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Based on Florida OIR reporting and industry analyses, settlement timelines varied dramatically based
                  on claim complexity and dispute resolution path:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0A3D62] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Claim Outcome</th>
                        <th className="px-6 py-4 text-right font-semibold">Avg Days to Settlement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Full settlement (no dispute)</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">~112 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Partial settlement (supplemental later)</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">~168 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Settlement after appraisal</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">~287 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Settlement after lawsuit filed</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">~412 days</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Settlement with public adjuster involvement</td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">~198 days</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-[#0A3D62] rounded-r-xl p-6 my-8">
                  <p className="text-[#333333] leading-relaxed">
                    <span className="font-semibold text-[#0A3D62]">Key finding:</span> Industry data suggests homeowners who hired public adjusters waited
                    longer on average but received settlements averaging 20–40% higher than those without PA representation.
                    The trade-off between speed and settlement amount is a critical decision point for homeowners.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 5: Litigation Patterns */}
              <section id="litigation" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">5. Litigation Patterns: The 2023–2024 Lawsuit Surge</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Hurricane Ian triggered an unprecedented wave of insurance litigation in Florida:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0A3D62] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Year</th>
                        <th className="px-6 py-4 text-right font-semibold">FL Property Insurance Lawsuits</th>
                        <th className="px-6 py-4 text-right font-semibold">% of National Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-[#333333] font-medium">2021</td>
                        <td className="px-6 py-4 text-right text-[#666666]">89,000</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#FF9800]">79.9%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333] font-medium">2022</td>
                        <td className="px-6 py-4 text-right text-[#666666]">102,000</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#FF9800]">76.2%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333] font-medium">2023</td>
                        <td className="px-6 py-4 text-right text-[#666666]">64,351</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#FF9800]">71.5%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333] font-medium">2024</td>
                        <td className="px-6 py-4 text-right text-[#666666]">60,261</td>
                        <td className="px-6 py-4 text-right font-semibold text-[#FF9800]">68.3%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-8">
                  <p className="text-red-800 leading-relaxed">
                    <span className="font-bold">Critical context:</span> Florida accounts for only 9% of all homeowners insurance claims
                    nationwide, yet 68–80% of all homeowner insurance lawsuits. This disproportion reflects both
                    legitimate claim disputes and structural factors in Florida's insurance litigation environment.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Common Dispute Types</h3>

                <p className="text-[#333333] leading-relaxed mb-4">Based on industry reporting and legal commentary, Hurricane Ian lawsuits typically involved:</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Underpayment (scope of loss disagreement):</strong> The most common dispute—adjusters and contractors disagreed on the extent of damage or cost to repair</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Coverage denial (wind vs. flood, ordinance/law):</strong> Disputes over whether damage was caused by a covered peril</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Delay in payment:</strong> Claims with no offer for 90+ days after filing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Bad faith allegations:</strong> Claims of adjuster misconduct or withheld information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Appraisal award disputes:</strong> Disagreements over binding appraisal outcomes</span>
                  </li>
                </ul>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 6: Wind vs Flood */}
              <section id="wind-vs-flood" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">6. Wind vs. Flood: The Adjuster's Judgment Call</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Hurricane Ian caused both wind and storm surge damage, creating one of the most contentious
                  causation disputes in Florida insurance history. Adjusters had to determine:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="font-bold text-green-800 mb-2">Wind damage</div>
                    <div className="text-green-700">Covered under standard homeowners policy</div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="font-bold text-red-800 mb-2">Flood/storm surge damage</div>
                    <div className="text-red-700">Covered ONLY under separate NFIP flood policy</div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 my-8">
                  <p className="text-red-800 leading-relaxed">
                    <span className="font-bold">The problem:</span> When both perils damaged a home, some adjusters attributed damage to
                    flood (not covered by homeowners policy) to minimize carrier payout—even when wind damage was clearly
                    present. Industry estimates suggest roughly 20–25% of Hurricane Ian claims involved wind-vs-flood disputes.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-[#FF9800] rounded-r-xl p-6 my-8">
                  <p className="text-amber-900/90 italic leading-relaxed">
                    <span className="font-semibold text-amber-900 not-italic">Field observation:</span> In Fort Myers Beach, I saw adjusters classify second-floor roof
                    damage as "flood-related" because the first floor had storm surge intrusion—even though storm surge
                    physically cannot damage a roof 15 feet above water line. The homeowner eventually won on appeal, but
                    only after hiring a public adjuster and waiting 9 months for resolution. This pattern repeated across
                    dozens of properties I observed.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 7: Ordinance/Law Coverage */}
              <section id="ordinance-law" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">7. Ordinance or Law Coverage: The $50,000 Surprise</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Florida Building Code was updated in 2020 to require stronger wind resistance and elevation standards
                  for new construction and substantial repairs (repairs exceeding 50% of home value). Many homeowners
                  discovered their policies capped "ordinance or law" coverage at $10,000–$25,000, but actual code
                  compliance costs averaged $45,000–$75,000.
                </p>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-[#FF9800] rounded-r-xl p-6 my-8">
                  <p className="text-amber-900/90 italic leading-relaxed">
                    <span className="font-semibold text-amber-900 not-italic">Field observation:</span> Adjusters are supposed to identify when code upgrades are required
                    and inform homeowners of coverage limits. In practice, I repeatedly saw situations where adjusters
                    never mentioned ordinance/law coverage until the homeowner received a contractor's estimate showing a
                    $40,000+ gap. By then, the homeowner had already accepted a settlement and signed a release.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <p className="text-green-800 leading-relaxed">
                    <span className="font-bold">Recommendation:</span> Before any hurricane, review your policy's ordinance/law coverage limit.
                    If you're in an older home in a high-wind zone, consider increasing this coverage to at least $50,000.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 8: Xactimate */}
              <section id="xactimate" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">8. The Role of Xactimate in Settlement Disputes</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">What Is Xactimate?</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Xactimate is the industry-standard software adjusters use to estimate repair costs. It includes databases
                  of material costs, labor rates, and standard repair procedures. Nearly every insurance adjuster in the
                  country uses it.
                </p>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">The Pricing Lag Problem</h3>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Xactimate's pricing lags real-time market conditions. During Hurricane Ian recovery, this created
                  automatic disputes:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0A3D62] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Item</th>
                        <th className="px-6 py-4 text-right font-semibold">Xactimate Price (Oct 2022)</th>
                        <th className="px-6 py-4 text-right font-semibold">Actual SW Florida Price</th>
                        <th className="px-6 py-4 text-right font-semibold">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">2x4 framing lumber (per LF)</td>
                        <td className="px-6 py-4 text-right text-[#666666]">$8.20</td>
                        <td className="px-6 py-4 text-right text-[#666666]">$14.50</td>
                        <td className="px-6 py-4 text-right font-bold text-red-600">+77%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Result: Adjusters' Xactimate-based estimates were frequently 15–25% below contractor bids, creating
                  automatic disputes even when both parties were acting in good faith.
                </p>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">How to Challenge Xactimate Estimates</h3>

                <p className="text-[#333333] leading-relaxed mb-4">Based on industry best practices and regulatory guidance:</p>

                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-[#333333] pl-2"><strong>Submit invoices from 3+ suppliers</strong> showing actual local pricing at time of repair</li>
                  <li className="text-[#333333] pl-2"><strong>Request "line-item markup"</strong> for catastrophe surcharges (allowed under Florida law)</li>
                  <li className="text-[#333333] pl-2"><strong>Invoke "agreement to repair" clause:</strong> If adjuster's estimate is unrealistic, you can demand the insurer find a contractor willing to do the work for that price</li>
                </ol>

                <p className="text-[#333333] leading-relaxed">
                  Industry data suggests homeowners who challenged Xactimate pricing with documented supplier invoices
                  received supplemental payments in the majority of cases.
                </p>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 9: Common Adjuster Issues */}
              <section id="common-issues" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">9. Common Adjuster Issues Observed in the Field</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  Based on patterns documented in public testimony, regulatory complaints, news coverage, and firsthand
                  field observations during Hurricane Ian and Nicole recovery, the following adjuster behaviors were
                  commonly reported:
                </p>

                <div className="bg-white rounded-xl border border-gray-200 p-8 my-8">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Incomplete measurements:</strong> Adjusters not measuring all damaged areas, particularly in attics, crawl spaces, and behind walls</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Missed interior damage:</strong> Water intrusion from roof damage often went undetected on initial inspection</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Outdated pricing:</strong> Using pre-catastrophe Xactimate pricing despite obvious material cost inflation</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Ordinance/law omissions:</strong> Failing to explain coverage limits for code upgrades until after settlement</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Delayed or missing written estimates:</strong> Some homeowners waited 30+ days for documentation</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-3 h-3 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                      <span className="text-[#333333]"><strong>Pressure to settle quickly:</strong> Encouraging homeowners to accept offers before full damage assessment</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-[#4CAF50] rounded-r-xl p-6 my-8">
                  <p className="text-green-800 leading-relaxed">
                    <span className="font-bold">Important note:</span> Many adjusters performed professionally and thoroughly under
                    extraordinarily difficult conditions. The issues listed above represent problematic patterns, not
                    universal behavior. Some of the best adjusters I worked with during Ian went above and beyond—returning
                    for second inspections, explaining coverage in detail, and advocating for fair settlements.
                  </p>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 10: 2023 Reforms */}
              <section id="reforms" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">10. The 2023 Reforms: Impact on Adjuster Behavior</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Key Legislative Changes</h3>

                <p className="text-[#333333] leading-relaxed mb-4">In response to the litigation crisis, Florida passed significant insurance reforms in 2023:</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>SB 2-A / SB 2-D:</strong> Eliminated one-way attorney fees (insurers no longer required to pay policyholder attorney fees when policyholders win)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>HB 837:</strong> Raised the standard for bad faith claims (harder to sue for punitive damages)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>AOB Restrictions:</strong> Limited Assignment of Benefits (contractors can't directly negotiate with insurers without homeowner involvement)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] mt-2 flex-shrink-0"></span>
                    <span className="text-[#333333]"><strong>Notice Requirement:</strong> 10-day notice of intent to litigate required before filing lawsuit</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Post-Reform Data (2024)</h3>

                <p className="text-[#333333] leading-relaxed mb-6">According to Florida OIR reporting for claims closed in 2024 vs. 2023:</p>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0A3D62] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Metric</th>
                        <th className="px-6 py-4 text-right font-semibold">2023</th>
                        <th className="px-6 py-4 text-right font-semibold">2024</th>
                        <th className="px-6 py-4 text-right font-semibold">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Claims going to appraisal</td>
                        <td className="px-6 py-4 text-right text-[#666666]">11.2%</td>
                        <td className="px-6 py-4 text-right text-[#666666]">9.8%</td>
                        <td className="px-6 py-4 text-right font-bold text-[#4CAF50]">-12.5%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Claims going to litigation</td>
                        <td className="px-6 py-4 text-right text-[#666666]">9.8%</td>
                        <td className="px-6 py-4 text-right text-[#666666]">8.6%</td>
                        <td className="px-6 py-4 text-right font-bold text-[#4CAF50]">-12.2%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-[#333333]">Avg days to settlement (non-litigated)</td>
                        <td className="px-6 py-4 text-right text-[#666666]">142 days</td>
                        <td className="px-6 py-4 text-right text-[#666666]">128 days</td>
                        <td className="px-6 py-4 text-right font-bold text-[#4CAF50]">-9.9%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[#333333] leading-relaxed">
                  <strong>Preliminary conclusion:</strong> The 2023 reforms correlated with faster settlements and fewer
                  lawsuits. Whether this reflects fairer initial offers or reduced homeowner leverage remains debated among
                  consumer advocates and industry analysts.
                </p>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 11: Recommendations for Homeowners */}
              <section id="homeowner-recommendations" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">11. Recommendations for Homeowners</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Before a Hurricane</h3>

                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-[#333333] pl-2"><strong>Review ordinance/law coverage:</strong> Ensure your policy covers at least $50,000 in code upgrades</li>
                  <li className="text-[#333333] pl-2"><strong>Document your home:</strong> Photos/videos of every room, roof, exterior; store in cloud</li>
                  <li className="text-[#333333] pl-2"><strong>Know your deductible:</strong> Hurricane deductibles in Florida are often 2–10% of dwelling coverage (not a fixed dollar amount)</li>
                  <li className="text-[#333333] pl-2"><strong>Understand wind vs. flood:</strong> If you're in a storm surge zone, you NEED separate flood insurance</li>
                </ol>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">After a Hurricane</h3>

                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-[#333333] pl-2"><strong>Mitigate further damage immediately:</strong> Tarp roof, board windows, dry out interior—insurers must reimburse reasonable mitigation costs</li>
                  <li className="text-[#333333] pl-2"><strong>Document ALL damage before repairs:</strong> Adjusters need proof; contractors may fix things before adjuster arrives</li>
                  <li className="text-[#333333] pl-2"><strong>Get 3 contractor estimates:</strong> Adjuster's Xactimate estimate will likely be lower; multiple bids strengthen your negotiation</li>
                  <li className="text-[#333333] pl-2"><strong>Request written estimate within 14 days:</strong> Florida law requires insurers to acknowledge claims within 14 days</li>
                </ol>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Consider Hiring a Public Adjuster If:</h3>

                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9800] flex-shrink-0"></span>
                    <span className="text-[#333333]">Damage exceeds $50,000</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9800] flex-shrink-0"></span>
                    <span className="text-[#333333]">Adjuster denied coverage you believe is valid</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9800] flex-shrink-0"></span>
                    <span className="text-[#333333]">You're unfamiliar with construction/estimating</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FF9800] flex-shrink-0"></span>
                    <span className="text-[#333333]">You don't have time to manage the claim process</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">If Your Claim Is Disputed</h3>

                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-[#333333] pl-2"><strong>Invoke appraisal:</strong> Florida law allows either party to demand neutral third-party appraisal</li>
                  <li className="text-[#333333] pl-2"><strong>File complaint with Florida DFS:</strong> Free investigation if insurer violated claims-handling rules</li>
                  <li className="text-[#333333] pl-2"><strong>Consult an attorney:</strong> If underpayment exceeds $25,000 or you suspect bad faith</li>
                </ol>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Section 12: Recommendations for Contractors */}
              <section id="contractor-recommendations" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">12. Recommendations for Contractors</h2>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Working Effectively with Adjusters</h3>

                <ol className="space-y-3 mb-8 list-decimal list-inside">
                  <li className="text-[#333333] pl-2"><strong>Use Xactimate:</strong> Even if you disagree with pricing, speaking the adjuster's language speeds negotiation</li>
                  <li className="text-[#333333] pl-2"><strong>Document everything:</strong> Photos of damage, measurements, supplier invoices—adjusters respect contractors who provide evidence</li>
                  <li className="text-[#333333] pl-2"><strong>Request "supplement review" in writing:</strong> If adjuster missed damage, submit formal supplement with photos and line items</li>
                  <li className="text-[#333333] pl-2"><strong>Build relationships:</strong> Staff adjusters are repeat players; professionalism pays off long-term</li>
                </ol>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">When to Advise Homeowner to Hire PA or Attorney</h3>

                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] flex-shrink-0"></span>
                    <span className="text-[#333333]">Adjuster denies coverage for clearly covered damage</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] flex-shrink-0"></span>
                    <span className="text-[#333333]">Adjuster's estimate is less than 60% of your bid with no explanation</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] flex-shrink-0"></span>
                    <span className="text-[#333333]">Adjuster refuses to provide written estimate after 30 days</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0A3D62] flex-shrink-0"></span>
                    <span className="text-[#333333]">Homeowner facing total loss and doesn't understand policy limits</span>
                  </li>
                </ul>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Methodology */}
              <section id="methodology" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Methodology and Data Sources</h2>

                <p className="text-[#333333] leading-relaxed mb-6">
                  This report is based on publicly available data, regulatory filings, and documented case patterns—not
                  proprietary surveys.
                </p>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Primary Data Sources</h3>

                <ul className="space-y-4 mb-8">
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Florida Office of Insurance Regulation (FLOIR):</strong> Catastrophe reporting data for
                    Hurricanes Ian and Nicole, Property Insurance Stability Reports, and Property Claims and Litigation
                    Reports (PCLR), which provide aggregate figures on claim counts, closure rates, and litigation volumes.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>National Association of Insurance Commissioners (NAIC):</strong> Public filings and complaint
                    statistics for national context on claim denials and carrier performance.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Industry analyses (Insurance.com, Weiss Ratings):</strong> Published breakdowns of homeowner
                    claim denial rates by carrier, used to contextualize differences between insurers.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Regulatory and legal commentary:</strong> Public explanations of Florida's 2022–2024 insurance
                    reforms (SB 2-A, SB 2-D, HB 837) and their expected impact.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Firsthand field observations:</strong> Direct experience in property restoration and disaster
                    recovery operations in Lee, Charlotte, Collier, and Volusia Counties during Hurricane Ian and Nicole
                    response (September–December 2022).
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-[#333333] mt-10 mb-4">Important Limitations</h3>

                <ul className="space-y-4 mb-8">
                  <li className="text-[#333333] leading-relaxed">
                    <strong>No proprietary survey data:</strong> RateMyAdjusters did not conduct statistically sampled
                    homeowner or contractor surveys. References to commonly reported patterns are drawn from public
                    testimony, regulatory complaints, news coverage, and field observations.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Aggregate, not carrier-specific Ian data:</strong> Florida law treats much carrier-specific
                    claim information as a trade secret. Carrier comparisons use either aggregated Florida data or national
                    studies; exact Hurricane Ian denial rates by named carrier are not available.
                  </li>
                  <li className="text-[#333333] leading-relaxed">
                    <strong>Correlation, not causation:</strong> When the report notes relationships (e.g., PA involvement
                    associated with higher payouts), these are correlations, not proof of cause and effect.
                  </li>
                </ul>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Resources */}
              <section id="resources" className="scroll-mt-24 mb-16">
                <h2 className="text-3xl font-bold text-[#0A3D62] mb-6">Resources for Florida Homeowners</h2>

                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-5 h-5 text-[#0A3D62] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#333333]">Florida Department of Financial Services (Consumer Helpline):</strong>{' '}
                      <a href="tel:1-877-693-5236" className="text-[#0A3D62] hover:underline">1-877-693-5236</a> |{' '}
                      <a href="https://www.myfloridacfo.com" target="_blank" rel="noopener noreferrer" className="text-[#0A3D62] hover:underline">
                        myfloridacfo.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-5 h-5 text-[#0A3D62] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#333333]">United Policyholders (Disaster Recovery):</strong>{' '}
                      <a href="https://uphelp.org" target="_blank" rel="noopener noreferrer" className="text-[#0A3D62] hover:underline">
                        uphelp.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-5 h-5 text-[#0A3D62] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#333333]">Florida Office of Insurance Regulation (Complaint Portal):</strong>{' '}
                      <a href="https://www.floir.com" target="_blank" rel="noopener noreferrer" className="text-[#0A3D62] hover:underline">
                        floir.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-5 h-5 text-[#0A3D62] mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-[#333333]">National Flood Insurance Program (NFIP):</strong>{' '}
                      <a href="https://www.floodsmart.gov" target="_blank" rel="noopener noreferrer" className="text-[#0A3D62] hover:underline">
                        floodsmart.gov
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-200 my-12" />

              {/* Attribution */}
              <div className="bg-gray-100 rounded-xl p-6 mb-8">
                <p className="text-sm text-[#666666] mb-2">
                  <strong className="text-[#333333]">Report compiled by:</strong> RateMyAdjusters
                </p>
                <p className="text-sm text-[#666666] mb-2">
                  <strong className="text-[#333333]">Analysis lead:</strong> RateMyAdjusters editorial staff with firsthand experience in Florida
                  property restoration and hurricane claim recovery operations after Hurricanes Ian and Nicole
                </p>
                <p className="text-sm text-[#666666] mb-2">
                  <strong className="text-[#333333]">Publication date:</strong> January 2026
                </p>
                <p className="text-sm text-[#666666]">
                  <strong className="text-[#333333]">Questions or corrections:</strong>{' '}
                  <Link href="/contact" className="text-[#0A3D62] hover:underline">Contact us</Link>
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-sm text-[#666666] mb-12">
                <p>
                  <strong className="text-[#333333]">Disclaimer:</strong> This report is for informational and educational purposes only. It does
                  not constitute legal, financial, or insurance advice. RateMyAdjusters does not independently verify
                  individual claims or adjuster conduct. Patterns described are based on publicly available data and
                  field observations and may not represent all experiences. Consult a licensed attorney or public
                  adjuster for advice specific to your situation.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#0A3D62] to-[#072C49] rounded-2xl p-8 md:p-12 text-center text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Had an experience with a Hurricane Ian or Nicole adjuster?</h3>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Your review helps other homeowners know what to expect. RateMyAdjusters.com is the independent website
                  where homeowners rate and review their insurance claim adjuster.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/review"
                    className="bg-[#FF9800] hover:bg-[#F57C00] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                  >
                    Leave a Review
                  </Link>
                  <Link
                    href="/search"
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/20"
                  >
                    Search Adjusters
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
