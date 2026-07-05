export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  phone?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface Card {
  id: string;
  userId: string;
  templateId: string;
  name: string;
  slug?: string;
  brideName?: string;
  groomName?: string;
  weddingDate?: Date;
  story?: string;
  content: Record<string, any>;
  design?: Record<string, any>;
  published: boolean;
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  tier: 'free' | 'basic' | 'premium';
  thumbnail: string;
  preview: string;
  blocks: Block[];
  status: 'draft' | 'approved' | 'rejected';
}

export interface Block {
  id: string;
  type: 'cover' | 'countdown' | 'gallery' | 'rsvp' | 'wishes' | 'gift' | 'story' | 'event';
  title?: string;
  content?: Record<string, any>;
  order: number;
  visible: boolean;
}

export interface Guest {
  id: string;
  cardId: string;
  name: string;
  email?: string;
  phone?: string;
  inviteToken: string;
  sentAt?: Date;
  viewedAt?: Date;
  rsvpStatus?: 'attending' | 'not-attending' | 'pending';
  rsvpCount?: number;
  rsvpAt?: Date;
}

export interface Wish {
  id: string;
  cardId: string;
  authorId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  hidden: boolean;
  pinned: boolean;
  createdAt: Date;
}

export interface Gift {
  id: string;
  cardId: string;
  donorId?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId?: string;
  status: 'pending' | 'confirmed' | 'failed';
  message?: string;
  createdAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  displayName: string;
  price: number;
  duration: number;
  features: string[];
}

export interface Subscription {
  id: string;
  cardId: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired';
  startDate: Date;
  endDate?: Date;
}
