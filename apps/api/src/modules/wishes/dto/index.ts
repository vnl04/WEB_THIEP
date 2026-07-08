import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateWishDto {
  @IsString()
  content!: string;

  @IsUUID()
  @IsOptional()
  authorId?: string;
}

export class ReportWishDto {
  @IsString()
  reason!: string; // spam, offensive, inappropriate

  @IsString()
  @IsOptional()
  description?: string;
}
