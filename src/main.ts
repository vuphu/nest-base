import { AppModule } from './app.module';
import { env } from './configs/env.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Todo API').setDescription('The Todo API description').setVersion('1.0').build(),
    ),
  );

  await app.listen(env.PORT);
}
bootstrap();
