import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { HistoryDto } from "./dto";
export declare class GameService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    addMatch(match: HistoryDto): {
        msg: string;
    };
}
