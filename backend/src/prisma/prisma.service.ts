import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
// }

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get("DATABASE_URL"),
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}

// import { Injectable, OnModuleInit } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PrismaClient } from "@prisma/client";

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor(private readonly config: ConfigService) {
//     super({
//       datasources: {
//         db: {
//           url: config.get("DATABASE_URL"),
//         },
//       },
//     });
//   }

//   async onModuleInit() {
//     await this.$connect();
//   }
// }
