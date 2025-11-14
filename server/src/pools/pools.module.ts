import { Module } from '@nestjs/common';
import { PoolsService } from './pools.service';
import { PoolsGateway } from './pools.gateway';

@Module({
  providers: [PoolsGateway, PoolsService],
  exports:[PoolsService]
})
export class PoolsModule {}
