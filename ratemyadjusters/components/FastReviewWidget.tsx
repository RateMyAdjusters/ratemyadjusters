'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FastReviewWidgetProps {
  adjusterId: string
  adjusterName: string
}

export default function FastReviewWidget({ adjusterId, adjusterName }: FastReviewWidgetProps) {
  const [hoveredStar, setHoveredStar] = useState(0)
  const router = useRouter()

  const handleClick = (rating: number) => {
    router.push(`/review?adjuster=${adjusterId}&rating=${rating}`)
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-100 rounded-xl p-4 mt-4">
      <p className="text-sm text-gray-700 mb-2">How was your experience with {adjusterName}?</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= hoveredStar
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Click to start your review — your experience helps the next homeowner.</p>
    </div>
  )
}
