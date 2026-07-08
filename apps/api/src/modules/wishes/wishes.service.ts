import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WishesService {
  constructor(private prisma: PrismaService) {}

  async addWish(cardId: string, authorId: string, content: string) {
    return this.prisma.wish.create({
      data: {
        cardId,
        authorId,
        content,
        status: 'pending',
      },
    });
  }

  async getCardWishes(cardId: string, approved = true) {
    return this.prisma.wish.findMany({
      where: {
        cardId,
        status: approved ? 'approved' : 'pending',
        hidden: false,
      },
      orderBy: { pinned: 'desc' },
    });
  }

  async approveWish(wishId: string) {
    return this.prisma.wish.update({
      where: { id: wishId },
      data: { status: 'approved' },
    });
  }

  async hideWish(wishId: string) {
    return this.prisma.wish.update({
      where: { id: wishId },
      data: { hidden: true },
    });
  }
}
