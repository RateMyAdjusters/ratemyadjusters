'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

function ShieldLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path 
        d="M24 4L6 12V22C6 33.1 13.68 43.34 24 46C34.32 43.34 42 33.1 42 22V12L24 4Z" 
        fill="url(#header-shield-gradient)"
        stroke="url(#header-shield-stroke)"
        strokeWidth="2"
      />
      <g fill="#FCD34D">
        <path d="M14 22L15.09 25.26L18.5 25.26L15.71 27.24L16.8 30.5L14 28.52L11.2 30.5L12.29 27.24L9.5 25.26L12.91 25.26L14 22Z" />
        <path d="M24 16L25.45 20.35L30 20.35L26.27 23.04L27.73 27.39L24 24.7L20.27 27.39L21.73 23.04L18 20.35L22.55 20.35L24 16Z" />
        <path d="M34 22L35.09 25.26L38.5 25.26L35.71 27.24L36.8 30.5L34 28.52L31.2 30.5L32.29 27.24L29.5 25.26L32.91 25.26L34 22Z" />
      </g>
      <defs>
        <linearGradient id="header-shield-gradient" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F4C81"/>
          <stop offset="1" stopColor="#0D9488"/>
        </linearGradient>
        <linearGradient id="header-shield-stroke" x1="6" y1="4" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E6091"/>
          <stop offset="1" stopColor="#14B8A6"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <ShieldLogo className="w-9 h-9" />
              <span className="font-bold text-xl text-gray-900">
                RateMyAdjusters
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/search" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="/review" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Write a Review
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
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
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              <Link 
                href="/search" 
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Adjusters
              </Link>
              <Link 
                href="/review" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center"
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
