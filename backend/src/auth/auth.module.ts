import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/UserService'; 
import { PrismaService } from 'src/prisma.service';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoIntranetStrategy } from './42-intranet.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "1d" }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,FortyTwoIntranetStrategy,UserService,PrismaService],
})
export class AuthModule {}
