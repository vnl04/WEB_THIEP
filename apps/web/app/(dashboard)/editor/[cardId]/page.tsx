'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EditorPage() {
  const [cardName] = useState('My Wedding Card');
  const [activeTab] = useState('content');

  return (
    <div className="h-screen flex flex-col bg-light">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-primary">{cardName}</h1>
          <p className="text-sm text-gray-500">Edit your wedding card</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Back
          </Link>
          <button className="btn-primary">
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Control Panel */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="flex border-b">
            {['content', 'design', 'guests', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="p-4 space-y-4">
            {activeTab === 'content' && (
              <div>
                <h3 className="font-bold mb-3">Card Content</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-1">Bride Name</label>
                    <input type="text" placeholder="Bride" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Groom Name</label>
                    <input type="text" placeholder="Groom" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Wedding Date</label>
                    <input type="date" className="input-field" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Location</label>
                    <input type="text" placeholder="Wedding location" className="input-field" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div>
                <h3 className="font-bold mb-3">Design</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-2">Template</label>
                    <select className="input-field">
                      <option>Classic Elegance</option>
                      <option>Modern Minimal</option>
                      <option>Romantic Garden</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Primary Color</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#D4736E" className="w-12 h-10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'guests' && (
              <div>
                <h3 className="font-bold mb-3">Guests</h3>
                <p className="text-sm text-gray-600 mb-3">Manage your guest list</p>
                <Link href="/guests" className="btn-primary w-full text-center block">
                  Manage Guests
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 className="font-bold mb-3">Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show wishes</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show gifts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RSVP enabled</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas Preview */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8 overflow-auto">
          <div className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Preview Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-12 text-white text-center">
              <h2 className="text-4xl font-serif font-bold mb-2">Bride & Groom</h2>
              <p className="text-lg opacity-90">Together with their families</p>
            </div>

            {/* Preview Content */}
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-6">request the honour of your presence at the marriage</p>
              <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Wedding Celebration</h1>
              <p className="text-gray-700 mb-8">Date & Time • Location</p>

              {/* Preview Actions */}
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
                  RSVP
                </button>
                <button className="w-full px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10">
                  Send Wishes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
