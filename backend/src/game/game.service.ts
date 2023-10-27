import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { HistoryDto } from "./dto";

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  addMatch(match: HistoryDto) {
    return {
      msg: "post your match here",
    };
  }
}
