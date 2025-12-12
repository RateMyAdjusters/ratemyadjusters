export interface Guide {
  slug: string
  title: string
  description: string
  readTime: string
  category: string
  featured?: boolean
  new?: boolean
}

export const guidesData: Guide[] = [
  // ===== CORE GUIDES =====
  {
    slug: 'what-to-expect-when-adjuster-visits',
    title: 'What to Expect When an Insurance Adjuster Visits Your Home',
    description: 'Your complete guide to the insurance claim inspection process—from preparation to what happens after the adjuster leaves.',
    readTime: '5 min read',
    category: 'Claims Process',
    featured: true,
  },
  {
    slug: 'what-is-an-insurance-adjuster',
    title: 'What Is an Insurance Adjuster?',
    description: 'Learn about the role of insurance adjusters, what they do during the claims process, and how they evaluate property damage.',
    readTime: '6 min read',
    category: 'Basics',
    featured: true,
  },
  {
    slug: 'staff-vs-independent-adjuster',
    title: 'Staff vs. Independent Adjusters',
    description: 'Understand the differences between staff adjusters, independent adjusters, and public adjusters, and how each type works.',
    readTime: '5 min read',
    category: 'Adjuster Types',
  },
  {
    slug: 'what-is-a-public-adjuster',
    title: 'What Is a Public Adjuster?',
    description: 'Learn what public adjusters do, how they differ from company adjusters, and when homeowners may consider hiring one.',
    readTime: '6 min read',
    category: 'Adjuster Types',
  },
  {
    slug: 'how-to-file-insurance-claim',
    title: 'How to File an Insurance Claim',
    description: 'A step-by-step overview of the insurance claim process, from documenting damage to working with your adjuster.',
    readTime: '7 min read',
    category: 'Claims Process',
  },
  {
    slug: 'claim-denied-what-to-do',
    title: 'What to Do If Your Claim Is Denied',
    description: 'Understand your options if your insurance claim is denied, including the appeals process and when to seek professional help.',
    readTime: '7 min read',
    category: 'Claims Process',
  },
  {
    slug: 'how-to-negotiate-with-adjuster',
    title: 'How to Communicate with Your Adjuster',
    description: 'Tips for effective communication with your insurance adjuster to help ensure a smooth claims process.',
    readTime: '6 min read',
    category: 'Claims Process',
  },

  // ===== INDUSTRY DEEP DIVES =====
  {
    slug: 'wall-street-blackrock-insurance-claims',
    title: 'How Wall Street, BlackRock, and Alacrity Solutions Shape Insurance Claims',
    description: 'Understanding how asset managers, private equity, and vendor networks influence the modern insurance claim experience.',
    readTime: '12 min read',
    category: 'Industry Analysis',
    new: true,
  },
  {
    slug: 'ai-insurance-claims-2025',
    title: 'How AI Is Transforming Homeowners Insurance in 2025',
    description: 'Learn how artificial intelligence is changing claims processing, underwriting, fraud detection, and what it means for homeowners.',
    readTime: '15 min read',
    category: 'Technology',
    new: true,
  },
  {
    slug: 'mckinsey-allstate-insurance-claims-history',
    title: 'How the Insurance Industry Fell Behind: The McKinsey Era',
    description: 'An analysis of how claims practices evolved from the 1990s to today, and how technology is reshaping the policyholder experience.',
    readTime: '12 min read',
    category: 'Industry History',
    new: true,
  },
  {
    slug: 'vendor-networks-insurance-claims',
    title: 'Vendor Networks: Sedgwick, Alacrity, Wardlaw & Third-Party Administrators',
    description: 'How third-party administrators, managed repair networks, and desk reviewers influence insurance claim outcomes.',
    readTime: '14 min read',
    category: 'Industry Analysis',
    new: true,
  },

  // ===== ADD NEW GUIDES BELOW THIS LINE =====
]
