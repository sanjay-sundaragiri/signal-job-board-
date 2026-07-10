import React, { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import Ticker from './components/Ticker'
import FilterRail from './components/FilterRail'
import JobList from './components/JobList'
import JobDetail from './components/JobDetail'
import ApplyModal from './components/ApplyModal'
import CommandPalette from './components/CommandPalette'
import { ToastProvider, useToast } from './components/Toast'
import { fetchJobs } from './data/jobs'
import { useLocalStorage } from './hooks/useLocalStorage'
import { X } from 'lucide-react'

const DEFAULT_FILTERS = { roleType: [], seniority: [], location: [], minSalary: 0 }

function AppInner() {
  const [allJobs, setAllJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sortBy, setSortBy] = useState('newest')
  const [activeJobId, setActiveJobId] = useState(null)
  const [savedIds, setSavedIds] = useLocalStorage('signal:savedJobs', [])
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [applyingJob, setApplyingJob] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const searchInputRef = useRef(null)
  const showToast = useToast()

  useEffect(() => {
    let mounted = true
    fetchJobs().then((data) => {
      if (mounted) {
        setAllJobs(data)
        setLoading(false)
      }
    })
    return () => {
      mounted = false
    }
  }, [])

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(true)
        return
      }
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchInputRef.current?.focus()
        return
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false)
        setActiveJobId(null)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filteredJobs = useMemo(() => {
    let list = allJobs

    if (showSavedOnly) {
      list = list.filter((j) => savedIds.includes(j.id))
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((j) =>
        `${j.title} ${j.company} ${j.tags.join(' ')} ${j.roleType}`.toLowerCase().includes(q)
      )
    }

    if (filters.roleType.length) {
      list = list.filter((j) => filters.roleType.includes(j.roleType))
    }
    if (filters.seniority.length) {
      list = list.filter((j) => filters.seniority.includes(j.seniority))
    }
    if (filters.location.length) {
      list = list.filter((j) => filters.location.includes(j.location))
    }
    if (filters.minSalary > 0) {
      list = list.filter((j) => j.salaryMax >= filters.minSalary)
    }

    const sorted = [...list].sort((a, b) => {
      if (sortBy === 'salary') return b.salaryMax - a.salaryMax
      return b.postedAt - a.postedAt
    })

    return sorted
  }, [allJobs, query, filters, sortBy, showSavedOnly, savedIds])

  // Keep keyboard up/down navigation in sync with the filtered list
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (paletteOpen) return
      e.preventDefault()
      const idx = filteredJobs.findIndex((j) => j.id === activeJobId)
      if (e.key === 'ArrowDown') {
        const next = idx === -1 ? 0 : Math.min(idx + 1, filteredJobs.length - 1)
        if (filteredJobs[next]) setActiveJobId(filteredJobs[next].id)
      } else {
        const prev = idx === -1 ? 0 : Math.max(idx - 1, 0)
        if (filteredJobs[prev]) setActiveJobId(filteredJobs[prev].id)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [filteredJobs, activeJobId, paletteOpen])

  const activeJob = useMemo(
    () => allJobs.find((j) => j.id === activeJobId) || null,
    [allJobs, activeJobId]
  )

  // sometimes the toast message is appearing twice when add/remove in saved job functionality with the below code.

  // const toggleSave = (jobId) => {
  //   setSavedIds((prev) => {
  //     const isSaved = prev.includes(jobId)
  //     const next = isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
  //     const job = allJobs.find((j) => j.id === jobId)
  //     showToast(isSaved ? `Removed "${job?.title}" from saved` : `Saved "${job?.title}"`)
  //     return next
  //   })
  // }

  const toggleSave = (jobId) => {
    const isSaved = savedIds.includes(jobId)
    const job = allJobs.find((j) => j.id === jobId)

    setSavedIds((prev) =>
      isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
    showToast(isSaved ? `Removed "${job?.title}" from saved` : `Saved "${job?.title}"`)
  }

  const handleSelectFromPalette = (jobId) => {
    setActiveJobId(jobId)
    setPaletteOpen(false)
  }

  const handleApplySubmit = (job) => {
    setApplyingJob(null)
    showToast(`Application sent to ${job.company} 🎉`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Ticker jobs={allJobs} onSelectJob={setActiveJobId} />
      <Header
        query={query}
        onQueryChange={setQuery}
        savedCount={savedIds.length}
        showSavedOnly={showSavedOnly}
        onToggleSavedOnly={() => setShowSavedOnly((v) => !v)}
        onOpenPalette={() => setPaletteOpen(true)}
        searchInputRef={searchInputRef}
      />

      <main className="max-w-[1400px] w-full mx-auto px-5 md:px-8 py-6 flex-1 flex flex-col">
        <div className="mb-5">
          <h1 className="font-display font-semibold text-2xl md:text-3xl tracking-tight">
            {showSavedOnly ? 'Your saved roles' : 'Open roles'}
          </h1>
          <p className="text-sm text-muted mt-1">
            {showSavedOnly
              ? 'Everything you have bookmarked, stored on this device.'
              : 'Filtered and ranked in real time — no recruiter spam, no dead listings.'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          <FilterRail filters={filters} setFilters={setFilters} resultCount={filteredJobs.length} />

          <div className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
            <JobList
              jobs={filteredJobs}
              loading={loading}
              activeJobId={activeJobId}
              savedIds={savedIds}
              onSelect={setActiveJobId}
              onToggleSave={toggleSave}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showSavedOnly={showSavedOnly}
              onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            />

            <div className="hidden lg:block lg:sticky lg:top-[88px] h-[calc(100vh-120px)]">
              <JobDetail
                job={activeJob}
                isSaved={activeJob ? savedIds.includes(activeJob.id) : false}
                onToggleSave={toggleSave}
                onApply={setApplyingJob}
                onClose={() => setActiveJobId(null)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile detail sheet */}
      
      {activeJob && (
        <div className="lg:hidden fixed inset-0 z-[80] bg-paper animate-slideUp overflow-y-auto">
          <button
            onClick={() => setActiveJobId(null)}
            className="fixed top-4 right-4 z-10 bg-panel border border-line rounded-full p-2 shadow-md"
            aria-label="Close job details"
          >
            <X size={18} />
          </button>
          <div className="p-3">
            <JobDetail
              job={activeJob}
              isSaved={savedIds.includes(activeJob.id)}
              onToggleSave={toggleSave}
              onApply={setApplyingJob}
              onClose={() => setActiveJobId(null)}
            />
          </div>
        </div>
      )}

      {paletteOpen && (
        <CommandPalette
          jobs={allJobs}
          onSelect={handleSelectFromPalette}
          onClose={() => setPaletteOpen(false)}
        />
      )}

      {applyingJob && (
        <ApplyModal job={applyingJob} onClose={() => setApplyingJob(null)} onSubmit={handleApplySubmit} />
      )} 

      <footer className="border-t border-line py-6 mt-4">
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <span>Signal — a demo job board</span>
          <span className="font-mono">Press / to search · ⌘K to jump · ↑↓ to browse</span>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  )
}
