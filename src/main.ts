import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://djinni-clone.vercel.app'],
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Djinni Clone API')
    .setDescription(
      'Pet project by denvudd, https://github.com/denvudd/djinni-backend.github.io',
    )
    .setVersion('1.0')
    .addTag('djinni-clone')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  console.log(port);

  await app.listen(port);
}

bootstrap();
