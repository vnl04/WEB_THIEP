# Quick Start Guide - WEB_THIEP Wedding Platform

## Project Status: ✅ PRODUCTION READY
**Version:** 1.0.0  
**Last Updated:** July 8, 2026  
**Test Status:** 100% PASS

---

## Installation & Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### 2. Setup Environment Variables

**Backend (.env or .env.local):**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wedding_db"

# Server
PORT=3001
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
APP_URL="http://localhost:3000"

# Authentication
JWT_SECRET="your-secret-key-here-min-32-characters-long"

# Frontend API
NEXT_PUBLIC_API_URL="http://localhost:3001/v1"

# Payment Gateways
VNPAY_CLIENT_ID="your-vnpay-id"
VNPAY_HASH_SECRET="your-vnpay-secret"
VNPAY_MERCHANT_ID="your-merchant-id"

MOMO_ACCESS_KEY="your-momo-key"
MOMO_SECRET_KEY="your-momo-secret"
MOMO_PARTNER_CODE="MOMO"

# Email Service (SendGrid)
SENDGRID_API_KEY="your-sendgrid-key"

# Media Storage (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Database Setup
```bash
# Generate Prisma client
pnpm exec prisma generate

# Run migrations
pnpm exec prisma migrate deploy

# Seed initial data (templates, users, plans)
pnpm exec prisma db seed
```

### 4. Start Development Servers

**Terminal 1 - Backend (NestJS API):**
```bash
cd apps/api
npm run start:dev
# API will run on http://localhost:3001/v1
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd apps/web
npm run dev
# Web will run on http://localhost:3000
```

---

## Project Structure

```
WEB_THIEP/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── modules/       # 12 feature modules
│   │   │   ├── services/      # Shared services
│   │   │   ├── common/        # Guards, filters, pipes
│   │   │   ├── middleware/    # Security, rate limiting
│   │   │   └── prisma/        # Database
│   │   ├── prisma/            # Database schema & migrations
│   │   └── package.json
│   │
│   └── web/                   # Next.js Frontend
│       ├── app/               # Pages & layouts
│       ├── components/        # 42+ React components
│       ├── lib/               # Utilities & stores
│       ├── public/            # Static assets
│       └── package.json
│
├── TEST_REPORT.md             # Comprehensive testing report
├── TESTING_COMPLETE.md        # Testing summary
├── COMPLETION_STATUS.md       # Feature completion status
└── package.json               # Monorepo root
```

---

## Key Features

### User Authentication
- Email/password registration
- JWT token-based authentication
- Role-based access (USER, ADMIN, MODERATOR)
- Password hashing with bcrypt

### Card Management
- Create cards from templates
- Edit card content with visual editor
- Publish cards publicly
- Track views and engagement
- Manage co-editors

### Guest Management
- Import guest lists (CSV)
- Send invitations
- Track guest RSVPs
- Manage attendance

### Wishes & Messages
- Guests can leave wishes
- Moderation queue for admin
- Flag inappropriate content
- Pin favorite wishes

### Gift Tracking
- Record gifts received
- Multiple payment methods (VNPay, Momo, Bank Transfer)
- Track gift amounts
- Withdrawal requests

### Admin Dashboard
- Platform analytics
- User management
- Template approval
- Wish moderation
- Payment tracking
- Withdrawal processing

---

## API Documentation

### Base URL
```
Development: http://localhost:3001/v1
Production: https://api.youromain.com/v1
```

### Authentication Header
```
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Auth Module
```
POST   /auth/register          # User registration
POST   /auth/login             # User login
POST   /auth/refresh-token     # Refresh JWT token
```

#### Cards Module
```
POST   /cards                  # Create card
GET    /cards                  # List user's cards
GET    /cards/:id              # Get card details
PATCH  /cards/:id              # Update card
DELETE /cards/:id              # Delete card
POST   /cards/:id/publish      # Publish card
```

#### Guests Module
```
POST   /cards/:cardId/guests   # Add guest
GET    /cards/:cardId/guests   # List guests
POST   /cards/:cardId/guests/import  # Import CSV
```

#### Wishes Module
```
POST   /cards/:cardId/wishes   # Add wish
GET    /cards/:cardId/wishes   # List wishes
PATCH  /wishes/:wishId/approve # Approve wish
```

#### Gifts Module
```
POST   /cards/:cardId/gifts    # Record gift
GET    /cards/:cardId/gifts    # List gifts
```

#### Payments Module
```
POST   /payments/checkout      # Create checkout session
GET    /payments               # Payment history
POST   /payments/webhook/vnpay # VNPay webhook
POST   /payments/webhook/momo  # Momo webhook
```

---

## Testing

### Run Manual Tests
```bash
# Test backend
cd apps/api
npm run test          # Jest tests
npm run test:watch    # Watch mode

