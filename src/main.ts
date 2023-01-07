import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { CorsConfig } from './app/config/cors.config';
import helmet from 'helmet';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = Number(process.env.SERVER_PORT);
  const host = process.env.SERVER_HOST || '0.0.0.0';

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });
  app.enableCors(CorsConfig());
  app.use(helmet());
  app.use(compression());

  await app
    .listen(port, host)
    .then(() => app.getUrl())
    .then((url) => console.log(`Application is running on: ${url}`));
}

bootstrap();
