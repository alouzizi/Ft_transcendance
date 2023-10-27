import { Controller, Get, Req, Res, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Profile } from 'passport-42';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  async loginWith42() {
  }

  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req: Request,@Res() res: Response, user: Profile) { 
    try{
      // const authResult = await this.authService.validateUser(user);
      const authResult = await this.authService.validateUser(user);
    if(authResult){
      return res.redirect('/profile');

    }else {
      return res.redirect('/login');
    }
    
    } catch (error){
      return res.redirect('/login');
    }
    ///check if user in db 
    //user == true => redirect profile
    //user create => signup
    // return this.authservice.validateUser(req.user);
  }
}


//prisma
//dto
// jwt
// guardes
// pipes