# Setup and Deployment Guide

## Wedding Card Platform - Complete Setup Instructions

This guide covers everything needed to set up, develop, and deploy the Wedding Card Platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [External Services Configuration](#external-services-configuration)
6. [Running the Application](#running-the-application)
7. [Production Deployment](#production-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required
- **Node.js**: v18+ (LTS v20 recommended)
- **pnpm**: v10+ (package manager)
- **PostgreSQL**: v12+ (database)
- **Git**: Latest version

### Accounts Required
- **SendGrid**: For email service (free tier available)
- **VNPay or Momo**: For payment processing (Vietnam specific)
- **Vercel**: For frontend hosting
- **Railway/Render/AWS**: For backend hosting

### Recommended Tools
- **Postman**: API testing
- **pgAdmin**: PostgreSQL GUI
- **Visual Studio Code**: Code editor

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/wedding-card-platform.git
cd wedding-card-platform
```

### 2. Install Dependencies

```bash
# Install root dependencies
pnpm install

# Dependencies are automatically installed for all workspace packages
```

### 3. Create Environment Files

```bash
# Copy example files
cp .env.example .env.development.local

# Copy backend env file
cp apps/api/.env.example apps/api/.env
```

---

## Environment Configuration

### Frontend Environment Variables (.env.development.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=

# Optional: Cloudinary for media
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Backend Environment Variables (apps/api/.env)

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/wedding_db"

# API Configuration
PORT=3001
CORS_ORIGIN="http://localhost:3000"
APP_URL="http://localhost:3000"

# JWT Secret (Generate: openssl rand -base64 32)
JWT_SECRET="your-secret-key-here-min-32-characters"

# Email Service (SendGrid)
SENDGRID_API_KEY="SG.your-api-key"
SENDGRID_FROM_EMAIL="noreply@weddingcards.com"

# Payment Gateway - VNPay (Vietnam)
VNPAY_CLIENT_ID="your-merchant-id"
VNPAY_HASH_SECRET="your-hash-secret"

# Payment Gateway - Momo (Vietnam)
MOMO_ACCESS_KEY="your-access-key"
MOMO_SECRET_KEY="your-secret-key"
MOMO_PARTNER_CODE="MOMO"

# Webhook Secret
WEBHOOK_SECRET="your-webhook-secret"

# Redis (optional, for production caching)
REDIS_URL="redis://localhost:6379"
```

---

## Database Setup

### 1. Start PostgreSQL

```bash
# macOS (using Homebrew)
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo systemctl start postgresql

# Or using Docker
docker run --name postgres-wedding \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=wedding_db \
  -p 5432:5432 \
  -d postgres:15
```

### 2. Create Database and Run Migrations

```bash
cd apps/api

# Run migrations
pnpm run db:migrate

# Seed initial data (templates, plans, test user)
pnpm run db:seed

# View database with Prisma Studio
pnpm run db:studio
```

### 3. Verify Database Connection

```bash
# Test database connection
npx prisma db execute --stdin < /dev/null
```

---

## External Services Configuration

### SendGrid Email Service

1. **Create SendGrid Account**
   - Go to https://sendgrid.com
   - Sign up for free tier
   - Verify sender email

2. **Generate API Key**
   - In SendGrid dashboard → Settings → API Keys
   - Create new API key
   - Copy key to `SENDGRID_API_KEY`

3. **Verify Sender Email**
   - Dashboard → Sender Authentication
   - Verify your domain or single sender

### VNPay Payment Gateway

1. **Register with VNPay**
   - Go to https://sandbox.vnpayment.vn
   - Create test merchant account
   - Get Merchant ID and Hash Secret

2. **Configuration**
   ```env
   VNPAY_CLIENT_ID=your_merchant_id
   VNPAY_HASH_SECRET=your_hash_secret
   ```

3. **Test Payment**
   - Use test cards provided by VNPay
   - Test card: 4111111111111111
   - Password: any value

### Momo Payment Gateway

1. **Register with Momo**
   - Go to https://momo.vn/devsite
   - Create developer account
   - Generate API keys

2. **Configuration**
   ```env
   MOMO_ACCESS_KEY=your_access_key
   MOMO_SECRET_KEY=your_secret_key
   ```

---

## Running the Application

### Development Mode

```bash
# Start all services (root directory)
pnpm dev

# Or start individually:

# Terminal 1: Frontend
cd apps/web
pnpm dev
# Runs on http://localhost:3000

# Terminal 2: Backend
cd apps/api
pnpm dev
# Runs on http://localhost:3001
```

### First-Time Setup Checklist

- [ ] Database created and migrations run
- [ ] Seed data populated
- [ ] Frontend and backend running
- [ ] Can access http://localhost:3000
- [ ] API responds at http://localhost:3001/v1

### Testing the Setup

1. **Test Frontend**
   ```bash
   curl http://localhost:3000
   ```

2. **Test Backend API**
   ```bash
   curl http://localhost:3001/v1/health
   ```

3. **Test Email Service**
   - Create test account at /register
   - Should receive verification email

---

## Production Deployment

### Frontend Deployment (Vercel)

1. **Connect GitHub Repository**
   ```bash
   # Push to main branch
   git push origin main
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy from root
   vercel --prod
   ```

3. **Set Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL` pointing to your backend
   - Redeploy

4. **Configure Custom Domain**
   - Vercel Project → Settings → Domains
   - Add your domain
   - Update DNS records

### Backend Deployment (Railway/Render)

#### Option 1: Railway

1. **Connect Repository**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select wedding-card-platform repo

2. **Configure Build Settings**
   - Start Command: `cd apps/api && npm start`
   - Build Command: `pnpm install && pnpm build`

3. **Add Environment Variables**
   - Railway dashboard → Variables
   - Add all backend environment variables

4. **Deploy**
   - Railway automatically deploys on push to main

#### Option 2: Render

1. **Create New Web Service**
   - https://render.com/new/web-service
   - Connect GitHub repository

2. **Configure Service**
   - Name: `wedding-api`
   - Environment: Node
   - Build Command: `cd apps/api && npm install && npm run build`
   - Start Command: `cd apps/api && npm start`

3. **Add Environment Variables**
   - Environment tab → Add all variables

### Database Deployment (Neon/AWS RDS)

#### Option 1: Neon PostgreSQL

1. **Create Project**
   - https://console.neon.tech
   - Create new project
   - Copy connection string

2. **Update Environment**
   ```env
   DATABASE_URL="postgresql://user:password@host/database"
   ```

3. **Run Migrations**
   ```bash
   npx prisma migrate deploy
   pnpm run db:seed
   ```

#### Option 2: AWS RDS

1. **Create RDS Instance**
   - AWS Console → RDS → Create Database
   - Engine: PostgreSQL
   - DB instance identifier: `wedding-db-prod`

2. **Configure Security Groups**
   - Allow inbound traffic on port 5432
   - Restrict to your backend server IP

3. **Get Connection String**
   - RDS Dashboard → Connectivity & security
   - Copy the endpoint
   - Format: `postgresql://username:password@host:5432/database`

### Production Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Database deployed to Neon/RDS
- [ ] Environment variables configured in all services
- [ ] Database migrations run successfully
- [ ] HTTPS enabled on all services
- [ ] SendGrid configured and tested
- [ ] Payment gateway (VNPay/Momo) working
- [ ] Email notifications sending correctly
- [ ] CDN configured for images
- [ ] Monitoring and logging set up
- [ ] Daily backups configured

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Database Connection Error

**Problem**: `Can't reach database server`

**Solution**:
```bash
# Check PostgreSQL is running
psql -U postgres

# Check connection string in .env
# Verify DATABASE_URL format is correct
# Test connection: psql postgres://user:password@host/db
```

#### 2. Port Already in Use

**Problem**: `Error: listen EADDRINUSE :::3000`

**Solution**:
```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3002 pnpm dev
```

#### 3. Email Not Sending

**Problem**: Emails not received after actions

**Solution**:
```bash
# Check SendGrid configuration
echo $SENDGRID_API_KEY

# Verify sender email is verified in SendGrid
# Check email logs in SendGrid dashboard
# Test with: POST /v1/email/test-send
```

#### 4. Payment Webhook Not Working

**Problem**: Payment status not updating after payment

**Solution**:
```bash
# Verify webhook endpoint is public
# Check ngrok for development: ngrok http 3001

# Update webhook URL in VNPay/Momo dashboard
# Test webhook signature verification
# Check backend logs for webhook errors
```

#### 5. CORS Errors

**Problem**: Frontend can't call backend API

**Solution**:
```bash
# Check CORS_ORIGIN in backend .env
CORS_ORIGIN="http://localhost:3000"

# Verify frontend makes requests to correct API URL
NEXT_PUBLIC_API_URL="http://localhost:3001/v1"

# Restart backend after changing CORS settings
```

#### 6. JWT Token Issues

**Problem**: `Invalid token` or `Token expired`

**Solution**:
```bash
# Generate new JWT secret
openssl rand -base64 32

# Update JWT_SECRET in .env
# Clear browser cookies and localStorage
# Login again to get new token
```

### Debug Mode

```bash
# Enable verbose logging
DEBUG=* pnpm dev

# View full API logs
# Backend: Check console output
# Frontend: Open browser DevTools → Network tab

# Test API endpoints with curl
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3001/v1/users/me

# Inspect database with Prisma Studio
pnpm run db:studio
```

### Performance Optimization

```bash
# Enable caching with Redis
REDIS_URL="redis://localhost:6379"

# Monitor application performance
pnpm run build
npm run start

# Check bundle size
npm run build -- --analyze
```

---

## Useful Commands Reference

```bash
# Development
pnpm dev                    # Start all services
pnpm build                  # Build all packages
pnpm lint                   # Lint all code
pnpm format                 # Format code

# Database
cd apps/api && pnpm run db:migrate        # Create migration
cd apps/api && pnpm run db:seed           # Seed data
cd apps/api && pnpm run db:studio         # Open Prisma Studio
cd apps/api && pnpm run db:reset          # Reset database

# Deployment
vercel deploy --prod        # Deploy frontend to Vercel
npm run build               # Build backend for production

# Monitoring
pnpm test                   # Run tests
pnpm lint                   # Check for linting errors
npm audit                   # Check dependencies for vulnerabilities
```

---

## Support and Resources

- **Documentation**: See `/docs` folder for detailed specifications
- **API Documentation**: `H-api-specification.md`
- **Tech Stack**: `M-tech-stack-decision.md`
- **Project Structure**: `N-project-structure.md`
- **Issues**: GitHub Issues or support@weddingcards.com

---

**Last Updated**: July 2025
**Status**: Production Ready (95% Complete)
**Next Phase**: Analytics and mobile app
