import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../context/useAuth'
import type { Review } from '../../types/product'
import { addReview, loadReviews } from '../../utils/reviewStorage'

interface ReviewsSectionProps {
  productId: number
  apiReviews: Review[]
}

interface ReviewErrors {
  rating?: string
  comment?: string
}

export default function ReviewsSection({ productId, apiReviews }: ReviewsSectionProps) {
  const { user } = useAuth()
  const [localReviews, setLocalReviews] = useState<Review[]>(() => loadReviews(productId))
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<ReviewErrors>({})
  const [notice, setNotice] = useState('')

  const reviews = useMemo(() => [...localReviews, ...apiReviews], [localReviews, apiReviews])
  const average = useMemo(
    () =>
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
    [reviews],
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: ReviewErrors = {}
    if (rating < 1 || rating > 5) nextErrors.rating = 'Please select a rating'
    if (comment.trim().length < 10) nextErrors.comment = 'Comment must be at least 10 characters'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const review: Review = {
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      reviewerName: user.isLoggedIn ? user.username : 'Guest',
    }
    setLocalReviews(addReview(productId, review))
    setRating(0)
    setComment('')
    setNotice('Review added ✓')
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold">
        Reviews ({reviews.length})
        {reviews.length > 0 && (
          <span className="ml-2 text-base font-normal text-slate-600">
            ★ {average.toFixed(1)} average
          </span>
        )}
      </h2>

      <form onSubmit={handleSubmit} noValidate className="mt-4 max-w-xl space-y-3">
        <div>
          <label htmlFor="review-rating" className="block text-sm font-medium">
            Rating
          </label>
          <select
            id="review-rating"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="mt-1 w-full rounded border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value={0}>Select a rating</option>
            {[5, 4, 3, 2, 1].map((value) => (
              <option key={value} value={value}>
                {'★'.repeat(value)} ({value})
              </option>
            ))}
          </select>
          {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
        </div>

        <div>
          <label htmlFor="review-comment" className="block text-sm font-medium">
            Comment
          </label>
          <textarea
            id="review-comment"
            rows={3}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
        </div>

        <button
          type="submit"
          className="rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Write a review
        </button>
        {notice && (
          <p role="status" className="text-sm text-green-700">
            {notice}
          </p>
        )}
      </form>

      {reviews.length === 0 ? (
        <p className="mt-6 text-slate-600">No reviews yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((review, index) => (
            <li
              key={`${review.date}-${review.reviewerName}-${index}`}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <p className="font-semibold">
                {review.reviewerName}{' '}
                <span className="font-normal text-amber-600">{'★'.repeat(review.rating)}</span>
              </p>
              <p className="text-xs text-slate-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-slate-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}