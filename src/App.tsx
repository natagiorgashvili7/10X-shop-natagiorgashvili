import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ui/ErrorBoundary'
import AuthProvider from './context/AuthProvider'
import CartProvider from './context/CartProvider'
import ThemeProvider from './context/ThemeProvider'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <AppRoutes />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}