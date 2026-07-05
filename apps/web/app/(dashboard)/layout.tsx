'use client';

import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-light">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-serif font-bold text-primary mb-8">Dashboard</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition">
            Overview
          </Link>
          <Link href="/editor/1" className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition">
            Card Editor
          </Link>
          <Link href="/guests" className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition">
            Guests
          </Link>
          <Link href="/wishes" className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition">
            Wishes
          </Link>
          <Link href="/gifts" className="block px-4 py-3 rounded-lg hover:bg-primary/10 transition">
            Gifts
          </Link>
          <Link href="/login" className="block px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition mt-8">
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
