import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RateMyAdjusters - Insurance Adjuster Reviews & Ratings',
    template: '%s | RateMyAdjusters',
  },
  description: 'Read reviews and ratings of insurance adjusters from State Farm, Allstate, USAA, and more. Know your adjuster before your claim.',
  keywords: ['insurance adjuster', 'adjuster reviews', 'claim adjuster rating', 'State Farm adjuster', 'Allstate adjuster'],
  authors: [{ name: 'RateMyAdjusters' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ratemyadjusters.com',
    siteName: 'RateMyAdjusters',
    title: 'RateMyAdjusters - Insurance Adjuster Reviews & Ratings',
    description: 'Read reviews and ratings of insurance adjusters from State Farm, Allstate, USAA, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters - Insurance Adjuster Reviews & Ratings',
    description: 'Read reviews and ratings of insurance adjusters from State Farm, Allstate, USAA, and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
