import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class PoolsEventsService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  emitToUser(socketId: string, event: string, payload: any) {
    if (this.server) {
      
      this.server.to(socketId).emit(event, payload);
    }
  }
}
