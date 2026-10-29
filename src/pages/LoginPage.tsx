import { useFormik } from 'formik'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import type { LoginFormValues } from '../types/user'
import { loginSchema } from '../utils/loginSchema'

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
    hasError ? 'border-red-500 focus:ring-red-300' : 'border-slate-300 focus:ring-indigo-400'
  }`

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const formik = useFormik<LoginFormValues>({
    initialValues: { username: '', password: '' },
    validationSchema: loginSchema,
    validateOnBlur: false,
    onSubmit: (values) => {
      login(values.username.trim())
      navigate(getRedirectPath(location.state), { replace: true })
    },
  })

  const usernameError = formik.submitCount > 0 ? formik.errors.username : undefined
  const passwordError = formik.submitCount > 0 ? formik.errors.password : undefined

  return (
    <section className="mx-auto max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Log in</h1>

      <form onSubmit={formik.handleSubmit} noValidate className="mt-4 space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            aria-invalid={usernameError !== undefined}
            className={inputClass(usernameError !== undefined)}
          />
          {usernameError && <p className="mt-1 text-sm text-red-600">{usernameError}</p>}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            aria-invalid={passwordError !== undefined}
            className={inputClass(passwordError !== undefined)}
          />
          {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
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