export class StorageService<T> {
  private readonly key: string
  private readonly isValid: (value: unknown) => value is T

  constructor(key: string, isValid: (value: unknown) => value is T) {
    this.key = key
    this.isValid = isValid
  }

  get(): T | null {
    try {
      const raw = localStorage.getItem(this.key)
      if (raw === null) return null
      const data: unknown = JSON.parse(raw)
      return this.isValid(data) ? data : null
    } catch {
      return null
    }
  }

  set(value: T): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(value))
    } catch {
      // Storage can be blocked or full; the app keeps working without persistence.
    }
  }

  remove(): void {
    try {
      localStorage.removeItem(this.key)
    } catch {
      // Nothing to do if storage is unavailable.
    }
  }
}