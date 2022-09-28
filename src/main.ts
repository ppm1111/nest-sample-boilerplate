import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(nestWinston);
  await app.listen(3000);
}
bootstrap();
