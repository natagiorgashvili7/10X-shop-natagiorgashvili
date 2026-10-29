import type { CartItem } from './cart'

export interface CheckoutFormValues {
  fullName: string
  email: string
  address: string
  city: string
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>

export type ShippingInfo = CheckoutFormValues

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered'

export interface OrderData {
  id: number
  number: string
  items: CartItem[]
  shipping: ShippingInfo
  subtotal: number
  discount: number
  total: number
  placedAt: string
}