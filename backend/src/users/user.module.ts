import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  imports:[
    AuthModule,
    PrismaModule,
    ],
  
  providers:[
    UserService,
    ChannelService,
    ],
  controllers: [UserController],
})
export class UserModule {}
