-- CreateEnum for Role
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateEnum for GuestStatus
CREATE TYPE "GuestStatus" AS ENUM ('invited', 'no_response', 'attending', 'not_attending');

-- CreateEnum for WishStatus  
CREATE TYPE "WishStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum for PaymentStatus
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'confirmed', 'failed');

-- CreateTable User
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "googleId" TEXT UNIQUE,
    "facebookId" TEXT UNIQUE,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- CreateTable Card
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "brideNames" TEXT NOT NULL,
    "groomNames" TEXT NOT NULL,
    "weddingDate" TIMESTAMP NOT NULL,
    "location" TEXT,
    "bannerImage" TEXT,
    "content" JSONB NOT NULL DEFAULT '{"blocks": []}',
    "layout" TEXT DEFAULT 'default',
    "theme" JSONB DEFAULT '{"colors": {}, "fonts": {}}',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP,
    "shareUrl" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT DEFAULT 'draft',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("templateId") REFERENCES "Template"("id")
);

-- CreateTable Template
CREATE TABLE "Template" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "thumbnail" TEXT,
    "preview" TEXT,
    "content" JSONB NOT NULL DEFAULT '{"blocks": []}',
    "tier" TEXT DEFAULT 'free',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- CreateTable Guest
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "inviteToken" TEXT UNIQUE,
    "inviteSent" TIMESTAMP,
    "status" "GuestStatus" NOT NULL DEFAULT 'invited',
    "rsvpStatus" TEXT,
    "rsvpAt" TIMESTAMP,
    "guestCount" INTEGER DEFAULT 1,
    "dietaryRequirements" TEXT,
    "notes" TEXT,
    "viewedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id")
);

-- CreateTable Wish
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "guestName" TEXT NOT NULL,
    "guestEmail" TEXT,
    "content" TEXT NOT NULL,
    "status" "WishStatus" NOT NULL DEFAULT 'pending',
    "approvedAt" TIMESTAMP,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE,
    FOREIGN KEY ("approvedBy") REFERENCES "User"("id")
);

-- CreateTable Gift
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "donorId" TEXT,
    "amount" FLOAT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT UNIQUE,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "message" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE,
    FOREIGN KEY ("donorId") REFERENCES "User"("id")
);

-- CreateTable Media
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cardId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "position" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE
);

-- CreateTable Plan
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tier" TEXT NOT NULL UNIQUE,
    "price" FLOAT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "duration" INTEGER NOT NULL DEFAULT 30,
    "features" JSONB NOT NULL DEFAULT '[]',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- CreateTable Subscription
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP,
    "autoRenew" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE,
    FOREIGN KEY ("planId") REFERENCES "Plan"("id")
);

-- CreateTable Payment
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardId" TEXT,
    "amount" FLOAT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'VND',
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT UNIQUE,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "referenceCode" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    FOREIGN KEY ("cardId") REFERENCES "Card"("id")
);

-- CreateIndex
CREATE INDEX "Card_userId_idx" ON "Card"("userId");
CREATE INDEX "Card_templateId_idx" ON "Card"("templateId");
CREATE INDEX "Card_published_idx" ON "Card"("published");
CREATE INDEX "Card_slug_idx" ON "Card"("slug");
CREATE INDEX "Guest_cardId_idx" ON "Guest"("cardId");
CREATE INDEX "Guest_userId_idx" ON "Guest"("userId");
CREATE INDEX "Guest_inviteToken_idx" ON "Guest"("inviteToken");
CREATE INDEX "Wish_cardId_idx" ON "Wish"("cardId");
CREATE INDEX "Wish_status_idx" ON "Wish"("status");
CREATE INDEX "Gift_cardId_idx" ON "Gift"("cardId");
CREATE INDEX "Gift_donorId_idx" ON "Gift"("donorId");
CREATE INDEX "Media_cardId_idx" ON "Media"("cardId");
CREATE INDEX "Subscription_userId_idx" ON "Subscription"("userId");
CREATE INDEX "Subscription_cardId_idx" ON "Subscription"("cardId");
CREATE INDEX "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX "Payment_transactionId_idx" ON "Payment"("transactionId");
