import { ForbiddenException, Injectable } from "@nestjs/common";
<<<<<<< HEAD
import { User, PrismaClient } from "@prisma/client";
=======
import { User } from "@prisma/client";
>>>>>>> implement the sockets successfully
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
<<<<<<< HEAD
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { create } from "domain";
=======
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";
>>>>>>> implement the sockets successfully

const EXPIRE_TIME = 20 * 1000;

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
<<<<<<< HEAD
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
=======
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
>>>>>>> implement the sockets successfully
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    const myUser = user;
    delete myUser.hash;
<<<<<<< HEAD

    return {
      user: myUser,
      backendTokens: {
        access_token: access_token,
        refresh_token: refresh_token,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
=======
    console.log("user -> ", user);
    return {
      access_token: access_token,
      refresh_token: refresh_token,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
>>>>>>> implement the sockets successfully
    };
  }

  async refreshToken(user: User) {
    const payload = {
<<<<<<< HEAD
      sub: user.id,
      email: user.email,
    };

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: "5h",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwt.signAsync(payload, {
=======
      sub: user.intra_id,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: "7d",
      secret: this.config.get("JWT_SECRET"),
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
>>>>>>> implement the sockets successfully
      expiresIn: "7d",
      secret: this.config.get("JWT_RefreshTokenKey"),
    });
    return {
<<<<<<< HEAD
      backendTokens: {
        access_token: access_token,
        refresh_token: refresh_token,
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
=======
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
>>>>>>> implement the sockets successfully
}
