import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsConfig } from '../../config/ws.config';


@WebSocketGateway(WsConfig())
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  public server!: Server;

  private logger: Logger = new Logger('EventsGateway');


  public afterInit(server: Server): void {
    this.logger.log(`Server: ${ server }`);
  }


  public handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${ client.id }`);
  }


  public handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${ client.id }`);
  }


  public send<T>(event: string, payload: T): void {
    this.server.emit(event, payload);
  }


  @SubscribeMessage('tracker')
  public onTrackClientRoute(@ConnectedSocket() client: Socket, @MessageBody() url: string): void {
    this.logger.log({ client: client.id, url: url });
  }


}
