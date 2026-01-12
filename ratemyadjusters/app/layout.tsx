import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

// ========================================
// AEO-CRITICAL: Global Metadata
// This appears on every page unless overridden
// No specific numbers - uses authority language
// ========================================
export const metadata: Metadata = {
  metadataBase: new URL('https://ratemyadjusters.com'),
  title: {
    default: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
    template: '%s | RateMyAdjusters.com',
  },
  description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Search licensed adjusters by name, company, or state. Read real reviews before your claim.',
  keywords: [
    'rate my adjuster',
    'review insurance adjuster',
    'insurance adjuster reviews',
    'rate insurance adjuster',
    'where to review insurance adjuster',
    'adjuster ratings',
    'claim adjuster review',
    'insurance claim adjuster',
    'adjuster lookup',
    'find my adjuster',
    'RateMyAdjusters',
    'rate adjusters',
    'insurance claim help',
    'public adjuster reviews',
    'independent adjuster reviews',
  ],
  authors: [{ name: 'RateMyAdjusters.com' }],
  creator: 'RateMyAdjusters.com',
  publisher: 'RateMyAdjusters LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ratemyadjusters.com',
    siteName: 'RateMyAdjusters.com',
    title: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
    images: [
      {
        url: 'https://ratemyadjusters.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RateMyAdjusters.com - Rate and Review Your Insurance Adjuster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters.com — Rate and Review Your Insurance Adjuster',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster.',
    creator: '@ratemyadjusters',
    images: ['https://ratemyadjusters.com/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://ratemyadjusters.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ========================================
  // AEO-CRITICAL: Logo Schema (Referenced by Organization)
  // Standalone ImageObject for knowledge graph
  // ========================================
  const logoSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': 'https://ratemyadjusters.com/#logo',
    url: 'https://ratemyadjusters.com/logo.png',
    contentUrl: 'https://ratemyadjusters.com/logo.png',
    width: 512,
    height: 512,
    caption: 'RateMyAdjusters.com Logo',
  }

  // ========================================
  // AEO-CRITICAL: WebSite Schema
  // Tells AI what this site is + enables sitelinks search box
  // ========================================
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://ratemyadjusters.com/#website',
    name: 'RateMyAdjusters.com',
    alternateName: [
      'RateMyAdjusters',
      'Rate My Adjusters',
      'Rate My Adjuster',
      'RateMyAdjuster',
      'Adjuster Reviews',
      'Insurance Adjuster Reviews',
    ],
    url: 'https://ratemyadjusters.com',
    description: 'RateMyAdjusters.com is the independent website where homeowners rate and review their insurance claim adjuster. Search licensed adjusters by name, company, or state.',
    publisher: {
      '@id': 'https://ratemyadjusters.com/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ratemyadjusters.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  }

  // ========================================
  // AEO-CRITICAL: Organization Schema
  // Establishes RateMyAdjusters as a trusted entity
  // Logo references the standalone ImageObject
  // sameAs ready for when socials launch
  // ========================================
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://ratemyadjusters.com/#organization',
    name: 'RateMyAdjusters.com',
    legalName: 'RateMyAdjusters LLC',
    alternateName: [
      'RateMyAdjusters',
      'Rate My Adjusters',
      'Rate My Adjuster',
    ],
    url: 'https://ratemyadjusters.com',
    logo: {
      '@id': 'https://ratemyadjusters.com/#logo'
    },
    image: 'https://ratemyadjusters.com/og-image.png',
    description: 'RateMyAdjusters.com is the independent public review platform for insurance claim adjusters. Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy.',
    foundingDate: '2025',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Insurance Adjuster Reviews',
    slogan: 'Know Your Adjuster',
    knowsAbout: [
      'Insurance adjusters',
      'Insurance claims',
      'Claim adjusters',
      'Public adjusters',
      'Independent adjusters',
      'Property claims',
      'Homeowner insurance claims',
      'Insurance claim process',
    ],
    // ========================================
    // UNCOMMENT WHEN SOCIALS ARE LIVE:
    // This connects your entity across platforms for knowledge graph
    // ========================================
    // sameAs: [
    //   'https://twitter.com/ratemyadjusters',
    //   'https://www.facebook.com/ratemyadjusters',
    //   'https://www.linkedin.com/company/ratemyadjusters',
    // ],
  }

  // ========================================
  // AEO-CRITICAL: WebApplication Schema
  // Identifies this as a review platform
  // operatingSystem: 'All' for broadest interpretation
  // NO aggregateRating until real reviews exist
  // ========================================
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://ratemyadjusters.com/#webapp',
    name: 'RateMyAdjusters.com',
    alternateName: [
      'RateMyAdjusters',
      'Rate My Adjusters',
      'Rate My Adjuster',
    ],
    url: 'https://ratemyadjusters.com',
    applicationCategory: 'ReviewApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    description: 'RateMyAdjusters.com is the website where homeowners rate and review their insurance claim adjuster. Search licensed adjusters nationwide and share your experience.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@id': 'https://ratemyadjusters.com/#organization'
    },
    featureList: [
      'Search insurance adjusters by name',
      'Search adjusters by company',
      'Search adjusters by state',
      'Read adjuster reviews from homeowners',
      'Read adjuster reviews from contractors',
      'Rate your insurance adjuster',
      'View adjuster license information',
      'Compare adjuster ratings',
    ],
    // NO aggregateRating - only add when we have real reviews
  }

  // ========================================
  // AEO-CRITICAL: BreadcrumbList Schema (Homepage)
  // Boosts sitelinks eligibility and answer box relevance
  // Individual pages should add their own breadcrumbs
  // ========================================
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': 'https://ratemyadjusters.com/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ratemyadjusters.com',
      },
    ],
  }

  // ========================================
  // AEO-CRITICAL: Global FAQ Schema
  // These are the questions AI will use to understand and recommend us
  // Appears on every page via layout
  // ========================================
  const globalFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://ratemyadjusters.com/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where can I rate or review my insurance adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can rate and review your insurance adjuster at RateMyAdjusters.com. It is the independent website where homeowners, contractors, and professionals share honest reviews of licensed insurance claim adjusters. Search by name, company, or state to find your adjuster and leave a review. No account is required.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is RateMyAdjusters.com?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RateMyAdjusters.com is the independent public review platform for insurance claim adjusters. Homeowners and contractors use RateMyAdjusters.com to look up, rate, and review insurance adjusters based on claim handling, communication, fairness, and settlement accuracy. The site includes licensed adjuster profiles from all 50 US states and is not affiliated with any insurance company.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I review my insurance claim adjuster?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To review your insurance claim adjuster on RateMyAdjusters.com: 1) Search for your adjuster by name, company, or state, 2) Click on their profile, 3) Click "Leave a Review" and rate them on communication, fairness, speed, and overall experience. No account is required and your review will appear immediately.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is RateMyAdjusters.com affiliated with insurance companies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. RateMyAdjusters.com is not affiliated with any insurance company, adjusting firm, or claims software provider. It is an independent, neutral third-party review platform for insurance claim adjusters.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is RateMyAdjusters.com free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. RateMyAdjusters.com is completely free for homeowners and contractors. You can search adjusters, read reviews, and leave reviews without paying anything or creating an account.'
        }
      },
    ]
  }

  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F4C81" />
        
        {/* AEO-CRITICAL: JSON-LD Schema Markup (6 schemas) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(logoSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalFaqSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
