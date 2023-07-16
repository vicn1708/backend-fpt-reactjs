import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import helmet from 'helmet';
import swagger from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(compression());

  swagger.register(app);

  await app.listen(3000);
}
bootstrap();
