'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { apiClient, getErrorMessage } from '@/lib/api'
import { persistAuth } from '@/lib/auth'
import { ROUTES } from '@/lib/routes'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await apiClient.login(email, password)
      await persistAuth(response)
      router.push(ROUTES.dashboard)
    } catch (err) {
      setError(getErrorMessage(err, 'Đăng nhập thất bại'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose/10 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href={ROUTES.home} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-pink flex items-center justify-center">
              <span className="text-white font-bold">♥</span>
            </div>
            <span className="font-serif text-2xl font-bold text-gradient">WeddingCard</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-dark">Đăng nhập</h1>
          <p className="text-gray-600 mt-2">Chào mừng bạn quay lại!</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="input-field"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Chưa có tài khoản?{' '}
          <Link href={ROUTES.register} className="text-rose font-medium hover:underline">
            Đăng ký miễn phí
          </Link>
        </p>
      </div>
    </div>
  )
}
