import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GiftsService {
  constructor(private prisma: PrismaService) {}

  async recordGift(cardId: string, data: any) {
    return this.prisma.gift.create({
      data: {
        cardId,
        ...data,
      },
    });
  }

  async getCardGifts(cardId: string) {
    return this.prisma.gift.findMany({
      where: { cardId, status: 'confirmed' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTotalGifts(cardId: string) {
    const result = await this.prisma.gift.aggregate({
      where: { cardId, status: 'confirmed' },
      _sum: { amount: true },
    });
    return result._sum.amount || 0;
  }
}
