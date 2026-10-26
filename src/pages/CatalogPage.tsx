import { useEffect, useState } from 'react'
import { getProducts } from '../api/products.api'
import ProductGrid from '../components/product/ProductGrid'
import Loading from '../components/ui/Loading'
import ErrorMessage from '../components/ui/ErrorMessage'
import type { AsyncState } from '../types/api'
import type { ProductsResponse } from '../types/product'

const PAGE_SIZE = 12

export default function CatalogPage() {
  const [state, setState] = useState<AsyncState<ProductsResponse>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    getProducts({ limit: PAGE_SIZE, skip: 0 }, controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch(() => {
        if (controller.signal.aborted) return
        setState({ status: 'error', message: 'Could not load products. Please try again later.' })
      })

    return () => controller.abort()
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-bold">Catalog</h1>

      {state.status === 'loading' && <Loading />}

      {state.status === 'error' && (
        <div className="mt-4">
          <ErrorMessage message={state.message} />
        </div>
      )}

      {state.status === 'success' &&
        (state.data.products.length === 0 ? (
          <p className="mt-4 text-slate-600">No products found.</p>
        ) : (
          <>
            <p className="mt-1 text-sm text-slate-500">
              Showing {state.data.products.length} of {state.data.total} products
            </p>
            <div className="mt-4">
              <ProductGrid products={state.data.products} />
            </div>
          </>
        ))}
    </section>
  )
}