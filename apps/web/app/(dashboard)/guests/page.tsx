'use client';

import { useState } from 'react';

export default function GuestsPage() {
  const [guests, setGuests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="min-h-screen bg-light py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Guest List</h1>
            <p className="text-gray-600">Manage your guests and track RSVPs</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            Add Guest
          </button>
        </div>

        {showForm && (
          <div className="card p-6 mb-8">
            <form className="space-y-4">
              <input className="input-field" placeholder="Guest name" />
              <input className="input-field" type="email" placeholder="Email" />
              <input className="input-field" type="tel" placeholder="Phone" />
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">
                  Add
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">RSVP</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No guests added yet
                  </td>
                </tr>
              ) : (
                guests.map((guest: any) => (
                  <tr key={guest.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{guest.name}</td>
                    <td className="px-6 py-4 text-gray-600">{guest.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4">--</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-red-600 hover:underline text-sm">Remove</button>
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
