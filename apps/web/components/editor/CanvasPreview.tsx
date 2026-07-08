'use client';

import { useState } from 'react';
import CoverBlock from '../blocks/CoverBlock';
import CountdownBlock from '../blocks/CountdownBlock';
import GalleryBlock from '../blocks/GalleryBlock';
import RsvpFormBlock from '../blocks/RsvpFormBlock';
import WishesBlock from '../blocks/WishesBlock';
import GiftBlock from '../blocks/GiftBlock';

interface CanvasPreviewProps {
  card: any;
  onBlockSelect: (blockId: string) => void;
  selectedBlock: string | null;
  onSave: (card: any) => void;
}

export default function CanvasPreview({
  card,
  onBlockSelect,
  selectedBlock,
  onSave,
}: CanvasPreviewProps) {
  const handleBlockClick = (blockId: string) => {
    onBlockSelect(blockId);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden mobile-frame">
      {/* Cover Block */}
      <div
        onClick={() => handleBlockClick('cover')}
        className={`cursor-pointer transition ${selectedBlock === 'cover' ? 'ring-2 ring-primary' : ''}`}
      >
        <CoverBlock card={card} />
      </div>

      {/* Countdown Block */}
      <div
        onClick={() => handleBlockClick('countdown')}
        className={`cursor-pointer transition border-t ${selectedBlock === 'countdown' ? 'ring-2 ring-primary' : ''}`}
      >
        <CountdownBlock weddingDate={card.weddingDate} />
      </div>

      {/* Gallery Block */}
      {card.media && card.media.length > 0 && (
        <div
          onClick={() => handleBlockClick('gallery')}
          className={`cursor-pointer transition border-t ${selectedBlock === 'gallery' ? 'ring-2 ring-primary' : ''}`}
        >
          <GalleryBlock media={card.media} />
        </div>
      )}

      {/* Story Block */}
      {card.story && (
        <section className="p-6 border-t">
          <h2 className="text-2xl font-serif font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{card.story}</p>
        </section>
      )}

      {/* RSVP Block */}
      <div
        onClick={() => handleBlockClick('rsvp')}
        className={`cursor-pointer transition border-t ${selectedBlock === 'rsvp' ? 'ring-2 ring-primary' : ''}`}
      >
        <RsvpFormBlock cardId={card.id} />
      </div>

      {/* Wishes Block */}
      <div
        onClick={() => handleBlockClick('wishes')}
        className={`cursor-pointer transition border-t ${selectedBlock === 'wishes' ? 'ring-2 ring-primary' : ''}`}
      >
        <WishesBlock cardId={card.id} />
      </div>

      {/* Gift Block */}
      <div
        onClick={() => handleBlockClick('gift')}
        className={`cursor-pointer transition border-t ${selectedBlock === 'gift' ? 'ring-2 ring-primary' : ''}`}
      >
        <GiftBlock cardId={card.id} />
      </div>
    </div>
  );
}
