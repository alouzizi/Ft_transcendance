import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { toDataURL } from "qrcode";
import { authenticator } from "otplib";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async generateAccessToken(user: User) {
    // Create a JWT access token based on the user's data
    const payload = {
      sub: user.intra_id,
      nickname: user.nickname,
      email: user.email,
    }; // Customize the payload as needed
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generate2fa_Token(user: any) {
    const payload = { sub: user.intra_id, nickname: user.login42 }; // Customize the payload as needed
    return await this.jwtService.signAsync(payload);
  }

  async valiadteUserAndCreateJWT(intra_id: string) {
    try {
      const user = await this.userService.findByIntraId(intra_id);
      if (user) {
        return this.generateAccessToken(user); //res.redirect('/profile');
      } else {
        return null; //res.redirect('https://github.com/');
      }
    } catch (error) {
      return null; //res.redirect('https://github.com/');
    }
  }

  // async login(userWithoutPsw: any) {
  //   const payload = {
  //     email: userWithoutPsw.email,
  //   };
  //   return {
  //     email: payload.email,
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

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
      secret: user.twoFactorAuthSecret, // Replace with the actual property name for the secret
    });
  }
}