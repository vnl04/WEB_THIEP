import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
    }
  )
);

interface CardStore {
  cards: any[];
  currentCard: any | null;
  setCards: (cards: any[]) => void;
  setCurrentCard: (card: any | null) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  cards: [],
  currentCard: null,
  setCards: (cards) => set({ cards }),
  setCurrentCard: (card) => set({ currentCard: card }),
}));

interface GuestStore {
  guests: any[];
  rsvpStats: { total: number; attending: number; pending: number };
  setGuests: (guests: any[]) => void;
  setRsvpStats: (stats: any) => void;
}

export const useGuestStore = create<GuestStore>((set) => ({
  guests: [],
  rsvpStats: { total: 0, attending: 0, pending: 0 },
  setGuests: (guests) => set({ guests }),
  setRsvpStats: (stats) => set({ rsvpStats: stats }),
}));

interface WishStore {
  wishes: any[];
  pendingWishes: number;
  setWishes: (wishes: any[]) => void;
  setPendingWishes: (count: number) => void;
}

export const useWishStore = create<WishStore>((set) => ({
  wishes: [],
  pendingWishes: 0,
  setWishes: (wishes) => set({ wishes }),
  setPendingWishes: (count) => set({ pendingWishes: count }),
}));

interface GiftStore {
  gifts: any[];
  totalAmount: number;
  setGifts: (gifts: any[]) => void;
  setTotalAmount: (amount: number) => void;
}

export const useGiftStore = create<GiftStore>((set) => ({
  gifts: [],
  totalAmount: 0,
  setGifts: (gifts) => set({ gifts }),
  setTotalAmount: (amount) => set({ totalAmount: amount }),
}));
