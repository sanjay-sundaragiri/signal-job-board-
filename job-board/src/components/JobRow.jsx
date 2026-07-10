import React from 'react'
import { Bookmark, MapPin } from 'lucide-react'
import { salaryRange, timeAgo } from '../utils/format'

export default function JobRow({ job, isActive, isSaved, onSelect, onToggleSave }) {
  return (
    <div
      onClick={() => onSelect(job.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(job.id)
      }}
      className={`group cursor-pointer border rounded-xl px-4 py-3.5 mb-2.5 transition-all ${
        isActive
          ? 'bg-signal/[0.06] border-signal shadow-sm'
          : 'bg-panel border-line hover:border-ink/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-display font-semibold shrink-0"
          style={{ backgroundColor: job.logoColor }}
          aria-hidden="true"
        >
          {job.logoLetter}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-semibold text-[15px] leading-tight truncate">
                  {job.title}
                </h3>
                {job.featured && (
                  <span className="font-mono text-[10px] uppercase tracking-wide bg-amber/15 text-amber px-1.5 py-0.5 rounded shrink-0">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-muted mt-0.5 truncate">{job.company}</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleSave(job.id)
              }}
              aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
              aria-pressed={isSaved}
              className="shrink-0 p-1.5 rounded-md text-muted hover:text-signal hover:bg-signal/10 transition-colors"
            >
              <Bookmark size={17} fill={isSaved ? '#2F5DFF' : 'none'} color={isSaved ? '#2F5DFF' : 'currentColor'} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 font-mono text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {job.location}
            </span>
            <span className="text-mint font-medium">{salaryRange(job.salaryMin, job.salaryMax)}</span>
            <span>{timeAgo(job.postedAt)}</span>
            <span>{job.applicants} applicants</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {job.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-paper border border-line text-ink/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
