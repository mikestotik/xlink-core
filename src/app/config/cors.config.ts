import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CorsConfig = (): CorsOptions => ({
  origin: [ 'http://127.0.0.1:4224', 'http://localhost:4224', 'app://localhost' ],
});
