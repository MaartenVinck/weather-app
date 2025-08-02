export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":")
  const date = new Date()
  date.setHours(Number.parseInt(hours), Number.parseInt(minutes))
  return date.toLocaleTimeString("en-ZA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function getRelativeDay(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Today"
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-ZA", { weekday: "long" })
  }
}

export function getDaysAgo(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = today.getTime() - date.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getDaysFromNow(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
