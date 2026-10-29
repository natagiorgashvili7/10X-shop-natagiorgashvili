import { createContext } from 'react'
import type { AddToCartResult, CartItem } from '../types/cart'
import type { Product } from '../types/product'

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  discount: number
  total: number
  promoCode: string | null
  addItem: (product: Product, quantity: number) => AddToCartResult
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
  applyPromo: (code: string) => AddToCartResult
  removePromo: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)