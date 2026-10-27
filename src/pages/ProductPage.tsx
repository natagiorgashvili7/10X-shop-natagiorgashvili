import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../api/products.api'
import { isApiError } from '../api/ApiError'
import ProductDetails from '../components/product/ProductDetails'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loading from '../components/ui/Loading'
import NotFoundPage from './NotFoundPage'
import type { AsyncState } from '../types/api'
import type { Product } from '../types/product'
import { getErrorMessage } from '../utils/error'

type ProductState = AsyncState<Product> | { status: 'not-found' }

function parseProductId(id: string | undefined): number | null {
  if (id === undefined || !/^\d+$/.test(id)) return null
  const value = Number(id)
  return value > 0 ? value : null
}

function ProductLoader({ productId }: { productId: number }) {
  const [state, setState] = useState<ProductState>({ status: 'loading' })
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getProduct(productId, controller.signal)
      .then((product) => setState({ status: 'success', data: product }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (isApiError(error) && error.status === 404) {
          setState({ status: 'not-found' })
          return
        }
        setState({ status: 'error', message: getErrorMessage(error) })
      })

    return () => controller.abort()
  }, [productId, retry])

  function handleRetry() {
    setState({ status: 'loading' })
    setRetry((count) => count + 1)
  }

  if (state.status === 'not-found') return <NotFoundPage />
  if (state.status === 'error') {
    return <ErrorMessage message={state.message} onRetry={handleRetry} />
  }
  if (state.status === 'success') return <ProductDetails product={state.data} />
  return <Loading />
}

export default function ProductPage() {
  const { id } = useParams()
  const productId = parseProductId(id)

  if (productId === null) return <NotFoundPage />
  return <ProductLoader key={productId} productId={productId} />
}