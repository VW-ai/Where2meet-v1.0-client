'use client';

import { Plus, Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  onCreateEvent: () => void;
  isLoading: boolean;
  disabled: boolean;
}

export function ActionButtons({ onCreateEvent, isLoading, disabled }: ActionButtonsProps) {
  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={onCreateEvent}
        disabled={disabled || isLoading}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-coral-500 rounded-full shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:bg-coral-600 hover:shadow-[0_6px_20px_rgba(255,107,107,0.4)] focus:outline-none focus:ring-4 focus:ring-coral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 w-full sm:w-auto min-w-[240px]"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Finding a Spot...
          </>
        ) : (
          <>
            <Plus className="w-5 h-5" />
            Find My Spot
          </>
        )}
      </button>
      <p className="text-xs text-gray-400 mt-3">No credit card or sign-up needed.</p>
    </div>
  );
}
