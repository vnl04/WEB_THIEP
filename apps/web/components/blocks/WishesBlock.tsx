'use client';

import { useState } from 'react';

interface WishesBlockProps {
  cardId: string;
}

export default function WishesBlock({ cardId }: WishesBlockProps) {
  const [wish, setWish] = useState('');

  return (
    <div className="p-6 border-t">
      <h2 className="text-2xl font-serif font-bold mb-4">Wishes</h2>
      <textarea
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        placeholder="Share your wishes..."
        className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary"
        rows={3}
      />
      <button className="w-full btn-primary">Send Wish</button>
      <div className="mt-4 space-y-3">
        <p className="text-sm text-gray-500 text-center">No wishes yet</p>
      </div>
    </div>
  );
}
