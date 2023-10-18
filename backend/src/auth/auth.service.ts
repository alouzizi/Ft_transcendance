import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async register(user: { username: string; email: string; password: string }) {
    const createdUser = await this.prisma.user.create({
      data: user,
    });
    return createdUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}