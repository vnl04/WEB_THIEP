'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ROUTES, SECTIONS } from '@/lib/routes'
import { useAuthStore } from '@/lib/store'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'backdrop-blur-md bg-white/98 border-b border-gray-100 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={ROUTES.home} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
              <span className="text-white text-sm font-bold">♥</span>
            </div>
            <span className="font-serif text-xl font-bold text-gradient hidden sm:inline">WeddingCard</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href={SECTIONS.templates} className="relative text-gray-700 hover:text-rose transition-colors font-medium group">
              Mẫu thiệp
            </a>
            <a href={SECTIONS.pricing} className="relative text-gray-700 hover:text-rose transition-colors font-medium group">
              Bảng giá
            </a>
            <a href={SECTIONS.features} className="relative text-gray-700 hover:text-rose transition-colors font-medium group">
              Tính năng
            </a>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href={ROUTES.dashboard} className="btn-primary text-sm shadow-lg hover:shadow-xl">
                Dashboard →
              </Link>
            ) : (
              <>
                <Link href={ROUTES.login} className="px-4 py-2 text-gray-700 hover:text-rose font-medium transition-colors hidden sm:inline hover:bg-gray-50 rounded-full">
                  Đăng nhập
                </Link>
                <Link href={ROUTES.register} className="btn-primary text-sm shadow-lg hover:shadow-xl">
                  Bắt đầu miễn phí ✨
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
