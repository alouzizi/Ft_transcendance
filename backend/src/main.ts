import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
<<<<<<< HEAD
=======
import { NestExpressApplication } from '@nestjs/platform-express';
>>>>>>> origin/lhoussin
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, {});
=======
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
>>>>>>> origin/lhoussin

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
<<<<<<< HEAD
  app.enableCors({
    origin: "http://localhost:3000",
=======

  app.enableCors({
    origin: ["http://localhost:3000", "http://localhost:3000"],
>>>>>>> origin/lhoussin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

<<<<<<< HEAD
  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'POST', 'DELETE'],
  //   credentials: true,
  // });
  app.use(cookieParser());

  await app.listen(4000);
=======
  app.use(cookieParser());

  // await app.listen(4000);
  await app.listen(4000, 'localhost');
>>>>>>> origin/lhoussin
}

bootstrap();
