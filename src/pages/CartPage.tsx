import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { lineTotal, unitPrice } from '../utils/cart'
import { formatPrice } from '../utils/format'

const stepperButton =
  'h-10 w-10 text-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40'

export default function CartPage() {
  const { items, itemCount, subtotal, setQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  function handleClear() {
    if (window.confirm('Clear the cart? This cannot be undone.')) {
      clearCart()
    }
  }

  if (items.length === 0) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-3 text-slate-600">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Browse products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.productId}
                className="flex flex-wrap items-center gap-4 rounded-lg border border-slate-200 bg-white p-3"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-20 w-20 object-contain"
                />

                <div className="min-w-0 flex-1">
                  <Link
                    to={`/products/${item.productId}`}
                    className="font-semibold text-slate-900 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-slate-500">{formatPrice(unitPrice(item))} each</p>
                </div>

                <div className="flex items-center rounded border border-slate-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease quantity of ${item.title}`}
                    className={stepperButton}
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-medium" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    aria-label={`Increase quantity of ${item.title}`}
                    className={stepperButton}
                  >
                    +
                  </button>
                </div>

                <p className="w-24 text-right font-semibold">{formatPrice(lineTotal(item))}</p>

                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleClear}
            className="mt-4 rounded border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Clear cart
          </button>
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-lg font-semibold">Summary</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Items</dt>
              <dd>{itemCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </section>
  )
}