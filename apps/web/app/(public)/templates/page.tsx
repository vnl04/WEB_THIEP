'use client';

import Link from 'next/link';

const templates = [
  {
    id: 1,
    name: 'Classic Elegance',
    description: 'Timeless design with elegant serif fonts',
    emoji: '✨',
    category: 'traditional',
    price: 'Free',
  },
  {
    id: 2,
    name: 'Modern Minimal',
    description: 'Clean and contemporary design',
    emoji: '🎨',
    category: 'modern',
    price: 'Basic',
  },
  {
    id: 3,
    name: 'Romantic Garden',
    description: 'Floral theme with beautiful colors',
    emoji: '🌸',
    category: 'traditional',
    price: 'Pro',
  },
  {
    id: 4,
    name: 'Luxury Gold',
    description: 'Premium design with gold accents',
    emoji: '👑',
    category: 'modern',
    price: 'Pro',
  },
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-light py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4 text-primary">
            Choose Your Template
          </h1>
          <p className="text-xl text-gray-600">
            Select from our beautiful collection of wedding card designs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {templates.map((template) => (
            <div key={template.id} className="card bg-white p-6 hover:shadow-lg transition">
              <div className="text-6xl mb-4 text-center">{template.emoji}</div>
              <h3 className="font-bold text-lg mb-2 text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-4">{template.description}</p>
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                  {template.price}
                </span>
              </div>
              <Link href="/editor/1" className="btn-primary w-full text-center block">
                Use Template
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-white card p-12 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Fully Customizable</h2>
          <p className="text-gray-600 mb-6">
            Edit colors, fonts, text, images, and layout to create your unique wedding card
          </p>
          <Link href="/editor/1" className="btn-primary inline-block">
            Start Creating Now
          </Link>
        </div>
      </div>
    </main>
  );
}
