import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async initializePayment(userId: string, amount: number, provider: string) {
    return this.prisma.payment.create({
      data: {
        userId,
        amount,
        provider,
        status: 'pending',
      },
    });
  }

  async confirmPayment(paymentId: string, transactionId: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'completed',
        transactionId,
        completedAt: new Date(),
      },
    });
  }

  async getPaymentHistory(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
