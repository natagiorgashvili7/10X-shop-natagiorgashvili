import type { CartState } from '../types/cart'
import type { OrderData } from '../types/order'
import { isCartState, isOrderDataArray } from '../utils/guards'
import { STORAGE_KEYS } from '../utils/storageKeys'
import { StorageService } from './StorageService'

export const cartStorage = new StorageService<CartState>(STORAGE_KEYS.cart, isCartState)
export const ordersStorage = new StorageService<OrderData[]>(STORAGE_KEYS.orders, isOrderDataArray)