/**
 * Template Schema - Define block structure for wedding cards
 * This is used by both frontend (rendering) and admin (editing templates)
 */

export interface BlockDefinition {
  id: string;
  type: BlockType;
  title: string;
  order: number;
  visible: boolean;
  props: Record<string, any>;
  layout?: {
    width?: string;
    height?: string;
    padding?: string;
  };
}

export type BlockType = 
  | 'cover'
  | 'countdown'
  | 'gallery'
  | 'event-info'
  | 'story'
  | 'rsvp'
  | 'wishes'
  | 'gift'
  | 'location';

export interface CoverBlockProps {
  backgroundImage?: string;
  brideName: string;
  groomName: string;
  weddingDate?: string;
  subtitle?: string;
  opacity?: number;
}

export interface CountdownBlockProps {
  targetDate: string;
  format?: 'full' | 'compact';
}

export interface GalleryBlockProps {
  images: GalleryItem[];
  layout?: 'grid' | 'carousel' | 'masonry';
  columns?: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  title?: string;
  type: 'image' | 'video';
}

export interface RsvpBlockProps {
  deadline?: string;
  allowPlus?: boolean;
  requireName?: boolean;
}

export interface WishesBlockProps {
  requireApproval: boolean;
  allowAnonymous: boolean;
  maxLength: number;
}

export interface GiftBlockProps {
  bankAccount?: {
    accountNumber: string;
    accountHolder: string;
    bankName: string;
  };
  qrCode?: string;
  message?: string;
}

export interface LocationBlockProps {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  mapUrl?: string;
}

export interface EventInfoBlockProps {
  ceremony?: {
    time: string;
    location: string;
  };
  reception?: {
    time: string;
    location: string;
  };
  dresscode?: string;
}

export interface StoryBlockProps {
  title: string;
  content: string;
  image?: string;
}

// Template Definition
export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: 'traditional' | 'modern' | 'minimal' | 'colorful';
  tier: 'free' | 'basic' | 'premium';
  thumbnail: string;
  preview: string;
  blocks: BlockDefinition[];
  defaultContent: Record<string, any>;
  colorScheme?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  font?: {
    heading: string;
    body: string;
  };
}

// Preset Templates (MVP - hard-coded)
export const PRESET_TEMPLATES: TemplateDefinition[] = [
  {
    id: 'template-1-traditional',
    name: 'Classic Elegance',
    description: 'Traditional wedding template with classic design',
    category: 'traditional',
    tier: 'free',
    thumbnail: '/templates/classic-thumb.jpg',
    preview: '/templates/classic-preview.jpg',
    blocks: [
      {
        id: 'cover',
        type: 'cover',
        title: 'Cover',
        order: 1,
        visible: true,
        props: {
          brideName: '',
          groomName: '',
          weddingDate: '',
          backgroundImage: '/bg-traditional.jpg',
          opacity: 0.7,
        },
      },
      {
        id: 'countdown',
        type: 'countdown',
        title: 'Countdown',
        order: 2,
        visible: true,
        props: { format: 'full' },
      },
      {
        id: 'story',
        type: 'story',
        title: 'Our Story',
        order: 3,
        visible: true,
        props: { title: 'Our Love Story', content: '' },
      },
      {
        id: 'gallery',
        type: 'gallery',
        title: 'Gallery',
        order: 4,
        visible: true,
        props: { layout: 'grid', columns: 2, images: [] },
      },
      {
        id: 'event-info',
        type: 'event-info',
        title: 'Event Info',
        order: 5,
        visible: true,
        props: { ceremony: {}, reception: {} },
      },
      {
        id: 'rsvp',
        type: 'rsvp',
        title: 'RSVP',
        order: 6,
        visible: true,
        props: { requireName: true, allowPlus: true },
      },
      {
        id: 'wishes',
        type: 'wishes',
        title: 'Wishes',
        order: 7,
        visible: true,
        props: { requireApproval: true, allowAnonymous: false, maxLength: 500 },
      },
      {
        id: 'gift',
        type: 'gift',
        title: 'Send Gift',
        order: 8,
        visible: true,
        props: { message: 'Help us celebrate!' },
      },
    ],
    defaultContent: {
      primaryColor: '#D4736E',
      secondaryColor: '#F5E6D3',
      accentColor: '#8B6F47',
      font: 'serif',
    },
    colorScheme: {
      primary: '#D4736E',
      secondary: '#F5E6D3',
      accent: '#8B6F47',
      background: '#FEFEF8',
    },
  },
  {
    id: 'template-2-modern',
    name: 'Modern Minimal',
    description: 'Minimalist design with focus on photos',
    category: 'modern',
    tier: 'basic',
    thumbnail: '/templates/modern-thumb.jpg',
    preview: '/templates/modern-preview.jpg',
    blocks: [
      {
        id: 'cover',
        type: 'cover',
        title: 'Cover',
        order: 1,
        visible: true,
        props: {
          brideName: '',
          groomName: '',
          weddingDate: '',
          backgroundImage: '/bg-modern.jpg',
          opacity: 0.5,
        },
      },
      {
        id: 'countdown',
        type: 'countdown',
        title: 'Countdown',
        order: 2,
        visible: true,
        props: { format: 'compact' },
      },
      {
        id: 'gallery',
        type: 'gallery',
        title: 'Gallery',
        order: 3,
        visible: true,
        props: { layout: 'masonry', columns: 3, images: [] },
      },
      {
        id: 'event-info',
        type: 'event-info',
        title: 'Event Details',
        order: 4,
        visible: true,
        props: { ceremony: {}, reception: {} },
      },
      {
        id: 'rsvp',
        type: 'rsvp',
        title: 'RSVP',
        order: 5,
        visible: true,
        props: { requireName: true, allowPlus: true },
      },
      {
        id: 'wishes',
        type: 'wishes',
        title: 'Messages',
        order: 6,
        visible: true,
        props: { requireApproval: false, allowAnonymous: true, maxLength: 300 },
      },
      {
        id: 'gift',
        type: 'gift',
        title: 'Gift',
        order: 7,
        visible: true,
        props: { message: '' },
      },
    ],
    colorScheme: {
      primary: '#000000',
      secondary: '#FFFFFF',
      accent: '#666666',
      background: '#F5F5F5',
    },
  },
];

// Helper functions
export function getTemplateById(id: string): TemplateDefinition | undefined {
  return PRESET_TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByTier(tier: 'free' | 'basic' | 'premium'): TemplateDefinition[] {
  return PRESET_TEMPLATES.filter((t) => t.tier === tier);
}

export function getTemplatesByCategory(category: string): TemplateDefinition[] {
  return PRESET_TEMPLATES.filter((t) => t.category === category);
}
