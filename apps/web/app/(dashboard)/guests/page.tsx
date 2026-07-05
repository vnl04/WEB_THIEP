'use client';

import { useState } from 'react';

export default function GuestsPage() {
  const [guests] = useState([
    { id: 1, name: 'Guest 1', email: 'guest1@example.com', status: 'attending' },
    { id: 2, name: 'Guest 2', email: 'guest2@example.com', status: 'pending' },
  ]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold mb-2">Guest Management</h1>
        <p className="text-gray-600">Manage your guest list and track RSVPs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card bg-white p-4">
          <div className="text-gray-500 text-sm mb-1">Total Guests</div>
          <div className="text-3xl font-bold text-primary">{guests.length}</div>
        </div>
        <div className="card bg-white p-4">
          <div className="text-gray-500 text-sm mb-1">Attending</div>
          <div className="text-3xl font-bold text-green-600">
            {guests.filter(g => g.status === 'attending').length}
          </div>
        </div>
        <div className="card bg-white p-4">
          <div className="text-gray-500 text-sm mb-1">Pending</div>
          <div className="text-3xl font-bold text-yellow-600">
            {guests.filter(g => g.status === 'pending').length}
          </div>
        </div>
      </div>

      <div className="bg-white card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{guest.name}</td>
                <td className="px-6 py-4 text-gray-600">{guest.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    guest.status === 'attending'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-primary hover:underline text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
