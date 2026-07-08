'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'badge',
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning',
    error: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-error/10 text-error',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
