'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/templates?category=${category}`,
        );
        const data = await res.json();
        setTemplates(data.data || []);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [category]);

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Wedding Card Templates</h1>

        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-lg ${!category ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setCategory('traditional')}
            className={`px-4 py-2 rounded-lg ${category === 'traditional' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            Traditional
          </button>
          <button
            onClick={() => setCategory('modern')}
            className={`px-4 py-2 rounded-lg ${category === 'modern' ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            Modern
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading templates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template: any) => (
              <Link href={`/editor?templateId=${template.id}`} key={template.id}>
                <div className="card p-4 cursor-pointer hover:shadow-lg transition">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Template Image</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{template.tier}</span>
                    <button className="btn-primary text-sm py-2 px-3">Use</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
