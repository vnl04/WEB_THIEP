import { Injectable, Logger } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QrCodeService {
  private logger = new Logger(QrCodeService.name);

  /**
   * Generate QR code for gift payment
   */
  async generateGiftQrCode(cardId: string, bankAccount: string, amount?: number) {
    try {
      this.logger.log(`Generating QR code for card ${cardId}`);

      const qrData = {
        bankAccount,
        cardId,
        amount: amount || 0,
        description: `Wedding Gift - Card ${cardId}`,
      };

      const qrDataString = JSON.stringify(qrData);
      const qrCodeDataUrl = await QRCode.toDataURL(qrDataString, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
      });

      return {
        qrUrl: qrCodeDataUrl,
        data: qrData,
      };
    } catch (error) {
      this.logger.error(`Failed to generate QR code: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate QR code for guest invitation link
   */
  async generateInviteQrCode(cardSlug: string, guestToken: string) {
    try {
      this.logger.log(`Generating invite QR code for ${cardSlug}`);

      const inviteUrl = `${process.env.APP_URL || 'http://localhost:3000'}/${cardSlug}?guest=${guestToken}`;

      const qrCodeDataUrl = await QRCode.toDataURL(inviteUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
      });

      return {
        qrUrl: qrCodeDataUrl,
        inviteUrl,
      };
    } catch (error) {
      this.logger.error(`Failed to generate invite QR code: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate QR code for RSVP tracking
   */
  async generateRsvpQrCode(inviteToken: string) {
    try {
      this.logger.log(`Generating RSVP QR code for token ${inviteToken}`);

      const rsvpUrl = `${process.env.APP_URL || 'http://localhost:3000'}/rsvp/${inviteToken}`;

      const qrCodeDataUrl = await QRCode.toDataURL(rsvpUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
      });

      return {
        qrUrl: qrCodeDataUrl,
        rsvpUrl,
      };
    } catch (error) {
      this.logger.error(`Failed to generate RSVP QR code: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate QR code for bank transfer
   * Used for Vietnamese banking apps (VietQR format)
   */
  async generateBankTransferQrCode(
    bankCode: string,
    accountNumber: string,
    amount: number,
    description: string,
  ) {
    try {
      this.logger.log(`Generating bank transfer QR code`);

      // VietQR format specification
      const vietQRData = {
        bankCode,
        accountNumber,
        amount,
        description: description.substring(0, 60), // VietQR has 60 char limit
      };

      const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(vietQRData), {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
      });

      return {
        qrUrl: qrCodeDataUrl,
        data: vietQRData,
      };
    } catch (error) {
      this.logger.error(`Failed to generate bank transfer QR code: ${error.message}`);
      throw error;
    }
  }
}
