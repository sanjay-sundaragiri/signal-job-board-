import React from 'react'

export default function JobRowSkeleton() {
  return (
    <div className="animate-pulse border border-line rounded-xl px-4 py-3.5 mb-2.5 bg-panel">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-line shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-40 bg-line rounded" />
          <div className="h-3 w-24 bg-line rounded" />
          <div className="h-2.5 w-56 bg-line rounded" />
          <div className="flex gap-1.5 pt-1">
            <div className="h-4 w-12 bg-line rounded-full" />
            <div className="h-4 w-14 bg-line rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
