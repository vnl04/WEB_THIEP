import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TemplatesService {
  constructor(private prisma: PrismaService) {}

  async getAllTemplates(query: any) {
    const { category, tier, search, sort, page = 1, limit = 20 } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'approved',
    };

    if (category) where.category = category;
    if (tier) where.tier = tier;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const templates = await this.prisma.template.findMany({
      where,
      skip,
      take: limit,
      orderBy: sort === 'newest' ? { createdAt: 'desc' } : { createdAt: 'desc' },
    });

    const total = await this.prisma.template.count({ where });

    return {
      data: templates,
      meta: { total, page, limit },
    };
  }

  async getTemplate(id: string) {
    return this.prisma.template.findUnique({
      where: { id },
    });
  }
}
