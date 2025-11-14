
import {
    IsString,
    MinLength,
    IsEnum
} from 'class-validator';



import {QuestType , QuestStatus} from "@prisma/client"

export class CreateQuestDto {

    @IsString()
    title: string

    @IsString()
    @MinLength(10)
    description: string

    @IsString()
    price: string

    @IsString()
    latitude: string

    @IsString()
    longitude: string

    
    @IsEnum(QuestType)
    type: QuestType

    @IsEnum(QuestStatus)
    status: QuestStatus

    @IsString()
    giverId: string
}


