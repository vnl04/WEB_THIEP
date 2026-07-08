'use client'

import { useEffect, useState } from 'react'
import { apiClient, getErrorMessage, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

interface CardItem { id: string; name: string }
interface GuestItem { id: string; name: string; email?: string; status?: string }

export default function GuestsPage() {
  const { user } = useAuthStore()
  const [cards, setCards] = useState<CardItem[]>([])
  const [selectedCardId, setSelectedCardId] = useState('')
  const [guests, setGuests] = useState<GuestItem[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await apiClient.getCards()
        const data = unwrap<CardItem[]>(response) || []
        setCards(data)
        if (data[0]) setSelectedCardId(data[0].id)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (user) loadCards()
  }, [user])

  useEffect(() => {
    const loadGuests = async () => {
      if (!selectedCardId) return
      try {
        const response = await apiClient.getGuests(selectedCardId)
        setGuests(unwrap<GuestItem[]>(response) || [])
      } catch {
        setGuests([])
      }
    }
    loadGuests()
  }, [selectedCardId])

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCardId) return
    setMessage('')
    try {
      await apiClient.addGuest(selectedCardId, { name, email })
      setName('')
      setEmail('')
      const response = await apiClient.getGuests(selectedCardId)
      setGuests(unwrap<GuestItem[]>(response) || [])
      setMessage('Đã thêm khách mời!')
    } catch (err) {
      setMessage(getErrorMessage(err, 'Thêm khách thất bại'))
    }
  }

  if (loading) return <div className="p-8 text-gray-600">Đang tải...</div>

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">Quản lý khách mời</h1>
      <p className="text-gray-600 mb-8">Thêm khách và theo dõi RSVP</p>

      {cards.length === 0 ? (
        <div className="dashboard-card p-8 text-center text-gray-600">
          Bạn cần tạo thiệp trước khi thêm khách mời.
        </div>
      ) : (
        <>
          <div className="mb-6">
            <label className="text-sm font-medium block mb-2">Chọn thiệp</label>
            <select
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
              className="input-field max-w-md"
            >
              {cards.map((card) => (
                <option key={card.id} value={card.id}>{card.name}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleAddGuest} className="dashboard-card mb-8 grid md:grid-cols-3 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên khách" className="input-field" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="input-field" />
            <button type="submit" className="btn-primary">Thêm khách</button>
          </form>

          {message && <p className="mb-4 text-sm text-rose">{message}</p>}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="dashboard-card"><div className="text-gray-500 text-sm">Tổng khách</div><div className="text-3xl font-bold text-rose">{guests.length}</div></div>
            <div className="dashboard-card"><div className="text-gray-500 text-sm">Tham dự</div><div className="text-3xl font-bold text-green-600">{guests.filter(g => g.status === 'attending').length}</div></div>
            <div className="dashboard-card"><div className="text-gray-500 text-sm">Chờ phản hồi</div><div className="text-3xl font-bold text-yellow-600">{guests.filter(g => !g.status || g.status === 'pending').length}</div></div>
          </div>

          <div className="dashboard-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">Tên</th>
                  <th className="px-6 py-3 text-left text-sm">Email</th>
                  <th className="px-6 py-3 text-left text-sm">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {guests.map((guest) => (
                  <tr key={guest.id}>
                    <td className="px-6 py-4">{guest.name}</td>
                    <td className="px-6 py-4">{guest.email || '—'}</td>
                    <td className="px-6 py-4">{guest.status || 'Chờ'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {guests.length === 0 && <p className="p-6 text-gray-500 text-center">Chưa có khách mời</p>}
          </div>
        </>
      )}
    </div>
  )
}
