'use client';

interface CoverBlockProps {
  card: any;
}

export default function CoverBlock({ card }: CoverBlockProps) {
  return (
    <div className="h-64 bg-gradient-to-b from-primary/30 to-secondary flex items-center justify-center text-center p-4">
      <div>
        <h1 className="text-4xl font-serif font-bold text-primary mb-2">
          {card.brideName} & {card.groomName}
        </h1>
        <p className="text-lg text-gray-700">
          {card.weddingDate && new Date(card.weddingDate).toLocaleDateString('vi-VN')}
        </p>
      </div>
    </div>
  );
}
