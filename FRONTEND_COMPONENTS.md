# Frontend Components Documentation

## Overview

This document provides a comprehensive guide to all frontend components built for the WeddingCard platform. All components follow a consistent design system with a premium rose-gold aesthetic.

## Design System

### Colors
- **Primary**: `#D4736E` (Rose Gold) - Main brand color
- **Secondary**: `#F5E6D3` (Cream) - Secondary backgrounds
- **Accent**: `#8B6F47` (Warm Brown) - Tertiary actions
- **Success**: `#6BA587` (Green)
- **Warning**: `#D4A574` (Orange)
- **Error**: `#C25A55` (Red)
- **Foreground**: `#2D2D2D` (Dark)
- **Background**: `#FEFEF8` (Off-white)

### Typography
- **Headings**: Playfair Display (serif) - Bold, elegant
- **Body**: Inter (sans-serif) - Clean, readable

### Spacing System
- sm: 0.375rem
- md: 0.5rem
- lg: 0.75rem
- xl: 1rem
- 2xl: 1.5rem

---

## Layout Components

### Header
**File**: `components/Header.tsx`

Sticky navigation header with responsive mobile menu.

**Features**:
- Logo with heart icon
- Desktop navigation links
- Mobile hamburger menu
- CTA buttons (Login, Get Started)
- Smooth animations

**Usage**:
```tsx
<Header />
```

---

### Footer
**File**: `components/Footer.tsx`

Multi-column footer with links and social media.

**Features**:
- Brand information
- 4 column link sections (Product, Company, Legal)
- Social media icons
- Copyright info
- Responsive grid

**Usage**:
```tsx
<Footer />
```

---

### DashboardLayout
**File**: `components/DashboardLayout.tsx`

Sidebar layout for dashboard pages.

**Props**:
- `title` (string) - Page title
- `description` (string, optional) - Page description
- `navItems` (NavItem[]) - Navigation items with icons
- `headerAction` (ReactNode, optional) - Right-side header action
- `children` (ReactNode) - Page content

**Features**:
- Collapsible sidebar (mobile friendly)
- Top navigation bar
- Active nav item highlighting
- Settings and logout buttons

**Usage**:
```tsx
<DashboardLayout
  title="Dashboard"
  description="Welcome back!"
  navItems={[
    { label: 'Overview', href: '/dashboard', icon: '📊', active: true },
    { label: 'Cards', href: '/dashboard/cards', icon: '💌' },
    { label: 'Guests', href: '/dashboard/guests', icon: '👥' },
  ]}
>
  {/* Page content */}
</DashboardLayout>
```

---

## Section Components

### HeroSection
**File**: `components/HeroSection.tsx`

Landing page hero with decorative card stack.

**Features**:
- Animated hero text
- Stacked card visual decoration
- CTA buttons (Create Card, Browse Templates)
- Social proof with star rating

**Usage**:
```tsx
<HeroSection />
```

---

### FeaturesSection
**File**: `components/FeaturesSection.tsx`

Grid of 8 feature cards with icons.

**Features**:
- Icon + title + description
- Hover effects
- Responsive grid (1-4 columns)
- Light background

**Built-in Features**:
- Beautiful Templates
- Easy Customization
- Fully Responsive
- Gift Management
- Guest Wishes
- RSVP Tracking
- QR Code Share
- Email Invites

**Usage**:
```tsx
<FeaturesSection />
```

---

### PricingSection
**File**: `components/PricingSection.tsx`

3-tier pricing plans with feature lists.

**Features**:
- Starter, Professional (popular), Premium tiers
- Monthly pricing display
- Feature checkmarks
- CTA buttons per plan
- "Most Popular" badge

**Usage**:
```tsx
<PricingSection />
```

---

### CTASection
**File**: `components/CTASection.tsx`

Full-width call-to-action section.

**Features**:
- Gradient background (rose-gold theme)
- Large heading and description
- Dual CTA buttons
- No credit card message

**Usage**:
```tsx
<CTASection />
```

---

## UI Components

### Button
**File**: `components/Button.tsx`

Reusable button with multiple variants.

