import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
<<<<<<< HEAD
export class PrismaModule {}
=======
export class PrismaModule {}
>>>>>>> origin/lhoussin
