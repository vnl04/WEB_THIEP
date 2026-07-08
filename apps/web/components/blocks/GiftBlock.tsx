'use client';

interface GiftBlockProps {
  cardId: string;
}

export default function GiftBlock({ cardId }: GiftBlockProps) {
  return (
    <div className="p-6 border-t bg-secondary">
      <h2 className="text-2xl font-serif font-bold mb-4 text-center">Send us a Gift</h2>
      <div className="bg-white p-4 rounded-lg">
        <div className="bg-gray-200 h-40 rounded flex items-center justify-center mb-4">
          <span className="text-gray-500">QR Code</span>
        </div>
        <p className="text-sm text-gray-600 text-center mb-2">Scan to transfer</p>
        <p className="text-center font-mono text-sm">1234567890</p>
      </div>
    </div>
  );
}
