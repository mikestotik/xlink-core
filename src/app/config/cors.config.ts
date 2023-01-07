import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsConfig = (): CorsOptions => ({
  origin: [ 'http://127.0.0.1:4243', 'http://localhost:4243', 'app://localhost' ],
});
