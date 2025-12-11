import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with RateMyAdjusters. Submit inquiries for general questions, press/media, legal matters, adjuster profiles, partnerships, bug reports, or feedback.',
  keywords: [
    'contact RateMyAdjusters',
    'insurance adjuster questions',
    'adjuster profile help',
    'RateMyAdjusters support',
    'press inquiries',
    'media contact',
    'legal inquiries',
    'partnership opportunities',
  ],
  openGraph: {
    title: 'Contact Us | RateMyAdjusters',
    description: 'Get in touch with RateMyAdjusters. Questions, press inquiries, legal matters, or partnerships.',
    type: 'website',
    url: 'https://ratemyadjusters.com/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | RateMyAdjusters',
    description: 'Get in touch with RateMyAdjusters. Questions, press inquiries, legal matters, or partnerships.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://ratemyadjusters.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