**Props**:
- `variant`: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'

**Variants**:
- **Primary**: Solid rose-gold with white text
- **Secondary**: Cream background with dark text
- **Accent**: Warm brown background with white text
- **Outline**: Transparent with primary border
- **Ghost**: Minimal styling

**Usage**:
```tsx
<Button variant="primary" size="lg" onClick={() => {}}>
  Click Me
</Button>

<Button variant="outline" loading={isLoading}>
  Submit
</Button>
```

---

### Card
**File**: `components/Card.tsx`

Flexible card container.

**Props**:
- `variant`: 'default' | 'elevated' | 'outlined'
- `hover`: boolean
- `onClick`: function (optional)

**Usage**:
```tsx
<Card variant="elevated" hover>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

---

### Badge
**File**: `components/Badge.tsx`

Small badge component for labels.

**Props**:
- `variant`: 'default' | 'primary' | 'success' | 'warning' | 'error'

**Usage**:
```tsx
<Badge variant="primary">New</Badge>
<Badge variant="success">Verified</Badge>
<Badge variant="error">Important</Badge>
```

---

### Input
**File**: `components/Input.tsx`

Form input field with validation.

**Props**:
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `icon`: ReactNode (optional)
- All standard HTML input attributes

**Features**:
- Label support
- Error state styling
- Helper text
- Icon support
- Focus ring styling

**Usage**:
```tsx
<Input
  label="Email"
  type="email"
  placeholder="your@email.com"
  error={emailError}
  helperText="We'll never share your email"
/>

<Input
  label="Name"
  icon={<UserIcon />}
  placeholder="Full name"
/>
```

---

### Textarea
**File**: `components/Textarea.tsx`

Multi-line text input.

**Props**:
- `label`: string (optional)
- `error`: string (optional)
- `helperText`: string (optional)
- `charCount`: boolean (optional)
- All standard HTML textarea attributes

**Usage**:
```tsx
<Textarea
  label="Message"
  placeholder="Your message..."
  maxLength={500}
  charCount
  rows={5}
/>
```

---

### LoadingSpinner
**File**: `components/LoadingSpinner.tsx`

Animated loading indicator.

**Props**:
- `size`: 'sm' | 'md' | 'lg'
- `fullScreen`: boolean
- `text`: string (optional)

**Usage**:
```tsx
<LoadingSpinner size="md" text="Loading..." />

<LoadingSpinner fullScreen />
```

---

### Modal
**File**: `components/Modal.tsx`

Dialog/modal component.

**Props**:
- `isOpen`: boolean
- `onClose`: function
- `title`: string (optional)
- `footer`: ReactNode (optional)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `closeOnBackdropClick`: boolean

**Features**:
- Animated entrance
- Backdrop blur
- Keyboard ESC support (when added)
- Footer actions
- Accessible

**Usage**:
```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Are you sure?</p>
</Modal>
```

---

### Toast
**File**: `components/Toast.tsx`

Notification/toast system using Zustand.

**Export**: `useToastStore` hook

**Methods**:
- `addToast(message, type, duration)`
- `removeToast(id)`

**Usage**:
```tsx
// In your component
const { addToast, success, error } = useToastStore();

success('Card created successfully!');
error('Something went wrong', 8000);

// In your app root
<Toast />
```

---

## Data Display Components

### Grid
**File**: `components/Grid.tsx`

Responsive grid container.

**Props**:
- `cols`: 'auto' | 1 | 2 | 3 | 4 | 6
- `gap`: 'sm' | 'md' | 'lg' | 'xl'

**Usage**:
```tsx
<Grid cols={3} gap="lg">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

---

### TemplateCard
**File**: `components/TemplateCard.tsx`

Beautiful template display card.

**Props**:
- `id`: string
- `name`: string
- `description`: string
- `category`: string
- `thumbnail`: string (optional)
- `featured`: boolean (optional)
- `onSelect`: function (optional)

**Features**:
- Image or placeholder
- Featured badge
- Category badge
- Hover scale effect
- "Use Template" button

