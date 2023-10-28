import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { RefreshJwtGuard } from "./guard/refresh.guard";

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

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
