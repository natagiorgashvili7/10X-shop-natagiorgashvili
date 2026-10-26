import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import { discountedPrice, formatPrice } from '../../utils/format'

interface ProductCardProps {
  product: Product
  onAdd?: (product: Product) => void
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="text-xs font-medium text-red-600">Out of stock</span>
  }
  if (stock <= 5) {
    return <span className="text-xs font-medium text-orange-600">Only {stock} left!</span>
  }
  return <span className="text-xs font-medium text-green-600">In stock</span>
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const finalPrice = discountedPrice(product.price, product.discountPercentage)
  const hasDiscount = product.discountPercentage >= 1

  return (
    <article className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Link
        to={`/products/${product.id}`}
        className="rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          loading="lazy"
          className="h-48 w-full object-contain"
        />
        <h2 className="mt-3 font-semibold text-slate-900">{product.title}</h2>
      </Link>

      <p className="mt-1 text-xs text-slate-500">
        {product.category}
        {product.brand ? ` · ${product.brand}` : ''}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-lg font-bold text-slate-900">{formatPrice(finalPrice)}</span>
        {hasDiscount && (
          <>
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.price)}
            </span>
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
              −{Math.round(product.discountPercentage)}%
            </span>
          </>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between text-sm">
        <span className="text-slate-600">★ {product.rating.toFixed(1)}</span>
        <StockBadge stock={product.stock} />
      </div>

      {onAdd && (
        <button
          type="button"
          onClick={() => onAdd(product)}
          disabled={product.stock === 0}
          className="mt-3 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
        </button>
      )}
    </article>
  )
}