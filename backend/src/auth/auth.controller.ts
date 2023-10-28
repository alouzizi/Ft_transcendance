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

  @HttpCode(HttpStatus.OK) // for make status code 200 not 201
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }


  // saliah -----------------------------------

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
    // console.log(ret);
    if (ret != null) {
      // res.cookie("auth", ret);
    }
    // req.cookies('intra_id', req.user.accessToken);
    // req.cookies(accessToken:'accessToken' ,JWT_SECRET_KEY);
    res.redirect("http://localhost:3000/protected/DashboardPage");
    // res.redirect('http://www.google.com');
    res.send(ret)
  }
}
