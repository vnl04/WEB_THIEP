'use client'

import { useEffect, useState } from 'react'
import { apiClient, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

interface CardItem { id: string; name: string }
interface WishItem { id: string; message: string; guestName?: string; createdAt: string }

export default function WishesPage() {
  const { user } = useAuthStore()
  const [wishes, setWishes] = useState<WishItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const cardsResponse = await apiClient.getCards()
        const cards = unwrap<CardItem[]>(cardsResponse) || []
        const allWishes: WishItem[] = []

        for (const card of cards) {
          try {
            const response = await apiClient.getWishes(card.id)
            const cardWishes = unwrap<WishItem[]>(response) || []
            allWishes.push(...cardWishes)
          } catch {
            // skip
          }
        }

        setWishes(allWishes)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchWishes()
  }, [user])

  if (loading) return <div className="p-8 text-gray-600">Đang tải...</div>

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">Lời chúc</h1>
      <p className="text-gray-600 mb-8">Tin nhắn từ khách mời</p>

      {wishes.length === 0 ? (
        <div className="dashboard-card p-12 text-center text-gray-600">
          Chưa có lời chúc nào. Chia sẻ thiệp để nhận lời chúc từ khách mời.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishes.map((wish) => (
            <div key={wish.id} className="dashboard-card">
              <h3 className="font-bold mb-2">{wish.guestName || 'Khách mời'}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{wish.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(wish.createdAt).toLocaleString('vi-VN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
