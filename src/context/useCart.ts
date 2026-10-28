import { useContext } from 'react'
import { CartContext } from './cart-context'
import type { CartContextValue } from './cart-context'

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used inside <CartProvider>')
  }
  return context
}