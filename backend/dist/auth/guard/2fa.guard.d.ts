import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserService } from 'src/user/user.service';
export declare class TwoFactorGuard implements CanActivate {
    private jwtService;
    private config;
    private userService;
    constructor(jwtService: JwtService, config: ConfigService, userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
