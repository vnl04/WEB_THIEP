'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={`input-field ${error ? 'border-error focus:ring-error' : ''} ${className}`}
            {...props}
          />
          {icon && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none">
              {icon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-sm text-error font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-foreground-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
