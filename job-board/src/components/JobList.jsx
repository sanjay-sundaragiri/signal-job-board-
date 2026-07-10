import React from 'react'
import JobRow from './JobRow'
import JobRowSkeleton from './Skeleton'
import EmptyState from './EmptyState'

export default function JobList({
  jobs,
  loading,
  activeJobId,
  savedIds,
  onSelect,
  onToggleSave,
  sortBy,
  setSortBy,
  showSavedOnly,
  onResetFilters,
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3 px-0.5">
        <p className="text-sm text-muted">
          {loading ? 'Loading roles…' : `${jobs.length} open role${jobs.length === 1 ? '' : 's'}`}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="text-muted mr-1">Sort</span>
          {[
            ['newest', 'Newest'],
            ['salary', 'Salary'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`px-2 py-1 rounded-md border transition-colors ${
                sortBy === key
                  ? 'bg-ink text-white border-ink'
                  : 'border-line text-muted hover:border-ink/40'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <JobRowSkeleton key={i} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-panel border border-line rounded-xl">
          <EmptyState variant={showSavedOnly ? 'no-saved' : 'no-results'} onReset={onResetFilters} />
        </div>
      ) : (
        <div>
          {jobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              isActive={job.id === activeJobId}
              isSaved={savedIds.includes(job.id)}
              onSelect={onSelect}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}
