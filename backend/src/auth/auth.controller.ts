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
  UseGuards
} from "@nestjs/common";
import { Response } from 'express';
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtGuard } from "./guard/jwt.guard";


@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService) { }


  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  @HttpCode(200)
  async loginWith42(@Req() req) {
    // const userWithoutPsw: any = req.user;
    // return this.authService.loginWith2fa(userWithoutPsw);
  }


  @Get('2fa/generate')
  @UseGuards(JwtGuard)
  async register(@Req() req: any) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthSecret(
        req.user,
      );
    const qrcode = await this.authService.generateQrCodeDataURL(otpAuthUrl);
    return qrcode;
  }

  @Get('2fa/turn-on/:authCode')
  @UseGuards(JwtGuard)
  async turnOnTwoFactorAuthentication(@Req() req, @Param('authCode') authCode: string) {
    const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(
      authCode,
      req.user.sub,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuth(req.user.sub);
    return isCodeValid;
  }

  @Get('2fa/authenticate/:authCode')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async authenticate(@Req() req, @Param('authCode') authCode: string) {
    console.log(req);
    const isCodeValid = await this.authService.isTwoFactorAuthCodeValid(
      authCode,
      req.user.sub,
    );
    if (isCodeValid) {
      await this.authService.loginWith2fa(req.user.sub);
    }
    return isCodeValid;
  }


  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req: any, @Res() res: Response) {

    const ret = await this.authService.valiadteUserAndCreateJWT(req.user);
    if (ret != null) {
      // res.cookie("auth", ret);
    }
    res.cookie('intra_id', req.user.intra_id);
    res.cookie('access_token', ret.access_token);
    if (req.user.isTwoFactorAuthEnabled)
      res.redirect("http://10.12.3.15:3000/Checker2faAuth");
    else
      res.redirect("http://10.12.3.15:3000/protected/DashboardPage");

  }
}
