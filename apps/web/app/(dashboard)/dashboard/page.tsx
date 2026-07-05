'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [loading] = useState(false);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your wedding cards</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total Cards</div>
          <div className="text-3xl font-bold text-primary">0</div>
          <div className="text-xs text-gray-400 mt-2">Create your first card</div>
        </div>
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total RSVPs</div>
          <div className="text-3xl font-bold text-primary">0</div>
          <div className="text-xs text-gray-400 mt-2">Guest responses</div>
        </div>
        <div className="card p-6 bg-white">
          <div className="text-gray-500 text-sm mb-2">Total Gifts</div>
          <div className="text-3xl font-bold text-primary">0</div>
          <div className="text-xs text-gray-400 mt-2">Gift contributions</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/editor/1"
            className="block p-6 bg-white card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">✏️</div>
            <h3 className="font-bold mb-1">Create New Card</h3>
            <p className="text-sm text-gray-600">Start designing your wedding card</p>
          </Link>
          <Link
            href="/guests"
            className="block p-6 bg-white card hover:shadow-lg transition"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-bold mb-1">Manage Guests</h3>
            <p className="text-sm text-gray-600">View guest list and RSVPs</p>
          </Link>
        </div>
      </div>

      {/* Recent Cards */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-4">Recent Cards</h2>
        <div className="bg-white card p-8 text-center">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <>
              <p className="text-gray-500 mb-4">No cards yet</p>
              <Link href="/editor/1" className="btn-primary inline-block">
                Create Your First Card
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
