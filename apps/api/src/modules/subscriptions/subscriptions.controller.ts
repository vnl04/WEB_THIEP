import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';

@Controller('v1')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post('subscriptions')
  @UseGuards(AuthGuard('jwt'))
  async createSubscription(@Request() req: any, @Body() data: any) {
    return this.subscriptionsService.createSubscription(req.user.id, data.cardId, data.planId);
  }

  @Get('plans')
  async getAllPlans() {
    return this.subscriptionsService.getAllPlans();
  }

  @Get('cards/:cardId/subscription')
  async getCardSubscription(@Param('cardId') cardId: string) {
    return this.subscriptionsService.getCardSubscription(cardId);
  }
}
