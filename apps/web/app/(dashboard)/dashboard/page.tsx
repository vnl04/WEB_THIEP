'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [stats] = useState({ cards: 0, rsvps: 0, gifts: 0 });
  const [cards] = useState<any[]>([]);
  const [loading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cardsResponse = await apiClient.getCards();
        const userCards = cardsResponse.data.data || [];
        setCards(userCards);

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
        <h1 className="text-4xl font-serif font-bold mb-2">Welcome, {user?.name || 'Guest'}!</h1>
        <p className="text-foreground-muted">Manage your wedding cards</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6">
          <div className="text-foreground-muted text-sm mb-2">Total Cards</div>
          <div className="text-3xl font-bold text-primary">{stats.cards}</div>
          <div className="text-xs text-foreground-subtle mt-2">
            {stats.cards === 0 ? 'Create your first card' : 'Active wedding cards'}
          </div>
        </div>
        <div className="card p-6">
          <div className="text-foreground-muted text-sm mb-2">Total RSVPs</div>
          <div className="text-3xl font-bold text-primary">{stats.rsvps}</div>
          <div className="text-xs text-foreground-subtle mt-2">Guest responses</div>
        </div>
        <div className="card p-6">
          <div className="text-foreground-muted text-sm mb-2">Total Gifts</div>
          <div className="text-3xl font-bold text-primary">{stats.gifts}</div>
          <div className="text-xs text-foreground-subtle mt-2">Gift contributions</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/editor/1"
            className="block p-6 card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-bold mb-1">Create New Card</h3>
            <p className="text-sm text-foreground-muted">Start designing your wedding card</p>
          </Link>
          <Link
            href="/guests"
            className="block p-6 card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold mb-1">Manage Guests</h3>
            <p className="text-sm text-foreground-muted">View guest list and RSVPs</p>
          </Link>
        </div>
      </div>

      {/* Recent Cards */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-4">Your Cards</h2>
        {loading ? (
          <p className="text-foreground-muted">Loading cards...</p>
        ) : cards.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-foreground-muted mb-4">No cards yet</p>
            <Link href="/editor/1" className="btn-primary inline-block">
              Create Your First Card
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Link key={card.id} href={`/editor/${card.id}`}>
                <div className="card p-6 hover:shadow-lg transition cursor-pointer">
                  <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-foreground-muted text-sm mb-4">{card.description}</p>
                  <div className="text-xs text-foreground-subtle">
                    Created {new Date(card.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
