import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // PrismaService is a custom service for Prisma interaction
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<Prisma.User> {
    return this.prisma.user.create({ data });
  }

  async getUserById(id: number): Promise<Prisma.User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<Prisma.User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<Prisma.User | null> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}