import { Star, StarHalf } from 'lucide-react'
import { getStarArray } from '@/lib/utils'

interface StarRatingProps {
  rating: number | null
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  reviewCount?: number
}

export default function StarRating({ 
  rating, 
  size = 'md', 
  showNumber = true,
  reviewCount 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  if (rating === null) {
    return (
      <div className="flex items-center space-x-1 text-gray-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`${sizeClasses[size]} fill-gray-200 text-gray-200`} />
        ))}
        {showNumber && <span className={`ml-1 ${textSizeClasses[size]}`}>No reviews</span>}
      </div>
    )
  }

  const stars = getStarArray(rating)

  return (
    <div className="flex items-center">
      <div className="flex">
        {stars.map((star, i) => {
          if (star === 'full') {
            return <Star key={i} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
          } else if (star === 'half') {
            return <StarHalf key={i} className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
          } else {
            return <Star key={i} className={`${sizeClasses[size]} fill-gray-200 text-gray-200`} />
          }
        })}
      </div>
      {showNumber && (
        <span className={`ml-2 font-semibold ${textSizeClasses[size]} text-gray-700`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && (
            <span className="font-normal text-gray-500 ml-1">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </span>
      )}
    </div>
  )
}
