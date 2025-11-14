import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";


export class CreateQuestPoolDto {
    @IsString()
    title: string

    @IsString()
    @MinLength(10)
    description: string

    @IsString()
    price: string

    @IsOptional()
    @IsString()
    quest_id: string

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