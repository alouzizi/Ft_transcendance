import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/UserService';
  
  @Injectable()
  export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService, private prisma: PrismaService, private userservice: UserService) {}
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) throw new UnauthorizedException();
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.jwtSecretKey,
        });
        const user = await this.prisma.user.findUnique({
          where: { intra_id: payload.sub },
        });

        if (!user) {
          // If the user doesn't exist, you can create a new user here
          const newUser = await this.prisma.user.create({
            data: {
              intra_id: payload.sub,
              // other user properties
            },
          });
        }
  
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request) {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  