import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class InitializePaymentDto {
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  provider: string; // vnpay, momo, zalopay, stripe

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  bankCode?: string; // For VNPay
}

export class ConfirmPaymentDto {
  @IsString()
  transactionId: string;

  @IsString()
  @IsOptional()
  status?: string;
}
