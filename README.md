# 10X Shop

An e-commerce single-page application built as the 10X Front-end graduation project. Customers can browse a product catalog, view product details, fill a cart, log in and place an order. All data comes from the public [DummyJSON](https://dummyjson.com) API; login and checkout are local simulations (no real authentication or payment).

**Live demo:** https://10-x-shop-natagiorgashvili.vercel.app/

## Features

### CORE
- Login with a controlled form and an `AuthContext` (any non-empty username and a password of at least 6 characters)
- Catalog loaded from `GET /products` with loading, error and empty states
- Product cards and responsive grid (`map()` with stable `key`)
- Product details page (`/products/:id`): gallery, price with discount, stock status, quantity stepper, Add to cart, 404 for unknown ids
- Cart: add, change quantity (limited by stock), remove, clear, subtotal and total, header badge
- Checkout: controlled form (full name, email, address, city), validation, local order confirmation, cart is cleared
- Guests are redirected from `/checkout` to `/login` and returned to Checkout after logging in
- Responsive layout, hover/focus/disabled states, 404 page, Error Boundary

### FULL
- Search (400 ms debounce), category filter, sorting and pagination; all state lives in the URL
- Reviews with validation and localStorage, average rating, related products
- Promo code `10X10` (10% off), persisted in the cart
- Formik + Yup login form
- Orders list and details with a time-based status (Processing → Shipped → Delivered), Profile page
- Generic `ApiClient`, `ApiError`, `StorageService<T>`, `Cart` and `Order` classes, type guards
- Route-level code splitting (`React.lazy` + `Suspense`)
- Tailwind v4 `@theme` design tokens and dark mode (saved in `localStorage`)

## Tech Stack
React 19 · TypeScript (strict) · Vite · React Router · Tailwind CSS v4 · Formik + Yup · ESLint (typescript-eslint, react-hooks) · DummyJSON API · Vercel

## Architecture

```
src/
  api/         ApiClient, ApiError, products.api.ts
  types/       Product, Cart, Order, User, AsyncState
  models/      Cart, Order, StorageService<T>, storage instances
  context/     Auth, Cart and Theme providers (+ hooks)
  components/  ui/ layout/ product/
  pages/       Catalog, Product, Cart, Checkout, Login, Orders, Profile, NotFound
  routes/      AppRoutes, ProtectedRoute
  utils/       format, cart, url, validation, guards, storage keys
```

**Data flow:** a user action triggers an event handler, which updates state or a Context function, which produces new immutable state, and React re-renders. API requests start in `useEffect` (with `AbortController` cleanup); loading, error and empty states are rendered conditionally. The catalog filters live in the URL (`useSearchParams`), so refresh, Back/Forward and shared links work. The cart, orders, reviews and theme are persisted in `localStorage` (`shop_cart`, `shop_orders`, `shop_reviews`, `shop_theme`); stored JSON is validated with type guards before use.

## How to Run

```bash
git clone https://github.com/natagiorgashvili7/10X-shop-natagiorgashvili.git
cd 10X-shop-natagiorgashvili
npm install
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | `tsc` with `--noEmit` (0 errors) |
| `npm run lint` | ESLint (`no-explicit-any` is an error) |

## Test Account
Login is a local simulation, so any username with a password of 6+ characters works, for example `emilys` / `emilyspass`.
Promo code for the cart: `10X10`.

## Known Limitations
- No real authentication or payment; the session is lost on refresh (cart, orders and theme are kept)
- Profile only edits the username
- Cart uses `useState` rather than a reducer

## Credits
Product data: [DummyJSON](https://dummyjson.com). AI assistance (Claude) was used for planning, code review, wording and some codes.