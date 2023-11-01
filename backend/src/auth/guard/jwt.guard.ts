// import {
//     CanActivate,
//     ExecutionContext,
//     Injectable,
//     UnauthorizedException,
//   } from '@nestjs/common';
//   import { AuthGuard } from "@nestjs/passport";
//   import { JwtService } from '@nestjs/jwt';
//   import { Request } from 'express';
//   import { PrismaService } from 'src/prisma/prisma.service';
//   import { ConfigService } from "@nestjs/config";

  
//   @Injectable()
//   export class JwtGuard implements CanActivate {
//     constructor(private jwtService: JwtService, 
//       private prisma: PrismaService,
//       private config: ConfigService) {}
//     async canActivate(context: ExecutionContext) {
//       const request = context.switchToHttp().getRequest();
//       const token = this.extractTokenFromHeader(request);
//       if (!token) throw new UnauthorizedException();
  
//       try {
//         console.log("-------------------------------------");
//         const payload = await this.jwtService.verifyAsync(token, {
//           // secret: process.env.JWT_SECRET,
//           secret: this.config.get("JWT_SECRET"),
//         });
//         console.log("payload --> ", payload);
//         const user = await this.prisma.user.findUnique({
//           where: { intra_id: payload.sub },
//         });
//         request['user'] = payload;
//       } catch {
//         throw new UnauthorizedException();
//       }
//       return true;
//     }
//     private extractTokenFromHeader(request: Request) {
//       const [type, token] = request.headers.authorization?.split(' ') ?? [];
//       return type === 'Bearer' ? token : undefined;
//     }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

// export class JwtGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }
// }

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log("-------------------------------------");
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get("JWT_SECRET"),
      });
      console.log("payload --> ", payload);
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
