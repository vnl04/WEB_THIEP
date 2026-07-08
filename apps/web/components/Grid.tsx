'use client';

import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  cols?: 'auto' | 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const colsClasses = {
  auto: 'grid-cols-auto',
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export default function Grid({
  children,
  cols = 3,
  gap = 'lg',
  className = '',
}: GridProps) {
  return (
    <div className={`grid ${colsClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}
