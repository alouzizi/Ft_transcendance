import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './auth/42-intranet.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './users/UserService';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';
@Module({
  imports: [
    AuthModule,
    JwtModule,
    PassportModule.register({ defaultStrategy: '42-intranet' }),
  ],
  providers: [FortyTwoIntranetStrategy,AuthService,UserService,PrismaService,PrismaClient],
  exports: [PassportModule],
})
export class AppModule {}