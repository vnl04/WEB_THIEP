import axios, { AxiosInstance, AxiosResponse } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1'

export function unwrap<T>(response: AxiosResponse): T {
  const body = response.data
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data as T
  }
  return body as T
}

export function getErrorMessage(error: unknown, fallback = 'Đã có lỗi xảy ra'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: string | string[]; error?: { message?: string } }
    if (Array.isArray(data?.message)) return data.message.join(', ')
    if (typeof data?.message === 'string') return data.message
    if (data?.error?.message) return data.error.message
  }
  return fallback
}

class ApiClient {
  private client: AxiosInstance
  private token: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' },
    })

    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
      if (this.token) this.setAuthHeader(this.token)
    }

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
          const path = window.location.pathname
          if (!path.startsWith('/login') && !path.startsWith('/register')) {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  setAuthHeader(token: string) {
    this.token = token
    this.client.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  clearAuth() {
    this.token = null
    delete this.client.defaults.headers.common.Authorization
  }

  register(email: string, password: string, name: string) {
    return this.client.post('/auth/register', { email, password, name })
  }

  login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password })
  }

  getProfile() {
    return this.client.get('/users/me')
  }

  getTemplates(query?: Record<string, string | number>) {
    return this.client.get('/templates', { params: query })
  }

  getTemplate(id: string) {
    return this.client.get(`/templates/${id}`)
  }

  createCard(templateId: string, data: Record<string, unknown> = {}) {
    return this.client.post('/cards', { templateId, ...data })
  }

  getCards() {
    return this.client.get('/cards')
  }

  getCard(id: string) {
    return this.client.get(`/cards/${id}`)
  }

  updateCard(id: string, data: Record<string, unknown>) {
    return this.client.patch(`/cards/${id}`, data)
  }

  publishCard(id: string) {
    return this.client.post(`/cards/${id}/publish`, {})
  }

  getGuests(cardId: string) {
    return this.client.get(`/cards/${cardId}/guests`)
  }

  addGuest(cardId: string, data: Record<string, unknown>) {
    return this.client.post(`/cards/${cardId}/guests`, data)
  }

  getRsvps(cardId: string) {
    return this.client.get(`/cards/${cardId}/rsvps`)
  }

  getWishes(cardId: string) {
    return this.client.get(`/cards/${cardId}/wishes`)
  }

  getGifts(cardId: string) {
    return this.client.get(`/cards/${cardId}/gifts`)
  }

  submitWish(cardId: string, data: Record<string, unknown>) {
    return this.client.post(`/cards/${cardId}/wishes`, data)
  }

  submitRsvp(guestId: string, data: Record<string, unknown>) {
    return this.client.post(`/guests/${guestId}/rsvp`, data)
  }
}

export const apiClient = new ApiClient()
