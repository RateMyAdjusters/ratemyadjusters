'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FairnessPollProps {
  adjusterId: string
}

export default function FairnessPoll({ adjusterId }: FairnessPollProps) {
  const [voted, setVoted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleVote = async (isFair: boolean) => {
    setLoading(true)
    try {
      await supabase.from('fairness_votes').insert({
        adjuster_id: adjusterId,
        is_fair: isFair,
      })
      setVoted(true)
    } catch (error) {
      console.error('Vote failed:', error)
    }
    setLoading(false)
  }

  if (voted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2">
        <Check className="w-5 h-5 text-green-600" />
        <p className="text-green-700 text-sm">Thanks for your feedback!</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <p className="text-sm font-medium text-gray-900 mb-3">Was your experience with this adjuster fair?</p>
      <div className="flex gap-3">
        <button
          onClick={() => handleVote(true)}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors disabled:opacity-50"
        >
          <ThumbsUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-gray-700">Yes</span>
        </button>
        <button
          onClick={() => handleVote(false)}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50"
        >
          <ThumbsDown className="w-4 h-4 text-red-600" />
          <span className="text-sm font-medium text-gray-700">No</span>
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">Anonymous • Your opinion only</p>
    </div>
  )
}
