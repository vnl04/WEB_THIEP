'use client';

import { useState } from 'react';

interface RsvpFormBlockProps {
  cardId: string;
}

export default function RsvpFormBlock({ cardId }: RsvpFormBlockProps) {
  const [status, setStatus] = useState('');

  return (
    <div className="p-6 border-t">
      <h2 className="text-2xl font-serif font-bold mb-4 text-center">Will you attend?</h2>
      <div className="flex gap-3">
        <button
          onClick={() => setStatus('yes')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            status === 'yes'
              ? 'bg-primary text-white'
              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => setStatus('no')}
          className={`flex-1 py-3 rounded-lg font-medium transition ${
            status === 'no'
              ? 'bg-primary text-white'
              : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
          }`}
        >
          No
        </button>
      </div>
    </div>
  );
}
