'use client';

import Link from 'next/link';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  featured?: boolean;
  onSelect?: (id: string) => void;
}

export default function TemplateCard({
  id,
  name,
  description,
  category,
  thumbnail,
  featured,
  onSelect,
}: TemplateCardProps) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="card overflow-hidden hover:ring-2 hover:ring-primary transition-all duration-300 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-surface-light overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-lighter to-secondary">
            <span className="text-4xl opacity-50">💌</span>
          </div>
        )}

        {featured && (
          <div className="absolute top-2 right-2">
            <span className="badge-primary">✨ Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <span className="badge text-xs">{category}</span>
          <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>

        <p className="text-sm text-foreground-muted line-clamp-2">{description}</p>

        {/* CTA */}
        <button
          onClick={handleClick}
          className="w-full btn-primary justify-center py-2 text-sm"
        >
          Use Template
        </button>
      </div>
    </div>
  );
}
