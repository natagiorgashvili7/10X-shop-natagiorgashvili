import { useState } from 'react'
import { useCart } from '../../context/useCart'
import type { AddToCartResult } from '../../types/cart'
import type { Product } from '../../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart()
  const [notice, setNotice] = useState<AddToCartResult | null>(null)

  function handleAdd(product: Product) {
    setNotice(addItem(product, 1))
  }

  return (
    <div>
      {notice && (
        <p
          role="status"
          className={`mb-3 text-sm ${notice.ok ? 'text-green-700' : 'text-red-600'}`}
        >
          {notice.message}
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  )
}