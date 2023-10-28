import { PrismaService } from "src/prisma/prisma.service";
export declare class HixcoderService {
    private prisma;
    constructor(prisma: PrismaService);
    getOnlineFriends(): Promise<{
        id: number;
        senderId: number;
        receivedId: number;
    }[]>;
}
