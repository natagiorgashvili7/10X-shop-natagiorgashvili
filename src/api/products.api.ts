import { ApiClient } from './ApiClient'
import type { Product, ProductsResponse } from '../types/product'

const client = new ApiClient('https://dummyjson.com')

export interface ProductsParams {
  limit: number
  skip: number
}

export function getProducts(
  { limit, skip }: ProductsParams,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  return client.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`, signal)
}
export function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  return client.get<Product>(`/products/${id}`, signal)
}