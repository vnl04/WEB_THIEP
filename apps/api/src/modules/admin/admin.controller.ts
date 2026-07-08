import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';

@Controller('v1/admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private adminService: AdminService) {}

  // Platform stats
  @Get('stats')
  async getPlatformStats(@Request() req: any) {
    return this.adminService.getPlatformStats(req.user);
  }

  // User management
  @Get('users')
  async getAllUsers(@Request() req: any) {
    return this.adminService.getAllUsers(req.user);
  }

  @Get('users/:userId')
  async getUserStats(@Request() req: any, @Param('userId') userId: string) {
    return this.adminService.getUserStats(req.user, userId);
  }

  // Template management
  @Get('templates')
  async getAllTemplates(@Request() req: any) {
    return this.adminService.getAllTemplates(req.user);
  }

  @Patch('templates/:templateId/approve')
  async approveTemplate(@Request() req: any, @Param('templateId') templateId: string) {
    return this.adminService.approveTemplate(req.user, templateId);
  }

  @Patch('templates/:templateId/reject')
  async rejectTemplate(
    @Request() req: any,
    @Param('templateId') templateId: string,
    @Body() data: any,
  ) {
    return this.adminService.rejectTemplate(req.user, templateId, data.reason);
  }

  // Wish moderation
  @Get('wishes')
  async getAllWishes(@Request() req: any, @Query() query: any) {
    return this.adminService.getAllWishes(req.user, query.status);
  }

  @Patch('wishes/:wishId/approve')
  async approveWish(@Request() req: any, @Param('wishId') wishId: string) {
    return this.adminService.approveWish(req.user, wishId);
  }

  @Patch('wishes/:wishId/reject')
  async rejectWish(@Request() req: any, @Param('wishId') wishId: string) {
    return this.adminService.rejectWish(req.user, wishId);
  }

  // Report management
  @Get('reports')
  async getAllReports(@Request() req: any) {
    return this.adminService.getAllReports(req.user);
  }

  @Patch('reports/:reportId/resolve')
  async resolveReport(
    @Request() req: any,
    @Param('reportId') reportId: string,
    @Body() data: any,
  ) {
    return this.adminService.resolveReport(req.user, reportId, data.resolutionNote);
  }

  // Payment management
  @Get('payments')
  async getAllPayments(@Request() req: any) {
    return this.adminService.getAllPayments(req.user);
  }

  @Get('payments/stats')
  async getPaymentStats(@Request() req: any) {
    return this.adminService.getPaymentStats(req.user);
  }

  // Gift management
  @Get('gifts/stats')
  async getGiftStats(@Request() req: any) {
    return this.adminService.getGiftStats(req.user);
  }
}
