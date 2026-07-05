# Quick Start Guide - Wedding Card Platform

Get the app running in 5 minutes!

## Prerequisites
- Node.js 18+
- Docker Desktop
- A code editor

## 1. Start (2 minutes)

```bash
# Install dependencies
pnpm install

# Start Docker containers (PostgreSQL + Redis)
docker-compose up -d

# Setup database
pnpm db:migrate

# Start dev servers
pnpm dev
```

## 2. Verify (1 minute)

Open in browser:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3001/api/docs

## 3. Test (2 minutes)

### Create Account
1. Visit http://localhost:3000
2. Click "Sign Up"
3. Enter email and password
4. You're logged in!

### Create Card
1. Go to Dashboard
2. Click "Create New Card"
3. Select a template
4. Start editing!

### Edit Card
1. Click "Edit" on any card
2. Use Canvas Editor to customize
3. Add guests, wishes, gift info
4. Click "Publish"

## Key URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Templates | http://localhost:3000/templates |
| Pricing | http://localhost:3000/pricing |
| Login | http://localhost:3000/login |
| Register | http://localhost:3000/register |
| Dashboard | http://localhost:3000/dashboard |
| Editor | http://localhost:3000/editor/{cardId} |
| Public Card | http://localhost:3000/{slug} |
| API Docs | http://localhost:3001/api/docs |

## File Structure Quick Reference

```
├── README.md                    ← Overview
├── QUICKSTART.md               ← This file
├── SETUP.md                    ← Detailed setup
├── IMPLEMENTATION_SUMMARY.md   ← What was built
├── MODULE_EXPANSION_GUIDE.md   ← How to extend
│
├── apps/
│   ├── web/                    ← Next.js frontend
│   │   ├── app/
│   │   │   ├── (public)/       ← Home, templates, pricing
│   │   │   ├── (auth)/         ← Login, register
│   │   │   └── (dashboard)/    ← Dashboard, editor, guests, etc
│   │   └── components/         ← React components
│   │
│   └── api/                    ← NestJS backend
│       └── src/modules/        ← Auth, Cards, Guests, etc
│
└── packages/
    ├── types/                  ← TypeScript interfaces
    └── template-schema/        ← Block definitions
```

## API Cheat Sheet

### Authentication
```bash
# Register
curl -X POST http://localhost:3001/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","name":"Test"}'

# Login
curl -X POST http://localhost:3001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'
```

### Cards
```bash
# Get my cards
curl http://localhost:3001/v1/cards \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create card
curl -X POST http://localhost:3001/v1/cards \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"templateId":"template-1-traditional","name":"My Wedding"}'

# Update card
curl -X PATCH http://localhost:3001/v1/cards/{cardId} \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"brideName":"Bride Name","groomName":"Groom Name"}'

# Publish card
curl -X POST http://localhost:3001/v1/cards/{cardId}/publish \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Templates
```bash
# List templates
curl http://localhost:3001/v1/templates

# Get template details
curl http://localhost:3001/v1/templates/template-1-traditional

# Filter templates
curl "http://localhost:3001/v1/templates?tier=free&category=traditional"
```

## Database GUI

```bash
# Open Prisma Studio
cd apps/api
npx prisma studio

# Access at http://localhost:5555
```

## Common Tasks

### Add a Test User via Database
```bash
npx prisma studio

# In GUI:
# 1. Go to User table
# 2. Click "Add record"
# 3. Fill email, password (will be hashed), name
# 4. Save
```

### View Database
```bash
# Using Prisma Studio
npx prisma studio

# Or using psql
psql -U user -d wedding_db -c "SELECT * FROM \"User\";"
```

### Reset Database
```bash
# Warning: This deletes all data!
npx prisma migrate reset
```

### Add More Templates
Edit `packages/template-schema/index.ts` and add to `PRESET_TEMPLATES`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000 && kill -9 <PID>` |
| Port 3001 in use | `lsof -i :3001 && kill -9 <PID>` |
| DB connection error | `docker-compose ps` to check PostgreSQL |
| Module not found | Run `pnpm install` again |
| Prisma errors | Run `npx prisma generate` |
| Styling issues | Clear `.next` folder: `rm -rf apps/web/.next` |

## Next Steps

1. **Explore the Code**
   - Check `IMPLEMENTATION_SUMMARY.md` for complete feature list
   - Read `MODULE_EXPANSION_GUIDE.md` to understand architecture

2. **Customize**
   - Change colors in `apps/web/tailwind.config.ts`
   - Add your branding in `apps/web/app/globals.css`
   - Modify templates in `packages/template-schema/`

3. **Add Features**
   - Follow `MODULE_EXPANSION_GUIDE.md` to add new modules
   - Update Prisma schema for new data models
   - Add API endpoints as needed

4. **Deploy**
   - Frontend to Vercel
   - API to Railway/Heroku
   - Database to Supabase/AWS RDS

## Useful Commands

```bash
# Development
pnpm dev              # Start all services
pnpm build            # Build all packages
pnpm lint             # Lint all packages

# Frontend only
cd apps/web
pnpm dev              # Start frontend
pnpm build            # Build frontend

# Backend only
cd apps/api
pnpm dev              # Start API
pnpm build            # Build API
pnpm db:migrate       # Run migrations

# Database
pnpm db:migrate       # Create/update schema
cd apps/api
npx prisma studio    # Open GUI
npx prisma reset     # Reset (destructive)
npx prisma seed      # Run seed script (if exists)

# Code quality
pnpm format           # Format code
pnpm lint             # Check linting
```

## Project Statistics

- **79 files** created
- **4,000+** lines of code
- **10+ pages** in frontend
- **10+ modules** in backend
- **15 database models**
- **40+ API endpoints**
- **Full TypeScript** coverage

## Support & Documentation

- **Full Setup**: See `SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Architecture Guide**: See `MODULE_EXPANSION_GUIDE.md`
- **API Spec**: See `docs/H-api-specification.md`
- **Tech Decisions**: See `docs/M-tech-stack-decision.md`

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | NestJS, Node.js, TypeScript, Prisma |
| Database | PostgreSQL (via Docker) |
| Cache | Redis (via Docker) |
| Auth | JWT, Passport.js, bcrypt |
| Package Manager | pnpm (recommended) |
| Monorepo | Turborepo |

---

**You're all set!** Start with the frontend at http://localhost:3000 and explore the platform.

Questions? Check the documentation files or read the code comments!
