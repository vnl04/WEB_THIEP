import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateGiftDto {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  paymentMethod!: string; // bank_transfer, momo, zalopay, stripe

  @IsString()
  @IsOptional()
  message?: string;

  @IsUUID()
  @IsOptional()
  donorId?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;
}

export class ConfirmGiftDto {
  @IsString()
  @IsOptional()
  transactionId?: string;
}
