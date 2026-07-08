# Module Expansion Guide

This guide explains each backend module and how to extend them with new features.

## Module Structure

Each module follows this pattern:

```
modules/
  ├── MODULE_NAME/
  │   ├── MODULE_NAME.module.ts        # Dependency injection
  │   ├── MODULE_NAME.service.ts       # Business logic
  │   ├── MODULE_NAME.controller.ts    # HTTP handlers
  │   ├── dto/
  │   │   └── index.ts                 # Data transfer objects
  │   └── entities/
  │       └── MODULE_NAME.entity.ts    # (optional) Type definitions
```

## Core Modules

### 1. Auth Module
**Purpose**: User authentication and JWT token management

**Current Features**:
- `register(dto)` - Create new user account
- `login(dto)` - Authenticate and get token
- `validateJwt(payload)` - Validate JWT token

**Location**: `apps/api/src/modules/auth/`

**How to Extend**:
```typescript
// Add OAuth login
async loginGoogle(profile: GoogleProfile) {
  let user = await this.prisma.user.findUnique({
    where: { googleId: profile.id }
  });
  
  if (!user) {
    user = await this.prisma.user.create({
      data: {
        email: profile.email,
        name: profile.displayName,
        googleId: profile.id,
        password: 'oauth-no-password'
      }
    });
  }
  
  const token = this.jwtService.sign({ sub: user.id });
  return { user, token };
}

// Add refresh token
async refreshToken(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId }
  });
  const newToken = this.jwtService.sign({ sub: user.id });
  return { token: newToken };
}
```

### 2. Users Module
**Purpose**: User profile management

**Current Features**:
- `getProfile(userId)` - Get user details
- `updateProfile(userId, data)` - Update name, avatar, phone

**Location**: `apps/api/src/modules/users/`

**How to Extend**:
```typescript
// Add bank account management
async addBankAccount(userId: string, data: {
  accountNumber: string;
  accountHolder: string;
  bankCode: string;
}) {
  return this.prisma.bankAccount.create({
    data: { userId, ...data }
  });
}

// Add user preferences
async updatePreferences(userId: string, preferences: {
  language: string;
  notifications: boolean;
  theme: 'light' | 'dark';
}) {
  // Update user with jsonb field for preferences
}
```

### 3. Templates Module
**Purpose**: Wedding card templates library

**Current Features**:
- `getAllTemplates(query)` - List with filtering, search, pagination
- `getTemplate(id)` - Get template details

**Location**: `apps/api/src/modules/templates/`

**Existing Templates**:
1. Classic Elegance (Free) - Traditional design
2. Modern Minimal (Basic) - Minimalist design

**How to Extend**:
```typescript
// Add 3 more templates
async seedTemplates() {
  const templates = [
    {
      name: 'Luxury Gold',
      category: 'premium',
      tier: 'premium',
      description: '...'
    },
    {
      name: 'Bohemian Vibes',
      category: 'modern',
      tier: 'basic',
      description: '...'
    },
    {
      name: 'Garden Romance',
      category: 'traditional',
      tier: 'basic',
      description: '...'
    }
  ];
  
  for (const template of templates) {
    await this.prisma.template.create({ data: template });
  }
}

// Add template search with full-text search
async searchTemplates(query: string) {
  return this.prisma.template.findMany({
    where: {
      OR: [
        { name: { search: query } },
        { description: { search: query } }
      ]
    }
  });
}
```

### 4. Cards Module
**Purpose**: Wedding card CRUD operations

**Current Features**:
- `createCard(userId, templateId, data)` - Create from template
- `getMyCards(userId)` - User's cards list
- `getCard(id)` - Card details with media/guests/wishes
- `updateCard(id, data)` - Auto-save updates
- `publishCard(id)` - Publish with slug

**Location**: `apps/api/src/modules/cards/`

**How to Extend**:
```typescript
// Add card cloning
async cloneCard(cardId: string, userId: string) {
  const original = await this.prisma.card.findUnique({
    where: { id: cardId },
    include: { media: true }
  });
  
  const cloned = await this.prisma.card.create({
    data: {
      userId,
      templateId: original.templateId,
      name: `${original.name} (Copy)`,
      content: original.content,
      design: original.design
    }
  });
  
  return cloned;
}

// Add bulk export
async exportCards(userId: string) {
  const cards = await this.prisma.card.findMany({
    where: { userId },
    include: { guests: true, wishes: true, gifts: true }
  });
  
  // Create ZIP with JSON data for each card
  return { downloadUrl: '...' };
}

// Add card duplicate detection
async checkDuplicate(slug: string) {
  return this.prisma.card.findUnique({ where: { slug } });
}
```

