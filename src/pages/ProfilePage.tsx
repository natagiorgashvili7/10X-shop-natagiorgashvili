import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'
import { ordersStorage } from '../models/storage'

export default function ProfilePage() {
  const { user, login, logout } = useAuth()
  const { clearCart } = useCart()
  const [name, setName] = useState(user.username)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const orderCount = (ordersStorage.get() ?? []).length

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }
    setError('')
    login(name.trim())
    setNotice('Profile updated ✓')
  }

  function handleClearData() {
    if (window.confirm('Clear cart and orders?')) {
      clearCart()
      ordersStorage.remove()
      setNotice('Local data cleared')
    }
  }

  return (
    <section className="max-w-md">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p className="mt-1 text-sm text-slate-500">Orders placed: {orderCount}</p>

      <form onSubmit={handleSave} noValidate className="mt-4 space-y-3">
        <label htmlFor="name" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
          Save changes
        </button>
      </form>

      {notice && <p role="status" className="mt-3 text-sm text-green-700">{notice}</p>}

      <div className="mt-6 flex gap-3">
        <button type="button" onClick={handleClearData} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100">
          Clear local data
        </button>
        <button type="button" onClick={logout} className="rounded border border-slate-300 bg-white px-4 py-2 text-sm hover:bg-slate-100">
          Log out
        </button>
      </div>
    </section>
  )
}