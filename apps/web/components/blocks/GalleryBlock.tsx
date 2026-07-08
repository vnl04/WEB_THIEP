'use client';

interface GalleryBlockProps {
  media: any[];
}

export default function GalleryBlock({ media }: GalleryBlockProps) {
  return (
    <div className="p-6 border-t">
      <h2 className="text-2xl font-serif font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-2 gap-3">
        {media.map((item, idx) => (
          <div key={idx} className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
