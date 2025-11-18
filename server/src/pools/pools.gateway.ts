import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets';
import { CreatePoolDto } from './dto/create-pool.dto';
import { Server, Socket } from "socket.io";
import { PoolsEventsService } from './pools-events.service';
import { PoolsService } from './pools.service';
import { Query } from '@nestjs/common';

@WebSocketGateway({ namespace: 'events' })
export class PoolsGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly eventsService: PoolsEventsService,
    private readonly poolsService: PoolsService  
  ) {}

  afterInit() {
    this.eventsService.setServer(this.server);
  }


   @SubscribeMessage('hello')
   handleHello() {
     return 'Hello world!';
   }


  @SubscribeMessage('createPool')
  async create(@MessageBody() createPoolDto: CreatePoolDto) {
    return await this.poolsService.addUserToPool(createPoolDto);
  }

  @SubscribeMessage('register')
  async handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string }
  ) {
    const { userId } = payload;

    // Save socketId to Redis (moved into service)
    await this.poolsService.registerSocket(userId, client.id);

    console.log(`🔌 User ${userId} registered with socket ${client.id}`);
    return { message: 'Registered successfully' };
  }
  
  @SubscribeMessage('users')
  async getUsers() {
    return await this.poolsService.getUsersFromPool();
  }

  @SubscribeMessage('questsNearMe')
  async getQuestsNearMe(SocketId : string) {
  }


  @SubscribeMessage('quests')
  async getQuests() {
    return await this.poolsService.getQuestsFromPool();
  }



}
