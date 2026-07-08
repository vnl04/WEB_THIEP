import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDate,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Password must be at least 8 characters with uppercase, lowercase, number, and symbol' }
  )
  password!: string;

  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  @IsNotEmpty()
  name!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class CreateCardDto {
  @IsNotEmpty()
  templateId!: string;

  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  title!: string;

  @MaxLength(500)
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  brideNames!: string;

  @IsNotEmpty()
  groomNames!: string;

  @IsDate()
  @IsNotEmpty()
  weddingDate!: Date;

  @IsOptional()
  @MaxLength(200)
  location?: string;
}

export class CreateGuestDto {
  @IsNotEmpty()
  cardId!: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsOptional()
  guestCount?: number;
}

export class CreateWishDto {
  @IsNotEmpty()
  cardId!: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  guestName!: string;

  @IsEmail()
  @IsOptional()
  guestEmail?: string;

  @MinLength(10)
  @MaxLength(1000)
  @IsNotEmpty()
  content!: string;
}

export class CreatePaymentDto {
  @IsNotEmpty()
  amount!: number;

  @IsEnum(['VND', 'USD', 'EUR'])
  currency!: string;

  @IsEnum(['vnpay', 'momo', 'bank_transfer', 'stripe'])
  paymentMethod!: string;

  @IsOptional()
  cardId?: string;

  @IsOptional()
  planId?: string;
}

export class SubmitRsvpDto {
  @IsEnum(['attending', 'not_attending', 'no_response'])
  status!: string;

  @IsOptional()
  guestCount?: number;

  @IsOptional()
  @MaxLength(500)
  dietaryRequirements?: string;

  @IsOptional()
  @MaxLength(500)
  notes?: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsOptional()
  @IsUrl()
  avatar?: string;

  @IsOptional()
  @MaxLength(500)
  bio?: string;

  @IsOptional()
  bankAccount?: string;

  @IsOptional()
  bankName?: string;
}

export class CreateGiftDto {
  @IsNotEmpty()
  cardId!: string;

  @IsNotEmpty()
  amount!: number;

  @IsEnum(['VND', 'USD', 'EUR'])
  currency!: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  senderName?: string;

  @IsOptional()
  @IsEmail()
  senderEmail?: string;

  @IsOptional()
  @MaxLength(500)
  message?: string;

  @IsNotEmpty()
  paymentMethod!: string;
}

export class UpdateCardDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  theme?: any;

  @IsOptional()
  blocks?: any;

  @IsEnum(['draft', 'published', 'archived'])
  @IsOptional()
  status?: string;
}

export class UpdateBankAccountDto {
  @IsNotEmpty()
  @MaxLength(50)
  accountNumber!: string;

  @IsNotEmpty()
  @MaxLength(100)
  accountHolder!: string;

  @IsNotEmpty()
  @MaxLength(10)
  bankCode!: string;

  @IsOptional()
  @MaxLength(50)
  accountType?: string;
}

export class BulkImportGuestsDto {
  @IsNotEmpty()
  cardId!: string;

  @IsNotEmpty()
  file!: any;
}

export class CreateSubscriptionDto {
  @IsNotEmpty()
  planId!: string;

  @IsOptional()
  paymentMethodId?: string;
}

export class ModerateWishDto {
  @IsEnum(['approved', 'rejected', 'hidden'])
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @MaxLength(500)
  reason?: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  token!: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    { message: 'Password must be at least 8 characters with uppercase, lowercase, number, and symbol' }
  )
  newPassword!: string;
}

export class CreateTemplateDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsUrl()
  thumbnail?: string;

  @IsOptional()
  @IsEnum(['elegant', 'minimal', 'modern', 'traditional', 'luxury'])
  category?: string;

  @IsNotEmpty()
  blocks!: any[];
}
