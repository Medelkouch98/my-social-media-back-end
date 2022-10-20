import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { TransformInterceptor, PrismaExceptionFilter } from './interceptors';

const port = parseInt(process.env.PORT);
const globalPrefix = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupGlobalMiddlewares(app);
  setupSwagger(app);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

export function setupGlobalMiddlewares(app: INestApplication) {
  app.enableCors();
  return app
    .setGlobalPrefix(globalPrefix)
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new PrismaExceptionFilter())
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
}

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('DMP MS Workflows')
    .setDescription('The DMP MS Workflows API documentation')
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
