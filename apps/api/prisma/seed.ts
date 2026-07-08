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
  await prisma.user.upsert({
    where: { email: 'demo@weddingcard.vn' },
    update: {},
    create: {
      email: 'demo@weddingcard.vn',
      name: 'Demo User',
      password: hashedPassword,
    },
  });

  console.log('✅ Created demo user: demo@weddingcard.vn / password123');
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
