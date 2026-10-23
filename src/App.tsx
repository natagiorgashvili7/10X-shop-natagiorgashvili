import type { Product } from './types/product'

const sampleProduct: Product = {
  id: 1,
  title: 'Sample Product',
  description: 'Temporary placeholder used to verify the setup.',
  category: 'beauty',
  brand: '10X',
  price: 9.99,
  discountPercentage: 7.17,
  rating: 4.9,
  stock: 5,
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
  images: [],
}

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <h1 className="mb-4 text-2xl font-bold text-slate-900">10X Shop</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="font-semibold">{sampleProduct.title}</h2>
          <p className="text-sm text-slate-600">${sampleProduct.price}</p>
          <button
            type="button"
            className="mt-3 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
          >
            Add to cart
          </button>
        </article>
      </div>
    </main>
  )
}