import { IsNumber, IsString, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateWithdrawalDto {
  @IsNumber()
  @Min(0)
  amount!: number;

  @IsUUID()
  bankAccountId!: string;
}

export class RejectWithdrawalDto {
  @IsString()
  reason!: string;
}
