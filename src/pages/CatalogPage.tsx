import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCategories, getProducts } from '../api/products.api'
import ProductGrid from '../components/product/ProductGrid'
import ErrorMessage from '../components/ui/ErrorMessage'
import Pagination from '../components/ui/Pagination'
import ProductGridSkeleton from '../components/ui/ProductGridSkeleton'
import type { AsyncState } from '../types/api'
import type { Category, ProductsResponse } from '../types/product'
import { getErrorMessage } from '../utils/error'
import { SORT_OPTIONS, parseSort } from '../utils/url'

const PAGE_SIZE = 12
const DEBOUNCE_MS = 400

interface CatalogResult {
  key: string
  state: AsyncState<ProductsResponse>
}

const controlClass =
  'w-full rounded border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400'

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // The URL is the single source of truth for filters.
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''
  const sort = parseSort(searchParams.get('sort'))
  const page = Math.max(1, Math.floor(Number(searchParams.get('page'))) || 1)

  const [searchText, setSearchText] = useState(q)
  const [categories, setCategories] = useState<Category[]>([])
  const [result, setResult] = useState<CatalogResult | null>(null)
  const [retry, setRetry] = useState(0)
  const debounceTimer = useRef<number | undefined>(undefined)

  const requestKey = [q, category, sort, page, retry].join('|')

  useEffect(() => {
    const controller = new AbortController()
    getCategories(controller.signal)
      .then(setCategories)
      .catch(() => {
        // The category filter simply stays with "All categories".
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const timers = debounceTimer
    return () => window.clearTimeout(timers.current)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    getProducts({ limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE, q, category, sort }, controller.signal)
      .then((data) => setResult({ key: requestKey, state: { status: 'success', data } }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setResult({ key: requestKey, state: { status: 'error', message: getErrorMessage(error) } })
      })

    return () => controller.abort()
  }, [requestKey, q, category, sort, page])

  // Loading is derived: a stored result only counts if it belongs to the current request.
  const state: AsyncState<ProductsResponse> =
    result !== null && result.key === requestKey ? result.state : { status: 'loading' }

  function updateParams(changes: Record<string, string>) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous)
      for (const [key, value] of Object.entries(changes)) {
        if (value === '') next.delete(key)
        else next.set(key, value)
      }
      return next
    })
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setSearchText(value)
    window.clearTimeout(debounceTimer.current)
    debounceTimer.current = window.setTimeout(() => {
      updateParams({ q: value.trim(), category: '', page: '' })
    }, DEBOUNCE_MS)
  }

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
    window.clearTimeout(debounceTimer.current)
    setSearchText('')
    updateParams({ category: event.target.value, q: '', page: '' })
  }

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    updateParams({ sort: event.target.value, page: '' })
  }

  function handlePageChange(nextPage: number) {
    updateParams({ page: nextPage === 1 ? '' : String(nextPage) })
    window.scrollTo(0, 0)
  }

  function clearFilters() {
    window.clearTimeout(debounceTimer.current)
    setSearchText('')
    setSearchParams({})
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Catalog</h1>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="search" className="block text-sm font-medium">
            Search
          </label>
          <input
            id="search"
            type="search"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className={controlClass}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select id="category" value={category} onChange={handleCategoryChange} className={controlClass}>
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium">
            Sort by
          </label>
          <select id="sort" value={sort} onChange={handleSortChange} className={controlClass}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {state.status === 'loading' && <ProductGridSkeleton count={PAGE_SIZE} />}

      {state.status === 'error' && (
        <div className="mt-4">
          <ErrorMessage message={state.message} onRetry={() => setRetry((count) => count + 1)} />
        </div>
      )}

      {state.status === 'success' &&
        (state.data.products.length === 0 ? (
          <div className="mt-6">
            <p className="text-slate-600">No products found.</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-3 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-slate-500">
              Showing {state.data.skip + 1}–{state.data.skip + state.data.products.length} of{' '}
              {state.data.total}
            </p>
            <div className="mt-3">
              <ProductGrid products={state.data.products} />
            </div>
            {state.data.total > PAGE_SIZE && (
              <Pagination
                page={page}
                totalPages={Math.ceil(state.data.total / PAGE_SIZE)}
                onChange={handlePageChange}
              />
            )}
          </>
        ))}
    </section>
  )
}