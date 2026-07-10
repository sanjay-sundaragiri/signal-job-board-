import React from 'react'
import { LOCATIONS, ROLE_TYPES, SENIORITY } from '../data/jobs'
import { RotateCcw } from 'lucide-react'

function Section({ title, children }) {
  return (
    <div className="py-4 border-b border-line last:border-b-0">
      <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted mb-2.5">
        {title}
      </h3>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm px-2.5 py-1 rounded-md border transition-colors mr-1.5 mb-1.5 ${
        active
          ? 'bg-signal/10 border-signal text-signalDark font-medium'
          : 'border-line text-ink/80 hover:border-ink/40'
      }`}
    >
      {children}
    </button>
  )
}

export default function FilterRail({ filters, setFilters, resultCount }) {
  const toggle = (key, value) => {
    setFilters((prev) => {
      const set = new Set(prev[key])
      set.has(value) ? set.delete(value) : set.add(value)
      return { ...prev, [key]: Array.from(set) }
    })
  }

  const resetAll = () =>
    setFilters({ roleType: [], seniority: [], location: [], minSalary: 0 })

  const hasActiveFilters =
    filters.roleType.length || filters.seniority.length || filters.location.length || filters.minSalary > 0

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-[88px] bg-panel border border-line rounded-xl px-4">
        <div className="flex items-center justify-between pt-4 pb-1">
          <span className="font-display font-semibold text-sm">Filters</span>
          {hasActiveFilters ? (
            <button
              onClick={resetAll}
              className="flex items-center gap-1 text-xs text-muted hover:text-signal transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          ) : null}
        </div>

        <Section title="Role type">
          <div className="flex flex-wrap">
            {ROLE_TYPES.map((r) => (
              <Chip key={r} active={filters.roleType.includes(r)} onClick={() => toggle('roleType', r)}>
                {r}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="Seniority">
          <div className="flex flex-wrap">
            {SENIORITY.map((s) => (
              <Chip key={s} active={filters.seniority.includes(s)} onClick={() => toggle('seniority', s)}>
                {s}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="Location">
          <div className="flex flex-wrap">
            {LOCATIONS.map((l) => (
              <Chip key={l} active={filters.location.includes(l)} onClick={() => toggle('location', l)}>
                {l}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title={`Minimum salary — $${filters.minSalary}k`}>
          <input
            type="range"
            min="0"
            max="200"
            step="10"
            value={filters.minSalary}
            onChange={(e) => setFilters((prev) => ({ ...prev, minSalary: Number(e.target.value) }))}
            className="w-full accent-signal"
            aria-label="Minimum salary filter"
          />
          <div className="flex justify-between text-[11px] font-mono text-muted mt-1">
            <span>$0k</span>
            <span>$200k+</span>
          </div>
        </Section>

        <div className="py-3 -mx-4 px-4 bg-paper/60 rounded-b-xl border-t border-line">
          <p className="font-mono text-xs text-muted">
            <span className="text-ink font-medium">{resultCount}</span> role{resultCount === 1 ? '' : 's'} match
          </p>
        </div>
      </div>
    </aside>
  )
}