# Test frontend
cd apps/web
npm run test          # Jest tests
npm run test:watch    # Watch mode
```

### Verify Build
```bash
npm run build         # Build both apps
npm run build:api     # Build backend only
npm run build:web     # Build frontend only
```

---

## Common Tasks

### Create a New Feature

1. **Backend:**
```bash
# Create new module in apps/api/src/modules/feature/
# Structure:
# ├── feature.module.ts
# ├── feature.service.ts
# ├── feature.controller.ts
# ├── feature.spec.ts
# └── dto/
#     ├── create-feature.dto.ts
#     └── update-feature.dto.ts
```

2. **Frontend:**
```bash
# Add page in apps/web/app/(route)/feature/page.tsx
# Add components in apps/web/components/Feature/
# Add API client methods in apps/web/lib/api.ts
```

### Add Database Migration

```bash
cd apps/api

# Create migration
npx prisma migrate dev --name add_feature

# Review schema.prisma
# Run migration automatically
```

### Update API Schema

```bash
# Modify apps/api/prisma/schema.prisma
# Create new DTO in apps/api/src/modules/*/dto/
# Update service and controller
# Build and test

npm run build:api
```

---

## Troubleshooting

### Database Connection Failed
```bash
# Check DATABASE_URL is correct
# Ensure PostgreSQL is running
# Try: psql postgresql://user:password@localhost:5432/wedding_db

# Reset database
npx prisma migrate reset
```

### Port Already in Use
```bash
# Backend (3001)
lsof -i :3001
kill -9 <PID>

# Frontend (3000)
lsof -i :3000
kill -9 <PID>
```

### JWT Token Invalid
```bash
# Regenerate JWT_SECRET (32+ characters)
openssl rand -base64 32

# Update .env file
# Clear localStorage in browser
# Re-login
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules dist .next .turbo
pnpm install

# Rebuild
npm run build
```

---

## Deployment

### To Vercel
```bash
# Push to GitHub
git push origin backend-completion

# Connect repo to Vercel
# Vercel auto-detects Next.js and builds

# Set environment variables in Vercel dashboard
```

### To Docker
```dockerfile
# See docker-compose.yml or Dockerfile
docker-compose up -d
```

### To AWS/GCP
```bash
# Build
npm run build

# Deploy backend (NestJS)
# Deploy frontend (Next.js static)
```

---

## Monitoring

### Error Tracking
```bash
# Setup Sentry (recommended)
export SENTRY_DSN="your-sentry-dsn"
```

### Logging
```bash
# View backend logs
docker logs <container_id>

# View frontend logs
browser console
```

### Performance
```bash
# Lighthouse audit
npm audit

# Bundle analysis
npm run analyze
```

---

## Support Resources

- **API Docs:** `/api/docs` (Swagger UI)
- **Database:** Check Prisma schema at `apps/api/prisma/schema.prisma`
- **Tests:** See `TEST_REPORT.md` for complete testing info
- **Status:** See `TESTING_COMPLETE.md` for current status

---

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/wedding-cards
   ```

2. **Make changes & commit**
   ```bash
   git add -A
   git commit -m "feat: Add wedding cards feature"
   ```

3. **Push & create PR**
   ```bash
   git push origin feature/wedding-cards
   ```

4. **Merge after review**
   ```bash
   git checkout backend-completion
   git merge feature/wedding-cards
   ```

---

## Performance Tips

- Frontend is Next.js 16 with Turbopack (fast builds)
- Backend uses NestJS with caching-ready architecture
- Database queries are optimized with Prisma
- Enable Redis for production caching
- Use CDN for media (Cloudinary configured)

---

## Security Best Practices

✅ Always use HTTPS in production  
✅ Keep JWT_SECRET secure  
✅ Validate all inputs  
✅ Use environment variables for secrets  
✅ Enable CORS only for trusted origins  
✅ Update dependencies regularly  
✅ Use strong database passwords  
✅ Enable rate limiting  

---

**Happy coding! 🚀**

For more details, see:
- TEST_REPORT.md
- TESTING_COMPLETE.md
- COMPLETION_STATUS.md
