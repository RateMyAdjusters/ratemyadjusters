import Link from 'next/link'
import { Search } from 'lucide-react'
import StarRating from '@/components/StarRating'

// Mock data - replace with Supabase query
const mockAdjusters = [
  {
    id: '1',
    full_name: 'John Smith',
    slug: 'john-smith',
    company: { name: 'State Farm', slug: 'state-farm' },
    title: 'Field Adjuster',
    state: 'MI',
    avg_rating: 3.8,
    total_reviews: 12,
  },
  {
    id: '2',
    full_name: 'Sarah Johnson',
    slug: 'sarah-johnson',
    company: { name: 'Allstate', slug: 'allstate' },
    title: 'Senior Adjuster',
    state: 'MI',
    avg_rating: 4.2,
    total_reviews: 8,
  },
  {
    id: '3',
    full_name: 'Mike Williams',
    slug: 'mike-williams',
    company: { name: 'Auto-Owners', slug: 'auto-owners' },
    title: 'Property Adjuster',
    state: 'MI',
    avg_rating: 2.9,
    total_reviews: 5,
  },
]

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; company?: string; state?: string }
}) {
  const query = searchParams.q || ''
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Find an Adjuster</h1>
          
          {/* Search Form */}
          <form className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by adjuster name..."
                className="input pl-10"
              />
            </div>
            <select name="company" className="input sm:w-48">
              <option value="">All Companies</option>
              <option value="state-farm">State Farm</option>
              <option value="allstate">Allstate</option>
              <option value="usaa">USAA</option>
              <option value="auto-owners">Auto-Owners</option>
            </select>
            <select name="state" className="input sm:w-32">
              <option value="">All States</option>
              <option value="MI">Michigan</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="CA">California</option>
            </select>
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results */}
        <div className="mb-4 text-gray-600">
          {mockAdjusters.length} adjusters found
        </div>

        <div className="space-y-4">
          {mockAdjusters.map((adjuster) => (
            <Link
              key={adjuster.id}
              href={`/adjuster/${adjuster.company.slug}/${adjuster.slug}`}
              className="card block hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-gray-400">
                    {adjuster.full_name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {adjuster.full_name}
                  </h2>
                  <p className="text-gray-600">
                    {adjuster.company.name} • {adjuster.title} • {adjuster.state}
                  </p>
                  <StarRating 
                    rating={adjuster.avg_rating} 
                    size="sm" 
                    reviewCount={adjuster.total_reviews}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {mockAdjusters.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No adjusters found</h3>
            <p className="text-gray-500 mb-4">
              Can't find who you're looking for? Add them when you write a review.
            </p>
            <Link href="/review" className="btn-primary">
              Write a Review
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
