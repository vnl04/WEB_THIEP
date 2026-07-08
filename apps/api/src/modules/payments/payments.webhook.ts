import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../services/email.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentWebhookHandler {
  private logger = new Logger(PaymentWebhookHandler.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) { }

  /**
   * Handle VNPay webhook callback
   */
  async handleVnPayWebhook(data: any, signature: string) {
    try {
      // Verify signature
      if (!this.verifyVnPaySignature(data, signature)) {
        throw new BadRequestException('Invalid signature');
      }

      const { orderId, amount, responseCode, transactionNo } = data;

      this.logger.log(`Processing VNPay webhook for order ${orderId}`);

      // Update payment status in database
      const payment = await this.prisma.payment.update({
        where: { id: orderId },
        data: {
          status: responseCode === '00' ? 'confirmed' : 'failed',
          transactionId: transactionNo,
        },
      });

      // If payment successful, update subscription
      if (responseCode === '00') {
        const subscription = await this.prisma.subscription.findFirst({
          where: { paymentId: orderId },
        });

        if (subscription) {
          await this.prisma.subscription.update({
            where: { id: subscription.id },
            data: { status: 'active' },
          });
        }
      }

      return { success: true, payment };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Webhook processing failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Handle Momo webhook callback
   */
  async handleMomoWebhook(data: any, signature: string) {
    try {
      if (!this.verifyMomoSignature(data, signature)) {
        throw new BadRequestException('Invalid signature');
      }

      const { orderId, amount, resultCode, transId } = data;

      this.logger.log(`Processing Momo webhook for order ${orderId}`);

      // Update payment status
      const payment = await this.prisma.payment.update({
        where: { id: orderId },
        data: {
          status: resultCode === 0 ? 'confirmed' : 'failed',
          transactionId: transId,
        },
      });

      return { success: true, payment };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Momo webhook processing failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Handle gift payment webhook
   */
  async handleGiftWebhook(data: any, signature: string) {
    try {
      if (!this.verifySignature(data, signature)) {
        throw new BadRequestException('Invalid signature');
      }

      const { giftId, amount, status, transactionId } = data;

      this.logger.log(`Processing gift payment webhook for gift ${giftId}`);

      // Update gift status with card owner details
      const gift = await this.prisma.gift.update({
        where: { id: giftId },
        data: {
          status: status === 'success' ? 'confirmed' : 'failed',
          transactionId,
        },
        include: {
          card: {
            include: {
              user: true,
            },
          },
        },
      });

      // Send notification email to card owner if gift confirmed
      if (status === 'success' && gift.card.user.email) {
        try {
          await this.emailService.sendGiftNotification(
            gift.card.user.email,
            'Anonymous Donor',
            gift.amount,
            gift.currency,
            gift.card.name || 'Your Wedding Card',
          );
          this.logger.log(`Gift notification email sent to ${gift.card.user.email}`);
        } catch (emailError) {
          const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
          this.logger.warn(`Failed to send gift notification email: ${errorMessage}`);
          // Don't fail webhook if email fails
        }
      }

      return { success: true, gift };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Gift webhook processing failed: ${errorMessage}`);
      throw error;
    }
  }

  /**
   * Verify VNPay signature
   */
  private verifyVnPaySignature(data: any, signature: string): boolean {
    try {
      const signKey = process.env.VNPAY_HASH_SECRET || '';

      // Sort data and create signature string
      const sortedData = Object.keys(data)
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join('&');

      const hash = crypto
        .createHmac('sha512', signKey)
        .update(sortedData)
        .digest('hex');

      return hash.toUpperCase() === signature.toUpperCase();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`VNPay signature verification failed: ${errorMessage}`);
      return false;
    }
  }

  /**
   * Verify Momo signature
   */
  private verifyMomoSignature(data: any, signature: string): boolean {
    try {
      const secretKey = process.env.MOMO_SECRET_KEY || '';

      const signatureString = Object.keys(data)
        .sort()
        .map(key => `${key}=${data[key]}`)
        .join('&');

      const hash = crypto
        .createHmac('sha256', secretKey)
        .update(signatureString)
        .digest('hex');

      return hash === signature;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Momo signature verification failed: ${errorMessage}`);
      return false;
    }
  }

  /**
   * Generic signature verification
   */
  private verifySignature(data: any, signature: string): boolean {
    try {
      const secret = process.env.WEBHOOK_SECRET || '';

      const signatureString = JSON.stringify(data);
      const hash = crypto
        .createHmac('sha256', secret)
        .update(signatureString)
        .digest('hex');

      return hash === signature;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Signature verification failed: ${errorMessage}`);
      return false;
    }
  }
}
