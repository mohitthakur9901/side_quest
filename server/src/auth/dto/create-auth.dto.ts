import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateAuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsString()
  phone?: string;



  @IsOptional()
  @IsString()
  profileImage?: string;

  
  @IsString()
  latitude?: string;

 
  @IsString()
  longitude?: string;

 
  @IsString()
  city?: string;

 
  @IsString()
  country?: string;
}
