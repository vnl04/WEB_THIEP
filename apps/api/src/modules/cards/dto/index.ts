import { IsString, IsOptional, IsBoolean, IsObject, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsUUID()
  templateId!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brideName?: string;

  @IsString()
  @IsOptional()
  groomName?: string;

  @IsOptional()
  weddingDate?: Date;

  @IsString()
  @IsOptional()
  story?: string;

  @IsObject()
  @IsOptional()
  content?: Record<string, any>;

  @IsObject()
  @IsOptional()
  design?: Record<string, any>;

  @IsObject()
  @IsOptional()
  ogTags?: Record<string, any>;
}

export class UpdateCardDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brideName?: string;

  @IsString()
  @IsOptional()
  groomName?: string;

  @IsOptional()
  weddingDate?: Date;

  @IsString()
  @IsOptional()
  story?: string;

  @IsObject()
  @IsOptional()
  content?: Record<string, any>;

  @IsObject()
  @IsOptional()
  design?: Record<string, any>;

  @IsObject()
  @IsOptional()
  ogTags?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
