import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useCart } from '../../context/useCart'

const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `rounded px-3 py-2 text-sm font-medium hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
    isActive ? 'text-indigo-600' : 'text-slate-700'
  }`

export default function Header() {
  const { user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link
          to="/"
          className="rounded text-xl font-bold text-brand focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          10X Shop
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            Catalog
          </NavLink>
          <NavLink to="/cart" className={navLinkClass}>
            Cart
            {itemCount > 0 && (
              <span
                aria-label={`${itemCount} items in cart`}
                className="ml-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white"
              >
                {itemCount}
              </span>
            )}
          </NavLink>

          {user.isLoggedIn ? (
            <>
              <NavLink to="/orders" className={navLinkClass}>
                Orders
              </NavLink>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <span className="px-2 text-sm text-slate-500">Hi, {user.username}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Log out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}