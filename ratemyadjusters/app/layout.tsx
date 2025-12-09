import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ratemyadjusters.com'),
  title: {
    default: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
    template: '%s | RateMyAdjusters',
  },
  description: 'Search 168,824 licensed insurance adjusters by name, company, or state. Read real reviews from homeowners and contractors before your claim. Know your adjuster.',
  keywords: ['insurance adjuster reviews', 'adjuster ratings', 'claim adjuster', 'insurance claim', 'State Farm adjuster', 'Allstate adjuster', 'adjuster lookup', 'insurance adjuster search', 'rate my adjuster', 'insurance claim help'],
  authors: [{ name: 'RateMyAdjusters' }],
  creator: 'RateMyAdjusters',
  publisher: 'RateMyAdjusters',
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
    siteName: 'RateMyAdjusters',
    title: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
    description: 'Search 168,824 licensed insurance adjusters. Read real reviews from homeowners and contractors before your claim.',
    images: [
      {
        url: 'https://ratemyadjusters.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RateMyAdjusters - Know Your Adjuster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
    description: 'Search 168,824 licensed insurance adjusters. Read real reviews from homeowners and contractors.',
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
  // WebSite Schema - enables sitelinks search box in Google
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RateMyAdjusters',
    alternateName: 'Rate My Adjusters',
    url: 'https://ratemyadjusters.com',
    description: 'Search 168,824 licensed insurance adjusters by name, company, or state. Read real reviews from homeowners and contractors.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ratemyadjusters.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Organization Schema - brand signals + rich results
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RateMyAdjusters',
    alternateName: 'Rate My Adjusters',
    url: 'https://ratemyadjusters.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://ratemyadjusters.com/logo.png',
      width: 512,
      height: 512,
    },
    image: 'https://ratemyadjusters.com/og-image.png',
    description: 'The leading platform for insurance adjuster reviews and ratings. Helping homeowners and contractors make informed decisions about their insurance claims.',
    foundingDate: '2025',
    founder: {
      '@type': 'Person',
      name: 'RateMyAdjusters Team',
    },
    sameAs: [
      'https://twitter.com/ratemyadjusters',
      'https://www.facebook.com/ratemyadjusters',
      'https://www.linkedin.com/company/ratemyadjusters',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://ratemyadjusters.com/contact',
      availableLanguage: 'English',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: 'Insurance Adjuster Reviews',
  }

  // Review Platform Schema - tells Google this is a review site
  const reviewPlatformSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'RateMyAdjusters',
    url: 'https://ratemyadjusters.com',
    applicationCategory: 'ReviewApplication',
    operatingSystem: 'Web',
    description: 'Platform for rating and reviewing insurance adjusters',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '168824',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F4C81" />
        
        {/* Structured Data */}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewPlatformSchema) }}
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
