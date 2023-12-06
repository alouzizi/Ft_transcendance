import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
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
  async loginWith42() {
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @HttpCode(200)
  async googleAuth() {
  }

  @Get("stategies/google/callback")
  @UseGuards(AuthGuard("google"))
  async callbackGoogle(@Req() req: any, @Res() res: Response) {
    this.authService.callbackStratiegs(req, res);
  }

  @Get("stategies/42/callback")
  @UseGuards(AuthGuard("42-intranet"))
  async callbackIntra42(@Req() req: any, @Res() res: Response) {
    this.authService.callbackStratiegs(req, res);
  }



  @Get("2fa/generate")
  @UseGuards(JwtGuard)
  async register(@Req() req: Request) {
    const { otpAuthUrl } = await this.authService.generateTwoFactorAuthSecret(
      req.user
    );
    const qrcode = await this.authService.generateQrCodeDataURL(otpAuthUrl);
    return qrcode;
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


  @Post("2fa/turn-off/:intra_id")
  @UseGuards(JwtGuard)
  async turnOffTwoFactorAuthentication(@Param("intra_id") intra_id: string) {
    await this.userService.turnOffTwoFactorAuth(intra_id);
  }

  @Get("2fa/authenticate/:intra_id/:authCode")
  @HttpCode(200)
  async authenticate(
    @Param("intra_id") intra_id: string,
    @Param("authCode") authCode: string,
  ) {
    const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(
      authCode,
      intra_id
    );
    if (!isCodeValid) {
      return { isCodeValid, access_token: "" }
    }
    const ret = await this.authService.valiadteUserAndCreateJWT(intra_id);
    return { isCodeValid, access_token: ret.access_token }
  }
}
