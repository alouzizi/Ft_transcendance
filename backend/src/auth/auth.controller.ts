import {
  Controller,
  Get,
  Body,
  Req,
  Post,
  Res,
  UseGuards,
  UnauthorizedException,
  HttpCode,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { UserService } from "src/users/user.service";
import { JwtGuard } from "./guard";
import { Jwt2faAuthGuard } from "./2FA/jwt-2fa-auth.guard";
import { User } from "@prisma/client";
@Controller("auth")
export class AuthController {
  userService: any;
  constructor(
    private authService: AuthService,
    ) {}

  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  @HttpCode(200)
  async loginWith42(@Req() req) {
  // console.log("login here")
    const userWithoutPsw: Partial<User> = req.user;

    return this.authService.loginWith2fa(userWithoutPsw); 
  }
  @Post('2fa/generate')
  @UseGuards(AuthGuard)
  async register(@Res() Res, @Req() req) {
    const { otpAuthUrl } =
      await this.authService.generateTwoFactorAuthSecret(
        req.user,
      );

    return Res.json(
      await this.authService.generateQrCodeDataURL(otpAuthUrl),
    );
  }

  @Post('2fa/turn-on')
  @UseGuards(AuthGuard)
  async turnOnTwoFactorAuthentication(@Req() req, @Body() body) {
    const isCodeValid =
      this.authService.isTwoFactorAuthCodeValid(
        body.twoFactorAuthCode,
        req.user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.userService.turnOnTwoFactorAuth(req.user.id);
  }
  @Post('2fa/authenticate')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async authenticate(@Req() req, @Body() body) {
    const isCodeValid = this.authService.isTwoFactorAuthCodeValid(
      body.twoFactorAuthenticationCode,
      req.user,
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    return this.authService.loginWith2fa(req.user);
  }
  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req: any,@Res() res: Response) { 
    // console.log("profil howa niit ?? :",req.user);
    const ret = await this.authService.valiadteUserAndCreateJWT(req.user);
      // console.log(ret);
      if (ret != null){
        // res.cookie("auth",ret);
      }
      res.cookie('intra_id', req.user.accessToken);
      res.cookie('access_token', ret.access_token);
      // req.cookies(accessToken:'accessToken' ,JWT_SECRET);
    res.redirect("http://localhost:3000/protected/settingspage");
    // res.redirect("http://www.google.com"); 
    // res.send(ret)
  }
}

//prisma
//dto
// jwt
// guardes
// pipes 