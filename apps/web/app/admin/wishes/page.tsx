'use client';

import { useState } from 'react';

export default function AdminWishesPage() {
  const [wishes, setWishes] = useState([
    {
      id: '1',
      cardId: 'card-1',
      cardTitle: 'John & Jane Wedding',
      guestName: 'Alex Smith',
      content: 'Wishing you both a lifetime of happiness and love!',
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      cardId: 'card-1',
      cardTitle: 'John & Jane Wedding',
      guestName: 'Sarah Johnson',
      content: 'May your love grow stronger with each passing day.',
      status: 'approved',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
  ]);

  const handleApprove = (id: string) => {
    setWishes(wishes.map(w => 
      w.id === id ? { ...w, status: 'approved' } : w
    ));
  };

  const handleReject = (id: string) => {
    setWishes(wishes.map(w => 
      w.id === id ? { ...w, status: 'rejected' } : w
    ));
  };

  const pendingWishes = wishes.filter(w => w.status === 'pending');

  return (
    <div className="p-8">
      <h1 className="text-4xl font-serif font-bold mb-2">Manage Wishes</h1>
      <p className="text-gray-600 mb-8">Review and approve guest wishes</p>

      <div className="mb-6 bg-blue-50 border border-blue-200 p-4 rounded">
        <p className="text-sm text-blue-800">
          Pending Wishes: <strong>{pendingWishes.length}</strong>
        </p>
      </div>

      <div className="space-y-4">
        {wishes.map(wish => (
          <div key={wish.id} className="bg-white card p-6 border-l-4 border-purple-400">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{wish.cardTitle}</h3>
                <p className="text-sm text-gray-600">From: {wish.guestName}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {wish.createdAt.toLocaleDateString()} {wish.createdAt.toLocaleTimeString()}
                </p>
              </div>
              <span className={`inline-block px-3 py-1 rounded text-xs font-bold ${
                wish.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                wish.status === 'approved' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {wish.status.toUpperCase()}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded mb-4 border">
              <p className="text-gray-700">{wish.content}</p>
            </div>

            {wish.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(wish.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(wish.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {wishes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No wishes found</p>
        </div>
      )}
    </div>
  );
}
