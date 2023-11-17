import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: ["http://10.12.3.15:3000", "http://10.12.3.15:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.use(cookieParser());

  // await app.listen(4000);
  await app.listen(4000, '10.12.3.15');
}

bootstrap();
