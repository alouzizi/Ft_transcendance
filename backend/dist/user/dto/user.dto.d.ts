import { Status } from "@prisma/client";
export declare class CreateUserDto {
    name: string;
    email: string;
    hash: string;
    avatar: string;
    status: Status;
    lastSee: Date;
}
