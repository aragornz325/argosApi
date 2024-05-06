import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { cors } from './constant';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    {logger: ['log', 'error', 'warn', 'debug', 'verbose']
    });

  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }
  ));

  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation for my NestJS application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  app.enableCors(cors);
  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
