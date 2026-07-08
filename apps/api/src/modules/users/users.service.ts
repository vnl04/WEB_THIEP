import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        phone: true,
        bankAccount: true,
      },
    });
  }

  async updateProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        phone: true,
      },
    });
  }

  async updateBankAccount(userId: string, data: any) {
    // Upsert bank account (create if doesn't exist, update if does)
    return this.prisma.bankAccount.upsert({
      where: { userId },
      create: {
        userId,
        ...data,
      },
      update: {
        ...data,
      },
    });
  }

  async getBankAccount(userId: string) {
    return this.prisma.bankAccount.findUnique({
      where: { userId },
    });
  }
}
