import type { CartItem } from '../types/cart'
import { cartItemCount, cartSubtotal } from '../utils/cart'

export interface ICart {
  readonly itemCount: number
  subtotal(): number
  discount(): number
  total(): number
}

function round2(value: number): number {
  return Math.round(value * 100) / 100
}

export class Cart implements ICart {
  static readonly PROMO_CODE = '10X10'
  static readonly PROMO_RATE = 0.1

  private readonly items: CartItem[]
  private readonly promoCode: string | null

  constructor(items: CartItem[], promoCode: string | null) {
    this.items = items
    this.promoCode = promoCode
  }

  static isValidPromo(code: string): boolean {
    return code.trim().toUpperCase() === Cart.PROMO_CODE
  }

  get itemCount(): number {
    return cartItemCount(this.items)
  }

  getItems(): CartItem[] {
    return [...this.items]
  }

  subtotal(): number {
    return cartSubtotal(this.items)
  }

  discount(): number {
    return this.promoCode === null ? 0 : round2(this.subtotal() * Cart.PROMO_RATE)
  }

  total(): number {
    return round2(this.subtotal() - this.discount())
  }
}