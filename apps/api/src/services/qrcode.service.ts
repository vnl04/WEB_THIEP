import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class QrCodeService {
  private logger = new Logger(QrCodeService.name);

  /**
   * Generate QR code for gift payment
   * Install: npm install qrcode
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

      // TODO: Implement with qrcode library
      // import * as QRCode from 'qrcode';
      // const qrDataString = JSON.stringify(qrData);
      // const qrCodeDataUrl = await QRCode.toDataURL(qrDataString, {
      //   errorCorrectionLevel: 'H',
      //   type: 'image/png',
      //   width: 300,
      // });

      return {
        qrUrl: this.generateMockQRCode(JSON.stringify(qrData)),
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

      // TODO: Implement with qrcode library
      // const qrCodeDataUrl = await QRCode.toDataURL(inviteUrl, {
      //   errorCorrectionLevel: 'H',
      //   type: 'image/png',
      //   width: 300,
      // });

      return {
        qrUrl: this.generateMockQRCode(inviteUrl),
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

      return {
        qrUrl: this.generateMockQRCode(rsvpUrl),
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
      // TODO: Implement with vietqr library or generate proper VietQR string
      const vietQRData = {
        bankCode,
        accountNumber,
        amount,
        description: description.substring(0, 60), // VietQR has 60 char limit
      };

      return {
        qrUrl: this.generateMockQRCode(JSON.stringify(vietQRData)),
        data: vietQRData,
      };
    } catch (error) {
      this.logger.error(`Failed to generate bank transfer QR code: ${error.message}`);
      throw error;
    }
  }

  /**
   * Mock QR code generation for development
   * Replace with actual qrcode library in production
   */
  private generateMockQRCode(data: string): string {
    const encoded = encodeURIComponent(data);
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23ffffff' width='300' height='300'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='16' fill='%23000000'%3AQR Code%3C/text%3E%3Crect x='50' y='100' width='200' height='100' fill='%23f0f0f0' stroke='%23cccccc' stroke-width='1'/%3E%3Ctext x='150' y='150' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='10' fill='%23666666'%3E${data.substring(0, 30)}%3C/text%3E%3Ctext x='50%25' y='85%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23999999'%3E(Mock QR Code)%3C/text%3E%3C/svg%3E`;
  }
}
