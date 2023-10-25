import { Controller, Get, Req, Res, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService ) {}

  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  async loginWith42() {
  }

  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req) {
    ///check if user in db 
      //user == true => redirect profile
      //user create => signup

      // const user = await this.userService.findUserInDatabase('intra_id');
      // if(user)
      // {
      //   // User exists in the database, redirect to the user's profile.
      //   return res.redirect('users/${user.id}');
      // } else {
      //   // User doesn't exist in the database, prompt them to sign up.
      //   return res.redirect('/singup');
      // }
    return this.authservice.validateUser(req.user);
  }
}


//prisma
//dto
// jwt
// guardes
// pipes