### 5. Media Module
**Purpose**: Handle image, video, music uploads

**Current Features**:
- `uploadMedia(cardId, data)` - Store media metadata
- `getCardMedia(cardId)` - List media for card

**Location**: `apps/api/src/modules/media/`

**How to Extend**:
```typescript
// Add Cloudinary integration
async uploadToCloudinary(file: Express.Multer.File) {
  const cloudinary = await this.cloudinaryService.upload(file);
  
  return this.prisma.media.create({
    data: {
      type: this.getMediaType(file.mimetype),
      url: cloudinary.secure_url,
      cloudinaryId: cloudinary.public_id,
      cardId: cardId
    }
  });
}

// Add presigned URL generation
async getPresignedUrl(cardId: string, mediaType: string) {
  const presignedUrl = await this.cloudinaryService.getPresignedUrl();
  return { presignedUrl, uploadToken: '...' };
}

// Add media compression
async compressMedia(mediaId: string) {
  const job = await this.queueService.add('compress-media', {
    mediaId
  });
  return job;
}

// Add image optimization
async optimizeImage(url: string) {
  // Resize, optimize quality, convert to WebP
  return optimizedUrl;
}
```

### 6. Guests Module
**Purpose**: Guest list management and tracking

**Current Features**:
- `addGuest(cardId, userId, data)` - Add single guest
- `getCardGuests(cardId)` - List all guests
- `trackGuestView(guestId)` - Record when guest opens card
- `submitRsvp(guestId, status, count)` - Record RSVP

**Location**: `apps/api/src/modules/guests/`

**How to Extend**:
```typescript
// Add bulk import from CSV
async importGuestsFromCSV(cardId: string, csvFile: Buffer) {
  const rows = parseCSV(csvFile);
  
  const guests = await Promise.all(
    rows.map(row =>
      this.prisma.guest.create({
        data: {
          cardId,
          name: row.name,
          email: row.email,
          phone: row.phone,
          inviteToken: uuid(),
          userId: userId // Set by owner
        }
      })
    )
  );
  
  return guests;
}

// Add bulk invite sending
async sendBulkInvites(cardId: string) {
  const guests = await this.prisma.guest.findMany({
    where: { cardId, sentAt: null }
  });
  
  for (const guest of guests) {
    await this.emailService.sendInvite({
      email: guest.email,
      name: guest.name,
      inviteToken: guest.inviteToken
    });
    
    await this.prisma.guest.update({
      where: { id: guest.id },
      data: { sentAt: new Date() }
    });
  }
}

// Add guest groups
async createGuestGroup(cardId: string, data: {
  name: string;
  guestIds: string[];
}) {
  return this.prisma.guestGroup.create({
    data: {
      cardId,
      name: data.name,
      guests: { connect: data.guestIds.map(id => ({ id })) }
    }
  });
}

// Add RSVP reminders
async sendRsvpReminders(cardId: string) {
  const pendingGuests = await this.prisma.guest.findMany({
    where: { cardId, rsvpStatus: null, viewedAt: { not: null } }
  });
  
  for (const guest of pendingGuests) {
    await this.emailService.sendRsvpReminder(guest);
  }
}
```

### 7. Wishes Module
**Purpose**: Wishes/messages from guests

**Current Features**:
- `addWish(cardId, authorId, content)` - Submit wish
- `getCardWishes(cardId, approved)` - List wishes
- `approveWish(wishId)` - Approve pending wish
- `hideWish(wishId)` - Hide inappropriate wish

**Location**: `apps/api/src/modules/wishes/`

**How to Extend**:
```typescript
// Add AI moderation
async addWishWithModeration(cardId: string, authorId: string, content: string) {
  // Check content with OpenAI
  const isApproved = await this.aiModerationService.check(content);
  
  return this.prisma.wish.create({
    data: {
      cardId,
      authorId,
      content,
      status: isApproved ? 'approved' : 'pending'
    }
  });
}

// Add wish pinning/featuring
async pinWish(wishId: string, pin: boolean) {
  return this.prisma.wish.update({
    where: { id: wishId },
    data: { pinned: pin }
  });
}

// Add wish reporting
async reportWish(wishId: string, reason: string) {
  return this.prisma.report.create({
    data: {
      wishId,
      reason,
      description: ''
    }
  });
}

// Add wish reactions (likes)
async addWishReaction(wishId: string, userId: string) {
  return this.prisma.wishReaction.create({
    data: { wishId, userId }
  });
}

// Add wish templates/suggestions
async getSuggestedWishes(cardId: string) {
  return [
    'Congratulations on your special day!',
    'Wishing you a lifetime of happiness together',
    'May your love story continue to inspire us all',
    '...'
  ];
}
```

