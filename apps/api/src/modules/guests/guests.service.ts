import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GuestsService {
  constructor(private prisma: PrismaService) {}

  async addGuest(cardId: string, userId: string, data: any) {
    return this.prisma.guest.create({
      data: {
        cardId,
        userId,
        inviteToken: uuid(),
        ...data,
      },
    });
  }

  async getCardGuests(cardId: string) {
    return this.prisma.guest.findMany({
      where: { cardId },
    });
  }

  async trackGuestView(guestId: string) {
    return this.prisma.guest.update({
      where: { id: guestId },
      data: { viewedAt: new Date() },
    });
  }

  async submitRsvp(guestId: string, status: string, count: number) {
    return this.prisma.guest.update({
      where: { id: guestId },
      data: {
        rsvpStatus: status,
        rsvpCount: count,
        rsvpAt: new Date(),
      },
    });
  }
}
