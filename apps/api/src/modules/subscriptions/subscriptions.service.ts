import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(userId: string, cardId: string, planId: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id: planId },
    });

    const endDate = plan?.duration ? new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000) : null;

    return this.prisma.subscription.create({
      data: {
        userId,
        cardId,
        planId,
        endDate,
      },
    });
  }

  async getCardSubscription(cardId: string) {
    return this.prisma.subscription.findFirst({
      where: { cardId, status: 'active' },
      include: { plan: true },
    });
  }

  async getAllPlans() {
    return this.prisma.plan.findMany();
  }
}
