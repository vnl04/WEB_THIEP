'use client';

import { useState } from 'react';

export default function WishesPage() {
  const [wishes, setWishes] = useState([]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Wishes & Messages</h1>
        <p className="text-gray-600">View wishes from your guests</p>
      </div>

      <div className="space-y-4">
        {wishes.length === 0 ? (
          <div className="card bg-white p-8 text-center">
            <div className="text-4xl mb-3">💌</div>
            <p className="text-gray-500 text-lg">No wishes yet</p>
            <p className="text-gray-400 text-sm mt-1">Share your card to receive wishes from guests!</p>
          </div>
        ) : (
          wishes.map((wish: any) => (
            <div key={wish.id} className="card bg-white p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium">{wish.author}</p>
                    <p className="text-xs text-gray-500">{wish.createdAt}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                      Approve
                    </button>
                    <button className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">
                      Hide
                    </button>
                  </div>
                </div>
                <p className="text-gray-700">{wish.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
