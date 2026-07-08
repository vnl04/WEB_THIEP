import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  private checkAdminRole(user: any) {
    if (user.role !== 'ADMIN' && user.role !== 'MODERATOR') {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
  }

  // User Management
  async getAllUsers(user: any) {
    this.checkAdminRole(user);

    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: { cards: true, gifts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserStats(user: any, userId: string) {
    this.checkAdminRole(user);

    const userStats = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            cards: true,
            gifts: true,
            wishes: true,
            guests: true,
            subscriptions: true,
          },
        },
        cards: {
          select: { id: true, name: true, published: true },
          take: 5,
        },
      },
    });

    return userStats;
  }

  // Template Management
  async getAllTemplates(user: any) {
    this.checkAdminRole(user);

    return this.prisma.template.findMany({
      include: {
        _count: { select: { cards: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveTemplate(user: any, templateId: string) {
    this.checkAdminRole(user);

    return this.prisma.template.update({
      where: { id: templateId },
      data: { status: 'approved' },
    });
  }

  async rejectTemplate(user: any, templateId: string, reason: string) {
    this.checkAdminRole(user);

    return this.prisma.template.update({
      where: { id: templateId },
      data: {
        status: 'rejected',
        rejectionReason: reason,
      },
    });
  }

  // Wish Moderation
  async getAllWishes(user: any, status?: string) {
    this.checkAdminRole(user);

    const where = status ? { status } : {};

    return this.prisma.wish.findMany({
      where,
      include: {
        card: { select: { id: true, name: true } },
        author: { select: { id: true, email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveWish(user: any, wishId: string) {
    this.checkAdminRole(user);

    return this.prisma.wish.update({
      where: { id: wishId },
      data: { status: 'approved' },
    });
  }

  async rejectWish(user: any, wishId: string) {
    this.checkAdminRole(user);

    return this.prisma.wish.update({
      where: { id: wishId },
      data: { status: 'rejected' },
    });
  }

  // Report Management
  async getAllReports(user: any) {
    this.checkAdminRole(user);

    return this.prisma.report.findMany({
      include: {
        wish: {
          select: {
            id: true,
            content: true,
            author: { select: { email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      where: { resolved: false },
    });
  }

  async resolveReport(user: any, reportId: string, resolutionNote: string) {
    this.checkAdminRole(user);

    return this.prisma.report.update({
      where: { id: reportId },
      data: {
        resolved: true,
        resolutionNote,
      },
    });
  }

  // Payment Management
  async getAllPayments(user: any) {
    this.checkAdminRole(user);

    return this.prisma.payment.findMany({
      include: {
        user: { select: { email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPaymentStats(user: any) {
    this.checkAdminRole(user);

    const stats = await this.prisma.payment.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
      _count: true,
    });

    return {
      totalPayments: stats._count,
      totalAmount: stats._sum.amount || 0,
    };
  }

  // Gift Management
  async getGiftStats(user: any) {
    this.checkAdminRole(user);

    const stats = await this.prisma.gift.aggregate({
      where: { status: 'confirmed' },
      _sum: { amount: true },
      _count: true,
    });

    return {
      totalGifts: stats._count,
      totalAmount: stats._sum.amount || 0,
    };
  }

  // Platform Statistics
  async getPlatformStats(user: any) {
    this.checkAdminRole(user);

    const [
      totalUsers,
      totalCards,
      totalGifts,
      totalWishes,
      totalPayments,
      pendingWishes,
      pendingTemplates,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.card.count({ where: { published: true } }),
      this.prisma.gift.count({ where: { status: 'confirmed' } }),
      this.prisma.wish.count({ where: { status: 'approved' } }),
      this.prisma.payment.count({ where: { status: 'completed' } }),
      this.prisma.wish.count({ where: { status: 'pending' } }),
      this.prisma.template.count({ where: { status: 'draft' } }),
    ]);

    const giftStats = await this.prisma.gift.aggregate({
      where: { status: 'confirmed' },
      _sum: { amount: true },
    });

    const paymentStats = await this.prisma.payment.aggregate({
      where: { status: 'completed' },
      _sum: { amount: true },
    });

    return {
      totalUsers,
      totalCards,
      totalGifts,
      totalWishes,
      totalPayments,
      pendingWishes,
      pendingTemplates,
      totalGiftAmount: giftStats._sum.amount || 0,
      totalPaymentAmount: paymentStats._sum.amount || 0,
    };
  }
}
