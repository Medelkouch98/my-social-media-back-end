import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { TransformInterceptor, PrismaExceptionFilter } from './interceptors';

const port = parseInt(process.env.PORT);
const globalPrefix = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new PrismaExceptionFilter())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
