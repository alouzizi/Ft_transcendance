import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFactorGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private config: ConfigService,
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const user = request.user;


        const tmp: User = await this.userService.findByIntraId(user.sub)
        if (tmp) {
            if (!tmp.isTwoFactorAuthEnabled) return true;

        }
        return false;
    }
}
