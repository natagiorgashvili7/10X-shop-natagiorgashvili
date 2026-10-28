interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

function getPageItems(page: number, totalPages: number): (number | '…')[] {
  const wanted = new Set<number>([1, totalPages, page - 1, page, page + 1])
  const pages = [...wanted].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const items: (number | '…')[] = []
  pages.forEach((p, index) => {
    if (index > 0 && p - pages[index - 1] > 1) items.push('…')
    items.push(p)
  })
  return items
}

const buttonClass =
  'h-10 min-w-10 rounded border border-slate-300 bg-white px-3 text-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40'

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={buttonClass}
      >
        ‹
      </button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === '…' ? (
          <span key={`gap-${index}`} className="px-1 text-slate-500">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={`${buttonClass} ${
              item === page ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-600' : ''
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={buttonClass}
      >
        ›
      </button>
    </nav>
  )
}