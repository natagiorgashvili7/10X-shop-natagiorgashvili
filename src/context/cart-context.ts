import { createContext } from 'react'
import type { Cart } from '../models/Cart'
import type { AddToCartResult, CartItem } from '../types/cart'
import type { Product } from '../types/product'

export interface CartContextValue {
  cart: Cart
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