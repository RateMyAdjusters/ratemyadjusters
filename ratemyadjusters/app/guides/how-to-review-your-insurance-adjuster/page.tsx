import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Search, Star, Shield, MessageSquare, ChevronRight, 
  Eye, Lock, CheckCircle2, AlertCircle, ArrowRight,
  Users, FileText, HelpCircle, Megaphone
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Review Your Insurance Adjuster | RateMyAdjusters',
  description: 'Want to leave a review for your insurance adjuster? Here\'s how to do it anonymously and help other homeowners protect themselves. Step-by-step guide.',
  keywords: [
    'how to review insurance adjuster',
    'leave a review for my adjuster',
    'rate an insurance adjuster',
    'complain about insurance adjuster',
    'report bad adjuster experience',
    'adjuster review site',
    'review insurance claim adjuster',
    'rate my adjuster',
    'insurance adjuster reviews'
  ],
  alternates: {
    canonical: 'https://ratemyadjusters.com/guides/how-to-review-your-insurance-adjuster',
  },
  openGraph: {
    title: 'How to Review Your Insurance Adjuster',
    description: 'Step-by-step guide to leaving an anonymous review for your insurance adjuster. Help other homeowners know what to expect.',
    type: 'article',
    url: 'https://ratemyadjusters.com/guides/how-to-review-your-insurance-adjuster',
    siteName: 'RateMyAdjusters',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Review Your Insurance Adjuster',
    description: 'Leave an anonymous review and help other homeowners protect themselves.',
  },
}

