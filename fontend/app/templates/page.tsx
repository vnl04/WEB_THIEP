'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { apiClient, getErrorMessage, unwrap } from '@/lib/api'
import { createCardFromTemplate } from '@/lib/auth'
import { useAuthStore } from '@/lib/store'
import { ROUTES } from '@/lib/routes'

interface Template {
  id: string
  name: string
  description?: string
  category: string
  tier: string
  thumbnail: string
}

export default function TemplatesPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [usingId, setUsingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await apiClient.getTemplates()
        const result = unwrap<{ data: Template[] } | Template[]>(response)
        const list = Array.isArray(result) ? result : result?.data || []
        setTemplates(list)
      } catch (err) {
        setError(getErrorMessage(err, 'Không tải được mẫu thiệp'))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleUseTemplate = async (templateId: string) => {
    setUsingId(templateId)
    setError('')

    if (!isAuthenticated) {
      router.push(`${ROUTES.register}?template=${templateId}`)
      return
    }

    try {
      const card = await createCardFromTemplate(templateId)
      router.push(`/editor/${card.id}`)
    } catch (err) {
      setError(getErrorMessage(err, 'Không tạo được thiệp'))
      setUsingId(null)
    }
  }

  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <div className="pt-24 pb-8 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark mb-4">
          Mẫu thiệp cưới
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chọn mẫu yêu thích và bắt đầu tuỳ chỉnh ngay.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {error && <p className="text-center text-red-600 mb-6">{error}</p>}

        {loading ? (
          <p className="text-center text-gray-600">Đang tải mẫu thiệp...</p>
        ) : templates.length === 0 ? (
          <div className="text-center dashboard-card p-12">
            <p className="text-gray-600 mb-4">Chưa có mẫu thiệp. Hãy chạy seed database trước.</p>
            <Link href={ROUTES.register} className="btn-primary inline-block">Đăng ký miễn phí</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="dashboard-card overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center rounded-lg mb-4"
                  style={{ backgroundImage: `url(${template.thumbnail})` }}
                />
                <h3 className="font-serif text-xl font-bold mb-2">{template.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full bg-rose/10 text-rose">{template.tier}</span>
                  <button
                    onClick={() => handleUseTemplate(template.id)}
                    disabled={usingId === template.id}
                    className="btn-primary text-sm disabled:opacity-50"
                  >
                    {usingId === template.id ? 'Đang tạo...' : 'Dùng mẫu này →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