### 8. Gifts Module
**Purpose**: Gift/donation tracking

**Current Features**:
- `recordGift(cardId, data)` - Record gift from guest
- `getCardGifts(cardId)` - List confirmed gifts
- `getTotalGifts(cardId)` - Sum total amount

**Location**: `apps/api/src/modules/gifts/`

**How to Extend**:
```typescript
// Add virtual gifts/animation
async addVirtualGift(cardId: string, data: {
  type: 'flower' | 'cake' | 'ring' | 'heart';
  message: string;
  donorName: string;
}) {
  return this.prisma.gift.create({
    data: {
      cardId,
      amount: 0, // Virtual gift
      paymentMethod: 'virtual',
      message: data.message
    }
  });
}

// Add gift message display
async getGiftMessages(cardId: string) {
  return this.prisma.gift.findMany({
    where: { cardId, status: 'confirmed' },
    select: { donorName: true, message: true, amount: true }
  });
}

// Add gift analytics
async getGiftStats(cardId: string) {
  const stats = await this.prisma.gift.aggregate({
    where: { cardId, status: 'confirmed' },
    _sum: { amount: true },
    _count: true,
    _avg: { amount: true }
  });
  
  return {
    totalAmount: stats._sum.amount,
    totalCount: stats._count,
    averageGift: stats._avg.amount
  };
}

// Add gift withdrawal
async requestWithdrawal(userId: string, amount: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    include: { bankAccount: true }
  });
  
  if (!user.bankAccount) {
    throw new BadRequestException('Bank account not configured');
  }
  
  return this.prisma.withdrawal.create({
    data: {
      userId,
      amount,
      bankAccountId: user.bankAccount.id,
      status: 'pending'
    }
  });
}
```

### 9. Payments Module
**Purpose**: Payment processing

**Current Features**:
- `initializePayment(userId, amount, provider)` - Create payment intent
- `confirmPayment(paymentId, transactionId)` - Mark as paid
- `getPaymentHistory(userId)` - User's payments

**Location**: `apps/api/src/modules/payments/`

**How to Extend**:
```typescript
// Add VNPay integration
async createVNPayPayment(userId: string, amount: number) {
  const vnpay = new VNPayClient();
  
  const paymentUrl = vnpay.buildPaymentUrl({
    amount,
    orderId: `CARD_${Date.now()}`,
    returnUrl: `${process.env.APP_URL}/payments/callback`
  });
  
  const payment = await this.prisma.payment.create({
    data: {
      userId,
      amount,
      provider: 'vnpay',
      status: 'pending'
    }
  });
  
  return { paymentUrl, paymentId: payment.id };
}

// Add Momo integration
async createMomoPayment(userId: string, amount: number) {
  const momo = new MomoClient();
  
  const result = await momo.createPayment({
    amount,
    orderId: `CARD_${Date.now()}`,
    returnUrl: `${process.env.APP_URL}/payments/callback`
  });
  
  return { paymentUrl: result.payUrl };
}

// Add webhook handler
async handlePaymentWebhook(provider: string, data: any) {
  if (provider === 'vnpay') {
    const isValid = VNPay.verifySignature(data);
    if (isValid) {
      const payment = await this.prisma.payment.findUnique({
        where: { transactionId: data.transactionId }
      });
      
      if (data.status === '00') {
        await this.confirmPayment(payment.id, data.transactionId);
      }
    }
  }
}

// Add refund support
async refundPayment(paymentId: string) {
  const payment = await this.prisma.payment.findUnique({
    where: { id: paymentId }
  });
  
  if (payment.provider === 'vnpay') {
    // Call VNPay refund API
  }
  
  return this.prisma.payment.update({
    where: { id: paymentId },
    data: { status: 'refunded' }
  });
}
```

### 10. Subscriptions Module
**Purpose**: Plan management and subscriptions

**Current Features**:
- `createSubscription(userId, cardId, planId)` - Subscribe to plan
- `getCardSubscription(cardId)` - Current subscription
- `getAllPlans()` - List available plans

**Location**: `apps/api/src/modules/subscriptions/`

