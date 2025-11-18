import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { CommunicationsService } from './communications.service';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';

@WebSocketGateway()
export class CommunicationsGateway {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @SubscribeMessage('createCommunication')
  create(@MessageBody() createCommunicationDto: CreateCommunicationDto) {
    return this.communicationsService.create(createCommunicationDto);
  }

  @SubscribeMessage('findAllCommunications')
  findAll() {
    return this.communicationsService.findAll();
  }

  @SubscribeMessage('findOneCommunication')
  findOne(@MessageBody() id: number) {
    return this.communicationsService.findOne(id);
  }

  @SubscribeMessage('updateCommunication')
  update(@MessageBody() updateCommunicationDto: UpdateCommunicationDto) {
    return this.communicationsService.update(updateCommunicationDto.id, updateCommunicationDto);
  }

  @SubscribeMessage('removeCommunication')
  remove(@MessageBody() id: number) {
    return this.communicationsService.remove(id);
  }
}
