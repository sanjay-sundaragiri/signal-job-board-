import React from 'react'
import { Bookmark, SearchX } from 'lucide-react'

export default function EmptyState({ variant = 'no-results', onReset }) {
  if (variant === 'no-saved') {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center mb-4">
          <Bookmark size={20} className="text-signal" />
        </div>
        <h3 className="font-display font-semibold text-base mb-1">No saved roles yet</h3>
        <p className="text-sm text-muted max-w-xs">
          Bookmark a role from the list to keep it here — nothing leaves this device.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center mb-4">
        <SearchX size={20} className="text-muted" />
      </div>
      <h3 className="font-display font-semibold text-base mb-1">Nothing matches those filters</h3>
      <p className="text-sm text-muted max-w-xs mb-4">
        Try widening the salary range or clearing a filter or two.
      </p>
      <button
        onClick={onReset}
        className="text-sm font-medium text-signal hover:text-signalDark transition-colors"
      >
        Clear all filters
      </button>
    </div>
  )
}
