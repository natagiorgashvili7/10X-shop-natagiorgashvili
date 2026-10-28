import { ApiClient } from './ApiClient'
import type { CatalogParams, Category, Product, ProductsResponse } from '../types/product'
import { buildProductsUrl } from '../utils/url'

const client = new ApiClient('https://dummyjson.com')

export function getProducts(
  params: CatalogParams,
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  return client.get<ProductsResponse>(buildProductsUrl(params), signal)
}

export function getProduct(id: number, signal?: AbortSignal): Promise<Product> {
  return client.get<Product>(`/products/${id}`, signal)
}

export function getCategories(signal?: AbortSignal): Promise<Category[]> {
  return client.get<Category[]>('/products/categories', signal)
}