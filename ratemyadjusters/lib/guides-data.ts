// lib/guides-data.ts
// Central configuration for all guides - add new guides here and the index page auto-updates

export interface Guide {
  slug: string
  title: string
  description: string
  readTime: string
  category: 'Claims Process' | 'Basics' | 'Adjuster Types' | 'Industry Analysis' | 'Industry History' | 'Technology' | 'How To'
  new?: boolean
}

export const guides: Guide[] = [
  // HOW TO GUIDES (High Intent)
  {
    slug: 'how-to-review-your-insurance-adjuster',
    title: 'How to Review Your Insurance Adjuster',
    description: 'Step-by-step guide to leaving an anonymous review and helping other homeowners protect themselves.',
    readTime: '5 min read',
    category: 'How To',
    new: true,
  },
  
  // CORE GUIDES - Claims Process
  {
    slug: 'what-to-expect-when-adjuster-visits',
    title: 'What to Expect When an Adjuster Visits',
    description: 'Prepare for your insurance adjuster inspection with this comprehensive guide.',
    readTime: '8 min read',
    category: 'Claims Process',
  },
  {
    slug: 'how-to-file-insurance-claim',
    title: 'How to File an Insurance Claim',
    description: 'Step-by-step guide to filing a homeowners insurance claim after property damage.',
    readTime: '10 min read',
    category: 'Claims Process',
  },
  {
    slug: 'claim-denied-what-to-do',
    title: 'What to Do If Your Claim Is Denied',
    description: 'Your options when an insurance company denies your property damage claim.',
    readTime: '9 min read',
    category: 'Claims Process',
  },
  {
    slug: 'how-to-negotiate-with-adjuster',
    title: 'How to Communicate with Your Adjuster',
    description: 'Tips for effective communication during the claims process.',
    readTime: '7 min read',
    category: 'Claims Process',
  },

  // CORE GUIDES - Basics
  {
    slug: 'what-is-an-insurance-adjuster',
    title: 'What Is an Insurance Adjuster?',
    description: 'Understanding the role of insurance adjusters in the claims process.',
    readTime: '6 min read',
    category: 'Basics',
  },

  // CORE GUIDES - Adjuster Types
  {
    slug: 'staff-vs-independent-adjuster',
    title: 'Staff vs. Independent Adjusters',
    description: 'The key differences between staff adjusters and independent adjusters.',
    readTime: '7 min read',
    category: 'Adjuster Types',
  },
  {
    slug: 'what-is-a-public-adjuster',
    title: 'What Is a Public Adjuster?',
    description: 'When and why you might hire a public adjuster to represent your interests.',
    readTime: '8 min read',
    category: 'Adjuster Types',
  },

  // INDUSTRY DEEP DIVES
  {
    slug: 'wall-street-blackrock-insurance-claims',
    title: 'How Wall Street, BlackRock, and Alacrity Solutions Shape Insurance Claims',
    description: 'Understanding institutional investment in claims management and what it means for policyholders.',
    readTime: '12 min read',
    category: 'Industry Analysis',
    new: false,
  },
  {
    slug: 'ai-insurance-claims-2025',
    title: 'How AI Is Transforming Homeowners Insurance in 2025',
    description: 'The rise of automated claims processing, AI damage assessment, and what policyholders should know.',
    readTime: '10 min read',
    category: 'Technology',
    new: false,
  },
  {
    slug: 'mckinsey-allstate-insurance-claims-history',
    title: 'How the Insurance Industry Fell Behind: The McKinsey Era',
    description: 'The controversial history of claims management consulting and its lasting impact on policyholders.',
    readTime: '11 min read',
    category: 'Industry History',
    new: false,
  },
  {
    slug: 'vendor-networks-insurance-claims',
    title: 'Vendor Networks: Sedgwick, Alacrity & Third-Party Administrators',
    description: 'How TPAs and vendor networks influence the claims process between you and your insurer.',
    readTime: '9 min read',
    category: 'Industry Analysis',
    new: false,
  },
]

// Helper function to get guides by category
export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter(g => g.category === category)
}

// Helper function to get featured/new guides
export function getNewGuides(): Guide[] {
  return guides.filter(g => g.new)
}

// Category display order and labels
export const categoryConfig = {
  'How To': { label: 'How To Guides', order: 0 },
  'Claims Process': { label: 'Claims Process', order: 1 },
  'Basics': { label: 'Getting Started', order: 2 },
  'Adjuster Types': { label: 'Types of Adjusters', order: 3 },
  'Industry Analysis': { label: 'Industry Deep Dives', order: 4 },
  'Industry History': { label: 'Industry History', order: 5 },
  'Technology': { label: 'Technology & Trends', order: 6 },
}
