import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(user: User) {
    const myUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    delete myUser.hash;
    return myUser;
  }
}
