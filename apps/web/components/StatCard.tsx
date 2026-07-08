'use client';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  className?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  className = '',
}: StatCardProps) {
  const isPositive = change ? change > 0 : false;

  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-foreground-muted mb-2">{label}</p>
          <div className="flex items-end gap-2 mb-3">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change !== undefined && (
              <span
                className={`text-sm font-semibold ${
                  isPositive ? 'text-success' : 'text-error'
                }`}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            )}
          </div>
          {changeLabel && (
            <p className="text-xs text-foreground-muted">{changeLabel}</p>
          )}
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
    </div>
  );
}
