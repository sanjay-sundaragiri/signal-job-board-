import React, { useEffect, useRef, useState } from 'react'
import { CornerDownLeft, Search } from 'lucide-react'
import { salaryRange } from '../utils/format'

export default function CommandPalette({ jobs, onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = jobs
    .filter((j) => {
      const haystack = `${j.title} ${j.company} ${j.tags.join(' ')}`.toLowerCase()
      return haystack.includes(query.toLowerCase())
    })
    .slice(0, 8)

  useEffect(() => {
    setHighlight(0)
  }, [query])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[highlight]) onSelect(results[highlight].id)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-[95] flex items-start justify-center pt-[12vh] px-4 bg-ink/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick job search"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-panel w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-line">
          <Search size={16} className="text-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Jump to a role or company…"
            className="flex-1 text-sm outline-none placeholder:text-muted/70"
          />
          <kbd className="font-mono text-[10px] text-muted border border-line rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto py-1.5">
          {results.length === 0 ? (
            <p className="text-sm text-muted text-center py-8">No matches for "{query}"</p>
          ) : (
            results.map((job, i) => (
              <button
                key={job.id}
                onClick={() => onSelect(job.id)}
                onMouseEnter={() => setHighlight(i)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                  i === highlight ? 'bg-signal/10' : ''
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium truncate">{job.title}</span>
                  <span className="block text-xs text-muted truncate">{job.company}</span>
                </span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-mint">
                    {salaryRange(job.salaryMin, job.salaryMax)}
                  </span>
                  {i === highlight && <CornerDownLeft size={13} className="text-signal" />}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
