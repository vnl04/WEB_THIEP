import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  type: string; // image, video, music

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  section?: string; // cover, gallery, etc

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}

export class UpdateMediaDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  order?: number;
}
