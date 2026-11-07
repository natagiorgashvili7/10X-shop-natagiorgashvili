import type { LoginFormErrors, LoginFormValues } from '../types/user'
import type { CheckoutFormErrors, CheckoutFormValues } from '../types/order'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 9-15 digits, optional leading "+"; spaces are removed before the check.
const PHONE_PATTERN = /^\+?\d{9,15}$/
const POSTAL_CODE_PATTERN = /^\d{4,10}$/

export const COUNTRIES: readonly string[] = [
  'Georgia',
  'Armenia',
  'Azerbaijan',
  'Turkey',
  'Germany',
  'France',
]

export const DEFAULT_COUNTRY = 'Georgia'

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
  if (!PHONE_PATTERN.test(values.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid phone number'
  }
  if (values.address.trim().length < 5) {
    errors.address = 'Address must be at least 5 characters'
  }
  if (values.city.trim() === '') {
    errors.city = 'City is required'
  }
  if (!POSTAL_CODE_PATTERN.test(values.postalCode.trim())) {
    errors.postalCode = 'Postal code must be 4-10 digits'
  }
  if (!COUNTRIES.includes(values.country)) {
    errors.country = 'Please select a country'
  }

  return errors
}