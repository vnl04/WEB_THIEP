'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function CardPage() {
  const params = useParams();
  const [card] = useState<any>(null);
  const [rsvpStatus] = useState('');
  const [wish] = useState('');
  const [wishes] = useState<any[]>([]);
  const [guestToken] = useState('');
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await apiClient.getCard(params.slug as string);
        setCard(response.data.data);
      } catch (error) {
        console.error('Failed to fetch card:', error);
      }
    };

    if (params.slug) {
      fetchCard();
    }
  }, [params.slug]);

  const handleRsvp = async (status: string) => {
    try {
      await apiClient.submitRsvp(guestToken || 'demo-token', { status });
      setRsvpStatus(status);
      alert('RSVP submitted successfully!');
    } catch (error) {
      console.error('RSVP failed:', error);
      alert('Failed to submit RSVP');
    }
  };

  const handleWish = async () => {
    try {
      await apiClient.submitWish(params.slug as string, {
        message: wish,
        name: 'Anonymous',
      });
      setWish('');
      alert('Thank you for your wish!');
    } catch (error) {
      console.error('Wish submission failed:', error);
      alert('Failed to submit wish');
    }
  };

  if (!card) {
    return <div className="p-8"><p className="text-foreground-muted">Card not found</p></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Card Display */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="card p-12 text-center mb-8" style={{ backgroundColor: card.theme?.backgroundColor || '#ffffff' }}>
            <h1 className="text-4xl font-serif font-bold mb-4">{card.title}</h1>
            <p className="text-lg text-foreground-muted">{card.description}</p>
          </div>

          {/* RSVP Section */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold mb-4">Please RSVP</h2>
            <div className="flex gap-4">
              <button
                onClick={() => handleRsvp('attending')}
                className={`btn-primary flex-1 ${rsvpStatus === 'attending' ? 'opacity-50' : ''}`}
              >
                {rsvpStatus === 'attending' ? 'Attending ✓' : 'Attending'}
              </button>
              <button
                onClick={() => handleRsvp('not_attending')}
                className={`btn-secondary flex-1 ${rsvpStatus === 'not_attending' ? 'opacity-50' : ''}`}
              >
                {rsvpStatus === 'not_attending' ? 'Not Attending ✓' : 'Not Attending'}
              </button>
            </div>
          </div>

          {/* Wishes Section */}
          <div className="card p-8">
            <h2 className="text-2xl font-serif font-bold mb-4">Leave a Wish</h2>
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Share your well-wishes..."
              className="textarea-field w-full mb-4"
              rows={4}
            />
            <button onClick={handleWish} className="btn-primary w-full">
              Submit Wish
            </button>

            {wishes.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <h3 className="font-bold text-lg">Recent Wishes</h3>
                {wishes.map((w, i) => (
                  <div key={i} className="p-4 bg-surface-light rounded">
                    <p className="text-foreground mb-2">{w.message}</p>
                    <p className="text-sm text-foreground-muted">- {w.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
