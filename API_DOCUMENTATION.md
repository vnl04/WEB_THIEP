# Wedding Card Platform - API Documentation

## Overview
This is the NestJS backend API for the Wedding Card Platform. The API provides endpoints for authentication, card management, RSVP tracking, gift management, and admin functions.

## Base URL
- Development: `http://localhost:3001`
- Production: Configured via environment variables

## Authentication
All protected endpoints require a JWT bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Modules

### 1. Auth Module (`/v1/auth`)
Authentication endpoints for user registration and login.

**Endpoints:**
- `POST /register` - Register new user
- `POST /login` - Login and get JWT token

### 2. Users Module (`/v1/users`)
User profile management.

**Endpoints:**
- `GET /me` - Get current user profile (requires auth)
- `PATCH /me` - Update profile (requires auth)
- `POST /bank-account` - Add/update bank account (requires auth)

### 3. Templates Module (`/v1/templates`)
Wedding card templates for users to choose from.

**Endpoints:**
- `GET /` - List all templates with filters
- `GET /:id` - Get template details

**Query Parameters:**
- `category` - Filter by category (traditional, modern, romantic, vintage)
- `tier` - Filter by tier (free, basic, premium)
- `search` - Search by name/description
- `sort` - Sort by (newest, popular)
- `page` - Pagination page (default: 1)
- `limit` - Items per page (default: 20)

### 4. Cards Module (`/v1/cards`)
Wedding cards created by users.

**Endpoints:**
- `POST /` - Create new card (requires auth)
- `GET /` - Get user's cards (requires auth)
- `GET /:id` - Get card details
- `PATCH /:id` - Update card (requires auth)
- `POST /:id/publish` - Publish card (requires auth)

### 5. Media Module (`/v1/cards/:cardId/media`)
Media files (images, videos, music) for cards.

**Endpoints:**
- `POST /` - Upload media (requires auth)
- `GET /` - Get card media

### 6. Guests Module (`/v1/cards/:cardId/guests`)
Guest list and RSVP management.

**Endpoints:**
- `POST /` - Add guest (requires auth)
- `GET /` - Get guest list

**Tracking Endpoints (`/v1/guests`):**
- `POST /:guestId/track-view` - Track guest view
- `POST /:guestId/rsvp` - Submit RSVP response

### 7. Wishes Module (`/v1/cards/:cardId/wishes`)
Wishes/messages from guests.

**Endpoints:**
- `POST /` - Add wish
- `GET /` - Get wishes with filters

**Moderation Endpoints (`/v1/wishes`):**
- `PATCH /:wishId/approve` - Approve wish (requires auth)
- `PATCH /:wishId/hide` - Hide wish (requires auth)

### 8. Gifts Module (`/v1/cards/:cardId/gifts`)
Gift tracking and contributions.

**Endpoints:**
- `POST /` - Record gift
- `GET /` - Get gifts
- `GET /total` - Get total gifts amount

### 9. Payments Module (`/v1/payments`)
Payment processing for subscriptions.

**Endpoints:**
- `POST /checkout` - Initialize payment (requires auth)
- `GET /` - Get payment history (requires auth)

**Webhook Endpoints:**
- `POST /webhook/vnpay` - VNPay callback
- `POST /webhook/momo` - Momo callback
- `POST /webhook/gift` - Gift payment callback

### 10. Subscriptions Module (`/v1`)
Subscription management.

**Endpoints:**
- `POST /subscriptions` - Create subscription (requires auth)
- `GET /plans` - Get available plans
- `GET /cards/:cardId/subscription` - Get card subscription

### 11. Withdrawals Module (`/v1/withdrawals`)
Gift withdrawal requests.

**Endpoints:**
- `POST /` - Create withdrawal request (requires auth)
- `GET /` - Get withdrawal history (requires auth)
- `GET /:id` - Get withdrawal details (requires auth)

**Admin Endpoints (`/v1/admin/withdrawals`):**
- `GET /` - Get all withdrawals (requires admin)
- `GET /pending` - Get pending withdrawals (requires admin)
- `PATCH /:id/approve` - Approve withdrawal (requires admin)
- `PATCH /:id/complete` - Complete withdrawal (requires admin)
- `PATCH /:id/reject` - Reject withdrawal (requires admin)

### 12. Admin Module (`/v1/admin`)
Administrative functions (requires admin role).

**Dashboard Endpoints:**
- `GET /stats` - Get platform statistics

**User Management:**
- `GET /users` - List all users
- `GET /users/:userId` - Get user details and stats

**Template Management:**
- `GET /templates` - List all templates
- `PATCH /templates/:templateId/approve` - Approve template
- `PATCH /templates/:templateId/reject` - Reject template

**Wish Moderation:**
- `GET /wishes` - List wishes (with status filter)
- `PATCH /wishes/:wishId/approve` - Approve wish
- `PATCH /wishes/:wishId/reject` - Reject wish

**Report Management:**
- `GET /reports` - Get reports
- `PATCH /reports/:reportId/resolve` - Resolve report

**Payment & Gift Analytics:**
- `GET /payments` - List payments
- `GET /payments/stats` - Payment statistics
- `GET /gifts/stats` - Gift statistics

## Error Handling

The API returns standard HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Internal Server Error` - Server error

Error responses follow this format:
```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/v1/cards",
  "method": "POST",
  "message": "Invalid input"
}
```

## Data Transfer Objects (DTOs)

### Auth DTOs
- `RegisterDto` - email, password, name
- `LoginDto` - email, password

### Card DTOs
- `CreateCardDto` - templateId, name, brideName, groomName, weddingDate, story, content, design, ogTags
- `UpdateCardDto` - Any of the above fields (all optional)

### Guest DTOs
- `CreateGuestDto` - name, email, phone
- `SubmitRsvpDto` - status (attending/not-attending/pending), count

### Wish DTOs
- `CreateWishDto` - content, authorId
- `ReportWishDto` - reason, description

### Gift DTOs
- `CreateGiftDto` - amount, currency, paymentMethod, message, donorId, transactionId
- `ConfirmGiftDto` - transactionId

### Payment DTOs
- `InitializePaymentDto` - amount, provider, orderId, description, bankCode

### Withdrawal DTOs
- `CreateWithdrawalDto` - amount, bankAccountId
- `RejectWithdrawalDto` - reason

## Development

### Running the API
```bash
npm run dev
```

### Database Migration
```bash
npm run db:migrate
```

### Database Seed
```bash
npm run db:seed
```

### API Documentation
Swagger documentation available at `http://localhost:3001/api/docs`

## Environment Variables
See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret (min 32 chars)
- `CORS_ORIGIN` - CORS allowed origins
- `SENDGRID_API_KEY` - Email service API key
- `VNPAY_*` - VNPay payment gateway credentials
- `MOMO_*` - Momo payment gateway credentials
