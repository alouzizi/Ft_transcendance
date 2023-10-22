import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservoice: AuthService ) {}

  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  async loginWith42() {
  }

  @Get('callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req) {

    return this.authservoice.validateUser(req.user);
  }
}


//prisma
//dto
// jwt
// guardes
// pipes