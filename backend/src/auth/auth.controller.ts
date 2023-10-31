import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }



  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  async loginWith42() {
    // console.log("login here")
  }

  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req: any, @Res() res: Response) {
    console.log("profil howa niit ?? :", req.user);
    const ret = await this.authService.valiadteUserAndCreateJWT(req.user);
    if (ret != null) {
      // res.cookie("auth", ret);
    }
    res.cookie('intra_id', req.user.intra_id);
    res.cookie('access_token', ret.access_token);
    res.redirect("http://localhost:3000/protected/DashboardPage");
  }
}
