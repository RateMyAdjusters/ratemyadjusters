'use client'

import { useState } from 'react'
import { Share2, Copy, Check, Mail } from 'lucide-react'

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg w-full"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
          <button onClick={copy} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
          <a href={'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url)} target="_blank" className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
            Share on X
          </a>
          <a href={'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url)} className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      )}
    </div>
  )
}
