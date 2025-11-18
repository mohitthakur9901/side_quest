import { HttpException, HttpStatus, Injectable, OnModuleDestroy } from '@nestjs/common';
import { CreatePoolDto } from './dto/create-pool.dto';
import { Redis } from 'ioredis';
import { CreateQuestPoolDto } from './dto/create-quest-pool.dto';
import { PoolsEventsService } from './pools-events.service';

@Injectable()
export class PoolsService implements OnModuleDestroy {

  public readonly client: Redis;
  registerSocket: any;

  constructor(
    private readonly events: PoolsEventsService

  ) {

    this.client = new Redis({

      host: process.env.REDIS_HOST || '127.0.0.1',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: null,
      enableReadyCheck: false,

    });

    this.client.on('error', (err) => console.log(err));

    this.client.on('connect', () => console.log('✅ Connected to Redis'));

  };

  onModuleDestroy() {
    this.client.quit();
  };




  async addUserToPool(createPoolDto: CreatePoolDto) {
    const { city, latitude, longitude, userId } = createPoolDto;

    if (!city || !latitude || !longitude || !userId) {
      throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.client.geoadd('seekers:geo', longitude, latitude, userId);

      await this.client.hset(`user:${userId}`, {
        city,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        status: 'ACTIVE',
      });

      await this.client.sadd(`city:${city}:users`, userId);

      console.log(`✅ Added user ${userId} to seeker pool`);
      return { message: 'User added to pool successfully' };
    } catch (error) {
      console.error('Redis addUserToPool error:', error);
      throw new HttpException('Failed to add user to pool', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async addQuestInStream(createPoolDto : CreateQuestPoolDto) {
    const { description, price, quest_id, title, city, latitude, longitude } = createPoolDto;

    
  }

  async addQuestToPool(addQuestDto: CreateQuestPoolDto) {
    try {
      const { description, price, quest_id, title, city, latitude, longitude } = addQuestDto;
      if (!description || !price || !quest_id || !title || !city || !latitude || !longitude) {
        throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
      }
      

      await this.client.geoadd('quests:geo', longitude, latitude, quest_id);

      await this.client.hset(`quest:${quest_id}`, {
        title,
        description,
        price,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        city,
      });

      await this.client.sadd(`city:${city}:quests`, quest_id);
      return { message: 'Quest added to pool successfully' };

    } catch (error) {
      return error
    }
  }

  async removeUserFromPool(userId: string) {
    try {
      await this.client.del(`user:${userId}`);
      return { message: 'User removed from pool successfully' };
    } catch (error) {
      return error
    }
  }

  async removeQuestFromPool(questId: string) {
    try {

      await this.client.del(`quest:${questId}`);
      return { message: 'Quest removed from pool successfully' };

    } catch (error) {
      return error
    }
  }

  async MatchUsersWithQuests(query: String) {
    try {
      // Get all cities (or you can maintain manually)
      const cities = await this.client.keys('city:*:quests');

      for (const cityKey of cities) {
        const city = cityKey.split(':')[1];

        // get all quests in that city
        const questIds = await this.client.smembers(`city:${city}:quests`);

        for (const questId of questIds) {
          const quest = await this.client.hgetall(`quest:${questId}`);

          if (!quest.latitude || !quest.longitude) continue;

          const questLat = parseFloat(quest.latitude);
          const questLon = parseFloat(quest.longitude);

          // 👉 Find seekers within 3 km radius
          const nearbySeekers = await this.client.geosearch(
            'seekers:geo',
            'FROMLONLAT', questLon, questLat,
            'BYRADIUS', Number(query) || 3, 'km'
          );

          if (nearbySeekers.length === 0) {
            console.log(`❌ No seekers found for quest ${questId}`);
            continue;
          }

          console.log(`Found seekers for quest ${questId}:`, nearbySeekers);

          // 👉 Push quest to each seeker
          for (const seekerId of nearbySeekers) {
            const socketId = await this.client.get(`socket:${seekerId}`);

            if (!socketId) continue;

            // Emit via websocket gateway → MUST INJECT GATEWAY INTO SERVICE
            this.events.emitToUser(socketId, 'newQuest', {
              questId,
              title: quest.title,
              price: quest.price,
              lat: questLat,
              lon: questLon,
            });

            console.log(`📤 Sent quest ${questId} to seeker ${seekerId}`);
          }
        }
      }
      return { message: 'Matching cycle completed' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Matching failed', 500);
    }
  }

  calculateDistance(arg0: number, arg1: number, arg2: number, arg3: number) {

    const R = 6371;
    const dLat = (arg3 - arg1) * (Math.PI / 180);
    const dLon = (arg2 - arg0) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(arg1 * (Math.PI / 180)) *
      Math.cos(arg3 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;

  }

  // admin only
  async getUsersFromPool() {
    return await this.client.zrange('seekers:geo', 0, -1);
  }
  async getQuestsFromPool() {
    return await this.client.zrange('quests:geo', 0, -1);
  }


}
