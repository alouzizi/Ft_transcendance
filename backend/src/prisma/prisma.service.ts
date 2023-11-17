<<<<<<< HEAD
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy {
    constructor(){
      super({
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });
    }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
=======
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';




@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}


// @Injectable()
// export class PrismaService extends PrismaClient {
//   constructor(config: ConfigService) {
//     super({
//       datasources: {
//         db: {
//           url: config.get('DATABASE_URL'),
//         },
//       },
//     });
//   }
// }
>>>>>>> origin/lhoussin
