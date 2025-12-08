'use client'

import Link from 'next/link'
import { Shield, CheckCircle } from 'lucide-react'

interface ClaimButtonProps {
  slug: string
  isClaimed: boolean
}

export default function ClaimButton({ slug, isClaimed }: ClaimButtonProps) {
  if (isClaimed) {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <CheckCircle className="w-4 h-4" />
        <span>Profile Claimed</span>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <p className="text-sm text-gray-600 mb-2">This profile is unclaimed.</p>
      <Link
        href={`/claim/${slug}`}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        <Shield className="w-4 h-4" />
        Claim This Profile (Free)
      </Link>
    </div>
  )
}
