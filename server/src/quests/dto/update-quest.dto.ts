import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestDto } from './create-quest.dto';
import { IsEnum, IsString, MinLength } from 'class-validator';
import { QuestStatus, QuestType } from '@prisma/client';

export class UpdateQuestDto extends PartialType(CreateQuestDto) {
}
