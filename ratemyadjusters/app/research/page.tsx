// app/research/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Clock, ChevronRight, TrendingUp, AlertTriangle, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Original Research | RateMyAdjusters',
  description: 'Data-driven research and analysis on insurance adjuster behavior, claim outcomes, and industry trends. Free reports based on public data and field experience.',
  openGraph: {
    title: 'Original Research | RateMyAdjusters',
    description: 'Data-driven research and analysis on insurance adjuster behavior, claim outcomes, and industry trends.',
    url: 'https://ratemyadjusters.com/research',
    type: 'website',
  },
};

export default function ResearchIndex() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com' },
      { '@type': 'ListItem', position: 2, name: 'Research' },
    ],
  };

  const reports = [
    {
      slug: 'hurricane-ian-nicole-claims-crisis',
      title: 'The 2022 Florida Hurricane Claims Crisis',
      subtitle: 'Insurance Adjuster Behavior After Hurricanes Ian and Nicole',
      description: 'A data-driven report on how insurers and their adjusters handled 776,000+ Hurricane Ian claims in Florida, including denial patterns, settlement speed, and litigation trends.',
      date: 'January 16, 2026',
      readTime: '25 min read',
      dataRange: 'Sept 2022 – Dec 2024',
      featured: true,
      stats: [
        { label: 'Claims Analyzed', value: '776,941' },
        { label: 'Insured Losses', value: '$21.4B' },
        { label: 'Closed Without Payment', value: '34%' },
      ],
      tags: ['Hurricane Claims', 'Florida', 'Denial Rates', 'Settlement Speed'],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-[#F8F9FA]">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A3D62] via-[#0E4A75] to-[#072C49] text-white">
          <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white/90">Research</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-[#FF9800] text-white text-sm font-bold px-4 py-1.5 rounded-full">
                <FileText className="w-4 h-4" />
                ORIGINAL RESEARCH
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Research & Reports
            </h1>

            <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
              Data-driven analysis on insurance adjuster behavior, claim outcomes, and industry trends.
              All reports are free, based on public data and firsthand field experience.
            </p>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {reports.map((report) => (
              <Link
                key={report.slug}
                href={`/research/${report.slug}`}
                className="block group"
              >
                <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Featured Badge */}
                  {report.featured && (
                    <div className="bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white text-sm font-semibold px-6 py-2">
                      FEATURED REPORT
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Content */}
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0A3D62] group-hover:text-[#0E4A75] transition-colors mb-2">
                          {report.title}
                        </h2>
                        <p className="text-lg text-[#666666] mb-4">{report.subtitle}</p>
                        <p className="text-[#333333] leading-relaxed mb-6">
                          {report.description}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-[#666666] mb-6">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            {report.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {report.readTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4" />
                            Data: {report.dataRange}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {report.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-[#666666] text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats Sidebar */}
                      <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <h3 className="text-sm font-semibold text-[#0A3D62] uppercase tracking-wide">Key Figures</h3>
                          {report.stats.map((stat) => (
                            <div key={stat.label}>
                              <div className="text-2xl font-bold text-[#0A3D62]">{stat.value}</div>
                              <div className="text-sm text-[#666666]">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <span className="inline-flex items-center gap-2 text-[#0A3D62] font-semibold group-hover:gap-3 transition-all">
                        Read Full Report
                        <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#0A3D62] mb-6">Coming Soon</h2>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Scale className="w-6 h-6 text-[#0A3D62]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#333333] mb-1">Carrier Denial Rate Comparison</h3>
                    <p className="text-sm text-[#666666]">How major insurance companies compare on claim approval rates and settlement fairness.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#FF9800]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#333333] mb-1">Public Adjuster Impact Study</h3>
                    <p className="text-sm text-[#666666]">Does hiring a public adjuster lead to better claim outcomes? A data analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-[#0A3D62] to-[#072C49] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Have Data to Share?</h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              If you're a public adjuster, attorney, or researcher with data on claim outcomes,
              we'd love to collaborate on future reports.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#0A3D62] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
