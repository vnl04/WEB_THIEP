import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/v1';

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      if (this.token) {
        this.setAuthHeader(this.token);
      }
    }

    // Response interceptor
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Token expired - redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthHeader(token: string) {
    this.token = token;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearAuth() {
    this.token = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth endpoints
  register(email: string, password: string, name: string) {
    return this.client.post('/auth/register', { email, password, name });
  }

  login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  refreshToken() {
    return this.client.post('/auth/refresh-token', {});
  }

  // User endpoints
  getProfile() {
    return this.client.get('/users/me');
  }

  updateProfile(data: any) {
    return this.client.patch('/users/me', data);
  }

  // Template endpoints
  getTemplates(query?: any) {
    return this.client.get('/templates', { params: query });
  }

  getTemplate(id: string) {
    return this.client.get(`/templates/${id}`);
  }

  // Card endpoints
  createCard(templateId: string, data: any) {
    return this.client.post('/cards', { templateId, ...data });
  }

  getCards() {
    return this.client.get('/cards');
  }

  getCard(id: string) {
    return this.client.get(`/cards/${id}`);
  }

  updateCard(id: string, data: any) {
    return this.client.patch(`/cards/${id}`, data);
  }

  deleteCard(id: string) {
    return this.client.delete(`/cards/${id}`);
  }

  publishCard(id: string) {
    return this.client.post(`/cards/${id}/publish`, {});
  }

  getCardBySlug(slug: string) {
    return this.client.get(`/cards/slug/${slug}`);
  }

  // Guest endpoints
  addGuest(cardId: string, data: any) {
    return this.client.post(`/cards/${cardId}/guests`, data);
  }

  getGuests(cardId: string) {
    return this.client.get(`/cards/${cardId}/guests`);
  }

  importGuests(cardId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post(`/cards/${cardId}/guests/import`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  // RSVP endpoints
  submitRsvp(guestId: string, data: any) {
    return this.client.post(`/guests/${guestId}/rsvp`, data);
  }

  trackGuestView(guestId: string) {
    return this.client.post(`/guests/${guestId}/track-view`, {});
  }

  getRsvps(cardId: string) {
    return this.client.get(`/cards/${cardId}/rsvps`);
  }

  // Wish endpoints
  submitWish(cardId: string, data: any) {
    return this.client.post(`/cards/${cardId}/wishes`, data);
  }

  getWishes(cardId: string, query?: any) {
    return this.client.get(`/cards/${cardId}/wishes`, { params: query });
  }

  approveWish(wishId: string) {
    return this.client.patch(`/wishes/${wishId}/approve`, {});
  }

  hideWish(wishId: string) {
    return this.client.patch(`/wishes/${wishId}/hide`, {});
  }

  // Gift endpoints
  submitGift(cardId: string, data: any) {
    return this.client.post(`/cards/${cardId}/gifts`, data);
  }

  getGifts(cardId: string) {
    return this.client.get(`/cards/${cardId}/gifts`);
  }

  getGiftInfo(cardId: string) {
    return this.client.get(`/cards/${cardId}/gift-info`);
  }

  // Plan endpoints
  getPlans() {
    return this.client.get('/plans');
  }

  // Subscription endpoints
  createSubscription(cardId: string, planId: string) {
    return this.client.post('/subscriptions', { cardId, planId });
  }

  // Payment endpoints
  createCheckout(data: any) {
    return this.client.post('/payments/checkout', data);
  }

  getPaymentStatus(paymentId: string) {
    return this.client.get(`/payments/${paymentId}`);
  }

  // Media endpoints
  uploadMedia(cardId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.client.post(`/cards/${cardId}/media`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  getMedia(cardId: string) {
    return this.client.get(`/cards/${cardId}/media`);
  }

  deleteMedia(cardId: string, mediaId: string) {
    return this.client.delete(`/cards/${cardId}/media/${mediaId}`);
  }

  // Payment endpoints
  createPayment(data: any) {
    return this.client.post('/payments/create', data);
  }

  getPaymentStatus(transactionId: string) {
    return this.client.get(`/payments/${transactionId}/status`);
  }

  getPayments(query?: any) {
    return this.client.get('/payments', { params: query });
  }

  // Subscription endpoints
  getPlan(planId: string) {
    return this.client.get(`/subscriptions/plans/${planId}`);
  }

  getPlans() {
    return this.client.get('/subscriptions/plans');
  }

  createSubscription(cardId: string, planId: string) {
    return this.client.post('/subscriptions', { cardId, planId });
  }

  updateSubscription(id: string, data: any) {
    return this.client.patch(`/subscriptions/${id}`, data);
  }

  cancelSubscription(id: string) {
    return this.client.delete(`/subscriptions/${id}`);
  }
}

export const apiClient = new ApiClient();
