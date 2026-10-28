import type { CatalogParams, SortOption } from '../types/product'

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating-desc', label: 'Rating: high to low' },
  { value: 'title-asc', label: 'Name A→Z' },
]

const SORT_PARAMS: Record<Exclude<SortOption, ''>, { sortBy: string; order: 'asc' | 'desc' }> = {
  'price-asc': { sortBy: 'price', order: 'asc' },
  'price-desc': { sortBy: 'price', order: 'desc' },
  'rating-desc': { sortBy: 'rating', order: 'desc' },
  'title-asc': { sortBy: 'title', order: 'asc' },
}

export function parseSort(value: string | null): SortOption {
  return SORT_OPTIONS.find((option) => option.value === value)?.value ?? ''
}

export function buildProductsUrl({ limit, skip, q, category, sort }: CatalogParams): string {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) })

  if (sort !== undefined && sort !== '') {
    const { sortBy, order } = SORT_PARAMS[sort]
    params.set('sortBy', sortBy)
    params.set('order', order)
  }

  let path = '/products'
  if (q) {
    path = '/products/search'
    params.set('q', q)
  } else if (category) {
    path = `/products/category/${encodeURIComponent(category)}`
  }

  return `${path}?${params.toString()}`
}