// import { Controller, Get, Req, Res, Post, Body, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { Request, Response } from 'express';
// import { Profile} from 'passport-42';
// import { AuthService } from './auth.service';
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
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login42')
  @UseGuards(AuthGuard('42-intranet'))
  async loginWith42() {
    // console.log("login here")
  }
  @Get('42-intranet/callback')
  @UseGuards(AuthGuard('42-intranet'))
  async callbackWith42(@Req() req: any,@Res() res: Response) { 
    console.log("profil howa niit ?? :",req.user);
    const ret = await this.authService.valiadteUserAndCreateJWT(req.user);
      console.log(ret);
      if (ret != null){
        // res.cookie("auth",ret);
      }
      req.cookies('intra_id', req.user.accessToken);
      res.cookie('access_token', ret.access_token);
      // req.cookies(accessToken:'accessToken' ,JWT_SECRET);
    res.redirect("http://localhost:3000/protected/DashboardPage");
    // res.redirect("http://www.google.com");
    // res.send(ret)
  }
}


//prisma
//dto
// jwt
// guardes
// pipes 