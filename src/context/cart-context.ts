import { createContext } from 'react'
import type { AddToCartResult, CartItem } from '../types/cart'
import type { Product } from '../types/product'

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  total: number
  addItem: (product: Product, quantity: number) => AddToCartResult
  setQuantity: (productId: number, quantity: number) => void
  removeItem: (productId: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)