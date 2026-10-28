import type { Review } from '../types/product'

const KEY = 'shop_reviews'

// JSON from localStorage has no type, so every review is checked before it is trusted.
function isReview(value: unknown): value is Review {
  return (
    typeof value === 'object' &&
    value !== null &&
    'rating' in value &&
    typeof value.rating === 'number' &&
    'comment' in value &&
    typeof value.comment === 'string' &&
    'date' in value &&
    typeof value.date === 'string' &&
    'reviewerName' in value &&
    typeof value.reviewerName === 'string'
  )
}

function readAll(): Record<string, Review[]> {
  try {
    const raw = localStorage.getItem(KEY)
    const data: unknown = raw ? JSON.parse(raw) : {}
    if (typeof data !== 'object' || data === null) return {}
    const result: Record<string, Review[]> = {}
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) result[key] = value.filter(isReview)
    }
    return result
  } catch {
    return {}
  }
}

export function loadReviews(productId: number): Review[] {
  return readAll()[String(productId)] ?? []
}

export function addReview(productId: number, review: Review): Review[] {
  const all = readAll()
  const next = [review, ...(all[String(productId)] ?? [])]
  all[String(productId)] = next
  try {
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    // Storage may be blocked; the review still shows for this visit.
  }
  return next
}