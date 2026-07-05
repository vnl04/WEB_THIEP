# Getting Started - Wedding Card Platform

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# From project root
cd /vercel/share/v0-project
pnpm install
```

### 2. Start Frontend Dev Server
```bash
cd apps/web
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Start Backend Dev Server (Optional)
```bash
cd apps/api
pnpm dev
```

Backend will run on [http://localhost:3001](http://localhost:3001)

---

## What You Can Do Right Now

### Frontend (Working ✅)
- Homepage with templates showcase
- Template browsing
- Pricing page
- User login/registration (mock API calls)
- Dashboard with mock data
- Guest management page
- Wishes page
- Gifts page
- Public card viewer

### Backend (API Structure Ready)
- All 40+ API endpoints defined
- Database schema complete
- Services structure in place
- Webhook handlers ready

---

## Project Structure

```
wedding-card-platform/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   ├── lib/            # API client, stores
│   │   └── ...
│   ├── api/                # NestJS backend
│   │   ├── src/
│   │   │   ├── modules/    # Feature modules
│   │   │   ├── services/   # Business logic
│   │   │   ├── prisma/     # Database
│   │   │   └── ...
│   │   └── prisma/
│   │       └── schema.prisma  # Database schema
│   └── admin/              # Admin panel (future)
├── packages/
│   ├── types/              # Shared TypeScript types
│   └── template-schema/    # Template definitions
└── turbo.json              # Monorepo config
```

---

## Key Files & What They Do

### Frontend
- `apps/web/lib/api.ts` - API client with all endpoints
- `apps/web/lib/store.ts` - Zustand state management
- `apps/web/components/AuthProvider.tsx` - Auth initialization
- `apps/web/components/CsvImporter.tsx` - Guest CSV import
- `apps/web/components/Toast.tsx` - Notifications

### Backend
- `apps/api/prisma/schema.prisma` - Database models (15 models)
- `apps/api/src/modules/*/` - Feature modules (10 modules)
- `apps/api/src/services/email.service.ts` - Email stubs
- `apps/api/src/services/qrcode.service.ts` - QR code stubs
- `apps/api/src/modules/payments/payments.webhook.ts` - Payment webhooks

---

## Available Routes

### Public Routes
- `/` - Homepage
- `/templates` - Template gallery
- `/pricing` - Pricing page
- `/login` - Login page
- `/register` - Registration page
- `/{slug}` - Public card viewer for guests

### Protected Routes (Need Login)
- `/dashboard` - Main dashboard with stats
- `/guests` - Guest list management
- `/wishes` - Wishes moderation
- `/gifts` - Gift tracking
- `/editor/{cardId}` - Card canvas editor

---

## Frontend Features Currently Working

### Authentication
```javascript
// Login
import { apiClient } from '@/lib/api';
const response = await apiClient.login(email, password);

// Register
const response = await apiClient.register(email, password, name);
```

### Fetching Data
```javascript
// Get user's cards
const cards = await apiClient.getCards();

// Get card details
const card = await apiClient.getCard(cardId);

// Get wishes for a card
const wishes = await apiClient.getWishes(cardId);
```

### State Management
```javascript
import { useAuthStore, useCardStore } from '@/lib/store';

// In your component
const { user, token } = useAuthStore();
const { cards } = useCardStore();
```

---

## Backend API Examples

### Start Backend
```bash
cd apps/api
pnpm dev
```

### Test Endpoints with cURL

#### Register User
```bash
curl -X POST http://localhost:3001/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Create Card
```bash
curl -X POST http://localhost:3001/v1/cards \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "1",
    "brideName": "Alice",
    "groomName": "Bob",
    "eventDate": "2025-12-31"
  }'
```

---

## Database Setup

### Using Prisma Studio (UI for database)
```bash
cd apps/api
pnpm prisma studio
```

Opens [http://localhost:5555](http://localhost:5555) where you can view/edit data.

### Create Tables
```bash
cd apps/api
pnpm prisma migrate dev --name init
```

### Seed Data
```bash
cd apps/api
pnpm prisma db seed
```

---

## Common Issues & Solutions

### Issue: "Cannot find module '@/lib/api'"
**Solution:** Make sure you're in the `apps/web` directory and dependencies are installed.
```bash
cd apps/web
pnpm install
```

### Issue: "Port 3000 already in use"
**Solution:** Kill the process or use a different port.
```bash
# Use different port
PORT=3001 pnpm dev
```

### Issue: "API client throwing 401 errors"
**Solution:** Make sure backend is running and authentication token is valid.
```bash
# Check backend is running
curl http://localhost:3001/v1/health

# Check token is stored in localStorage
# Open browser DevTools > Application > Local Storage
```

### Issue: "Tailwind CSS not compiling"
**Solution:** Make sure Tailwind v4 dependencies are installed.
```bash
cd apps/web
pnpm add -D @tailwindcss/postcss @tailwindcss/cli
```

---

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/wedding_cards
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
APP_URL=http://localhost:3000

# Payment Gateway (when ready)
VNPAY_CLIENT_ID=your_client_id
VNPAY_HASH_SECRET=your_hash_secret

# Email Service (when ready)
SENDGRID_API_KEY=your_api_key
```

---

## Next Steps

1. **Setup Database**: Connect to PostgreSQL/Supabase
2. **Test API**: Try curl commands to verify endpoints
3. **Integrate Payment**: Connect VNPay or Momo
4. **Configure Email**: Setup SendGrid or Mailgun
5. **Deploy**: Push to Vercel (frontend) + Railway (backend)

---

## Useful Commands

```bash
# Development
pnpm dev              # Start frontend
pnpm dev -w          # Start with turbo watching

# Database
pnpm prisma studio   # Open Prisma Studio UI
pnpm prisma migrate  # Run migrations
pnpm prisma db seed  # Seed data

# Building
pnpm build           # Build for production
pnpm start           # Start production server

# Testing
pnpm test            # Run tests (when added)
pnpm lint            # Run linter
```

---

## Architecture Highlights

### Frontend Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand (lightweight)
- **API**: Axios with interceptors
- **Components**: React 19 with server components

### Backend Stack
- **Framework**: NestJS
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT + Passport.js
- **Validation**: Class Validator
- **Documentation**: Swagger (ready to generate)

### Key Patterns
- **Monorepo**: Turborepo for managing multiple apps
- **Type Safety**: End-to-end TypeScript
- **API-First**: All features designed as APIs
- **Modular**: Feature-based folder structure
- **DRY**: Shared types and utilities

---

## Deployment

### Frontend (Vercel)
```bash
# Already configured
# Just push to GitHub, Vercel auto-deploys
git push origin main
```

### Backend (Railway)
```bash
# Setup Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

---

## Support & Documentation

- **API Docs**: `H-api-specification.md`
- **MVP Scope**: `J-mvp-scope-roadmap.md`
- **Tech Stack**: `M-tech-stack-decision.md`
- **Wireframes**: `L-wireframe-spec.md`
- **Completion Status**: `COMPLETION_STATUS.md`
- **Module Expansion**: `MODULE_EXPANSION_GUIDE.md`

---

**Happy coding! 🎉**
