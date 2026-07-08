'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function GiftsPage() {
  const { user } = useAuthStore();
  const [gifts] = useState<any[]>([]);
  const [loading] = useState(true);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        if (user) {
          const response = await apiClient.getGifts(user.id);
          setGifts(response.data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch gifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [user]);

  if (loading) {
    return <div className="p-8"><p className="text-foreground-muted">Loading gifts...</p></div>;
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Gift Tracker</h1>
        <p className="text-foreground-muted">View and manage gifts received</p>
      </div>

      {gifts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-foreground-muted mb-4">No gifts received yet</p>
          <p className="text-foreground-subtle text-sm">Share your invitation to start receiving gifts</p>
        </div>
      ) : (
        <div className="space-y-4">
          {gifts.map((gift) => (
            <div key={gift.id} className="card p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg mb-1">{gift.senderName}</h3>
                  <p className="text-foreground-muted text-sm mb-3">{gift.message}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {gift.amount?.toLocaleString()} {gift.currency}
                  </div>
                  <div className="text-xs text-foreground-subtle mt-2">
                    {new Date(gift.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className={`badge ${gift.status === 'completed' ? 'badge-success' : 'badge-primary'}`}>
                  {gift.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {gifts.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 text-center">
            <div className="text-foreground-muted text-sm mb-2">Total Gifts</div>
            <div className="text-3xl font-bold text-primary">{gifts.length}</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-foreground-muted text-sm mb-2">Total Amount</div>
            <div className="text-3xl font-bold text-primary">
              {gifts.reduce((sum, g) => sum + (g.amount || 0), 0).toLocaleString()} VND
            </div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-foreground-muted text-sm mb-2">Completed</div>
            <div className="text-3xl font-bold text-success">
              {gifts.filter(g => g.status === 'completed').length}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
