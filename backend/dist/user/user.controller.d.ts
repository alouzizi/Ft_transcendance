import { User } from '@prisma/client';
export declare class UserController {
    getMe(user: User): {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        hash: string;
        firstName: string;
        lastName: string;
    };
}
