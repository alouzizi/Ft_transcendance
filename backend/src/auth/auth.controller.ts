import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { FortyTwoStrategy } from './42.strategy';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private fortyTwoStrategy: FortyTwoStrategy) {}

  @Get('42')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuth() {}

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async fortyTwoAuthCallback(@Req() req, @Res() res) {
    // Handle the authenticated user here
    res.send(req.user);
  }
}

//todo hj
//prisma
//dto
// jwt
// guardes
// pipes