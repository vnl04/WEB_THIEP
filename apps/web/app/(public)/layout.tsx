'use client';

import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm sticky top-0 z-50">
        <Link href="/" className="text-2xl font-bold text-primary">
          WeddingCard
        </Link>
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
      {children}
    </>
  );
}
