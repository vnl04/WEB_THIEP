import { IsString, IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  cardId!: string;

  @IsUUID()
  planId!: string;
}

export class CancelSubscriptionDto {
  @IsString()
  reason?: string;
}
