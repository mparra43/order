import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'],
    }
  });
  await app.listen(3000);
}
bootstrap();
