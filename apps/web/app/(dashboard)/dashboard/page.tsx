'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ cards: 0, rsvps: 0, gifts: 0 });
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's cards
        const cardsResponse = await apiClient.getCards();
        const userCards = cardsResponse.data.data || [];
        setCards(userCards);

        // Calculate stats
        let totalRsvps = 0;
        let totalGifts = 0;

        for (const card of userCards) {
          try {
            const rsvpsResponse = await apiClient.getRsvps(card.id);
            totalRsvps += rsvpsResponse.data.data?.length || 0;

            const giftsResponse = await apiClient.getGifts(card.id);
            totalGifts += giftsResponse.data.data?.length || 0;
          } catch (err) {
            // Ignore errors for individual cards
          }
        }

        setStats({
          cards: userCards.length,
          rsvps: totalRsvps,
          gifts: totalGifts,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">Manage your wedding cards</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total Cards</div>
          <div className="text-3xl font-bold text-primary">{stats.cards}</div>
          <div className="text-xs text-gray-400 mt-2">
            {stats.cards === 0 ? 'Create your first card' : 'Active wedding cards'}
          </div>
        </div>
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total RSVPs</div>
          <div className="text-3xl font-bold text-primary">{stats.rsvps}</div>
          <div className="text-xs text-gray-400 mt-2">Guest responses</div>
        </div>
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total Gifts</div>
          <div className="text-3xl font-bold text-primary">{stats.gifts}</div>
          <div className="text-xs text-gray-400 mt-2">Gift contributions</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/editor/1"
            className="block p-6 bg-white card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-bold mb-1">Create New Card</h3>
            <p className="text-sm text-gray-600">Start designing your wedding card</p>
          </Link>
          <Link
            href="/guests"
            className="block p-6 bg-white card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold mb-1">Manage Guests</h3>
            <p className="text-sm text-gray-600">View guest list and RSVPs</p>
          </Link>
        </div>
      </div>

      {/* Recent Cards */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-4">Your Cards</h2>
        {loading ? (
          <p className="text-gray-500">Loading cards...</p>
        ) : cards.length === 0 ? (
          <div className="bg-white card p-12 text-center">
            <p className="text-gray-600 mb-4">You haven&apos;t created any cards yet</p>
            <Link href="/templates" className="btn-primary inline-block">
              Browse Templates
            </Link>
          </div>
        ) : (
        <div className="bg-white card p-8 text-center">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              <p className="text-gray-500 mb-4">No cards yet</p>
              <Link href="/editor/1" className="btn-primary inline-block">
                Create Your First Card
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
