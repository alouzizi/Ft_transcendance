import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { toDataURL } from "qrcode";
import { authenticator } from "otplib";
import { Response } from "express";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async callbackStratiegs(req: any, res: Response) {
    const ret = await this.valiadteUserAndCreateJWT(req.user.intra_id);
    if (ret) {
      res.cookie("intra_id", req.user.intra_id);
      const diff =
        (new Date().getTime() - new Date(`${req.user.createdAt}`).getTime()) /
        1000;
      if (diff < 60) {
        res.cookie("access_token", ret.access_token);
        return res.redirect(process.env.FRONT_HOST + "protected/SettingsPage");
      }
      if (req.user.isTwoFactorAuthEnabled)
        return res.redirect(process.env.FRONT_HOST + "Checker2faAuth");
      res.cookie("access_token", ret.access_token);
      res.redirect(process.env.FRONT_HOST + "protected/DashboardPage");
    }
  }

  async valiadteUserAndCreateJWT(intra_id: string) {
    try {
      const user = await this.userService.findByIntraId(intra_id);
      if (user) {
        return this.generateAccessToken(user);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async generateAccessToken(user: User) {
    const payload = {
      sub: user.intra_id,
      nickname: user.nickname,
      email: user.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generate2fa_Token(user: any) {
    const payload = { sub: user.intra_id, nickname: user.login42 };
    return await this.jwtService.signAsync(payload);
  }

  async loginWith2fa(userWithoutPsw: any) {
    const payload = {
      email: userWithoutPsw.email,
      isTwoFactorAuthEnabled: !userWithoutPsw.isTwoFactorAuthEnabled,
      isTwoFactorAuthenticated: true,
    };
    return {
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateTwoFactorAuthSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpAuthUrl = authenticator.keyuri(user.nickname, "ft_tranc", secret);
    await this.userService.setTwoFactorAuthSecret(secret, user.sub);
    return {
      secret,
      otpAuthUrl,
    };
  }

  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  async isTwoFactorAuthCodeValid(authCode: string, intra_id: string) {
    const user = await this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
    return authenticator.verify({
      token: authCode,
      secret: user.twoFactorAuthSecret,
    });
  }
}
