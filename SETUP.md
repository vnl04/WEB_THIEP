# Complete Setup Guide

## Step 1: Environment Setup

### Install Dependencies
```bash
# Using pnpm (recommended for monorepo)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### Configure Environment Variables
```bash
# Copy example env file
cp .env.example .env.local

# Edit with your values
# At minimum, set:
# - DATABASE_URL (PostgreSQL connection string)
# - JWT_SECRET (random string for token signing)
```

## Step 2: Database Setup

### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL and Redis
docker-compose up -d

# The default connection string in .env matches:
# DATABASE_URL="postgresql://user:password@localhost:5432/wedding_db"
```

### Option B: Using Local PostgreSQL
```bash
# Create database
createdb wedding_db

# Update DATABASE_URL in .env.local with your connection string
# Example: postgresql://postgres:password@localhost:5432/wedding_db
```

### Run Migrations
```bash
# From project root
pnpm db:migrate

# Or from api folder
cd apps/api && npx prisma migrate dev
```

## Step 3: Start Development Servers

### All Services at Once
```bash
pnpm dev

# This will start:
# - Frontend (http://localhost:3000)
# - API (http://localhost:3001)
```

### Individual Services
```bash
# Frontend only
cd apps/web && pnpm dev

# API only
cd apps/api && pnpm dev
```

## Step 4: Verify Installation

### Check Frontend
```
Open http://localhost:3000 in browser
Should see the home page
```

### Check API
```
Open http://localhost:3001/api/docs in browser
Should see Swagger documentation
```

### Test API Connection
```bash
# From another terminal
curl -X GET http://localhost:3001/v1/templates
```

## Step 5: Create Sample Data (Optional)

```bash
# Use Prisma Studio to add templates and plans
cd apps/api
npx prisma studio

# Or manually via API:
curl -X POST http://localhost:3001/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000 or 3001
# On macOS/Linux:
lsof -i :3000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error
```bash
# Check PostgreSQL is running
# Check DATABASE_URL is correct
# Verify database exists
psql -U user -d wedding_db -c "SELECT 1"
```

### Prisma Client Error
```bash
# Regenerate Prisma client
cd apps/api
npx prisma generate
```

### Module Not Found Errors
```bash
# Rebuild monorepo
pnpm install
pnpm build
```

## Development Tips

### Using Prisma Studio
```bash
cd apps/api
npx prisma studio
# Opens http://localhost:5555 with visual database editor
```

### Watching Database Changes
```bash
cd apps/api
npx prisma migrate dev
# Automatically re-generates Prisma client on schema changes
```

### Testing API Endpoints
```bash
# Using curl
curl -X POST http://localhost:3001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Using Postman or Insomnia - import from http://localhost:3001/api/docs
```

### Hot Reload
- Frontend: Changes auto-reload (Next.js built-in)
- API: Changes trigger auto-restart (NestJS watch mode)

## Next Steps

1. Create your first user via signup page or API
2. Select a template and create a card
3. Explore the Canvas Editor
4. Add guests and test RSVP
5. Check admin/moderation features

## Important Paths

- **Frontend code**: `apps/web/app/`
- **API code**: `apps/api/src/`
- **Database schema**: `apps/api/prisma/schema.prisma`
- **API docs**: `docs/H-api-specification.md`
- **Component types**: `packages/types/index.ts`
- **Template definitions**: `packages/template-schema/index.ts`

## Useful Commands

```bash
# From project root
pnpm dev              # Start all services
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm db:migrate       # Run database migrations
pnpm format           # Format code with Prettier

# From specific app
cd apps/web
pnpm dev              # Frontend only
pnpm build            # Build frontend
pnpm lint             # Lint frontend

cd apps/api
pnpm dev              # Backend only
pnpm build            # Build backend
pnpm db:migrate       # Database operations
```

## Deployment Preparation

See `docs/O-deployment-plan.md` for details on deploying to:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- Supabase/AWS (Database)
