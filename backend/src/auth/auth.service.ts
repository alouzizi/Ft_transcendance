import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { create } from "domain";

const EXPIRE_TIME = 20 * 1000;

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: AuthDto) {
    try {
      // randem image
      const index = Math.floor(Math.random() * 100) + 1;
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hash,
          avatar: `https://randomuser.me/api/portraits/women/${index}.jpg`,
          username: dto.email,
        },
      });

      // return the saved user
      return this.signToken(user);
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Credential taken");
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException("Credential incorrect");
    }
    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException("Credential incorrect");
    }
    // send back the user
    return this.signToken(user);
  }

  async signToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: "5h",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    const myUser = user;
    delete myUser.hash;

    return {
      user: myUser,
      backendTokens: {
        access_token: access_token,
        refresh_token: refresh_token,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async refreshToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: "5h",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    return {
      backendTokens: {
        access_token: access_token,
        refresh_token: refresh_token,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
}
