'use client';

import { useState } from 'react';

export default function GiftsPage() {
  const [gifts] = useState([
    { id: 1, donor: 'Guest 1', amount: 500000, status: 'confirmed', date: '2025-01-15' },
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Gifts & Contributions</h1>
          <p className="text-gray-600">Track all gifts and donations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Received</p>
            <p className="text-4xl font-bold text-primary">{totalGifts.toLocaleString()} VND</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Gifts</p>
            <p className="text-4xl font-bold text-primary">{gifts.length}</p>
          </div>
          <div className="card p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Pending Withdrawals</p>
            <p className="text-4xl font-bold text-primary">0</p>
            <button className="btn-primary mt-4 text-sm w-full">Withdraw</button>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <div className="p-6 border-b">
            <h2 className="font-bold">Recent Gifts</h2>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  From
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {gifts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No gifts received yet
                  </td>
                </tr>
              ) : (
                gifts.map((gift: any) => (
                  <tr key={gift.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">
                      {new Date(gift.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {gift.amount.toLocaleString()} VND
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{gift.donor || 'Anonymous'}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
