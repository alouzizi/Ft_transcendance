import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/UserService';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private UserService: UserService) {}

  async generateAccessToken(user: any){
    // Create a JWT access token based on the user's data
    const payload = { sub: user.intra_id, nickname: user.login42}; // Customize the payload as needed
    console.log("paylod",payload)
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
    async valiadteUserAndCreateJWT(user: User)
  {
    console.log("in validate : ",user)
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
}

///check if user in db 
//user == true => redirect profile
//user create => signup