import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsGateway } from './pools.gateway';
import { PoolsEventsService } from './pools-events.service';

@Module({
  providers: [PoolsGateway, PoolsService , PoolsEventsService],
  exports:[PoolsService , PoolsGateway, PoolsModule]
})
export class PoolsModule {}
