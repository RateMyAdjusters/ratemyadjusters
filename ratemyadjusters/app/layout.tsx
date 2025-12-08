import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ratemyadjusters.com'),
  title: {
    default: 'RateMyAdjusters – Know Your Adjuster',
    template: '%s | RateMyAdjusters',
  },
  description: 'Real reviews of insurance adjusters from homeowners and contractors. Search 168,824 licensed adjusters by name, company, or state. Know who\'s handling your claim.',
  keywords: ['insurance adjuster reviews', 'adjuster ratings', 'claim adjuster', 'insurance claim', 'State Farm adjuster', 'Allstate adjuster', 'adjuster lookup'],
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
    title: 'RateMyAdjusters – Know Your Adjuster',
    description: 'Real reviews of insurance adjusters from homeowners and contractors. Search 168,824 licensed adjusters.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters – Know Your Adjuster',
    description: 'Real reviews of insurance adjusters from homeowners and contractors.',
    creator: '@ratemyadjusters',
  },
  verification: {
    google: 'your-google-verification-code', // Add later
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0F4C81" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
