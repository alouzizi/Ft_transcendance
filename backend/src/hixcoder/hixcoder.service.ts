import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HixcoderService {
  constructor(private prisma: PrismaService) {}

  async getOnlineFriends() {
    const result = await this.prisma.friend.findMany();
    return result;
  }
}
