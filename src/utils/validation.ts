import type { LoginFormErrors, LoginFormValues } from '../types/user'
import type { CheckoutFormErrors, CheckoutFormValues } from '../types/order'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLogin(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}

  if (values.username.trim() === '') {
    errors.username = 'Username is required'
  }

  if (values.password === '') {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return errors
}

export function validateCheckout(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {}

  if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters'
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address'
  }
  if (values.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters'
  }
  if (values.city.trim() === '') {
    errors.city = 'City is required'
  }

  return errors
}