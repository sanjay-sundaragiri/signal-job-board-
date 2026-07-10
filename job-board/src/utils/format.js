export function timeAgo(timestamp) {

  const diffMs = Date.now() - timestamp
  
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`

  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function salaryRange(min, max) {
  return `$${min}k–$${max}k`
}
