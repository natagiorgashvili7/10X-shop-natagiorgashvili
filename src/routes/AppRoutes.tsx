import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import CatalogPage from '../pages/CatalogPage'
import LoginPage from '../pages/LoginPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<CatalogPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}