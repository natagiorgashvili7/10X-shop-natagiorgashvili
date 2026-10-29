import type { CartItem, CartState } from '../types/cart'
import type { OrderData, ShippingInfo } from '../types/order'

// JSON from localStorage has no type, so every shape is verified instead of cast with "as".
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.productId === 'number' &&
    typeof value.title === 'string' &&
    typeof value.thumbnail === 'string' &&
    typeof value.price === 'number' &&
    typeof value.discountPercentage === 'number' &&
    typeof value.stock === 'number' &&
    typeof value.quantity === 'number'
  )
}

export function isCartState(value: unknown): value is CartState {
  return (
    isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    (value.promoCode === null || typeof value.promoCode === 'string')
  )
}

function isShippingInfo(value: unknown): value is ShippingInfo {
  return (
    isRecord(value) &&
    typeof value.fullName === 'string' &&
    typeof value.email === 'string' &&
    typeof value.address === 'string' &&
    typeof value.city === 'string'
  )
}

function isOrderData(value: unknown): value is OrderData {
  return (
    isRecord(value) &&
    typeof value.id === 'number' &&
    typeof value.number === 'string' &&
    Array.isArray(value.items) &&
    value.items.every(isCartItem) &&
    isShippingInfo(value.shipping) &&
    typeof value.subtotal === 'number' &&
    typeof value.discount === 'number' &&
    typeof value.total === 'number' &&
    typeof value.placedAt === 'string'
  )
}

export function isOrderDataArray(value: unknown): value is OrderData[] {
  return Array.isArray(value) && value.every(isOrderData)
}