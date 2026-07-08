import { IsString, IsOptional, IsObject } from 'class-validator';

export class QueryTemplatesDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  tier?: string; // free, basic, premium

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sort?: string; // newest, popular

  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  limit?: string;
}
