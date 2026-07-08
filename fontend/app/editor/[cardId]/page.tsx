'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { apiClient, getErrorMessage, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import { ROUTES } from '@/lib/routes'

interface CardData {
  id: string
  name: string
  brideName?: string
  groomName?: string
  weddingDate?: string
  published: boolean
}

export default function EditorPage() {
  const params = useParams()
  const cardId = params.cardId as string
  const { isAuthenticated } = useAuthStore()

  const [card, setCard] = useState<CardData | null>(null)
  const [activeTab, setActiveTab] = useState('content')
  const [brideName, setBrideName] = useState('')
  const [groomName, setGroomName] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [cardName, setCardName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
      window.location.href = ROUTES.login
    }
  }, [isAuthenticated])

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await apiClient.getCard(cardId)
        const data = unwrap<CardData>(response)
        setCard(data)
        setCardName(data.name || '')
        setBrideName(data.brideName || '')
        setGroomName(data.groomName || '')
        setWeddingDate(data.weddingDate ? data.weddingDate.slice(0, 10) : '')
      } catch {
        setMessage('Không tìm thấy thiệp')
      } finally {
        setLoading(false)
      }
    }

    if (cardId) fetchCard()
  }, [cardId])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    try {
      await apiClient.updateCard(cardId, {
        name: cardName,
        brideName,
        groomName,
        weddingDate: weddingDate || undefined,
      })
      setMessage('Đã lưu thiệp!')
    } catch (err) {
      setMessage(getErrorMessage(err, 'Lưu thất bại'))
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setSaving(true)
    setMessage('')
    try {
      await apiClient.publishCard(cardId)
      setCard((prev) => (prev ? { ...prev, published: true } : prev))
      setMessage('Đã xuất bản thiệp!')
    } catch (err) {
      setMessage(getErrorMessage(err, 'Xuất bản thất bại'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-gray-600 min-h-screen">Đang tải editor...</div>
  }

  if (!card) {
    return (
      <div className="p-8 min-h-screen">
        <p className="text-gray-600 mb-4">Không tìm thấy thiệp</p>
        <Link href={ROUTES.dashboard} className="btn-primary inline-block">Về dashboard</Link>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-serif font-bold text-dark">{cardName || 'Thiệp cưới'}</h1>
          <p className="text-sm text-gray-500">{card.published ? 'Đã xuất bản' : 'Đang chỉnh sửa'}</p>
        </div>
        <div className="flex gap-3 items-center">
          {message && <span className="text-sm text-gray-600">{message}</span>}
          <Link href={ROUTES.dashboard} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            Quay lại
          </Link>
          <button onClick={handleSave} disabled={saving} className="btn-secondary disabled:opacity-50">
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
          <button onClick={handlePublish} disabled={saving} className="btn-primary disabled:opacity-50">
            Xuất bản
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="flex border-b">
            {['content', 'guests', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab ? 'border-rose text-rose' : 'border-transparent text-gray-600 hover:text-rose'
                }`}
              >
                {tab === 'content' ? 'Nội dung' : tab === 'guests' ? 'Khách mời' : 'Cài đặt'}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-4">
            {activeTab === 'content' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium block mb-1">Tên thiệp</label>
                  <input value={cardName} onChange={(e) => setCardName(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Tên cô dâu</label>
                  <input value={brideName} onChange={(e) => setBrideName(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Tên chú rể</label>
                  <input value={groomName} onChange={(e) => setGroomName(e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Ngày cưới</label>
                  <input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="input-field" />
                </div>
              </div>
            )}

            {activeTab === 'guests' && (
              <div>
                <p className="text-sm text-gray-600 mb-3">Quản lý danh sách khách mời</p>
                <Link href="/guests" className="btn-primary w-full text-center block">
                  Mở quản lý khách mời
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="text-sm text-gray-600">
                <p>ID thiệp: {card.id}</p>
                <p className="mt-2">Sau khi xuất bản, bạn có thể chia sẻ link thiệp cho khách mời.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-rose/5 to-pink/10 flex items-center justify-center p-8 overflow-auto">
          <div className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-rose to-pink p-12 text-white text-center">
              <h2 className="text-3xl font-serif font-bold mb-2">
                {brideName || 'Cô dâu'} & {groomName || 'Chú rể'}
              </h2>
              <p className="opacity-90">Trân trọng kính mời</p>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">Lời mời tham dự lễ cưới</p>
              <h1 className="text-2xl font-serif font-bold mb-4 text-rose">{cardName}</h1>
              <p className="text-gray-700 mb-6">
                {weddingDate ? new Date(weddingDate).toLocaleDateString('vi-VN') : 'Chọn ngày cưới'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