**How to Extend**:
```typescript
// Add plan upgrades
async upgradePlan(cardId: string, newPlanId: string) {
  const currentSub = await this.prisma.subscription.findFirst({
    where: { cardId }
  });
  
  const newPlan = await this.prisma.plan.findUnique({
    where: { id: newPlanId }
  });
  
  // Prorate pricing
  const prorationCredit = this.calculateProration(currentSub, newPlan);
  
  return this.prisma.subscription.update({
    where: { id: currentSub.id },
    data: {
      planId: newPlanId,
      endDate: addDays(new Date(), newPlan.duration)
    }
  });
}

// Add automatic renewal
async autoRenewExpiredSubscriptions() {
  const expiredSubs = await this.prisma.subscription.findMany({
    where: {
      endDate: { lte: new Date() },
      status: 'active'
    },
    include: { plan: true, user: true }
  });
  
  for (const sub of expiredSubs) {
    // Charge payment
    // If successful, extend endDate
  }
}

// Add trial period
async createTrialSubscription(userId: string, cardId: string) {
  const trialPlan = await this.prisma.plan.findFirst({
    where: { name: 'premium', isTrial: true }
  });
  
  return this.prisma.subscription.create({
    data: {
      userId,
      cardId,
      planId: trialPlan.id,
      status: 'active',
      endDate: addDays(new Date(), 7) // 7 day trial
    }
  });
}

// Add subscription management
async cancelSubscription(subscriptionId: string) {
  return this.prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: 'canceled',
      endDate: new Date()
    }
  });
}
```

## Database-Only Modules (Ready to Implement)

### Support Module
```typescript
// apps/api/src/modules/support/support.service.ts
async createTicket(userId: string, data: {
  subject: string;
  message: string;
  category: string;
}) {
  return this.prisma.supportTicket.create({
    data: {
      userId,
      ...data,
      status: 'open'
    }
  });
}
```

### Notifications Module
```typescript
// apps/api/src/modules/notifications/notifications.service.ts
async sendNotification(userId: string, type: string, data: any) {
  return this.prisma.notification.create({
    data: {
      userId,
      type,
      content: data
    }
  });
}
```

### Admin Module
```typescript
// apps/api/src/modules/admin/admin.service.ts
async getAllUsers(limit: number, offset: number) {
  return this.prisma.user.findMany({
    take: limit,
    skip: offset,
    select: { id: true, email: true, name: true, role: true }
  });
}
```

## Adding a New Module

### Step 1: Create Module Structure
```bash
mkdir apps/api/src/modules/NEW_MODULE
touch apps/api/src/modules/NEW_MODULE/new-module.module.ts
touch apps/api/src/modules/NEW_MODULE/new-module.service.ts
touch apps/api/src/modules/NEW_MODULE/new-module.controller.ts
mkdir apps/api/src/modules/NEW_MODULE/dto
```

### Step 2: Create Service
```typescript
// new-module.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NewModuleService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.MODEL_NAME.create({ data });
  }

  async findAll() {
    return this.prisma.MODEL_NAME.findMany();
  }
}
```

### Step 3: Create Controller
```typescript
// new-module.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewModuleService } from './new-module.service';

@Controller('v1/resource')
export class NewModuleController {
  constructor(private service: NewModuleService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }
}
```

### Step 4: Create Module
```typescript
// new-module.module.ts
import { Module } from '@nestjs/common';
import { NewModuleService } from './new-module.service';
import { NewModuleController } from './new-module.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NewModuleController],
  providers: [NewModuleService],
  exports: [NewModuleService],
})
export class NewModuleModule {}
```

### Step 5: Register in AppModule
```typescript
// app.module.ts
import { NewModuleModule } from './modules/new-module/new-module.module';

@Module({
  imports: [
    // ... existing imports
    NewModuleModule,
  ],
})
export class AppModule {}
```

## Testing a Module

```typescript
// new-module.service.spec.ts
describe('NewModuleService', () => {
  let service: NewModuleService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [NewModuleService, PrismaService]
    }).compile();

    service = module.get<NewModuleService>(NewModuleService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });
});
```

## Key Patterns to Follow

1. **Dependency Injection**: Always inject services in constructor
2. **Prisma First**: Use Prisma for all database operations
3. **Error Handling**: Throw proper HTTP exceptions
4. **Authorization**: Check user ownership before operations
5. **Validation**: Use DTOs and class-validator
6. **Pagination**: Support limit/offset on list endpoints
7. **Caching**: Use Prisma's built-in caching
8. **Types**: Always use TypeScript types

## Common Extension Points

| Feature | Module | Method |
|---------|--------|--------|
| OAuth Login | Auth | Add Passport strategies |
| Email Notifications | Any | Call emailService |
| SMS Notifications | Guests | Call smsService |
| Cloud Storage | Media | Use Cloudinary/AWS S3 |
| Payment Gateway | Payments | Add webhook handlers |
| Analytics | Cards | Track events |
| Search | Templates | Use Elasticsearch |
| Caching | Any | Add Redis layer |

This guide provides a foundation for extending each module with real-world features!
