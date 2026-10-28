export interface Product {
  id: number
  title: string
  description: string
  category: string
  brand?: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Category {
  slug: string
  name: string
  url: string
}

export type SortOption = '' | 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc'

export interface CatalogParams {
  limit: number
  skip: number
  q?: string
  category?: string
  sort?: SortOption
}