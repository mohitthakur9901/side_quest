// src/redis/redis.provider.ts
import { Redis } from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // recommended for BullMQ
  enableReadyCheck: false, // faster connect in Docker or cloud env
});

redisClient.on('connect', () => console.log('✅ Connected to Redis'));
redisClient.on('error', (err) => console.error('❌ Redis connection error:', err));
