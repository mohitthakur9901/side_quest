import { Module } from '@nestjs/common';
import { CommunicationsService } from './communications.service';
import { CommunicationsGateway } from './communications.gateway';

@Module({
  providers: [CommunicationsGateway, CommunicationsService],
})
export class CommunicationsModule {}
