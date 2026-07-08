import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WithdrawalsService {
  constructor(private prisma: PrismaService) {}

  async createWithdrawal(userId: string, amount: number, bankAccountId: string) {
    // Check if bank account exists
    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id: bankAccountId },
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    if (bankAccount.userId !== userId) {
      throw new BadRequestException('Bank account does not belong to user');
    }

    // Create withdrawal request
    return this.prisma.withdrawal.create({
      data: {
        userId,
        amount,
        bankAccountId,
        status: 'pending',
      },
    });
  }

  async getWithdrawalHistory(userId: string) {
    return this.prisma.withdrawal.findMany({
      where: { userId },
      include: { bankAccount: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getWithdrawal(withdrawalId: string) {
    return this.prisma.withdrawal.findUnique({
      where: { id: withdrawalId },
      include: { bankAccount: true },
    });
  }

  async approveWithdrawal(withdrawalId: string) {
    return this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'processing',
      },
    });
  }

  async completeWithdrawal(withdrawalId: string) {
    return this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'completed',
        processedAt: new Date(),
      },
    });
  }

  async rejectWithdrawal(withdrawalId: string, reason: string) {
    return this.prisma.withdrawal.update({
      where: { id: withdrawalId },
      data: {
        status: 'rejected',
        rejectionReason: reason,
      },
    });
  }

  // Admin functions
  async getAllWithdrawals(status?: string) {
    const where = status ? { status } : {};
    return this.prisma.withdrawal.findMany({
      where,
      include: {
        user: {
          select: { id: true, email: true, name: true },
        },
        bankAccount: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingWithdrawals() {
    return this.getAllWithdrawals('pending');
  }
}
