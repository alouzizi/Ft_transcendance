import {
  Body,
  Controller,
<<<<<<< HEAD
=======
  Get,
>>>>>>> implement the sockets successfully
  HttpCode,
  HttpStatus,
  Post,
  Req,
<<<<<<< HEAD
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { RefreshJwtGuard } from "./guard/refresh.guard";

=======
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
>>>>>>> implement the sockets successfully
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

<<<<<<< HEAD
  @HttpCode(HttpStatus.OK) // for make status code 200 not 201
  @Post("signin")
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
=======


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
>>>>>>> implement the sockets successfully
  }
}
