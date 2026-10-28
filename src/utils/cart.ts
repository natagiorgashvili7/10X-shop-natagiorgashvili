import type { CartItem } from '../types/cart'
import { discountedPrice } from './format'

export function unitPrice(item: CartItem): number {
  return discountedPrice(item.price, item.discountPercentage)
}

export function lineTotal(item: CartItem): number {
  return Math.round(unitPrice(item) * item.quantity * 100) / 100
}

export function cartSubtotal(items: CartItem[]): number {
  return Math.round(items.reduce((sum, item) => sum + lineTotal(item), 0) * 100) / 100
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0)
}