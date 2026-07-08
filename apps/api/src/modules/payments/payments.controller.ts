import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';

@Controller('v1/payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async initializePayment(@Request() req: any, @Body() data: any) {
    return this.paymentsService.initializePayment(req.user.id, data.amount, data.provider);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getPaymentHistory(@Request() req: any) {
    return this.paymentsService.getPaymentHistory(req.user.id);
  }
}
