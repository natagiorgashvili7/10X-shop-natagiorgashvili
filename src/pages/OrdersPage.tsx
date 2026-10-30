import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ordersStorage } from '../models/storage'
import type { OrderData, OrderStatus } from '../types/order'
import { lineTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'
import NotFoundPage from './NotFoundPage'

const STATUS_CLASS: Record<OrderStatus, string> = {
  Processing: 'bg-slate-200 text-slate-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
}

// Status is never stored: it is computed from the time passed since the order was placed.
function statusOf(data: OrderData, now: Date): OrderStatus {
  const elapsed = now.getTime() - new Date(data.placedAt).getTime()
  if (elapsed < 60_000) return 'Processing'
  if (elapsed <= 180_000) return 'Shipped'
  return 'Delivered'
}

export default function OrdersPage() {
  const { id } = useParams()
  const [now, setNow] = useState(() => new Date())
  const orders = ordersStorage.get() ?? []

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(interval)
  }, [])

  if (id !== undefined) {
    const order = orders.find((entry) => String(entry.id) === id)
    if (!order) return <NotFoundPage />
    const status = statusOf(order, now)
    return (
      <section>
        <Link to="/orders" className="text-sm text-indigo-600 hover:underline">
          ← All orders
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Order #{order.number}</h1>
        <p className="text-sm text-slate-500">{new Date(order.placedAt).toLocaleDateString()}</p>
        <span className={`mt-2 inline-block rounded px-2 py-0.5 text-sm font-medium ${STATUS_CLASS[status]}`}>
          {status}
        </span>
        <ul className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {order.items.map((item) => (
            <li key={item.productId} className="flex justify-between p-3 text-sm">
              <span>
                {item.quantity} × {item.title}
              </span>
              <span>{formatPrice(lineTotal(item))}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-slate-600">
          Ship to: {order.shipping.fullName}, {order.shipping.address}, {order.shipping.city}
        </p>
        <p className="mt-2 text-lg font-bold">Total {formatPrice(order.total)}</p>
      </section>
    )
  }

  if (orders.length === 0) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="mt-3 text-slate-600">You have no orders yet.</p>
        <Link to="/" className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Orders</h1>
      <ul className="mt-4 space-y-3">
        {orders.map((order) => {
          const status = statusOf(order, now)
          return (
            <li key={order.id}>
              <Link
                to={`/orders/${order.id}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span className="font-semibold">#{order.number}</span>
                <span className="text-sm text-slate-500">
                  {new Date(order.placedAt).toLocaleDateString()} · {order.items.length} items
                </span>
                <span className="font-bold">{formatPrice(order.total)}</span>
                <span className={`rounded px-2 py-0.5 text-sm font-medium ${STATUS_CLASS[status]}`}>
                  {status}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}