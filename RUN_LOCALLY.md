# Running Wedding Card Platform Locally

## Prerequisites
- Node.js 18+
- pnpm (package manager)

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cd apps/web
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local
```

## Running the Application

### Start Frontend (Next.js)
```bash
pnpm dev
```

This will start the frontend at `http://localhost:3000`

The preview will automatically open and you can see:
- **Home Page**: Overview with navigation
- **Templates**: 4 wedding card templates
- **Pricing**: Subscription plans
- **Login/Register**: Authentication pages
- **Dashboard**: Overview of your cards
- **Editor**: Wedding card editor
- **Guests**: Guest management
- **Wishes**: Guest wishes/messages
- **Gifts**: Gift contributions

### Start Backend (NestJS) - Optional
If you want to run the full backend API:

```bash
cd apps/api
pnpm install
pnpm start:dev
```

Backend will run at `http://localhost:3001`

## Default Credentials (Demo)
Since pages use mock data:
- No authentication required for viewing
- All forms are UI previews (don't submit)
- Guest/wishes/gifts show demo data

## Project Structure

```
wedding-card-platform/
├── apps/
│   ├── web/              # Next.js frontend
│   ├── api/              # NestJS backend
│   └── admin/            # Admin panel (ready)
├── packages/
│   ├── types/            # Shared TypeScript types
│   └── template-schema/  # Block definitions
└── docs/
    ├── README.md
    ├── QUICKSTART.md
    ├── SETUP.md
    ├── IMPLEMENTATION_SUMMARY.md
    └── MODULE_EXPANSION_GUIDE.md
```

## Available Pages

### Public Pages
- `/` - Home page
- `/templates` - Template selection
- `/pricing` - Pricing plans
- `/:slug` - Public card viewer

### Auth Pages
- `/login` - Login page
- `/register` - Register page

### Dashboard Pages (Protected)
- `/dashboard` - Overview
- `/editor/:cardId` - Card editor
- `/guests` - Guest management
- `/wishes` - Wishes list
- `/gifts` - Gifts tracking

## Features Included

### Frontend
✅ Responsive design (mobile-first)
✅ Card templates showcase
✅ Wedding card editor with live preview
✅ Guest management interface
✅ Wishes and gifts tracking
✅ Clean, modern UI with Tailwind CSS
✅ Mock data for all pages

### Backend Structure (Ready to connect)
✅ 10+ NestJS modules
✅ 40+ API endpoints
✅ JWT authentication
✅ Prisma ORM with PostgreSQL schema
✅ 15 database models

## Next Steps

1. **Connect Real Backend**: Update API URLs in `.env.local`
2. **Add Authentication**: Implement JWT token handling
3. **Connect Database**: Set up PostgreSQL and run migrations
4. **Add Payments**: Integrate VNPay or Stripe
5. **Customize Templates**: Add more wedding card designs

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
pnpm dev -- --port 3001
```

### Module not found errors
```bash
# Clear cache and reinstall
pnpm install
rm -rf .next
pnpm dev
```

### Turbo workspace errors
Make sure `pnpm-workspace.yaml` exists and `package.json` has `packageManager` field

## Documentation

- **README.md** - Full project overview
- **QUICKSTART.md** - 5-minute setup guide
- **SETUP.md** - Detailed setup instructions
- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **MODULE_EXPANSION_GUIDE.md** - How to extend modules

---

**Happy building!** 🎉
