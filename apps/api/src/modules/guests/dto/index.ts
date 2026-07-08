import { IsString, IsOptional, IsEmail, IsInt, Min } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  name!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

export class SubmitRsvpDto {
  @IsString()
  status!: string; // attending, not-attending, pending

  @IsInt()
  @Min(1)
  count!: number;
}
