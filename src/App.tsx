import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ui/ErrorBoundary'
import AuthProvider from './context/AuthProvider'
import CartProvider from './context/CartProvider'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}