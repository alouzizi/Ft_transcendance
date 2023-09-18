import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
   async signup() {
       return  await this.prisma.user.create(
            {
                data:{
                    email:"hhhhhh",
                    hash:"11234235$$$#23^&^&^"
                }
            }
        )
    }

    signin() {
        return {msg: 'I have signed in' };
    }
}
