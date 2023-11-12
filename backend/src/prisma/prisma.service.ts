<<<<<<< HEAD
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
=======
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';



>>>>>>> implement the sockets successfully

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

<<<<<<< HEAD
=======

>>>>>>> implement the sockets successfully
// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor(config: ConfigService) {
//     super({
//       datasources: {
//         db: {
<<<<<<< HEAD
//           url: config.get("DATABASE_URL"),
=======
//           url: config.get('DATABASE_URL'),
>>>>>>> implement the sockets successfully
//         },
//       },
//     });
//   }
// }
