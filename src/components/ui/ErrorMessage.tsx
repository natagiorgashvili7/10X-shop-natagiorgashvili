interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded border border-red-200 bg-red-50 p-4 text-red-700"
    >
      <span>{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded border border-red-300 bg-white px-3 py-1 text-sm font-medium hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Retry
        </button>
      )}
    </div>
  )
}