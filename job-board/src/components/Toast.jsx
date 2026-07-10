import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const showToast = useCallback((message) => {
    const id = ++counter.current
    setToasts((prev) => [...prev, { id, message }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 items-end"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-slideUp flex items-center gap-2 bg-ink text-white text-sm pl-3 pr-2 py-2.5 rounded-lg shadow-lg max-w-sm"
          >
            <CheckCircle2 size={16} className="text-mint shrink-0" />
            <span className="font-body">{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="ml-1 text-white/50 hover:text-white/90 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
