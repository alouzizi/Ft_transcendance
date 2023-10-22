import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput){
    return this.prisma.user.create({ data });
  }

  async getUserById(id: number){
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput){
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number){
    return this.prisma.user.delete({
      where: { id },
    });
  }
}