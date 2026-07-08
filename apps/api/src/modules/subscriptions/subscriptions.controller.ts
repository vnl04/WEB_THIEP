import { Controller, Post, Get, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto';

@Controller('v1')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post('subscriptions')
  @UseGuards(AuthGuard('jwt'))
  async createSubscription(@Request() req: any, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionsService.createSubscription(req.user.id, dto.cardId, dto.planId);
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
