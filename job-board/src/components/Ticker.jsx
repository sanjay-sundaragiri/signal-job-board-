import React, { useMemo } from 'react'
import { salaryRange } from '../utils/format'

export default function Ticker({ jobs, onSelectJob }) {
  const items = useMemo(() => {
    const sorted = [...jobs].sort((a, b) => b.postedAt - a.postedAt).slice(0, 8)
    return [...sorted, ...sorted] // duplicate for seamless loop
  }, [jobs])

  return (
    <div
      className="relative bg-ink text-white overflow-hidden border-b border-black/40"
      role="marquee"
      aria-label="Newest job postings"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent z-10" />
      <div className="flex whitespace-nowrap animate-marquee py-2 [animation-play-state:running] hover:[animation-play-state:paused]">
        {items.map((job, i) => (
          <button
            key={`${job.id}-${i}`}
            onClick={() => onSelectJob(job.id)}
            className="flex items-center gap-2 px-5 font-mono text-xs text-white/80 hover:text-white transition-colors shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-mint shrink-0" />
            <span className="font-medium text-white">{job.company}</span>
            <span className="text-white/40">·</span>
            <span>{job.title}</span>
            <span className="text-white/40">·</span>
            <span className="text-mint">{salaryRange(job.salaryMin, job.salaryMax)}</span>
            <span className="text-white/30 pl-3">/</span>
          </button>
        ))}
      </div>
    </div>
  )
}
