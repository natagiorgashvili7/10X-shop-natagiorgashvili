import { ApiError } from './ApiError'

export class ApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(this.baseUrl + path, init)
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText || 'Request failed')
    }
    const data: unknown = await response.json()
    return data as T
  }

  get<T>(path: string, signal?: AbortSignal): Promise<T> {
    return this.request<T>(path, { signal })
  }
}