'use client';

import { useState, useEffect } from 'react';

interface CountdownBlockProps {
  weddingDate?: string;
}

export default function CountdownBlock({ weddingDate }: CountdownBlockProps) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!weddingDate) return;

    const updateCountdown = () => {
      const target = new Date(weddingDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div className="bg-secondary p-8 text-center">
      <h2 className="text-2xl font-serif font-bold mb-6">Countdown</h2>
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Days', value: countdown.days },
          { label: 'Hours', value: countdown.hours },
          { label: 'Minutes', value: countdown.minutes },
          { label: 'Seconds', value: countdown.seconds },
        ].map((item) => (
          <div key={item.label} className="bg-white p-3 rounded-lg">
            <div className="text-2xl font-bold text-primary">{item.value.toString().padStart(2, '0')}</div>
            <div className="text-xs text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
