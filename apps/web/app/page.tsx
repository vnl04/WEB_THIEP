'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-light">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-primary">WeddingCard</h1>
        <div className="flex gap-4">
          <Link href="/templates" className="px-4 py-2 text-dark hover:text-primary transition">
            Templates
          </Link>
          <Link href="/pricing" className="px-4 py-2 text-dark hover:text-primary transition">
            Pricing
          </Link>
          <Link href="/login" className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center px-4">
        <h1 className="text-5xl font-serif font-bold mb-4 text-primary">
          Create Beautiful Wedding Cards
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Manage guests, collect RSVPs, and receive gifts all in one platform
        </p>
        <Link href="/templates" className="btn-primary text-lg inline-block">
          Start Creating
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-2xl font-serif mb-3">Beautiful Templates</h3>
            <p className="text-gray-600">Choose from our collection of elegant wedding card templates</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-serif mb-3">Guest Management</h3>
            <p className="text-gray-600">Easily manage invitations, RSVPs, and track attendance</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-2xl font-serif mb-3">Gift Tracking</h3>
            <p className="text-gray-600">Accept gifts and monetary contributions digitally</p>
          </div>
        </div>
      </section>
    </main>
  );
}
