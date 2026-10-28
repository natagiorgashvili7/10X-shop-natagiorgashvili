interface ProductGridSkeletonProps {
  count?: number
}

export default function ProductGridSkeleton({ count = 12 }: ProductGridSkeletonProps) {
  return (
    <div role="status" aria-busy="true" className="mt-4">
      <span className="sr-only">Loading products...</span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg border border-slate-200 bg-white p-4"
          >
            <div className="h-48 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-3/4 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-4 h-6 w-1/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  )
}