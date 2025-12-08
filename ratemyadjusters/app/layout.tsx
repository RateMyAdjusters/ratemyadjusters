import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ratemyadjusters.com'),
  title: {
    default: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
    template: '%s | RateMyAdjusters',
  },
  description: 'Search 168,824 licensed insurance adjusters by name, company, or state. Read real reviews from homeowners and contractors before your claim. Know your adjuster.',
  keywords: ['insurance adjuster reviews', 'adjuster ratings', 'claim adjuster', 'insurance claim', 'State Farm adjuster', 'Allstate adjuster', 'adjuster lookup', 'insurance adjuster search'],
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters | Insurance Adjuster Reviews & Ratings',
    description: 'Search 168,824 licensed insurance adjusters. Read real reviews from homeowners and contractors.',
    creator: '@ratemyadjusters',
  },
  verification: {
    google: 'your-google-verification-code', // Add your verification code
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

  // Organization Schema - brand signals
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RateMyAdjusters',
    url: 'https://ratemyadjusters.com',
    logo: 'https://ratemyadjusters.com/logo.png',
    description: 'The leading platform for insurance adjuster reviews and ratings. Helping homeowners and contractors make informed decisions.',
    foundingDate: '2025',
    sameAs: [
      'https://twitter.com/ratemyadjusters',
      // Add other social profiles as you create them
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: 'https://ratemyadjusters.com/contact',
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
