import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const templateBlocks = [
  {
    id: 'block-cover',
    type: 'cover',
    config: { title: 'Our Wedding', subtitle: 'Celebrating Our Love' },
  },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Create subscription plans
  const plans = [
    {
      id: 'plan-free',
      name: 'free',
      displayName: 'Free Plan',
      price: 0,
      duration: 0,
      features: {
        maxCards: 1,
        maxGuests: 50,
        basicTemplates: true,
        premiumTemplates: false,
        customDomain: false,
        analytics: false,
      },
    },
    {
      id: 'plan-basic',
      name: 'basic',
      displayName: 'Basic Plan',
      price: 99000,
      duration: 30,
      features: {
        maxCards: 5,
        maxGuests: 200,
        basicTemplates: true,
        premiumTemplates: true,
        customDomain: false,
        analytics: false,
      },
    },
    {
      id: 'plan-premium',
      name: 'premium',
      displayName: 'Premium Plan',
      price: 299000,
      duration: 30,
      features: {
        maxCards: 99,
        maxGuests: 99999,
        basicTemplates: true,
        premiumTemplates: true,
        customDomain: true,
        analytics: true,
      },
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: { price: plan.price },
      create: plan,
    });
  }

  console.log(`✅ Created ${plans.length} subscription plans`);

  const templates = [
    {
      id: 'template-1',
      name: 'Cổ điển sang trọng',
      description: 'Thiết kế truyền thống, thanh lịch',
      category: 'traditional',
      tier: 'free',
      thumbnail: 'https://via.placeholder.com/300x400?text=Classic',
      preview: 'https://via.placeholder.com/600x800?text=Classic',
      blocks: templateBlocks,
      status: 'approved',
    },
    {
      id: 'template-2',
      name: 'Hiện đại tối giản',
      description: 'Phong cách tối giản, hiện đại',
      category: 'modern',
      tier: 'free',
      thumbnail: 'https://via.placeholder.com/300x400?text=Modern',
      preview: 'https://via.placeholder.com/600x800?text=Modern',
      blocks: templateBlocks,
      status: 'approved',
    },
    {
      id: 'template-3',
      name: 'Lãng mạn hồng',
      description: 'Tông màu hồng lãng mạn',
      category: 'romantic',
      tier: 'basic',
      thumbnail: 'https://via.placeholder.com/300x400?text=Romantic',
      preview: 'https://via.placeholder.com/600x800?text=Romantic',
      blocks: templateBlocks,
      status: 'approved',
    },
    {
      id: 'template-4',
      name: 'Vintage quý phái',
      description: 'Phong cách vintage sang trọng',
      category: 'vintage',
      tier: 'premium',
      thumbnail: 'https://via.placeholder.com/300x400?text=Vintage',
      preview: 'https://via.placeholder.com/600x800?text=Vintage',
      blocks: templateBlocks,
      status: 'approved',
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: { status: 'approved' },
      create: template,
    });
  }

  console.log(`✅ Created ${templates.length} templates`);

  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@weddingcard.vn' },
    update: {},
    create: {
      email: 'admin@weddingcard.vn',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user: admin@weddingcard.vn / password123');

  // Create demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@weddingcard.vn' },
    update: {},
    create: {
      email: 'demo@weddingcard.vn',
      name: 'Demo User',
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Created demo user: demo@weddingcard.vn / password123');

  // Create demo bank account
  await prisma.bankAccount.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
      accountNumber: '1234567890',
      accountHolder: 'Demo User',
      bankCode: 'VCB',
      accountType: 'Savings',
    },
  });

  console.log('✅ Created demo bank account');

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
