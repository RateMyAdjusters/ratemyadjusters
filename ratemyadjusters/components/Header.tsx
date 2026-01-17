'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#EEEEEE] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="RateMyAdjusters"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="font-bold text-xl text-[#0A3D62]">
                RateMyAdjusters
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              className="text-[#666666] hover:text-[#0A3D62] font-medium transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/research"
              className="text-[#666666] hover:text-[#0A3D62] font-medium transition-colors"
            >
              Research
            </Link>
            <Link
              href="/review"
              className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold py-2 px-5 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              Write a Review
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#666666] hover:text-[#0A3D62] p-2"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EEEEEE]">
            <div className="flex flex-col gap-4">
              <Link
                href="/search"
                className="text-[#666666] hover:text-[#0A3D62] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Adjusters
              </Link>
              <Link
                href="/research"
                className="text-[#666666] hover:text-[#0A3D62] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Research
              </Link>
              <Link
                href="/review"
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white font-semibold py-2 px-4 rounded-lg text-center shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write a Review
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
