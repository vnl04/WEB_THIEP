import { Controller, Post, Get, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentsService } from './payments.service';
import { PaymentWebhookHandler } from './payments.webhook';
import { InitializePaymentDto } from './dto';

@Controller('v1/payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private webhookHandler: PaymentWebhookHandler,
  ) {}

  @Post('checkout')
  @UseGuards(AuthGuard('jwt'))
  async initializePayment(@Request() req: any, @Body() dto: InitializePaymentDto) {
    return this.paymentsService.initializePayment(req.user.id, dto.amount, dto.provider);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getPaymentHistory(@Request() req: any) {
    return this.paymentsService.getPaymentHistory(req.user.id);
  }

  // VNPay webhook
  @Post('webhook/vnpay')
  async handleVnPayWebhook(@Query() query: any) {
    return this.webhookHandler.handleVnPayWebhook(query, query.vnp_SecureHash);
  }

  // Momo webhook
  @Post('webhook/momo')
  async handleMomoWebhook(@Body() data: any, @Query() query: any) {
    return this.webhookHandler.handleMomoWebhook(data, query.signature);
  }

  // Generic gift payment webhook
  @Post('webhook/gift')
  async handleGiftWebhook(@Body() data: any, @Query() query: any) {
    return this.webhookHandler.handleGiftWebhook(data, query.signature);
  }
}
