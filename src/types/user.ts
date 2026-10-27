export interface AuthUser {
  username: string
  isLoggedIn: boolean
}

export interface LoginFormValues {
  username: string
  password: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormValues, string>>