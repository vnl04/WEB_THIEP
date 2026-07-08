import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async uploadMedia(cardId: string, data: any) {
    return this.prisma.media.create({
      data: {
        cardId,
        ...data,
      },
    });
  }

  async getCardMedia(cardId: string) {
    return this.prisma.media.findMany({
      where: { cardId },
      orderBy: { order: 'asc' },
    });
  }
}
