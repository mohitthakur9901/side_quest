import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePoolDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsNumber()
  latitude?: number | null;

  @IsOptional()
  @IsNumber()
  longitude?: number | null;

  @IsOptional()
  @IsString()
  city?: string | null;
}
