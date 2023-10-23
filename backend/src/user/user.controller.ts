import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Request } from "express";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";

@UseGuards(JwtGuard)
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("me")
  async getMe(@GetUser("") user: User) {
    return this.userService.getMyUser(user);
  }
}
