'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
}: CardProps) {
  const variants = {
    default: 'card',
    elevated: 'card-elevated',
    outlined: 'border-2 border-border rounded-xl bg-surface transition-all duration-300',
  };

  return (
    <div
      className={`${variants[variant]} ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
