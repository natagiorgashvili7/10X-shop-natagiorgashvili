import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Go to catalog
      </Link>
    </section>
  )
}