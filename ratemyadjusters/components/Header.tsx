'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(true)
  const pathname = usePathname()
  const isHomepage = pathname === '/'

  // Hide search bar on homepage until user scrolls past hero
  useEffect(() => {
    if (!isHomepage) {
      setShowSearch(true)
      return
    }

    const handleScroll = () => {
      // Show search after scrolling 300px (past hero search)
      setShowSearch(window.scrollY > 300)
    }

    // Initially hide on homepage
    setShowSearch(false)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomepage])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900">RateMyAdjusters</span>
          </Link>

          {/* Desktop Search - Only show when appropriate */}
          <form 
            onSubmit={handleSearch} 
            className={`hidden md:flex flex-1 max-w-md mx-8 transition-opacity duration-200 ${
              showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search adjusters..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-gray-600 hover:text-gray-900 font-medium">
              Browse
            </Link>
            <Link 
              href="/review" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full transition-colors"
            >
              Write a Review
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search adjusters..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full"
                />
              </div>
            </form>
            <div className="space-y-2">
              <Link 
                href="/search" 
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Adjusters
              </Link>
              <Link 
                href="/review" 
                className="block py-2 text-blue-600 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Write a Review
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
