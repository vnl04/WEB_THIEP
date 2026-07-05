# Wedding Card Platform - Complete MVP

A full-stack monorepo for creating beautiful wedding invitation cards with RSVP management, gift tracking, and much more.

## Project Structure

```
wedding-card-platform/
├── apps/
│   ├── web/              # Next.js frontend (guest-facing + dashboard)
│   ├── admin/            # Admin panel (template management, moderation)
│   └── api/              # NestJS backend API
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── template-schema/  # Block template definitions
└── docs/                 # Documentation (A-O)
```

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **SWR** - Data fetching

### Backend
- **NestJS 10** - Node.js framework
- **Prisma** - ORM & database migrations
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Passport.js** - Auth strategy

### Infrastructure
- **Turborepo** - Monorepo management
- **Docker** - Local development

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Redis (optional, for caching)

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository>
cd wedding-card-platform
npm install  # or yarn/pnpm
```

2. **Setup database**
```bash
# Start PostgreSQL and Redis (if using Docker)
docker-compose up -d

# Set up environment variables
cp .env.example .env.local

# Run Prisma migrations
npm run db:migrate
```

3. **Start development servers**
```bash
npm run dev

# Frontend: http://localhost:3000
# API: http://localhost:3001
# API Docs: http://localhost:3001/api/docs
```

## Key Features (MVP)

### User Features
- User registration and login (email + password)
- Create wedding cards from templates (5-8 preset templates)
- Canvas editor with drag-and-drop blocks
- Customize: text, images, colors, music
- Publish and share with QR code
- Guest list management
- RSVP tracking
- Wishes/messages from guests
- Gift tracking via QR code

### Admin Features
- Template approval/rejection workflow
- Content moderation
- User management
- Basic dashboard

### Payment
- Single payment provider (VNPay/Momo)
- Free tier + Premium tier
- Subscription handling

## API Documentation

All API endpoints documented in `/docs/H-api-specification.md`

**Base URL**: `http://localhost:3001/v1`

### Authentication
```
Authorization: Bearer <JWT_TOKEN>
```

### Core Endpoints
- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `GET /templates` - List templates
- `POST /cards` - Create card
- `GET /cards/{id}` - Get card details
- `PATCH /cards/{id}` - Update card
- `POST /cards/{id}/publish` - Publish card
- `GET /cards/{id}/guests` - Get guest list
- `POST /cards/{id}/wishes` - Add wish
- `POST /cards/{id}/gifts` - Record gift

## Development Workflow

### Frontend
```bash
cd apps/web
npm run dev
```

### Backend
```bash
cd apps/api
npm run dev
```

### Database
```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Open Prisma Studio
npx prisma studio
```

### Running All Services
```bash
npm run dev  # From root
```

## Folder Structure Details

### `apps/web/`
- `app/` - Next.js App Router pages
- `components/` - React components
  - `blocks/` - Card block components
  - `editor/` - Canvas editor UI
  - `ui/` - Reusable UI components
- `lib/` - Utilities and API client

### `apps/api/src/`
- `modules/` - Feature modules
  - `auth/` - Authentication
  - `cards/` - Card management
  - `guests/` - Guest list
  - `wishes/` - Wishes/messages
  - `gifts/` - Gift tracking
  - etc.
- `prisma/` - Database client
- `common/` - Shared utilities

### `packages/`
- `types/` - TypeScript interfaces
- `template-schema/` - Block definitions

## Phase 1 (MVP) Scope

✅ Implemented
- User registration/login
- Template library
- Canvas editor
- Guest management
- RSVP system
- Wishes
- Gift QR codes
- Basic dashboard
- Payment integration prep

⏭️ Phase 2 & Beyond
- Admin panel
- SMS reminders
- Analytics integration
- Custom domains
- Affiliate program
- Multiple payment providers
- Template builder
- Co-editing
- Advanced moderation

## Environment Variables

See `.env.example` for full list. Critical ones:
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Auth secret
- `CORS_ORIGIN` - Allowed origins
- `NEXT_PUBLIC_API_URL` - API endpoint for frontend

## Contributing

1. Create feature branch
2. Follow existing patterns
3. Test changes locally
4. Submit PR

## Resources

- Full specifications in `/docs/` folder
- API spec: `/docs/H-api-specification.md`
- Database schema: `/docs/F-database-erd.mermaid`
- Wireframes: `/docs/L-wireframe-spec.md`

## Support

For issues or questions, check the documentation first, then open an issue on GitHub.

## License

TBD
