import { GatewayMetadata } from '@nestjs/websockets/interfaces';
import { CorsConfig } from './cors.config';

export const WsConfig = (): GatewayMetadata => ({
  cors: CorsConfig()
});
