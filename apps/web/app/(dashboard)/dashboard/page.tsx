'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [cards, setCards] = useState([]);
  const [stats, setStats] = useState({ views: 0, rsvps: 0, gifts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const cardsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const cardsData = await cardsRes.json();
        setCards(cardsData || []);

        // Calculate stats
        let totalViews = 0,
          totalRsvps = 0,
          totalGifts = 0;
        for (const card of cardsData) {
          totalViews += card.viewCount || 0;
          totalRsvps += card.guests?.filter((g: any) => g.rsvpStatus)?.length || 0;
          totalGifts += card.gifts?.length || 0;
        }
        setStats({ views: totalViews, rsvps: totalRsvps, gifts: totalGifts });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCard = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ templateId: '1', name: 'New Card' }),
      });
      const newCard = await res.json();
      setCards([...cards, newCard]);
    } catch (error) {
      console.error('Failed to create card:', error);
    }
  };

  return (
    <main className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your wedding card overview</p>
          </div>
          <button onClick={handleCreateCard} className="btn-primary">
            Create New Card
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Views</p>
            <p className="text-4xl font-bold text-primary">{stats.views}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">RSVP Responses</p>
            <p className="text-4xl font-bold text-primary">{stats.rsvps}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Gifts Received</p>
            <p className="text-4xl font-bold text-primary">{stats.gifts}</p>
          </div>
        </div>

        {/* Cards List */}
        <div className="card">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">My Cards</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : cards.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>No cards yet. Create your first card!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Views</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Guests</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cards.map((card: any) => (
                    <tr key={card.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium">{card.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            card.published
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {card.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{card.viewCount || 0}</td>
                      <td className="px-6 py-4 text-sm">{card.guests?.length || 0}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={`/editor/${card.id}`}
                          className="text-primary hover:underline text-sm"
                        >
                          Edit
                        </Link>
                        <button className="text-red-600 hover:underline text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
