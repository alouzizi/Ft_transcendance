import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/dto/user.dto";

@Injectable()

export class UserService {
    constructor(private prisma: PrismaService){}

    async create(dto: CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if (user) throw new ConflictException('email duplicated');
    }
}