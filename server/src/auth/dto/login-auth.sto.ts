import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class LoginAuthDto {

    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    // @MinLength(8)
    password: string;
}
