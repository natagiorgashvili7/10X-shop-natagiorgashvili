export interface CartItem {
  productId: number
  title: string
  thumbnail: string
  price: number
  discountPercentage: number
  stock: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export interface AddToCartResult {
  ok: boolean
  message: string
}