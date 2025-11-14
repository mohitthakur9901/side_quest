import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { PoolsService } from './pools.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { Server, Socket } from "socket.io"

@WebSocketGateway({ namespace: 'events' })
export class PoolsGateway {
  constructor(public poolsService: PoolsService) { }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createPool')
  create(@MessageBody() createPoolDto: CreatePoolDto) {
    return this.poolsService.addUserToPool(createPoolDto);
  }

  @SubscribeMessage('register')
  async handleRegister(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: string }
  ) {
    const { userId } = payload;

    // Save socketId mapped to user in Redis
    await this.poolsService.client.set(`socket:${userId}`, client.id);

    console.log(`🔌 User ${userId} registered with socket ${client.id}`);
    return { message: 'Registered successfully' };
  }
  
}
