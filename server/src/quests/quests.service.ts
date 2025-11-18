import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestDto } from './dto/create-quest.dto';
import { UpdateQuestDto } from './dto/update-quest.dto';
import { DatabaseService } from 'src/database/database.service';
import { PoolsService } from 'src/pools/pools.service';



@Injectable()
export class QuestsService {

  constructor(
    private readonly prisma: DatabaseService,
    private readonly poolsService: PoolsService
  ) { }

  async create(createQuestDto: CreateQuestDto) {
    try {
      console.log(createQuestDto);
      
      // validate fields 
      const { title, description, price, latitude, longitude, type, status, giverId } = createQuestDto
      if (!title || !description || !price || !latitude || !longitude || !type || !status || !giverId) {
        throw new Error('All fields are required')
      }
      // find creator
      const giver = await this.prisma.user.findUnique({
        where: {
          id: giverId
        }
      });
      if (!giver) {
        throw new HttpException('You already created a quest', HttpStatus.FORBIDDEN);
      };
      // create quest
      const quest = await this.prisma.quest.create({
        data: {
          title,
          description,
          price: Number(price),
          latitude: Number(latitude),
          longitude: Number(longitude),
          type,
          status,
          giverId: giver?.id,
        }    
      });
      // TODO: push into polling system
      await this.poolsService.addQuestToPool({
        quest_id: quest.id,
        title,
        description,
        price,
        latitude: Number(latitude),
        longitude: Number(longitude),
        city: giver.city
      });

      return {
        message: 'Quest created successfully'
      };
    } catch (error) {
      return error;

    }
  }


  async findOne(giverId: string) {
    try {
      const quest = await this.prisma.quest.findUnique({
        where: {
          id: giverId
        }
      })
      if (!quest) {
        throw new Error('No quests found')
      }
      return quest

    } catch (error) {
      return error
    }
  }

  async update(id: string, updateQuestDto: UpdateQuestDto) {
    try {

      // update then find in redis then upate that as well
      const quest = await this.prisma.quest.update({
        where: {
          id: id
        },
        data: {
          title: updateQuestDto.title,
          description: updateQuestDto.description,
          price: Number(updateQuestDto.price),
          latitude: Number(updateQuestDto.latitude),
          longitude: Number(updateQuestDto.longitude),
          type: updateQuestDto.type,
        }
      })
    } catch (error) {
      return error
    }
  }

  async remove(id: string) {
    try {
      const quest = await this.prisma.quest.update({
        where: {
          id: id,
        },
        data: {
          status: "CANCELLED"
        }
      })
      return {
        message: 'Quest cancelled successfully',
        status: HttpStatus.OK
      }
    } catch (error) {
      return error
    }
  }


  //  admin only
    async findAll(query: any) {
    try {
      const { status, giverId } = query;
      const quests = await this.prisma.quest.findMany({
        where: {
          id: giverId,
          status: status || 'OPEN'
        }
      })
      if (!quests) {
        throw new Error('No quests found')
      }
      return quests
    } catch (error) {
      return error
    }
  }

}
