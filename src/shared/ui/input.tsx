/**
 * Input Component
 *
 * Reusable input field with label and error handling
 * Follows the Where2Meet design system (rounded, warm colors)
 */

import { cn } from '@/shared/lib/cn';
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, icon, type = 'text', ...props }, ref) => {
    const isDateTimeInput = type === 'datetime-local' || type === 'date' || type === 'time';

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              // Base styles
              'w-full py-3.5 rounded-2xl',
              icon ? 'pl-12 pr-4' : 'px-4',
              'bg-gray-50 border-2 border-transparent',
              'transition-all duration-200',
              'placeholder:text-gray-400',
              'disabled:bg-gray-100 disabled:cursor-not-allowed',
              'text-gray-900 font-medium',

              // Focus states
              'focus:outline-none focus:border-coral-500 focus:bg-white focus:ring-4 focus:ring-coral-100',
              'hover:border-gray-200 hover:bg-white',

              // Error states
              error && 'border-red-500 focus:border-red-500 focus:ring-red-200',

              // Special styling for datetime inputs
              isDateTimeInput && ['cursor-pointer', 'pr-3'],

              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
