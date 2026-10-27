import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'
import StockBadge from './StockBadge'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate()
  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  const [selectedImage, setSelectedImage] = useState<string>(images[0])
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState('')

  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage >= 1
  const outOfStock = product.stock === 0

  function handleAddToCart() {
    setNotice(`Selected ${quantity} × ${product.title}. The cart is connected on Day 4.`)
  }

  return (
    <section>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        ← Back to catalog
      </button>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            width={600}
            height={600}
            className="h-80 w-full rounded-lg border border-slate-200 bg-white object-contain"
          />
          {images.length > 1 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {images.map((image) => (
                <li key={image}>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-pressed={image === selectedImage}
                    className={`rounded border-2 bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      image === selectedImage ? 'border-indigo-600' : 'border-slate-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      className="h-16 w-16 object-contain"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {product.brand ? `${product.brand} · ` : ''}
            <Link
              to={`/?category=${encodeURIComponent(product.category)}`}
              className="text-indigo-600 hover:underline"
            >
              {product.category}
            </Link>
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-bold text-slate-900">{formatPrice(finalPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-slate-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                  −{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-2 text-slate-600">★ {product.rating.toFixed(1)}</p>
          <div className="mt-1">
            <StockBadge stock={product.stock} />
          </div>

          <p className="mt-4 text-slate-700">{product.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded border border-slate-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => q - 1)}
                disabled={outOfStock || quantity <= 1}
                aria-label="Decrease quantity"
                className="h-11 w-11 text-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <span className="w-10 text-center font-medium" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                disabled={outOfStock || quantity >= product.stock}
                aria-label="Increase quantity"
                className="h-11 w-11 text-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="h-11 rounded bg-indigo-600 px-6 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {outOfStock ? 'Out of stock' : 'Add to cart'}
            </button>
          </div>

          {notice && (
            <p role="status" className="mt-3 text-sm text-green-700">
              {notice}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}