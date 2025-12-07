import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RateMyAdjusters – Find & Review Insurance Adjusters',
  description: 'Check real reviews for insurance adjusters. Know who\'s handling your claim before they show up. Search by company, name, or state.',
  keywords: 'insurance adjuster, adjuster reviews, claim adjuster rating, insurance claim, State Farm adjuster, Allstate adjuster',
  openGraph: {
    title: 'RateMyAdjusters – Find & Review Insurance Adjusters',
    description: 'Check real reviews for insurance adjusters. Know who\'s handling your claim before they show up.',
    type: 'website',
    locale: 'en_US',
    siteName: 'RateMyAdjusters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RateMyAdjusters – Find & Review Insurance Adjusters',
    description: 'Check real reviews for insurance adjusters. Know who\'s handling your claim before they show up.',
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
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1e293b" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
