export interface Company {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website: string | null
  headquarters_state: string | null
  total_adjusters: number
  total_reviews: number
  avg_rating: number | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface Adjuster {
  id: string
  first_name: string
  last_name: string
  full_name: string
  slug: string
  company_id: string | null
  company?: Company
  title: string | null
  region: string | null
  state: string | null
  email: string | null
  linkedin_url: string | null
  total_reviews: number
  avg_rating: number | null
  communication_score: number | null
  fairness_score: number | null
  timeliness_score: number | null
  professionalism_score: number | null
  approval_rate: number | null
  profile_claimed: boolean
  claimed_by_user_id: string | null
  created_at: string
  updated_at: string
  meta_title: string | null
  meta_description: string | null
}

export interface Review {
  id: string
  adjuster_id: string
  adjuster?: Adjuster
  user_id: string | null
  overall_rating: number
  communication_rating: number | null
  fairness_rating: number | null
  timeliness_rating: number | null
  professionalism_rating: number | null
  claim_type: string | null
  claim_outcome: string | null
  claim_year: number | null
  title: string | null
  review_text: string
  would_recommend: boolean | null
  reviewer_type: string
  reviewer_display_name: string | null
  reviewer_verified: boolean
  status: 'pending' | 'approved' | 'rejected' | 'flagged'
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  auth_id: string | null
  email: string
  display_name: string | null
  user_type: 'homeowner' | 'contractor' | 'public_adjuster' | 'restoration_company' | 'other'
  company_name: string | null
  company_website: string | null
  reviews_count: number
  helpful_votes_received: number
  email_notifications: boolean
  created_at: string
  updated_at: string
  last_login_at: string | null
}

export const CLAIM_TYPES = [
  { value: 'property', label: 'Property Damage' },
  { value: 'auto', label: 'Auto' },
  { value: 'water_damage', label: 'Water Damage' },
  { value: 'fire', label: 'Fire' },
  { value: 'wind', label: 'Wind/Storm' },
  { value: 'hail', label: 'Hail' },
  { value: 'theft', label: 'Theft' },
  { value: 'liability', label: 'Liability' },
  { value: 'other', label: 'Other' },
] as const

export const CLAIM_OUTCOMES = [
  { value: 'approved', label: 'Fully Approved' },
  { value: 'partial', label: 'Partially Approved' },
  { value: 'denied', label: 'Denied' },
  { value: 'pending', label: 'Still Pending' },
  { value: 'withdrawn', label: 'Withdrawn' },
] as const

export const REVIEWER_TYPES = [
  { value: 'homeowner', label: 'Homeowner' },
  { value: 'contractor', label: 'Contractor' },
  { value: 'public_adjuster', label: 'Public Adjuster' },
  { value: 'restoration_company', label: 'Restoration Company' },
  { value: 'other', label: 'Other' },
] as const
