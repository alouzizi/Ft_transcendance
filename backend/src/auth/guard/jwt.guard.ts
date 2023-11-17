import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
<<<<<<< HEAD
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
=======
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
>>>>>>> origin/lhoussin

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
<<<<<<< HEAD
      console.log("-------------------------------------");
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get("JWT_SECRET"),
      });
      console.log("payload --> ", payload);
=======
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get("JWT_SECRET"),
      });

>>>>>>> origin/lhoussin
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(" ") ?? [];
<<<<<<< HEAD
    return type === "Bearer" ? token : undefined;
=======
    return (type === "Bearer") ? token : undefined;
>>>>>>> origin/lhoussin
  }
}
