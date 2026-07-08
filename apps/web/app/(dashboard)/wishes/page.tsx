'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function WishesPage() {
  const { user } = useAuthStore();
  const [wishes] = useState<any[]>([]);
  const [loading] = useState(true);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        if (user) {
          const response = await apiClient.getWishes(user.id);
          setWishes(response.data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch wishes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishes();
  }, [user]);

  if (loading) {
    return <div className="p-8"><p className="text-foreground-muted">Loading wishes...</p></div>;
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Guest Wishes</h1>
        <p className="text-foreground-muted">Messages and well-wishes from your guests</p>
      </div>

      {wishes.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-foreground-muted mb-4">No wishes yet</p>
          <p className="text-foreground-subtle text-sm">Share your invitation to receive wishes from guests</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {wishes.map((wish) => (
            <div key={wish.id} className="card p-6">
              <div className="mb-4">
                <h3 className="font-bold text-lg">{wish.guestName}</h3>
                <p className="text-sm text-foreground-muted">{wish.guestEmail}</p>
              </div>
              <p className="text-foreground leading-relaxed mb-4">{wish.message}</p>
              <div className="pt-4 border-t border-border text-xs text-foreground-subtle">
                {new Date(wish.createdAt).toLocaleDateString()} at {new Date(wish.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
