import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { JwtService } from "@nestjs/jwt";
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [JwtService, UserService],
})
export class UserModule {}