**Usage**:
```tsx
<TemplateCard
  id="template-1"
  name="Elegant Classic"
  description="Traditional wedding design"
  category="Elegant"
  thumbnail="/templates/elegant.jpg"
  featured
  onSelect={(id) => console.log('Selected:', id)}
/>
```

---

### StatCard
**File**: `components/StatCard.tsx`

Dashboard statistic card.

**Props**:
- `icon`: string (emoji)
- `label`: string
- `value`: string | number
- `change`: number (optional)
- `changeLabel`: string (optional)

**Features**:
- Large value display
- Percentage change indicator
- Icon display
- Positive/negative highlighting

**Usage**:
```tsx
<StatCard
  icon="💌"
  label="Total Cards"
  value={24}
  change={12}
  changeLabel="vs last month"
/>
```

---

### Pagination
**File**: `components/Pagination.tsx`

Advanced pagination component.

**Props**:
- `currentPage`: number
- `totalPages`: number
- `onPageChange`: function

**Features**:
- Smart page number display
- Previous/Next buttons
- First/Last page shortcuts
- Ellipsis for large ranges
- Disabled states

**Usage**:
```tsx
const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>
```

---

## Global Styles

All components use Tailwind CSS with custom theme variables defined in `globals.css`.

### Available CSS Classes

**Buttons**:
- `.btn-primary`
- `.btn-secondary`
- `.btn-accent`
- `.btn-outline`
- `.btn-ghost`

**Form**:
- `.input-field`
- `.textarea-field`
- `.select-field`

**Cards**:
- `.card`
- `.card-elevated`

**Badges**:
- `.badge`
- `.badge-primary`
- `.badge-success`

**Text**:
- `.text-balance` - Balanced text wrapping
- `.text-muted` - Muted text color
- `.text-subtle` - Very subtle text

**Layout**:
- `.section` - Standard section padding
- `.section-wide` - Max-width container
- `.divider` - Horizontal line

---

## Responsive Breakpoints

- Mobile: 0-768px
- Tablet: 768px+
- Desktop: 1024px+

Most components use `md:` and `lg:` prefixes for responsive behavior.

---

## Animations

Available animations in Tailwind config:

- `animate-fade-in` - Fade in effect
- `animate-slide-up` - Slide up effect
- `animate-slide-down` - Slide down effect
- `animate-pulse-soft` - Soft pulse effect

---

## Best Practices

1. **Use semantic colors** - Always use theme variables over hardcoded colors
2. **Maintain spacing** - Use the defined spacing scale
3. **Mobile first** - Design for mobile, enhance for larger screens
4. **Accessibility** - Add aria-labels and semantic HTML
5. **Consistent patterns** - Follow existing component patterns

---

## Examples

### Complete Dashboard Page
```tsx
'use client';

import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import Grid from '@/components/Grid';
import Button from '@/components/Button';

export default function Dashboard() {
  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: '📊', active: true },
    { label: 'Cards', href: '/dashboard/cards', icon: '💌' },
    { label: 'Guests', href: '/dashboard/guests', icon: '👥' },
    { label: 'Gifts', href: '/dashboard/gifts', icon: '🎁' },
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      navItems={navItems}
      headerAction={
        <Button variant="primary">Create New Card</Button>
      }
    >
      <Grid cols={4} gap="lg">
        <StatCard
          icon="💌"
          label="Total Cards"
          value={12}
          change={25}
          changeLabel="vs last month"
        />
        <StatCard
          icon="👥"
          label="Total Guests"
          value={487}
          change={-5}
          changeLabel="vs last month"
        />
        <StatCard
          icon="✅"
          label="RSVP Rate"
          value="78%"
          change={12}
          changeLabel="vs last month"
        />
        <StatCard
          icon="🎁"
          label="Gifts Received"
          value="45.5M"
          change={156}
          changeLabel="vs last month"
        />
      </Grid>
    </DashboardLayout>
  );
}
```

---

## Future Enhancements

- Table component with sorting
- Dropdown/Select component
- Tabs component
- Accordion component
- Color picker
- Date picker
- File upload component
- Rich text editor

---

For more information, see the main README.md and explore the component files directly.
