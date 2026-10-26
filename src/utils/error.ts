import { isApiError } from '../api/ApiError'

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return `The server responded with an error (${error.status}). Please try again later.`
  }
  if (error instanceof TypeError) {
    return 'Could not reach the server. Check your internet connection.'
  }
  return 'Something went wrong while loading products.'
}
