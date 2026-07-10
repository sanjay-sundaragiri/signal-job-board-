import React from 'react'
import { Bookmark, Command, Search } from 'lucide-react'

export default function Header({
  query,
  onQueryChange,
  savedCount,
  showSavedOnly,
  onToggleSavedOnly,
  onOpenPalette,
  searchInputRef,
}) {
  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-line">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-4 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-md bg-signal flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 13h3l1.5-4 3 8L15 13h3"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Signal</span>
        </div>

        <div className="flex-1 max-w-xl relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
          <input
            ref={searchInputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            type="text"
            placeholder="Search roles, companies, tags… "
            className="w-full bg-panel border border-line rounded-lg pl-9 pr-4 py-2 text-sm placeholder:text-muted/70 focus:border-signal transition-colors"
            aria-label="Search jobs"
          />
        </div>

        <button
          onClick={onOpenPalette}
          className="hidden md:flex items-center gap-1.5 text-xs text-muted border border-line rounded-md px-2.5 py-1.5 hover:border-signal hover:text-signal transition-colors font-mono"
        >
          <Command size={12} />
          <span>K</span>
        </button>

        <button
          onClick={onToggleSavedOnly}
          className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors shrink-0 ${
            showSavedOnly
              ? 'bg-ink text-white border-ink'
              : 'border-line text-ink hover:border-ink'
          }`}
        >
          <Bookmark size={15} fill={showSavedOnly ? 'currentColor' : 'none'} />
          <span className="hidden sm:inline">Saved</span>
          <span className="font-mono text-xs opacity-70">{savedCount}</span>
        </button>
      </div>
    </header>
  )
}
