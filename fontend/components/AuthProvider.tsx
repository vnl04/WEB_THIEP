'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store'
import { apiClient } from '@/lib/api'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setToken } = useAuthStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(user)
        apiClient.setAuthHeader(storedToken)

        apiClient.getProfile().catch(() => {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_user')
          setToken(null)
          setUser(null)
        })
      } catch {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    }
  }, [setUser, setToken])

  return <>{children}</>
}
