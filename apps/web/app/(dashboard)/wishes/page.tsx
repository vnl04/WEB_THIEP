'use client';

import { useState } from 'react';

export default function WishesPage() {
  const [wishes, setWishes] = useState([]);

  return (
    <main className="min-h-screen bg-light py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wishes</h1>
          <p className="text-gray-600 mb-8">
            View and manage wishes from your guests
          </p>
        </div>

        <div className="space-y-4">
          {wishes.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              <p>No wishes yet. Share your card to receive wishes!</p>
            </div>
          ) : (
            wishes.map((wish: any) => (
              <div key={wish.id} className="card p-6">
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
