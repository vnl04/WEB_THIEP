import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentGatewayService {
  private logger = new Logger(PaymentGatewayService.name);

  /**
   * Initialize VNPay payment
   */
  async createVnPayPayment(
    orderId: string,
    amount: number,
    bankCode: string,
    orderDescription: string,
    returnUrl: string,
  ) {
    try {
      if (!process.env.VNPAY_CLIENT_ID || !process.env.VNPAY_HASH_SECRET) {
        this.logger.warn('VNPay credentials not configured');
        return { success: false, message: 'Payment gateway not configured' };
      }

      const date = new Date();
      const createDate = this.formatDate(date);
      const expireDate = this.formatDate(new Date(date.getTime() + 15 * 60000)); // 15 minutes

      const vnpParams = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: process.env.VNPAY_CLIENT_ID,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderDescription,
        vnp_OrderType: 'billpayment',
        vnp_Amount: amount * 100, // VNPay requires amount in units (1 unit = 1 cent)
        vnp_ReturnUrl: returnUrl,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
        vnp_BankCode: bankCode || 'VNBANK',
        vnp_IpAddr: '127.0.0.1',
      };

      const signature = this.generateVnPaySignature(vnpParams);
      vnpParams['vnp_SecureHash'] = signature;

      const queryString = Object.keys(vnpParams)
        .sort()
        .map(key => `${key}=${encodeURIComponent(vnpParams[key])}`)
        .join('&');

      const paymentUrl = `https://sandbox.vnpayment.vn/paygate?${queryString}`;

      this.logger.log(`VNPay payment created for order ${orderId}`);
      return {
        success: true,
        paymentUrl,
        orderId,
        amount,
      };
    } catch (error) {
      this.logger.error(`Failed to create VNPay payment: ${error.message}`);
      throw error;
    }
  }

  /**
   * Initialize Momo payment
   */
  async createMomoPayment(
    orderId: string,
    amount: number,
    orderDescription: string,
    returnUrl: string,
  ) {
    try {
      if (!process.env.MOMO_ACCESS_KEY || !process.env.MOMO_SECRET_KEY) {
        this.logger.warn('Momo credentials not configured');
        return { success: false, message: 'Payment gateway not configured' };
      }

      const partnerCode = process.env.MOMO_PARTNER_CODE || 'MOMO';
      const accessKey = process.env.MOMO_ACCESS_KEY;
      const secretKey = process.env.MOMO_SECRET_KEY;
      const requestId = `${Date.now()}`;
      const requestType = 'captureWallet';
      const notifyUrl = `${process.env.APP_URL}/api/v1/payments/momo-webhook`;

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderDescription}&partnerCode=${partnerCode}&partnerName=Test&redisplayAssets=false&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;

      const signature = crypto
        .createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

      const momoData = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo: orderDescription,
        redirectUrl: returnUrl,
        ipnUrl: notifyUrl,
        requestType,
        signature,
        lang: 'vi',
      };

      const response = await axios.post(
        'https://test-payment.momo.vn/v3/gateway/api/create',
        momoData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.resultCode === 0) {
        this.logger.log(`Momo payment created for order ${orderId}`);
        return {
          success: true,
          paymentUrl: response.data.payUrl,
          orderId,
          amount,
        };
      } else {
        throw new BadRequestException(`Momo error: ${response.data.message}`);
      }
    } catch (error) {
      this.logger.error(`Failed to create Momo payment: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verify VNPay payment response
   */
  verifyVnPayResponse(queryParams: any): { isValid: boolean; data?: any } {
    try {
      const signature = queryParams.vnp_SecureHash;
      const secureHash = queryParams.vnp_SecureHashType;

      const clonedParams = { ...queryParams };
      delete clonedParams.vnp_SecureHash;
      delete clonedParams.vnp_SecureHashType;

      const calculatedSignature = this.generateVnPaySignature(clonedParams);

      if (calculatedSignature.toUpperCase() !== signature.toUpperCase()) {
        return { isValid: false };
      }

      if (queryParams.vnp_ResponseCode === '00') {
        return {
          isValid: true,
          data: {
            orderId: queryParams.vnp_TxnRef,
            amount: parseInt(queryParams.vnp_Amount) / 100,
            transactionId: queryParams.vnp_TransactionNo,
            status: 'success',
          },
        };
      }

      return { isValid: true, data: { status: 'failed' } };
    } catch (error) {
      this.logger.error(`VNPay verification failed: ${error.message}`);
      return { isValid: false };
    }
  }

  /**
   * Verify Momo payment response
   */
  verifyMomoResponse(data: any, signature: string): { isValid: boolean; data?: any } {
    try {
      const secretKey = process.env.MOMO_SECRET_KEY;

      const signatureString = `accessKey=${data.accessKey}&amount=${data.amount}&extraData=${data.extraData}&ipnUrl=${data.ipnUrl}&orderId=${data.orderId}&orderInfo=${data.orderInfo}&partnerCode=${data.partnerCode}&partnerName=${data.partnerName}&redisplayAssets=${data.redisplayAssets}&redirectUrl=${data.redirectUrl}&requestId=${data.requestId}&requestType=${data.requestType}`;

      const calculatedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(signatureString)
        .digest('hex');

      if (calculatedSignature !== signature) {
        return { isValid: false };
      }

      if (data.resultCode === 0) {
        return {
          isValid: true,
          data: {
            orderId: data.orderId,
            amount: data.amount,
            transactionId: data.transId,
            status: 'success',
          },
        };
      }

      return { isValid: true, data: { status: 'failed' } };
    } catch (error) {
      this.logger.error(`Momo verification failed: ${error.message}`);
      return { isValid: false };
    }
  }

  /**
   * Generate VNPay secure hash
   */
  private generateVnPaySignature(params: any): string {
    const hashSecret = process.env.VNPAY_HASH_SECRET || '';
    const queryString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');

    return crypto
      .createHmac('sha512', hashSecret)
      .update(queryString)
      .digest('hex');
  }

  /**
   * Format date for VNPay (YYYYMMDDHHmmss)
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
  }
}
