'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { clearAuth } from '@/lib/auth'
import { ROUTES } from '@/lib/routes'

const navItems = [
  { href: '/dashboard', label: 'Tổng quan' },
  { href: '/guests', label: 'Khách mời' },
  { href: '/wishes', label: 'Lời chúc' },
  { href: '/gifts', label: 'Quà tặng' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    router.push(ROUTES.home)
  }

  if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
    router.push(ROUTES.login)
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-100 shadow-sm p-6 flex flex-col">
        <Link href={ROUTES.home} className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center">
            <span className="text-white text-sm font-bold">♥</span>
          </div>
          <span className="font-serif text-lg font-bold text-gradient">WeddingCard</span>
        </Link>

        <p className="text-sm text-gray-500 mb-6">Xin chào, {user?.name || 'Bạn'}</p>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-rose/10 text-rose font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition text-left"
        >
          Đăng xuất
        </button>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
