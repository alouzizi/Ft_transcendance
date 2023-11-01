import { ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

const EXPIRE_TIME = 20 * 1000;

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,

  ) { }
  async signToken(user: User) {
    const payload = {
      sub: user.intra_id,
      email: user.email,
    };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    const myUser = user;
    delete myUser.hash;
    console.log("user -> ", user);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      sub: user.intra_id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    return {
      access_token: access_token,
      refresh_token: refresh_token,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }


  // saliha --------------------------------------------------------------------------

  async generateAccessToken(user: any) {
    // Create a JWT access token based on the user's data
    const payload = { sub: user.intra_id, nickname: user.login42 }; // Customize the payload as needed
    console.log("paylod", payload)
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async valiadteUserAndCreateJWT(user: User) {
    try {
      const authResult = await this.userService.findByIntraId(user.intra_id);
      if (authResult) {
        return this.signToken(user);
      } else {
        return null;//res.redirect('https://github.com/');
      }

    } catch (error) {
      return null;//res.redirect('https://github.com/');
    }
  }
}
