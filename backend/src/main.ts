import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';
<<<<<<< HEAD
=======
import * as cookieParser from 'cookie-parser';
>>>>>>> implement the sockets successfully

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
<<<<<<< HEAD
=======

>>>>>>> implement the sockets successfully
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  // app.enableCors({
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'POST', 'DELETE'],
  //   credentials: true,
  // });
<<<<<<< HEAD
=======
  app.use(cookieParser());
>>>>>>> implement the sockets successfully

  await app.listen(4000);
}

bootstrap();
