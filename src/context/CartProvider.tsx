import { useState } from 'react'
import type { ReactNode } from 'react'
import { CartContext } from './cart-context'
import type { CartContextValue } from './cart-context'
import type { AddToCartResult, CartItem } from '../types/cart'
import type { Product } from '../types/product'
import { cartItemCount, cartSubtotal } from '../utils/cart'

interface CartProviderProps {
  children: ReactNode
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product, quantity: number): AddToCartResult {
    if (product.stock === 0) {
      return { ok: false, message: 'This product is out of stock.' }
    }

    const existing = items.find((item) => item.productId === product.id)
    const inCart = existing?.quantity ?? 0

    if (inCart + quantity > product.stock) {
      return {
        ok: false,
        message: `Only ${product.stock} in stock. You already have ${inCart} in your cart.`,
      }
    }

    if (existing) {
      setItems(
        items.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setItems([
        ...items,
        {
          productId: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          discountPercentage: product.discountPercentage,
          stock: product.stock,
          quantity,
        },
      ])
    }

    return { ok: true, message: `Added ${quantity} × ${product.title} to the cart.` }
  }

  function setQuantity(productId: number, quantity: number) {
    setItems((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(Math.max(1, quantity), item.stock) }
          : item,
      ),
    )
  }

  function removeItem(productId: number) {
    setItems((current) => current.filter((item) => item.productId !== productId))
  }

  function clearCart() {
    setItems([])
  }

  const value: CartContextValue = {
    items,
    itemCount: cartItemCount(items),
    subtotal: cartSubtotal(items),
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}