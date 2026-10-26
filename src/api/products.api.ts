import type { ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com'

export interface ProductsParams {
  limit: number
  skip: number
}

export async function getProducts(
  { limit, skip }: ProductsParams,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, { signal })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  const data: unknown = await response.json()
  return data as ProductsResponse
}