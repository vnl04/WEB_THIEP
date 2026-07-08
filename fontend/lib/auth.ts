import { apiClient, unwrap } from '@/lib/api'
import { useAuthStore } from '@/lib/store'

interface AuthPayload {
  token: string
  user: { id: string; email: string; name: string }
}

export async function persistAuth(response: { data: AuthPayload }) {
  const { token, user } = response.data

  localStorage.setItem('auth_token', token)
  localStorage.setItem('auth_user', JSON.stringify(user))

  const { setToken, setUser } = useAuthStore.getState()
  setToken(token)
  setUser(user)
  apiClient.setAuthHeader(token)

  return { token, user }
}

export async function createCardFromTemplate(templateId: string, name?: string) {
  const response = await apiClient.createCard(templateId, {
    name: name || 'Thiệp cưới của tôi',
  })
  return unwrap<{ id: string }>(response)
}

export function clearAuth() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
  useAuthStore.getState().logout()
  apiClient.clearAuth()
}
