'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  charCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, charCount, className = '', maxLength, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={`textarea-field ${error ? 'border-error focus:ring-error' : ''} ${className}`}
          maxLength={maxLength}
          {...props}
        />

        <div className="flex items-center justify-between gap-4">
          <div>
            {error && (
              <p className="text-sm text-error font-medium">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-sm text-foreground-muted">{helperText}</p>
            )}
          </div>
          {charCount && maxLength && (
            <p className="text-sm text-foreground-muted ml-auto">
              {maxLength} characters
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
