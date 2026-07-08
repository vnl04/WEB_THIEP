import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  bankAccountId?: string;
}

export class UpdateBankAccountDto {
  @IsString()
  accountNumber!: string;

  @IsString()
  accountHolder!: string;

  @IsString()
  bankCode!: string;

  @IsString()
  @IsOptional()
  accountType?: string;
}
