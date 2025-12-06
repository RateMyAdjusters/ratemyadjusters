export function generateSlug(firstName: string, lastName: string, company?: string, state?: string): string {
  const parts = [firstName, lastName]
  if (company) parts.push(company)
  if (state) parts.push(state)
  
  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatRating(rating: number | null): string {
  if (rating === null) return 'N/A'
  return rating.toFixed(1)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getStarArray(rating: number): ('full' | 'half' | 'empty')[] {
  const stars: ('full' | 'half' | 'empty')[] = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full')
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }
  
  return stars
}

export function getRatingColor(rating: number | null): string {
  if (rating === null) return 'text-gray-400'
  if (rating >= 4) return 'text-green-500'
  if (rating >= 3) return 'text-yellow-500'
  if (rating >= 2) return 'text-orange-500'
  return 'text-red-500'
}

export function getRatingBgColor(rating: number | null): string {
  if (rating === null) return 'bg-gray-100'
  if (rating >= 4) return 'bg-green-100'
  if (rating >= 3) return 'bg-yellow-100'
  if (rating >= 2) return 'bg-orange-100'
  return 'bg-red-100'
}
