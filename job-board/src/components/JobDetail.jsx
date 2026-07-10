import React from 'react'
import { Bookmark, Briefcase, MapPin, X } from 'lucide-react'
import { salaryRange, timeAgo } from '../utils/format'

export default function JobDetail({ job, isSaved, onToggleSave, onApply, onClose }) {
  if (!job) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full text-center py-24 px-8 bg-panel border border-line rounded-xl">
        <div className="w-12 h-12 rounded-full bg-paper border border-line flex items-center justify-center mb-4">
          <Briefcase size={20} className="text-muted" />
        </div>
        <h3 className="font-display font-semibold text-base mb-1">Select a role to read more</h3>
        <p className="text-sm text-muted max-w-xs">
          Click any listing on the left, or press <kbd className="font-mono px-1 border border-line rounded">↑</kbd>{' '}
          <kbd className="font-mono px-1 border border-line rounded">↓</kbd> to move between them.
        </p>
      </div>
    )
  }

  return (
    <div
      className="bg-panel border border-line rounded-xl animate-fadeIn h-full overflow-y-auto"
      key={job.id}
    >
      <div className="p-6 border-b border-line">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-display font-semibold text-lg shrink-0"
              style={{ backgroundColor: job.logoColor }}
              aria-hidden="true"
            >
              {job.logoLetter}
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-semibold text-xl leading-tight">{job.title}</h2>
              <p className="text-sm text-muted mt-0.5">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close job details"
            className="lg:hidden p-2 -mr-2 -mt-1 text-muted hover:text-ink transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 font-mono text-xs text-muted">
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {job.location} · {job.country}
          </span>
          <span className="text-mint font-medium">{salaryRange(job.salaryMin, job.salaryMax)}</span>
          <span>Posted {timeAgo(job.postedAt)}</span>
          <span>{job.applicants} applicants</span>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => onApply(job)}
            className="flex-1 sm:flex-none bg-signal hover:bg-signalDark text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Apply now
          </button>
          <button
            onClick={() => onToggleSave(job.id)}
            className={`flex items-center gap-1.5 font-medium text-sm px-4 py-2.5 rounded-lg border transition-colors ${
              isSaved ? 'bg-ink text-white border-ink' : 'border-line text-ink hover:border-ink'
            }`}
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2">About the role</h3>
          <p className="text-sm leading-relaxed text-ink/90">{job.description}</p>
        </section>

        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2">
            What you'll do
          </h3>
          <ul className="space-y-1.5">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink/90 flex gap-2">
                <span className="text-signal mt-1.5 w-1 h-1 rounded-full bg-signal shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2">
            What we're looking for
          </h3>
          <ul className="space-y-1.5">
            {job.requirements.map((r, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink/90 flex gap-2">
                <span className="text-mint mt-1.5 w-1 h-1 rounded-full bg-mint shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2">Benefits</h3>
          <div className="flex flex-wrap gap-1.5">
            {job.benefits.map((b) => (
              <span
                key={b}
                className="text-xs px-2.5 py-1 rounded-full bg-paper border border-line text-ink/80"
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        <section className="pt-2 border-t border-line">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-1">
            About {job.company}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{job.companyBlurb}</p>
        </section>
      </div>
    </div>
  )
}
