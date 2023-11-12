<<<<<<< HEAD
import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
=======
import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
>>>>>>> implement the sockets successfully
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit(): Promise<void>;
}
