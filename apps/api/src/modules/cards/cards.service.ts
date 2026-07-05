import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async createCard(userId: string, templateId: string, data: any) {
    return this.prisma.card.create({
      data: {
        userId,
        templateId,
        name: data.name || 'Untitled Card',
        content: {},
        ...data,
      },
    });
  }

  async getMyCards(userId: string) {
    return this.prisma.card.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCard(id: string) {
    return this.prisma.card.findUnique({
      where: { id },
      include: {
        media: true,
        guests: true,
        wishes: { where: { status: 'approved' } },
      },
    });
  }

  async updateCard(id: string, data: any) {
    return this.prisma.card.update({
      where: { id },
      data,
    });
  }

  async publishCard(id: string) {
    return this.prisma.card.update({
      where: { id },
      data: {
        published: true,
        publishedAt: new Date(),
      },
    });
  }
}