export default function HowToReviewAdjusterPage() {
  const faqs = [
    {
      question: 'Can I review my insurance adjuster anonymously?',
      answer: 'Yes, on RateMyAdjusters your reviews are 100% anonymous. We never share your identity with the adjuster, their employer, or anyone else. Your name, email, and IP address are never displayed publicly.',
    },
    {
      question: 'Where can I post a review about my adjuster?',
      answer: 'You can search your adjuster by name on RateMyAdjusters and click "Write a Review." If your adjuster isn\'t listed, you can add them in under 60 seconds and then leave your review.',
    },
    {
      question: 'Will my insurance company know I left a review?',
      answer: 'No. Reviews are anonymous and we do not notify insurance companies or adjusters when reviews are posted. Your identity is protected.',
    },
    {
      question: 'Can I get in trouble for leaving a negative review?',
      answer: 'Honest reviews based on your actual experience are protected speech. As long as your review is truthful and reflects your genuine experience, you are protected under the Consumer Review Fairness Act.',
    },
    {
      question: 'What should I include in my adjuster review?',
      answer: 'Focus on your actual experience: communication quality, professionalism, how fairly they assessed your claim, response times, and the final outcome. Be specific but factual — avoid personal attacks and stick to what actually happened.',
    },
    {
      question: 'What if my adjuster isn\'t listed on the site?',
      answer: 'You can add any licensed insurance adjuster to our database in under 60 seconds. Just click "Add Missing Adjuster," enter their name and state, and then leave your review.',
    },
    {
      question: 'Can I edit or delete my review later?',
      answer: 'Reviews are permanent to maintain integrity and prevent manipulation. If you made a factual error, contact us and we\'ll review your request.',
    },
    {
      question: 'Do adjusters see who left reviews?',
      answer: 'No. Adjusters can see reviews on their profile but cannot see who wrote them. We do not share reviewer identities under any circumstances.',
    },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Review Your Insurance Adjuster',
    description: 'Step-by-step guide to leaving an anonymous review for your insurance adjuster and helping other homeowners.',
    author: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
      url: 'https://ratemyadjusters.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RateMyAdjusters',
      url: 'https://ratemyadjusters.com',
    },
    mainEntityOfPage: 'https://ratemyadjusters.com/guides/how-to-review-your-insurance-adjuster',
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ratemyadjusters.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://ratemyadjusters.com/guides' },
      { '@type': 'ListItem', position: 3, name: 'How to Review Your Insurance Adjuster', item: 'https://ratemyadjusters.com/guides/how-to-review-your-insurance-adjuster' },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Review Your Insurance Adjuster',
    description: 'A step-by-step guide to leaving an anonymous review for your insurance adjuster on RateMyAdjusters.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Search for Your Adjuster',
        text: 'Go to RateMyAdjusters.com and enter your adjuster\'s name in the search bar. You can also filter by state or insurance company.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Click Write a Review',
        text: 'Once you find your adjuster\'s profile, click the "Write a Review" button.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Rate and Describe Your Experience',
        text: 'Select a star rating (1-5) and write about your experience. Include details about communication, fairness, and the claim outcome.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Submit Anonymously',
        text: 'Click submit. Your review will be posted anonymously — your identity is never shared.',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link href="/guides" className="text-gray-500 hover:text-gray-700">Guides</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">How to Review Your Adjuster</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <Megaphone className="w-4 h-4" />
              <span>Your voice matters</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              How to Review Your Insurance Adjuster
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl">
              Frustrated with how your claim was handled? You're not alone — and you can do something about it. 
              Reviews help hold adjusters accountable and protect other homeowners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
                Find Your Adjuster
              </Link>
              <Link 
                href="/review"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-blue-400"
              >
                <Star className="w-5 h-5" />
                Write a Review Now
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Lock className="w-5 h-5 text-green-600" />
                <span>100% Anonymous</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Legally Protected</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-purple-600" />
                <span>400K+ Adjusters Listed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Eye className="w-5 h-5 text-orange-600" />
                <span>Identity Never Shared</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          
          {/* Why Review Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Review an Insurance Adjuster?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Insurance adjusters have enormous power over your claim — they decide how much (if anything) you'll receive 
              after a disaster damages your home. Yet until now, there's been no way for homeowners to share their experiences 
              or warn others about problematic adjusters.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Your review can help future homeowners avoid bad experiences — or reward great ones. When adjusters know 
              they're being reviewed, they're more likely to treat policyholders fairly.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Help Other Homeowners</h3>
                <p className="text-sm text-gray-600">Your experience helps others know what to expect before their claim.</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Reward Good Adjusters</h3>
                <p className="text-sm text-gray-600">Great adjusters deserve recognition. Your positive review helps them stand out.</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Create Accountability</h3>
                <p className="text-sm text-gray-600">When adjusters know they're being reviewed, behavior improves.</p>
              </div>
            </div>
          </section>

          {/* Anonymous Section */}
          <section className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 md:p-8 border border-green-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Can I Stay Anonymous? Yes — 100%
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We understand you may be worried about retaliation or your review affecting future claims. 
                  That's why RateMyAdjusters is built from the ground up to protect your identity:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Your name is <strong>never</strong> displayed publicly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">No account required to leave a review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">We never share reviewer information with adjusters or insurance companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Honest reviews are protected under the Consumer Review Fairness Act</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What to Include Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What Should I Include in My Review?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The best reviews are specific, factual, and focused on your actual experience. Here's what to cover:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  Communication
                </h3>
                <p className="text-sm text-gray-600">
                  Did they return calls promptly? Were they easy to reach? Did they explain things clearly?
                </p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  Fairness
                </h3>
                <p className="text-sm text-gray-600">
                  Was the claim assessment fair? Did they try to lowball you? Were they thorough in their inspection?
                </p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Professionalism
                </h3>
                <p className="text-sm text-gray-600">
                  Were they respectful? Did they show up on time? Did they seem knowledgeable about their job?
                </p>
              </div>
              <div className="bg-white rounded-lg border p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600" />
                  Outcome
                </h3>
                <p className="text-sm text-gray-600">
                  Was your claim approved, denied, or partially paid? How long did the process take?
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> Stick to facts and your personal experience. Avoid personal attacks, speculation, 
                or anything you can't back up. The most helpful reviews are honest and specific.
              </p>
            </div>
          </section>

          {/* Step by Step Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How to Leave a Review — Step by Step
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-white rounded-lg border p-5">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Search for Your Adjuster</h3>
                  <p className="text-gray-600 mb-3">
                    Go to the search page and enter your adjuster's name. You can also filter by state or insurance company 
                    if you're not sure of the exact name.
                  </p>
                  <Link 
                    href="/search"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Search for an adjuster
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg border p-5">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Click "Write a Review"</h3>
                  <p className="text-gray-600">
                    Once you find your adjuster's profile, click the "Write a Review" button. You'll see it prominently 
                    displayed on their profile page.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg border p-5">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Rate and Describe Your Experience</h3>
                  <p className="text-gray-600">
                    Select a star rating (1-5 stars) and write about your experience. Include details about communication, 
                    fairness, professionalism, and the outcome of your claim. You can also specify the claim type 
                    (roof, water damage, fire, etc.).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white rounded-lg border p-5">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Submit Anonymously</h3>
                  <p className="text-gray-600">
                    Click submit and you're done! Your review will be posted anonymously — your identity is never shared 
                    with the adjuster, their employer, or anyone else.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/review"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                <Star className="w-5 h-5" />
                Write Your Review Now
              </Link>
              <p className="text-sm text-gray-500 mt-2">Takes less than 2 minutes</p>
            </div>
          </section>

          {/* Not Listed Section */}
          <section className="mb-12 bg-gray-100 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-200 rounded-full">
                <HelpCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Is Your Adjuster Not Listed?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We have over 400,000 adjusters in our database, but if yours isn't listed, you can add them yourself. 
                  It takes less than 60 seconds — just enter their name and state.
                </p>
                <Link 
                  href="/add-adjuster"
                  className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
                >
                  Add a Missing Adjuster
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Legal Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Legal & Privacy Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your right to post honest reviews is protected by federal law. The <strong>Consumer Review Fairness Act</strong> 
              makes it illegal for companies to prevent or punish consumers for posting honest reviews of their experiences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              As long as your review is truthful, based on your actual experience, and doesn't contain false statements of fact, 
              you are legally protected.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Our commitment:</strong> Reviews are public, but your identity is never shared. We do not sell 
                reviewer data, we do not notify adjusters who wrote reviews, and we stand behind our users' right to share 
                their honest experiences.
              </p>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              For more information, see our{' '}
              <Link href="/review-guidelines" className="text-blue-600 hover:underline">Review Guidelines</Link>,{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, and{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg border p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Ready to Share Your Experience?</h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Your review takes 2 minutes and helps countless homeowners prepare for their claims. 
              Every voice matters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
                Find Your Adjuster
              </Link>
              <Link 
                href="/review"
                className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-blue-400"
              >
                <Star className="w-5 h-5" />
                Write a Review
              </Link>
            </div>
          </section>

          {/* Related Links */}
          <section className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Related Guides</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/guides/what-to-expect-when-adjuster-visits"
                className="block p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h4 className="font-medium text-gray-900 mb-1">What to Expect When an Adjuster Visits</h4>
                <p className="text-sm text-gray-600">Prepare for your claim inspection</p>
              </Link>
              <Link 
                href="/guides/claim-denied-what-to-do"
                className="block p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h4 className="font-medium text-gray-900 mb-1">What to Do If Your Claim Is Denied</h4>
                <p className="text-sm text-gray-600">Steps to appeal or escalate</p>
              </Link>
              <Link 
                href="/guides/what-is-a-public-adjuster"
                className="block p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h4 className="font-medium text-gray-900 mb-1">What Is a Public Adjuster?</h4>
                <p className="text-sm text-gray-600">When to hire help with your claim</p>
              </Link>
              <Link 
                href="/guides/how-to-negotiate-with-adjuster"
                className="block p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h4 className="font-medium text-gray-900 mb-1">How to Communicate with Your Adjuster</h4>
                <p className="text-sm text-gray-600">Tips for a smoother claims process</p>
              </Link>
            </div>
          </section>
        </div>

        {/* Footer Disclaimer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> RateMyAdjusters LLC provides this guide for general informational purposes only. 
              This is not legal advice. Reviews must comply with our Review Guidelines and be based on genuine experiences. 
              We are not responsible for the content of user-submitted reviews.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
