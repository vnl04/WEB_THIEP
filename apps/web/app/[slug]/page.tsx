'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function CardViewerPage() {
  const params = useParams();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [wish, setWish] = useState('');
  const [wishes, setWishes] = useState<any[]>([]);
  const [guestToken, setGuestToken] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const slug = params.slug as string;
        const response = await apiClient.getCardBySlug(slug);
        setCard(response.data.data);

        // Fetch wishes for this card
        const wishesResponse = await apiClient.getWishes(response.data.data.id, { status: 'approved' });
        setWishes(wishesResponse.data.data || []);
      } catch (error) {
        console.error('Failed to fetch card:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchCard();
    }
  }, [params.slug]);

  const handleRsvp = async (status: string) => {
    try {
      // In production, we'd get the actual guest token from URL params
      const response = await apiClient.submitRsvp(guestToken || 'demo-token', { status });
      setRsvpStatus(status);
      alert('RSVP submitted successfully!');
    } catch (error) {
      console.error('RSVP failed:', error);
      alert('Failed to submit RSVP');
    }
  };

  const handleWish = async () => {
    if (!wish.trim()) {
      alert('Please write a message');
      return;
    }

    try {
      await apiClient.submitWish(card.id, { content: wish, guestName: 'Anonymous' });
      setWish('');
      alert('Thank you for your wishes!');
      
      // Refresh wishes
      const wishesResponse = await apiClient.getWishes(card.id, { status: 'approved' });
      setWishes(wishesResponse.data.data || []);
    } catch (error) {
      console.error('Wish submission failed:', error);
      alert('Failed to submit wish');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!card) {
    return <div className="flex items-center justify-center h-screen">Card not found</div>;
  }

  return (
    <main className="min-h-screen bg-light">
      {/* Cover Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-primary/20 to-transparent">
        <div className="text-center">
          <h1 className="text-6xl font-serif font-bold mb-4 text-primary">
            {card.brideName} & {card.groomName}
          </h1>
          <p className="text-2xl text-gray-600">
            {card.weddingDate && new Date(card.weddingDate).toLocaleDateString()}
          </p>
          <button className="mt-8 btn-primary" onClick={() => window.scrollBy(0, window.innerHeight)}
          >
            Scroll to explore
          </button>
        </div>
      </section>

      {/* Story Section */}
      {card.story && (
        <section className="py-20 px-4 max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-8 text-center">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{card.story}</p>
        </section>
      )}

      {/* RSVP Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif font-bold mb-8 text-center">Will you join us?</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => handleRsvp('attending')}
              className={`px-8 py-3 rounded-lg font-bold ${
                rsvpStatus === 'attending'
                  ? 'bg-primary text-white'
                  : 'bg-white border-2 border-primary text-primary'
              }`}
            >
              Yes, I'm attending
            </button>
            <button
              onClick={() => handleRsvp('not-attending')}
              className={`px-8 py-3 rounded-lg font-bold ${
                rsvpStatus === 'not-attending'
                  ? 'bg-primary text-white'
                  : 'bg-white border-2 border-primary text-primary'
              }`}
            >
              Sadly, I can't
            </button>
          </div>
        </div>
      </section>

      {/* Wishes Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif font-bold mb-8 text-center">Wishes & Messages</h2>
        <div className="mb-8">
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Share your wishes..."
            className="input-field w-full h-24"
          />
          <button onClick={handleWish} className="btn-primary mt-4">
            Send Wishes
          </button>
        </div>

        <div className="space-y-4">
          {wishes.length > 0 ? (
            wishes.map((w: any) => (
              <div key={w.id} className="card bg-purple-50 p-6 rounded-lg border border-purple-200">
                <p className="font-semibold text-gray-800">{w.guestName || 'Anonymous'}</p>
                <p className="text-gray-600 mt-2">{w.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No wishes yet. Be the first to share!</p>
          )}
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-8">Send us a Gift</h2>
          <div className="bg-white p-8 rounded-xl">
            <p className="text-gray-600 mb-6">Scan the QR code or transfer to:</p>
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-6">
              <span className="text-gray-500">QR Code Here</span>
            </div>
            <p className="font-mono text-lg mb-2">Account: 123456789</p>
            <p className="text-gray-600">Bank Name</p>
          </div>
        </div>
      </section>
    </main>
  );
}
