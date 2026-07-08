'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { apiClient, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import { ROUTES } from '@/lib/routes'

interface CardItem {
  id: string
  name: string
  published: boolean
  createdAt: string
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [cards, setCards] = useState<CardItem[]>([])
  const [stats, setStats] = useState({ cards: 0, rsvps: 0, gifts: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsResponse = await apiClient.getCards()
        const userCards = unwrap<CardItem[]>(cardsResponse) || []
        setCards(userCards)

        let totalRsvps = 0
        let totalGifts = 0

        for (const card of userCards) {
          try {
            const rsvpsResponse = await apiClient.getRsvps(card.id)
            const rsvps = unwrap<unknown[]>(rsvpsResponse) || []
            totalRsvps += rsvps.length

            const giftsResponse = await apiClient.getGifts(card.id)
            const gifts = unwrap<unknown[]>(giftsResponse) || []
            totalGifts += gifts.length
          } catch {
            // Card may not have guests yet
          }
        }

        setStats({ cards: userCards.length, rsvps: totalRsvps, gifts: totalGifts })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchData()
  }, [user])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Xin chào, {user?.name}!</h1>
        <p className="text-gray-600">Quản lý thiệp cưới của bạn</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="dashboard-card">
          <div className="text-gray-500 text-sm mb-2">Tổng thiệp</div>
          <div className="text-3xl font-bold text-rose">{stats.cards}</div>
        </div>
        <div className="dashboard-card">
          <div className="text-gray-500 text-sm mb-2">RSVP</div>
          <div className="text-3xl font-bold text-rose">{stats.rsvps}</div>
        </div>
        <div className="dashboard-card">
          <div className="text-gray-500 text-sm mb-2">Quà tặng</div>
          <div className="text-3xl font-bold text-rose">{stats.gifts}</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Thao tác nhanh</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href={ROUTES.templates} className="dashboard-card hover:shadow-md transition block">
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-bold mb-1">Tạo thiệp mới</h3>
            <p className="text-sm text-gray-600">Chọn mẫu và bắt đầu thiết kế</p>
          </Link>
          <Link href="/guests" className="dashboard-card hover:shadow-md transition block">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold mb-1">Quản lý khách mời</h3>
            <p className="text-sm text-gray-600">Xem danh sách và RSVP</p>
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif font-bold mb-4">Thiệp của bạn</h2>
        {loading ? (
          <p className="text-gray-600">Đang tải...</p>
        ) : cards.length === 0 ? (
          <div className="dashboard-card p-12 text-center">
            <p className="text-gray-600 mb-4">Chưa có thiệp nào</p>
            <Link href={ROUTES.templates} className="btn-primary inline-block">
              Tạo thiệp đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link key={card.id} href={`/editor/${card.id}`}>
                <div className="dashboard-card hover:shadow-md transition cursor-pointer">
                  <h3 className="font-bold text-lg mb-2">{card.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {card.published ? 'Đã xuất bản' : 'Bản nháp'}
                  </p>
                  <div className="text-xs text-gray-400">
                    Tạo ngày {new Date(card.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
