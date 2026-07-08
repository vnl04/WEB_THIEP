'use client'

import { useEffect, useState } from 'react'
import { apiClient, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

interface CardItem { id: string; name: string }
interface GiftItem { id: string; senderName?: string; message?: string; amount?: number; currency?: string; status?: string; createdAt: string }

export default function GiftsPage() {
  const { user } = useAuthStore()
  const [gifts, setGifts] = useState<GiftItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const cardsResponse = await apiClient.getCards()
        const cards = unwrap<CardItem[]>(cardsResponse) || []
        const allGifts: GiftItem[] = []

        for (const card of cards) {
          try {
            const response = await apiClient.getGifts(card.id)
            const cardGifts = unwrap<GiftItem[]>(response) || []
            allGifts.push(...cardGifts)
          } catch {
            // skip
          }
        }

        setGifts(allGifts)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchGifts()
  }, [user])

  if (loading) return <div className="p-8 text-gray-600">Đang tải...</div>

  const totalAmount = gifts.reduce((sum, g) => sum + (g.amount || 0), 0)

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">Quà tặng</h1>
      <p className="text-gray-600 mb-8">Theo dõi quà tặng từ khách mời</p>

      {gifts.length === 0 ? (
        <div className="dashboard-card p-12 text-center text-gray-600">
          Chưa có quà tặng nào.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="dashboard-card">
              <div className="text-gray-500 text-sm">Tổng quà</div>
              <div className="text-3xl font-bold text-rose">{gifts.length}</div>
            </div>
            <div className="dashboard-card">
              <div className="text-gray-500 text-sm">Tổng giá trị</div>
              <div className="text-3xl font-bold text-rose">{totalAmount.toLocaleString('vi-VN')} ₫</div>
            </div>
          </div>

          <div className="space-y-4">
            {gifts.map((gift) => (
              <div key={gift.id} className="dashboard-card flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{gift.senderName || 'Khách mời'}</h3>
                  <p className="text-gray-600 text-sm">{gift.message}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-rose">
                    {(gift.amount || 0).toLocaleString('vi-VN')} {gift.currency || '₫'}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(gift.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
