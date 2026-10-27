import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { validateLogin } from '../utils/validation'
import type { LoginFormErrors, LoginFormValues } from '../types/user'

const initialValues: LoginFormValues = { username: '', password: '' }

// Where to go after login: the page that sent us here (e.g. /checkout), otherwise the catalog.
function getRedirectPath(state: unknown): string {
  if (
    typeof state === 'object' &&
    state !== null &&
    'from' in state &&
    typeof state.from === 'string'
  ) {
    return state.from
  }
  return '/'
}

const inputClass = (hasError: boolean): string =>
  `mt-1 w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-500 focus:ring-red-300'
      : 'border-slate-300 focus:ring-indigo-400'
  }`

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState<LoginFormValues>(initialValues)
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    login(values.username.trim())
    navigate(getRedirectPath(location.state), { replace: true })
  }

  return (
    <section className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Log in</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={values.username}
            onChange={handleChange}
            aria-invalid={errors.username !== undefined}
            aria-describedby={errors.username ? 'username-error' : undefined}
            className={inputClass(errors.username !== undefined)}
          />
          {errors.username && (
            <p id="username-error" className="mt-1 text-sm text-red-600">
              {errors.username}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            aria-invalid={errors.password !== undefined}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={inputClass(errors.password !== undefined)}
          />
          {errors.password && (
            <p id="password-error" className="mt-1 text-sm text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
        >
          Log In
        </button>
      </form>

      <Link
        to="/"
        className="mt-4 inline-block text-sm text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        ← Back to catalog
      </Link>
    </section>
  )
}