import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from "src/prisma/prisma.service";
import { User } from '@prisma/client';
import { toDataURL } from 'qrcode';
import { authenticator } from 'otplib';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService,
    private PrismaService: PrismaService,
  ) {}
  async generateAccessToken(user: any){
    // Create a JWT access token based on the user's data
    const payload = { sub: user.intra_id, nickname: user.login42}; // Customize the payload as needed
    // console.log("paylod",payload)
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async valiadteUserAndCreateJWT(user: User)
  {
    // console.log("in validate : ",user)
    try {
      const authResult = await this.UserService.findByIntraId(user.intra_id);
    if(authResult){
      
      return this.generateAccessToken(user);//res.redirect('/profile');
    }else {
      return null;//res.redirect('https://github.com/');
    }
    
  } catch (error){
      return null;//res.redirect('https://github.com/');
    }  
  }
  async login(userWithoutPsw: any) {
    const payload = {
      email: userWithoutPsw.email,
    };
    return {
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWith2fa(userWithoutPsw: any) {
    const payload = {
      email: userWithoutPsw.email,
      isTwoFactorAuthEnabled: !!userWithoutPsw.isTwoFactorAuthEnabled,
      isTwoFactorAuthenticated: true,
    };
    return {
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateTwoFactorAuthSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpAuthUrl = authenticator.keyuri(
      user.email,
      'ft_tranc',
      secret,
    );

    await this.UserService.setTwoFactorAuthSecret(
      secret,
      user.id,
    );
    return {
      secret,
      otpAuthUrl,
    };
  }
  async generateQrCodeDataURL(otpAuthUrl: string) {
    return toDataURL(otpAuthUrl);
  }

  isTwoFactorAuthCodeValid(twoFactorAuthCode: string, user: User) {
    if (user.twoFactorAuth){
      // If two-factor authentication is enabled, use the actual secret (string)
        return authenticator.verify({
        token: twoFactorAuthCode,
        secret: user.twoFactorAuthSecret, // Replace with the actual property name for the secret
    });
    }else {
    // If two-factor authentication is not enabled, you might handle it differently
    return false;  // Or whatever makes sense for your application
    }
  }
}
