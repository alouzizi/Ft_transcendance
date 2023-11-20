import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from "./guard/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Get("login42")
  @UseGuards(AuthGuard("42-intranet"))
  @HttpCode(200)
  async loginWith42(@Req() req) {
    // const userWithoutPsw: any = req.user;
    // return this.authService.loginWith2fa(userWithoutPsw);
  }


  @Get("2fa/generate")
  @UseGuards(JwtGuard)
  async register(@Req() req: any) {
    const { otpAuthUrl } = await this.authService.generateTwoFactorAuthSecret(
      req.user
    );
    const qrcode = await this.authService.generateQrCodeDataURL(otpAuthUrl);
    return qrcode;
  }

  @Post("2fa/turn-off/:intra_id")
  @UseGuards(JwtGuard)
  async turnOffTwoFactorAuthentication(@Param("intra_id") intra_id: string) {
    await this.userService.turnOffTwoFactorAuth(intra_id);
  }

  @Get("2fa/turnOn/:intra_id/:authCode")
  @UseGuards(JwtGuard)
  async turnOnTwoFactorAuthentication(
    @Param("intra_id") intra_id: string,
    @Param("authCode") authCode: string
  ) {
    const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(
      authCode,
      intra_id
    );
    if (!isCodeValid) {
      return isCodeValid
    }
    await this.userService.turnOnTwoFactorAuth(intra_id);
    return isCodeValid
  }

  @Get("2fa/authenticate/:intra_id/:authCode")
  @HttpCode(200)
  async authenticate(
    @Param("intra_id") intra_id: string,
    @Param("authCode") authCode: string
  ) {
    const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(
      authCode,
      intra_id
    );
    if (!isCodeValid) {
      throw new UnauthorizedException("Wrong authentication code");
    }
    const ret = await this.authService.valiadteUserAndCreateJWT(intra_id);
    return ret.access_token;
  }

  @Get("42-intranet/callback")
  @UseGuards(AuthGuard("42-intranet"))
  async callbackWith42(@Req() req: any, @Res() res: Response) {
    const ret = await this.authService.valiadteUserAndCreateJWT(
      req.user.intra_id
    );
    if (ret != null) {
    }

    res.cookie("intra_id", req.user.intra_id);

    const diff =
      (new Date().getTime() - new Date(`${req.user.createdAt}`).getTime()) /
      1000;
    if (diff < 120) {
      res.cookie("access_token", ret.access_token);
      return res.redirect("http://10.13.8.2:3000/protected/SettingsPage");
    }

    if (req.user.isTwoFactorAuthEnabled)
      return res.redirect("http://10.13.8.2:3000/public/Checker2faAuth");

    res.cookie("access_token", ret.access_token);
    res.redirect("http://10.13.8.2:3000/protected/DashboardPage");
  }
}
