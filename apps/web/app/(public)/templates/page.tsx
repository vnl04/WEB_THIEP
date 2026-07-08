'use client';

import Link from 'next/link';
import { useState } from 'react';

const templates = [
  {
    id: 1,
    name: 'Classic Elegance',
    description: 'Timeless design with elegant serif fonts',
    color: 'from-purple-500 to-pink-500',
    category: 'traditional',
    price: 'Free',
    features: ['Elegant typography', 'Classic layout', 'Easy to customize'],
  },
  {
    id: 2,
    name: 'Modern Minimal',
    description: 'Clean and contemporary design',
    color: 'from-blue-500 to-cyan-500',
    category: 'modern',
    price: 'Basic',
    features: ['Clean layout', 'Modern colors', 'Simple & effective'],
  },
  {
    id: 3,
    name: 'Romantic Garden',
    description: 'Floral theme with beautiful colors',
    color: 'from-rose-500 to-pink-500',
    category: 'traditional',
    price: 'Pro',
    features: ['Floral accents', 'Romantic colors', 'Premium design'],
  },
  {
    id: 4,
    name: 'Luxury Gold',
    description: 'Premium design with gold accents',
    color: 'from-yellow-500 to-orange-500',
    category: 'modern',
    price: 'Pro',
    features: ['Gold accents', 'Luxury feel', 'Sophisticated look'],
  },
  {
    id: 5,
    name: 'Boho Chic',
    description: 'Bohemian style with earth tones',
    color: 'from-amber-500 to-orange-600',
    category: 'modern',
    price: 'Basic',
    features: ['Earth tones', 'Bohemian vibes', 'Relaxed feel'],
  },
  {
    id: 6,
    name: 'Royal Elegance',
    description: 'Regal design with bold colors',
    color: 'from-indigo-600 to-purple-600',
    category: 'traditional',
    price: 'Pro',
    features: ['Royal styling', 'Bold colors', 'Premium accents'],
  },
];

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background py-12 px-4 section">
      <div className="section-wide">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-4 text-foreground">
            Beautiful Wedding Card Templates
          </h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Choose from our professionally designed collection of wedding card templates. All templates are fully customizable to match your style.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-foreground hover:border-primary'
            }`}
          >
            All Templates
          </button>
          <button
            onClick={() => setSelectedCategory('traditional')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'traditional'
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-foreground hover:border-primary'
            }`}
          >
            Traditional
          </button>
          <button
            onClick={() => setSelectedCategory('modern')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === 'modern'
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-foreground hover:border-primary'
            }`}
          >
            Modern
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="card overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-32 bg-gradient-to-r ${template.color} opacity-80`}></div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-serif font-bold text-foreground">{template.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.price === 'Free'
                      ? 'bg-success/10 text-success'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {template.price}
                  </span>
                </div>

                <p className="text-foreground-muted text-sm mb-4">{template.description}</p>

                <ul className="space-y-2 mb-6">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground-muted flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={`/editor/${template.id}`} 
                  className="btn-primary w-full text-center"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-light card p-12 text-center rounded-2xl">
          <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">
            All Templates Are Fully Customizable
          </h2>
          <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
            With our powerful editor, you can customize every aspect of your template: colors, fonts, text, images, layout, and more. Create a unique wedding card that perfectly represents your special day.
          </p>
          <Link href="/editor/1" className="btn-primary inline-block">
            Start Creating Your Card
          </Link>
        </div>
      </div>
    </main>
  );
}
