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
<<<<<<< HEAD
    const token = this.extractTokenFromHeader(request);
=======

    const token = this.extractTokenFromHeader(request);

>>>>>>> implement the sockets successfully
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
<<<<<<< HEAD
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get("JWT_SECRET"),
      });
=======

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get("JWT_SECRET"),
      });
      console.log("payload --> ", payload);
>>>>>>> implement the sockets successfully
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
