import React, { useState } from 'react'
import { X } from 'lucide-react'

export default function ApplyModal({ job, onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [link, setLink] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!job) return null

  const validate = () => {
    const next = {}
    if (!name.trim()) next.name = 'Enter your name'
    if (!email.trim()) next.email = 'Enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      onSubmit(job)
    }, 700)
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-panel rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between p-5 border-b border-line">
          <div>
            <h2 id="apply-modal-title" className="font-display font-semibold text-lg">
              Apply — {job.title}
            </h2>
            <p className="text-sm text-muted mt-0.5">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close application form"
            className="p-1.5 -mr-1.5 -mt-1 text-muted hover:text-ink transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
          <div>
            <label htmlFor="apply-name" className="block text-xs font-medium text-ink/80 mb-1.5">
              Full name
            </label>
            <input
              id="apply-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className={`w-full border rounded-lg px-3 py-2 text-sm transition-colors ${
                errors.name ? 'border-red-400' : 'border-line focus:border-signal'
              }`}
              placeholder="Ada Lovelace"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="apply-email" className="block text-xs font-medium text-ink/80 mb-1.5">
              Email
            </label>
            <input
              id="apply-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={`w-full border rounded-lg px-3 py-2 text-sm transition-colors ${
                errors.email ? 'border-red-400' : 'border-line focus:border-signal'
              }`}
              placeholder="ada@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="apply-link" className="block text-xs font-medium text-ink/80 mb-1.5">
              Portfolio / LinkedIn / GitHub <span className="text-muted font-normal">(optional)</span>
            </label>
            <input
              id="apply-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              type="text"
              className="w-full border border-line focus:border-signal rounded-lg px-3 py-2 text-sm transition-colors"
              placeholder="https://"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-signal hover:bg-signalDark disabled:opacity-60 text-white font-medium text-sm py-2.5 rounded-lg transition-colors"
          >
            {submitting ? 'Submitting…' : 'Submit application'}
          </button>
          <p className="text-[11px] text-muted text-center">
            This is a demo form — no data is sent anywhere.
          </p>
        </form>
      </div>
    </div>
  )
}
