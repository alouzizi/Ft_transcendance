import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getMyUser(user: User): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    }>;
}
