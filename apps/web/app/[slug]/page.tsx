'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function CardViewerPage() {
  const params = useParams();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState('');
  const [wish, setWish] = useState('');

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/cards/slug/${params.slug}`,
        );
        const data = await res.json();
        setCard(data);
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/guests/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          cardId: card.id,
        }),
      });
      setRsvpStatus(status);
    } catch (error) {
      console.error('RSVP failed:', error);
    }
  };

  const handleWish = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/cards/${card.id}/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: wish }),
      });
      setWish('');
      alert('Thank you for your wishes!');
    } catch (error) {
      console.error('Wish submission failed:', error);
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
          {/* Wishes list would go here */}
          <p className="text-gray-500 text-center">No wishes yet. Be the first to share!</p>
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
