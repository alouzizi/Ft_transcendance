import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Get,
  Request,
  UseGuards,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { RefreshJwtGuard } from "./guard/refresh.guard";
import { AuthGuard } from "@nestjs/passport";

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
    console.log(dto);
    return this.authService.signup(dto);
  }


  // @UseGuards(AuthGuard('42-intranet')) // 42-intranet
  // @Get('42-intranet/callback')
  async callbackWith42(@Req() req: any, @Res() res: Response) {
    console.log("profil howa niit ?? :", req.user);
    // const ret = await this.authService.valiadteUserAndCreateJWT(req.user);
    // // console.log(ret);
    // if (ret != null) {
    //   res.cookie("auth", ret);
    // }

    // res.send(ret)
    return req.user;
  }


  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
