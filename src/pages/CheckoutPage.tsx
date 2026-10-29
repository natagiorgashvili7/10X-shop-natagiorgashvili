import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import type { CheckoutFormErrors, CheckoutFormValues, PlacedOrder } from '../types/order'
import { lineTotal } from '../utils/cart'
import { formatPrice } from '../utils/format'
import { validateCheckout } from '../utils/validation'

interface FieldConfig {
  name: keyof CheckoutFormValues
  label: string
  type: string
  autoComplete: string
}

const FIELDS: FieldConfig[] = [
  { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'address', label: 'Address', type: 'text', autoComplete: 'street-address' },
  { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2' },
]

const inputClass = (hasError: boolean): string =>
  `mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
    hasError ? 'border-red-500 focus:ring-red-300' : 'border-slate-300 focus:ring-indigo-400'
  }`

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, total, clearCart } = useCart()

  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: user.username,
    email: '',
    address: '',
    city: '',
  })
  const [errors, setErrors] = useState<CheckoutFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [placed, setPlaced] = useState<PlacedOrder | null>(null)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const timers = timer
    return () => window.clearTimeout(timers.current)
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    const nextErrors = validateCheckout(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    // Local simulation: nothing is sent to a server.
    timer.current = window.setTimeout(() => {
      setPlaced({ items, total, shipping: values })
      clearCart()
      setSubmitting(false)
    }, 600)
  }

  if (placed !== null) {
    return (
      <section className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-green-700">Thank you! Your order has been placed.</h1>
        <p className="mt-2 text-slate-600">
          Confirmation for {placed.shipping.fullName} ({placed.shipping.email}). Shipping to{' '}
          {placed.shipping.address}, {placed.shipping.city}.
        </p>

        <ul className="mt-4 divide-y divide-slate-200 text-sm">
          {placed.items.map((item) => (
            <li key={item.productId} className="flex justify-between py-2">
              <span>
                {item.quantity} × {item.title}
              </span>
              <span>{formatPrice(lineTotal(item))}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(placed.total)}</span>
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Back to catalog
        </Link>
      </section>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Checkout</h1>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 lg:col-span-2"
        >
          {FIELDS.map((field) => {
            const error = errors[field.name]
            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={error !== undefined}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  className={inputClass(error !== undefined)}
                />
                {error && (
                  <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>
            )
          })}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? 'Placing order...' : 'Place order'}
          </button>
        </form>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-3 divide-y divide-slate-200 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between py-2">
                <span>
                  {item.quantity} × {item.title}
                </span>
                <span>{formatPrice(lineTotal(item))}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-base font-bold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </p>
        </aside>
      </div>
    </section>
  )
}