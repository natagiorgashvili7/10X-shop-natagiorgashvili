import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './auth-context'
import type { AuthContextValue } from './auth-context'
import type { AuthUser } from '../types/user'

const guest: AuthUser = { username: '', isLoggedIn: false }

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(guest)

  const value: AuthContextValue = {
    user,
    login: (username) => setUser({ username, isLoggedIn: true }),
    logout: () => setUser(guest),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}